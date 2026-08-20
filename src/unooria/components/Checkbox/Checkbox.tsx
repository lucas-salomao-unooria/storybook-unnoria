'use client';

import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useEffect,
  useState,
  forwardRef,
} from 'react';
import {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxSize,
  CheckboxTheme,
} from './Checkbox.types';
import './Checkbox.css';

/**
 * Encaminha um nó DOM para uma ref externa (callback ou objeto).
 * Declarada fora do componente para deixar explícito que a escrita ocorre
 * na fase de commit do React, e não durante a renderização.
 */
const assignInputRef = (
  target: React.Ref<HTMLInputElement> | undefined,
  node: HTMLInputElement | null
) => {
  if (typeof target === 'function') {
    target(node);
  } else if (target && 'current' in target) {
    (target as React.MutableRefObject<HTMLInputElement | null>).current = node;
  }
};

/* ==========================================================================
   Contexto do CheckboxGroup
   ========================================================================== */
interface CheckboxGroupContextValue {
  name?: string;
  value?: string[];
  disabled?: boolean;
  size?: CheckboxSize;
  theme?: CheckboxTheme;
  /**
   * Estado de erro do grupo. O role `group` do <fieldset> não suporta
   * `aria-invalid`; por isso o estado é propagado até cada <input
   * type="checkbox">, cujo role `checkbox` reconhece o atributo.
   */
  invalid?: boolean;
  onChange?: (optionValue: string, checked: boolean) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

/* ==========================================================================
   Ícones SVG Internos (Zero Dependências Externas)
   ========================================================================== */
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`unooria-checkbox__icon unooria-checkbox__icon--check ${className || ''}`}
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1.5 5.2L4.5 8.2L10.5 1.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`unooria-checkbox__icon unooria-checkbox__icon--indeterminate ${className || ''}`}
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2 5H10"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/* ==========================================================================
   Componente Checkbox
   ========================================================================== */
/**
 * Componente Checkbox da Plataforma Unooria
 * Baseado nas especificações oficiais do Figma (nó #25405:5873).
 * Oferece suporte a estados controlado/não-controlado, indeterminado, modo claro/escuro,
 * tamanhos (sm, md, lg) e acessibilidade ARIA total.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      disabled = false,
      isDisabled = false,
      size: explicitSize,
      theme: explicitTheme,
      label,
      labelPosition = 'right',
      helperText,
      error,
      value,
      name: explicitName,
      id: explicitId,
      onChange,
      inputRef: externalInputRef,
      className = '',
      style,
      required,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...restInputProps
    },
    ref
  ) => {
    // Integração com CheckboxGroup se aninhado
    const groupContext = useContext(CheckboxGroupContext);

    const generatedId = useId();
    const inputId = explicitId || `unooria-checkbox-${generatedId}`;
    const helperId = helperText || error ? `${inputId}-helper` : undefined;

    // Resolução de propriedades herdadas ou explícitas
    const size: CheckboxSize = explicitSize || groupContext?.size || 'md';
    const theme: CheckboxTheme = explicitTheme || groupContext?.theme || 'light';
    const isGroupDisabled = groupContext?.disabled || false;
    const finalDisabled = disabled || isDisabled || isGroupDisabled;
    const finalName = explicitName || groupContext?.name;

    // Estado interno para modo não-controlado
    const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

    // Determina se está checado
    let isChecked = false;
    if (groupContext && value !== undefined && groupContext.value !== undefined) {
      isChecked = groupContext.value.includes(value);
    } else if (controlledChecked !== undefined) {
      isChecked = controlledChecked;
    } else {
      isChecked = internalChecked;
    }

    // Gerenciamento da ref do input nativo para sincronizar .indeterminate
    const internalInputRef = useRef<HTMLInputElement | null>(null);

    const handleCombinedRef = (node: HTMLInputElement | null) => {
      internalInputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
      assignInputRef(externalInputRef, node);
    };

    useEffect(() => {
      if (internalInputRef.current) {
        internalInputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (finalDisabled) {
        event.preventDefault();
        return;
      }

      const nextChecked = event.target.checked;

      if (controlledChecked === undefined && (!groupContext || !groupContext.value)) {
        setInternalChecked(nextChecked);
      }

      if (groupContext?.onChange && value !== undefined) {
        groupContext.onChange(value, nextChecked);
      }

      if (onChange) {
        onChange(nextChecked, event);
      }
    };

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : null;

    const classNames = [
      'unooria-checkbox',
      `unooria-checkbox--${size}`,
      `unooria-checkbox--${theme}`,
      labelPosition === 'left' ? 'unooria-checkbox--label-left' : '',
      isChecked ? 'unooria-checkbox--checked' : '',
      indeterminate ? 'unooria-checkbox--indeterminate' : '',
      finalDisabled ? 'unooria-checkbox--disabled' : '',
      hasError ? 'unooria-checkbox--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const combinedDescribedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <label className={classNames} style={style} htmlFor={inputId}>
        <input
          {...restInputProps}
          ref={handleCombinedRef}
          type="checkbox"
          id={inputId}
          name={finalName}
          value={value}
          checked={isChecked}
          disabled={finalDisabled}
          required={required}
          onChange={handleChange}
          aria-checked={indeterminate ? 'mixed' : isChecked}
          aria-disabled={finalDisabled}
          aria-invalid={hasError || groupContext?.invalid ? true : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={combinedDescribedBy}
          className="unooria-checkbox__sr-input"
        />

        <span className="unooria-checkbox__control" aria-hidden="true">
          {indeterminate ? (
            <IndeterminateIcon />
          ) : isChecked ? (
            <CheckIcon />
          ) : null}
        </span>

        {(label || helperText || errorMessage) && (
          <span className="unooria-checkbox__content">
            {label && (
              <span className="unooria-checkbox__label-text">
                {label}
                {required && <span className="unooria-checkbox__required-star">*</span>}
              </span>
            )}
            {(errorMessage || helperText) && (
              <span
                id={helperId}
                className={`unooria-checkbox__helper-text ${
                  hasError ? 'unooria-checkbox__helper-text--error' : ''
                }`}
              >
                {errorMessage || helperText}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

/* ==========================================================================
   Componente CheckboxGroup
   ========================================================================== */
