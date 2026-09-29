/**
 * Vetores do logotipo do Design System Unoovista.
 *
 * A marca é montada como a da Plataforma Unooria: **o símbolo é o "oo" da
 * palavra** — “Un” + símbolo + “vista”.
 *
 * 1. **Símbolo** — o isótipo oficial da Unooria: um anel espesso em forma de
 *    amendoim, com um único miolo. A fonte da verdade é o PNG
 *    `public/brand/unooria_symbol_navy_fill.png` (o mesmo que o `LogoSymbol` da
 *    plataforma renderiza); o caminho vetorial foi **traçado desse PNG** com o
 *    `potrace` (2 subcaminhos, nenhum canto; `alphamax` 1,0, tolerância 0,2), sobre
 *    a máscara alfa da caixa de tinta de 975 × 479 px, normalizado para
 *    largura 100. Medido: renderizado no Chromium na resolução do PNG, o vetor
 *    coincide com ele em IoU 0,9962 (0,19% dos pixels divergem, todos na borda
 *    antialiasada). O `SYMBOL_PATH_FILL` de `LogoVectors.tsx` **não** foi usado: é
 *    outro desenho (dois miolos separados). `viewBox` do símbolo isolado:
 *    `0 0 100 49.13`, preenchimento `evenodd`. A cor vem de token
 *    (`--unv-color-action-primary`), por classe no CSS; nada aqui é hexadecimal.
 * 2. **Logotipo tipográfico** — “Un” e “vista” contornados da família da marca
 *    (Open Sans Bold, `--unv-font-weight-bold`, o `.woff2` embutido em
 *    `src/fonts/open-sans/`). Técnica, aplicada uma única vez por glifo, sem
 *    nenhuma coordenada redesenhada à mão:
 *      a. o eixo `wght` da fonte variável foi fixado em 700 pelo
 *         módulo `varLib` do fontTools;
 *      b. o texto “Unoovista” foi posicionado com o HarfBuzz (`uharfbuzz`), com
 *         `kern` ligado e ligaduras desligadas, e sem tracking — coerente com o
 *         `letter-spacing` zero de toda a escala tipográfica do módulo;
 *      c. cada contorno foi lido do `glyf` e transformado por
 *         `(x, y) → (x·s + tx, −y·s + 21)`, com `s = 25 / 2048` (corpo de
 *         25px sobre `unitsPerEm` 2048: altura de maiúscula de 17.85px e
 *         altura de x de 13.38px), inversão do eixo Y e translação até a
 *         linha de base em `y = 21`; `tx` acumula os avanços do HarfBuzz, com a
 *         tinta do “U” começando em `x = 0`;
 *      d. os dois “o” **não** são desenhados: o símbolo ocupa o lugar deles. Ele
 *         tem a altura de tinta do “o” (14.15px, do topo do arco à base) e a
 *         proporção do PNG, portanto 28.8px de largura contra os
 *         28.711px que os dois “o” ocupavam — “vista” foi deslocado
 *         0.086px na própria transformação do passo c, e o símbolo
 *         é posto por `translate(34.326 7.096) scale(0.28797)`.
 *    É PROIBIDO reescrever como `<text>`: o fallback de fonte deformaria a
 *    marca. Para regerar, repita as etapas a a d com outra `SRC` e atualize este bloco.
 *
 * `viewBox` do lockup: `0 0 122.6 24`. O componente deriva a largura do
 * `viewBox`, de modo que quem informa só `height` acompanha a proporção.
 */

/** `viewBox` do lockup completo (“Un” + símbolo + “vista”). */
export const unvLogoViewBox = '0 0 122.6 24';

/** Largura nominal do lockup no `viewBox`. */
export const unvLogoWidth = 122.6;

/** Altura nominal do lockup no `viewBox`. */
export const unvLogoHeight = 24;

/**
 * Contornos de “Un” e “vista” em Open Sans Bold — um único caminho com um
 * subcaminho por contorno de letra (o preenchimento é `nonzero`, como na fonte).
 * Os dois “o” não estão aqui: o símbolo os substitui.
 */
