'use client';

import React from 'react';
import { BadgeProps, BadgeVariant } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge - Design System Plataforma Unooria
 *
 * Implementação fiel ao Figma (Node #17265:3692 / Component Set #5920:3299).
 * Indicador de contagem numérica, status de notificação e rótulo semântico.
 * Suporta modo Pílula (Number=On) e modo Dot circular de 8x8px (Number=Off).
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      as: Component = 'span',
      variant = 'info',
      status,
      number,
      count,
      overflowCount = 99,
      size = 'sm',
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
    }: BadgeProps,
    ref
  ) => {
    // Resolução da variante ativa (variant ou status)
    const rawVariant = (variant || status || 'info').toLowerCase() as BadgeVariant;
    const activeVariant = rawVariant === 'sucess' ? 'success' : rawVariant === 'disabled' ? 'disable' : rawVariant;

    // Determina se o modo é estritamente Dot de 8x8px (Number=Off)
    const isDotOnly = number === 'off' || size === 'dot' || (dot && !children && count === undefined);

    // Determina se o badge é interativo
    const isInteractive = Boolean(onClick) && !disabled && activeVariant !== 'disable';

    // Formatação do conteúdo caso count seja informado
    let displayContent = children;
    if (count !== undefined) {
      if (count > overflowCount) {
        displayContent = `${overflowCount}+`;
      } else {
        displayContent = count;
      }
    }

    const badgeClasses = [
      'unooria-badge',
      `unooria-badge--variant-${activeVariant}`,
      isDotOnly ? 'unooria-badge--dot-only' : `unooria-badge--size-${size}`,
      `unooria-badge--${theme}`,
      pill ? 'unooria-badge--pill' : 'unooria-badge--square',
      isInteractive ? 'unooria-badge--interactive' : '',
      disabled || activeVariant === 'disable' ? 'unooria-badge--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled && activeVariant !== 'disable' && onClose) {
        onClose(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        if (onClick) {
          onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
        }
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    // Renderização do modo Dot Puro de 8x8px (Figma: Number=Off)
    if (isDotOnly) {
      return (
        <Component
          ref={ref}
          data-theme={theme}
          className={badgeClasses}
          style={style}
          aria-hidden="true"
          {...restProps}
        />
      );
    }

    return (
      <Component
        ref={ref}
        data-theme={theme}
        className={badgeClasses}
        style={style}
        onClick={disabled || activeVariant === 'disable' ? undefined : onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled || activeVariant === 'disable' ? true : undefined}
        role={isInteractive ? (restProps.role || 'button') : restProps.role}
        tabIndex={isInteractive ? (restProps.tabIndex ?? 0) : restProps.tabIndex}
        {...restProps}
      >
        {/* Ponto indicador de status embutido antecedendo o texto */}
        {dot && <span className="unooria-badge__dot" aria-hidden="true" />}

        {/* Ícone à esquerda */}
        {icon && iconPosition === 'left' && (
          <span className="unooria-badge__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Conteúdo principal / rótulo / contagem */}
        {displayContent !== undefined && (
          <span className="unooria-badge__content">{displayContent}</span>
        )}

        {/* Ícone à direita */}
        {icon && iconPosition === 'right' && (
          <span className="unooria-badge__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Botão de Fechar / Remover */}
        {dismissible && (
          <button
            type="button"
            className="unooria-badge__close-btn"
            onClick={handleClose}
            aria-label="Remover etiqueta"
            tabIndex={disabled || activeVariant === 'disable' ? -1 : 0}
            disabled={disabled || activeVariant === 'disable'}
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
