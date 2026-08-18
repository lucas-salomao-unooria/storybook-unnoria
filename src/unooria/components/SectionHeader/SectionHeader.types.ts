import React from 'react';

/**
 * Variantes de visualização do SectionHeader
 */
export type SectionHeaderVariant = 'default' | 'mobile' | 'compact';

/**
 * Propriedades do componente SectionHeader (Cabeçalho de Seção e Página)
 * Plataforma Unooria - Extraído do Figma (Node 22677:2549 / Component Set 24591:12975)
 */
export interface SectionHeaderProps {
  /**
   * Título principal da página ou seção
   * (Desktop: 24px Bold / Mobile: 20px Bold)
   */
  title: React.ReactNode;

  /**
   * Texto de apoio ou descrição explicativa abaixo do título
   * (12px Regular / #383E41)
   */
  description?: React.ReactNode;

  /**
   * Se verdadeiro, exibe botão de retorno (ícone arrow_back) à esquerda do título
   * @default false
   */
  showBack?: boolean;

  /**
   * Callback disparado ao clicar no botão de retorno
   */
  onBack?: () => void;

  /**
   * Elemento de badge, tag ou contador posicionado ao lado do título
   */
  badge?: React.ReactNode;

  /**
   * Se verdadeiro, exibe campo de busca integrado (SearchInput)
   * @default false
   */
  showSearch?: boolean;

  /**
   * Valor controlado do campo de busca
   */
  searchValue?: string;

  /**
   * Valor padrão inicial do campo de busca
   */
  defaultSearchValue?: string;

  /**
   * Callback disparado ao digitar no campo de busca
   */
  onSearchChange?: (value: string) => void;

  /**
   * Callback disparado ao pressionar Enter no campo de busca
   */
  onSearchSubmit?: (value: string) => void;

  /**
   * Texto do placeholder da busca
   * @default 'Pesquisar...'
   */
  searchPlaceholder?: string;

  /**
   * Se verdadeiro, exibe botão de filtro (#6487C2 / filter_alt)
   * @default false
   */
  showFilter?: boolean;

  /**
   * Callback disparado ao clicar no botão de filtro
   */
  onFilterClick?: () => void;

  /**
   * Indica visualmente se há filtros ativos
   * @default false
   */
  filterActive?: boolean;

  /**
   * Slot para botões adicionais de ação, menus ou dropdowns à direita
   */
  actions?: React.ReactNode;

  /**
   * Se verdadeiro, exibe linha divisória sutil na base do cabeçalho
   * @default false
   */
  divider?: boolean;

  /**
   * Variante de layout:
   * - `default`: Layout desktop horizontal completo
   * - `mobile`: Layout vertical empilhado responsivo
   * - `compact`: Layout condensado para uso interno em cards
   * @default 'default'
   */
  variant?: SectionHeaderVariant;

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
