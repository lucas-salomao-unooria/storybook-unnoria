import React, { forwardRef, useContext } from 'react';
import { TabProps } from './Tab.types';
import { Icon } from '../Icon/Icon';
import './Tab.css';

// Contexto interno das abas
export interface TabsContextType {
  activeValue?: string | number;
  setActiveValue: (value: string | number) => void;
  variant?: 'line' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  theme?: 'light' | 'dark';
}

export const TabsContext = React.createContext<TabsContextType | null>(null);

/**
 * Subcomponente individual Tab (Botão de Aba)
 * Plataforma Unooria - Extraído do Figma (Node 12694:10195)
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      value,
      label,
      icon = 'add',
      showIcon = true,
      badge,
      showBadge = true,
      disabled = false,
      children,
      className = '',
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    const context = useContext(TabsContext);

    const isSelected = context ? context.activeValue === value : false;
    const isFullWidth = context?.fullWidth;

    const statusClass = isSelected ? 'unooria-tab--selected' : 'unooria-tab--default';
    const fullWidthClass = isFullWidth ? 'unooria-tab--full-width' : '';
    const disabledClass = disabled ? 'unooria-tab--disabled' : '';

    const combinedClassName = [
      'unooria-tab',
      statusClass,
      fullWidthClass,
      disabledClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      context?.setActiveValue(value);
      onClick?.(e);
    };

    const iconSize = context?.size === 'sm' ? 'xs' : context?.size === 'lg' ? 'm' : 's';

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        className={combinedClassName}
        style={style}
        {...rest}
      >
        {/* Ícone */}
        {showIcon && icon && (
          <span className="unooria-tab__icon">
            <Icon name={icon} size={iconSize} color="currentColor" />
          </span>
        )}

        {/* Rótulo Textual */}
        <span>{children || label}</span>

        {/* Badge / Contador */}
        {showBadge && badge !== undefined && badge !== null && (
          <span className="unooria-tab__badge">{badge}</span>
        )}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

export default Tab;
