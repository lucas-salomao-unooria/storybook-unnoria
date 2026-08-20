import React from 'react';
import { Avatar } from '../Avatar';
import { ThumbnailImage } from '../ThumbnailImage';
import type { UniVideoCardProps } from './VideoCard.types';
import './VideoCard.css';

/**
 * Componente VideoCard — Design System Unitube
 *
 * Reproduz o nó `Media/VideoCard` (`12:593`), o cartão que preenche a grade da
 * tela inicial em linhas de quatro.
 *
 * Duas medidas do arquivo merecem nota: o título usa **Roboto Bold 12**, um
 * degrau que a escala publica como Label/Medium; e o canal e os metadados usam
 * Caption/Default em `--uni-color-text-secondary`, mas empilhados **sem
 * intervalo** — o bloco `Thumbnail/Desc/Info` tem `gap: 0`.
 */
export const VideoCard = React.forwardRef<HTMLElement, UniVideoCardProps>(
  (
    {
      thumbnailSrc,
      thumbnailAlt = '',
      duration,
      avatarSrc,
      avatarInitials,
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
        <div className="uni-video-card__row">
          <div className="uni-video-card__avatar">
            <Avatar src={avatarSrc} initials={avatarInitials} size="md" alt="" />
          </div>
          <div className="uni-video-card__desc">
            <h3 className="uni-video-card__title">{videoTitle}</h3>
            <div className="uni-video-card__info">
              {channelName != null && (
                <span className="uni-video-card__channel">{channelName}</span>
              )}
              {metadata != null && <span className="uni-video-card__metadata">{metadata}</span>}
            </div>
          </div>
        </div>
      </>
    );

    const classes = ['uni-video-card', className].filter(Boolean).join(' ');

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

VideoCard.displayName = 'VideoCard';
