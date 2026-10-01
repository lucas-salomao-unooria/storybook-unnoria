'use client';

import React from 'react';
import { IconButton } from '../IconButton';
import type { UblPaginationProps } from './Pagination.types';
import './Pagination.css';

type PageSlot = number | 'dots-start' | 'dots-end';

const rangeOf = (from: number, to: number): number[] =>
  Array.from({ length: Math.max(to - from + 1, 0) }, (_, index) => from + index);

/**
 * Calcula as posições da lista: a primeira e a última página sempre aparecem,
 * a atual leva `siblingCount` vizinhas de cada lado, e o que sobra vira
 * reticências. O número de posições é constante (`2 * siblingCount + 5`) para a
 * barra não mudar de largura ao paginar.
 */
const ublPaginationSlots =(page: number, pageCount: number, siblingCount: number): PageSlot[] => {
  const sibling = Math.max(0, Math.floor(siblingCount));
  const totalSlots = sibling * 2 + 5;

  if (pageCount <= totalSlots) {
    return rangeOf(1, pageCount);
  }

  const left = Math.max(page - sibling, 1);
  const right = Math.min(page + sibling, pageCount);
  const showStartDots = left > 2;
  const showEndDots = right < pageCount - 1;
  const edgeCount = 3 + 2 * sibling;

  if (!showStartDots && showEndDots) {
    return [...rangeOf(1, edgeCount), 'dots-end', pageCount];
  }

  if (showStartDots && !showEndDots) {
    return [1, 'dots-start', ...rangeOf(pageCount - edgeCount + 1, pageCount)];
  }

  return [1, 'dots-start', ...rangeOf(left, right), 'dots-end', pageCount];
};

/**
 * Componente Pagination — Design System Unooblog
 *
 * Paginação da lista de posts: botões de página anterior e próxima, números
 * de página com a atual marcada (`aria-current="page"` e preenchimento de
 * ação) e reticências quando a lista é longa. Cada botão tem nome em pt-BR
 * ("Página anterior", "Próxima página", "Página 3"); nos limites, o botão que
 * não leva a lugar nenhum fica desabilitado.
 *
 * Abaixo de 640px de contêiner a lista de números cede lugar ao texto "Página N
 * de M", entre as duas setas.
 *
 * É Client Component: repassa funções (`onPageChange`) aos botões.
 */
export const Pagination = React.forwardRef<HTMLElement, UblPaginationProps>(
  (
    {
      page,
      pageCount,
      onPageChange,
      siblingCount = 1,
      ariaLabel = 'Paginação',
      previousLabel = 'Página anterior',
      nextLabel = 'Próxima página',
      pageLabel = (n: number) => `Página ${n}`,
      summaryLabel = (current: number, count: number) => `Página ${current} de ${count}`,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const total = Math.max(1, Math.floor(pageCount));
    const current = Math.min(Math.max(1, Math.floor(page)), total);
    const slots = ublPaginationSlots(current, total, siblingCount);

    const goTo = (next: number) => {
      if (next < 1 || next > total || next === current) return;
      onPageChange?.(next);
    };

    const classes = ['ubl-pagination', className].filter(Boolean).join(' ');

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-ubl-theme={theme}
        className={classes}
        {...restProps}
      >
        <ul className="ubl-pagination__list">
          <li className="ubl-pagination__item">
            <IconButton
              icon="chevronLeft"
              label={previousLabel}
              variant="outline"
              disabled={current <= 1}
              onClick={() => goTo(current - 1)}
            />
          </li>

          {slots.map((slot) =>
            typeof slot === 'number' ? (
              <li key={slot} className="ubl-pagination__item ubl-pagination__item--page">
                <button
                  type="button"
                  className={[
                    'ubl-pagination__page',
                    slot === current ? 'ubl-pagination__page--current' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={pageLabel(slot)}
                  aria-current={slot === current ? 'page' : undefined}
                  onClick={() => goTo(slot)}
                >
                  {slot}
                </button>
              </li>
            ) : (
              <li
                key={slot}
                className="ubl-pagination__item ubl-pagination__item--page ubl-pagination__dots"
                aria-hidden="true"
              >
                …
              </li>
            )
          )}

          <li className="ubl-pagination__item ubl-pagination__summary">
            {summaryLabel(current, total)}
          </li>

          <li className="ubl-pagination__item">
            <IconButton
              icon="chevronRight"
              label={nextLabel}
              variant="outline"
              disabled={current >= total}
              onClick={() => goTo(current + 1)}
            />
          </li>
        </ul>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
