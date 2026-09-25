'use client';

import React from 'react';
import { useModalFocus } from '../BottomSheet/useModalFocus';
import { Icon } from '../Icon';
import type { WaMediaViewerProps } from './MediaViewer.types';
import './MediaViewer.css';

/**
 * Componente MediaViewer — Design System WhatsApp Mobile
 *
 * Visualizador de mídia em tela cheia: barra superior com a seta de voltar,
 * a mídia ampliada no centro e, abaixo dela, o texto de apoio. Prende o foco e
 * fecha no ESC. A seta é o glifo `back` literal do arquivo — o arquivo não
 * publica um "fechar", e desenhar um seria inventar glifo.
 */
export const MediaViewer = React.forwardRef<HTMLDivElement, WaMediaViewerProps>(
  (
    {
      open = true,
      title,
      subtitle,
      children,
      caption,
      onClose,
      backLabel = 'Voltar',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const titleId = React.useId();

    useModalFocus(panelRef, open, onClose);

    if (!open) {
      return null;
    }

    return (
      <div ref={ref} className="wa-mediaviewer-layer">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          aria-labelledby={titleId}
          className={['wa-mediaviewer', className].filter(Boolean).join(' ')}
          {...restProps}
        >
          <div className="wa-mediaviewer__bar">
            <button
              type="button"
              className="wa-mediaviewer__back"
              aria-label={backLabel}
              onClick={onClose}
            >
              <Icon name="back" size={16} tone="inherit" aria-hidden="true" />
            </button>
            <span className="wa-mediaviewer__titles">
              <span id={titleId} className="wa-mediaviewer__title">
                {title}
              </span>
              {subtitle && <span className="wa-mediaviewer__subtitle">{subtitle}</span>}
            </span>
          </div>
          <div className="wa-mediaviewer__body">
            <div className="wa-mediaviewer__media">{children}</div>
            {caption && <div className="wa-mediaviewer__caption">{caption}</div>}
          </div>
        </div>
      </div>
    );
  }
);

MediaViewer.displayName = 'MediaViewer';
