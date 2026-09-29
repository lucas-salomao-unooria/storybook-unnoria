'use client';

import React from 'react';
import { useModalFocus } from '../BottomSheet/useModalFocus';
import type { UnvConfirmDialogProps } from './ConfirmDialog.types';
import './ConfirmDialog.css';

/**
 * Encaminha o nó para a ref externa (callback ou objeto). Fora do componente
 * para deixar explícito que a escrita ocorre no commit, não na renderização.
 */
const assignRef = (target: React.Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) => {
  if (typeof target === 'function') {
    target(node);
  } else if (target && 'current' in target) {
    (target as React.MutableRefObject<HTMLDivElement | null>).current = node;
  }
};

/**
 * Componente ConfirmDialog — Design System Unoovista
 *
 * Diálogo de confirmação de 300px sobre o véu `--unv-color-overlay-scrim`, em
 * `background-elevated` com `--unv-elevation-overlay` e sem desfoque: título,
 * mensagem e duas ações lado a lado em cápsulas de 44px — "Cancelar" (contorno)
 * e a confirmação (preenchida). Extensão do módulo, sem par na Plataforma
 * Unooria.
 *
 * `role="alertdialog"`: foco preso, ESC cancela, fundo `aria-hidden` e foco
 * devolvido a quem abriu. O foco abre SEMPRE em "Cancelar" — a primeira ação
 * do DOM — para que um Enter reflexo não confirme nada.
 */
export const ConfirmDialog = React.forwardRef<HTMLDivElement, UnvConfirmDialogProps>(
  (
    {
      open,
      title,
      message,
      confirmLabel,
      cancelLabel,
      onConfirm,
      onCancel,
      tone = 'default',
      busy = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);
    const titleId = React.useId();
    const messageId = React.useId();

    const handleEscape = React.useCallback(() => {
      if (!busy) {
        onCancel();
      }
    }, [busy, onCancel]);

    useModalFocus(panelRef, open, handleEscape, cancelRef);

    if (!open) {
      return null;
    }

    const setPanel = (node: HTMLDivElement | null) => {
      panelRef.current = node;
      assignRef(ref, node);
    };

    const explicitLabelledBy = restProps['aria-labelledby'];
    const explicitLabel = restProps['aria-label'];
    const explicitDescribedBy = restProps['aria-describedby'];

    return (
      <div data-unv-theme={theme} className="unv-confirm-dialog-scrim">
        <div
          ref={setPanel}
          role="alertdialog"
          aria-modal="true"
          tabIndex={-1}
          aria-busy={busy || undefined}
          className={[
            'unv-confirm-dialog',
            busy ? 'unv-confirm-dialog--busy' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...restProps}
          aria-labelledby={explicitLabelledBy ?? (explicitLabel ? undefined : titleId)}
          aria-describedby={explicitDescribedBy ?? (message ? messageId : undefined)}
        >
          <div className="unv-confirm-dialog__content">
            <h2 id={titleId} className="unv-confirm-dialog__title">
              {title}
            </h2>
            {message && (
              <p id={messageId} className="unv-confirm-dialog__message">
                {message}
              </p>
            )}
          </div>

          <div className="unv-confirm-dialog__actions">
            <button
              ref={cancelRef}
              type="button"
              className="unv-confirm-dialog__action unv-confirm-dialog__action--cancel"
              aria-disabled={busy || undefined}
              onClick={() => {
                if (!busy) {
                  onCancel();
                }
              }}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className={[
                'unv-confirm-dialog__action',
                'unv-confirm-dialog__action--confirm',
                tone === 'destructive' ? 'unv-confirm-dialog__action--destructive' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-disabled={busy || undefined}
              onClick={() => {
                if (!busy) {
                  onConfirm();
                }
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';
