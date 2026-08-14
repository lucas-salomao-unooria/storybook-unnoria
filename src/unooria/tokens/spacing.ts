/**
 * Tokens de Espaçamento (Space Tokens)
 * Plataforma Unooria - Extraído do Figma (Node 6189:512)
 */

export interface SpacingTokenDetail {
  name: string;
  key: string;
  px: number;
  rem: string;
  cssVar: string;
}

export const unooriaSpacing = {
  None: { name: 'None', key: 'None', px: 0, rem: '0rem', cssVar: '--unooria-spacing-none' },
  '4XS': { name: '4XS', key: '4XS', px: 2, rem: '0.125rem', cssVar: '--unooria-spacing-4xs' },
  XXXS: { name: 'XXXS', key: 'XXXS', px: 4, rem: '0.25rem', cssVar: '--unooria-spacing-xxxs' },
  XXS: { name: 'XXS', key: 'XXS', px: 8, rem: '0.5rem', cssVar: '--unooria-spacing-xxs' },
  XS: { name: 'XS', key: 'XS', px: 12, rem: '0.75rem', cssVar: '--unooria-spacing-xs' },
  S: { name: 'S', key: 'S', px: 16, rem: '1rem', cssVar: '--unooria-spacing-s' },
  M: { name: 'M', key: 'M', px: 24, rem: '1.5rem', cssVar: '--unooria-spacing-m' },
  L: { name: 'L', key: 'L', px: 32, rem: '2rem', cssVar: '--unooria-spacing-l' },
  XL: { name: 'XL', key: 'XL', px: 48, rem: '3rem', cssVar: '--unooria-spacing-xl' },
  XXL: { name: 'XXL', key: 'XXL', px: 64, rem: '4rem', cssVar: '--unooria-spacing-xxl' },
  XXXL: { name: 'XXXL', key: 'XXXL', px: 80, rem: '5rem', cssVar: '--unooria-spacing-xxxl' },
  '4XL': { name: '4XL', key: '4XL', px: 96, rem: '6rem', cssVar: '--unooria-spacing-4xl' },
} as const;

export type UnooriaSpacingKey = keyof typeof unooriaSpacing;

export const unooriaSpacingPx: Record<UnooriaSpacingKey, number> = {
  None: 0,
  '4XS': 2,
  XXXS: 4,
  XXS: 8,
  XS: 12,
  S: 16,
  M: 24,
  L: 32,
  XL: 48,
  XXL: 64,
  XXXL: 80,
  '4XL': 96,
};
