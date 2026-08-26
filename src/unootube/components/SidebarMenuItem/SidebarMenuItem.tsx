'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UniSidebarMenuItemProps } from './SidebarMenuItem.types';
import './SidebarMenuItem.css';

/**
 * Componente SidebarMenuItem — Design System Unootube
 *
 * Reproduz o nó `Navigation/SidebarMenuItem` (`8:126`), a linha de 224×40 que
 * compõe todos os blocos da barra lateral.
 *
 * O estado ativo do arquivo é marcado de duas formas simultâneas: o fundo passa
 * a `--uni-color-background-surface` e o glifo troca para a versão **preenchida**
 * — não há mudança de cor de texto. É por isso que o arquivo publica treze
 * glifos preenchidos além dos de contorno.
 */
export const SidebarMenuItem = React.forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  UniSidebarMenuItemProps
>(
  (
    { icon, activeIcon, menuLabel, active = false, asButton = false, className = '', ...restProps },
    ref
  ) => {
    const glyph = active && activeIcon ? activeIcon : icon;

    const content = (
      <>
        {glyph && (
          <span className="uni-sidebar-item__icon">
            <Icon name={glyph} size="lg" tone="primary" />
          </span>
        )}
        <span className="uni-sidebar-item__label">{menuLabel}</span>
      </>
    );

    const classes = ['uni-sidebar-item', active ? 'uni-sidebar-item--active' : '', className]
      .filter(Boolean)
      .join(' ');

    if (asButton) {
      /*
       * `href` só faz sentido em âncora. Como as props extras são tipadas para
       * `<a>`, ele é removido da cópia antes de chegar ao `<button>` — passá-lo
       * adiante geraria um atributo inválido no DOM.
       */
      const buttonProps = { ...restProps } as Record<string, unknown>;
      delete buttonProps.href;

      return (
        <button
          ref={ref}
          type="button"
          className={classes}
          aria-current={active ? 'page' : undefined}
          {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <a ref={ref} className={classes} aria-current={active ? 'page' : undefined} {...restProps}>
        {content}
      </a>
    );
  }
);

SidebarMenuItem.displayName = 'SidebarMenuItem';
