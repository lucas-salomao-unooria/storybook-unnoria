import React from 'react';
import type { WaChatBannerProps } from './ChatBanner.types';
import './ChatBanner.css';

/**
 * Componente ChatBanner — Design System WhatsApp Mobile
 *
 * Faixa fixa sob o cabeçalho da conversa, como a mensagem fixada do app real.
 * Não rola com as mensagens: é o lugar do enunciado que precisa continuar à
 * vista depois que a pessoa desce pelo histórico.
 */
export const ChatBanner = React.forwardRef<HTMLDivElement, WaChatBannerProps>(
  ({ children, trailing, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['wa-chatbanner', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <span className="wa-chatbanner__text">{children}</span>
      {trailing && <span className="wa-chatbanner__trailing">{trailing}</span>}
    </div>
  )
);

ChatBanner.displayName = 'ChatBanner';
