import React from 'react';
import { Avatar } from '../Avatar';
import type { UnvMessageBubbleProps } from './MessageBubble.types';
import './MessageBubble.css';

/**
 * Componente MessageBubble — Design System Unoovista
 *
 * Balão de mensagem da conversa aberta. O enviado fica à direita em
 * `--unv-color-background-tertiary` (lavanda no claro, roxo no escuro); o
 * recebido, à esquerda, em `--unv-color-background-primary` com contorno de 1px.
 * O raio é `--unv-radius-l` e o canto do "rabo" — o de baixo, do lado do autor —
 * encolhe para `--unv-radius-xs` no balão isolado e no último do grupo.
 *
 * Extensão do módulo, sem par na Plataforma Unooria.
 */
export const MessageBubble = React.forwardRef<HTMLDivElement, UnvMessageBubbleProps>(
  (
    {
      direction,
      children,
      position = 'single',
      avatarSrc,
      meta,
      senderLabel,
      bare = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const isIncoming = direction === 'incoming';

    const classes = [
      'unv-message-bubble',
      `unv-message-bubble--${direction}`,
      `unv-message-bubble--${position}`,
      bare ? 'unv-message-bubble--bare' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-unv-theme={theme} className={classes} {...restProps}>
        {isIncoming && (
          <span className="unv-message-bubble__avatar" aria-hidden="true">
            {avatarSrc && <Avatar src={avatarSrc} alt="" size="sm" theme={theme} />}
          </span>
        )}

        <div className="unv-message-bubble__column">
          <div className="unv-message-bubble__bubble">
            {senderLabel && (
              <span className="unv-message-bubble__sender">{`${senderLabel}: `}</span>
            )}
            {children}
          </div>
          {meta && <span className="unv-message-bubble__meta">{meta}</span>}
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';
