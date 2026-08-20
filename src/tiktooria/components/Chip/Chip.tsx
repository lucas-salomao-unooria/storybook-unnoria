import React from 'react';
import { Icon } from '../Icon';
import type { TikChipProps } from './Chip.types';
import './Chip.css';

/**
 * Componente Chip — Design System Tik Tooria
 *
 * Alvo contornado de 152×28 com raio de 2px (node 4:813, "Add to Favorites").
 * Compartilha o contorno e o raio do botão `outline`, mas usa o degrau
 * tipográfico Semibold 14 e uma altura menor.
 */
export const Chip = React.forwardRef<HTMLButtonElement, TikChipProps>(
  ({ icon, fixedWidth = false, className = '', children, ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['tik-chip', fixedWidth ? 'tik-chip--fixed' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {icon && <Icon name={icon} size={12.9} tone="primary" />}
      <span className="tik-chip__label">{children}</span>
    </button>
  )
);

Chip.displayName = 'Chip';
