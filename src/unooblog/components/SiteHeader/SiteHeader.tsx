'use client';

import React from 'react';
import { IconButton } from '../IconButton';
import { Logo } from '../Logo';
import type { UblSiteHeaderProps } from './SiteHeader.types';
import './SiteHeader.css';

/**
 * Componente SiteHeader — Design System Unooblog
 *
 * Cabeçalho do site: barra de `--ubl-site-header-height` (64px) na superfície
 * translúcida `--ubl-color-surface-bar` (sem desfoque), com fio inferior de 1px.
 * À esquerda a marca (o `Logo`, ou o slot `logo`); depois a navegação principal,
 * com o item ativo marcado por sublinhado de 2px e `aria-current="page"`; à
 * direita a busca, o alternador claro/escuro (`aria-pressed`) e as `actions`.
 *
 * Abaixo de 640px de contêiner a navegação vira um botão de menu
 * (`aria-expanded`, `aria-controls`) que abre uma lista logo abaixo da barra.
 * Esc fecha a lista e devolve o foco ao botão; escolher um item ou levar o foco
 * para fora do cabeçalho também a fecha.
 *
 * É Client Component: guarda o estado do menu e repassa funções aos botões.
 */
export const SiteHeader = React.forwardRef<HTMLElement, UblSiteHeaderProps>(
  (
    {
      siteName,
      items,
      activeId,
      onNavigate,
      onSearch,
      themeMode,
      onToggleTheme,
      actions,
      sticky = true,
      logo,
      homeHref,
      onHome,
      navLabel = 'Navegação principal',
      menuLabel = 'Menu',
      searchLabel = 'Buscar',
      themeLabel = 'Tema escuro',
      theme,
      className = '',
      onKeyDown,
      onBlur,
      ...restProps
    },
    ref
  ) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const navId = React.useId();

    const closeMenu = React.useCallback((returnFocus: boolean) => {
      setMenuOpen(false);
      if (returnFocus) menuButtonRef.current?.focus();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === 'Escape' && menuOpen) {
        event.preventDefault();
        event.stopPropagation();
        closeMenu(true);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
      onBlur?.(event);
      if (!menuOpen) return;
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setMenuOpen(false);
      }
    };

    const select = (id: string) => {
      // Com o menu aberto (compacto), a lista some e o foco volta ao botão que a abriu.
      if (menuOpen) closeMenu(true);
      onNavigate?.(id);
    };

    const hasTheme = themeMode !== undefined && onToggleTheme !== undefined;

    const classes = [
      'ubl-site-header',
      sticky ? 'ubl-site-header--sticky' : '',
      menuOpen ? 'ubl-site-header--menu-open' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const brandContent = logo ?? <Logo height={28} title={siteName} decorative />;

    return (
      <header
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        {...restProps}
      >
        <div className="ubl-site-header__bar">
          {homeHref !== undefined || onHome ? (
            <a
              className="ubl-site-header__brand ubl-site-header__brand--link"
              href={homeHref}
              aria-label={siteName}
              onClick={onHome}
            >
              {brandContent}
            </a>
          ) : (
            <div className="ubl-site-header__brand" role="img" aria-label={siteName}>
              {brandContent}
            </div>
          )}

          <nav
            id={navId}
            className="ubl-site-header__nav"
            aria-label={navLabel}
          >
            <ul className="ubl-site-header__list">
              {items.map((item) => {
                const isActive = item.id === activeId;
                const linkClasses = [
                  'ubl-site-header__link',
                  isActive ? 'ubl-site-header__link--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <li key={item.id} className="ubl-site-header__item">
                    {item.href !== undefined ? (
                      <a
                        className={linkClasses}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => select(item.id)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className={linkClasses}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => select(item.id)}
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ubl-site-header__tools">
            {onSearch && (
              <IconButton icon="search" label={searchLabel} onClick={onSearch} />
            )}
            {hasTheme && (
              <IconButton
                icon={themeMode === 'dark' ? 'lightMode' : 'darkMode'}
                label={themeLabel}
                pressed={themeMode === 'dark'}
                onClick={onToggleTheme}
              />
            )}
            {actions && <div className="ubl-site-header__actions">{actions}</div>}
            <IconButton
              ref={menuButtonRef}
              className="ubl-site-header__menu-button"
              icon={menuOpen ? 'close' : 'menu'}
              label={menuLabel}
              aria-expanded={menuOpen}
              aria-controls={navId}
              onClick={() => setMenuOpen((open) => !open)}
            />
          </div>
        </div>
      </header>
    );
  }
);

SiteHeader.displayName = 'SiteHeader';
