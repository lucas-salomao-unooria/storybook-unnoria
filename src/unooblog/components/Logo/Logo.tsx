import React from 'react';
import {
  ublLogoPath,
  ublLogoSymbolPath,
  ublLogoViewBox,
  ublLogoWidth,
  ublLogoHeight,
  ublLogoSymbolLockupTransform,
  ublLogoMarkViewBox,
  ublLogoMarkWidth,
  ublLogoMarkHeight,
} from './LogoVector';
import type { UblLogoProps } from './Logo.types';
import './Logo.css';

/**
 * Componente Logo — Design System Unooblog
 *
 * Marca da publicação, montada como a da Plataforma Unooria: o símbolo (o anel
 * em forma de amendoim, traçado do PNG oficial) é o “oo” de “Un∞blog”, e as
 * demais letras são contornos de Open Sans Bold. Aparece no cabeçalho do site
 * e no rodapé. O vetor não usa `<text>`: uma fonte ausente não deforma
 * a marca.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Logo = React.forwardRef<SVGSVGElement, UblLogoProps>(
  (
    {
      height = 32,
      variant = 'lockup',
      tone = 'primary',
      theme,
      title = 'Unooblog',
      decorative = false,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const isMark = variant === 'mark';
    const nominalWidth = isMark ? ublLogoMarkWidth : ublLogoWidth;
    const nominalHeight = isMark ? ublLogoMarkHeight : ublLogoHeight;
    const width = (height * nominalWidth) / nominalHeight;

    const classes = ['ubl-logo', `ubl-logo--tone-${tone}`, `ubl-logo--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const accessibilityProps = decorative
      ? { 'aria-hidden': true, focusable: false as const }
      : { role: 'img', 'aria-label': title };

    return (
      <svg
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        viewBox={isMark ? ublLogoMarkViewBox : ublLogoViewBox}
        width={width}
        height={height}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {!decorative && <title>{title}</title>}

        <g transform={isMark ? undefined : ublLogoSymbolLockupTransform}>
          <path className="ubl-logo__symbol" d={ublLogoSymbolPath} fillRule="evenodd" clipRule="evenodd" />
        </g>

        {!isMark && <path className="ubl-logo__wordmark" d={ublLogoPath} />}
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
