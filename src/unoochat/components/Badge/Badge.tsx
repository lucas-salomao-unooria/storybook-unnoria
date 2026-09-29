import React from 'react';
import type { UncBadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge — Design System Unoochat
 *
 * Selo circular de acento com o número de mensagens não lidas. A variante
 * `tab` é o selo ao lado do rótulo da aba; a variante `row` é o selo das linhas
 * de conversa na busca. Ambas usam `--unc-color-accent`.
 */
export const Badge = React.forwardRef<HTMLSpanElement, UncBadgeProps>(
  (
    { count, max = 99, variant = 'tab', size = 19, label, className = '', style, ...restProps },
    ref
  ) => {
    const classes = ['unc-badge', `unc-badge--${variant}`, className].filter(Boolean).join(' ');
    const display = count > max ? `${max}+` : String(count);

    return (
      <span
        ref={ref}
        className={classes}
        style={{ ['--unc-badge-size' as string]: `${size}px`, ...style }}
        role="img"
        aria-label={label ?? `${count} não lidas`}
        {...restProps}
      >
        {display}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
