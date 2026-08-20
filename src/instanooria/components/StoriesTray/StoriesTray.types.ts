import React from 'react';
import type { InstaTheme } from '../../tokens';
import type { InstaStoryBubbleState } from '../StoryBubble';

/**
 * Descrição de um item da bandeja de stories.
 */
export interface InstaStoryItem {
  /** Identificador único do item */
  id: string;
  /** Nome de usuário exibido abaixo do avatar */
  username: string;
  /** URL da imagem do avatar */
  avatarSrc?: string;
  /** Iniciais exibidas quando não há imagem */
  initials?: string;
  /** Estado do story */
  state?: InstaStoryBubbleState;
}

/**
 * Propriedades do componente StoriesTray do Instanooria.
 */
export interface InstaStoriesTrayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Itens renderizados na bandeja. Ignorado quando `children` é informado.
   */
  items?: InstaStoryItem[];

  /**
   * Diâmetro do recorte interno de cada avatar, em pixels.
   * @default 56
   */
  avatarSize?: number;

  /**
   * Exibe o divisor hairline na base da bandeja.
   * @default true
   */
  bordered?: boolean;

  /**
   * Rótulo acessível da região de stories.
   * @default 'Stories'
   */
  ariaLabel?: string;

  /**
   * Callback disparado ao selecionar um item da bandeja.
   */
  onSelect?: (item: InstaStoryItem, index: number) => void;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Conteúdo customizado. Quando informado, substitui a renderização de `items`.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
