'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UglTabBarProps } from './TabBar.types';
import './TabBar.css';

const badgeText = (count: number) => (count > 99 ? '99+' : String(count));

/**
 * Componente TabBar — Design System Unoogaleria
 *
 * Abas inferiores da navegação principal (Biblioteca, Para você, Álbuns,
 * Busca). É um `<nav>` rotulado com uma lista de botões; o destino ativo tem
 * `aria-current="page"`, o glifo preenchido e o roxo de acento. Translúcida
 * com desfoque e fio superior, soma `--ugl-safe-area-bottom` ao próprio recuo
 * para não ficar sob a barra de gesto.
 *
 * Todos os botões ficam na ordem de Tab (é navegação, não abas de conteúdo),
 * e as setas, Home e End movem o foco entre eles sem trocar de destino.
 */
export const TabBar = React.forwardRef<HTMLElement, UglTabBarProps>(
  (
    {
      items,
      activeId,
      onChange,
      onReselect,
      ariaLabel = 'Navegação principal',
      floating = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const listRef = React.useRef<HTMLUListElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
      const buttons = Array.from(
        listRef.current?.querySelectorAll<HTMLButtonElement>('.ugl-tab-bar__button') ?? []
      );
      const current = buttons.indexOf(event.target as HTMLButtonElement);
      if (current < 0 || buttons.length === 0) return;

      let next: number;
      switch (event.key) {
        case 'ArrowRight':
          next = (current + 1) % buttons.length;
          break;
        case 'ArrowLeft':
          next = (current - 1 + buttons.length) % buttons.length;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = buttons.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      buttons[next].focus();
    };

    const classes = ['ugl-tab-bar', floating ? 'ugl-tab-bar--floating' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <nav ref={ref} aria-label={ariaLabel} data-ugl-theme={theme} className={classes} {...restProps}>
        <ul ref={listRef} className="ugl-tab-bar__list" role="list" onKeyDown={handleKeyDown}>
          {items.map((item) => {
            const active = item.id === activeId;
            const badge = item.badge && item.badge > 0 ? item.badge : 0;
            return (
              <li key={item.id} className="ugl-tab-bar__item">
                <button
                  type="button"
                  className={['ugl-tab-bar__button', active ? 'ugl-tab-bar__button--active' : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => {
                    if (active) onReselect?.(item.id);
                    else onChange?.(item.id);
                  }}
                >
                  <span className="ugl-tab-bar__icon">
                    <Icon
                      name={active ? (item.iconActive ?? item.icon) : item.icon}
                      filled={active ? true : undefined}
                      size="md"
                      tone="inherit"
                    />
                    {badge > 0 && (
                      <span className="ugl-tab-bar__badge" aria-hidden="true">
                        {badgeText(badge)}
                      </span>
                    )}
                  </span>
                  <span className="ugl-tab-bar__label">{item.label}</span>
                  {badge > 0 && (
                    <span className="ugl-tab-bar__sr">
                      , {badge} {badge === 1 ? 'novidade' : 'novidades'}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);

TabBar.displayName = 'TabBar';
