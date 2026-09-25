'use client';

import React from 'react';

/**
 * Foco de camada modal: move o foco para dentro do painel ao abrir, prende o
 * Tab, fecha no ESC, marca o fundo como `aria-hidden` e devolve o foco a quem
 * abriu ao fechar. É o mesmo comportamento do `Dialog`, compartilhado entre as
 * duas camadas que chegaram depois dele (`BottomSheet` e `MediaViewer`).
 *
 * O fundo marcado é o conjunto de irmãos do VÉU (o pai do painel): `aria-modal`
 * sozinho não impede o cursor virtual de sair do painel.
 */
export function useModalFocus(
  panelRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  onClose?: () => void
): void {
  const invokerRef = React.useRef<HTMLElement | null>(null);

  const getFocusable = React.useCallback(() => {
    if (!panelRef.current) {
      return [] as HTMLElement[];
    }

    return Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.offsetParent !== null || element === document.activeElement);
  }, [panelRef]);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    invokerRef.current = (document.activeElement as HTMLElement) ?? null;
    const [firstFocusable] = getFocusable();
    (firstFocusable ?? panelRef.current)?.focus();

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
  }, [open, getFocusable, panelRef]);

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
  }, [open, onClose, getFocusable, panelRef]);
}
