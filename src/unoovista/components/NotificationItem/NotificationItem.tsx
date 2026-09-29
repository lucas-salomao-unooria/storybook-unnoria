'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import type { UnvNotificationItemProps } from './NotificationItem.types';
import './NotificationItem.css';

/**
 * Componente NotificationItem — Design System Unoovista
 *
 * Linha da tela de atividade, num cartão suave de superfície primária: avatar
 * do autor à esquerda, frase com o nome de usuário em negrito e o tempo
 * decorrido, e, à direita, a miniatura da publicação relacionada ou um botão
 * de ação como "Seguir" e "Mensagem". Com `unread`, um ponto marca o avatar.
 */
export const NotificationItem = React.forwardRef<HTMLElement, UnvNotificationItemProps>(
  (
    {
      avatarSrc,
      initials,
      avatarRing = 'none',
      username,
      action,
      timestamp,
      thumbnailSrc,
      thumbnailAlt = '',
      trailing,
      footer,
      unread = false,
      unreadLabel = 'Não lida',
      onClick,
      theme,
      className = '',
      children,
      ...restProps
    },
    ref
  ) => {
    const isInteractive = Boolean(onClick);
    const Component = (isInteractive ? 'button' : 'div') as React.ElementType;

    const classes = [
      'unv-notification-item',
      isInteractive ? 'unv-notification-item--interactive' : '',
      unread ? 'unv-notification-item--unread' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-unv-theme={theme}
        className={classes}
        onClick={onClick}
        type={isInteractive ? 'button' : undefined}
        {...restProps}
      >
        <span className="unv-notification-item__avatar">
          <Avatar
            src={avatarSrc}
            alt=""
            initials={initials}
            size={40}
            ring={avatarRing}
            theme={theme}
          />
          {unread && <span className="unv-notification-item__dot" aria-hidden="true" />}
        </span>

        <span className="unv-notification-item__content">
          <span className="unv-notification-item__text">
            {unread && <span className="unv-notification-item__sr">{unreadLabel}. </span>}
            {children ?? (
              <>
                {username && (
                  <span className="unv-notification-item__username">{username}</span>
                )}
                {action && <> {action}</>}
              </>
            )}
            {timestamp && (
              <span className="unv-notification-item__timestamp">{timestamp}</span>
            )}
          </span>

          {footer && <span className="unv-notification-item__footer">{footer}</span>}
        </span>

        {(trailing || thumbnailSrc) && (
          <span className="unv-notification-item__trailing">
            {trailing ?? (
              <img
                className="unv-notification-item__thumbnail"
                src={thumbnailSrc}
                alt={thumbnailAlt}
              />
            )}
          </span>
        )}
      </Component>
    );
  }
);

NotificationItem.displayName = 'NotificationItem';
