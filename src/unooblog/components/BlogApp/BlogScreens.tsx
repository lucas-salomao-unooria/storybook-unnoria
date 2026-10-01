'use client';

import React from 'react';
import type { UblAuthor, UblComment, UblPost, UblSeries, UblTocItem, UblTopic } from '../../content';
import { ublFormatDate, ublReadingLabel } from '../../content';
import { AuthorCard } from '../AuthorCard';
import { Breadcrumb } from '../Breadcrumb';
import type { UblBreadcrumbItem } from '../Breadcrumb';
import { Button } from '../Button';
import { CommentComposer } from '../CommentComposer';
import { CommentThread } from '../CommentThread';
import { EmptyState } from '../EmptyState';
import { IconButton } from '../IconButton';
import { NewsletterSignup } from '../NewsletterSignup';
import type { UblNewsletterStatus } from '../NewsletterSignup';
import { PostBody } from '../PostBody';
import { PostCard } from '../PostCard';
import { PostHeader } from '../PostHeader';
import type { UblPostHeaderSeries } from '../PostHeader';
import { PostList } from '../PostList';
import { PostNavigation } from '../PostNavigation';
import type { UblPostNavigationDirection } from '../PostNavigation';
import { ReactionBar } from '../ReactionBar';
import { RelatedPosts } from '../RelatedPosts';
import { SearchField } from '../SearchField';
import { SeriesCard } from '../SeriesCard';
import { ShareBar } from '../ShareBar';
import { SiteFooter } from '../SiteFooter';
import { SiteHeader } from '../SiteHeader';
import type { UblSiteHeaderItem } from '../SiteHeader';
import { TableOfContents } from '../TableOfContents';
import { TopicChip } from '../TopicChip';
import { TopicCloud } from '../TopicCloud';
import type { UblTopicCloudItem } from '../TopicCloud';
import type { UblBlogSite, UblBlogThemeMode } from './BlogApp.types';
import { UBL_ALL_TOPICS } from './blogState';

/**
 * Telas do `BlogApp` como componentes puros: recebem dados e funções por props e
 * não guardam estado da aplicação. O `BlogApp` decide o que mostrar (rota,
 * filtro, busca) e o que cada gesto faz (curtir, salvar, comentar, seguir); aqui
 * só se arranja o que já foi decidido.
 */

/* ==========================================================================
   Contexto das listas
   ========================================================================== */

/**
 * O que toda lista de posts precisa: autoria, tópicos, o que a pessoa salvou e
 * leu, a contagem de comentários e o que cada gesto faz.
 */
export interface UblBlogListContext {
  authors: UblAuthor[];
  topics: UblTopic[];
  timeZone: string;
  /** Ids salvos */
  saved: string[];
  /** Ids lidos */
  read: string[];
  /** Quantidade de comentários por id de post */
  commentCounts: Record<string, number>;
  onOpen: (id: string) => void;
  onToggleSave: (id: string) => void;
}

const authorOf = (authors: UblAuthor[], post: UblPost) => authors.find((candidate) => candidate.id === post.authorId);

const postCountLabel = (count: number) => `${count} ${count === 1 ? 'post' : 'posts'}`;

/** Propriedades de `PostCard` que todas as listas repetem. */
const cardProps = (post: UblPost, context: UblBlogListContext) => {
  const author = authorOf(context.authors, post);
  const topic = context.topics.find((candidate) => candidate.id === post.topicIds[0]);
  return {
    title: post.title,
    summary: post.summary,
    coverSrc: post.coverSrc,
    coverAlt: post.coverAlt,
    topic: topic?.label,
    author: author?.name ?? 'Autoria',
    authorAvatarSrc: author?.avatarSrc,
    date: ublFormatDate(post.publishedAt, {
      style: 'short',
      timeZone: context.timeZone,
    }),
    dateTime: post.publishedAt,
    readingTime: ublReadingLabel(post.readingMinutes),
    comments: context.commentCounts[post.id] ?? 0,
    saved: context.saved.includes(post.id),
    read: context.read.includes(post.id),
    onOpen: () => context.onOpen(post.id),
  };
};

/* ==========================================================================
   Cabeçalho e rodapé
   ========================================================================== */

/** Destinos da navegação principal, na ordem do cabeçalho. */
export const BLOG_NAV_ITEMS: UblSiteHeaderItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'topicos', label: 'Tópicos' },
  { id: 'series', label: 'Séries' },
  { id: 'autores', label: 'Autores' },
];

