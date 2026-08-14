import React, { createContext, useContext, useState, useEffect, useId } from 'react';
import {
  SideBarProps,
  SideBarItemProps,
  SideBarItemData,
  SideBarSectionProps,
  SideBarHeaderProps,
  SideBarFooterProps,
  SideBarTheme,
  SideBarLayout,
} from './SideBar.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';
import './SideBar.css';

/**
 * Interface do Contexto compartilhado da SideBar
 */
interface SideBarContextValue {
  isExpanded: boolean;
  toggleExpanded: () => void;
  theme: SideBarTheme;
  activeItemId?: string;
  onItemClick?: (item: SideBarItemData, e: React.MouseEvent<HTMLElement>) => void;
}

const SideBarContext = createContext<SideBarContextValue | null>(null);

/**
 * Hook para acessar as propriedades e controles da SideBar dentro de subcomponentes.
 */
export const useSideBarContext = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error('useSideBarContext deve ser utilizado dentro de um componente <SideBar>.');
  }
  return context;
};

/**
 * Ícone padrão de recolhimento / alternância (Chevron)
 */
const DefaultChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/**
 * Ícone de fallback para logo da marca
 */
const DefaultBrandIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

/**
 * Utilitário: Iniciais do nome do usuário para o avatar
 */
const getUserInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

/* ==========================================================================
   Subcomponente: SideBarItem
   ========================================================================== */

/**
 * Item individual de navegação da SideBar.
 * Suporta ícone, rótulo, contadores numéricos (badge), estados hover/active/disabled,
 * renderização polimórfica e tooltip flutuante acessível no modo colapsado.
 */
