'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar';
import type { UncChatHeaderProps } from './ChatHeader.types';
import './ChatHeader.css';

/**
 * Componente ChatHeader — Design System Unoochat
 *
 * Cabeçalho da tela de conversa. Faixa de 52px com seta de voltar de 38px,
 * avatar de 32px, nome em `--unc-font-title-lg-*` e as ações de vídeo, voz e
 * menu separadas por 24px, com o telefone girado -127,81°.
 */
export const ChatHeader = React.forwardRef<HTMLElement, UncChatHeaderProps>(
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
      className={['unc-chatheader', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <button type="button" className="unc-chatheader__back" onClick={onBack} aria-label="Voltar">
        <Icon name="back" size={24} tone="back" />
      </button>

      <button
        type="button"
        className="unc-chatheader__identity"
        onClick={onOpenProfile}
        aria-label={`Abrir perfil de ${name}`}
      >
        <Avatar size="sm" src={avatarSrc} alt={name} initials={initials} />
        <span className="unc-chatheader__text">
          <span className="unc-chatheader__name">{name}</span>
          {presence && <span className="unc-chatheader__presence">{presence}</span>}
        </span>
      </button>

      <div className="unc-chatheader__actions">
        <button
          type="button"
          className="unc-chatheader__action"
          onClick={onVideoCall}
          aria-label="Chamada de vídeo"
        >
          <Icon name="videoCall" size={24} tone="appbar" />
        </button>

        <button
          type="button"
          className="unc-chatheader__action"
          onClick={onVoiceCall}
          aria-label="Chamada de voz"
        >
          <Icon name="phone" size={22} tone="appbar" />
        </button>

        <button
          type="button"
          className="unc-chatheader__action"
          onClick={onMenu}
          aria-label="Mais opções"
          aria-haspopup="menu"
        >
          <Icon name="overflow" size={24} tone="appbar" rotate={90} />
        </button>
      </div>
    </header>
  )
);

ChatHeader.displayName = 'ChatHeader';
