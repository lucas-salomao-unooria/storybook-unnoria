/**
 * Vetores do logotipo do Design System Unoovista.
 *
 * A marca é original e tem duas metades:
 *
 * 1. **Emblema** — duas circunferências de mesmo raio que se entrelaçam e
 *    formam o "oo" de Unooria. Geometria própria e simples, em unidades do
 *    `viewBox` do lockup: raio de 7,2, traço de
 *    3,6, centros em `x = 9` e `x = 18` (distância de 9, portanto 1,8 de
 *    sobreposição de cada lado do eixo), ambos em `y = 12`. A caixa de tinta
 *    é 27 × 18. O anel B passa por cima do anel A no cruzamento inferior e por
 *    baixo no superior — o arco `overlap` redesenha o trecho de B entre 108° e
 *    180° para produzir o entrelaçamento. As cores são tokens
 *    (`--unv-color-action-primary` no anel A, `--unv-color-action-pressed` no
 *    B), aplicadas por classe no CSS; nada aqui é hexadecimal.
 * 2. **Logotipo tipográfico** — “Unoovista”, contornado a partir da própria
 *    família da marca (Open Sans Bold, `--unv-font-weight-bold`, o `.woff2`
 *    embutido em `src/fonts/open-sans/`). Técnica, aplicada uma única vez por
 *    glifo, sem nenhuma coordenada redesenhada à mão:
 *      a. o eixo `wght` da fonte variável foi fixado em 700 pelo
 *         módulo `varLib` do fontTools;
 *      b. o texto foi posicionado com o HarfBuzz (`uharfbuzz`), com `kern`
 *         ligado e ligaduras desligadas, e sem tracking — coerente com o
 *         `letter-spacing` zero de toda a escala tipográfica do módulo;
 *      c. cada contorno foi lido do `glyf` e transformado por
 *         `(x, y) → (x·s + tx, −y·s + 21)`, com `s = 25 / 2048` (corpo de
 *         25px sobre `unitsPerEm` 2048: altura de maiúscula de 17,85px e
 *         altura de x de 13,38px), inversão do eixo Y e translação até a
 *         linha de base em `y = 21`; `tx` acumula os avanços do HarfBuzz, com
 *         a origem da pena em `x = 27,88` para que a tinta do “U”
 *         comece 3px depois do emblema.
 *    É PROIBIDO reescrever como `<text>`: o fallback de fonte deformaria a
 *    marca. Para regerar, repita as etapas a a c com outra `SRC` e atualize este bloco.
 *
 * `viewBox` do lockup: `0 0 152.51 24` (emblema de 27px, respiro de 3px e o
 * wordmark de 122.51px; a base do emblema e a linha de base do texto
 * coincidem em `y = 21`, e o topo do emblema em `y = 3` acompanha a altura de
 * maiúscula). O componente deriva a largura do `viewBox`, de modo que quem
 * informa só `height` acompanha a proporção.
 */

/** `viewBox` do lockup completo (emblema + logotipo tipográfico). */
export const unvLogoViewBox = '0 0 152.51 24';

/** Largura nominal do lockup no `viewBox`. */
export const unvLogoWidth = 152.51;

/** Altura nominal do lockup no `viewBox`. */
export const unvLogoHeight = 24;

/**
 * Contornos de “Unoovista” em Open Sans Bold — um único caminho com um
 * subcaminho por contorno de letra (o preenchimento é `nonzero`, como na fonte).
 */
