'use client';

import React from 'react';
import { ArticleCard } from '../ArticleCard';
import { SectionHeading } from '../SectionHeading';
import type { UjnRelatedArticlesProps } from './RelatedArticles.types';
import './RelatedArticles.css';

/**
 * Componente RelatedArticles — Design System Unoojornal
 *
 * Bloco "Leia também", no fim da matéria: título de seção e uma grade de
 * `ArticleCard` — três colunas a partir de 960px de contêiner, duas a partir de
 * 640px e uma abaixo disso. É uma região nomeada pelo título e uma lista de
 * verdade (`<ul>`, um `<li>` por cartão). Marcado como Client Component porque
 * repassa o manipulador de abertura aos cartões.
 */
export const RelatedArticles = React.forwardRef<HTMLElement, UjnRelatedArticlesProps>(
  ({ title = 'Leia também', items, onOpen, theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-related-articles', className].filter(Boolean).join(' ');

    return (
      <section ref={ref} data-ujn-theme={theme} className={classes} aria-label={title} {...restProps}>
        <div className="ujn-related-articles__inner">
          <SectionHeading title={title} rule />
          <ul className="ujn-related-articles__list" role="list">
            {items.map((item) => (
              <li key={item.id} className="ujn-related-articles__item">
                <ArticleCard
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  kicker={item.kicker}
                  title={item.title}
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

RelatedArticles.displayName = 'RelatedArticles';
