import type {
  UglAlbum,
  UglEditState,
  UglMediaItem,
  UglMediaSubtype,
  UglPerson,
} from '../../media';
import { uglSortByDate } from '../../media';

/**
 * Estado da biblioteca do `GalleryApp` e as operações que a galeria oferece.
 *
 * É lógica pura, sem React: um redutor e seletores. Fica separado da interface
 * para que um produto que monte a própria galeria com os componentes do módulo
 * reaproveite exatamente as mesmas regras — o que vai para a lixeira, o que sai
 * da biblioteca ao ocultar, como a capa e a contagem de um álbum acompanham os
 * itens.
 */

/**
 * Estado da biblioteca.
 */
export interface UglGalleryState {
  /** Todos os itens: visíveis, ocultos e na lixeira */
  items: UglMediaItem[];
  /** Álbuns criados pela pessoa e compartilhados */
  albums: UglAlbum[];
}

/**
 * Operações sobre a biblioteca.
 */
export type UglGalleryAction =
  | { type: 'favorite'; ids: string[]; value: boolean }
  | { type: 'trash'; ids: string[]; at: string }
  | { type: 'restore'; ids: string[] }
  | { type: 'deleteForever'; ids: string[] }
  | { type: 'emptyTrash' }
  | { type: 'restoreAll' }
  | { type: 'hide'; ids: string[] }
  | { type: 'unhide'; ids: string[] }
  | { type: 'describe'; id: string; description: string }
  | { type: 'edit'; id: string; edit: UglEditState | undefined }
  | { type: 'duplicate'; id: string; newId: string }
  | { type: 'createAlbum'; album: Pick<UglAlbum, 'id' | 'title'>; ids?: string[] }
  | { type: 'renameAlbum'; albumId: string; title: string }
  | { type: 'deleteAlbum'; albumId: string }
  | { type: 'addToAlbum'; albumId: string; ids: string[] }
  | { type: 'removeFromAlbum'; albumId: string; ids: string[] }
  | { type: 'replace'; state: UglGalleryState };

const touch = (items: UglMediaItem[], ids: string[], change: (item: UglMediaItem) => UglMediaItem) => {
  const set = new Set(ids);
  return items.map((item) => (set.has(item.id) ? change(item) : item));
};

const withoutDeletedAt = (item: UglMediaItem): UglMediaItem => {
  const copy = { ...item };
  delete copy.deletedAt;
  return copy;
};

/**
 * Redutor da biblioteca. Nunca altera o estado recebido.
 */
export function uglGalleryReducer(state: UglGalleryState, action: UglGalleryAction): UglGalleryState {
  switch (action.type) {
    case 'favorite':
      return { ...state, items: touch(state.items, action.ids, (item) => ({ ...item, favorite: action.value })) };

    case 'trash':
      return { ...state, items: touch(state.items, action.ids, (item) => ({ ...item, deletedAt: action.at })) };

    case 'restore':
      return { ...state, items: touch(state.items, action.ids, withoutDeletedAt) };

    case 'deleteForever': {
      const set = new Set(action.ids);
      return { ...state, items: state.items.filter((item) => !set.has(item.id)) };
    }

    case 'emptyTrash':
      return { ...state, items: state.items.filter((item) => !item.deletedAt) };

    case 'restoreAll':
      return { ...state, items: state.items.map((item) => (item.deletedAt ? withoutDeletedAt(item) : item)) };

    case 'hide':
      return { ...state, items: touch(state.items, action.ids, (item) => ({ ...item, hidden: true })) };

    case 'unhide':
      return { ...state, items: touch(state.items, action.ids, (item) => ({ ...item, hidden: false })) };

    case 'describe':
      return {
        ...state,
        items: touch(state.items, [action.id], (item) => ({
          ...item,
          description: action.description.trim() || undefined,
        })),
      };

    case 'edit':
      return { ...state, items: touch(state.items, [action.id], (item) => ({ ...item, edit: action.edit })) };

    case 'duplicate': {
      const index = state.items.findIndex((item) => item.id === action.id);
      if (index < 0) return state;
      const copy: UglMediaItem = { ...state.items[index], id: action.newId, favorite: false };
      const items = [...state.items];
      items.splice(index + 1, 0, copy);
      return { ...state, items };
    }

    case 'createAlbum': {
      const albums: UglAlbum[] = [
        ...state.albums,
        { id: action.album.id, title: action.album.title.trim(), kind: 'user', count: 0 },
      ];
      const items = action.ids?.length
        ? touch(state.items, action.ids, (item) => ({
            ...item,
            albumIds: [...new Set([...(item.albumIds ?? []), action.album.id])],
          }))
        : state.items;
      return { items, albums };
    }

    case 'renameAlbum':
      return {
        ...state,
        albums: state.albums.map((album) =>
          album.id === action.albumId ? { ...album, title: action.title.trim() || album.title } : album
        ),
      };

    case 'deleteAlbum':
      return {
        albums: state.albums.filter((album) => album.id !== action.albumId),
        items: state.items.map((item) =>
          item.albumIds?.includes(action.albumId)
            ? { ...item, albumIds: item.albumIds.filter((id) => id !== action.albumId) }
            : item
        ),
      };

    case 'addToAlbum':
      return {
        ...state,
        items: touch(state.items, action.ids, (item) => ({
          ...item,
          albumIds: [...new Set([...(item.albumIds ?? []), action.albumId])],
        })),
      };

    case 'removeFromAlbum':
      return {
        ...state,
        items: touch(state.items, action.ids, (item) => ({
          ...item,
          albumIds: (item.albumIds ?? []).filter((id) => id !== action.albumId),
        })),
      };

    case 'replace':
      return action.state;

    default:
      return state;
  }
}

