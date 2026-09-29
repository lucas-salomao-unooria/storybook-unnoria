import React from 'react';

/**
 * Tamanhos nomeados de avatar, medidos pelo diâmetro do recorte de imagem.
 * - 'xs': 23px (linha de mensagem favoritada)
 * - 'sm': 32px (cabeçalho de conversa)
 * - 'md': 45px (linhas de status)
 * - 'lg': 50px (linhas de conversa e de chamadas)
 */
export type UncAvatarSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Anel exibido ao redor do avatar.
 * - 'none': sem anel
 * - 'status': anel de 2,12px em `--unc-color-border-status-ring`, usado nas
 *   linhas de status
 */
export type UncAvatarRing = 'none' | 'status';

/**
 * Propriedades do componente Avatar do Unoochat.
 */
export interface UncAvatarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
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
  size?: UncAvatarSize | number;

  /**
   * Anel renderizado ao redor da imagem.
   * @default 'none'
   */
  ring?: UncAvatarRing;

  /**
   * Cor de preenchimento aplicada quando o avatar é usado como ação circular
   * (ex.: "Novo grupo" e "Novo contato"), consumindo um token `--unc-color-*`.
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
