'use client';

import React, { useState, isValidElement } from 'react';
import {
  BottomBarProps,
  BottomBarItemProps,
  BottomBarActionProps,
} from './BottomBar.types';
import { Badge } from '../Badge/Badge';
import './BottomBar.css';

/**
 * Ícone padrão de Adição (+)
 */
const DefaultPlusIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="18" height="18">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * Ícone padrão de Apps (Grid 3x3)
 */
export const AppsIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18">
    <circle cx="5" cy="5" r="2" />
    <circle cx="12" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="12" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
  </svg>
);

/**
 * Ícone padrão de Menu (Hambúrguer)
 */
export const MenuIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="18" height="18">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

/**
 * Subcomponente Botão Central de Ação (`BottomBarAction`)
 */
export const BottomBarAction = React.forwardRef<HTMLButtonElement, BottomBarActionProps>(
  (
    {
      icon = <DefaultPlusIcon />,
      label = 'Ação rápida',
      variant = 'primary',
      size = 'md',
      theme = 'light',
      disabled = false,
      onClick,
      as: Component = 'button',
      href,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        type={Component === 'button' ? 'button' : undefined}
        href={href}
        className={`unooria-bottom-bar-action unooria-bottom-bar-action--${size} unooria-bottom-bar-action--${variant} ${className}`}
        style={style}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
        data-theme={theme}
        {...restProps}
      >
        <span className="unooria-bottom-bar-action__icon" aria-hidden="true">
          {icon}
        </span>
      </Component>
    );
  }
);

BottomBarAction.displayName = 'BottomBarAction';

/**
 * Subcomponente Item Individual de Navegação (`BottomBarItem`) com Tooltip a 4px
 */
export const BottomBarItem = React.forwardRef<HTMLElement, BottomBarItemProps>(
  (
    {
      id,
      label,
      icon,
      tooltip,
      badge,
      active = false,
      disabled = false,
      href,
      onClick,
      as: Component = 'button',
      theme = 'light',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(id, e);
      }
    };

    const tooltipText = tooltip || (typeof label === 'string' ? label : undefined);

    const itemClasses = [
      'unooria-bottom-bar__item',
      active ? 'unooria-bottom-bar__item--active' : '',
      disabled ? 'unooria-bottom-bar__item--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref}
        type={Component === 'button' ? 'button' : undefined}
        href={href}
        className={itemClasses}
        style={style}
        onClick={handleClick}
        disabled={disabled}
        aria-selected={active}
        role="tab"
        tabIndex={active ? 0 : -1}
        data-theme={theme}
        {...restProps}
      >
        {/* Tooltip Superior com 4px de distância conforme Figma */}
        {tooltipText && (
          <div className="unooria-bottom-bar__tooltip" role="tooltip" aria-hidden="true">
            <div className="unooria-bottom-bar__tooltip-content">{tooltipText}</div>
            <div className="unooria-bottom-bar__tooltip-arrow" />
          </div>
        )}

        <div className="unooria-bottom-bar__icon-btn">
          {icon}

          {/* Badge Acoplado */}
          {badge !== undefined && badge !== false && (
            <span style={{ position: 'absolute', top: -4, right: -4 }}>
              {typeof badge === 'boolean' ? (
                <Badge variant="error" number="off" />
              ) : (
                <Badge variant="error" number="on">
                  {badge}
                </Badge>
              )}
            </span>
          )}
        </div>
      </Component>
    );
  }
);

BottomBarItem.displayName = 'BottomBarItem';

/**
 * Componente Principal BottomBar - Design System Unooria
 */
