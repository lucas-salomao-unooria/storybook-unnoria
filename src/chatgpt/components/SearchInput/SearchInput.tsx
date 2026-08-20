import React from 'react';
import type { GptSearchInputProps } from './SearchInput.types';
import { gptGlyphs } from '../../tokens';
import './SearchInput.css';

/**
 * Componente SearchInput — Design System ChatGPT
 *
 * Réplica do componente `SearchInput` do Figma: campo de 260 × 36 com
 * padding 8/12, gap 8, raio 8 e superfície translúcida de 4%.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, GptSearchInputProps>(
  (
    {
      glyph = gptGlyphs.search,
      block = false,
      theme,
      className = '',
      placeholder = 'Search chats',
      type = 'search',
      ...restProps
    },
    ref
  ) => {
    const classes = ['gpt-search-input', block ? 'gpt-search-input--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-gpt-theme={theme} className={classes}>
        <span className="gpt-search-input__glyph" aria-hidden="true">
          {glyph}
        </span>
        <input
          ref={ref}
          className="gpt-search-input__field"
          type={type}
          placeholder={placeholder}
          {...restProps}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
