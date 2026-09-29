'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UncTopBarProps } from './TopBar.types';
import './TopBar.css';

/**
 * Componente TopBar — Design System Unoochat
 *
 * Duas barras superiores: a faixa inicial de 69px com a marca "Unoochat", busca
 * e menu de opções, e a faixa de página de 57px com seta de voltar e título. O
 * rodapé (`footer`) permite encaixar o `TabBar`, compondo a barra de 100px da
 * lista de conversas.
 */
export const TopBar = React.forwardRef<HTMLElement, UncTopBarProps>(
  (
    {
      title,
      subtitle,
      variant = 'home',
      showBack,
      onBack,
      showSearch = true,
      onSearch,
      showMenu = true,
      onMenu,
      actions,
      footer,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['unc-topbar', `unc-topbar--${variant}`, className].filter(Boolean).join(' ');
    const resolvedShowBack = showBack ?? variant === 'page';

    return (
      <header ref={ref as never} className={classes} {...restProps}>
        <div className="unc-topbar__row">
          {resolvedShowBack && (
            <button
              type="button"
              className="unc-topbar__button unc-topbar__button--back"
              onClick={onBack}
              aria-label="Voltar"
            >
              <Icon name="back" size={24} tone="back" />
            </button>
          )}

          <div className="unc-topbar__heading">
            <p className="unc-topbar__title">{title}</p>
            {subtitle && <p className="unc-topbar__subtitle">{subtitle}</p>}
          </div>

          <div className="unc-topbar__actions">
            {actions}

            {showSearch && (
              <button
                type="button"
                className="unc-topbar__button"
                onClick={onSearch}
                aria-label="Buscar"
              >
                <Icon name="search" size="lg" tone="appbar" />
              </button>
            )}

            {showMenu && (
              <button
                type="button"
                className="unc-topbar__button"
                onClick={onMenu}
                aria-label="Mais opções"
                aria-haspopup="menu"
              >
                <Icon name="overflow" size={24} tone="appbar" rotate={90} />
              </button>
            )}
          </div>
        </div>

        {footer}
      </header>
    );
  }
);

TopBar.displayName = 'TopBar';
