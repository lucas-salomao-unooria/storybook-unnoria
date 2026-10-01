import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Diâmetros nomeados do retrato.
 * - 'sm': 24px (`--ujn-avatar-sm`) — autoria em linhas densas
 * - 'md': 32px (`--ujn-avatar-md`) — autoria na assinatura (padrão)
 * - 'lg': 48px (`--ujn-avatar-lg`) — cabeçalho da matéria
 */
export type UjnAvatarSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente Avatar da Unoojornal.
 */
export interface UjnAvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
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
  size?: UjnAvatarSize | number;

  /**
   * Texto alternativo do retrato. Quando omitido, vale o `name`. Passe `''`
   * quando o nome já está escrito ao lado: o avatar sai da árvore de
   * acessibilidade.
   */
  alt?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
