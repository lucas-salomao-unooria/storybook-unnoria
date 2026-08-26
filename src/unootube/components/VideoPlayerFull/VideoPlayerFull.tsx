import React from 'react';
import { VideoPlayer } from '../VideoPlayer';
import type { UniVideoPlayerFullProps } from './VideoPlayerFull.types';
import './VideoPlayerFull.css';

/**
 * Componente VideoPlayerFull — Design System Unootube
 *
 * Reproduz o nó `Media/VideoPlayerFull` (`20:2920`), o bloco que abre a coluna
 * principal da tela de vídeo.
 *
 * Duas escolhas tipográficas do arquivo destoam do que se esperaria e foram
 * preservadas: o **título** usa Roboto **Regular** 18 — não um dos degraus
 * Heading, que são todos Bold —, enquanto a **linha de metadados**, de
 * hierarquia inferior, usa Roboto **Bold** 14. O peso está invertido em
 * relação à hierarquia; ver o desvio registrado na estória.
 */
export const VideoPlayerFull = React.forwardRef<HTMLElement, UniVideoPlayerFullProps>(
  (
    {
      src,
      alt = '',
      videoTitle,
      metadata,
      actions,
      playerProps,
      overlayTitle,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <section
      ref={ref}
      className={['uni-video-player-full', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <VideoPlayer
        src={src}
        alt={alt}
        videoTitle={overlayTitle ?? videoTitle}
        {...playerProps}
      />

      <div className="uni-video-player-full__info">
        <h1 className="uni-video-player-full__title">{videoTitle}</h1>
        <div className="uni-video-player-full__row">
          {metadata != null && (
            <span className="uni-video-player-full__metadata">{metadata}</span>
          )}
          {actions != null && <div className="uni-video-player-full__actions">{actions}</div>}
        </div>
      </div>
    </section>
  )
);

VideoPlayerFull.displayName = 'VideoPlayerFull';
