import React from 'react';
import { ListItem } from '../ListItem';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { WaStatusListItemProps } from './StatusListItem.types';
import './StatusListItem.css';

/**
 * Componente StatusListItem — Design System WhatsApp Mobile
 *
 * Linha da aba Status. Atualizações recentes e vistas usam o anel de 2,12px em
 * `--wa-color-border-status-ring` (Ellipse 3, node 1:33) ao redor de um recorte
 * de 45px; a linha "My status" usa o avatar sem anel e o menu de opções.
 */
export const StatusListItem = React.forwardRef<HTMLElement, WaStatusListItemProps>(
  (
    {
      name,
      timestamp,
      avatarSrc,
      initials,
      state = 'recent',
      showMenu = false,
      onMenu,
      divider = true,
      onClick,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['wa-statuslistitem', `wa-statuslistitem--${state}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <ListItem
        ref={ref}
        as={onClick ? 'button' : 'li'}
        className={classes}
        density="status"
        divider={divider}
        dividerInset={74}
        onClick={onClick}
        leading={
          <Avatar
            size="md"
            ring={state === 'own' ? 'none' : 'status'}
            src={avatarSrc}
            alt={name}
            initials={initials}
          />
        }
        title={name}
        subtitle={timestamp}
        trailing={
          showMenu ? (
            <button
              type="button"
              className="wa-statuslistitem__menu"
              onClick={onMenu}
              aria-label="Opções do status"
              aria-haspopup="menu"
            >
              <Icon name="overflow" size={26} tone="appbar" />
            </button>
          ) : undefined
        }
        {...restProps}
      />
    );
  }
);

StatusListItem.displayName = 'StatusListItem';
