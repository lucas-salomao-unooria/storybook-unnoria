import React from 'react';

/**
 * Alinhamento horizontal do conteúdo da célula
 */
export type TableCellAlign = 'left' | 'center' | 'right';

/**
 * Escala de tamanho da linha da tabela
 */
export type TableSize = 'sm' | 'md' | 'lg';

/**
 * Direção da ordenação da coluna
 */
export type TableSortDirection = 'asc' | 'desc';

/**
 * 11 Variantes oficiais de conteúdo de células do Figma (Node 19493:47348)
 */
export type TableCellVariant =
  | 'text'
  | 'tag'
  | 'avatar'
  | 'checkbox'
  | 'progressBar'
  | 'progressCircle'
  | 'icon'
  | 'switch'
  | 'dropdown'
  | 'image'
  | 'slot';

/**
 * Item do menu dropdown de ações contextuais da linha
 */
export interface TableActionItem {
  key: string;
  label: React.ReactNode;
  icon?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Definição de uma coluna na tabela
 */
export interface TableColumn<T = any> {
  /**
   * Chave única da coluna / propriedade do objeto
   */
  key: string;

  /**
   * Título exibido no cabeçalho da coluna
   */
  title: React.ReactNode;

  /**
   * Alinhamento do conteúdo
   * @default 'left'
   */
  align?: TableCellAlign;

  /**
   * Largura da coluna (ex: '150px', '20%', 120)
   */
  width?: string | number;

  /**
   * Largura mínima da coluna
   */
  minWidth?: string | number;

  /**
   * Se a coluna permite ordenação interativa
   * @default false
   */
  sortable?: boolean;

  /**
   * Função customizada de renderização da célula
   */
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

/**
 * Propriedades do componente mestre Table
 * Plataforma Unooria - Extraído do Figma (Node 19493:47329 & 19689:3273)
 */
export interface TableProps<T = any> {
  /**
   * Definição das colunas da tabela
   */
  columns?: TableColumn<T>[];

  /**
   * Array de dados das linhas
   */
  data?: T[];

  /**
   * Função para extrair a chave única de cada linha
   */
  keyExtractor?: (record: T, index: number) => string | number;

  /**
   * Se verdadeiro, aplica a intercalação de background (Zebra Striping) nas linhas
   * @default true
   */
  zebra?: boolean;

  /**
   * Se verdadeiro, exibe coluna com checkbox para seleção múltipla de linhas
   * @default false
   */
  selectable?: boolean;

  /**
   * Chaves das linhas selecionadas no modo controlado
   */
  selectedKeys?: (string | number)[];

  /**
   * Callback disparado quando a seleção de linhas é alterada
   */
  onSelectionChange?: (keys: (string | number)[], selectedRows: T[]) => void;

  /**
   * Chave da coluna atualmente ordenada
   */
  sortColumn?: string;

  /**
   * Direção da ordenação atual: 'asc' ou 'desc'
   */
  sortDirection?: TableSortDirection;

  /**
   * Callback disparado ao alterar a ordenação de uma coluna
   */
  onSortChange?: (columnKey: string, direction: TableSortDirection) => void;

  /**
   * Callback disparado ao clicar em uma linha
   */
  onRowClick?: (record: T, index: number) => void;

  /**
   * Escala de tamanho das linhas:
   * - `sm`: 40px altura
   * - `md`: 50px altura (padrão oficial do Figma)
   * - `lg`: 60px altura
   * @default 'md'
   */
  size?: TableSize;

  /**
   * Se verdadeiro, exibe estado de carregamento
   * @default false
   */
  loading?: boolean;

  /**
   * Conteúdo exibido quando não houver dados
   */
  emptyText?: React.ReactNode;

  /**
   * Tema visual: 'light' (fundo claro) ou 'dark' (fundo escuro #22272A)
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Subcomponentes declarativos (modo Compound Component)
   */
  children?: React.ReactNode;

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;
}

/**
 * Propriedades do cabeçalho da tabela (TableHeader)
 */
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

/**
 * Propriedades do corpo da tabela (TableBody)
 */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

/**
 * Propriedades da linha da tabela (TableRow)
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Se a linha está no estado zebra secundário
   */
  secondary?: boolean;

  /**
   * Se a linha está selecionada
   */
  selected?: boolean;

  /**
   * Filhos da linha (células)
   */
  children?: React.ReactNode;
}

/**
 * Propriedades da célula do cabeçalho (TableHeadCell)
 */
export interface TableHeadCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
  sortable?: boolean;
  sorted?: boolean;
  sortDirection?: TableSortDirection;
  onSort?: () => void;
  children?: React.ReactNode;
}

/**
 * Propriedades da célula comum da tabela (TableCell)
 */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableCellAlign;
  children?: React.ReactNode;
}

/**
 * Propriedades do menu de ações dropdown da linha (TableDropdownMenu)
 */
export interface TableDropdownMenuProps {
  actions: TableActionItem[];
  theme?: 'light' | 'dark';
}
