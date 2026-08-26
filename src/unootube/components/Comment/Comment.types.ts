import React from 'react';

/**
 * Propriedades do item de comentário.
 *
 * Reproduz o nó `Content/Comment` (`24:2191`): 640×100, com o avatar de 40px à
 * esquerda e o bloco de cabeçalho, texto e barra de ações à direita.
 */
export interface UniCommentProps extends React.HTMLAttributes<HTMLElement> {
  /** Endereço do retrato do autor. */
  avatarSrc?: string;
  /** Iniciais exibidas quando `avatarSrc` não é informado. */
  avatarInitials?: string;
  /** Nome do autor. */
  authorName: React.ReactNode;
  /** Data relativa da publicação. */
  timestamp?: React.ReactNode;
  /** Texto do comentário. */
  commentText: React.ReactNode;
  /** Contagem de curtidas. */
  likeCount?: number;
  /** Contagem de descurtidas. */
  dislikeCount?: number;
  /**
   * Marca o comentário como curtido pelo usuário. O arquivo publica apenas o
   * coração de contorno; a versão preenchida vem do glifo `likedFill`, que o
   * arquivo publica para a barra lateral.
   * @default false
   */
  liked?: boolean;
  /**
   * Rótulo do botão de resposta.
   * @default 'REPLY'
   */
  replyLabel?: React.ReactNode;
  /** Exibe o botão de resposta. @default true */
  showReply?: boolean;
  /** Chamado ao acionar a curtida. */
  onLike?: () => void;
  /** Chamado ao acionar a descurtida. */
  onDislike?: () => void;
  /** Chamado ao acionar a resposta. */
  onReply?: () => void;
  /** Classe CSS adicional. */
  className?: string;
}
