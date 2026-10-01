import React from 'react';
import { Icon } from '../Icon';
import type { UjnFilterPillProps } from './FilterPill.types';
import './FilterPill.css';

/**
 * Componente FilterPill — Design System Unoojornal
 *
 * Pílula de filtro da lista de matérias. Estados do quadro de pílulas:
 * repouso (contorno `border-default`), hover (`fill-field`), selecionada
 * (preenchimento de ação com rótulo `text-on-action`), foco (anel de 2px) e
 * desabilitada. A seleção também se marca com um visto e `aria-pressed` — nunca
 * só pela cor.
 *
 * Só recebe props e renderiza marcação, então roda como Server Component; a
 * `FilterBar` a compõe com foco móvel e estado.
 */
export const FilterPill = React.forwardRef<HTMLButtonElement, UjnFilterPillProps>(
  (
    { selected = false, count, disabled = false, children, onClick, theme, className = '', ...restProps },
    ref
  ) => {
    const classes = [
      'ujn-filter-pill',
      selected ? 'ujn-filter-pill--selected' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        data-ujn-theme={theme}
        className={classes}
        aria-pressed={selected}
        disabled={disabled}
        onClick={onClick}
        {...restProps}
      >
        {selected && <Icon name="check" size="xs" tone="inherit" className="ujn-filter-pill__check" />}
        <span className="ujn-filter-pill__label">{children}</span>
        {count !== undefined && <span className="ujn-filter-pill__count">{count}</span>}
      </button>
    );
  }
);

FilterPill.displayName = 'FilterPill';