export const BottomBar = React.forwardRef<HTMLElement, BottomBarProps>(
  (
    {
      items = [],
      activeId: controlledActiveId,
      defaultActiveId,
      onChange,
      variant = 'fixed',
      theme = 'light',
      maxWidth,
      hasSafeArea = true,
      action,
      actionPosition = 'center',
      menuMobItems = [],
      isMenuMobOpen: controlledMenuOpen,
      onMenuMobToggle,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const [uncontrolledActiveId, setUncontrolledActiveId] = useState<string>(
      defaultActiveId || (items[0]?.id ?? '')
    );
    const [internalMenuOpen, setInternalMenuOpen] = useState(false);

    const isControlled = controlledActiveId !== undefined;
    const currentActiveId = isControlled ? controlledActiveId : uncontrolledActiveId;
    const isMenuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;

    const handleItemClick = (id: string, e: React.MouseEvent<HTMLElement>) => {
      if (!isControlled) {
        setUncontrolledActiveId(id);
      }
      const clickedItem = items.find((it) => it.id === id);
      if (clickedItem?.onClick) {
        clickedItem.onClick(id, e);
      }
      if (onChange) {
        onChange(id, clickedItem);
      }
    };

    const toggleMenuMob = () => {
      const next = !isMenuOpen;
      if (onMenuMobToggle) {
        onMenuMobToggle(next);
      } else {
        setInternalMenuOpen(next);
      }
    };

    const barClasses = [
      'unooria-bottom-bar',
      `unooria-bottom-bar--variant-${variant}`,
      `unooria-bottom-bar--theme-${theme}`,
      hasSafeArea ? 'unooria-bottom-bar--safe-area' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperStyle: React.CSSProperties = {
      maxWidth: maxWidth || (variant === 'fixed' ? '100%' : 'fit-content'),
      ...style,
    };

    /**
     * O botão de ação central aceita tanto um objeto de propriedades
     * (`BottomBarActionProps`) quanto um nó React já pronto. Quando for um
     * objeto simples, delegamos a renderização ao subcomponente oficial
     * `BottomBarAction`, propagando o tema da barra.
     */
    const renderAction = (): React.ReactNode => {
      if (!action) return null;
      if (isValidElement(action)) return action;
      if (typeof action === 'object') {
        return <BottomBarAction theme={theme} {...(action as BottomBarActionProps)} />;
      }
      return action as React.ReactNode;
    };

    const actionNode = renderAction();

    // `center`: o botão é inserido no meio da lista de itens.
    // `end`: o botão é renderizado após todos os itens.
    const centerActionIndex =
      actionNode && actionPosition === 'center' ? Math.ceil(items.length / 2) : -1;

    return (
      <div className="unooria-bottom-bar-wrapper">
        <nav
          ref={ref}
          role="tablist"
          aria-label="Navegação inferior"
          className={barClasses}
          style={wrapperStyle}
          data-theme={theme}
          {...restProps}
        >
          {/* Menu-Mob Popover Flutuante */}
          {variant === 'mobile-dock' && isMenuOpen && menuMobItems.length > 0 && (
            <div className="unooria-bottom-bar__menumob-popover">
              {menuMobItems.map((menuItem) => (
                <button
                  key={menuItem.id}
                  type="button"
                  className="unooria-bottom-bar__menumob-item"
                  onClick={(e) => {
                    if (menuItem.onClick) menuItem.onClick(menuItem.id, e);
                    toggleMenuMob();
                  }}
                >
                  {menuItem.icon}
                  <span>{menuItem.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Renderização de itens fornecidos via prop items */}
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {index === centerActionIndex && actionNode}
              <BottomBarItem
                {...item}
                theme={theme}
                active={item.active ?? item.id === currentActiveId}
                onClick={handleItemClick}
              />
            </React.Fragment>
          ))}

          {/* Botão de ação central/final (prop `action`) */}
          {actionNode && (centerActionIndex >= items.length || actionPosition === 'end') && actionNode}

          {/* Botão de expansão do Menu-Mob se aplicável */}
          {variant === 'mobile-dock' && (
            <>
              <button
                type="button"
                className="unooria-bottom-bar__icon-btn"
                onClick={toggleMenuMob}
                aria-label="Abrir aplicativos"
                style={{ cursor: 'pointer', border: 'none' }}
              >
                <AppsIcon />
              </button>
              <button
                type="button"
                className="unooria-bottom-bar__icon-btn"
                onClick={toggleMenuMob}
                aria-label="Abrir menu"
                style={{ cursor: 'pointer', border: 'none' }}
              >
                <MenuIcon />
              </button>
            </>
          )}

          {children}
        </nav>
      </div>
    );
  }
);

BottomBar.displayName = 'BottomBar';
