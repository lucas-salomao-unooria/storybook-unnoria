'use client';

import React from 'react';
import type { UncDialogFooterProps, UncDialogProps } from './Dialog.types';
import './Dialog.css';

/**
 * Rodapé do diálogo: divisor de 1px em `--unc-color-border-dialog`, conteúdo à
 * esquerda e ações alinhadas à direita.
 */
const DialogFooter: React.FC<UncDialogFooterProps> = ({
  children,
  actions,
  className = '',
  ...restProps
}) => (
  <div className={['unc-dialog__footer', className].filter(Boolean).join(' ')} {...restProps}>
    {children}
    {actions && <div className="unc-dialog__footer-actions">{actions}</div>}
  </div>
);

DialogFooter.displayName = 'Dialog.Footer';

/**
 * Componente Dialog — Design System Unoochat
 *
 * Diálogo modal com foco preso, fechamento por ESC e por toque no véu.
 * Geometria: 331px de largura, raio de 4px, título em `--unc-font-title-lg-*`
 * na cor `--unc-color-text-primary` e rodapé separado por um divisor.
 */
const DialogRoot = React.forwardRef<HTMLDivElement, UncDialogProps>(
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
    const invokerRef = React.useRef<HTMLElement | null>(null);
    const titleId = React.useId();

    /**
     * Lista os elementos focalizáveis visíveis dentro do painel.
     *
     * O filtro por `offsetParent` descarta o que está oculto: sem ele, o
     * primeiro/último item da lista podem ser nós invisíveis e o ciclo de Tab
     * manda o foco para o nada.
     */
    const getFocusable = React.useCallback(() => {
      if (!panelRef.current) {
        return [] as HTMLElement[];
      }

      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null || element === document.activeElement);
    }, []);

    // Move o foco para dentro do painel ao abrir e o devolve ao invocador ao
    // fechar. Sem isto o ciclo de Tab abaixo nunca engata: o foco continua no
    // botão que abriu o diálogo, fora do painel, e o primeiro Tab escapa para o
    // conteúdo de fundo.
    React.useEffect(() => {
      if (!open) {
        return undefined;
      }

      invokerRef.current = (document.activeElement as HTMLElement) ?? null;
      const [firstFocusable] = getFocusable();
      (firstFocusable ?? panelRef.current)?.focus();

      // `aria-modal` sozinho não impede o cursor virtual de sair do painel;
      // marcar os irmãos do véu como inertes é o que realmente confina a
      // leitura ao diálogo.
      const scrim = panelRef.current?.parentElement ?? null;
      const siblings = scrim?.parentElement
        ? (Array.from(scrim.parentElement.children) as HTMLElement[]).filter(
            (node) => node !== scrim
          )
        : [];
      siblings.forEach((node) => node.setAttribute('aria-hidden', 'true'));

      return () => {
        siblings.forEach((node) => node.removeAttribute('aria-hidden'));
        invokerRef.current?.focus?.();
        invokerRef.current = null;
      };
    }, [open, getFocusable]);

    // O ciclo de Tab não depende de `onClose`: um diálogo sem callback de
    // fechamento continua prendendo o foco; apenas o ESC deixa de agir.
    React.useEffect(() => {
      if (!open) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
          return;
        }

        if (event.key !== 'Tab') {
          return;
        }

        const focusable = getFocusable();

        if (focusable.length === 0) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        const isInsidePanel = panelRef.current?.contains(active as Node) ?? false;

        if (!isInsidePanel) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
          return;
        }

        if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose, getFocusable]);

    if (!open) {
      return null;
    }

    return (
      <div
        ref={ref}
        className="unc-dialog-scrim"
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
          className={['unc-dialog', className].filter(Boolean).join(' ')}
          style={
            { ['--unc-dialog-width' as string]: `${width}px`, ...style } as React.CSSProperties
          }
          {...restProps}
        >
          {title && (
            <h2 id={titleId} className="unc-dialog__title">
              {title}
            </h2>
          )}

          <div className="unc-dialog__body">{children}</div>

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
