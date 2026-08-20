'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { InstaAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System Instanooria
 *
 * Retrato circular do usuário com suporte aos anéis de story e de transmissão
 * ao vivo extraídos do Figma. A geometria segue o export original: recorte
 * interno de 56px, folga de 2px e anel de 2px, totalizando a caixa de 64px
 * usada na bandeja de stories.
 */
export const Avatar = React.forwardRef<HTMLElement, InstaAvatarProps>(
  (
    {
      as,
      src,
      alt = '',
      initials,
      size = 'lg',
      ring = 'none',
      badge = 'none',
      badgeLabel = 'LIVE',
      theme = 'light',
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
      'insta-avatar',
      isNumericSize ? '' : `insta-avatar--size-${size}`,
      `insta-avatar--ring-${ring}`,
      isInteractive ? 'insta-avatar--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle = {
      ...(isNumericSize ? ({ '--insta-avatar-size': `${size}px` } as React.CSSProperties) : {}),
      ...style,
    };

    // Dimensão do glifo "+" proporcional ao diâmetro do avatar (18px em 64px no Figma)
    const addGlyphSize = isNumericSize ? Math.round(size * 0.32) : undefined;

    return (
      <Component
        ref={ref as never}
        data-insta-theme={theme}
        className={classes}
        style={resolvedStyle}
        onClick={onClick}
        type={Component === 'button' ? 'button' : undefined}
        {...restProps}
      >
        <span className="insta-avatar__ring">
          <span className="insta-avatar__gap">
            {src ? (
              <img className="insta-avatar__image" src={src} alt={alt} />
            ) : (
              <span className="insta-avatar__fallback" aria-hidden={!initials}>
                {initials}
              </span>
            )}
          </span>
        </span>

        {badge === 'add' && (
          <span className="insta-avatar__badge-add">
            <Icon name="plus" size={addGlyphSize ?? 18} tone="inherit" />
          </span>
        )}

        {badge === 'live' && <span className="insta-avatar__badge-live">{badgeLabel}</span>}
      </Component>
    );
  }
);

Avatar.displayName = 'Avatar';
