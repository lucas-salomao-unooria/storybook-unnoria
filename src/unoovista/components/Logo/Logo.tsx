import React from 'react';
import {
  unvLogoPath,
  unvLogoSymbolPath,
  unvLogoViewBox,
  unvLogoWidth,
  unvLogoHeight,
  unvLogoSymbolLockupTransform,
  unvLogoMarkViewBox,
  unvLogoMarkWidth,
  unvLogoMarkHeight,
} from './LogoVector';
import type { UnvLogoProps } from './Logo.types';
import './Logo.css';

/**
 * Componente Logo — Design System Unoovista
 *
 * Marca do produto, montada como a da Plataforma Unooria: o símbolo (o anel em
 * forma de amendoim, traçado do PNG oficial) é o “oo” de “Un∞vista”, e as demais
 * letras são contornos de Open Sans Bold. Exibida no início da barra superior e nas telas de autenticação.
 * O vetor não usa `<text>`: uma fonte ausente não deforma a marca.
 */
export const Logo = React.forwardRef<SVGSVGElement, UnvLogoProps>(
  (
    {
      height = 28,
      variant = 'lockup',
      tone = 'primary',
      theme,
      title = 'Unoovista',
      decorative = false,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const isMark = variant === 'mark';
    const nominalWidth = isMark ? unvLogoMarkWidth : unvLogoWidth;
    const nominalHeight = isMark ? unvLogoMarkHeight : unvLogoHeight;
    const width = (height * nominalWidth) / nominalHeight;

    const classes = ['unv-logo', `unv-logo--tone-${tone}`, `unv-logo--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const accessibilityProps = decorative
      ? { 'aria-hidden': true, focusable: false as const }
      : { role: 'img', 'aria-label': title };

    return (
      <svg
        ref={ref}
        data-unv-theme={theme}
        className={classes}
        viewBox={isMark ? unvLogoMarkViewBox : unvLogoViewBox}
        width={width}
        height={height}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {!decorative && <title>{title}</title>}

        <g transform={isMark ? undefined : unvLogoSymbolLockupTransform}>
          <path className="unv-logo__symbol" d={unvLogoSymbolPath} fillRule="evenodd" clipRule="evenodd" />
        </g>

        {!isMark && <path className="unv-logo__wordmark" d={unvLogoPath} />}
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
