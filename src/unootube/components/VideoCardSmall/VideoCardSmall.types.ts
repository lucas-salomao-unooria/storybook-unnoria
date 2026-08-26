import React from 'react';

/**
 * Propriedades do cartão compacto de vídeo.
 *
 * Reproduz o nó `Media/VideoCardSmall` (`19:1459`): 214×194, usado em linhas de
 * cinco dentro da playlist do canal. Não tem avatar — o canal aparece apenas
 * como texto.
 */
export interface UniVideoCardSmallProps extends React.HTMLAttributes<HTMLElement> {
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
