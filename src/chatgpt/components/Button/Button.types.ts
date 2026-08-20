import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Variantes do conjunto `Button` do Figma (propriedade `Variant`).
 * - `primary`: superfície de marca `interactive/primary` com texto invertido
 * - `secondary`: superfície `bg/inverse` (preta no Light) com texto invertido
 * - `outline`: superfície `bg/primary` com contorno de 1px `border/default`
 * - `ghost`: sem superfície nem contorno, apenas o rótulo
 * - `destructive`: superfície `status/error`
 */
export type GptButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

/**
 * Tamanhos do conjunto `Button` do Figma (propriedade `Size`).
 * - `sm`: 28px de altura · padding 6/12 · rótulo Label/SM
 * - `md`: 34px de altura · padding 8/16 · rótulo Label/MD
 * - `lg`: 44px de altura · padding 12/24 · rótulo Label/LG
 */
export type GptButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente `Button` do Design System ChatGPT.
 */
export interface GptButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Variante visual.
   * @default 'primary'
   */
  variant?: GptButtonVariant;

  /**
   * Tamanho do botão.
   * @default 'md'
   */
  size?: GptButtonSize;

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
   * Conteúdo renderizado antes do rótulo (glifo ou ícone).
   */
  leadingIcon?: React.ReactNode;

  /**
   * Conteúdo renderizado após o rótulo (glifo ou ícone).
   */
  trailingIcon?: React.ReactNode;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

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
