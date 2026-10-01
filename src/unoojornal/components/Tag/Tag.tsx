import React from 'react';
import type { UjnTagProps } from './Tag.types';
import './Tag.css';

/**
 * Componente Tag — Design System Unoojornal
 *
 * Etiqueta de categoria e de metadado, em caixa alta. É um `<span>` quando só
 * informa, um `<a>` com `href` e um `<button>` com `onClick`. Nas duas formas
 * interativas o alvo de toque cresce para 44px sem mudar o desenho.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Tag = React.forwardRef<HTMLElement, UjnTagProps>(
  (
    {
      variant = 'outline',
      size = 'md',
      href,
      onClick,
      disabled = false,
      theme,
      className = '',
      children,
      ...restProps
    },
    ref
  ) => {
    const isLink = href !== undefined;
    const isInteractive = isLink || onClick !== undefined;

    const classes = [
      'ujn-tag',
      `ujn-tag--${variant}`,
      `ujn-tag--${size}`,
      isInteractive ? 'ujn-tag--interactive' : '',
      isInteractive && disabled ? 'ujn-tag--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (isLink) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          data-ujn-theme={theme}
          className={classes}
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          onClick={disabled ? undefined : onClick}
          {...restProps}
        >
          {children}
        </a>
      );
    }

    if (onClick !== undefined) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          data-ujn-theme={theme}
          className={classes}
          disabled={disabled}
          onClick={onClick}
          {...restProps}
        >
          {children}
        </button>
      );
    }

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} data-ujn-theme={theme} className={classes} {...restProps}>
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
