import React from 'react';

/**
 * As três composições de cartão de Shorts publicadas pelo arquivo.
 *
 * Não são um mesmo cartão com espaçamentos diferentes: cada uma organiza o
 * texto em um lugar distinto, e por isso a prop se chama `variant` e nenhuma
 * delas foi consolidada.
 *
 * - `overlay`: prateleira móvel (`1:136`), 150×266. Título e visualizações
 *   ficam **sobre** a miniatura, com o véu chapado de 32% por baixo, e o menu
 *   de contexto no canto superior direito.
 * - `below`: grade da área de trabalho (`1:742`), miniatura de 9:16 com raio de
 *   8px e o texto **abaixo** dela, em duas linhas.
 * - `views`: célula da grade de canal móvel (`16:1017`), 119×200. A miniatura é
 *   **contida** em uma célula opaca — o arquivo deixa faixas visíveis em cima e
 *   embaixo — e só as visualizações aparecem, sobrepostas na base.
 */
export type UniShortsCardVariant = 'overlay' | 'below' | 'views';

/**
 * Propriedades do cartão de Shorts.
 */
export interface UniShortsCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Endereço da miniatura. Nenhum bitmap integra o pacote: as imagens do
   * arquivo são fotografias de terceiros e entram sempre por prop.
   */
  thumbnailSrc?: string;

  /**
   * Texto alternativo da miniatura.
   * @default ''
   */
  thumbnailAlt?: string;

  /**
   * Título do Short. Ausente na variante `views`, que o arquivo não desenha.
   */
  videoTitle?: React.ReactNode;

  /** Contagem de visualizações, como o arquivo escreve ("24M views"). */
  views?: React.ReactNode;

  /**
   * Composição do cartão.
   * @default 'overlay'
   */
  variant?: UniShortsCardVariant;

  /**
   * Endereço de destino. Com `href`, o cartão é um `<a>`; sem ele, um
   * `<article>`.
   */
  href?: string;

  /**
   * Exibe o menu de contexto no canto superior direito. O arquivo só o desenha
   * na variante `overlay`.
   * @default variant === 'overlay'
   */
  showMore?: boolean;

  /** Chamado ao acionar o menu de contexto. */
  onMore?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Largura do cartão. Aceita qualquer medida CSS. Quando omitida, o cartão
   * assume a largura literal da variante.
   */
  width?: number | string;

  /** Classe CSS adicional. */
  className?: string;
}
