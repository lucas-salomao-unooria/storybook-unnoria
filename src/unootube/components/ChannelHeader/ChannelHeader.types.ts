import React from 'react';

/**
 * Uma aba da barra do canal.
 */
export interface UniChannelTab {
  /** Identificador estável da aba */
  id: string;
  /** Rótulo exibido */
  label: React.ReactNode;
}

/**
 * Propriedades do cabeçalho de canal.
 *
 * Reproduz o nó `Channel` (`17:2796`): 1200×340, formado pela capa de 192px, a
 * linha de identidade de 100px e a barra de abas de 48px.
 */
export interface UniChannelHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Endereço da imagem de capa. */
  coverSrc?: string;
  /** Texto alternativo da capa. */
  coverAlt?: string;
  /** Endereço do retrato do canal. */
  avatarSrc?: string;
  /** Iniciais exibidas quando `avatarSrc` não é informado. */
  avatarInitials?: string;
  /** Nome do canal. */
  channelName: React.ReactNode;
  /** Contagem de inscritos. */
  subscriberCount?: React.ReactNode;
  /**
   * Marca o canal como já inscrito.
   * @default false
   */
  subscribed?: boolean;
  /** Chamado ao acionar o botão de inscrição. */
  onSubscribe?: () => void;
  /** Abas exibidas na barra do canal. */
  tabs?: UniChannelTab[];
  /** Identificador da aba ativa. */
  activeTabId?: string;
  /** Chamado ao selecionar uma aba. */
  onSelectTab?: (id: string) => void;
  /**
   * Exibe o botão de busca à direita da barra de abas.
   * @default true
   */
  showSearch?: boolean;
  /** Chamado ao acionar a busca dentro do canal. */
  onSearch?: () => void;
  /** Classe CSS adicional. */
  className?: string;
}
