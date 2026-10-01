import React from 'react';
import type { UblFigureProps } from './Figure.types';
import './Figure.css';

/**
 * Componente Figure — Design System Unooblog
 *
 * Imagem do post em quadro 16:9 de cantos macios (`radius-m`), com legenda em
 * `body-md` e crédito em `caption`. É um `<figure>`; a `<figcaption>` só existe
 * quando há legenda ou crédito. A imagem carrega de forma preguiçosa e o quadro
 * tem uma superfície sutil de espera (`--ubl-color-background-subtle`). Com
 * `wide`, a figura extrapola a coluna de leitura até `--ubl-page-width`.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Figure = React.forwardRef<HTMLElement, UblFigureProps>(
  ({ src, alt, caption, credit, wide = false, theme, className = '', ...restProps }, ref) => {
    const classes = ['ubl-figure', wide ? 'ubl-figure--wide' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <figure ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        <div className="ubl-figure__frame">
          <img className="ubl-figure__image" src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
        {(caption || credit) && (
          <figcaption className="ubl-figure__caption">
            {caption && <span className="ubl-figure__text">{caption}</span>}
            {credit && <span className="ubl-figure__credit">{credit}</span>}
          </figcaption>
        )}
      </figure>
    );
  }
);

Figure.displayName = 'Figure';
