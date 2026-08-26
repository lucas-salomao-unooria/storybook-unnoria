import React from 'react';
import { uniIconRegistry } from './IconPaths';
import type { UniIconProps } from './Icon.types';
import './Icon.css';

/**
 * Componente Icon — Design System Unootube
 *
 * Renderiza os 45 glifos oficiais exportados do arquivo Figma "YouTube UI Clone
 * Design (Community)". Cada glifo preserva o `viewBox` original do export
 * (24×24 em todos eles) e o atributo `d` literal — nenhum caminho foi desenhado
 * à mão nem substituído por outra biblioteca.
 *
 * O preenchimento herda `currentColor`, de modo que a prop `tone` e a cor do
 * elemento ancestral governem a cor do glifo. É assim que o mesmo vetor serve
 * ao texto primário da barra superior, ao secundário da barra do comentário e
 * ao cromo do reprodutor.
 */
export const Icon = React.forwardRef<SVGSVGElement, UniIconProps>(
  ({ name, size = 'lg', tone = 'inherit', title, className = '', style, ...restProps }, ref) => {
    const definition = uniIconRegistry[name];

    if (!definition) {
      return null;
    }

    const isNumericSize = typeof size === 'number';

    const classes = [
      'uni-icon',
      isNumericSize ? '' : `uni-icon--size-${size}`,
      `uni-icon--tone-${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle: React.CSSProperties = {
      ...(isNumericSize ? { width: size, height: size } : {}),
      ...style,
    };

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    return (
      <svg
        ref={ref}
        data-uni-icon={name}
        className={classes}
        viewBox={definition.viewBox}
        style={resolvedStyle}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {title && <title>{title}</title>}
        <path d={definition.d} fill="currentColor" />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
