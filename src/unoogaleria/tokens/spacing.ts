/**
 * Tokens de Espaçamento, Raios, Dimensões, Movimento e Camadas da Unoogaleria.
 * Espelho TypeScript de `spacing.css`, sobre a tela de 390×844.
 */

/**
 * Chaves da escala de espaçamento.
 */
export type UglSpacingToken =
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
  | '4xl';

/**
 * Escala de espaçamento em pixels.
 */
export const uglSpacing: Record<UglSpacingToken, number> = {
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
};

/**
 * Ordem canônica da escala para exibição em documentação.
 */
export const uglSpacingOrder: UglSpacingToken[] = [
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
];

/**
 * Raios de borda em pixels.
 */
export const uglRadii = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  full: 1000,
} as const;

/**
 * Dimensões estruturais da tela e das barras.
 */
export const uglLayout = {
  gutter: 16,
  gridGap: 2,
  screenWidth: 390,
  screenHeight: 844,
  statusBarHeight: 47,
  homeIndicatorHeight: 34,
  topBarHeight: 44,
  tabBarHeight: 50,
  toolbarHeight: 50,
  touchTarget: 44,
} as const;

/**
 * Tamanhos nomeados de ícone, com o degrau de `--unooria-icon-size-*` de origem.
 */
export const uglIconSizes = {
  xs: { value: 16, unooria: '--unooria-icon-size-3xs' },
  sm: { value: 20, unooria: '--unooria-icon-size-xs' },
  md: { value: 24, unooria: '--unooria-icon-size-s' },
  lg: { value: 32, unooria: '--unooria-icon-size-m' },
  xl: { value: 48, unooria: '--unooria-icon-size-xl' },
} as const;

/**
 * Diâmetros de avatar.
 */
export const uglAvatarSizes = {
  sm: 32,
  md: 48,
  lg: 64,
} as const;

/**
 * Desfoque das barras translúcidas (`--unooria-blur-400`).
 */
export const uglBlurBar = 16;

/**
 * Durações e curvas de movimento.
 */
export const uglMotion = {
  fast: '120ms ease',
  base: '200ms ease',
  slow: '320ms cubic-bezier(0.2, 0, 0, 1)',
} as const;

/**
 * Camadas de empilhamento dentro da tela, de baixo para cima.
 */
export const uglZIndex = {
  bar: 10,
  viewer: 20,
  sheet: 30,
  dialog: 40,
  toast: 50,
  statusbar: 60,
} as const;

/**
 * Fios de 1px, como declarados em `spacing.css`.
 */
export const uglElevation = {
  hairlineBottom: '0 1px 0 0 var(--ugl-color-border-subtle)',
  hairlineTop: '0 -1px 0 0 var(--ugl-color-border-subtle)',
} as const;
