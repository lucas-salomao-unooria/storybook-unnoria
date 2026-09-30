import React from 'react';
import type { UglHighlightCardProps } from './HighlightCard.types';
import './HighlightCard.css';

/** Capas extras que o mosaico comporta. */
const MOSAIC_MAX = 3;

/**
 * Componente HighlightCard — Design System Unoogaleria
 *
 * Cartão grande de capa: um mês ou um ano da biblioteca, ou uma memória. A capa
 * ocupa o cartão (ou a coluna larga de um mosaico de até quatro imagens), e o
 * texto fica na base, em branco sobre o véu em degradê da mídia — invariante
 * nos dois temas, porque o fundo é a fotografia.
 *
 * Com `onClick`, é um botão nomeado pelo próprio texto (as imagens passam a
 * decorativas); sem, é uma figura com as imagens descritas.
 *
 * Server Component: só recebe props e renderiza; `onClick` vai direto ao
 * elemento nativo.
 */
export const HighlightCard = React.forwardRef<HTMLElement, UglHighlightCardProps>(
  (
    {
      coverSrc,
      coverAlt,
      title,
      subtitle,
      eyebrow,
      count,
      size = 'md',
      mosaic,
      onClick,
      theme,
      type = 'button',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const interactive = Boolean(onClick);
    const tiles = (mosaic ?? []).slice(0, MOSAIC_MAX);

    const classes = [
      'ugl-highlight-card',
      `ugl-highlight-card--${size}`,
      interactive ? 'ugl-highlight-card--interactive' : '',
      tiles.length ? `ugl-highlight-card--mosaic-${tiles.length}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const body = (
      <>
        <span className="ugl-highlight-card__media">
          <img
            className="ugl-highlight-card__image ugl-highlight-card__image--main"
            src={coverSrc}
            alt={interactive ? '' : coverAlt}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          {tiles.map((tile, index) => (
            <img
              key={`${index}-${tile.src}`}
              className="ugl-highlight-card__image"
              src={tile.src}
              alt={interactive ? '' : tile.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ))}
        </span>
        <span className="ugl-highlight-card__shade" aria-hidden="true" />
        {/* O texto vem antes da contagem no DOM: o nome do botão começa pelo título. */}
        <span className="ugl-highlight-card__text">
          {eyebrow && <span className="ugl-highlight-card__eyebrow">{eyebrow}</span>}
          <span className="ugl-highlight-card__title">{title}</span>
          {subtitle && <span className="ugl-highlight-card__subtitle">{subtitle}</span>}
        </span>
        {count && <span className="ugl-highlight-card__count">{count}</span>}
      </>
    );

    if (!interactive) {
      return (
        <figure
          ref={ref}
          data-ugl-theme={theme}
          className={classes}
          {...(restProps as React.HTMLAttributes<HTMLElement>)}
        >
          {body}
        </figure>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        data-ugl-theme={theme}
        className={classes}
        onClick={onClick}
        {...restProps}
      >
        {body}
      </button>
    );
  }
);

HighlightCard.displayName = 'HighlightCard';
