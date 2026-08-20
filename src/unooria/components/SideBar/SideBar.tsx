'use client';

import React, { useState } from 'react';
import { SideBarProps, SideBarItemProps } from './SideBar.types';
import { Badge } from '../Badge/Badge';
import './SideBar.css';

/**
 * Ícone Apps (Grid 3x3)
 */
const AppsGridIcon: React.FC = () => (
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
 * Subcomponente Botão Individual da Sidebar (`SideBarItem` / `Button Sidebar` #21592:599)
 */
export const SideBarItem = React.forwardRef<HTMLElement, SideBarItemProps>(
  (
    {
      id,
      label,
      icon,
      badge,
      active = false,
      disabled = false,
      tooltip,
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
        onClick(e);
      }
    };

    const tooltipText = tooltip || (typeof label === 'string' ? label : undefined);

    const itemClasses = [
      'unooria-sidebar-item',
      active ? 'unooria-sidebar-item--active' : '',
      disabled ? 'unooria-sidebar-item--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref}
        id={id}
        type={Component === 'button' ? 'button' : undefined}
        className={itemClasses}
        style={style}
        onClick={handleClick}
        disabled={disabled}
        aria-label={typeof label === 'string' ? label : undefined}
        data-theme={theme}
        {...restProps}
      >
        <div className="unooria-sidebar-item__icon-wrapper">
          {icon}

          {/* Badge acoplado no canto superior direito (x: 26, y: -4) */}
          {badge !== undefined && badge !== false && (
            <span style={{ position: 'absolute', top: -4, right: -4 }}>
              {typeof badge === 'boolean' ? (
                <Badge variant="primary" number="off" />
              ) : (
                <Badge variant="primary" number="on">
                  {badge}
                </Badge>
              )}
            </span>
          )}
        </div>

        {/* Tooltip lateral a 4px de distância com seta conforme Figma */}
        {tooltipText && (
          <div className="unooria-sidebar-item__tooltip" role="tooltip" aria-hidden="true">
            <div className="unooria-sidebar-item__tooltip-arrow" />
            <div className="unooria-sidebar-item__tooltip-content">{tooltipText}</div>
          </div>
        )}
      </Component>
    );
  }
);

SideBarItem.displayName = 'SideBarItem';

/**
 * Componente Principal SideBar - Design System Unooria
 */
export const SideBar = React.forwardRef<HTMLElement, SideBarProps>(
  (
    {
      items = [],
      topItems = [],
      bottomItems = [],
      appsItems = [],
      isAppsOpen: controlledAppsOpen,
      onAppsToggle,
      showNaiAssistant = false,
      onNaiClick,
      activeId: controlledActiveId,
      defaultActiveId,
      onItemClick,
      theme = 'light',
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
    const [internalAppsOpen, setInternalAppsOpen] = useState(false);

    const isControlled = controlledActiveId !== undefined;
    const currentActiveId = isControlled ? controlledActiveId : uncontrolledActiveId;
    const isAppsPanelOpen = controlledAppsOpen !== undefined ? controlledAppsOpen : internalAppsOpen;

    const handleItemClick = (id: string, e: React.MouseEvent<HTMLElement>) => {
      if (!isControlled) {
        setUncontrolledActiveId(id);
      }
      const clicked = items.concat(topItems, bottomItems).find((it) => it.id === id);
      if (clicked?.onClick) {
        clicked.onClick(e, clicked);
      }
      if (onItemClick) {
        onItemClick(id, clicked);
      }
    };

    const toggleAppsPanel = () => {
      const next = !isAppsPanelOpen;
      if (onAppsToggle) {
        onAppsToggle(next);
      } else {
        setInternalAppsOpen(next);
      }
    };

    const sidebarClasses = [
      'unooria-sidebar',
      `unooria-sidebar--theme-${theme}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="unooria-sidebar-wrapper">
        <aside
          ref={ref}
          className={sidebarClasses}
          style={style}
          data-theme={theme}
          {...restProps}
        >
          {/* Seção Superior (ex: Botão de Apps/Iniciativas) */}
          <div className="unooria-sidebar__section">
            <SideBarItem
              id="apps-toggle"
              label="Iniciativas"
              icon={<AppsGridIcon />}
              tooltip="Iniciativas & Apps"
              onClick={toggleAppsPanel}
              active={isAppsPanelOpen}
            />
            {topItems.map((item) => (
              <SideBarItem
                key={item.id}
                {...item}
                active={item.active ?? item.id === currentActiveId}
                onClick={(e) => handleItemClick(item.id, e)}
              />
            ))}
          </div>

          {/* Seção Central de Navegação */}
          {items.length > 0 && (
            <div className="unooria-sidebar__section">
              {items.map((item) => (
                <SideBarItem
                  key={item.id}
                  {...item}
                  active={item.active ?? item.id === currentActiveId}
                  onClick={(e) => handleItemClick(item.id, e)}
                />
              ))}
            </div>
          )}

          {/* Seção Inferior */}
          {bottomItems.length > 0 && (
            <div className="unooria-sidebar__section">
              {bottomItems.map((item) => (
                <SideBarItem
                  key={item.id}
                  {...item}
                  active={item.active ?? item.id === currentActiveId}
                  onClick={(e) => handleItemClick(item.id, e)}
                />
              ))}
            </div>
          )}

          {/* Assistente NAI */}
          {showNaiAssistant && (
            <button
              type="button"
              className="unooria-sidebar__nai-widget"
              onClick={onNaiClick}
              title="Fale com a NAI"
            >
              <span>Fale comigo</span>
            </button>
          )}

          {children}
        </aside>

        {/* Painel Lateral de Aplicativos (Side Bar Apps / Variant2) */}
        {isAppsPanelOpen && appsItems.length > 0 && (
          <div className="unooria-sidebar__apps-panel">
            {appsItems.map((app) => (
              <button
                key={app.id}
                type="button"
                className="unooria-sidebar__app-btn"
                onClick={(e) => {
                  if (app.onClick) app.onClick(app.id, e);
                  toggleAppsPanel();
                }}
              >
                {app.icon}
                <span>{app.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SideBar.displayName = 'SideBar';
