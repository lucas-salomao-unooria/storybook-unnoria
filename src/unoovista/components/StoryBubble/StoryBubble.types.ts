import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Estado de um item da bandeja de histórias.
 * - 'unseen': história nova, anel em gradiente de marca
 * - 'seen': história já vista, anel neutro e fino
 * - 'live': transmissão ao vivo, anel de transmissão com selo LIVE
 * - 'add': atalho para criar uma história ou um destaque (glifo +)
 */
export type UnvStoryBubbleState = 'unseen' | 'seen' | 'live' | 'add';

/**
 * Propriedades do componente StoryBubble do Unoovista.
 */
export interface UnvStoryBubbleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Nome exibido abaixo do avatar.
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
   * Estado da história.
   * @default 'unseen'
   */
  state?: UnvStoryBubbleState;

  /**
   * Aresta do avatar interno, em pixels. O anel e a folga somam 8px.
   * @default 56
   */
  avatarSize?: number;

  /**
   * Rótulo do selo exibido no estado 'live'.
   * @default 'AO VIVO'
   */
  liveLabel?: string;

  /**
   * Texto que anuncia o estado ao leitor de tela, somado ao nome no
   * `aria-label` do botão ("karina, história nova"). O padrão depende do
   * estado: "história nova", "história vista", "ao vivo" e "adicionar
   * história". Uma string vazia omite o anúncio. Um `aria-label` passado ao
   * componente prevalece.
   */
  statusLabel?: string;

  /**
   * Tema visual usado para resolver as variáveis de cor. Sem ele, o
   * componente herda o tema do contêiner.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
