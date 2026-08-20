'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UniPlaylistProps } from './Playlist.types';
import './Playlist.css';

/**
 * Componente Playlist — Design System Unitube
 *
 * Reproduz o nó `Media/Playlist` (`19:1562`), a faixa horizontal que a tela de
 * canal repete quatro vezes.
 *
 * Os fios de 1px acima e abaixo têm 1070px, e não os 1200px da seção: o arquivo
 * os desenha dentro da calha de 65px, de modo que o divisor fique alinhado ao
 * conteúdo, e não à aresta do quadro.
 *
 * O rótulo "Play all" usa `--uni-color-text-secondary`, um degrau abaixo do
 * título da playlist — os dois compartilham o corpo de 16px em peso Bold.
 */
export const Playlist = React.forwardRef<HTMLElement, UniPlaylistProps>(
  (
    {
      playlistTitle,
      playAllLabel = 'Play all',
      showPlayAll = true,
      onPlayAll,
      className = '',
      children,
      ...restProps
    },
    ref
  ) => (
    <section
      ref={ref}
      className={['uni-playlist', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="uni-playlist__inner">
        <div className="uni-playlist__header">
          <h2 className="uni-playlist__title">{playlistTitle}</h2>
          {showPlayAll && (
            <button type="button" className="uni-playlist__play-all" onClick={onPlayAll}>
              <Icon name="play" size="lg" tone="inherit" />
              <span className="uni-playlist__play-all-label">{playAllLabel}</span>
            </button>
          )}
        </div>

        <div className="uni-playlist__row">{children}</div>
      </div>
    </section>
  )
);

Playlist.displayName = 'Playlist';
