import React from 'react';

/**
 * As duas disposições de prateleira publicadas pelo arquivo.
 *
 * - `row`: faixa de rolagem horizontal, como na prateleira móvel (`1:135`).
 * - `grid`: grade que quebra em várias linhas, como na área de trabalho
 *   (`1:741`), onde sete cartões preenchem a primeira linha e cinco a segunda.
 */
export type UniShortsShelfLayout = 'row' | 'grid';

/**
 * Propriedades da prateleira de Shorts.
 */
export interface UniShortsShelfProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Rótulo da seção.
   *
   * O arquivo escreve "Shorts" na área de trabalho (`1:740`) e "Storts" na
   * prateleira móvel (`1:134`) — um erro de digitação do arquivo comunitário,
   * não reproduzido. Ver o registro de desvios.
   * @default 'Shorts'
   */
  label?: React.ReactNode;

  /**
   * Exibe o raio da marca à esquerda do rótulo.
   * @default true
   */
  showLogo?: boolean;

  /**
   * Disposição dos cartões.
   * @default 'row'
   */
  layout?: UniShortsShelfLayout;

  /**
   * Largura mínima da coluna quando `layout` é `grid`. A grade preenche
   * automaticamente quantas colunas couberem.
   * @default 150
   */
  columnWidth?: number;

  /**
   * Desenha os fios de 1px que delimitam a seção na área de trabalho
   * (`1:734` e `1:791`).
   * @default false
   */
  bordered?: boolean;

  /**
   * Compõe com `ShortsCard`. Nenhum cartão é montado internamente: quem decide
   * a variante é quem compõe.
   */
  children: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}
