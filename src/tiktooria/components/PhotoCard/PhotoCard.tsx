import React from 'react';
import type { TikPhotoCardProps } from './PhotoCard.types';
import './PhotoCard.css';

/**
 * Componente PhotoCard — Design System Tik Tooria
 *
 * Cartão de fotografia do carrossel da tela "TikTok Upload photos" (node
 * 4:631). Raio de 6px e o par de efeitos que o arquivo empilha: a sombra
 * `--tik-elevation-photo` sob o cartão e o realce claro
 * `--tik-elevation-photo-rim` na aresta superior.
 */
export const PhotoCard = React.forwardRef<HTMLDivElement, TikPhotoCardProps>(
  (
    { src, alt = '', width = 248, height = 440, counter, className = '', style, ...restProps },
    ref
  ) => (
    <div
      ref={ref}
      className={['tik-photocard', className].filter(Boolean).join(' ')}
      style={{ width, height, ...style }}
      {...restProps}
    >
      {src && <img className="tik-photocard__image" src={src} alt={alt} />}
      {counter !== undefined && <span className="tik-photocard__counter">{counter}</span>}
    </div>
  )
);

PhotoCard.displayName = 'PhotoCard';
