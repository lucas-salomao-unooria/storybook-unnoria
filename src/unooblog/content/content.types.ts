/**
 * Modelo de domínio do Unooblog: tópicos, autoria, posts em blocos, séries e
 * comentários. São tipos puros, sem React e sem dependência de componente, para
 * que um produto que monte o próprio blog reaproveite as mesmas regras.
 */

/** Tópico editorial: o assunto pelo qual os posts são agrupados e filtrados. */
export interface UblTopic {
  /** Identificador estável, em slug (`design-de-interfaces`) */
  id: string;
  /** Rótulo exibido nos chips e nos selos ("Design de interfaces") */
  label: string;
  /** Descrição curta do que o tópico cobre */
  description?: string;
}

/** Pessoa que assina posts. */
export interface UblAuthor {
  /** Identificador estável da autoria */
  id: string;
  /** Nome exibido na assinatura */
  name: string;
  /** Identificador público, com arroba ("@marinaazevedo") */
  handle: string;
  /** Cargo ou ocupação ("Designer de produto") */
  role: string;
  /** Minibiografia, em duas frases */
  bio: string;
  /** Retrato quadrado (informado por prop, nunca embutido no pacote) */
  avatarSrc?: string;
  /**
   * Seguidores contados ANTES de qualquer ação da pessoa que lê (a base). O
   * total exibido soma um quando ela segue: ver `ublFollowerCount`.
   */
  followers: number;
}

/** Parágrafo de texto corrido. */
export interface UblParagraphBlock {
  type: 'paragraph';
  /** Texto do parágrafo */
  text: string;
}

/** Intertítulo do corpo do post. */
export interface UblHeadingBlock {
  type: 'heading';
  /** Nível: 2 para seções, 3 para subseções */
  level: 2 | 3;
  /** Texto do intertítulo */
  text: string;
  /** Âncora do sumário, gerada por `ublHeadingId(text)` */
  id: string;
}

/** Citação em destaque, com a fonte opcional. */
export interface UblQuoteBlock {
  type: 'quote';
  /** Texto da citação, sem aspas */
  text: string;
  /** Quem disse, ou de onde vem */
  cite?: string;
}

/** Trecho de código. */
export interface UblCodeBlock {
  type: 'code';
  /** Linguagem, em minúsculas ("css", "typescript") */
  language: string;
  /** O código, com quebras de linha reais */
  code: string;
  /** Nome do arquivo exibido acima do trecho */
  filename?: string;
  /** Linhas a destacar, contadas a partir de 1 */
  highlightLines?: number[];
}

/** Aviso dentro do texto, em tom de informação, dica ou atenção. */
export interface UblCalloutBlock {
  type: 'callout';
  /** Tom do aviso */
  tone: 'info' | 'tip' | 'warning';
  /** Título curto, opcional */
  title?: string;
  /** Texto do aviso */
  text: string;
}

/** Imagem dentro do corpo do post, com legenda e crédito. */
export interface UblFigureBlock {
  type: 'figure';
  /** Endereço da imagem */
  src: string;
  /** Descrição da imagem para leitores de tela */
  alt: string;
  /** Legenda visível */
  caption: string;
  /** Crédito da imagem */
  credit?: string;
}

/** Lista de itens, com marcadores ou numerada. */
export interface UblListBlock {
  type: 'list';
  /** Lista numerada (padrão: marcadores) */
  ordered?: boolean;
  /** Itens da lista */
  items: string[];
}

/** Bloco de conteúdo do corpo de um post. */
export type UblBlock =
  | UblParagraphBlock
  | UblHeadingBlock
  | UblQuoteBlock
  | UblCodeBlock
  | UblCalloutBlock
  | UblFigureBlock
  | UblListBlock;

/** Post do blog. */
export interface UblPost {
  /** Identificador estável do post */
  id: string;
  /** Trecho do endereço do post (`foco-visivel`) */
  slug: string;
  /** Título do post */
  title: string;
  /** Linha de apoio, logo abaixo do título */
  subtitle: string;
  /** Resumo curto, usado nos cartões e na busca */
  summary: string;
  /** Identificador da autoria (`UblAuthor.id`) */
  authorId: string;
  /** Tópicos do post (`UblTopic.id`) */
  topicIds: string[];
  /** Série a que o post pertence (`UblSeries.id`) */
  seriesId?: string;
  /** Posição do post na série, a partir de 1 */
  seriesPart?: number;
  /** Momento da publicação, ISO com fuso (`2026-09-29T09:00:00-03:00`) */
  publishedAt: string;
  /** Momento da última atualização, ISO com fuso */
  updatedAt?: string;
  /** Tempo de leitura estimado, em minutos */
  readingMinutes: number;
  /** Imagem de capa (informada por prop) */
  coverSrc: string;
  /** Descrição da capa para leitores de tela */
  coverAlt: string;
  /** Corpo do post, em blocos */
  body: UblBlock[];
  /** O post é destaque da página inicial */
  featured?: boolean;
  /**
   * Curtidas contadas ANTES de qualquer ação da pessoa que lê (a base). O total
   * exibido soma um quando ela curte: ver `ublLikeCount`.
   */
  likes: number;
  /** Visualizações do post */
  views?: number;
}

/** Série: posts em sequência sobre um mesmo assunto. */
export interface UblSeries {
  /** Identificador estável da série */
  id: string;
  /** Título da série */
  title: string;
  /** Descrição curta */
  description: string;
  /** Imagem de capa da série (informada por prop) */
  coverSrc: string;
  /** Ids dos posts, na ordem de leitura */
  postIds: string[];
}

/** Comentário de um post. Respostas apontam para o comentário respondido por `parentId`. */
export interface UblComment {
  /** Identificador estável do comentário */
  id: string;
  /** Post comentado */
  postId: string;
  /** Nome de quem comentou */
  authorName: string;
  /** Retrato de quem comentou (informado por prop) */
  avatarSrc?: string;
  /** Texto do comentário */
  text: string;
  /** Momento do envio, ISO com fuso */
  createdAt: string;
  /** Comentário respondido; ausente nos comentários de primeiro nível */
  parentId?: string;
  /**
   * Curtidas contadas ANTES de qualquer ação da pessoa que lê (a base). O total
   * exibido soma um quando ela curte: ver `ublCommentLikes`.
   */
  likes: number;
  /** O comentário é da pessoa que está lendo (habilita a exclusão) */
  mine?: boolean;
}

/** Tamanho do texto de leitura do post. */
export type UblTextSize = 'sm' | 'md' | 'lg';
