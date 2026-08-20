'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar';
import type { WaChatHeaderProps } from './ChatHeader.types';
import './ChatHeader.css';

/**
 * Componente ChatHeader — Design System WhatsApp Mobile
 *
 * Cabeçalho da tela de conversa. Reproduz a faixa de 52px do frame "Direct
 * Message": seta de voltar de 38px, avatar de 32px, nome em PT Sans 21px e as
 * ações de vídeo, voz e menu separadas por 24px, com o telefone girado -127,81°
 * exatamente como no arquivo.
 */
export const ChatHeader = React.forwardRef<HTMLElement, WaChatHeaderProps>(
  (
    {
      name,
      presence,
      avatarSrc,
      initials,
      onBack,
      onVideoCall,
      onVoiceCall,
      onMenu,
      onOpenProfile,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <header
      ref={ref as never}
      className={['wa-chatheader', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <button type="button" className="wa-chatheader__back" onClick={onBack} aria-label="Voltar">
        <Icon name="back" size={38} tone="back" />
      </button>

      <button
        type="button"
        className="wa-chatheader__identity"
        onClick={onOpenProfile}
        aria-label={`Abrir perfil de ${name}`}
      >
        <Avatar size="sm" src={avatarSrc} alt={name} initials={initials} />
        <span className="wa-chatheader__text">
          <span className="wa-chatheader__name">{name}</span>
          {presence && <span className="wa-chatheader__presence">{presence}</span>}
        </span>
      </button>

      <div className="wa-chatheader__actions">
        <button
          type="button"
          className="wa-chatheader__action"
          onClick={onVideoCall}
          aria-label="Chamada de vídeo"
        >
          <Icon name="videoCall" size={19} tone="appbar" />
        </button>

        <button
          type="button"
          className="wa-chatheader__action"
          onClick={onVoiceCall}
          aria-label="Chamada de voz"
        >
          <Icon name="phone" size={20} tone="appbar" rotate={-127.81} />
        </button>

        <button
          type="button"
          className="wa-chatheader__action"
          onClick={onMenu}
          aria-label="Mais opções"
          aria-haspopup="menu"
        >
          <Icon name="overflow" size={26} tone="appbar" rotate={90} />
        </button>
      </div>
    </header>
  )
);

ChatHeader.displayName = 'ChatHeader';
