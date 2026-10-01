'use client';

import React from 'react';
import { NavLink } from '../NavLink';
import type { UjnMainNavProps } from './MainNav.types';
import './MainNav.css';

/**
 * Componente MainNav — Design System Unoojornal
 *
 * Linha de links das seções do jornal (Início, Últimas, Opinião, Agenda,
 * Galeria). Um marco `<nav>` com lista; o item da página atual recebe
 * `aria-current="page"` e o sublinhado de ação. Na largura larga os links
 * ficam centralizados; abaixo de 640px a linha rola na horizontal, com a barra
 * de rolagem fina, e o item ativo é trazido à vista.
 *
 * É Client Component porque repassa funções (`onNavigate`) aos filhos e rola o
 * item ativo à vista.
 */
export const MainNav = React.forwardRef<HTMLElement, UjnMainNavProps>(
  (
    {
      items,
      activeId,
      onNavigate,
      ariaLabel = 'Seções do jornal',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const listRef = React.useRef<HTMLUListElement | null>(null);

    // Traz o item ativo à vista na linha que rola (largura compacta).
    React.useEffect(() => {
      const list = listRef.current;
      if (!list || list.scrollWidth <= list.clientWidth) return;
      const current = list.querySelector<HTMLElement>('[aria-current="page"]');
      if (!current) return;
      const target = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
      list.scrollLeft = Math.max(0, target);
    }, [activeId, items.length]);

    const classes = ['ujn-main-nav', className].filter(Boolean).join(' ');

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-ujn-theme={theme}
        className={classes}
        {...restProps}
      >
        <ul ref={listRef} className="ujn-main-nav__list">
          {items.map((item) => (
            <li key={item.id} className="ujn-main-nav__item">
              <NavLink
                href={item.href}
                icon={item.icon}
                active={item.id === activeId}
                onClick={onNavigate ? () => onNavigate(item.id) : undefined}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

MainNav.displayName = 'MainNav';
