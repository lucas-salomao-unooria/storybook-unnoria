import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Disposição da assinatura.
 * - 'inline': autoria à esquerda e tempo de leitura à direita, numa linha
 * - 'stacked': autoria, papel, data e tempo de leitura empilhados
 */
export type UjnBylineLayout = 'inline' | 'stacked';

/**
 * Propriedades do componente Byline da Unoojornal.
 */
export interface UjnBylineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Nome de quem assina. Sempre em negrito.
   */
  author: string;

  /**
   * Papel ou turma ("3º ano B", "Editorial").
   */
  role?: string;

  /**
   * Retrato quadrado da autoria. Sem ele, não há avatar na assinatura.
   */
  avatarSrc?: string;

  /**
   * Data ou tempo desde a publicação, já formatados ("12 de março de 2026").
   */
  date?: string;

  /**
   * Tempo de leitura, já formatado ("5 min de leitura").
   */
  readingTime?: string;

  /**
   * Disposição da assinatura.
   * @default 'inline'
   */
  layout?: UjnBylineLayout;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
