import React from 'react';
import type { UniVideoPlayerProps } from '../VideoPlayer';

/**
 * Propriedades do cartão horizontal de destaque.
 *
 * Reproduz o nó `Media/VideoCardHorizontal` (`19:1346`): 1200×286, com o
 * reprodutor de 424×238 à esquerda e a coluna de texto de 400px à direita.
 * É o bloco que abre a tela de canal.
 */
export interface UniVideoCardHorizontalProps extends React.HTMLAttributes<HTMLElement> {
  /** Endereço do quadro de vídeo. */
  src?: string;
  /** Texto alternativo do quadro. */
  alt?: string;
  /** Título do vídeo. */
  videoTitle: React.ReactNode;
  /** Linha de metadados: visualizações e data. */
  metadata?: React.ReactNode;
  /** Descrição do vídeo. */
  description?: React.ReactNode;
  /**
   * Propriedades repassadas ao `VideoPlayer` interno.
   */
  playerProps?: Omit<UniVideoPlayerProps, 'src' | 'alt'>;
  /** Classe CSS adicional. */
  className?: string;
}
