/**
 * Vetores do logotipo do Design System Unoojornal.
 *
 * A marca é montada como a da Plataforma Unooria: **o símbolo é o "oo" da
 * palavra** — “Un” + símbolo + “jornal”.
 *
 * 1. **Símbolo** — o isótipo oficial da Unooria: um anel espesso em forma de
 *    amendoim, com um único miolo, traçado do PNG
 *    `public/brand/unooria_symbol_navy_fill.png` (o mesmo que o `LogoSymbol` da
 *    plataforma renderiza). O caminho é um literal copiado de
 *    `src/unoovista/components/Logo/LogoVector.ts` (copiar o literal não viola
 *    a regra 1.3: um módulo de marca não LÊ tokens de outro, mas literais são
 *    copiáveis, como as cores). `viewBox` do símbolo isolado: `0 0 100 49.13`,
 *    preenchimento `evenodd`. A cor vem de token (`--ujn-color-action-primary`),
 *    por classe no CSS; nada aqui é hexadecimal.
 * 2. **Logotipo tipográfico** — “Un” e “jornal” contornados da família da marca
 *    (Open Sans Bold, `--ujn-font-weight-bold`, o `.woff2` latino embutido em
 *    `src/fonts/open-sans/`). Técnica, aplicada uma única vez por glifo, sem
 *    nenhuma coordenada redesenhada à mão:
 *      a. o eixo `wght` da fonte variável foi fixado em 700 pelo `instancer`
 *         do fontTools;
 *      b. o texto “Unoojornal” foi posicionado com o HarfBuzz (`uharfbuzz`),
 *         com `kern` ligado e ligaduras desligadas, e sem tracking — coerente
 *         com o `letter-spacing` zero de toda a escala tipográfica do módulo;
 *      c. cada contorno foi lido do `glyf` e transformado por
 *         `(x, y) → (x·s + tx, −y·s + base)`, com `s = 25 / 2048` (corpo de
 *         25px sobre `unitsPerEm` 2048), inversão do eixo Y e translação até a
 *         linha de base; `tx` acumula os avanços do HarfBuzz, com a tinta do
 *         “U” começando em `x = 0`, e `base` é a altura da maior ascendente
 *         de tinta (o “l”), de modo que o topo da tinta cai em `y = 0`;
 *      d. os dois primeiros “o” **não** são desenhados: o símbolo ocupa o lugar
 *         deles. Ele tem a altura de tinta do “o” (14.15px) e a proporção do
 *         PNG, portanto 28.8px de largura contra os 28.711px que os dois “o”
 *         ocupavam — “jornal” foi deslocado 0.086px na própria transformação
 *         do passo c, e o símbolo é posto por
 *         `translate(34.326 5.090) scale(0.28797)`, com a esquerda na tinta do
 *         primeiro “o” e a base na base de tinta do “o”. O terceiro “o”
 *         (de “jornal”) é desenhado normalmente.
 *    Diferente do Unoovista, o “j” desce abaixo da linha de base, então o
 *    `viewBox` é medido pela caixa de tinta inteira (25px de altura), e não
 *    pelo corpo da fonte.
 *    É PROIBIDO reescrever como `<text>`: o fallback de fonte deformaria a
 *    marca. Para regerar, repita as etapas a a d e atualize este bloco.
 *
 * `viewBox` do lockup: `0 0 135.91 25.0`. O componente deriva a largura do
 * `viewBox`, de modo que quem informa só `height` acompanha a proporção.
 */

/** `viewBox` do lockup completo (“Un” + símbolo + “jornal”). */
export const ujnLogoViewBox = '0 0 135.91 25.0';

/** Largura nominal do lockup no `viewBox`. */
export const ujnLogoWidth = 135.91;

/** Altura nominal do lockup no `viewBox`. */
export const ujnLogoHeight = 25.0;

/**
 * Contornos de “Un” e “jornal” em Open Sans Bold — um único caminho com um
 * subcaminho por contorno de letra (o preenchimento é `nonzero`, como na fonte).
 * Os dois primeiros “o” não estão aqui: o símbolo os substitui.
 */
