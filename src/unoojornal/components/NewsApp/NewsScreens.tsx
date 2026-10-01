'use client';

import React from 'react';
import type {
  UjnAgendaEvent,
  UjnArticle,
  UjnAuthor,
  UjnBlock,
  UjnGalleryPhoto,
  UjnQuoteBlock,
  UjnSection,
  UjnTextSize,
} from '../../edition';
import { ujnDayMonth, ujnFormatDate, ujnReadingLabel, ujnTimeAgo } from '../../edition';
import { AgendaList } from '../AgendaList';
import { ArticleBody } from '../ArticleBody';
import { ArticleHeader } from '../ArticleHeader';
import { ArticleListItem } from '../ArticleListItem';
import { Button } from '../Button';
import { CorrectionNote } from '../CorrectionNote';
import { EditionBar } from '../EditionBar';
import { EmptyState } from '../EmptyState';
import { FeaturedStory } from '../FeaturedStory';
import { Figure } from '../Figure';
import { FilterBar } from '../FilterBar';
import { FilterPill } from '../FilterPill';
import { Footer } from '../Footer';
import { GalleryGrid } from '../GalleryGrid';
import { GalleryImage } from '../GalleryImage';
import { IconButton } from '../IconButton';
import { MainNav } from '../MainNav';
import type { UjnMainNavItem } from '../MainNav';
import { Masthead } from '../Masthead';
import { OpinionBox } from '../OpinionBox';
import { PullQuote } from '../PullQuote';
import { RelatedArticles } from '../RelatedArticles';
import { SearchField } from '../SearchField';
import { SectionHeading } from '../SectionHeading';
import { ShareBar } from '../ShareBar';
import type { UjnNewsPublication } from './NewsApp.types';
import type { UjnSectionFilter } from './newsState';

/**
 * Telas do `NewsApp` como componentes puros: recebem dados e funções por props e
 * não guardam estado da aplicação. O `NewsApp` decide o que mostrar (rota,
 * filtro, busca) e o que cada gesto faz (salvar, abrir, escrever uma carta);
 * aqui só se arranja o que já foi decidido.
 */

/* ==========================================================================
   Contexto das listas
   ========================================================================== */

/**
 * O que toda lista de matérias precisa: autoria, referência de tempo, o que o
 * leitor salvou e leu, e o que cada gesto faz.
 */
export interface UjnNewsListContext {
  authors: UjnAuthor[];
  now: Date | string;
  timeZone: string;
  /** Ids salvos */
  saved: string[];
  /** Ids lidos */
  read: string[];
  onOpen: (id: string) => void;
  onToggleSave: (id: string, nextSaved: boolean) => void;
}

const authorOf = (authors: UjnAuthor[], article: UjnArticle) =>
  authors.find((candidate) => candidate.id === article.authorId);

const articleCountLabel = (count: number) => `${count} ${count === 1 ? 'matéria' : 'matérias'}`;

/* ==========================================================================
   Cabeçalho e rodapé
   ========================================================================== */

export interface UjnNewsHeaderProps {
  publication: UjnNewsPublication;
  /** A data da edição, já escrita ("Sexta-feira, 20 de março de 2026") */
  dateLabel: string;
  navItems: UjnMainNavItem[];
  activeNavId: string;
  onNavigate: (id: string) => void;
  /** Muda para recriar o campo de busca (limpa o texto) */
  searchKey: number;
  searchDefault: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  savedCount: number;
  savedActive: boolean;
  onOpenSaved: () => void;
}

/**
 * Faixa de edição, título, navegação principal e a linha de ferramentas (busca e
 * matérias salvas). É o cabeçalho de todas as telas, menos a da matéria.
 */
export const NewsHeader: React.FC<UjnNewsHeaderProps> = ({
  publication,
  dateLabel,
  navItems,
  activeNavId,
  onNavigate,
  searchKey,
  searchDefault,
  onSearchChange,
  onSearchSubmit,
  savedCount,
  savedActive,
  onOpenSaved,
}) => (
  <header className="ujn-news-app__header">
    <EditionBar
      institution={publication.institution}
      edition={publication.edition}
      date={dateLabel}
      updatedLabel={publication.updatedLabel}
    />
    <Masthead title={publication.name} tagline={publication.tagline} />
    <MainNav items={navItems} activeId={activeNavId} onNavigate={onNavigate} />
    <div className="ujn-news-app__wrap ujn-news-app__tools">
      <SearchField
        key={searchKey}
        defaultValue={searchDefault}
        onValueChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
      <IconButton
        icon="bookmark"
        label="Matérias salvas"
        variant="outline"
        badge={savedCount}
        aria-current={savedActive ? 'page' : undefined}
        onClick={onOpenSaved}
      />
    </div>
  </header>
);

