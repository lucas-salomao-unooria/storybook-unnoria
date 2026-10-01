'use client';

import React from 'react';
import type { UblComment, UblPost } from '../../content';
import { UBL_DEFAULT_TIME_ZONE, ublTableOfContents } from '../../content';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import type { UblIconName } from '../Icon';
import { Modal } from '../Modal';
import type { UblPostNavigationDirection } from '../PostNavigation';
import { ReadingProgress } from '../ReadingProgress';
import { TextField } from '../TextField';
import { Toast } from '../Toast';
import type { UblBlogAppProps, UblBlogRoute } from './BlogApp.types';
import {
  AuthorScreen,
  AuthorsScreen,
  BlogFooter,
  BlogHeader,
  HomeScreen,
  PostScreen,
  SavedScreen,
  SearchScreen,
  SeriesListScreen,
  SeriesScreen,
  TopicScreen,
  TopicsScreen,
} from './BlogScreens';
import type { UblBlogListContext } from './BlogScreens';
import {
  UBL_ALL_TOPICS,
  ublBlogReducer,
  ublCommentCount,
  ublCreateBlogState,
  ublFollowerCount,
  ublLikeCount,
  ublSelectByAuthor,
  ublSelectBySeries,
  ublSelectByTopic,
  ublSelectComments,
  ublSelectFeatured,
  ublSelectLatest,
  ublSelectRelated,
  ublSelectSaved,
  ublTopicCounts,
  ublValidateComment,
} from './blogState';
import type { UblBlogAction, UblBlogState } from './blogState';
import './BlogApp.css';

/* ==========================================================================
   Constantes e auxiliares
   ========================================================================== */

/** Abaixo desta largura de contêiner, o app é "compacto": a folha de compartilhar vira folha inferior. */
const COMPACT_WIDTH = 640;

/** A partir desta largura de contêiner, o sumário do post fica ao lado do texto. */
const WIDE_WIDTH = 960;

/** Quanto do post precisa ter sido rolado para ele contar como lido. */
const READ_THRESHOLD = 80;

/** A cada quantos pontos de progresso o app avisa o produto (`setProgress`). */
const PROGRESS_STEP = 5;

/** Folga, em pixels do app, entre o fim do cabeçalho e o intertítulo em leitura. */
const ACTIVE_HEADING_SLACK = 8;

/** Qual item da navegação principal corresponde à tela. */
const navIdOf = (route: UblBlogRoute): string => {
  switch (route.type) {
    case 'inicio':
      return 'inicio';
    case 'topicos':
    case 'topico':
      return 'topicos';
    case 'series':
    case 'serie':
      return 'series';
    case 'autores':
    case 'autor':
      return 'autores';
    default:
      return '';
  }
};

/**
 * Identidade da tela para rolagem e foco: posts, tópicos, séries e autorias
 * contam por id, as demais por tipo — digitar na busca não reinicia a tela.
 */
const screenKeyOf = (route: UblBlogRoute): string => {
  switch (route.type) {
    case 'post':
    case 'topico':
    case 'serie':
    case 'autor':
      return `${route.type}:${route.id}`;
    default:
      return route.type;
  }
};

interface ToastState {
  key: number;
  message: string;
  icon?: UblIconName;
  undo?: UblBlogState;
}

