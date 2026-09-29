import React from 'react';
import { Icon } from '../Icon';
import type { UncFilterChipProps } from './FilterChip.types';
import './FilterChip.css';

/**
 * Componente FilterChip — Design System Unoochat
 *
 * Filtro de tipo de mídia da busca em conversas. A cápsula usa
 * `--unc-color-surface-sheet`; quando aplicada, assume `--unc-color-accent`.
 */
export const FilterChip = React.forwardRef<HTMLButtonElement, UncFilterChipProps>(
  ({ label, icon, selected = false, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={[
        'unc-filterchip',
        selected ? 'unc-filterchip--selected' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {icon && <Icon name={icon} size={16} tone="inherit" />}
      {label}
    </button>
  )
);

FilterChip.displayName = 'FilterChip';
