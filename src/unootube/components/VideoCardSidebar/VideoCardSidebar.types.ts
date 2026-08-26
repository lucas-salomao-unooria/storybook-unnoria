import React from 'react';

/**
 * Propriedades do cartão de sugestão da coluna lateral.
 *
 * Reproduz o nó `Media/VideoCardSidebar` (`25:3450`): 402×102, com a miniatura
 * de 168×94 à esquerda e o bloco de texto à direita.
 */
export interface UniVideoCardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Endereço da miniatura. */
  thumbnailSrc?: string;
  /** Texto alternativo da miniatura. */
  thumbnailAlt?: string;
  /** Duração exibida sobre a miniatura. */
  duration?: React.ReactNode;
  /** Título do vídeo. */
  videoTitle: React.ReactNode;
  /** Nome do canal. */
  channelName?: React.ReactNode;
  /** Linha de metadados: visualizações e data. */
  metadata?: React.ReactNode;
  /** Endereço de destino. Quando informado, o cartão inteiro vira uma âncora. */
  href?: string;
  /** Classe CSS adicional. */
  className?: string;
}
