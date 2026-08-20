import React from 'react';
import { ThumbnailImage } from '../ThumbnailImage';
import type { UniVideoCardSmallProps } from './VideoCardSmall.types';
import './VideoCardSmall.css';

/**
 * Componente VideoCardSmall — Design System Unitube
 *
 * Reproduz o nó `Media/VideoCardSmall` (`19:1459`), o cartão que a playlist do
 * canal repete cinco vezes por linha.
 *
 * Ao contrário do `VideoCard`, o título usa **Roboto Bold 14** (Label/Large) e
 * não há avatar: o canal aparece apenas como texto em Caption/Default.
 */
export const VideoCardSmall = React.forwardRef<HTMLElement, UniVideoCardSmallProps>(
  (
    {
      thumbnailSrc,
      thumbnailAlt = '',
      duration,
      videoTitle,
      channelName,
      metadata,
      href,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const body = (
      <>
        <ThumbnailImage src={thumbnailSrc} alt={thumbnailAlt} duration={duration} />
        <div className="uni-video-card-small__desc">
          <h3 className="uni-video-card-small__title">{videoTitle}</h3>
          <div className="uni-video-card-small__info">
            {channelName != null && (
              <span className="uni-video-card-small__channel">{channelName}</span>
            )}
            {metadata != null && (
              <span className="uni-video-card-small__metadata">{metadata}</span>
            )}
          </div>
        </div>
      </>
    );

    const classes = ['uni-video-card-small', className].filter(Boolean).join(' ');

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={href}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {body}
        </a>
      );
    }

    return (
      <article
        ref={ref as React.Ref<HTMLElement>}
        className={classes}
        {...(restProps as React.HTMLAttributes<HTMLElement>)}
      >
        {body}
      </article>
    );
  }
);

VideoCardSmall.displayName = 'VideoCardSmall';
