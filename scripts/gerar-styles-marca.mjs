/**
 * Gera `src/styles-<marca>.css` e o bloco da marca em `src/styles.css`,
 * varrendo `src/<marca>/components/*\/*.css`.
 *
 * Uso: `node scripts/gerar-styles-marca.mjs <modulo> <prefixo> <Nome>`
 *      `node scripts/gerar-styles-marca.mjs unoojornal ujn Unoojornal`
 *
 * O bloco de `styles.css` fica entre os marcadores "<NOME> — início (gerado)" e
 * "<NOME> — fim"; rodar de novo o regrava no lugar. O `fonts.css` nunca entra
 * (a fonte é opt-in, AGENTS.md 4.6). `scripts/verificar-css-agregado.mjs`
 * confere que nenhum CSS ficou de fora.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [modulo, prefixo, nome] = process.argv.slice(2);
if (!modulo || !prefixo || !nome) {
  console.error('uso: node scripts/gerar-styles-marca.mjs <modulo> <prefixo> <Nome>');
  process.exit(1);
}

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(raiz, 'src');
const componentes = path.join(src, modulo, 'components');

const css = [];
for (const pasta of fs.readdirSync(componentes).sort()) {
  const dir = path.join(componentes, pasta);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const arquivo of fs.readdirSync(dir).sort()) {
    if (arquivo.endsWith('.css')) css.push(`./${modulo}/components/${pasta}/${arquivo}`);
  }
}

const tokens = ['typography', 'colors', 'spacing'].map((t) => `./${modulo}/tokens/${t}.css`);
for (const t of tokens) {
  if (!fs.existsSync(path.join(src, t))) throw new Error(`token ausente: ${t}`);
}

const blocoTokens = `/* ----------------------------------------------------
 * Tokens de Fundação (${nome})
 * ---------------------------------------------------- */
${tokens.map((t) => `@import '${t}';`).join('\n')}
`;
const blocoComponentes = `
/* ----------------------------------------------------
 * Estilos dos Componentes (${nome})
 * ---------------------------------------------------- */
${css.map((c) => `@import '${c}';`).join('\n')}
`;

const cabecalho = `/**
 * Folha de estilos do Design System ${nome}.
 *
 * Importe este arquivo para registrar os tokens \`--${prefixo}-*\` e os estilos dos
 * componentes do módulo \`src/${modulo}/\`.
 *
 * FONTES: esta folha **não** declara \`@font-face\`. Os componentes só citam
 * \`var(--${prefixo}-font-sans)\`, com pilha de fallback. A família é opt-in:
 *
 *     import '@unooria/design-system/fonts/${modulo}.css';
 *
 * É explícito de propósito — um app que resolva a tipografia por \`next/font\`
 * não escreve essa linha. Ver a seção 4.6 do AGENTS.md. Os ícones são fonte de
 * ligadura: sem a folha de fonte (ou o Material Symbols do próprio app), o nome
 * do ícone aparece como texto.
 */

`;
fs.writeFileSync(path.join(src, `styles-${modulo}.css`), cabecalho + blocoTokens + blocoComponentes);

const caminho = path.join(src, 'styles.css');
let agregada = fs.readFileSync(caminho, 'utf8');
const NOME = nome.toUpperCase();
const INI = `/* ====================================================\n * ${NOME} — início (gerado)\n * ==================================================== */\n`;
const FIM = `/* ${NOME} — fim */\n`;
const secao = INI + blocoTokens + blocoComponentes + FIM;
if (agregada.includes(INI)) {
  const de = agregada.indexOf(INI);
  const ate = agregada.indexOf(FIM, de) + FIM.length;
  agregada = agregada.slice(0, de) + secao + agregada.slice(ate);
} else {
  agregada = agregada.replace(/\n*$/, '\n\n') + secao;
}
fs.writeFileSync(caminho, agregada);
console.log(`${css.length} folhas de componente em ${modulo}`);
