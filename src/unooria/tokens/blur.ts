/**
 * Tokens de Background Blur (Efeitos de Blur de Fundo e Glassmorphism)
 * Plataforma Unooria - Extraído do Figma (Node 6217:97)
 */

export interface BlurToken {
  blur: string;
  blurPx: number;
  opacity: number;
  opacityPercent: string;
}

export const backgroundBlur = {
  300: {
    blur: '8px',
    blurPx: 8,
    opacity: 0.3,
    opacityPercent: '30%',
  },
  400: {
    blur: '16px',
    blurPx: 16,
    opacity: 0.4,
    opacityPercent: '40%',
  },
  500: {
    blur: '32px',
    blurPx: 32,
    opacity: 0.5,
    opacityPercent: '50%',
  },
  700: {
    blur: '48px',
    blurPx: 48,
    opacity: 0.7,
    opacityPercent: '70%',
  },
  900: {
    blur: '64px',
    blurPx: 64,
    opacity: 0.9,
    opacityPercent: '90%',
  },
} as const;

export type BackgroundBlurTokens = typeof backgroundBlur;
export type BackgroundBlurLevel = keyof typeof backgroundBlur;
