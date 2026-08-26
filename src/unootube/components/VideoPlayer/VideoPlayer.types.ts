import React from 'react';

/**
 * Propriedades do reprodutor de vídeo do Unootube.
 *
 * Reproduz o nó `Media/VideoPlayer` (`18:1295`), publicado em duas larguras —
 * 424×238 dentro do cartão horizontal do canal e 640×360 dentro do reprodutor
 * completo da tela de vídeo. A geometria interna é idêntica nas duas: o quadro
 * escala, os controles não.
 */
export interface UniVideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Endereço do quadro de vídeo exibido como pôster. Os bitmaps são colados nos
   * frames do arquivo e não integram o pacote.
   */
  src?: string;

  /**
   * Texto alternativo do pôster.
   * @default ''
   */
  alt?: string;

  /**
   * Título exibido no canto superior esquerdo, sobre o véu.
   */
  videoTitle?: React.ReactNode;

  /**
   * Tempo decorrido, exibido à esquerda da barra de controles.
   * @default '5:07'
   */
  currentTime?: string;

  /**
   * Duração total do vídeo.
   * @default '15:28'
   */
  duration?: string;

  /**
   * Fração reproduzida da linha do tempo, de 0 a 1.
   * @default 0.33
   */
  progress?: number;

  /**
   * Fração carregada da linha do tempo, de 0 a 1. Deve ser maior ou igual a
   * `progress`.
   * @default 0.5
   */
  buffered?: number;

  /**
   * Exibe o botão de informações no canto superior direito.
   * @default true
   */
  showInfo?: boolean;

  /** Chamado ao acionar o botão de reprodução. */
  onPlay?: () => void;
  /** Chamado ao acionar o botão de próximo vídeo. */
  onNext?: () => void;
  /** Chamado ao acionar o controle de volume. */
  onToggleSound?: () => void;
  /** Chamado ao acionar o botão de legendas. */
  onToggleCaptions?: () => void;
  /** Chamado ao acionar o botão de qualidade. */
  onSettings?: () => void;
  /** Chamado ao acionar o modo cinema. */
  onTheater?: () => void;
  /** Chamado ao acionar a transmissão para TV. */
  onCast?: () => void;
  /** Chamado ao acionar a tela cheia. */
  onFullscreen?: () => void;
  /** Chamado ao acionar o botão de informações. */
  onInfo?: () => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
