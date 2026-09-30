'use client';

import React from 'react';
import { Icon } from '../Icon';
import { useControllableState } from '../../hooks';
import type { UglSegmentedControlProps } from './SegmentedControl.types';
import './SegmentedControl.css';

const ICON_SIZE = { sm: 'xs', md: 'sm' } as const;

/**
 * Componente SegmentedControl — Design System Unoogaleria
 *
 * Escolha única entre poucas opções de mesmo peso: "Anos | Meses | Todas",
 * "Fotos | Vídeos". Semântica de grupo de rádio (`radiogroup` + `radio` com
 * `aria-checked`) e foco móvel: só o segmento escolhido entra no Tab, e as setas,
 * Home e End movem o foco e a escolha juntos, como num grupo de rádio nativo.
 *
 * Todos os segmentos têm a mesma largura, o que deixa o indicador deslizar por
 * CSS puro, sem medir o DOM. A transição é desligada com movimento reduzido.
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, UglSegmentedControlProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      ariaLabel,
      size = 'md',
      variant = 'default',
      fullWidth = false,
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const [current, setCurrent] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? options[0]?.id ?? '',
      onChange,
    });
    const segmentRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const selectedIndex = options.findIndex((option) => option.id === current);
    const focusableIndex = selectedIndex >= 0 ? selectedIndex : 0;

    const choose = (index: number) => {
      const option = options[index];
      if (!option) return;
      setCurrent(option.id);
      segmentRefs.current[index]?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = options.length - 1;
      let next: number | null = null;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          next = index === last ? 0 : index + 1;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          next = index === 0 ? last : index - 1;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = last;
          break;
        default:
          return;
      }

      event.preventDefault();
      choose(next);
    };

    const classes = [
      'ugl-segmented',
      `ugl-segmented--${size}`,
      `ugl-segmented--${variant}`,
      fullWidth ? 'ugl-segmented--full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle = {
      '--ugl-segmented-count': Math.max(options.length, 1),
      '--ugl-segmented-index': Math.max(selectedIndex, 0),
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        data-ugl-theme={theme}
        className={classes}
        style={resolvedStyle}
        {...restProps}
      >
        {selectedIndex >= 0 && <span className="ugl-segmented__indicator" aria-hidden="true" />}

        {options.map((option, index) => {
          const checked = index === selectedIndex;

          return (
            <button
              key={option.id}
              ref={(node) => {
                segmentRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={index === focusableIndex ? 0 : -1}
              className={['ugl-segmented__option', checked ? 'ugl-segmented__option--checked' : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setCurrent(option.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {option.icon && <Icon name={option.icon} size={ICON_SIZE[size]} tone="inherit" />}
              <span className="ugl-segmented__label">{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
