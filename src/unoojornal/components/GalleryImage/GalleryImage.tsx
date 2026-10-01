'use client';

import React from 'react';
import type { UjnGalleryImageProps } from './GalleryImage.types';
import './GalleryImage.css';

/**
 * Componente GalleryImage — Design System Unoojornal
 *
 * Fotografia da galeria como `<figure>` com `<figcaption>` (legenda e crédito).
 * A proporção é 3:2, 4:5 ou 1:1. Quando abre algo, a imagem é o alvo — `<a>`
 * com `href`, `<button>` com `onOpen` — e o nome acessível é o `alt`; o hover
 * só realça. Marcado como Client Component porque repassa `onOpen`.
 */
export const GalleryImage = React.forwardRef<HTMLElement, UjnGalleryImageProps>(
  (
    { src, alt, caption, credit, aspectRatio = '3:2', href, onOpen, theme, className = '', ...restProps },
    ref
  ) => {
    const interactive = Boolean(href || onOpen);
    const classes = [
      'ujn-gallery-image',
      `ujn-gallery-image--ratio-${aspectRatio.replace(':', '-')}`,
      interactive ? 'ujn-gallery-image--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const image = (
      <img
        className="ujn-gallery-image__img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );

    let frame: React.ReactNode = <div className="ujn-gallery-image__frame">{image}</div>;
    if (href) {
      frame = (
        <a className="ujn-gallery-image__frame" href={href} onClick={onOpen}>
          {image}
        </a>
      );
    } else if (onOpen) {
      frame = (
        <button type="button" className="ujn-gallery-image__frame" onClick={onOpen}>
          {image}
        </button>
      );
    }

    return (
      <figure ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        {frame}
        <figcaption className="ujn-gallery-image__caption">
          <span className="ujn-gallery-image__text">{caption}</span>
          {credit && <span className="ujn-gallery-image__credit">{credit}</span>}
        </figcaption>
      </figure>
    );
  }
);

GalleryImage.displayName = 'GalleryImage';
