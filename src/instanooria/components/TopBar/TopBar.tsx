import React from 'react';
import type { InstaTopBarProps } from './TopBar.types';
import './TopBar.css';

/**
 * Componente TopBar — Design System Instanooria
 *
 * Barra de navegação superior de 88px composta pelo recuo da status bar do
 * iPhone X (44px) e pela faixa de conteúdo (44px). O título é ancorado no centro
 * óptico da tela, independentemente da largura das ações laterais, exatamente
 * como no arquivo de design.
 */
export const TopBar = React.forwardRef<HTMLElement, InstaTopBarProps>(
  (
    {
      leading,
      title,
      trailing,
      variant = 'feed',
      withStatusBarInset = true,
      bordered = true,
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-top-bar',
      `insta-top-bar--${variant}`,
      bordered ? 'insta-top-bar--bordered' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} data-insta-theme={theme} className={classes} {...restProps}>
        {withStatusBarInset && <div className="insta-top-bar__status-inset" aria-hidden="true" />}
        <div className="insta-top-bar__content">
          <div className="insta-top-bar__slot insta-top-bar__slot--leading">{leading}</div>
          {title && <div className="insta-top-bar__title">{title}</div>}
          <div className="insta-top-bar__slot insta-top-bar__slot--trailing">{trailing}</div>
        </div>
      </header>
    );
  }
);

TopBar.displayName = 'TopBar';
