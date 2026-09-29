import React from 'react';
import type { UaiChatBubbleProps } from './ChatBubble.types';
import { Avatar } from '../Avatar';
import './ChatBubble.css';

/**
 * Componente ChatBubble — Design System UnooriaAI
 *
 * `role="user"` renderiza a cápsula translúcida (`--uai-fill-4`) com raio 16 e
 * padding 12/16; `role="assistant"` renderiza a mensagem sem cápsula,
 * precedida do avatar de 24px em `--uai-bg-inverse` com as iniciais `IA`.
 */
export const ChatBubble = React.forwardRef<HTMLDivElement, UaiChatBubbleProps>(
  (
    {
      role = 'user',
      avatarInitials = 'IA',
      avatar,
      theme,
      children,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['uai-chat-bubble', `uai-chat-bubble--${role}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-uai-theme={theme} className={classes} {...restProps}>
        {role === 'assistant' && (
          <span className="uai-chat-bubble__avatar">
            {avatar ?? <Avatar size="sm" tone="inverse" initials={avatarInitials} />}
          </span>
        )}
        <span className="uai-chat-bubble__message">{children}</span>
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';
