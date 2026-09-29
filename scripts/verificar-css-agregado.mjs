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

/**
 * `fonts.css` não entra nas folhas de componente.
 *
 * A partir da 0.1.17 a fonte é **opt-in**: quem quiser a família embutida
 * importa `@unooria/design-system/fonts/<marca>.css`. Manter o `@font-face`
 * dentro de `styles-<marca>.css` obrigaria todo consumidor a recebê-lo, o que
 * conflita com o `next/font` — que faz preload e gera fallback com
 * `size-adjust`, coisas que um `@font-face` de biblioteca não tem como
 * oferecer. Ver a seção 4.6 do AGENTS.md.
 */
const FONTE = 'fonts.css';

/** Folhas publicadas e as seções que cada uma deve cobrir. */
const AGREGADOS = [
  { arquivo: 'styles.css', secoes: ['unooria', 'instanooria', 'chatgpt', 'whatsappmobile', 'tiktooria', 'unootube', 'unoochat', 'unoovista'], excluir: [FONTE] },
  { arquivo: 'styles-unooria.css', secoes: ['unooria'], excluir: [FONTE] },
  { arquivo: 'styles-instanooria.css', secoes: ['instanooria'], excluir: [FONTE] },
  { arquivo: 'styles-chatgpt.css', secoes: ['chatgpt'], excluir: [FONTE] },
  { arquivo: 'styles-whatsappmobile.css', secoes: ['whatsappmobile'], excluir: [FONTE] },
  { arquivo: 'styles-tiktooria.css', secoes: ['tiktooria'], excluir: [FONTE] },
  { arquivo: 'styles-unootube.css', secoes: ['unootube'], excluir: [FONTE] },
  { arquivo: 'styles-unoochat.css', secoes: ['unoochat'], excluir: [FONTE] },
  { arquivo: 'styles-unoovista.css', secoes: ['unoovista'], excluir: [FONTE] },

  /*
   * As folhas de fonte, do outro lado: cada uma cobre exatamente o `fonts.css`
   * da sua marca. O Instanooria não tem — usa SF Pro, fonte de sistema.
   */
  { arquivo: 'fonts-unooria.css', secoes: ['unooria'], apenas: [FONTE] },
  { arquivo: 'fonts-chatgpt.css', secoes: ['chatgpt'], apenas: [FONTE] },
  { arquivo: 'fonts-whatsappmobile.css', secoes: ['whatsappmobile'], apenas: [FONTE] },
  { arquivo: 'fonts-tiktooria.css', secoes: ['tiktooria'], apenas: [FONTE] },
  { arquivo: 'fonts-unootube.css', secoes: ['unootube'], apenas: [FONTE] },
  { arquivo: 'fonts-unoochat.css', secoes: ['unoochat'], apenas: [FONTE] },
  { arquivo: 'fonts-unoovista.css', secoes: ['unoovista'], apenas: [FONTE] },
];

/** Todo `*.css` de tokens e de componentes de uma seção, como caminho relativo. */
function cssDaSecao(secao, { apenas, excluir } = {}) {
  const achados = [];
  const querido = (nome) =>
    (!apenas || apenas.includes(nome)) && (!excluir || !excluir.includes(nome));

  const tokens = path.join(src, secao, 'tokens');
  if (fs.existsSync(tokens)) {
    for (const nome of fs.readdirSync(tokens).filter((n) => n.endsWith('.css'))) {
      if (querido(nome)) achados.push(`./${secao}/tokens/${nome}`);
    }
  }

  /* Uma folha de fonte cobre só o `fonts.css`: componente não entra nela. */
  if (apenas) return achados;

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

for (const { arquivo, secoes, apenas, excluir } of AGREGADOS) {
  const caminho = path.join(src, arquivo);
  if (!fs.existsSync(caminho)) {
    falhas.push(`${arquivo}: folha agregada não encontrada`);
    continue;
  }

  const conteudo = fs.readFileSync(caminho, 'utf8');
  for (const secao of secoes) {
    for (const relativo of cssDaSecao(secao, { apenas, excluir })) {
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