interface CommentError {
  parentId: string | null;
  message: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   Componente
   ========================================================================== */

/**
 * Componente BlogApp — Design System Unooblog
 *
 * O blog inteiro, pronto para rodar dentro de um `DesktopFrame` ou de um
 * `PhoneFrame`: início, post, tópicos, séries, autores, busca e posts salvos,
 * ligados aos componentes do módulo.
 *
 * - **Início**: a introdução, o post em destaque, o feed com filtro por tópico
 *   (e a contagem), as séries com o progresso de leitura e a newsletter.
 * - **Post**: o progresso de leitura que acompanha a rolagem (e o marca como
 *   lido ao passar de 80%), o sumário que acompanha o intertítulo em leitura,
 *   curtir e salvar com "Desfazer", copiar o link, seguir a autoria, a
 *   navegação entre posts, o "Continue lendo" e os comentários em fio.
 * - **Tópicos, séries e autores**: as listas e a página de cada um.
 * - **Busca**: por início de palavra e sem acento, com a contagem numa região
 *   viva e um estado vazio que sugere o próximo passo.
 * - **Salvos**: a lista dos posts guardados, com remover e "Desfazer".
 *
 * O estado mora aqui (`posts` e `comments` são o ponto de partida) e as regras
 * moram em `blogState.ts`, que um produto pode usar para montar o próprio blog.
 * `onAction` recebe cada operação antes de ela acontecer e `onStateChange` o
 * estado depois. O app ocupa o contêiner posicionado mais próximo — a tela do
 * `PhoneFrame` ou do `DesktopFrame` — e se arranja por **contêiner**: o post
 * ganha o sumário ao lado do texto a partir de 960px; abaixo de 640px o sumário
 * vira um bloco recolhível no topo, os filtros de tópico rolam na horizontal e
 * a folha de compartilhar sobe da base.
 *
 * **O tema não é do app.** O alternador do cabeçalho só chama `onToggleTheme`;
 * quem troca o `data-ubl-theme` e devolve o `themeMode` é o contêiner.
 */
export const BlogApp = React.forwardRef<HTMLDivElement, UblBlogAppProps>(
  (
    {
      posts,
      authors,
      topics,
      series,
      comments,
      site,
      now,
      timeZone = UBL_DEFAULT_TIME_ZONE,
      initialRoute,
      initialTopicId = UBL_ALL_TOPICS,
      defaultState,
      themeMode,
      onToggleTheme,
      onAction,
      onStateChange,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [state, dispatch] = React.useReducer(ublBlogReducer, undefined, () =>
      ublCreateBlogState(posts, comments, defaultState)
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
      (action: UblBlogAction) => {
        onAction?.(action);
        dispatch(action);
      },
      [onAction]
    );

    /* ------------------------------------------------------------ Contêiner */
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const mainRef = React.useRef<HTMLElement | null>(null);
    const [width, setWidth] = React.useState(0);
    const compact = width > 0 && width < COMPACT_WIDTH;
    const wide = width >= WIDE_WIDTH;

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
      const measure = () => setWidth(node.offsetWidth);
      measure();
      if (typeof ResizeObserver === 'undefined') return undefined;
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    /* ------------------------------------------------------------ Navegação */
    const [routes, setRoutes] = React.useState<UblBlogRoute[]>(() => [initialRoute ?? { type: 'inicio' }]);
    const [topicFilter, setTopicFilter] = React.useState<string>(initialTopicId);
    const route = routes[routes.length - 1];
    const screenKey = screenKeyOf(route);

    const routeRef = React.useRef(route);
    const screenKeyRef = React.useRef(screenKey);
    const scrollMemory = React.useRef(new Map<string, number>());

    React.useLayoutEffect(() => {
      routeRef.current = route;
      screenKeyRef.current = screenKey;
    }, [route, screenKey]);

    const saveScroll = () => {
      const element = mainRef.current;
      if (element) scrollMemory.current.set(screenKeyRef.current, element.scrollTop);
    };

    const replaceTop = (next: UblBlogRoute) => setRoutes((current) => [...current.slice(0, -1), next]);

    /** Abre uma tela por cima da atual. Abrir a tela em que já se está só a substitui. */
    const push = (next: UblBlogRoute) => {
      if (screenKeyOf(next) === screenKeyRef.current) {
        replaceTop(next);
        return;
      }
      saveScroll();
      scrollMemory.current.delete(screenKeyOf(next));
      setRoutes((current) => [...current, next]);
    };

    /** Vai a uma tela de topo (navegação principal): a pilha recomeça nela. */
    const reset = (next: UblBlogRoute) => {
      saveScroll();
      scrollMemory.current.delete(screenKeyOf(next));
      setRoutes([next]);
    };

    /**
     * Sobe a uma tela da trilha de navegação: se ela já está na pilha, desempilha
     * até ela (e a rolagem volta de onde estava); senão, recomeça a pilha nela.
     */
    const goTo = (next: UblBlogRoute) => {
      const key = screenKeyOf(next);
      const index = routes.map(screenKeyOf).lastIndexOf(key);
      if (index === -1) {
        reset(next);
        return;
      }
      saveScroll();
      setRoutes(routes.slice(0, index + 1));
    };

    const navigate = (id: string) => {
      switch (id) {
        case 'inicio':
          reset({ type: 'inicio' });
          break;
        case 'topicos':
          reset({ type: 'topicos' });
          break;
        case 'series':
          reset({ type: 'series' });
          break;
        case 'autores':
          reset({ type: 'autores' });
          break;
        default:
          break;
      }
    };

    const goHome = () => reset({ type: 'inicio' });
    const openPost = (id: string) => push({ type: 'post', id });
    const openTopic = (id: string) => push({ type: 'topico', id });
    const openSeries = (id: string) => push({ type: 'serie', id });
    const openAuthor = (id: string) => push({ type: 'autor', id });
    const openSaved = () => reset({ type: 'salvos' });

    const focusSearch = () => {
      const input = mainRef.current?.querySelector<HTMLInputElement>('form[role="search"] input');
      input?.focus();
    };

    const openSearch = () => {
      if (routeRef.current.type === 'busca') {
        focusSearch();
        return;
      }
      reset({ type: 'busca', query: '' });
    };

    /* Ao trocar de tela: rolagem lembrada (ou topo) e foco no título (ou no campo de busca). */
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
      const main = mainRef.current;
      if (!main) return;
      if (routeRef.current.type === 'busca') {
        const input = main.querySelector<HTMLInputElement>('form[role="search"] input');
        if (input) {
          input.focus({ preventScroll: true });
          return;
        }
      }
      const title = main.querySelector<HTMLElement>('h1');
      if (title) {
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
        return;
      }
      main.focus({ preventScroll: true });
    }, [screenKey]);

    /* ------------------------------------------------------------ Derivados */
    const nowValue = now === undefined ? new Date() : now;
    const nowIso = () => new Date(nowValue).toISOString();

    const commentCounts = React.useMemo(() => {
      const counts: Record<string, number> = {};
      state.posts.forEach((post) => {
        counts[post.id] = ublCommentCount(state, post.id);
      });
      return counts;
      // `state` inteiro entra em `ublCommentCount`; só posts e comentários mudam o resultado.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.posts, state.comments]);

    const topicCounts = ublTopicCounts(state);
    const topicItems = [
      {
        id: UBL_ALL_TOPICS,
        label: 'Todos',
        count: topicCounts[UBL_ALL_TOPICS],
      },
      ...topics.map((topic) => ({
        id: topic.id,
        label: topic.label,
        count: topicCounts[topic.id] ?? 0,
      })),
    ];

    const seriesRead: Record<string, number> = {};
    series.forEach((item) => {
      seriesRead[item.id] = item.postIds.filter((id) => state.read.includes(id)).length;
    });

    const labelOfTopic = (id: string) => topics.find((topic) => topic.id === id)?.label;

    /* ---------------------------------------------------------- Avisos e Desfazer */
    const [toast, setToast] = React.useState<ToastState | null>(null);
    const toastKey = React.useRef(0);

    const showToast = (message: string, options: { icon?: UblIconName; undo?: UblBlogState } = {}) => {
      toastKey.current += 1;
      setToast({ key: toastKey.current, message, ...options });
    };

    /** Operação com "Desfazer": guarda o estado anterior. */
    const actWithUndo = (action: UblBlogAction, message: string, icon: UblIconName = 'checkCircle') => {
      const before = stateRef.current;
      act(action);
      showToast(message, { icon, undo: before });
    };

    const toggleLike = (postId: string) => act({ type: 'toggleLike', postId });

    const toggleSave = (postId: string) => {
      const wasSaved = stateRef.current.saved.includes(postId);
      actWithUndo(
        { type: 'toggleSave', postId },
        wasSaved ? 'Removido dos salvos' : 'Post salvo para ler depois',
        wasSaved ? 'delete' : 'bookmarkFilled'
      );
    };

    const removeSaved = (postId: string) =>
      actWithUndo({ type: 'toggleSave', postId }, 'Removido dos salvos', 'delete');

    const clearSaved = () => actWithUndo({ type: 'clearSaved' }, 'Posts removidos dos salvos', 'delete');

    const toggleFollow = (authorId: string) => act({ type: 'toggleFollow', authorId });

    const subscribe = (email: string) => act({ type: 'subscribe', email });

    /** Endereço do post: o da página, com a âncora do `slug`. Só se lê no navegador (nunca na renderização do servidor). */
    const postUrl = (post: UblPost) =>
      `${typeof window === 'undefined' ? '' : window.location.href.split('#')[0]}#${post.slug}`;

    const copyLink = async (post: UblPost) => {
      try {
        await navigator.clipboard.writeText(postUrl(post));
        showToast('Link copiado', { icon: 'link' });
      } catch {
        showToast('Não foi possível copiar', { icon: 'error' });
      }
    };

    /* ------------------------------------------------------------ Compartilhar */
    const [shareOpen, setShareOpen] = React.useState(false);
    const shareRef = React.useRef<HTMLInputElement | null>(null);

    /* ------------------------------------------------------------ Comentários */
    const commentsRef = React.useRef<HTMLElement | null>(null);
    const [replyingToId, setReplyingToId] = React.useState<string | undefined>();
    const [highlightedId, setHighlightedId] = React.useState<string | undefined>();
    const [commentError, setCommentError] = React.useState<CommentError | undefined>();
    const commentCounter = React.useRef(0);

    React.useEffect(() => {
      setReplyingToId(undefined);
      setHighlightedId(undefined);
      setCommentError(undefined);
      setShareOpen(false);
    }, [screenKey]);

    React.useEffect(() => {
      if (!replyingToId) return;
      mainRef.current?.querySelector<HTMLTextAreaElement>('[data-ubl-reply-composer] textarea')?.focus();
    }, [replyingToId]);

    const focusComments = () => commentsRef.current?.focus({ preventScroll: true });

    const submitComment = (postId: string, text: string, parentId: string | null) => {
      const validation = ublValidateComment(text);
      if (!validation.ok) {
        setCommentError({
          parentId,
          message: validation.error ?? 'Escreva um comentário antes de enviar.',
        });
        return;
      }
      commentCounter.current += 1;
      const comment: UblComment = {
        id: `c-${Date.now().toString(36)}-${commentCounter.current}`,
        postId,
        authorName: 'Você',
        text: text.trim(),
        createdAt: nowIso(),
        parentId: parentId ?? undefined,
        likes: 0,
        mine: true,
      };
      act({ type: 'addComment', comment });
      setCommentError(undefined);
      setHighlightedId(comment.id);
      if (parentId) {
        setReplyingToId(undefined);
        focusComments();
      }
      showToast(parentId ? 'Resposta publicada' : 'Comentário publicado', {
        icon: 'checkCircle',
      });
    };

    const deleteComment = (id: string) => {
      actWithUndo({ type: 'deleteComment', id }, 'Comentário excluído', 'delete');
      setReplyingToId(undefined);
      setHighlightedId((current) => (current === id ? undefined : current));
      focusComments();
    };

    const replyTo = (id: string) => setReplyingToId((current) => (current === id ? undefined : id));

    /* ------------------------------------------- Rolagem, sumário e progresso */
    const [live, setLive] = React.useState<{
      id: string;
      value: number;
    } | null>(null);
    const [activeTocId, setActiveTocId] = React.useState<string | undefined>();
    const lastSent = React.useRef(0);
    const readSent = React.useRef(new Set<string>());
    const frame = React.useRef(0);
    const articleRef = React.useRef<HTMLElement | null>(null);

    /** Escala do quadro (o `DesktopFrame` encolhe por `transform`) e o retângulo da rolagem. */
    const geometry = () => {
      const main = mainRef.current;
      if (!main) return null;
      const rect = main.getBoundingClientRect();
      const scale = main.offsetWidth > 0 ? rect.width / main.offsetWidth : 1;
      return { main, rect, scale: scale || 1 };
    };

    const headerHeight = () => mainRef.current?.querySelector<HTMLElement>('.ubl-site-header')?.offsetHeight ?? 0;

    /** Rola o contêiner do app até o elemento ficar a `offset` pixels do topo. */
    const scrollToElement = (target: HTMLElement, offset: number) => {
      const geo = geometry();
      if (!geo) return;
      const delta = (target.getBoundingClientRect().top - geo.rect.top) / geo.scale - offset;
      geo.main.scrollTo({
        top: Math.max(0, geo.main.scrollTop + delta),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    };

    const scrollToHeading = (id: string) => {
      const main = mainRef.current;
      const target = main?.querySelector<HTMLElement>(`.ubl-post-body [id="${id}"]`);
      if (!target) return;
      const margin = parseFloat(window.getComputedStyle(target).scrollMarginTop) || headerHeight();
      scrollToElement(target, margin);
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      setActiveTocId(id);
    };

    const openComments = () => {
      const target = commentsRef.current;
      if (!target) return;
      scrollToElement(target, headerHeight() + 16);
      focusComments();
    };

    /** Intertítulo em leitura: o último cuja base já passou da linha do cabeçalho. */
    const updateActiveHeading = () => {
      const geo = geometry();
      if (!geo || routeRef.current.type !== 'post') return;
      const headings = Array.from(
        geo.main.querySelectorAll<HTMLElement>('.ubl-post-body h2[id], .ubl-post-body h3[id]')
      );
      if (headings.length === 0) return;
      const margin = parseFloat(window.getComputedStyle(headings[0]).scrollMarginTop) || headerHeight();
      const line = geo.rect.top + (margin + ACTIVE_HEADING_SLACK) * geo.scale;
      let active: string | undefined;
      headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= line) active = heading.id;
      });
      setActiveTocId(active);
    };

    /**
     * Progresso de leitura do post: a rolagem medida até o FIM DO TEXTO, e não da
     * página inteira — comentários, "Continue lendo" e rodapé não são leitura.
     */
    const measureProgress = React.useCallback(
      (treatShortAsRead: boolean) => {
        const geo = geometry();
        const current = routeRef.current;
        if (!geo || current.type !== 'post') return;

        const body = geo.main.querySelector<HTMLElement>('.ubl-post-body');
        const bodyEnd = body
          ? (body.getBoundingClientRect().bottom - geo.rect.top) / geo.scale + geo.main.scrollTop
          : geo.main.scrollHeight;
        const scrollable = Math.min(bodyEnd, geo.main.scrollHeight) - geo.main.clientHeight;

        let value: number;
        if (scrollable <= 1) {
          if (!treatShortAsRead) return;
          value = 100;
        } else {
          value = Math.min(100, Math.max(0, (geo.main.scrollTop / scrollable) * 100));
        }

        const rounded = Math.round(value);
        setLive({ id: current.id, value: rounded });

        if (rounded >= lastSent.current + PROGRESS_STEP || (rounded === 100 && lastSent.current < 100)) {
          lastSent.current = rounded;
          act({ type: 'setProgress', postId: current.id, value: rounded });
        }
        if (
          rounded >= READ_THRESHOLD &&
          !readSent.current.has(current.id) &&
          !stateRef.current.read.includes(current.id)
        ) {
          readSent.current.add(current.id);
          act({ type: 'markRead', postId: current.id });
        }
      },
      [act]
    );

    const handleScroll = () => {
      if (routeRef.current.type !== 'post' || frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        measureProgress(false);
        updateActiveHeading();
      });
    };

    React.useEffect(() => {
      if (route.type !== 'post') return undefined;
      lastSent.current = stateRef.current.progress[route.id] ?? 0;
      setActiveTocId(undefined);
      const first = window.requestAnimationFrame(() => {
        measureProgress(false);
        updateActiveHeading();
      });
      /* Post que cabe inteiro na tela: lido de ponta a ponta, depois que as imagens assentam. */
      const settled = window.setTimeout(() => measureProgress(true), 400);
      return () => {
        window.cancelAnimationFrame(first);
        window.clearTimeout(settled);
        window.cancelAnimationFrame(frame.current);
        frame.current = 0;
      };
      // Só a mudança de post reinicia a medição.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenKey]);

    /** O link âncora de um intertítulo rola o contêiner do app, não a janela. */
    const handleBodyClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a.ubl-post-body__anchor');
      if (!anchor) return;
      event.preventDefault();
      scrollToHeading(anchor.getAttribute('href')?.slice(1) ?? '');
    };

    /* ------------------------------------------------------------ Telas */
    const context: UblBlogListContext = {
      authors,
      topics,
      timeZone,
      saved: state.saved,
      read: state.read,
      commentCounts,
      onOpen: openPost,
      onToggleSave: toggleSave,
    };

    const breadcrumbHome = {
      label: 'Início',
      onClick: () => goTo({ type: 'inicio' }),
    };

    let screen: React.ReactNode;
    let mainLabel: string;
    let postRoute: UblPost | undefined;

    switch (route.type) {
      case 'topicos':
        mainLabel = 'Tópicos';
        screen = <TopicsScreen topics={topics} counts={topicCounts} onOpenTopic={openTopic} />;
        break;

      case 'topico': {
        const topic = topics.find((candidate) => candidate.id === route.id);
        mainLabel = topic?.label ?? 'Tópico';
        screen = (
          <TopicScreen
            {...context}
            topic={topic}
            posts={ublSelectByTopic(state, route.id)}
            breadcrumb={[
              breadcrumbHome,
              { label: 'Tópicos', onClick: () => goTo({ type: 'topicos' }) },
              { label: topic?.label ?? 'Tópico' },
            ]}
            onGoHome={goHome}
          />
        );
        break;
      }

      case 'series':
        mainLabel = 'Séries';
        screen = <SeriesListScreen series={series} seriesRead={seriesRead} onOpenSeries={openSeries} />;
        break;

      case 'serie': {
        const item = series.find((candidate) => candidate.id === route.id);
        mainLabel = item?.title ?? 'Série';
        screen = (
          <SeriesScreen
            {...context}
            series={item}
            posts={ublSelectBySeries(state, route.id)}
            readCount={seriesRead[route.id] ?? 0}
            breadcrumb={[
              breadcrumbHome,
              { label: 'Séries', onClick: () => goTo({ type: 'series' }) },
              { label: item?.title ?? 'Série' },
            ]}
            onGoHome={goHome}
          />
        );
        break;
      }

      case 'autores':
        mainLabel = 'Autores';
        screen = (
          <AuthorsScreen
            authors={authors}
            following={state.following}
            followerCount={(author) => ublFollowerCount(author, state)}
            onOpenAuthor={openAuthor}
            onToggleFollow={toggleFollow}
          />
        );
        break;

      case 'autor': {
        const author = authors.find((candidate) => candidate.id === route.id);
        mainLabel = author?.name ?? 'Autoria';
        screen = (
          <AuthorScreen
            {...context}
            author={author}
            posts={ublSelectByAuthor(state, route.id)}
            following={state.following.includes(route.id)}
            followerCount={author ? ublFollowerCount(author, state) : 0}
            onToggleFollow={() => toggleFollow(route.id)}
            breadcrumb={[
              breadcrumbHome,
              { label: 'Autores', onClick: () => goTo({ type: 'autores' }) },
              { label: author?.name ?? 'Autoria' },
            ]}
            onGoHome={goHome}
          />
        );
        break;
      }

      case 'busca': {
        const query = route.query ?? '';
        mainLabel = 'Busca';
        screen = (
          <SearchScreen
            {...context}
            query={query}
            results={query.trim() ? ublSelectLatest(state, { query, authors, topics }) : []}
            onQueryChange={(value) => replaceTop({ type: 'busca', query: value })}
            onQuerySubmit={(value) => replaceTop({ type: 'busca', query: value })}
            onOpenTopic={openTopic}
          />
        );
        break;
      }

      case 'salvos':
        mainLabel = 'Posts salvos';
        screen = (
          <SavedScreen
            {...context}
            posts={ublSelectSaved(state)}
            onRemove={removeSaved}
            onClear={clearSaved}
            onBrowse={goHome}
          />
        );
        break;

      case 'post': {
        const post = state.posts.find((candidate) => candidate.id === route.id);
        postRoute = post;
        mainLabel = post?.title ?? 'Post não encontrado';

        const author = post ? authors.find((candidate) => candidate.id === post.authorId) : undefined;
        const firstTopic = post ? topics.find((candidate) => candidate.id === post.topicIds[0]) : undefined;
        const seriesItem = post?.seriesId ? series.find((candidate) => candidate.id === post.seriesId) : undefined;
        const chronological = [...state.posts].sort(
          (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
        const index = post ? chronological.findIndex((candidate) => candidate.id === post.id) : -1;
        const previous = index > 0 ? chronological[index - 1] : undefined;
        const next = index >= 0 && index < chronological.length - 1 ? chronological[index + 1] : undefined;
        const partIndex = seriesItem && post ? seriesItem.postIds.indexOf(post.id) : -1;

        screen = (
          <PostScreen
            post={post}
            author={author}
            breadcrumb={[
              breadcrumbHome,
              ...(firstTopic
                ? [
                    {
                      label: firstTopic.label,
                      onClick: () => goTo({ type: 'topico', id: firstTopic.id }),
                    },
                  ]
                : []),
              { label: post?.title ?? 'Post' },
            ]}
            topicLabels={post ? post.topicIds.map(labelOfTopic).filter((label): label is string => Boolean(label)) : []}
            seriesInfo={
              seriesItem && post
                ? {
                    title: seriesItem.title,
                    part: post.seriesPart ?? (partIndex >= 0 ? partIndex + 1 : 1),
                    total: seriesItem.postIds.length,
                  }
                : undefined
            }
            topics={topics}
            authors={authors}
            timeZone={timeZone}
            now={nowValue}
            tocItems={post ? ublTableOfContents(post.body) : []}
            activeTocId={activeTocId}
            tocLayout={wide ? 'sidebar' : 'inline'}
            onSelectToc={(id, event) => {
              event.preventDefault();
              scrollToHeading(id);
            }}
            onBodyClick={handleBodyClick}
            liked={post ? state.liked.includes(post.id) : false}
            likeCount={post ? ublLikeCount(state, post) : 0}
            saved={post ? state.saved.includes(post.id) : false}
            commentCount={post ? (commentCounts[post.id] ?? 0) : 0}
            onToggleLike={() => post && toggleLike(post.id)}
            onToggleSave={() => post && toggleSave(post.id)}
            onOpenComments={openComments}
            onShare={() => setShareOpen(true)}
            onCopyLink={() => post && copyLink(post)}
            following={author ? state.following.includes(author.id) : false}
            followerCount={author ? ublFollowerCount(author, state) : 0}
            onToggleFollow={() => author && toggleFollow(author.id)}
            onOpenAuthor={() => author && openAuthor(author.id)}
            previous={previous}
            next={next}
            onNavigate={(direction: UblPostNavigationDirection) => {
              const target = direction === 'previous' ? previous : next;
              if (target) openPost(target.id);
            }}
            related={post ? ublSelectRelated(state, post.id, 3) : []}
            onOpenPost={openPost}
            comments={post ? ublSelectComments(state, post.id) : []}
            likedCommentIds={state.likedComments}
            highlightedCommentId={highlightedId}
            replyingToId={replyingToId}
            commentError={commentError}
            onToggleCommentLike={(id) => act({ type: 'toggleCommentLike', id })}
            onReply={replyTo}
            onDeleteComment={deleteComment}
            onSubmitComment={(text, parentId) => post && submitComment(post.id, text, parentId)}
            onCancelReply={() => {
              setReplyingToId(undefined);
              focusComments();
            }}
            onClearCommentError={() => setCommentError(undefined)}
            newsletterStatus={state.subscribedEmail ? 'success' : 'idle'}
            onSubscribe={subscribe}
            articleRef={articleRef}
            commentsRef={commentsRef}
            onGoHome={goHome}
          />
        );
        break;
      }

      default: {
        mainLabel = 'Início';
        /* O destaque abre a página e, por isso, não se repete no feed; com um tópico escolhido, o feed é tudo o que há. */
        const restricted = topicFilter !== UBL_ALL_TOPICS;
        const featuredPost = restricted ? undefined : ublSelectFeatured(state)[0];
        screen = (
          <HomeScreen
            {...context}
            site={site}
            featured={featuredPost}
            posts={ublSelectLatest(state, { topicId: topicFilter }).filter((item) => item.id !== featuredPost?.id)}
            totalCount={state.posts.length}
            topicItems={topicItems}
            topicFilter={topicFilter}
            topicLabel={labelOfTopic(topicFilter)}
            onTopicChange={(id) => setTopicFilter((current) => (current === id ? UBL_ALL_TOPICS : id))}
            series={series}
            seriesRead={seriesRead}
            onOpenSeries={openSeries}
            newsletterStatus={state.subscribedEmail ? 'success' : 'idle'}
            onSubscribe={subscribe}
          />
        );
        break;
      }
    }

    const showProgress = route.type === 'post' && postRoute !== undefined;
    const liveValue = showProgress && live && live.id === route.id ? live.value : 0;
    const classes = ['ubl-blog-app', className].filter(Boolean).join(' ');

    /* ------------------------------------------------- Compartilhar (diálogo) */
    const shareTitle = 'Compartilhar o post';
    const shareBody =
      shareOpen && postRoute ? (
        <TextField
          ref={shareRef}
          label="Link do post"
          readOnly
          value={postUrl(postRoute)}
          onFocus={(event) => event.currentTarget.select()}
        />
      ) : null;
    const shareFooter = (
      <>
        <Button variant="ghost" onClick={() => setShareOpen(false)}>
          Fechar
        </Button>
        <Button iconStart="copy" onClick={() => postRoute && copyLink(postRoute)}>
          Copiar link
        </Button>
      </>
    );

    return (
      <div ref={setRootRef} data-ubl-theme={theme} className={classes} {...restProps}>
        <div className="ubl-blog-app__shell">
          {showProgress && (
            <div className="ubl-blog-app__progress">
              <ReadingProgress value={liveValue} />
            </div>
          )}

          <main
            ref={mainRef}
            className="ubl-blog-app__main"
            tabIndex={-1}
            aria-label={mainLabel}
            onScroll={handleScroll}
          >
            <div className="ubl-blog-app__page">
              <BlogHeader
                site={site}
                activeId={navIdOf(route)}
                onNavigate={navigate}
                onSearch={openSearch}
                onHome={goHome}
                themeMode={themeMode}
                onToggleTheme={onToggleTheme}
                savedCount={state.saved.length}
                savedActive={route.type === 'salvos'}
                onOpenSaved={openSaved}
              />
              <div className="ubl-blog-app__screen">{screen}</div>
              <BlogFooter
                site={site}
                topics={topics}
                authors={authors}
                onNavigate={navigate}
                onOpenSaved={openSaved}
                onOpenTopic={(id) => reset({ type: 'topico', id })}
                onOpenAuthor={(id) => reset({ type: 'autor', id })}
              />
            </div>
          </main>
        </div>

        <Modal
          open={shareOpen && !compact}
          onClose={() => setShareOpen(false)}
          title={shareTitle}
          description={postRoute?.title}
          footer={shareFooter}
          size="sm"
        >
          {shareBody}
        </Modal>

        <BottomSheet
          open={shareOpen && compact}
          onClose={() => setShareOpen(false)}
          title={shareTitle}
          description={postRoute?.title}
          footer={shareFooter}
        >
          {shareBody}
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

BlogApp.displayName = 'BlogApp';
