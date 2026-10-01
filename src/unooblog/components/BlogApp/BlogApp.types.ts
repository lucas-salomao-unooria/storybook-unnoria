import React from 'react';
import type { UblAuthor, UblComment, UblPost, UblSeries, UblTopic } from '../../content';
import type { UblTheme } from '../../tokens';
import type { UblBlogAction, UblBlogState } from './blogState';

/**
 * Rota do blog: a tela que o `BlogApp` mostra. O aplicativo guarda uma pilha de
 * rotas; abrir um post empilha, e a navegação principal recomeça a pilha.
 *
 * - `inicio`: a página inicial, com o destaque, o feed com filtro por tópico, as séries e a newsletter
 * - `topicos`: todos os tópicos
 * - `topico`: os posts de um tópico
 * - `series`: todas as séries, com o progresso de leitura
 * - `serie`: uma série, na ordem de leitura
 * - `autores`: toda a autoria
 * - `autor`: uma autoria e os posts dela
 * - `busca`: resultados de uma consulta (vazia, mostra as sugestões)
 * - `salvos`: os posts salvos para ler depois
 * - `post`: um post aberto
 */
export type UblBlogRoute =
  | { type: 'inicio' }
  | { type: 'topicos' }
  | { type: 'topico'; id: string }
  | { type: 'series' }
  | { type: 'serie'; id: string }
  | { type: 'autores' }
  | { type: 'autor'; id: string }
  | { type: 'busca'; query?: string }
  | { type: 'salvos' }
  | { type: 'post'; id: string };

/**
 * Dados institucionais do blog, que alimentam a introdução da página inicial, o
 * rodapé e a marca.
 */
export interface UblBlogSite {
  /** Nome do blog (o nome acessível da marca e o título do rodapé) */
  name: string;
  /** Linha de apoio: o título da página inicial */
  tagline?: string;
  /** Descrição do blog, sob o título da página inicial e no rodapé */
  description?: string;
  /** Linha de direitos do rodapé */
  copyright?: string;
}

/** Modo de cor que o contêiner está exibindo (escolhe o glifo do alternador de tema). */
export type UblBlogThemeMode = 'light' | 'dark';

/**
 * Propriedades do componente BlogApp da Unooblog.
 */
export interface UblBlogAppProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /**
   * Posts do blog. O app passa a guardar o estado a partir daqui; acompanhe por
   * `onStateChange`. Obrigatório: o módulo não embute conteúdo editorial.
   */
  posts: UblPost[];

  /**
   * Autoria dos posts (resolve `post.authorId`). Obrigatório.
   */
  authors: UblAuthor[];

  /**
   * Tópicos editoriais (resolve `post.topicIds`). Obrigatório.
   */
  topics: UblTopic[];

  /**
   * Séries (agrupam posts por `seriesId`). Obrigatório; pode ser vazio.
   */
  series: UblSeries[];

  /**
   * Comentários dos posts, planos, com respostas ligadas por `parentId`.
   * Obrigatório; pode ser vazio.
   */
  comments: UblComment[];

  /**
   * Dados do blog. Obrigatório.
   */
  site: UblBlogSite;

  /**
   * Momento de referência para "Há 2 horas" e para o horário dos comentários
   * novos. Fixe-o em demonstrações e testes; em produção, deixe vazio.
   */
  now?: Date | string;

  /**
   * Fuso de leitura das datas.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Tela aberta ao montar.
   * @default { type: 'inicio' }
   */
  initialRoute?: UblBlogRoute;

  /**
   * Tópico do filtro do feed da página inicial ao montar (`todos` não restringe).
   * @default 'todos'
   */
  initialTopicId?: string;

  /**
   * Estado inicial parcial: curtidas, salvos, seguidos, lidos, progresso e a
   * inscrição na newsletter. Só vale ao montar.
   */
  defaultState?: Partial<Omit<UblBlogState, 'posts' | 'comments'>>;

  /**
   * Modo de cor que o contêiner exibe. O alternador do cabeçalho só aparece com
   * `themeMode` **e** `onToggleTheme`.
   *
   * O app **não troca o tema por conta própria**: quem decide é o contêiner (o
   * produto troca o `data-ubl-theme` e devolve o novo `themeMode`).
   */
  themeMode?: UblBlogThemeMode;

  /**
   * Chamado ao acionar o alternador claro/escuro do cabeçalho.
   */
  onToggleTheme?: () => void;

  /**
   * Chamado a cada operação sobre o estado, antes de ela ser aplicada — útil
   * para registrar o que a pessoa fez (curtir, salvar, comentar, seguir).
   */
  onAction?: (action: UblBlogAction) => void;

  /**
   * Chamado a cada mudança do estado, com o estado inteiro.
   */
  onStateChange?: (state: UblBlogState) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
