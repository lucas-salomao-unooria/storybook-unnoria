'use client';

import React from 'react';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { PostMeta } from '../PostMeta';
import type { UblPostCardProps } from './PostCard.types';
import './PostCard.css';

/**
 * Componente PostCard — Design System Unooblog
 *
 * Cartão de post do feed, em quatro variantes: `cover` (cartão lavanda com capa
 * 16:9), `horizontal` (capa 4:3 à esquerda), `compact` (sem capa, para listas
 * laterais e relacionados) e `featured` (capa 21:9 com título e resumo sobre o
 * véu da base). Estados: hover (realce `state-hover`, sem sombra), foco (anel
 * de 2px), lido (selo "Lido" com glifo, e o texto vai ao tom `muted`) e salvo.
 *
 * O título é o alvo principal (`<a>` com `href`, `<button>` com `onOpen`) e o
 * cartão inteiro clica por um pseudo-elemento: há um único ponto de foco e o
 * nome acessível é o título. O botão de salvar fica por cima desse
 * pseudo-elemento e nunca abre o post. Marcado como Client Component porque
 * repassa funções aos filhos.
 */
export const PostCard = React.forwardRef<HTMLElement, UblPostCardProps>(
  (
    {
      variant = 'cover',
      title,
      summary,
      coverSrc,
      coverAlt = '',
      topic,
      series,
      author,
      authorAvatarSrc,
      date,
      dateTime,
      readingTime,
      comments,
      saved = false,
      onToggleSave,
      read = false,
      href,
      onOpen,
      headingLevel = 3,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    // O destaque só faz sentido sobre uma capa: sem imagem, o texto branco
    // ficaria sobre a superfície clara do cartão.
    const effective = variant === 'featured' && !coverSrc ? 'cover' : variant;
    const showMedia = effective !== 'compact' && Boolean(coverSrc);
    const onMedia = effective === 'featured';
    const interactive = Boolean(href || onOpen);

    const classes = [
      'ubl-post-card',
      `ubl-post-card--${effective}`,
      interactive ? 'ubl-post-card--interactive' : '',
      read ? 'ubl-post-card--read' : '',
      saved ? 'ubl-post-card--saved' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';

    let heading: React.ReactNode = title;
    if (href) {
      heading = (
        <a className="ubl-post-card__link" href={href} onClick={onOpen}>
          {title}
        </a>
      );
    } else if (onOpen) {
      heading = (
        <button type="button" className="ubl-post-card__link" onClick={onOpen}>
          {title}
        </button>
      );
    }

    const pill = (node: React.ReactNode, key: string) =>
      onMedia ? (
        <span key={key} className="ubl-post-card__pill">
          {node}
        </span>
      ) : (
        <React.Fragment key={key}>{node}</React.Fragment>
      );

    const tags: React.ReactNode[] = [];
    if (topic) {
      tags.push(
        pill(
          <Badge tone="accent" size="sm">
            {topic}
          </Badge>,
          'topic'
        )
      );
    }
    if (series) {
      tags.push(
        pill(
          <Badge tone="neutral" size="sm" icon="series">
            {series}
          </Badge>,
          'series'
        )
      );
    }

    return (
      <article ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        <div className="ubl-post-card__inner">
          {showMedia && (
            <div className="ubl-post-card__media">
              <img
                className="ubl-post-card__image"
                src={coverSrc}
                alt={coverAlt}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          )}
          <div className="ubl-post-card__body">
            {(tags.length > 0 || read) && (
              <div className="ubl-post-card__tags">
                {tags}
                {read &&
                  pill(
                    <span className="ubl-post-card__read-flag">
                      <Icon name="check" size="xs" tone="inherit" />
                      Lido
                    </span>,
                    'read'
                  )}
              </div>
            )}
            <Heading className="ubl-post-card__title">{heading}</Heading>
            {summary && effective !== 'compact' && <p className="ubl-post-card__summary">{summary}</p>}
            <div className="ubl-post-card__footer">
              <PostMeta
                className="ubl-post-card__meta"
                author={author}
                avatarSrc={authorAvatarSrc}
                date={date}
                dateTime={dateTime}
                readingTime={readingTime}
                comments={comments}
              />
              {onToggleSave && (
                <div className="ubl-post-card__save">
                  <IconButton
                    icon={saved ? 'bookmarkFilled' : 'bookmark'}
                    label={`Salvar “${title}” para ler depois`}
                    variant="ghost"
                    size="md"
                    pressed={saved}
                    onClick={() => onToggleSave(!saved)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }
);

PostCard.displayName = 'PostCard';
