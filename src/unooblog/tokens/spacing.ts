/**
 * Tokens de Espaçamento, Raios, Dimensões, Movimento e Camadas do Unooblog.
 * Espelho TypeScript de `spacing.css`.
 */

/**
 * Chaves da escala de espaçamento.
 */
export type UblSpacingToken =
  | '4xs'
  | '3xs'
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | '3xl'
  | '4xl'
  | '5xl';

/**
 * Escala de espaçamento em pixels.
 */
export const ublSpacing: Record<UblSpacingToken, number> = {
  '4xs': 2,
  '3xs': 4,
  xxs: 6,
  xs: 8,
  s: 10,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  '3xl': 32,
  '4xl': 48,
  '5xl': 64,
};

/**
 * Ordem canônica da escala para exibição em documentação.
 */
export const ublSpacingOrder: UblSpacingToken[] = [
  '4xs',
  '3xs',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  '3xl',
  '4xl',
  '5xl',
];

/**
 * Chaves da escala de raios.
 */
export type UblRadiusToken = 'xs' | 's' | 'm' | 'l' | 'xl' | 'full';

/**
 * Raios de borda em pixels.
 */
export const ublRadius: Record<UblRadiusToken, number> = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  full: 1000,
};

/**
 * Dimensões estruturais da página e dos quadros de documentação, em pixels.
 */
export const ublLayout = {
  pageWidth: 1120,
  readingWidth: 680,
  sidebarWidth: 320,
  tocWidth: 240,
  siteHeaderHeight: 64,
  progressHeight: 3,
  touchTarget: 44,
  gutter: 16,
  gutterWide: 48,
  desktopWidth: 1440,
  desktopHeight: 1024,
  desktopChromeHeight: 40,
  screenWidth: 390,
  screenHeight: 844,
  statusbarHeight: 47,
  homeIndicatorHeight: 34,
} as const;

/**
 * Tamanhos de ícone em pixels, com o degrau de origem na Unooria.
 */
export const ublIconSizes = {
  xs: { px: 16, unooria: '--unooria-icon-size-3xs' },
  sm: { px: 20, unooria: '--unooria-icon-size-xs' },
  md: { px: 24, unooria: '--unooria-icon-size-s' },
  lg: { px: 32, unooria: '--unooria-icon-size-m' },
} as const;

/**
 * Desfoque da barra do site, em pixels, com o degrau de origem na Unooria.
 */
export const ublBlur = { bar: { px: 16, unooria: '--unooria-blur-400' } } as const;

/**
 * Diâmetros de avatar em pixels.
 */
export const ublAvatarSizes = { sm: 24, md: 32, lg: 48, xl: 72 } as const;

/**
 * Camadas, de baixo para cima.
 */
export const ublLayers = {
  bar: 10,
  progress: 15,
  sheet: 30,
  dialog: 40,
  toast: 50,
  statusbar: 60,
} as const;

/**
 * Durações e curvas de movimento.
 */
export const ublTransitions = {
  fast: '120ms ease',
  base: '200ms ease',
  slow: '320ms cubic-bezier(0.2, 0, 0, 1)',
} as const;
