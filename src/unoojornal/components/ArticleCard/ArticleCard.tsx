'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import type { UjnArticleCardProps } from './ArticleCard.types';
import './ArticleCard.css';

/**
 * Componente ArticleCard — Design System Unoojornal
 *
 * Cartão de matéria: fotografia 3:2, etiqueta da seção, título e, no rodapé, o
 * tempo à esquerda e "Ler mais →" à direita. O hover eleva só por fio e
 * realce (contorno em `action-primary` e título sublinhado), sem sombra.
 *
 * O título é o alvo principal (`<a>` com `href`, `<button>` com `onOpen`) e o
 * cartão inteiro clica por pseudo-elemento: um único alvo de foco, com o título
 * como nome acessível. Marcado como Client Component porque repassa `onOpen`.
 */
export const ArticleCard = React.forwardRef<HTMLElement, UjnArticleCardProps>(
  (
    {
      imageSrc,
      imageAlt,
      kicker,
      title,
      readingTime,
      ctaLabel = 'Ler mais',
      href,
      onOpen,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const interactive = Boolean(href || onOpen);
    const classes = ['ujn-article-card', interactive ? 'ujn-article-card--interactive' : '', className]
      .filter(Boolean)
      .join(' ');

    let heading: React.ReactNode = title;
    if (href) {
      heading = (
        <a className="ujn-article-card__link" href={href} onClick={onOpen}>
          {title}
        </a>
      );
    } else if (onOpen) {
      heading = (
        <button type="button" className="ujn-article-card__link" onClick={onOpen}>
          {title}
        </button>
      );
    }

    return (
      <article ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-article-card__media">
          <img
            className="ujn-article-card__image"
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="ujn-article-card__body">
          <Tag variant="outline" size="sm">
            {kicker}
          </Tag>
          <h3 className="ujn-article-card__title">{heading}</h3>
          {(readingTime || interactive) && (
            <div className="ujn-article-card__footer">
              {readingTime && <span className="ujn-article-card__time">{readingTime}</span>}
              {interactive && (
                <span className="ujn-article-card__cta" aria-hidden="true">
                  {ctaLabel}
                  <Icon name="arrowForward" size="xs" tone="inherit" />
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }
);

ArticleCard.displayName = 'ArticleCard';
