'use client';

import React from 'react';
import { Icon } from '../Icon';
import { useControllableState } from '../../hooks';
import type { UblSegmentedControlProps } from './SegmentedControl.types';
import './SegmentedControl.css';

const ICON_SIZE = { sm: 'xs', md: 'sm' } as const;

/**
 * Componente SegmentedControl — Design System Unooblog
 *
 * Escolha única entre poucas opções de mesmo peso: "Recentes | Populares",
 * "Texto pequeno | Médio | Grande". Semântica de grupo de rádio (`radiogroup` +
 * `radio` com `aria-checked`) e foco móvel: só o segmento escolhido entra no Tab,
 * e as setas ←/→ (e ↑/↓), Home e End movem o foco e a escolha juntos, como num
 * grupo de rádio nativo.
 *
 * Todos os segmentos têm a mesma largura, o que deixa o indicador deslizar por
 * CSS puro, sem medir o DOM. A transição é desligada com movimento reduzido.
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, UblSegmentedControlProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      ariaLabel,
      size = 'md',
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
      defaultValue: defaultValue ?? items[0]?.id ?? '',
      onChange: onValueChange,
    });
    const segmentRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const selectedIndex = items.findIndex((item) => item.id === current);
    const focusableIndex = selectedIndex >= 0 ? selectedIndex : 0;

    const choose = (index: number) => {
      const item = items[index];
      if (!item) return;
      setCurrent(item.id);
      segmentRefs.current[index]?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = items.length - 1;
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
      'ubl-segmented',
      `ubl-segmented--${size}`,
      fullWidth ? 'ubl-segmented--full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle = {
      '--ubl-segmented-count': Math.max(items.length, 1),
      '--ubl-segmented-index': Math.max(selectedIndex, 0),
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        data-ubl-theme={theme}
        className={classes}
        style={resolvedStyle}
        {...restProps}
      >
        {selectedIndex >= 0 && <span className="ubl-segmented__indicator" aria-hidden="true" />}

        {items.map((item, index) => {
          const checked = index === selectedIndex;

          return (
            <button
              key={item.id}
              ref={(node) => {
                segmentRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={index === focusableIndex ? 0 : -1}
              className={['ubl-segmented__item', checked ? 'ubl-segmented__item--checked' : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setCurrent(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.icon && <Icon name={item.icon} size={ICON_SIZE[size]} tone="inherit" />}
              <span className="ubl-segmented__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
