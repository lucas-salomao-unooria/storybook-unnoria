import React from 'react';
import { uaiIcons } from './IconGlyphs';
import type { UaiIconDefinition } from './IconGlyphs';
import type { UaiIconProps } from './Icon.types';
import './Icon.css';

/**
 * Menor e maior `opsz` que o Material Symbols Rounded aceita.
 */
const OPSZ_MIN = 20;
const OPSZ_MAX = 48;

/**
 * Componente Icon — Design System UnooriaAI
 *
 * Renderiza os glifos da biblioteca de ícones da Plataforma Unooria (Material
 * Symbols Rounded, peso 300) por ligadura. `size` governa a aresta da caixa do
 * glifo; o eixo óptico acompanha o tamanho, como no `Icon` da plataforma. O
 * glifo herda `currentColor` do contexto.
 *
 * A fonte precisa estar carregada — `@unooria/design-system/fonts/unooriaai.css`
 * ou o Material Symbols do próprio app.
 */
export const Icon = React.forwardRef<HTMLSpanElement, UaiIconProps>(
  (
    {
      name,
      size = 24,
      title,
      theme,
      rotate = 0,
      flipX = false,
      flipY = false,
      filled,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const definition: UaiIconDefinition | undefined = uaiIcons[name];

    if (!definition) {
      return null;
    }

    const isFilled = filled ?? definition.filled ?? false;
    const classes = ['uai-icon', className].filter(Boolean).join(' ');

    const transforms = [
      rotate ? `rotate(${rotate}deg)` : '',
      flipX ? 'scaleX(-1)' : '',
      flipY ? 'scaleY(-1)' : '',
    ].filter(Boolean);

    const opticalSize = Math.min(OPSZ_MAX, Math.max(OPSZ_MIN, Math.round(size)));

    const resolvedStyle: React.CSSProperties = {
      width: size,
      height: size,
      fontSize: size,
      fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}, 'wght' 300, 'GRAD' 0, 'opsz' ${opticalSize}`,
      ...(transforms.length ? { transform: transforms.join(' ') } : {}),
      ...style,
    };

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true };

    return (
      <span
        ref={ref}
        data-uai-theme={theme}
        data-uai-icon={name}
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
