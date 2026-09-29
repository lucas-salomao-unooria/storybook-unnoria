'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import type { UncTabBarProps } from './TabBar.types';
import './TabBar.css';

/**
 * Componente TabBar — Design System Unoochat
 *
 * Navegação primária entre Conversas, Status e Chamadas. É a faixa inferior da
 * barra superior de 100px: atalho de câmera à esquerda, três abas de 112px
 * separadas por 18px e indicador arredondado de 3px sob a aba ativa.
 */
export const TabBar = React.forwardRef<HTMLDivElement, UncTabBarProps>(
  (
    {
      items,
      activeId,
      onChange,
      showCamera = true,
      onCamera,
      tone = 'accent',
      panelId,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['unc-tabbar', `unc-tabbar--tone-${tone}`, className].filter(Boolean).join(' ');
    const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

    /**
     * Navegação por setas exigida pelo padrão ARIA de abas: a faixa tem uma
     * única parada de tabulação (a aba ativa) e ←/→/Home/End movem a seleção.
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];

      if (!keys.includes(event.key) || items.length === 0) {
        return;
      }

      event.preventDefault();
      const current = items.findIndex((item) => item.id === activeId);

      const nextIndex =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : event.key === 'ArrowLeft'
              ? (current - 1 + items.length) % items.length
              : (current + 1) % items.length;

      const next = items[nextIndex];
      onChange?.(next.id);
      tabRefs.current[next.id]?.focus();
    };

    return (
      <div ref={ref} className={classes} {...restProps}>
        {showCamera && (
          <button
            type="button"
            className="unc-tabbar__camera"
            onClick={onCamera}
            aria-label="Abrir câmera"
          >
            <Icon name="camera" size="md" tone="camera" />
          </button>
        )}

        <div className="unc-tabbar__items" role="tablist" onKeyDown={handleKeyDown}>
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`unc-tab-${item.id}`}
                ref={(node) => {
                  tabRefs.current[item.id] = node;
                }}
                aria-selected={isActive}
                aria-controls={panelId ? panelId(item.id) : undefined}
                tabIndex={isActive ? 0 : -1}
                className={[
                  'unc-tabbar__tab',
                  isActive ? 'unc-tabbar__tab--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onChange?.(item.id)}
              >
                {item.label}
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <Badge count={item.badge} variant="tab" />
                )}
                {isActive && <span className="unc-tabbar__indicator" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

TabBar.displayName = 'TabBar';
