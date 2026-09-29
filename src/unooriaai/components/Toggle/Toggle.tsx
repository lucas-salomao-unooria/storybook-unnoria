'use client';

import React from 'react';
import type { UaiToggleProps } from './Toggle.types';
import './Toggle.css';

/**
 * Componente Toggle — Design System UnooriaAI
 *
 * Interruptor com trilho de 44 × 24 e botão circular de 20px com sombra.
 * Desligado usa `--uai-border-control` como trilho (≥ 3:1 sobre a superfície);
 * ligado usa `--uai-interactive-primary`.
 *
 * Exposto como `role="switch"` com `aria-checked`, acionável por clique,
 * `Enter` e `Espaço` (comportamento nativo do elemento `button`).
 */
export const Toggle = React.forwardRef<HTMLButtonElement, UaiToggleProps>(
  (
    {
      checked = false,
      onCheckedChange,
      disabled = false,
      theme,
      className = '',
      onClick,
      type = 'button',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'uai-toggle',
      checked ? 'uai-toggle--on' : 'uai-toggle--off',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) onCheckedChange?.(!checked);
    };

    return (
      <button
        ref={ref}
        data-uai-theme={theme}
        className={classes}
        type={type}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        {...restProps}
      >
        <span className="uai-toggle__knob" aria-hidden="true" />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';