/* ==========================================================================
   Seletores
   ========================================================================== */

/** Itens da biblioteca: nem ocultos nem na lixeira, do mais recente ao mais antigo. */
export const uglSelectLibrary = (items: UglMediaItem[]) =>
  uglSortByDate(items.filter((item) => !item.deletedAt && !item.hidden));

/** Itens na lixeira, do excluído mais recente ao mais antigo. */
export const uglSelectTrash = (items: UglMediaItem[]) =>
  items
    .filter((item) => item.deletedAt)
    .sort((a, b) => new Date(b.deletedAt!).getTime() - new Date(a.deletedAt!).getTime());

/** Itens ocultos (fora da lixeira). */
export const uglSelectHidden = (items: UglMediaItem[]) =>
  uglSortByDate(items.filter((item) => item.hidden && !item.deletedAt));

/** Favoritos da biblioteca. */
export const uglSelectFavorites = (items: UglMediaItem[]) =>
  uglSelectLibrary(items).filter((item) => item.favorite);

/** Vídeos da biblioteca. */
export const uglSelectVideos = (items: UglMediaItem[]) =>
  uglSelectLibrary(items).filter((item) => item.type === 'video');

/** Itens da biblioteca de um subtipo. */
export const uglSelectSubtype = (items: UglMediaItem[], subtype: UglMediaSubtype) =>
  uglSelectLibrary(items).filter((item) => item.subtypes?.includes(subtype));

/** Itens de um álbum (fora da lixeira; ocultos não aparecem em álbuns). */
export const uglSelectAlbumItems = (items: UglMediaItem[], albumId: string) =>
  uglSelectLibrary(items).filter((item) => item.albumIds?.includes(albumId));

/**
 * Álbuns com contagem e capa calculadas dos itens atuais: a capa é o item mais
 * recente do álbum, e some se o álbum esvaziar.
 */
export const uglSelectAlbums = (state: UglGalleryState): UglAlbum[] =>
  state.albums.map((album) => {
    const albumItems = uglSelectAlbumItems(state.items, album.id);
    const cover = albumItems[0];
    return {
      ...album,
      count: albumItems.length,
      coverSrc: cover?.src,
      coverAlt: cover?.alt,
    };
  });

/** Remove acentos e caixa, para a busca casar "aniversario" com "Aniversário". */
export const uglNormalizeSearch = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

/**
 * Busca na biblioteca por conteúdo, lugar, pessoa, legenda e nome de arquivo.
 * Todas as palavras da consulta precisam casar com o INÍCIO de alguma palavra
 * (em qualquer campo): "ana" acha a Ana, e não a Serra da Canastra.
 */
export const uglSearchMedia = (items: UglMediaItem[], query: string, people: UglPerson[] = []) => {
  const terms = uglNormalizeSearch(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  const names = new Map(people.map((person) => [person.id, person.name]));

  return uglSelectLibrary(items).filter((item) => {
    const words = uglNormalizeSearch(
      [
        item.alt,
        item.location,
        item.description,
        item.fileName,
        ...(item.tags ?? []),
        ...(item.people ?? []).map((id) => names.get(id) ?? ''),
        item.type === 'video' ? 'vídeo' : 'foto',
      ]
        .filter(Boolean)
        .join(' ')
    ).split(/[^a-z0-9]+/);
    return terms.every((term) => words.some((word) => word.startsWith(term)));
  });
};
