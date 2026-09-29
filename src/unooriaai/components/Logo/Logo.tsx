import React from 'react';
import {
  uaiLogoPath,
  uaiLogoAiPath,
  uaiLogoSymbolPath,
  uaiLogoViewBox,
  uaiLogoWidth,
  uaiLogoHeight,
  uaiLogoSymbolLockupTransform,
  uaiLogoMarkViewBox,
  uaiLogoMarkWidth,
  uaiLogoMarkHeight,
  uaiLogoWordmarkPath,
  uaiLogoWordmarkAiPath,
  uaiLogoWordmarkViewBox,
  uaiLogoWordmarkWidth,
  uaiLogoWordmarkHeight,
} from './LogoVector';
import type { UaiLogoProps } from './Logo.types';
import './Logo.css';

const GEOMETRY = {
  horizontal: { viewBox: uaiLogoViewBox, width: uaiLogoWidth, height: uaiLogoHeight },
  mark: { viewBox: uaiLogoMarkViewBox, width: uaiLogoMarkWidth, height: uaiLogoMarkHeight },
  wordmark: {
    viewBox: uaiLogoWordmarkViewBox,
    width: uaiLogoWordmarkWidth,
    height: uaiLogoWordmarkHeight,
  },
} as const;

/**
 * Componente Logo — Design System UnooriaAI
 *
 * Marca original do produto, montada como a da Plataforma Unooria: o símbolo (o
 * anel em forma de amendoim, traçado do PNG oficial) é o “oo” de “Un∞riaAI”, e
 * as letras são contornos de Open Sans Bold; “AI” e o símbolo levam a tinta de
 * destaque. O vetor não usa `<text>`: uma fonte ausente não deforma a marca.
 */
export const Logo = React.forwardRef<SVGSVGElement, UaiLogoProps>(
  (
    {
      variant = 'horizontal',
      height = 32,
      tone = 'primary',
      title = 'UnooriaAI',
      decorative = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const geometry = GEOMETRY[variant];
    const width = (height * geometry.width) / geometry.height;

    const classes = ['uai-logo', `uai-logo--tone-${tone}`, `uai-logo--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const accessibilityProps = decorative
      ? { 'aria-hidden': true, focusable: false as const }
      : { role: 'img', 'aria-label': title };

    return (
      <svg
        ref={ref}
        data-uai-theme={theme}
        className={classes}
        viewBox={geometry.viewBox}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {!decorative && <title>{title}</title>}

        {variant !== 'wordmark' && (
          <g transform={variant === 'horizontal' ? uaiLogoSymbolLockupTransform : undefined}>
            <path
              className="uai-logo__symbol"
              d={uaiLogoSymbolPath}
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        )}

        {variant === 'horizontal' && (
          <>
            <path className="uai-logo__wordmark" d={uaiLogoPath} />
            <path className="uai-logo__ai" d={uaiLogoAiPath} />
          </>
        )}

        {variant === 'wordmark' && (
          <>
            <path className="uai-logo__wordmark" d={uaiLogoWordmarkPath} />
            <path className="uai-logo__ai" d={uaiLogoWordmarkAiPath} />
          </>
        )}
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
