/**
 * Inventário de componentes do DS para o gerador de missões, gravado no
 * layout `base-plataforma/design-system/` que o gerador lê do bucket.
 *
 * Quem lê: o gerador de missões (repositório gerador-missoes), que no início
 * de cada execução lê `design-system/atual.json`, fixa a versão para a
 * execução inteira e confere contra `ds-componentes.json` todo nome de
 * componente que os agentes dele dizem ser "do DS". Antes o gerador montava
 * esse arquivo sozinho, com uma lista FIXA de marcas, e seis delas (unooriaai,
 * unoovista, unoochat, unoojornal, unooblog, unoogaleria) nunca entraram.
 * Agora quem produz é o DS, a cada versão publicada no npm, e as marcas são
 * todas as pastas `src/<marca>/` com index (`lib/inventario-componentes.mjs`).
 *
 * Layout gravado (o contrato com o gerador):
 *
 *     <base>/design-system/<versao>/ds-componentes.json
 *     <base>/design-system/atual.json    ← ponteiro, gravado POR ÚLTIMO
 *
 * Uso:
 *
 *     node scripts/inventario-para-o-gerador.mjs --saida /tmp/ds
 *     node scripts/inventario-para-o-gerador.mjs --enviar gs://entre-redes-dev-adk-artifacts/base-plataforma
 *
 * `--saida` grava numa pasta local. `--enviar` gera num temporário e sobe com
 * o `gcloud`: primeiro a pasta da versão inteira, e SÓ DEPOIS o `atual.json`
 * (com `Cache-Control: no-store`). Assim quem lê nunca pega um ponteiro para
 * uma versão que ainda não terminou de subir.
 *
 * `versao` é a do `package.json`; `commit` (curto) e `data_commit` vêm do git
 * (ou de `DS_COMMIT` / `DS_DATA_COMMIT`, como no outro script). Marca sem
 * componente nenhum é aviso, não falha; nenhuma marca é falha.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { SECAO_PARA_MARCA, agoraIso, lerMarcas } from './lib/inventario-componentes.mjs';

const RAIZ_DO_REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERSAO_FORMATO = 1;

function git(raiz, ...args) {
  try {
    return execFileSync('git', ['-C', raiz, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

/**
 * Monta os dois documentos do contrato. Não grava nada.
 * `origem` permite fixar commit/data/instante (os testes usam).
 */
export function montarInventario(raiz, origem = {}) {
  const pacote = JSON.parse(fs.readFileSync(path.join(raiz, 'package.json'), 'utf8'));
  if (!pacote.version) throw new Error('package.json sem "version"');

  const commit = origem.commit || process.env.DS_COMMIT || git(raiz, 'rev-parse', '--short', 'HEAD');
  const dataCommit = origem.dataCommit || process.env.DS_DATA_COMMIT || git(raiz, 'log', '-1', '--format=%cs');
  if (!commit || !dataCommit) throw new Error('sem commit/data do HEAD (rode dentro do repositório git ou defina DS_COMMIT e DS_DATA_COMMIT)');

  const { marcas, vazias } = lerMarcas(raiz);
  if (!Object.keys(marcas).length) {
    throw new Error(`nenhuma marca em ${path.join(raiz, 'src')} (pasta com index.ts ou index.tsx)`);
  }

  const agora = origem.agora || agoraIso();
  const versao = pacote.version;
  const pasta = `design-system/${versao}/`;
  const componentes = {
    commit,
    data_commit: dataCommit,
    pacote: pacote.name,
    versao,
    sincronizado_em: agora,
    secao_para_marca: SECAO_PARA_MARCA,
    marcas,
  };
  const atual = {
    versao_formato: VERSAO_FORMATO,
    versao,
    commit,
    data_commit: dataCommit,
    gerado_em: agora,
    pasta,
  };
  return { versao, pasta, componentes, atual, vazias };
}

