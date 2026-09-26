import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do componente AudioPlayer da Plataforma Unooria.
 *
 * Um áudio longo que a pessoa ouve inteiro ou em partes — o podcast de uma
 * missão, uma gravação de aula. Tocar/pausar com rótulo visível, a posição
 * numa barra que se arrasta e o tempo decorrido e total.
 *
 * **Sem `src` ou com `unavailableReason`, o player aparece DESABILITADO com o
 * motivo à vista**, e não some: quem procura o áudio precisa saber por que ele
 * não toca (ainda não foi gerado, está sendo preparado). A transcrição fica a
 * cargo de quem usa — ela precisa estar na tela junto do player.
 */
export interface AudioPlayerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'title' | 'onPlay' | 'onPause' | 'onEnded' | 'onError'
  > {
  /** Endereço do arquivo de áudio. Ausente, o player fica desabilitado. */
  src?: string;

  /** Nome do áudio — nomeia o grupo para o leitor de tela. */
  title: React.ReactNode;

  /** Linha de apoio sob o título (quem fala, a duração aproximada). */
  description?: React.ReactNode;

  /**
   * Por que o áudio não pode tocar agora. Informado, o player fica desabilitado
   * e mostra o motivo no lugar da barra de posição.
   */
  unavailableReason?: React.ReactNode;

  /**
   * O que o navegador baixa antes do primeiro toque. `metadata` basta para
   * mostrar a duração sem baixar o arquivo inteiro.
   * @default 'metadata'
   */
  preload?: 'none' | 'metadata' | 'auto';

  /**
   * Rótulo do botão para tocar.
   * @default 'Ouvir'
   */
  playLabel?: string;

  /**
   * Rótulo do botão para pausar.
   * @default 'Pausar'
   */
  pauseLabel?: string;

  /**
   * Nome acessível da barra de posição.
   * @default 'Posição no áudio'
   */
  seekLabel?: string;

  /**
   * Mensagem quando o arquivo não carrega.
   * @default 'Não foi possível carregar o áudio.'
   */
  errorLabel?: React.ReactNode;

  /**
   * Rótulo do botão que tenta carregar de novo.
   * @default 'Tentar de novo'
   */
  retryLabel?: string;

  /** Chamado quando o áudio começa a tocar. */
  onPlay?: () => void;

  /** Chamado quando o áudio é pausado. */
  onPause?: () => void;

  /** Chamado quando o áudio chega ao fim. */
  onEnded?: () => void;

  /** Chamado quando o arquivo falha ao carregar. */
  onError?: () => void;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