export interface UjnNewsFooterProps {
  publication: UjnNewsPublication;
  authors: UjnAuthor[];
}

/**
 * Rodapé da publicação: quem faz o jornal, a edição e como falar com a redação.
 * Tudo derivado dos dados da publicação e da autoria.
 */
export const NewsFooter: React.FC<UjnNewsFooterProps> = ({ publication, authors }) => (
  <Footer
    title={publication.name}
    description={publication.description}
    copyright={publication.copyright}
    note={publication.note}
  >
    <Footer.Column heading="Redação">
      {authors.length === 0 ? (
        <p>Feito por estudantes de {publication.institution}.</p>
      ) : (
        authors.map((author) => (
          <p key={author.id}>
            {author.name} · {author.role}
          </p>
        ))
      )}
    </Footer.Column>
    <Footer.Column heading="Edição & Orientação">
      <p>{publication.edition}</p>
      {publication.updatedLabel && <p>{publication.updatedLabel}</p>}
      <p>Produzido pelos estudantes de {publication.institution}, com a orientação do corpo docente.</p>
    </Footer.Column>
    <Footer.Column heading="Contato & Expediente">
      <p>
        Sugestões de pauta, correções e cartas chegam à redação pelo botão “Escrever à redação”, ao final de cada
        matéria.
      </p>
      <p>{publication.institution}</p>
    </Footer.Column>
  </Footer>
);

/* ==========================================================================
   Lista de matérias
   ========================================================================== */

export interface UjnNewsArticleListProps extends UjnNewsListContext {
  articles: UjnArticle[];
  /** Nome da lista para leitores de tela */
  ariaLabel: string;
  /** Mostrado no lugar da lista quando ela está vazia */
  emptyState?: React.ReactNode;
  /** Com ele, cada linha ganha o botão de remover (e perde o de salvar) */
  onRemove?: (id: string) => void;
}

/**
 * A lista de matérias com o estado de cada uma: salva, lida e quanto tempo faz.
 */
