import React from 'react';
import { Icon } from '../Icon';
import type { WaTopBarProps } from './TopBar.types';
import './TopBar.css';

/**
 * Componente TopBar — Design System WhatsApp Mobile
 *
 * Reproduz as duas barras superiores do arquivo: a faixa inicial de 69px com a
 * marca "WhatsApp", busca e menu de opções, e a faixa de página de 57px com
 * seta de voltar e título. O rodapé (`footer`) permite encaixar o `TabBar`,
 * reconstituindo a barra de 100px do frame "Chats Main Page".
 */
export const TopBar = React.forwardRef<HTMLElement, WaTopBarProps>(
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
    const classes = ['wa-topbar', `wa-topbar--${variant}`, className].filter(Boolean).join(' ');
    const resolvedShowBack = showBack ?? variant === 'page';

    return (
      <header ref={ref as never} className={classes} {...restProps}>
        <div className="wa-topbar__row">
          {resolvedShowBack && (
            <button
              type="button"
              className="wa-topbar__button wa-topbar__button--back"
              onClick={onBack}
              aria-label="Voltar"
            >
              <Icon name="back" size={38} tone="back" />
            </button>
          )}

          <div className="wa-topbar__heading">
            <p className="wa-topbar__title">{title}</p>
            {subtitle && <p className="wa-topbar__subtitle">{subtitle}</p>}
          </div>

          <div className="wa-topbar__actions">
            {actions}

            {showSearch && (
              <button
                type="button"
                className="wa-topbar__button"
                onClick={onSearch}
                aria-label="Buscar"
              >
                <Icon name="search" size="lg" tone="appbar" />
              </button>
            )}

            {showMenu && (
              <button
                type="button"
                className="wa-topbar__button"
                onClick={onMenu}
                aria-label="Mais opções"
                aria-haspopup="menu"
              >
                <Icon name="overflow" size={26} tone="appbar" rotate={90} />
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
