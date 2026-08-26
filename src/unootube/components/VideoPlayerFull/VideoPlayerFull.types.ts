import React from 'react';
import type { UniVideoPlayerProps, UniVideoSource } from '../VideoPlayer';

/**
 * Propriedades do reprodutor completo com metadados.
 *
 * Reproduz o nó `Media/VideoPlayerFull` (`20:2920`): 640×455, formado pelo
 * `VideoPlayer` de 640×360 e pelo bloco de informações de 95px abaixo dele.
 */
export interface UniVideoPlayerFullProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Endereço do **vídeo**. Repassado ao `VideoPlayer`, que liga a reprodução
   * real quando ele é informado.
   *
   * MIGRAÇÃO: até a versão anterior `src` designava o quadro estático. Agora o
   * quadro estático é `poster`.
   */
  src?: string;
  /** Fontes alternativas do vídeo, repassadas ao `VideoPlayer`. */
  sources?: UniVideoSource[];
  /** Quadro exibido antes da reprodução e no modo estático. */
  poster?: string;
  /** Texto alternativo do quadro estático. */
  alt?: string;
  /** Título do vídeo, exibido abaixo do reprodutor em Heading/H3 regular. */
  videoTitle: React.ReactNode;
  /** Linha de metadados: visualizações e data de publicação. */
  metadata?: React.ReactNode;
  /**
   * Barra de ações exibida à direita dos metadados. Componha com `Button`.
   * Quando omitida, nada é renderizado nessa coluna.
   */
  actions?: React.ReactNode;
  /**
   * Propriedades repassadas ao `VideoPlayer` interno — tempo, progresso e
   * manipuladores de controle.
   */
  playerProps?: Omit<UniVideoPlayerProps, 'src' | 'sources' | 'poster' | 'alt' | 'videoTitle'>;
  /**
   * Título exibido **sobre** o quadro de vídeo, no véu superior. Quando
   * omitido, o `videoTitle` é reaproveitado, como o arquivo faz.
   */
  overlayTitle?: React.ReactNode;
  /** Classe CSS adicional. */
  className?: string;
}
