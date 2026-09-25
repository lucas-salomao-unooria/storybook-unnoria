'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { InstaMediaGridProps } from './MediaGrid.types';
import './MediaGrid.css';

/**
 * Componente MediaGrid — Design System Instanooria
 *
 * Grade de publicações do perfil e da tela Buscar. Reproduz a estrutura de três
 * colunas com calha de 1px do Figma e o indicador de vídeo sobreposto ao canto
 * superior direito dos blocos correspondentes.
 *
 * Com `selectable`, vira a grade do "SELECT MULTIPLE" da tela de adicionar
 * imagem: círculo de seleção no canto superior direito, numerado em azul na
 * ordem de escolha, e o indicador de vídeo descendo para o canto inferior —
 * onde o quadro põe a duração (`0:3182`).
 */
export const MediaGrid = React.forwardRef<HTMLDivElement, InstaMediaGridProps>(
  (
    {
      items,
      columns = 3,
      gap = 1,
      onSelect,
      selectable = false,
      selectedIds = [],
      onToggle,
      ariaLabel = 'Publicações',
      theme = 'light',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-media-grid',
      selectable ? 'insta-media-grid--selectable' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="list"
        aria-label={ariaLabel}
        data-insta-theme={theme}
        className={classes}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
          ...style,
        }}
        {...restProps}
      >
        {items.map((item, index) => {
          const indicator = item.type === 'video' && (
            <span className="insta-media-grid__indicator">
              <Icon name="video" size={20} tone="inherit" theme={theme} />
            </span>
          );

          if (!selectable) {
            return (
              <button
                key={item.id}
                type="button"
                role="listitem"
                className="insta-media-grid__tile"
                onClick={() => onSelect?.(item, index)}
              >
                <img className="insta-media-grid__image" src={item.src} alt={item.alt} />
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
            <div key={item.id} role="listitem" className="insta-media-grid__cell">
              <button
                type="button"
                className={[
                  'insta-media-grid__tile',
                  selected ? 'insta-media-grid__tile--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={selected}
                aria-label={selected ? `${item.alt}, ${order}ª na seleção` : undefined}
                onClick={() => onToggle?.(item, index)}
              >
                <img className="insta-media-grid__image" src={item.src} alt={item.alt} />
                {indicator}
                <span
                  className={[
                    'insta-media-grid__check',
                    selected ? 'insta-media-grid__check--selected' : '',
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
