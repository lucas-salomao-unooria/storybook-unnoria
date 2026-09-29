/**
 * Tokens de Espaçamento, Raios, Tamanhos e Elevação — Unoochat.
 *
 * Espelho TypeScript de `spacing.css`. Medidas de tela para um aparelho de
 * 411×823; a escala de ícones segue a da Plataforma Unooria.
 */

/**
 * Escala de espaçamento.
 */
export const uncSpacing = {
  '4xs': '2px',
  '3xs': '4px',
  xxs: '6px',
  xs: '8px',
  s: '10px',
  m: '12px',
  l: '16px',
  xl: '20px',
  xxl: '24px',
  '3xl': '32px',
  '4xl': '48px',
} as const;

/**
 * Raios de borda.
 */
export const uncRadii = {
  xs: '2px',
  s: '4px',
  m: '5px',
  l: '6px',
  xl: '8px',
  pill: '20px',
  full: '1000px',
} as const;

/**
 * Dimensões estruturais das telas.
 */
export const uncLayout = {
  deviceWidth: '411px',
  deviceHeight: '823px',
  gutter: '19px',
  gutterAppbar: '24px',
  statusBarHeight: '21px',
  appBarHeight: '100px',
  appBarTitleHeight: '52px',
  subAppBarHeight: '57px',
  tabRowHeight: '44px',
  callBarHeight: '87px',
  callHeaderHeight: '133px',
} as const;

/**
 * Diâmetros de avatar.
 */
export const uncAvatarSizes = {
  xs: '23px',
  sm: '32px',
  md: '45px',
  lg: '50px',
  ring: '56px',
} as const;

/**
 * Diâmetros dos botões de ação flutuantes.
 */
export const uncFabSizes = {
  lg: '54px',
  chat: '52px',
  mic: '43px',
  sm: '41px',
  endCall: '58px',
} as const;

/**
 * Elevação. A superfície é plana; menus, diálogos, folhas e FABs usam
 * `--unc-elevation-overlay`, definida por tema em `colors.css`.
 */
export const uncElevation = {
  overlay: 'var(--unc-elevation-overlay)',
  none: 'none',
} as const;

/**
 * Objeto consolidado das medidas do Unoochat.
 */
export const uncSpacingTokens = {
  spacing: uncSpacing,
  radii: uncRadii,
  layout: uncLayout,
  avatar: uncAvatarSizes,
  fab: uncFabSizes,
  elevation: uncElevation,
};

export default uncSpacingTokens;
