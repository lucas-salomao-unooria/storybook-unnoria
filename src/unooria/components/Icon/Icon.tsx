import React, { forwardRef } from 'react';
import { IconProps, UnooriaIconSize } from './Icon.types';
import { customSenaiIconsMap } from './CustomIcons';
import {
  unooriaIconSizes,
  unooriaIconStrokeWeights,
  UnooriaIconSizeKey,
} from '../../tokens/icons';
import './Icon.css';

/**
 * Resolve tamanho em pixels a partir de chave de token ou valor numérico
 */
function resolveIconSize(size: UnooriaIconSize): number {
  if (typeof size === 'number') {
    return size;
  }
  const normalizedKey = size.toUpperCase() as UnooriaIconSizeKey;
  if (normalizedKey in unooriaIconSizes) {
    return unooriaIconSizes[normalizedKey];
  }
  return 24;
}

/**
 * Componente oficial de Ícones do Unooria Design System.
 * Suporta Material Symbols Rounded oficial (Weight 300, Fill 0, Grade 0, Optical Size 24px)
 * e ícones vetoriais customizados das iniciativas SENAI.
 */
export const Icon = forwardRef<HTMLElement, IconProps>(
  (
    {
      name,
      size = 's',
      weight = 300,
      fill = false,
      grade = 0,
      opticalSize,
      color,
      strokeWeight,
      spin = false,
      rotate,
      className = '',
      style,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden,
      role,
      ...rest
    },
    ref
  ) => {
    const sizePx = resolveIconSize(size);
    const fillValue = fill === true || fill === 1 ? 1 : 0;
    // `stroke-width` é uma propriedade SVG herdada: aplicada no wrapper, ela
    // alcança os traços dos ícones vetoriais customizados do SENAI.
    const resolvedStrokeWidth =
      strokeWeight !== undefined ? unooriaIconStrokeWeights[strokeWeight] : undefined;
    const resolvedOpticalSize = opticalSize !== undefined ? opticalSize : sizePx;

    // Acessibilidade: se aria-label fornecido, atua como imagem com significado; caso contrário é decorativo
    const isAccessible = Boolean(ariaLabel);
    const accessibilityProps = isAccessible
      ? { role: role || 'img', 'aria-label': ariaLabel, 'aria-hidden': undefined }
      : { 'aria-hidden': ariaHidden !== undefined ? ariaHidden : true, role: role };

    // Verifica se é um ícone vetorial customizado do SENAI
    const CustomSvgComponent = customSenaiIconsMap[name] || customSenaiIconsMap[name.toLowerCase()];

    if (CustomSvgComponent) {
      const customTransform = [
        rotate !== undefined ? `rotate(${rotate}deg)` : '',
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={`unooria-icon-component ${spin ? 'unooria-icon-component--spin' : ''} ${className}`.trim()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizePx,
            height: sizePx,
            color: color || undefined,
            strokeWidth: resolvedStrokeWidth,
            transform: customTransform || undefined,
            ...style,
          }}
          {...accessibilityProps}
          {...rest}
        >
          <CustomSvgComponent size={sizePx} color={color || 'currentColor'} />
        </span>
      );
    }

    // Renderização padrão como Google Material Symbols Rounded
    const variationSettings = `'FILL' ${fillValue}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${resolvedOpticalSize}`;

    const fontTransform = [
      rotate !== undefined ? `rotate(${rotate}deg)` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={`material-symbols-rounded unooria-icon-component ${
          spin ? 'unooria-icon-component--spin' : ''
        } ${className}`.trim()}
        style={{
          fontSize: `${sizePx}px`,
          width: `${sizePx}px`,
          height: `${sizePx}px`,
          fontVariationSettings: variationSettings,
          color: color || undefined,
          transform: fontTransform || undefined,
          ...style,
        }}
        {...accessibilityProps}
        {...rest}
      >
        {name}
      </span>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
