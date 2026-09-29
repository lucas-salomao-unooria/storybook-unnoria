import React from 'react';
import {
  unvLogoPath,
  unvLogoViewBox,
  unvLogoWidth,
  unvLogoHeight,
  unvLogoMark,
  unvLogoMarkViewBox,
  unvLogoMarkWidth,
  unvLogoMarkHeight,
} from './LogoVector';
import type { UnvLogoProps } from './Logo.types';
import './Logo.css';

/**
 * Componente Logo — Design System Unoovista
 *
 * Marca do produto: o emblema (duas circunferências entrelaçadas que formam o
 * "oo" da Unooria) e o logotipo tipográfico “Unoovista”, contornado de Open
 * Sans Bold. Exibida no início da barra superior e nas telas de autenticação.
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

        <g fill="none" strokeWidth={unvLogoMark.strokeWidth}>
          <circle
            className="unv-logo__ring-b"
            cx={unvLogoMark.ringB.cx}
            cy={unvLogoMark.ringB.cy}
            r={unvLogoMark.radius}
          />
          <circle
            className="unv-logo__ring-a"
            cx={unvLogoMark.ringA.cx}
            cy={unvLogoMark.ringA.cy}
            r={unvLogoMark.radius}
          />
          <path className="unv-logo__ring-b" d={unvLogoMark.overlap} />
        </g>

        {!isMark && <path className="unv-logo__wordmark" d={unvLogoPath} />}
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
