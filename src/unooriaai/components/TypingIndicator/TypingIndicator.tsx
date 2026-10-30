import React from 'react';
import type { UaiTypingIndicatorProps } from './TypingIndicator.types';
import { Avatar } from '../Avatar';
import '../ChatBubble/ChatBubble.css';
import './TypingIndicator.css';

/**
 * Componente TypingIndicator — Design System UnooriaAI
 *
 * A fala do assistente que ainda não chegou: a mesma linha do `ChatBubble`
 * `role="assistant"` (sem cápsula, o avatar de 24px com `IA`), com três pontos
 * que pulsam em sequência no lugar do texto. Ocupa o espaço da mensagem que
 * vai substituir, para a conversa não pular quando ela chega.
 *
 * É uma região viva educada (`role="status"`): os pontos são `aria-hidden` e o
 * leitor de tela lê a frase do `aria-label` ("digitando"). Com
 * `prefers-reduced-motion: reduce`, os pontos param e a frase aparece.
 * Server Component.
 */
export const TypingIndicator = React.forwardRef<HTMLDivElement, UaiTypingIndicatorProps>(
  (
    {
      avatarInitials = 'IA',
      avatar,
      theme,
      'aria-label': ariaLabel = 'digitando',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'uai-chat-bubble',
      'uai-chat-bubble--assistant',
      'uai-typing-indicator',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        {...restProps}
        ref={ref}
        role="status"
        aria-label={ariaLabel}
        data-uai-theme={theme}
        className={classes}
      >
        <span className="uai-chat-bubble__avatar">
          {avatar ?? <Avatar size="sm" tone="inverse" initials={avatarInitials} />}
        </span>
        <span className="uai-chat-bubble__message uai-typing-indicator__body">
          <span className="uai-typing-indicator__dots" aria-hidden="true">
            <span className="uai-typing-indicator__dot" />
            <span className="uai-typing-indicator__dot" />
            <span className="uai-typing-indicator__dot" />
          </span>
          <span className="uai-typing-indicator__label">{ariaLabel}</span>
        </span>
      </div>
    );
  }
);

TypingIndicator.displayName = 'TypingIndicator';
