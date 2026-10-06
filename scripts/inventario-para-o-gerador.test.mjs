/**
 * Testes do inventário que o gerador de missões lê.
 *
 *     node --test scripts/inventario-para-o-gerador.test.mjs
 *
 * O que precisa ficar provado: TODA pasta de `src/` com index entra (a lista
 * fixa de marcas foi o defeito que motivou este script), as marcas novas têm
 * componentes, tipos não entram, e o layout gravado é o do contrato.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { descobrirMarcas, lerMarcas } from './lib/inventario-componentes.mjs';
import { gravarInventario, montarInventario } from './inventario-para-o-gerador.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function pastaTemporaria() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ds-inventario-teste-'));
}

/** Escreve uma árvore `{ 'caminho/relativo': 'conteúdo' }` dentro de `raiz`. */
function escrever(raiz, arvore) {
  for (const [rel, conteudo] of Object.entries(arvore)) {
    const destino = path.join(raiz, rel);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, conteudo);
  }
}

test('toda pasta de src/ com index.ts(x) vira marca, sem lista fixa', () => {
  const esperadas = fs
    .readdirSync(path.join(RAIZ, 'src'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((n) => fs.existsSync(path.join(RAIZ, 'src', n, 'index.ts')) || fs.existsSync(path.join(RAIZ, 'src', n, 'index.tsx')))
    .sort();
  assert.ok(esperadas.length > 0);
  assert.deepEqual(descobrirMarcas(RAIZ), esperadas);
  assert.deepEqual(Object.keys(lerMarcas(RAIZ).marcas), esperadas);
  // `src/fonts` não tem index: não é marca.
  assert.ok(!esperadas.includes('fonts'));
});

test('as marcas que a lista fixa deixava de fora têm componentes', () => {
  const { marcas } = lerMarcas(RAIZ);
  for (const marca of ['unooriaai', 'unoovista', 'unoochat', 'unoojornal', 'unooblog', 'unoogaleria']) {
    assert.ok(marcas[marca]?.length > 0, `${marca} sem componentes`);
  }
});

test('nenhum nome *Props ou *Context entra no inventário do repositório', () => {
  const { marcas } = lerMarcas(RAIZ);
  for (const [marca, nomes] of Object.entries(marcas)) {
    for (const nome of nomes) {
      assert.ok(!nome.endsWith('Props') && !nome.endsWith('Context'), `${marca}: ${nome}`);
    }
  }
});

test('exportação de tipo não entra; reexportação recursiva sim', () => {
  const raiz = pastaTemporaria();
  try {
    escrever(raiz, {
      'src/marca/index.ts': [
        "export * from './components';",
        "export type { SoTipo } from './tipos';",
        "export { type TipoInline, Valor, Interno as Renomeado } from './valores';",
        "export { BotaoProps, TemaContext } from './valores';",
        'export type Alias = string;',
        'export interface Interface { a: string }',
      ].join('\n'),
      'src/marca/components/index.ts': "export * from './Botao';\n",
      'src/marca/components/Botao/index.ts': [
        'export const Botao = () => null;',
        'export function Cartao() { return null; }',
        'export class Painel {}',
        'export const minusculo = 1;',
      ].join('\n'),
    });
    const { marcas } = lerMarcas(raiz);
    assert.deepEqual(marcas.marca, ['Botao', 'Cartao', 'Painel', 'Renomeado', 'Valor']);
  } finally {
    fs.rmSync(raiz, { recursive: true, force: true });
  }
});

test('marca sem componente é aviso (lista vazia); nenhuma marca é erro', () => {
  const raiz = pastaTemporaria();
  try {
    escrever(raiz, {
      'package.json': JSON.stringify({ name: '@unooria/design-system', version: '9.9.9' }),
      'src/cheia/index.tsx': 'export const Coisa = () => null;\n',
      'src/vazia/index.ts': 'export type { SoTipo } from "./tipos";\n',
      'src/sem-index/qualquer.ts': 'export const Nada = 1;\n',
    });
    const origem = { commit: 'abc1234', dataCommit: '2026-10-06', agora: '2026-10-06T18:00:00+00:00' };
    const inventario = montarInventario(raiz, origem);
    assert.deepEqual(inventario.componentes.marcas, { cheia: ['Coisa'], vazia: [] });
    assert.deepEqual(inventario.vazias, ['vazia']);

    fs.rmSync(path.join(raiz, 'src', 'cheia'), { recursive: true });
    fs.rmSync(path.join(raiz, 'src', 'vazia'), { recursive: true });
    assert.throws(() => montarInventario(raiz, origem), /nenhuma marca/);
  } finally {
    fs.rmSync(raiz, { recursive: true, force: true });
  }
});

test('grava o layout e o formato do contrato', () => {
  const saida = pastaTemporaria();
  try {
    const versao = JSON.parse(fs.readFileSync(path.join(RAIZ, 'package.json'), 'utf8')).version;
    const inventario = montarInventario(RAIZ, { commit: 'abc1234', dataCommit: '2026-10-06', agora: '2026-10-06T18:00:00+00:00' });
    gravarInventario(saida, inventario);

    const componentes = JSON.parse(fs.readFileSync(path.join(saida, 'design-system', versao, 'ds-componentes.json'), 'utf8'));
    assert.deepEqual(Object.keys(componentes), ['commit', 'data_commit', 'pacote', 'versao', 'sincronizado_em', 'secao_para_marca', 'marcas']);
    assert.equal(componentes.pacote, '@unooria/design-system');
    assert.equal(componentes.versao, versao);
    assert.equal(componentes.commit, 'abc1234');
    assert.deepEqual(componentes.secao_para_marca, { unitube: 'unootube' });

    const atual = JSON.parse(fs.readFileSync(path.join(saida, 'design-system', 'atual.json'), 'utf8'));
    assert.deepEqual(atual, {
      versao_formato: 1,
      versao,
      commit: 'abc1234',
      data_commit: '2026-10-06',
      gerado_em: '2026-10-06T18:00:00+00:00',
      pasta: `design-system/${versao}/`,
    });
  } finally {
    fs.rmSync(saida, { recursive: true, force: true });
  }
});
