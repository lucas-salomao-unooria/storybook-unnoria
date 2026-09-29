import React from 'react';
import type { UaiButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System UnooriaAI
 *
 * Botão de ação com 5 variantes (`primary`, `secondary`, `outline`, `ghost`,
 * `destructive`) × 3 tamanhos (`sm`, `md`, `lg`), totalizando 15
 * combinações. Pode ser renderizado como âncora pela prop `as`, e aceita
 * `Icon` (ou qualquer nó) nos slots `leadingIcon` e `trailingIcon`.
 */
export const Button = React.forwardRef<HTMLButtonElement, UaiButtonProps>(
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
      'uai-button',
      `uai-button--${variant}`,
      `uai-button--${size}`,
      block ? 'uai-button--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-uai-theme={theme}
        className={classes}
        disabled={Component === 'button' ? disabled : undefined}
        aria-disabled={Component === 'button' ? undefined : disabled || undefined}
        type={Component === 'button' ? type : undefined}
        {...restProps}
      >
        {leadingIcon && (
          <span className="uai-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children}
        {trailingIcon && (
          <span className="uai-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
