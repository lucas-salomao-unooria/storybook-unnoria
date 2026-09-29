/**
 * Vetores do logotipo do Design System UnooriaAI.
 *
 * Marca ORIGINAL da Plataforma Unooria, montada como a da própria plataforma:
 * **o símbolo é o “oo” da palavra** — “Un” + símbolo + “ria” + “AI”.
 *
 * 1. **Símbolo** — o isótipo oficial da Unooria: um anel espesso em forma de
 *    amendoim, com um único miolo. A fonte da verdade é o PNG
 *    `public/brand/unooria_symbol_navy_fill.png` (o mesmo que o `LogoSymbol` da
 *    plataforma renderiza); o caminho vetorial foi **traçado desse PNG** com o
 *    `potrace` (2 subcaminhos, nenhum canto; `alphamax` 1,0, tolerância 0,2), sobre
 *    a máscara alfa da caixa de tinta de 975 × 479 px, normalizado para
 *    largura 100. Medido: renderizado no Chromium na resolução do PNG, o vetor
 *    coincide com ele em IoU 0,9962. O caminho é copiado como literal do
 *    módulo Unoovista (um módulo de marca nunca lê tokens de outro, mas copiar
 *    um literal não viola essa regra, como as cores). `viewBox` do símbolo
 *    isolado: `0 0 100 49.13`, preenchimento `evenodd`.
 * 2. **Logotipo tipográfico** — “UnooriaAI” contornado da família da marca
 *    (Open Sans Bold, `--uai-font-weight-bold`, o `.woff2` embutido em
 *    `src/fonts/open-sans/`). Técnica, aplicada uma única vez por glifo, sem
 *    nenhuma coordenada redesenhada à mão:
 *      a. o eixo `wght` da fonte variável foi fixado em 700 pelo
 *         módulo `instancer` do fontTools;
 *      b. o texto “UnooriaAI” foi posicionado com o HarfBuzz (`uharfbuzz`), com
 *         `kern` ligado e ligaduras desligadas, e sem tracking — coerente com o
 *         `letter-spacing` zero de toda a escala tipográfica do módulo;
 *      c. cada contorno foi lido do `glyf` e transformado por
 *         `(x, y) → (x·s + tx, −y·s + 21)`, com `s = 25 / 2048` (corpo de
 *         25px sobre `unitsPerEm` 2048: altura de maiúscula de 17.847px e
 *         altura de x de 13.904px), inversão do eixo Y e translação até a
 *         linha de base em `y = 21`; `tx` acumula os avanços do HarfBuzz, com a
 *         tinta do “U” começando em `x = 0`;
 *      d. no lockup, os dois “o” **não** são desenhados: o símbolo ocupa o lugar
 *         deles. Ele tem a altura de tinta do “o” (14.148px, do topo do arco à
 *         base) e a proporção do PNG, portanto 28.797px de largura contra os
 *         28.711px que os dois “o” ocupavam — “ria” e “AI” foram deslocados 0.086px
 *         na própria transformação do passo c, e o símbolo é posto por
 *         `translate(34.326 7.096) scale(0.28797)`;
 *      e. o contorno se divide em dois caminhos, para que a cor os distinga:
 *         “Un”/“ria” (tinta do texto) e “AI” (tinta de destaque, a mesma do símbolo).
 *    É PROIBIDO reescrever como `<text>`: o fallback de fonte deformaria a
 *    marca. Para regerar, repita as etapas a a e com outra `SRC` e atualize este bloco.
 *
 * `viewBox` do lockup: `0 0 121.61 24`; do logotipo tipográfico isolado
 * (com os dois “o” desenhados): `0 0 121.52 24`. O componente deriva a
 * largura do `viewBox`, de modo que quem informa só `height` acompanha a proporção.
 */

/** `viewBox` do lockup completo (“Un” + símbolo + “ria” + “AI”). */
export const uaiLogoViewBox = '0 0 121.61 24';

/** Largura nominal do lockup no `viewBox`. */
export const uaiLogoWidth = 121.61;

/** Altura nominal do lockup no `viewBox`. */
export const uaiLogoHeight = 24;

/**
 * Contornos de “Un” e “ria” em Open Sans Bold — um único caminho com um
 * subcaminho por contorno de letra (o preenchimento é `nonzero`, como na fonte).
 * Os dois “o” não estão aqui: o símbolo os substitui.
 */
