/**
 * Guarda de paridade: todo literal do Unoovista que declara uma origem na
 * Plataforma Unooria precisa ser igual ao valor dessa origem.
 *
 * Por que isto existe: o Unoovista não consome `--unooria-*` em tempo de
 * execução — um módulo de marca nunca lê tokens de outro (AGENTS.md, 1.3) —,
 * então cada cor, tamanho de fonte e degrau de ícone é uma CÓPIA do literal da
 * plataforma, com o nome do token de origem num comentário. Uma cópia envelhece
 * em silêncio: se `brandpurple-600` mudar na plataforma, o Unoovista continuaria
 * com o valor antigo e ninguém veria. Este script reprova o build quando isso
 * acontece.
 *
 * A origem vem de um comentário, em uma de duas posições:
 *
 *   - no fim da própria linha:  `--unv-color-accent: #716C98; (origem)`
 *   - numa linha de comentário logo acima da declaração, entre parênteses:
 *     `(--unooria-size-body-s)`
 *
 * Roda no `build:package`, antes do tsup.
 */
import fs from 'node:fs';
import path from 'node:path';

const raiz = process.cwd();
const ler = (relativo) => fs.readFileSync(path.join(raiz, relativo), 'utf8');

const unooria = [
  'src/unooria/tokens/colors.css',
  'src/unooria/tokens/typography.css',
  'src/unooria/tokens/icons.css',
  'src/unooria/tokens/elevation.css',
]
  .map(ler)
  .join('\n');

/** Valor literal de `--unooria-*`, seguindo `var(--outro)` quando houver. */
function resolver(nome, vistos = new Set()) {
  if (vistos.has(nome)) throw new Error(`Ciclo de aliases em ${nome}`);
  vistos.add(nome);
  const achado = unooria.match(new RegExp(`${nome.replace(/-/g, '\\-')}:\\s*([^;]+);`));
  if (!achado) return null;
  const valor = achado[1].trim();
  const alias = valor.match(/^var\((--[\w-]+)/);
  return alias ? resolver(alias[1], vistos) : valor;
}

const normalizar = (valor) => valor.replace(/\s+/g, '').toUpperCase();
const ORIGEM = /--unooria-[\w-]+/;

const falhas = [];
let verificados = 0;

for (const arquivo of [
  'src/unoovista/tokens/colors.css',
  'src/unoovista/tokens/typography.css',
  'src/unoovista/tokens/spacing.css',
]) {
  let origemAcima = null;

  ler(arquivo)
    .split('\n')
    .forEach((linha, indice) => {
      const declaracao = linha.match(/^\s*(--unv-[\w-]+):\s*([^;]+);(.*)$/);

      if (!declaracao) {
        // Comentário de uma linha só que nomeia a origem da declaração seguinte.
        const acima = linha.match(/^\s*\/\*.*\((--unooria-[\w-]+)\)\s*\*\/\s*$/);
        origemAcima = acima ? acima[1] : null;
        return;
      }

      const [, nome, valor, resto] = declaracao;
      const origem = resto.match(ORIGEM)?.[0] ?? origemAcima;
      // Só a primeira declaração depois do comentário herda a origem.
      origemAcima = null;
      if (!origem) return;

      verificados += 1;
      const esperado = resolver(origem);

      if (esperado === null) {
        falhas.push(`${arquivo}:${indice + 1}: ${nome} cita ${origem}, que não existe na plataforma`);
      } else if (normalizar(valor) !== normalizar(esperado)) {
        falhas.push(
          `${arquivo}:${indice + 1}: ${nome} vale ${valor.trim()}, mas ${origem} vale ${esperado}`
        );
      }
    });
}

if (verificados === 0) {
  falhas.push('nenhum literal com origem foi encontrado — o formato dos comentários mudou?');
}

if (falhas.length > 0) {
  console.error('\n✗ Unoovista fora de paridade com a Plataforma Unooria:\n');
  for (const falha of falhas) console.error(`  ${falha}`);
  console.error(
    '\nAtualize o literal em src/unoovista/tokens/ (e o espelho .ts) ou corrija o comentário de origem.\n'
  );
  process.exit(1);
}

console.log(`✓ Paridade do Unoovista com a Plataforma Unooria (${verificados} literais verificados).`);
