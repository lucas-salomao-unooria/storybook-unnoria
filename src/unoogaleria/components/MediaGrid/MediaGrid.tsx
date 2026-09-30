'use client';

import React from 'react';
import { flushSync } from 'react-dom';
import { Icon } from '../Icon';
import { MediaThumbnail } from '../MediaThumbnail';
import { SectionHeader } from '../SectionHeader';
import { useControllableState } from '../../hooks';
import { uglGroupMedia } from '../../media';
import type { UglMediaItem, UglMediaSection } from '../../media';
import type { UglMediaGridProps } from './MediaGrid.types';
import './MediaGrid.css';

const DEFAULT_ZOOM_LEVELS = [3, 5, 7];

/** Deslocamento, em px, a partir do qual um arraste vira seleção de intervalo. */
const DRAG_THRESHOLD = 8;

/** Faixa junto às bordas, em px, em que o arraste rola a grade sozinho. */
const AUTO_SCROLL_EDGE = 48;

/** Passo de rolagem automática por quadro, em px. */
const AUTO_SCROLL_SPEED = 12;

/** Razão de distância entre os dois dedos que vale um nível de zoom. */
const PINCH_STEP = 1.25;

/** Soma de `deltaY` da roda que vale um nível de zoom. */
const WHEEL_STEP = 40;

/** Intervalo mínimo entre dois níveis de zoom pela roda, em ms. */
const WHEEL_COOLDOWN_MS = 180;

/** Janela, em ms, em que o clique que encerra um arraste é descartado. */
const CLICK_SUPPRESS_MS = 350;

/** Altura de referência do cabeçalho colante, para achar a primeira linha visível. */
const HEADER_PROBE = 46;

type DragState = {
  pointerId: number;
  startIndex: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastIndex: number;
  active: boolean;
  raf: number | null;
};

const nearestLevel = (levels: number[], value: number) =>
  levels.reduce(
    (best, level, index) => (Math.abs(level - value) < Math.abs(levels[best] - value) ? index : best),
    0
  );

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Componente MediaGrid — Design System Unoogaleria
 *
 * A grade da biblioteca: mídia agrupada por dia (ou mês, ou ano) sob cabeçalhos
 * colantes, com zoom de colunas (3, 5 e 7 por padrão) pela pinça, por Ctrl/⌘ +
 * roda e pelas teclas `+` e `-`. No modo de seleção, cada miniatura vira uma
 * alternância, cada grupo ganha "Selecionar" / "Desmarcar" e arrastar o
 * ponteiro sobre as miniaturas pede a seleção do intervalo.
 *
 * **Semântica.** Uma região rotulada com um grupo por dia (`role="group"` com o
 * nome do dia — e não `<section>`, que viraria um marco por dia) e uma lista de miniaturas em cada uma. A navegação é um widget
 * composto: um só ponto de Tab (roving tabindex) e as setas andam na ordem
 * visual — ←/→ de item em item, ↑/↓ de linha em linha atravessando os grupos,
 * Home e End para a primeira e a última mídia. Enter e Espaço abrem ou
 * alternam, porque cada miniatura é um botão.
 *
 * **Desempenho.** Nenhum movimento de ponteiro renderiza a grade: arraste,
 * pinça e rolagem vivem em refs, e só chamam o produto quando o intervalo ou o
 * nível mudam. As miniaturas são memoizadas e recebem callbacks estáveis; cada
 * grupo usa `content-visibility: auto` com o tamanho intrínseco calculado a
 * partir das colunas, então grupos fora da tela não pintam.
 */
