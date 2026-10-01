import React from 'react';
import { Icon } from '../Icon';
import type { UjnNavLinkProps } from './NavLink.types';
import './NavLink.css';

/**
 * Componente NavLink — Design System Unoojornal
 *
 * Um item da navegação principal: rótulo (e glifo opcional) com sublinhado de
 * 2px na cor de ação no estado ativo e no hover. O ativo se marca também por
 * peso de fonte, glifo preenchido e `aria-current="page"` — nunca só pela cor.
 * Estados do quadro de links: padrão, hover, foco (anel de 2px) e ativo.
 *
 * Com `href` é um `<a>`; sem ele, um `<button type="button">`. Só recebe props
 * e renderiza marcação, então roda como Server Component.
 */
export const NavLink = React.forwardRef<HTMLElement, UjnNavLinkProps>(
  ({ href, active = false, icon, children, onClick, theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-nav-link', active ? 'ujn-nav-link--active' : '', className]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon && <Icon name={icon} size="sm" tone="inherit" filled={active} />}
        <span className="ujn-nav-link__label">{children}</span>
      </>
    );

    if (href !== undefined) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          data-ujn-theme={theme}
          className={classes}
          aria-current={active ? 'page' : undefined}
          onClick={onClick}
          {...restProps}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        data-ujn-theme={theme}
        className={classes}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

NavLink.displayName = 'NavLink';
