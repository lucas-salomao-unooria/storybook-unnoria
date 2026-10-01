import React from 'react';
import {
  ujnLogoPath,
  ujnLogoSymbolPath,
  ujnLogoViewBox,
  ujnLogoWidth,
  ujnLogoHeight,
  ujnLogoSymbolLockupTransform,
  ujnLogoMarkViewBox,
  ujnLogoMarkWidth,
  ujnLogoMarkHeight,
} from './LogoVector';
import type { UjnLogoProps } from './Logo.types';
import './Logo.css';

/**
 * Componente Logo — Design System Unoojornal
 *
 * Marca da publicação, montada como a da Plataforma Unooria: o símbolo (o anel
 * em forma de amendoim, traçado do PNG oficial) é o “oo” de “Un∞jornal”, e as
 * demais letras são contornos de Open Sans Bold. Aparece no cabeçalho do jornal
 * e nas telas de acesso. O vetor não usa `<text>`: uma fonte ausente não deforma
 * a marca.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Logo = React.forwardRef<SVGSVGElement, UjnLogoProps>(
  (
    {
      height = 32,
      variant = 'lockup',
      tone = 'primary',
      theme,
      title = 'Unoojornal',
      decorative = false,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const isMark = variant === 'mark';
    const nominalWidth = isMark ? ujnLogoMarkWidth : ujnLogoWidth;
    const nominalHeight = isMark ? ujnLogoMarkHeight : ujnLogoHeight;
    const width = (height * nominalWidth) / nominalHeight;

    const classes = ['ujn-logo', `ujn-logo--tone-${tone}`, `ujn-logo--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const accessibilityProps = decorative
      ? { 'aria-hidden': true, focusable: false as const }
      : { role: 'img', 'aria-label': title };

    return (
      <svg
        ref={ref}
        data-ujn-theme={theme}
        className={classes}
        viewBox={isMark ? ujnLogoMarkViewBox : ujnLogoViewBox}
        width={width}
        height={height}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {!decorative && <title>{title}</title>}

        <g transform={isMark ? undefined : ujnLogoSymbolLockupTransform}>
          <path className="ujn-logo__symbol" d={ujnLogoSymbolPath} fillRule="evenodd" clipRule="evenodd" />
        </g>

        {!isMark && <path className="ujn-logo__wordmark" d={ujnLogoPath} />}
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
