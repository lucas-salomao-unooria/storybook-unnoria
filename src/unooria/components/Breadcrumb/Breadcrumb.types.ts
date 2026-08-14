import React from 'react';

/**
 * Interface que representa um item individual do Breadcrumb.
 */
export interface BreadcrumbItem {
  /**
   * Rótulo ou conteúdo visual do item (texto, elemento React, etc.).
   */
  label: React.ReactNode;

  /**
   * URL de destino do item. Se omitido ou se `isCurrent` for true, o item é renderizado como texto/botão sem link ativo.
   */
  href?: string;

  /**
   * Ícone opcional exibido antes do rótulo do item.
   */
  icon?: React.ReactNode;

  /**
   * Indica se este item representa a página atual.
   * Quando `true`, recebe o atributo `aria-current="page"` e estilização de estado ativo.
   */
  isCurrent?: boolean;

  /**
   * Handler opcional para o evento de clique.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>) => void;

  /**
   * Rótulo acessível individual para o item.
   */
  ariaLabel?: string;
}

/**
 * Propriedades do componente Breadcrumb.
 */
export interface BreadcrumbProps {
  /**
   * Lista de itens do breadcrumb em ordem hierárquica.
   */
  items: BreadcrumbItem[];

  /**
   * Elemento ou ícone customizado para separação entre itens.
   * Se não for fornecido, um ícone de seta (ChevronRight) otimizado é utilizado por padrão.
   */
  separator?: React.ReactNode;

  /**
   * Tema visual para o componente: 'light' (claro) ou 'dark' (escuro).
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Rótulo acessível da navegação estrutural para leitores de tela.
   * @default 'Breadcrumb'
   */
  ariaLabel?: string;

  /**
   * Tamanho de exibição da tipografia e espaçamentos.
   * @default 's'
   */
  size?: 'xs' | 's' | 'm';

  /**
   * Número máximo de itens visíveis antes de colapsar os itens intermediários em "...".
   */
  maxItems?: number;

  /**
   * Classes CSS adicionais para o container `<nav>`.
   */
  className?: string;

  /**
   * Estilos inline customizados para o container `<nav>`.
   */
  style?: React.CSSProperties;
}
