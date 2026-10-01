'use client';

import React from 'react';
import { Button } from '../Button';
import { Byline } from '../Byline';
import { Tag } from '../Tag';
import type { UjnFeaturedStoryProps } from './FeaturedStory.types';
import './FeaturedStory.css';

/**
 * Componente FeaturedStory — Design System Unoojornal
 *
 * Matéria principal da capa: fotografia 3:2 à esquerda e, à direita, etiqueta
 * da seção, título em `headline`, resumo, botão primário "Ler a reportagem" e a
 * assinatura. Abaixo de 640px de contêiner a fotografia vai para cima do texto.
 *
 * O botão é o único alvo de foco do cartão: `<a>` com `href`, `<button>` com
 * `onOpen`. Seu nome acessível leva o título ("Ler a reportagem: título"), de
 * modo que vários destaques na página não se confundam. Marcado como Client
 * Component porque repassa `onOpen` ao botão.
 */
export const FeaturedStory = React.forwardRef<HTMLElement, UjnFeaturedStoryProps>(
  (
    {
      kicker,
      title,
      summary,
      imageSrc,
      imageAlt,
      author,
      authorRole,
      readingTime,
      ctaLabel = 'Ler a reportagem',
      href,
      onOpen,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['ujn-featured-story', className].filter(Boolean).join(' ');
    const interactive = Boolean(href || onOpen);

    return (
      <article ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-featured-story__layout">
          <div className="ujn-featured-story__media">
            <img
              className="ujn-featured-story__image"
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
          <div className="ujn-featured-story__content">
            <Tag variant="outline" size="md">
              {kicker}
            </Tag>
            <h2 className="ujn-featured-story__title">{title}</h2>
            <p className="ujn-featured-story__summary">{summary}</p>
            {interactive && (
              <div className="ujn-featured-story__action">
                <Button
                  variant="primary"
                  size="md"
                  iconEnd="arrowForward"
                  href={href}
                  onClick={onOpen}
                  aria-label={`${ctaLabel}: ${title}`}
                >
                  {ctaLabel}
                </Button>
              </div>
            )}
            <Byline
              className="ujn-featured-story__byline"
              author={author}
              role={authorRole}
              readingTime={readingTime}
            />
          </div>
        </div>
      </article>
    );
  }
);

FeaturedStory.displayName = 'FeaturedStory';
