'use client';

import React from 'react';
import type { UglEditState, UglMediaItem, UglMediaSection, UglPerson } from '../../media';
import {
  uglDaysLeft,
  uglDayKey,
  uglFormatSelection,
  uglIsEdited,
  UGL_DEFAULT_TIME_ZONE,
  UGL_TRASH_RETENTION_DAYS,
} from '../../media';
import type { UglIconName } from '../Icon';
import { ActionMenu } from '../ActionMenu';
import type { UglActionMenuItem } from '../ActionMenu';
import { BottomSheet } from '../BottomSheet';
import { Button } from '../Button';
import { ConfirmDialog } from '../ConfirmDialog';
import { InfoPanel } from '../InfoPanel';
import { ListGroup, ListRow } from '../ListRow';
import { MediaGrid } from '../MediaGrid';
import { MediaViewer } from '../MediaViewer';
import { PhotoEditor } from '../PhotoEditor';
import { SelectionBar } from '../SelectionBar';
import type { UglSelectionBarAction } from '../SelectionBar';
import { ShareSheet } from '../ShareSheet';
import { TabBar } from '../TabBar';
import { TextField } from '../TextField';
import { Toast } from '../Toast';
import {
  AlbumsScreen,
  CollectionScreen,
  ForYouScreen,
  LibraryScreen,
  SearchScreen,
  TAB_BAR_HEIGHT,
  UGL_SUBTYPE_TITLES,
} from './GalleryScreens';
import type { GridHandlers, UglSelectionState } from './GalleryScreens';
import type {
  UglGalleryAppProps,
  UglGalleryCollection,
  UglGalleryFilter,
  UglGalleryLibraryView,
  UglGalleryTab,
} from './GalleryApp.types';
import {
  uglGalleryReducer,
  uglSearchMedia,
  uglSelectAlbumItems,
  uglSelectAlbums,
  uglSelectFavorites,
  uglSelectHidden,
  uglSelectLibrary,
  uglSelectSubtype,
  uglSelectTrash,
  uglSelectVideos,
} from './galleryState';
import type { UglGalleryAction, UglGalleryState } from './galleryState';
import './GalleryApp.css';

/* ==========================================================================
   Tipos internos
   ========================================================================== */

/** Onde o visualizador foi aberto: decide as ações que ele oferece. */
type ViewerContext = 'library' | 'trash' | 'hidden';

interface ViewerState {
  ids: string[];
  index: number;
  context: ViewerContext;
}

interface ToastState {
  key: number;
  message: string;
  icon?: UglIconName;
  undo?: UglGalleryState;
}

interface ConfirmState {
  title: string;
  description?: string;
  confirmLabel: string;
  tone: 'default' | 'danger';
  onConfirm: () => void;
}

/** Nome de álbum pedido por diálogo: criar (com itens opcionais) ou renomear. */
type AlbumNameState = { mode: 'create'; ids: string[] } | { mode: 'rename'; albumId: string; current: string };

const TABS: { id: UglGalleryTab; label: string; icon: UglIconName; iconActive: UglIconName }[] = [
  { id: 'library', label: 'Biblioteca', icon: 'library', iconActive: 'libraryFilled' },
  { id: 'foryou', label: 'Para você', icon: 'memories', iconActive: 'memoriesFilled' },
  { id: 'albums', label: 'Álbuns', icon: 'albums', iconActive: 'albumsFilled' },
  { id: 'search', label: 'Busca', icon: 'search', iconActive: 'search' },
];

const TAB_TITLES: Record<UglGalleryTab, string> = {
  library: 'Biblioteca',
  foryou: 'Para você',
  albums: 'Álbuns',
  search: 'Busca',
};

const EMPTY_SELECTION: UglSelectionState = { active: false, ids: [] };

const pluralItems = (count: number) => (count === 1 ? '1 item' : `${count} itens`);

/* ==========================================================================
   Componente
   ========================================================================== */

/**
 * Componente GalleryApp — Design System Unoogaleria
 *
 * A galeria de fotos e vídeos inteira, pronta para rodar dentro de um
 * `PhoneFrame`: quatro abas (Biblioteca, Para você, Álbuns e Busca) e todas as
 * funções de uma galeria de celular, ligadas aos componentes do módulo.
 *
 * - **Biblioteca**: grade por dia com zoom de 3, 5 e 7 colunas (pinça ou menu),
 *   visões por ano e por mês, filtros, seleção por toque, por grupo e por
 *   arraste, e barra de ações da seleção.
 * - **Visualizador**: deslizar, ampliar, vídeo real, favoritar, informações com
 *   legenda editável, compartilhar, editar, excluir e apresentação.
 * - **Editor**: cortar e girar, ajustes finos e filtros, não destrutivo.
 * - **Álbuns**: criar, renomear, excluir, adicionar e remover itens; tipos de
 *   mídia; Ocultos protegido; Excluídos recentemente com prazo, recuperação e
 *   exclusão definitiva.
 * - **Busca**: por conteúdo, lugar, pessoa, legenda e arquivo, sem acento.
 * - **Desfazer**: toda operação destrutiva mostra um aviso com "Desfazer".
 *
 * O estado mora aqui (`defaultItems` é o ponto de partida) e as regras moram em
 * `galleryState.ts`, que um produto pode usar para montar a própria galeria.
 * O app ocupa o contêiner posicionado mais próximo — a tela do `PhoneFrame`.
 */
