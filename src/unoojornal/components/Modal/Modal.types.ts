import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Largura do diálogo.
 * - 'sm': 360px, para confirmações e avisos curtos
 * - 'md': 560px, para texto corrido e formulários (a carta à redação)
 */
export type UjnModalSize = 'sm' | 'md';

/**
 * Propriedades do componente Modal da Unoojornal.
 */
export interface UjnModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /**
   * Diálogo aberto. Fechado, o componente não renderiza nada.
   */
  open: boolean;

  /**
   * Pedido de fechamento: botão "Fechar", Esc e toque no véu.
   */
  onClose: () => void;

  /**
   * Título do diálogo. Nomeia o diálogo (`aria-labelledby`).
   */
  title: React.ReactNode;

  /**
   * Linha de apoio abaixo do título. Descreve o diálogo (`aria-describedby`).
   */
  description?: React.ReactNode;

  /**
   * Conteúdo rolável do diálogo.
   */
  children?: React.ReactNode;

  /**
   * Rodapé com as ações do diálogo, alinhadas à direita.
   */
  footer?: React.ReactNode;

  /**
   * Largura do diálogo.
   * @default 'md'
   */
  size?: UjnModalSize;

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
   * Toque no véu fecha o diálogo. Diferente de um alerta de confirmação, o
   * diálogo do jornal é informativo, então o véu fecha por padrão.
   * @default true
   */
  dismissOnScrim?: boolean;

  /**
   * Elemento que recebe o foco ao abrir. Sem ele, o foco vai para o botão de
   * fechar (ou para o primeiro elemento focável do diálogo).
   */
  initialFocusRef?: React.RefObject<HTMLElement | null>;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
