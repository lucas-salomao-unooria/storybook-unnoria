import React from 'react';
import type { GptSidebarRowProps } from './SidebarRow.types';
import { Icon } from '../Icon';
import './SidebarRow.css';

/**
 * Componente SidebarRow — Design System ChatGPT
 *
 * Linha de 48px com padding 12, intervalo 8, raio 12, ícone de 24px e rótulo
 * Inter Regular de 14/20, medida na barra lateral da tela `New chat - V1 - A`.
 *
 * Não confundir com o `NavItem`: aquele vem da página `🟡 Design system` e é
 * uma linha de 36px com raio 8 e glifo tipográfico de 14px. São duas réguas
 * distintas do mesmo arquivo, e nenhuma substitui a outra.
 */
export const SidebarRow = React.forwardRef<HTMLButtonElement, GptSidebarRowProps>(
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
      'gpt-sidebar-row',
      active ? 'gpt-sidebar-row--active' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const glyph = iconNode ?? (icon ? <Icon name={icon} size={24} /> : null);
    const isButton = Component === 'button';

    return (
      <Component
        ref={ref}
        data-gpt-theme={theme}
        className={classes}
        type={isButton ? (type ?? 'button') : type}
        aria-current={active ? 'page' : undefined}
        {...restProps}
      >
        {glyph && (
          <span className="gpt-sidebar-row__icon" aria-hidden={iconNode ? undefined : 'true'}>
            {glyph}
          </span>
        )}
        <span className="gpt-sidebar-row__label">{children}</span>
      </Component>
    );
  }
);

SidebarRow.displayName = 'SidebarRow';