export const MediaGrid = React.forwardRef<HTMLDivElement, UglMediaGridProps>(
  (
    {
      sections,
      items,
      groupBy = 'day',
      columns,
      defaultColumns,
      onColumnsChange,
      zoomLevels = DEFAULT_ZOOM_LEVELS,
      gap,
      selectable = false,
      selectedIds,
      onToggle,
      onToggleSection,
      onOpen,
      onLongPress,
      onRangeSelect,
      dragSelect = true,
      stickyHeaders = true,
      showHeaders = true,
      ariaLabel = 'Fotos e vídeos',
      emptyState,
      now,
      timeZone,
      footer,
      topInset = 0,
      bottomInset = 0,
      thumbnailProps,
      theme,
      className = '',
      style,
      onKeyDown,
      onFocus,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onScroll,
      ...restProps
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

    const levels = React.useMemo(
      () => Array.from(new Set(zoomLevels.filter((level) => level > 0))).sort((a, b) => a - b),
      [zoomLevels]
    );
    const safeLevels = levels.length ? levels : DEFAULT_ZOOM_LEVELS;

    const [currentColumns, setColumns] = useControllableState<number>({
      value: columns,
      defaultValue: defaultColumns ?? safeLevels[nearestLevel(safeLevels, 3)],
      onChange: onColumnsChange,
    });

    const groups = React.useMemo<UglMediaSection[]>(
      () =>
        (sections ?? uglGroupMedia(items ?? [], groupBy, { now, timeZone })).filter(
          (group) => group.items.length > 0
        ),
      [sections, items, groupBy, now, timeZone]
    );

    /* Lista achatada na ordem da grade e a posição de cada item nos grupos. */
    const layout = React.useMemo(() => {
      const flat: UglMediaItem[] = [];
      const indexById = new Map<string, number>();
      const sectionOf: number[] = [];
      const starts: number[] = [];
      groups.forEach((group, sectionIndex) => {
        starts.push(flat.length);
        group.items.forEach((item) => {
          indexById.set(item.id, flat.length);
          sectionOf.push(sectionIndex);
          flat.push(item);
        });
      });
      return { flat, indexById, sectionOf, starts };
    }, [groups]);

    const selectedSet = React.useMemo(() => new Set(selectedIds ?? []), [selectedIds]);

    const [activeId, setActiveId] = React.useState<string | null>(null);
    const [announcement, setAnnouncement] = React.useState('');
    const currentActive =
      activeId !== null && layout.indexById.has(activeId) ? activeId : (layout.flat[0]?.id ?? null);

    /* Últimas props, lidas pelos callbacks estáveis entregues às miniaturas. */
    const latest = React.useRef({
      layout,
      selectable,
      onToggle,
      onOpen,
      onLongPress,
      onRangeSelect,
      dragSelect,
      currentColumns,
      setColumns,
      levels: safeLevels,
    });
    React.useLayoutEffect(() => {
      latest.current = {
        layout,
        selectable,
        onToggle,
        onOpen,
        onLongPress,
        onRangeSelect,
        dragSelect,
        currentColumns,
        setColumns,
        levels: safeLevels,
      };
    });

    const suppressClickUntil = React.useRef(0);
    const dragRef = React.useRef<DragState | null>(null);
    const pointersRef = React.useRef(new Map<number, { x: number; y: number }>());
    const pinchRef = React.useRef<number | null>(null);
    const anchorRef = React.useRef<{ id: string; offset: number } | null>(null);
    const anchorFrame = React.useRef<number | null>(null);

    /* ------------------------------------------------------------ Zoom */

    /** Guarda a primeira miniatura visível, para o zoom não perder o lugar. */
    const captureAnchor = React.useCallback(() => {
      const root = rootRef.current;
      if (!root || root.scrollTop < 1) {
        anchorRef.current = null;
        return;
      }
      const rect = root.getBoundingClientRect();
      const paddingTop = parseFloat(getComputedStyle(root).paddingTop) || 0;
      const x = rect.left + rect.width / 2;
      for (let offset = HEADER_PROBE; offset < rect.height; offset += 16) {
        const hit = document
          .elementFromPoint(x, rect.top + paddingTop + offset)
          ?.closest<HTMLElement>('[data-ugl-id]');
        if (hit && root.contains(hit)) {
          anchorRef.current = { id: hit.dataset.uglId!, offset: hit.getBoundingClientRect().top - rect.top };
          return;
        }
      }
      anchorRef.current = null;
    }, []);

    /* Depois de trocar as colunas, devolve a miniatura-âncora ao mesmo ponto. */
    React.useLayoutEffect(() => {
      const anchor = anchorRef.current;
      const root = rootRef.current;
      if (!anchor || !root) return;
      const node = root.querySelector<HTMLElement>(`[data-ugl-id="${CSS.escape(anchor.id)}"]`);
      if (!node) return;
      const delta = node.getBoundingClientRect().top - root.getBoundingClientRect().top - anchor.offset;
      if (Math.abs(delta) > 0.5) root.scrollTop += delta;
    }, [currentColumns]);

    React.useEffect(
      () => () => {
        if (anchorFrame.current !== null) cancelAnimationFrame(anchorFrame.current);
        const drag = dragRef.current;
        if (drag?.raf) cancelAnimationFrame(drag.raf);
      },
      []
    );

    /** Anda um nível de zoom: -1 aproxima (menos colunas), +1 afasta. */
    const zoomBy = React.useCallback(
      (direction: -1 | 1) => {
        const { currentColumns: value, levels: steps, setColumns: apply } = latest.current;
        const index = nearestLevel(steps, value);
        const next = steps[Math.min(steps.length - 1, Math.max(0, index + direction))];
        if (next === value) return;
        captureAnchor();
        const commit = () => {
          apply(next);
          setAnnouncement(`${next} colunas`);
        };
        const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
        if (doc.startViewTransition && !prefersReducedMotion()) {
          doc.startViewTransition(() => flushSync(commit));
        } else {
          commit();
        }
      },
      [captureAnchor]
    );

    /* Ctrl/⌘ + roda (e a pinça do trackpad, que chega como roda com Ctrl). */
    React.useEffect(() => {
      const root = rootRef.current;
      if (!root) return undefined;
      let accumulated = 0;
      let lastStep = 0;
      const handleWheel = (event: WheelEvent) => {
        if (!(event.ctrlKey || event.metaKey)) return;
        event.preventDefault();
        accumulated += event.deltaY;
        const time = performance.now();
        if (Math.abs(accumulated) < WHEEL_STEP || time - lastStep < WHEEL_COOLDOWN_MS) return;
        zoomBy(accumulated > 0 ? 1 : -1);
        accumulated = 0;
        lastStep = time;
      };
      root.addEventListener('wheel', handleWheel, { passive: false });
      return () => root.removeEventListener('wheel', handleWheel);
    }, [zoomBy]);

    /* ------------------------------------------------------ Miniaturas */

    const handleThumbnailClick = React.useCallback((item: UglMediaItem) => {
      if (performance.now() < suppressClickUntil.current) return;
      const state = latest.current;
      if (state.selectable) {
        state.onToggle?.(item);
      } else {
        state.onOpen?.(item, state.layout.indexById.get(item.id) ?? -1, state.layout.flat);
      }
    }, []);

    const handleThumbnailLongPress = React.useCallback((item: UglMediaItem) => {
      latest.current.onLongPress?.(item);
    }, []);

    /* -------------------------------------------------------- Teclado */

    const focusIndex = (index: number) => {
      const item = layout.flat[index];
      const root = rootRef.current;
      if (!item || !root) return;
      setActiveId(item.id);
      const node = root.querySelector<HTMLElement>(`[data-ugl-index="${index}"]`);
      node?.focus({ preventScroll: true });
      node?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;

      const raw = (event.target as HTMLElement).dataset?.uglIndex;
      if (raw === undefined) return;

      /* `+` e `-` só na grade: dentro de um campo do rodapé, são texto. */
      if (event.key === '+' || event.key === '=' || event.key === '-') {
        event.preventDefault();
        zoomBy(event.key === '-' ? 1 : -1);
        return;
      }
      const index = Number(raw);
      const { flat, sectionOf, starts } = layout;
      const cols = currentColumns;
      const section = sectionOf[index];
      const local = index - starts[section];
      const length = groups[section].items.length;
      let target: number | null = null;

      switch (event.key) {
        case 'ArrowRight':
          target = Math.min(flat.length - 1, index + 1);
          break;
        case 'ArrowLeft':
          target = Math.max(0, index - 1);
          break;
        case 'ArrowDown': {
          if (Math.floor(local / cols) < Math.floor((length - 1) / cols)) {
            target = starts[section] + Math.min(local + cols, length - 1);
          } else if (section + 1 < groups.length) {
            target = starts[section + 1] + Math.min(local % cols, groups[section + 1].items.length - 1);
          }
          break;
        }
        case 'ArrowUp': {
          if (local - cols >= 0) {
            target = index - cols;
          } else if (section > 0) {
            const previousLength = groups[section - 1].items.length;
            const lastRow = Math.floor((previousLength - 1) / cols) * cols;
            target = starts[section - 1] + Math.min(lastRow + (local % cols), previousLength - 1);
          }
          break;
        }
        case 'Home':
          target = 0;
          break;
        case 'End':
          target = flat.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      if (target !== null && target !== index) focusIndex(target);
    };

    const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(event);
      const id = (event.target as HTMLElement).dataset?.uglId;
      if (id && id !== activeId) setActiveId(id);
    };

    /* ------------------------------------------- Arraste e pinça */

    const updateRange = React.useCallback(() => {
      const drag = dragRef.current;
      const root = rootRef.current;
      if (!drag || !root) return;
      const hit = document.elementFromPoint(drag.lastX, drag.lastY)?.closest<HTMLElement>('[data-ugl-index]');
      if (!hit || !root.contains(hit)) return;
      const index = Number(hit.dataset.uglIndex);
      if (index === drag.lastIndex && drag.active) return;
      drag.lastIndex = index;
      const { flat } = latest.current.layout;
      const [from, to] = drag.startIndex <= index ? [drag.startIndex, index] : [index, drag.startIndex];
      latest.current.onRangeSelect?.(flat.slice(from, to + 1), flat[drag.startIndex]);
    }, []);

    const autoScroll = React.useCallback(() => {
      const drag = dragRef.current;
      const root = rootRef.current;
      if (!drag?.active || !root) return;
      const rect = root.getBoundingClientRect();
      const styles = getComputedStyle(root);
      const top = rect.top + (parseFloat(styles.paddingTop) || 0);
      const bottom = rect.bottom - (parseFloat(styles.paddingBottom) || 0);
      let step = 0;
      if (drag.lastY > bottom - AUTO_SCROLL_EDGE) step = AUTO_SCROLL_SPEED;
      else if (drag.lastY < top + AUTO_SCROLL_EDGE) step = -AUTO_SCROLL_SPEED;
      if (step !== 0) {
        root.scrollTop += step;
        updateRange();
      }
      drag.raf = requestAnimationFrame(autoScroll);
    }, [updateRange]);

    const endDrag = (pointerId: number) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== pointerId) return;
      if (drag.raf !== null) cancelAnimationFrame(drag.raf);
      if (drag.active) {
        suppressClickUntil.current = performance.now() + CLICK_SUPPRESS_MS;
        try {
          rootRef.current?.releasePointerCapture(pointerId);
        } catch {
          /* A captura já foi solta pelo navegador. */
        }
      }
      dragRef.current = null;
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(event);
      const pointers = pointersRef.current;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (pointers.size === 2) {
        const [a, b] = Array.from(pointers.values());
        pinchRef.current = Math.hypot(a.x - b.x, a.y - b.y);
        const drag = dragRef.current;
        if (drag) endDrag(drag.pointerId);
        return;
      }

      if (pointers.size !== 1 || !selectable || !dragSelect) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      const hit = (event.target as HTMLElement).closest<HTMLElement>('[data-ugl-index]');
      if (!hit) return;
      const index = Number(hit.dataset.uglIndex);
      dragRef.current = {
        pointerId: event.pointerId,
        startIndex: index,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        lastIndex: index,
        active: false,
        raf: null,
      };
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      const pointers = pointersRef.current;
      if (pointers.has(event.pointerId)) pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (pointers.size === 2 && pinchRef.current) {
        const [a, b] = Array.from(pointers.values());
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const ratio = distance / pinchRef.current;
        if (ratio > PINCH_STEP || ratio < 1 / PINCH_STEP) {
          /* Afastar os dedos aproxima a foto: menos colunas. */
          zoomBy(ratio > 1 ? -1 : 1);
          pinchRef.current = distance;
        }
        return;
      }

      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;

      if (!drag.active) {
        if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < DRAG_THRESHOLD) return;
        drag.active = true;
        try {
          rootRef.current?.setPointerCapture(event.pointerId);
        } catch {
          /* O ponteiro já saiu; o arraste segue pelos eventos que chegarem. */
        }
        drag.lastIndex = -1;
        updateRange();
        drag.raf = requestAnimationFrame(autoScroll);
        return;
      }
      updateRange();
    };

    const handlePointerEnd =
      (handler?: (event: React.PointerEvent<HTMLDivElement>) => void) =>
      (event: React.PointerEvent<HTMLDivElement>) => {
        handler?.(event);
        pointersRef.current.delete(event.pointerId);
        if (pointersRef.current.size < 2) pinchRef.current = null;
        endDrag(event.pointerId);
      };

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      onScroll?.(event);
      if (anchorFrame.current !== null) return;
      anchorFrame.current = requestAnimationFrame(() => {
        anchorFrame.current = null;
        captureAnchor();
      });
    };

    /* --------------------------------------------------------- Render */

    const classes = [
      'ugl-media-grid',
      showHeaders ? '' : 'ugl-media-grid--no-headers',
      selectable ? 'ugl-media-grid--selectable' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const rootStyle = {
      '--ugl-media-grid-columns': currentColumns,
      '--ugl-media-grid-top-inset': `${topInset}px`,
      '--ugl-media-grid-bottom-inset': `${bottomInset}px`,
      ...(gap !== undefined ? { '--ugl-media-grid-gap': `${gap}px` } : {}),
      ...style,
    } as React.CSSProperties;

    const isEmpty = layout.flat.length === 0;

    return (
      <div
        ref={rootRef}
        role="region"
        aria-label={ariaLabel}
        data-ugl-theme={theme}
        className={classes}
        style={rootStyle}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd(onPointerUp)}
        onPointerCancel={handlePointerEnd(onPointerCancel)}
        onScroll={handleScroll}
        {...restProps}
      >
        <p className="ugl-media-grid__live" aria-live="polite">
          {announcement}
        </p>

        {isEmpty && (
          <div className="ugl-media-grid__empty">
            {emptyState ?? (
              <>
                <Icon name="photo" size="xl" tone="secondary" />
                <p className="ugl-media-grid__empty-text">Nenhuma foto ou vídeo</p>
              </>
            )}
          </div>
        )}

        {groups.map((group, sectionIndex) => {
          const start = layout.starts[sectionIndex];
          const allSelected = group.items.every((item) => selectedSet.has(item.id));
          const actionLabel = allSelected ? 'Desmarcar' : 'Selecionar';

          return (
            <div
              key={group.id}
              role="group"
              className="ugl-media-grid__section"
              aria-label={group.subtitle ? `${group.title}, ${group.subtitle}` : group.title}
              style={
                {
                  '--ugl-media-grid-rows': Math.ceil(group.items.length / currentColumns),
                } as React.CSSProperties
              }
            >
              {showHeaders && (
                <SectionHeader
                  title={group.title}
                  subtitle={group.subtitle}
                  sticky={stickyHeaders}
                  className="ugl-media-grid__header"
                  action={
                    selectable && onToggleSection
                      ? {
                          label: actionLabel,
                          ariaLabel: `${actionLabel} ${group.title}`,
                          onClick: () => onToggleSection(group, allSelected),
                        }
                      : undefined
                  }
                />
              )}
              <ul className="ugl-media-grid__list" role="list">
                {group.items.map((item, local) => {
                  const index = start + local;
                  return (
                    <li key={item.id} className="ugl-media-grid__cell">
                      <MediaThumbnail
                        item={item}
                        selectable={selectable}
                        selected={selectedSet.has(item.id)}
                        onClick={handleThumbnailClick}
                        onLongPress={onLongPress ? handleThumbnailLongPress : undefined}
                        now={now}
                        timeZone={timeZone}
                        tabIndex={item.id === currentActive ? 0 : -1}
                        data-ugl-id={item.id}
                        data-ugl-index={index}
                        {...thumbnailProps?.(item)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {footer && !isEmpty && <div className="ugl-media-grid__footer">{footer}</div>}
      </div>
    );
  }
);

MediaGrid.displayName = 'MediaGrid';
