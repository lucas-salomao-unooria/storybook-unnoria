import React from 'react';
import { instaIcons } from './IconPaths';
import type { InstaIconProps } from './Icon.types';
import './Icon.css';

/**
 * Componente Icon — Design System Instanooria
 *
 * Renderiza os glifos oficiais exportados do Figma "Instagram UI Screens (Community)".
 * Cada glifo preserva o `viewBox` original do export, garantindo proporção idêntica
 * à do arquivo de design. O preenchimento herda `currentColor`, exceto em glifos
 * com cor fixa de marca (como o selo de conta oficial).
 */
export const Icon = React.forwardRef<SVGSVGElement, InstaIconProps>(
  (
    {
      name,
      size = 'md',
      tone = 'primary',
      theme = 'light',
      title,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const definition = instaIcons[name];

    if (!definition) {
      return null;
    }

    const isNumericSize = typeof size === 'number';

    const classes = [
      'insta-icon',
      isNumericSize ? '' : `insta-icon--size-${size}`,
      `insta-icon--tone-${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const numericStyle: React.CSSProperties | undefined = isNumericSize
      ? { width: size, height: size, ...style }
      : style;

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    return (
      <svg
        ref={ref}
        data-insta-theme={theme}
        data-insta-icon={name}
        className={classes}
        viewBox={definition.viewBox}
        style={numericStyle}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {title && <title>{title}</title>}
        {definition.paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill={path.fill ?? 'currentColor'}
            fillRule={path.evenOdd ? 'evenodd' : undefined}
            clipRule={path.evenOdd ? 'evenodd' : undefined}
          />
        ))}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
