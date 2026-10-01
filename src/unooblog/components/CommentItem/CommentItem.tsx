'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import type { UblCommentItemProps } from './CommentItem.types';
import './CommentItem.css';

/**
 * Componente CommentItem — Design System Unooblog
 *
 * Um comentário de leitor: avatar, nome em negrito, data relativa em `<time>`,
 * texto e a linha de ações (curtir, responder e, só nos comentários de quem lê,
 * excluir). É um `<article>` nomeado pelo autor. O botão de curtir é um
 * alternador (`aria-pressed`) e leva a contagem no nome acessível; a contagem
 * visível é decorativa para não ser lida duas vezes.
 *
 * `highlighted` pinta o fundo de `background-subtle` e anuncia “em destaque”
 * em texto oculto. `isReply` recua o comentário com um filete à esquerda.
 *
 * É de cliente porque repassa funções aos botões.
 */
export const CommentItem = React.forwardRef<HTMLElement, UblCommentItemProps>(
  (
    {
      author,
      avatarSrc,
      text,
      date,
      dateTime,
      likes,
      liked = false,
      mine = false,
      isReply = false,
      highlighted = false,
      replyingToName,
      replying,
      replyLabel = 'Responder',
      deleteLabel = 'Excluir meu comentário',
      onToggleLike,
      onReply,
      onDelete,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const nameId = `ubl-comment-item-${React.useId()}`;

    const classes = [
      'ubl-comment-item',
      isReply ? 'ubl-comment-item--reply' : '',
      highlighted ? 'ubl-comment-item--highlighted' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const likesLabel = `${likes} ${likes === 1 ? 'curtida' : 'curtidas'}`;

    return (
      <article
        ref={ref}
        data-ubl-theme={theme}
        aria-labelledby={nameId}
        {...restProps}
        className={classes}
      >
        <Avatar src={avatarSrc} name={author} size="md" alt="" className="ubl-comment-item__avatar" />

        <div className="ubl-comment-item__main">
          <header className="ubl-comment-item__header">
            <span id={nameId} className="ubl-comment-item__author">
              {author}
              {highlighted && <span className="ubl-comment-item__visually-hidden">, em destaque</span>}
            </span>
            <time className="ubl-comment-item__date" dateTime={dateTime}>
              {date}
            </time>
          </header>

          <p className="ubl-comment-item__text">
            {replyingToName && (
              <>
                <span className="ubl-comment-item__mention">
                  <span aria-hidden="true">@{replyingToName}</span>
                  <span className="ubl-comment-item__visually-hidden">Em resposta a {replyingToName}: </span>
                </span>{' '}
              </>
            )}
            {text}
          </p>

          <div className="ubl-comment-item__actions">
            <span className="ubl-comment-item__like">
              <IconButton
                size="sm"
                variant="ghost"
                icon={liked ? 'thumbUpFilled' : 'thumbUp'}
                label={`Curtir comentário de ${author}, ${likesLabel}`}
                pressed={liked}
                onClick={onToggleLike}
              />
              {likes > 0 && (
                <span className="ubl-comment-item__likes" aria-hidden="true">
                  {likes}
                </span>
              )}
            </span>

            <Button
              variant="ghost"
              size="sm"
              iconStart="reply"
              aria-label={`${replyLabel} a ${author}`}
              aria-expanded={replying}
              onClick={onReply}
            >
              {replyLabel}
            </Button>

            {mine && (
              <IconButton
                size="sm"
                variant="ghost"
                icon="delete"
                label={deleteLabel}
                className="ubl-comment-item__delete"
                onClick={onDelete}
              />
            )}
          </div>
        </div>
      </article>
    );
  }
);

CommentItem.displayName = 'CommentItem';
