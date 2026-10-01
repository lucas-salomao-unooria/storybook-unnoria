import React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Diâmetros nomeados do retrato.
 * - 'sm': 24px (`--ubl-avatar-sm`) — autoria em linhas densas e pilhas de avatares
 * - 'md': 32px (`--ubl-avatar-md`) — autoria na assinatura e nos comentários (padrão)
 * - 'lg': 48px (`--ubl-avatar-lg`) — cartão de autor e cabeçalho do post
 * - 'xl': 72px (`--ubl-avatar-xl`) — perfil da pessoa autora
 */
export type UblAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Propriedades do componente Avatar da Unooblog.
 */
export interface UblAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Retrato. Sem ele — ou se ele não carregar —, o avatar mostra as iniciais.
   */
  src?: string;

  /**
   * Nome da pessoa: é a origem das iniciais (a primeira letra de até duas
   * palavras) e, sem `alt`, o texto alternativo do retrato.
   */
  name: string;

  /**
   * Diâmetro: um degrau nomeado ou um valor em pixels (as iniciais acompanham).
   * @default 'md'
   */
  size?: UblAvatarSize | number;

  /**
   * Texto alternativo do retrato. Quando omitido, vale o `name`. Passe `''`
   * quando o nome já está escrito ao lado: o avatar sai da árvore de
   * acessibilidade.
   */
  alt?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}

/**
 * Uma pessoa na pilha do `AvatarGroup`.
 */
export interface UblAvatarGroupItem {
  /** Nome da pessoa (origem das iniciais e do rótulo da pilha). */
  name: string;
  /** Retrato. Sem ele, a pilha mostra as iniciais. */
  src?: string;
}

/**
 * Propriedades do componente AvatarGroup da Unooblog.
 */
export interface UblAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Pessoas da pilha, na ordem em que aparecem (a primeira fica por cima).
   */
  avatars: UblAvatarGroupItem[];

  /**
   * Quantos retratos aparecem antes do contador "+N". Valores abaixo de 1
   * valem 1.
   * @default 4
   */
  max?: number;

  /**
   * Diâmetro dos retratos.
   * @default 'md'
   */
  size?: UblAvatarSize | number;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
