import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Um item da lista "Leia também".
 */
export interface UjnRelatedArticle {
  /** Identificador estável da matéria; é o que `onOpen` devolve */
  id: string;
  /** Etiqueta da seção */
  kicker: string;
  /** Título da matéria */
  title: string;
  /** Tempo de leitura, já formatado */
  readingTime?: string;
  /** Endereço da fotografia */
  imageSrc: string;
  /** Descrição da fotografia para leitores de tela */
  imageAlt: string;
  /** Endereço da matéria; com ele, o título é um `<a>` */
  href?: string;
}

/**
 * Propriedades do componente RelatedArticles da Unoojornal.
 */
export interface UjnRelatedArticlesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título do bloco.
   * @default 'Leia também'
   */
  title?: string;

  /**
   * Matérias relacionadas. Cada uma vira um `ArticleCard`.
   */
  items: UjnRelatedArticle[];

  /**
   * Abrir uma matéria. Recebe o `id` do item. Itens com `href` navegam pelo
   * link e também chamam esta função.
   */
  onOpen?: (id: string) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
