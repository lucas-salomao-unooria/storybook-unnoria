import React from 'react';
import type {
  UniVideoCaptionTrack,
  UniVideoControls,
  UniVideoSource,
  UniVideoState,
} from '../VideoPlayer';

/**
 * As duas apresentações do reprodutor de Shorts publicadas pelo arquivo.
 *
 * - `immersive`: o vídeo ocupa a tela inteira e a trilha de ações fica
 *   **sobre** ele (`3:196`). É a forma móvel.
 * - `card`: o vídeo é um quadro de 488px com raio, e a trilha fica **ao lado**
 *   (`3:450`). É a forma da área de trabalho.
 */
export type UniShortsPlayerVariant = 'immersive' | 'card';

/**
 * Propriedades do reprodutor de Shorts.
 *
 * Como o `VideoPlayer`, tem **dois modos**: com `src`/`sources` monta um
 * `<video>` real e reproduz; sem fonte, exibe o `poster` e permanece a réplica
 * estática do quadro do Figma, que é como a documentação o reproduz.
 */
export interface UniShortsPlayerProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    'onPlay' | 'onPause' | 'onEnded' | 'onTimeUpdate' | 'title'
  > {
  /** Endereço do vídeo vertical. */
  src?: string;
  /** Fontes alternativas do vídeo. Quando informado, tem precedência sobre `src`. */
  sources?: UniVideoSource[];
  /** Quadro exibido antes da reprodução e no modo estático. */
  poster?: string;
  /**
   * Texto alternativo do quadro estático.
   * @default ''
   */
  alt?: string;
  /** Faixas de legenda em WebVTT. */
  captions?: UniVideoCaptionTrack[];

  /**
   * Apresentação do reprodutor.
   * @default 'immersive'
   */
  variant?: UniShortsPlayerVariant;

  /**
   * Legenda do vídeo. O arquivo escreve o texto em Regular e as hashtags em
   * Bold dentro do mesmo parágrafo (`3:203`) — passe `ReactNode` para
   * reproduzir isso.
   */
  caption?: React.ReactNode;

  /** Nome do canal, exibido à direita do retrato. */
  channelName?: React.ReactNode;
  /** Retrato do canal. */
  avatarSrc?: string;
  /** Iniciais exibidas quando não há retrato. */
  avatarInitials?: string;

  /**
   * Marca o canal como já inscrito. O arquivo só desenha o estado não inscrito;
   * o inscrito é extensão, registrada como desvio.
   * @default false
   */
  subscribed?: boolean;
  /**
   * Rótulo do botão de inscrição.
   * @default 'SUBSCRIBE'
   */
  subscribeLabel?: React.ReactNode;
  /**
   * Rótulo do botão quando já inscrito.
   * @default 'SUBSCRIBED'
   */
  subscribedLabel?: React.ReactNode;
  /** Chamado ao acionar o botão de inscrição. */
  onSubscribe?: () => void;
  /**
   * Exibe a linha de canal sob a legenda.
   * @default true
   */
  showChannel?: boolean;

  /** Contagem de curtidas, como o arquivo escreve ("245K"). */
  likeCount?: React.ReactNode;
  /** Marca o vídeo como curtido. */
  liked?: boolean;
  /** Chamado ao curtir. */
  onLike?: () => void;
  /**
   * Rótulo da ação de não curtir.
   * @default 'Dislike'
   */
  dislikeLabel?: React.ReactNode;
  /** Marca o vídeo como não curtido. */
  disliked?: boolean;
  /** Chamado ao não curtir. */
  onDislike?: () => void;
  /** Contagem de comentários, como o arquivo escreve ("952"). */
  commentCount?: React.ReactNode;
  /** Chamado ao abrir os comentários. */
  onComment?: () => void;
  /**
   * Rótulo da ação de compartilhar.
   * @default 'Share'
   */
  shareLabel?: React.ReactNode;
  /** Chamado ao compartilhar. */
  onShare?: () => void;
  /** Chamado ao abrir o menu de reticências. */
  onMore?: () => void;

  /** Capa do áudio, exibida no botão de som na base da trilha. */
  soundSrc?: string;
  /** Chamado ao acionar o botão de som. */
  onSound?: () => void;

  /**
   * Exibe a trilha de ações.
   * @default true
   */
  showRail?: boolean;

  /**
   * Substitui a trilha inteira. Componha com `ShortsActionRail` quando o
   * conjunto de ações do produto não for o do arquivo.
   */
  actions?: React.ReactNode;

  /**
   * Inicia a reprodução assim que possível. Navegadores só permitem autoplay
   * com áudio silenciado — por isso `muted` já vem ligado.
   * @default false
   */
  autoPlay?: boolean;
  /**
   * Reinicia o vídeo ao chegar ao fim. Ligado por padrão porque é o
   * comportamento do formato.
   * @default true
   */
  loop?: boolean;
  /**
   * Inicia o vídeo silenciado.
   * @default true
   */
  muted?: boolean;
  /**
   * Política de pré-carregamento do elemento de vídeo.
   * @default 'metadata'
   */
  preload?: 'none' | 'metadata' | 'auto';

  /**
   * Alterna reproduzir e pausar ao tocar no quadro, como o formato faz.
   * @default true
   */
  tapToToggle?: boolean;
  /**
   * Exibe o glifo central de reprodução enquanto o vídeo está pausado.
   * @default true
   */
  showBigPlay?: boolean;
  /**
   * Exibe a linha do tempo na base do quadro. O arquivo não a desenha — é
   * extensão registrada como desvio, e pode ser desligada para obter a réplica
   * exata.
   * @default true
   */
  showProgress?: boolean;
  /**
   * Exibe a faixa do próximo Short abaixo do quadro (`3:482`). Só tem efeito na
   * variante `card`.
   * @default false
   */
  showPeek?: boolean;

  /** Referência para o elemento `<video>`. */
  videoRef?: React.Ref<HTMLVideoElement>;

  /** Chamado quando a reprodução começa. */
  onPlay?: () => void;
  /** Chamado quando a reprodução pausa. */
  onPause?: () => void;
  /** Chamado quando a reprodução chega ao fim. */
  onEnded?: () => void;
  /** Chamado a cada avanço do tempo, com a posição e a duração em segundos. */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /** Chamado a cada mudança de estado, com os comandos imperativos. */
  onStateChange?: (state: UniVideoState, controls: UniVideoControls) => void;

  /** Classe CSS adicional. */
  className?: string;
}
