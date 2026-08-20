import React from 'react';
import type { GptInputProps } from './Input.types';
import './Input.css';

/**
 * Componente Input — Design System ChatGPT
 *
 * Réplica do conjunto `Input` do Figma: campo de 320 × 44 com padding 10/12,
 * raio 8, superfície `bg/primary` e contorno de 1px que muda com o estado
 * (`Default`, `Focus`, `Error`, `Disabled`).
 */
export const Input = React.forwardRef<HTMLInputElement, GptInputProps>(
  (
    {
      state = 'default',
      block = false,
      theme,
      className = '',
      placeholder = 'Placeholder',
      disabled,
      ...restProps
    },
    ref
  ) => {
    const isDisabled = disabled ?? state === 'disabled';

    const classes = [
      'gpt-input',
      `gpt-input--${state}`,
      block ? 'gpt-input--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-gpt-theme={theme} className={classes}>
        <input
          ref={ref}
          className="gpt-input__field"
          placeholder={placeholder}
          disabled={isDisabled}
          aria-invalid={state === 'error' || undefined}
          {...restProps}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
