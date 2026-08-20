import React from 'react';
import { Icon } from '../Icon';
import type { WaFilterChipProps } from './FilterChip.types';
import './FilterChip.css';

/**
 * Componente FilterChip — Design System WhatsApp Mobile
 *
 * Filtro de tipo de mídia da busca em conversas. A cápsula usa
 * `--wa-color-surface-sheet`; quando aplicada, assume `--wa-color-accent`.
 */
export const FilterChip = React.forwardRef<HTMLButtonElement, WaFilterChipProps>(
  ({ label, icon, selected = false, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={[
        'wa-filterchip',
        selected ? 'wa-filterchip--selected' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {icon && <Icon name={icon} size={14} tone="inherit" />}
      {label}
    </button>
  )
);

FilterChip.displayName = 'FilterChip';
