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
   * Identificador público do canal, exibido sob o nome — o arquivo de Shorts
   * escreve "@User-name25 · subscribers 25K · video 146" (`16:604`). O arquivo
   * original não desenha esta linha; ela entrou com o segundo arquivo.
   */
  channelHandle?: React.ReactNode;

  /**
   * Terceira linha da identidade, abaixo do identificador — o arquivo escreve
   * "No followers". Só é renderizada quando informada.
   */
  secondaryLine?: React.ReactNode;

  /**
   * Exibe as setas de rolagem nas extremidades da barra de abas, como o
   * arquivo de Shorts desenha (`16:604`). Elas rolam a faixa de verdade.
   * @default false
   */
  showTabArrows?: boolean;
  /**
   * Exibe o botão de inscrição.
   *
   * O arquivo sempre o desenha, porque toda tela de canal que ele publica é a
   * de um canal de terceiro. Um produto que abra o canal **do próprio usuário**
   * precisa suprimi-lo — ninguém se inscreve em si mesmo —, e é para isso que a
   * prop existe. Ver o registro de desvios.
   * @default true
   */
  showSubscribe?: boolean;
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
