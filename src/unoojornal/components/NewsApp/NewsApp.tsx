'use client';

import React from 'react';
import type { UjnTextSize } from '../../edition';
import { UJN_DEFAULT_TIME_ZONE, ujnCodePoints, ujnFormatDate } from '../../edition';
import { ArticleTopBar } from '../ArticleTopBar';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import type { UjnIconName } from '../Icon';
import type { UjnMainNavItem } from '../MainNav';
import { Modal } from '../Modal';
import { TextArea } from '../TextArea';
import { TextField } from '../TextField';
import { Toast } from '../Toast';
import { ujnDefaultSections } from './NewsApp.defaults';
import type { UjnNewsAppProps, UjnNewsRoute } from './NewsApp.types';
import {
  AgendaScreen,
  ArticleScreen,
  CoverScreen,
  GalleryScreen,
  NewsFooter,
  NewsHeader,
  SavedScreen,
  SearchScreen,
  SectionScreen,
} from './NewsScreens';
import type { UjnNewsListContext } from './NewsScreens';
import {
  UJN_LETTER_NAME_MIN,
  UJN_LETTER_TEXT_MAX,
  UJN_LETTER_TEXT_MIN,
  ujnCreateNewsState,
  ujnNewsReducer,
  ujnSectionCounts,
  ujnSelectFeatured,
  ujnSelectLatest,
  ujnSelectOpinion,
  ujnSelectRelated,
  ujnSelectSaved,
  ujnValidateLetter,
} from './newsState';
import type { UjnNewsAction, UjnNewsState, UjnSectionFilter } from './newsState';
import './NewsApp.css';

/* ==========================================================================
   Constantes e auxiliares
   ========================================================================== */

/** Abaixo desta largura de contêiner, o app é "compacto": a carta vira folha inferior. */
const COMPACT_WIDTH = 640;

/** Quantos compromissos a barra lateral mostra. */
const UPCOMING_LIMIT = 4;

/** Quanto da matéria precisa ter sido rolado para ela contar como lida. */
const READ_THRESHOLD = 80;

/** A cada quantos pontos de progresso o app avisa o produto (`setProgress`). */
const PROGRESS_STEP = 5;

const NAV_ITEMS: UjnMainNavItem[] = [
  { id: 'inicio', label: 'Início', icon: 'home' },
  { id: 'ultimas', label: 'Últimas', icon: 'latest' },
  { id: 'opiniao', label: 'Opinião', icon: 'opinion' },
  { id: 'agenda', label: 'Agenda', icon: 'agenda' },
  { id: 'galeria', label: 'Galeria', icon: 'gallery' },
];

/** Qual item da navegação principal corresponde à tela. */
const navIdOf = (route: UjnNewsRoute): string => {
  switch (route.type) {
    case 'capa':
      return 'inicio';
    case 'secao':
      return route.section === 'opiniao' ? 'opiniao' : 'ultimas';
    case 'agenda':
      return 'agenda';
    case 'galeria':
      return 'galeria';
    default:
      return '';
  }
};

/**
 * Identidade da tela para rolagem e foco: a matéria conta por id, as demais por
 * tipo — trocar o filtro de uma seção ou digitar na busca não reinicia a tela.
 */
const screenKeyOf = (route: UjnNewsRoute): string =>
  route.type === 'materia' ? `materia:${route.id}` : route.type;

const backLabelFor = (previous?: UjnNewsRoute): string => {
  switch (previous?.type) {
    case 'secao':
      return 'Voltar para a lista';
    case 'busca':
      return 'Voltar para a busca';
    case 'salvos':
      return 'Voltar para as salvas';
    case 'galeria':
      return 'Voltar para a galeria';
    case 'agenda':
      return 'Voltar para a agenda';
    case 'materia':
      return 'Voltar para a matéria anterior';
    default:
      return 'Voltar para a capa';
  }
};

/** O dia de calendário de um momento (`2026-03-20`), no fuso pedido. */
const dayKey = (value: Date, timeZone: string): string => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return `${read('year')}-${read('month')}-${read('day')}`;
};

interface ToastState {
  key: number;
  message: string;
  icon?: UjnIconName;
  undo?: UjnNewsState;
}

interface LetterErrors {
  name?: string;
  text?: string;
}

/* ==========================================================================
   Componente
   ========================================================================== */

