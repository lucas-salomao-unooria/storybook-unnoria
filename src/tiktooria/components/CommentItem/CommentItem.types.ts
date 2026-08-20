import React from 'react';

/**
 * Propriedades de um comentário da folha.
 */
export interface TikCommentItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Autor do comentário, em Semibold 13 e `--tik-color-text-secondary`.
   */
  author: React.ReactNode;

  /**
   * Texto do comentário, em Regular 15 e `--tik-color-text-primary`.
   */
  text: React.ReactNode;

  /**
   * Tempo decorrido, exibido após o texto em Regular 13 e
   * `--tik-color-text-secondary`.
   */
  time?: React.ReactNode;

  /**
   * Endereço da fotografia do autor, exibida em 32px.
   */
  avatarSrc?: string;

  /**
   * Marca a conta como verificada, exibindo o selo de 10px ao lado do autor.
   * @default false
   */
  verified?: boolean;

  /**
   * Número de curtidas, exibido sob o coração.
   */
  likes?: React.ReactNode;

  /**
   * Indica que o comentário já foi curtido. O arquivo publica apenas o coração
   * de contorno; o estado curtido reaproveita o coração preenchido da trilha de
   * ações e está registrado como desvio.
   * @default false
   */
  liked?: boolean;

  /**
   * Rótulo do atalho de respostas, como "View replies (4)".
   */
  repliesLabel?: React.ReactNode;

  /**
   * Acionado ao curtir o comentário.
   */
  onLike?: () => void;

  /**
   * Acionado ao abrir as respostas.
   */
  onOpenReplies?: () => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
