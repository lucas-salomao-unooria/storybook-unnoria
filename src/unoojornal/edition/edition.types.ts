/**
 * Modelo de domínio do Unoojornal: seções, autoria, matérias, agenda, galeria e
 * cartas. São tipos puros, sem React e sem dependência de componente, para que
 * um produto que monte o próprio jornal reaproveite as mesmas regras.
 */

/** Identificador de uma seção editorial. */
export type UjnSectionId = 'vida-escolar' | 'ciencia' | 'cultura' | 'esportes' | 'opiniao';

/** Seção editorial do jornal. */
export interface UjnSection {
  /** Identificador estável da seção */
  id: UjnSectionId;
  /** Rótulo exibido nas pílulas de filtro e nos selos ("Vida escolar") */
  label: string;
}

/** Pessoa que assina uma matéria. */
export interface UjnAuthor {
  /** Identificador estável da autoria */
  id: string;
  /** Nome exibido na assinatura */
  name: string;
  /** Papel ou turma ("3º ano B", "Editorial") */
  role: string;
  /** Retrato quadrado (informado por prop, nunca embutido no pacote) */
  avatarSrc?: string;
}

/** Parágrafo de texto corrido. */
export interface UjnParagraphBlock {
  type: 'paragraph';
  /** Texto do parágrafo */
  text: string;
}

/** Intertítulo dentro do corpo da matéria. */
export interface UjnHeadingBlock {
  type: 'heading';
  /** Texto do intertítulo */
  text: string;
}

/** Citação em destaque, com a fonte. */
export interface UjnQuoteBlock {
  type: 'quote';
  /** Texto da citação, sem aspas */
  text: string;
  /** Quem disse, com o cargo ("Prof. Ivan Toledo, Orientador do Departamento de Ciências") */
  cite: string;
}

/** Imagem dentro do corpo da matéria, com legenda e crédito. */
export interface UjnFigureBlock {
  type: 'figure';
  /** Endereço da imagem */
  src: string;
  /** Descrição da imagem para leitores de tela */
  alt: string;
  /** Legenda visível */
  caption: string;
  /** Crédito da fotografia */
  credit?: string;
}

/** Lista de itens soltos (marcadores). */
export interface UjnListBlock {
  type: 'list';
  /** Itens da lista */
  items: string[];
}

/** Bloco de conteúdo do corpo de uma matéria. */
export type UjnBlock =
  | UjnParagraphBlock
  | UjnHeadingBlock
  | UjnQuoteBlock
  | UjnFigureBlock
  | UjnListBlock;

/** Matéria do jornal. */
export interface UjnArticle {
  /** Identificador estável da matéria */
  id: string;
  /** Seção em que a matéria sai */
  section: UjnSectionId;
  /** Chapéu: o assunto em poucas palavras ("Ciência e tecnologia") */
  kicker: string;
  /** Título da matéria */
  title: string;
  /** Linha de apoio, logo abaixo do título */
  deck: string;
  /** Resumo curto, usado nas listas e na busca */
  summary: string;
  /** Identificador da autoria (`UjnAuthor.id`) */
  authorId: string;
  /** Momento da publicação, ISO com fuso (`2026-03-20T14:32:00-03:00`) */
  publishedAt: string;
  /** Tempo de leitura estimado, em minutos */
  readingMinutes: number;
  /** Imagem principal (informada por prop) */
  imageSrc: string;
  /** Descrição da imagem principal para leitores de tela */
  imageAlt: string;
  /** Legenda da imagem principal */
  imageCaption?: string;
  /** Corpo da matéria, em blocos */
  body: UjnBlock[];
  /** A matéria é a principal da capa */
  featured?: boolean;
  /** A matéria é um texto de opinião */
  opinion?: boolean;
}

/** Compromisso da agenda da escola. */
export interface UjnAgendaEvent {
  /** Identificador estável do evento */
  id: string;
  /** Dia do evento, `YYYY-MM-DD` */
  date: string;
  /** Título do evento */
  title: string;
  /** Horário legível ("18h30") */
  time?: string;
  /** Local do evento */
  place?: string;
}

/** Fotografia da galeria do jornal. */
export interface UjnGalleryPhoto {
  /** Identificador estável da foto */
  id: string;
  /** Endereço da imagem */
  src: string;
  /** Descrição para leitores de tela */
  alt: string;
  /** Legenda visível */
  caption: string;
  /** Crédito da fotografia */
  credit?: string;
}

/** Carta de leitor enviada à redação. */
export interface UjnLetter {
  /** Identificador estável da carta */
  id: string;
  /** Nome de quem escreve */
  name: string;
  /** Texto da carta */
  text: string;
  /** Matéria a que a carta responde */
  articleId?: string;
  /** Momento do envio, ISO com fuso */
  sentAt: string;
}

/** Tamanho do texto de leitura da matéria. */
export type UjnTextSize = 'sm' | 'md' | 'lg';