export const unvLogoPath =
  'M44.65 3.15V14.7Q44.65 16.54 43.84 18.03Q43.02 19.51 41.38 20.38Q39.74 21.24 37.25 21.24Q33.71 21.24 31.86 19.44Q30 17.63 30 14.65V3.15H33.77V14.08Q33.77 16.29 34.68 17.18Q35.58 18.07 37.35 18.07Q38.59 18.07 39.37 17.64Q40.14 17.22 40.51 16.32Q40.88 15.43 40.88 14.05V3.15ZM56.48 7.1Q58.66 7.1 59.99 8.29Q61.32 9.48 61.32 12.1V21H57.6V13.03Q57.6 11.56 57.07 10.82Q56.54 10.07 55.4 10.07Q53.69 10.07 53.07 11.23Q52.45 12.39 52.45 14.58V21H48.73V7.35H51.57L52.07 9.1H52.28Q52.72 8.39 53.37 7.95Q54.02 7.51 54.82 7.3Q55.62 7.1 56.48 7.1ZM77.56 14.15Q77.56 15.86 77.1 17.18Q76.64 18.5 75.77 19.41Q74.9 20.32 73.67 20.78Q72.44 21.24 70.91 21.24Q69.47 21.24 68.26 20.78Q67.06 20.32 66.18 19.41Q65.29 18.5 64.81 17.18Q64.33 15.86 64.33 14.15Q64.33 11.88 65.13 10.31Q65.94 8.73 67.43 7.91Q68.92 7.1 70.98 7.1Q72.9 7.1 74.38 7.91Q75.86 8.73 76.71 10.31Q77.56 11.88 77.56 14.15ZM68.12 14.15Q68.12 15.49 68.42 16.41Q68.71 17.33 69.33 17.79Q69.95 18.25 70.95 18.25Q71.94 18.25 72.56 17.79Q73.18 17.33 73.46 16.41Q73.75 15.49 73.75 14.15Q73.75 12.8 73.46 11.9Q73.18 11 72.55 10.55Q71.93 10.1 70.93 10.1Q69.45 10.1 68.79 11.11Q68.12 12.13 68.12 14.15ZM93.04 14.15Q93.04 15.86 92.58 17.18Q92.12 18.5 91.25 19.41Q90.38 20.32 89.15 20.78Q87.92 21.24 86.38 21.24Q84.94 21.24 83.74 20.78Q82.54 20.32 81.65 19.41Q80.77 18.5 80.29 17.18Q79.8 15.86 79.8 14.15Q79.8 11.88 80.61 10.31Q81.42 8.73 82.91 7.91Q84.39 7.1 86.46 7.1Q88.37 7.1 89.86 7.91Q91.34 8.73 92.19 10.31Q93.04 11.88 93.04 14.15ZM83.6 14.15Q83.6 15.49 83.89 16.41Q84.19 17.33 84.81 17.79Q85.43 18.25 86.43 18.25Q87.42 18.25 88.04 17.79Q88.65 17.33 88.94 16.41Q89.23 15.49 89.23 14.15Q89.23 12.8 88.94 11.9Q88.65 11 88.03 10.55Q87.41 10.1 86.41 10.1Q84.93 10.1 84.27 11.11Q83.6 12.13 83.6 14.15ZM99.36 21 94.16 7.35H98.05L100.69 15.13Q100.91 15.81 101.04 16.57Q101.17 17.33 101.22 17.92H101.31Q101.35 17.28 101.49 16.54Q101.63 15.81 101.86 15.13L104.49 7.35H108.38L103.18 21ZM114.06 7.35V21H110.33V7.35ZM112.2 2.01Q113.03 2.01 113.63 2.39Q114.23 2.77 114.23 3.82Q114.23 4.86 113.63 5.26Q113.03 5.66 112.2 5.66Q111.36 5.66 110.77 5.26Q110.18 4.86 110.18 3.82Q110.18 2.77 110.77 2.39Q111.36 2.01 112.2 2.01ZM127.49 16.95Q127.49 18.34 126.83 19.3Q126.18 20.26 124.89 20.75Q123.59 21.24 121.66 21.24Q120.23 21.24 119.22 21.06Q118.2 20.88 117.16 20.45V17.37Q118.27 17.88 119.54 18.2Q120.82 18.52 121.78 18.52Q122.87 18.52 123.34 18.2Q123.81 17.88 123.81 17.35Q123.81 17.01 123.62 16.73Q123.43 16.46 122.81 16.11Q122.19 15.76 120.86 15.2Q119.58 14.66 118.75 14.12Q117.93 13.57 117.53 12.82Q117.13 12.06 117.13 10.9Q117.13 9.01 118.6 8.05Q120.08 7.1 122.54 7.1Q123.81 7.1 124.96 7.35Q126.12 7.61 127.34 8.17L126.22 10.86Q125.2 10.42 124.31 10.14Q123.41 9.85 122.48 9.85Q121.66 9.85 121.25 10.07Q120.83 10.29 120.83 10.75Q120.83 11.08 121.05 11.33Q121.26 11.59 121.88 11.9Q122.49 12.21 123.69 12.7Q124.85 13.18 125.7 13.69Q126.56 14.21 127.02 14.98Q127.49 15.74 127.49 16.95ZM136.14 18.28Q136.75 18.28 137.33 18.16Q137.91 18.03 138.48 17.85V20.62Q137.89 20.89 137 21.07Q136.12 21.24 135.07 21.24Q133.85 21.24 132.87 20.85Q131.9 20.45 131.35 19.47Q130.79 18.49 130.79 16.73V10.15H129.01V8.57L131.06 7.33L132.14 4.45H134.52V7.35H138.34V10.15H134.52V16.73Q134.52 17.51 134.96 17.89Q135.41 18.28 136.14 18.28ZM146.83 7.07Q149.58 7.07 151.04 8.27Q152.51 9.46 152.51 11.91V21H149.91L149.19 19.14H149.09Q148.51 19.88 147.9 20.34Q147.29 20.8 146.49 21.02Q145.7 21.24 144.56 21.24Q143.35 21.24 142.4 20.78Q141.44 20.32 140.89 19.36Q140.34 18.4 140.34 16.92Q140.34 14.75 141.87 13.72Q143.39 12.69 146.44 12.58L148.81 12.5V11.91Q148.81 10.83 148.25 10.33Q147.69 9.83 146.69 9.83Q145.7 9.83 144.75 10.11Q143.79 10.39 142.84 10.82L141.61 8.3Q142.7 7.73 144.04 7.4Q145.39 7.07 146.83 7.07ZM148.81 14.68 147.37 14.73Q145.56 14.77 144.86 15.37Q144.16 15.97 144.16 16.95Q144.16 17.8 144.66 18.16Q145.16 18.52 145.97 18.52Q147.16 18.52 147.99 17.81Q148.81 17.11 148.81 15.8Z';

/** `viewBox` do emblema isolado (`variant="mark"`): a caixa de tinta de 27 × 18. */
export const unvLogoMarkViewBox = '0 3 27 18';

/** Largura do emblema isolado no `viewBox`. */
export const unvLogoMarkWidth = 27;

/** Altura do emblema isolado no `viewBox`. */
export const unvLogoMarkHeight = 18;

/**
 * Geometria do emblema, no mesmo sistema de coordenadas do lockup: dois anéis
 * de raio 7,2 e traço de 3,6, e o arco que faz o anel B passar por cima do A
 * no cruzamento inferior.
 */
export const unvLogoMark = {
  radius: 7.2,
  strokeWidth: 3.6,
  ringA: { cx: 9, cy: 12 },
  ringB: { cx: 18, cy: 12 },
  /** Trecho do anel B (108° a 180°) redesenhado sobre o anel A. */
  overlap: 'M15.78 18.85A7.2 7.2 0 0 1 10.8 12',
} as const;
