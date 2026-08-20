import React from 'react';
import { Icon } from '../Icon';
import type { TikCreateButtonProps, TikTabBarItemProps, TikTabBarProps } from './TabBar.types';
import './TabBar.css';

/**
 * Item da barra de abas — glifo de 20px sobre rótulo de 10px.
 *
 * O arquivo mantém o rótulo inativo a 80% de opacidade e em peso Regular; o
 * ativo perde a atenuação e passa a Semibold.
 */
const TabBarItem = React.forwardRef<HTMLButtonElement, TikTabBarItemProps>(
  ({ label, icon, activeIcon, active = false, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      className={[
        'tik-tabbar__item',
        active ? 'tik-tabbar__item--active' : 'tik-tabbar__item--inactive',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      <Icon name={active && activeIcon ? activeIcon : icon} size="md" tone="inherit" />
      <span className="tik-tabbar__label">{label}</span>
    </button>
  )
);

TabBarItem.displayName = 'TabBar.Item';

/**
 * Botão de criação de 43×28 — três lóbulos arredondados de 36×28 sobrepostos.
 *
 * O lóbulo ciano fica à esquerda (x=0), o rosa à direita (x=7) e o miolo ao
 * centro (x=4), exatamente como no grupo "Button Shape" do arquivo.
 */
const CreateButton = React.forwardRef<HTMLButtonElement, TikCreateButtonProps>(
  ({ surface = 'chrome', label = 'Criar', className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['tik-createbutton', `tik-createbutton--${surface}`, className]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
      {...restProps}
    >
      <span className="tik-createbutton__lobe tik-createbutton__lobe--cyan" aria-hidden />
      <span className="tik-createbutton__lobe tik-createbutton__lobe--pink" aria-hidden />
      <span className="tik-createbutton__core" aria-hidden>
        <Icon name="plus" size={13} tone="inherit" />
      </span>
    </button>
  )
);

CreateButton.displayName = 'TabBar.CreateButton';

/**
 * Componente TabBar — Design System Tik Tooria
 *
 * Barra de abas de 414×83 com cinco posições: Home, Discover, o botão de
 * criação, Inbox e Me (nodes 4:428 e 4:1097). Os 83px incluem os 35px do
 * indicador de home, motivo pelo qual o conteúdo se alinha ao topo da barra.
 *
 * O fio superior é uma sombra de raio 0, não uma borda — o arquivo é plano.
 */
const TabBarRoot = React.forwardRef<HTMLElement, TikTabBarProps>(
  ({ surface = 'chrome', className = '', children, ...restProps }, ref) => (
    <nav
      ref={ref}
      role="tablist"
      className={['tik-tabbar', `tik-tabbar--${surface}`, className].filter(Boolean).join(' ')}
      data-tik-surface={surface}
      {...restProps}
    >
      {children}
    </nav>
  )
);

TabBarRoot.displayName = 'TabBar';

/**
 * Barra de abas com os subcomponentes `TabBar.Item` e `TabBar.CreateButton`.
 */
export const TabBar = Object.assign(TabBarRoot, {
  Item: TabBarItem,
  CreateButton,
});
