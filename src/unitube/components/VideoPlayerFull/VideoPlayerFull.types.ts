import React from 'react';
import type { UniVideoPlayerProps } from '../VideoPlayer';

/**
 * Propriedades do reprodutor completo com metadados.
 *
 * Reproduz o nó `Media/VideoPlayerFull` (`20:2920`): 640×455, formado pelo
 * `VideoPlayer` de 640×360 e pelo bloco de informações de 95px abaixo dele.
 */
export interface UniVideoPlayerFullProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Endereço do quadro de vídeo. */
  src?: string;
  /** Texto alternativo do quadro. */
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
  playerProps?: Omit<UniVideoPlayerProps, 'src' | 'alt' | 'videoTitle'>;
  /**
   * Título exibido **sobre** o quadro de vídeo, no véu superior. Quando
   * omitido, o `videoTitle` é reaproveitado, como o arquivo faz.
   */
  overlayTitle?: React.ReactNode;
  /** Classe CSS adicional. */
  className?: string;
}
