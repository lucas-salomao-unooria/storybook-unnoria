'use client';

import React from 'react';

/**
 * Pilha das camadas modais abertas, da mais antiga à mais recente.
 *
 * A página empilha camadas: o post abre, sobre ele a folha de
 * informações, e sobre ela o diálogo de confirmação. Sem pilha, um Esc fecharia
 * as três de uma vez — cada camada ouve o documento. Com ela, só a do topo
 * reage a Esc e a Tab.
 */
const modalStack: symbol[] = [];

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';

/**
 * Foco de camada modal da Unooblog: move o foco para dentro do painel ao
 * abrir, prende o Tab, fecha no Esc, marca o fundo como `aria-hidden` e devolve
 * o foco a quem abriu ao fechar.
 *
 * Duas diferenças em relação ao hook das outras marcas, ambas por causa do
 * empilhamento:
 *
 * - **Pilha.** Só a camada do topo responde a Esc e a Tab.
 * - **Restauração do `aria-hidden`.** Ao fechar, cada irmão volta ao valor que
 *   tinha antes, e não a "sem atributo" — senão a folha, ao fechar, reexporia a
 *   página que o post ainda esconde.
 *
 * O hook é próprio do módulo: um módulo de marca nunca consome outro (seção 1.3
 * do AGENTS.md).
 */
export function useModalFocus(
  panelRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  onClose?: () => void,
  initialFocusRef?: React.RefObject<HTMLElement | null>
): void {
  const invokerRef = React.useRef<HTMLElement | null>(null);
  const tokenRef = React.useRef<symbol | null>(null);
  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const getFocusable = React.useCallback(() => {
    if (!panelRef.current) {
      return [] as HTMLElement[];
    }

    return Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => element.offsetParent !== null || element === document.activeElement
    );
  }, [panelRef]);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const token = Symbol('ubl-modal');
    tokenRef.current = token;
    modalStack.push(token);

    invokerRef.current = (document.activeElement as HTMLElement) ?? null;
    const [firstFocusable] = getFocusable();
    (initialFocusRef?.current ?? firstFocusable ?? panelRef.current)?.focus({ preventScroll: true });

    /* O fundo é o conjunto de irmãos do contêiner da camada (o véu). */
    const layer = panelRef.current?.parentElement ?? null;
    const siblings = layer?.parentElement
      ? (Array.from(layer.parentElement.children) as HTMLElement[]).filter((node) => node !== layer)
      : [];
    const previous = siblings.map((node) => node.getAttribute('aria-hidden'));
    siblings.forEach((node) => node.setAttribute('aria-hidden', 'true'));

    return () => {
      siblings.forEach((node, index) => {
        const value = previous[index];
        if (value === null) node.removeAttribute('aria-hidden');
        else node.setAttribute('aria-hidden', value);
      });

      const position = modalStack.indexOf(token);
      if (position >= 0) modalStack.splice(position, 1);
      tokenRef.current = null;

      const invoker = invokerRef.current;
      invokerRef.current = null;
      if (invoker && document.contains(invoker)) invoker.focus({ preventScroll: true });
    };
  }, [open, getFocusable, panelRef, initialFocusRef]);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalStack[modalStack.length - 1] !== tokenRef.current) {
        return;
      }

      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = getFocusable();

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const isInsidePanel = panelRef.current?.contains(active as Node) ?? false;

      /*
       * Fora do painel, ou num nó dele que não está na lista de focáveis (o
       * próprio painel com `tabIndex=-1`, por exemplo): o Tab vai ao primeiro e
       * o Shift+Tab ao último. Sem isso, o Shift+Tab a partir do painel saía da
       * armadilha.
       */
      if (!isInsidePanel || !focusable.includes(active as HTMLElement)) {
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
  }, [open, getFocusable, panelRef]);
}
