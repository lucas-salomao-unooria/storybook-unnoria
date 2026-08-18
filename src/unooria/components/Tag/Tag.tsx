import React, { forwardRef } from 'react';
import { TagProps } from './Tag.types';
import { Icon } from '../Icon/Icon';
import './Tag.css';

/**
 * Componente oficial de Tag / Etiquetas do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6029:1817 / Component Set 6029:1994)
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      pill = false,
      leftIcon,
      rightIcon,
      dismissible = false,
      onDismiss,
      selected = false,
      disabled = false,
      clickable = false,
      theme = 'light',
      children,
      className = '',
      onClick,
      style,
      ...rest
    },
    ref
  ) => {
    const isClickable = clickable || !!onClick;

    const variantClass = `unooria-tag--${variant}`;
    const sizeClass = `unooria-tag--${size}`;
    const pillClass = pill ? 'unooria-tag--pill' : '';
    const clickableClass = isClickable ? 'unooria-tag--clickable' : '';
    const selectedClass = selected ? 'unooria-tag--selected' : '';
    const disabledClass = disabled ? 'unooria-tag--disabled' : '';
    const themeClass = theme === 'dark' ? 'unooria-tag--theme-dark' : '';

    const combinedClassName = [
      'unooria-tag',
      variantClass,
      sizeClass,
      pillClass,
      clickableClass,
      selectedClass,
      disabledClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;
      if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        (onClick as any)?.(event);
      }
    };

    const renderIcon = (iconProp: string | React.ReactNode) => {
      if (typeof iconProp === 'string') {
        return (
          <span className="unooria-tag__icon">
            <Icon name={iconProp} size="xs" color="currentColor" />
          </span>
        );
      }
      return <span className="unooria-tag__icon">{iconProp}</span>;
    };

    return (
      <span
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        aria-disabled={disabled || undefined}
        aria-pressed={isClickable && selected ? true : undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        className={combinedClassName}
        style={style}
        {...rest}
      >
        {leftIcon && renderIcon(leftIcon)}
        <span className="unooria-tag__label">{children}</span>
        {rightIcon && !dismissible && renderIcon(rightIcon)}
        {dismissible && (
          <button
            type="button"
            aria-label="Remover etiqueta"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.(e);
            }}
            className="unooria-tag__dismiss-btn"
          >
            <Icon name="close" size="xs" color="currentColor" />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
