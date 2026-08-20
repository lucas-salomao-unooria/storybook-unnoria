import React from 'react';
import { instaLogoPath, instaLogoViewBox, instaLogoWidth, instaLogoHeight } from './LogoVector';
import type { InstaLogoProps } from './Logo.types';
import './Logo.css';

/**
 * Componente Logo — Design System Instanooria
 *
 * Assinatura tipográfica manuscrita exibida no centro da barra superior do Feed
 * e nas telas de autenticação. O vetor é o export literal da camada
 * "Instagram Logo" do Figma, preservando a proporção original de 105×28.
 */
export const Logo = React.forwardRef<SVGSVGElement, InstaLogoProps>(
  (
    {
      height = instaLogoHeight,
      tone = 'primary',
      theme = 'light',
      title = 'Instanooria',
      decorative = false,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const width = (height * instaLogoWidth) / instaLogoHeight;

    const classes = ['insta-logo', `insta-logo--tone-${tone}`, className].filter(Boolean).join(' ');

    const accessibilityProps = decorative
      ? { 'aria-hidden': true, focusable: false as const }
      : { role: 'img', 'aria-label': title };

    return (
      <svg
        ref={ref}
        data-insta-theme={theme}
        className={classes}
        viewBox={instaLogoViewBox}
        width={width}
        height={height}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {!decorative && <title>{title}</title>}
        <path d={instaLogoPath} fill="currentColor" />
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
