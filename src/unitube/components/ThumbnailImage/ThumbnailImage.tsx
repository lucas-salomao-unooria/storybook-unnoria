import React from 'react';
import type { UniThumbnailImageProps } from './ThumbnailImage.types';
import './ThumbnailImage.css';

/**
 * Componente ThumbnailImage — Design System Unitube
 *
 * Reproduz o nó `Media/ThumbnailImage` (`11:997`), a miniatura reutilizada pelos
 * quatro formatos de cartão do arquivo.
 *
 * A proporção é 276×155, ou 1,781 — muito próxima de 16:9 (1,778), mas não
 * idêntica. A razão literal do arquivo é preservada em `aspect-ratio`, de modo
 * que a miniatura acompanhe a largura do cartão sem distorcer.
 *
 * A cápsula de duração usa preto puro (`--uni-color-overlay-duration`), o
 * degrau Caption/Small e recuo `3/4` — o único uso de 3px em todo o arquivo.
 */
export const ThumbnailImage = React.forwardRef<HTMLDivElement, UniThumbnailImageProps>(
  ({ src, alt = '', duration, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['uni-thumbnail', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {src && <img className="uni-thumbnail__image" src={src} alt={alt} />}
      {duration != null && <span className="uni-thumbnail__duration">{duration}</span>}
    </div>
  )
);

ThumbnailImage.displayName = 'ThumbnailImage';