export const unvLogoPath =
  'M14.65 3.15V14.7Q14.65 16.54 13.84 18.03Q13.02 19.51 11.38 20.38Q9.74 21.24 7.25 21.24Q3.71 21.24 1.86 19.44Q0 17.63 0 14.65V3.15H3.77V14.08Q3.77 16.29 4.68 17.18Q5.58 18.07 7.35 18.07Q8.59 18.07 9.37 17.64Q10.14 17.22 10.51 16.32Q10.88 15.43 10.88 14.05V3.15ZM26.48 7.1Q28.66 7.1 29.99 8.29Q31.32 9.48 31.32 12.1V21H27.6V13.03Q27.6 11.56 27.07 10.82Q26.54 10.07 25.4 10.07Q23.69 10.07 23.07 11.23Q22.45 12.39 22.45 14.58V21H18.73V7.35H21.57L22.07 9.1H22.28Q22.72 8.39 23.37 7.95Q24.02 7.51 24.82 7.3Q25.62 7.1 26.48 7.1ZM69.45 21 64.25 7.35H68.14L70.78 15.13Q71 15.81 71.12 16.57Q71.25 17.33 71.3 17.92H71.4Q71.44 17.28 71.58 16.54Q71.72 15.81 71.95 15.13L74.57 7.35H78.47L73.27 21ZM84.14 7.35V21H80.42V7.35ZM82.29 2.01Q83.12 2.01 83.72 2.39Q84.31 2.77 84.31 3.82Q84.31 4.86 83.72 5.26Q83.12 5.66 82.29 5.66Q81.45 5.66 80.85 5.26Q80.26 4.86 80.26 3.82Q80.26 2.77 80.85 2.39Q81.45 2.01 82.29 2.01ZM97.57 16.95Q97.57 18.34 96.92 19.3Q96.27 20.26 94.97 20.75Q93.68 21.24 91.75 21.24Q90.32 21.24 89.3 21.06Q88.28 20.88 87.24 20.45V17.37Q88.36 17.88 89.63 18.2Q90.91 18.52 91.87 18.52Q92.96 18.52 93.43 18.2Q93.9 17.88 93.9 17.35Q93.9 17.01 93.71 16.73Q93.52 16.46 92.9 16.11Q92.27 15.76 90.94 15.2Q89.66 14.66 88.84 14.12Q88.01 13.57 87.62 12.82Q87.22 12.06 87.22 10.9Q87.22 9.01 88.69 8.05Q90.16 7.1 92.63 7.1Q93.9 7.1 95.05 7.35Q96.2 7.61 97.42 8.17L96.3 10.86Q95.29 10.42 94.39 10.14Q93.49 9.85 92.57 9.85Q91.75 9.85 91.33 10.07Q90.92 10.29 90.92 10.75Q90.92 11.08 91.13 11.33Q91.35 11.59 91.96 11.9Q92.58 12.21 93.77 12.7Q94.93 13.18 95.79 13.69Q96.64 14.21 97.11 14.98Q97.57 15.74 97.57 16.95ZM106.23 18.28Q106.84 18.28 107.42 18.16Q108 18.03 108.57 17.85V20.62Q107.97 20.89 107.09 21.07Q106.2 21.24 105.15 21.24Q103.93 21.24 102.96 20.85Q101.99 20.45 101.43 19.47Q100.88 18.49 100.88 16.73V10.15H99.1V8.57L101.15 7.33L102.22 4.45H104.6V7.35H108.42V10.15H104.6V16.73Q104.6 17.51 105.05 17.89Q105.49 18.28 106.23 18.28ZM116.92 7.07Q119.67 7.07 121.13 8.27Q122.6 9.46 122.6 11.91V21H120L119.28 19.14H119.18Q118.59 19.88 117.98 20.34Q117.37 20.8 116.58 21.02Q115.78 21.24 114.65 21.24Q113.44 21.24 112.48 20.78Q111.52 20.32 110.97 19.36Q110.43 18.4 110.43 16.92Q110.43 14.75 111.95 13.72Q113.48 12.69 116.53 12.58L118.9 12.5V11.91Q118.9 10.83 118.34 10.33Q117.77 9.83 116.77 9.83Q115.78 9.83 114.83 10.11Q113.88 10.39 112.93 10.82L111.69 8.3Q112.78 7.73 114.13 7.4Q115.48 7.07 116.92 7.07ZM118.9 14.68 117.46 14.73Q115.65 14.77 114.95 15.37Q114.25 15.97 114.25 16.95Q114.25 17.8 114.75 18.16Q115.25 18.52 116.05 18.52Q117.25 18.52 118.07 17.81Q118.9 17.11 118.9 15.8Z';

