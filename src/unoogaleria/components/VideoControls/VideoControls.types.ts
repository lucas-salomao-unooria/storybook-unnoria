import React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Apresentação dos controles de vídeo.
 * - 'bar': linha sem fundo, para morar dentro de uma barra imersiva (a barra
 *   inferior do visualizador já pinta o fundo translúcido)
 * - 'overlay': cápsula translúcida com desfoque, para flutuar sobre o vídeo
 */
export type UglVideoControlsVariant = 'bar' | 'overlay';

/**
 * Propriedades do componente VideoControls da Unoogaleria.
 *
 * O componente é apresentacional: não conhece o `<video>`. Quem lê o estado do
 * elemento é o hook `useVideoPlayback`, exportado da mesma pasta.
 */
export interface UglVideoControlsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSeeked'> {
  /**
   * O vídeo está avançando. Troca o glifo e o nome do botão principal.
   */
  playing: boolean;

  /**
   * Posição atual, em segundos.
   */
  currentTime: number;

  /**
   * Duração total, em segundos. Com `0`, a linha do tempo fica desabilitada.
   */
  duration: number;

  /**
   * Áudio silenciado. Troca o glifo e o nome do botão de som.
   */
  muted: boolean;

  /**
   * Fração já carregada, de 0 a 1. Sem valor, a trilha inteira aparece como
   * carregada.
   */
  buffered?: number;

  /**
   * Pedido de alternar entre tocar e pausar.
   */
  onTogglePlay: () => void;

  /**
   * Pedido de busca, com a posição em segundos. Chamado pelo arraste da linha do
   * tempo e pelas teclas (setas ±5 s, Page Up/Down ±10 s, Home e End).
   */
  onSeek: (seconds: number) => void;

  /**
   * Pedido de alternar o som.
   */
  onToggleMute: () => void;

  /**
   * Apresentação.
   * @default 'bar'
   */
  variant?: UglVideoControlsVariant;

  /**
   * Nome do botão principal quando pausado.
   * @default 'Reproduzir'
   */
  playLabel?: string;

  /**
   * Nome do botão principal durante a reprodução.
   * @default 'Pausar'
   */
  pauseLabel?: string;

  /**
   * Nome do botão de som quando o som está ligado.
   * @default 'Desativar som'
   */
  muteLabel?: string;

  /**
   * Nome do botão de som quando o som está desligado.
   * @default 'Ativar som'
   */
  unmuteLabel?: string;

  /**
   * Nome acessível da linha do tempo.
   * @default 'Posição do vídeo'
   */
  seekLabel?: string;

  /**
   * Nome acessível do grupo de controles.
   * @default 'Controles do vídeo'
   */
  ariaLabel?: string;

  /**
   * Força o tema visual. Os controles são imersivos e invariantes; o tema só
   * chega a conteúdo aninhado.
   */
  theme?: UglTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
