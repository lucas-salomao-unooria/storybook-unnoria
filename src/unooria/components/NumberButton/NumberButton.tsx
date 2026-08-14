import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NumberButtonProps, NumberButtonSize } from './NumberButton.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import './NumberButton.css';

/**
 * Ícone vetorial SVG do botão de Decremento (-)
 */
const MinusIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 16,
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
    role="presentation"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Ícone vetorial SVG do botão de Incremento (+)
 */
const PlusIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 16,
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
    role="presentation"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Determina o tamanho do ícone em pixels com base no tamanho do componente
 */
const getIconDimension = (size: NumberButtonSize): number => {
  switch (size) {
    case 'lg':
      return 20;
    case 'sm':
      return 14;
    case 'xs':
      return 12;
    case 'md':
    default:
      return 16;
  }
};

/**
 * Calcula a precisão decimal necessária com base no step fornecido
 */
const getDecimalPrecision = (stepValue: number): number => {
  const stepString = stepValue.toString();
  if (stepString.indexOf('.') >= 0) {
    return stepString.split('.')[1].length;
  }
  return 0;
};

/**
 * Arredonda um número para a precisão informada evitando erros de ponto flutuante
 */
const roundToPrecision = (num: number, prec: number): number => {
  const factor = Math.pow(10, prec);
  return Math.round(num * factor) / factor;
};

/**
 * Limita o valor entre os limites mínimo e máximo
 */
const clampValue = (val: number, minVal: number, maxVal: number): number => {
  if (Number.isNaN(val)) return minVal;
  return Math.min(Math.max(val, minVal), maxVal);
};

/**
 * Componente NumberButton do Design System Plataforma Unooria (Padrão Ouro)
 * 
 * Stepper numérico de alta precisão com suporte a botões de incremento/decremento,
 * edição direta com máscara e validação, navegação acessível por teclado,
 * suporte a 4 tamanhos (LG, MD, SM, XS), 2 temas (Light e Dark) e conformidade
 * absoluta com as diretrizes do Figma (Nó #14662:399).
 */
