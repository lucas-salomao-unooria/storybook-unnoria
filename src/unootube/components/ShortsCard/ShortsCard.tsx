'use client';

/*
 * Marcado como client porque o arquivo **cria** um manipulador: o botão de
 * contexto precisa interromper a propagação para que abri-lo não navegue
 * quando o cartão é um link. Um Server Component não pode entregar função a um
 * elemento do DOM. Os demais componentes de Shorts apenas repassam props e
 * continuam Server Components.
 */
import React from 'react';
import { Icon } from '../Icon';
import type { UniShortsCardProps } from './ShortsCard.types';
import './ShortsCard.css';

/**
 * Componente ShortsCard — Design System Unootube
 *
 * Reproduz as três composições de cartão vertical do arquivo "Free YouTube
 * Shorts Mockups (Community)": o cartão da prateleira móvel (`1:136`), o da
 * grade da área de trabalho (`1:742`) e a célula da grade de canal móvel
 * (`16:1017`).
 *
 * O que separa as três é **onde o texto mora**, e não a medida: sobre a
 * miniatura, abaixo dela, ou reduzido às visualizações. Foi por isso que
 * nenhuma virou variação de espaçamento da outra.
 *
 * O menu de contexto é um alvo próprio dentro do cartão. Quando o cartão é um
 * `<a>`, o botão fica sobreposto ao link e interrompe a propagação — sem isso
 * abrir o menu navegaria para o vídeo.
 */
export const ShortsCard = React.forwardRef<HTMLElement, UniShortsCardProps>(
  (
    {
      thumbnailSrc,
      thumbnailAlt = '',
      videoTitle,
      views,
      variant = 'overlay',
      href,
      showMore,
      onMore,
      width,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const resolvedShowMore = showMore ?? variant === 'overlay';

    const media = (
      <div className="uni-shorts-card__media">
        {thumbnailSrc && (
          <img className="uni-shorts-card__image" src={thumbnailSrc} alt={thumbnailAlt} />
        )}
        {variant === 'overlay' && <span className="uni-shorts-card__veil" aria-hidden="true" />}

        {variant !== 'below' && (
          <div className="uni-shorts-card__overlay">
            {videoTitle != null && variant === 'overlay' && (
              <h3 className="uni-shorts-card__title">{videoTitle}</h3>
            )}
            {views != null && <span className="uni-shorts-card__views">{views}</span>}
          </div>
        )}
      </div>
    );

    const body = (
      <>
        {media}
        {variant === 'below' && (videoTitle != null || views != null) && (
          <div className="uni-shorts-card__caption">
            {videoTitle != null && <h3 className="uni-shorts-card__title">{videoTitle}</h3>}
            {views != null && <span className="uni-shorts-card__views">{views}</span>}
          </div>
        )}
        {resolvedShowMore && (
          <button
            type="button"
            className="uni-shorts-card__more"
            aria-label="Mais ações"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onMore?.(event);
            }}
          >
            <Icon name="moreVertical" size={15} />
          </button>
        )}
      </>
    );

    const classes = ['uni-shorts-card', `uni-shorts-card--${variant}`, className]
      .filter(Boolean)
      .join(' ');
    const resolvedStyle = width != null ? { width, ...style } : style;

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={href}
          style={resolvedStyle}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {body}
        </a>
      );
    }

    return (
      <article
        ref={ref as React.Ref<HTMLElement>}
        className={classes}
        style={resolvedStyle}
        {...(restProps as React.HTMLAttributes<HTMLElement>)}
      >
        {body}
      </article>
    );
  }
);

ShortsCard.displayName = 'ShortsCard';
