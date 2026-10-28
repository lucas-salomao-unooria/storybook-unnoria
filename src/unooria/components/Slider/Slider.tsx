'use client';

import React from 'react';
import type { SliderProps } from './Slider.types';
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

/** `0` é conteúdo; `null`, `undefined`, `false` e `''` não. */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

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
 * Componente Slider — Plataforma Unooria
 *
 * Régua de um valor: `<input type="range">` nativo por cima, sem pintura (mas
 * com opacidade 1) e com caixa real de 44px de altura (alvo de toque, foco e o que um teste de
 * navegador encontra visível), e a trilha desenhada por baixo. A `origin`
 * escolhe de onde o preenchimento parte. Os rótulos das pontas (`minLabel`,
 * `maxLabel`) ficam visíveis abaixo da régua e descrevem o campo; o valor
 * atual sai no `aria-valuetext` (pelo `formatValue`) e, com `showValue`, ao
 * lado do rótulo.
 *
 * O teclado é tratado pelo próprio componente — setas, Page Up/Down, Home e
 * End —, como no `Slider` da Unoogaleria: o passo é o mesmo em qualquer
 * navegador, e `onChangeEnd` sai ao soltar a tecla, como sai ao soltar o
 * ponteiro.
 *
 * Client Component: guarda estado e ouve teclado e ponteiro.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
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
      showValue = true,
      minLabel,
      maxLabel,
      ticks,
      disabled = false,
      formatValue,
      name,
      theme = 'light',
      id,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = id ?? `unooria-slider-${reactId}`;
    const endsId = `${inputId}-pontas`;
    const originValue = clamp(origin ?? min, min, max);
    const decimals = decimalsOf(step);

    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<number>(() =>
      clamp(defaultValue ?? originValue, min, max)
    );
    const current = clamp(isControlled ? (value as number) : internal, min, max);

    /* Valor no início do gesto: `onChangeEnd` só sai se ele mudou. */
    const gestureStartRef = React.useRef<number | null>(null);
    /* Último valor pedido — o estado do React só chega na próxima renderização. */
    const latestRef = React.useRef(current);

    React.useEffect(() => {
      latestRef.current = current;
    }, [current]);

    const normalize = (raw: number) => {
      const snapped = Math.round((raw - min) / step) * step + min;
      return Number(clamp(snapped, min, max).toFixed(decimals));
    };

    const format = (input: number) => {
      if (formatValue) return formatValue(input);
      const text = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: decimals }).format(
        Math.abs(input)
      );
      if (originValue === min || input === originValue) return input < 0 ? `−${text}` : text;
      return input > originValue ? `+${text}` : `−${text}`;
    };

    const request = (next: number) => {
      const normalized = normalize(next);
      if (normalized === latestRef.current) return;
      latestRef.current = normalized;
      if (!isControlled) setInternal(normalized);
      onChange?.(normalized);
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

    const position = percentOf(current, min, max);
    const originPosition = percentOf(originValue, min, max);
    const fillStart = Math.min(position, originPosition);
    const fillSize = Math.abs(position - originPosition);
    const valueText = format(current);
    const hasEnds = temConteudo(minLabel) || temConteudo(maxLabel);

    const classes = [
      'unooria-slider',
      theme === 'dark' ? 'unooria-slider--theme-dark' : '',
      disabled ? 'unooria-slider--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cssVars = {
      '--unooria-slider-position': `${position}%`,
      '--unooria-slider-fill-start': `${fillStart}%`,
      '--unooria-slider-fill-size': `${fillSize}%`,
      ...style,
    } as React.CSSProperties;

    return (
      <div className={classes} style={cssVars} {...restProps}>
        <div className="unooria-slider__header">
          <label
            htmlFor={inputId}
            className={['unooria-slider__label', hideLabel ? 'unooria-slider__label--hidden' : '']
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </label>
          {showValue && (
            <span className="unooria-slider__value" aria-hidden="true">
              {valueText}
            </span>
          )}
        </div>

        <div className="unooria-slider__control">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="range"
            className="unooria-slider__input"
            min={min}
            max={max}
            step={step}
            value={current}
            disabled={disabled}
            aria-valuetext={valueText}
            aria-describedby={hasEnds ? endsId : undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPointerDown={beginGesture}
            onPointerUp={endGesture}
            onPointerCancel={endGesture}
            onBlur={endGesture}
          />
          <span className="unooria-slider__rail" aria-hidden="true">
            <span className="unooria-slider__fill" />
            {originValue !== min && (
              <span
                className="unooria-slider__origin"
                style={{ left: `${originPosition}%` } as React.CSSProperties}
              />
            )}
            {ticks?.map((tick) => (
              <span
                key={tick}
                className="unooria-slider__tick"
                style={{ left: `${percentOf(tick, min, max)}%` } as React.CSSProperties}
              />
            ))}
            <span className="unooria-slider__thumb" />
          </span>
        </div>

        {hasEnds && (
          <div id={endsId} className="unooria-slider__ends">
            <span className="unooria-slider__end unooria-slider__end--min">{minLabel}</span>
            <span className="unooria-slider__end unooria-slider__end--max">{maxLabel}</span>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
