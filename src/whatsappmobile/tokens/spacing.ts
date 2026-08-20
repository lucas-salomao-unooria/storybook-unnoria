/**
 * Tokens de Espaçamento, Raios, Tamanhos e Elevação — WhatsApp Mobile.
 *
 * Espelho TypeScript de `spacing.css`. Todas as medidas derivam dos frames de
 * 411×823 (Google Pixel 2 XL) do arquivo Figma de origem.
 */

/**
 * Escala de espaçamento.
 */
export const waSpacing = {
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
export const waRadii = {
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
export const waLayout = {
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
export const waAvatarSizes = {
  xs: '23px',
  sm: '32px',
  md: '45px',
  lg: '50px',
  ring: '56px',
} as const;

/**
 * Diâmetros dos botões de ação flutuantes.
 */
export const waFabSizes = {
  lg: '54px',
  chat: '52px',
  mic: '43px',
  sm: '41px',
  endCall: '58px',
} as const;

/**
 * Elevação. O arquivo aplica um único drop shadow, no glifo dos FABs.
 */
export const waElevation = {
  fab: '0 4px 2px rgba(0, 0, 0, 0.25)',
  none: 'none',
} as const;

/**
 * Objeto consolidado das medidas do WhatsApp Mobile.
 */
export const waSpacingTokens = {
  spacing: waSpacing,
  radii: waRadii,
  layout: waLayout,
  avatar: waAvatarSizes,
  fab: waFabSizes,
  elevation: waElevation,
};

export default waSpacingTokens;
