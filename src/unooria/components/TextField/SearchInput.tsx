import React, { forwardRef } from 'react';
import { SearchInputProps } from './TextField.types';
import { TextField } from './TextField';

/**
 * Componente SearchInput com ícone de busca embutido e suporte a limpeza rápida.
 * Plataforma Unooria - Extraído do Figma (Node 6107:729 / Component Set 6110:532)
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      leftIcon = 'search',
      placeholder = 'Pesquisar...',
      clearable = true,
      onSearch,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.((e.target as HTMLInputElement).value);
      }
      onKeyDown?.(e);
    };

    return (
      <TextField
        ref={ref}
        type="search"
        leftIcon={leftIcon}
        placeholder={placeholder}
        clearable={clearable}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
