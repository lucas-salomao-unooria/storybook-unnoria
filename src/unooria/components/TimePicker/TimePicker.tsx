import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { TimePickerProps } from './TimePicker.types';
import { Icon } from '../Icon/Icon';
import './TimePicker.css';

/**
 * Função utilitária para preencher com zero à esquerda (ex: 7 -> "07")
 */
const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

/**
 * Componente oficial TimePicker (Seletor de Horário / Relógio) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 18753:5458 / Component Set 18753:2716)
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      showSeconds = false,
      format = '24h',
      minuteStep = 1,
      secondStep = 1,
      size = 'md',
      label,
      required = false,
      helperText,
      helperIcon,
      error,
      disabled = false,
      clearable = false,
      fullWidth = false,
      placeholder,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<string>(
      value !== undefined ? value : defaultValue || ''
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const hoursColRef = useRef<HTMLDivElement>(null);
    const minutesColRef = useRef<HTMLDivElement>(null);
    const secondsColRef = useRef<HTMLDivElement>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : undefined;

    // Extrair partes do horário atual
    const [selectedHour, selectedMinute, selectedSecond] = (() => {
      if (!currentValue) return ['', '', ''];
      const parts = currentValue.split(':');
      return [parts[0] || '00', parts[1] || '00', parts[2] || '00'];
    })();

    // Listas numéricas
    const hours = Array.from({ length: 24 }, (_, i) => padZero(i));
    const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) =>
      padZero(i * minuteStep)
    );
    const seconds = Array.from({ length: Math.ceil(60 / secondStep) }, (_, i) =>
      padZero(i * secondStep)
    );

    // Fechar ao clicar fora ou via tecla ESC
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);

    // Rolar colunas para o item selecionado ao abrir
    useEffect(() => {
      if (isOpen) {
        const scrollToItem = (colEl: HTMLDivElement | null, itemValue: string) => {
          if (!colEl || !itemValue) return;
          const target = Array.from(colEl.children).find(
            (child) => child.textContent === itemValue
          ) as HTMLElement;
          if (target) {
            colEl.scrollTop = target.offsetTop - colEl.offsetTop - 40;
          }
        };

        scrollToItem(hoursColRef.current, selectedHour);
        scrollToItem(minutesColRef.current, selectedMinute);
        if (showSeconds) {
          scrollToItem(secondsColRef.current, selectedSecond);
        }
      }
    }, [isOpen, selectedHour, selectedMinute, selectedSecond, showSeconds]);

    const handleSelect = (hour: string, min: string, sec: string) => {
      const formatted = showSeconds ? `${hour}:${min}:${sec}` : `${hour}:${min}`;
      if (!isControlled) {
        setInternalValue(formatted);
      }
      onChange?.(formatted);
    };

    const handleHourClick = (h: string) => {
      const min = selectedMinute || '00';
      const sec = selectedSecond || '00';
      handleSelect(h, min, sec);
    };

    const handleMinuteClick = (m: string) => {
      const h = selectedHour || '00';
      const sec = selectedSecond || '00';
      handleSelect(h, m, sec);
    };

    const handleSecondClick = (s: string) => {
      const h = selectedHour || '00';
      const min = selectedMinute || '00';
      handleSelect(h, min, s);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setInternalValue('');
      }
      onChange?.('');
    };

    const defaultPlaceholder = showSeconds ? '00:00:00' : '00:00';
    const displayPlaceholder = placeholder || defaultPlaceholder;

    const sizeClass = `unooria-timepicker--size-${size}`;
    const errorClass = hasError ? 'unooria-timepicker--error' : '';
    const disabledClass = disabled ? 'unooria-timepicker--disabled' : '';
    const openClass = isOpen ? 'unooria-timepicker--open' : '';
    const fullWidthClass = fullWidth ? 'unooria-timepicker--full-width' : '';
    const themeClass = theme === 'dark' ? 'unooria-timepicker--theme-dark' : '';

    const containerClassName = [
      'unooria-timepicker',
      sizeClass,
      errorClass,
      disabledClass,
      openClass,
      fullWidthClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={containerRef} className={containerClassName} style={style} {...rest}>
        {label && (
          <div className="unooria-timepicker__label-row">
            <label className="unooria-timepicker__label">
              <span>{label}</span>
              {required && <span className="unooria-timepicker__required">*</span>}
              {helperIcon && (
                <span className="unooria-timepicker__helper-icon" title="Mais informações">
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

        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-disabled={disabled || undefined}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className="unooria-timepicker__trigger"
        >
          {currentValue ? (
            <span className="unooria-timepicker__value">{currentValue}</span>
          ) : (
            <span className="unooria-timepicker__placeholder">{displayPlaceholder}</span>
          )}

          <div className="unooria-timepicker__actions">
            {clearable && currentValue && !disabled && (
              <button
                type="button"
                aria-label="Limpar horário"
                onClick={handleClear}
                className="unooria-timepicker__clear-btn"
              >
                <Icon name="close" size="xs" color="currentColor" />
              </button>
            )}

            <span className="unooria-timepicker__clock-icon">
              <Icon name="schedule" size={size === 'xs' ? 'xs' : 's'} color="currentColor" />
            </span>
          </div>
        </div>

        {isOpen && (
          <div className="unooria-timepicker__popover" role="dialog" aria-label="Seletor de horário">
            {/* Coluna de Horas */}
            <div className="unooria-timepicker__column-wrapper">
              <span className="unooria-timepicker__column-header">Hora</span>
              <div ref={hoursColRef} className="unooria-timepicker__column">
                {hours.map((h) => {
                  const isSelected = selectedHour === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleHourClick(h)}
                      className={`unooria-timepicker__cell ${
                        isSelected ? 'unooria-timepicker__cell--selected' : ''
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="unooria-timepicker__divider" />

            {/* Coluna de Minutos */}
            <div className="unooria-timepicker__column-wrapper">
              <span className="unooria-timepicker__column-header">Min</span>
              <div ref={minutesColRef} className="unooria-timepicker__column">
                {minutes.map((m) => {
                  const isSelected = selectedMinute === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleMinuteClick(m)}
                      className={`unooria-timepicker__cell ${
                        isSelected ? 'unooria-timepicker__cell--selected' : ''
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coluna de Segundos (Opcional) */}
            {showSeconds && (
              <>
                <div className="unooria-timepicker__divider" />
                <div className="unooria-timepicker__column-wrapper">
                  <span className="unooria-timepicker__column-header">Seg</span>
                  <div ref={secondsColRef} className="unooria-timepicker__column">
                    {seconds.map((s) => {
                      const isSelected = selectedSecond === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSecondClick(s)}
                          className={`unooria-timepicker__cell ${
                            isSelected ? 'unooria-timepicker__cell--selected' : ''
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {hasError && errorMessage && (
          <p className="unooria-timepicker__error-text" role="alert">
            {errorMessage}
          </p>
        )}

        {!hasError && helperText && (
          <p className="unooria-timepicker__helper-text">{helperText}</p>
        )}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
