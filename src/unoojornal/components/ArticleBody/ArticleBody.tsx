import React from 'react';
import type { UjnArticleBodyProps } from './ArticleBody.types';
import './ArticleBody.css';

/**
 * Componente ArticleBody — Design System Unoojornal
 *
 * Coluna de leitura da matéria, limitada a `--ujn-reading-width` (740px) e
 * centralizada. O estilo vem dos elementos HTML que o autor escreve: parágrafos
 * em `body-lg` (ou `body-md` e `title-md`, por `textSize`), links em
 * `text-accent` sublinhados, subtítulos `<h2>` e `<h3>`, listas, e o espaço
 * vertical por tokens. Aceita como filhos `Figure`, `PullQuote` e
 * `CorrectionNote`, que se encaixam na mesma coluna.
 *
 * Server Component: só recebe props e renderiza.
 */
export const ArticleBody = React.forwardRef<HTMLDivElement, UjnArticleBodyProps>(
  ({ children, textSize = 'md', theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-article-body', `ujn-article-body--${textSize}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        {children}
      </div>
    );
  }
);

ArticleBody.displayName = 'ArticleBody';
