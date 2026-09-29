'use client';

import React from 'react';
import { ListItem } from '../ListItem';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UncCallListItemProps } from './CallListItem.types';
import './CallListItem.css';

/**
 * Componente CallListItem — Design System Unoochat
 *
 * Registro do histórico de chamadas. A seta de direção é o glifo `callOut` ou
 * `callIn`: `--unc-color-accent-call-out` para chamadas efetuadas e
 * `--unc-color-danger-call-in` para recebidas ou perdidas.
 */
export const CallListItem = React.forwardRef<HTMLElement, UncCallListItemProps>(
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
    const classes = ['unc-calllistitem', className].filter(Boolean).join(' ');

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
          <span className="unc-calllistitem__meta">
            <Icon
              name={direction === 'outgoing' ? 'callOut' : 'callIn'}
              size={16}
              tone={direction === 'outgoing' ? 'callOut' : 'callIn'}
              title={direction === 'outgoing' ? 'Chamada efetuada' : 'Chamada recebida'}
            />
            {typeof count === 'number' && <span>({count})</span>}
            <span>{timestamp}</span>
          </span>
        }
        trailing={
          <button
            type="button"
            className={`unc-calllistitem__action unc-calllistitem__action--${kind}`}
            onClick={onCall}
            aria-label={kind === 'voice' ? `Ligar para ${name}` : `Chamada de vídeo com ${name}`}
          >
            {kind === 'voice' ? (
              <Icon name="phone" size={22} tone="inherit" />
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
