import React from 'react';

/**
 * Propriedades do cabeçalho de canal móvel.
 */
export interface UniMobileChannelHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Retrato do canal. */
  avatarSrc?: string;
  /** Iniciais exibidas quando não há retrato. O arquivo desenha um "U". */
  avatarInitials?: string;

  /** Nome do canal. */
  channelName: React.ReactNode;

  /**
   * Linha de contagem, como o arquivo escreve ("420 thousand subscribers").
   */
  subscriberCount?: React.ReactNode;

  /**
   * Marca o canal como já inscrito. O arquivo só desenha o estado não inscrito.
   * @default false
   */
  /**
   * Exibe a chamada de inscrição.
   *
   * Mesmo motivo do `ChannelHeader`: o arquivo só publica canal de terceiro, e
   * o canal do próprio usuário não tem alvo de inscrição.
   * @default true
   */
  showSubscribe?: boolean;
  subscribed?: boolean;
  /**
   * Rótulo da chamada de inscrição.
   * @default 'Subscribe'
   */
  subscribeLabel?: React.ReactNode;
  /**
   * Rótulo quando já inscrito.
   * @default 'Subscribed'
   */
  subscribedLabel?: React.ReactNode;
  /** Chamado ao acionar a chamada de inscrição. */
  onSubscribe?: () => void;

  /**
   * Rótulo de seção exibido abaixo da identidade, como o arquivo escreve
   * ("Short videos from this channel"). Quando omitido, nada é renderizado.
   */
  sectionLabel?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}
