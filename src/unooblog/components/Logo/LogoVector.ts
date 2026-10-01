/**
 * Vetores do logotipo do Design System Unooblog.
 *
 * A marca é montada como a da Plataforma Unooria: **o símbolo é o "oo" da
 * palavra** — “Un” + símbolo + “blog”.
 *
 * 1. **Símbolo** — o isótipo oficial da Unooria: um anel espesso em forma de
 *    amendoim, com um único miolo, traçado do PNG
 *    `public/brand/unooria_symbol_navy_fill.png` (o mesmo que o `LogoSymbol` da
 *    plataforma renderiza). O caminho é um literal copiado de
 *    `src/unoovista/components/Logo/LogoVector.ts` (copiar o literal não viola
 *    a regra 1.3: um módulo de marca não LÊ tokens de outro, mas literais são
 *    copiáveis, como as cores). `viewBox` do símbolo isolado: `0 0 100 49.13`,
 *    preenchimento `evenodd`. A cor vem de token (`--ubl-color-action-primary`),
 *    por classe no CSS; nada aqui é hexadecimal.
 * 2. **Logotipo tipográfico** — “Un” e “blog” contornados da família da marca
 *    (Open Sans Bold, `--ubl-font-weight-bold`, o `.woff2` latino embutido em
 *    `src/fonts/open-sans/`). Técnica, aplicada uma única vez por glifo, sem
 *    nenhuma coordenada redesenhada à mão:
 *      a. o eixo `wght` da fonte variável foi fixado em 700 pelo `instancer`
 *         do fontTools;
 *      b. o texto “Unooblog” foi posicionado com o HarfBuzz (`uharfbuzz`),
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
 *         ocupavam — “blog” foi deslocado 0.086px na própria transformação
 *         do passo c, e o símbolo é posto por
 *         `translate(34.326 5.090) scale(0.28797)`, com a esquerda na tinta do
 *         primeiro “o” e a base na base de tinta do “o”. O terceiro “o”
 *         (de “blog”) é desenhado normalmente.
 *    Diferente do Unoovista, o “g” desce abaixo da linha de base e o “b” e o
 *    “l” sobem acima da altura de caixa-baixa, então o `viewBox` é medido pela
 *    caixa de tinta inteira (25px de altura), e não pelo corpo da fonte.
 *    É PROIBIDO reescrever como `<text>`: o fallback de fonte deformaria a
 *    marca. Para regerar, repita as etapas a a d e atualize este bloco.
 *
 * `viewBox` do lockup: `0 0 117 25`. O componente deriva a largura do
 * `viewBox`, de modo que quem informa só `height` acompanha a proporção.
 */

/** `viewBox` do lockup completo (“Un” + símbolo + “blog”). */
export const ublLogoViewBox = '0 0 117 25';

/** Largura nominal do lockup no `viewBox`. */
export const ublLogoWidth = 117;

/** Altura nominal do lockup no `viewBox`. */
export const ublLogoHeight = 25.0;

/**
 * Contornos de “Un” e “blog” em Open Sans Bold — um único caminho com um
 * subcaminho por contorno de letra (o preenchimento é `nonzero`, como na fonte).
 * Os dois primeiros “o” não estão aqui: o símbolo os substitui.
 */
