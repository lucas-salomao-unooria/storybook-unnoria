/**
 * Tokens de Medida do Design System ChatGPT.
 *
 * Espelho em TypeScript das coleções `Primitives/Spacing`,
 * `Primitives/Radius` e `Primitives/Sizing` do Figma.
 */

/**
 * Escala de espaçamento (`spacing/0` a `spacing/18`), em px.
 */
export const gptSpacing = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
  7: 20,
  8: 24,
  9: 28,
  10: 32,
  11: 40,
  12: 48,
  13: 56,
  14: 64,
  15: 80,
  16: 96,
  17: 120,
  18: 160,
} as const;

/**
 * Escala de arredondamento (`radius/*`), em px.
 */
export const gptRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  full: 9999,
} as const;

/**
 * Dimensões estruturais (`size/*`), em px.
 */
export const gptSizing = {
  iconXs: 12,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
  avatarSm: 24,
  avatarMd: 32,
  avatarLg: 40,
  avatarXl: 48,
  buttonSm: 32,
  buttonMd: 40,
  buttonLg: 48,
  sidebar: 260,
  inputHeight: 44,
} as const;
