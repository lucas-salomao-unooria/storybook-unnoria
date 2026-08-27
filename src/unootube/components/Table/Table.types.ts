import React from 'react';

/**
 * Propriedades da tabela do Unootube.
 *
 * EXTENSÃO DECLARADA: nenhum dos dois arquivos de origem publica tabela. A
 * régua foi derivada da **linha de lista**, que os arquivos publicam à
 * exaustão: altura de 40px (`--uni-sidebar-item-height`, node `8:126`), fio de
 * 1px em `border/subtle` como divisor, rótulo em `Label/Large` e conteúdo em
 * `Body/Medium`.
 */
export interface UniTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Reduz a altura da linha de 40px para 32px, para tabelas densas.
   * @default false
   */
  dense?: boolean;

  /**
   * Alterna a superfície das linhas. O arquivo separa listas por fio, não por
   * faixa — a listra é extensão e vem desligada.
   * @default false
   */
  zebra?: boolean;

  /**
   * Mantém o cabeçalho fixo durante a rolagem vertical. Exige que o contêiner
   * tenha altura definida.
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Legenda da tabela, lida por leitores de tela. Visualmente oculta.
   * Informe uma quando a tabela não tiver um título próximo que a descreva.
   */
  caption?: React.ReactNode;

  /** Componha com `Table.Head`, `Table.Body`, `Table.Row` e `Table.Cell`. */
  children?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}

/** Propriedades do cabeçalho da tabela. */
export type UniTableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

/** Propriedades do corpo da tabela. */
export type UniTableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

/** Propriedades de uma linha. */
export interface UniTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Marca a linha como selecionada, com a superfície de seleção da marca. */
  selected?: boolean;
}

/** Propriedades de uma célula. */
export interface UniTableCellProps
  /*
   * `align` do HTML é o atributo de apresentação legado, que só aceita
   * `left | right | center | justify | char`. A prop do componente usa a
   * escada lógica `start | center | end`, que respeita direção de leitura —
   * daí o `Omit`.
   */
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /**
   * Renderiza a célula como `<th scope="col">` em vez de `<td>`. Use em todas
   * as células de `Table.Head`.
   */
  header?: boolean;
  /**
   * Alinhamento do conteúdo.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /** Impede a quebra de linha, para colunas numéricas curtas. */
  nowrap?: boolean;
}
