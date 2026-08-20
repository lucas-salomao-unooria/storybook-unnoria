/**
 * Tokens de Elevação do Design System ChatGPT.
 *
 * Espelho em TypeScript dos 4 estilos de efeito publicados no Figma
 * (`Shadow/SM` a `Shadow/XL`) e das duas sombras aplicadas diretamente em
 * componentes (knob do `Toggle` e superfície do `Modal`).
 */

/**
 * Sombras oficiais, prontas para `box-shadow`.
 */
export const gptElevation = {
  /** Shadow/SM — 0 1 2 · preto 5% */
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  /** Shadow/MD — 0 4 8 -2 · preto 10% */
  md: '0 4px 8px -2px rgba(0, 0, 0, 0.1)',
  /** Shadow/LG — 0 8 24 -4 · preto 15% */
  lg: '0 8px 24px -4px rgba(0, 0, 0, 0.15)',
  /** Shadow/XL — 0 16 48 -8 · preto 20% */
  xl: '0 16px 48px -8px rgba(0, 0, 0, 0.2)',
  /** Efeito local do knob do Toggle */
  knob: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
  /** Efeito local da superfície do Modal */
  modal: '0 8px 32px -4px rgba(0, 0, 0, 0.15)',
} as const;