export const ublLogoPath =
  'M14.65 1.15V12.7Q14.65 14.54 13.84 16.02Q13.02 17.5 11.38 18.37Q9.74 19.24 7.25 19.24Q3.71 19.24 1.86 17.43Q0 15.62 0 12.65V1.15H3.77V12.07Q3.77 14.28 4.68 15.17Q5.58 16.06 7.35 16.06Q8.59 16.06 9.37 15.64Q10.14 15.21 10.51 14.32Q10.88 13.43 10.88 12.05V1.15ZM26.48 5.09Q28.66 5.09 29.99 6.28Q31.32 7.47 31.32 10.1V18.99H27.6V11.02Q27.6 9.56 27.07 8.81Q26.54 8.07 25.4 8.07Q23.69 8.07 23.07 9.23Q22.45 10.39 22.45 12.57V18.99H18.73V5.35H21.57L22.07 7.09H22.28Q22.72 6.38 23.37 5.94Q24.02 5.51 24.82 5.3Q25.62 5.09 26.48 5.09ZM69.92 0V4.42Q69.92 5.19 69.88 5.94Q69.84 6.7 69.78 7.12H69.92Q70.46 6.27 71.39 5.68Q72.32 5.09 73.79 5.09Q76.09 5.09 77.52 6.88Q78.94 8.68 78.94 12.15Q78.94 14.48 78.28 16.06Q77.63 17.64 76.44 18.44Q75.26 19.24 73.69 19.24Q72.19 19.24 71.33 18.7Q70.46 18.16 69.92 17.49H69.67L69.04 18.99H66.2V0ZM72.6 8.07Q71.62 8.07 71.05 8.47Q70.47 8.87 70.21 9.68Q69.95 10.49 69.92 11.72V12.12Q69.92 14.11 70.51 15.17Q71.09 16.22 72.64 16.22Q73.79 16.22 74.47 15.16Q75.15 14.1 75.15 12.1Q75.15 10.1 74.46 9.08Q73.78 8.07 72.6 8.07ZM85.74 18.99H82.02V0H85.74ZM102.05 12.15Q102.05 13.85 101.59 15.17Q101.14 16.49 100.26 17.4Q99.39 18.31 98.16 18.77Q96.94 19.24 95.4 19.24Q93.96 19.24 92.76 18.77Q91.55 18.31 90.67 17.4Q89.78 16.49 89.3 15.17Q88.82 13.85 88.82 12.15Q88.82 9.88 89.62 8.3Q90.43 6.73 91.92 5.91Q93.41 5.09 95.47 5.09Q97.39 5.09 98.87 5.91Q100.35 6.73 101.2 8.3Q102.05 9.88 102.05 12.15ZM92.62 12.15Q92.62 13.49 92.91 14.4Q93.2 15.32 93.82 15.78Q94.45 16.25 95.45 16.25Q96.44 16.25 97.05 15.78Q97.67 15.32 97.96 14.4Q98.24 13.49 98.24 12.15Q98.24 10.79 97.96 9.89Q97.67 9 97.05 8.54Q96.42 8.09 95.42 8.09Q93.95 8.09 93.28 9.11Q92.62 10.12 92.62 12.15ZM109.12 25Q106.26 25 104.76 24.01Q103.25 23.01 103.25 21.22Q103.25 19.98 104.02 19.15Q104.79 18.32 106.27 17.97Q105.7 17.72 105.27 17.17Q104.85 16.61 104.85 15.99Q104.85 15.21 105.3 14.69Q105.75 14.17 106.6 13.67Q105.53 13.21 104.9 12.18Q104.27 11.16 104.27 9.77Q104.27 8.28 104.93 7.23Q105.58 6.19 106.83 5.64Q108.08 5.09 109.88 5.09Q110.25 5.09 110.75 5.14Q111.26 5.19 111.68 5.25Q112.1 5.31 112.24 5.35H117V7.24L114.87 7.79Q115.16 8.24 115.31 8.75Q115.45 9.27 115.45 9.84Q115.45 12.04 113.92 13.26Q112.39 14.49 109.67 14.49Q109.02 14.45 108.45 14.39Q108.17 14.61 108.02 14.86Q107.87 15.1 107.87 15.37Q107.87 15.64 108.1 15.81Q108.33 15.99 108.78 16.08Q109.24 16.17 109.92 16.17H112.24Q114.49 16.17 115.67 17.14Q116.85 18.1 116.85 19.97Q116.85 22.36 114.85 23.68Q112.85 25 109.12 25ZM109.28 22.57Q110.61 22.57 111.57 22.32Q112.52 22.07 113.04 21.61Q113.55 21.15 113.55 20.52Q113.55 20.01 113.25 19.71Q112.95 19.41 112.35 19.29Q111.74 19.17 110.8 19.17H108.88Q108.19 19.17 107.65 19.38Q107.11 19.6 106.79 20Q106.47 20.4 106.47 20.92Q106.47 21.69 107.21 22.13Q107.95 22.57 109.28 22.57ZM109.88 12.22Q110.93 12.22 111.41 11.57Q111.9 10.93 111.9 9.81Q111.9 8.58 111.4 7.97Q110.89 7.35 109.88 7.35Q108.85 7.35 108.34 7.97Q107.83 8.58 107.83 9.81Q107.83 10.93 108.33 11.57Q108.84 12.22 109.88 12.22Z';

