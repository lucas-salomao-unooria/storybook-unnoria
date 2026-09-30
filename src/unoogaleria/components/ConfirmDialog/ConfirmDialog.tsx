'use client';

import React from 'react';
import { Button } from '../Button';
import { useModalFocus } from '../../hooks';
import type { UglConfirmDialogProps } from './ConfirmDialog.types';
import './ConfirmDialog.css';

/** Campos do `children` que podem receber o foco inicial. */
const FIELD_SELECTOR =
  'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])';

/**
 * Encaminha o nó para a ref externa (callback ou objeto). Fora do componente
 * para deixar explícito que a escrita ocorre no commit, não na renderização.
 */
const assignRef = (target: React.Ref<HTMLFormElement> | undefined, node: HTMLFormElement | null) => {
  if (typeof target === 'function') {
    target(node);
  } else if (target && 'current' in target) {
    (target as React.MutableRefObject<HTMLFormElement | null>).current = node;
  }
};

interface ConfirmDialogLayerProps extends Omit<UglConfirmDialogProps, 'open'> {
  forwardedRef: React.Ref<HTMLFormElement>;
}

/**
 * A camada aberta. Existe só enquanto o diálogo está aberto: montar é abrir, e
 * o hook de foco devolve o foco a quem abriu quando a camada sai.
 */
const ConfirmDialogLayer: React.FC<ConfirmDialogLayerProps> = ({
  forwardedRef,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  tone = 'default',
  onConfirm,
  onCancel,
  children,
  confirmDisabled = false,
  busy = false,
  theme,
  className = '',
  ...restProps
}) => {
  const panelRef = React.useRef<HTMLFormElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const initialFocusRef = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  /*
   * Foco inicial, decidido antes do efeito do hook (efeitos de layout rodam
   * antes dos passivos): no destrutivo, SEMPRE "Cancelar" — um Enter reflexo
   * não apaga nada; no comum, o primeiro campo do `children`, senão "Cancelar".
   */
  React.useLayoutEffect(() => {
    const field =
      tone === 'danger' ? null : bodyRef.current?.querySelector<HTMLElement>(FIELD_SELECTOR);
    initialFocusRef.current = field ?? cancelRef.current;
  }, [tone]);

  const handleEscape = React.useCallback(() => {
    if (!busy) {
      onCancel();
    }
  }, [busy, onCancel]);

  useModalFocus(panelRef, true, handleEscape, initialFocusRef);

  const setPanel = (node: HTMLFormElement | null) => {
    panelRef.current = node;
    assignRef(forwardedRef, node);
  };

  const explicitLabelledBy = restProps['aria-labelledby'];
  const explicitLabel = restProps['aria-label'];
  const explicitDescribedBy = restProps['aria-describedby'];
  const danger = tone === 'danger';

  return (
    <div data-ugl-theme={theme} className="ugl-confirm-dialog-layer">
      <form
        ref={setPanel}
        role={danger ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        tabIndex={-1}
        noValidate
        aria-busy={busy || undefined}
        className={[
          'ugl-confirm-dialog',
          busy ? 'ugl-confirm-dialog--busy' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
        aria-labelledby={explicitLabelledBy ?? (explicitLabel ? undefined : titleId)}
        aria-describedby={explicitDescribedBy ?? (description ? descriptionId : undefined)}
        onSubmit={(event) => {
          event.preventDefault();
          if (!busy && !confirmDisabled) {
            onConfirm();
          }
        }}
      >
        <div className="ugl-confirm-dialog__content">
          <h2 id={titleId} className="ugl-confirm-dialog__title">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="ugl-confirm-dialog__description">
              {description}
            </p>
          )}
          {children !== undefined && (
            <div ref={bodyRef} className="ugl-confirm-dialog__body">
              {children}
            </div>
          )}
        </div>

        <div className="ugl-confirm-dialog__actions">
          <Button
            ref={cancelRef}
            variant="secondary"
            size="md"
            fullWidth
            aria-disabled={busy || undefined}
            onClick={() => {
              if (!busy) {
                onCancel();
              }
            }}
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            variant={danger ? 'danger' : 'primary'}
            size="md"
            fullWidth
            disabled={confirmDisabled}
            aria-disabled={busy || undefined}
          >
            {confirmLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

/**
 * Componente ConfirmDialog — Design System Unoogaleria
 *
 * Alerta central de 300px sobre o véu `overlay-scrim`: pergunta, consequência,
 * um espaço opcional para campo (o nome de "Novo álbum") e duas ações lado a
 * lado — "Cancelar" em contorno e a confirmação preenchida, vermelha no tom
 * destrutivo. `background-elevated`, `radius-l` e `--ugl-elevation-overlay`, na
 * camada `--ugl-z-dialog`, acima das folhas.
 *
 * É uma camada da TELA (posição absoluta no contêiner), nunca da janela. O
 * painel é um `<form>`: Enter num campo confirma sem escuta de tecla.
 *
 * `role="alertdialog"` no destrutivo e `role="dialog"` no comum, nomeados pelo
 * título renderizado. `useModalFocus`: foco preso, Esc cancela, fundo
 * `aria-hidden` e foco devolvido. O toque no véu não cancela — uma decisão
 * destrutiva não se desfaz por toque acidental.
 */
export const ConfirmDialog = React.forwardRef<HTMLFormElement, UglConfirmDialogProps>(
  ({ open, ...props }, ref) => {
    if (!open) {
      return null;
    }

    return <ConfirmDialogLayer {...props} forwardedRef={ref} />;
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';
