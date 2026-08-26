'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { ShortsActionRail } from '../ShortsActionRail';
import { useVideoPlayback } from '../VideoPlayer';
import { SoundGlyph } from './SoundGlyph';
import type { UniShortsPlayerProps } from './ShortsPlayer.types';
import './ShortsPlayer.css';

/**
 * Componente ShortsPlayer — Design System Unootube
 *
 * Reproduz o reprodutor vertical do arquivo "Free YouTube Shorts Mockups
 * (Community)" nas duas apresentações que ele publica: a imersiva da tela
 * móvel (`3:196`), em que a trilha de ações fica sobre o vídeo, e a de cartão
 * da área de trabalho (`3:450`), em que o quadro de 488px tem a trilha ao lado.
 *
 * O arquivo é estático: um bitmap com um véu e ícones por cima. Com `src` ou
 * `sources`, o componente monta um `<video>` real e o formato passa a
 * funcionar como formato — toque no quadro alterna reprodução, o vídeo repete
 * em laço por padrão e a linha do tempo acompanha o avanço. Sem fonte,
 * permanece a réplica estática usada na documentação.
 *
 * O áudio começa silenciado porque é a única forma de o autoplay ser aceito
 * pelos navegadores; o botão de som na base da trilha é o alvo para reativá-lo.
 */
