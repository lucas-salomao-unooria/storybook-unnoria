import React, { forwardRef, useState } from 'react';
import { TextFieldProps } from './TextField.types';
import { Icon } from '../Icon/Icon';
import './TextField.css';

/**
 * Componente oficial TextField (Campo de Entrada de Linha Única) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6107:729 / Component Set 1124:707)
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      required = false,
      helperText,
      helperIcon,
      error,
      success,
      size = 'md',
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      theme = 'light',
      className = '',
      style,
      inputClassName = '',
      disabled,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      (value !== undefined ? value : defaultValue || '') as string
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as string) : internalValue;

    const hasError = !!error;
    const hasSuccess = !hasError && !!success;
    const errorMessage = typeof error === 'string' ? error : undefined;
    const successMessage = typeof success === 'string' ? success : undefined;

    const sizeClass = `unooria-textfield--size-${size}`;
    const errorClass = hasError ? 'unooria-textfield--error' : '';
    const successClass = hasSuccess ? 'unooria-textfield--success' : '';
    const disabledClass = disabled ? 'unooria-textfield--disabled' : '';
    const themeClass = theme === 'dark' ? 'unooria-textfield--theme-dark' : '';

    const containerClassName = [
      'unooria-textfield',
      sizeClass,
      errorClass,
      successClass,
      disabledClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
    };

    const renderIcon = (iconProp: string | React.ReactNode, isSuffix = false) => {
      const cls = isSuffix ? 'unooria-textfield__suffix-icon' : 'unooria-textfield__prefix-icon';
      if (typeof iconProp === 'string') {
        return (
          <span className={cls}>
            <Icon name={iconProp} size={size === 'lg' ? 's' : 'xs'} color="currentColor" />
          </span>
        );
      }
      return <span className={cls}>{iconProp}</span>;
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

        <div className="unooria-textfield__input-container">
          {leftIcon && renderIcon(leftIcon, false)}

          <input
            ref={ref}
            disabled={disabled}
            value={currentValue}
            onChange={handleChange}
            className={`unooria-textfield__input ${inputClassName}`}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            {...rest}
          />

          {hasSuccess && !rightIcon && (
            <span className="unooria-textfield__suffix-icon" style={{ color: '#008257' }}>
              <Icon name="check_circle" size="xs" color="currentColor" />
            </span>
          )}

          {clearable && currentValue && !disabled && (
            <button
              type="button"
              aria-label="Limpar campo"
              onClick={handleClear}
              className="unooria-textfield__action-btn"
            >
              <Icon name="close" size="xs" color="currentColor" />
            </button>
          )}

          {rightIcon && renderIcon(rightIcon, true)}
        </div>

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
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
