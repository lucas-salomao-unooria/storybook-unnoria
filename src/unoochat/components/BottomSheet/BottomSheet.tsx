'use client';

import React from 'react';
import type { UncBottomSheetProps } from './BottomSheet.types';
import { useModalFocus } from './useModalFocus';
import './BottomSheet.css';

/**
 * Componente BottomSheet — Design System Unoochat
 *
 * Folha inferior modal: puxador, título, corpo e rodapé, sobre o véu
 * `--unc-color-scrim`. Prende o foco, fecha no ESC e no toque no véu. Extensão:
 * a superfície é a da folha de anexos (`--unc-color-surface-sheet`); o que muda
 * é o conteúdo, que aqui é livre.
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, UncBottomSheetProps>(
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
        className="unc-bottomsheet-scrim"
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
          className={['unc-bottomsheet', className].filter(Boolean).join(' ')}
          {...restProps}
        >
          <span className="unc-bottomsheet__handle" aria-hidden="true" />
          {title && (
            <h2 id={titleId} className="unc-bottomsheet__title">
              {title}
            </h2>
          )}
          <div className="unc-bottomsheet__body">{children}</div>
          {footer && <div className="unc-bottomsheet__footer">{footer}</div>}
        </div>
      </div>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
