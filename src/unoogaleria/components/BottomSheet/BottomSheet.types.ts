import React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Altura da folha.
 * - 'auto': acompanha o conteúdo, até quase toda a tela
 * - 'half': metade da tela
 * - 'full': a tela inteira, abaixo da barra de status
 */
export type UglBottomSheetHeight = 'auto' | 'half' | 'full';

/**
 * Variante visual da folha.
 * - 'default': superfície elevada do tema
 * - 'immersive': superfície imersiva invariante, para abrir sobre o visualizador
 */
export type UglBottomSheetVariant = 'default' | 'immersive';

/**
 * Propriedades do componente BottomSheet da Unoogaleria.
 */
export interface UglBottomSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /**
   * Folha aberta. Fechada, o componente não renderiza nada.
   */
  open: boolean;

  /**
   * Pedido de fechamento: botão "Fechar", Esc e toque no véu.
   */
  onClose: () => void;

  /**
   * Título da folha. Quando presente, nomeia o diálogo (`aria-labelledby`).
   */
  title?: React.ReactNode;

  /**
   * Linha de apoio abaixo do título. Descreve o diálogo (`aria-describedby`).
   */
  description?: React.ReactNode;

  /**
   * Conteúdo rolável da folha.
   */
  children?: React.ReactNode;

  /**
   * Rodapé fixo abaixo do conteúdo (ações da folha).
   */
  footer?: React.ReactNode;

  /**
   * Altura inicial da folha.
   * @default 'auto'
   */
  height?: UglBottomSheetHeight;

  /**
   * Mostra a alça. A alça é um botão "Expandir"/"Recolher" com `aria-expanded`
   * que alterna entre a altura pedida e a tela inteira.
   * @default true
   */
  handle?: boolean;

  /**
   * Nome acessível do botão de fechar.
   * @default 'Fechar'
   */
  closeLabel?: string;

  /**
   * Mostra o botão de fechar no cabeçalho.
   * @default true
   */
  showClose?: boolean;

  /**
   * Toque no véu fecha a folha.
   * @default true
   */
  dismissOnScrim?: boolean;

  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UglBottomSheetVariant;

  /**
   * Elemento que recebe o foco ao abrir. Sem ele, o foco vai para o botão de
   * fechar (ou para o primeiro elemento focável da folha).
   */
  initialFocusRef?: React.RefObject<HTMLElement | null>;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