/**
 * Componente CheckboxGroup da Plataforma Unooria
 * Agrupa múltiplos checkboxes gerenciando o estado compartilhado, layout e acessibilidade.
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  helperText,
  error,
  direction = 'vertical',
  size = 'md',
  theme = 'light',
  disabled = false,
  required = false,
  name: explicitName,
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  children,
  className = '',
  style,
  ...restFieldsetProps
}) => {
  const generatedId = useId();
  const groupName = explicitName || `unooria-checkbox-group-${generatedId}`;
  const legendId = `${groupName}-legend`;
  const helperId = helperText || error ? `${groupName}-helper` : undefined;

  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValues = isControlled ? controlledValue : internalValue;

  const handleOptionToggle = (optionValue: string, checked: boolean) => {
    let nextValues: string[];
    if (checked) {
      nextValues = [...currentValues, optionValue];
    } else {
      nextValues = currentValues.filter((v) => v !== optionValue);
    }

    if (!isControlled) {
      setInternalValue(nextValues);
    }

    if (onChange) {
      onChange(nextValues);
    }
  };

  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;

  const groupClassNames = [
    'unooria-checkbox-group',
    `unooria-checkbox-group--${theme}`,
    hasError ? 'unooria-checkbox-group--error' : '',
    disabled ? 'unooria-checkbox-group--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const optionsClassNames = [
    'unooria-checkbox-group__options',
    `unooria-checkbox-group__options--${direction}`,
  ].join(' ');

  return (
    <CheckboxGroupContext.Provider
      value={{
        name: groupName,
        value: currentValues,
        disabled,
        size,
        theme,
        invalid: hasError,
        onChange: handleOptionToggle,
      }}
    >
      <fieldset
        {...restFieldsetProps}
        className={groupClassNames}
        style={style}
        role="group"
        aria-labelledby={label ? legendId : undefined}
        aria-describedby={helperId}
        disabled={disabled}
      >
        {label && (
          <legend id={legendId} className="unooria-checkbox-group__legend">
            {label}
            {required && <span className="unooria-checkbox-group__required-star">*</span>}
          </legend>
        )}

        <div className={optionsClassNames}>
          {options
            ? options.map((option) => (
                <Checkbox
                  key={option.value}
                  id={option.id}
                  value={option.value}
                  label={option.label}
                  helperText={option.helperText}
                  disabled={option.disabled || disabled}
                  className={option.className}
                  size={size}
                  theme={theme}
                />
              ))
            : children}
        </div>

        {(errorMessage || helperText) && (
          <div
            id={helperId}
            role={hasError ? 'alert' : undefined}
            className={`unooria-checkbox-group__helper-text ${
              hasError ? 'unooria-checkbox-group__helper-text--error' : ''
            }`}
          >
            {errorMessage || helperText}
          </div>
        )}
      </fieldset>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
