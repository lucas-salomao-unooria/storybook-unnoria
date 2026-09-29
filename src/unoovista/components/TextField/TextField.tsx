'use client';

import React, { useId } from 'react';
import { Icon } from '../Icon';
import type { UnvTextFieldProps } from './TextField.types';
import './TextField.css';

/**
 * Componente TextField — Design System Unoovista
 *
 * Campo de entrada em duas formas: a caixa arredondada `filled`, com o rótulo
 * acima, e a linha `underline`, com o rótulo à esquerda. O rótulo é ligado ao
 * campo por `htmlFor`/`useId`. O campo só é controlado quando o consumidor
 * passa `value` (AGENTS.md, 4.5.1): `value` e `defaultValue` chegam ao `<input>`
 * exatamente como vieram, sem estado interno que possa reconciliar o texto de
 * volta para vazio. O erro combina texto, glifo e contorno mais grosso.
 */
export const TextField = React.forwardRef<HTMLInputElement, UnvTextFieldProps>(
  (
    {
      variant = 'filled',
      label,
      hideLabel = false,
      hint,
      error,
      trailing,
      block = true,
      theme,
      className = '',
      id,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `unv-text-field-${generatedId}`;
    const messageId = `${inputId}-message`;
    const hasError = Boolean(error);

    const classes = [
      'unv-text-field',
      `unv-text-field--${variant}`,
      block ? 'unv-text-field--block' : '',
      hasError ? 'unv-text-field--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const control = (
      <input
        ref={ref}
        id={inputId}
        className="unv-text-field__control"
        aria-invalid={hasError || undefined}
        aria-describedby={error || hint ? messageId : undefined}
        {...restProps}
      />
    );

    return (
      <div data-unv-theme={theme} className={classes}>
        {variant === 'underline' ? (
          <div className="unv-text-field__row">
            {label && (
              <label className="unv-text-field__label" htmlFor={inputId}>
                {label}
              </label>
            )}
            {control}
          </div>
        ) : (
          <>
            {label && (
              <label
                className={hideLabel ? 'unv-text-field__visually-hidden' : 'unv-text-field__label'}
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
              'unv-text-field__message',
              hasError ? 'unv-text-field__message--error' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {hasError && (
              <>
                <Icon name="error" size="sm" tone="like" className="unv-text-field__message-icon" />
                <span className="unv-text-field__visually-hidden">Erro: </span>
              </>
            )}
            <span>{error ?? hint}</span>
          </p>
        )}

        {trailing && <div className="unv-text-field__trailing">{trailing}</div>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
