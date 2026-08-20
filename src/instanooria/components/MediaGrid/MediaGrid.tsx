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
 */
export const MediaGrid = React.forwardRef<HTMLDivElement, InstaMediaGridProps>(
  (
    {
      items,
      columns = 3,
      gap = 1,
      onSelect,
      ariaLabel = 'Publicações',
      theme = 'light',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['insta-media-grid', className].filter(Boolean).join(' ');

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
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className="insta-media-grid__tile"
            onClick={() => onSelect?.(item, index)}
          >
            <img className="insta-media-grid__image" src={item.src} alt={item.alt} />

            {item.type === 'video' && (
              <span className="insta-media-grid__indicator">
                <Icon name="video" size={20} tone="inherit" theme={theme} />
              </span>
            )}

          </button>
        ))}
      </div>
    );
  }
);

MediaGrid.displayName = 'MediaGrid';