export const NumberButton = React.forwardRef<HTMLInputElement, NumberButtonProps>(
  (
    {
      value,
      defaultValue = 0,
      min = -Infinity,
      max = Infinity,
      step = 1,
      onChange,
      disabled = false,
      isDisabled = false,
      readOnly = false,
      size = 'md',
      theme = 'light',
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
    // Resolução de desabilitação
    const disabledResolved = Boolean(disabled || isDisabled || state === 'disabled');

    // Modo controlado vs não controlado
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState<number>(() => {
      const initial = isControlled ? (value as number) : defaultValue;
      return clampValue(initial, min, max);
    });

    const activePrecision = precision !== undefined ? precision : getDecimalPrecision(step);
    const currentValue = isControlled ? (value as number) : innerValue;

    // Estado interno do texto exibido no input
    const formatDisplay = useCallback(
      (val: number): string => {
        if (formatValue) {
          return String(formatValue(val));
        }
        return activePrecision > 0 ? val.toFixed(activePrecision) : String(val);
      },
      [formatValue, activePrecision]
    );

    const [inputText, setInputText] = useState<string>(() => formatDisplay(currentValue));
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Sincroniza o texto do input quando o valor externo/interno muda (e não está focado)
    useEffect(() => {
      if (!isInputFocused) {
        setInputText(formatDisplay(currentValue));
      }
    }, [currentValue, isInputFocused, formatDisplay]);

    // Aplicação segura de novo valor numérico
    const handleValueChange = useCallback(
      (nextRawValue: number) => {
        if (disabledResolved || readOnly) return;

        const clamped = clampValue(nextRawValue, min, max);
        const rounded = roundToPrecision(clamped, activePrecision);

        if (!isControlled) {
          setInnerValue(rounded);
        }

        setInputText(formatDisplay(rounded));

        if (rounded !== currentValue && onChange) {
          onChange(rounded);
        }
      },
      [
        disabledResolved,
        readOnly,
        min,
        max,
        activePrecision,
        isControlled,
        currentValue,
        onChange,
        formatDisplay,
      ]
    );

    // Manipulação de decremento (-)
    const handleDecrement = (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      if (disabledResolved || readOnly || currentValue <= min) return;
      handleValueChange(currentValue - step);
    };

    // Manipulação de incremento (+)
    const handleIncrement = (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      if (disabledResolved || readOnly || currentValue >= max) return;
      handleValueChange(currentValue + step);
    };

    // Parser seguro de string para número
    const parseNumber = useCallback(
      (text: string): number => {
        if (parseValue) {
          return parseValue(text);
        }
        // Trata vírgulas decimais e caracteres monetários
        const cleaned = text.replace(',', '.').replace(/[^0-9.-]/g, '');
        const parsed = parseFloat(cleaned);
        return Number.isNaN(parsed) ? currentValue : parsed;
      },
      [parseValue, currentValue]
    );

    // Eventos do input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabledResolved || readOnly || !allowInput) return;
      setInputText(e.target.value);
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsInputFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsInputFocused(false);
      const parsed = parseNumber(inputText);
      handleValueChange(parsed);
      if (onBlur) onBlur(e);
    };

    // Acessibilidade por Teclado (SpinButton / WAI-ARIA)
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabledResolved || readOnly) return;

      if (onKeyDown) onKeyDown(e);

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleIncrement();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleDecrement();
          break;
        case 'PageUp':
          e.preventDefault();
          handleValueChange(currentValue + step * 10);
          break;
        case 'PageDown':
          e.preventDefault();
          handleValueChange(currentValue - step * 10);
          break;
        case 'Home':
          if (min !== -Infinity && !Number.isNaN(min)) {
            e.preventDefault();
            handleValueChange(min);
          }
          break;
        case 'End':
          if (max !== Infinity && !Number.isNaN(max)) {
            e.preventDefault();
            handleValueChange(max);
          }
          break;
        case 'Enter':
          e.preventDefault();
          handleValueChange(parseNumber(inputText));
          if (inputRef.current) {
            inputRef.current.blur();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setInputText(formatDisplay(currentValue));
          if (inputRef.current) {
            inputRef.current.blur();
          }
          break;
        default:
          break;
      }
    };

    const isDecrementDisabled = disabledResolved || readOnly || currentValue <= min;
    const isIncrementDisabled = disabledResolved || readOnly || currentValue >= max;
    const iconDimension = getIconDimension(size);

    const isFocusedResolved = isInputFocused || isFocused || state === 'focus';
    const isHoveredResolved = isHovered || state === 'hover';
    const isActiveResolved = isActive || state === 'active';

    const containerClasses = [
      'unooria-number-button',
      `unooria-number-button--size-${size}`,
      `unooria-number-button--${theme}`,
      disabledResolved ? 'unooria-number-button--disabled' : '',
      readOnly ? 'unooria-number-button--readonly' : '',
      isFocusedResolved ? 'unooria-number-button--focused' : '',
      isHoveredResolved ? 'unooria-number-button--state-hover' : '',
      isActiveResolved ? 'unooria-number-button--state-active' : '',
      state !== 'default' ? `unooria-number-button--state-${state}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className={containerClasses}
        data-theme={theme}
        data-size={size}
        data-state={state}
        style={style}
        aria-disabled={disabledResolved}
        aria-readonly={readOnly}
      >
        {/* Botão de Decremento (-) */}
        <button
          type="button"
          tabIndex={-1}
          disabled={isDecrementDisabled}
          aria-disabled={isDecrementDisabled}
          aria-label={ariaLabelDecrement}
          className="unooria-number-button__action-btn unooria-number-button__action-btn--decrement"
          onClick={handleDecrement}
        >
          <MinusIcon sizePx={iconDimension} />
        </button>

        {/* Área Central: Afixo Prefixo + Input / Display + Afixo Sufixo */}
        <div className="unooria-number-button__center">
          {prefix && (
            <span className="unooria-number-button__affix unooria-number-button__affix--prefix">
              {prefix}
            </span>
          )}

          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
              }
            }}
            id={id}
            name={name}
            type="text"
            inputMode="decimal"
            role="spinbutton"
            aria-valuenow={currentValue}
            aria-valuemin={min !== -Infinity ? min : undefined}
            aria-valuemax={max !== Infinity ? max : undefined}
            aria-label={ariaLabel}
            aria-disabled={disabledResolved}
            aria-readonly={readOnly || !allowInput}
            readOnly={readOnly || !allowInput}
            disabled={disabledResolved}
            autoFocus={autoFocus}
            value={inputText}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="unooria-number-button__input"
            {...restProps}
          />

          {suffix && (
            <span className="unooria-number-button__affix unooria-number-button__affix--suffix">
              {suffix}
            </span>
          )}
        </div>

        {/* Botão de Incremento (+) */}
        <button
          type="button"
          tabIndex={-1}
          disabled={isIncrementDisabled}
          aria-disabled={isIncrementDisabled}
          aria-label={ariaLabelIncrement}
          className="unooria-number-button__action-btn unooria-number-button__action-btn--increment"
          onClick={handleIncrement}
        >
          <PlusIcon sizePx={iconDimension} />
        </button>
      </div>
    );
  }
);

NumberButton.displayName = 'NumberButton';
