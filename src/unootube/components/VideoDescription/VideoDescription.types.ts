import React from 'react';

/**
 * Propriedades do bloco de canal e descrição.
 *
 * Reproduz o nó `Content/VideoDescription` (`20:2989`): 640×166, com a linha de
 * canal no topo, a descrição recuada em 64px e o link de expansão ao final.
 */
export interface UniVideoDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  /** Endereço do retrato do canal. */
  avatarSrc?: string;
  /** Iniciais exibidas quando `avatarSrc` não é informado. */
  avatarInitials?: string;
  /** Nome do canal. */
  channelName: React.ReactNode;
  /** Contagem de inscritos. */
  subscriberCount?: React.ReactNode;
  /** Texto da descrição do vídeo. */
  description?: React.ReactNode;
  /**
   * Rótulo do link que expande a descrição.
   * @default 'show more'
   */
  showMoreLabel?: React.ReactNode;
  /**
   * Rótulo do link quando a descrição está expandida.
   * @default 'show less'
   */
  showLessLabel?: React.ReactNode;
  /**
   * Estado inicial de expansão da descrição.
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * Marca o canal como já inscrito, repassado ao `SubscribeButton`.
   * @default false
   */
  subscribed?: boolean;
  /** Chamado ao acionar o botão de inscrição. */
  onSubscribe?: () => void;
  /**
   * Substitui o botão de inscrição padrão.
   */
  action?: React.ReactNode;
  /** Classe CSS adicional. */
  className?: string;
}
