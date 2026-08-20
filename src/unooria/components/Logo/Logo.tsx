'use client';

import React, { forwardRef } from 'react';
import { LogoProps, LogoColor } from './Logo.types';
import { BRAND_IMAGES_BASE64, BrandImageColorKey } from '../../assets/brand/brandImages';
import { LogoSymbol } from './LogoSymbol';
import { LogoAppIcon } from './LogoAppIcon';
import { LogoLockup } from './LogoLockup';
import './Logo.css';

interface LogoComponent
  extends React.ForwardRefExoticComponent<
    LogoProps & React.RefAttributes<HTMLImageElement>
  > {
  Symbol: typeof LogoSymbol;
  AppIcon: typeof LogoAppIcon;
  Lockup: typeof LogoLockup;
}

/**
 * Resolve a chave de imagem oficial correspondente à cor e tema
 */
const resolveBrandImageKey = (
  color: LogoColor | undefined,
  theme: 'light' | 'dark'
): BrandImageColorKey => {
  if (!color || color === 'auto') {
    return theme === 'dark' ? 'white' : 'navy';
  }

  if (color in BRAND_IMAGES_BASE64) {
    return color as BrandImageColorKey;
  }

  return 'navy';
};

/**
 * Componente oficial Logo / Marca Unooria do Unooria Design System.
 * Renderiza a marca 'unooria®' estritamente com base nos ativos de alta fidelidade enviados.
 */
export const Logo = forwardRef<HTMLImageElement, LogoProps>(
  (
    {
      size = 'md',
      color = 'auto',
      theme = 'light',
      ariaLabel = 'Unooria',
      className = '',
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    // Normalização de altura mantendo o aspect ratio original (590 / 130 ≈ 4.538)
    let heightPx = 32;
    if (typeof size === 'number') {
      heightPx = size;
    } else {
      switch (size) {
        case 'xs':
          heightPx = 18;
          break;
        case 'sm':
          heightPx = 24;
          break;
        case 'md':
          heightPx = 32;
          break;
        case 'lg':
          heightPx = 48;
          break;
        case 'xl':
          heightPx = 64;
          break;
      }
    }

    const widthPx = Math.round((heightPx * 590) / 130);
    const imageKey = resolveBrandImageKey(color, theme);
    const imageSrc = BRAND_IMAGES_BASE64[imageKey];
    const isWhite = imageKey === 'white';

    const clickableClass = onClick ? 'unooria-logo--clickable' : '';
    const containerClasses = ['unooria-logo', clickableClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <img
        ref={ref}
        src={imageSrc}
        alt={ariaLabel}
        className={containerClasses}
        style={{
          width: widthPx,
          height: heightPx,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle',
          userSelect: 'none',
          ...(isWhite ? { filter: 'brightness(0) invert(1)' } : {}),
          ...style,
        }}
        onClick={onClick}
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }
) as LogoComponent;

Logo.displayName = 'Logo';
Logo.Symbol = LogoSymbol;
Logo.AppIcon = LogoAppIcon;
Logo.Lockup = LogoLockup;

export default Logo;
