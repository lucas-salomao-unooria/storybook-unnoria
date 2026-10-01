import React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Alinhamento do título e do lema.
 * - 'center': centralizados (a capa)
 * - 'start': à esquerda (cabeçalhos secundários)
 */
export type UjnMastheadAlign = 'center' | 'start';

/**
 * Tamanho do título.
 * - 'lg': escala de masthead (60/78), a capa
 * - 'md': escala de Title/Large (24/34), páginas internas
 */
export type UjnMastheadSize = 'lg' | 'md';

/**
 * Fio sob o título.
 * - 'double': fio duplo da tinta (3px, vão de 2px e 1px)
 * - 'thin': fio simples de 1px
 * - 'none': sem fio
 */
export type UjnMastheadRule = 'double' | 'thin' | 'none';

/**
 * Propriedades do componente Masthead da Unoojornal.
 */
export interface UjnMastheadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Nome da publicação.
   */
  title: React.ReactNode;

  /**
   * Lema da publicação, abaixo do título.
   */
  tagline?: React.ReactNode;

  /**
   * Alinhamento do título e do lema.
   * @default 'center'
   */
  align?: UjnMastheadAlign;

  /**
   * Tamanho do título.
   * @default 'lg'
   */
  size?: UjnMastheadSize;

  /**
   * Fio sob o título.
   * @default 'double'
   */
  rule?: UjnMastheadRule;

  /**
   * Quando definido, o título é um link (para a capa).
   */
  href?: string;

  /**
   * Elemento do título. Uma página tem um único `h1`: nas páginas de matéria,
   * use `'p'`.
   * @default 'h1'
   */
  as?: 'h1' | 'p';

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
