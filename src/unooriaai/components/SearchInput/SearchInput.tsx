import React from 'react';
import type { UaiSearchInputProps } from './SearchInput.types';
import { Icon } from '../Icon';
import './SearchInput.css';

/**
 * Componente SearchInput — Design System UnooriaAI
 *
 * Campo de busca de 260 × 36 com padding 8/12, gap 8, raio 8 e superfície
 * `--uai-fill-4`. O glifo é o ícone `search` da biblioteca do módulo.
 *
 * O campo só é controlado quando o consumidor passa `value`: as props nativas
 * seguem por spread.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, UaiSearchInputProps>(
  (
    {
      glyph = <Icon name="search" size={20} />,
      block = false,
      theme,
      className = '',
      placeholder = 'Buscar conversas',
      type = 'search',
      ...restProps
    },
    ref
  ) => {
    const classes = ['uai-search-input', block ? 'uai-search-input--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-uai-theme={theme} className={classes}>
        <span className="uai-search-input__glyph" aria-hidden="true">
          {glyph}
        </span>
        <input
          ref={ref}
          className="uai-search-input__field"
          type={type}
          placeholder={placeholder}
          {...restProps}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
