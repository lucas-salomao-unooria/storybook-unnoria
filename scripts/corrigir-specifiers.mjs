/**
 * Pós-processamento de specifiers relativos no dist emitido pelo tsup.
 *
 * O tsup em modo bundleless não reescreve specifiers relativos, produzindo
 * ESM inválido (`from "./Badge"` em vez de `from "./Badge.mjs"`). Isso quebra
 * qualquer runtime ou bundler que aplica resolução ESM estrita (Node, esbuild,
 * e portanto o `vite dev` via optimizeDeps).
 *
 * Este script roda DEPOIS do tsup e do tsc no `build:package` e normaliza
 * todos os specifiers relativos em dist/**\/*.{mjs,cjs}:
 *
 *   1. Já termina em .mjs/.cjs/.css/.json → não mexe.
 *   2. Resolve para diretório com index → `"./x/index.{ext}"`.
 *   3. Resolve para arquivo → `"./x.{ext}"`.
 *   4. Não resolve → FALHA o build (é bug real).
 *
 * A extensão escrita acompanha o formato do arquivo hospedeiro
 * (.mjs dentro de .mjs, .cjs dentro de .cjs).
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

/** Extensões que já são válidas e não precisam de reescrita. */
const EXT_VALIDAS = new Set(['.mjs', '.cjs', '.css', '.json']);

/**
 * Regex que captura specifiers em ambos os formatos:
 *
 * ESM (.mjs):
 *   - import … from "…"
 *   - export … from "…"
 *   - import "…" (side-effect)
 *
 * CJS (.cjs):
 *   - require("…")
 *
 * Cada regex captura o specifier como group 1.
 */
const REGEX_ESM = /(?:from|import)\s*"(\.[^"]*)"/g;
const REGEX_CJS = /require\("(\.[^"]*)"\)/g;

/** Conta por categoria para o relatório final. */
const stats = { diretorio: 0, arquivo: 0, jaValido: 0, arquivos: 0 };

/**
 * Resolve um specifier relativo para o caminho correto com extensão.
 *
 * @param {string} specifier  — o specifier original (ex: "./Badge", "../Icon")
 * @param {string} hostDir    — diretório absoluto do arquivo hospedeiro
 * @param {string} hostExt    — extensão do hospedeiro (".mjs" ou ".cjs")
 * @param {string} hostFile   — caminho do arquivo hospedeiro (para mensagem de erro)
 * @returns {{ resolved: string, category: 'diretorio'|'arquivo'|'jaValido' }}
 */
function resolverSpecifier(specifier, hostDir, hostExt, hostFile) {
  // Já tem extensão válida → não mexe
  const extAtual = path.extname(specifier);
  if (EXT_VALIDAS.has(extAtual)) {
    return { resolved: specifier, category: 'jaValido' };
  }

  const caminhoAbsoluto = path.resolve(hostDir, specifier);

  // Caso 1: é um diretório com index.{mjs,cjs}
  if (fs.existsSync(caminhoAbsoluto) && fs.statSync(caminhoAbsoluto).isDirectory()) {
    const indexFile = `index${hostExt}`;
    const indexPath = path.join(caminhoAbsoluto, indexFile);
    if (fs.existsSync(indexPath)) {
      return { resolved: `${specifier}/${indexFile}`, category: 'diretorio' };
    }
    // Diretório existe mas sem index — é bug
    console.error(`\n✗ ERRO: specifier "${specifier}" resolve para diretório mas sem ${indexFile}`);
    console.error(`  Arquivo: ${hostFile}`);
    console.error(`  Diretório: ${caminhoAbsoluto}`);
    process.exit(1);
  }

  // Caso 2: arquivo com extensão adicionada
  const comExtensao = caminhoAbsoluto + hostExt;
  if (fs.existsSync(comExtensao)) {
    return { resolved: `${specifier}${hostExt}`, category: 'arquivo' };
  }

  // Não resolve — é bug real, falha o build
  console.error(`\n✗ ERRO: specifier relativo não resolve para nenhum arquivo ou diretório.`);
  console.error(`  Specifier: "${specifier}"`);
  console.error(`  Arquivo: ${hostFile}`);
  console.error(`  Tentativas:`);
  console.error(`    diretório: ${caminhoAbsoluto}/`);
  console.error(`    arquivo:   ${comExtensao}`);
  process.exit(1);
}

/**
 * Coleta recursivamente todos os arquivos com a extensão dada dentro de um diretório.
 */
function coletarArquivos(dir, ext) {
  const resultado = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const caminho = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      resultado.push(...coletarArquivos(caminho, ext));
    } else if (entry.name.endsWith(ext)) {
      resultado.push(caminho);
    }
  }
  return resultado;
}

/**
 * Processa um único arquivo: lê, reescreve specifiers, grava se mudou.
 */
function processarArquivo(caminhoArquivo) {
  const hostExt = path.extname(caminhoArquivo); // .mjs ou .cjs
  const hostDir = path.dirname(caminhoArquivo);
  const conteudoOriginal = fs.readFileSync(caminhoArquivo, 'utf8');

  const regex = hostExt === '.mjs' ? new RegExp(REGEX_ESM.source, 'g') : new RegExp(REGEX_CJS.source, 'g');
  let mudou = false;

  const conteudoNovo = conteudoOriginal.replace(
    regex,
    (match, specifier) => {
      // Só mexe em specifiers relativos (começam com .)
      if (!specifier.startsWith('.')) return match;

      const { resolved, category } = resolverSpecifier(specifier, hostDir, hostExt, caminhoArquivo);

      if (category !== 'jaValido') {
        mudou = true;
        stats[category]++;
      } else {
        stats.jaValido++;
      }

      // Reconstrói o match com o specifier corrigido
      return match.replace(`"${specifier}"`, `"${resolved}"`);
    }
  );

  if (mudou) {
    fs.writeFileSync(caminhoArquivo, conteudoNovo, 'utf8');
    stats.arquivos++;
  }
}

// Percorre todos os .mjs e .cjs no dist e processa cada arquivo.
function main() {
  console.log('Corrigindo specifiers relativos no dist…\n');

  for (const ext of ['.mjs', '.cjs']) {
    const arquivos = coletarArquivos(DIST, ext);
    for (const arquivo of arquivos) {
      processarArquivo(arquivo);
    }
  }

  console.log('✓ Specifiers corrigidos:');
  console.log(`  diretório → index : ${stats.diretorio}`);
  console.log(`  arquivo → +ext    : ${stats.arquivo}`);
  console.log(`  já válidos (skip) : ${stats.jaValido}`);
  console.log(`  arquivos alterados: ${stats.arquivos}`);
  console.log();
}

main();
