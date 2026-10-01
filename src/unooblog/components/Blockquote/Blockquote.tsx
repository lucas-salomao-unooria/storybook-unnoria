import React from 'react';
import { Icon } from '../Icon';
import type { UblBlockquoteProps } from './Blockquote.types';
import './Blockquote.css';

/**
 * Componente Blockquote — Design System Unooblog
 *
 * Citação do post: um `<figure>` com `<blockquote>` em itálico
 * (`--ubl-font-quote-*`) e, quando há `cite`, um `<figcaption>` "— Fulano,
 * cargo". Na variante `quote`, um filete de 4px em `action-primary` à esquerda;
 * na `pull`, o texto fica centralizado e maior, com um glifo de aspas no topo.
 * O travessão é escrito no texto, e não só desenhado, para que o leitor de tela
 * o anuncie.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Blockquote = React.forwardRef<HTMLElement, UblBlockquoteProps>(
  ({ children, cite, variant = 'quote', theme, className = '', ...restProps }, ref) => {
    const classes = ['ubl-blockquote', `ubl-blockquote--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <figure ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        {variant === 'pull' && (
          <span className="ubl-blockquote__mark">
            <Icon name="quote" size="lg" tone="accent" />
          </span>
        )}
        <blockquote className="ubl-blockquote__text">{children}</blockquote>
        {cite && <figcaption className="ubl-blockquote__cite">— {cite}</figcaption>}
      </figure>
    );
  }
);

Blockquote.displayName = 'Blockquote';
