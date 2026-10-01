import React from 'react';
import type { UjnPullQuoteProps } from './PullQuote.types';
import './PullQuote.css';

/**
 * Componente PullQuote — Design System Unoojornal
 *
 * Citação em destaque dentro da matéria: um `<figure>` com `<blockquote>` em
 * itálico (`--ujn-font-quote-*`), filete à esquerda em `--ujn-color-action-primary`
 * e, quando há `cite`, um `<figcaption>` "— Fulano, cargo". O travessão é
 * escrito no texto, e não só desenhado, para que o leitor de tela o anuncie.
 *
 * Server Component: só recebe props e renderiza.
 */
export const PullQuote = React.forwardRef<HTMLElement, UjnPullQuoteProps>(
  ({ children, cite, theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-pull-quote', className].filter(Boolean).join(' ');

    return (
      <figure ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <blockquote className="ujn-pull-quote__text">{children}</blockquote>
        {cite && <figcaption className="ujn-pull-quote__cite">— {cite}</figcaption>}
      </figure>
    );
  }
);

PullQuote.displayName = 'PullQuote';
