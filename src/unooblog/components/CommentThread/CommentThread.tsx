'use client';

import React from 'react';
import { ublTimeAgo } from '../../content';
import type { UblComment } from '../../content';
import { Badge } from '../Badge';
import { CommentItem } from '../CommentItem';
import type { UblCommentThreadProps } from './CommentThread.types';
import './CommentThread.css';

/** Um comentário-raiz com as respostas (já achatadas) em ordem cronológica. */
interface ThreadNode {
  comment: UblComment;
  replies: { comment: UblComment; replyingToName?: string }[];
}

/**
 * Monta a árvore de dois níveis a partir da lista plana. Pai ausente vira raiz;
 * resposta de resposta sobe até a raiz e guarda o nome de quem foi respondido.
 */
const buildThread = (comments: UblComment[]): ThreadNode[] => {
  const byId = new Map(comments.map((comment) => [comment.id, comment]));

  /** Sobe pelos pais até a raiz; um ciclo (dado inválido) para onde se repete. */
  const rootIdOf = (comment: UblComment): string => {
    const seen = new Set<string>([comment.id]);
    let current = comment;
    for (;;) {
      const parent = current.parentId ? byId.get(current.parentId) : undefined;
      if (!parent || seen.has(parent.id)) return current.id;
      seen.add(parent.id);
      current = parent;
    }
  };

  const nodes = new Map<string, ThreadNode>();
  const roots: ThreadNode[] = [];
  comments.forEach((comment) => {
    if (rootIdOf(comment) === comment.id) {
      const node: ThreadNode = { comment, replies: [] };
      nodes.set(comment.id, node);
      roots.push(node);
    }
  });

  comments
    .filter((comment) => nodes.get(comment.id) === undefined)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .forEach((comment) => {
      const parent = byId.get(comment.parentId as string) as UblComment;
      nodes.get(rootIdOf(comment))?.replies.push({
        comment,
        /* Resposta de resposta: a menção preserva com quem a pessoa conversava. */
        replyingToName: rootIdOf(parent) === parent.id ? undefined : parent.authorName,
      });
    });

  return roots;
};

/**
 * Componente CommentThread — Design System Unooblog
 *
 * Seção de comentários de um post: título com a contagem total e uma lista
 * ordenada (`<ol>`) com os comentários-raiz; as respostas de cada um ficam numa
 * `<ol>` aninhada dentro do mesmo `<li>`, recuadas e em ordem cronológica. A
 * árvore sai da lista plana por `parentId`, com no máximo dois níveis.
 *
 * `renderComposer` desenha o compositor logo abaixo do comentário respondido
 * (`replyingToId`). As datas relativas vêm de `ublTimeAgo`, num fuso explícito.
 *
 * É de cliente porque monta a árvore com `useMemo` e repassa funções aos itens.
 */
export const CommentThread = React.forwardRef<HTMLElement, UblCommentThreadProps>(
  (
    {
      title = 'Comentários',
      headingLevel = 'h2',
      comments,
      onToggleLike,
      onReply,
      onDelete,
      likedIds,
      highlightedId,
      replyingToId,
      renderComposer,
      composer,
      emptyLabel = 'Ainda não há comentários. Seja a primeira pessoa a comentar.',
      now,
      timeZone,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const titleId = `ubl-comment-thread-${React.useId()}`;
    const roots = React.useMemo(() => buildThread(comments), [comments]);
    const Heading = headingLevel;
    const reference = now ?? new Date();

    const renderItem = (
      comment: UblComment,
      options: { isReply?: boolean; replyingToName?: string } = {}
    ) => (
      <CommentItem
        author={comment.authorName}
        avatarSrc={comment.avatarSrc}
        text={comment.text}
        date={ublTimeAgo(comment.createdAt, reference, timeZone)}
        dateTime={comment.createdAt}
        likes={comment.likes}
        liked={likedIds?.includes(comment.id) ?? false}
        mine={comment.mine}
        isReply={options.isReply}
        replyingToName={options.replyingToName}
        highlighted={highlightedId === comment.id}
        replying={replyingToId === comment.id}
        onToggleLike={onToggleLike ? () => onToggleLike(comment.id) : undefined}
        onReply={onReply ? () => onReply(comment.id) : undefined}
        onDelete={onDelete ? () => onDelete(comment.id) : undefined}
      />
    );

    const renderReplyComposer = (id: string) =>
      replyingToId === id && renderComposer ? (
        <div className="ubl-comment-thread__composer">{renderComposer(id)}</div>
      ) : null;

    return (
      <section
        ref={ref}
        data-ubl-theme={theme}
        aria-labelledby={titleId}
        {...restProps}
        className={['ubl-comment-thread', className].filter(Boolean).join(' ')}
      >
        <header className="ubl-comment-thread__header">
          <Heading id={titleId} className="ubl-comment-thread__title">
            {title}
          </Heading>
          <Badge tone="neutral" size="sm">
            {comments.length}
          </Badge>
        </header>

        {composer && <div className="ubl-comment-thread__composer">{composer}</div>}

        {roots.length === 0 ? (
          <p className="ubl-comment-thread__empty">{emptyLabel}</p>
        ) : (
          <ol className="ubl-comment-thread__list">
            {roots.map(({ comment, replies }) => (
              <li key={comment.id} className="ubl-comment-thread__entry">
                {renderItem(comment)}
                {renderReplyComposer(comment.id)}
                {replies.length > 0 && (
                  <ol className="ubl-comment-thread__replies">
                    {replies.map((reply) => (
                      <li key={reply.comment.id} className="ubl-comment-thread__entry">
                        {renderItem(reply.comment, {
                          isReply: true,
                          replyingToName: reply.replyingToName,
                        })}
                        {renderReplyComposer(reply.comment.id)}
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>
    );
  }
);

CommentThread.displayName = 'CommentThread';
