'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UjnTextFieldProps } from './TextField.types';
import './TextField.css';

/**
 * Componente TextField — Design System Unoojornal
 *
 * Campo de texto de uma linha: nome e e-mail da carta à redação, busca de
 * autoria. O rótulo é ligado ao campo por `htmlFor` (`useId`, com o `id` do
 * consumidor vencendo). O texto de apoio e o erro entram no `aria-describedby`;
 * o erro liga `aria-invalid` e vem com glifo e texto — nunca só a cor. O
 * contorno é `--ujn-color-border-control` (gráfico ≥ 3:1) e o foco soma o anel.
 *
 * Só é controlado quando o consumidor passa `value` (AGENTS.md, 4.5.1): sem ele,
 * quem guarda o texto é o DOM e o que vai ao elemento é `defaultValue`. Assim o
 * preenchimento automático do navegador e os gerenciadores de senha, que
 * escrevem sem passar por evento do React, não perdem o texto numa
 * re-renderização.
 */
export const TextField = React.forwardRef<HTMLInputElement, UjnTextFieldProps>(
  (
    {
      label,
      hint,
      error,
      value,
      defaultValue,
      iconStart,
      type = 'text',
      required,
      id,
      theme,
      disabled,
      className = '',
      style,
      'aria-describedby': describedByProp,
      ...restProps
    },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? `ujn-text-field-${generatedId}`;
    const messageId = `${fieldId}-message`;

    const isControlled = value !== undefined;
    const hasError = Boolean(error);
    const message = hasError ? error : hint;
    const describedBy = [describedByProp, message ? messageId : ''].filter(Boolean).join(' ') || undefined;

    const classes = [
      'ujn-text-field',
      hasError ? 'ujn-text-field--invalid' : '',
      disabled ? 'ujn-text-field--disabled' : '',
      iconStart ? 'ujn-text-field--with-icon' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-ujn-theme={theme} className={classes} style={style}>
        <label htmlFor={fieldId} className="ujn-text-field__label">
          {label}
          {required && (
            <span className="ujn-text-field__required" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>

        <div className="ujn-text-field__wrap">
          {iconStart && (
            <Icon name={iconStart} size="sm" tone="secondary" className="ujn-text-field__icon" />
          )}
          <input
            ref={ref}
            type={type}
            required={required}
            disabled={disabled}
            {...restProps}
            id={fieldId}
            className="ujn-text-field__control"
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            {...(isControlled ? { value: value as string } : { defaultValue })}
          />
        </div>

        {message && (
          <p
            id={messageId}
            className={[
              'ujn-text-field__message',
              hasError ? 'ujn-text-field__message--error' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {hasError && (
              <>
                <Icon
                  name="error"
                  size="xs"
                  tone="inherit"
                  className="ujn-text-field__message-icon"
                />
                <span className="ujn-text-field__visually-hidden">Erro: </span>
              </>
            )}
            <span>{message}</span>
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
