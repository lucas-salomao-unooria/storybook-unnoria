import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Estados do conjunto `NavItem` do Figma (propriedade `State`).
 * - `default`: sem superfície, rótulo a 60% de opacidade
 * - `active`: superfície translúcida de 4%, rótulo a 100%
 * - `hover`: superfície translúcida de 2%, rótulo a 80%
 */
export type GptNavItemState = 'default' | 'active' | 'hover';

/**
 * Propriedades do componente `NavItem` do Design System ChatGPT.
 */
export interface GptNavItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Estado visual. `hover` fixa a superfície de 2% para matrizes de
   * documentação; o estado também aparece naturalmente ao passar o cursor.
   * @default 'default'
   */
  state?: GptNavItemState;

  /**
   * Glifo renderizado antes do rótulo. O arquivo usa `💬`
   * (`gptGlyphs.chat`).
   */
  glyph?: React.ReactNode;

  /**
   * Elemento raiz renderizado — permite usar o item como âncora.
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
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Rótulo da conversa.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
