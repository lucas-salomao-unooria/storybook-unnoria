'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UglIconName } from '../Icon';
import {
  uglEditToFilter,
  uglEditToTransform,
  uglEditedRatio,
  uglFormatDuration,
  uglMediaLabel,
  uglSubtypeLabels,
  uglVignetteOpacity,
} from '../../media';
import type { UglMediaSubtype } from '../../media';
import type { UglMediaThumbnailProps } from './MediaThumbnail.types';
import './MediaThumbnail.css';

/** Tempo com o ponteiro parado que caracteriza a pressão longa. */
const LONG_PRESS_MS = 500;

/** Deslocamento do ponteiro, em px, que cancela a pressão longa. */
const MOVE_TOLERANCE = 10;

/** Janela em que um `contextmenu` repete a pressão longa já disparada. */
const CONTEXT_MENU_GUARD_MS = 400;

/** Glifo de cada subtipo. `live` usa `livePhoto`: o registro não tem `live`. */
const SUBTYPE_ICONS: Record<UglMediaSubtype, UglIconName> = {
  selfie: 'selfie',
  screenshot: 'screenshot',
  panorama: 'panorama',
  live: 'livePhoto',
  burst: 'burst',
  hdr: 'hdr',
};

/** Prazo curto da lixeira: a partir daqui a cápsula ganha o glifo de relógio. */
const SHORT_DEADLINE_DAYS = 3;

const daysText = (days: number) => `${days} ${days === 1 ? 'dia' : 'dias'}`;

