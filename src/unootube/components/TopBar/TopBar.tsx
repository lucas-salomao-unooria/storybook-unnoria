'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { SearchBox } from '../SearchBox';
import { ProfileExpanded } from '../ProfileExpanded';
import type { UniTopBarProps } from './TopBar.types';
import './TopBar.css';

/**
 * Componente TopBar — Design System Unitube
 *
 * Reproduz o nó `Navigation/TopBar` (`7:111`), a barra superior de 56px que
 * atravessa as três telas do arquivo. Repare que ela usa
 * `--uni-color-background-secondary` (#212121), e não o fundo principal
 * (#181818): a barra é uma superfície um degrau acima da página.
 *
 * A caixa de busca fica centrada no eixo horizontal do quadro, e não no espaço
 * remanescente entre os dois blocos — por isso a coluna central usa `flex: 1`
 * com largura máxima, e não `margin: auto`.
 */
export const TopBar = React.forwardRef<HTMLElement, UniTopBarProps>(
  (
    {
      avatarSrc,
      avatarInitials,
      notificationCount,
      onToggleSidebar,
      onSearch,
      onVoiceSearch,
      search,
      actions,
      logoHref,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const brand = logoHref ? (
      <a className="uni-topbar__logo" href={logoHref} aria-label="Unitube — página inicial">
        <Logo title="" aria-hidden="true" />
      </a>
    ) : (
      <span className="uni-topbar__logo">
        <Logo />
      </span>
    );

    return (
      <header
        ref={ref}
        className={['uni-topbar', className].filter(Boolean).join(' ')}
        {...restProps}
      >
        <div className="uni-topbar__start">
          <button
            type="button"
            className="uni-topbar__menu"
            aria-label="Alternar menu de navegação"
            onClick={onToggleSidebar}
          >
            <Icon name="hamburger" size="lg" tone="primary" />
          </button>
          {brand}
        </div>

        <div className="uni-topbar__center">
          {search ?? <SearchBox onSearch={onSearch} onVoiceSearch={onVoiceSearch} />}
        </div>

        <div className="uni-topbar__end">
          {actions ?? (
            <ProfileExpanded
              src={avatarSrc}
              initials={avatarInitials}
              notificationCount={notificationCount}
            />
          )}
        </div>
      </header>
    );
  }
);

TopBar.displayName = 'TopBar';
