'use client';

import React from 'react';
import { ListItem } from '../ListItem';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import type { UncChatListItemProps } from './ChatListItem.types';
import './ChatListItem.css';

/**
 * Componente ChatListItem — Design System Unoochat
 *
 * Linha da lista de conversas: avatar de 50px, nome em `--unc-font-title-sm-*`,
 * horário em `--unc-font-caption-bold-*` e estados de não lidas, silenciada e
 * fixada.
 */
export const ChatListItem = React.forwardRef<HTMLElement, UncChatListItemProps>(
  (
    {
      name,
      preview,
      time,
      avatarSrc,
      initials,
      unread = 0,
      muted = false,
      pinned = false,
      compact = false,
      divider = true,
      onClick,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unc-chatlistitem',
      compact ? 'unc-chatlistitem--compact' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const trailing =
      unread > 0 || muted || pinned ? (
        <>
          {pinned && (
            <span className="unc-chatlistitem__pin">
              <Icon name="pin" size={14} tone="pin" />
            </span>
          )}
          {muted && <Icon name="sbSilent" size={16} tone="pin" />}
          {unread > 0 && <Badge count={unread} variant="row" />}
        </>
      ) : undefined;

    return (
      <ListItem
        ref={ref}
        className={classes}
        density="chat"
        divider={divider}
        dividerInset={71}
        onClick={onClick}
        leading={<Avatar size="lg" src={avatarSrc} alt="" initials={initials} />}
        title={name}
        subtitle={
          preview ? <span className="unc-chatlistitem__preview">{preview}</span> : undefined
        }
        meta={time}
        trailing={trailing}
        {...restProps}
      />
    );
  }
);

ChatListItem.displayName = 'ChatListItem';
