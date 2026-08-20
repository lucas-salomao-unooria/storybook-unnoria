import React from 'react';
import type { GptBadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge — Design System ChatGPT
 *
 * Réplica do conjunto `Badge` do Figma: cápsula de 17px com padding 2/8,
 * raio 4 e rótulo Inter Medium de 11px, nas cinco variantes semânticas
 * publicadas (`Default`, `Primary`, `Success`, `Error`, `Warning`).
 */
export const Badge = React.forwardRef<HTMLSpanElement, GptBadgeProps>(
  ({ variant = 'default', theme, children, className = '', ...restProps }, ref) => {
    const classes = ['gpt-badge', `gpt-badge--${variant}`, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} data-gpt-theme={theme} className={classes} {...restProps}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
