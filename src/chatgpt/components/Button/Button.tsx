import React from 'react';
import type { GptButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System ChatGPT
 *
 * Réplica fiel do conjunto de variantes `Button` da página `🟡 Design system`
 * do Figma: 5 variantes (`Primary`, `Secondary`, `Outline`, `Ghost`,
 * `Destructive`) × 3 tamanhos (`SM`, `MD`, `LG`), totalizando as 15
 * combinações publicadas.
 */
export const Button = React.forwardRef<HTMLButtonElement, GptButtonProps>(
  (
    {
      as,
      variant = 'primary',
      size = 'md',
      block = false,
      disabled = false,
      leadingIcon,
      trailingIcon,
      theme,
      children,
      className = '',
      type = 'button',
      ...restProps
    },
    ref
  ) => {
    const Component = (as || 'button') as React.ElementType;

    const classes = [
      'gpt-button',
      `gpt-button--${variant}`,
      `gpt-button--${size}`,
      block ? 'gpt-button--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-gpt-theme={theme}
        className={classes}
        disabled={Component === 'button' ? disabled : undefined}
        aria-disabled={Component === 'button' ? undefined : disabled || undefined}
        type={Component === 'button' ? type : undefined}
        {...restProps}
      >
        {leadingIcon && (
          <span className="gpt-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children}
        {trailingIcon && (
          <span className="gpt-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
