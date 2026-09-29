import React from 'react';
import type { UnvButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System Unoovista
 *
 * Ações em cápsula: a primária em roxo de ação (entrar, seguir), a secundária
 * contornada (editar perfil, enviar mensagem), o link textual e a ação social
 * (continuar com outra conta), em tom de link e com glifo à esquerda.
 */
export const Button = React.forwardRef<HTMLButtonElement, UnvButtonProps>(
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
    const isLinkLike = variant === 'link' || variant === 'social';

    const classes = [
      'unv-button',
      `unv-button--${variant}`,
      isLinkLike ? '' : `unv-button--size-${size}`,
      block ? 'unv-button--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-unv-theme={theme}
        className={classes}
        disabled={Component === 'button' ? disabled : undefined}
        aria-disabled={Component === 'button' ? undefined : disabled || undefined}
        type={Component === 'button' ? type : undefined}
        {...restProps}
      >
        {leadingIcon && (
          <span className="unv-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children}
        {trailingIcon && (
          <span className="unv-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
