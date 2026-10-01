'use client';

import React from 'react';
import { PostCard } from '../PostCard';
import type { UblRelatedPostsProps } from './RelatedPosts.types';
import './RelatedPosts.css';

/**
 * Componente RelatedPosts — Design System Unooblog
 *
 * Bloco "Continue lendo", no fim do post: um título de seção (`<h2>`) e uma
 * lista de `PostCard`. Na variante `cover`, três colunas a partir de 960px de
 * contêiner, duas a partir de 640px e uma abaixo disso; na `compact`, uma
 * coluna (duas a partir de 960px). É uma região nomeada pelo título e uma lista
 * de verdade (`<ul>`, um `<li>` por cartão). Os cartões usam o título como `<h3>`.
 *
 * Client Component: repassa o manipulador de abertura aos cartões.
 */
export const RelatedPosts = React.forwardRef<HTMLElement, UblRelatedPostsProps>(
  ({ title = 'Continue lendo', items, variant = 'cover', onOpen, theme, className = '', ...restProps }, ref) => {
    const headingId = React.useId();
    const classes = ['ubl-related-posts', `ubl-related-posts--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <section
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        aria-labelledby={headingId}
        {...restProps}
      >
        <div className="ubl-related-posts__inner">
          <h2 id={headingId} className="ubl-related-posts__title">
            {title}
          </h2>
          <ul className="ubl-related-posts__list" role="list">
            {items.map((item) => (
              <li key={item.id} className="ubl-related-posts__item">
                <PostCard
                  variant={variant}
                  headingLevel={3}
                  title={item.title}
                  summary={item.summary}
                  coverSrc={item.coverSrc}
                  coverAlt={item.coverAlt}
                  topic={item.topic}
                  author={item.author}
                  authorAvatarSrc={item.authorAvatarSrc}
                  date={item.date}
                  dateTime={item.dateTime}
                  readingTime={item.readingTime}
                  href={item.href}
                  onOpen={onOpen ? () => onOpen(item.id) : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
);

RelatedPosts.displayName = 'RelatedPosts';
