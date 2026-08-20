import React from 'react';
import { tikIconRegistry } from './IconPaths';
import type { TikIconShape } from './IconPaths';
import type { TikIconProps } from './Icon.types';
import './Icon.css';

/**
 * Renderiza uma forma vetorial do registro de glifos.
 *
 * Cada forma é desenhada exatamente como exportada do Figma. Rotações de nó são
 * aplicadas via `transform` literal, nunca reescrevendo as coordenadas.
 */
const renderShape = (shape: TikIconShape, index: number): React.ReactElement => {
  if (shape.type === 'circle') {
    return (
      <circle
        key={index}
        cx={shape.cx}
        cy={shape.cy}
        r={shape.r}
        fill={shape.noFill ? 'none' : (shape.fill ?? 'currentColor')}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
      />
    );
  }

  if (shape.type === 'ellipse') {
    return (
      <ellipse
        key={index}
        cx={shape.cx}
        cy={shape.cy}
        rx={shape.rx}
        ry={shape.ry}
        fill={shape.fill ?? 'currentColor'}
        transform={shape.transform}
      />
    );
  }

  if (shape.type === 'rect') {
    return (
      <rect
        key={index}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        rx={shape.rx}
        fill={shape.noFill ? 'none' : (shape.fill ?? 'currentColor')}
        stroke={shape.stroke}
        strokeWidth={shape.strokeWidth}
      />
    );
  }

  return (
    <path
      key={index}
      d={shape.d}
      fill={shape.noFill ? 'none' : (shape.fill ?? 'currentColor')}
      fillRule={shape.evenOdd ? 'evenodd' : undefined}
      clipRule={shape.evenOdd ? 'evenodd' : undefined}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      strokeLinecap={shape.strokeLinecap}
    />
  );
};

/** Extrai a razão largura/altura do `viewBox` original do export. */
const aspectFromViewBox = (viewBox: string): number => {
  const [, , width, height] = viewBox.split(/\s+/).map(Number);
  return height > 0 ? width / height : 1;
};

/**
 * Componente Icon — Design System Tik Tooria
 *
 * Renderiza os glifos oficiais exportados do Figma "TikTok UI Screens
 * (Community) - cópia". Cada glifo preserva o `viewBox` original do export,
 * garantindo proporção idêntica à do arquivo de design: a prop `size` governa
 * a altura e a largura é derivada da razão do `viewBox`.
 *
 * O preenchimento herda `currentColor`, exceto nos glifos multicoloridos do
 * arquivo, que mantêm suas cores literais.
 */
export const Icon = React.forwardRef<SVGSVGElement, TikIconProps>(
  (
    {
      name,
      size = 'md',
      tone = 'default',
      rotate = 0,
      flipX = false,
      title,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const definition = tikIconRegistry[name];

    if (!definition) {
      return null;
    }

    const isNumericSize = typeof size === 'number';

    const classes = [
      'tik-icon',
      isNumericSize ? '' : `tik-icon--size-${size}`,
      `tik-icon--tone-${tone}`,
      definition.multicolor ? 'tik-icon--multicolor' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const transforms = [rotate ? `rotate(${rotate}deg)` : '', flipX ? 'scaleX(-1)' : ''].filter(
      Boolean
    );

    const resolvedStyle: React.CSSProperties = {
      aspectRatio: aspectFromViewBox(definition.viewBox),
      ...(isNumericSize ? { height: size } : {}),
      ...(transforms.length ? { transform: transforms.join(' ') } : {}),
      ...style,
    };

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    return (
      <svg
        ref={ref}
        data-tik-icon={name}
        className={classes}
        viewBox={definition.viewBox}
        style={resolvedStyle}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {title && <title>{title}</title>}
        {definition.shapes.map(renderShape)}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
