'use client';

import React from 'react';
import { Icon } from '../Icon';
import type {
  UglActionMenuAction,
  UglActionMenuItem,
  UglActionMenuProps,
} from './ActionMenu.types';
import './ActionMenu.css';

/** Distância entre a âncora e o menu, em pixels. */
const ANCHOR_GAP = 6;

/** Folga mínima entre o menu e as bordas do contêiner, em pixels. */
const EDGE_GAP = 8;

const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';

const isAction = (item: UglActionMenuItem): item is UglActionMenuAction =>
  !('type' in item && item.type === 'divider');

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

interface ActionMenuLayerProps extends Omit<UglActionMenuProps, 'open'> {
  forwardedRef: React.Ref<HTMLDivElement>;
}

/**
 * A camada aberta. Existe só enquanto o menu está aberto: ao montar guarda quem
 * abriu e foca a primeira ação; ao desmontar devolve o foco.
 */
const ActionMenuLayer: React.FC<ActionMenuLayerProps> = ({
  forwardedRef,
  onClose,
  items,
  placement = 'bottom-end',
  anchor,
  anchorRef,
  ariaLabel,
  variant = 'default',
  theme,
  className = '',
  onKeyDown,
  ...restProps
}) => {
  const layerRef = React.useRef<HTMLDivElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const setMenu = (node: HTMLDivElement | null) => {
    menuRef.current = node;
    assignRef(forwardedRef, node);
  };

  /*
   * Posição. Escrita direto no nó (não em estado) para não renderizar duas
   * vezes. A âncora é medida em pixels de TELA e convertida para pixels do
   * contêiner: dentro de um `PhoneFrame` com `scale`, as duas medidas diferem.
   */
  React.useLayoutEffect(() => {
    const layer = layerRef.current;
    const menu = menuRef.current;
    if (!layer || !menu) return;

    const { style } = menu;
    style.top = '';
    style.right = '';
    style.bottom = '';
    style.left = '';
    style.maxHeight = '';

    const [side, align] = placement.split('-') as ['top' | 'bottom', 'start' | 'end'];
    const width = layer.offsetWidth;
    const height = layer.offsetHeight;
    const anchorElement = anchorRef?.current;

    if (anchorElement) {
      const layerRect = layer.getBoundingClientRect();
      const scale = width ? layerRect.width / width : 1;
      const rect = anchorElement.getBoundingClientRect();
      const top = (rect.top - layerRect.top) / scale;
      const bottom = (rect.bottom - layerRect.top) / scale;
      const left = (rect.left - layerRect.left) / scale;
      const right = (rect.right - layerRect.left) / scale;

      if (side === 'bottom') {
        style.top = `${bottom + ANCHOR_GAP}px`;
        style.maxHeight = `${Math.max(0, height - bottom - ANCHOR_GAP - EDGE_GAP)}px`;
      } else {
        style.bottom = `${height - top + ANCHOR_GAP}px`;
        style.maxHeight = `${Math.max(0, top - ANCHOR_GAP - EDGE_GAP)}px`;
      }

      if (align === 'end') {
        style.right = `${Math.max(EDGE_GAP, width - right)}px`;
      } else {
        style.left = `${Math.max(EDGE_GAP, left)}px`;
      }
      return;
    }

    if (anchor) {
      (['top', 'right', 'bottom', 'left'] as const).forEach((edge) => {
        const value = anchor[edge];
        if (value !== undefined) style[edge] = `${value}px`;
      });
    }
  }, [anchor, anchorRef, placement]);

  /* Foco: guarda quem abriu, foca a primeira ação e devolve o foco ao fechar. */
  React.useEffect(() => {
    const invoker = document.activeElement as HTMLElement | null;
    const first = menuRef.current?.querySelector<HTMLElement>(ITEM_SELECTOR);
    (first ?? menuRef.current)?.focus({ preventScroll: true });

    return () => {
      if (invoker && invoker !== document.body && document.contains(invoker)) {
        invoker.focus({ preventScroll: true });
      }
    };
  }, []);

  const focusables = () =>
    Array.from(menuRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []);

  const moveFocus = (target: 'next' | 'previous' | 'first' | 'last') => {
    const list = focusables();
    if (list.length === 0) return;
    const current = list.indexOf(document.activeElement as HTMLElement);
    const index =
      target === 'first'
        ? 0
        : target === 'last'
          ? list.length - 1
          : target === 'next'
            ? (current + 1) % list.length
            : (current - 1 + list.length) % list.length;
    list[index].focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveFocus('next');
        return;
      case 'ArrowUp':
        event.preventDefault();
        moveFocus('previous');
        return;
      case 'Home':
        event.preventDefault();
        moveFocus('first');
        return;
      case 'End':
        event.preventDefault();
        moveFocus('last');
        return;
      case 'Escape':
      case 'Tab':
        /*
         * Pára a propagação: a camada modal de baixo (folha, visualizador) ouve
         * o documento e fecharia junto no mesmo Esc.
         */
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      default:
        break;
    }

    /* Busca por primeira letra, como nos menus de sistema. */
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const letter = event.key.toLocaleLowerCase('pt-BR');
      const list = focusables();
      const start = list.indexOf(document.activeElement as HTMLElement);
      const ordered = [...list.slice(start + 1), ...list.slice(0, start + 1)];
      const match = ordered.find((node) =>
        (node.textContent ?? '').trim().toLocaleLowerCase('pt-BR').startsWith(letter)
      );
      match?.focus();
    }
  };

  return (
    <div
      ref={layerRef}
      data-ugl-theme={theme}
      className="ugl-action-menu-layer"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCloseRef.current();
        }
      }}
    >
      <div
        ref={setMenu}
        role="menu"
        aria-label={ariaLabel}
        aria-orientation="vertical"
        tabIndex={-1}
        className={[
          'ugl-action-menu',
          `ugl-action-menu--${variant}`,
          `ugl-action-menu--${placement}`,
          anchorRef || anchor ? '' : 'ugl-action-menu--default-position',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {items.map((item) =>
          isAction(item) ? (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              tabIndex={-1}
              aria-disabled={item.disabled || undefined}
              className={[
                'ugl-action-menu__item',
                item.tone === 'danger' ? 'ugl-action-menu__item--danger' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                if (item.disabled) return;
                item.onSelect();
                onCloseRef.current();
              }}
            >
              <span className="ugl-action-menu__label">{item.label}</span>
              {item.icon && <Icon name={item.icon} size="sm" tone="inherit" />}
            </button>
          ) : (
            <div key={item.id} role="separator" className="ugl-action-menu__divider" />
          )
        )}
      </div>
    </div>
  );
};

