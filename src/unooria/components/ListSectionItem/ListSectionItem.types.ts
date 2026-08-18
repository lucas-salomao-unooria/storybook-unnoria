import React from 'react';

/**
 * Tipo de elemento visual líder à esquerda
 */
export type ListSectionItemVisual = 'icon' | 'avatar' | 'none';

/**
 * Propriedades do componente ListSectionItem (Item de Lista de Seção / Linha de Módulo)
 * Plataforma Unooria - Extraído do Figma (Node 6101:5691 / Component Set 1537:4807)
 */
export interface ListSectionItemProps {
  /**
   * Título principal do item (18px SemiBold)
   */
  title: React.ReactNode;

  /**
   * Linha de descrição primária (14px Regular)
   */
  description?: React.ReactNode;

  /**
   * Linha de metadados secundária (12px Regular - datas, contadores ou durações)
   */
  metadata?: React.ReactNode;

  /**
   * Categoria ou subtítulo superior exibido acima do título
   */
  category?: React.ReactNode;

  /**
   * Tipo de elemento visual exibido à esquerda:
   * - `icon`: Ícone temático
   * - `avatar`: Imagem de avatar
   * - `none`: Sem elemento visual adicional
   * @default 'none'
   */
  visual?: ListSectionItemVisual;

  /**
   * Nome do ícone Material Symbols ou elemento React customizado
   */
  icon?: string | React.ReactNode;

  /**
   * Elemento Avatar ou URL da imagem
   */
  avatar?: React.ReactNode;

  /**
   * Se verdadeiro, exibe caixa de seleção (Checkbox) à esquerda
   * @default false
   */
  showCheckbox?: boolean;

  /**
   * Estado selecionado do checkbox
   */
  checked?: boolean;

  /**
   * Callback disparado ao alterar o checkbox
   */
  onCheckChange?: (checked: boolean) => void;

  /**
   * Tag ou badge de status exibido à direita
   */
  tag?: React.ReactNode;

  /**
   * Se verdadeiro, exibe interruptor (Toggle) à direita
   * @default false
   */
  showToggle?: boolean;

  /**
   * Estado ligado/desligado do toggle
   */
  toggleChecked?: boolean;

  /**
   * Callback disparado ao alternar o toggle
   */
  onToggleChange?: (checked: boolean) => void;

  /**
   * Slot para ações customizadas ou dropdowns à direita
   */
  actions?: React.ReactNode;

  /**
   * Se verdadeiro, exibe botão com ícone de mais opções (more_vert)
   * @default false
   */
  showMoreAction?: boolean;

  /**
   * Callback disparado ao clicar no botão de mais opções
   */
  onMoreActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Se verdadeiro, exibe ícone de chevron_right indicando navegação
   * @default false
   */
  showChevron?: boolean;

  /**
   * Callback disparado ao clicar no card da linha
   */
  onClick?: () => void;

  /**
   * Se o item está com seleção ativa no contexto de lista
   * @default false
   */
  selected?: boolean;

  /**
   * Desabilita a interação com o item
   * @default false
   */
  disabled?: boolean;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;
}
