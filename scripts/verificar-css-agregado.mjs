/**
 * Guarda de empacotamento: todo CSS de token e de componente precisa estar
 * importado nas folhas agregadas que o pacote publica.
 *
 * Por que isto existe: as listas de `@import` são escritas à mão, e entre a
 * 0.1.5 e a 0.1.6 dezenove componentes entraram no `src/` sem entrar no
 * `styles.css`. O JS deles era publicado, o CSS não — `ProgressBar`, `Stepper`,
 * `Tag`, `Logo`, `Table` e companhia chegavam ao consumidor **sem estilo**, e
 * nada no build acusava. O CSS existia em `dist/index.css` (montado a partir
 * dos `import './X.css'` do JS), mas esse arquivo não está no `exports` do
 * package.json, então ninguém conseguia importá-lo.
 *
 * Roda no `build:package`. Se faltar um import, o build falha aqui.
 */
import fs from 'node:fs';
import path from 'node:path';

const raiz = process.cwd();
const src = path.join(raiz, 'src');

/** Folhas publicadas e as seções que cada uma deve cobrir. */
const AGREGADOS = [
  { arquivo: 'styles.css', secoes: ['unooria', 'instanooria', 'chatgpt', 'whatsappmobile', 'tiktooria', 'unitube'] },
  { arquivo: 'styles-unooria.css', secoes: ['unooria'] },
  { arquivo: 'styles-instanooria.css', secoes: ['instanooria'] },
  { arquivo: 'styles-chatgpt.css', secoes: ['chatgpt'] },
  { arquivo: 'styles-whatsappmobile.css', secoes: ['whatsappmobile'] },
  { arquivo: 'styles-tiktooria.css', secoes: ['tiktooria'] },
  { arquivo: 'styles-unitube.css', secoes: ['unitube'] },
];

/** Todo `*.css` de tokens e de componentes de uma seção, como caminho relativo. */
function cssDaSecao(secao) {
  const achados = [];

  const tokens = path.join(src, secao, 'tokens');
  if (fs.existsSync(tokens)) {
    for (const nome of fs.readdirSync(tokens).filter((n) => n.endsWith('.css'))) {
      achados.push(`./${secao}/tokens/${nome}`);
    }
  }

  const componentes = path.join(src, secao, 'components');
  if (fs.existsSync(componentes)) {
    for (const pasta of fs.readdirSync(componentes)) {
      const dir = path.join(componentes, pasta);
      if (!fs.statSync(dir).isDirectory()) continue;
      for (const nome of fs.readdirSync(dir).filter((n) => n.endsWith('.css'))) {
        achados.push(`./${secao}/components/${pasta}/${nome}`);
      }
    }
  }

  return achados;
}

const falhas = [];

for (const { arquivo, secoes } of AGREGADOS) {
  const caminho = path.join(src, arquivo);
  if (!fs.existsSync(caminho)) {
    falhas.push(`${arquivo}: folha agregada não encontrada`);
    continue;
  }

  const conteudo = fs.readFileSync(caminho, 'utf8');
  for (const secao of secoes) {
    for (const relativo of cssDaSecao(secao)) {
      if (!conteudo.includes(relativo)) {
        falhas.push(`${arquivo}: falta @import '${relativo}'`);
      }
    }
  }
}

if (falhas.length > 0) {
  console.error('\n✗ CSS fora das folhas agregadas — o pacote publicaria componentes sem estilo:\n');
  for (const falha of falhas) console.error(`  ${falha}`);
  console.error('\nAdicione os @import faltantes em src/styles*.css e rode de novo.\n');
  process.exit(1);
}

const total = AGREGADOS.flatMap(({ secoes }) => secoes.flatMap(cssDaSecao)).length;
console.log(`✓ CSS agregado completo (${total} arquivos verificados nas ${AGREGADOS.length} folhas).`);
