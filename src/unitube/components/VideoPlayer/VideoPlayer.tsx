'use client';

import React from 'react';
import { PlayerGlyph } from './PlayerGlyph';
import type { UniVideoPlayerProps } from './VideoPlayer.types';
import './VideoPlayer.css';

/** Restringe uma fração ao intervalo [0, 1]. */
const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Componente VideoPlayer — Design System Unitube
 *
 * Reproduz o nó `Media/VideoPlayer` (`18:1295`). O arquivo o publica em duas
 * larguras — 424 e 640 —, sempre com a mesma geometria interna de controles:
 * quem escala é o quadro, não a barra.
 *
 * A linha do tempo tem três camadas sobrepostas, todas literais do arquivo:
 * o trilho a 20% de `#EAEAEA`, o trecho carregado a 50% e o reproduzido em
 * `--uni-color-brand-progress` (`#FC0D1C`) — que **não** é o vermelho semântico
 * da marca (`#EE1A26`). Os dois vermelhos coexistem no mesmo reprodutor: o do
 * progresso na linha do tempo e o semântico no selo HD.
 */
export const VideoPlayer = React.forwardRef<HTMLDivElement, UniVideoPlayerProps>(
  (
    {
      src,
      alt = '',
      videoTitle,
      currentTime = '5:07',
      duration = '15:28',
      progress = 0.33,
      buffered = 0.5,
      showInfo = true,
      onPlay,
      onNext,
      onToggleSound,
      onToggleCaptions,
      onSettings,
      onTheater,
      onCast,
      onFullscreen,
      onInfo,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const playedPercent = clamp(progress) * 100;
    const bufferedPercent = clamp(Math.max(buffered, progress)) * 100;

    return (
      <div
        ref={ref}
        className={['uni-video-player', className].filter(Boolean).join(' ')}
        {...restProps}
      >
        {src && <img className="uni-video-player__poster" src={src} alt={alt} />}

        <div className="uni-video-player__scrim-top" aria-hidden="true" />
        <div className="uni-video-player__scrim-bottom" aria-hidden="true" />

        <div className="uni-video-player__header">
          {videoTitle != null && <span className="uni-video-player__title">{videoTitle}</span>}
          {showInfo && (
            <button
              type="button"
              className="uni-video-player__info"
              aria-label="Informações do vídeo"
              onClick={onInfo}
            >
              <PlayerGlyph name="info" height={20} />
            </button>
          )}
        </div>

        <div className="uni-video-player__controls">
          <div
            className="uni-video-player__timeline"
            role="progressbar"
            aria-label="Progresso do vídeo"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(playedPercent)}
          >
            <span
              className="uni-video-player__buffered"
              style={{ width: `${bufferedPercent}%` }}
            />
            <span className="uni-video-player__played" style={{ width: `${playedPercent}%` }} />
          </div>

          <div className="uni-video-player__bar">
            <div className="uni-video-player__cluster">
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Reproduzir"
                onClick={onPlay}
              >
                <PlayerGlyph name="play" height={16} />
              </button>
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Próximo vídeo"
                onClick={onNext}
              >
                <PlayerGlyph name="next" height={12} />
              </button>
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Volume"
                onClick={onToggleSound}
              >
                <PlayerGlyph name="sound" height={16} />
              </button>
              <span className="uni-video-player__time">
                {currentTime} / {duration}
              </span>
            </div>

            <div className="uni-video-player__cluster">
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Legendas"
                onClick={onToggleCaptions}
              >
                <PlayerGlyph name="titles" height={14} />
              </button>
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Qualidade"
                onClick={onSettings}
              >
                <PlayerGlyph name="quality" height={16} />
              </button>
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Modo cinema"
                onClick={onTheater}
              >
                <PlayerGlyph name="theater" height={14} />
              </button>
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Transmitir para a TV"
                onClick={onCast}
              >
                <PlayerGlyph name="tv" height={18} />
              </button>
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Tela cheia"
                onClick={onFullscreen}
              >
                <PlayerGlyph name="fullscreen" height={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
