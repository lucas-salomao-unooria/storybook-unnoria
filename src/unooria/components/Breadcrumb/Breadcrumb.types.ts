import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Tamanhos de exibição tipográfica e espaçamento suportados pelo Breadcrumb.
 */
export type BreadcrumbSize = 'xs' | 's' | 'm';


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
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Componente customizado ou polimórfico para renderização do link (ex: Next.js Link, React Router Link).
   */
  as?: React.ElementType;

  /**
   * Classe CSS adicional para o item/link.
   */
  className?: string;

  /**
   * Estilos CSS inline customizados para o item/link.
   */
  style?: React.CSSProperties;

  /**
   * Rótulo acessível individual para o item (leitores de tela).
   */
  ariaLabel?: string;

  /**
   * Propriedades extras arbitrárias passadas ao elemento do item (ex: `to`, `target`, `rel`, `data-*`).
   */
  [key: string]: unknown;
}

/**
 * Propriedades do componente Breadcrumb da Plataforma Unooria.
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
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
  theme?: UnooriaTheme;

  /**
   * Rótulo acessível da navegação estrutural para leitores de tela.
   * @default 'Breadcrumb'
   */
  ariaLabel?: string;

  /**
   * Tamanho de exibição da tipografia e espaçamentos.
   * @default 's'
   */
  size?: BreadcrumbSize;

  /**
   * Número máximo de itens visíveis antes de colapsar os itens intermediários em "...".
   */
  maxItems?: number;

  /**
   * Quantidade de itens visíveis no início da trilha antes do botão de colapso.
   * @default 1
   */
  itemsBeforeCollapse?: number;

  /**
   * Quantidade de itens visíveis no final da trilha após o botão de colapso.
   * @default 1
   */
  itemsAfterCollapse?: number;
}
