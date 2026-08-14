import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from 'react';
import {
  RadioButtonBoxSide,
  RadioButtonOption,
  RadioButtonProps,
  RadioButtonSize,
  RadioButtonTheme,
  RadioGroupContextValue,
  RadioGroupProps,
} from './RadioButton.types';
import './RadioButton.css';

/**
 * Contexto compartilhado para comunicação entre RadioGroup e RadioButtons filhos
 */
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Hook para acessar as propriedades do grupo de rádio pai
 */
export const useRadioGroup = () => useContext(RadioGroupContext);

/**
 * Componente de Ícone de Alerta para mensagens de erro
 */
const ErrorExclamationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

/**
 * Componente RadioButton - Design System Plataforma Unooria
 *
 * Baseado no Figma Node #25405:5873.
 * Suporta seleção única, posicionamento de controle flexível (boxSide: 'left' | 'right' | 'none'),
 * estados de hover com glow suave e padding de contêiner, focus visible com anel de 3px,
 * active, disabled com fundo/borda atenuados e error, além de suporte nativo aos temas Light e Dark.
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      value,
      checked: controlledChecked,
      defaultChecked,
      disabled: explicitDisabled,
      isDisabled: aliasDisabled,
      boxSide: explicitBoxSide,
      label,
      helperText,
      error: individualError,
      size: explicitSize,
      theme: explicitTheme,
      name: explicitName,
      id: explicitId,
      onChange,
      state: simulatedState,
      isHovered,
      isFocused,
      isActive,
      ariaLabel,
      className = '',
      style,
      children,
      required,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = explicitId || generatedId;

    // Integração com RadioGroupContext se presente
    const groupContext = useRadioGroup();

    // Resolução de propriedades herdadas do grupo ou explícitas
    const size: RadioButtonSize = explicitSize || groupContext?.size || 'md';
    const theme: RadioButtonTheme = explicitTheme || groupContext?.theme || 'light';
    const boxSide: RadioButtonBoxSide = explicitBoxSide || groupContext?.boxSide || 'left';
    const isDisabled = Boolean(explicitDisabled || aliasDisabled || groupContext?.disabled);
    const name = explicitName || groupContext?.name;
    const hasError = Boolean(individualError || (groupContext?.error && groupContext.value === undefined));

    const finalLabel = label || children;
    const hasVisibleText = boxSide !== 'none' && Boolean(finalLabel || helperText || individualError);
    const helperId = hasVisibleText && (helperText || individualError) ? `${inputId}-helper` : undefined;

    // Determinação do estado de seleção
    const isChecked =
      groupContext && groupContext.value !== undefined && value !== undefined
        ? String(groupContext.value) === String(value)
        : controlledChecked !== undefined
        ? controlledChecked
        : undefined;

    // Callback de mudança unificado
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;

        if (groupContext && groupContext.onChange && value !== undefined) {
          groupContext.onChange(value, event);
        }

        if (onChange) {
          onChange(event, event.target.checked);
        }
      },
      [isDisabled, groupContext, value, onChange]
    );

    // Estados visuais simulados (para documentação / Storybook)
    const isHover = isHovered || simulatedState === 'hover';
    const isFocus = isFocused || simulatedState === 'focus';
    const isAct = isActive || simulatedState === 'active';

    // Montagem das classes CSS
    const rootClasses = [
      'unooria-radio',
      `unooria-radio--size-${size}`,
      `unooria-radio--box-side-${boxSide}`,
      theme === 'dark' ? 'unooria-radio--dark' : '',
      isChecked ? 'unooria-radio--checked' : '',
      isDisabled ? 'unooria-radio--disabled' : '',
      hasError ? 'unooria-radio--error' : '',
      isHover ? 'unooria-radio--hover' : '',
      isFocus ? 'unooria-radio--focus' : '',
      isAct ? 'unooria-radio--active' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Resolução de acessibilidade para quando não houver texto visível
    const accessibleLabel =
      typeof finalLabel === 'string'
        ? finalLabel
        : ariaLabel || (value !== undefined ? String(value) : undefined);

    return (
      <label className={rootClasses} style={style} htmlFor={inputId}>
        <input
          {...restProps}
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value !== undefined ? String(value) : undefined}
          checked={isChecked}
          defaultChecked={isChecked === undefined ? defaultChecked : undefined}
          disabled={isDisabled}
          required={required}
          onChange={handleChange}
          aria-checked={isChecked}
          aria-disabled={isDisabled}
          aria-invalid={hasError}
          aria-describedby={helperId}
          aria-label={accessibleLabel}
          className="unooria-radio__input"
        />

        <span className="unooria-radio__control" aria-hidden="true">
          <span className="unooria-radio__dot" />
        </span>

        {hasVisibleText && (
          <div className="unooria-radio__text-group">
            {finalLabel && <span className="unooria-radio__label">{finalLabel}</span>}
            {(helperText || typeof individualError === 'string') && (
              <span id={helperId} className="unooria-radio__helper">
                {typeof individualError === 'string' ? individualError : helperText}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';

/**
 * Componente RadioGroup - Design System Plataforma Unooria
 *
 * Gerencia o estado de seleção única, acessibilidade com `<fieldset>` e `role="radiogroup"`,
 * suporta alinhamento vertical e horizontal, propagação de tamanho, tema e posicionamento boxSide,
 * e possibilita a navegação acessível por teclado via teclas de seta (ArrowUp, ArrowDown, ArrowLeft, ArrowRight).
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      options,
      children,
      value: controlledValue,
      defaultValue,
      onChange,
      direction = 'vertical',
      boxSide = 'left',
      label,
      helperText,
      error,
      disabled = false,
      name: explicitName,
      size = 'md',
      theme = 'light',
      required = false,
      id: explicitId,
      className = '',
      style,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const generatedGroupId = useId();
    const groupId = explicitId || generatedGroupId;
    const groupName = explicitName || `unooria-rg-${groupId}`;
    const helperId = helperText ? `${groupId}-helper` : undefined;
    const errorId = error ? `${groupId}-error` : undefined;
    const legendId = label ? `${groupId}-legend` : undefined;

    const groupContainerRef = useRef<HTMLDivElement | null>(null);

    // Estado interno para controle não-controlado
    const [uncontrolledValue, setUncontrolledValue] = useState<string | number | undefined>(
      defaultValue
    );

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    // Manipulador de mudança de valor
    const handleGroupChange = useCallback(
      (newValue: string | number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        if (onChange) {
          onChange(newValue, event);
        }
      },
      [isControlled, onChange]
    );

    // Suporte a navegação por teclado WAI-ARIA padrão para Radio Group
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLFieldSetElement>) => {
        if (onKeyDown) {
          onKeyDown(event);
        }

        const isNavKey = [
          'ArrowDown',
          'ArrowRight',
          'ArrowUp',
          'ArrowLeft',
        ].includes(event.key);

        if (!isNavKey || disabled || !groupContainerRef.current) {
          return;
        }

        const radioInputs = Array.from(
          groupContainerRef.current.querySelectorAll<HTMLInputElement>(
            'input[type="radio"]:not([disabled])'
          )
        );

        if (radioInputs.length === 0) return;

        const currentIndex = radioInputs.findIndex((input) => input.checked);
        let nextIndex = 0;

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          event.preventDefault();
          nextIndex = currentIndex >= 0 ? (currentIndex + 1) % radioInputs.length : 0;
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          event.preventDefault();
          nextIndex =
            currentIndex >= 0
              ? (currentIndex - 1 + radioInputs.length) % radioInputs.length
              : radioInputs.length - 1;
        }

        const targetRadio = radioInputs[nextIndex];
        if (targetRadio) {
          targetRadio.focus();
          targetRadio.click();
        }
      },
      [onKeyDown, disabled]
    );

    // Contexto provido para os botões filhos
    const contextValue: RadioGroupContextValue = {
      name: groupName,
      value: currentValue,
      onChange: handleGroupChange,
      size,
      theme,
      boxSide,
      disabled,
      error,
    };

    // Montagem das classes CSS do grupo
    const rootClasses = [
      'unooria-radio-group',
      `unooria-radio-group--${direction}`,
      theme === 'dark' ? 'unooria-radio-group--dark' : '',
      disabled ? 'unooria-radio-group--disabled' : '',
      error ? 'unooria-radio-group--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const ariaDescribedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <fieldset
          {...restProps}
          ref={ref}
          id={groupId}
          role="radiogroup"
          aria-labelledby={legendId}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-disabled={disabled}
          className={rootClasses}
          style={style}
          onKeyDown={handleKeyDown}
        >
          {label && (
            <legend id={legendId} className="unooria-radio-group__legend">
              {label}
              {required && (
                <span className="unooria-radio-group__required" aria-hidden="true">
                  *
                </span>
              )}
            </legend>
          )}

          <div ref={groupContainerRef} className="unooria-radio-group__options">
            {options?.map((option: RadioButtonOption) => (
              <RadioButton
                key={String(option.value)}
                id={option.id}
                value={option.value}
                label={option.label}
                helperText={option.helperText}
                disabled={option.disabled}
                error={option.error}
                boxSide={option.boxSide || boxSide}
                className={option.className}
              />
            ))}
            {children}
          </div>

          {(helperText || error) && (
            <div className="unooria-radio-group__footer">
              {error && (
                <span id={errorId} className="unooria-radio-group__error" role="alert">
                  <ErrorExclamationIcon />
                  {typeof error === 'string' ? error : 'Seleção obrigatória ou inválida'}
                </span>
              )}
              {helperText && (
                <span id={helperId} className="unooria-radio-group__helper">
                  {helperText}
                </span>
              )}
            </div>
          )}
        </fieldset>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
