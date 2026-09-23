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
 * A leitura é a mesma do script Python, de propósito — os dois precisam
 * produzir a mesma lista: parte de `src/<marca>/index.ts`, segue os
 * `export * from './...'` e recolhe os nomes em PascalCase declarados
 * (`export const|function|class`) ou reexportados por nome
 * (`export { A, B as C } from`), descartando `type`, `*Props` e `*Context`.
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

const raiz = process.cwd();
const MARCAS = ['unooria', 'instanooria', 'chatgpt', 'whatsappmobile', 'tiktooria', 'unootube'];
/** Nome da seção na esteira do gerador (`secao_ds`) → pasta da marca aqui. */
const SECAO_PARA_MARCA = { unitube: 'unootube' };

const RE_REEXPORTA = /export\s+\*\s+from\s+['"](\.[^'"]+)['"]/g;
const RE_NOMEADO = /export\s+\{([^}]+)\}\s+from/g;
const RE_DECLARA = /export\s+(?:const|function|class|default\s+function)\s+([A-Z][A-Za-z0-9]+)/g;
const RE_NOME = /^[A-Z][A-Za-z0-9]+$/;

/** `Path.with_suffix` do Python: troca a extensão do último segmento, se houver. */
function comSufixo(base, sufixo) {
  const nome = path.basename(base);
  const ponto = nome.lastIndexOf('.');
  const semExt = ponto > 0 && ponto < nome.length - 1 ? nome.slice(0, ponto) : nome;
  return path.join(path.dirname(base), semExt + sufixo);
}

function arquivo(base) {
  const candidatos = [
    comSufixo(base, '.ts'),
    comSufixo(base, '.tsx'),
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ];
  return candidatos.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null;
}

function exportados(caminho, vistos) {
  if (vistos.has(caminho)) return new Set();
  vistos.add(caminho);
  const texto = fs.readFileSync(caminho, 'utf8');
  const nomes = new Set([...texto.matchAll(RE_DECLARA)].map((m) => m[1]));
  for (const [, grupo] of texto.matchAll(RE_NOMEADO)) {
    for (const item of grupo.split(',')) {
      const nome = item.split(' as ').pop().trim();
      if (RE_NOME.test(nome) && !item.trim().startsWith('type ')) nomes.add(nome);
    }
  }
  for (const [, rel] of texto.matchAll(RE_REEXPORTA)) {
    const alvo = arquivo(path.resolve(path.dirname(caminho), rel));
    if (alvo) for (const n of exportados(alvo, vistos)) nomes.add(n);
  }
  return nomes;
}

function git(...args) {
  try {
    return execFileSync('git', ['-C', raiz, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

const pacote = JSON.parse(fs.readFileSync(path.join(raiz, 'package.json'), 'utf8'));
const marcas = {};
for (const marca of MARCAS) {
  const entrada = arquivo(path.join(raiz, 'src', marca));
  if (!entrada) continue;
  marcas[marca] = [...exportados(entrada, new Set())]
    .filter((n) => !n.endsWith('Props') && !n.endsWith('Context'))
    .sort();
}

const vazias = MARCAS.filter((m) => !marcas[m]?.length);
if (vazias.length) {
  console.error(`inventário sem componentes para: ${vazias.join(', ')}`);
  process.exit(1);
}

const dados = {
  commit: process.env.DS_COMMIT || git('rev-parse', '--short', 'HEAD') || null,
  data_commit: process.env.DS_DATA_COMMIT || git('log', '-1', '--format=%cs') || null,
  pacote: pacote.name,
  versao: pacote.version,
  sincronizado_em: new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00'),
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
