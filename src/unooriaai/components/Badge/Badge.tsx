import React from 'react';
import type { UaiBadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge — Design System UnooriaAI
 *
 * Selo compacto de 22px com padding 2/8, raio 4 e rótulo medium de 12px,
 * nas cinco variantes semânticas (`default`, `primary`, `success`, `error`,
 * `warning`). Usado para marcar estado ou novidade — "Beta", "Novo",
 * "Ativo" — sem disputar atenção com o conteúdo.
 */
export const Badge = React.forwardRef<HTMLSpanElement, UaiBadgeProps>(
  ({ variant = 'default', theme, children, className = '', ...restProps }, ref) => {
    const classes = ['uai-badge', `uai-badge--${variant}`, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} data-uai-theme={theme} className={classes} {...restProps}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
