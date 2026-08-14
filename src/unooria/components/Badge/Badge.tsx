import React from 'react';
import { BadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge - Design System Plataforma Unooria
 * 
 * Elemento compacto e semântico para exibição de status, contagens numéricas,
 * categorias e etiquetas. Totalmente acessível, com suporte a temas Claro e Escuro,
 * prop polimórfica `as`, variantes de cores do Figma e botão dispensável.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      as: Component = 'span',
      variant,
      status,
      size = 'md',
      theme = 'light',
      icon,
      iconPosition = 'left',
      dot = false,
      pill = true,
      disabled = false,
      dismissible = false,
      onClose,
      children,
      className = '',
      style,
      onClick,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    // Resolução da variante ativa (variant tem precedência sobre status; default é fallback)
    const activeVariant = variant || status || 'default';

    // Determina se o badge é interativo (possui onClick e não está desabilitado)
    const isInteractive = Boolean(onClick) && !disabled;

    const badgeClasses = [
      'unooria-badge',
      `unooria-badge--size-${size}`,
      `unooria-badge--variant-${activeVariant}`,
      `unooria-badge--${theme}`,
      pill ? 'unooria-badge--pill' : 'unooria-badge--square',
      isInteractive ? 'unooria-badge--interactive' : '',
      disabled ? 'unooria-badge--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled && onClose) {
        onClose(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (isInteractive && !disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        if (onClick) {
          onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
        }
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <Component
        ref={ref}
        data-theme={theme}
        className={badgeClasses}
        style={style}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled ? true : undefined}
        role={isInteractive ? (restProps.role || 'button') : restProps.role}
        tabIndex={isInteractive && !disabled ? (restProps.tabIndex ?? 0) : restProps.tabIndex}
        {...restProps}
      >
        {/* Ponto indicador de status (dot) */}
        {dot && <span className="unooria-badge__dot" aria-hidden="true" />}

        {/* Ícone posicionado à esquerda */}
        {icon && iconPosition === 'left' && (
          <span className="unooria-badge__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Conteúdo principal / rótulo */}
        {children && <span className="unooria-badge__content">{children}</span>}

        {/* Ícone posicionado à direita */}
        {icon && iconPosition === 'right' && (
          <span className="unooria-badge__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Botão de Fechamento / Remover (X) */}
        {dismissible && (
          <button
            type="button"
            className="unooria-badge__close-btn"
            onClick={handleClose}
            aria-label="Remover etiqueta"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </Component>
    );
  }
);

Badge.displayName = 'Badge';
