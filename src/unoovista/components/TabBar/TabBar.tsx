'use client';

import React, { useId, useRef } from 'react';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import type { UnvTabBarProps, UnvTabItem } from './TabBar.types';
import './TabBar.css';

/**
 * Conjunto padrão de abas: Feed, Buscar, Criar, Atividade e Perfil.
 */
export const unvDefaultTabs: UnvTabItem[] = [
  { id: 'feed', label: 'Feed', icon: 'home', activeIcon: 'home' },
  { id: 'search', label: 'Buscar', icon: 'search', activeIcon: 'searchFilled' },
  { id: 'create', label: 'Criar publicação', shortLabel: 'Criar', icon: 'add', activeIcon: 'add' },
  { id: 'activity', label: 'Atividade', icon: 'heart', activeIcon: 'heartFilled' },
  { id: 'profile', label: 'Perfil' },
];

/**
 * Componente TabBar — Design System Unoovista
 *
 * Doca de navegação flutuante em cápsula, afastada das bordas da tela. A aba
 * ativa vira uma cápsula de `action-primary` com o glifo preenchido e o rótulo
 * visível; as inativas mostram só o glifo, e o nome acessível está sempre
 * presente. A doca não tem fio: separa-se do conteúdo pela superfície elevada e
 * pela sombra de sobreposição.
 */
export const TabBar = React.forwardRef<HTMLElement, UnvTabBarProps>(
  (
    {
      items = unvDefaultTabs,
      activeId,
      onChange,
      withHomeIndicatorInset = true,
      ariaLabel = 'Navegação principal',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['unv-tab-bar', className].filter(Boolean).join(' ');
    const baseId = useId();
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const activeIndex = items.findIndex((item) => item.id === activeId);

    /**
     * Padrão ARIA de abas: ←/→/Home/End movem a seleção e o foco. Com uma aba
     * ativa, só ela entra na sequência de Tab (roving tabindex).
     */
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
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-unv-theme={theme}
        className={classes}
        {...restProps}
      >
        <div className="unv-tab-bar__dock" role="tablist" onKeyDown={handleKeyDown}>
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            const glyph = isActive ? item.activeIcon ?? item.icon : item.icon;
            const visibleLabel = item.shortLabel ?? item.label;
            const noticeId = `${baseId}-notice-${item.id}`;

            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={item.label}
                aria-describedby={item.hasNotification ? noticeId : undefined}
                tabIndex={activeIndex < 0 || isActive ? 0 : -1}
                className={[
                  'unv-tab-bar__item',
                  isActive ? 'unv-tab-bar__item--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onChange?.(item.id, item, index)}
              >
                {item.avatarSrc || !glyph ? (
                  <Avatar src={item.avatarSrc} alt="" size={24} ring="none" />
                ) : (
                  <Icon name={glyph} size="md" tone="inherit" filled={isActive ? true : undefined} />
                )}

                {isActive && <span className="unv-tab-bar__label">{visibleLabel}</span>}

                {item.hasNotification && (
                  <>
                    <Badge variant="notification" dot className="unv-tab-bar__notification" />
                    <span id={noticeId} className="unv-tab-bar__notice">
                      Há novidades
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {withHomeIndicatorInset && <div className="unv-tab-bar__home-inset" aria-hidden="true" />}
      </nav>
    );
  }
);

TabBar.displayName = 'TabBar';
