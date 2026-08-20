import React from 'react';
import type { WaDialogFooterProps, WaDialogProps } from './Dialog.types';
import './Dialog.css';

/**
 * Rodapé do diálogo: divisor de 1px em `--wa-color-border-dialog`, conteúdo à
 * esquerda e ações alinhadas à direita.
 */
const DialogFooter: React.FC<WaDialogFooterProps> = ({
  children,
  actions,
  className = '',
  ...restProps
}) => (
  <div className={['wa-dialog__footer', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
    {actions && <div className="wa-dialog__footer-actions">{actions}</div>}
  </div>
);

DialogFooter.displayName = 'Dialog.Footer';

/**
 * Componente Dialog — Design System WhatsApp Mobile
 *
 * Diálogo modal com foco preso, fechamento por ESC e por toque no véu. A
 * geometria segue o frame "Mute notif": 331px de largura, raio de 4px, título de
 * 21px em `--wa-color-text-dialog-title` e rodapé separado por um divisor.
 */
const DialogRoot = React.forwardRef<HTMLDivElement, WaDialogProps>(
  (
    {
      open = true,
      title,
      children,
      footer,
      onClose,
      width = 331,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const titleId = React.useId();

    React.useEffect(() => {
      if (!open || !onClose) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
          return;
        }

        if (event.key !== 'Tab' || !panelRef.current) {
          return;
        }

        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) {
      return null;
    }

    return (
      <div
        ref={ref}
        className="wa-dialog-scrim"
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
          aria-labelledby={title ? titleId : undefined}
          className={['wa-dialog', className].filter(Boolean).join(' ')}
          style={
            { ['--wa-dialog-width' as string]: `${width}px`, ...style } as React.CSSProperties
          }
          {...restProps}
        >
          {title && (
            <h2 id={titleId} className="wa-dialog__title">
              {title}
            </h2>
          )}

          <div className="wa-dialog__body">{children}</div>

          {footer}
        </div>
      </div>
    );
  }
);

DialogRoot.displayName = 'Dialog';

/**
 * Diálogo modal com o subcomponente `Footer`.
 */
export const Dialog = Object.assign(DialogRoot, { Footer: DialogFooter });
