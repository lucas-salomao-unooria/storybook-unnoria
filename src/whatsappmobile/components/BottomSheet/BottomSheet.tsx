'use client';

import React from 'react';
import type { WaBottomSheetProps } from './BottomSheet.types';
import { useModalFocus } from './useModalFocus';
import './BottomSheet.css';

/**
 * Componente BottomSheet — Design System WhatsApp Mobile
 *
 * Folha inferior modal: puxador, título, corpo e rodapé, sobre o véu
 * `--wa-color-scrim`. Prende o foco, fecha no ESC e no toque no véu. Extensão:
 * a superfície é a da folha de anexos (`--wa-color-surface-sheet`); o que muda
 * é o conteúdo, que aqui é livre.
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, WaBottomSheetProps>(
  ({ open = true, title, children, footer, onClose, className = '', ...restProps }, ref) => {
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const titleId = React.useId();

    useModalFocus(panelRef, open, onClose);

    if (!open) {
      return null;
    }

    return (
      <div
        ref={ref}
        className="wa-bottomsheet-scrim"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose?.();
          }
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          aria-labelledby={title ? titleId : undefined}
          className={['wa-bottomsheet', className].filter(Boolean).join(' ')}
          {...restProps}
        >
          <span className="wa-bottomsheet__handle" aria-hidden="true" />
          {title && (
            <h2 id={titleId} className="wa-bottomsheet__title">
              {title}
            </h2>
          )}
          <div className="wa-bottomsheet__body">{children}</div>
          {footer && <div className="wa-bottomsheet__footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