export const uaiLogoPath =
  'M14.65 3.15V14.7Q14.65 16.54 13.84 18.03Q13.02 19.51 11.38 20.38Q9.74 21.24 7.25 21.24Q3.71 21.24 1.86 19.44Q0 17.63 0 14.65V3.15H3.77V14.08Q3.77 16.29 4.68 17.18Q5.58 18.07 7.35 18.07Q8.59 18.07 9.37 17.64Q10.14 17.22 10.51 16.32Q10.88 15.43 10.88 14.05V3.15Z M26.48 7.1Q28.66 7.1 29.99 8.29Q31.32 9.48 31.32 12.1V21H27.6V13.03Q27.6 11.56 27.07 10.82Q26.54 10.07 25.4 10.07Q23.69 10.07 23.07 11.23Q22.45 12.39 22.45 14.58V21H18.73V7.35H21.57L22.07 9.1H22.28Q22.72 8.39 23.37 7.95Q24.02 7.51 24.82 7.3Q25.62 7.1 26.48 7.1Z M73.82 7.1Q74.1 7.1 74.47 7.13Q74.84 7.16 75.07 7.21L74.79 10.7Q74.61 10.64 74.27 10.61Q73.94 10.58 73.69 10.58Q72.97 10.58 72.3 10.76Q71.62 10.94 71.08 11.35Q70.55 11.76 70.23 12.42Q69.92 13.09 69.92 14.05V21H66.2V7.35H69.02L69.57 9.65H69.75Q70.15 8.95 70.76 8.37Q71.36 7.79 72.14 7.44Q72.91 7.1 73.82 7.1Z M81.27 7.35V21H77.55V7.35ZM79.42 2.01Q80.25 2.01 80.85 2.39Q81.45 2.77 81.45 3.82Q81.45 4.86 80.85 5.26Q80.25 5.66 79.42 5.66Q78.58 5.66 77.99 5.26Q77.39 4.86 77.39 3.82Q77.39 2.77 77.99 2.39Q78.58 2.01 79.42 2.01Z M90.77 7.07Q93.52 7.07 94.98 8.27Q96.45 9.46 96.45 11.91V21H93.85L93.13 19.14H93.03Q92.44 19.88 91.83 20.34Q91.22 20.8 90.43 21.02Q89.64 21.24 88.5 21.24Q87.29 21.24 86.33 20.78Q85.38 20.32 84.83 19.36Q84.28 18.4 84.28 16.92Q84.28 14.75 85.8 13.72Q87.33 12.69 90.38 12.58L92.75 12.5V11.91Q92.75 10.83 92.19 10.33Q91.63 9.83 90.63 9.83Q89.64 9.83 88.68 10.11Q87.73 10.39 86.78 10.82L85.55 8.3Q86.63 7.73 87.98 7.4Q89.33 7.07 90.77 7.07ZM92.75 14.68 91.31 14.73Q89.5 14.77 88.8 15.37Q88.1 15.97 88.1 16.95Q88.1 17.8 88.6 18.16Q89.1 18.52 89.91 18.52Q91.1 18.52 91.93 17.81Q92.75 17.11 92.75 15.8Z';

/** Contornos de “AI” no lockup, em caminho próprio para receber a tinta de destaque. */
export const uaiLogoAiPath =
  'M111.5 21 110.21 16.75H103.7L102.41 21H98.33L104.63 3.08H109.25L115.58 21ZM109.3 13.58 108.01 9.43Q107.89 9.01 107.68 8.36Q107.48 7.71 107.28 7.03Q107.08 6.35 106.96 5.85Q106.84 6.35 106.62 7.09Q106.41 7.83 106.21 8.49Q106.02 9.15 105.93 9.43L104.65 13.58Z M117.82 21V3.15H121.61V21Z';

/**
 * Símbolo da Unooria, traçado do PNG oficial. `viewBox` 0 0 100 49.13;
 * preenchimento `evenodd`.
 */