export const ujnLogoPath =
  'M14.65 1.15V12.7Q14.65 14.54 13.84 16.02Q13.02 17.5 11.38 18.37Q9.74 19.24 7.25 19.24Q3.71 19.24 1.86 17.43Q0 15.62 0 12.65V1.15H3.77V12.07Q3.77 14.28 4.68 15.17Q5.58 16.06 7.35 16.06Q8.59 16.06 9.37 15.64Q10.14 15.21 10.51 14.32Q10.88 13.43 10.88 12.05V1.15ZM26.48 5.09Q28.66 5.09 29.99 6.28Q31.32 7.47 31.32 10.1V18.99H27.6V11.02Q27.6 9.56 27.07 8.81Q26.54 8.07 25.4 8.07Q23.69 8.07 23.07 9.23Q22.45 10.39 22.45 12.57V18.99H18.73V5.35H21.57L22.07 7.09H22.28Q22.72 6.38 23.37 5.94Q24.02 5.51 24.82 5.3Q25.62 5.09 26.48 5.09ZM65.1 25Q64.47 25 63.78 24.91Q63.1 24.82 62.65 24.69V21.77Q63.1 21.89 63.5 21.94Q63.89 22 64.39 22Q65.15 22 65.67 21.58Q66.2 21.15 66.2 19.92V5.35H69.92V20.47Q69.92 21.72 69.45 22.75Q68.97 23.78 67.91 24.39Q66.85 25 65.1 25ZM66.04 1.82Q66.04 0.77 66.63 0.38Q67.22 0 68.07 0Q68.9 0 69.5 0.38Q70.09 0.77 70.09 1.82Q70.09 2.86 69.5 3.25Q68.9 3.65 68.07 3.65Q67.22 3.65 66.63 3.25Q66.04 2.86 66.04 1.82ZM86.23 12.15Q86.23 13.85 85.77 15.17Q85.32 16.49 84.44 17.4Q83.57 18.31 82.34 18.77Q81.12 19.24 79.58 19.24Q78.14 19.24 76.94 18.77Q75.73 18.31 74.85 17.4Q73.96 16.49 73.48 15.17Q73 13.85 73 12.15Q73 9.88 73.8 8.3Q74.61 6.73 76.1 5.91Q77.59 5.09 79.65 5.09Q81.57 5.09 83.05 5.91Q84.53 6.73 85.38 8.3Q86.23 9.88 86.23 12.15ZM76.8 12.15Q76.8 13.49 77.09 14.4Q77.38 15.32 78 15.78Q78.63 16.25 79.63 16.25Q80.62 16.25 81.23 15.78Q81.85 15.32 82.14 14.4Q82.42 13.49 82.42 12.15Q82.42 10.79 82.14 9.89Q81.85 9 81.23 8.54Q80.6 8.09 79.6 8.09Q78.13 8.09 77.46 9.11Q76.8 10.12 76.8 12.15ZM96.92 5.09Q97.21 5.09 97.58 5.12Q97.95 5.15 98.18 5.2L97.9 8.69Q97.72 8.63 97.38 8.6Q97.05 8.57 96.8 8.57Q96.08 8.57 95.4 8.75Q94.73 8.94 94.19 9.34Q93.65 9.75 93.34 10.42Q93.03 11.08 93.03 12.05V18.99H89.31V5.35H92.13L92.68 7.64H92.86Q93.26 6.95 93.87 6.37Q94.47 5.79 95.25 5.44Q96.02 5.09 96.92 5.09ZM108.41 5.09Q110.6 5.09 111.93 6.28Q113.26 7.47 113.26 10.1V18.99H109.53V11.02Q109.53 9.56 109 8.81Q108.47 8.07 107.34 8.07Q105.63 8.07 105.01 9.23Q104.38 10.39 104.38 12.57V18.99H100.66V5.35H103.5L104 7.09H104.21Q104.65 6.38 105.3 5.94Q105.96 5.51 106.76 5.3Q107.56 5.09 108.41 5.09ZM122.68 5.07Q125.43 5.07 126.89 6.26Q128.36 7.46 128.36 9.9V18.99H125.76L125.04 17.14H124.94Q124.35 17.87 123.74 18.33Q123.13 18.8 122.34 19.02Q121.55 19.24 120.41 19.24Q119.2 19.24 118.24 18.77Q117.29 18.31 116.74 17.35Q116.19 16.39 116.19 14.92Q116.19 12.74 117.71 11.71Q119.24 10.68 122.29 10.57L124.66 10.5V9.9Q124.66 8.83 124.1 8.33Q123.54 7.82 122.53 7.82Q121.55 7.82 120.59 8.11Q119.64 8.39 118.69 8.81L117.46 6.3Q118.54 5.73 119.89 5.4Q121.24 5.07 122.68 5.07ZM124.66 12.67 123.22 12.72Q121.41 12.77 120.71 13.37Q120.01 13.96 120.01 14.94Q120.01 15.8 120.51 16.16Q121.01 16.52 121.81 16.52Q123.01 16.52 123.83 15.81Q124.66 15.1 124.66 13.79ZM135.91 18.99H132.19V0H135.91Z';

