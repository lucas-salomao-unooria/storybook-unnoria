import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import type { UniMobileTopBarProps } from './MobileTopBar.types';
import './MobileTopBar.css';

/**
 * Componente MobileTopBar — Design System Unootube
 *
 * Reproduz a barra superior das telas móveis do arquivo "Free YouTube Shorts
 * Mockups (Community)" (`1:201`): a marca à esquerda e quatro alvos de 24px à
 * direita, com 12px entre eles.
 *
 * Os glifos de busca e de notificação **não** foram reexportados: são os
 * mesmos vetores de `search` e `notifications` do arquivo original, ali
 * exportados no contorno justo do nó. A conferência caminho a caminho está
 * anotada no registro de ícones.
 */
export const MobileTopBar = React.forwardRef<HTMLElement, UniMobileTopBarProps>(
  (
    {
      logo,
      onCast,
      onNotifications,
      onSearch,
      onProfile,
      avatarSrc,
      avatarInitials,
      actions,
      filters,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <header
      ref={ref}
      className={['uni-mobile-topbar', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="uni-mobile-topbar__row">
        <div className="uni-mobile-topbar__logo">{logo ?? <Logo height={20} />}</div>

        <div className="uni-mobile-topbar__actions">
          {actions ?? (
            <>
              <button
                type="button"
                className="uni-mobile-topbar__action"
                aria-label="Transmitir para a TV"
                onClick={onCast}
              >
                <Icon name="cast" size={20} />
              </button>
              <button
                type="button"
                className="uni-mobile-topbar__action"
                aria-label="Notificações"
                onClick={onNotifications}
              >
                <Icon name="notifications" size="lg" />
              </button>
              <button
                type="button"
                className="uni-mobile-topbar__action"
                aria-label="Buscar"
                onClick={onSearch}
              >
                <Icon name="search" size="lg" />
              </button>
              <button
                type="button"
                className="uni-mobile-topbar__profile"
                aria-label="Sua conta"
                onClick={onProfile}
              >
                <Avatar src={avatarSrc} initials={avatarInitials} size="xs" alt="" />
              </button>
            </>
          )}
        </div>
      </div>

      {filters != null && <div className="uni-mobile-topbar__filters">{filters}</div>}
    </header>
  )
);

MobileTopBar.displayName = 'MobileTopBar';
