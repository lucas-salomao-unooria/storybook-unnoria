'use client';

import React from 'react';
import type { UglAlbum, UglMediaItem, UglMediaSection, UglMediaSubtype, UglPerson } from '../../media';
import {
  uglDayKey,
  uglFormatCount,
  uglFormatDayLabel,
  uglFormatLongDate,
  uglFormatSelection,
  uglGroupMedia,
  UGL_DEFAULT_TIME_ZONE,
} from '../../media';
import type { UglIconName } from '../Icon';
import { ActionMenu } from '../ActionMenu';
import type { UglActionMenuItem } from '../ActionMenu';
import { AlbumCard } from '../AlbumCard';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Chip } from '../Chip';
import { EmptyState } from '../EmptyState';
import { HighlightCard } from '../HighlightCard';
import { IconButton } from '../IconButton';
import { ListGroup, ListRow } from '../ListRow';
import { MediaGrid } from '../MediaGrid';
import type { UglMediaGridThumbnailOverrides } from '../MediaGrid';
import { SearchField } from '../SearchField';
import { SectionHeader } from '../SectionHeader';
import { SegmentedControl } from '../SegmentedControl';
import { TopBar } from '../TopBar';
import type { UglGalleryCollection, UglGalleryFilter, UglGalleryLibraryView } from './GalleryApp.types';

/* ==========================================================================
   Vocabulário compartilhado pelas telas
   ========================================================================== */

/** Altura do conteúdo das barras, em px (os tokens `--ugl-topbar-height` e `--ugl-tabbar-height`). */
export const BAR_HEIGHT = 44;
export const TAB_BAR_HEIGHT = 50;
/** Espaço reservado ao controle "Anos | Meses | Todas" sobre a grade. */
const SEGMENTED_SPACE = 60;

/** Títulos das coleções por subtipo, no plural. */
export const UGL_SUBTYPE_TITLES: Record<UglMediaSubtype, string> = {
  selfie: 'Selfies',
  live: 'Fotos com movimento',
  screenshot: 'Capturas de tela',
  panorama: 'Panoramas',
  burst: 'Sequências',
  hdr: 'HDR',
};

/** Glifos das coleções por subtipo. */
export const UGL_SUBTYPE_ICONS: Record<UglMediaSubtype, UglIconName> = {
  selfie: 'selfie',
  live: 'livePhoto',
  screenshot: 'screenshot',
  panorama: 'panorama',
  burst: 'burst',
  hdr: 'hdr',
};

/** Categorias oferecidas pela busca antes de a pessoa digitar. */
export const UGL_SEARCH_CATEGORIES: { id: string; label: string; icon: UglIconName; query: string }[] = [
  { id: 'animais', label: 'Animais', icon: 'pets', query: 'animais' },
  { id: 'comida', label: 'Comida', icon: 'food', query: 'comida' },
  { id: 'paisagem', label: 'Paisagens', icon: 'landscape', query: 'paisagem' },
  { id: 'cidade', label: 'Cidades', icon: 'city', query: 'cidade' },
  { id: 'natureza', label: 'Natureza', icon: 'nature', query: 'natureza' },
  { id: 'viagem', label: 'Viagens', icon: 'travel', query: 'viagem' },
  { id: 'aniversario', label: 'Aniversários', icon: 'birthday', query: 'aniversário' },
  { id: 'documento', label: 'Documentos', icon: 'document', query: 'documento' },
];

/** Estado da seleção múltipla. */
export interface UglSelectionState {
  active: boolean;
  ids: string[];
}

/** Manipuladores da grade compartilhados pelas telas que a exibem. */
export interface GridHandlers {
  selection: UglSelectionState;
  onOpen: (item: UglMediaItem, index: number, flat: UglMediaItem[]) => void;
  onToggle: (item: UglMediaItem) => void;
  onToggleSection: (section: UglMediaSection, allSelected: boolean) => void;
  onRangeSelect: (items: UglMediaItem[]) => void;
  onLongPress: (item: UglMediaItem) => void;
  onStartSelection: () => void;
  onCancelSelection: () => void;
  onSelectAll: (items: UglMediaItem[]) => void;
}

