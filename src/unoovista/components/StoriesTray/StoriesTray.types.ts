import React from 'react';
import type { UnvTheme } from '../../tokens';
import type { UnvStoryBubbleState } from '../StoryBubble';

/**
 * Descrição de um item da bandeja de histórias.
 */
export interface UnvStoryItem {
  /** Identificador único do item */
  id: string;
  /** Nome exibido abaixo do avatar */
  username: string;
  /** URL da imagem do avatar */
  avatarSrc?: string;
  /** Iniciais exibidas quando não há imagem */
  initials?: string;
  /** Estado da história */
  state?: UnvStoryBubbleState;
}

/**
 * Propriedades do componente StoriesTray do Unoovista.
 */
export interface UnvStoriesTrayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Itens renderizados na bandeja. Ignorado quando `children` é informado.
   */
  items?: UnvStoryItem[];

  /**
   * Diâmetro do recorte interno de cada avatar, em pixels.
   * @default 56
   */
  avatarSize?: number;

  /**
   * Apresenta a bandeja como cartão em camada: superfície primária e cantos
   * arredondados, sem fio. Desligado, ela é plana e transparente — o arranjo
   * dos destaques do perfil.
   * @default true
   */
  bordered?: boolean;

  /**
   * Rótulo acessível da região de histórias.
   * @default 'Histórias'
   */
  ariaLabel?: string;

  /**
   * Callback disparado ao selecionar um item da bandeja.
   */
  onSelect?: (item: UnvStoryItem, index: number) => void;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem ele, o
   * componente herda o tema do contêiner.
   */
  theme?: UnvTheme;

  /**
   * Conteúdo customizado. Quando informado, substitui a renderização de `items`.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
