'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import type { InstaNotificationItemProps } from './NotificationItem.types';
import './NotificationItem.css';

/**
 * Componente NotificationItem — Design System Instanooria
 *
 * Linha da tela de atividade ("Following / You"). Combina o avatar do autor, a
 * frase com o nome de usuário em negrito, o tempo decorrido em cinza e, à
 * direita, a miniatura da publicação relacionada ou um botão de ação como
 * "Seguir" e "Mensagem".
 */
export const NotificationItem = React.forwardRef<HTMLElement, InstaNotificationItemProps>(
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
      onClick,
      theme = 'light',
      className = '',
      children,
      ...restProps
    },
    ref
  ) => {
    const isInteractive = Boolean(onClick);
    const Component = (isInteractive ? 'button' : 'div') as React.ElementType;

    const classes = [
      'insta-notification-item',
      isInteractive ? 'insta-notification-item--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-insta-theme={theme}
        className={classes}
        onClick={onClick}
        type={isInteractive ? 'button' : undefined}
        {...restProps}
      >
        <Avatar
          src={avatarSrc}
          alt=""
          initials={initials}
          size={40}
          ring={avatarRing}
          theme={theme}
        />

        <span className="insta-notification-item__content">
          <span className="insta-notification-item__text">
            {children ?? (
              <>
                {username && (
                  <span className="insta-notification-item__username">{username}</span>
                )}
                {action && <> {action}</>}
              </>
            )}
            {timestamp && (
              <span className="insta-notification-item__timestamp">{timestamp}</span>
            )}
          </span>

          {footer && <span className="insta-notification-item__footer">{footer}</span>}
        </span>

        {(trailing || thumbnailSrc) && (
          <span className="insta-notification-item__trailing">
            {trailing ?? (
              <img
                className="insta-notification-item__thumbnail"
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
