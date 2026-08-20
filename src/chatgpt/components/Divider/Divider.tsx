import React from 'react';
import type { GptDividerProps } from './Divider.types';
import './Divider.css';

/**
 * Componente Divider — Design System ChatGPT
 *
 * Réplica do componente `Divider` do Figma: traço de 1px preenchido com a
 * escada translúcida de 10% (`Overlay/Black 10%` no modo Light).
 */
export const Divider = React.forwardRef<HTMLHRElement, GptDividerProps>(
  ({ orientation = 'horizontal', theme, className = '', ...restProps }, ref) => {
    const classes = ['gpt-divider', `gpt-divider--${orientation}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <hr
        ref={ref}
        data-gpt-theme={theme}
        className={classes}
        aria-orientation={orientation}
        {...restProps}
      />
    );
  }
);

Divider.displayName = 'Divider';
