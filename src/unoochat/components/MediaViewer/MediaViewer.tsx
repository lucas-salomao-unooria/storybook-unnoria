'use client';

import React from 'react';
import { useModalFocus } from '../BottomSheet/useModalFocus';
import { Icon } from '../Icon';
import type { UncMediaViewerProps } from './MediaViewer.types';
import './MediaViewer.css';

/**
 * Componente MediaViewer — Design System Unoochat
 *
 * Visualizador de mídia em tela cheia: barra superior com a seta de voltar,
 * a mídia ampliada no centro e, abaixo dela, o texto de apoio. Prende o foco e
 * fecha no ESC. A seta é o glifo `back` do registro de ícones — o módulo não
 * tem um "fechar", e desenhar um seria inventar glifo.
 */
export const MediaViewer = React.forwardRef<HTMLDivElement, UncMediaViewerProps>(
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
      <div ref={ref} className="unc-mediaviewer-layer">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          aria-labelledby={titleId}
          className={['unc-mediaviewer', className].filter(Boolean).join(' ')}
          {...restProps}
        >
          <div className="unc-mediaviewer__bar">
            <button
              type="button"
              className="unc-mediaviewer__back"
              aria-label={backLabel}
              onClick={onClose}
            >
              <Icon name="back" size={20} tone="inherit" aria-hidden="true" />
            </button>
            <span className="unc-mediaviewer__titles">
              <span id={titleId} className="unc-mediaviewer__title">
                {title}
              </span>
              {subtitle && <span className="unc-mediaviewer__subtitle">{subtitle}</span>}
            </span>
          </div>
          <div className="unc-mediaviewer__body">
            <div className="unc-mediaviewer__media">{children}</div>
            {caption && <div className="unc-mediaviewer__caption">{caption}</div>}
          </div>
        </div>
      </div>
    );
  }
);

MediaViewer.displayName = 'MediaViewer';
