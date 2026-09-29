import React from 'react';

/**
 * Propriedades do componente ChatBanner do Unoochat.
 *
 * Extensão: a faixa fixa sob o cabeçalho da conversa — a mensagem fixada.
 */
export interface UncChatBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Texto da faixa. Continua visível enquanto a conversa rola.
   */
  children: React.ReactNode;
  /**
   * Conteúdo à direita, como um contador.
   */
  trailing?: React.ReactNode;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
