import React from 'react';
import type { UblDividerProps } from './Divider.types';
import './Divider.css';

/**
 * Componente Divider — Design System Unooblog
 *
 * Fio de 1px em `--ubl-color-border-subtle` que separa blocos da página e
 * controles de uma barra. Por padrão é decorativo; com `label`, o texto fica no
 * meio do fio e o divisor é anunciado como separador com esse nome. O blog não
 * tem fio duplo nem grosso: a hierarquia vem da camada (página, cartão) e do
 * espaço.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Divider = React.forwardRef<HTMLDivElement, UblDividerProps>(
  (
    { orientation = 'horizontal', decorative = true, label, theme, className = '', ...restProps },
    ref
  ) => {
    const hasLabel = Boolean(label) && orientation === 'horizontal';
    const classes = [
      'ubl-divider',
      `ubl-divider--${orientation}`,
      hasLabel ? 'ubl-divider--labeled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (hasLabel) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          aria-label={label}
          data-ubl-theme={theme}
          className={classes}
          {...restProps}
        >
          <span className="ubl-divider__line" aria-hidden="true" />
          <span className="ubl-divider__label" aria-hidden="true">
            {label}
          </span>
          <span className="ubl-divider__line" aria-hidden="true" />
        </div>
      );
    }

    const semantics = decorative
      ? { 'aria-hidden': true as const }
      : { role: 'separator', 'aria-orientation': orientation };

    return <div ref={ref} data-ubl-theme={theme} className={classes} {...semantics} {...restProps} />;
  }
);

Divider.displayName = 'Divider';
