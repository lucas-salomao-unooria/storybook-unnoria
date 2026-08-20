'use client';

import React, { useState, useRef, useCallback } from 'react';
import { NumberButtonProps, NumberButtonSize } from './NumberButton.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import './NumberButton.css';

/**
 * Ícone vetorial SVG do botão de Decremento / Remove (-)
 */
const RemoveIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 18,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-number-button__icon ${className}`.trim()}
    aria-hidden="true"
  >
    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Ícone vetorial SVG do botão de Incremento / Add (+)
 */
const AddIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 18,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-number-button__icon ${className}`.trim()}
    aria-hidden="true"
  >
    <line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Dimensão do ícone em pixels conforme o tamanho
 */
const getIconDimension = (size: NumberButtonSize): number => {
  switch (size) {
    case 'lg':
      return 18;
    case 'md':
      return 18;
    case 'sm':
      return 16;
    case 'xs':
      return 14;
    default:
      return 18;
  }
};

/**
 * Normaliza o tamanho aceitando maiúsculas e minúsculas
 */
const normalizeSize = (size?: string): NumberButtonSize => {
  const lower = (size || 'md').toLowerCase();
  if (lower === 'xs' || lower === 'sm' || lower === 'md' || lower === 'lg') {
    return lower as NumberButtonSize;
  }
  return 'md';
};

/**
 * Arredonda um número para a precisão informada evitando erros de ponto flutuante
 */
const roundToPrecision = (num: number, prec: number): number => {
  const factor = Math.pow(10, prec);
  return Math.round(num * factor) / factor;
};

/**
 * Componente NumberButton - Design System Unooria
 *
 * Implementação fiel ao Figma (Node #14662:399 / Component Set #14662:31020).
 * Stepper numérico com botões de incremento/decremento com raio de 4px e valor central.
 */