const MediaThumbnailBase = React.forwardRef<HTMLElement, UglMediaThumbnailProps>(
  (
    {
      item,
      aspect = 'square',
      selectable = false,
      selected = false,
      onClick,
      onLongPress,
      showFavorite = true,
      showDuration = true,
      showSubtype = false,
      daysLeft,
      dimmed = false,
      now,
      timeZone,
      theme,
      className = '',
      style,
      type = 'button',
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
      onLostPointerCapture,
      onContextMenu,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
    const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
    const pressRef = React.useRef<{ timer: number; x: number; y: number } | null>(null);
    const firedAtRef = React.useRef<number | null>(null);

    const status = failedSrc === item.src ? 'error' : loadedSrc === item.src ? 'loaded' : 'loading';
    const interactive = Boolean(onClick || onLongPress || selectable);
    const isSelected = selectable && selected;

    const cancelPress = React.useCallback(() => {
      if (pressRef.current) {
        window.clearTimeout(pressRef.current.timer);
        pressRef.current = null;
      }
    }, []);

    React.useEffect(() => cancelPress, [cancelPress]);

    /* Imagem já em cache (ou carregada antes da hidratação) não dispara `load` de novo. */
    const imageRef = React.useCallback(
      (node: HTMLImageElement | null) => {
        if (node?.complete) {
          if (node.naturalWidth > 0) setLoadedSrc(item.src);
          else if (node.currentSrc) setFailedSrc(item.src);
        }
      },
      [item.src]
    );

    const fireLongPress = () => {
      firedAtRef.current = Date.now();
      onLongPress?.(item);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event);
      firedAtRef.current = null;
      if (!onLongPress || event.defaultPrevented) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      cancelPress();
      const timer = window.setTimeout(() => {
        pressRef.current = null;
        fireLongPress();
      }, LONG_PRESS_MS);
      pressRef.current = { timer, x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
      onPointerMove?.(event);
      const press = pressRef.current;
      if (press && Math.hypot(event.clientX - press.x, event.clientY - press.y) > MOVE_TOLERANCE) {
        cancelPress();
      }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (firedAtRef.current !== null) {
        /* O clique que encerra a pressão longa não abre nem alterna. */
        firedAtRef.current = null;
        event.preventDefault();
        return;
      }
      onClick?.(item, event);
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      onContextMenu?.(event);
      if (!onLongPress || event.defaultPrevented) return;
      event.preventDefault();
      cancelPress();
      const firedAt = firedAtRef.current;
      if (firedAt !== null && Date.now() - firedAt < CONTEXT_MENU_GUARD_MS) return;
      fireLongPress();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      firedAtRef.current = null;
      if (!onLongPress || event.defaultPrevented) return;
      if (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey)) {
        event.preventDefault();
        fireLongPress();
      }
    };

    const endPress =
      <E extends React.PointerEvent<HTMLButtonElement>>(handler?: (event: E) => void) =>
      (event: E) => {
        handler?.(event);
        cancelPress();
      };

    /* Edição não destrutiva: filtro, rotação, espelho, endireitamento e vinheta. */
    const edit = item.edit;
    const ratio = aspect === 'original' ? uglEditedRatio(item, edit) : 1;
    const turned = aspect === 'original' && Boolean(edit) && edit!.rotation % 180 !== 0;
    const filter = uglEditToFilter(edit);
    const transform = uglEditToTransform(edit, ratio);
    const vignette = uglVignetteOpacity(edit);

    const imageStyle: React.CSSProperties = {
      ...(filter !== 'none' ? { filter } : {}),
      ...(transform !== 'none' ? { transform: `translate(-50%, -50%) ${transform}` } : {}),
      /* Girada 90°, a caixa da imagem troca largura por altura antes de girar. */
      ...(turned ? { width: `${100 / ratio}%`, height: `${ratio * 100}%` } : {}),
    };

    const subtypes = showSubtype ? (item.subtypes ?? []) : [];
    const hasDaysLeft = daysLeft !== undefined;
    const showHeart = showFavorite && Boolean(item.favorite) && !hasDaysLeft;
    const isVideo = item.type === 'video';
    const showVideoBadge = showDuration && isVideo;

    const label = [
      uglMediaLabel(item, { now, timeZone }),
      subtypes.map((subtype) => uglSubtypeLabels[subtype]).join(', '),
      hasDaysLeft ? `${daysLeft} ${daysLeft === 1 ? 'dia restante' : 'dias restantes'}` : '',
    ]
      .filter(Boolean)
      .join(', ');

    const classes = [
      'ugl-media-thumbnail',
      `ugl-media-thumbnail--${aspect}`,
      interactive ? 'ugl-media-thumbnail--interactive' : '',
      selectable ? 'ugl-media-thumbnail--selectable' : '',
      isSelected ? 'ugl-media-thumbnail--selected' : '',
      dimmed ? 'ugl-media-thumbnail--dimmed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const rootStyle: React.CSSProperties = {
      ...(aspect === 'original' ? { aspectRatio: String(ratio) } : {}),
      ...style,
    };

    const content = (
      <>
        <span className="ugl-media-thumbnail__frame">
          <span className="ugl-media-thumbnail__media" data-state={status}>
            {status !== 'error' && (
              <img
                ref={imageRef}
                className="ugl-media-thumbnail__image"
                src={item.src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                style={imageStyle}
                onLoad={() => setLoadedSrc(item.src)}
                onError={() => setFailedSrc(item.src)}
              />
            )}
            {status === 'error' && (
              <Icon name="brokenImage" size="md" tone="secondary" className="ugl-media-thumbnail__broken" />
            )}
            {vignette > 0 && status !== 'error' && (
              <span className="ugl-media-thumbnail__vignette" style={{ opacity: vignette }} />
            )}
          </span>

          {(showHeart || showVideoBadge || hasDaysLeft) && <span className="ugl-media-thumbnail__shade" />}
          {isSelected && <span className="ugl-media-thumbnail__veil" />}

          {subtypes.length > 0 && (
            <span className="ugl-media-thumbnail__subtypes">
              {subtypes.map((subtype) => (
                <span key={subtype} className="ugl-media-thumbnail__subtype" title={uglSubtypeLabels[subtype]}>
                  <Icon name={SUBTYPE_ICONS[subtype]} size="xs" tone="on-media" />
                </span>
              ))}
            </span>
          )}

          {showHeart && (
            <Icon name="favoriteFilled" size="xs" tone="on-media" className="ugl-media-thumbnail__favorite" />
          )}

          {hasDaysLeft && (
            <span className="ugl-media-thumbnail__pill ugl-media-thumbnail__days">
              {daysLeft! <= SHORT_DEADLINE_DAYS && <Icon name="timer" size="xs" tone="on-media" />}
              {daysText(daysLeft!)}
            </span>
          )}

          {showVideoBadge && (
            <span className="ugl-media-thumbnail__pill ugl-media-thumbnail__duration">
              {item.duration !== undefined ? (
                uglFormatDuration(item.duration)
              ) : (
                <Icon name="video" size="xs" tone="on-media" />
              )}
            </span>
          )}
        </span>

        {selectable && (
          <span className="ugl-media-thumbnail__check">
            {isSelected && <Icon name="check" size="xs" tone="inherit" />}
          </span>
        )}
      </>
    );

    if (!interactive) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="img"
          aria-label={label}
          data-ugl-theme={theme}
          className={classes}
          style={rootStyle}
          {...(restProps as React.HTMLAttributes<HTMLDivElement>)}
        >
          {content}
        </div>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        data-ugl-theme={theme}
        className={classes}
        style={rootStyle}
        aria-label={label}
        aria-pressed={selectable ? isSelected : undefined}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPress(onPointerUp)}
        onPointerCancel={endPress(onPointerCancel)}
        onPointerLeave={endPress(onPointerLeave)}
        onLostPointerCapture={endPress(onLostPointerCapture)}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {content}
      </button>
    );
  }
);

MediaThumbnailBase.displayName = 'MediaThumbnail';

/**
 * Componente MediaThumbnail — Design System Unoogaleria
 *
 * Miniatura de uma foto ou de um vídeo. Aplica a edição não destrutiva da mídia
 * (filtro, rotação, espelho, endireitamento e vinheta), mostra os selos sobre a
 * mídia — favorito, duração, subtipos e o prazo da lixeira — e, no modo de
 * seleção, o círculo de seleção com o véu claro e a leve redução de escala.
 *
 * É um botão com o nome acessível completo da mídia (`uglMediaLabel`), e um
 * botão de alternância (`aria-pressed`) no modo de seleção. Reconhece a
 * pressão longa por ponteiro e pela tecla de menu de contexto.
 *
 * Memoizado (`React.memo`): na grade, só as miniaturas cujas props mudaram
 * voltam a renderizar quando a seleção ou o foco andam.
 */
export const MediaThumbnail = React.memo(MediaThumbnailBase);

MediaThumbnail.displayName = 'MediaThumbnail';
