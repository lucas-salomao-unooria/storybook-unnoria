import React from 'react';
import type { UaiInputProps } from './Input.types';
import './Input.css';

/**
 * Componente Input — Design System UnooriaAI
 *
 * Campo de texto de linha única, de 320 × 44, com padding 10/12, raio 8,
 * superfície `--uai-bg-primary` e contorno de 1px que muda com o estado
 * (`default`, `focus`, `error`, `disabled`).
 *
 * O campo só é controlado quando o consumidor passa `value`: sem ele, quem
 * guarda o texto é o DOM. As props nativas seguem por spread.
 */
export const Input = React.forwardRef<HTMLInputElement, UaiInputProps>(
  (
    {
      state = 'default',
      block = false,
      theme,
      className = '',
      placeholder = 'Escreva aqui',
      disabled,
      ...restProps
    },
    ref
  ) => {
    const isDisabled = disabled ?? state === 'disabled';

    const classes = [
      'uai-input',
      `uai-input--${state}`,
      block ? 'uai-input--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-uai-theme={theme} className={classes}>
        <input
          ref={ref}
          className="uai-input__field"
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
