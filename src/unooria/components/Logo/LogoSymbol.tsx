'use client';

import React, { forwardRef } from 'react';
import { LogoSymbolProps, LogoColor, LogoSymbolVariant } from './Logo.types';
import { SYMBOL_IMAGES_BASE64, SymbolImageKey } from '../../assets/brand/brandImages';
import './Logo.css';

/**
 * Resolve a chave de imagem do símbolo correspondente à cor, variante e tema
 */
const resolveSymbolImageKey = (
  color: LogoColor | string | undefined,
  variant: LogoSymbolVariant = 'fill',
  theme: 'light' | 'dark' = 'light'
): { key: SymbolImageKey; filter?: string } => {
  const isOutline = variant === 'outline';

  if (!color || color === 'auto') {
    if (theme === 'dark') {
      return isOutline
        ? { key: 'lavender_outline' }
        : { key: 'white_fill' };
    }
    return isOutline
      ? { key: 'lavender_outline', filter: 'brightness(0.3) saturate(2)' }
      : { key: 'navy_fill' };
  }

  if (color === 'lavender') {
    return isOutline
      ? { key: 'lavender_outline' }
      : { key: 'lavender_fill' };
  }

  if (color === 'blue') {
    return isOutline
      ? { key: 'lavender_outline', filter: 'hue-rotate(20deg) brightness(1.2)' }
      : { key: 'blue_fill' };
  }

  if (color === 'white') {
    return isOutline
      ? { key: 'lavender_outline', filter: 'brightness(0) invert(1)' }
      : { key: 'white_fill' };
  }

  // default navy
  return isOutline
    ? { key: 'lavender_outline', filter: 'brightness(0.2) saturate(2)' }
    : { key: 'navy_fill' };
};

/**
 * Componente oficial LogoSymbol (Isótipo / Símbolo da Marca Unooria)
 * Renderiza estritamente os ativos de alta resolução originais do símbolo.
 */
export const LogoSymbol = forwardRef<HTMLImageElement, LogoSymbolProps>(
  (
    {
      size = 'md',
      variant = 'fill',
      color = 'auto',
      theme = 'light',
      ariaLabel = 'Símbolo Unooria',
      className = '',
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    let widthPx = 48;
    if (typeof size === 'number') {
      widthPx = size;
    } else {
      switch (size) {
        case 'xs':
          widthPx = 24;
          break;
        case 'sm':
          widthPx = 36;
          break;
        case 'md':
          widthPx = 48;
          break;
        case 'lg':
          widthPx = 72;
          break;
        case 'xl':
          widthPx = 96;
          break;
      }
    }

    // Aspect ratio nativo do símbolo: 1000x500 = 2:1
    const heightPx = Math.round(widthPx / 2);
    const { key, filter } = resolveSymbolImageKey(color, variant, theme);
    const imageSrc = SYMBOL_IMAGES_BASE64[key];

    const clickableClass = onClick ? 'unooria-logo-symbol--clickable' : '';
    const containerClasses = [
      'unooria-logo-symbol',
      clickableClass,
      className,
    ]
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
          ...(filter ? { filter } : {}),
          ...style,
        }}
        onClick={onClick}
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }
);

LogoSymbol.displayName = 'LogoSymbol';

export default LogoSymbol;
