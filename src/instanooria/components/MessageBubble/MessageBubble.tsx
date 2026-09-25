import React from 'react';
import { Avatar } from '../Avatar';
import type { InstaMessageBubbleProps } from './MessageBubble.types';
import './MessageBubble.css';

/**
 * Componente MessageBubble — Design System Instanooria
 *
 * Balão de mensagem direta, como no Direct da geração de app que o arquivo
 * desenha: o enviado à direita no preenchimento do campo de busca
 * (`--insta-color-fill-field`), o recebido à esquerda na superfície da tela com
 * contorno. Cantos de 21,5px — o raio do campo "Send Message" do Story — que
 * encolhem para 4px do lado do autor entre balões do mesmo grupo.
 *
 * Extensão sem quadro no arquivo de origem, que publica só a lista de
 * conversas. NÃO é o balão do WhatsApp Mobile.
 */
export const MessageBubble = React.forwardRef<HTMLDivElement, InstaMessageBubbleProps>(
  (
    {
      direction,
      children,
      position = 'single',
      avatarSrc,
      meta,
      senderLabel,
      bare = false,
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const isIncoming = direction === 'incoming';

    const classes = [
      'insta-message-bubble',
      `insta-message-bubble--${direction}`,
      `insta-message-bubble--${position}`,
      bare ? 'insta-message-bubble--bare' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-insta-theme={theme} className={classes} {...restProps}>
        {isIncoming && (
          <span className="insta-message-bubble__avatar" aria-hidden="true">
            {avatarSrc && <Avatar src={avatarSrc} alt="" size="sm" theme={theme} />}
          </span>
        )}

        <div className="insta-message-bubble__column">
          <div className="insta-message-bubble__bubble">
            {senderLabel && (
              <span className="insta-message-bubble__sender">{`${senderLabel}: `}</span>
            )}
            {children}
          </div>
          {meta && <span className="insta-message-bubble__meta">{meta}</span>}
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';