export const GalleryApp = React.forwardRef<HTMLDivElement, UglGalleryAppProps>(
  (
    {
      defaultItems,
      defaultAlbums = [],
      people = [],
      contacts,
      now,
      timeZone = UGL_DEFAULT_TIME_ZONE,
      initialTab = 'library',
      initialView = 'all',
      onStateChange,
      onAction,
      theme,
      className = '',
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const [state, dispatch] = React.useReducer(uglGalleryReducer, {
      items: defaultItems,
      albums: defaultAlbums,
    });
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

    /* ------------------------------------------------------------ Navegação */
    const [tab, setTab] = React.useState<UglGalleryTab>(initialTab);
    const [routes, setRoutes] = React.useState<Record<UglGalleryTab, UglGalleryCollection[]>>({
      library: [],
      foryou: [],
      albums: [],
      search: [],
    });
    const [view, setView] = React.useState<UglGalleryLibraryView>(initialView);
    const [filter, setFilter] = React.useState<UglGalleryFilter>('all');
    const [columns, setColumns] = React.useState(3);
    const [query, setQuery] = React.useState('');
    const [hiddenUnlocked, setHiddenUnlocked] = React.useState(false);

    /* ---------------------------------------------------- Seleção e camadas */
    const [selection, setSelection] = React.useState<UglSelectionState>(EMPTY_SELECTION);
    const [viewer, setViewer] = React.useState<ViewerState | null>(null);
    const [viewerChromeHidden, setViewerChromeHidden] = React.useState(false);
    const [slideshow, setSlideshow] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
    const [viewerMenuOpen, setViewerMenuOpen] = React.useState(false);
    const viewerMenuAnchor = React.useRef<HTMLElement | null>(null);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [shareIds, setShareIds] = React.useState<string[] | null>(null);
    const [pickerIds, setPickerIds] = React.useState<string[] | null>(null);
    const [addPhotosAlbum, setAddPhotosAlbum] = React.useState<string | null>(null);
    const [addPhotosIds, setAddPhotosIds] = React.useState<string[]>([]);
    const [albumName, setAlbumName] = React.useState<AlbumNameState | null>(null);
    const [albumNameValue, setAlbumNameValue] = React.useState('');
    const [confirm, setConfirm] = React.useState<ConfirmState | null>(null);
    const [toast, setToast] = React.useState<ToastState | null>(null);
    const toastKey = React.useRef(0);
    const idCounter = React.useRef(0);

    /* ------------------------------------------------------------ Derivados */
    const library = React.useMemo(() => uglSelectLibrary(state.items), [state.items]);
    const trash = React.useMemo(() => uglSelectTrash(state.items), [state.items]);
    const hidden = React.useMemo(() => uglSelectHidden(state.items), [state.items]);
    const albums = React.useMemo(() => uglSelectAlbums(state), [state]);
    const byId = React.useMemo(() => new Map(state.items.map((item) => [item.id, item])), [state.items]);
    const peopleById = React.useMemo(() => new Map(people.map((person) => [person.id, person])), [people]);

    const nowIso = () => (now === undefined ? new Date() : new Date(now)).toISOString();
    const newId = (prefix: string) => {
      idCounter.current += 1;
      return `${prefix}-${Date.now().toString(36)}-${idCounter.current}`;
    };

    /** Aplica uma operação, avisando o produto antes. */
    const act = React.useCallback(
      (action: UglGalleryAction) => {
        onAction?.(action);
        dispatch(action);
      },
      [onAction]
    );

    const showToast = (message: string, options: { icon?: UglIconName; undo?: UglGalleryState } = {}) => {
      toastKey.current += 1;
      setToast({ key: toastKey.current, message, ...options });
    };

    /** Operação destrutiva com "Desfazer": guarda o estado anterior. */
    const actWithUndo = (action: UglGalleryAction, message: string, icon: UglIconName = 'checkCircle') => {
      const before = stateRef.current;
      act(action);
      showToast(message, { icon, undo: before });
    };

    /* ------------------------------------------------------------ Coleções */
    const collectionItems = (collection: UglGalleryCollection): UglMediaItem[] => {
      switch (collection.kind) {
        case 'album':
          return uglSelectAlbumItems(state.items, collection.id);
        case 'recent':
          return library;
        case 'favorites':
          return uglSelectFavorites(state.items);
        case 'videos':
          return uglSelectVideos(state.items);
        case 'subtype':
          return uglSelectSubtype(state.items, collection.subtype);
        case 'period':
          return library.filter((item) => uglDayKey(item.takenAt, timeZone).startsWith(collection.id));
        case 'person':
          return library.filter((item) => item.people?.includes(collection.id));
        case 'hidden':
          return hidden;
        case 'trash':
          return trash;
        default:
          return [];
      }
    };

    const collectionTitle = (collection: UglGalleryCollection): string => {
      switch (collection.kind) {
        case 'album':
          return state.albums.find((album) => album.id === collection.id)?.title ?? 'Álbum';
        case 'recent':
          return 'Recentes';
        case 'favorites':
          return 'Favoritos';
        case 'videos':
          return 'Vídeos';
        case 'subtype':
          return UGL_SUBTYPE_TITLES[collection.subtype];
        case 'period':
          return collection.title;
        case 'person':
          return peopleById.get(collection.id)?.name ?? 'Pessoa';
        case 'hidden':
          return 'Ocultos';
        case 'trash':
          return 'Excluídos recentemente';
        default:
          return '';
      }
    };

    const stack = routes[tab];
    const currentCollection = stack[stack.length - 1];

    const pushCollection = (collection: UglGalleryCollection) => {
      setSelection(EMPTY_SELECTION);
      setRoutes((current) => ({ ...current, [tab]: [...current[tab], collection] }));
    };

    const popCollection = () => {
      setSelection(EMPTY_SELECTION);
      setRoutes((current) => ({ ...current, [tab]: current[tab].slice(0, -1) }));
      if (currentCollection?.kind === 'hidden') setHiddenUnlocked(false);
    };

    const changeTab = (next: string) => {
      setSelection(EMPTY_SELECTION);
      setTab(next as UglGalleryTab);
    };

    /** Tocar de novo na aba ativa volta à raiz dela. */
    const reselectTab = () => {
      setSelection(EMPTY_SELECTION);
      setRoutes((current) => ({ ...current, [tab]: [] }));
    };

    /* --------------------------------------------------------------- Visível */
    const visibleItems: UglMediaItem[] = React.useMemo(() => {
      if (filter === 'photos') return library.filter((item) => item.type === 'photo');
      if (filter === 'videos') return library.filter((item) => item.type === 'video');
      if (filter === 'favorites') return library.filter((item) => item.favorite);
      return library;
    }, [filter, library]);

    const searchResults = React.useMemo(
      () => (tab === 'search' ? uglSearchMedia(state.items, query, people) : []),
      [tab, state.items, query, people]
    );

    const gridItems = currentCollection
      ? currentCollection.kind === 'hidden' && !hiddenUnlocked
        ? []
        : collectionItems(currentCollection)
      : tab === 'search'
        ? searchResults
        : visibleItems;

    const viewerContextFor = (): ViewerContext =>
      currentCollection?.kind === 'trash' ? 'trash' : currentCollection?.kind === 'hidden' ? 'hidden' : 'library';

    /* ------------------------------------------------------------- Seleção */
    const toggleIds = (ids: string[], select?: boolean) =>
      setSelection((current) => {
        const set = new Set(current.ids);
        for (const id of ids) {
          const shouldSelect = select ?? !set.has(id);
          if (shouldSelect) set.add(id);
          else set.delete(id);
        }
        // A ordem da seleção segue a ordem da grade.
        return { active: true, ids: gridItems.filter((item) => set.has(item.id)).map((item) => item.id) };
      });

    const openViewer = (items: UglMediaItem[], index: number, context: ViewerContext = viewerContextFor()) => {
      setInfoOpen(false);
      setViewerChromeHidden(false);
      setViewer({ ids: items.map((item) => item.id), index, context });
    };

    const grid: GridHandlers = {
      selection,
      onOpen: (_item, index, flat) => openViewer(flat, index),
      onToggle: (item) => toggleIds([item.id]),
      onToggleSection: (section: UglMediaSection, allSelected: boolean) =>
        toggleIds(
          section.items.map((item) => item.id),
          !allSelected
        ),
      onRangeSelect: (items) => toggleIds(items.map((item) => item.id), true),
      onLongPress: (item) => setSelection({ active: true, ids: [item.id] }),
      onStartSelection: () => setSelection({ active: true, ids: [] }),
      onCancelSelection: () => setSelection(EMPTY_SELECTION),
      onSelectAll: (items) => setSelection({ active: true, ids: items.map((item) => item.id) }),
    };

    const selectedIds = selection.ids;
    const endSelection = () => setSelection(EMPTY_SELECTION);

    /* ----------------------------------------------------------- Operações */
    const trashItems = (ids: string[], after?: () => void) => {
      if (ids.length === 0) return;
      setConfirm({
        title: ids.length === 1 ? 'Excluir este item?' : `Excluir ${pluralItems(ids.length)}?`,
        description: `${ids.length === 1 ? 'Ele fica' : 'Eles ficam'} em Excluídos recentemente por ${UGL_TRASH_RETENTION_DAYS} dias antes de ser apagado de vez.`,
        confirmLabel: 'Excluir',
        tone: 'danger',
        onConfirm: () => {
          actWithUndo(
            { type: 'trash', ids, at: nowIso() },
            ids.length === 1
              ? 'Movido para Excluídos recentemente'
              : `${pluralItems(ids.length)} movidos para Excluídos recentemente`,
            'delete'
          );
          after?.();
        },
      });
    };

    const deleteForever = (ids: string[], after?: () => void) => {
      if (ids.length === 0) return;
      setConfirm({
        title: ids.length === 1 ? 'Apagar de vez?' : `Apagar ${pluralItems(ids.length)} de vez?`,
        description: 'Esta ação não pode ser desfeita.',
        confirmLabel: 'Apagar',
        tone: 'danger',
        onConfirm: () => {
          act({ type: 'deleteForever', ids });
          showToast(ids.length === 1 ? 'Apagado de vez' : `${pluralItems(ids.length)} apagados de vez`, {
            icon: 'deleteForever',
          });
          after?.();
        },
      });
    };

    const restoreItems = (ids: string[]) => {
      if (ids.length === 0) return;
      actWithUndo(
        { type: 'restore', ids },
        ids.length === 1 ? 'Recuperado para a biblioteca' : `${pluralItems(ids.length)} recuperados`,
        'restore'
      );
    };

    const hideItems = (ids: string[]) => {
      if (ids.length === 0) return;
      actWithUndo(
        { type: 'hide', ids },
        ids.length === 1 ? 'Movido para Ocultos' : `${pluralItems(ids.length)} movidos para Ocultos`,
        'hide'
      );
    };

    const unhideItems = (ids: string[]) => {
      if (ids.length === 0) return;
      actWithUndo(
        { type: 'unhide', ids },
        ids.length === 1 ? 'De volta à biblioteca' : `${pluralItems(ids.length)} reexibidos`,
        'show'
      );
    };

    const favoriteItems = (ids: string[], value: boolean) => {
      if (ids.length === 0) return;
      act({ type: 'favorite', ids, value });
    };

    const duplicateItems = (ids: string[]) => {
      for (const id of ids) act({ type: 'duplicate', id, newId: newId('copia') });
      showToast(ids.length === 1 ? 'Duplicado' : `${pluralItems(ids.length)} duplicados`, { icon: 'duplicate' });
    };

    const addToAlbum = (albumId: string, ids: string[]) => {
      const title = state.albums.find((album) => album.id === albumId)?.title ?? 'álbum';
      actWithUndo({ type: 'addToAlbum', albumId, ids }, `Adicionado a ${title}`, 'addToAlbum');
    };

    const removeFromAlbum = (albumId: string, ids: string[]) => {
      const title = state.albums.find((album) => album.id === albumId)?.title ?? 'álbum';
      actWithUndo({ type: 'removeFromAlbum', albumId, ids }, `Removido de ${title}`, 'close');
    };

    const openAlbumName = (next: AlbumNameState) => {
      setAlbumNameValue(next.mode === 'rename' ? next.current : '');
      setAlbumName(next);
    };

    const confirmAlbumName = () => {
      const title = albumNameValue.trim();
      if (!albumName || !title) return;
      if (albumName.mode === 'create') {
        const id = newId('album');
        act({ type: 'createAlbum', album: { id, title }, ids: albumName.ids });
        showToast(
          albumName.ids.length
            ? `Álbum "${title}" criado com ${pluralItems(albumName.ids.length)}`
            : `Álbum "${title}" criado`,
          { icon: 'newAlbum' }
        );
        if (albumName.ids.length === 0 && tab === 'albums') pushCollection({ kind: 'album', id });
        if (albumName.ids.length) endSelection();
      } else {
        act({ type: 'renameAlbum', albumId: albumName.albumId, title });
      }
      setAlbumName(null);
      setPickerIds(null);
    };

    /** Ações de compartilhamento (folha e menu). */
    const shareAction = (id: string, ids: string[]) => {
      switch (id) {
        case 'copy-link':
          showToast('Link copiado', { icon: 'link' });
          break;
        case 'copy':
          showToast(ids.length === 1 ? 'Copiado' : `${pluralItems(ids.length)} copiados`, { icon: 'copy' });
          break;
        case 'duplicate':
          duplicateItems(ids);
          break;
        case 'add-to-album':
          setShareIds(null);
          setPickerIds(ids);
          return;
        case 'save-to-files':
          showToast('Salvo em Arquivos', { icon: 'download' });
          break;
        case 'print':
          showToast('Enviado para impressão', { icon: 'print' });
          break;
        case 'slideshow': {
          const items = ids.map((itemId) => byId.get(itemId)).filter(Boolean) as UglMediaItem[];
          setShareIds(null);
          endSelection();
          if (items.length) {
            openViewer(items, 0, 'library');
            setSlideshow(true);
            setViewerChromeHidden(true);
          }
          return;
        }
        case 'hide':
          hideItems(ids);
          break;
        default:
          break;
      }
      setShareIds(null);
      endSelection();
    };

    /* ----------------------------------------------------------- Visualizador */
    const viewerItems = React.useMemo(() => {
      if (!viewer) return [];
      return viewer.ids
        .map((id) => byId.get(id))
        .filter((item): item is UglMediaItem => {
          if (!item) return false;
          if (viewer.context === 'trash') return Boolean(item.deletedAt);
          if (viewer.context === 'hidden') return Boolean(item.hidden) && !item.deletedAt;
          return !item.deletedAt && !item.hidden;
        });
    }, [viewer, byId]);

    const viewerIndex = viewer ? Math.min(viewer.index, Math.max(0, viewerItems.length - 1)) : 0;
    const viewerItem = viewerItems[viewerIndex];

    const closeViewer = () => {
      setViewer(null);
      setSlideshow(false);
      setInfoOpen(false);
      setViewerMenuOpen(false);
    };

    /** Depois de tirar o item aberto do contexto, fecha se não sobrou nada. */
    const afterRemovingFromViewer = () => {
      if (viewerItems.length <= 1) closeViewer();
    };

    React.useEffect(() => {
      if (!slideshow) return undefined;
      const timer = window.setInterval(() => {
        setViewer((current) => {
          if (!current) return current;
          if (current.index >= current.ids.length - 1) {
            setSlideshow(false);
            setViewerChromeHidden(false);
            return current;
          }
          return { ...current, index: current.index + 1 };
        });
      }, 3000);
      return () => window.clearInterval(timer);
    }, [slideshow]);

    const viewerMenuItems: UglActionMenuItem[] = !viewerItem
      ? []
      : viewer?.context === 'trash'
        ? [
            {
              id: 'restore',
              label: 'Recuperar',
              icon: 'restore',
              onSelect: () => {
                restoreItems([viewerItem.id]);
                afterRemovingFromViewer();
              },
            },
          ]
        : viewer?.context === 'hidden'
          ? [
              {
                id: 'show',
                label: 'Reexibir',
                icon: 'show',
                onSelect: () => {
                  unhideItems([viewerItem.id]);
                  afterRemovingFromViewer();
                },
              },
            ]
          : [
              {
                id: 'slideshow',
                label: 'Apresentação',
                icon: 'slideshow',
                onSelect: () => {
                  setSlideshow(true);
                  setViewerChromeHidden(true);
                },
              },
              { id: 'duplicate', label: 'Duplicar', icon: 'duplicate', onSelect: () => duplicateItems([viewerItem.id]) },
              { id: 'copy', label: 'Copiar', icon: 'copy', onSelect: () => showToast('Copiado', { icon: 'copy' }) },
              {
                id: 'album',
                label: 'Adicionar a um álbum',
                icon: 'addToAlbum',
                onSelect: () => setPickerIds([viewerItem.id]),
              },
              ...(uglIsEdited(viewerItem.edit)
                ? [
                    {
                      id: 'revert',
                      label: 'Reverter para o original',
                      icon: 'history' as const,
                      onSelect: () =>
                        actWithUndo(
                          { type: 'edit', id: viewerItem.id, edit: undefined },
                          'Revertido para o original',
                          'history'
                        ),
                    },
                  ]
                : []),
              { type: 'divider' as const, id: 'divisor' },
              {
                id: 'hide',
                label: 'Ocultar',
                icon: 'hide',
                onSelect: () => {
                  hideItems([viewerItem.id]);
                  afterRemovingFromViewer();
                },
              },
            ];

    /* ------------------------------------------------------ Barra de seleção */
    const selectionActions = (): UglSelectionBarAction[] => {
      const disabled = selectedIds.length === 0;
      if (currentCollection?.kind === 'trash') {
        return [
          {
            id: 'restore',
            icon: 'restore',
            label: 'Recuperar',
            disabled,
            onClick: () => {
              restoreItems(selectedIds);
              endSelection();
            },
          },
          {
            id: 'forever',
            icon: 'deleteForever',
            label: 'Apagar de vez',
            tone: 'danger',
            disabled,
            onClick: () => deleteForever(selectedIds, endSelection),
          },
        ];
      }
      if (currentCollection?.kind === 'hidden') {
        return [
          {
            id: 'show',
            icon: 'show',
            label: 'Reexibir',
            disabled,
            onClick: () => {
              unhideItems(selectedIds);
              endSelection();
            },
          },
          {
            id: 'delete',
            icon: 'delete',
            label: 'Excluir',
            tone: 'danger',
            disabled,
            onClick: () => trashItems(selectedIds, endSelection),
          },
        ];
      }
      const allFavorite = selectedIds.length > 0 && selectedIds.every((id) => byId.get(id)?.favorite);
      const actions: UglSelectionBarAction[] = [
        { id: 'share', icon: 'share', label: 'Compartilhar', disabled, onClick: () => setShareIds(selectedIds) },
        {
          id: 'favorite',
          icon: allFavorite ? 'favoriteFilled' : 'favorite',
          label: allFavorite ? 'Remover dos favoritos' : 'Favoritar',
          disabled,
          onClick: () => {
            favoriteItems(selectedIds, !allFavorite);
            endSelection();
          },
        },
        {
          id: 'album',
          icon: 'addToAlbum',
          label: 'Adicionar a um álbum',
          disabled,
          onClick: () => setPickerIds(selectedIds),
        },
      ];
      if (currentCollection?.kind === 'album') {
        const albumId = currentCollection.id;
        actions.push({
          id: 'remove',
          icon: 'close',
          label: 'Remover do álbum',
          disabled,
          onClick: () => {
            removeFromAlbum(albumId, selectedIds);
            endSelection();
          },
        });
      } else {
        actions.push({
          id: 'hide',
          icon: 'hide',
          label: 'Ocultar',
          disabled,
          onClick: () => {
            hideItems(selectedIds);
            endSelection();
          },
        });
      }
      actions.push({
        id: 'delete',
        icon: 'delete',
        label: 'Excluir',
        tone: 'danger',
        disabled,
        onClick: () => trashItems(selectedIds, endSelection),
      });
      return actions;
    };

    /* ----------------------------------------------------------------- Telas */
    let screen: React.ReactNode;
    if (currentCollection) {
      const parent = stack[stack.length - 2];
      const backText = parent ? collectionTitle(parent) : TAB_TITLES[tab];
      const albumId = currentCollection.kind === 'album' ? currentCollection.id : undefined;
      const isUserAlbum =
        albumId !== undefined && state.albums.find((album) => album.id === albumId)?.kind !== 'shared';
      const title = collectionTitle(currentCollection);
      screen = (
        <CollectionScreen
          key={`${tab}-${stack.length}`}
          collection={currentCollection}
          title={title}
          backText={backText}
          items={gridItems}
          onBack={popCollection}
          grid={grid}
          now={now}
          timeZone={timeZone}
          locked={currentCollection.kind === 'hidden' && !hiddenUnlocked}
          onUnlock={() => setHiddenUnlocked(true)}
          onAddPhotos={
            albumId
              ? () => {
                  setAddPhotosIds([]);
                  setAddPhotosAlbum(albumId);
                }
              : undefined
          }
          onRenameAlbum={
            albumId && isUserAlbum ? () => openAlbumName({ mode: 'rename', albumId, current: title }) : undefined
          }
          onDeleteAlbum={
            albumId && isUserAlbum
              ? () =>
                  setConfirm({
                    title: `Excluir o álbum "${title}"?`,
                    description: 'As fotos e os vídeos continuam na biblioteca.',
                    confirmLabel: 'Excluir álbum',
                    tone: 'danger',
                    onConfirm: () => {
                      actWithUndo({ type: 'deleteAlbum', albumId }, 'Álbum excluído', 'delete');
                      popCollection();
                    },
                  })
              : undefined
          }
          onRestoreAll={
            currentCollection.kind === 'trash'
              ? () => actWithUndo({ type: 'restoreAll' }, 'Tudo recuperado para a biblioteca', 'restore')
              : undefined
          }
          onEmptyTrash={
            currentCollection.kind === 'trash'
              ? () =>
                  setConfirm({
                    title: 'Apagar tudo de vez?',
                    description: `${pluralItems(trash.length)} serão apagados. Esta ação não pode ser desfeita.`,
                    confirmLabel: 'Apagar tudo',
                    tone: 'danger',
                    onConfirm: () => {
                      act({ type: 'emptyTrash' });
                      showToast('Excluídos recentemente está vazio', { icon: 'deleteForever' });
                    },
                  })
              : undefined
          }
          thumbnailProps={
            currentCollection.kind === 'trash'
              ? (item) => ({ daysLeft: uglDaysLeft(item.deletedAt!, { now, timeZone }) })
              : undefined
          }
        />
      );
    } else if (tab === 'library') {
      screen = (
        <LibraryScreen
          items={visibleItems}
          view={view}
          onViewChange={(next) => {
            setSelection(EMPTY_SELECTION);
            setView(next);
          }}
          filter={filter}
          onFilterChange={setFilter}
          columns={columns}
          onColumnsChange={setColumns}
          onOpenPeriod={(id, title) => pushCollection({ kind: 'period', id, title })}
          grid={grid}
          now={now}
          timeZone={timeZone}
        />
      );
    } else if (tab === 'foryou') {
      screen = (
        <ForYouScreen
          library={library}
          people={people}
          now={now}
          timeZone={timeZone}
          onOpenMemory={(items) => {
            openViewer(items, 0, 'library');
            setSlideshow(true);
            setViewerChromeHidden(true);
          }}
          onOpenCollection={pushCollection}
        />
      );
    } else if (tab === 'albums') {
      screen = (
        <AlbumsScreen
          albums={albums}
          library={library}
          hiddenCount={hidden.length}
          trashCount={trash.length}
          onOpenCollection={pushCollection}
          onNewAlbum={() => openAlbumName({ mode: 'create', ids: [] })}
        />
      );
    } else {
      screen = (
        <SearchScreen
          query={query}
          onQueryChange={setQuery}
          results={searchResults}
          library={library}
          people={people}
          now={now}
          timeZone={timeZone}
          onOpen={(_item, index, flat) => openViewer(flat, index, 'library')}
          onOpenCollection={pushCollection}
        />
      );
    }

    const shareItems = (shareIds ?? []).map((id) => byId.get(id)).filter(Boolean) as UglMediaItem[];
    const editingItem = editingId ? byId.get(editingId) : undefined;
    const anyOverlay =
      Boolean(viewer) ||
      Boolean(editingId) ||
      Boolean(shareIds) ||
      Boolean(pickerIds) ||
      Boolean(addPhotosAlbum) ||
      Boolean(albumName) ||
      Boolean(confirm);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === 'Escape' && selection.active && !anyOverlay) {
        event.preventDefault();
        endSelection();
      }
    };

    const contactsList: UglPerson[] = contacts ?? people;

    return (
      <div
        ref={ref}
        data-ugl-theme={theme}
        className={['ugl-gallery-app', className].filter(Boolean).join(' ')}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        <main className="ugl-gallery-app__main" aria-label={TAB_TITLES[tab]}>
          {screen}
        </main>

        {selection.active ? (
          <SelectionBar floating count={selectedIds.length} actions={selectionActions()} />
        ) : (
          <TabBar
            floating
            items={TABS}
            activeId={tab}
            onChange={changeTab}
            onReselect={reselectTab}
            ariaLabel="Navegação da galeria"
          />
        )}

        {viewer && viewerItems.length > 0 && (
          <MediaViewer
            items={viewerItems}
            index={viewerIndex}
            onIndexChange={(index) => setViewer((current) => (current ? { ...current, index } : current))}
            onClose={closeViewer}
            now={now}
            timeZone={timeZone}
            chromeHidden={viewerChromeHidden}
            onChromeHiddenChange={(value) => {
              setViewerChromeHidden(value);
              if (!value) setSlideshow(false);
            }}
            infoOpen={infoOpen}
            onInfo={() => setInfoOpen((value) => !value)}
            onShare={viewer.context === 'library' ? (item) => setShareIds([item.id]) : undefined}
            onFavorite={viewer.context === 'library' ? (item, next) => favoriteItems([item.id], next) : undefined}
            onEdit={viewer.context === 'library' ? (item) => setEditingId(item.id) : undefined}
            onDelete={(item) =>
              viewer.context === 'trash'
                ? deleteForever([item.id], afterRemovingFromViewer)
                : trashItems([item.id], afterRemovingFromViewer)
            }
            onMore={(_item, anchor) => {
              viewerMenuAnchor.current = anchor;
              setViewerMenuOpen(true);
            }}
          />
        )}

        {viewer && viewerItem && (
          <ActionMenu
            open={viewerMenuOpen}
            onClose={() => setViewerMenuOpen(false)}
            items={viewerMenuItems}
            anchorRef={viewerMenuAnchor}
            placement="bottom-end"
            ariaLabel="Mais opções da mídia"
            variant="immersive"
          />
        )}

        {viewer && viewerItem && (
          <BottomSheet
            open={infoOpen}
            onClose={() => setInfoOpen(false)}
            title="Informações"
            height="half"
            variant="immersive"
          >
            <InfoPanel
              item={viewerItem}
              people={people}
              albums={albums}
              timeZone={timeZone}
              variant="immersive"
              onDescriptionChange={(text) => act({ type: 'describe', id: viewerItem.id, description: text })}
            />
          </BottomSheet>
        )}

        {editingItem && (
          <PhotoEditor
            item={editingItem}
            now={now}
            timeZone={timeZone}
            onCancel={() => setEditingId(null)}
            onSave={(edit: UglEditState) => {
              actWithUndo(
                { type: 'edit', id: editingItem.id, edit: uglIsEdited(edit) ? edit : undefined },
                'Edição salva',
                'checkCircle'
              );
              setEditingId(null);
            }}
          />
        )}

        <ShareSheet
          open={shareItems.length > 0}
          onClose={() => setShareIds(null)}
          items={shareItems}
          contacts={contactsList}
          variant={viewer ? 'immersive' : 'default'}
          onContact={(person) => {
            showToast(`Enviado para ${person.name}`, { icon: 'send' });
            setShareIds(null);
            endSelection();
          }}
          onAction={(id) => shareAction(id, shareIds ?? [])}
        />

        <BottomSheet
          open={Boolean(pickerIds)}
          onClose={() => setPickerIds(null)}
          title="Adicionar a um álbum"
          description={pickerIds ? uglFormatSelection(pickerIds.length) : undefined}
          variant={viewer ? 'immersive' : 'default'}
        >
          <ListGroup inset>
            <ListRow
              icon="newAlbum"
              iconTone="accent"
              title="Novo álbum…"
              chevron={false}
              onClick={() => openAlbumName({ mode: 'create', ids: pickerIds ?? [] })}
            />
            {albums
              .filter((album) => album.kind !== 'shared')
              .map((album) => (
                <ListRow
                  key={album.id}
                  icon="albums"
                  iconTone="accent"
                  title={album.title}
                  detail={album.count}
                  chevron={false}
                  onClick={() => {
                    addToAlbum(album.id, pickerIds ?? []);
                    setPickerIds(null);
                    endSelection();
                  }}
                />
              ))}
          </ListGroup>
        </BottomSheet>

        <BottomSheet
          open={Boolean(addPhotosAlbum)}
          onClose={() => setAddPhotosAlbum(null)}
          title="Adicionar fotos"
          description={uglFormatSelection(addPhotosIds.length)}
          height="full"
          footer={
            <Button
              fullWidth
              disabled={addPhotosIds.length === 0}
              onClick={() => {
                if (addPhotosAlbum) addToAlbum(addPhotosAlbum, addPhotosIds);
                setAddPhotosAlbum(null);
              }}
            >
              {addPhotosIds.length ? `Adicionar ${pluralItems(addPhotosIds.length)}` : 'Adicionar'}
            </Button>
          }
        >
          <div className="ugl-gallery-app__picker">
            <MediaGrid
              items={library}
              groupBy="day"
              selectable
              selectedIds={addPhotosIds}
              onToggle={(item) =>
                setAddPhotosIds((current) =>
                  current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]
                )
              }
              onToggleSection={(section, allSelected) =>
                setAddPhotosIds((current) => {
                  const ids = section.items.map((item) => item.id);
                  return allSelected
                    ? current.filter((id) => !ids.includes(id))
                    : [...new Set([...current, ...ids])];
                })
              }
              onRangeSelect={(items) =>
                setAddPhotosIds((current) => [...new Set([...current, ...items.map((item) => item.id)])])
              }
              now={now}
              timeZone={timeZone}
              ariaLabel="Escolha as fotos"
            />
          </div>
        </BottomSheet>

        <ConfirmDialog
          open={Boolean(albumName)}
          title={albumName?.mode === 'rename' ? 'Renomear álbum' : 'Novo álbum'}
          description={albumName?.mode === 'rename' ? 'Escolha um novo nome.' : 'Dê um nome a este álbum.'}
          confirmLabel={albumName?.mode === 'rename' ? 'Salvar' : 'Criar'}
          confirmDisabled={albumNameValue.trim().length === 0}
          onConfirm={confirmAlbumName}
          onCancel={() => setAlbumName(null)}
        >
          <TextField
            label="Nome do álbum"
            hideLabel
            placeholder="Título"
            value={albumNameValue}
            onChange={(value) => setAlbumNameValue(value)}
            maxLength={40}
          />
        </ConfirmDialog>

        <ConfirmDialog
          open={Boolean(confirm)}
          title={confirm?.title ?? ''}
          description={confirm?.description}
          confirmLabel={confirm?.confirmLabel}
          tone={confirm?.tone}
          onConfirm={() => {
            const current = confirm;
            setConfirm(null);
            current?.onConfirm();
          }}
          onCancel={() => setConfirm(null)}
        />

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
          offset={viewer ? 120 : TAB_BAR_HEIGHT + 12}
        />
      </div>
    );
  }
);

GalleryApp.displayName = 'GalleryApp';
