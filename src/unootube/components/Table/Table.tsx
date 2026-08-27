import React from 'react';
import type {
  UniTableBodyProps,
  UniTableCellProps,
  UniTableHeadProps,
  UniTableProps,
  UniTableRowProps,
} from './Table.types';
import './Table.css';

/** Cabeçalho da tabela. Suas células viram `<th scope="col">`. */
const TableHead: React.FC<UniTableHeadProps> = ({ children, className = '', ...restProps }) => (
  <thead className={['uni-table__head', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
  </thead>
);

TableHead.displayName = 'Table.Head';

/** Corpo da tabela. */
const TableBody: React.FC<UniTableBodyProps> = ({ children, className = '', ...restProps }) => (
  <tbody className={['uni-table__body', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
  </tbody>
);

TableBody.displayName = 'Table.Body';

/** Linha da tabela. */
const TableRow: React.FC<UniTableRowProps> = ({
  selected = false,
  children,
  className = '',
  ...restProps
}) => (
  <tr
    className={['uni-table__row', selected ? 'uni-table__row--selected' : '', className]
      .filter(Boolean)
      .join(' ')}
    aria-selected={selected || undefined}
    {...restProps}
  >
    {children}
  </tr>
);

TableRow.displayName = 'Table.Row';

/**
 * Célula da tabela.
 *
 * Renderiza `<th scope="col">` com `header` e `<td>` sem ele. A prop é
 * explícita de propósito: injetá-la a partir do `Table.Head` exigiria um
 * contexto React, o que tornaria a tabela inteira um Client Component sem
 * ganho — ela não tem estado nenhum. Ver a seção 4.5 do AGENTS.md.
 */
const TableCell: React.FC<UniTableCellProps> = ({
  header = false,
  align = 'start',
  nowrap = false,
  children,
  className = '',
  ...restProps
}) => {
  const classes = [
    'uni-table__cell',
    `uni-table__cell--${align}`,
    nowrap ? 'uni-table__cell--nowrap' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (header) {
    return (
      <th scope="col" className={classes} {...restProps}>
        {children}
      </th>
    );
  }

  return (
    <td className={classes} {...restProps}>
      {children}
    </td>
  );
};

TableCell.displayName = 'Table.Cell';

interface TableComponent
  extends React.ForwardRefExoticComponent<UniTableProps & React.RefAttributes<HTMLTableElement>> {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
}

/**
 * Componente Table — Design System Unootube
 *
 * EXTENSÃO DECLARADA. Nenhum dos dois arquivos de origem publica tabela — o
 * produto de referência organiza conteúdo em cartão e em lista, nunca em grade
 * de dados. O componente existe porque um painel de aluno precisa de uma, e a
 * alternativa seria trazer a `Table` da Plataforma Unooria, com Open Sans e a
 * paleta navy, para o meio de uma tela Roboto.
 *
 * A régua não foi inventada: é a da **linha de lista**, que os arquivos
 * publicam à exaustão. Altura de 40px (`8:126`), divisor de 1px em
 * `border/subtle` — o mesmo fio que separa as seções da barra lateral —,
 * rótulo em `Label/Large` e conteúdo em `Body/Medium`. A biblioteca é plana:
 * nenhuma sombra, exatamente como as listas do arquivo.
 *
 * A tabela é semântica de verdade: `<table>` com `<thead>`, `<tbody>` e
 * `<th scope="col">`. A rolagem horizontal fica num contêiner próprio com
 * `tabindex`, para que quem navega por teclado alcance colunas fora da tela.
 */
export const Table = React.forwardRef<HTMLTableElement, UniTableProps>(
  (
    {
      dense = false,
      zebra = false,
      stickyHeader = false,
      caption,
      children,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div
      className="uni-table__scroll uni-scrollbar"
      /*
       * `tabindex` e `role="group"` no contêiner de rolagem: sem eles, uma
       * tabela mais larga que a tela tem colunas inalcançáveis por teclado.
       */
      tabIndex={0}
      role="group"
    >
      <table
        ref={ref}
        className={[
          'uni-table',
          dense ? 'uni-table--dense' : '',
          zebra ? 'uni-table--zebra' : '',
          stickyHeader ? 'uni-table--sticky' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
      >
        {caption != null && <caption className="uni-table__caption">{caption}</caption>}
        {children}
      </table>
    </div>
  )
) as TableComponent;

Table.displayName = 'Table';
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
