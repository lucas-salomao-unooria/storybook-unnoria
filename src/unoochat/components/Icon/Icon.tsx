import React from 'react';
import { uncIcons } from './IconGlyphs';
import type { UncIconProps } from './Icon.types';
import './Icon.css';

/**
 * Menor e maior `opsz` que o Material Symbols Rounded aceita.
 */
const OPSZ_MIN = 20;
const OPSZ_MAX = 48;

/**
 * Componente Icon — Design System Unoochat
 *
 * Renderiza os glifos da biblioteca de ícones da Plataforma Unooria (Material
 * Symbols Rounded, peso 300) por ligadura. `size` governa a aresta da caixa do
 * glifo; o eixo óptico acompanha o tamanho, como no `Icon` da plataforma. O
 * glifo herda `currentColor`.
 *
 * A fonte precisa estar carregada — `@unooria/design-system/fonts/unoochat.css`
 * ou o Material Symbols do próprio app.
 */
export const Icon = React.forwardRef<HTMLSpanElement, UncIconProps>(
  (
    {
      name,
      size = 'md',
      tone = 'appbar',
      rotate = 0,
      flipX = false,
      flipY = false,
      filled,
      title,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const definition = uncIcons[name] as { ligature: string; filled?: boolean; flipX?: boolean };

    if (!definition) {
      return null;
    }

    const isNumericSize = typeof size === 'number';
    const isFilled = filled ?? definition.filled ?? false;
    const mirrorX = flipX !== Boolean(definition.flipX);

    const classes = [
      'unc-icon',
      isNumericSize ? '' : `unc-icon--size-${size}`,
      `unc-icon--tone-${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const transforms = [
      rotate ? `rotate(${rotate}deg)` : '',
      mirrorX ? 'scaleX(-1)' : '',
      flipY ? 'scaleY(-1)' : '',
    ].filter(Boolean);

    const opticalSize = isNumericSize
      ? Math.min(OPSZ_MAX, Math.max(OPSZ_MIN, Math.round(size)))
      : undefined;

    const resolvedStyle: React.CSSProperties = {
      ...(isNumericSize ? { width: size, height: size, fontSize: size } : {}),
      fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}, 'wght' 300, 'GRAD' 0${
        opticalSize ? `, 'opsz' ${opticalSize}` : ''
      }`,
      ...(transforms.length ? { transform: transforms.join(' ') } : {}),
      ...style,
    };

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true };

    return (
      <span
        ref={ref}
        data-unc-icon={name}
        className={classes}
        style={resolvedStyle}
        {...accessibilityProps}
        {...restProps}
      >
        {definition.ligature}
      </span>
    );
  }
);

Icon.displayName = 'Icon';