export const uaiLogoSymbolPath =
  'M21.33 49.02C16.94 48.48 12.98 46.86 9.38 44.12C8.45 43.41 6.33 41.3 5.45 40.21C2.99 37.16 1.22 33.34 0.47 29.46C0.08 27.42 -0.04 25.93 0.03 23.74C0.13 20.75 0.57 18.43 1.55 15.81C2.9 12.2 4.8 9.31 7.6 6.62C9.48 4.8 11.2 3.59 13.59 2.41C16.04 1.19 18.71 0.42 21.53 0.1C22.91 -0.06 26.39 0.03 27.69 0.25C31.27 0.86 33.36 1.73 38.05 4.52C42.51 7.17 44.89 8.3 47.28 8.9C48.23 9.14 48.57 9.17 50.1 9.17C52.26 9.18 52.76 9.06 55.48 7.88C58.29 6.67 60 5.75 62.41 4.16C65.57 2.07 68.66 0.87 72.46 0.24C74.06 -0.02 77.83 -0.02 79.49 0.24C84.46 1.03 88.77 3.19 92.4 6.71C94.6 8.85 95.99 10.75 97.32 13.44C100.78 20.39 100.78 28.72 97.34 35.65C95.99 38.38 94.62 40.26 92.4 42.42C88.9 45.83 84.72 47.96 79.85 48.83C78.29 49.11 75.18 49.21 73.52 49.03C69.97 48.67 66.38 47.42 63.35 45.51C56.94 41.48 53.73 40.1 50.31 39.93C48.99 39.87 47.49 40.06 46.33 40.45C45.33 40.79 41.98 42.32 40.68 43.04C39.72 43.57 39.14 43.93 36.82 45.41C34.29 47.03 31.04 48.27 27.85 48.83C26.45 49.08 22.68 49.19 21.33 49.02ZM26.56 37.84C28.59 37.44 29.89 36.86 32.25 35.33C35.04 33.52 37.37 32.29 40.67 30.89C44.31 29.35 46.64 28.82 49.79 28.82C55.03 28.82 59.46 30.43 67.6 35.26C70.85 37.19 71.49 37.48 73.49 37.9C74.63 38.15 77.08 38.16 78.28 37.92C82.9 37 86.68 33.77 88.3 29.35C88.93 27.65 89.08 26.7 89.07 24.51C89.07 22.66 89.05 22.43 88.79 21.41C88.05 18.54 86.85 16.45 84.88 14.59C82.39 12.23 79.47 11.08 76.01 11.08C73.22 11.08 70.65 11.84 68.36 13.34C64.06 16.16 61.01 17.74 57.67 18.87C54.67 19.9 52.67 20.25 49.79 20.25C46.66 20.25 44.69 19.85 41.41 18.55C38.98 17.58 35.29 15.73 33.54 14.6C30.29 12.51 29.57 12.13 27.85 11.62C25.3 10.87 22.35 10.89 19.87 11.69C15.99 12.94 12.76 16.22 11.44 20.25C10.96 21.72 10.83 22.68 10.82 24.62C10.82 26.13 10.86 26.58 11.06 27.49C11.82 30.92 13.89 34 16.67 35.84C19.72 37.87 23.07 38.55 26.56 37.84Z';

/** `viewBox` do símbolo isolado (`variant="mark"`). */
export const uaiLogoMarkViewBox = '0 0 100 49.13';

/** Largura do símbolo isolado no `viewBox`. */
export const uaiLogoMarkWidth = 100;

/** Altura do símbolo isolado no `viewBox`. */
export const uaiLogoMarkHeight = 49.13;

/** Posição e escala do símbolo dentro do lockup (no lugar dos dois “o”). */
export const uaiLogoSymbolLockupTransform = 'translate(34.326 7.096) scale(0.28797)';

/** `viewBox` do logotipo tipográfico isolado (`variant="wordmark"`), com os dois “o” desenhados. */
export const uaiLogoWordmarkViewBox = '0 0 121.52 24';

/** Largura nominal do logotipo tipográfico isolado. */
export const uaiLogoWordmarkWidth = 121.52;

/** Altura nominal do logotipo tipográfico isolado. */
export const uaiLogoWordmarkHeight = 24;