export const NewsArticleList: React.FC<UjnNewsArticleListProps> = ({
  articles,
  ariaLabel,
  emptyState,
  authors,
  now,
  timeZone,
  saved,
  read,
  onOpen,
  onToggleSave,
  onRemove,
}) => {
  if (articles.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <ul className="ujn-news-app__list" role="list" aria-label={ariaLabel}>
      {articles.map((article) => {
        const author = authorOf(authors, article);
        return (
          <li
            key={article.id}
            className={['ujn-news-app__list-item', onRemove ? 'ujn-news-app__list-item--removable' : '']
              .filter(Boolean)
              .join(' ')}
          >
            <ArticleListItem
              kicker={article.kicker}
              timeAgo={ujnTimeAgo(article.publishedAt, now, timeZone)}
              title={article.title}
              summary={article.summary}
              author={author?.name ?? 'Redação'}
              authorRole={author?.role}
              readingTime={ujnReadingLabel(article.readingMinutes)}
              read={read.includes(article.id)}
              saved={saved.includes(article.id)}
              onOpen={() => onOpen(article.id)}
              onToggleSave={onRemove ? undefined : (next) => onToggleSave(article.id, next)}
            />
            {onRemove && (
              <IconButton
                icon="delete"
                label={`Remover “${article.title}” das salvas`}
                variant="ghost"
                className="ujn-news-app__remove"
                onClick={() => onRemove(article.id)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

/* ==========================================================================
   Barra lateral
   ========================================================================== */

export interface UjnNewsAsideProps {
  /** A matéria de opinião em destaque */
  opinion?: UjnArticle;
  authors: UjnAuthor[];
  /** Próximos compromissos */
  upcoming: UjnAgendaEvent[];
  timeZone: string;
  onOpen: (id: string) => void;
}

const eventTime = (event: UjnAgendaEvent) => [event.time, event.place].filter(Boolean).join(' · ') || undefined;

/**
 * Barra lateral: a opinião em destaque e os próximos compromissos da escola.
 */
export const NewsAside: React.FC<UjnNewsAsideProps> = ({ opinion, authors, upcoming, timeZone, onOpen }) => {
  const author = opinion ? authorOf(authors, opinion) : undefined;
  const quote = opinion?.body.find((block): block is UjnQuoteBlock => block.type === 'quote');

  return (
    <aside className="ujn-news-app__aside" aria-label="Opinião e agenda">
      {opinion && (
        <OpinionBox
          title={opinion.title}
          quote={quote?.text ?? opinion.summary}
          author={author?.name ?? 'Redação'}
          meta={author?.role}
          onOpen={() => onOpen(opinion.id)}
        />
      )}
      {upcoming.length > 0 && (
        <AgendaList>
          {upcoming.map((event) => {
            const { day, month } = ujnDayMonth(event.date, { timeZone });
            return <AgendaList.Item key={event.id} day={day} month={month} title={event.title} time={eventTime(event)} />;
          })}
        </AgendaList>
      )}
    </aside>
  );
};

/* ==========================================================================
   Coluna "Últimas notícias" (capa e seção)
   ========================================================================== */

interface LatestColumnProps extends UjnNewsListContext {
  title: string;
  meta: string;
  filterItems: { id: string; label: string; count: number }[];
  filter: UjnSectionFilter;
  onFilterChange: (id: UjnSectionFilter) => void;
  articles: UjnArticle[];
}

const LatestColumn: React.FC<LatestColumnProps> = ({
  title,
  meta,
  filterItems,
  filter,
  onFilterChange,
  articles,
  ...context
}) => (
  <section className="ujn-news-app__column">
    <SectionHeading title={title} meta={meta} rule />
    <FilterBar
      items={filterItems}
      value={filter}
      onValueChange={(id) => onFilterChange(id as UjnSectionFilter)}
      ariaLabel="Filtrar matérias por seção"
    />
    <NewsArticleList
      {...context}
      articles={articles}
      ariaLabel={title}
      emptyState={
        <EmptyState
          icon="latest"
          title="Nenhuma matéria nesta seção"
          description="Volte a “Todas” para ver o que saiu nesta edição."
          headingLevel={3}
          action={
            <Button variant="secondary" onClick={() => onFilterChange('todas')}>
              Ver todas as matérias
            </Button>
          }
        />
      }
    />
  </section>
);

/* ==========================================================================
   Capa
   ========================================================================== */

export interface UjnCoverScreenProps extends UjnNewsListContext {
  featured?: UjnArticle;
  articles: UjnArticle[];
  totalCount: number;
  filterItems: { id: string; label: string; count: number }[];
  filter: UjnSectionFilter;
  /** Rótulo da seção filtrada, para a contagem */
  filterLabel?: string;
  onFilterChange: (id: UjnSectionFilter) => void;
  opinion?: UjnArticle;
  upcoming: UjnAgendaEvent[];
  gallery: UjnGalleryPhoto[];
  onOpenPhoto: (id: string) => void;
  onViewGallery: () => void;
}

/**
 * A capa: matéria principal, últimas notícias com filtro, barra lateral e a
 * galeria da semana.
 */
export const CoverScreen: React.FC<UjnCoverScreenProps> = ({
  featured,
  totalCount,
  filter,
  filterLabel,
  opinion,
  upcoming,
  gallery,
  onOpenPhoto,
  onViewGallery,
  articles,
  ...rest
}) => {
  const featuredAuthor = featured ? authorOf(rest.authors, featured) : undefined;
  const meta =
    filter === 'todas' ? `${articleCountLabel(totalCount)} nesta edição` : `${articleCountLabel(articles.length)} em ${filterLabel ?? ''}`.trim();

  return (
    <div className="ujn-news-app__wrap ujn-news-app__screen-body">
      {featured && (
        <FeaturedStory
          kicker={featured.kicker}
          title={featured.title}
          summary={featured.summary}
          imageSrc={featured.imageSrc}
          imageAlt={featured.imageAlt}
          author={featuredAuthor?.name ?? 'Redação'}
          authorRole={featuredAuthor?.role}
          readingTime={ujnReadingLabel(featured.readingMinutes)}
          onOpen={() => rest.onOpen(featured.id)}
        />
      )}

      <div className="ujn-news-app__columns">
        <LatestColumn
          {...rest}
          title="Últimas notícias"
          meta={meta}
          filter={filter}
          articles={articles}
        />
        <NewsAside
          opinion={opinion}
          authors={rest.authors}
          upcoming={upcoming}
          timeZone={rest.timeZone}
          onOpen={rest.onOpen}
        />
      </div>

      {gallery.length > 0 && (
        <section className="ujn-news-app__section">
          <SectionHeading title="Galeria da semana" actionLabel="Ver todas as fotos" onAction={onViewGallery} rule />
          <GalleryGrid columns={4}>
            {gallery.slice(0, 4).map((photo) => (
              <GalleryImage
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                credit={photo.credit}
                onOpen={() => onOpenPhoto(photo.id)}
              />
            ))}
          </GalleryGrid>
        </section>
      )}
    </div>
  );
};

/* ==========================================================================
   Seção
   ========================================================================== */

export interface UjnSectionScreenProps extends UjnNewsListContext {
  /** Título da tela ("Últimas notícias", "Opinião") */
  title: string;
  articles: UjnArticle[];
  totalCount: number;
  filterItems: { id: string; label: string; count: number }[];
  filter: UjnSectionFilter;
  filterLabel?: string;
  onFilterChange: (id: UjnSectionFilter) => void;
  opinion?: UjnArticle;
  upcoming: UjnAgendaEvent[];
}

/**
 * Uma seção do jornal: o título, as pílulas de filtro e a lista, com a barra
 * lateral ao lado quando o contêiner é largo.
 */
export const SectionScreen: React.FC<UjnSectionScreenProps> = ({
  title,
  totalCount,
  filter,
  filterLabel,
  opinion,
  upcoming,
  articles,
  ...rest
}) => (
  <div className="ujn-news-app__wrap ujn-news-app__screen-body">
    <div className="ujn-news-app__columns">
      <LatestColumn
        {...rest}
        title={title}
        meta={
          filter === 'todas'
            ? `${articleCountLabel(totalCount)} nesta edição`
            : `${articleCountLabel(articles.length)} em ${filterLabel ?? ''}`.trim()
        }
        filter={filter}
        articles={articles}
      />
      <NewsAside
        opinion={opinion}
        authors={rest.authors}
        upcoming={upcoming}
        timeZone={rest.timeZone}
        onOpen={rest.onOpen}
      />
    </div>
  </div>
);

/* ==========================================================================
   Galeria
   ========================================================================== */

export interface UjnGalleryScreenProps {
  photos: UjnGalleryPhoto[];
  onOpenPhoto: (id: string) => void;
}

/**
 * A galeria inteira: todas as fotografias da edição, com legenda e crédito.
 */
export const GalleryScreen: React.FC<UjnGalleryScreenProps> = ({ photos, onOpenPhoto }) => (
  <div className="ujn-news-app__wrap ujn-news-app__screen-body">
    <section className="ujn-news-app__section ujn-news-app__section--first">
      <SectionHeading
        title="Galeria"
        meta={`${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'}`}
        rule
      />
      {photos.length === 0 ? (
        <EmptyState
          icon="gallery"
          title="Ainda não há fotos nesta edição"
          description="As fotografias da semana aparecem aqui assim que a redação as publicar."
          headingLevel={3}
        />
      ) : (
        <GalleryGrid columns={4} aria-label="Fotografias da edição">
          {photos.map((photo) => (
            <GalleryImage
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              credit={photo.credit}
              onOpen={() => onOpenPhoto(photo.id)}
            />
          ))}
        </GalleryGrid>
      )}
    </section>
  </div>
);

/* ==========================================================================
   Agenda
   ========================================================================== */

export interface UjnAgendaScreenProps {
  events: UjnAgendaEvent[];
  timeZone: string;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "Março de 2026" a partir de um dia de calendário. */
const monthTitle = (date: string, timeZone: string) =>
  capitalize(ujnFormatDate(date, { style: 'long', timeZone }).replace(/^\d{1,2} de /, ''));

/**
 * Todos os compromissos da escola, em ordem de data e agrupados por mês, cada um
 * com a tarja do dia.
 */
export const AgendaScreen: React.FC<UjnAgendaScreenProps> = ({ events, timeZone }) => {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const groups: { key: string; title: string; events: UjnAgendaEvent[] }[] = [];
  sorted.forEach((event) => {
    const key = event.date.slice(0, 7);
    const group = groups.find((candidate) => candidate.key === key);
    if (group) {
      group.events.push(event);
    } else {
      groups.push({ key, title: monthTitle(event.date, timeZone), events: [event] });
    }
  });

  return (
    <div className="ujn-news-app__wrap ujn-news-app__screen-body">
      <section className="ujn-news-app__section ujn-news-app__section--first ujn-news-app__reading">
        <SectionHeading
          title="Agenda da escola"
          meta={`${events.length} ${events.length === 1 ? 'compromisso' : 'compromissos'}`}
          rule
        />
        {groups.length === 0 ? (
          <EmptyState
            icon="agenda"
            title="Nenhum compromisso marcado"
            description="Os próximos eventos da escola aparecem aqui."
            headingLevel={3}
          />
        ) : (
          <div className="ujn-news-app__agenda">
            {groups.map((group) => (
              <AgendaList key={group.key} title={group.title}>
                {group.events.map((event) => {
                  const { day, month } = ujnDayMonth(event.date, { timeZone });
                  return (
                    <AgendaList.Item key={event.id} day={day} month={month} title={event.title} time={eventTime(event)} />
                  );
                })}
              </AgendaList>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

/* ==========================================================================
   Busca
   ========================================================================== */

export interface UjnSearchScreenProps extends UjnNewsListContext {
  query: string;
  results: UjnArticle[];
  sections: UjnSection[];
  onPickSection: (id: UjnSectionFilter) => void;
}

/**
 * Resultados da busca. A contagem fica numa região viva, para o leitor de tela
 * ouvir o resultado a cada consulta; sem consulta, a tela sugere as seções.
 */
export const SearchScreen: React.FC<UjnSearchScreenProps> = ({
  query,
  results,
  sections,
  onPickSection,
  ...context
}) => {
  const term = query.trim();
  const status = !term
    ? ''
    : results.length === 0
      ? `Nenhum resultado para "${term}"`
      : `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} para "${term}"`;

  return (
    <div className="ujn-news-app__wrap ujn-news-app__screen-body">
      <section className="ujn-news-app__section ujn-news-app__section--first ujn-news-app__reading">
        <SectionHeading title="Busca" rule />
        <p role="status" aria-live="polite" className="ujn-news-app__status">
          {status}
        </p>

        {!term ? (
          <EmptyState
            icon="search"
            title="O que você procura?"
            description="Digite um assunto, um título ou o nome de quem assina. A busca ignora acentos e casa pelo começo das palavras."
            headingLevel={3}
            action={
              <div className="ujn-news-app__suggestions" role="group" aria-label="Sugestões de seção">
                {sections.map((section) => (
                  <FilterPill key={section.id} onClick={() => onPickSection(section.id)}>
                    {section.label}
                  </FilterPill>
                ))}
              </div>
            }
          />
        ) : (
          <NewsArticleList
            {...context}
            articles={results}
            ariaLabel="Resultados da busca"
            emptyState={
              <EmptyState
                icon="search"
                title="Nada encontrado"
                description={`Não encontramos nada para “${term}”. Tente outra palavra ou veja todas as matérias da edição.`}
                headingLevel={3}
                action={
                  <Button variant="secondary" onClick={() => onPickSection('todas')}>
                    Ver todas as matérias
                  </Button>
                }
              />
            }
          />
        )}
      </section>
    </div>
  );
};

/* ==========================================================================
   Salvos
   ========================================================================== */

export interface UjnSavedScreenProps extends UjnNewsListContext {
  articles: UjnArticle[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onBrowse: () => void;
}

/**
 * As matérias salvas para ler depois, a mais recente primeiro, com remover.
 */
export const SavedScreen: React.FC<UjnSavedScreenProps> = ({
  articles,
  onRemove,
  onClear,
  onBrowse,
  ...context
}) => (
  <div className="ujn-news-app__wrap ujn-news-app__screen-body">
    <section className="ujn-news-app__section ujn-news-app__section--first ujn-news-app__reading">
      <SectionHeading title="Salvas para ler depois" meta={articleCountLabel(articles.length)} rule />
      {articles.length > 1 && (
        <div className="ujn-news-app__toolbar">
          <Button variant="ghost" size="sm" iconStart="delete" onClick={onClear}>
            Remover todas
          </Button>
        </div>
      )}
      <NewsArticleList
        {...context}
        articles={articles}
        ariaLabel="Matérias salvas"
        onRemove={onRemove}
        emptyState={
          <EmptyState
            icon="bookmark"
            title="Nada salvo por aqui"
            description="Toque no marcador de uma matéria para guardá-la e ler com calma depois."
            headingLevel={3}
            action={
              <Button variant="primary" onClick={onBrowse}>
                Ver as últimas notícias
              </Button>
            }
          />
        }
      />
    </section>
  </div>
);

/* ==========================================================================
   Matéria
   ========================================================================== */

export interface UjnArticleScreenProps {
  article: UjnArticle;
  author?: UjnAuthor;
  timeZone: string;
  textSize: UjnTextSize;
  saved: boolean;
  related: UjnArticle[];
  onTextSize: (size: UjnTextSize) => void;
  onToggleSave: (nextSaved: boolean) => void;
  onCopyLink: () => void;
  onPrint: () => void;
  onWriteLetter: () => void;
  onOpenRelated: (id: string) => void;
}

const TEXT_SIZES: UjnTextSize[] = ['sm', 'md', 'lg'];

const renderBlock = (block: UjnBlock, index: number): React.ReactNode => {
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{block.text}</p>;
    case 'heading':
      return <h2 key={index}>{block.text}</h2>;
    case 'quote':
      return (
        <PullQuote key={index} cite={block.cite}>
          {block.text}
        </PullQuote>
      );
    case 'figure':
      return <Figure key={index} src={block.src} alt={block.alt} caption={block.caption} credit={block.credit} />;
    case 'list':
      return (
        <ul key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

/**
 * A matéria aberta: cabeçalho, ferramentas (tamanho do texto, salvar, copiar o
 * link, imprimir), corpo em blocos, nota de correções e "Leia também".
 */
export const ArticleScreen: React.FC<UjnArticleScreenProps> = ({
  article,
  author,
  timeZone,
  textSize,
  saved,
  related,
  onTextSize,
  onToggleSave,
  onCopyLink,
  onPrint,
  onWriteLetter,
  onOpenRelated,
}) => {
  const sizeIndex = TEXT_SIZES.indexOf(textSize);

  return (
    <article className="ujn-news-app__article">
      <div className="ujn-news-app__wrap">
        <ArticleHeader
          kicker={article.kicker}
          title={article.title}
          deck={article.deck}
          author={author?.name ?? 'Redação'}
          authorRole={author?.role}
          avatarSrc={author?.avatarSrc}
          date={ujnFormatDate(article.publishedAt, { style: 'long', timeZone })}
          dateTime={article.publishedAt}
          readingTime={article.readingMinutes}
        />

        <div className="ujn-news-app__reading">
          <div className="ujn-news-app__article-tools">
            <div className="ujn-news-app__text-size" role="group" aria-label="Tamanho do texto">
              <IconButton
                icon="remove"
                label="Diminuir o texto"
                variant="outline"
                disabled={sizeIndex <= 0}
                onClick={() => onTextSize(TEXT_SIZES[Math.max(0, sizeIndex - 1)])}
              />
              <IconButton
                icon="add"
                label="Aumentar o texto"
                variant="outline"
                disabled={sizeIndex >= TEXT_SIZES.length - 1}
                onClick={() => onTextSize(TEXT_SIZES[Math.min(TEXT_SIZES.length - 1, sizeIndex + 1)])}
              />
            </div>
            <ShareBar saved={saved} onSave={onToggleSave} onCopyLink={onCopyLink} onPrint={onPrint} />
          </div>

          <ArticleBody textSize={textSize}>
            <Figure src={article.imageSrc} alt={article.imageAlt} caption={article.imageCaption} />
            {article.body.map(renderBlock)}
            <CorrectionNote
              actionLabel="Escrever à redação"
              onAction={onWriteLetter}
            >
              Encontrou um erro ou quer comentar esta matéria? A redação lê todas as cartas.
            </CorrectionNote>
          </ArticleBody>
        </div>

        {related.length > 0 && (
          <RelatedArticles
            items={related.map((item) => ({
              id: item.id,
              kicker: item.kicker,
              title: item.title,
              readingTime: ujnReadingLabel(item.readingMinutes),
              imageSrc: item.imageSrc,
              imageAlt: item.imageAlt,
            }))}
            onOpen={onOpenRelated}
          />
        )}
      </div>
    </article>
  );
};
