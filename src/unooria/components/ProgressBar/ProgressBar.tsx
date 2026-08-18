import React, { forwardRef } from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import './ProgressBar.css';

/**
 * Componente oficial de Barra de Progresso do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 18644:1049 / 18641:699)
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      min = 0,
      label,
      showValue = true,
      valuePosition = 'top',
      valueFormatter,
      variant = 'brand',
      autoStatus = false,
      size = 'sm',
      indeterminate = false,
      striped = false,
      animated = false,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    // Cálculo do percentual clamped entre 0 e 100
    const clampedValue = Math.max(min, Math.min(value, max));
    const range = max - min;
    const percentage = range > 0 ? ((clampedValue - min) / range) * 100 : 0;
    const roundedPercentage = Math.round(percentage);

    // Ajuste automático para success se completado
    const isCompleted = clampedValue >= max;
    const activeVariant = autoStatus && isCompleted ? 'success' : variant;

    // Formatação do texto de valor
    const formattedValue = valueFormatter
      ? valueFormatter(clampedValue, max, roundedPercentage)
      : `${roundedPercentage}%`;

    const isDark = theme === 'dark';
    const isTopPosition = valuePosition === 'top';
    const isInlinePosition = valuePosition === 'inline';
    const isBottomPosition = valuePosition === 'bottom';
    const shouldRenderValue = showValue && !indeterminate && valuePosition !== 'none';

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={typeof formattedValue === 'string' ? formattedValue : `${roundedPercentage}%`}
        aria-label={typeof label === 'string' ? label : 'Progresso'}
        className={`unooria-progressbar unooria-progressbar--variant-${activeVariant} unooria-progressbar--size-${size} ${
          isDark ? 'unooria-progressbar--theme-dark' : ''
        } ${striped ? 'unooria-progressbar--striped' : ''} ${
          animated ? 'unooria-progressbar--animated' : ''
        } ${indeterminate ? 'unooria-progressbar--indeterminate' : ''} ${className}`.trim()}
        style={style}
        {...rest}
      >
        {/* Variante 1: Top Labels (Título à esquerda e % à direita) */}
        {isTopPosition && (label || shouldRenderValue) && (
          <div className="unooria-progressbar__header">
            {label && <span className="unooria-progressbar__label">{label}</span>}
            {shouldRenderValue && (
              <span className="unooria-progressbar__value unooria-progressbar__value--top">
                {formattedValue}
              </span>
            )}
          </div>
        )}

        {/* Título isolado no topo para Variante Inline ou Bottom */}
        {(isInlinePosition || isBottomPosition) && label && (
          <span className="unooria-progressbar__label">{label}</span>
        )}

        {/* Trilho e preenchimento */}
        {isInlinePosition ? (
          <div className="unooria-progressbar__inline-row">
            <div className="unooria-progressbar__track">
              <div
                className="unooria-progressbar__fill"
                style={{ width: indeterminate ? undefined : `${percentage}%` }}
              />
            </div>
            {shouldRenderValue && (
              <span className="unooria-progressbar__value unooria-progressbar__value--inline">
                {formattedValue}
              </span>
            )}
          </div>
        ) : (
          <div className="unooria-progressbar__track">
            <div
              className="unooria-progressbar__fill"
              style={{ width: indeterminate ? undefined : `${percentage}%` }}
            />
          </div>
        )}

        {/* Valor abaixo da barra (Bottom Position) */}
        {isBottomPosition && shouldRenderValue && (
          <span className="unooria-progressbar__value unooria-progressbar__value--bottom">
            {formattedValue}
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
