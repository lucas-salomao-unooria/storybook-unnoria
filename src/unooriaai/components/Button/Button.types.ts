import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Variantes visuais do `Button`.
 * - `primary`: superfície `--uai-interactive-primary` (roxo) com texto invertido
 * - `secondary`: superfície `--uai-bg-inverse` (a mais escura no tema claro, a mais clara no escuro) com texto invertido
 * - `outline`: superfície `--uai-bg-primary` com contorno de 1px `--uai-border-control`
 * - `ghost`: sem superfície nem contorno, apenas o rótulo
 * - `destructive`: superfície `--uai-status-error`
 */
export type UaiButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

/**
 * Tamanhos do `Button`.
 * - `sm`: 30px de altura · padding 6/12 · rótulo Label/SM
 * - `md`: 36px de altura · padding 8/16 · rótulo Label/MD
 * - `lg`: 48px de altura · padding 12/24 · rótulo Label/LG
 */
export type UaiButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente `Button` do Design System UnooriaAI.
 */
export interface UaiButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Variante visual.
   * @default 'primary'
   */
  variant?: UaiButtonVariant;

  /**
   * Tamanho do botão.
   * @default 'md'
   */
  size?: UaiButtonSize;

  /**
   * Ocupa toda a largura disponível do contêiner.
   * @default false
   */
  block?: boolean;

  /**
   * Desabilita a interação.
   * @default false
   */
  disabled?: boolean;

  /**
   * Conteúdo renderizado antes do rótulo — tipicamente um `Icon` (16px no `sm`, 20px no `md`, 24px no `lg`).
   */
  leadingIcon?: React.ReactNode;

  /**
   * Conteúdo renderizado após o rótulo — tipicamente um `Icon`.
   */
  trailingIcon?: React.ReactNode;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Elemento raiz renderizado — permite usar o botão como âncora.
   * @default 'button'
   */
  as?: React.ElementType;

  /**
   * URL de destino quando `as` renderiza uma âncora.
   */
  href?: string;

  /**
   * Alvo de navegação quando `as` renderiza uma âncora.
   */
  target?: React.HTMLAttributeAnchorTarget;

  /**
   * Relação do link quando `as` renderiza uma âncora.
   */
  rel?: string;

  /**
   * Rótulo do botão.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
