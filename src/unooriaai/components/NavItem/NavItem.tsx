import React from 'react';
import type { UaiNavItemProps } from './NavItem.types';
import { Icon } from '../Icon';
import './NavItem.css';

/**
 * Componente NavItem — Design System UnooriaAI
 *
 * Linha de 240 × 36 com padding 8/12, gap 8 e raio 8, em três estados
 * (`default`, `active`, `hover`). É a linha de conversa da barra lateral.
 * O glifo à esquerda vem de `icon` (biblioteca de ícones do módulo) ou de
 * `glyph` (qualquer nó React, que tem precedência).
 */
export const NavItem = React.forwardRef<HTMLButtonElement, UaiNavItemProps>(
  (
    {
      state = 'default',
      glyph,
      icon,
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

    const classes = ['uai-nav-item', `uai-nav-item--${state}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-uai-theme={theme}
        className={classes}
        type={Component === 'button' ? type : undefined}
        aria-current={state === 'active' ? 'page' : undefined}
        {...restProps}
      >
        {(glyph || icon) && (
          <span className="uai-nav-item__glyph" aria-hidden="true">
            {glyph ?? (icon ? <Icon name={icon} size={16} /> : null)}
          </span>
        )}
        <span className="uai-nav-item__label">{children}</span>
      </Component>
    );
  }
);

NavItem.displayName = 'NavItem';
