'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UnvStoryViewerProps } from './StoryViewer.types';
import './StoryViewer.css';

/**
 * Componente StoryViewer — Design System Unoovista
 *
 * Visualizador de história em tela cheia: a mídia em um palco de cantos
 * arredondados, barras de progresso em cápsula, cabeçalho (avatar, nome, tempo
 * e fechar) em texto sobre mídia e uma doca de resposta em cápsula sob o palco.
 * Um véu de leitura, feito só de tokens, garante o contraste do texto sobre
 * qualquer fotografia.
 *
 * Para a navegação real: as zonas de toque de voltar (um terço à esquerda) e
 * avançar (o resto), que são botões alcançáveis por teclado; uma camada
 * `children` sobre a mídia; e `footer`, que troca o campo de resposta.
 */
export const StoryViewer = React.forwardRef<HTMLElement, UnvStoryViewerProps>(
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
      nextLabel = 'Próxima história',
      prevLabel = 'História anterior',
      children,
      footer,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['unv-story-viewer', className].filter(Boolean).join(' ');
    const clampedProgress = Math.min(Math.max(segmentProgress, 0), 1);

    return (
      <section
        ref={ref}
        aria-label={`História de ${username}`}
        data-unv-theme={theme}
        className={classes}
        {...restProps}
      >
        <div className="unv-story-viewer__stage">
          <img className="unv-story-viewer__media" src={mediaSrc} alt={mediaAlt} />
          <div className="unv-story-viewer__scrim" aria-hidden="true" />

          <div
            className="unv-story-viewer__progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={segments}
            aria-valuenow={currentSegment}
            aria-label="Progresso da história"
          >
            {Array.from({ length: segments }, (_, index) => {
              const position = index + 1;
              const fill =
                position < currentSegment ? 1 : position === currentSegment ? clampedProgress : 0;

              return (
                <span key={index} className="unv-story-viewer__segment">
                  <span
                    className="unv-story-viewer__segment-fill"
                    style={{ width: `${fill * 100}%` }}
                  />
                </span>
              );
            })}
          </div>

          <div className="unv-story-viewer__header">
            <Avatar src={avatarSrc} alt="" size="md" theme={theme} />
            <span className="unv-story-viewer__identity">
              <span className="unv-story-viewer__username">{username}</span>
              {timestamp && <span className="unv-story-viewer__timestamp">{timestamp}</span>}
            </span>

            {onClose && (
              <button
                type="button"
                className="unv-story-viewer__icon-button"
                onClick={onClose}
                aria-label="Fechar história"
              >
                <Icon name="close" size="md" tone="inherit" theme={theme} />
              </button>
            )}
          </div>

          {onPrev && (
            <button
              type="button"
              className="unv-story-viewer__tap unv-story-viewer__tap--prev"
              onClick={onPrev}
              aria-label={prevLabel}
            />
          )}
          {onNext && (
            <button
              type="button"
              className="unv-story-viewer__tap unv-story-viewer__tap--next"
              onClick={onNext}
              aria-label={nextLabel}
            />
          )}

          {children && <div className="unv-story-viewer__overlay">{children}</div>}
        </div>

        <div className="unv-story-viewer__composer">
          {footer ? (
            <div className="unv-story-viewer__footer">{footer}</div>
          ) : (
            <button
              type="button"
              className="unv-story-viewer__composer-field"
              onClick={onComposerClick}
            >
              <Icon name="cameraCircle" size="md" tone="inherit" theme={theme} />
              {composerPlaceholder}
            </button>
          )}

          {(!footer || onShare || onMore) && (
            <div className="unv-story-viewer__composer-actions">
              {onShare && (
                <button
                  type="button"
                  className="unv-story-viewer__composer-action"
                  onClick={onShare}
                  aria-label="Compartilhar história"
                >
                  <Icon name="share" size="md" tone="inherit" theme={theme} />
                </button>
              )}
              {onMore && (
                <button
                  type="button"
                  className="unv-story-viewer__composer-action"
                  onClick={onMore}
                  aria-label="Opções da história"
                >
                  <Icon name="more" size="md" tone="inherit" theme={theme} />
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