/**
 * Símbolo da Unooria, traçado do PNG oficial. `viewBox` 0 0 100 49.13;
 * preenchimento `evenodd`.
 */
export const ublLogoSymbolPath =
  'M21.33 49.02C16.94 48.48 12.98 46.86 9.38 44.12C8.45 43.41 6.33 41.3 5.45 40.21C2.99 37.16 1.22 33.34 0.47 29.46C0.08 27.42 -0.04 25.93 0.03 23.74C0.13 20.75 0.57 18.43 1.55 15.81C2.9 12.2 4.8 9.31 7.6 6.62C9.48 4.8 11.2 3.59 13.59 2.41C16.04 1.19 18.71 0.42 21.53 0.1C22.91 -0.06 26.39 0.03 27.69 0.25C31.27 0.86 33.36 1.73 38.05 4.52C42.51 7.17 44.89 8.3 47.28 8.9C48.23 9.14 48.57 9.17 50.1 9.17C52.26 9.18 52.76 9.06 55.48 7.88C58.29 6.67 60 5.75 62.41 4.16C65.57 2.07 68.66 0.87 72.46 0.24C74.06 -0.02 77.83 -0.02 79.49 0.24C84.46 1.03 88.77 3.19 92.4 6.71C94.6 8.85 95.99 10.75 97.32 13.44C100.78 20.39 100.78 28.72 97.34 35.65C95.99 38.38 94.62 40.26 92.4 42.42C88.9 45.83 84.72 47.96 79.85 48.83C78.29 49.11 75.18 49.21 73.52 49.03C69.97 48.67 66.38 47.42 63.35 45.51C56.94 41.48 53.73 40.1 50.31 39.93C48.99 39.87 47.49 40.06 46.33 40.45C45.33 40.79 41.98 42.32 40.68 43.04C39.72 43.57 39.14 43.93 36.82 45.41C34.29 47.03 31.04 48.27 27.85 48.83C26.45 49.08 22.68 49.19 21.33 49.02ZM26.56 37.84C28.59 37.44 29.89 36.86 32.25 35.33C35.04 33.52 37.37 32.29 40.67 30.89C44.31 29.35 46.64 28.82 49.79 28.82C55.03 28.82 59.46 30.43 67.6 35.26C70.85 37.19 71.49 37.48 73.49 37.9C74.63 38.15 77.08 38.16 78.28 37.92C82.9 37 86.68 33.77 88.3 29.35C88.93 27.65 89.08 26.7 89.07 24.51C89.07 22.66 89.05 22.43 88.79 21.41C88.05 18.54 86.85 16.45 84.88 14.59C82.39 12.23 79.47 11.08 76.01 11.08C73.22 11.08 70.65 11.84 68.36 13.34C64.06 16.16 61.01 17.74 57.67 18.87C54.67 19.9 52.67 20.25 49.79 20.25C46.66 20.25 44.69 19.85 41.41 18.55C38.98 17.58 35.29 15.73 33.54 14.6C30.29 12.51 29.57 12.13 27.85 11.62C25.3 10.87 22.35 10.89 19.87 11.69C15.99 12.94 12.76 16.22 11.44 20.25C10.96 21.72 10.83 22.68 10.82 24.62C10.82 26.13 10.86 26.58 11.06 27.49C11.82 30.92 13.89 34 16.67 35.84C19.72 37.87 23.07 38.55 26.56 37.84Z';

/** `viewBox` do símbolo isolado (`variant="mark"`). */
export const ublLogoMarkViewBox = '0 0 100 49.13';

/** Largura do símbolo isolado no `viewBox`. */
export const ublLogoMarkWidth = 100;

/** Altura do símbolo isolado no `viewBox`. */
export const ublLogoMarkHeight = 49.13;

/** Posição e escala do símbolo dentro do lockup (no lugar dos dois primeiros “o”). */
export const ublLogoSymbolLockupTransform = 'translate(34.326 5.090) scale(0.28797)';