export const SideBarItem = React.forwardRef<HTMLElement, SideBarItemProps>(
  (
    {
      id,
      label,
      icon,
      badge,
      badgeVariant = 'default',
      active,
      disabled = false,
      isCollapsed: propIsCollapsed,
      onClick,
      href,
      target,
      tooltip,
      as,
      theme: propTheme,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const context = useContext(SideBarContext);

    // Resolução do estado colapsado (prop direta tem precedência sobre o context)
    const isCollapsed = propIsCollapsed !== undefined ? propIsCollapsed : (context ? !context.isExpanded : false);
    const resolvedTheme = propTheme || (context ? context.theme : 'light');

    // Resolução do estado ativo
    const isItemActive = active !== undefined ? active : (id && context?.activeItemId === id);

    // Elemento HTML / componente polimórfico
    const Component = as || (href ? 'a' : 'button');
    const isNativeButton = Component === 'button';

    const itemLabel = label || children;
    const tooltipText = tooltip || (typeof itemLabel === 'string' ? itemLabel : undefined);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (onClick) {
        onClick(e);
      }

      if (context?.onItemClick && id) {
        context.onItemClick(
          {
            id,
            label: itemLabel,
            icon,
            badge,
            badgeVariant,
            active: isItemActive,
            disabled,
            href,
            target,
            tooltip,
          },
          e
        );
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;
      if (!isNativeButton && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleClick(e as unknown as React.MouseEvent<HTMLElement>);
      }
      if (restProps.onKeyDown) {
        restProps.onKeyDown(e as any);
      }
    };

    const itemClasses = [
      'unooria-sidebar__item',
      isItemActive ? 'unooria-sidebar__item--active' : '',
      disabled ? 'unooria-sidebar__item--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as any}
        type={isNativeButton ? 'button' : undefined}
        role={!isNativeButton && !href ? 'button' : undefined}
        href={href}
        target={target}
        disabled={isNativeButton ? disabled : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        aria-current={isItemActive ? 'page' : undefined}
        tabIndex={disabled ? -1 : 0}
        data-theme={resolvedTheme}
        data-active={isItemActive}
        className={itemClasses}
        style={style}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {/* Ícone do item */}
        {icon && (
          <span className="unooria-sidebar__item-icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Rótulo textual do item (visível no modo expandido) */}
        {!isCollapsed && itemLabel && (
          <span className="unooria-sidebar__item-label">{itemLabel}</span>
        )}

        {/* Badge / Contador numérico */}
        {badge !== undefined && badge !== null && (
          <span
            className={`unooria-sidebar__item-badge unooria-sidebar__item-badge--${badgeVariant}`}
            aria-label={`Notificação: ${badge}`}
          >
            {badge}
          </span>
        )}

        {/* Tooltip flutuante exibido no hover durante o modo colapsado */}
        {isCollapsed && tooltipText && (
          <span className="unooria-sidebar__tooltip" role="tooltip">
            {tooltipText}
            {badge !== undefined && badge !== null && ` (${badge})`}
          </span>
        )}
      </Component>
    );
  }
);

SideBarItem.displayName = 'SideBarItem';

/* ==========================================================================
   Subcomponente: SideBarSection
   ========================================================================== */

/**
 * Seção de agrupamento de itens da SideBar com título em uppercase e suporte a separador.
 */
export const SideBarSection = React.forwardRef<HTMLDivElement, SideBarSectionProps>(
  (
    {
      id,
      title,
      items,
      collapsible = false,
      defaultCollapsed = false,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const generatedId = useId();
    const sectionId = id || generatedId;
    const titleId = `${sectionId}-title`;

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={title ? titleId : undefined}
        className={`unooria-sidebar__section ${className}`.trim()}
        style={style}
        {...restProps}
      >
        {/* Cabeçalho da seção */}
        {title && (
          <div className="unooria-sidebar__section-header">
            <span id={titleId} className="unooria-sidebar__section-title">
              {title}
            </span>
          </div>
        )}

        {/* Divisor visível no modo colapsado */}
        <div className="unooria-sidebar__section-divider" aria-hidden="true" />

        {/* Itens declarativos ou filhos diretos */}
        <div className="unooria-sidebar__section-items">
          {items && items.length > 0
            ? items.map((item) => <SideBarItem key={item.id} {...item} />)
            : children}
        </div>
      </div>
    );
  }
);

SideBarSection.displayName = 'SideBarSection';

/* ==========================================================================
   Subcomponente: SideBarHeader
   ========================================================================== */

/**
 * Cabeçalho da SideBar com suporte a logo, título de marca, perfil de usuário e botão de alternância.
 */
export const SideBarHeader = React.forwardRef<HTMLDivElement, SideBarHeaderProps>(
  (
    {
      logo,
      title,
      subtitle,
      user,
      showToggleButton = true,
      toggleButton,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const context = useContext(SideBarContext);
    const isExpanded = context ? context.isExpanded : true;
    const toggleExpanded = context ? context.toggleExpanded : () => {};

    return (
      <div
        ref={ref}
        className={`unooria-sidebar__header ${className}`.trim()}
        style={style}
        {...restProps}
      >
        {children ? (
          children
        ) : (
          <>
            {user ? (
              <div
                className="unooria-sidebar__user"
                onClick={user.onClick}
                role={user.onClick ? 'button' : undefined}
                tabIndex={user.onClick ? 0 : undefined}
                title={user.name}
              >
                <div className="unooria-sidebar__user-avatar">
                  {typeof user.avatar === 'string' ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : user.avatar ? (
                    user.avatar
                  ) : (
                    getUserInitials(user.name)
                  )}
                </div>

                <div className="unooria-sidebar__user-info">
                  <span className="unooria-sidebar__user-name">{user.name}</span>
                  {(user.role || user.email) && (
                    <span className="unooria-sidebar__user-role">
                      {user.role || user.email}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="unooria-sidebar__brand">
                <div className="unooria-sidebar__logo">
                  {logo || <DefaultBrandIcon />}
                </div>

                {title && (
                  <div className="unooria-sidebar__brand-text">
                    <span className="unooria-sidebar__brand-title">{title}</span>
                    {subtitle && (
                      <span className="unooria-sidebar__brand-subtitle">{subtitle}</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {showToggleButton && (
              toggleButton || (
                <button
                  type="button"
                  className="unooria-sidebar__toggle-btn"
                  onClick={toggleExpanded}
                  aria-label={isExpanded ? 'Recolher menu lateral' : 'Expandir menu lateral'}
                  aria-expanded={isExpanded}
                  title={isExpanded ? 'Recolher' : 'Expandir'}
                >
                  <DefaultChevronIcon className="unooria-sidebar__toggle-icon" />
                </button>
              )
            )}
          </>
        )}
      </div>
    );
  }
);

SideBarHeader.displayName = 'SideBarHeader';

/* ==========================================================================
   Subcomponente: SideBarFooter
   ========================================================================== */

/**
 * Rodapé da SideBar com suporte a ações, perfil do usuário e botão de alternância.
 */
export const SideBarFooter = React.forwardRef<HTMLDivElement, SideBarFooterProps>(
  (
    {
      actions,
      user,
      showToggleButton = false,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const context = useContext(SideBarContext);
    const isExpanded = context ? context.isExpanded : true;
    const toggleExpanded = context ? context.toggleExpanded : () => {};

    return (
      <div
        ref={ref}
        className={`unooria-sidebar__footer ${className}`.trim()}
        style={style}
        {...restProps}
      >
        {children ? (
          children
        ) : (
          <>
            {user && (
              <div
                className="unooria-sidebar__user"
                onClick={user.onClick}
                role={user.onClick ? 'button' : undefined}
                tabIndex={user.onClick ? 0 : undefined}
                title={user.name}
              >
                <div className="unooria-sidebar__user-avatar">
                  {typeof user.avatar === 'string' ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : user.avatar ? (
                    user.avatar
                  ) : (
                    getUserInitials(user.name)
                  )}
                </div>

                <div className="unooria-sidebar__user-info">
                  <span className="unooria-sidebar__user-name">{user.name}</span>
                  {(user.role || user.email) && (
                    <span className="unooria-sidebar__user-role">
                      {user.role || user.email}
                    </span>
                  )}
                </div>
              </div>
            )}

            {actions && <div className="unooria-sidebar__actions">{actions}</div>}

            {showToggleButton && (
              <button
                type="button"
                className="unooria-sidebar__toggle-btn"
                onClick={toggleExpanded}
                aria-label={isExpanded ? 'Recolher menu lateral' : 'Expandir menu lateral'}
                aria-expanded={isExpanded}
              >
                <DefaultChevronIcon className="unooria-sidebar__toggle-icon" />
              </button>
            )}
          </>
        )}
      </div>
    );
  }
);

SideBarFooter.displayName = 'SideBarFooter';

/* ==========================================================================
   Componente Principal: SideBar
   ========================================================================== */

/**
 * Componente SideBar da Plataforma Unooria (Padrão Ouro).
 * 
 * Barra lateral de navegação expansível/recolhível de nível profissional.
 * Totalmente compatível com temas Claro (Light) e Escuro (Dark), controle
 * de estado controlado ou não-controlado, especificações do Figma,
 * acessibilidade WAI-ARIA e composição flexível via subcomponentes ou props declarativas.
 */
export const SideBar = React.forwardRef<HTMLElement, SideBarProps>(
  (
    {
      isExpanded: controlledExpanded,
      defaultExpanded = true,
      onToggleExpanded,
      layout,
      onLayoutChange,
      theme = 'light',
      width = 232,
      collapsedWidth = 44,
      sections,
      items,
      activeItemId,
      onItemClick,
      header,
      footer,
      collapsible = true,
      showToggleButton = true,
      toggleButtonPosition = 'header',
      ariaLabel = 'Navegação Principal',
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    // Modo não-controlado com estado interno
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState<boolean>(
      layout ? layout === 'expanded' : defaultExpanded
    );

    // Resolução de modo controlado vs não-controlado
    const isControlled = controlledExpanded !== undefined || layout !== undefined;
    const isExpanded = isControlled
      ? layout !== undefined
        ? layout === 'expanded'
        : Boolean(controlledExpanded)
      : uncontrolledExpanded;

    // Sincronização de layout caso a prop mude externamente
    useEffect(() => {
      if (layout !== undefined) {
        setUncontrolledExpanded(layout === 'expanded');
      } else if (controlledExpanded !== undefined) {
        setUncontrolledExpanded(controlledExpanded);
      }
    }, [layout, controlledExpanded]);

    // Função de alternância
    const handleToggle = () => {
      if (!collapsible) return;
      const nextExpanded = !isExpanded;
      const nextLayout: SideBarLayout = nextExpanded ? 'expanded' : 'collapsed';

      if (!isControlled) {
        setUncontrolledExpanded(nextExpanded);
      }

      if (onToggleExpanded) {
        onToggleExpanded(nextExpanded);
      }

      if (onLayoutChange) {
        onLayoutChange(nextLayout);
      }
    };

    // Estilos inline de dimensionamento
    const widthStyle: React.CSSProperties = {
      ...(typeof width === 'number'
        ? { '--unooria-sidebar-width-expanded': `${width}px` }
        : { '--unooria-sidebar-width-expanded': width }),
      ...(typeof collapsedWidth === 'number'
        ? { '--unooria-sidebar-width-collapsed': `${collapsedWidth}px` }
        : { '--unooria-sidebar-width-collapsed': collapsedWidth }),
      ...style,
    } as React.CSSProperties;

    const sidebarClasses = [
      'unooria-sidebar',
      isExpanded ? 'unooria-sidebar--expanded' : 'unooria-sidebar--collapsed',
      `unooria-sidebar--${theme}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const contextValue: SideBarContextValue = {
      isExpanded,
      toggleExpanded: handleToggle,
      theme,
      activeItemId,
      onItemClick,
    };

    return (
      <SideBarContext.Provider value={contextValue}>
        <aside
          ref={ref}
          role="navigation"
          aria-label={ariaLabel}
          data-theme={theme}
          data-collapsed={!isExpanded}
          className={sidebarClasses}
          style={widthStyle}
          {...restProps}
        >
          {/* Botão de alternância flutuante */}
          {collapsible && showToggleButton && toggleButtonPosition === 'floating' && (
            <button
              type="button"
              className="unooria-sidebar__floating-toggle"
              onClick={handleToggle}
              aria-label={isExpanded ? 'Recolher menu lateral' : 'Expandir menu lateral'}
              aria-expanded={isExpanded}
              title={isExpanded ? 'Recolher' : 'Expandir'}
            >
              <DefaultChevronIcon className="unooria-sidebar__toggle-icon" />
            </button>
          )}

          {/* Cabeçalho */}
          {header && header}

          {/* Corpo com scroll dos itens */}
          <nav className="unooria-sidebar__nav" aria-label={ariaLabel}>
            {/* Seções declarativas */}
            {sections && sections.length > 0
              ? sections.map((section, idx) => (
                  <SideBarSection key={section.id || `section-${idx}`} {...section} />
                ))
              : null}

            {/* Itens declarativos diretos */}
            {items && items.length > 0 ? (
              <div className="unooria-sidebar__section-items">
                {items.map((item) => (
                  <SideBarItem key={item.id} {...item} />
                ))}
              </div>
            ) : null}

            {/* Filhos compostos */}
            {children}
          </nav>

          {/* Rodapé */}
          {footer && footer}
        </aside>
      </SideBarContext.Provider>
    );
  }
);

SideBar.displayName = 'SideBar';
