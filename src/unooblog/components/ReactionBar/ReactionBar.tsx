'use client';

import React from 'react';
import { useControllableState } from '../../hooks';
import { Icon } from '../Icon';
import type { UblReactionBarProps } from './ReactionBar.types';
import './ReactionBar.css';

const numberFormat = new Intl.NumberFormat('pt-BR');

/**
 * Número com o substantivo no singular ou no plural ("1 curtida", "128 curtidas").
 */
const countLabel = (count: number, singular: string, plural: string) =>
  `${numberFormat.format(count)} ${count === 1 ? singular : plural}`;

/**
 * Componente ReactionBar — Design System Unooblog
 *
 * Reações ao post, em cápsulas de 44px: curtir (com `aria-pressed` e a
 * contagem no nome acessível, "Curtir, 128 curtidas"), ver comentários (com a
 * contagem) e salvar para ler depois (`aria-pressed`). Curtido, o glifo vira o
 * coração preenchido em `brand-like` e a cápsula ganha contorno e fundo — o
 * estado nunca depende só da cor. Curtir e salvar aceitam modo controlado
 * (`liked`, `saved`) ou não controlado (`defaultLiked`, `defaultSaved`).
 *
 * Client Component: guarda o estado dos botões de alternância.
 */
export const ReactionBar = React.forwardRef<HTMLDivElement, UblReactionBarProps>(
  (
    {
      likes,
      liked,
      defaultLiked = false,
      onToggleLike,
      comments,
      onOpenComments,
      saved,
      defaultSaved,
      onToggleSave,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [isLiked, setLiked] = useControllableState<boolean>({
      value: liked,
      defaultValue: defaultLiked,
      onChange: onToggleLike,
    });
    const [isSaved, setSaved] = useControllableState<boolean>({
      value: saved,
      defaultValue: defaultSaved ?? false,
      onChange: onToggleSave,
    });

    const hasComments = comments !== undefined || onOpenComments !== undefined;
    const hasSave =
      saved !== undefined || defaultSaved !== undefined || onToggleSave !== undefined;

    // No modo não controlado, a contagem acompanha a alternância local
    const likesShown =
      liked === undefined
        ? Math.max(0, likes + Number(isLiked) - Number(defaultLiked))
        : likes;

    const commentsName =
      comments === undefined
        ? 'Ver comentários'
        : `Ver comentários, ${countLabel(comments, 'comentário', 'comentários')}`;

    const classes = ['ubl-reaction-bar', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        role="group"
        aria-label="Reações ao post"
        {...restProps}
      >
        <button
          type="button"
          className={`ubl-reaction-bar__button ubl-reaction-bar__button--like${
            isLiked ? ' ubl-reaction-bar__button--active' : ''
          }`}
          aria-pressed={isLiked}
          aria-label={`Curtir, ${countLabel(likesShown, 'curtida', 'curtidas')}`}
          onClick={() => setLiked(!isLiked)}
        >
          <Icon name={isLiked ? 'likeFilled' : 'like'} size="sm" tone="inherit" />
          <span className="ubl-reaction-bar__count">{numberFormat.format(likesShown)}</span>
        </button>

        {hasComments && (
          <button
            type="button"
            className="ubl-reaction-bar__button"
            aria-label={commentsName}
            onClick={onOpenComments}
          >
            <Icon name="comments" size="sm" tone="inherit" />
            {comments !== undefined && (
              <span className="ubl-reaction-bar__count">{numberFormat.format(comments)}</span>
            )}
          </button>
        )}

        {hasSave && (
          <button
            type="button"
            className={`ubl-reaction-bar__button ubl-reaction-bar__button--save${
              isSaved ? ' ubl-reaction-bar__button--active-neutral' : ''
            }`}
            aria-pressed={isSaved}
            aria-label="Salvar para ler depois"
            onClick={() => setSaved(!isSaved)}
          >
            <Icon name={isSaved ? 'bookmarkFilled' : 'bookmark'} size="sm" tone="inherit" />
          </button>
        )}
      </div>
    );
  }
);

ReactionBar.displayName = 'ReactionBar';
