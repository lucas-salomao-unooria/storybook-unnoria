import React from 'react';

/**
 * Propriedades da coluna principal da tela de vídeo.
 *
 * Reproduz o nó `Layout/PrimaryColumn` (`20:2992`): 664×968 sobre
 * `--uni-color-background-primary`, com recuo de 24px, contendo o reprodutor
 * completo, a descrição e a lista de comentários.
 */
export interface UniPrimaryColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo da coluna. Componha com `VideoPlayerFull`, `VideoDescription` e
   * `Comment`.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
