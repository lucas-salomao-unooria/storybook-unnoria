/**
 * Inventário dos componentes públicos de cada marca, no formato que o
 * gerador de missões consome (`ds-componentes.json`).
 *
 * Por que isto existe: os agentes do gerador de missões escreviam nomes de
 * componente "do DS" sem ter como conferir, e 32% deles não existiam. O
 * gerador passou a conferir contra um inventário, que lê primeiro de uma URL
 * publicada (`DS_COMPONENTES_URL`) e, sem ela, de uma cópia local gerada por
 * `scripts/sincronizar_design_system.py` do repositório gerador-missoes. Este
 * script é o porte dessa lógica para cá: o deploy do Storybook grava o JSON na
 * saída estática, e ele fica em `https://storybook-dev.unooria.com/ds-componentes.json`,
 * sempre do mesmo commit que o Storybook no ar.
 *
 * A leitura mora em `lib/inventario-componentes.mjs`, compartilhada com
 * `inventario-para-o-gerador.mjs` (o que grava no bucket do gerador a cada
 * versão publicada): as marcas são TODAS as pastas `src/<marca>/` com index.
 *
 *     node scripts/gerar-inventario-componentes.mjs                 # imprime no stdout
 *     node scripts/gerar-inventario-componentes.mjs saida.json      # grava no arquivo
 *
 * `commit` e `data_commit` vêm de `DS_COMMIT` / `DS_DATA_COMMIT` quando
 * definidos (no build da imagem Docker não há `.git`) e, sem eles, do git.
 * Falha se alguma marca sair sem componente — um inventário vazio faria o
 * gerador bloquear toda tela daquela marca.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { SECAO_PARA_MARCA, agoraIso, lerMarcas } from './lib/inventario-componentes.mjs';

const raiz = process.cwd();

function git(...args) {
  try {
    return execFileSync('git', ['-C', raiz, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

const pacote = JSON.parse(fs.readFileSync(path.join(raiz, 'package.json'), 'utf8'));
const { marcas, vazias } = lerMarcas(raiz);
if (!Object.keys(marcas).length) {
  console.error('nenhuma marca em src/ (pasta com index.ts) — rode da raiz do repositório');
  process.exit(1);
}
if (vazias.length) {
  console.error(`inventário sem componentes para: ${vazias.join(', ')}`);
  process.exit(1);
}

const dados = {
  commit: process.env.DS_COMMIT || git('rev-parse', '--short', 'HEAD') || null,
  data_commit: process.env.DS_DATA_COMMIT || git('log', '-1', '--format=%cs') || null,
  pacote: pacote.name,
  versao: pacote.version,
  sincronizado_em: agoraIso(),
  secao_para_marca: SECAO_PARA_MARCA,
  marcas,
};

const json = JSON.stringify(dados, null, 1);
const saida = process.argv[2];
const total = Object.values(marcas).reduce((s, v) => s + v.length, 0);
const resumo = Object.entries(marcas).map(([m, v]) => `${m}=${v.length}`).join(' ');
if (saida) {
  fs.mkdirSync(path.dirname(path.resolve(saida)), { recursive: true });
  fs.writeFileSync(saida, json);
  console.error(`ok → ${total} componentes em ${Object.keys(marcas).length} marcas (${resumo}), ${dados.pacote}@${dados.versao} ${dados.commit ?? '?'} → ${saida}`);
} else {
  process.stdout.write(json + '\n');
}
