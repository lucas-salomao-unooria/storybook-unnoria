import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Formato dos cartões do bloco.
 * - 'cover': cartão com capa em cima; grade de 1, 2 ou 3 colunas por contêiner
 * - 'compact': cartão enxuto, sem capa grande; lista em 1 coluna (2 a partir de 960px)
 */
export type UblRelatedPostsVariant = 'cover' | 'compact';

/**
 * Um item do bloco "Continue lendo".
 */
export interface UblRelatedPost {
  /** Identificador estável do post; é o que `onOpen` devolve */
  id: string;
  /** Título do post */
  title: string;
  /** Resumo de uma ou duas linhas */
  summary?: string;
  /** Endereço da capa */
  coverSrc?: string;
  /** Descrição da capa para leitores de tela */
  coverAlt?: string;
  /** Tópico principal, em texto */
  topic?: string;
  /** Nome de quem escreveu */
  author: string;
  /** Retrato de quem escreveu */
  authorAvatarSrc?: string;
  /** Data de publicação já por extenso */
  date: string;
  /** Data em formato ISO, para o `<time>` */
  dateTime?: string;
  /** Tempo de leitura, já formatado ("6 min de leitura") */
  readingTime?: string;
  /** Endereço do post; com ele, o título é um `<a>` */
  href?: string;
}

/**
 * Propriedades do componente RelatedPosts da Unooblog.
 */
export interface UblRelatedPostsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título do bloco. Vira um `<h2>` e nomeia a região.
   * @default 'Continue lendo'
   */
  title?: string;

  /**
   * Posts relacionados. Cada um vira um `PostCard`.
   */
  items: UblRelatedPost[];

  /**
   * Formato dos cartões.
   * @default 'cover'
   */
  variant?: UblRelatedPostsVariant;

  /**
   * Abrir um post. Recebe o `id` do item. Itens com `href` navegam pelo link e
   * também chamam esta função.
   */
  onOpen?: (id: string) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
