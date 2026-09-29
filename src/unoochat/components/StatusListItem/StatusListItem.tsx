'use client';

import React from 'react';
import { ListItem } from '../ListItem';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UncStatusListItemProps } from './StatusListItem.types';
import './StatusListItem.css';

/**
 * Componente StatusListItem — Design System Unoochat
 *
 * Linha da aba Status. Atualizações recentes e vistas usam o anel de 2,12px em
 * `--unc-color-border-status-ring` ao redor de um recorte de 45px; a linha
 * "Meu status" usa o avatar sem anel e o menu de opções.
 */
export const StatusListItem = React.forwardRef<HTMLElement, UncStatusListItemProps>(
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
    const classes = ['unc-statuslistitem', `unc-statuslistitem--${state}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <ListItem
        ref={ref}
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
            alt=""
            initials={initials}
          />
        }
        title={name}
        subtitle={timestamp}
        trailing={
          showMenu ? (
            <button
              type="button"
              className="unc-statuslistitem__menu"
              onClick={onMenu}
              aria-label="Opções do status"
              aria-haspopup="menu"
            >
              <Icon name="overflow" size={24} tone="appbar" />
            </button>
          ) : undefined
        }
        {...restProps}
      />
    );
  }
);

StatusListItem.displayName = 'StatusListItem';