export interface UblBlogHeaderProps {
  site: UblBlogSite;
  /** Item ativo da navegação principal */
  activeId: string;
  onNavigate: (id: string) => void;
  onSearch: () => void;
  onHome: () => void;
  themeMode?: UblBlogThemeMode;
  onToggleTheme?: () => void;
  savedCount: number;
  savedActive: boolean;
  onOpenSaved: () => void;
}

/**
 * Cabeçalho de todas as telas: a marca, a navegação principal, a busca, o
 * alternador de tema e o atalho dos posts salvos (com a contagem).
 */
export const BlogHeader: React.FC<UblBlogHeaderProps> = ({
  site,
  activeId,
  onNavigate,
  onSearch,
  onHome,
  themeMode,
  onToggleTheme,
  savedCount,
  savedActive,
  onOpenSaved,
}) => (
  <SiteHeader
    siteName={site.name}
    items={BLOG_NAV_ITEMS}
    activeId={activeId}
    onNavigate={onNavigate}
    onSearch={onSearch}
    searchLabel="Abrir a busca"
    homeHref="#inicio"
    /* O `<a>` da marca chama `onHome` com o evento do clique: o app cancela a navegação do endereço. */
    onHome={
      ((event: React.MouseEvent) => {
        event.preventDefault();
        onHome();
      }) as unknown as () => void
    }
    themeMode={themeMode}
    onToggleTheme={onToggleTheme}
    actions={
      <IconButton
        icon="bookmark"
        label="Posts salvos"
        badge={savedCount}
        aria-current={savedActive ? 'page' : undefined}
        onClick={onOpenSaved}
      />
    }
  />
);

export interface UblBlogFooterProps {
  site: UblBlogSite;
  topics: UblTopic[];
  authors: UblAuthor[];
  onNavigate: (id: string) => void;
  onOpenSaved: () => void;
  onOpenTopic: (id: string) => void;
  onOpenAuthor: (id: string) => void;
}

/** Quantos tópicos o rodapé lista. */
const FOOTER_TOPIC_LIMIT = 6;

/**
 * Rodapé do blog: a navegação, os tópicos e a autoria, tudo derivado dos dados.
 */
export const BlogFooter: React.FC<UblBlogFooterProps> = ({
  site,
  topics,
  authors,
  onNavigate,
  onOpenSaved,
  onOpenTopic,
  onOpenAuthor,
}) => (
  <SiteFooter
    siteName={site.name}
    description={site.description ?? site.tagline}
    copyright={site.copyright}
    columns={[
      {
        heading: 'Explorar',
        links: [
          ...BLOG_NAV_ITEMS.map((item) => ({
            label: item.label,
            onClick: () => onNavigate(item.id),
          })),
          { label: 'Salvos', onClick: onOpenSaved },
        ],
      },
      {
        heading: 'Tópicos',
        links: topics.slice(0, FOOTER_TOPIC_LIMIT).map((topic) => ({
          label: topic.label,
          onClick: () => onOpenTopic(topic.id),
        })),
      },
      {
        heading: 'Autoria',
        links: authors.map((author) => ({
          label: author.name,
          onClick: () => onOpenAuthor(author.id),
        })),
      },
    ]}
  />
);

/* ==========================================================================
   Peças reutilizadas
   ========================================================================== */

interface UblBlogPostGridProps {
  posts: UblPost[];
  context: UblBlogListContext;
  ariaLabel: string;
  /** `cover` monta uma grade; `horizontal` monta uma lista de uma coluna */
  variant?: 'cover' | 'horizontal';
  headingLevel?: 2 | 3 | 4;
  /** Com ele, cada cartão ganha o botão de remover (e perde o de salvar) */
  onRemove?: (id: string) => void;
  /** Rótulo de série por post (a posição na série), para a página da série */
  seriesLabels?: Record<string, string>;
  /** Mostrado no lugar da lista quando ela está vazia */
  emptyState?: React.ReactNode;
}

/**
 * A lista de posts com o estado de cada um: salvo, lido e quantos comentários tem.
 */
export const BlogPostGrid: React.FC<UblBlogPostGridProps> = ({
  posts,
  context,
  ariaLabel,
  variant = 'cover',
  headingLevel = 3,
  onRemove,
  seriesLabels,
  emptyState,
}) => {
  if (posts.length === 0) return <>{emptyState}</>;

  return (
    <PostList layout={variant === 'cover' ? 'grid' : 'list'} ariaLabel={ariaLabel}>
      {posts.map((post) => (
        <div key={post.id} className="ubl-blog-app__post-item">
          <PostCard
            {...cardProps(post, context)}
            variant={variant}
            headingLevel={headingLevel}
            series={seriesLabels?.[post.id]}
            onToggleSave={onRemove ? undefined : () => context.onToggleSave(post.id)}
          />
          {onRemove && (
            <IconButton
              icon="delete"
              label={`Remover “${post.title}” dos salvos`}
              variant="ghost"
              className="ubl-blog-app__remove"
              onClick={() => onRemove(post.id)}
            />
          )}
        </div>
      ))}
    </PostList>
  );
};

