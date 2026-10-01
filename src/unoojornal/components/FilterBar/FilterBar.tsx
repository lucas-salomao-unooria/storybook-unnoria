'use client';

import React from 'react';
import { FilterPill } from '../FilterPill';
import { useControllableState } from '../../hooks';
import type { UjnFilterBarProps } from './FilterBar.types';
import './FilterBar.css';

/**
 * Componente FilterBar — Design System Unoojornal
 *
 * Linha de pílulas de filtro da lista de matérias. Escolha única: cada pílula é
 * um botão de alternância (`aria-pressed`) e a barra é um `role="group"`.
 * Acionar a pílula selecionada de um filtro específico volta a `allId`.
 *
 * Teclado com foco móvel: só uma pílula entra no Tab (a que tem o foco ou, sem
 * foco, a selecionada), e as setas ←/→ movem o foco entre as pílulas — com
 * volta ao início e ao fim —, assim como Home e End. As setas movem só o foco;
 * a seleção é de Enter, Espaço ou clique. Na largura larga as pílulas quebram
 * de linha; abaixo de 640px a barra rola na horizontal.
 *
 * É Client Component: usa estado, `ref`s e repassa funções às pílulas.
 */
export const FilterBar = React.forwardRef<HTMLDivElement, UjnFilterBarProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      ariaLabel,
      allId = 'todas',
      theme,
      className = '',
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const [current, setCurrent] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? allId,
      onChange: onValueChange,
    });
    const [stopId, setStopId] = React.useState<string | null>(null);
    const pillRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    const selectedIndex = items.findIndex((item) => item.id === current);
    const stopIndex = items.findIndex((item) => item.id === stopId);
    // Quem entra no Tab: a pílula com o foco, senão a selecionada, senão a primeira.
    const tabbableIndex = stopIndex >= 0 ? stopIndex : selectedIndex >= 0 ? selectedIndex : 0;

    const focusAt = (index: number) => {
      const item = items[index];
      if (!item) return;
      pillRefs.current.get(item.id)?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || items.length === 0) return;

      const focusedIndex = items.findIndex(
        (item) => pillRefs.current.get(item.id) === document.activeElement
      );
      if (focusedIndex < 0) return;

      const last = items.length - 1;
      let next: number | null = null;

      switch (event.key) {
        case 'ArrowRight':
          next = focusedIndex === last ? 0 : focusedIndex + 1;
          break;
        case 'ArrowLeft':
          next = focusedIndex === 0 ? last : focusedIndex - 1;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = last;
          break;
        default:
          return;
      }

      event.preventDefault();
      focusAt(next);
    };

    const choose = (id: string) => {
      setCurrent(id === current && id !== allId ? allId : id);
    };

    const classes = ['ujn-filter-bar', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        data-ujn-theme={theme}
        className={classes}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        <div className="ujn-filter-bar__list">
          {items.map((item, index) => (
            <FilterPill
              key={item.id}
              ref={(node) => {
                if (node) pillRefs.current.set(item.id, node);
                else pillRefs.current.delete(item.id);
              }}
              selected={item.id === current}
              count={item.count}
              tabIndex={index === tabbableIndex ? 0 : -1}
              onFocus={() => setStopId(item.id)}
              onClick={() => choose(item.id)}
            >
              {item.label}
            </FilterPill>
          ))}
        </div>
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';
