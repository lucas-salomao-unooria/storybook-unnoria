'use client';

import React from 'react';
import { Icon } from '../Icon';
import { ProfileCompact } from '../ProfileCompact';
import type { UniProfileExpandedProps } from './ProfileExpanded.types';
import './ProfileExpanded.css';

/**
 * Componente ProfileExpanded — Design System Unootube
 *
 * Reproduz o nó `Navigation/ProfileExpanded` (`7:93`): o bloco direito da barra
 * superior, com os alvos de criar, aplicativos e notificações — cada um de
 * 40×40 com recuo de 8px — e o perfil compacto ao final.
 */
export const ProfileExpanded = React.forwardRef<HTMLDivElement, UniProfileExpandedProps>(
  (
    {
      src,
      alt = 'Perfil',
      initials,
      notificationCount = 0,
      onCreate,
      onApps,
      onNotifications,
      onProfile,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div
      ref={ref}
      className={['uni-profile-expanded', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <button
        type="button"
        className="uni-profile-expanded__action"
        aria-label="Criar"
        onClick={onCreate}
      >
        <Icon name="create" size="lg" tone="primary" />
      </button>

      <button
        type="button"
        className="uni-profile-expanded__action"
        aria-label="Aplicativos do Unootube"
        onClick={onApps}
      >
        <Icon name="apps" size="lg" tone="primary" />
      </button>

      <button
        type="button"
        className="uni-profile-expanded__action"
        aria-label={
          notificationCount > 0 ? `Notificações (${notificationCount} não lidas)` : 'Notificações'
        }
        onClick={onNotifications}
      >
        <Icon name="notifications" size="lg" tone="primary" />
        {notificationCount > 0 && (
          <span className="uni-profile-expanded__badge" aria-hidden="true">
            {notificationCount > 99 ? '99+' : notificationCount}
          </span>
        )}
      </button>

      <ProfileCompact src={src} alt={alt} initials={initials} onClick={onProfile} />
    </div>
  )
);

ProfileExpanded.displayName = 'ProfileExpanded';