interface UblBlogPageHeadProps {
  title: string;
  lead?: string;
  /** Texto de apoio (contagem), anunciado como região viva */
  status?: string;
}

/** Título de uma tela: o `<h1>`, a linha de apoio e a contagem. */
const PageHead: React.FC<UblBlogPageHeadProps> = ({ title, lead, status }) => (
  <header className="ubl-blog-app__page-head">
    <h1 className="ubl-blog-app__page-title">{title}</h1>
    {lead && <p className="ubl-blog-app__lead">{lead}</p>}
    {status !== undefined && (
      <p role="status" aria-live="polite" className="ubl-blog-app__status">
        {status}
      </p>
    )}
  </header>
);

/* ==========================================================================
   Início
   ========================================================================== */

export interface UblHomeScreenProps extends UblBlogListContext {
  site: UblBlogSite;
  featured?: UblPost;
  /** Posts do feed, já filtrados pelo tópico */
  posts: UblPost[];
  totalCount: number;
  topicItems: UblTopicCloudItem[];
  topicFilter: string;
  /** Rótulo do tópico filtrado, para a contagem */
  topicLabel?: string;
  onTopicChange: (id: string) => void;
  series: UblSeries[];
  /** Posts já lidos de cada série */
  seriesRead: Record<string, number>;
  onOpenSeries: (id: string) => void;
  newsletterStatus: UblNewsletterStatus;
  onSubscribe: (email: string) => void;
}

/**
 * A página inicial: a introdução, o post em destaque, o feed com filtro por
 * tópico, as séries e a newsletter.
 */
