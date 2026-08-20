import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Tamanhos nomeados de avatar, medidos pelo diâmetro do recorte interno.
 * - 'xs': 17px (autor da prova social "Liked by")
 * - 'sm': 23px (aba de perfil na barra inferior)
 * - 'md': 32px (cabeçalho do post e overlay de story)
 * - 'lg': 56px (bandeja de stories e linhas de conversa)
 * - 'xl': 80px (cabeçalho do perfil)
 */
export type InstaAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Anel exibido ao redor do avatar.
 * - 'none': sem anel
 * - 'story': gradiente laranja → magenta → roxo (story não visualizado)
 * - 'live': gradiente vermelho → magenta → violeta (transmissão ao vivo)
 * - 'seen': traço neutro de 1px (story já visto e destaques do perfil)
 */
export type InstaAvatarRing = 'none' | 'story' | 'live' | 'seen';

/**
 * Selo sobreposto ao avatar.
 * - 'none': sem selo
 * - 'add': botão de adicionar (+) centralizado, usado em "Novo destaque"
 * - 'live': etiqueta LIVE ancorada na base do anel
 */
export type InstaAvatarBadge = 'none' | 'add' | 'live';

/**
 * Propriedades do componente Avatar do Instanooria.
 */
export interface InstaAvatarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * URL da imagem de perfil. Quando ausente, exibe as iniciais em `initials`.
   */
  src?: string;

  /**
   * Texto alternativo da imagem. Obrigatório quando `src` é informado e o avatar
   * não é puramente decorativo.
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
  size?: InstaAvatarSize | number;

  /**
   * Anel renderizado ao redor da imagem.
   * @default 'none'
   */
  ring?: InstaAvatarRing;

  /**
   * Selo sobreposto ao avatar.
   * @default 'none'
   */
  badge?: InstaAvatarBadge;

  /**
   * Rótulo da etiqueta quando `badge` é 'live'.
   * @default 'LIVE'
   */
  badgeLabel?: string;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Callback de clique. Quando informado, o avatar recebe semântica de botão.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

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
