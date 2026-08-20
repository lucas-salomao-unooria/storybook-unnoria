'use client';

import React, { forwardRef } from 'react';
import { LogoAppIconProps } from './Logo.types';
import { UnooriaAppIconVector } from './LogoVectors';
import './Logo.css';

/**
 * Componente oficial LogoAppIcon (Ícone em Squircle para App, Favicon e Apresentação)
 */
export const LogoAppIcon = forwardRef<HTMLSpanElement, LogoAppIconProps>(
  (
    {
      size = 'md',
      variant = 'light',
      className = '',
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    let sizePx = 64;
    if (typeof size === 'number') {
      sizePx = size;
    } else {
      switch (size) {
        case 'sm':
          sizePx = 48;
          break;
        case 'md':
          sizePx = 64;
          break;
        case 'lg':
          sizePx = 96;
          break;
        case 'xl':
          sizePx = 128;
          break;
      }
    }

    const clickableClass = onClick ? 'unooria-logo-app-icon--clickable' : '';
    const containerClasses = [
      'unooria-logo-app-icon',
      clickableClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={containerClasses}
        style={{
          width: sizePx,
          height: sizePx,
          display: 'inline-flex',
          ...style,
        }}
        onClick={onClick}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        <UnooriaAppIconVector
          variant={variant}
          sizePx={sizePx}
          style={{ width: '100%', height: '100%' }}
        />
      </span>
    );
  }
);

LogoAppIcon.displayName = 'LogoAppIcon';

export default LogoAppIcon;