export const HomeScreen: React.FC<UblHomeScreenProps> = ({
  site,
  featured,
  posts,
  totalCount,
  topicItems,
  topicFilter,
  topicLabel,
  onTopicChange,
  series,
  seriesRead,
  onOpenSeries,
  newsletterStatus,
  onSubscribe,
  ...context
}) => {
  const restricted = topicFilter !== UBL_ALL_TOPICS;
  const status = restricted
    ? `${postCountLabel(posts.length)} em ${topicLabel ?? 'este tópico'}`
    : `${postCountLabel(totalCount)} no blog`;

  return (
    <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
      <section className="ubl-blog-app__intro">
        <h1 className="ubl-blog-app__display">{site.tagline ?? site.name}</h1>
        {site.description && <p className="ubl-blog-app__lead">{site.description}</p>}
      </section>

      {featured && (
        <PostCard
          {...cardProps(featured, context)}
          variant="featured"
          headingLevel={2}
          onToggleSave={() => context.onToggleSave(featured.id)}
        />
      )}

      <section className="ubl-blog-app__section" aria-labelledby="ubl-blog-app-latest">
        <div className="ubl-blog-app__section-head">
          <h2 id="ubl-blog-app-latest" className="ubl-blog-app__section-title">
            Últimos posts
          </h2>
          <p role="status" aria-live="polite" className="ubl-blog-app__status">
            {status}
          </p>
        </div>
        <div className="ubl-blog-app__topics">
          <TopicCloud
            topics={topicItems}
            selectedId={topicFilter}
            onSelect={onTopicChange}
            ariaLabel="Filtrar posts por tópico"
          />
        </div>
        <BlogPostGrid
          posts={posts}
          context={context}
          ariaLabel="Últimos posts"
          emptyState={
            restricted ? (
              <EmptyState
                icon="article"
                title="Nenhum post neste tópico"
                description="Volte a “Todos” para ver o que já foi publicado."
                headingLevel={3}
                action={
                  <Button variant="secondary" onClick={() => onTopicChange(UBL_ALL_TOPICS)}>
                    Ver todos os posts
                  </Button>
                }
              />
            ) : (
              <EmptyState
                icon="article"
                title="Ainda não há posts"
                description="Os textos aparecem aqui assim que forem publicados."
                headingLevel={3}
              />
            )
          }
        />
      </section>

      {series.length > 0 && (
        <section className="ubl-blog-app__section" aria-labelledby="ubl-blog-app-series">
          <div className="ubl-blog-app__section-head">
            <h2 id="ubl-blog-app-series" className="ubl-blog-app__section-title">
              Séries
            </h2>
            <p className="ubl-blog-app__status">Leituras em sequência, para seguir do começo ao fim.</p>
          </div>
          <ul className="ubl-blog-app__series-list" aria-label="Séries">
            {series.map((item) => (
              <li key={item.id} className="ubl-blog-app__series-item">
                <SeriesCard
                  title={item.title}
                  description={item.description}
                  coverSrc={item.coverSrc}
                  count={item.postIds.length}
                  progress={seriesRead[item.id] ?? 0}
                  headingLevel={3}
                  onOpen={() => onOpenSeries(item.id)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="ubl-blog-app__newsletter">
        <NewsletterSignup
          description="Um e-mail por semana com os textos novos do blog. Sem spam, e você cancela quando quiser."
          status={newsletterStatus}
          onSubscribe={onSubscribe}
        />
      </div>
    </div>
  );
};

/* ==========================================================================
   Tópicos
   ========================================================================== */

export interface UblTopicsScreenProps {
  topics: UblTopic[];
  counts: Record<string, number>;
  onOpenTopic: (id: string) => void;
}

/**
 * Todos os tópicos: a nuvem com a contagem e, abaixo, o que cada um cobre.
 */
export const TopicsScreen: React.FC<UblTopicsScreenProps> = ({ topics, counts, onOpenTopic }) => (
  <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
    <PageHead
      title="Tópicos"
      lead="Os assuntos sobre os quais o blog escreve. Escolha um para ver os posts."
      status={`${topics.length} ${topics.length === 1 ? 'tópico' : 'tópicos'}`}
    />
    {topics.length === 0 ? (
      <EmptyState
        icon="topics"
        title="Nenhum tópico ainda"
        description="Os tópicos aparecem aqui assim que o primeiro post for publicado."
      />
    ) : (
      <>
        <div className="ubl-blog-app__topics ubl-blog-app__topics--large">
          <TopicCloud
            topics={topics.map((topic) => ({
              id: topic.id,
              label: topic.label,
              count: counts[topic.id] ?? 0,
            }))}
            onSelect={onOpenTopic}
            ariaLabel="Todos os tópicos"
          />
        </div>
        <dl className="ubl-blog-app__definitions">
          {topics.map((topic) => (
            <div key={topic.id} className="ubl-blog-app__definition">
              <dt>{topic.label}</dt>
              <dd>{topic.description ?? 'Posts sobre este assunto.'}</dd>
            </div>
          ))}
        </dl>
      </>
    )}
  </div>
);

export interface UblTopicScreenProps extends UblBlogListContext {
  topic?: UblTopic;
  posts: UblPost[];
  breadcrumb: UblBreadcrumbItem[];
  onGoHome: () => void;
}

/**
 * Os posts de um tópico, com a trilha de navegação.
 */
export const TopicScreen: React.FC<UblTopicScreenProps> = ({ topic, posts, breadcrumb, onGoHome, ...context }) => (
  <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
    <Breadcrumb items={breadcrumb} />
    {topic ? (
      <>
        <PageHead title={topic.label} lead={topic.description} status={postCountLabel(posts.length)} />
        <BlogPostGrid
          posts={posts}
          context={context}
          ariaLabel={`Posts de ${topic.label}`}
          emptyState={
            <EmptyState
              icon="article"
              title="Nenhum post neste tópico"
              description="Volte em breve: novos textos chegam toda semana."
              headingLevel={2}
            />
          }
        />
      </>
    ) : (
      <EmptyState
        icon="info"
        title="Tópico não encontrado"
        description="Este tópico não existe neste blog."
        action={
          <Button variant="primary" onClick={onGoHome}>
            Ir para o início
          </Button>
        }
      />
    )}
  </div>
);

/* ==========================================================================
   Séries
   ========================================================================== */

export interface UblSeriesListScreenProps {
  series: UblSeries[];
  seriesRead: Record<string, number>;
  onOpenSeries: (id: string) => void;
}

/**
 * Todas as séries, com o progresso de leitura de cada uma.
 */
export const SeriesListScreen: React.FC<UblSeriesListScreenProps> = ({ series, seriesRead, onOpenSeries }) => (
  <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
    <PageHead
      title="Séries"
      lead="Textos em sequência sobre um mesmo assunto. O progresso mostra quantos você já leu."
      status={`${series.length} ${series.length === 1 ? 'série' : 'séries'}`}
    />
    {series.length === 0 ? (
      <EmptyState
        icon="series"
        title="Nenhuma série ainda"
        description="As séries aparecem aqui quando houver textos em sequência."
      />
    ) : (
      <ul className="ubl-blog-app__series-list" aria-label="Séries">
        {series.map((item) => (
          <li key={item.id} className="ubl-blog-app__series-item">
            <SeriesCard
              title={item.title}
              description={item.description}
              coverSrc={item.coverSrc}
              count={item.postIds.length}
              progress={seriesRead[item.id] ?? 0}
              headingLevel={2}
              onOpen={() => onOpenSeries(item.id)}
            />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export interface UblSeriesScreenProps extends UblBlogListContext {
  series?: UblSeries;
  /** Posts da série, na ordem de leitura */
  posts: UblPost[];
  breadcrumb: UblBreadcrumbItem[];
  readCount: number;
  onGoHome: () => void;
}

/**
 * Uma série: o texto de apresentação, o progresso e os posts na ordem de leitura.
 */
export const SeriesScreen: React.FC<UblSeriesScreenProps> = ({
  series,
  posts,
  breadcrumb,
  readCount,
  onGoHome,
  ...context
}) => {
  const labels: Record<string, string> = {};
  posts.forEach((post, index) => {
    labels[post.id] = `Parte ${post.seriesPart ?? index + 1} de ${posts.length}`;
  });

  return (
    <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
      <Breadcrumb items={breadcrumb} />
      {series ? (
        <>
          <PageHead
            title={series.title}
            lead={series.description}
            status={`${readCount} de ${posts.length} ${posts.length === 1 ? 'post lido' : 'posts lidos'}`}
          />
          <BlogPostGrid
            posts={posts}
            context={context}
            variant="horizontal"
            ariaLabel={`Posts da série ${series.title}`}
            seriesLabels={labels}
            headingLevel={2}
          />
        </>
      ) : (
        <EmptyState
          icon="info"
          title="Série não encontrada"
          description="Esta série não existe neste blog."
          action={
            <Button variant="primary" onClick={onGoHome}>
              Ir para o início
            </Button>
          }
        />
      )}
    </div>
  );
};

/* ==========================================================================
   Autoria
   ========================================================================== */

export interface UblAuthorsScreenProps {
  authors: UblAuthor[];
  following: string[];
  followerCount: (author: UblAuthor) => number;
  onOpenAuthor: (id: string) => void;
  onToggleFollow: (id: string) => void;
}

/**
 * Cliques no cartão de autoria abrem o perfil, menos os do botão de seguir. O
 * nome do cartão é um link (`href`) para que haja um alvo de teclado; o app
 * cancela a navegação do endereço e troca a tela.
 */
const openFromCard = (onOpen: () => void) => (event: React.MouseEvent<HTMLElement>) => {
  if ((event.target as HTMLElement).closest('button')) return;
  event.preventDefault();
  onOpen();
};

/**
 * Toda a autoria: um cartão por pessoa, com seguir e o caminho para o perfil.
 */
export const AuthorsScreen: React.FC<UblAuthorsScreenProps> = ({
  authors,
  following,
  followerCount,
  onOpenAuthor,
  onToggleFollow,
}) => (
  <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
    <PageHead
      title="Autores"
      lead="Quem escreve no blog. Siga quem você quer acompanhar e abra o perfil para ver todos os posts."
      status={`${authors.length} ${authors.length === 1 ? 'pessoa' : 'pessoas'}`}
    />
    {authors.length === 0 ? (
      <EmptyState
        icon="authors"
        title="Nenhuma autoria ainda"
        description="A autoria aparece aqui quando houver posts publicados."
      />
    ) : (
      <ul className="ubl-blog-app__author-list" aria-label="Autores">
        {authors.map((author) => (
          <li key={author.id} className="ubl-blog-app__author-item">
            <AuthorCard
              name={author.name}
              role={author.role}
              bio={author.bio}
              avatarSrc={author.avatarSrc}
              followers={followerCount(author)}
              following={following.includes(author.id)}
              onToggleFollow={() => onToggleFollow(author.id)}
              href={`#autor-${author.id}`}
              onClick={openFromCard(() => onOpenAuthor(author.id))}
            />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export interface UblAuthorScreenProps extends UblBlogListContext {
  author?: UblAuthor;
  posts: UblPost[];
  breadcrumb: UblBreadcrumbItem[];
  following: boolean;
  followerCount: number;
  onToggleFollow: () => void;
  onGoHome: () => void;
}

/**
 * Uma autoria: o cartão com seguir e os posts dela, do mais recente ao mais antigo.
 */
export const AuthorScreen: React.FC<UblAuthorScreenProps> = ({
  author,
  posts,
  breadcrumb,
  following,
  followerCount,
  onToggleFollow,
  onGoHome,
  ...context
}) => (
  <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
    <Breadcrumb items={breadcrumb} />
    {author ? (
      <>
        <h1 className="ubl-blog-app__sr-only">{author.name}</h1>
        <AuthorCard
          name={author.name}
          role={author.role}
          bio={author.bio}
          avatarSrc={author.avatarSrc}
          followers={followerCount}
          following={following}
          onToggleFollow={onToggleFollow}
        />
        <section className="ubl-blog-app__section" aria-labelledby="ubl-blog-app-author-posts">
          <div className="ubl-blog-app__section-head">
            <h2 id="ubl-blog-app-author-posts" className="ubl-blog-app__section-title">
              Posts de {author.name}
            </h2>
            <p role="status" aria-live="polite" className="ubl-blog-app__status">
              {postCountLabel(posts.length)}
            </p>
          </div>
          <BlogPostGrid posts={posts} context={context} ariaLabel={`Posts de ${author.name}`} />
        </section>
      </>
    ) : (
      <EmptyState
        icon="info"
        title="Autoria não encontrada"
        description="Esta pessoa não escreve neste blog."
        action={
          <Button variant="primary" onClick={onGoHome}>
            Ir para o início
          </Button>
        }
      />
    )}
  </div>
);

/* ==========================================================================
   Busca
   ========================================================================== */

export interface UblSearchScreenProps extends UblBlogListContext {
  query: string;
  results: UblPost[];
  onQueryChange: (value: string) => void;
  onQuerySubmit: (value: string) => void;
  onOpenTopic: (id: string) => void;
}

/**
 * Resultados da busca. O campo não é controlado: o texto mora no DOM e a rota só
 * guarda o que foi digitado. A contagem fica numa região viva, para o leitor de
 * tela ouvir o resultado a cada consulta; sem consulta, a tela sugere os tópicos.
 */
export const SearchScreen: React.FC<UblSearchScreenProps> = ({
  query,
  results,
  onQueryChange,
  onQuerySubmit,
  onOpenTopic,
  ...context
}) => {
  const term = query.trim();
  const status = !term
    ? ''
    : results.length === 0
      ? `Nenhum resultado para "${term}"`
      : `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} para "${term}"`;

  return (
    <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
      <header className="ubl-blog-app__page-head">
        <h1 className="ubl-blog-app__page-title">Busca</h1>
        <div className="ubl-blog-app__search">
          <SearchField defaultValue={query} onValueChange={onQueryChange} onSubmit={onQuerySubmit} />
        </div>
        <p role="status" aria-live="polite" className="ubl-blog-app__status">
          {status}
        </p>
      </header>

      {!term ? (
        <EmptyState
          icon="search"
          title="O que você procura?"
          description="Digite um assunto, um título ou o nome de quem assina. A busca ignora acentos e casa pelo começo das palavras."
          headingLevel={2}
          action={
            <div className="ubl-blog-app__suggestions" role="group" aria-label="Sugestões de tópico">
              {context.topics.map((topic) => (
                <TopicChip key={topic.id} onClick={() => onOpenTopic(topic.id)}>
                  {topic.label}
                </TopicChip>
              ))}
            </div>
          }
        />
      ) : (
        <BlogPostGrid
          posts={results}
          context={context}
          variant="horizontal"
          ariaLabel="Resultados da busca"
          headingLevel={2}
          emptyState={
            <EmptyState
              icon="search"
              title="Nada encontrado"
              description={`Não encontramos nada para “${term}”. Tente outra palavra ou explore os tópicos do blog.`}
              headingLevel={2}
              action={
                <div className="ubl-blog-app__suggestions" role="group" aria-label="Sugestões de tópico">
                  {context.topics.slice(0, 4).map((topic) => (
                    <TopicChip key={topic.id} onClick={() => onOpenTopic(topic.id)}>
                      {topic.label}
                    </TopicChip>
                  ))}
                </div>
              }
            />
          }
        />
      )}
    </div>
  );
};

/* ==========================================================================
   Salvos
   ========================================================================== */

export interface UblSavedScreenProps extends UblBlogListContext {
  posts: UblPost[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onBrowse: () => void;
}

/**
 * Os posts salvos para ler depois, o mais recente primeiro, com remover.
 */
export const SavedScreen: React.FC<UblSavedScreenProps> = ({ posts, onRemove, onClear, onBrowse, ...context }) => (
  <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
    <PageHead
      title="Salvos"
      lead="Posts guardados para ler com calma. Eles ficam aqui até você removê-los."
      status={postCountLabel(posts.length)}
    />
    {posts.length > 1 && (
      <div className="ubl-blog-app__toolbar">
        <Button variant="ghost" size="sm" iconStart="delete" onClick={onClear}>
          Remover todos
        </Button>
      </div>
    )}
    <BlogPostGrid
      posts={posts}
      context={context}
      variant="horizontal"
      ariaLabel="Posts salvos"
      headingLevel={2}
      onRemove={onRemove}
      emptyState={
        <EmptyState
          icon="bookmark"
          title="Nada salvo por aqui"
          description="Use o marcador de um post para guardá-lo e ler com calma depois."
          headingLevel={2}
          action={
            <Button variant="primary" onClick={onBrowse}>
              Ver os últimos posts
            </Button>
          }
        />
      }
    />
  </div>
);

/* ==========================================================================
   Post
   ========================================================================== */

export interface UblPostScreenProps {
  post?: UblPost;
  author?: UblAuthor;
  breadcrumb: UblBreadcrumbItem[];
  topicLabels: string[];
  /** "Parte N de M", quando o post pertence a uma série */
  seriesInfo?: UblPostHeaderSeries;
  topics: UblTopic[];
  authors: UblAuthor[];
  timeZone: string;
  now: Date | string;

  /** Sumário: itens, item em leitura e onde ele aparece */
  tocItems: UblTocItem[];
  activeTocId?: string;
  tocLayout: 'sidebar' | 'inline';
  onSelectToc: (id: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Cliques no corpo (a âncora dos intertítulos rola o contêiner do app) */
  onBodyClick: React.MouseEventHandler<HTMLDivElement>;

  /** Reações */
  liked: boolean;
  likeCount: number;
  saved: boolean;
  commentCount: number;
  onToggleLike: () => void;
  onToggleSave: () => void;
  onOpenComments: () => void;
  onShare: () => void;
  onCopyLink: () => void;

  /** Autoria */
  following: boolean;
  followerCount: number;
  onToggleFollow: () => void;
  onOpenAuthor: () => void;

  /** Navegação entre posts */
  previous?: UblPost;
  next?: UblPost;
  onNavigate: (direction: UblPostNavigationDirection) => void;
  related: UblPost[];
  onOpenPost: (id: string) => void;

  /** Comentários */
  comments: UblComment[];
  likedCommentIds: string[];
  highlightedCommentId?: string;
  replyingToId?: string;
  /** Erro do último envio e a quem ele pertence (`null`: ao comentário novo) */
  commentError?: { parentId: string | null; message: string };
  onToggleCommentLike: (id: string) => void;
  onReply: (id: string) => void;
  onDeleteComment: (id: string) => void;
  onSubmitComment: (text: string, parentId: string | null) => void;
  onCancelReply: () => void;
  onClearCommentError: () => void;

  /** Newsletter */
  newsletterStatus: UblNewsletterStatus;
  onSubscribe: (email: string) => void;

  /** Para o app medir a rolagem e mover o foco */
  articleRef: React.Ref<HTMLElement>;
  commentsRef: React.Ref<HTMLElement>;
  onGoHome: () => void;
}

/**
 * O post aberto: a trilha, o cabeçalho, o sumário, as reações, o corpo, a
 * autoria, a navegação entre posts, o "Continue lendo", os comentários e a
 * newsletter. No contêiner largo o sumário fica ao lado do texto; abaixo disso,
 * vira um bloco recolhível no topo.
 */
export const PostScreen: React.FC<UblPostScreenProps> = ({
  post,
  author,
  breadcrumb,
  topicLabels,
  seriesInfo,
  topics,
  authors,
  timeZone,
  now,
  tocItems,
  activeTocId,
  tocLayout,
  onSelectToc,
  onBodyClick,
  liked,
  likeCount,
  saved,
  commentCount,
  onToggleLike,
  onToggleSave,
  onOpenComments,
  onShare,
  onCopyLink,
  following,
  followerCount,
  onToggleFollow,
  onOpenAuthor,
  previous,
  next,
  onNavigate,
  related,
  onOpenPost,
  comments,
  likedCommentIds,
  highlightedCommentId,
  replyingToId,
  commentError,
  onToggleCommentLike,
  onReply,
  onDeleteComment,
  onSubmitComment,
  onCancelReply,
  onClearCommentError,
  newsletterStatus,
  onSubscribe,
  articleRef,
  commentsRef,
  onGoHome,
}) => {
  if (!post) {
    return (
      <div className="ubl-blog-app__wrap ubl-blog-app__screen-body">
        <EmptyState
          icon="info"
          title="Post não encontrado"
          description="Este post não está mais no blog."
          action={
            <Button variant="primary" onClick={onGoHome}>
              Ir para o início
            </Button>
          }
        />
      </div>
    );
  }

  const showSidebar = tocLayout === 'sidebar' && tocItems.length > 0;
  const showInline = tocLayout === 'inline' && tocItems.length > 0;

  const relatedItems = related.map((item) => {
    const itemAuthor = authors.find((candidate) => candidate.id === item.authorId);
    const topic = topics.find((candidate) => candidate.id === item.topicIds[0]);
    return {
      id: item.id,
      title: item.title,
      summary: item.summary,
      coverSrc: item.coverSrc,
      coverAlt: item.coverAlt,
      topic: topic?.label,
      author: itemAuthor?.name ?? 'Autoria',
      authorAvatarSrc: itemAuthor?.avatarSrc,
      date: ublFormatDate(item.publishedAt, { style: 'short', timeZone }),
      dateTime: item.publishedAt,
      readingTime: ublReadingLabel(item.readingMinutes),
    };
  });

  const errorFor = (parentId: string | null) =>
    commentError && commentError.parentId === parentId ? commentError.message : undefined;

  return (
    <article ref={articleRef} className="ubl-blog-app__post" aria-label={post.title}>
      <div className="ubl-blog-app__wrap ubl-blog-app__screen-body ubl-blog-app__post-body">
        <div className="ubl-blog-app__post-frame">
          <Breadcrumb items={breadcrumb} />
          <div className="ubl-blog-app__post-head">
            <PostHeader
              title={post.title}
              subtitle={post.subtitle}
              topics={topicLabels}
              series={seriesInfo}
              author={author?.name ?? 'Autoria'}
              authorRole={author?.role}
              avatarSrc={author?.avatarSrc}
              date={ublFormatDate(post.publishedAt, {
                style: 'long',
                timeZone,
              })}
              dateTime={post.publishedAt}
              updated={post.updatedAt ? ublFormatDate(post.updatedAt, { style: 'long', timeZone }) : undefined}
              readingTime={post.readingMinutes}
              coverSrc={post.coverSrc}
              coverAlt={post.coverAlt}
            />
          </div>

          <div className="ubl-blog-app__post-grid">
            <div className="ubl-blog-app__post-main">
              {showInline && (
                <TableOfContents variant="inline" items={tocItems} activeId={activeTocId} onSelect={onSelectToc} />
              )}

              <div className="ubl-blog-app__post-tools">
                <ReactionBar
                  likes={likeCount}
                  liked={liked}
                  onToggleLike={onToggleLike}
                  comments={commentCount}
                  onOpenComments={onOpenComments}
                  saved={saved}
                  onToggleSave={onToggleSave}
                />
                <ShareBar onShare={onShare} onCopyLink={onCopyLink} />
              </div>

              <PostBody blocks={post.body} onClick={onBodyClick} />

              <AuthorCard
                name={author?.name ?? 'Autoria'}
                role={author?.role}
                bio={author?.bio}
                avatarSrc={author?.avatarSrc}
                followers={followerCount}
                following={following}
                onToggleFollow={author ? onToggleFollow : undefined}
                href={author ? `#autor-${author.id}` : undefined}
                onClick={author ? openFromCard(onOpenAuthor) : undefined}
              />

              {(previous || next) && (
                <PostNavigation
                  previous={previous ? { title: previous.title } : undefined}
                  next={next ? { title: next.title } : undefined}
                  onNavigate={onNavigate}
                />
              )}

              <CommentThread
                ref={commentsRef}
                tabIndex={-1}
                comments={comments}
                now={now}
                timeZone={timeZone}
                likedIds={likedCommentIds}
                highlightedId={highlightedCommentId}
                replyingToId={replyingToId}
                onToggleLike={onToggleCommentLike}
                onReply={onReply}
                onDelete={onDeleteComment}
                composer={
                  <CommentComposer
                    name="Você"
                    error={errorFor(null)}
                    onValueChange={onClearCommentError}
                    onSubmit={(text) => onSubmitComment(text, null)}
                  />
                }
                renderComposer={(parentId) => {
                  const parent = comments.find((candidate) => candidate.id === parentId);
                  return (
                    <div data-ubl-reply-composer="">
                      <CommentComposer
                        name="Você"
                        replyingTo={parent?.authorName}
                        error={errorFor(parentId)}
                        onValueChange={onClearCommentError}
                        onSubmit={(text) => onSubmitComment(text, parentId)}
                        onCancel={onCancelReply}
                      />
                    </div>
                  );
                }}
              />
            </div>

            {showSidebar && (
              <aside className="ubl-blog-app__post-aside">
                <TableOfContents items={tocItems} activeId={activeTocId} onSelect={onSelectToc} />
              </aside>
            )}
          </div>
        </div>

        {relatedItems.length > 0 && <RelatedPosts items={relatedItems} onOpen={onOpenPost} />}

        <div className="ubl-blog-app__newsletter">
          <NewsletterSignup status={newsletterStatus} onSubscribe={onSubscribe} />
        </div>
      </div>
    </article>
  );
};
