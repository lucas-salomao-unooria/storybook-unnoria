import React from 'react';
import { VideoPlayer } from '../VideoPlayer';
import type { UniVideoCardHorizontalProps } from './VideoCardHorizontal.types';
import './VideoCardHorizontal.css';

/**
 * Componente VideoCardHorizontal — Design System Unootube
 *
 * Reproduz o nó `Media/VideoCardHorizontal` (`19:1346`), o destaque que abre a
 * tela de canal: um reprodutor funcional ao lado de título, metadados e
 * descrição.
 *
 * É o único bloco do arquivo em que a linha de metadados usa **Body/Small em
 * peso Bold** (13px), um degrau abaixo do Label/Large usado no reprodutor
 * completo.
 */
export const VideoCardHorizontal = React.forwardRef<HTMLElement, UniVideoCardHorizontalProps>(
  (
    {
      src,
      alt = '',
      videoTitle,
      metadata,
      description,
      playerProps,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <article
      ref={ref}
      className={['uni-video-card-horizontal', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="uni-video-card-horizontal__player">
        <VideoPlayer src={src} alt={alt} {...playerProps} />
      </div>

      <div className="uni-video-card-horizontal__desc">
        <h2 className="uni-video-card-horizontal__title">{videoTitle}</h2>
        {metadata != null && (
          <span className="uni-video-card-horizontal__metadata">{metadata}</span>
        )}
        {description != null && (
          <p className="uni-video-card-horizontal__text">{description}</p>
        )}
      </div>
    </article>
  )
);

VideoCardHorizontal.displayName = 'VideoCardHorizontal';
