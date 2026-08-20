'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { PaginationProps } from './Pagination.types';
import { Icon } from '../Icon/Icon';
import './Pagination.css';

/**
 * Gera o array de páginas e elipses a serem renderizadas
 */
function generatePaginationRange(
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1,
  boundaryCount: number = 1
): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  // Quantidade total de blocos a serem exibidos
  const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPages - boundaryCount
  );

  const shouldShowLeftEllipsis = leftSiblingIndex > boundaryCount + 1;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - boundaryCount;

  const firstBoundaryPages = Array.from(
    { length: boundaryCount },
    (_, i) => i + 1
  );
  const lastBoundaryPages = Array.from(
    { length: boundaryCount },
    (_, i) => totalPages - boundaryCount + i + 1
  );

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis-end', ...lastBoundaryPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [...firstBoundaryPages, 'ellipsis-start', ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [
      ...firstBoundaryPages,
      'ellipsis-start',
      ...middleRange,
      'ellipsis-end',
      ...lastBoundaryPages,
    ];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

/**
 * Componente oficial de Paginação do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 24440:20534 / 5223:314)
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      totalPages,
      currentPage: controlledPage,
      defaultPage = 1,
      siblingCount = 1,
      boundaryCount = 1,
      showJumpToPage = true,
      showFirstLastButtons = false,
      showPrevNextButtons = true,
      showItemsPerPage = false,
      pageSize = 10,
      pageSizeOptions = [10, 20, 50, 100],
      totalItems,
      size = 'sm',
      disabled = false,
      theme = 'light',
      jumpToPageLabel = 'Ir para página',
      itemsPerPageLabel = 'Itens por página',
      onPageChange,
      onPageSizeChange,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    /**
     * `totalItems` é documentado como "quantidade total de registros para
     * exibição de resumo", mas o Figma da paginação (Node 24440:20534) não
     * possui essa área de resumo e nenhum slot/estilo existe para ela. A prop
     * é desestruturada apenas para não vazar como atributo inválido no <nav>
     * via `...rest`; a exibição do resumo depende de definição de design.
     */
    void totalItems;

    const [internalPage, setInternalPage] = useState<number>(
      Math.max(1, Math.min(defaultPage, totalPages))
    );
    const [jumpInputValue, setJumpInputValue] = useState<string>('');

    const isControlled = controlledPage !== undefined;
    const activePage = isControlled
      ? Math.max(1, Math.min(controlledPage, totalPages))
      : internalPage;

    useEffect(() => {
      if (!isControlled && defaultPage) {
        setInternalPage(Math.max(1, Math.min(defaultPage, totalPages)));
      }
    }, [defaultPage, totalPages, isControlled]);

    const changePage = (newPage: number) => {
      if (disabled) return;
      const clampedPage = Math.max(1, Math.min(newPage, totalPages));
      if (clampedPage !== activePage) {
        if (!isControlled) {
          setInternalPage(clampedPage);
        }
        onPageChange?.(clampedPage);
      }
    };

    const handleJumpSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
      if (disabled || !jumpInputValue.trim()) return;
      const parsed = parseInt(jumpInputValue, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
        changePage(parsed);
        setJumpInputValue('');
      }
    };

    const paginationRange = generatePaginationRange(
      totalPages,
      activePage,
      siblingCount,
      boundaryCount
    );

    const isFirstPage = activePage <= 1;
    const isLastPage = activePage >= totalPages;
    const isDark = theme === 'dark';

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Paginação"
        className={`unooria-pagination unooria-pagination--size-${size} ${
          isDark ? 'unooria-pagination--theme-dark' : ''
        } ${disabled ? 'unooria-pagination--disabled' : ''} ${className}`.trim()}
        style={style}
        {...rest}
      >
        {/* Grupo de Páginas & Setas */}
        <div className="unooria-pagination__pages-group">
          {/* Botão Primeira Página */}
          {showFirstLastButtons && (
            <button
              type="button"
              disabled={disabled || isFirstPage}
              onClick={() => changePage(1)}
              className="unooria-pagination__nav-btn"
              aria-label="Ir para a primeira página"
            >
              <Icon name="first_page" size={size === 'lg' ? 's' : 'xs'} color="currentColor" />
            </button>
          )}

          {/* Botão Anterior */}
          {showPrevNextButtons && (
            <button
              type="button"
              disabled={disabled || isFirstPage}
              onClick={() => changePage(activePage - 1)}
              className="unooria-pagination__nav-btn"
              aria-label="Página anterior"
            >
              <Icon name="keyboard_arrow_left" size={size === 'lg' ? 's' : 'xs'} color="currentColor" />
            </button>
          )}

          {/* Números e Elipses */}
          {paginationRange.map((item, idx) => {
            if (item === 'ellipsis-start' || item === 'ellipsis-end') {
              return (
                <span key={`${item}-${idx}`} className="unooria-pagination__ellipsis">
                  ...
                </span>
              );
            }

            const pageNumber = item as number;
            const isActive = pageNumber === activePage;

            return (
              <button
                key={pageNumber}
                type="button"
                disabled={disabled}
                onClick={() => changePage(pageNumber)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Página ${pageNumber}`}
                className={`unooria-pagination__page-btn ${
                  isActive ? 'unooria-pagination__page-btn--active' : ''
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Botão Próximo */}
          {showPrevNextButtons && (
            <button
              type="button"
              disabled={disabled || isLastPage}
              onClick={() => changePage(activePage + 1)}
              className="unooria-pagination__nav-btn"
              aria-label="Próxima página"
            >
              <Icon name="keyboard_arrow_right" size={size === 'lg' ? 's' : 'xs'} color="currentColor" />
            </button>
          )}

          {/* Botão Última Página */}
          {showFirstLastButtons && (
            <button
              type="button"
              disabled={disabled || isLastPage}
              onClick={() => changePage(totalPages)}
              className="unooria-pagination__nav-btn"
              aria-label="Ir para a última página"
            >
              <Icon name="last_page" size={size === 'lg' ? 's' : 'xs'} color="currentColor" />
            </button>
          )}
        </div>

        {/* Grupo "Ir para página" */}
        {showJumpToPage && (
          <form
            onSubmit={handleJumpSubmit}
            className="unooria-pagination__jump-group"
          >
            <span className="unooria-pagination__jump-label">
              {jumpToPageLabel}
            </span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={jumpInputValue}
              disabled={disabled}
              placeholder=""
              onChange={(e) => setJumpInputValue(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleJumpSubmit();
                }
              }}
              className="unooria-pagination__jump-input"
              aria-label={jumpToPageLabel}
            />
            <button
              type="button"
              disabled={disabled || !jumpInputValue.trim()}
              onClick={() => handleJumpSubmit()}
              className="unooria-pagination__nav-btn"
              aria-label="Confirmar salto de página"
            >
              <Icon name="keyboard_arrow_right" size={size === 'lg' ? 's' : 'xs'} color="currentColor" />
            </button>
          </form>
        )}

        {/* Grupo Opcional: Itens por página */}
        {showItemsPerPage && (
          <div className="unooria-pagination__size-group">
            <span className="unooria-pagination__jump-label">
              {itemsPerPageLabel}:
            </span>
            <select
              value={pageSize}
              disabled={disabled}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="unooria-pagination__size-select"
              aria-label={itemsPerPageLabel}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
