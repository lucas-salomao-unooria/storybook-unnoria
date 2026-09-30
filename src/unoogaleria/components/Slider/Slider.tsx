'use client';

import React from 'react';
import { useControllableState } from '../../hooks';
import type { UglSliderProps } from './Slider.types';
import './Slider.css';

/** Casas decimais de um passo (1 → 0, 0,5 → 1, 0,25 → 2). */
const decimalsOf = (step: number) => {
  const [, fraction = ''] = String(step).split('.');
  return fraction.length;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Posição de um valor na trilha, em porcentagem. */
const percentOf = (value: number, min: number, max: number) =>
  max === min ? 0 : ((clamp(value, min, max) - min) / (max - min)) * 100;

/** Teclas que mudam o valor e encerram um passo ao serem soltas. */
const VALUE_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
]);

/**
 * Componente Slider — Design System Unoogaleria
 *
 * Deslizador de um valor, com `<input type="range">` nativo por baixo e a trilha
 * desenhada por cima. A `origin` escolhe de onde o preenchimento parte: no
 * mínimo, ele cresce da esquerda (intensidade, vinheta); em 0 numa faixa de
 * -100 a 100, cresce a partir do centro para os dois lados (brilho, contraste,
 * endireitar). O duplo clique volta à origem.
 *
 * O teclado é tratado pelo próprio componente — setas, Page Up/Down, Home e End
 * —, e não pela ação padrão do navegador: assim o passo é o mesmo em qualquer
 * navegador, e `onChangeEnd` sai ao soltar a tecla, como sai ao soltar o
 * ponteiro. É o que permite ao editor gravar um passo de histórico por gesto, e
 * não um por pixel.
 *
 * Client Component: guarda estado e ouve teclado e ponteiro.
 */
export const Slider = React.forwardRef<HTMLInputElement, UglSliderProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onChangeEnd,
      min = 0,
      max = 100,
      step = 1,
      origin,
      label,
      hideLabel = false,
      showValue = false,
      variant = 'default',
      ticks,
      disabled = false,
      formatValue,
      name,
      theme,
      id,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `ugl-slider-${generatedId}`;
    const originValue = clamp(origin ?? min, min, max);
    const decimals = decimalsOf(step);

    const [current, setCurrent] = useControllableState<number>({
      value,
      defaultValue: clamp(defaultValue ?? originValue, min, max),
      onChange,
    });

    /* Valor no início do gesto: `onChangeEnd` só sai se ele mudou. */
    const gestureStartRef = React.useRef<number | null>(null);
    /* Último valor pedido — o estado do React só chega na próxima renderização. */
    const latestRef = React.useRef(current);

    React.useEffect(() => {
      latestRef.current = current;
    }, [current]);

    const normalize = React.useCallback(
      (raw: number) => {
        const snapped = Math.round((raw - min) / step) * step + min;
        return Number(clamp(snapped, min, max).toFixed(decimals));
      },
      [min, max, step, decimals]
    );

    const format = React.useCallback(
      (input: number) => {
        if (formatValue) return formatValue(input);
        const text = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: decimals }).format(
          Math.abs(input)
        );
        if (originValue === min || input === originValue) return input < 0 ? `−${text}` : text;
        return input > originValue ? `+${text}` : `−${text}`;
      },
      [formatValue, decimals, originValue, min]
    );

    const request = (next: number) => {
      const normalized = normalize(next);
      latestRef.current = normalized;
      setCurrent(normalized);
      return normalized;
    };

    const beginGesture = () => {
      if (gestureStartRef.current === null) gestureStartRef.current = latestRef.current;
    };

    const endGesture = () => {
      const start = gestureStartRef.current;
      gestureStartRef.current = null;
      if (start !== null && start !== latestRef.current) onChangeEnd?.(latestRef.current);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || !VALUE_KEYS.has(event.key)) return;
      event.preventDefault();
      beginGesture();
      const page = Math.max(step, (max - min) / 10);
      const base = latestRef.current;
      const next =
        event.key === 'ArrowRight' || event.key === 'ArrowUp'
          ? base + step
          : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
            ? base - step
            : event.key === 'PageUp'
              ? base + page
              : event.key === 'PageDown'
                ? base - page
                : event.key === 'Home'
                  ? min
                  : max;
      request(next);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (VALUE_KEYS.has(event.key)) endGesture();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      beginGesture();
      request(Number(event.target.value));
    };

    const handleDoubleClick = () => {
      if (disabled) return;
      const start = latestRef.current;
      gestureStartRef.current = null;
      const next = request(originValue);
      if (next !== start) onChangeEnd?.(next);
    };

    const position = percentOf(current, min, max);
    const originPosition = percentOf(originValue, min, max);
    const fillStart = Math.min(position, originPosition);
    const fillSize = Math.abs(position - originPosition);
    const valueText = format(current);

    const classes = [
      'ugl-slider',
      `ugl-slider--${variant}`,
      disabled ? 'ugl-slider--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cssVars = {
      '--ugl-slider-position': `${position}%`,
      '--ugl-slider-fill-start': `${fillStart}%`,
      '--ugl-slider-fill-size': `${fillSize}%`,
      ...style,
    } as React.CSSProperties;

    return (
      <div data-ugl-theme={theme} className={classes} style={cssVars} {...restProps}>
        {(!hideLabel || showValue) && (
          <div className="ugl-slider__header">
            <label
              htmlFor={inputId}
              className={['ugl-slider__label', hideLabel ? 'ugl-slider__label--hidden' : '']
                .filter(Boolean)
                .join(' ')}
            >
              {label}
            </label>
            {showValue && (
              <span className="ugl-slider__value" aria-hidden="true">
                {valueText}
              </span>
            )}
          </div>
        )}

        <div className="ugl-slider__control" onDoubleClick={handleDoubleClick}>
          {hideLabel && !showValue && (
            <label htmlFor={inputId} className="ugl-slider__label ugl-slider__label--hidden">
              {label}
            </label>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="range"
            className="ugl-slider__input"
            min={min}
            max={max}
            step={step}
            value={current}
            disabled={disabled}
            aria-valuetext={valueText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPointerDown={beginGesture}
            onPointerUp={endGesture}
            onPointerCancel={endGesture}
            onBlur={endGesture}
          />
          <span className="ugl-slider__rail" aria-hidden="true">
            <span className="ugl-slider__fill" />
            {originValue !== min && (
              <span
                className="ugl-slider__origin"
                style={{ left: `${originPosition}%` } as React.CSSProperties}
              />
            )}
            {ticks?.map((tick) => (
              <span
                key={tick}
                className="ugl-slider__tick"
                style={{ left: `${percentOf(tick, min, max)}%` } as React.CSSProperties}
              />
            ))}
            <span className="ugl-slider__thumb" />
          </span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
