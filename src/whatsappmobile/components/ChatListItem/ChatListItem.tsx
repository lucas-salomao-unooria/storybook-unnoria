import React from 'react';
import { ListItem } from '../ListItem';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import type { WaChatListItemProps } from './ChatListItem.types';
import './ChatListItem.css';

/**
 * Componente ChatListItem — Design System WhatsApp Mobile
 *
 * Linha da lista de conversas: avatar de 50px, nome em PT Sans 21px, horário em
 * PT Sans Bold 12px e estados de não lidas, silenciada e fixada observados nos
 * frames "Chats Main Page" (1:2024) e "Search in chat" (1:1916).
 */
export const ChatListItem = React.forwardRef<HTMLElement, WaChatListItemProps>(
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
      'wa-chatlistitem',
      compact ? 'wa-chatlistitem--compact' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const trailing =
      unread > 0 || muted || pinned ? (
        <>
          {pinned && (
            <span className="wa-chatlistitem__pin">
              <Icon name="pencil" size={12} tone="pin" />
            </span>
          )}
          {muted && <Icon name="sbSilent" size={13} tone="pin" />}
          {unread > 0 && <Badge count={unread} variant="row" />}
        </>
      ) : undefined;

    return (
      <ListItem
        ref={ref}
        as={onClick ? 'button' : 'li'}
        className={classes}
        density="chat"
        divider={divider}
        dividerInset={71}
        onClick={onClick}
        leading={<Avatar size="lg" src={avatarSrc} alt={name} initials={initials} />}
        title={name}
        subtitle={
          preview ? <span className="wa-chatlistitem__preview">{preview}</span> : undefined
        }
        meta={time}
        trailing={trailing}
        {...restProps}
      />
    );
  }
);

ChatListItem.displayName = 'ChatListItem';
