import React from 'react';
import type { UniVideoPlayerProps, UniVideoSource } from '../VideoPlayer';

/**
 * Propriedades do cartão horizontal de destaque.
 *
 * Reproduz o nó `Media/VideoCardHorizontal` (`19:1346`): 1200×286, com o
 * reprodutor de 424×238 à esquerda e a coluna de texto de 400px à direita.
 * É o bloco que abre a tela de canal.
 */
export interface UniVideoCardHorizontalProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Endereço do **vídeo**. Repassado ao `VideoPlayer`, que liga a reprodução
   * real quando ele é informado.
   *
   * MIGRAÇÃO: até a versão anterior `src` designava o quadro estático. Agora o
   * quadro estático é `poster`.
   */
  src?: string;
  /** Fontes alternativas do vídeo. */
  sources?: UniVideoSource[];
  /** Quadro exibido antes da reprodução e no modo estático. */
  poster?: string;
  /** Texto alternativo do quadro estático. */
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
  playerProps?: Omit<UniVideoPlayerProps, 'src' | 'sources' | 'poster' | 'alt'>;
  /** Classe CSS adicional. */
  className?: string;
}
