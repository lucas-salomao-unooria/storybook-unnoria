import React, { useState } from 'react';
import { FeedbackAlertProps, FeedbackAlertType } from './FeedbackAlert.types';
import './FeedbackAlert.css';

/**
 * Ícone SVG para a variante 'info' (24x24)
 */
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
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
 * Ícone SVG para a variante 'success' (24x24)
 */
const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
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
 * Ícone SVG para a variante 'warning' (24x24)
 */
const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
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
 * Ícone SVG para a variante 'error' (24x24)
 */
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
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
 * Ícone SVG para o botão de fechar / dispensar (CloseIcon)
 */
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="18"
    height="18"
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
 * Retorna o ícone SVG nativo correspondente à variante do Figma
 */
function getDefaultIcon(type: FeedbackAlertType) {
  switch (type) {
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'success':
      return <SuccessIcon />;
    case 'info':
    default:
      return <InfoIcon />;
  }
}

/**
 * Componente FeedbackAlert - Design System Plataforma Unooria
 * 
 * Implementação fiel ao Figma Nó #24190:87.
 * Apresenta mensagens de status, notificações contextuais e avisos de sistema
 * com cantos de 16px, padding de 24px, gap de 16px e fundos translúcidos semânticos.
 */
export const FeedbackAlert = React.forwardRef<HTMLDivElement, FeedbackAlertProps>(
  (
    {
      type,
      severity,
      title,
      description,
      subtle,
      children,
      theme = 'light',
      dismissible = false,
      isDismissible,
      onDismiss,
      onClose,
      icon = true,
      action,
      className = '',
      style,
      role = 'alert',
      'aria-live': ariaLive,
      'aria-label': ariaLabel,
      ...restProps
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return null;
    }

    // Suporte flexível às props type e severity
    const alertType: FeedbackAlertType = type || severity || 'info';

    // Suporte flexível às props de dispensabilidade
    const canDismiss = dismissible || isDismissible || false;
    const handleDismissCallback = onDismiss || onClose;

    const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsVisible(false);
      if (handleDismissCallback) {
        handleDismissCallback(e);
      }
    };

    // Resolução do ícone
    let renderedIcon: React.ReactNode = null;
    if (icon === true) {
      renderedIcon = getDefaultIcon(alertType);
    } else if (icon !== false && icon !== null && icon !== undefined) {
      renderedIcon = icon;
    }

    // Determina o aria-live padrão conforme severidade
    const computedAriaLive = ariaLive || (alertType === 'error' ? 'assertive' : 'polite');
    const computedAriaLabel =
      ariaLabel || (typeof title === 'string' ? title : `Feedback Alert ${alertType}`);

    const hasBodyContent = description || subtle || children;

    const alertClasses = [
      'unooria-feedback-alert',
      `unooria-feedback-alert--${alertType}`,
      `unooria-feedback-alert--${theme}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={role}
        aria-live={computedAriaLive}
        aria-atomic="true"
        aria-label={computedAriaLabel}
        data-theme={theme}
        className={alertClasses}
        style={style}
        {...restProps}
      >
        {/* Ícone Semântico */}
        {renderedIcon && (
          <div className="unooria-feedback-alert__icon" aria-hidden="true">
            {renderedIcon}
          </div>
        )}

        {/* Conteúdo Principal (Título, Descrição, Texto Sutil, Children, Ações) */}
        <div className="unooria-feedback-alert__content">
          {title && <div className="unooria-feedback-alert__title">{title}</div>}

          {hasBodyContent && (
            <div className="unooria-feedback-alert__description">
              {description}
              {children}
              {subtle && <div className="unooria-feedback-alert__subtle">{subtle}</div>}
            </div>
          )}

          {action && <div className="unooria-feedback-alert__actions">{action}</div>}
        </div>

        {/* Botão de Fechar / Dispensar */}
        {canDismiss && (
          <button
            type="button"
            className="unooria-feedback-alert__close-btn"
            onClick={handleDismiss}
            aria-label="Fechar alerta"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

FeedbackAlert.displayName = 'FeedbackAlert';
