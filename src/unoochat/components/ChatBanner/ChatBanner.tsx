import React from 'react';
import type { UncChatBannerProps } from './ChatBanner.types';
import './ChatBanner.css';

/**
 * Componente ChatBanner — Design System Unoochat
 *
 * Faixa fixa sob o cabeçalho da conversa, como a mensagem fixada do app real.
 * Não rola com as mensagens: é o lugar do enunciado que precisa continuar à
 * vista depois que a pessoa desce pelo histórico.
 */
export const ChatBanner = React.forwardRef<HTMLDivElement, UncChatBannerProps>(
  ({ children, trailing, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['unc-chatbanner', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <span className="unc-chatbanner__text">{children}</span>
      {trailing && <span className="unc-chatbanner__trailing">{trailing}</span>}
    </div>
  )
);

ChatBanner.displayName = 'ChatBanner';
