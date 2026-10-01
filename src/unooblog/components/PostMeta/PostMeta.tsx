import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UblPostMetaProps } from './PostMeta.types';
import './PostMeta.css';

/**
 * Componente PostMeta — Design System Unooblog
 *
 * Linha de metadados de um post: avatar pequeno, autoria em negrito, data,
 * tempo de leitura e contagem de comentários. Na disposição `inline` (cartões e
 * listas) tudo corre na mesma linha e quebra quando falta largura; na `stacked`
 * (cabeçalho do post) a autoria fica em cima e os detalhes embaixo. A data
 * vira `<time datetime>` quando `dateTime` é informado, e a contagem de
 * comentários chega ao leitor de tela por extenso ("3 comentários").
 *
 * As cores vêm de duas variáveis locais (`--ubl-post-meta-author` e
 * `--ubl-post-meta-detail`), que o cartão em destaque redefine para o texto
 * sobre a capa.
 *
 * Só recebe props e renderiza markup: é Server Component.
 */
export const PostMeta = React.forwardRef<HTMLDivElement, UblPostMetaProps>(
  (
    {
      author,
      avatarSrc,
      date,
      dateTime,
      readingTime,
      comments,
      layout = 'inline',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['ubl-post-meta', `ubl-post-meta--${layout}`, className].filter(Boolean).join(' ');

    const hasComments = typeof comments === 'number';
    const commentsLabel = hasComments
      ? `${comments.toLocaleString('pt-BR')} ${comments === 1 ? 'comentário' : 'comentários'}`
      : '';

    const details: { key: string; node: React.ReactNode }[] = [
      {
        key: 'date',
        node: dateTime ? <time dateTime={dateTime}>{date}</time> : <span>{date}</span>,
      },
    ];
    if (readingTime) {
      details.push({ key: 'reading', node: <span>{readingTime}</span> });
    }
    if (hasComments) {
      details.push({
        key: 'comments',
        node: (
          <span className="ubl-post-meta__comments">
            <Icon name="comments" size="xs" tone="inherit" />
            <span aria-hidden="true">{comments.toLocaleString('pt-BR')}</span>
            <span className="ubl-post-meta__visually-hidden">{commentsLabel}</span>
          </span>
        ),
      });
    }

    return (
      <div ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        <Avatar src={avatarSrc} name={author} size={layout === 'stacked' ? 'md' : 'sm'} alt="" />
        <div className="ubl-post-meta__text">
          <span className="ubl-post-meta__author">{author}</span>
          <span className="ubl-post-meta__details">
            {details.map((detail, index) => (
              <React.Fragment key={detail.key}>
                {index > 0 && (
                  <span className="ubl-post-meta__separator" aria-hidden="true">
                    ·
                  </span>
                )}
                {detail.node}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
    );
  }
);

PostMeta.displayName = 'PostMeta';
