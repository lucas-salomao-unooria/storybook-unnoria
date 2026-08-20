import React from 'react';
import type { GptNavItemProps } from './NavItem.types';
import './NavItem.css';

/**
 * Componente NavItem — Design System ChatGPT
 *
 * Réplica do conjunto `NavItem` do Figma: linha de 240 × 36 com padding 8/12,
 * gap 8 e raio 8, nos três estados publicados (`Default`, `Active`, `Hover`).
 * É a linha de conversa da barra lateral.
 */
export const NavItem = React.forwardRef<HTMLButtonElement, GptNavItemProps>(
  (
    {
      state = 'default',
      glyph,
      as,
      theme,
      children,
      className = '',
      type = 'button',
      ...restProps
    },
    ref
  ) => {
    const Component = (as || 'button') as React.ElementType;

    const classes = ['gpt-nav-item', `gpt-nav-item--${state}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-gpt-theme={theme}
        className={classes}
        type={Component === 'button' ? type : undefined}
        aria-current={state === 'active' ? 'page' : undefined}
        {...restProps}
      >
        {glyph && (
          <span className="gpt-nav-item__glyph" aria-hidden="true">
            {glyph}
          </span>
        )}
        <span className="gpt-nav-item__label">{children}</span>
      </Component>
    );
  }
);

NavItem.displayName = 'NavItem';
