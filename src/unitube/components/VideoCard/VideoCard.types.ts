import React from 'react';

/**
 * Propriedades do cartão de vídeo da grade inicial.
 *
 * Reproduz o nó `Media/VideoCard` (`12:593`): 276×247, com a miniatura no topo,
 * o avatar de 36px à esquerda e o bloco de texto à direita.
 */
export interface UniVideoCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Endereço da miniatura. */
  thumbnailSrc?: string;
  /** Texto alternativo da miniatura. */
  thumbnailAlt?: string;
  /** Duração exibida sobre a miniatura. */
  duration?: React.ReactNode;
  /** Endereço do retrato do canal. */
  avatarSrc?: string;
  /** Iniciais exibidas quando `avatarSrc` não é informado. */
  avatarInitials?: string;
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
