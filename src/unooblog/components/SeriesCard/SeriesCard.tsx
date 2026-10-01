'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UblSeriesCardProps } from './SeriesCard.types';
import './SeriesCard.css';

/**
 * Componente SeriesCard — Design System Unooblog
 *
 * Cartão de série: capa, título, descrição, "N posts" e, quando há progresso,
 * uma barra com "x de N lidos". A barra é um `role="progressbar"` com
 * `aria-valuenow`, `aria-valuemax` e `aria-valuetext`, e o progresso também
 * está escrito ao lado — nunca só na barra. Com largura de contêiner a partir de
 * 560px, a capa passa para a esquerda.
 *
 * O título é o alvo principal (`<a>` com `href`, `<button>` com `onOpen`) e o
 * cartão inteiro clica por pseudo-elemento: um único ponto de foco. Marcado
 * como Client Component porque repassa `onOpen`.
 */
export const SeriesCard = React.forwardRef<HTMLElement, UblSeriesCardProps>(
  (
    {
      title,
      description,
      coverSrc,
      coverAlt = '',
      count,
      progress,
      href,
      onOpen,
      headingLevel = 3,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const interactive = Boolean(href || onOpen);
    const classes = [
      'ubl-series-card',
      coverSrc ? 'ubl-series-card--with-cover' : '',
      interactive ? 'ubl-series-card--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
    const countLabel = `${count.toLocaleString('pt-BR')} ${count === 1 ? 'post' : 'posts'}`;

    const hasProgress = typeof progress === 'number';
    const read = hasProgress ? Math.min(Math.max(Math.round(progress), 0), count) : 0;
    const percent = hasProgress && count > 0 ? (read / count) * 100 : 0;
    const progressText = `${read} de ${count} lidos`;

    let heading: React.ReactNode = title;
    if (href) {
      heading = (
        <a className="ubl-series-card__link" href={href} onClick={onOpen}>
          {title}
        </a>
      );
    } else if (onOpen) {
      heading = (
        <button type="button" className="ubl-series-card__link" onClick={onOpen}>
          {title}
        </button>
      );
    }

    return (
      <article ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        <div className="ubl-series-card__inner">
          {coverSrc && (
            <div className="ubl-series-card__media">
              <img
                className="ubl-series-card__image"
                src={coverSrc}
                alt={coverAlt}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          )}
          <div className="ubl-series-card__body">
            <span className="ubl-series-card__count">
              <Icon name="series" size="xs" tone="inherit" />
              {countLabel}
            </span>
            <Heading className="ubl-series-card__title">{heading}</Heading>
            {description && <p className="ubl-series-card__description">{description}</p>}
            {hasProgress && (
              <div className="ubl-series-card__progress">
                <div
                  className="ubl-series-card__track"
                  role="progressbar"
                  aria-label={`Progresso na série ${title}`}
                  aria-valuemin={0}
                  aria-valuemax={count}
                  aria-valuenow={read}
                  aria-valuetext={progressText}
                >
                  <div className="ubl-series-card__fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="ubl-series-card__progress-text">{progressText}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }
);

SeriesCard.displayName = 'SeriesCard';
