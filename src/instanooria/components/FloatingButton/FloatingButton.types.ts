import React from 'react';
import type { InstaTheme } from '../../tokens';
import type { InstaIconName } from '../Icon';

/**
 * Variantes da pílula flutuante.
 * - 'primary': o azul de ação, como a pílula "Novas publicações" do Feed
 * - 'neutral': a superfície de camada, como a pílula "Select multiple" (`0:3218`)
 */
export type InstaFloatingButtonVariant = 'primary' | 'neutral';

/**
 * Borda do contêiner em que a pílula flutua.
 */
export type InstaFloatingButtonPlacement = 'top' | 'bottom';

/**
 * Propriedades do componente FloatingButton do Instanooria.
 *
 * Extensão: o Instagram não tem botão de ação flutuante circular. O que ele
 * tem é a PÍLULA flutuante — "Novas publicações" no Feed, "Select multiple" na
 * tela de adicionar imagem (`0:3163`). É ela que este componente reproduz.
 *
 * Flutua sobre o contêiner posicionado mais próximo (`position: relative`),
 * centralizada na horizontal. Para ela não rolar junto com um feed, posicione o
 * contêiner da TELA, não o da rolagem.
 */
export interface InstaFloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Rótulo da pílula.
   */
  children: React.ReactNode;

  /**
   * Glifo antes do rótulo, do registro de ícones do Instanooria.
   */
  icon?: InstaIconName;

  /**
   * Variante visual.
   * @default 'primary'
   */
  variant?: InstaFloatingButtonVariant;

  /**
   * Borda do contêiner em que a pílula flutua.
   * @default 'top'
   */
  placement?: InstaFloatingButtonPlacement;

  /**
   * Distância até a borda escolhida em `placement`. Número em pixels ou valor
   * CSS (`'calc(var(--insta-topbar-height) + 8px)'`).
   * @default 'var(--insta-spacing-l)'
   */
  offset?: number | string;

  /**
   * Esconde a pílula com transição (desliga-se em `prefers-reduced-motion`).
   * Escondida, sai da ordem de foco e da árvore de acessibilidade.
   * @default false
   */
  hidden?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
