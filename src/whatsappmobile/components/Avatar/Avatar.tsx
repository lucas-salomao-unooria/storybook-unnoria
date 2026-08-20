import React from 'react';
import type { WaAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System WhatsApp Mobile
 *
 * Retrato circular do contato. Nas linhas de status o arquivo desenha um anel
 * de 2,12px (Ellipse 3, 56px) com folga de 3,4px em torno de um recorte de
 * 45px; nas demais listas o recorte é usado sem anel.
 */
export const Avatar = React.forwardRef<HTMLElement, WaAvatarProps>(
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
      'wa-avatar',
      isNumericSize ? '' : `wa-avatar--size-${size}`,
      `wa-avatar--ring-${ring}`,
      isInteractive ? 'wa-avatar--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle = {
      ...(isNumericSize ? ({ '--wa-avatar-size': `${size}px` } as React.CSSProperties) : {}),
      ...style,
    };

    return (
      <Component
        ref={ref as never}
        className={classes}
        style={resolvedStyle}
        onClick={onClick}
        type={Component === 'button' ? 'button' : undefined}
        {...restProps}
      >
        <span className="wa-avatar__ring">
          <span className="wa-avatar__gap">
            {src ? (
              <img className="wa-avatar__image" src={src} alt={alt} />
            ) : (
              <span
                className="wa-avatar__fallback"
                style={fill ? { backgroundColor: fill } : undefined}
                aria-hidden={!initials}
              >
                {initials}
              </span>
            )}
          </span>
        </span>

        {glyph && <span className="wa-avatar__glyph">{glyph}</span>}
      </Component>
    );
  }
);

Avatar.displayName = 'Avatar';