/** Opções de data comuns às telas. */
interface DateProps {
  now?: Date | string;
  timeZone?: string;
}

/** Botões da barra durante a seleção: "Selecionar tudo" e "Cancelar". */
const selectionBarButtons = (items: UglMediaItem[], grid: GridHandlers) => {
  const allSelected = items.length > 0 && items.every((item) => grid.selection.ids.includes(item.id));
  return {
    leading: (
      <Button variant="tertiary" size="sm" onClick={() => grid.onSelectAll(allSelected ? [] : items)}>
        {allSelected ? 'Desmarcar tudo' : 'Selecionar tudo'}
      </Button>
    ),
    actions: (
      <Button variant="tertiary" size="sm" onClick={grid.onCancelSelection}>
        Cancelar
      </Button>
    ),
  };
};

/** Botão "Mais" com o menu ancorado nele. */
const MoreMenu = ({ label, items }: { label: string; items: UglActionMenuItem[] }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton
        ref={anchorRef}
        icon="more"
        label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      />
      <ActionMenu
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        anchorRef={anchorRef}
        placement="bottom-end"
        ariaLabel={label}
      />
    </>
  );
};

/** Botão de pessoa (retrato e nome), usado em Para você e na Busca. */
const PersonButton = ({
  person,
  size,
  onClick,
}: {
  person: UglPerson;
  size: 'md' | 'lg';
  onClick: () => void;
}) => (
  <button type="button" className="ugl-gallery-app__person" onClick={onClick}>
    <Avatar src={person.avatarSrc} name={person.name} size={size} decorative />
    <span className="ugl-gallery-app__person-name">{person.name}</span>
  </button>
);

/* ==========================================================================
   Biblioteca
   ========================================================================== */

export interface LibraryScreenProps extends DateProps {
  items: UglMediaItem[];
  view: UglGalleryLibraryView;
  onViewChange: (view: UglGalleryLibraryView) => void;
  filter: UglGalleryFilter;
  onFilterChange: (filter: UglGalleryFilter) => void;
  columns: number;
  onColumnsChange: (columns: number) => void;
  onOpenPeriod: (id: string, title: string) => void;
  grid: GridHandlers;
}

const ZOOM_LEVELS = [3, 5, 7];

const FILTER_LABELS: Record<UglGalleryFilter, string> = {
  all: 'Todos os itens',
  photos: 'Só fotos',
  videos: 'Só vídeos',
  favorites: 'Só favoritos',
};

/**
 * Biblioteca: a grade de todos os itens por dia, ou as capas por mês e por ano.
 */
