import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Estado de um item da bandeja de stories.
 * - 'unseen': story novo, anel com gradiente de marca
 * - 'seen': story já visualizado, anel neutro de 1px
 * - 'live': transmissão ao vivo, anel violeta com etiqueta LIVE
 * - 'add': atalho para criar um novo story ou destaque (glifo +)
 */
export type InstaStoryBubbleState = 'unseen' | 'seen' | 'live' | 'add';

/**
 * Propriedades do componente StoryBubble do Instanooria.
 */
export interface InstaStoryBubbleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Nome de usuário exibido abaixo do avatar.
   */
  username: string;

  /**
   * URL da imagem do avatar.
   */
  avatarSrc?: string;

  /**
   * Iniciais exibidas quando não há imagem.
   */
  initials?: string;

  /**
   * Estado do story.
   * @default 'unseen'
   */
  state?: InstaStoryBubbleState;

  /**
   * Diâmetro do recorte interno do avatar em pixels.
   * @default 56
   */
  avatarSize?: number;

  /**
   * Rótulo da etiqueta exibida no estado 'live'.
   * @default 'LIVE'
   */
  liveLabel?: string;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
