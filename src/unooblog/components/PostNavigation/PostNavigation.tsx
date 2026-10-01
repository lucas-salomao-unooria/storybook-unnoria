'use client';

import React from 'react';
import { Icon } from '../Icon';
import type {
  UblPostNavigationDirection,
  UblPostNavigationProps,
  UblPostNavigationTarget,
} from './PostNavigation.types';
import './PostNavigation.css';

/**
 * Um cartão da navegação: link com `href`, botão sem ele.
 */
const NavigationCard: React.FC<{
  direction: UblPostNavigationDirection;
  label: string;
  target: UblPostNavigationTarget;
  onNavigate?: (direction: UblPostNavigationDirection) => void;
}> = ({ direction, label, target, onNavigate }) => {
  const className = `ubl-post-navigation__card ubl-post-navigation__card--${direction}`;
  const content = (
    <>
      <span className="ubl-post-navigation__label">
        {direction === 'previous' && <Icon name="chevronLeft" size="sm" tone="inherit" />}
        <span>{label}</span>
        {direction === 'next' && <Icon name="chevronRight" size="sm" tone="inherit" />}
      </span>
      <span className="ubl-post-navigation__title">{target.title}</span>
    </>
  );
  const handleClick = onNavigate ? () => onNavigate(direction) : undefined;

  return target.href ? (
    <a className={className} href={target.href} onClick={handleClick}>
      {content}
    </a>
  ) : (
    <button type="button" className={className} onClick={handleClick}>
      {content}
    </button>
  );
};

/**
 * Componente PostNavigation — Design System Unooblog
 *
 * Navegação entre posts, no fim da leitura: dois cartões lavanda de cantos
 * macios, "Post anterior" à esquerda e "Próximo post" à direita, cada um com o
 * título do destino. É um `<nav>` nomeado. Cartões com `href` são links; sem
 * `href`, botões que chamam `onNavigate`. Um cartão ausente some e o outro
 * mantém o seu lado da grade; no contêiner compacto os cartões se empilham.
 *
 * Client Component: repassa o manipulador de navegação aos cartões.
 */
export const PostNavigation = React.forwardRef<HTMLElement, UblPostNavigationProps>(
  (
    {
      previous,
      next,
      onNavigate,
      previousLabel = 'Post anterior',
      nextLabel = 'Próximo post',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    if (!previous && !next) {
      return null;
    }

    const classes = ['ubl-post-navigation', className].filter(Boolean).join(' ');

    return (
      <nav
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        aria-label="Navegação entre posts"
        {...restProps}
      >
        <div className="ubl-post-navigation__grid">
          {previous && (
            <NavigationCard
              direction="previous"
              label={previousLabel}
              target={previous}
              onNavigate={onNavigate}
            />
          )}
          {next && (
            <NavigationCard
              direction="next"
              label={nextLabel}
              target={next}
              onNavigate={onNavigate}
            />
          )}
        </div>
      </nav>
    );
  }
);

PostNavigation.displayName = 'PostNavigation';