/**
 * Componente NewsApp — Design System Unoojornal
 *
 * O jornal digital inteiro, pronto para rodar dentro de um `DesktopFrame` ou de
 * um `PhoneFrame`: capa, seções, matéria aberta, galeria, agenda, busca e
 * matérias salvas, ligadas aos componentes do módulo.
 *
 * - **Capa**: faixa de edição, título, navegação, matéria principal, últimas
 *   notícias com filtro por seção, barra lateral (opinião e agenda), galeria da
 *   semana e rodapé.
 * - **Matéria**: progresso de leitura que acompanha a rolagem (e a marca como
 *   lida ao passar de 80%), tamanho do texto, salvar com "Desfazer", copiar o
 *   link, imprimir, a carta à redação e "Leia também".
 * - **Seções, galeria, agenda**: a lista filtrada, as fotos ampliadas em diálogo
 *   e os compromissos agrupados por mês.
 * - **Busca**: por início de palavra e sem acento, com a contagem numa região
 *   viva e um estado vazio que sugere o próximo passo.
 * - **Salvos**: a lista das matérias guardadas, com remover e "Desfazer".
 *
 * O estado mora aqui (`articles` é o ponto de partida) e as regras moram em
 * `newsState.ts`, que um produto pode usar para montar o próprio jornal.
 * `onAction` recebe cada operação antes de ela acontecer e `onStateChange` o
 * estado depois. O app ocupa o contêiner posicionado mais próximo — a tela do
 * `PhoneFrame` ou do `DesktopFrame` — e se arranja por **contêiner**: duas
 * colunas com barra lateral a partir de 960px, uma coluna abaixo disso.
 *
 * No contêiner compacto (< 640px) a carta à redação abre numa folha inferior; no
 * largo, num diálogo. As pílulas de filtro e a navegação rolam na horizontal em
 * vez de abrir folha. As sobreposições são `position: absolute` na tela, sem
 * portal.
 */
