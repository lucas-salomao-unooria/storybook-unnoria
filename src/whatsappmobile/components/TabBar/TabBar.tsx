import React from 'react';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import type { WaTabBarProps } from './TabBar.types';
import './TabBar.css';

/**
 * Componente TabBar — Design System WhatsApp Mobile
 *
 * Navegação primária entre CHATS, STATUS e CALLS. Reproduz a faixa inferior da
 * barra de 100px do arquivo: atalho de câmera à esquerda, três abas de 112px
 * separadas por 18px e indicador arredondado de 3px sob a aba ativa.
 */
export const TabBar = React.forwardRef<HTMLDivElement, WaTabBarProps>(
  (
    {
      items,
      activeId,
      onChange,
      showCamera = true,
      onCamera,
      tone = 'accent',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['wa-tabbar', `wa-tabbar--tone-${tone}`, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="tablist" {...restProps}>
        {showCamera && (
          <button
            type="button"
            className="wa-tabbar__camera"
            onClick={onCamera}
            aria-label="Abrir câmera"
          >
            <Icon name="camera" size="md" tone="camera" />
          </button>
        )}

        <div className="wa-tabbar__items">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`wa-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls={`wa-tabpanel-${item.id}`}
                className={[
                  'wa-tabbar__tab',
                  isActive ? 'wa-tabbar__tab--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onChange?.(item.id)}
              >
                {item.label}
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <Badge count={item.badge} variant="tab" />
                )}
                {isActive && <span className="wa-tabbar__indicator" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

TabBar.displayName = 'TabBar';
