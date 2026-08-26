import React from 'react';
import { ThumbnailImage } from '../ThumbnailImage';
import type { UniVideoCardSidebarProps } from './VideoCardSidebar.types';
import './VideoCardSidebar.css';

/**
 * Componente VideoCardSidebar — Design System Unitube
 *
 * Reproduz o nó `Media/VideoCardSidebar` (`25:3450`), o cartão que a coluna
 * secundária da tela de vídeo repete verticalmente.
 *
 * É o único cartão do arquivo cujo título usa peso **regular** — Body/Medium
 * 14/20, e não um dos degraus Label. Os metadados usam Caption/Default com
 * altura de linha declarada de 18px, e não automática.
 */
export const VideoCardSidebar = React.forwardRef<HTMLElement, UniVideoCardSidebarProps>(
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
        <div className="uni-video-card-sidebar__media">
          <ThumbnailImage src={thumbnailSrc} alt={thumbnailAlt} duration={duration} />
        </div>
        <div className="uni-video-card-sidebar__text">
          <h3 className="uni-video-card-sidebar__title">{videoTitle}</h3>
          <div className="uni-video-card-sidebar__info">
            {channelName != null && (
              <span className="uni-video-card-sidebar__channel">{channelName}</span>
            )}
            {metadata != null && (
              <span className="uni-video-card-sidebar__metadata">{metadata}</span>
            )}
          </div>
        </div>
      </>
    );

    const classes = ['uni-video-card-sidebar', className].filter(Boolean).join(' ');

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

VideoCardSidebar.displayName = 'VideoCardSidebar';
