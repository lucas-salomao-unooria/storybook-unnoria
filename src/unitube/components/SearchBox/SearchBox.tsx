'use client';

import React, { useState } from 'react';
import { Icon } from '../Icon';
import type { UniSearchBoxProps } from './SearchBox.types';
import './SearchBox.css';

/**
 * Componente SearchBox — Design System Unitube
 *
 * Reproduz o nó `Navigation/SearchBox` (`7:49`). Três detalhes do arquivo são
 * preservados literalmente:
 *
 * 1. O campo declara contorno em apenas **três** arestas — topo, base e
 *    esquerda. A direita é deixada aberta porque o botão de lupa encosta nela.
 * 2. O raio é assimétrico nos dois lados: `2/0/0/2` no campo e `0/2/2/0` no
 *    botão, formando uma cápsula de cantos retos apenas na emenda.
 * 3. O microfone é um círculo preto puro (`#000000`), mais escuro que qualquer
 *    superfície da escada semântica.
 */
export const SearchBox = React.forwardRef<HTMLFormElement, UniSearchBoxProps>(
  (
    {
      placeholder = 'Search',
      value,
      defaultValue = '',
      onValueChange,
      onSearch,
      onVoiceSearch,
      showVoiceSearch = true,
      fieldLabel = 'Buscar',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSearch?.(currentValue);
    };

    return (
      <form
        ref={ref}
        role="search"
        className={['uni-searchbox', className].filter(Boolean).join(' ')}
        onSubmit={handleSubmit}
        {...restProps}
      >
        <div className="uni-searchbox__area">
          <div className="uni-searchbox__field">
            <input
              className="uni-searchbox__input"
              type="text"
              aria-label={fieldLabel}
              placeholder={placeholder}
              value={currentValue}
              onChange={handleChange}
            />
          </div>
          <button className="uni-searchbox__submit" type="submit" aria-label={fieldLabel}>
            <Icon name="search" size="lg" tone="primary" />
          </button>
        </div>

        {showVoiceSearch && (
          <button
            className="uni-searchbox__voice"
            type="button"
            aria-label="Buscar por voz"
            onClick={onVoiceSearch}
          >
            <Icon name="mic" size="lg" tone="primary" />
          </button>
        )}
      </form>
    );
  }
);

SearchBox.displayName = 'SearchBox';
