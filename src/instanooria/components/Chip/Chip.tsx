import React from 'react';
import type { InstaChipProps } from './Chip.types';
import './Chip.css';

/**
 * Componente Chip — Design System Instanooria
 *
 * Cápsula de categoria exibida logo abaixo do campo de busca (IGTV, Shop,
 * Style, Sports, Auto). Reproduz o contorno de 1px e o raio total do Figma,
 * com suporte a ícone à esquerda e ao estado selecionado.
 */
export const Chip = React.forwardRef<HTMLButtonElement, InstaChipProps>(
  (
    { leadingIcon, selected = false, theme = 'light', children, className = '', ...restProps },
    ref
  ) => {
    const classes = [
      'insta-chip',
      selected ? 'insta-chip--selected' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        data-insta-theme={theme}
        className={classes}
        {...restProps}
      >
        {leadingIcon && (
          <span className="insta-chip__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
