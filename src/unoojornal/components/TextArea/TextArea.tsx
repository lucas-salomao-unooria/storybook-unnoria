'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UjnTextAreaProps } from './TextArea.types';
import '../TextField/TextField.css';
import './TextArea.css';

/**
 * Conta caracteres por code point: um emoji, um ideograma ou uma letra com
 * acento combinado contam como a pessoa os vê, e não como unidades UTF-16.
 */
const countCodePoints = (text: string) => Array.from(text).length;

/**
 * Componente TextArea — Design System Unoojornal
 *
 * Área de texto da carta à redação: rótulo ligado por `htmlFor` (`useId`, com o
 * `id` do consumidor vencendo), texto de apoio, erro com glifo e contador de
 * caracteres. Compartilha o desenho do `TextField` (classes `ujn-text-field*`).
 *
 * O limite `maxLength` conta **code points**, e o componente não passa os
 * atributos nativos `minLength`/`maxLength` (que medem UTF-16 e cortariam um
 * emoji ao meio): o texto que passa do limite é cortado por code points no
 * `onChange`, e um valor controlado que já chega acima dele marca o campo como
 * inválido. Só é controlado quando o consumidor passa `value` (AGENTS.md,
 * 4.5.1).
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, UjnTextAreaProps>(
  (
    {
      label,
      hint,
      error,
      value,
      defaultValue,
      onChange,
      rows = 4,
      maxLength,
      showCount,
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
    const fieldId = id ?? `ujn-text-area-${generatedId}`;
    const messageId = `${fieldId}-message`;
    const counterId = `${fieldId}-counter`;

    const isControlled = value !== undefined;
    const [uncontrolledCount, setUncontrolledCount] = React.useState(() =>
      countCodePoints(defaultValue ?? '')
    );
    const count = isControlled ? countCodePoints(value) : uncontrolledCount;

    const hasLimit = typeof maxLength === 'number' && maxLength > 0;
    const hasCounter = showCount ?? hasLimit;
    const isOverLimit = hasLimit && count > (maxLength as number);
    const hasError = Boolean(error);
    const isInvalid = hasError || isOverLimit;
    const message = hasError ? error : hint;

    const describedBy =
      [describedByProp, message ? messageId : '', hasCounter ? counterId : '']
        .filter(Boolean)
        .join(' ') || undefined;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const node = event.currentTarget;

      if (hasLimit) {
        const points = Array.from(node.value);
        if (points.length > (maxLength as number)) {
          /* Corta por code points: o consumidor já lê o texto limitado. */
          node.value = points.slice(0, maxLength).join('');
        }
      }

      setUncontrolledCount(countCodePoints(node.value));
      onChange?.(event);
    };

    const classes = [
      'ujn-text-field',
      'ujn-text-area',
      isInvalid ? 'ujn-text-field--invalid' : '',
      disabled ? 'ujn-text-field--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const limitText = hasLimit ? `${count} de ${maxLength} caracteres` : `${count} caracteres`;

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

        <textarea
          ref={ref}
          rows={rows}
          required={required}
          disabled={disabled}
          {...restProps}
          id={fieldId}
          className="ujn-text-field__control ujn-text-area__control"
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
          {...(isControlled ? { value: value as string } : { defaultValue })}
        />

        {(message || hasCounter) && (
          <div className="ujn-text-area__footer">
            {message ? (
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
            ) : (
              <span />
            )}

            {hasCounter && (
              <>
                <span
                  className={[
                    'ujn-text-area__counter',
                    isOverLimit ? 'ujn-text-area__counter--over' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                >
                  {hasLimit ? `${count}/${maxLength}` : count}
                </span>
                <span id={counterId} className="ujn-text-field__visually-hidden">
                  {limitText}
                </span>
                <span className="ujn-text-field__visually-hidden" aria-live="polite">
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

TextArea.displayName = 'TextArea';
