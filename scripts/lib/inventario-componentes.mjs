/**
 * Leitura dos componentes públicos de cada marca do DS — a regra que o
 * gerador de missões usa para conferir os nomes "do DS" que os agentes dele
 * escrevem.
 *
 * Dois scripts consomem isto e precisam produzir a MESMA lista:
 * - `gerar-inventario-componentes.mjs` grava `/ds-componentes.json` ao lado
 *   do Storybook (imagem do Cloud Run);
 * - `inventario-para-o-gerador.mjs` grava a mesma coisa no bucket que o
 *   gerador lê, a cada versão publicada no npm.
 *
 * Marcas = TODA pasta `src/<marca>/` com `index.ts(x)`. Nada de lista fixa: a
 * lista fixa do script original (no repositório do gerador) foi o que deixou
 * unooriaai, unoovista, unoochat, unoojornal, unooblog e unoogaleria fora do
 * inventário — a marca existia no pacote e o gerador recusava toda tela dela.
 *
 * A leitura é o porte do `scripts/sincronizar_design_system.py` do gerador:
 * parte de `src/<marca>/index.ts`, segue os `export * from './...'` e recolhe
 * os nomes em PascalCase declarados (`export const|function|class`) ou
 * reexportados por nome (`export { A, B as C } from`), descartando `type`,
 * `*Props` e `*Context`.
 */
import fs from 'node:fs';
import path from 'node:path';

/** Nome da seção na esteira do gerador (`secao_ds`) → pasta da marca aqui. */
export const SECAO_PARA_MARCA = { unitube: 'unootube' };

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

/** O arquivo que um especificador relativo resolve, na ordem do script Python. */
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

/** Toda pasta de `src/` que tem `index.ts` ou `index.tsx`, em ordem alfabética. */
export function descobrirMarcas(raiz) {
  const src = path.join(raiz, 'src');
  if (!fs.existsSync(src)) return [];
  return fs
    .readdirSync(src, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((nome) => ['index.ts', 'index.tsx'].some((f) => fs.existsSync(path.join(src, nome, f))))
    .sort();
}

/** Nomes públicos da marca, ordenados, sem `*Props`/`*Context`. */
export function componentesDaMarca(raiz, marca) {
  const entrada = arquivo(path.join(raiz, 'src', marca));
  if (!entrada) return [];
  return [...exportados(entrada, new Set())]
    .filter((n) => !n.endsWith('Props') && !n.endsWith('Context'))
    .sort();
}

/**
 * `{ marcas, vazias }`: o inventário de todas as marcas descobertas e quais
 * delas saíram sem componente nenhum (quem chama decide se isso é erro).
 */
export function lerMarcas(raiz) {
  const marcas = {};
  for (const marca of descobrirMarcas(raiz)) marcas[marca] = componentesDaMarca(raiz, marca);
  const vazias = Object.keys(marcas).filter((m) => marcas[m].length === 0);
  return { marcas, vazias };
}

/** ISO 8601 em UTC sem milissegundos e com `+00:00`, como o `isoformat` do Python. */
export function agoraIso(data = new Date()) {
  return data.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}
