'use client';

import React, { useId, useState } from 'react';
import { Avatar } from '../Avatar';
import { SubscribeButton } from '../SubscribeButton';
import type { UniVideoDescriptionProps } from './VideoDescription.types';
import './VideoDescription.css';

/**
 * Componente VideoDescription — Design System Unitube
 *
 * Reproduz o nó `Content/VideoDescription` (`20:2989`), o bloco que apresenta o
 * canal e a descrição, logo abaixo do reprodutor.
 *
 * O recuo de 64px na descrição e no link de expansão não é arbitrário: é a
 * soma do avatar de 48px com a folga de 16px da coluna de retrato, de modo que
 * o texto se alinhe ao nome do canal, e não à aresta do bloco.
 *
 * O arquivo é estático e mostra apenas o rótulo "show more". O componente
 * implementa a expansão de fato — extensão registrada como desvio na estória.
 */
export const VideoDescription = React.forwardRef<HTMLElement, UniVideoDescriptionProps>(
  (
    {
      avatarSrc,
      avatarInitials,
      channelName,
      subscriberCount,
      description,
      showMoreLabel = 'show more',
      showLessLabel = 'show less',
      defaultExpanded = false,
      subscribed = false,
      onSubscribe,
      action,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const descriptionId = useId();

    return (
      <section
        ref={ref}
        className={['uni-video-description', className].filter(Boolean).join(' ')}
        {...restProps}
      >
        <div className="uni-video-description__channel">
          <div className="uni-video-description__avatar">
            <Avatar src={avatarSrc} initials={avatarInitials} size="xl" alt="" />
          </div>

          <div className="uni-video-description__identity">
            <span className="uni-video-description__name">{channelName}</span>
            {subscriberCount != null && (
              <span className="uni-video-description__subscribers">{subscriberCount}</span>
            )}
          </div>

          <div className="uni-video-description__action">
            {action ?? <SubscribeButton subscribed={subscribed} onClick={onSubscribe} />}
          </div>
        </div>

        {description != null && (
          <p
            id={descriptionId}
            className={[
              'uni-video-description__text',
              expanded ? 'uni-video-description__text--expanded' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {description}
          </p>
        )}

        {description != null && (
          <button
            type="button"
            className="uni-video-description__toggle"
            aria-expanded={expanded}
            aria-controls={descriptionId}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? showLessLabel : showMoreLabel}
          </button>
        )}
      </section>
    );
  }
);

VideoDescription.displayName = 'VideoDescription';
