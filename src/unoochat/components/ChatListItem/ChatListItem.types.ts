import React from 'react';

/**
 * Propriedades do componente ChatListItem do Unoochat.
 */
export interface UncChatListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Nome do contato ou do grupo.
   */
  name: string;

  /**
   * Prévia da última mensagem. A lista de conversas não a exibe; a prop existe
   * para as telas de contatos ("Olá! Estou usando o Unoochat.").
   */
  preview?: string;

  /**
   * Horário da última mensagem, exibido no topo da coluna direita.
   */
  time?: string;

  /**
   * URL do avatar do contato.
   */
  avatarSrc?: string;

  /**
   * Iniciais usadas quando não há avatar.
   */
  initials?: string;

  /**
   * Quantidade de mensagens não lidas. Quando maior que zero, exibe o selo.
   */
  unread?: number;

  /**
   * Marca a conversa como silenciada, exibindo o glifo correspondente.
   * @default false
   */
  muted?: boolean;

  /**
   * Marca a conversa como fixada, exibindo o glifo correspondente.
   * @default false
   */
  pinned?: boolean;

  /**
   * Aplica o estilo compacto de título, de menor corpo, usado em parte das linhas.
   * @default false
   */
  compact?: boolean;

  /**
   * Desenha o divisor inferior.
   * @default true
   */
  divider?: boolean;

  /**
   * Callback de abertura da conversa.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
