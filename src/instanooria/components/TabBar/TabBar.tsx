import React from 'react';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import type { InstaTabBarProps, InstaTabItem } from './TabBar.types';
import './TabBar.css';

/**
 * Conjunto padrão de abas reproduzindo a barra inferior do Figma:
 * Feed, Buscar, Criar, Atividade e Perfil.
 */
export const instaDefaultTabs: InstaTabItem[] = [
  { id: 'feed', label: 'Feed', icon: 'home', activeIcon: 'home' },
  { id: 'search', label: 'Buscar', icon: 'search', activeIcon: 'searchFilled' },
  { id: 'create', label: 'Criar publicação', icon: 'add', activeIcon: 'add' },
  { id: 'activity', label: 'Atividade', icon: 'heart', activeIcon: 'heartFilled' },
  { id: 'profile', label: 'Perfil' },
];

/**
 * Componente TabBar — Design System Instanooria
 *
 * Barra de navegação inferior de 79px com cinco abas de 75px de largura.
 * A aba ativa alterna para o glifo preenchido correspondente e a aba de perfil
 * renderiza o avatar do usuário com anel neutro, como no arquivo de design.
 */
export const TabBar = React.forwardRef<HTMLElement, InstaTabBarProps>(
  (
    {
      items = instaDefaultTabs,
      activeId,
      onChange,
      withHomeIndicatorInset = true,
      ariaLabel = 'Navegação principal',
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['insta-tab-bar', className].filter(Boolean).join(' ');

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-insta-theme={theme}
        className={classes}
        {...restProps}
      >
        <div className="insta-tab-bar__items" role="tablist">
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            const glyph = isActive ? item.activeIcon ?? item.icon : item.icon;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={item.label}
                className="insta-tab-bar__item"
                onClick={() => onChange?.(item.id, item, index)}
              >
                {item.avatarSrc || !glyph ? (
                  <Avatar
                    src={item.avatarSrc}
                    alt=""
                    size={23}
                    ring={isActive ? 'seen' : 'none'}
                    theme={theme}
                  />
                ) : (
                  <Icon
                    name={glyph}
                    size={24}
                    tone={isActive ? 'primary' : 'primary'}
                    theme={theme}
                  />
                )}

                {item.hasNotification && (
                  <Badge
                    variant="notification"
                    dot
                    theme={theme}
                    className="insta-tab-bar__notification"
                  />
                )}
              </button>
            );
          })}
        </div>

        {withHomeIndicatorInset && (
          <div className="insta-tab-bar__home-inset" aria-hidden="true" />
        )}
      </nav>
    );
  }
);

TabBar.displayName = 'TabBar';
