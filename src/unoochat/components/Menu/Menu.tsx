'use client';

import React from 'react';
import type { UncMenuProps } from './Menu.types';
import './Menu.css';

/**
 * Componente Menu — Design System Unoochat
 *
 * Menu suspenso da barra superior: retângulo de 240px em
 * `--unc-color-surface-elevated` com itens de 44px de passo e texto em
 * `--unc-font-subtitle-*` na cor `--unc-color-text-primary`.
 */
export const Menu = React.forwardRef<HTMLDivElement, UncMenuProps>(
  (
    {
      items,
      onSelect,
      onClose,
      width = 240,
      label = 'Mais opções',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const invokerRef = React.useRef<HTMLElement | null>(null);

    // Ao abrir, o foco vai para o primeiro item habilitado; ao fechar, volta ao
    // elemento que abriu o menu.
    React.useEffect(() => {
      invokerRef.current = (document.activeElement as HTMLElement) ?? null;
      itemRefs.current.find((node) => node && !node.disabled)?.focus();

      return () => {
        invokerRef.current?.focus?.();
        invokerRef.current = null;
      };
    }, []);

    React.useEffect(() => {
      if (!onClose) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    /**
     * Navegação exigida pelo padrão ARIA de menu: ↑/↓ percorrem os itens
     * habilitados em ciclo, Home/End vão às extremidades. Com `role="menu"` o
     * leitor de tela entra em modo de aplicação e espera exatamente isto.
     */
    const handleItemKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];

      if (!keys.includes(event.key)) {
        return;
      }

      const enabled = itemRefs.current.filter(
        (node): node is HTMLButtonElement => Boolean(node) && !node!.disabled
      );

      if (enabled.length === 0) {
        return;
      }

      event.preventDefault();
      const current = enabled.indexOf(document.activeElement as HTMLButtonElement);

      const nextIndex =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? enabled.length - 1
            : event.key === 'ArrowUp'
              ? (current - 1 + enabled.length) % enabled.length
              : (current + 1) % enabled.length;

      enabled[nextIndex].focus();
    };

    return (
      <div
        ref={ref}
        role="menu"
        aria-label={label}
        className={['unc-menu', className].filter(Boolean).join(' ')}
        style={{ ['--unc-menu-width' as string]: `${width}px`, ...style } as React.CSSProperties}
        onKeyDown={handleItemKeyDown}
        {...restProps}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            tabIndex={index === 0 ? 0 : -1}
            className="unc-menu__item"
            disabled={item.disabled}
            onClick={() => onSelect?.(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }
);

Menu.displayName = 'Menu';