/** Contornos de “Unooria” (com os dois “o”) em Open Sans Bold. */
export const uaiLogoWordmarkPath =
  'M14.65 3.15V14.7Q14.65 16.54 13.84 18.03Q13.02 19.51 11.38 20.38Q9.74 21.24 7.25 21.24Q3.71 21.24 1.86 19.44Q0 17.63 0 14.65V3.15H3.77V14.08Q3.77 16.29 4.68 17.18Q5.58 18.07 7.35 18.07Q8.59 18.07 9.37 17.64Q10.14 17.22 10.51 16.32Q10.88 15.43 10.88 14.05V3.15Z M26.48 7.1Q28.66 7.1 29.99 8.29Q31.32 9.48 31.32 12.1V21H27.6V13.03Q27.6 11.56 27.07 10.82Q26.54 10.07 25.4 10.07Q23.69 10.07 23.07 11.23Q22.45 12.39 22.45 14.58V21H18.73V7.35H21.57L22.07 9.1H22.28Q22.72 8.39 23.37 7.95Q24.02 7.51 24.82 7.3Q25.62 7.1 26.48 7.1Z M47.56 14.15Q47.56 15.86 47.1 17.18Q46.64 18.5 45.77 19.41Q44.9 20.32 43.67 20.78Q42.44 21.24 40.91 21.24Q39.47 21.24 38.26 20.78Q37.06 20.32 36.18 19.41Q35.29 18.5 34.81 17.18Q34.33 15.86 34.33 14.15Q34.33 11.88 35.13 10.31Q35.94 8.73 37.43 7.91Q38.92 7.1 40.98 7.1Q42.9 7.1 44.38 7.91Q45.86 8.73 46.71 10.31Q47.56 11.88 47.56 14.15ZM38.12 14.15Q38.12 15.49 38.42 16.41Q38.71 17.33 39.33 17.79Q39.95 18.25 40.95 18.25Q41.94 18.25 42.56 17.79Q43.18 17.33 43.46 16.41Q43.75 15.49 43.75 14.15Q43.75 12.8 43.46 11.9Q43.18 11 42.55 10.55Q41.93 10.1 40.93 10.1Q39.45 10.1 38.79 11.11Q38.12 12.13 38.12 14.15Z M63.04 14.15Q63.04 15.86 62.58 17.18Q62.12 18.5 61.25 19.41Q60.38 20.32 59.15 20.78Q57.92 21.24 56.38 21.24Q54.94 21.24 53.74 20.78Q52.54 20.32 51.65 19.41Q50.77 18.5 50.29 17.18Q49.8 15.86 49.8 14.15Q49.8 11.88 50.61 10.31Q51.42 8.73 52.91 7.91Q54.39 7.1 56.46 7.1Q58.37 7.1 59.86 7.91Q61.34 8.73 62.19 10.31Q63.04 11.88 63.04 14.15ZM53.6 14.15Q53.6 15.49 53.89 16.41Q54.19 17.33 54.81 17.79Q55.43 18.25 56.43 18.25Q57.42 18.25 58.04 17.79Q58.65 17.33 58.94 16.41Q59.23 15.49 59.23 14.15Q59.23 12.8 58.94 11.9Q58.65 11 58.03 10.55Q57.41 10.1 56.41 10.1Q54.93 10.1 54.27 11.11Q53.6 12.13 53.6 14.15Z M73.73 7.1Q74.01 7.1 74.38 7.13Q74.76 7.16 74.99 7.21L74.71 10.7Q74.52 10.64 74.19 10.61Q73.85 10.58 73.61 10.58Q72.89 10.58 72.21 10.76Q71.53 10.94 71 11.35Q70.46 11.76 70.15 12.42Q69.84 13.09 69.84 14.05V21H66.11V7.35H68.93L69.48 9.65H69.67Q70.07 8.95 70.67 8.37Q71.28 7.79 72.05 7.44Q72.83 7.1 73.73 7.1Z M81.19 7.35V21H77.47V7.35ZM79.33 2.01Q80.16 2.01 80.76 2.39Q81.36 2.77 81.36 3.82Q81.36 4.86 80.76 5.26Q80.16 5.66 79.33 5.66Q78.49 5.66 77.9 5.26Q77.31 4.86 77.31 3.82Q77.31 2.77 77.9 2.39Q78.49 2.01 79.33 2.01Z M90.69 7.07Q93.43 7.07 94.9 8.27Q96.36 9.46 96.36 11.91V21H93.76L93.04 19.14H92.94Q92.36 19.88 91.75 20.34Q91.14 20.8 90.34 21.02Q89.55 21.24 88.42 21.24Q87.21 21.24 86.25 20.78Q85.29 20.32 84.74 19.36Q84.19 18.4 84.19 16.92Q84.19 14.75 85.72 13.72Q87.24 12.69 90.3 12.58L92.66 12.5V11.91Q92.66 10.83 92.1 10.33Q91.54 9.83 90.54 9.83Q89.55 9.83 88.6 10.11Q87.65 10.39 86.69 10.82L85.46 8.3Q86.55 7.73 87.9 7.4Q89.25 7.07 90.69 7.07ZM92.66 14.68 91.22 14.73Q89.42 14.77 88.71 15.37Q88.01 15.97 88.01 16.95Q88.01 17.8 88.51 18.16Q89.01 18.52 89.82 18.52Q91.02 18.52 91.84 17.81Q92.66 17.11 92.66 15.8Z';

/** Contornos de “AI” do logotipo tipográfico isolado. */
export const uaiLogoWordmarkAiPath =
  'M111.41 21 110.12 16.75H103.61L102.32 21H98.24L104.54 3.08H109.17L115.49 21ZM109.22 13.58 107.92 9.43Q107.8 9.01 107.6 8.36Q107.4 7.71 107.2 7.03Q106.99 6.35 106.87 5.85Q106.75 6.35 106.54 7.09Q106.32 7.83 106.13 8.49Q105.93 9.15 105.85 9.43L104.57 13.58Z M117.74 21V3.15H121.52V21Z';
