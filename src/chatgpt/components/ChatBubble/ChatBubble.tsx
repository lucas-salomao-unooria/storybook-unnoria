import React from 'react';
import type { GptChatBubbleProps } from './ChatBubble.types';
import { Avatar } from '../Avatar';
import './ChatBubble.css';

/**
 * Componente ChatBubble — Design System ChatGPT
 *
 * Réplica do conjunto `ChatBubble` do Figma: `Role=User` renderiza a cápsula
 * translúcida de 4% com raio 16 e padding 12/16; `Role=Assistant` renderiza a
 * mensagem sem cápsula, precedida do avatar de 24px em `bg/inverse` com as
 * iniciais `AI`.
 */
export const ChatBubble = React.forwardRef<HTMLDivElement, GptChatBubbleProps>(
  (
    {
      role = 'user',
      avatarInitials = 'AI',
      avatar,
      theme,
      children,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['gpt-chat-bubble', `gpt-chat-bubble--${role}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-gpt-theme={theme} className={classes} {...restProps}>
        {role === 'assistant' && (
          <span className="gpt-chat-bubble__avatar">
            {avatar ?? <Avatar size="sm" tone="inverse" initials={avatarInitials} />}
          </span>
        )}
        <span className="gpt-chat-bubble__message">{children}</span>
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';
