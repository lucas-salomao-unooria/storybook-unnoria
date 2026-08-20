import React from 'react';
import { Icon } from '../Icon';
import type { InstaSearchFieldProps } from './SearchField.types';
import './SearchField.css';

/**
 * Componente SearchField — Design System Instanooria
 *
 * Campo de busca translúcido no padrão iOS, presente na tela Buscar e no topo
 * da caixa de mensagens diretas. Reproduz a cápsula de 36px com raio de 10px e
 * preenchimento `rgba(118, 118, 128, 0.12)` do arquivo de design.
 */
export const SearchField = React.forwardRef<HTMLInputElement, InstaSearchFieldProps>(
  (
    {
      placeholder = 'Search',
      ariaLabel = 'Buscar',
      trailing,
      block = true,
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-search-field',
      block ? 'insta-search-field--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-insta-theme={theme} className={classes}>
        <div className="insta-search-field__box">
          <Icon
            name="searchSmall"
            size={14}
            tone="inherit"
            theme={theme}
            className="insta-search-field__icon"
          />
          <input
            ref={ref}
            type="search"
            role="searchbox"
            className="insta-search-field__control"
            placeholder={placeholder}
            aria-label={ariaLabel}
            {...restProps}
          />
        </div>

        {trailing && <div className="insta-search-field__trailing">{trailing}</div>}
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