export const NumberButton = React.forwardRef<HTMLDivElement, NumberButtonProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = -Infinity,
      max = Infinity,
      step = 1,
      onChange,
      disabled = false,
      isDisabled,
      readOnly = false,
      size,
      tamanho,
      theme = 'light',
      padLength,
      formatValue,
      parseValue,
      allowInput = true,
      prefix,
      suffix,
      precision,
      name,
      id,
      ariaLabel = 'Controle de valor numérico',
      ariaLabelDecrement = 'Diminuir valor',
      ariaLabelIncrement = 'Aumentar valor',
      state = 'default',
      isHovered = false,
      isActive = false,
      isFocused = false,
      autoFocus = false,
      onFocus,
      onBlur,
      onKeyDown,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    // Estado usado apenas no modo não controlado; no modo controlado o valor é
    // derivado diretamente da prop durante a renderização.
    const [uncontrolledValue, setUncontrolledValue] = useState<number>(defaultValue);
    const internalValue = isControlled ? controlledValue : uncontrolledValue;
    const [inputValue, setInputValue] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isComponentDisabled = Boolean(disabled || isDisabled || state === 'disable' || state === 'disabled');
    const effectiveSize = normalizeSize(tamanho || size);

    const calculatePrecision = useCallback(() => {
      if (precision !== undefined) return precision;
      const stepStr = step.toString();
      return stepStr.indexOf('.') >= 0 ? stepStr.split('.')[1].length : 0;
    }, [precision, step]);

    const clamp = useCallback(
      (val: number): number => {
        const clamped = Math.max(min, Math.min(max, val));
        const prec = calculatePrecision();
        return roundToPrecision(clamped, prec);
      },
      [min, max, calculatePrecision]
    );

    const formatDisplay = useCallback(
      (num: number): string => {
        if (formatValue) {
          return String(formatValue(num));
        }
        if (padLength !== undefined && padLength > 0) {
          const isNegative = num < 0;
          const absStr = Math.abs(num).toString();
          const padded = absStr.padStart(padLength, '0');
          return isNegative ? `-${padded}` : padded;
        }
        const prec = calculatePrecision();
        return prec > 0 ? num.toFixed(prec) : num.toString();
      },
      [formatValue, padLength, calculatePrecision]
    );

    const updateValue = useCallback(
      (newValue: number) => {
        const clampedValue = clamp(newValue);
        if (!isControlled) {
          setUncontrolledValue(clampedValue);
        }
        if (onChange && clampedValue !== internalValue) {
          onChange(clampedValue);
        }
      },
      [clamp, isControlled, internalValue, onChange]
    );

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isComponentDisabled || readOnly) return;
      updateValue(internalValue - step);
    };

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isComponentDisabled || readOnly) return;
      updateValue(internalValue + step);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsEditing(true);
      setInputValue(internalValue.toString());
      if (onFocus) onFocus(e);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsEditing(false);
      let parsed: number;
      if (parseValue) {
        parsed = parseValue(inputValue);
      } else {
        parsed = parseFloat(inputValue.replace(',', '.'));
      }
      if (isNaN(parsed)) {
        updateValue(internalValue);
      } else {
        updateValue(parsed);
      }
      if (onBlur) onBlur(e);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateValue(internalValue + step);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateValue(internalValue - step);
      } else if (e.key === 'Enter') {
        inputRef.current?.blur();
      }
      if (onKeyDown) onKeyDown(e);
    };

    const isMinReached = internalValue <= min;
    const isMaxReached = internalValue >= max;
    const iconDimension = getIconDimension(effectiveSize);

    const rootClasses = [
      'unooria-number-button',
      `unooria-number-button--size-${effectiveSize}`,
      `unooria-number-button--theme-${theme}`,
      `unooria-number-button--state-${state}`,
      isComponentDisabled ? 'unooria-number-button--disabled' : '',
      isHovered || state === 'hover' ? 'unooria-number-button--hovered' : '',
      isActive || state === 'active' ? 'unooria-number-button--active' : '',
      isFocused || state === 'focus' ? 'unooria-number-button--focused' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={rootClasses}
        style={style}
        role="group"
        aria-label={ariaLabel}
        data-theme={theme}
        {...restProps}
      >
        {/* Botão de Decremento / Remove (-) */}
        <button
          type="button"
          tabIndex={-1}
          className="unooria-number-button__action-btn unooria-number-button__action-btn--remove"
          onClick={handleDecrement}
          disabled={isComponentDisabled || readOnly || isMinReached}
          aria-label={ariaLabelDecrement}
        >
          <RemoveIcon sizePx={iconDimension} />
        </button>

        {/* Display Numérico Central / Campo Editável */}
        <div className="unooria-number-button__value-wrapper">
          {prefix && <span className="unooria-number-button__prefix">{prefix}</span>}

          {allowInput && !readOnly && !isComponentDisabled ? (
            <input
              ref={inputRef}
              id={id}
              name={name}
              type="text"
              inputMode="numeric"
              autoFocus={autoFocus}
              disabled={isComponentDisabled}
              readOnly={readOnly}
              className="unooria-number-button__input"
              value={isEditing ? inputValue : formatDisplay(internalValue)}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              role="spinbutton"
              aria-valuenow={internalValue}
              aria-valuemin={min !== -Infinity ? min : undefined}
              aria-valuemax={max !== Infinity ? max : undefined}
              aria-label={ariaLabel}
              size={Math.max(2, formatDisplay(internalValue).length)}
            />
          ) : (
            <span
              className="unooria-number-button__display"
              role="spinbutton"
              aria-valuenow={internalValue}
              aria-valuemin={min !== -Infinity ? min : undefined}
              aria-valuemax={max !== Infinity ? max : undefined}
              aria-label={ariaLabel}
            >
              {formatDisplay(internalValue)}
            </span>
          )}

          {suffix && <span className="unooria-number-button__suffix">{suffix}</span>}
        </div>

        {/* Botão de Incremento / Add (+) */}
        <button
          type="button"
          tabIndex={-1}
          className="unooria-number-button__action-btn unooria-number-button__action-btn--add"
          onClick={handleIncrement}
          disabled={isComponentDisabled || readOnly || isMaxReached}
          aria-label={ariaLabelIncrement}
        >
          <AddIcon sizePx={iconDimension} />
        </button>
      </div>
    );
  }
);

NumberButton.displayName = 'NumberButton';
