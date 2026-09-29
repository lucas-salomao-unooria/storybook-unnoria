import React from 'react';
import type { UaiSidebarRowProps } from './SidebarRow.types';
import { Icon } from '../Icon';
import './SidebarRow.css';

/**
 * Componente SidebarRow — Design System UnooriaAI
 *
 * Linha de 48px com padding 12, intervalo 8, raio 12, ícone de 24px e rótulo
 * de 14/20, usada na barra lateral do cliente web (`WebSidebar`).
 *
 * Não confundir com o `NavItem`: aquele é uma linha de 36px com raio 8 e ícone
 * de 14px, da barra lateral `Sidebar`. São duas réguas distintas do módulo, e
 * nenhuma substitui a outra.
 */
export const SidebarRow = React.forwardRef<HTMLButtonElement, UaiSidebarRowProps>(
  (
    {
      icon,
      iconNode,
      active = false,
      as: Component = 'button',
      theme,
      children,
      className = '',
      type,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'uai-sidebar-row',
      active ? 'uai-sidebar-row--active' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const glyph = iconNode ?? (icon ? <Icon name={icon} size={24} /> : null);
    const isButton = Component === 'button';

    return (
      <Component
        ref={ref}
        data-uai-theme={theme}
        className={classes}
        type={isButton ? (type ?? 'button') : type}
        aria-current={active ? 'page' : undefined}
        {...restProps}
      >
        {glyph && (
          <span className="uai-sidebar-row__icon" aria-hidden={iconNode ? undefined : 'true'}>
            {glyph}
          </span>
        )}
        <span className="uai-sidebar-row__label">{children}</span>
      </Component>
    );
  }
);

SidebarRow.displayName = 'SidebarRow';
