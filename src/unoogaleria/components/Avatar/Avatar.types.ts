import React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Diâmetros do retrato.
 * - 'sm': 32px (`--ugl-avatar-sm`) — marcações e listas densas
 * - 'md': 48px (`--ugl-avatar-md`) — contatos do compartilhamento
 * - 'lg': 64px (`--ugl-avatar-lg`) — pessoas na busca
 */
export type UglAvatarSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente Avatar da Unoogaleria.
 */
export interface UglAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Retrato. Sem ele — ou se ele não carregar —, o avatar mostra as iniciais.
   */
  src?: string;

  /**
   * Nome da pessoa: é o texto alternativo do retrato e a origem das iniciais.
   */
  name: string;

  /**
   * Diâmetro.
   * @default 'md'
   */
  size?: UglAvatarSize;

  /**
   * Anel de 2px em `--ugl-color-action-primary`, afastado 2px do retrato —
   * pessoa escolhida ou em destaque.
   * @default false
   */
  ring?: boolean;

  /**
   * Retrato decorativo: o nome já está escrito ao lado, então o avatar sai da
   * árvore de acessibilidade (`alt=""`).
   * @default false
   */
  decorative?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
