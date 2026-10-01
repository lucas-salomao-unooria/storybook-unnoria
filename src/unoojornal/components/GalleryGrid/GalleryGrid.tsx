import React from 'react';
import type { UjnGalleryGridProps } from './GalleryGrid.types';
import './GalleryGrid.css';

/**
 * Componente GalleryGrid — Design System Unoojornal
 *
 * Grade das fotografias da galeria. Colapsa por contêiner, e não por janela:
 * `columns` colunas (4 por padrão) a partir de 960px, duas a partir de 640px
 * (e a partir de 400px no compacto) e uma abaixo disso. Só recebe props e
 * renderiza markup: é Server Component.
 */
export const GalleryGrid = React.forwardRef<HTMLDivElement, UjnGalleryGridProps>(
  ({ columns = 4, children, theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-gallery-grid', `ujn-gallery-grid--cols-${columns}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-gallery-grid__cells">{children}</div>
      </div>
    );
  }
);

GalleryGrid.displayName = 'GalleryGrid';
