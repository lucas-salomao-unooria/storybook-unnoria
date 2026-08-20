import React from 'react';
import { waIcons } from './IconPaths';
import type { WaIconShape } from './IconPaths';
import type { WaIconProps } from './Icon.types';
import './Icon.css';

/**
 * Renderiza uma forma vetorial do registro de glifos.
 *
 * Cada forma é desenhada exatamente como exportada do Figma. Deslocamentos
 * entre nós compostos são aplicados via `transform`, nunca reescrevendo o
 * atributo `d`.
 */
const renderShape = (shape: WaIconShape, index: number): React.ReactElement => {
  if (shape.type === 'line') {
    return (
      <line
        key={index}
        x1={shape.x1}
        y1={shape.y1}
        x2={shape.x2}
        y2={shape.y2}
        stroke={shape.stroke ?? 'currentColor'}
        strokeWidth={shape.strokeWidth ?? 1}
        strokeLinecap={shape.strokeLinecap}
      />
    );
  }

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

  const path = (
    <path
      d={shape.d}
      fill={shape.noFill ? 'none' : (shape.fill ?? 'currentColor')}
      fillRule={shape.evenOdd ? 'evenodd' : undefined}
      clipRule={shape.evenOdd ? 'evenodd' : undefined}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      strokeLinecap={shape.strokeLinecap}
      strokeMiterlimit={shape.strokeMiterlimit}
    />
  );

  if (shape.translate) {
    return (
      <g key={index} transform={`translate(${shape.translate[0]}, ${shape.translate[1]})`}>
        {path}
      </g>
    );
  }

  return <React.Fragment key={index}>{path}</React.Fragment>;
};

/**
 * Componente Icon — Design System WhatsApp Mobile
 *
 * Renderiza os glifos oficiais exportados do Figma "WhatsApp Clone - Dark mode
 * (Community) - cópia". Cada glifo preserva o `viewBox` original do export,
 * garantindo proporção idêntica à do arquivo de design. O preenchimento herda
 * `currentColor`, exceto em glifos com cor fixa (como o ícone de PDF).
 */
export const Icon = React.forwardRef<SVGSVGElement, WaIconProps>(
  (
    {
      name,
      size = 'md',
      tone = 'appbar',
      rotate = 0,
      flipX = false,
      flipY = false,
      title,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const definition = waIcons[name];

    if (!definition) {
      return null;
    }

    const isNumericSize = typeof size === 'number';

    const classes = [
      'wa-icon',
      isNumericSize ? '' : `wa-icon--size-${size}`,
      `wa-icon--tone-${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const transforms = [
      rotate ? `rotate(${rotate}deg)` : '',
      flipX ? 'scaleX(-1)' : '',
      flipY ? 'scaleY(-1)' : '',
    ].filter(Boolean);

    const resolvedStyle: React.CSSProperties = {
      ...(isNumericSize ? { width: size, height: size } : {}),
      ...(transforms.length ? { transform: transforms.join(' ') } : {}),
      ...style,
    };

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    return (
      <svg
        ref={ref}
        data-wa-icon={name}
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
