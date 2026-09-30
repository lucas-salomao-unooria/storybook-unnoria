'use client';

import React from 'react';
import { uglMediaLabel } from '../../media';
import { editedMediaStyle, mediaDisplayRatio } from '../MediaViewer/editedMedia';
import type { UglFilmstripProps } from './Filmstrip.types';
import './Filmstrip.css';

/*
 * Medidas espelhadas de `Filmstrip.css` (`--ugl-filmstrip-*`): a posição de
 * centralização é calculada, e não medida, para não depender da animação de
 * largura em curso.
 */
const THUMB_WIDTH = 36;
const THUMB_HEIGHT = 44;
const ACTIVE_MIN_WIDTH = 44;
const ACTIVE_MAX_WIDTH = 64;
const GAP = 2;

/**
 * Largura da miniatura ativa: a proporção da mídia, entre 44px (quadrada — a
 * ativa é sempre mais larga que as demais, mesmo em retrato) e 64px.
 */
const activeWidth = (ratio: number) =>
  Math.round(Math.min(ACTIVE_MAX_WIDTH, Math.max(ACTIVE_MIN_WIDTH, THUMB_HEIGHT * ratio)));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Componente Filmstrip — Design System Unoogaleria
 *
 * Tira de miniaturas do visualizador. Todas têm 36×44px; a ativa se alarga
 * até a proporção da mídia (de 44px, quadrada, a 64px), ganha contorno de acento e é
 * centralizada. O recuo das pontas é de meia tira, então a primeira e a última
 * também chegam ao centro.
 *
 * Semântica: `listbox` horizontal de seleção única, com a seleção acompanhando
 * o foco — a tira é um seletor da mídia aberta, e não uma lista de ações. O
 * foco é móvel (só a ativa entra no Tab); setas, Home e End movem e selecionam.
 */
export const Filmstrip = React.forwardRef<HTMLDivElement, UglFilmstripProps>(
  (
    {
      items,
      activeIndex,
      onSelect,
      ariaLabel = 'Miniaturas',
      timeZone,
      theme,
      className = '',
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const listRef = React.useRef<HTMLDivElement | null>(null);
    const optionRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const mountedRef = React.useRef(false);

    React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement);

    const safeIndex = Math.min(Math.max(0, activeIndex), Math.max(0, items.length - 1));
    const activeRatio = items[safeIndex] ? mediaDisplayRatio(items[safeIndex]) : 1;

    /* Centraliza a ativa sem rolar os ancestrais (o que `scrollIntoView` faria). */
    React.useEffect(() => {
      const list = listRef.current;
      if (!list || items.length === 0) return;
      const left = safeIndex * (THUMB_WIDTH + GAP) + activeWidth(activeRatio) / 2 - THUMB_WIDTH / 2;
      const behavior: ScrollBehavior = !mountedRef.current || prefersReducedMotion() ? 'auto' : 'smooth';
      mountedRef.current = true;
      if (typeof list.scrollTo === 'function') list.scrollTo({ left, behavior });
      else list.scrollLeft = left;
    }, [safeIndex, activeRatio, items.length]);

    const select = (index: number, focus: boolean) => {
      const next = Math.min(Math.max(0, index), items.length - 1);
      if (focus) optionRefs.current[next]?.focus({ preventScroll: true });
      if (next !== safeIndex) onSelect(next);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      const targets: Record<string, number> = {
        ArrowRight: safeIndex + 1,
        ArrowDown: safeIndex + 1,
        ArrowLeft: safeIndex - 1,
        ArrowUp: safeIndex - 1,
        Home: 0,
        End: items.length - 1,
      };
      if (!(event.key in targets)) return;
      event.preventDefault();
      select(targets[event.key], true);
    };

    const classes = ['ugl-filmstrip', className].filter(Boolean).join(' ');

    return (
      <div
        ref={listRef}
        role="listbox"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        data-ugl-theme={theme}
        className={classes}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {items.map((item, index) => {
          const active = index === safeIndex;
          return (
            <div
              key={item.id}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              role="option"
              aria-selected={active}
              aria-label={uglMediaLabel(item, { timeZone })}
              tabIndex={active ? 0 : -1}
              className={['ugl-filmstrip__item', active ? 'ugl-filmstrip__item--active' : '']
                .filter(Boolean)
                .join(' ')}
              style={active ? { width: activeWidth(activeRatio) } : undefined}
              onClick={() => select(index, true)}
            >
              <img
                className="ugl-filmstrip__image"
                src={item.src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                style={editedMediaStyle(item)}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

Filmstrip.displayName = 'Filmstrip';
