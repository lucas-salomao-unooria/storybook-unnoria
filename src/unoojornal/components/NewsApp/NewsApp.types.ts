import React from 'react';
import type {
  UjnAgendaEvent,
  UjnArticle,
  UjnAuthor,
  UjnGalleryPhoto,
  UjnSection,
} from '../../edition';
import type { UjnTheme } from '../../tokens';
import type { UjnNewsAction, UjnNewsState, UjnSectionFilter } from './newsState';

/**
 * Rota do jornal: a tela que o `NewsApp` mostra. O aplicativo guarda uma pilha
 * de rotas; abrir uma matéria empilha, e o botão de voltar desempilha.
 *
 * - `capa`: a capa, com a matéria principal, a lista, a barra lateral e a galeria
 * - `secao`: a lista de uma seção (`todas` são as últimas; `opiniao` é a opinião)
 * - `materia`: uma matéria aberta
 * - `galeria`: todas as fotografias
 * - `agenda`: todos os compromissos, por mês
 * - `busca`: resultados de uma consulta (vazia, mostra as sugestões)
 * - `salvos`: as matérias salvas para ler depois
 */
export type UjnNewsRoute =
  | { type: 'capa' }
  | { type: 'secao'; section: UjnSectionFilter }
  | { type: 'materia'; id: string }
  | { type: 'galeria' }
  | { type: 'agenda' }
  | { type: 'busca'; query?: string }
  | { type: 'salvos' };

/**
 * Dados institucionais da publicação, que alimentam a faixa de edição, o título,
 * a faixa da matéria e o rodapé.
 */
export interface UjnNewsPublication {
  /** Nome da publicação (o título do alto da capa) */
  name: string;
  /** Linha de apoio sob o título */
  tagline: string;
  /** Instituição que publica ("Colégio Anísio Bastos") */
  institution: string;
  /** Identificação da edição ("Ano XII · Edição nº 214") */
  edition: string;
  /** Quando a edição foi atualizada ("Atualizado às 14:32 BRT") */
  updatedLabel?: string;
  /** Linha de direitos do rodapé */
  copyright?: string;
  /** Nota complementar do rodapé */
  note?: string;
  /** Descrição da publicação, no bloco do título do rodapé */
  description?: string;
}

/**
 * Propriedades do componente NewsApp da Unoojornal.
 */
export interface UjnNewsAppProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /**
   * Matérias da edição. O app passa a guardar o estado a partir daqui; acompanhe
   * por `onStateChange`. Obrigatório: o módulo não embute conteúdo editorial.
   */
  articles: UjnArticle[];

  /**
   * Autoria das matérias (resolve `article.authorId`). Obrigatório.
   */
  authors: UjnAuthor[];

  /**
   * Dados da publicação. Obrigatório.
   */
  publication: UjnNewsPublication;

  /**
   * Seções editoriais, na ordem das pílulas de filtro. O filtro "Todas" é do app.
   * @default ujnDefaultSections
   */
  sections?: UjnSection[];

  /**
   * Compromissos da agenda da escola. Sem eles, a agenda mostra o estado vazio e
   * a barra lateral não mostra o bloco.
   * @default []
   */
  agenda?: UjnAgendaEvent[];

  /**
   * Fotografias da galeria. Sem elas, a seção da capa some e a galeria mostra o
   * estado vazio.
   * @default []
   */
  gallery?: UjnGalleryPhoto[];

  /**
   * Momento de referência para "Há 2 horas", a data da edição e os "próximos
   * eventos". Fixe-o em demonstrações e testes; em produção, deixe vazio.
   */
  now?: Date | string;

  /**
   * Fuso de leitura das datas.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Tela aberta ao montar.
   * @default { type: 'capa' }
   */
  initialRoute?: UjnNewsRoute;

  /**
   * Seção do filtro da lista ao montar (a capa e a tela de seção). Numa rota
   * `secao`, vale a seção da própria rota.
   * @default 'todas'
   */
  initialSection?: UjnSectionFilter;

  /**
   * Estado inicial parcial: matérias salvas e lidas, progresso, tamanho do texto
   * e cartas. Só vale ao montar.
   */
  defaultState?: Partial<Omit<UjnNewsState, 'articles'>>;

  /**
   * Chamado a cada operação sobre o estado, antes de ela ser aplicada — útil para
   * registrar o que a pessoa fez (salvar, ler, escrever uma carta).
   */
  onAction?: (action: UjnNewsAction) => void;

  /**
   * Chamado a cada mudança do estado, com o estado inteiro.
   */
  onStateChange?: (state: UjnNewsState) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
