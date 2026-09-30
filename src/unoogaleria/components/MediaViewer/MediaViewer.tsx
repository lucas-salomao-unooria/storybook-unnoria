'use client';

import React from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Filmstrip } from '../Filmstrip';
import { VideoControls, useVideoPlayback } from '../VideoControls';
import { useControllableState, useModalFocus } from '../../hooks';
import { uglFormatDayLabel, uglFormatTime } from '../../media';
import type { UglMediaItem } from '../../media';
import { editedMediaStyle, mediaDisplayRatio, mediaVignetteOpacity } from './editedMedia';
import { useViewerGestures, VIEWER_IDENTITY } from './useViewerGestures';
import type { UglViewerZoom } from './useViewerGestures';
import type { UglMediaViewerProps } from './MediaViewer.types';
import './MediaViewer.css';

/** Fator das teclas + e −. */
const KEY_ZOOM_STEP = 1.5;

/** Arredonda px para o CSS (sem notação científica de resíduos de ponto flutuante). */
const px = (value: number) => `${Math.round(value * 100) / 100}px`;

const clampIndex = (value: number, count: number) => Math.min(Math.max(0, value), Math.max(0, count - 1));

/**
 * Uma mídia no trilho. Só a aberta e as duas vizinhas montam conteúdo (as
 * vizinhas ficam pré-carregadas para o deslize); só a aberta monta o `<video>`,
 * de modo que trocar de item desmonta — e para — o vídeo anterior.
 */
