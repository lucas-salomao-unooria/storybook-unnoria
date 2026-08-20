import React from 'react';
import type { WaBadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge — Design System WhatsApp Mobile
 *
 * Selo circular verde-água com o número de mensagens não lidas. A variante
 * `tab` reproduz o selo ao lado do rótulo CHATS (`--wa-color-accent`); a
 * variante `row` reproduz o selo das linhas de conversa na busca
 * (`--wa-color-accent-badge`).
 */
export const Badge = React.forwardRef<HTMLSpanElement, WaBadgeProps>(
  (
    { count, max = 99, variant = 'tab', size = 19, label, className = '', style, ...restProps },
    ref
  ) => {
    const classes = ['wa-badge', `wa-badge--${variant}`, className].filter(Boolean).join(' ');
    const display = count > max ? `${max}+` : String(count);

    return (
      <span
        ref={ref}
        className={classes}
        style={{ ['--wa-badge-size' as string]: `${size}px`, ...style }}
        aria-label={label ?? `${count} não lidas`}
        {...restProps}
      >
        {display}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
