import React from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import type { UblPostHeaderProps } from './PostHeader.types';
import './PostHeader.css';

/**
 * Texto do tempo de leitura: número são minutos, texto vai como veio.
 */
const readingTimeText = (readingTime: number | string): string =>
  typeof readingTime === 'number' ? `${readingTime} min de leitura` : readingTime;

/**
 * Componente PostHeader — Design System Unooblog
 *
 * Cabeçalho do post aberto, na coluna de leitura (`--ubl-reading-width`):
 * trilha de tópicos, indicação de série ("Parte 2 de 3 · título"), título num
 * `<h1>` em `heading-1`, subtítulo em `lead`, a linha do autor (retrato grande,
 * nome em negrito, cargo, data em `<time>`, atualização e tempo de leitura) e a
 * capa 16:9 com legenda num `<figure>`. O autor vem sempre antes do texto: é um
 * blog de autoria. O título cai de `heading-1` para `heading-2` abaixo de 960px
 * de contêiner e para `heading-3` abaixo de 640px.
 *
 * Server Component: só recebe props e renderiza.
 */
export const PostHeader = React.forwardRef<HTMLElement, UblPostHeaderProps>(
  (
    {
      title,
      subtitle,
      topics,
      series,
      author,
      authorRole,
      avatarSrc,
      date,
      dateTime,
      updated,
      readingTime,
      coverSrc,
      coverAlt,
      coverCaption,
      align = 'start',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['ubl-post-header', `ubl-post-header--${align}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        <div className="ubl-post-header__inner">
          {topics && topics.length > 0 && (
            <ul className="ubl-post-header__topics" role="list" aria-label="Tópicos do post">
              {topics.map((topic) => (
                <li key={topic}>
                  <Badge tone="accent" size="md">
                    {topic}
                  </Badge>
                </li>
              ))}
            </ul>
          )}

          {series && (
            <p className="ubl-post-header__series">
              <Icon name="series" size="sm" tone="accent" />
              <span className="ubl-post-header__series-text">
                <strong>
                  Parte {series.part} de {series.total}
                </strong>
                {' · '}
                {series.title}
              </span>
            </p>
          )}

          <h1 className="ubl-post-header__title">{title}</h1>
          {subtitle && <p className="ubl-post-header__subtitle">{subtitle}</p>}

          <div className="ubl-post-header__author">
            <Avatar src={avatarSrc} name={author} size="lg" alt="" />
            <div className="ubl-post-header__authorship">
              <p className="ubl-post-header__byline">
                <span className="ubl-post-header__name">{author}</span>
                {authorRole && <span className="ubl-post-header__role">{authorRole}</span>}
              </p>
              <p className="ubl-post-header__meta">
                <span className="ubl-post-header__meta-item">
                  <Icon name="calendar" size="xs" tone="inherit" />
                  {dateTime ? <time dateTime={dateTime}>{date}</time> : <span>{date}</span>}
                </span>
                {updated && (
                  <span className="ubl-post-header__meta-item">
                    <Icon name="history" size="xs" tone="inherit" />
                    <span>Atualizado em {updated}</span>
                  </span>
                )}
                {readingTime !== undefined && (
                  <span className="ubl-post-header__meta-item">
                    <Icon name="schedule" size="xs" tone="inherit" />
                    <span>{readingTimeText(readingTime)}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {coverSrc && (
          <figure className="ubl-post-header__cover">
            <div className="ubl-post-header__cover-frame">
              <img
                className="ubl-post-header__cover-image"
                src={coverSrc}
                alt={coverAlt ?? ''}
                decoding="async"
              />
            </div>
            {coverCaption && (
              <figcaption className="ubl-post-header__cover-caption">{coverCaption}</figcaption>
            )}
          </figure>
        )}
      </header>
    );
  }
);

PostHeader.displayName = 'PostHeader';