/**
 * Símbolo da Unooria, traçado do PNG oficial. `viewBox` 0 0 100 49.13;
 * preenchimento `evenodd`.
 */
export const ujnLogoSymbolPath =
  'M21.33 49.02C16.94 48.48 12.98 46.86 9.38 44.12C8.45 43.41 6.33 41.3 5.45 40.21C2.99 37.16 1.22 33.34 0.47 29.46C0.08 27.42 -0.04 25.93 0.03 23.74C0.13 20.75 0.57 18.43 1.55 15.81C2.9 12.2 4.8 9.31 7.6 6.62C9.48 4.8 11.2 3.59 13.59 2.41C16.04 1.19 18.71 0.42 21.53 0.1C22.91 -0.06 26.39 0.03 27.69 0.25C31.27 0.86 33.36 1.73 38.05 4.52C42.51 7.17 44.89 8.3 47.28 8.9C48.23 9.14 48.57 9.17 50.1 9.17C52.26 9.18 52.76 9.06 55.48 7.88C58.29 6.67 60 5.75 62.41 4.16C65.57 2.07 68.66 0.87 72.46 0.24C74.06 -0.02 77.83 -0.02 79.49 0.24C84.46 1.03 88.77 3.19 92.4 6.71C94.6 8.85 95.99 10.75 97.32 13.44C100.78 20.39 100.78 28.72 97.34 35.65C95.99 38.38 94.62 40.26 92.4 42.42C88.9 45.83 84.72 47.96 79.85 48.83C78.29 49.11 75.18 49.21 73.52 49.03C69.97 48.67 66.38 47.42 63.35 45.51C56.94 41.48 53.73 40.1 50.31 39.93C48.99 39.87 47.49 40.06 46.33 40.45C45.33 40.79 41.98 42.32 40.68 43.04C39.72 43.57 39.14 43.93 36.82 45.41C34.29 47.03 31.04 48.27 27.85 48.83C26.45 49.08 22.68 49.19 21.33 49.02ZM26.56 37.84C28.59 37.44 29.89 36.86 32.25 35.33C35.04 33.52 37.37 32.29 40.67 30.89C44.31 29.35 46.64 28.82 49.79 28.82C55.03 28.82 59.46 30.43 67.6 35.26C70.85 37.19 71.49 37.48 73.49 37.9C74.63 38.15 77.08 38.16 78.28 37.92C82.9 37 86.68 33.77 88.3 29.35C88.93 27.65 89.08 26.7 89.07 24.51C89.07 22.66 89.05 22.43 88.79 21.41C88.05 18.54 86.85 16.45 84.88 14.59C82.39 12.23 79.47 11.08 76.01 11.08C73.22 11.08 70.65 11.84 68.36 13.34C64.06 16.16 61.01 17.74 57.67 18.87C54.67 19.9 52.67 20.25 49.79 20.25C46.66 20.25 44.69 19.85 41.41 18.55C38.98 17.58 35.29 15.73 33.54 14.6C30.29 12.51 29.57 12.13 27.85 11.62C25.3 10.87 22.35 10.89 19.87 11.69C15.99 12.94 12.76 16.22 11.44 20.25C10.96 21.72 10.83 22.68 10.82 24.62C10.82 26.13 10.86 26.58 11.06 27.49C11.82 30.92 13.89 34 16.67 35.84C19.72 37.87 23.07 38.55 26.56 37.84Z';

/** `viewBox` do símbolo isolado (`variant="mark"`). */
export const ujnLogoMarkViewBox = '0 0 100 49.13';

/** Largura do símbolo isolado no `viewBox`. */
export const ujnLogoMarkWidth = 100;

/** Altura do símbolo isolado no `viewBox`. */
export const ujnLogoMarkHeight = 49.13;

/** Posição e escala do símbolo dentro do lockup (no lugar dos dois primeiros “o”). */
export const ujnLogoSymbolLockupTransform = 'translate(34.326 5.090) scale(0.28797)';
