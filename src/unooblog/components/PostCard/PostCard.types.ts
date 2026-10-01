import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Variantes do cartão de post.
 * - 'cover': cartão lavanda com capa 16:9 no topo (o padrão do feed)
 * - 'horizontal': capa 4:3 à esquerda e texto à direita
 * - 'compact': sem capa; só tópico, título e metadados (listas laterais)
 * - 'featured': capa larga 21:9 com título e resumo sobre o véu da base
 */
export type UblPostCardVariant = 'cover' | 'horizontal' | 'compact' | 'featured';

/**
 * Nível do título do cartão (`<h2>` a `<h4>`).
 */
export type UblPostCardHeadingLevel = 2 | 3 | 4;

/**
 * Propriedades do componente PostCard da Unooblog.
 */
export interface UblPostCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Variante do cartão. `featured` sem `coverSrc` cai em `cover`: o texto
   * branco do destaque só existe sobre uma capa.
   * @default 'cover'
   */
  variant?: UblPostCardVariant;

  /**
   * Título do post. É o alvo principal do cartão.
   */
  title: string;

  /**
   * Resumo do post. Cortado em três linhas (duas no horizontal e no destaque)
   * e omitido na variante `compact`.
   */
  summary?: string;

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
   * Nome do tópico do post ("Design Systems"). Aparece como selo.
   */
  topic?: string;

  /**
   * Nome da série a que o post pertence. Aparece como selo com o glifo de séries.
   */
  series?: string;

  /**
   * Nome de quem assina.
   */
  author: string;

  /**
   * Retrato de quem assina.
   */
  authorAvatarSrc?: string;

  /**
   * Data de publicação já formatada ("12 de mar. de 2026").
   */
  date: string;

  /**
   * Data legível por máquina (ISO 8601), para o `<time datetime>`.
   */
  dateTime?: string;

  /**
   * Tempo de leitura já formatado ("7 min de leitura").
   */
  readingTime?: string;

  /**
   * Quantidade de comentários.
   */
  comments?: number;

  /**
   * Post salvo para ler depois: o botão fica pressionado e o glifo, preenchido.
   * @default false
   */
  saved?: boolean;

  /**
   * Alterna o salvamento e recebe o novo valor. Quando informada, o botão de
   * salvar aparece; ele nunca abre o post.
   */
  onToggleSave?: (saved: boolean) => void;

  /**
   * Post já lido: o texto vai para o tom `muted` e o cartão ganha o selo
   * "Lido" com o glifo de confirmação (o estado nunca fica só na cor).
   * @default false
   */
  read?: boolean;

  /**
   * Endereço do post. Com `href`, o título é um `<a>`.
   */
  href?: string;

  /**
   * Abrir o post. Sem `href`, o título é um `<button>` que chama esta função;
   * com `href`, ela é chamada no clique do link.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Nível do título (`<h2>` a `<h4>`), conforme a posição do cartão na página.
   * @default 3
   */
  headingLevel?: UblPostCardHeadingLevel;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
