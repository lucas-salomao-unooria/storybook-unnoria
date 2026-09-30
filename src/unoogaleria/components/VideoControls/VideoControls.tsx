'use client';

import React from 'react';
import { IconButton } from '../IconButton';
import { uglFormatDuration } from '../../media';
import type { UglVideoControlsProps } from './VideoControls.types';
import './VideoControls.css';

/** Passo das setas, em segundos. */
const ARROW_STEP = 5;
/** Passo de Page Up e Page Down, em segundos. */
const PAGE_STEP = 10;

/**
 * Componente VideoControls — Design System Unoogaleria
 *
 * Controles apresentacionais de um vídeo: tocar/pausar, a linha do tempo (um
 * `<input type="range">` nativo com a trilha desenhada), os dois tempos em
 * algarismos tabulares e o som. Não conhece o `<video>`: recebe o estado e
 * devolve intenções. O estado vem do hook `useVideoPlayback`, da mesma pasta.
 *
 * A linha do tempo é um controle nativo, então arraste, toque e leitor de tela
 * funcionam sem código; as teclas são reescritas para passos de 5 e 10 segundos,
 * porque o passo nativo (um centésimo de segundo) não moveria nada.
 */
export const VideoControls = React.forwardRef<HTMLDivElement, UglVideoControlsProps>(
  (
    {
      playing,
      currentTime,
      duration,
      muted,
      buffered,
      onTogglePlay,
      onSeek,
      onToggleMute,
      variant = 'bar',
      playLabel = 'Reproduzir',
      pauseLabel = 'Pausar',
      muteLabel = 'Desativar som',
      unmuteLabel = 'Ativar som',
      seekLabel = 'Posição do vídeo',
      ariaLabel = 'Controles do vídeo',
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const total = Number.isFinite(duration) && duration > 0 ? duration : 0;
    const safeTime = Number.isFinite(currentTime) ? Math.max(0, currentTime) : 0;
    const time = total ? Math.min(safeTime, total) : 0;
    const progress = total ? (time / total) * 100 : 0;
    const loaded = buffered === undefined ? 100 : Math.max(progress, Math.min(1, Math.max(0, buffered)) * 100);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!total) return;
      const targets: Record<string, number> = {
        ArrowRight: time + ARROW_STEP,
        ArrowUp: time + ARROW_STEP,
        ArrowLeft: time - ARROW_STEP,
        ArrowDown: time - ARROW_STEP,
        PageUp: time + PAGE_STEP,
        PageDown: time - PAGE_STEP,
        Home: 0,
        End: total,
      };
      if (!(event.key in targets)) return;
      event.preventDefault();
      onSeek(Math.min(total, Math.max(0, targets[event.key])));
    };

    const classes = ['ugl-video-controls', `ugl-video-controls--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const trackStyle = {
      '--ugl-video-controls-progress': `${progress}%`,
      '--ugl-video-controls-buffered': `${loaded}%`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        data-ugl-theme={theme}
        className={classes}
        style={style}
        {...restProps}
      >
        <IconButton
          icon={playing ? 'pause' : 'play'}
          label={playing ? pauseLabel : playLabel}
          variant="bar"
          filled
          onClick={onTogglePlay}
        />

        <span className="ugl-video-controls__time" aria-hidden="true">
          {uglFormatDuration(time)}
        </span>

        <input
          type="range"
          className="ugl-video-controls__range"
          min={0}
          max={total}
          step={0.01}
          value={time}
          disabled={!total}
          aria-label={seekLabel}
          aria-valuetext={`${uglFormatDuration(time)} de ${uglFormatDuration(total)}`}
          style={trackStyle}
          onChange={(event) => onSeek(Number(event.currentTarget.value))}
          onKeyDown={handleKeyDown}
        />

        <span className="ugl-video-controls__time" aria-hidden="true">
          {uglFormatDuration(total)}
        </span>

        <IconButton
          icon={muted ? 'volumeOff' : 'volume'}
          label={muted ? unmuteLabel : muteLabel}
          variant="bar"
          onClick={onToggleMute}
        />
      </div>
    );
  }
);

VideoControls.displayName = 'VideoControls';
