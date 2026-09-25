'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { InstaStoryViewerProps } from './StoryViewer.types';
import './StoryViewer.css';

/**
 * Componente StoryViewer — Design System Instanooria
 *
 * Visualizador de story em tela cheia. Reproduz o frame "Instagram Story" do
 * Figma: mídia de 375×667px com raio de 8px, os dois gradientes de leitura
 * (topo e base), a barra de progresso segmentada de 2px e o composer de 43px
 * com contorno translúcido e atalho de câmera.
 *
 * Extensões para a navegação real: as zonas de toque de voltar (um terço à
 * esquerda) e avançar (o resto), que são botões alcançáveis por teclado; uma
 * camada `children` sobre a mídia; e `footer`, que troca o campo de resposta.
 */
export const StoryViewer = React.forwardRef<HTMLElement, InstaStoryViewerProps>(
  (
    {
      mediaSrc,
      mediaAlt,
      username,
      avatarSrc,
      timestamp,
      segments = 1,
      currentSegment = 1,
      segmentProgress = 0.5,
      composerPlaceholder = 'Enviar mensagem',
      onClose,
      onShare,
      onMore,
      onComposerClick,
      onNext,
      onPrev,
      nextLabel = 'Próximo story',
      prevLabel = 'Story anterior',
      children,
      footer,
      theme = 'dark',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['insta-story-viewer', className].filter(Boolean).join(' ');
    const clampedProgress = Math.min(Math.max(segmentProgress, 0), 1);

    return (
      <section
        ref={ref}
        aria-label={`Story de ${username}`}
        data-insta-theme={theme}
        className={classes}
        {...restProps}
      >
        <div className="insta-story-viewer__stage">
          <img className="insta-story-viewer__media" src={mediaSrc} alt={mediaAlt} />
          <div className="insta-story-viewer__scrim" aria-hidden="true" />

          <div
            className="insta-story-viewer__progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={segments}
            aria-valuenow={currentSegment}
            aria-label="Progresso do story"
          >
            {Array.from({ length: segments }, (_, index) => {
              const position = index + 1;
              const fill =
                position < currentSegment ? 1 : position === currentSegment ? clampedProgress : 0;

              return (
                <span key={index} className="insta-story-viewer__segment">
                  <span
                    className="insta-story-viewer__segment-fill"
                    style={{ width: `${fill * 100}%` }}
                  />
                </span>
              );
            })}
          </div>

          <div className="insta-story-viewer__header">
            <Avatar src={avatarSrc} alt="" size={32} theme={theme} />
            <span className="insta-story-viewer__identity">
              <span className="insta-story-viewer__username">{username}</span>
              {timestamp && <span className="insta-story-viewer__timestamp">{timestamp}</span>}
            </span>

            {onClose && (
              <button
                type="button"
                className="insta-story-viewer__icon-button"
                onClick={onClose}
                aria-label="Fechar story"
              >
                <Icon name="close" size={18} tone="inherit" theme={theme} />
              </button>
            )}
          </div>

          {onPrev && (
            <button
              type="button"
              className="insta-story-viewer__tap insta-story-viewer__tap--prev"
              onClick={onPrev}
              aria-label={prevLabel}
            />
          )}
          {onNext && (
            <button
              type="button"
              className="insta-story-viewer__tap insta-story-viewer__tap--next"
              onClick={onNext}
              aria-label={nextLabel}
            />
          )}

          {children && <div className="insta-story-viewer__overlay">{children}</div>}
        </div>

        <div className="insta-story-viewer__composer">
          {footer ? (
            <div className="insta-story-viewer__footer">{footer}</div>
          ) : (
            <button
              type="button"
              className="insta-story-viewer__composer-field"
              onClick={onComposerClick}
            >
              <Icon name="cameraCircle" size={34} tone="inherit" theme={theme} />
              {composerPlaceholder}
            </button>
          )}

          {(!footer || onShare || onMore) && (
            <div className="insta-story-viewer__composer-actions">
              {onShare && (
                <button
                  type="button"
                  className="insta-story-viewer__composer-action"
                  onClick={onShare}
                  aria-label="Compartilhar story"
                >
                  <Icon name="share" size={24} tone="inherit" theme={theme} />
                </button>
              )}
              {onMore && (
                <button
                  type="button"
                  className="insta-story-viewer__composer-action"
                  onClick={onMore}
                  aria-label="Opções do story"
                >
                  <Icon name="more" size={14} tone="inherit" theme={theme} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }
);

StoryViewer.displayName = 'StoryViewer';
