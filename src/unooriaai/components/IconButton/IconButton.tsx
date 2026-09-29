import React from 'react';
import type { UaiIconButtonProps } from './IconButton.types';
import './IconButton.css';

/**
 * Componente IconButton — Design System UnooriaAI
 *
 * Botão só de ícone: 3 variantes (`default`, `filled`, `primary`) × 3
 * tamanhos (`sm`, `md`, `lg`). O alvo é sempre **quadrado** (28, 36 ou 44px),
 * com raio igual nos quatro cantos. Como não tem texto visível, exige
 * `aria-label`. O conteúdo é tipicamente um `Icon` de 16, 20 ou 24px.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, UaiIconButtonProps>(
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
      'uai-icon-button',
      `uai-icon-button--${variant}`,
      `uai-icon-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        data-uai-theme={theme}
        className={classes}
        disabled={disabled}
        type={type}
        {...restProps}
      >
        <span className="uai-icon-button__glyph" aria-hidden="true">
          {children}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
