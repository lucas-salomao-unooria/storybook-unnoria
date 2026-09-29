'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UnvMediaGridProps } from './MediaGrid.types';
import './MediaGrid.css';

/**
 * Componente MediaGrid — Design System Unoovista
 *
 * Grade de publicações do perfil e da busca: três colunas com espaço de 4px
 * entre blocos de cantos arredondados (raio de 8px), no lugar de um mosaico
 * colado. O indicador de vídeo é uma cápsula translúcida no canto inferior.
 *
 * Com `selectable`, vira a grade de escolha de várias imagens: círculo de
 * seleção no canto superior direito, com o número da ordem de escolha sobre o
 * roxo de ação, e contorno de destaque no bloco escolhido.
 */
export const MediaGrid = React.forwardRef<HTMLDivElement, UnvMediaGridProps>(
  (
    {
      items,
      columns = 3,
      gap,
      onSelect,
      selectable = false,
      selectedIds = [],
      onToggle,
      ariaLabel = 'Publicações',
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unv-media-grid',
      selectable ? 'unv-media-grid--selectable' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="list"
        aria-label={ariaLabel}
        data-unv-theme={theme}
        className={classes}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          ...(gap !== undefined ? { gap: `${gap}px` } : {}),
          ...style,
        }}
        {...restProps}
      >
        {items.map((item, index) => {
          const indicator = item.type === 'video' && (
            <span className="unv-media-grid__indicator">
              <Icon name="video" size="sm" tone="inherit" theme={theme} />
            </span>
          );

          if (!selectable) {
            return (
              <button
                key={item.id}
                type="button"
                role="listitem"
                className="unv-media-grid__tile"
                onClick={() => onSelect?.(item, index)}
              >
                <img className="unv-media-grid__image" src={item.src} alt={item.alt} />
                {indicator}
              </button>
            );
          }

          /*
           * No modo de seleção o botão mantém o papel de botão — `aria-pressed`
           * não vale em `listitem` —, e o item de lista passa ao invólucro.
           */
          const order = selectedIds.indexOf(item.id) + 1;
          const selected = order > 0;

          return (
            <div key={item.id} role="listitem" className="unv-media-grid__cell">
              <button
                type="button"
                className={[
                  'unv-media-grid__tile',
                  selected ? 'unv-media-grid__tile--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={selected}
                aria-label={selected ? `${item.alt}, ${order}ª na seleção` : undefined}
                onClick={() => onToggle?.(item, index)}
              >
                <img className="unv-media-grid__image" src={item.src} alt={item.alt} />
                {indicator}
                <span
                  className={[
                    'unv-media-grid__check',
                    selected ? 'unv-media-grid__check--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                >
                  {selected ? order : null}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);

MediaGrid.displayName = 'MediaGrid';
