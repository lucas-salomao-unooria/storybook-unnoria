import React, { useId } from 'react';
import type { InstaTextFieldProps } from './TextField.types';
import './TextField.css';

/**
 * Componente TextField — Design System Instanooria
 *
 * Cobre as duas formas de entrada do arquivo de design: a caixa preenchida de
 * 44px das telas de autenticação e a linha com rótulo à esquerda da tela
 * "Edit Profile", separada por um divisor hairline.
 */
export const TextField = React.forwardRef<HTMLInputElement, InstaTextFieldProps>(
  (
    {
      variant = 'filled',
      label,
      hideLabel = false,
      hint,
      error,
      trailing,
      block = true,
      theme = 'light',
      className = '',
      id,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `insta-text-field-${generatedId}`;
    const messageId = `${inputId}-message`;
    const hasError = Boolean(error);

    const classes = [
      'insta-text-field',
      `insta-text-field--${variant}`,
      block ? 'insta-text-field--block' : '',
      hasError ? 'insta-text-field--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const control = (
      <input
        ref={ref}
        id={inputId}
        className="insta-text-field__control"
        aria-invalid={hasError || undefined}
        aria-describedby={error || hint ? messageId : undefined}
        {...restProps}
      />
    );

    return (
      <div data-insta-theme={theme} className={classes}>
        {variant === 'underline' ? (
          <div className="insta-text-field__row">
            {label && (
              <label className="insta-text-field__label" htmlFor={inputId}>
                {label}
              </label>
            )}
            {control}
          </div>
        ) : (
          <>
            {label && (
              <label
                className={hideLabel ? 'insta-text-field__visually-hidden' : 'insta-text-field__label'}
                htmlFor={inputId}
              >
                {label}
              </label>
            )}
            {control}
          </>
        )}

        {(error || hint) && (
          <p
            id={messageId}
            className={[
              'insta-text-field__message',
              hasError ? 'insta-text-field__message--error' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {error ?? hint}
          </p>
        )}

        {trailing && <div className="insta-text-field__trailing">{trailing}</div>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
