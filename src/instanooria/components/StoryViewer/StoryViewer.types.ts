import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Propriedades do componente StoryViewer do Instanooria.
 */
export interface InstaStoryViewerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * URL da mídia exibida em tela cheia.
   */
  mediaSrc: string;

  /**
   * Texto alternativo da mídia.
   */
  mediaAlt: string;

  /**
   * Nome de usuário do autor do story.
   */
  username: string;

  /**
   * URL do avatar do autor.
   */
  avatarSrc?: string;

  /**
   * Tempo decorrido desde a publicação ("4h").
   */
  timestamp?: string;

  /**
   * Quantidade total de segmentos da barra de progresso.
   * @default 1
   */
  segments?: number;

  /**
   * Índice do segmento atual, começando em 1.
   * @default 1
   */
  currentSegment?: number;

  /**
   * Progresso do segmento atual, entre 0 e 1.
   * @default 0.5
   */
  segmentProgress?: number;

  /**
   * Texto do campo de resposta.
   * @default 'Enviar mensagem'
   */
  composerPlaceholder?: string;

  /**
   * Callback do botão de fechar.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do botão de compartilhar.
   */
  onShare?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do botão de opções.
   */
  onMore?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback do campo de resposta.
   */
  onComposerClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'dark'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
