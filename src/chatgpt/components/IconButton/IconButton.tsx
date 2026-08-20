import React from 'react';
import type { GptIconButtonProps } from './IconButton.types';
import './IconButton.css';

/**
 * Componente IconButton — Design System ChatGPT
 *
 * Réplica do conjunto `IconButton` do Figma: 3 variantes (`Default`,
 * `Filled`, `Primary`) × 3 tamanhos (`SM`, `MD`, `LG`).
 *
 * Desvio registrado: os frames do arquivo abraçam a largura do glifo
 * (`layoutSizingHorizontal = HUG`), o que produz larguras de 11–20px contra
 * alturas fixas de 28/36/44px. O componente renderiza o alvo **quadrado**,
 * intenção evidente no arquivo — raios iguais nos quatro cantos e glifos
 * dimensionados pelos tokens `size/icon-*`.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, GptIconButtonProps>(
  (
    {
      variant = 'default',
      size = 'md',
      children,
      disabled = false,
      theme,
      className = '',
      type = 'button',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'gpt-icon-button',
      `gpt-icon-button--${variant}`,
      `gpt-icon-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        data-gpt-theme={theme}
        className={classes}
        disabled={disabled}
        type={type}
        {...restProps}
      >
        <span className="gpt-icon-button__glyph" aria-hidden="true">
          {children}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
