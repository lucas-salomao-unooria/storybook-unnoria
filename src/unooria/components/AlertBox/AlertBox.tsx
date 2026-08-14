import React, { useState } from 'react';
import { AlertBoxProps, AlertBoxVariant } from './AlertBox.types';
import './AlertBox.css';

/**
 * Ícone SVG para a variante 'info'
 */
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

/**
 * Ícone SVG para a variante 'success'
 */
const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/**
 * Ícone SVG para a variante 'warning'
 */
const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/**
 * Ícone SVG para a variante 'error'
 */
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

/**
 * Ícone SVG para o botão de fechar (CloseIcon)
 */
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Retorna o ícone padrão para cada variante de severidade
 */
function getDefaultIcon(variant: AlertBoxVariant) {
  switch (variant) {
    case 'success':
      return <SuccessIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'info':
    default:
      return <InfoIcon />;
  }
}

/**
 * Componente AlertBox - Design System Unooria
 *
 * Exibe mensagens informativas, de confirmação/sucesso, aviso preventivo ou falhas críticas
 * de forma acessível, responsiva e alinhada às diretrizes de design do Figma.
 */
export const AlertBox = React.forwardRef<HTMLDivElement, AlertBoxProps>(
  (
    {
      variant = 'info',
      title,
      description,
      children,
      icon = true,
      isDismissible = false,
      onClose,
      action,
      actions,
      actionButton,
      bordered = true,
      theme = 'light',
      className = '',
      style,
      role,
      'aria-label': ariaLabel,
      'aria-live': ariaLive = 'polite',
      ...restProps
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return null;
    }

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      setVisible(false);
      if (onClose) {
        onClose(e);
      }
    };

    // Determina o ícone a ser renderizado
    let renderedIcon: React.ReactNode = null;
    if (icon === true) {
      renderedIcon = getDefaultIcon(variant);
    } else if (icon !== false && icon !== null && icon !== undefined) {
      renderedIcon = icon;
    }

    const hasBody = description || children;
    const actionContent = action || actions || actionButton;

    // Acessibilidade semântica: erros e avisos recebem role 'alert', informativos e sucessos 'status'
    const computedRole = role || (variant === 'error' || variant === 'warning' ? 'alert' : 'status');
    const computedAriaLabel = ariaLabel || (typeof title === 'string' ? title : `Alerta ${variant}`);

    const alertClasses = [
      'unooria-alertbox',
      `unooria-alertbox--${variant}`,
      `unooria-alertbox--${theme}`,
      bordered ? 'unooria-alertbox--bordered' : 'unooria-alertbox--borderless',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={computedRole}
        aria-live={ariaLive}
        aria-atomic="true"
        aria-label={computedAriaLabel}
        data-theme={theme}
        className={alertClasses}
        style={style}
        {...restProps}
      >
        {/* Ícone de Severidade */}
        {renderedIcon && (
          <div className="unooria-alertbox__icon" aria-hidden="true">
            {renderedIcon}
          </div>
        )}

        {/* Conteúdo Principal (Título, Descrição / Children, Ações) */}
        <div className="unooria-alertbox__body">
          {title && <div className="unooria-alertbox__title">{title}</div>}

          {hasBody && (
            <div className="unooria-alertbox__description">
              {description}
              {children}
            </div>
          )}

          {actionContent && (
            <div className="unooria-alertbox__actions">
              {actionContent}
            </div>
          )}
        </div>

        {/* Botão Dispensável / Fechar */}
        {isDismissible && (
          <button
            type="button"
            className="unooria-alertbox__close-btn"
            onClick={handleClose}
            aria-label="Fechar alerta"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

AlertBox.displayName = 'AlertBox';
