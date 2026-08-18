import React from 'react';
import { UnooriaTheme } from '../../tokens';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Quantidade total de páginas disponíveis.
   */
  totalPages: number;

  /**
   * Página atualmente ativa (modo controlado).
   */
  currentPage?: number;

  /**
   * Página inicial padrão para o modo não-controlado.
   * @default 1
   */
  defaultPage?: number;

  /**
   * Quantidade de botões de páginas vizinhas exibidas antes e depois da página atual.
   * @default 1
   */
  siblingCount?: number;

  /**
   * Quantidade de botões de páginas exibidas nas extremidades (início e fim).
   * @default 1
   */
  boundaryCount?: number;

  /**
   * Se true, exibe o grupo de salto direto de página ("Ir para página [input] >").
   * Padrão oficial do Figma: true.
   * @default true
   */
  showJumpToPage?: boolean;

  /**
   * Se true, exibe os botões de primeira (`first_page`) e última página (`last_page`).
   * @default false
   */
  showFirstLastButtons?: boolean;

  /**
   * Se true, exibe os botões de anterior e próximo (`keyboard_arrow_left`, `keyboard_arrow_right`).
   * @default true
   */
  showPrevNextButtons?: boolean;

  /**
   * Se true, exibe o seletor de quantidade de itens por página.
   * @default false
   */
  showItemsPerPage?: boolean;

  /**
   * Quantidade de itens por página selecionada.
   * @default 10
   */
  pageSize?: number;

  /**
   * Opções disponíveis para a seleção de itens por página.
   * @default [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];

  /**
   * Quantidade total de registros / itens para exibição de resumo.
   */
  totalItems?: number;

  /**
   * Tamanho visual dos botões de paginação:
   * - `sm`: 26px de altura (Padrão oficial do Figma Node 24440:20534)
   * - `md`: 32px de altura
   * - `lg`: 40px de altura
   * @default 'sm'
   */
  size?: PaginationSize;

  /**
   * Se true, desativa todos os botões e inputs de interação.
   * @default false
   */
  disabled?: boolean;

  /**
   * Tema visual do componente (`light` ou `dark`).
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Texto customizado para o rótulo do salto de página.
   * @default 'Ir para página'
   */
  jumpToPageLabel?: string;

  /**
   * Texto customizado para o rótulo de itens por página.
   * @default 'Itens por página'
   */
  itemsPerPageLabel?: string;

  /**
   * Callback disparado quando o usuário altera a página ativa.
   */
  onPageChange?: (page: number) => void;

  /**
   * Callback disparado quando o usuário altera a quantidade de itens por página.
   */
  onPageSizeChange?: (pageSize: number) => void;
}
