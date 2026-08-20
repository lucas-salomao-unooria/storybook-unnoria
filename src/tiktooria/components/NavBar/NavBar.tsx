import React from 'react';
import { Icon } from '../Icon';
import type { TikNavBarProps } from './NavBar.types';
import './NavBar.css';

/**
 * Componente NavBar — Design System Tik Tooria
 *
 * Barra superior de 414×88 das telas de cromo claro (nodes 4:222, 4:329,
 * 4:398, 4:499, 4:536, 4:590 e 4:806). Reserva os 44px da barra de status no
 * topo e alinha o título centralizado a 55px do topo do frame, como no arquivo.
 *
 * O fio inferior é uma sombra de raio 0 (`--tik-elevation-bar-bottom`), não uma
 * borda — a biblioteca é plana e nenhum elemento do arquivo tem desfoque aqui.
 */
export const NavBar = React.forwardRef<HTMLElement, TikNavBarProps>(
  (
    {
      title,
      showBack = false,
      backLabel = 'Voltar',
      onBack,
      leading,
      trailing,
      selectable = false,
      hairline = true,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <header
      ref={ref}
      className={['tik-navbar', hairline ? 'tik-navbar--hairline' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      <span className="tik-navbar__slot tik-navbar__slot--leading">
        {showBack ? (
          <button type="button" className="tik-navbar__back" onClick={onBack} aria-label={backLabel}>
            <Icon name="arrowBack" size={18} tone="primary" />
          </button>
        ) : (
          leading
        )}
      </span>

      {title !== undefined && (
        <span className="tik-navbar__title">
          {title}
          {selectable && <Icon name="caretDown" size={7} tone="primary" />}
        </span>
      )}

      <span className="tik-navbar__slot tik-navbar__slot--trailing">{trailing}</span>
    </header>
  )
);

NavBar.displayName = 'NavBar';
