'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UnvAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System Unoovista
 *
 * Retrato do usuário e principal portador de estado social. Sem anel é um
 * círculo; com anel de story, de transmissão ao vivo ou de "visto" vira um
 * squircle (cantos a 32% do lado) contornado por um traço de 2px e uma folga de
 * 3px — a forma diferente é uma pista que não depende de cor. No tamanho `lg`
 * (recorte de 56px) a caixa externa mede 66px.
 */
export const Avatar = React.forwardRef<HTMLElement, UnvAvatarProps>(
  (
    {
      as,
      src,
      alt = '',
      initials,
      size = 'lg',
      ring = 'none',
      badge = 'none',
      badgeLabel = 'AO VIVO',
      theme,
      onClick,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const isInteractive = Boolean(onClick);
    const Component = (as || (isInteractive ? 'button' : 'span')) as React.ElementType;
    const isNumericSize = typeof size === 'number';

    const classes = [
      'unv-avatar',
      isNumericSize ? '' : `unv-avatar--size-${size}`,
      `unv-avatar--ring-${ring}`,
      isInteractive ? 'unv-avatar--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle = {
      ...(isNumericSize ? ({ '--unv-avatar-size': `${size}px` } as React.CSSProperties) : {}),
      ...style,
    };

    // Glifo "+" proporcional ao diâmetro do avatar (cerca de um terço)
    const addGlyphSize = isNumericSize ? Math.round(size * 0.32) : undefined;

    return (
      <Component
        ref={ref as never}
        data-unv-theme={theme}
        className={classes}
        style={resolvedStyle}
        onClick={onClick}
        type={Component === 'button' ? 'button' : undefined}
        {...restProps}
      >
        <span className="unv-avatar__ring">
          <span className="unv-avatar__gap">
            {src ? (
              <img className="unv-avatar__image" src={src} alt={alt} />
            ) : (
              <span className="unv-avatar__fallback" aria-hidden={!initials}>
                {initials}
              </span>
            )}
          </span>
        </span>

        {badge === 'add' && (
          <span className="unv-avatar__badge-add">
            <Icon name="plus" size={addGlyphSize ?? 18} tone="inherit" />
          </span>
        )}

        {badge === 'live' && <span className="unv-avatar__badge-live">{badgeLabel}</span>}
      </Component>
    );
  }
);

Avatar.displayName = 'Avatar';