export const NewsApp = React.forwardRef<HTMLDivElement, UjnNewsAppProps>(
  (
    {
      articles,
      authors,
      publication,
      sections = ujnDefaultSections,
      agenda = [],
      gallery = [],
      now,
      timeZone = UJN_DEFAULT_TIME_ZONE,
      initialRoute,
      initialSection = 'todas',
      defaultState,
      onAction,
      onStateChange,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [state, dispatch] = React.useReducer(ujnNewsReducer, undefined, () =>
      ujnCreateNewsState(articles, defaultState)
    );
    const stateRef = React.useRef(state);
    const firstRender = React.useRef(true);

    React.useEffect(() => {
      stateRef.current = state;
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      onStateChange?.(state);
    }, [state, onStateChange]);

    /** Aplica uma operação, avisando o produto antes. */
    const act = React.useCallback(
      (action: UjnNewsAction) => {
        onAction?.(action);
        dispatch(action);
      },
      [onAction]
    );

    /* ------------------------------------------------------------ Contêiner */
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const mainRef = React.useRef<HTMLElement | null>(null);
    const [compact, setCompact] = React.useState(false);

    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    React.useLayoutEffect(() => {
      const node = rootRef.current;
      if (!node) return undefined;
      const measure = () => setCompact(node.offsetWidth < COMPACT_WIDTH);
      measure();
      if (typeof ResizeObserver === 'undefined') return undefined;
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    /* ------------------------------------------------------------ Navegação */
    const [routes, setRoutes] = React.useState<UjnNewsRoute[]>(() => [initialRoute ?? { type: 'capa' }]);
    const [coverFilter, setCoverFilter] = React.useState<UjnSectionFilter>(initialSection);
    const [searchKey, setSearchKey] = React.useState(0);
    const route = routes[routes.length - 1];
    const previousRoute = routes[routes.length - 2];
    const screenKey = screenKeyOf(route);

    const routeRef = React.useRef(route);
    const screenKeyRef = React.useRef(screenKey);
    const scrollMemory = React.useRef(new Map<string, number>());
    const typingNavigation = React.useRef(false);

    React.useLayoutEffect(() => {
      routeRef.current = route;
      screenKeyRef.current = screenKey;
    }, [route, screenKey]);

    const saveScroll = () => {
      const element = mainRef.current;
      if (element) scrollMemory.current.set(screenKeyRef.current, element.scrollTop);
    };

    /** Abre uma tela por cima da atual: o voltar a desempilha. */
    const push = (next: UjnNewsRoute) => {
      saveScroll();
      scrollMemory.current.delete(screenKeyOf(next));
      setRoutes((current) => [...current, next]);
    };

    /** Vai a uma tela de topo (navegação principal): a pilha recomeça nela. */
    const reset = (next: UjnNewsRoute) => {
      saveScroll();
      scrollMemory.current.delete(screenKeyOf(next));
      if (routeRef.current.type === 'busca') setSearchKey((key) => key + 1);
      setRoutes([next]);
    };

    const back = () => setRoutes((current) => (current.length > 1 ? current.slice(0, -1) : [{ type: 'capa' }]));

    const replaceTop = (next: UjnNewsRoute) =>
      setRoutes((current) => [...current.slice(0, -1), next]);

    const navigate = (id: string) => {
      switch (id) {
        case 'inicio':
          reset({ type: 'capa' });
          break;
        case 'ultimas':
          reset({ type: 'secao', section: 'todas' });
          break;
        case 'opiniao':
          reset({ type: 'secao', section: 'opiniao' });
          break;
        case 'agenda':
          reset({ type: 'agenda' });
          break;
        case 'galeria':
          reset({ type: 'galeria' });
          break;
        default:
          break;
      }
    };

    const openArticle = (id: string) => push({ type: 'materia', id });

    /** A cada letra, a busca vai (ou continua) na tela de resultados. */
    const changeSearch = (value: string) => {
      if (routeRef.current.type !== 'busca') {
        if (!value.trim()) return;
        saveScroll();
        typingNavigation.current = true;
        scrollMemory.current.delete('busca');
        setRoutes((current) => [...current, { type: 'busca', query: value }]);
        return;
      }
      replaceTop({ type: 'busca', query: value });
    };

    const submitSearch = (value: string) => {
      if (routeRef.current.type === 'busca') {
        replaceTop({ type: 'busca', query: value });
      } else {
        push({ type: 'busca', query: value });
      }
    };

    /* Ao trocar de tela: rolagem lembrada (ou topo) e foco no título. */
    React.useLayoutEffect(() => {
      const element = mainRef.current;
      if (element) element.scrollTop = scrollMemory.current.get(screenKey) ?? 0;
    }, [screenKey]);

    const firstScreen = React.useRef(true);
    React.useEffect(() => {
      if (firstScreen.current) {
        firstScreen.current = false;
        return;
      }
      if (typingNavigation.current) {
        typingNavigation.current = false;
        return;
      }
      const main = mainRef.current;
      if (!main) return;
      if (routeRef.current.type === 'materia') {
        const title = main.querySelector<HTMLElement>('h1');
        if (title) {
          title.tabIndex = -1;
          title.focus({ preventScroll: true });
          return;
        }
      }
      main.focus({ preventScroll: true });
    }, [screenKey]);

    /* ------------------------------------------------------------ Derivados */
    const nowValue = now === undefined ? new Date() : now;
    const nowDate = new Date(nowValue);
    const nowIso = () => nowDate.toISOString();

    const counts = ujnSectionCounts(state);
    const filterItems = [
      { id: 'todas', label: 'Todas', count: counts.todas },
      ...sections.map((section) => ({ id: section.id, label: section.label, count: counts[section.id] ?? 0 })),
    ];
    const filterLabelOf = (filter: UjnSectionFilter) => sections.find((section) => section.id === filter)?.label;

    const featured = ujnSelectFeatured(state);
    const opinion = ujnSelectOpinion(state)[0];
    const today = dayKey(nowDate, timeZone);
    const upcoming = [...agenda]
      .filter((event) => event.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, UPCOMING_LIMIT);

    /* ---------------------------------------------------------- Avisos e Desfazer */
    const [toast, setToast] = React.useState<ToastState | null>(null);
    const toastKey = React.useRef(0);

    const showToast = (message: string, options: { icon?: UjnIconName; undo?: UjnNewsState } = {}) => {
      toastKey.current += 1;
      setToast({ key: toastKey.current, message, ...options });
    };

    /** Operação com "Desfazer": guarda o estado anterior. */
    const actWithUndo = (action: UjnNewsAction, message: string, icon: UjnIconName = 'checkCircle') => {
      const before = stateRef.current;
      act(action);
      showToast(message, { icon, undo: before });
    };

    const toggleSave = (id: string) => {
      const wasSaved = stateRef.current.saved.includes(id);
      actWithUndo(
        { type: 'toggleSave', id },
        wasSaved ? 'Matéria removida' : 'Matéria salva para ler depois',
        wasSaved ? 'delete' : 'bookmarkFilled'
      );
    };

    const removeSaved = (id: string) => actWithUndo({ type: 'unsave', id }, 'Matéria removida', 'delete');

    const clearSaved = () => actWithUndo({ type: 'clearSaved' }, 'Matérias removidas', 'delete');

    const copyLink = async (id: string) => {
      try {
        const base = window.location.href.split('#')[0];
        await navigator.clipboard.writeText(`${base}#${id}`);
        showToast('Link copiado', { icon: 'link' });
      } catch {
        showToast('Não foi possível copiar', { icon: 'error' });
      }
    };

    const printArticle = () => {
      try {
        if (typeof window !== 'undefined' && typeof window.print === 'function') window.print();
      } catch {
        showToast('Não foi possível imprimir', { icon: 'error' });
      }
    };

    /* ------------------------------------------------- Progresso de leitura */
    const [live, setLive] = React.useState<{ id: string; value: number } | null>(null);
    const lastSent = React.useRef(0);
    const readSent = React.useRef(new Set<string>());
    const frame = React.useRef(0);

    const measureProgress = React.useCallback(
      (treatShortAsRead: boolean) => {
        const element = mainRef.current;
        const current = routeRef.current;
        if (!element || current.type !== 'materia') return;

        const scrollable = element.scrollHeight - element.clientHeight;
        let value: number;
        if (scrollable <= 1) {
          if (!treatShortAsRead) return;
          value = 100;
        } else {
          value = Math.min(100, Math.max(0, (element.scrollTop / scrollable) * 100));
        }

        const rounded = Math.round(value);
        setLive({ id: current.id, value: rounded });

        if (rounded >= lastSent.current + PROGRESS_STEP || (rounded === 100 && lastSent.current < 100)) {
          lastSent.current = rounded;
          act({ type: 'setProgress', id: current.id, value: rounded });
        }
        if (
          rounded >= READ_THRESHOLD &&
          !readSent.current.has(current.id) &&
          !stateRef.current.read.includes(current.id)
        ) {
          readSent.current.add(current.id);
          act({ type: 'markRead', id: current.id });
        }
      },
      [act]
    );

    const handleScroll = () => {
      if (routeRef.current.type !== 'materia' || frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        measureProgress(false);
      });
    };

    React.useEffect(() => {
      if (route.type !== 'materia') return undefined;
      lastSent.current = stateRef.current.progress[route.id] ?? 0;
      const first = window.requestAnimationFrame(() => measureProgress(false));
      /* Matéria que cabe inteira na tela: lida de ponta a ponta, depois que as imagens assentam. */
      const settled = window.setTimeout(() => measureProgress(true), 400);
      return () => {
        window.cancelAnimationFrame(first);
        window.clearTimeout(settled);
        window.cancelAnimationFrame(frame.current);
        frame.current = 0;
      };
      // Só a mudança de matéria reinicia a medição.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenKey]);

    /* ----------------------------------------------------------- Galeria */
    const [photoId, setPhotoId] = React.useState<string | null>(null);
    const photo = gallery.find((item) => item.id === photoId);

    /* ----------------------------------------------------------- Carta */
    const [letterOpen, setLetterOpen] = React.useState(false);
    const [letterArticleId, setLetterArticleId] = React.useState<string | undefined>();
    const [letterName, setLetterName] = React.useState('');
    const [letterText, setLetterText] = React.useState('');
    const [letterErrors, setLetterErrors] = React.useState<LetterErrors>({});
    const nameRef = React.useRef<HTMLInputElement | null>(null);
    const textRef = React.useRef<HTMLTextAreaElement | null>(null);
    const letterCounter = React.useRef(0);
    const formId = React.useId();

    const openLetter = (articleId?: string) => {
      setLetterArticleId(articleId);
      setLetterName('');
      setLetterText('');
      setLetterErrors({});
      setLetterOpen(true);
    };

    const closeLetter = () => setLetterOpen(false);

    const submitLetter = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validation = ujnValidateLetter(letterText, letterName);
      if (!validation.ok) {
        const nameInvalid = ujnCodePoints(letterName.trim()) < UJN_LETTER_NAME_MIN;
        setLetterErrors(nameInvalid ? { name: validation.error } : { text: validation.error });
        (nameInvalid ? nameRef : textRef).current?.focus();
        return;
      }

      letterCounter.current += 1;
      act({
        type: 'sendLetter',
        letter: {
          id: `carta-${Date.now().toString(36)}-${letterCounter.current}`,
          name: letterName.trim(),
          text: letterText.trim(),
          articleId: letterArticleId,
          sentAt: nowIso(),
        },
      });
      setLetterOpen(false);
      showToast('Carta enviada. Obrigado!', { icon: 'checkCircle' });
    };

    const letterArticle = letterArticleId ? state.articles.find((item) => item.id === letterArticleId) : undefined;
    const letterTitle = 'Escrever à redação';
    const letterDescription = letterArticle ? `Sobre a matéria “${letterArticle.title}”` : undefined;

    const letterForm = (
      <form id={formId} noValidate className="ujn-news-app__letter" onSubmit={submitLetter}>
        <TextField
          ref={nameRef}
          label="Seu nome"
          required
          autoComplete="name"
          value={letterName}
          error={letterErrors.name}
          onChange={(event) => {
            setLetterName(event.target.value);
            setLetterErrors((current) => ({ ...current, name: undefined }));
          }}
        />
        <TextArea
          ref={textRef}
          label="Sua carta"
          required
          rows={5}
          maxLength={UJN_LETTER_TEXT_MAX}
          showCount
          hint={`Entre ${UJN_LETTER_TEXT_MIN} e ${UJN_LETTER_TEXT_MAX} caracteres.`}
          value={letterText}
          error={letterErrors.text}
          onChange={(event) => {
            setLetterText(event.target.value);
            setLetterErrors((current) => ({ ...current, text: undefined }));
          }}
        />
      </form>
    );

    const letterFooter = (
      <>
        <Button variant="ghost" onClick={closeLetter}>
          Cancelar
        </Button>
        <Button type="submit" form={formId} iconStart="send">
          Enviar carta
        </Button>
      </>
    );

    /* ------------------------------------------------------------ Telas */
    const context: UjnNewsListContext = {
      authors,
      now: nowValue,
      timeZone,
      saved: state.saved,
      read: state.read,
      onOpen: openArticle,
      onToggleSave: (id) => toggleSave(id),
    };

    const article = route.type === 'materia' ? state.articles.find((item) => item.id === route.id) : undefined;
    const showArticle = route.type === 'materia' && article !== undefined;

    let screen: React.ReactNode;
    let mainLabel: string;

    switch (route.type) {
      case 'secao': {
        const articlesInSection = ujnSelectLatest(state, { section: route.section });
        const title = route.section === 'todas' ? 'Últimas notícias' : (filterLabelOf(route.section) ?? 'Seção');
        mainLabel = title;
        screen = (
          <SectionScreen
            {...context}
            title={title}
            articles={articlesInSection}
            totalCount={counts.todas}
            filterItems={filterItems}
            filter={route.section}
            filterLabel={filterLabelOf(route.section)}
            onFilterChange={(section) => replaceTop({ type: 'secao', section })}
            opinion={opinion}
            upcoming={upcoming}
          />
        );
        break;
      }
      case 'materia': {
        mainLabel = article?.title ?? 'Matéria não encontrada';
        screen = article ? (
          <ArticleScreen
            article={article}
            author={authors.find((candidate) => candidate.id === article.authorId)}
            timeZone={timeZone}
            textSize={state.textSize}
            saved={state.saved.includes(article.id)}
            related={ujnSelectRelated(state, article.id, 3)}
            onTextSize={(size: UjnTextSize) => act({ type: 'setTextSize', size })}
            onToggleSave={() => toggleSave(article.id)}
            onCopyLink={() => copyLink(article.id)}
            onPrint={printArticle}
            onWriteLetter={() => openLetter(article.id)}
            onOpenRelated={openArticle}
          />
        ) : (
          <div className="ujn-news-app__wrap ujn-news-app__screen-body">
            <EmptyState
              icon="info"
              title="Matéria não encontrada"
              description="Esta matéria não está nesta edição."
              action={
                <Button variant="primary" onClick={() => reset({ type: 'capa' })}>
                  Ir para a capa
                </Button>
              }
            />
          </div>
        );
        break;
      }
      case 'galeria':
        mainLabel = 'Galeria';
        screen = <GalleryScreen photos={gallery} onOpenPhoto={setPhotoId} />;
        break;
      case 'agenda':
        mainLabel = 'Agenda da escola';
        screen = <AgendaScreen events={agenda} timeZone={timeZone} />;
        break;
      case 'busca': {
        const query = route.query ?? '';
        mainLabel = 'Busca';
        screen = (
          <SearchScreen
            {...context}
            query={query}
            results={query.trim() ? ujnSelectLatest(state, { query, authors }) : []}
            sections={sections}
            onPickSection={(section) => reset({ type: 'secao', section })}
          />
        );
        break;
      }
      case 'salvos':
        mainLabel = 'Matérias salvas';
        screen = (
          <SavedScreen
            {...context}
            articles={ujnSelectSaved(state)}
            onRemove={removeSaved}
            onClear={clearSaved}
            onBrowse={() => reset({ type: 'secao', section: 'todas' })}
          />
        );
        break;
      default:
        mainLabel = 'Capa';
        screen = (
          <CoverScreen
            {...context}
            featured={featured}
            articles={ujnSelectLatest(state, { section: coverFilter })}
            totalCount={counts.todas}
            filterItems={filterItems}
            filter={coverFilter}
            filterLabel={filterLabelOf(coverFilter)}
            onFilterChange={setCoverFilter}
            opinion={opinion}
            upcoming={upcoming}
            gallery={gallery}
            onOpenPhoto={setPhotoId}
            onViewGallery={() => push({ type: 'galeria' })}
          />
        );
        break;
    }

    const liveValue = showArticle && live && live.id === route.id ? live.value : 0;
    const classes = ['ujn-news-app', className].filter(Boolean).join(' ');

    return (
      <div ref={setRootRef} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className={`ujn-news-app__shell${showArticle ? ' ujn-news-app__shell--bar' : ''}`}>
          {showArticle && (
            <ArticleTopBar
              title={publication.name}
              edition={publication.edition}
              progress={liveValue}
              backLabel={backLabelFor(previousRoute)}
              onBack={back}
            />
          )}

          <main
            ref={mainRef}
            className="ujn-news-app__main"
            tabIndex={-1}
            aria-label={mainLabel}
            onScroll={handleScroll}
          >
            <div className="ujn-news-app__page">
              {!showArticle && (
                <NewsHeader
                  publication={publication}
                  dateLabel={ujnFormatDate(nowIso(), { style: 'full', timeZone })}
                  navItems={NAV_ITEMS}
                  activeNavId={navIdOf(route)}
                  onNavigate={navigate}
                  searchKey={searchKey}
                  searchDefault={route.type === 'busca' ? (route.query ?? '') : ''}
                  onSearchChange={changeSearch}
                  onSearchSubmit={submitSearch}
                  savedCount={state.saved.length}
                  savedActive={route.type === 'salvos'}
                  onOpenSaved={() => reset({ type: 'salvos' })}
                />
              )}
              <div className="ujn-news-app__screen">{screen}</div>
              <NewsFooter publication={publication} authors={authors} />
            </div>
          </main>
        </div>

        <Modal
          open={Boolean(photo)}
          onClose={() => setPhotoId(null)}
          title={photo?.caption ?? ''}
          description={photo?.credit}
        >
          {photo && <img className="ujn-news-app__photo" src={photo.src} alt={photo.alt} />}
        </Modal>

        <Modal
          open={letterOpen && !compact}
          onClose={closeLetter}
          title={letterTitle}
          description={letterDescription}
          footer={letterFooter}
          initialFocusRef={nameRef}
        >
          {letterForm}
        </Modal>

        <BottomSheet
          open={letterOpen && compact}
          onClose={closeLetter}
          title={letterTitle}
          description={letterDescription}
          footer={letterFooter}
          initialFocusRef={nameRef}
        >
          {letterForm}
        </BottomSheet>

        <Toast
          key={toast?.key}
          open={Boolean(toast)}
          message={toast?.message ?? ''}
          icon={toast?.icon}
          actionLabel={toast?.undo ? 'Desfazer' : undefined}
          onAction={() => {
            if (toast?.undo) {
              onAction?.({ type: 'replace', state: toast.undo });
              dispatch({ type: 'replace', state: toast.undo });
            }
            setToast(null);
          }}
          onClose={() => setToast(null)}
        />
      </div>
    );
  }
);

NewsApp.displayName = 'NewsApp';
