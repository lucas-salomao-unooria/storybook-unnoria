import React from 'react';
import type { GptToggleProps } from './Toggle.types';
import './Toggle.css';

/**
 * Componente Toggle — Design System ChatGPT
 *
 * Réplica do conjunto `Toggle` do Figma: trilho de 44 × 24 com raio 12 e knob
 * circular de 20px em `#FFFFFF` com sombra local. `Off` usa `border/default`
 * como trilho; `On` usa `interactive/primary`.
 *
 * Exposto como `role="switch"` com `aria-checked`, acionável por clique,
 * `Enter` e `Espaço` (comportamento nativo do elemento `button`).
 */
export const Toggle = React.forwardRef<HTMLButtonElement, GptToggleProps>(
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
      'gpt-toggle',
      checked ? 'gpt-toggle--on' : 'gpt-toggle--off',
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
        data-gpt-theme={theme}
        className={classes}
        type={type}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        {...restProps}
      >
        <span className="gpt-toggle__knob" aria-hidden="true" />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';
