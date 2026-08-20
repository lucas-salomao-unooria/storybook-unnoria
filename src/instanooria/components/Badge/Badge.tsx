import React from 'react';
import type { InstaBadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge — Design System Instanooria
 *
 * Cobre os três selos do arquivo de design: a etiqueta LIVE sobre anéis de
 * story, o contador de mídia exibido sobre carrosséis ("1/3") e o indicador
 * vermelho de novidades da barra superior.
 */
export const Badge = React.forwardRef<HTMLSpanElement, InstaBadgeProps>(
  (
    {
      variant = 'neutral',
      dot = false,
      count,
      overflowCount = 99,
      theme = 'light',
      children,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-badge',
      `insta-badge--${variant}`,
      dot ? 'insta-badge--dot' : '',
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
          data-insta-theme={theme}
          className={classes}
          aria-hidden="true"
          {...restProps}
        />
      );
    }

    return (
      <span ref={ref} data-insta-theme={theme} className={classes} {...restProps}>
        {content}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
