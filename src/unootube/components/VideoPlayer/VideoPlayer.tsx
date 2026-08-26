'use client';

import React from 'react';
import { PlayerGlyph } from './PlayerGlyph';
import { formatPlaybackTime, useVideoPlayback } from './useVideoPlayback';
import type { UniVideoPlayerProps } from './VideoPlayer.types';
import './VideoPlayer.css';

/** Restringe uma fração ao intervalo [0, 1]. */
const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Tempo sem interação antes de recolher os controles, em milissegundos. */
const IDLE_DELAY = 2600;

/**
 * Componente VideoPlayer — Design System Unootube
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
 *
 * O arquivo é estático e desenha um bitmap com controles inertes. Com `src` ou
 * `sources`, o componente monta um `<video>` real e passa a operar: os nove
 * controles do arquivo comandam reprodução, busca, volume, legendas e tela
 * cheia, e o relógio, o progresso e o trecho carregado passam a vir do
 * elemento. Sem fonte, permanece a réplica estática do quadro — é assim que a
 * documentação continua reproduzindo o arquivo fielmente.
 */
export const VideoPlayer = React.forwardRef<HTMLDivElement, UniVideoPlayerProps>(
  (
    {
      src,
      sources,
      poster,
      alt = '',
      captions,
      videoTitle,
      autoPlay = false,
      loop = false,
      muted = false,
      preload = 'metadata',
      playsInline = true,
      autoHideControls = true,
      showBigPlay = true,
      showInfo = true,
      currentTime = '5:07',
      duration = '15:28',
      progress = 0.33,
      buffered = 0.5,
      videoRef: forwardedVideoRef,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onStateChange,
      onNext,
      onToggleCaptions,
      onSettings,
      onTheater,
      onCast,
      onInfo,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const hasVideo = Boolean(src) || Boolean(sources && sources.length > 0);
    const hasCaptions = Boolean(captions && captions.length > 0);

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const { videoRef, state, controls } = useVideoPlayback({
      containerRef,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
    });

    const [captionsOn, setCaptionsOn] = React.useState(
      () => captions?.some((track) => track.default) ?? false
    );
    const [idle, setIdle] = React.useState(false);

    /* Encaminha o elemento de vídeo tanto para o motor quanto para o consumidor. */
    const attachVideo = React.useCallback(
      (element: HTMLVideoElement | null) => {
        videoRef.current = element;
        if (typeof forwardedVideoRef === 'function') {
          forwardedVideoRef(element);
        } else if (forwardedVideoRef) {
          (forwardedVideoRef as React.MutableRefObject<HTMLVideoElement | null>).current = element;
        }
      },
      [forwardedVideoRef, videoRef]
    );

    const attachContainer = React.useCallback(
      (element: HTMLDivElement | null) => {
        containerRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      onStateChange?.(state, controls);
      /*
       * `controls` é estável entre renders; observar só o estado evita chamar o
       * consumidor a cada reconstrução do objeto de comandos.
       */
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    /*
     * Recolhimento automático dos controles. O arquivo não descreve o
     * comportamento — sem ele, porém, os dois véus de 96px cobrem o vídeo
     * permanentemente durante a reprodução, o que anula o próprio conteúdo.
     */
    React.useEffect(() => {
      if (!autoHideControls || !hasVideo || !state.playing) {
        setIdle(false);
        return undefined;
      }
      const timer = window.setTimeout(() => setIdle(true), IDLE_DELAY);
      return () => window.clearTimeout(timer);
    }, [autoHideControls, hasVideo, state.playing, state.currentTime]);

    /* Aplica as legendas na faixa de texto do elemento. */
    React.useEffect(() => {
      const video = videoRef.current;
      if (!video || !hasCaptions) return;
      Array.from(video.textTracks).forEach((track) => {
        track.mode = captionsOn ? 'showing' : 'hidden';
      });
    }, [captionsOn, hasCaptions, videoRef]);

    /*
     * Modo estático: sem fonte, a linha do tempo é governada pelas props, como
     * na versão anterior do componente. É o que preserva as réplicas do Figma.
     */
    const playedPercent = hasVideo ? state.progress * 100 : clamp(progress) * 100;
    const bufferedPercent = hasVideo
      ? state.bufferedProgress * 100
      : clamp(Math.max(buffered, progress)) * 100;

    const elapsedLabel = hasVideo ? formatPlaybackTime(state.currentTime) : currentTime;
    const durationLabel = hasVideo
      ? state.duration > 0
        ? formatPlaybackTime(state.duration)
        : '--:--'
      : duration;

    const handleToggleCaptions = () => {
      const next = !captionsOn;
      if (hasCaptions) setCaptionsOn(next);
      onToggleCaptions?.(hasCaptions ? next : false);
    };

    /* Busca por posição do ponteiro sobre a linha do tempo. */
    const seekFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!hasVideo) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (bounds.width === 0) return;
      controls.seekToProgress((event.clientX - bounds.left) / bounds.width);
    };

    const handleTimelinePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!hasVideo) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      seekFromPointer(event);
    };

    const handleTimelinePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!hasVideo || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
      seekFromPointer(event);
    };

    const handleTimelineKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasVideo) return;
      const step = event.shiftKey ? 10 : 5;
      const actions: Record<string, () => void> = {
        ArrowRight: () => controls.seekBy(step),
        ArrowLeft: () => controls.seekBy(-step),
        ArrowUp: () => controls.seekBy(step),
        ArrowDown: () => controls.seekBy(-step),
        Home: () => controls.seek(0),
        End: () => controls.seek(state.duration),
      };
      const action = actions[event.key];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    /* Atalhos do reprodutor, os mesmos que o produto de origem usa. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasVideo) return;
      const target = event.target as HTMLElement;
      /* Deixa passar o que for do teclado de um controle interno. */
      if (target !== event.currentTarget && target.closest('button, [role="slider"]')) return;

      const actions: Record<string, () => void> = {
        ' ': controls.toggle,
        k: controls.toggle,
        K: controls.toggle,
        m: controls.toggleMute,
        M: controls.toggleMute,
        f: controls.toggleFullscreen,
        F: controls.toggleFullscreen,
        ArrowRight: () => controls.seekBy(5),
        ArrowLeft: () => controls.seekBy(-5),
        j: () => controls.seekBy(-10),
        J: () => controls.seekBy(-10),
        l: () => controls.seekBy(10),
        L: () => controls.seekBy(10),
      };
      const action = actions[event.key];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    const classes = [
      'uni-video-player',
      hasVideo ? 'uni-video-player--live' : 'uni-video-player--static',
      idle ? 'uni-video-player--idle' : '',
      state.waiting ? 'uni-video-player--waiting' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={attachContainer}
        className={classes}
        tabIndex={hasVideo ? 0 : undefined}
        role={hasVideo ? 'region' : undefined}
        aria-label={hasVideo && typeof videoTitle === 'string' ? videoTitle : undefined}
        onKeyDown={handleKeyDown}
        onPointerMove={() => setIdle(false)}
        onPointerLeave={() => {
          if (autoHideControls && hasVideo && state.playing) setIdle(true);
        }}
        {...restProps}
      >
        {hasVideo ? (
          <video
            ref={attachVideo}
            className="uni-video-player__video"
            poster={poster}
            src={sources ? undefined : src}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            preload={preload}
            playsInline={playsInline}
            onClick={controls.toggle}
          >
            {sources?.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
            {captions?.map((track) => (
              <track
                key={track.src}
                kind="captions"
                src={track.src}
                label={track.label}
                srcLang={track.srcLang}
                default={track.default}
              />
            ))}
          </video>
        ) : (
          poster && <img className="uni-video-player__poster" src={poster} alt={alt} />
        )}

        <div className="uni-video-player__scrim-top" aria-hidden="true" />
        <div className="uni-video-player__scrim-bottom" aria-hidden="true" />

        {hasVideo && showBigPlay && !state.playing && (
          <button
            type="button"
            className="uni-video-player__bigplay"
            aria-label={state.ended ? 'Reproduzir novamente' : 'Reproduzir'}
            onClick={controls.play}
          >
            <PlayerGlyph name="play" height={28} />
          </button>
        )}

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
            role={hasVideo ? 'slider' : 'progressbar'}
            tabIndex={hasVideo ? 0 : undefined}
            aria-label="Progresso do vídeo"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(playedPercent)}
            aria-valuetext={`${elapsedLabel} de ${durationLabel}`}
            onPointerDown={handleTimelinePointerDown}
            onPointerMove={handleTimelinePointerMove}
            onKeyDown={handleTimelineKeyDown}
          >
            <span
              className="uni-video-player__buffered"
              style={{ width: `${bufferedPercent}%` }}
            />
            <span className="uni-video-player__played" style={{ width: `${playedPercent}%` }}>
              <span className="uni-video-player__knob" aria-hidden="true" />
            </span>
          </div>

          <div className="uni-video-player__bar">
            <div className="uni-video-player__cluster">
              <button
                type="button"
                className="uni-video-player__control"
                aria-label={state.playing ? 'Pausar' : 'Reproduzir'}
                aria-pressed={hasVideo ? state.playing : undefined}
                onClick={hasVideo ? controls.toggle : undefined}
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
                aria-label={state.muted ? 'Ativar som' : 'Silenciar'}
                aria-pressed={hasVideo ? state.muted : undefined}
                onClick={hasVideo ? controls.toggleMute : undefined}
              >
                <PlayerGlyph name="sound" height={16} />
              </button>
              {hasVideo && (
                <input
                  type="range"
                  className="uni-video-player__volume"
                  min={0}
                  max={1}
                  step={0.05}
                  value={state.muted ? 0 : state.volume}
                  aria-label="Volume"
                  onChange={(event) => controls.setVolume(Number(event.target.value))}
                />
              )}
              <span className="uni-video-player__time">
                {elapsedLabel} / {durationLabel}
              </span>
            </div>

            <div className="uni-video-player__cluster">
              <button
                type="button"
                className="uni-video-player__control"
                aria-label="Legendas"
                aria-pressed={hasCaptions ? captionsOn : undefined}
                onClick={handleToggleCaptions}
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
                aria-label={state.fullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                aria-pressed={hasVideo ? state.fullscreen : undefined}
                onClick={hasVideo ? controls.toggleFullscreen : undefined}
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
