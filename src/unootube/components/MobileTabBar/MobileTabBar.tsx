import React from 'react';
import { Icon } from '../Icon';
import type {
  UniMobileTabBarCreateProps,
  UniMobileTabBarItemProps,
  UniMobileTabBarProps,
} from './MobileTabBar.types';
import './MobileTabBar.css';

/**
 * Um destino da barra de abas: glifo com rótulo abaixo.
 */
const MobileTabBarItem = React.forwardRef<HTMLElement, UniMobileTabBarItemProps>(
  ({ icon, label, active = false, href, className = '', ...restProps }, ref) => {
    const classes = [
      'uni-mobile-tabbar__item',
      active ? 'uni-mobile-tabbar__item--active' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const body = (
      <>
        <span className="uni-mobile-tabbar__glyph">{icon}</span>
        <span className="uni-mobile-tabbar__label">{label}</span>
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={href}
          aria-current={active ? 'page' : undefined}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {body}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        aria-current={active ? 'page' : undefined}
        {...restProps}
      >
        {body}
      </button>
    );
  }
);

MobileTabBarItem.displayName = 'MobileTabBar.Item';

/**
 * Botão central de criação.
 *
 * É o único alvo da barra **sem rótulo** e com geometria própria: um círculo
 * vazado de 42px com um mais dentro (node `1:243`). O glifo é distinto do
 * `create` do arquivo original, que desenha um retângulo de câmera — por isso
 * entrou no registro como `createCircle`.
 */
const MobileTabBarCreateButton = React.forwardRef<HTMLButtonElement, UniMobileTabBarCreateProps>(
  ({ className = '', 'aria-label': ariaLabel = 'Criar', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['uni-mobile-tabbar__create', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      {...restProps}
    >
      <Icon name="createCircle" size={35} />
    </button>
  )
);

MobileTabBarCreateButton.displayName = 'MobileTabBar.CreateButton';

/**
 * Componente MobileTabBar — Design System Unootube
 *
 * Reproduz a barra de abas das telas móveis do arquivo "Free YouTube Shorts
 * Mockups (Community)" (`1:235`, iPhone; `16:1055`, Android): cinco destinos
 * com o botão de criação no centro.
 *
 * O arquivo agrupa os três primeiros destinos com 34px entre eles e afasta os
 * dois últimos com 24px — um espaçamento irregular herdado do posicionamento
 * absoluto. A barra distribui os cinco alvos uniformemente, desvio registrado
 * na estória, porque a régua do arquivo não sobrevive a uma janela de largura
 * diferente da do quadro.
 */
const MobileTabBarRoot = React.forwardRef<HTMLElement, UniMobileTabBarProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <nav
      ref={ref}
      className={['uni-mobile-tabbar', className].filter(Boolean).join(' ')}
      aria-label="Navegação principal"
      {...restProps}
    >
      {children}
    </nav>
  )
);

MobileTabBarRoot.displayName = 'MobileTabBar';

/**
 * Barra de abas móvel, com os subcomponentes `Item` e `CreateButton`.
 */
export const MobileTabBar = Object.assign(MobileTabBarRoot, {
  Item: MobileTabBarItem,
  CreateButton: MobileTabBarCreateButton,
});
