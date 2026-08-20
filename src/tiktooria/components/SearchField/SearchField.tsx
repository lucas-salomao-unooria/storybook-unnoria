import React from 'react';
import { Icon } from '../Icon';
import type { TikSearchFieldProps } from './SearchField.types';
import './SearchField.css';

/**
 * Componente SearchField — Design System Tik Tooria
 *
 * Campo preenchido de 382×36 com raio de 4px (node 4:218). O fundo é
 * `--tik-color-surface-field` (`#F1F1F2`), o glifo de lupa fica a 12px da borda
 * interna e o texto de reserva usa Regular 15 em
 * `--tik-color-text-secondary`.
 */
export const SearchField = React.forwardRef<HTMLInputElement, TikSearchFieldProps>(
  ({ placeholder = 'Search', ariaLabel = 'Buscar', className = '', ...restProps }, ref) => (
    <div className={['tik-searchfield', className].filter(Boolean).join(' ')}>
      <Icon name="search" size={14.8} tone="primary" />
      <input
        ref={ref}
        type="search"
        className="tik-searchfield__input"
        placeholder={placeholder}
        aria-label={ariaLabel}
        {...restProps}
      />
    </div>
  )
);

SearchField.displayName = 'SearchField';
