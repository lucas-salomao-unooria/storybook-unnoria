'use client';

import React, { useRef } from 'react';
import { Icon } from '../Icon';
import type { UnvSegmentedTabsProps } from './SegmentedTabs.types';
import './SegmentedTabs.css';

/**
 * Componente SegmentedTabs — Design System Unoovista
 *
 * Alternância entre duas ou mais seções de uma mesma tela, em variante textual
 * ou só de glifos. Os segmentos têm largura igual e o indicador — um traço
 * grosso de `action-primary` com pontas arredondadas — desliza de um ao outro.
 * Segue o padrão ARIA de abas: ←/→/Home/End movem a seleção e o foco, e só a
 * aba ativa entra na sequência de Tab.
 */
export const SegmentedTabs = React.forwardRef<HTMLDivElement, UnvSegmentedTabsProps>(
  (
    {
      items,
      activeId,
      onChange,
      variant = 'text',
      ariaLabel = 'Seções',
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['unv-segmented-tabs', className].filter(Boolean).join(' ');
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const activeIndex = items.findIndex((item) => item.id === activeId);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (items.length === 0) {
        return;
      }

      const from = activeIndex < 0 ? 0 : activeIndex;
      let next = -1;
      if (event.key === 'ArrowRight') next = (from + 1) % items.length;
      else if (event.key === 'ArrowLeft') next = (from - 1 + items.length) % items.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = items.length - 1;

      if (next < 0) {
        return;
      }

      event.preventDefault();
      onChange?.(items[next].id, items[next], next);
      tabRefs.current[next]?.focus();
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        data-unv-theme={theme}
        className={classes}
        onKeyDown={handleKeyDown}
        style={
          {
            ...style,
            '--unv-segmented-count': Math.max(items.length, 1),
            '--unv-segmented-index': Math.max(activeIndex, 0),
          } as React.CSSProperties
        }
        {...restProps}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={variant === 'icon' ? item.label : undefined}
              tabIndex={activeIndex < 0 || isActive ? 0 : -1}
              className={[
                'unv-segmented-tabs__item',
                isActive ? 'unv-segmented-tabs__item--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onChange?.(item.id, item, index)}
            >
              {variant === 'icon' && item.icon ? (
                <Icon name={item.icon} size="md" tone="inherit" filled={isActive ? true : undefined} />
              ) : (
                item.label
              )}
            </button>
          );
        })}

        {activeIndex >= 0 && <span className="unv-segmented-tabs__indicator" aria-hidden="true" />}
      </div>
    );
  }
);

SegmentedTabs.displayName = 'SegmentedTabs';
