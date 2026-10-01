import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import type { UjnArticleHeaderProps } from './ArticleHeader.types';
import './ArticleHeader.css';

/**
 * Texto do tempo de leitura: número são minutos, texto vai como veio.
 */
const readingTimeText = (readingTime: number | string): string =>
  typeof readingTime === 'number' ? `${readingTime} min de leitura` : readingTime;

/**
 * Componente ArticleHeader — Design System Unoojornal
 *
 * Cabeçalho da matéria aberta: chapéu (`Tag` de destaque), título em
 * `headline-xl` num `<h1>`, linha de apoio em `deck`, e a assinatura com
 * `Avatar`, data por extenso e tempo de leitura. Centralizado ou ao início.
 * O título cai de `headline-xl` para `headline` no contêiner médio e para
 * `title-lg` no compacto.
 *
 * Server Component: só recebe props e renderiza.
 */
export const ArticleHeader = React.forwardRef<HTMLElement, UjnArticleHeaderProps>(
  (
    {
      kicker,
      title,
      deck,
      author,
      authorRole,
      avatarSrc,
      date,
      dateTime,
      readingTime,
      align = 'center',
      theme,
      className = '',
      ...restProps
    },
    ref,
  ) => {
    const classes = ['ujn-article-header', `ujn-article-header--${align}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-article-header__inner">
          <Tag variant="accent" size="md">
            {kicker}
          </Tag>
          <h1 className="ujn-article-header__title">{title}</h1>
          {deck && <p className="ujn-article-header__deck">{deck}</p>}

          <div className="ujn-article-header__byline">
            <Avatar src={avatarSrc} name={author} size="md" />
            <div className="ujn-article-header__authorship">
              <p className="ujn-article-header__author">
                <span className="ujn-article-header__by">Por </span>
                <span className="ujn-article-header__name">{author}</span>
                {authorRole && <span className="ujn-article-header__role">{authorRole}</span>}
              </p>
              {(date || readingTime !== undefined) && (
                <p className="ujn-article-header__meta">
                  {date && (
                    <span className="ujn-article-header__meta-item">
                      <Icon name="calendar" size="xs" tone="inherit" />
                      {dateTime ? <time dateTime={dateTime}>{date}</time> : <span>{date}</span>}
                    </span>
                  )}
                  {readingTime !== undefined && (
                    <span className="ujn-article-header__meta-item">
                      <Icon name="schedule" size="xs" tone="inherit" />
                      <span>{readingTimeText(readingTime)}</span>
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  },
);

ArticleHeader.displayName = 'ArticleHeader';
