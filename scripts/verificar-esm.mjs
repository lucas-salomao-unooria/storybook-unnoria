/**
 * Guarda de regressão: todo specifier relativo em dist/**\/*.{mjs,cjs}
 * precisa terminar em extensão válida (.mjs, .cjs, .css, .json).
 *
 * Se o tsup ou outra ferramenta reintroduzir specifiers sem extensão, este
 * guard faz o build falhar antes de publicar. Roda no final do build:package,
 * depois de corrigir-specifiers.mjs.
 *
 * Mesmo padrão do verificar-css-agregado.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

/** Extensões que são válidas para specifiers relativos. */
const EXT_VALIDAS = new Set(['.mjs', '.cjs', '.css', '.json']);

/** Regex para ESM (from/import "…") */
const REGEX_ESM = /(?:from|import)\s*"(\.[^"]*)"/g;

/** Regex para CJS (require("…")) */
const REGEX_CJS = /require\("(\.[^"]*)"\)/g;

/**
 * Coleta recursivamente todos os arquivos com a extensão dada.
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

const falhas = [];
let totalVerificados = 0;

for (const ext of ['.mjs', '.cjs']) {
  const arquivos = coletarArquivos(DIST, ext);
  const regex = ext === '.mjs' ? REGEX_ESM : REGEX_CJS;

  for (const arquivo of arquivos) {
    const conteudo = fs.readFileSync(arquivo, 'utf8');
    const reInstance = new RegExp(regex.source, 'g');
    let match;

    while ((match = reInstance.exec(conteudo)) !== null) {
      const specifier = match[1];
      if (!specifier.startsWith('.')) continue;

      totalVerificados++;
      const extDoSpecifier = path.extname(specifier);
      if (!EXT_VALIDAS.has(extDoSpecifier)) {
        const relativo = path.relative(process.cwd(), arquivo);
        falhas.push(`  ${relativo}: "${specifier}"`);
      }
    }
  }
}

if (falhas.length > 0) {
  console.error('\n✗ Specifiers relativos sem extensão válida encontrados no dist:\n');
  for (const falha of falhas) console.error(falha);
  console.error(`\n  Total: ${falhas.length} specifier(s) inválido(s).`);
  console.error('  Rode "node scripts/corrigir-specifiers.mjs" ou corrija a emissão do tsup.\n');
  process.exit(1);
}

console.log(`✓ ESM/CJS válido: ${totalVerificados} specifiers relativos verificados, todos com extensão.`);
