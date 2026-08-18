import React, { forwardRef, useState } from 'react';
import { TextAreaProps } from './TextField.types';
import { Icon } from '../Icon/Icon';
import './TextField.css';

/**
 * Componente TextArea (Área de Texto Multilinha) com limitador dinâmico de caracteres.
 * Plataforma Unooria - Extraído do Figma (Node 6107:729 / Component Set 6110:467 & 16381:716)
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      required = false,
      helperText,
      helperIcon,
      error,
      success,
      maxLength,
      showCounter = true,
      resize = 'vertical',
      theme = 'light',
      className = '',
      style,
      textareaClassName = '',
      disabled,
      value,
      defaultValue,
      onChange,
      rows = 3,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      (value !== undefined ? value : defaultValue || '') as string
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as string) : internalValue;
    const currentLength = currentValue ? currentValue.length : 0;

    const hasError = !!error;
    const hasSuccess = !hasError && !!success;
    const isLimitReached = maxLength !== undefined && currentLength >= maxLength;

    const errorMessage = typeof error === 'string' ? error : undefined;
    const successMessage = typeof success === 'string' ? success : undefined;

    const errorClass = hasError ? 'unooria-textarea--error' : '';
    const disabledClass = disabled ? 'unooria-textarea--disabled' : '';
    const themeClass = theme === 'dark' ? 'unooria-textarea--theme-dark' : '';

    const containerClassName = [
      'unooria-textarea',
      errorClass,
      disabledClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    /**
     * Textos oficiais do limitador de caracteres extraídos do Figma (Node 16381:716)
     */
    const renderCounterText = () => {
      if (!maxLength) return null;
      if (currentLength === 0) {
        return `Você pode usar até ${maxLength} caracteres.`;
      }
      if (currentLength >= maxLength) {
        return `Você atingiu o limite de ${maxLength} caracteres.`;
      }
      return `Você usou ${currentLength} de ${maxLength} caracteres.`;
    };

    return (
      <div className={containerClassName} style={style}>
        {label && (
          <div className="unooria-textfield__label-row">
            <label className="unooria-textfield__label">
              <span>{label}</span>
              {required && <span className="unooria-textfield__required">*</span>}
              {helperIcon && (
                <span className="unooria-textfield__helper-icon" title="Mais informações">
                  <Icon
                    name={typeof helperIcon === 'string' ? helperIcon : 'help'}
                    size="xs"
                    color="currentColor"
                  />
                </span>
              )}
            </label>
          </div>
        )}

        <textarea
          ref={ref}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          maxLength={maxLength}
          rows={rows}
          style={{ resize }}
          className={`unooria-textarea__input ${textareaClassName}`}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          {...rest}
        />

        <div className="unooria-textarea__footer">
          {hasError && errorMessage && (
            <p className="unooria-textfield__error-text" role="alert">
              {errorMessage}
            </p>
          )}

          {hasSuccess && successMessage && (
            <p className="unooria-textfield__success-text">{successMessage}</p>
          )}

          {!hasError && !hasSuccess && helperText && (
            <p className="unooria-textfield__helper-text">{helperText}</p>
          )}

          {showCounter && maxLength !== undefined && (
            <span
              className={`unooria-textarea__counter ${
                isLimitReached ? 'unooria-textarea__counter--limit' : ''
              }`}
            >
              {renderCounterText()}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
