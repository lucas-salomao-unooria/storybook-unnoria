import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Propriedades do componente StoryViewer do Unoovista.
 */
export interface UnvStoryViewerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * URL da mídia exibida em tela cheia.
   */
  mediaSrc: string;

  /**
   * Texto alternativo da mídia.
   */
  mediaAlt: string;

  /**
   * Nome do autor da história.
   */
  username: string;

  /**
   * URL do avatar do autor.
   */
  avatarSrc?: string;

  /**
   * Tempo decorrido desde a publicação ("4 h").
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
   * Zona de toque da direita (dois terços da mídia): avança a história. Sem ela,
   * a zona não é renderizada. É um botão — alcançável por Tab, acionável por
   * Enter e Espaço.
   */
  onNext?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Zona de toque da esquerda (um terço da mídia): volta a história.
   */
  onPrev?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Rótulo acessível da zona de avançar.
   * @default 'Próxima história'
   */
  nextLabel?: string;

  /**
   * Rótulo acessível da zona de voltar.
   * @default 'História anterior'
   */
  prevLabel?: string;

  /**
   * Conteúdo renderizado SOBRE a mídia, acima das zonas de toque — por
   * exemplo uma `BottomSheet` não modal com a ficha técnica. A camada deixa o
   * toque passar; cada filho direto volta a recebê-lo.
   */
  children?: React.ReactNode;

  /**
   * Substitui o campo "Enviar mensagem" da doca inferior. Os botões de
   * compartilhar e de opções continuam, se tiverem callback.
   */
  footer?: React.ReactNode;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem ele, o
   * componente herda o tema do contêiner.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
