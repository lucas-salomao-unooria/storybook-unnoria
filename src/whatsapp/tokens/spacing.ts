/**
 * Tokens de Espaçamento e Raio de Borda (Spacing & Radius Tokens)
 * Extraídos diretamente das definições do Figma do Sistema Conversa UI / WhatsApp.
 */

export const spacing = {
  '2xs': '0.25rem', // 4px
  xs: '0.5rem',     // 8px
  sm: '0.75rem',    // 12px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
} as const;

export const spacingPx = {
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const spacingCssVars = {
  '2xs': 'var(--spacing-2xs)',
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  bubble: '18px',
  full: '9999px',
} as const;

export const radiusPx = {
  sm: 4,
  md: 8,
  lg: 12,
  bubble: 18,
  full: 9999,
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;

export const SPACING_BASE_PX = 4;