export const ShortsPlayer = React.forwardRef<HTMLElement, UniShortsPlayerProps>(
  (
    {
      src,
      sources,
      poster,
      alt = '',
      captions,
      variant = 'immersive',
      caption,
      channelName,
      avatarSrc,
      avatarInitials,
      subscribed = false,
      subscribeLabel = 'SUBSCRIBE',
      subscribedLabel = 'SUBSCRIBED',
      onSubscribe,
      showChannel = true,
      likeCount,
      liked = false,
      onLike,
      dislikeLabel = 'Dislike',
      disliked = false,
      onDislike,
      commentCount,
      onComment,
      shareLabel = 'Share',
      onShare,
      onMore,
      soundSrc,
      onSound,
      showRail = true,
      actions,
      autoPlay = false,
      loop = true,
      muted = true,
      preload = 'metadata',
      tapToToggle = true,
      showBigPlay = true,
      showProgress = true,
      showPeek = false,
      videoRef: forwardedVideoRef,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      onStateChange,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const hasVideo = Boolean(src) || Boolean(sources && sources.length > 0);
    const frameRef = React.useRef<HTMLDivElement | null>(null);

    const { videoRef, state, controls } = useVideoPlayback({
      containerRef: frameRef,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
    });

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

    React.useEffect(() => {
      onStateChange?.(state, controls);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const railVariant = variant === 'card' ? 'standalone' : 'overlay';
    const glyphSize = variant === 'card' ? 24 : 36;

    /*
     * A trilha padrão reproduz as cinco ações do arquivo, na ordem em que ele
     * as empilha: reticências no topo, curtir, não curtir, comentar,
     * compartilhar e o botão de som na base. `actions` substitui o conjunto
     * inteiro quando o produto tem outro.
     */
    const defaultRail = (
      <ShortsActionRail
        variant={railVariant}
        header={
          onMore && (
            <button type="button" className="uni-shorts-player__more" aria-label="Mais ações" onClick={onMore}>
              <Icon name="more" size={variant === 'card' ? 20 : 24} />
            </button>
          )
        }
        footer={
          <button
            type="button"
            className="uni-shorts-player__sound"
            aria-label={soundSrc ? 'Áudio do vídeo' : 'Som original'}
            onClick={onSound}
          >
            {soundSrc ? (
              <img className="uni-shorts-player__sound-cover" src={soundSrc} alt="" />
            ) : (
              <SoundGlyph size={variant === 'card' ? 40 : 36} />
            )}
          </button>
        }
      >
        <ShortsActionRail.Item
          icon={<Icon name="likedFill" size={glyphSize} />}
          label={likeCount}
          active={liked}
          aria-label="Curtir"
          onClick={onLike}
        />
        <ShortsActionRail.Item
          icon={<Icon name="likedFill" size={glyphSize} rotate={180} />}
          label={dislikeLabel}
          active={disliked}
          aria-label="Não curtir"
          onClick={onDislike}
        />
        <ShortsActionRail.Item
          icon={<Icon name="shortsComment" size={glyphSize * 0.83} />}
          label={commentCount}
          aria-label="Comentários"
          onClick={onComment}
        />
        <ShortsActionRail.Item
          icon={<Icon name="shortsShare" size={glyphSize * 0.78} />}
          label={shareLabel}
          aria-label="Compartilhar"
          onClick={onShare}
        />
      </ShortsActionRail>
    );

    const frame = (
      <div
        ref={frameRef}
        className="uni-shorts-player__frame"
        tabIndex={hasVideo ? 0 : undefined}
        role={hasVideo ? 'region' : undefined}
        aria-label={hasVideo ? 'Reprodutor de Shorts' : undefined}
        onKeyDown={(event) => {
          if (!hasVideo) return;
          const target = event.target as HTMLElement;
          if (target !== event.currentTarget && target.closest('button, a')) return;
          if (event.key === ' ' || event.key === 'k' || event.key === 'K') {
            event.preventDefault();
            controls.toggle();
          }
          if (event.key === 'm' || event.key === 'M') {
            event.preventDefault();
            controls.toggleMute();
          }
        }}
      >
        {hasVideo ? (
          <video
            ref={attachVideo}
            className="uni-shorts-player__media"
            poster={poster}
            src={sources ? undefined : src}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            preload={preload}
            playsInline
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
          poster && <img className="uni-shorts-player__media" src={poster} alt={alt} />
        )}

        <span className="uni-shorts-player__scrim" aria-hidden="true" />

        {/*
         * O quadro inteiro é o alvo de reproduzir e pausar, como no formato de
         * origem. É um `<button>` de verdade sob o conteúdo, e não um
         * manipulador no contêiner, para continuar alcançável por teclado.
         */}
        {hasVideo && tapToToggle && (
          <button
            type="button"
            className="uni-shorts-player__surface"
            aria-label={state.playing ? 'Pausar' : 'Reproduzir'}
            onClick={controls.toggle}
          />
        )}

        {hasVideo && showBigPlay && !state.playing && (
          <span className="uni-shorts-player__bigplay" aria-hidden="true">
            <Icon name="play" size={40} />
          </span>
        )}

        <div className="uni-shorts-player__body">
          {(caption != null || (showChannel && channelName != null)) && (
            <div className="uni-shorts-player__meta">
              {caption != null && <p className="uni-shorts-player__caption">{caption}</p>}

              {showChannel && channelName != null && (
                <div className="uni-shorts-player__channel">
                  <Avatar
                    src={avatarSrc}
                    initials={avatarInitials}
                    size={variant === 'card' ? 38 : 32}
                    alt=""
                  />
                  <span className="uni-shorts-player__channel-name">{channelName}</span>
                  <button
                    type="button"
                    className={[
                      'uni-shorts-player__subscribe',
                      subscribed ? 'uni-shorts-player__subscribe--subscribed' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={subscribed}
                    onClick={onSubscribe}
                  >
                    {subscribed ? subscribedLabel : subscribeLabel}
                  </button>
                </div>
              )}
            </div>
          )}

          {variant === 'immersive' && showRail && (actions ?? defaultRail)}
        </div>

        {showProgress && (
          <div
            className="uni-shorts-player__timeline"
            role="progressbar"
            aria-label="Progresso do vídeo"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(state.progress * 100)}
          >
            <span
              className="uni-shorts-player__progress"
              style={{ width: `${state.progress * 100}%` }}
            />
          </div>
        )}
      </div>
    );

    return (
      <section
        ref={ref}
        className={[
          'uni-shorts-player',
          `uni-shorts-player--${variant}`,
          hasVideo ? 'uni-shorts-player--live' : 'uni-shorts-player--static',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
      >
        <div className="uni-shorts-player__stage">
          {frame}
          {showPeek && variant === 'card' && (
            <span className="uni-shorts-player__peek" aria-hidden="true" />
          )}
        </div>

        {variant === 'card' && showRail && (actions ?? defaultRail)}
      </section>
    );
  }
);

ShortsPlayer.displayName = 'ShortsPlayer';
