'use client';

import React from 'react';
import { ListItem } from '../ListItem';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { WaCallListItemProps } from './CallListItem.types';
import './CallListItem.css';

/**
 * Componente CallListItem — Design System WhatsApp Mobile
 *
 * Registro do histórico de chamadas. A seta de direção reaproveita o glifo
 * `bi:arrow-down` girado -132,75°, exatamente como no arquivo: verde-água para
 * chamadas efetuadas e rosa-avermelhado para recebidas ou perdidas.
 */
export const CallListItem = React.forwardRef<HTMLElement, WaCallListItemProps>(
  (
    {
      name,
      timestamp,
      count,
      direction = 'outgoing',
      kind = 'voice',
      avatarSrc,
      initials,
      onCall,
      divider = true,
      onClick,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['wa-calllistitem', className].filter(Boolean).join(' ');

    return (
      <ListItem
        ref={ref}
        className={classes}
        density="call"
        divider={divider}
        dividerInset={71}
        onClick={onClick}
        leading={<Avatar size="lg" src={avatarSrc} alt="" initials={initials} />}
        title={name}
        subtitle={
          <span className="wa-calllistitem__meta">
            <Icon
              name={direction === 'outgoing' ? 'callOut' : 'callIn'}
              size={16}
              tone={direction === 'outgoing' ? 'callOut' : 'callIn'}
              rotate={-132.75}
              title={direction === 'outgoing' ? 'Chamada efetuada' : 'Chamada recebida'}
            />
            {typeof count === 'number' && <span>({count})</span>}
            <span>{timestamp}</span>
          </span>
        }
        trailing={
          <button
            type="button"
            className={`wa-calllistitem__action wa-calllistitem__action--${kind}`}
            onClick={onCall}
            aria-label={kind === 'voice' ? `Ligar para ${name}` : `Chamada de vídeo com ${name}`}
          >
            {kind === 'voice' ? (
              <Icon name="phone" size={22} tone="inherit" rotate={-127.81} />
            ) : (
              <Icon name="videoCall" size={22} tone="inherit" />
            )}
          </button>
        }
        {...restProps}
      />
    );
  }
);

CallListItem.displayName = 'CallListItem';
