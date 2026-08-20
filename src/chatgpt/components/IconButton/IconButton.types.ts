import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Variantes do conjunto `IconButton` do Figma (propriedade `Variant`).
 * - `default`: sem superfície, glifo em `text/primary`
 * - `filled`: superfície translúcida de 4%, glifo em `text/primary`
 * - `primary`: superfície `interactive/primary`, glifo invertido
 */
export type GptIconButtonVariant = 'default' | 'filled' | 'primary';

/**
 * Tamanhos do conjunto `IconButton` do Figma (propriedade `Size`).
 * - `sm`: 28 × 28px · raio 6 · glifo 12px (`size/icon-xs`)
 * - `md`: 36 × 36px · raio 8 · glifo 16px (`size/icon-sm`)
 * - `lg`: 44 × 44px · raio 12 · glifo 20px (`size/icon-md`)
 */
export type GptIconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente `IconButton` do Design System ChatGPT.
 */
export interface GptIconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref' | 'children'> {
  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: GptIconButtonVariant;

  /**
   * Tamanho do alvo de toque.
   * @default 'md'
   */
  size?: GptIconButtonSize;

  /**
   * Glifo ou ícone renderizado no centro do botão.
   */
  children?: React.ReactNode;

  /**
   * Rótulo acessível obrigatório — o botão não tem texto visível.
   */
  'aria-label': string;

  /**
   * Desabilita a interação.
   * @default false
   */
  disabled?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
