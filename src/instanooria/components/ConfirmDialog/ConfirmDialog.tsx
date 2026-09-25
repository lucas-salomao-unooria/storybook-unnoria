'use client';

import React from 'react';
import { useModalFocus } from '../BottomSheet/useModalFocus';
import type { InstaConfirmDialogProps } from './ConfirmDialog.types';
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
 * Componente ConfirmDialog — Design System Instanooria
 *
 * O alerta do iOS que o Instagram usa: painel centralizado, título, mensagem e
 * as ações empilhadas com divisórias de 0,33px — a confirmação primeiro, em
 * peso forte, e "Cancelar" por último. Extensão sem quadro no arquivo de
 * origem: superfície elevada, tipografia e hairline são degraus do token.
 *
 * `role="alertdialog"`: foco preso, ESC cancela, fundo `aria-hidden` e foco
 * devolvido a quem abriu. No tom destrutivo o foco abre em "Cancelar".
 */
export const ConfirmDialog = React.forwardRef<HTMLDivElement, InstaConfirmDialogProps>(
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
      theme = 'light',
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

    useModalFocus(panelRef, open, handleEscape, tone === 'destructive' ? cancelRef : undefined);

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
      <div data-insta-theme={theme} className="insta-confirm-dialog-scrim">
        <div
          ref={setPanel}
          role="alertdialog"
          aria-modal="true"
          tabIndex={-1}
          aria-busy={busy || undefined}
          className={[
            'insta-confirm-dialog',
            busy ? 'insta-confirm-dialog--busy' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...restProps}
          aria-labelledby={explicitLabelledBy ?? (explicitLabel ? undefined : titleId)}
          aria-describedby={explicitDescribedBy ?? (message ? messageId : undefined)}
        >
          <div className="insta-confirm-dialog__content">
            <h2 id={titleId} className="insta-confirm-dialog__title">
              {title}
            </h2>
            {message && (
              <p id={messageId} className="insta-confirm-dialog__message">
                {message}
              </p>
            )}
          </div>

          <div className="insta-confirm-dialog__actions">
            <button
              type="button"
              className={[
                'insta-confirm-dialog__action',
                'insta-confirm-dialog__action--confirm',
                tone === 'destructive' ? 'insta-confirm-dialog__action--destructive' : '',
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
            <button
              ref={cancelRef}
              type="button"
              className="insta-confirm-dialog__action insta-confirm-dialog__action--cancel"
              aria-disabled={busy || undefined}
              onClick={() => {
                if (!busy) {
                  onCancel();
                }
              }}
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';
