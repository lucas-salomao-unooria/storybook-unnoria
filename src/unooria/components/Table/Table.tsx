import React, { forwardRef, useState } from 'react';
import {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadCellProps,
  TableCellProps,
  TableSortDirection,
} from './Table.types';
import { TableDropdownMenu } from './TableDropdownMenu';
import { Icon } from '../Icon/Icon';
import { Checkbox } from '../Checkbox/Checkbox';
import './Table.css';

/**
 * Subcomponente TableHeader
 */
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className = '', ...rest }, ref) => (
    <thead ref={ref} className={`unooria-table__header ${className}`} {...rest}>
      {children}
    </thead>
  )
);
TableHeader.displayName = 'Table.Header';

/**
 * Subcomponente TableBody
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = '', ...rest }, ref) => (
    <tbody ref={ref} className={`unooria-table__body ${className}`} {...rest}>
      {children}
    </tbody>
  )
);
TableBody.displayName = 'Table.Body';

/**
 * Subcomponente TableRow
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ secondary = false, selected = false, children, className = '', onClick, ...rest }, ref) => {
    const secondaryClass = secondary ? 'unooria-table__row--secondary' : 'unooria-table__row--default';
    const selectedClass = selected ? 'unooria-table__row--selected' : '';
    const clickableClass = onClick ? 'unooria-table__row--clickable' : '';

    const combinedClassName = [
      'unooria-table__row',
      secondaryClass,
      selectedClass,
      clickableClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <tr ref={ref} className={combinedClassName} onClick={onClick} {...rest}>
        {children}
      </tr>
    );
  }
);
TableRow.displayName = 'Table.Row';

/**
 * Subcomponente TableHeadCell
 */
export const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  (
    {
      align = 'left',
      sortable = false,
      sorted = false,
      sortDirection = 'asc',
      onSort,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const alignClass = `unooria-table__cell--align-${align}`;
    const sortableClass = sortable ? 'unooria-table__head-cell--sortable' : '';

    const combinedClassName = [
      'unooria-table__head-cell',
      alignClass,
      sortableClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <th
        ref={ref}
        scope="col"
        onClick={sortable ? onSort : undefined}
        className={combinedClassName}
        {...rest}
      >
        <div className="unooria-table__head-cell-content">
          <span>{children}</span>
          {sortable && (
            <Icon
              name={
                sorted
                  ? sortDirection === 'asc'
                    ? 'arrow_upward'
                    : 'arrow_downward'
                  : 'unfold_more'
              }
              size="xs"
              color={sorted ? '#0086FF' : '#7C8E94'}
            />
          )}
        </div>
      </th>
    );
  }
);
TableHeadCell.displayName = 'Table.HeadCell';

/**
 * Subcomponente TableCell
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = 'left', children, className = '', ...rest }, ref) => {
    const alignClass = `unooria-table__cell--align-${align}`;
    const combinedClassName = ['unooria-table__cell', alignClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={combinedClassName} {...rest}>
        {children}
      </td>
    );
  }
);
TableCell.displayName = 'Table.Cell';

interface TableComponent
  extends React.ForwardRefExoticComponent<
    TableProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Row: typeof TableRow;
  HeadCell: typeof TableHeadCell;
  Cell: typeof TableCell;
  DropdownMenu: typeof TableDropdownMenu;
}

/**
 * Componente oficial de Tabela (Table) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 19493:47329 & 19689:3273)
 */
