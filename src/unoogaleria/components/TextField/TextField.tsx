'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UglTextFieldElement, UglTextFieldProps } from './TextField.types';
import './TextField.css';

/**
 * Conta caracteres por code point: um emoji, um ideograma ou uma letra com
 * acento combinado contam como a pessoa os vê, e não como unidades UTF-16.
 */
const countCodePoints = (text: string) => Array.from(text).length;

/**
 * Componente TextField — Design System Unoogaleria
 *
 * Campo de texto de uma linha ou área de texto (`multiline`): nome de álbum,
 * legenda, descrição. O rótulo é ligado ao campo por `htmlFor` (`useId`, com o
 * `id` do consumidor vencendo). O erro liga `aria-invalid` e entra no
 * `aria-describedby`, com glifo e texto — nunca só a cor.
 *
 * O contador de `maxLength` conta **code points**, e o componente não passa o
 * atributo nativo `maxLength` (que mede UTF-16 e cortaria um emoji ao meio).
 * Só é controlado quando o consumidor passa `value` (AGENTS.md, 4.5.1).
 */
export const TextField = React.forwardRef<UglTextFieldElement, UglTextFieldProps>(
  (
    {
      label,
      hideLabel = false,
      value,
      defaultValue,
      onChange,
      placeholder,
      multiline = false,
      rows = 3,
      maxLength,
      helperText,
      error,
      variant = 'default',
      theme,
      id,
      className = '',
      style,
      disabled,
      type = 'text',
      'aria-describedby': describedByProp,
      ...restProps
    },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? `ugl-text-field-${generatedId}`;
    const messageId = `${fieldId}-message`;
    const counterId = `${fieldId}-counter`;

    const isControlled = value !== undefined;
    const [uncontrolledCount, setUncontrolledCount] = React.useState(() =>
      countCodePoints(defaultValue ?? '')
    );
    const count = isControlled ? countCodePoints(value) : uncontrolledCount;

    const hasLimit = typeof maxLength === 'number' && maxLength > 0;
    const isOverLimit = hasLimit && count > (maxLength as number);
    const hasError = Boolean(error);
    const isInvalid = hasError || isOverLimit;
    const message = error ?? helperText;

    const describedBy =
      [describedByProp, message ? messageId : '', hasLimit ? counterId : '']
        .filter(Boolean)
        .join(' ') || undefined;

    const handleChange = (event: React.ChangeEvent<UglTextFieldElement>) => {
      setUncontrolledCount(countCodePoints(event.target.value));
      onChange?.(event.target.value, event);
    };

    const sharedProps = {
      id: fieldId,
      className: 'ugl-text-field__control',
      placeholder,
      disabled,
      onChange: handleChange,
      ...(isControlled ? { value } : { defaultValue }),
    };

    const accessibilityProps = {
      'aria-invalid': isInvalid || undefined,
      'aria-describedby': describedBy,
    };

    const classes = [
      'ugl-text-field',
      `ugl-text-field--${variant}`,
      multiline ? 'ugl-text-field--multiline' : '',
      isInvalid ? 'ugl-text-field--invalid' : '',
      disabled ? 'ugl-text-field--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-ugl-theme={theme} className={classes} style={style}>
        <label
          htmlFor={fieldId}
          className={hideLabel ? 'ugl-text-field__visually-hidden' : 'ugl-text-field__label'}
        >
          {label}
        </label>

        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...sharedProps}
            {...accessibilityProps}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            {...restProps}
            {...sharedProps}
            {...accessibilityProps}
          />
        )}

        {(message || hasLimit) && (
          <div className="ugl-text-field__footer">
            {message ? (
              <p
                id={messageId}
                className={[
                  'ugl-text-field__message',
                  hasError ? 'ugl-text-field__message--error' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {hasError && (
                  <>
                    <Icon
                      name="infoFilled"
                      size="xs"
                      tone="inherit"
                      className="ugl-text-field__message-icon"
                    />
                    <span className="ugl-text-field__visually-hidden">Erro: </span>
                  </>
                )}
                <span>{message}</span>
              </p>
            ) : (
              <span />
            )}

            {hasLimit && (
              <>
                <span
                  className={[
                    'ugl-text-field__counter',
                    isOverLimit ? 'ugl-text-field__counter--over' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                >
                  {count}/{maxLength}
                </span>
                <span id={counterId} className="ugl-text-field__visually-hidden">
                  {count} de {maxLength} caracteres
                </span>
                <span className="ugl-text-field__visually-hidden" aria-live="polite">
                  {isOverLimit ? `Limite de ${maxLength} caracteres excedido.` : ''}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