const ViewerSlide: React.FC<{
  item: UglMediaItem;
  active: boolean;
  zoom: UglViewerZoom;
  dismissY: number;
  dismissProgress: number;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}> = ({ item, active, zoom, dismissY, dismissProgress, videoRef }) => {
  const [failed, setFailed] = React.useState(false);
  const vignette = mediaVignetteOpacity(item);
  const shrink = 1 - dismissProgress * 0.25;
  const showVideo = active && item.type === 'video' && Boolean(item.videoSrc);

  const frameStyle = { '--ugl-media-viewer-ratio': mediaDisplayRatio(item) } as React.CSSProperties;

  return (
    <div
      className="ugl-media-viewer__zoom"
      style={{
        transform: `translate3d(${px(zoom.x)}, ${px(zoom.y + dismissY)}, 0) scale(${Math.round(zoom.scale * shrink * 1000) / 1000})`,
      }}
    >
      <div className="ugl-media-viewer__frame" style={frameStyle}>
        {failed ? (
          <div className="ugl-media-viewer__error" role="img" aria-label={`${item.alt} — não foi possível carregar`}>
            <Icon name="brokenImage" size="xl" tone="on-media" />
            <span className="ugl-media-viewer__error-text" aria-hidden="true">
              Não foi possível carregar
            </span>
          </div>
        ) : showVideo ? (
          <video
            ref={videoRef}
            className="ugl-media-viewer__media"
            src={item.videoSrc}
            poster={item.src}
            playsInline
            preload="metadata"
            aria-label={item.alt}
            style={editedMediaStyle(item)}
          />
        ) : (
          <img
            className="ugl-media-viewer__media"
            src={item.src}
            alt={item.alt}
            decoding="async"
            draggable={false}
            style={editedMediaStyle(item)}
            onError={() => setFailed(true)}
          />
        )}
        {!failed && vignette > 0 && (
          <span className="ugl-media-viewer__vignette" style={{ opacity: vignette }} aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

type ViewerContentProps = Omit<UglMediaViewerProps, 'open'> & {
  forwardedRef: React.ForwardedRef<HTMLDivElement>;
};

const ViewerContent: React.FC<ViewerContentProps> = ({
  items,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  onClose,
  now,
  timeZone,
  onShare,
  onFavorite,
  onInfo,
  onEdit,
  onDelete,
  onMore,
  infoOpen = false,
  chromeHidden: chromeHiddenProp,
  defaultChromeHidden = false,
  onChromeHiddenChange,
  showFilmstrip = true,
  ariaLabel = 'Visualizador de fotos',
  children,
  theme,
  className = '',
  forwardedRef,
  ...restProps
}) => {
  const [rawIndex, setIndex] = useControllableState({
    value: indexProp,
    defaultValue: defaultIndex,
    onChange: onIndexChange,
  });
  const [hidden, setHidden] = useControllableState({
    value: chromeHiddenProp,
    defaultValue: defaultChromeHidden,
    onChange: onChromeHiddenChange,
  });

  const count = items.length;
  const index = clampIndex(rawIndex, count);
  const item = items[index];
  const isVideo = item.type === 'video' && Boolean(item.videoSrc);

  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  /* O foco inicial é o próprio diálogo: setas e Espaço já funcionam ao abrir. */
  useModalFocus(panelRef, true, onClose, panelRef);

  const playback = useVideoPlayback(videoRef, isVideo ? item.id : null);

  const navigate = React.useCallback(
    (next: number) => {
      if (next < 0 || next >= count || next === index) return;
      setIndex(next);
    },
    [count, index, setIndex]
  );

  const { state: gesture, handlers, zoomBy, resetZoom } = useViewerGestures({
    stageRef,
    index,
    count,
    ratio: mediaDisplayRatio(item),
    onNavigate: navigate,
    onTap: () => setHidden((current) => !current),
    onDismiss: onClose,
    onSwipeUp: onInfo ? () => onInfo(item) : undefined,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    /* Teclas de camadas do produto (folhas, menus) e de campos não são nossas. */
    const layer = target.closest('[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]');
    if (layer && layer !== panelRef.current) return;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return;

    switch (event.key) {
      case 'ArrowRight':
        navigate(index + 1);
        break;
      case 'ArrowLeft':
        navigate(index - 1);
        break;
      case 'Home':
        navigate(0);
        break;
      case 'End':
        navigate(count - 1);
        break;
      case '+':
      case '=':
        zoomBy(KEY_ZOOM_STEP);
        break;
      case '-':
      case '_':
        zoomBy(1 / KEY_ZOOM_STEP);
        break;
      case '0':
        resetZoom();
        break;
      case ' ':
        /* Espaço num botão é o próprio botão; no diálogo, toca ou pausa o vídeo. */
        if (!isVideo || target.closest('button, a, [role="option"]')) return;
        playback.togglePlay();
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  /* Cromo escondido continua acessível: o foco por teclado o traz de volta. */
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!hidden) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.ugl-media-viewer__chrome')) return;
    let byKeyboard = false;
    try {
      byKeyboard = target.matches(':focus-visible');
    } catch {
      byKeyboard = true;
    }
    if (byKeyboard) setHidden(false);
  };

  const dismissing = gesture.dismissY > 0;
  const subtitle = [uglFormatTime(item.takenAt, timeZone), item.location].filter(Boolean).join(' · ');
  const hasActions = Boolean(onShare || onFavorite || onInfo || (onEdit && item.type === 'photo') || onDelete);

  const trackStyle: React.CSSProperties = {
    transform: `translate3d(calc(${-index} * (100% + var(--ugl-media-viewer-gap)) + ${px(gesture.offsetX)}), 0, 0)`,
  };

  return (
    <div
      ref={forwardedRef}
      data-ugl-immersive=""
      data-ugl-theme={theme}
      className={['ugl-media-viewer', gesture.gesturing ? 'ugl-media-viewer--gesturing' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      <div
        className="ugl-media-viewer__backdrop"
        style={{ opacity: 1 - gesture.dismissProgress * 0.9 }}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="ugl-media-viewer__panel"
        data-ugl-chrome={hidden || dismissing ? 'hidden' : 'visible'}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      >
        <span className="ugl-media-viewer__sr-only" aria-live="polite" aria-atomic="true">
          {`${index + 1} de ${count}`}
        </span>

        <div
          ref={stageRef}
          className="ugl-media-viewer__stage"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Mídias"
          {...handlers}
        >
          <div className="ugl-media-viewer__track" style={trackStyle}>
            {items.map((entry, position) => {
              const active = position === index;
              return (
                <div
                  key={entry.id}
                  className="ugl-media-viewer__slide"
                  style={{ left: `calc(${position} * (100% + var(--ugl-media-viewer-gap)))` }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${position + 1} de ${count}`}
                  aria-hidden={active ? undefined : true}
                >
                  {Math.abs(position - index) <= 1 && (
                    <ViewerSlide
                      item={entry}
                      active={active}
                      zoom={active ? gesture.zoom : VIEWER_IDENTITY}
                      dismissY={active ? gesture.dismissY : 0}
                      dismissProgress={active ? gesture.dismissProgress : 0}
                      videoRef={active ? videoRef : undefined}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {isVideo && !playback.playing && !dismissing && (
          <IconButton
            className="ugl-media-viewer__play"
            icon="play"
            label="Reproduzir vídeo"
            variant="immersive"
            size="lg"
            filled
            onClick={playback.togglePlay}
          />
        )}

        {index > 0 && (
          <IconButton
            className="ugl-media-viewer__chrome ugl-media-viewer__nav ugl-media-viewer__nav--prev"
            icon="back"
            label="Anterior"
            variant="immersive"
            onClick={() => navigate(index - 1)}
          />
        )}
        {index < count - 1 && (
          <IconButton
            className="ugl-media-viewer__chrome ugl-media-viewer__nav ugl-media-viewer__nav--next"
            icon="chevronRight"
            label="Próxima"
            variant="immersive"
            onClick={() => navigate(index + 1)}
          />
        )}

        <div className="ugl-media-viewer__chrome ugl-media-viewer__bar ugl-media-viewer__bar--top">
          <IconButton icon="back" label="Fechar visualizador" variant="bar" onClick={onClose} />
          <div className="ugl-media-viewer__heading">
            <p className="ugl-media-viewer__title">{uglFormatDayLabel(item.takenAt, { now, timeZone })}</p>
            {subtitle && <p className="ugl-media-viewer__subtitle">{subtitle}</p>}
          </div>
          {onMore ? (
            <IconButton
              icon="more"
              label="Mais opções"
              variant="bar"
              aria-haspopup="menu"
              onClick={(event) => onMore(item, event.currentTarget)}
            />
          ) : (
            <span className="ugl-media-viewer__spacer" aria-hidden="true" />
          )}
        </div>

        <div className="ugl-media-viewer__chrome ugl-media-viewer__bar ugl-media-viewer__bar--bottom">
          {isVideo && (
            <VideoControls
              className="ugl-media-viewer__video-controls"
              playing={playback.playing}
              currentTime={playback.currentTime}
              duration={playback.duration || item.duration || 0}
              muted={playback.muted}
              buffered={playback.duration ? playback.buffered : undefined}
              onTogglePlay={playback.togglePlay}
              onSeek={playback.seek}
              onToggleMute={playback.toggleMute}
            />
          )}

          {showFilmstrip && count > 1 && (
            <Filmstrip items={items} activeIndex={index} onSelect={navigate} timeZone={timeZone} />
          )}

          {hasActions && (
            <div className="ugl-media-viewer__actions" role="group" aria-label="Ações da mídia">
              {onShare && (
                <IconButton icon="share" label="Compartilhar" variant="bar" onClick={() => onShare(item)} />
              )}
              {onFavorite && (
                <IconButton
                  icon="favorite"
                  label="Favoritar"
                  variant="bar"
                  pressed={Boolean(item.favorite)}
                  pressedTone="favorite"
                  onClick={() => onFavorite(item, !item.favorite)}
                />
              )}
              {onInfo && (
                <IconButton
                  icon="info"
                  label="Informações"
                  variant="bar"
                  pressed={infoOpen}
                  pressedTone="accent"
                  onClick={() => onInfo(item)}
                />
              )}
              {onEdit && item.type === 'photo' && (
                <IconButton icon="edit" label="Editar" variant="bar" onClick={() => onEdit(item)} />
              )}
              {onDelete && (
                <IconButton
                  className="ugl-media-viewer__danger"
                  icon="delete"
                  label="Excluir"
                  variant="bar"
                  onClick={() => onDelete(item)}
                />
              )}
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

/**
 * Componente MediaViewer — Design System Unoogaleria
 *
 * Visualizador de fotos e vídeos em tela cheia, imersivo: fundo escuro nos dois
 * temas, barras translúcidas que respeitam as áreas seguras e somem com um
 * toque, e a mídia com a edição não destrutiva aplicada. A raiz declara
 * `data-ugl-immersive`, então a barra de status do `PhoneFrame` clareia sozinha.
 *
 * Gestos por Pointer Events (ver `useViewerGestures`): deslizar entre as mídias
 * acompanhando o dedo, com mola de volta; duplo toque amplia no ponto; pinça de
 * 1× a 4×; arrastar move a mídia ampliada, limitada às bordas; arrastar para
 * baixo em 1× fecha, esmaecendo o fundo; deslizar para cima pede informações.
 * Teclado: ← e → navegam, Home e End vão às pontas, + e − (ou Ctrl/⌘ + roda)
 * ampliam, 0 volta a 1×, Espaço toca ou pausa o vídeo e Esc fecha.
 *
 * Vídeo é um `<video>` real, lido pelo `useVideoPlayback` e comandado pelo
 * `VideoControls` e pelo botão central, que aparece enquanto está pausado.
 *
 * É uma sobreposição da TELA, e não da janela: `position: absolute; inset: 0`
 * no contêiner posicionado mais próximo, na camada `--ugl-z-viewer`.
 */
export const MediaViewer = React.forwardRef<HTMLDivElement, UglMediaViewerProps>(
  ({ open = true, ...props }, ref) => {
    if (!open || props.items.length === 0) {
      return null;
    }

    return <ViewerContent {...props} forwardedRef={ref} />;
  }
);

MediaViewer.displayName = 'MediaViewer';
