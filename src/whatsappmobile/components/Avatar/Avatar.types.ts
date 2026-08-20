import React from 'react';

/**
 * Tamanhos nomeados de avatar, medidos pelo diâmetro do recorte de imagem.
 * - 'xs': 23px (linha de mensagem favoritada, 1:2925)
 * - 'sm': 32px (cabeçalho de conversa, 1:3001)
 * - 'md': 45px (linhas de status, 1:93)
 * - 'lg': 50px (linhas de conversa e de chamadas, 1:2044)
 */
export type WaAvatarSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Anel exibido ao redor do avatar.
 * - 'none': sem anel
 * - 'status': anel de 2,12px em `--wa-color-border-status-ring`, usado nas
 *   linhas de status (Ellipse 3, node 1:33)
 */
export type WaAvatarRing = 'none' | 'status';

/**
 * Propriedades do componente Avatar do WhatsApp Mobile.
 */
export interface WaAvatarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * URL da imagem de perfil. Quando ausente, exibe as iniciais em `initials`.
   */
  src?: string;

  /**
   * Texto alternativo da imagem.
   */
  alt?: string;

  /**
   * Iniciais exibidas quando não há imagem disponível.
   */
  initials?: string;

  /**
   * Tamanho do avatar. Aceita um token nomeado ou um diâmetro em pixels.
   * @default 'lg'
   */
  size?: WaAvatarSize | number;

  /**
   * Anel renderizado ao redor da imagem.
   * @default 'none'
   */
  ring?: WaAvatarRing;

  /**
   * Cor de preenchimento aplicada quando o avatar é usado como ação circular
   * (ex.: "New group" e "New contact"), consumindo um token `--wa-color-*`.
   */
  fill?: string;

  /**
   * Callback de clique. Quando informado, o avatar recebe semântica de botão.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Conteúdo sobreposto ao recorte, usado para renderizar um glifo em avatares
   * de ação.
   */
  glyph?: React.ReactNode;

  /**
   * Elemento HTML raiz renderizado.
   * @default 'span'
   */
  as?: React.ElementType;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
