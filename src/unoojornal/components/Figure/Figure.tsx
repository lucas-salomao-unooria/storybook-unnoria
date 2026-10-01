import React from 'react';
import type { UjnFigureProps } from './Figure.types';
import './Figure.css';

/**
 * Componente Figure — Design System Unoojornal
 *
 * Imagem da matéria em quadro de proporção 3:2, com legenda em `body-sm` e
 * crédito em `caption`. É um `<figure>`; a `<figcaption>` só existe quando há
 * legenda ou crédito. A imagem carrega de forma preguiçosa e o quadro tem uma
 * superfície sutil de espera (`--ujn-color-background-subtle`).
 *
 * Server Component: só recebe props e renderiza.
 */
export const Figure = React.forwardRef<HTMLElement, UjnFigureProps>(
  ({ src, alt, caption, credit, theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-figure', className].filter(Boolean).join(' ');

    return (
      <figure ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-figure__frame">
          <img className="ujn-figure__image" src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
        {(caption || credit) && (
          <figcaption className="ujn-figure__caption">
            {caption && <span className="ujn-figure__text">{caption}</span>}
            {credit && <span className="ujn-figure__credit">{credit}</span>}
          </figcaption>
        )}
      </figure>
    );
  }
);

Figure.displayName = 'Figure';
