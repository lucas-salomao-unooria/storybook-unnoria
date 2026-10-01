import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente ArticleCard da Unoojornal.
 */
export interface UjnArticleCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Endereço da fotografia (informado por prop, nunca embutido no pacote).
   */
  imageSrc: string;

  /**
   * Descrição da fotografia para leitores de tela.
   */
  imageAlt: string;

  /**
   * Etiqueta da seção ("Cultura").
   */
  kicker: string;

  /**
   * Título da matéria. É o alvo principal do cartão.
   */
  title: string;

  /**
   * Tempo desde a publicação ou de leitura, já formatado ("Há 3 min").
   */
  readingTime?: string;

  /**
   * Chamada à direita do rodapé, seguida de seta. Só aparece quando o cartão
   * abre algo (`href` ou `onOpen`).
   * @default 'Ler mais'
   */
  ctaLabel?: string;

  /**
   * Endereço da matéria. Com `href`, o título é um `<a>`.
   */
  href?: string;

  /**
   * Abrir a matéria. Sem `href`, o título é um `<button>` que chama esta
   * função; com `href`, ela é chamada no clique do link.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