export const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      columns,
      data = [],
      keyExtractor,
      zebra = true,
      selectable = false,
      selectedKeys = [],
      onSelectionChange,
      sortColumn: controlledSortColumn,
      sortDirection: controlledSortDirection,
      onSortChange,
      onRowClick,
      size = 'md',
      loading = false,
      emptyText = 'Nenhum registro encontrado.',
      theme = 'light',
      children,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const [internalSortColumn, setInternalSortColumn] = useState<string | undefined>(undefined);
    const [internalSortDirection, setInternalSortDirection] = useState<TableSortDirection>('asc');

    const sortColumn = controlledSortColumn !== undefined ? controlledSortColumn : internalSortColumn;
    const sortDirection =
      controlledSortDirection !== undefined ? controlledSortDirection : internalSortDirection;

    const handleSort = (columnKey: string) => {
      const isCurrent = sortColumn === columnKey;
      const nextDirection: TableSortDirection = isCurrent && sortDirection === 'asc' ? 'desc' : 'asc';

      if (controlledSortColumn === undefined) {
        setInternalSortColumn(columnKey);
        setInternalSortDirection(nextDirection);
      }
      onSortChange?.(columnKey, nextDirection);
    };

    const getKey = (item: any, index: number): string | number => {
      if (keyExtractor) return keyExtractor(item, index);
      return item.id !== undefined ? item.id : item.key !== undefined ? item.key : index;
    };

    const handleSelectAll = () => {
      if (!onSelectionChange) return;
      const allKeys = data.map((item, i) => getKey(item, i));
      if (selectedKeys.length === data.length) {
        onSelectionChange([], []);
      } else {
        onSelectionChange(allKeys, data);
      }
    };

    const handleSelectRow = (key: string | number, record: any) => {
      if (!onSelectionChange) return;
      const exists = selectedKeys.includes(key);
      const nextKeys = exists ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key];
      const nextRows = data.filter((item, i) => nextKeys.includes(getKey(item, i)));
      onSelectionChange(nextKeys, nextRows);
    };

    const sizeClass = `unooria-table-container--size-${size}`;
    const themeClass = theme === 'dark' ? 'unooria-table-container--theme-dark' : '';

    const containerClassName = [
      'unooria-table-container',
      sizeClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClassName} style={style} {...rest}>
        {columns && columns.length > 0 ? (
          <table className="unooria-table">
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHeadCell align="center" style={{ width: '48px' }}>
                    <Checkbox
                      checked={data.length > 0 && selectedKeys.length === data.length}
                      onChange={handleSelectAll}
                      aria-label="Selecionar todas as linhas"
                    />
                  </TableHeadCell>
                )}

                {columns.map((col) => {
                  const isSorted = sortColumn === col.key;
                  return (
                    <TableHeadCell
                      key={col.key}
                      align={col.align || 'left'}
                      sortable={col.sortable}
                      sorted={isSorted}
                      sortDirection={sortDirection}
                      onSort={() => handleSort(col.key)}
                      style={{
                        width: col.width,
                        minWidth: col.minWidth,
                      }}
                    >
                      {col.title}
                    </TableHeadCell>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    align="center"
                    style={{ padding: '32px', color: '#64748B' }}
                  >
                    {emptyText}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((record, index) => {
                  const rowKey = getKey(record, index);
                  const isSelected = selectedKeys.includes(rowKey);
                  const isSecondary = zebra && index % 2 === 1;

                  return (
                    <TableRow
                      key={rowKey}
                      secondary={isSecondary}
                      selected={isSelected}
                      onClick={() => onRowClick?.(record, index)}
                    >
                      {selectable && (
                        <TableCell
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: '48px' }}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleSelectRow(rowKey, record)}
                            aria-label={`Selecionar linha ${index + 1}`}
                          />
                        </TableCell>
                      )}

                      {columns.map((col) => {
                        const cellValue = record[col.key];
                        const renderedContent = col.render
                          ? col.render(cellValue, record, index)
                          : cellValue;

                        return (
                          <TableCell key={col.key} align={col.align || 'left'}>
                            {renderedContent}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </table>
        ) : (
          <table className="unooria-table">{children}</table>
        )}
      </div>
    );
  }
) as TableComponent;

Table.displayName = 'Table';
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeadCell = TableHeadCell;
Table.Cell = TableCell;
Table.DropdownMenu = TableDropdownMenu;

export default Table;
