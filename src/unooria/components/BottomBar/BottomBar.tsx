import React, { useState } from 'react';
import {
  BottomBarProps,
  BottomBarItemProps,
  BottomBarItemData,
  BottomBarActionProps,
} from './BottomBar.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';
import '../../tokens/blur.css';
import './BottomBar.css';

/**
 * Ícone padrão de Adição / Ação Rápida (+)
 */
const DefaultPlusIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * Subcomponente Botão Central de Ação (`BottomBarAction`)
 *
 * Utilizado para ações de alta relevância (ex: Criar Novo, Adicionar, FAB central).
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
    const actionClasses = [
      'unooria-bottom-bar-action',
      `unooria-bottom-bar-action--${size}`,
      `unooria-bottom-bar-action--variant-${variant}`,
      `unooria-bottom-bar-action--${theme}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref}
        type={Component === 'button' ? 'button' : undefined}
        href={href}
        className={actionClasses}
        style={style}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
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
 * Subcomponente Item Individual de Navegação (`BottomBarItem`)
 */
export const BottomBarItem = React.forwardRef<HTMLElement, BottomBarItemProps>(
  (
    {
      id,
      label,
      icon,
      badge,
      active = false,
      disabled = false,
      href,
      showLabel = true,
      theme = 'light',
      onClick,
      as: Component,
      ariaLabel,
      className = '',
      style,
      children,
      ...restProps
    },
    ref
  ) => {
    const isLink = Boolean(href);
    const ElementComponent = Component || (isLink ? 'a' : 'button');

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(id, e);
      }
    };

    const itemClasses = [
      'unooria-bottom-bar-item',
      active ? 'unooria-bottom-bar-item--active' : '',
      disabled ? 'unooria-bottom-bar-item--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const accessibleLabel =
      ariaLabel || (typeof label === 'string' ? label : undefined) || id;

    // Renderização inteligente de Badge
    const renderBadge = () => {
      if (badge === undefined || badge === null || badge === false) {
        return null;
      }

      if (badge === true) {
        return (
          <span
            className="unooria-bottom-bar-item__badge unooria-bottom-bar-item__badge--dot"
            aria-hidden="true"
          />
        );
      }

      return (
        <span className="unooria-bottom-bar-item__badge" aria-hidden="true">
          {badge}
        </span>
      );
    };

    return (
      <ElementComponent
        ref={ref}
        type={ElementComponent === 'button' ? 'button' : undefined}
        href={href}
        className={itemClasses}
        style={style}
        onClick={handleClick}
        disabled={disabled}
        aria-selected={active}
        aria-label={accessibleLabel}
        aria-disabled={disabled ? true : undefined}
        role="tab"
        tabIndex={disabled ? -1 : active ? 0 : -1}
        {...restProps}
      >
        {children ? (
          children
        ) : (
          <>
            <div className="unooria-bottom-bar-item__icon-wrapper">
              {icon && <span className="unooria-bottom-bar-item__icon">{icon}</span>}
              {renderBadge()}
            </div>
            {showLabel && label && (
              <span className="unooria-bottom-bar-item__label">{label}</span>
            )}
          </>
        )}
      </ElementComponent>
    );
  }
);

BottomBarItem.displayName = 'BottomBarItem';

/**
 * Componente BottomBar - Design System Plataforma Unooria
 *
 * Barra de navegação inferior essencial para aplicações web responsivas e mobile-first.
 * Suporta três variantes principais: `fixed` (ancorada), `floating` (dock flutuante) e `top-center` (com botão de ação central FAB).
 */
export const BottomBar = React.forwardRef<HTMLElement, BottomBarProps>(
  (
    {
      variant = 'fixed',
      theme = 'light',
      items,
      activeId: controlledActiveId,
      defaultActiveId,
      onChange,
      onSelect,
      centerAction,
      fixedToBottom = false,
      showLabels = true,
      safeArea = true,
      maxWidth,
      ariaLabel = 'Navegação inferior',
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    // Gerenciamento de estado de seleção (controlado vs não-controlado)
    const [internalActiveId, setInternalActiveId] = useState<string>(
      defaultActiveId || (items && items.length > 0 ? items[0].id : '')
    );

    const isControlled = controlledActiveId !== undefined;
    const currentActiveId = isControlled ? controlledActiveId : internalActiveId;

    const handleItemSelect = (id: string, e: React.MouseEvent<HTMLElement>) => {
      if (!isControlled) {
        setInternalActiveId(id);
      }
      if (onChange) {
        onChange(id);
      }
      if (onSelect) {
        onSelect(id);
      }
    };

    // Renderizador do botão central de ação
    const renderCenterAction = () => {
      if (!centerAction) {
        if (variant === 'top-center') {
          return <BottomBarAction theme={theme} />;
        }
        return null;
      }

      if (React.isValidElement(centerAction)) {
        return centerAction;
      }

      return (
        <BottomBarAction
          theme={theme}
          {...(centerAction as BottomBarActionProps)}
        />
      );
    };

    // Classes do componente
    const barClasses = [
      'unooria-bottom-bar',
      `unooria-bottom-bar--variant-${variant}`,
      `unooria-bottom-bar--${theme}`,
      safeArea ? 'unooria-bottom-bar--safe-area' : '',
      variant === 'floating' ? 'unooria-bottom-bar--floating-shape' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      'unooria-bottom-bar-wrapper',
      fixedToBottom ? 'unooria-bottom-bar-wrapper--fixed' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const containerStyle: React.CSSProperties = {
      maxWidth: maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : undefined,
      ...style,
    };

    // Divisão de itens quando há botão central na variante top-center
    const renderItemsDeclarative = (itemList: BottomBarItemData[]) => {
      const hasCenter = Boolean(centerAction || variant === 'top-center');

      if (hasCenter && itemList.length >= 2) {
        const midPoint = Math.ceil(itemList.length / 2);
        const leftItems = itemList.slice(0, midPoint);
        const rightItems = itemList.slice(midPoint);

        return (
          <div className="unooria-bottom-bar__items" role="tablist">
            <div className="unooria-bottom-bar__items-group">
              {leftItems.map((item) => (
                <BottomBarItem
                  key={item.id}
                  {...item}
                  theme={theme}
                  showLabel={showLabels}
                  active={item.active !== undefined ? item.active : currentActiveId === item.id}
                  onClick={(id, e) => {
                    if (item.onClick) item.onClick(id, e);
                    handleItemSelect(id, e);
                  }}
                />
              ))}
            </div>

            <div className="unooria-bottom-bar__center-container">
              {renderCenterAction()}
            </div>

            <div className="unooria-bottom-bar__items-group">
              {rightItems.map((item) => (
                <BottomBarItem
                  key={item.id}
                  {...item}
                  theme={theme}
                  showLabel={showLabels}
                  active={item.active !== undefined ? item.active : currentActiveId === item.id}
                  onClick={(id, e) => {
                    if (item.onClick) item.onClick(id, e);
                    handleItemSelect(id, e);
                  }}
                />
              ))}
            </div>
          </div>
        );
      }

      return (
        <div className="unooria-bottom-bar__items" role="tablist">
          {itemList.map((item) => (
            <BottomBarItem
              key={item.id}
              {...item}
              theme={theme}
              showLabel={showLabels}
              active={item.active !== undefined ? item.active : currentActiveId === item.id}
              onClick={(id, e) => {
                if (item.onClick) item.onClick(id, e);
                handleItemSelect(id, e);
              }}
            />
          ))}
          {hasCenter && (
            <div className="unooria-bottom-bar__center-container">
              {renderCenterAction()}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className={wrapperClasses}>
        <nav
          ref={ref}
          aria-label={ariaLabel}
          className={barClasses}
          style={containerStyle}
          {...restProps}
        >
          {items && items.length > 0 ? (
            renderItemsDeclarative(items)
          ) : (
            <div className="unooria-bottom-bar__items" role="tablist">
              {children}
            </div>
          )}
        </nav>
      </div>
    );
  }
);

BottomBar.displayName = 'BottomBar';
