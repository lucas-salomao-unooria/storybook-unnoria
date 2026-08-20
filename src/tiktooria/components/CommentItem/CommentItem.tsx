import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { TikCommentItemProps } from './CommentItem.types';
import './CommentItem.css';

/**
 * Componente CommentItem — Design System Tik Tooria
 *
 * Comentário da folha de 414×60 sem respostas ou 414×80 com o atalho de
 * respostas (nodes 4:1016 e 4:968). A fotografia é um disco de 32px na calha de
 * 16px; o corpo alinha em 60px; o coração e o contador ficam na borda direita.
 */
export const CommentItem = React.forwardRef<HTMLElement, TikCommentItemProps>(
  (
    {
      author,
      text,
      time,
      avatarSrc,
      verified = false,
      likes,
      liked = false,
      repliesLabel,
      onLike,
      onOpenReplies,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <article
      ref={ref}
      className={['tik-commentitem', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <Avatar size="xs" src={avatarSrc} alt="" />

      <div className="tik-commentitem__body">
        <p className="tik-commentitem__author">
          {author}
          {verified && <Icon name="verified" size={10} />}
        </p>

        <p className="tik-commentitem__text">
          {text}
          {time !== undefined && <span className="tik-commentitem__time"> {time}</span>}
        </p>

        {repliesLabel !== undefined && (
          <button type="button" className="tik-commentitem__replies" onClick={onOpenReplies}>
            {repliesLabel}
            <Icon name="caretReplies" size={4.5} tone="secondary" />
          </button>
        )}
      </div>

      <button
        type="button"
        className="tik-commentitem__like"
        onClick={onLike}
        aria-pressed={liked}
        aria-label="Curtir comentário"
      >
        <Icon
          name={liked ? 'heart' : 'heartStroke'}
          size={13.5}
          tone={liked ? 'inherit' : 'default'}
        />
        {likes !== undefined && <span className="tik-commentitem__likes">{likes}</span>}
      </button>
    </article>
  )
);

CommentItem.displayName = 'CommentItem';