/**
 * Componente ActionMenu — Design System Unoogaleria
 *
 * Menu suspenso ancorado ao botão que o abriu ("Mais" do visualizador, do álbum
 * ou da seleção): cartão em `background-elevated` com `radius-m` e
 * `--ugl-elevation-overlay`, ações de 44px com o glifo à direita, divisores
 * entre grupos e o tom vermelho para a ação destrutiva.
 *
 * É uma camada da TELA: posição absoluta dentro do contêiner posicionado mais
 * próximo (a tela do `PhoneFrame`), nunca portal nem `position: fixed`. A
 * posição vem de `anchorRef` (medida e convertida para a escala do contêiner)
 * ou de `anchor`, em pixels.
 *
 * `role="menu"` com `menuitem`: o primeiro item recebe o foco ao abrir; setas,
 * Home e End movem; Enter e Espaço escolhem; a primeira letra salta; Esc, Tab
 * e o toque fora fecham, e o foco volta a quem abriu. O botão que abre o menu
 * declara `aria-haspopup="menu"` e `aria-expanded`.
 */
export const ActionMenu = React.forwardRef<HTMLDivElement, UglActionMenuProps>(
  ({ open, ...props }, ref) => {
    if (!open) {
      return null;
    }

    return <ActionMenuLayer {...props} forwardedRef={ref} />;
  }
);

ActionMenu.displayName = 'ActionMenu';
