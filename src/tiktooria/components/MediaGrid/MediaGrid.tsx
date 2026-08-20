import React from 'react';
import type { TikMediaGridProps } from './MediaGrid.types';
import './MediaGrid.css';

/**
 * Componente MediaGrid — Design System Tik Tooria
 *
 * Grade de miniaturas de 137×182 em três colunas (frames "Thumbnails", nodes
 * 4:447 e 4:789). A separação entre as células é o contorno branco de 0,83px
 * que o arquivo aplica por fora de cada miniatura — não um `gap`, o que
 * preserva o encaixe exato de 414px de largura.
 */
export const MediaGrid = React.forwardRef<HTMLDivElement, TikMediaGridProps>(
  ({ items, columns = 3, className = '', style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['tik-mediagrid', className].filter(Boolean).join(' ')}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, ...style }}
      {...restProps}
    >
      {items.map((item, index) => (
        <div key={index} className="tik-mediagrid__cell">
          {item.src && <img className="tik-mediagrid__image" src={item.src} alt={item.alt ?? ''} />}
          {item.overlay && <span className="tik-mediagrid__overlay">{item.overlay}</span>}
        </div>
      ))}
    </div>
  )
);

MediaGrid.displayName = 'MediaGrid';
