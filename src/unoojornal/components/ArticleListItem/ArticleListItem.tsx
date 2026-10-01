'use client';

import React from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Byline } from '../Byline';
import type { UjnArticleListItemProps } from './ArticleListItem.types';
import './ArticleListItem.css';

/**
 * Componente ArticleListItem — Design System Unoojornal
 *
 * Item da lista de matérias: etiqueta e "Há 2 horas" no alto, título, resumo de
 * duas linhas, assinatura e tempo de leitura. Estados: padrão, hover (realce e
 * barra lateral de 3px), foco (anel em volta do item inteiro), atual (barra
 * fixa e `aria-current`) e lida (texto `muted` e selo "Lida").
 *
 * O título é o alvo principal (`<a>` com `href`, `<button>` com `onOpen`) e o
 * item inteiro clica por um pseudo-elemento, de modo que há um único alvo de
 * foco e o nome acessível é o título. O botão de salvar, opcional, fica por
 * cima desse pseudo-elemento e não abre a matéria. Marcado como Client
 * Component porque repassa funções aos filhos.
 */
export const ArticleListItem = React.forwardRef<HTMLElement, UjnArticleListItemProps>(
  (
    {
      kicker,
      timeAgo,
      title,
      summary,
      author,
      authorRole,
      readingTime,
      href,
      onOpen,
      saved = false,
      onToggleSave,
      read = false,
      current = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const interactive = Boolean(href || onOpen);
    const classes = [
      'ujn-article-list-item',
      interactive ? 'ujn-article-list-item--interactive' : '',
      current ? 'ujn-article-list-item--current' : '',
      read ? 'ujn-article-list-item--read' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const currentProps = current ? { 'aria-current': 'true' as const } : {};

    let heading: React.ReactNode = title;
    if (href) {
      heading = (
        <a className="ujn-article-list-item__link" href={href} onClick={onOpen} {...currentProps}>
          {title}
        </a>
      );
    } else if (onOpen) {
      heading = (
        <button type="button" className="ujn-article-list-item__link" onClick={onOpen} {...currentProps}>
          {title}
        </button>
      );
    }

    return (
      <article ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-article-list-item__body">
          <div className="ujn-article-list-item__meta">
            <span className="ujn-article-list-item__kicker">{kicker}</span>
            {timeAgo && <span className="ujn-article-list-item__time">{timeAgo}</span>}
            {read && (
              <span className="ujn-article-list-item__read-flag">
                <Icon name="check" size="xs" tone="inherit" />
                Lida
              </span>
            )}
          </div>
          <h3 className="ujn-article-list-item__title">{heading}</h3>
          {summary && <p className="ujn-article-list-item__summary">{summary}</p>}
          <Byline
            className="ujn-article-list-item__byline"
            author={author}
            role={authorRole}
            readingTime={readingTime}
          />
        </div>
        {onToggleSave && (
          <div className="ujn-article-list-item__save">
            <IconButton
              icon={saved ? 'bookmarkFilled' : 'bookmark'}
              label={`Salvar “${title}” para ler depois`}
              variant="ghost"
              size="md"
              pressed={saved}
              onClick={() => onToggleSave(!saved)}
            />
          </div>
        )}
      </article>
    );
  }
);

ArticleListItem.displayName = 'ArticleListItem';