export const LibraryScreen = ({
  items,
  view,
  onViewChange,
  filter,
  onFilterChange,
  columns,
  onColumnsChange,
  onOpenPeriod,
  grid,
  now,
  timeZone = UGL_DEFAULT_TIME_ZONE,
}: LibraryScreenProps) => {
  const selecting = grid.selection.active;
  const zoomIndex = ZOOM_LEVELS.indexOf(columns);

  const menuItems: UglActionMenuItem[] = [
    {
      id: 'zoom-in',
      label: 'Aumentar miniaturas',
      icon: 'zoomIn',
      disabled: view !== 'all' || zoomIndex <= 0,
      onSelect: () => onColumnsChange(ZOOM_LEVELS[Math.max(0, zoomIndex - 1)]),
    },
    {
      id: 'zoom-out',
      label: 'Diminuir miniaturas',
      icon: 'zoomOut',
      disabled: view !== 'all' || zoomIndex >= ZOOM_LEVELS.length - 1,
      onSelect: () => onColumnsChange(ZOOM_LEVELS[Math.min(ZOOM_LEVELS.length - 1, zoomIndex + 1)]),
    },
    { type: 'divider', id: 'filtros' },
    ...(Object.keys(FILTER_LABELS) as UglGalleryFilter[]).map((id) => ({
      id: `filter-${id}`,
      label: FILTER_LABELS[id],
      icon: filter === id ? ('check' as const) : undefined,
      onSelect: () => onFilterChange(id),
    })),
  ];

  const selectionButtons = selectionBarButtons(items, grid);

  const empty = (
    <EmptyState
      icon={filter === 'favorites' ? 'favorite' : filter === 'videos' ? 'video' : 'library'}
      title={filter === 'all' ? 'Nenhuma foto ou vídeo' : `Nada em "${FILTER_LABELS[filter]}"`}
      description={
        filter === 'all'
          ? 'As fotos e os vídeos que você fizer aparecem aqui.'
          : 'Mude o filtro no menu de opções para ver toda a biblioteca.'
      }
      action={
        filter !== 'all' ? (
          <Button variant="secondary" onClick={() => onFilterChange('all')}>
            Mostrar tudo
          </Button>
        ) : undefined
      }
    />
  );

  let body: React.ReactNode;
  if (view === 'all') {
    body = (
      <MediaGrid
        items={items}
        groupBy="day"
        columns={columns}
        onColumnsChange={onColumnsChange}
        zoomLevels={ZOOM_LEVELS}
        selectable={selecting}
        selectedIds={grid.selection.ids}
        onToggle={grid.onToggle}
        onToggleSection={grid.onToggleSection}
        onRangeSelect={grid.onRangeSelect}
        onOpen={grid.onOpen}
        onLongPress={grid.onLongPress}
        now={now}
        timeZone={timeZone}
        topInset={BAR_HEIGHT}
        bottomInset={TAB_BAR_HEIGHT + (selecting ? 0 : SEGMENTED_SPACE)}
        emptyState={empty}
        footer={items.length ? <p className="ugl-gallery-app__footnote">{uglFormatCount(items)}</p> : undefined}
        ariaLabel="Biblioteca"
      />
    );
  } else {
    const groups = uglGroupMedia(items, view === 'months' ? 'month' : 'year', { now, timeZone });
    body = (
      <div className="ugl-gallery-app__scroll ugl-gallery-app__scroll--under-bar ugl-gallery-app__scroll--above-segmented">
        {groups.length === 0 ? (
          empty
        ) : (
          <ul className="ugl-gallery-app__cards" role="list">
            {groups.map((group) => {
              const [cover, ...rest] = group.items;
              return (
                <li key={group.id}>
                  <HighlightCard
                    size={view === 'years' ? 'lg' : 'md'}
                    coverSrc={cover.src}
                    coverAlt={cover.alt}
                    title={group.title}
                    subtitle={group.subtitle}
                    count={uglFormatCount(group.items)}
                    mosaic={rest.slice(0, 3).map((item) => ({ src: item.src, alt: item.alt }))}
                    onClick={() =>
                      view === 'years' ? onViewChange('months') : onOpenPeriod(group.id, group.title)
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="ugl-gallery-app__screen">
      {body}
      <TopBar
        variant="overlay"
        title={selecting ? uglFormatSelection(grid.selection.ids.length) : 'Biblioteca'}
        subtitle={!selecting && filter !== 'all' ? FILTER_LABELS[filter] : undefined}
        leading={selecting ? selectionButtons.leading : undefined}
        actions={
          selecting ? (
            selectionButtons.actions
          ) : (
            <>
              {view === 'all' && items.length > 0 && (
                <Button variant="tertiary" size="sm" onClick={grid.onStartSelection}>
                  Selecionar
                </Button>
              )}
              <MoreMenu label="Opções da biblioteca" items={menuItems} />
            </>
          )
        }
      />
      {!selecting && (
        <div className="ugl-gallery-app__segmented">
          <SegmentedControl
            variant="floating"
            ariaLabel="Agrupar a biblioteca"
            value={view}
            onChange={(id) => onViewChange(id as UglGalleryLibraryView)}
            options={[
              { id: 'years', label: 'Anos' },
              { id: 'months', label: 'Meses' },
              { id: 'all', label: 'Todas' },
            ]}
          />
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   Para você
   ========================================================================== */

export interface ForYouScreenProps extends DateProps {
  library: UglMediaItem[];
  people: UglPerson[];
  onOpenMemory: (items: UglMediaItem[]) => void;
  onOpenCollection: (collection: UglGalleryCollection) => void;
}

/**
 * Memórias do mesmo lugar e do mesmo dia com pelo menos dois itens, da mais
 * recente à mais antiga.
 */
const buildMemories = (library: UglMediaItem[], timeZone: string) => {
  const clusters = new Map<string, UglMediaItem[]>();
  for (const item of library) {
    if (!item.location) continue;
    const key = `${uglDayKey(item.takenAt, timeZone)}|${item.location}`;
    const bucket = clusters.get(key);
    if (bucket) bucket.push(item);
    else clusters.set(key, [item]);
  }
  return Array.from(clusters.entries())
    .filter(([, items]) => items.length >= 2)
    .map(([id, items]) => ({ id, items }))
    .slice(0, 6);
};

/**
 * Para você: memórias montadas pela galeria, pessoas e favoritos.
 */
export const ForYouScreen = ({
  library,
  people,
  onOpenMemory,
  onOpenCollection,
  now,
  timeZone = UGL_DEFAULT_TIME_ZONE,
}: ForYouScreenProps) => {
  const memories = buildMemories(library, timeZone);
  const favorites = library.filter((item) => item.favorite);
  const knownPeople = people.filter((person) => library.some((item) => item.people?.includes(person.id)));
  const reference = now === undefined ? new Date() : now instanceof Date ? now : new Date(now);
  const todayLabel = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(reference);

  return (
    <div className="ugl-gallery-app__screen">
      <div className="ugl-gallery-app__scroll">
        <TopBar
          variant="large"
          title="Para você"
          subtitle={todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1)}
        />

        <section className="ugl-gallery-app__section" aria-labelledby="ugl-gallery-memorias">
          <SectionHeader id="ugl-gallery-memorias" title="Memórias" size="lg" />
          {memories.length === 0 ? (
            <EmptyState
              icon="memories"
              title="Sem memórias por enquanto"
              description="Quando você fotografar mais de uma vez no mesmo lugar, a galeria monta uma memória."
            />
          ) : (
            <ul className="ugl-gallery-app__cards" role="list">
              {memories.map(({ id, items }) => {
                const [cover, ...rest] = items;
                return (
                  <li key={id}>
                    <HighlightCard
                      coverSrc={cover.src}
                      coverAlt={cover.alt}
                      eyebrow={uglFormatDayLabel(cover.takenAt, { now, timeZone })}
                      title={cover.location ?? ''}
                      subtitle={uglFormatLongDate(cover.takenAt, timeZone)}
                      count={uglFormatCount(items)}
                      mosaic={rest.slice(0, 3).map((item) => ({ src: item.src, alt: item.alt }))}
                      onClick={() => onOpenMemory(items)}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {knownPeople.length > 0 && (
          <section className="ugl-gallery-app__section" aria-labelledby="ugl-gallery-pessoas">
            <SectionHeader id="ugl-gallery-pessoas" title="Pessoas" size="lg" />
            <ul className="ugl-gallery-app__people" role="list">
              {knownPeople.map((person) => (
                <li key={person.id}>
                  <PersonButton
                    person={person}
                    size="lg"
                    onClick={() => onOpenCollection({ kind: 'person', id: person.id })}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {favorites.length > 0 && (
          <section className="ugl-gallery-app__section" aria-labelledby="ugl-gallery-favoritos">
            <SectionHeader id="ugl-gallery-favoritos" title="Favoritos" size="lg" />
            <div className="ugl-gallery-app__cards">
              <HighlightCard
                coverSrc={favorites[0].src}
                coverAlt={favorites[0].alt}
                title="Seus favoritos"
                count={uglFormatCount(favorites)}
                mosaic={favorites.slice(1, 4).map((item) => ({ src: item.src, alt: item.alt }))}
                onClick={() => onOpenCollection({ kind: 'favorites' })}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   Álbuns
   ========================================================================== */

export interface AlbumsScreenProps {
  albums: UglAlbum[];
  library: UglMediaItem[];
  hiddenCount: number;
  trashCount: number;
  onOpenCollection: (collection: UglGalleryCollection) => void;
  onNewAlbum: () => void;
}

/**
 * Álbuns: os da pessoa, os compartilhados, os tipos de mídia e os utilitários.
 */
export const AlbumsScreen = ({
  albums,
  library,
  hiddenCount,
  trashCount,
  onOpenCollection,
  onNewAlbum,
}: AlbumsScreenProps) => {
  const favorites = library.filter((item) => item.favorite);
  const smart: UglAlbum[] = [
    {
      id: '__recent',
      title: 'Recentes',
      kind: 'smart',
      count: library.length,
      coverSrc: library[0]?.src,
      coverAlt: library[0]?.alt,
    },
    {
      id: '__favorites',
      title: 'Favoritos',
      kind: 'smart',
      count: favorites.length,
      coverSrc: favorites[0]?.src,
      coverAlt: favorites[0]?.alt,
    },
  ];
  const mine = albums.filter((album) => album.kind !== 'shared');
  const shared = albums.filter((album) => album.kind === 'shared');
  const videos = library.filter((item) => item.type === 'video').length;
  const subtypeCount = (subtype: UglMediaSubtype) =>
    library.filter((item) => item.subtypes?.includes(subtype)).length;

  const openAlbum = (album: UglAlbum) =>
    onOpenCollection(
      album.id === '__recent'
        ? { kind: 'recent' }
        : album.id === '__favorites'
          ? { kind: 'favorites' }
          : { kind: 'album', id: album.id }
    );

  return (
    <div className="ugl-gallery-app__screen">
      <div className="ugl-gallery-app__scroll">
        <TopBar
          variant="large"
          title="Álbuns"
          actions={<IconButton icon="add" label="Novo álbum" variant="tinted" onClick={onNewAlbum} />}
        />

        <section className="ugl-gallery-app__section" aria-labelledby="ugl-gallery-meus-albuns">
          <SectionHeader id="ugl-gallery-meus-albuns" title="Meus álbuns" size="lg" />
          <ul className="ugl-gallery-app__albums" role="list">
            {[...smart, ...mine].map((album) => (
              <li key={album.id}>
                <AlbumCard
                  album={album}
                  onClick={openAlbum}
                  placeholderIcon={album.id === '__favorites' ? 'favorite' : 'albums'}
                />
              </li>
            ))}
          </ul>
        </section>

        {shared.length > 0 && (
          <section className="ugl-gallery-app__section" aria-labelledby="ugl-gallery-compartilhados">
            <SectionHeader id="ugl-gallery-compartilhados" title="Compartilhados" size="lg" />
            <ul className="ugl-gallery-app__albums" role="list">
              {shared.map((album) => (
                <li key={album.id}>
                  <AlbumCard album={album} onClick={openAlbum} placeholderIcon="people" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="ugl-gallery-app__section">
          <ListGroup title="Tipos de mídia" inset>
            <ListRow
              icon="movie"
              iconTone="accent"
              title="Vídeos"
              detail={videos}
              onClick={() => onOpenCollection({ kind: 'videos' })}
            />
            {(Object.keys(UGL_SUBTYPE_TITLES) as UglMediaSubtype[]).map((subtype) => (
              <ListRow
                key={subtype}
                icon={UGL_SUBTYPE_ICONS[subtype]}
                iconTone="accent"
                title={UGL_SUBTYPE_TITLES[subtype]}
                detail={subtypeCount(subtype)}
                onClick={() => onOpenCollection({ kind: 'subtype', subtype })}
              />
            ))}
          </ListGroup>
        </section>

        <section className="ugl-gallery-app__section">
          <ListGroup title="Utilitários" inset>
            <ListRow
              icon="hide"
              iconTone="accent"
              title="Ocultos"
              detail={hiddenCount}
              locked
              onClick={() => onOpenCollection({ kind: 'hidden' })}
            />
            <ListRow
              icon="delete"
              iconTone="accent"
              title="Excluídos recentemente"
              detail={trashCount}
              locked
              onClick={() => onOpenCollection({ kind: 'trash' })}
            />
          </ListGroup>
        </section>
      </div>
    </div>
  );
};

/* ==========================================================================
   Coleção (álbum, tipo de mídia, período, pessoa, ocultos, lixeira)
   ========================================================================== */

export interface CollectionScreenProps extends DateProps {
  collection: UglGalleryCollection;
  title: string;
  backText: string;
  items: UglMediaItem[];
  onBack: () => void;
  grid: GridHandlers;
  /** Ocultos: o álbum só mostra o conteúdo depois de desbloqueado */
  locked?: boolean;
  onUnlock?: () => void;
  /** Álbum da pessoa: renomear, excluir e adicionar fotos */
  onRenameAlbum?: () => void;
  onDeleteAlbum?: () => void;
  onAddPhotos?: () => void;
  /** Lixeira: recuperar e apagar tudo */
  onRestoreAll?: () => void;
  onEmptyTrash?: () => void;
  thumbnailProps?: (item: UglMediaItem) => UglMediaGridThumbnailOverrides | undefined;
  retentionDays?: number;
}

const COLLECTION_EMPTY: Record<
  UglGalleryCollection['kind'],
  { icon: UglIconName; title: string; description: string }
> = {
  album: { icon: 'addPhoto', title: 'Álbum vazio', description: 'Adicione fotos e vídeos da sua biblioteca.' },
  recent: {
    icon: 'library',
    title: 'Nenhuma foto ou vídeo',
    description: 'As fotos e os vídeos que você fizer aparecem aqui.',
  },
  favorites: {
    icon: 'favorite',
    title: 'Nenhum favorito',
    description: 'Toque no coração de uma foto para guardá-la aqui.',
  },
  videos: { icon: 'video', title: 'Nenhum vídeo', description: 'Os vídeos que você gravar aparecem aqui.' },
  subtype: { icon: 'photo', title: 'Nada por aqui', description: 'Nenhum item deste tipo na biblioteca.' },
  period: {
    icon: 'calendar',
    title: 'Nada neste período',
    description: 'Os itens deste período foram movidos ou excluídos.',
  },
  person: {
    icon: 'person',
    title: 'Nenhuma foto desta pessoa',
    description: 'As fotos em que ela aparece ficam aqui.',
  },
  hidden: {
    icon: 'hide',
    title: 'Nenhum item oculto',
    description: 'Itens ocultos saem da biblioteca e ficam só aqui.',
  },
  trash: {
    icon: 'delete',
    title: 'Nada em Excluídos recentemente',
    description: 'O que você excluir fica aqui por um tempo antes de ser apagado de vez.',
  },
};

/**
 * Uma coleção aberta: grade, barra com voltar, seleção e ações da coleção.
 */
export const CollectionScreen = ({
  collection,
  title,
  backText,
  items,
  onBack,
  grid,
  locked = false,
  onUnlock,
  onRenameAlbum,
  onDeleteAlbum,
  onAddPhotos,
  onRestoreAll,
  onEmptyTrash,
  thumbnailProps,
  retentionDays = 30,
  now,
  timeZone,
}: CollectionScreenProps) => {
  const selecting = grid.selection.active;
  const selectionButtons = selectionBarButtons(items, grid);
  const empty = COLLECTION_EMPTY[collection.kind];

  const menuItems: UglActionMenuItem[] = [];
  if (onAddPhotos) menuItems.push({ id: 'add', label: 'Adicionar fotos', icon: 'addPhoto', onSelect: onAddPhotos });
  if (onRenameAlbum)
    menuItems.push({ id: 'rename', label: 'Renomear álbum', icon: 'pencil', onSelect: onRenameAlbum });
  if (onDeleteAlbum) {
    menuItems.push({ type: 'divider', id: 'divisor' });
    menuItems.push({ id: 'delete', label: 'Excluir álbum', icon: 'delete', tone: 'danger', onSelect: onDeleteAlbum });
  }
  if (onRestoreAll && items.length)
    menuItems.push({ id: 'restore', label: 'Recuperar tudo', icon: 'restore', onSelect: onRestoreAll });
  if (onEmptyTrash && items.length)
    menuItems.push({
      id: 'empty',
      label: 'Apagar tudo',
      icon: 'deleteForever',
      tone: 'danger',
      onSelect: onEmptyTrash,
    });

  const groupBy =
    collection.kind === 'period' || collection.kind === 'recent' || collection.kind === 'videos' ? 'day' : 'none';

  const body = locked ? (
    <div className="ugl-gallery-app__scroll ugl-gallery-app__scroll--under-bar ugl-gallery-app__scroll--center">
      <EmptyState
        icon="lock"
        title="Ocultos está protegido"
        description="Confirme que é você para ver os itens ocultos."
        action={
          <Button iconStart="unlock" onClick={onUnlock}>
            Ver álbum
          </Button>
        }
      />
    </div>
  ) : (
    <MediaGrid
      items={items}
      groupBy={groupBy}
      showHeaders={groupBy !== 'none'}
      selectable={selecting}
      selectedIds={grid.selection.ids}
      onToggle={grid.onToggle}
      onToggleSection={grid.onToggleSection}
      onRangeSelect={grid.onRangeSelect}
      onOpen={grid.onOpen}
      onLongPress={grid.onLongPress}
      now={now}
      timeZone={timeZone}
      topInset={BAR_HEIGHT}
      bottomInset={TAB_BAR_HEIGHT}
      thumbnailProps={thumbnailProps}
      ariaLabel={title}
      emptyState={
        <EmptyState
          icon={empty.icon}
          title={empty.title}
          description={
            collection.kind === 'trash'
              ? `O que você excluir fica aqui por ${retentionDays} dias antes de ser apagado de vez.`
              : empty.description
          }
          action={
            onAddPhotos ? (
              <Button iconStart="addPhoto" onClick={onAddPhotos}>
                Adicionar fotos
              </Button>
            ) : undefined
          }
        />
      }
      footer={
        items.length ? (
          <p className="ugl-gallery-app__footnote">
            {collection.kind === 'trash'
              ? `${uglFormatCount(items)}. Cada item mostra quantos dias faltam até ser apagado de vez.`
              : uglFormatCount(items)}
          </p>
        ) : undefined
      }
    />
  );

  return (
    <div className="ugl-gallery-app__screen">
      {body}
      <TopBar
        variant="overlay"
        title={selecting ? uglFormatSelection(grid.selection.ids.length) : title}
        onBack={selecting ? undefined : onBack}
        backLabel={`Voltar para ${backText}`}
        // Com título longo, o voltar fica só com o glifo para o título caber.
        backText={title.length <= 14 ? backText : undefined}
        leading={selecting ? selectionButtons.leading : undefined}
        actions={
          selecting ? (
            selectionButtons.actions
          ) : (
            <>
              {!locked && items.length > 0 && (
                <Button variant="tertiary" size="sm" onClick={grid.onStartSelection}>
                  Selecionar
                </Button>
              )}
              {!locked && menuItems.length > 0 && <MoreMenu label={`Opções de ${title}`} items={menuItems} />}
            </>
          )
        }
      />
    </div>
  );
};

/* ==========================================================================
   Busca
   ========================================================================== */

export interface SearchScreenProps extends DateProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: UglMediaItem[];
  library: UglMediaItem[];
  people: UglPerson[];
  onOpen: GridHandlers['onOpen'];
  onOpenCollection: (collection: UglGalleryCollection) => void;
}

/**
 * Busca: sugestões (categorias, lugares e pessoas) e os resultados em grade.
 */
export const SearchScreen = ({
  query,
  onQueryChange,
  results,
  library,
  people,
  onOpen,
  onOpenCollection,
  now,
  timeZone,
}: SearchScreenProps) => {
  const places = React.useMemo(() => {
    const count = new Map<string, number>();
    for (const item of library) if (item.location) count.set(item.location, (count.get(item.location) ?? 0) + 1);
    return Array.from(count.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [library]);
  const knownPeople = people.filter((person) => library.some((item) => item.people?.includes(person.id)));
  const hasQuery = query.trim().length > 0;

  return (
    <div className="ugl-gallery-app__screen ugl-gallery-app__screen--stack">
      <div className="ugl-gallery-app__search-head">
        <TopBar variant="large" title="Busca" />
        <div className="ugl-gallery-app__search-field">
          <SearchField
            value={query}
            onChange={(value) => onQueryChange(value)}
            onSubmit={(value) => onQueryChange(value)}
            onClear={() => onQueryChange('')}
            onCancel={hasQuery ? () => onQueryChange('') : undefined}
            placeholder="Buscar fotos, lugares, pessoas"
          />
        </div>
      </div>

      <div className="ugl-gallery-app__search-body">
        {hasQuery ? (
          <MediaGrid
            items={results}
            groupBy="none"
            showHeaders={false}
            onOpen={onOpen}
            now={now}
            timeZone={timeZone}
            bottomInset={TAB_BAR_HEIGHT}
            ariaLabel={`Resultados para ${query.trim()}`}
            footer={
              results.length ? <p className="ugl-gallery-app__footnote">{uglFormatCount(results)}</p> : undefined
            }
            emptyState={
              <EmptyState
                icon="imageSearch"
                title="Nenhum resultado"
                description={`Nada encontrado para "${query.trim()}". Tente um lugar, uma pessoa ou o que aparece na foto.`}
              />
            }
          />
        ) : (
          <div className="ugl-gallery-app__scroll ugl-gallery-app__scroll--flush">
            <section className="ugl-gallery-app__section" aria-labelledby="ugl-gallery-categorias">
              <SectionHeader id="ugl-gallery-categorias" title="Categorias" />
              <div className="ugl-gallery-app__chips">
                {UGL_SEARCH_CATEGORIES.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.label}
                    icon={category.icon}
                    onClick={() => onQueryChange(category.query)}
                  />
                ))}
              </div>
            </section>

            {places.length > 0 && (
              <section className="ugl-gallery-app__section">
                <ListGroup title="Lugares" inset>
                  {places.map(([place, total]) => (
                    <ListRow
                      key={place}
                      icon="location"
                      iconTone="accent"
                      title={place}
                      detail={total}
                      onClick={() => onQueryChange(place)}
                    />
                  ))}
                </ListGroup>
              </section>
            )}

            {knownPeople.length > 0 && (
              <section className="ugl-gallery-app__section" aria-labelledby="ugl-gallery-busca-pessoas">
                <SectionHeader id="ugl-gallery-busca-pessoas" title="Pessoas" />
                <ul className="ugl-gallery-app__people" role="list">
                  {knownPeople.map((person) => (
                    <li key={person.id}>
                      <PersonButton
                        person={person}
                        size="md"
                        onClick={() => onOpenCollection({ kind: 'person', id: person.id })}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
