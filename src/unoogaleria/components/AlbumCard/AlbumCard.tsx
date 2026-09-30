'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UglAlbumCardProps } from './AlbumCard.types';
import './AlbumCard.css';

const countText = (count: number) => `${count.toLocaleString('pt-BR')} ${count === 1 ? 'item' : 'itens'}`;

/**
 * Componente AlbumCard — Design System Unoogaleria
 *
 * Cartão de álbum: capa quadrada de cantos arredondados, título e contagem
 * abaixo. Álbum compartilhado ganha o selo de pessoas; álbum protegido
 * (Ocultos, Excluídos recentemente) nunca mostra a capa — só o glifo — e ganha
 * o selo de cadeado. Sem capa, o glifo aparece sobre a superfície terciária.
 *
 * O cartão inteiro é um botão com o nome "Título, N itens" (e ", compartilhado"
 * ou ", protegido"); o menu opcional fica ao lado, fora do botão. Marcado como
 * Client Component porque monta o manipulador que devolve o álbum.
 */
export const AlbumCard = React.forwardRef<HTMLDivElement, UglAlbumCardProps>(
  (
    { album, onClick, size = 'md', placeholderIcon, menu, theme, className = '', ...restProps },
    ref
  ) => {
    const isShared = album.kind === 'shared';
    const isProtected = album.kind === 'protected';
    const showCover = Boolean(album.coverSrc) && !isProtected;
    const glyph = placeholderIcon ?? (isProtected ? 'lock' : 'photo');
    const badge = isShared ? 'people' : isProtected && glyph !== 'lock' ? 'lock' : null;

    const accessibleName = [
      album.title,
      countText(album.count),
      isShared ? 'compartilhado' : '',
      isProtected ? 'protegido' : '',
    ]
      .filter(Boolean)
      .join(', ');

    const classes = [
      'ugl-album-card',
      `ugl-album-card--${size}`,
      menu ? 'ugl-album-card--with-menu' : '',
      onClick ? 'ugl-album-card--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const body = (
      <>
        <span className="ugl-album-card__cover">
          {showCover ? (
            <img
              className="ugl-album-card__image"
              src={album.coverSrc}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : (
            <Icon name={glyph} size="xl" tone="secondary" />
          )}
          {badge && (
            <span className="ugl-album-card__badge">
              <Icon name={badge} size="xs" tone="on-media" />
            </span>
          )}
        </span>
        <span className="ugl-album-card__text">
          <span className="ugl-album-card__title">{album.title}</span>
          <span className="ugl-album-card__count">{album.count.toLocaleString('pt-BR')}</span>
        </span>
      </>
    );

    return (
      <div ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
        {onClick ? (
          <button
            type="button"
            className="ugl-album-card__main"
            aria-label={accessibleName}
            onClick={() => onClick(album)}
          >
            {body}
          </button>
        ) : (
          <div className="ugl-album-card__main" role="group" aria-label={accessibleName}>
            {body}
          </div>
        )}
        {menu && <div className="ugl-album-card__menu">{menu}</div>}
      </div>
    );
  }
);

AlbumCard.displayName = 'AlbumCard';
