'use client';

import React from 'react';
import {
  uglDefaultEdit,
  uglEditToFilter,
  uglEditToTransform,
  uglFilters,
  uglVignetteOpacity,
} from '../../media';
import type { UglFilterId } from '../../media';
import type { UglFilterPickerProps } from './FilterPicker.types';
import './FilterPicker.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Componente FilterPicker — Design System Unoogaleria
 *
 * Tira horizontal dos filtros predefinidos (`uglFilters`), cada um numa amostra
 * quadrada de 64px da própria foto, com o filtro aplicado por `uglFilterToCss`
 * e os ajustes finos da edição em curso. É um grupo de opções exclusivas:
 * `role="radiogroup"` com `role="radio"`, foco móvel (um só item na ordem de
 * Tab) e setas que movem e escolhem ao mesmo tempo, como num grupo de rádios
 * nativo. A amostra escolhida é centralizada na tira.
 *
 * Vive sobre a superfície imersiva do editor: as cores são as invariantes.
 *
 * Client Component: move o foco e rola a tira.
 */
export const FilterPicker = React.forwardRef<HTMLDivElement, UglFilterPickerProps>(
  (
    {
      src,
      alt,
      value,
      onChange,
      intensity = 100,
      edit,
      ariaLabel = 'Filtros',
      theme,
      className = '',
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const stripRef = React.useRef<HTMLDivElement | null>(null);
    const firstScrollRef = React.useRef(true);
    const descriptionId = `ugl-filter-picker-${React.useId()}`;

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        stripRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    /* Centraliza a amostra escolhida, rolando só a tira (nunca a página). */
    React.useEffect(() => {
      const strip = stripRef.current;
      const option = strip?.querySelector<HTMLElement>(`[data-ugl-filter="${value}"]`);
      if (!strip || !option) return;
      const left = option.offsetLeft - (strip.clientWidth - option.offsetWidth) / 2;
      const smooth = !firstScrollRef.current && !prefersReducedMotion();
      firstScrollRef.current = false;
      if (typeof strip.scrollTo === 'function') {
        strip.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
      } else {
        strip.scrollLeft = Math.max(0, left);
      }
    }, [value]);

    const select = (id: UglFilterId, focus: boolean) => {
      if (id !== value) onChange(id);
      if (focus) {
        stripRef.current?.querySelector<HTMLElement>(`[data-ugl-filter="${id}"]`)?.focus();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      const index = Math.max(
        0,
        uglFilters.findIndex((filter) => filter.id === value)
      );
      const last = uglFilters.length - 1;
      const next =
        event.key === 'ArrowRight' || event.key === 'ArrowDown'
          ? index === last
            ? 0
            : index + 1
          : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
            ? index === 0
              ? last
              : index - 1
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? last
                : null;
      if (next === null) return;
      event.preventDefault();
      select(uglFilters[next].id, true);
    };

    const base = edit ?? uglDefaultEdit;
    const transform = uglEditToTransform(base, 1);
    const vignette = uglVignetteOpacity(base);

    const classes = ['ugl-filter-picker', className].filter(Boolean).join(' ');

    return (
      <div
        ref={setRefs}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-describedby={descriptionId}
        data-ugl-theme={theme}
        className={classes}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        <span id={descriptionId} className="ugl-filter-picker__description">
          {`Amostras de: ${alt}`}
        </span>
        {uglFilters.map((filter) => {
          const checked = filter.id === value;
          const filterCss = uglEditToFilter({
            ...base,
            filter: filter.id,
            filterIntensity: checked ? intensity : 100,
          });
          return (
            <button
              key={filter.id}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              data-ugl-filter={filter.id}
              className={[
                'ugl-filter-picker__option',
                checked ? 'ugl-filter-picker__option--checked' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => select(filter.id, false)}
            >
              <span className="ugl-filter-picker__swatch" aria-hidden="true">
                <img
                  className="ugl-filter-picker__image"
                  src={src}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  style={{
                    filter: filterCss,
                    transform: transform === 'none' ? undefined : transform,
                  }}
                />
                {vignette > 0 && (
                  <span className="ugl-filter-picker__vignette" style={{ opacity: vignette }} />
                )}
              </span>
              <span className="ugl-filter-picker__label">{filter.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

FilterPicker.displayName = 'FilterPicker';
