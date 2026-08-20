import React from 'react';
import type { InstaButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System Instanooria
 *
 * Reúne as quatro ações canônicas do arquivo de design: a ação primária azul
 * das telas de autenticação e de "Follow", a ação secundária contornada de
 * "Edit Profile" e "Message", o link textual azul e a ação social do Facebook.
 */
export const Button = React.forwardRef<HTMLButtonElement, InstaButtonProps>(
  (
    {
      as,
      variant = 'primary',
      size = 'md',
      block = false,
      disabled = false,
      leadingIcon,
      trailingIcon,
      theme = 'light',
      children,
      className = '',
      type = 'button',
      ...restProps
    },
    ref
  ) => {
    const Component = (as || 'button') as React.ElementType;
    const isLinkLike = variant === 'link' || variant === 'facebook';

    const classes = [
      'insta-button',
      `insta-button--${variant}`,
      isLinkLike ? '' : `insta-button--size-${size}`,
      block ? 'insta-button--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-insta-theme={theme}
        className={classes}
        disabled={Component === 'button' ? disabled : undefined}
        aria-disabled={Component === 'button' ? undefined : disabled || undefined}
        type={Component === 'button' ? type : undefined}
        {...restProps}
      >
        {leadingIcon && (
          <span className="insta-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children}
        {trailingIcon && (
          <span className="insta-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
