import React from 'react';
import { BadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente Badge - Design System Plataforma Unooria
 * 
 * O Badge é um elemento visual compacto utilizado para destacar status, contagens,
 * categorias e etiquetas em interfaces web. Suporta variadas cores de contexto,
 * temas Claro e Escuro, tamanhos responsivos e estados interativos.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant,
  status,
  size = 'md',
  theme = 'light',
  icon,
  iconPosition = 'left',
  dot = false,
  pill = true,
  disabled = false,
  children,
  className = '',
  style,
  onClick,
  dismissible = false,
  onClose,
  ...restProps
}) => {
  // Resolve a variante visual final (prioridade para variant, fallback status ou 'default')
  const activeVariant = variant || status || 'default';

  // Classes dinâmicas do BEM
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
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <span
      className={badgeClasses}
      style={style}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
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

      {/* Botão de Fechamento (X) */}
      {dismissible && (
        <button
          type="button"
          className="unooria-badge__close-btn"
          onClick={handleClose}
          aria-label="Fechar ou remover badge"
          tabIndex={disabled ? -1 : 0}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4l8 8M16 4l-8 8" transform="translate(-2, -2)" />
          </svg>
        </button>
      )}
    </span>
  );
};

Badge.displayName = 'Badge';
