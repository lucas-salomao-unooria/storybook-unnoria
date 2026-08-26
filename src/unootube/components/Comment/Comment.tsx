'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UniCommentProps } from './Comment.types';
import './Comment.css';

/**
 * Componente Comment — Design System Unootube
 *
 * Reproduz o nó `Content/Comment` (`24:2191`), o item da lista de comentários
 * da tela de vídeo.
 *
 * É o único ponto do arquivo em que **três** degraus tipográficos convivem na
 * mesma coluna: o nome do autor em Roboto Bold 13/20, a data em Caption/Default
 * e o texto em Body/Medium — todos com altura de linha declarada de 20px, o que
 * mantém o ritmo vertical constante apesar dos corpos distintos.
 *
 * Os glifos de curtida usam 16px, e não os 24px nativos: é o mesmo alvo
 * reduzido que o menu superior aplica.
 */
export const Comment = React.forwardRef<HTMLElement, UniCommentProps>(
  (
    {
      avatarSrc,
      avatarInitials,
      authorName,
      timestamp,
      commentText,
      likeCount,
      dislikeCount,
      liked = false,
      replyLabel = 'REPLY',
      showReply = true,
      onLike,
      onDislike,
      onReply,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <article
      ref={ref}
      className={['uni-comment', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="uni-comment__avatar">
        <Avatar src={avatarSrc} initials={avatarInitials} size="lg" alt="" />
      </div>

      <div className="uni-comment__body">
        <header className="uni-comment__header">
          <span className="uni-comment__author">{authorName}</span>
          {timestamp != null && <span className="uni-comment__timestamp">{timestamp}</span>}
        </header>

        <p className="uni-comment__text">{commentText}</p>

        <div className="uni-comment__toolbar">
          <button
            type="button"
            className="uni-comment__action"
            aria-pressed={liked}
            aria-label="Curtir comentário"
            onClick={onLike}
          >
            <span className="uni-comment__action-icon">
              <Icon name={liked ? 'likedFill' : 'likedOutline'} size="sm" tone="inherit" />
            </span>
            {likeCount != null && <span className="uni-comment__count">{likeCount}</span>}
          </button>

          <button
            type="button"
            className="uni-comment__action"
            aria-label="Não curtir comentário"
            onClick={onDislike}
          >
            <span className="uni-comment__action-icon">
              <Icon name="disliked" size="sm" tone="inherit" />
            </span>
            {dislikeCount != null && <span className="uni-comment__count">{dislikeCount}</span>}
          </button>

          {showReply && (
            <button type="button" className="uni-comment__reply" onClick={onReply}>
              {replyLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  )
);

Comment.displayName = 'Comment';
