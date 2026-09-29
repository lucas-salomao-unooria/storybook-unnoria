import React from 'react';
import type { UnvBadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge — Design System Unoovista
 *
 * Selos em cápsula: a etiqueta LIVE sobre anéis de história, o contador de
 * mídia exibido sobre carrosséis ("1/3"), o selo de novidades (contagem ou
 * ponto) e a cápsula neutra de rótulo. Com `wrap`, o rótulo quebra linha.
 */
export const Badge = React.forwardRef<HTMLSpanElement, UnvBadgeProps>(
  (
    {
      variant = 'neutral',
      dot = false,
      count,
      overflowCount = 99,
      wrap = false,
      theme,
      children,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unv-badge',
      `unv-badge--${variant}`,
      dot ? 'unv-badge--dot' : '',
      wrap && !dot ? 'unv-badge--wrap' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    let content: React.ReactNode = children;
    if (count !== undefined) {
      content = count > overflowCount ? `${overflowCount}+` : count;
    }

    if (dot) {
      return (
        <span
          ref={ref}
          data-unv-theme={theme}
          className={classes}
          aria-hidden="true"
          {...restProps}
        />
      );
    }

    return (
      <span ref={ref} data-unv-theme={theme} className={classes} {...restProps}>
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
