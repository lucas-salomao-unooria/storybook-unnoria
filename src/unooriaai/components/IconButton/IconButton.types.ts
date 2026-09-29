import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Variantes visuais do `IconButton`.
 * - `default`: sem superfície, ícone em `--uai-text-primary`
 * - `filled`: superfície translúcida `--uai-fill-4`, ícone em `--uai-text-primary`
 * - `primary`: superfície `--uai-interactive-primary`, ícone invertido
 */
export type UaiIconButtonVariant = 'default' | 'filled' | 'primary';

/**
 * Tamanhos do `IconButton`.
 * - `sm`: 28 × 28px · raio 6 · ícone 16px
 * - `md`: 36 × 36px · raio 8 · ícone 20px
 * - `lg`: 44 × 44px · raio 12 · ícone 24px
 */
export type UaiIconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente `IconButton` do Design System UnooriaAI.
 */
export interface UaiIconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref' | 'children'> {
  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UaiIconButtonVariant;

  /**
   * Tamanho do alvo de toque.
   * @default 'md'
   */
  size?: UaiIconButtonSize;

  /**
   * Ícone (`Icon`) ou glifo renderizado no centro do botão.
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
  theme?: UaiTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