/**
 * Símbolo da Unooria, traçado do PNG oficial. `viewBox` 0 0 100 49.13;
 * preenchimento `evenodd`.
 */
export const unvLogoSymbolPath =
  'M21.33 49.02C16.94 48.48 12.98 46.86 9.38 44.12C8.45 43.41 6.33 41.3 5.45 40.21C2.99 37.16 1.22 33.34 0.47 29.46C0.08 27.42 -0.04 25.93 0.03 23.74C0.13 20.75 0.57 18.43 1.55 15.81C2.9 12.2 4.8 9.31 7.6 6.62C9.48 4.8 11.2 3.59 13.59 2.41C16.04 1.19 18.71 0.42 21.53 0.1C22.91 -0.06 26.39 0.03 27.69 0.25C31.27 0.86 33.36 1.73 38.05 4.52C42.51 7.17 44.89 8.3 47.28 8.9C48.23 9.14 48.57 9.17 50.1 9.17C52.26 9.18 52.76 9.06 55.48 7.88C58.29 6.67 60 5.75 62.41 4.16C65.57 2.07 68.66 0.87 72.46 0.24C74.06 -0.02 77.83 -0.02 79.49 0.24C84.46 1.03 88.77 3.19 92.4 6.71C94.6 8.85 95.99 10.75 97.32 13.44C100.78 20.39 100.78 28.72 97.34 35.65C95.99 38.38 94.62 40.26 92.4 42.42C88.9 45.83 84.72 47.96 79.85 48.83C78.29 49.11 75.18 49.21 73.52 49.03C69.97 48.67 66.38 47.42 63.35 45.51C56.94 41.48 53.73 40.1 50.31 39.93C48.99 39.87 47.49 40.06 46.33 40.45C45.33 40.79 41.98 42.32 40.68 43.04C39.72 43.57 39.14 43.93 36.82 45.41C34.29 47.03 31.04 48.27 27.85 48.83C26.45 49.08 22.68 49.19 21.33 49.02ZM26.56 37.84C28.59 37.44 29.89 36.86 32.25 35.33C35.04 33.52 37.37 32.29 40.67 30.89C44.31 29.35 46.64 28.82 49.79 28.82C55.03 28.82 59.46 30.43 67.6 35.26C70.85 37.19 71.49 37.48 73.49 37.9C74.63 38.15 77.08 38.16 78.28 37.92C82.9 37 86.68 33.77 88.3 29.35C88.93 27.65 89.08 26.7 89.07 24.51C89.07 22.66 89.05 22.43 88.79 21.41C88.05 18.54 86.85 16.45 84.88 14.59C82.39 12.23 79.47 11.08 76.01 11.08C73.22 11.08 70.65 11.84 68.36 13.34C64.06 16.16 61.01 17.74 57.67 18.87C54.67 19.9 52.67 20.25 49.79 20.25C46.66 20.25 44.69 19.85 41.41 18.55C38.98 17.58 35.29 15.73 33.54 14.6C30.29 12.51 29.57 12.13 27.85 11.62C25.3 10.87 22.35 10.89 19.87 11.69C15.99 12.94 12.76 16.22 11.44 20.25C10.96 21.72 10.83 22.68 10.82 24.62C10.82 26.13 10.86 26.58 11.06 27.49C11.82 30.92 13.89 34 16.67 35.84C19.72 37.87 23.07 38.55 26.56 37.84Z';

/** `viewBox` do símbolo isolado (`variant="mark"`). */
export const unvLogoMarkViewBox = '0 0 100 49.13';

/** Largura do símbolo isolado no `viewBox`. */
export const unvLogoMarkWidth = 100;

/** Altura do símbolo isolado no `viewBox`. */
export const unvLogoMarkHeight = 49.13;

/** Posição e escala do símbolo dentro do lockup (no lugar dos dois “o”). */
export const unvLogoSymbolLockupTransform = 'translate(34.326 7.096) scale(0.28797)';
