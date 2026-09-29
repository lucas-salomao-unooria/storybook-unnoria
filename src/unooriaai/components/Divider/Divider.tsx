import React from 'react';
import type { UaiDividerProps } from './Divider.types';
import './Divider.css';

/**
 * Componente Divider — Design System UnooriaAI
 *
 * Traço de 1px, horizontal ou vertical, preenchido com a escada translúcida
 * `--uai-fill-10` (tinta roxa no tema claro, branco translúcido no escuro).
 */
export const Divider = React.forwardRef<HTMLHRElement, UaiDividerProps>(
  ({ orientation = 'horizontal', theme, className = '', ...restProps }, ref) => {
    const classes = ['uai-divider', `uai-divider--${orientation}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <hr
        ref={ref}
        data-uai-theme={theme}
        className={classes}
        aria-orientation={orientation}
        {...restProps}
      />
    );
  }
);

Divider.displayName = 'Divider';
