import React from 'react';

/**
 * Propriedades da barra de composição de comentário.
 */
export interface TikCommentComposerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Texto de reserva. O arquivo usa "Add comment...".
   * @default 'Add comment...'
   */
  placeholder?: string;

  /**
   * Rótulo acessível do campo.
   * @default 'Adicionar comentário'
   */
  ariaLabel?: string;

  /**
   * Acionado ao clicar no glifo de marcação publicitária.
   */
  onTagPress?: () => void;

  /**
   * Acionado ao clicar no seletor de emoji.
   */
  onEmojiPress?: () => void;

  /**
   * Classe CSS adicional aplicada ao contêiner.
   */
  className?: string;
}
