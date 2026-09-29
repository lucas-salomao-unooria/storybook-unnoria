import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Tamanhos nomeados de avatar, medidos pelo diâmetro do recorte interno.
 * - 'xs': 20px (autor da prova social "curtido por")
 * - 'sm': 24px (aba de perfil na doca de navegação)
 * - 'md': 32px (cabeçalho da publicação e sobreposição de história)
 * - 'lg': 56px (bandeja de histórias e linhas de conversa)
 * - 'xl': 80px (cabeçalho do perfil)
 */
export type UnvAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Anel exibido ao redor do avatar. Todo anel troca o círculo por um squircle.
 * - 'none': sem anel; o retrato é um círculo
 * - 'story': gradiente da história não vista (`--unv-gradient-story`)
 * - 'live': gradiente da transmissão ao vivo (`--unv-gradient-live`)
 * - 'seen': traço neutro em `--unv-color-border-control` (história já vista e
 *   destaques do perfil)
 */
export type UnvAvatarRing = 'none' | 'story' | 'live' | 'seen';

/**
 * Selo sobreposto ao avatar.
 * - 'none': sem selo
 * - 'add': glifo de adicionar (+) centralizado, usado em "Novo destaque"
 * - 'live': etiqueta LIVE em cápsula ancorada na base do anel
 */
export type UnvAvatarBadge = 'none' | 'add' | 'live';

/**
 * Propriedades do componente Avatar do Unoovista.
 */
export interface UnvAvatarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
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
  size?: UnvAvatarSize | number;

  /**
   * Anel renderizado ao redor da imagem.
   * @default 'none'
   */
  ring?: UnvAvatarRing;

  /**
   * Selo sobreposto ao avatar.
   * @default 'none'
   */
  badge?: UnvAvatarBadge;

  /**
   * Rótulo da etiqueta quando `badge` é 'live'.
   * @default 'AO VIVO'
   */
  badgeLabel?: string;

  /**
   * Força o tema visual do avatar. Quando omitido, herda o tema do contêiner
   * ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

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
