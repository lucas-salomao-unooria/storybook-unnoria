import React from 'react';
import type { UniVideoControls, UniVideoState } from './useVideoPlayback';

/**
 * Uma fonte alternativa do vídeo, no formato de `<source>`.
 */
export interface UniVideoSource {
  /** Endereço do arquivo. */
  src: string;
  /** Tipo MIME, por exemplo `video/mp4` ou `video/webm`. */
  type?: string;
}

/**
 * Uma faixa de legendas, no formato de `<track>`.
 */
export interface UniVideoCaptionTrack {
  /** Endereço do arquivo WebVTT. */
  src: string;
  /** Rótulo exibido pelo navegador na lista de faixas. */
  label: string;
  /** Código de idioma BCP 47, por exemplo `pt-BR`. */
  srcLang: string;
  /** Marca a faixa como padrão. */
  default?: boolean;
}

/**
 * Propriedades do reprodutor de vídeo do Unootube.
 *
 * Reproduz o nó `Media/VideoPlayer` (`18:1295`), publicado em duas larguras —
 * 424×238 dentro do cartão horizontal do canal e 640×360 dentro do reprodutor
 * completo da tela de vídeo. A geometria interna é idêntica nas duas: o quadro
 * escala, os controles não.
 *
 * O componente tem **dois modos**, e é a presença de `src`/`sources` que decide
 * qual está em uso:
 *
 * - **Reprodução real** — com fonte informada, monta um `<video>` e os
 *   controles operam sobre ele: reproduzir, pausar, buscar na linha do tempo,
 *   volume, mudo, legendas e tela cheia. O relógio, o progresso e o trecho
 *   carregado vêm do elemento, não de prop.
 * - **Réplica estática** — sem fonte, exibe apenas o `poster` e a linha do
 *   tempo governada por `progress`, `buffered`, `currentTime` e `duration`. É o
 *   modo que reproduz o arquivo do Figma quadro a quadro, usado na documentação.
 *
 * MIGRAÇÃO: até a versão anterior `src` designava o **quadro estático**. Agora
 * `src` é o **vídeo** e o quadro estático é `poster`.
 */
export interface UniVideoPlayerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onPlay' | 'onPause' | 'onEnded' | 'onTimeUpdate'
  > {
  /**
   * Endereço do vídeo. Informar `src` ou `sources` liga o modo de reprodução
   * real; sem nenhum dos dois, o componente fica em réplica estática.
   */
  src?: string;

  /**
   * Fontes alternativas do vídeo, para quando um único formato não cobre todos
   * os navegadores. Quando informado, tem precedência sobre `src`.
   */
  sources?: UniVideoSource[];

  /**
   * Quadro exibido antes da reprodução e no modo estático. Os bitmaps são
   * colados nos frames do arquivo e não integram o pacote.
   */
  poster?: string;

  /**
   * Texto alternativo do quadro estático. Sem efeito no modo de reprodução,
   * onde o `<video>` é descrito por `videoTitle`.
   * @default ''
   */
  alt?: string;

  /**
   * Faixas de legenda em WebVTT. Com pelo menos uma faixa, o botão de legendas
   * passa a alternar a exibição de verdade.
   */
  captions?: UniVideoCaptionTrack[];

  /**
   * Título exibido no canto superior esquerdo, sobre o véu. Também serve de
   * rótulo acessível do reprodutor.
   */
  videoTitle?: React.ReactNode;

  /**
   * Inicia a reprodução assim que o vídeo estiver pronto. Navegadores só
   * permitem autoplay com áudio silenciado — combine com `muted`.
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Reinicia o vídeo ao chegar ao fim.
   * @default false
   */
  loop?: boolean;

  /**
   * Inicia o vídeo silenciado.
   * @default false
   */
  muted?: boolean;

  /**
   * Política de pré-carregamento do elemento de vídeo.
   * @default 'metadata'
   */
  preload?: 'none' | 'metadata' | 'auto';

  /**
   * Mantém a reprodução embutida no iOS em vez de abrir o reprodutor de tela
   * cheia do sistema.
   * @default true
   */
  playsInline?: boolean;

  /**
   * Recolhe os controles e os véus após alguns segundos sem interação enquanto
   * o vídeo avança. O arquivo é estático e não descreve esse comportamento —
   * ver o registro de desvios.
   * @default true
   */
  autoHideControls?: boolean;

  /**
   * Exibe o botão central de reprodução enquanto o vídeo está pausado.
   * @default true
   */
  showBigPlay?: boolean;

  /**
   * Exibe o botão de informações no canto superior direito.
   * @default true
   */
  showInfo?: boolean;

  /**
   * Tempo decorrido exibido no **modo estático**. Ignorado durante reprodução
   * real, em que o relógio vem do elemento.
   * @default '5:07'
   */
  currentTime?: string;

  /**
   * Duração total exibida no **modo estático**.
   * @default '15:28'
   */
  duration?: string;

  /**
   * Fração reproduzida da linha do tempo no **modo estático**, de 0 a 1.
   * @default 0.33
   */
  progress?: number;

  /**
   * Fração carregada da linha do tempo no **modo estático**, de 0 a 1. O
   * componente garante que nunca seja menor que `progress`.
   * @default 0.5
   */
  buffered?: number;

  /**
   * Referência para o elemento `<video>`, quando o produto precisar comandá-lo
   * diretamente.
   */
  videoRef?: React.Ref<HTMLVideoElement>;

  /** Chamado quando a reprodução começa. */
  onPlay?: () => void;
  /** Chamado quando a reprodução pausa. */
  onPause?: () => void;
  /** Chamado quando a reprodução chega ao fim. */
  onEnded?: () => void;
  /** Chamado a cada avanço do tempo, com a posição e a duração em segundos. */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /**
   * Chamado a cada mudança de estado do reprodutor, com os comandos
   * imperativos. Serve para montar controles externos ao quadro.
   */
  onStateChange?: (state: UniVideoState, controls: UniVideoControls) => void;

  /** Chamado ao acionar o botão de próximo vídeo. Não tem comportamento embutido. */
  onNext?: () => void;
  /** Chamado ao alternar as legendas, com o novo estado. */
  onToggleCaptions?: (showing: boolean) => void;
  /** Chamado ao acionar o botão de qualidade. */
  onSettings?: () => void;
  /** Chamado ao acionar o modo cinema. */
  onTheater?: () => void;
  /** Chamado ao acionar a transmissão para TV. */
  onCast?: () => void;
  /** Chamado ao acionar o botão de informações. */
  onInfo?: () => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
