import React from 'react';
import type { UglAlbum, UglMediaItem, UglMediaSubtype, UglPerson } from '../../media';
import type { UglTheme } from '../../tokens';
import type { UglGalleryAction, UglGalleryState } from './galleryState';

/**
 * Abas da galeria.
 */
export type UglGalleryTab = 'library' | 'foryou' | 'albums' | 'search';

/**
 * Visões da biblioteca, do mais agregado ao mais detalhado.
 */
export type UglGalleryLibraryView = 'years' | 'months' | 'all';

/**
 * Filtro da biblioteca.
 */
export type UglGalleryFilter = 'all' | 'photos' | 'videos' | 'favorites';

/**
 * Uma coleção navegável: álbum, álbum inteligente, período, pessoa ou os dois
 * álbuns protegidos.
 */
export type UglGalleryCollection =
  | { kind: 'album'; id: string }
  | { kind: 'recent' }
  | { kind: 'favorites' }
  | { kind: 'videos' }
  | { kind: 'subtype'; subtype: UglMediaSubtype }
  | { kind: 'period'; id: string; title: string }
  | { kind: 'person'; id: string }
  | { kind: 'hidden' }
  | { kind: 'trash' };

/**
 * Propriedades do componente GalleryApp da Unoogaleria.
 */
export interface UglGalleryAppProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /**
   * Biblioteca inicial, com os itens ocultos e os da lixeira. O app passa a
   * guardar o estado a partir daqui; acompanhe por `onStateChange`.
   */
  defaultItems: UglMediaItem[];

  /**
   * Álbuns iniciais criados pela pessoa (e compartilhados). Contagem e capa
   * são recalculadas dos itens.
   * @default []
   */
  defaultAlbums?: UglAlbum[];

  /**
   * Pessoas reconhecidas nas fotos (resolve `item.people`).
   * @default []
   */
  people?: UglPerson[];

  /**
   * Contatos oferecidos na folha de compartilhamento.
   * @default people
   */
  contacts?: UglPerson[];

  /**
   * Momento de referência para "Hoje", "Ontem" e os prazos da lixeira. Fixe-o
   * em demonstrações e testes; em produção, deixe vazio.
   */
  now?: Date | string;

  /**
   * Fuso de leitura das datas.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Aba aberta ao montar.
   * @default 'library'
   */
  initialTab?: UglGalleryTab;

  /**
   * Visão da biblioteca ao montar.
   * @default 'all'
   */
  initialView?: UglGalleryLibraryView;

  /**
   * Chamado a cada mudança da biblioteca, com o estado inteiro.
   */
  onStateChange?: (state: UglGalleryState) => void;

  /**
   * Chamado a cada operação sobre a biblioteca, antes de ela ser aplicada —
   * útil para registrar o que a pessoa fez (favoritar, excluir, criar álbum).
   */
  onAction?: (action: UglGalleryAction) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
