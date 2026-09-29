import React from 'react';
import type { UnvTheme } from '../../tokens';
import type { UnvIconName } from '../Icon';

/**
 * Variantes da pílula flutuante.
 * - 'primary': o roxo de ação, com o rótulo em `text-on-action`
 * - 'neutral': a superfície de camada, com contorno fino
 */
export type UnvFloatingButtonVariant = 'primary' | 'neutral';

/**
 * Borda do contêiner em que a pílula flutua.
 */
export type UnvFloatingButtonPlacement = 'top' | 'bottom';

/**
 * Propriedades do componente FloatingButton do Unoovista.
 *
 * Extensão do sistema: a pílula flutuante de rótulo, para ações que pairam
 * sobre o conteúdo que rola.
 *
 * Flutua sobre o contêiner posicionado mais próximo (`position: relative`),
 * centralizada na horizontal. Para ela não rolar junto com um feed, posicione o
 * contêiner da TELA, não o da rolagem.
 */
export interface UnvFloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Rótulo da pílula.
   */
  children: React.ReactNode;

  /**
   * Glifo antes do rótulo, do registro de ícones do Unoovista.
   */
  icon?: UnvIconName;

  /**
   * Variante visual.
   * @default 'primary'
   */
  variant?: UnvFloatingButtonVariant;

  /**
   * Borda do contêiner em que a pílula flutua.
   * @default 'top'
   */
  placement?: UnvFloatingButtonPlacement;

  /**
   * Distância até a borda escolhida em `placement`. Número em pixels ou valor
   * CSS (`'calc(var(--unv-topbar-height) + 8px)'`).
   * @default 'var(--unv-spacing-l)'
   */
  offset?: number | string;

  /**
   * Esconde a pílula com transição (desliga-se em `prefers-reduced-motion`).
   * Escondida, sai da ordem de foco e da árvore de acessibilidade.
   * @default false
   */
  hidden?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem valor, herda o
   * tema do contêiner ancestral (`data-unv-theme`).
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
