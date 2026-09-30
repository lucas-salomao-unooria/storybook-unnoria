import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Uma ação do menu.
 */
export interface UglActionMenuAction {
  /** Identificador único da ação */
  id: string;
  /** Rótulo exibido e nome acessível */
  label: string;
  /** Glifo à direita do rótulo */
  icon?: UglIconName;
  /**
   * Tom da ação: 'danger' pinta rótulo e glifo de vermelho ("Excluir").
   * @default 'default'
   */
  tone?: 'default' | 'danger';
  /** Ação indisponível: continua visível e é pulada pelas setas */
  disabled?: boolean;
  /** Chamado ao escolher a ação. O menu fecha logo depois. */
  onSelect: () => void;
}

/**
 * Divisor entre grupos de ações.
 */
export interface UglActionMenuDivider {
  /** Marca o item como divisor */
  type: 'divider';
  /** Identificador único do divisor */
  id: string;
}

/**
 * Item do menu: uma ação ou um divisor.
 */
export type UglActionMenuItem = UglActionMenuAction | UglActionMenuDivider;

/**
 * Posição do menu em relação à âncora.
 * - 'bottom-end': abaixo, alinhado pela direita (padrão — botão "Mais" no topo direito)
 * - 'bottom-start': abaixo, alinhado pela esquerda
 * - 'top-end': acima, alinhado pela direita (botão na barra inferior)
 * - 'top-start': acima, alinhado pela esquerda
 */
export type UglActionMenuPlacement = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';

/**
 * Posição fixa, em pixels relativos ao contêiner posicionado (a tela do aparelho).
 */
export interface UglActionMenuAnchor {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * Variante visual do menu.
 * - 'default': superfície elevada do tema
 * - 'immersive': barra imersiva translúcida, para abrir sobre o visualizador
 */
export type UglActionMenuVariant = 'default' | 'immersive';

/**
 * Propriedades do componente ActionMenu da Unoogaleria.
 */
export interface UglActionMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Menu aberto. Fechado, o componente não renderiza nada.
   */
  open: boolean;

  /**
   * Pedido de fechamento: Esc, Tab, toque fora ou escolha de uma ação.
   */
  onClose: () => void;

  /**
   * Ações e divisores, na ordem de exibição.
   */
  items: UglActionMenuItem[];

  /**
   * Posição do menu em relação à âncora.
   * @default 'bottom-end'
   */
  placement?: UglActionMenuPlacement;

  /**
   * Posição fixa em pixels relativos ao contêiner. Ignorada quando há `anchorRef`.
   */
  anchor?: UglActionMenuAnchor;

  /**
   * Elemento que abriu o menu. O menu se posiciona junto a ele, dentro do
   * contêiner posicionado mais próximo (e acompanha a escala do `PhoneFrame`).
   */
  anchorRef?: React.RefObject<HTMLElement | null>;

  /**
   * Nome acessível do menu. Obrigatório: um menu sem título não tem outro nome.
   */
  ariaLabel: string;

  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UglActionMenuVariant;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
