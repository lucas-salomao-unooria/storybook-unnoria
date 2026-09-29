'use client';

import React from 'react';
import type { UncAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System Unoochat
 *
 * Retrato circular do contato. Nas linhas de status há um anel de 2,12px com
 * folga de 3,4px em torno de um recorte de 45px; nas demais listas o recorte é
 * usado sem anel.
 */
export const Avatar = React.forwardRef<HTMLElement, UncAvatarProps>(
  (
    {
      as,
      src,
      alt = '',
      initials,
      size = 'lg',
      ring = 'none',
      fill,
      glyph,
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
      'unc-avatar',
      isNumericSize ? '' : `unc-avatar--size-${size}`,
      `unc-avatar--ring-${ring}`,
      isInteractive ? 'unc-avatar--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle = {
      ...(isNumericSize ? ({ '--unc-avatar-size': `${size}px` } as React.CSSProperties) : {}),
      ...style,
    };

    return (
      <Component
        ref={ref as never}
        className={classes}
        style={resolvedStyle}
        onClick={onClick}
        type={Component === 'button' ? 'button' : undefined}
        {...(isInteractive && !restProps['aria-label'] ? { 'aria-label': alt || initials } : {})}
        {...restProps}
      >
        <span className="unc-avatar__ring">
          <span className="unc-avatar__gap">
            {src ? (
              <img className="unc-avatar__image" src={src} alt={alt} />
            ) : (
              <span
                className="unc-avatar__fallback"
                style={fill ? { backgroundColor: fill } : undefined}
                aria-hidden={!initials}
              >
                {initials}
              </span>
            )}
          </span>
        </span>

        {glyph && <span className="unc-avatar__glyph">{glyph}</span>}
      </Component>
    );
  }
);

Avatar.displayName = 'Avatar';
