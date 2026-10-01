import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Nível do título do cartão (`<h2>` a `<h4>`).
 */
export type UblSeriesCardHeadingLevel = 2 | 3 | 4;

/**
 * Propriedades do componente SeriesCard da Unooblog.
 */
export interface UblSeriesCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título da série. É o alvo principal do cartão.
   */
  title: string;

  /**
   * Descrição da série, cortada em três linhas.
   */
  description?: string;

  /**
   * Endereço da imagem de capa. Sem ele, o cartão não tem capa.
   */
  coverSrc?: string;

  /**
   * Texto alternativo da capa. Vazio, a capa é decorativa.
   * @default ''
   */
  coverAlt?: string;

  /**
   * Quantidade de posts da série.
   */
  count: number;

  /**
   * Quantidade de posts já lidos. Quando informada, o cartão mostra a barra de
   * progresso (`role="progressbar"`, "2 de 5 lidos"); o valor é limitado
   * entre 0 e `count`.
   */
  progress?: number;

  /**
   * Endereço da série. Com `href`, o título é um `<a>`.
   */
  href?: string;

  /**
   * Abrir a série. Sem `href`, o título é um `<button>` que chama esta função;
   * com `href`, ela é chamada no clique do link.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Nível do título (`<h2>` a `<h4>`), conforme a posição do cartão na página.
   * @default 3
   */
  headingLevel?: UblSeriesCardHeadingLevel;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