/** Grava `<dir>/design-system/<versao>/ds-componentes.json` e `<dir>/design-system/atual.json`. */
export function gravarInventario(dir, inventario) {
  const pastaVersao = path.join(dir, inventario.pasta);
  fs.mkdirSync(pastaVersao, { recursive: true });
  const arquivoComponentes = path.join(pastaVersao, 'ds-componentes.json');
  const arquivoAtual = path.join(dir, 'design-system', 'atual.json');
  fs.writeFileSync(arquivoComponentes, JSON.stringify(inventario.componentes, null, 1) + '\n');
  fs.writeFileSync(arquivoAtual, JSON.stringify(inventario.atual, null, 1) + '\n');
  return { pastaVersao, arquivoComponentes, arquivoAtual };
}

function gcloud(...args) {
  console.log(`$ gcloud ${args.join(' ')}`);
  execFileSync('gcloud', args, { stdio: 'inherit' });
}

/** Sobe a pasta da versão e, só depois dela, o ponteiro. */
function enviar(destino, inventario) {
  const base = destino.replace(/\/+$/, '');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-inventario-'));
  try {
    const { pastaVersao, arquivoAtual } = gravarInventario(tmp, inventario);
    // `cp -r <pasta> gs://.../design-system/` cria `design-system/<versao>/...`.
    gcloud('storage', 'cp', '-r', pastaVersao, `${base}/design-system/`);
    gcloud('storage', 'cp', '--cache-control=no-store', arquivoAtual, `${base}/design-system/atual.json`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function lerArgumentos(argv) {
  const uso = 'uso: node scripts/inventario-para-o-gerador.mjs (--saida <dir> | --enviar gs://<bucket>/<prefixo>)';
  const opcoes = {};
  for (let i = 0; i < argv.length; i++) {
    const chave = argv[i];
    if (chave === '--saida' || chave === '--enviar') {
      const valor = argv[++i];
      if (!valor || valor.startsWith('--')) throw new Error(`${chave} precisa de um valor\n${uso}`);
      opcoes[chave.slice(2)] = valor;
    } else {
      throw new Error(`argumento desconhecido: ${chave}\n${uso}`);
    }
  }
  if (Boolean(opcoes.saida) === Boolean(opcoes.enviar)) throw new Error(`informe --saida OU --enviar\n${uso}`);
  if (opcoes.enviar && !opcoes.enviar.startsWith('gs://')) throw new Error(`--enviar espera um caminho gs://\n${uso}`);
  return opcoes;
}

function resumir(inventario) {
  const { componentes, vazias } = inventario;
  const marcas = Object.entries(componentes.marcas);
  const total = marcas.reduce((s, [, nomes]) => s + nomes.length, 0);
  console.log(`${componentes.pacote}@${componentes.versao} (commit ${componentes.commit}, ${componentes.data_commit})`);
  console.log(`${total} componentes em ${marcas.length} marcas:`);
  for (const [marca, nomes] of marcas) console.log(`  ${marca.padEnd(16)} ${nomes.length}`);
  for (const marca of vazias) console.log(`aviso: a marca "${marca}" não exporta componente nenhum (entra no inventário com lista vazia)`);
}

function main() {
  const opcoes = lerArgumentos(process.argv.slice(2));
  const inventario = montarInventario(RAIZ_DO_REPO);
  resumir(inventario);
  if (opcoes.saida) {
    const { arquivoComponentes, arquivoAtual } = gravarInventario(path.resolve(opcoes.saida), inventario);
    console.log(`gravado: ${arquivoComponentes}`);
    console.log(`gravado: ${arquivoAtual}`);
  } else {
    enviar(opcoes.enviar, inventario);
    console.log(`enviado: ${opcoes.enviar.replace(/\/+$/, '')}/${inventario.pasta} e design-system/atual.json`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    main();
  } catch (erro) {
    console.error(`erro: ${erro.message}`);
    process.exit(1);
  }
}
