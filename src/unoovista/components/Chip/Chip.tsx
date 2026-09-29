import React from 'react';
import type { UnvChipProps } from './Chip.types';
import './Chip.css';

/**
 * Componente Chip — Design System Unoovista
 *
 * Cápsula de filtro e de categoria exibida abaixo do campo de busca (Vídeos,
 * Loja, Estilo, Esportes…). Contorno de 1px e raio total, com ícone à esquerda
 * e estado selecionado em roxo de ação (`aria-pressed`).
 */
export const Chip = React.forwardRef<HTMLButtonElement, UnvChipProps>(
  (
    { leadingIcon, selected = false, theme, children, className = '', ...restProps },
    ref
  ) => {
    const classes = [
      'unv-chip',
      selected ? 'unv-chip--selected' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        data-unv-theme={theme}
        className={classes}
        {...restProps}
      >
        {leadingIcon && (
          <span className="unv-chip__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
