import React, { useState } from 'react';
import { AlertBoxProps, AlertBoxVariant, AlertBoxTheme } from './AlertBox.types';

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
 * Obtém o ícone padrão para cada variante
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
 * Obtém o mapa de cores baseado no tema e variante
 */
function getVariantStyles(variant: AlertBoxVariant, theme: AlertBoxTheme) {
  const isDark = theme === 'dark';

  switch (variant) {
    case 'success':
      return {
        background: isDark ? 'var(--unooria-color-sucess-900)' : 'var(--unooria-color-sucess-50)',
        border: isDark ? 'var(--unooria-color-sucess-700)' : 'var(--unooria-color-sucess-200)',
        iconColor: isDark ? 'var(--unooria-color-sucess-300)' : 'var(--unooria-color-sucess-600)',
        titleColor: isDark ? 'var(--unooria-color-sucess-50)' : 'var(--unooria-color-sucess-900)',
        descriptionColor: isDark ? 'var(--unooria-color-sucess-100)' : 'var(--unooria-color-neutral-800)',
        closeHoverBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      };
    case 'warning':
      return {
        background: isDark ? 'var(--unooria-color-warning-900)' : 'var(--unooria-color-warning-50)',
        border: isDark ? 'var(--unooria-color-warning-700)' : 'var(--unooria-color-warning-200)',
        iconColor: isDark ? 'var(--unooria-color-warning-300)' : 'var(--unooria-color-warning-600)',
        titleColor: isDark ? 'var(--unooria-color-warning-50)' : 'var(--unooria-color-warning-900)',
        descriptionColor: isDark ? 'var(--unooria-color-warning-100)' : 'var(--unooria-color-neutral-800)',
        closeHoverBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      };
    case 'error':
      return {
        background: isDark ? 'var(--unooria-color-danger-900)' : 'var(--unooria-color-danger-50)',
        border: isDark ? 'var(--unooria-color-danger-700)' : 'var(--unooria-color-danger-200)',
        iconColor: isDark ? 'var(--unooria-color-danger-300)' : 'var(--unooria-color-danger-600)',
        titleColor: isDark ? 'var(--unooria-color-danger-50)' : 'var(--unooria-color-danger-900)',
        descriptionColor: isDark ? 'var(--unooria-color-danger-100)' : 'var(--unooria-color-neutral-800)',
        closeHoverBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      };
    case 'info':
    default:
      return {
        background: isDark ? 'var(--unooria-color-info-900)' : 'var(--unooria-color-info-50)',
        border: isDark ? 'var(--unooria-color-info-700)' : 'var(--unooria-color-info-200)',
        iconColor: isDark ? 'var(--unooria-color-info-300)' : 'var(--unooria-color-info-600)',
        titleColor: isDark ? 'var(--unooria-color-info-50)' : 'var(--unooria-color-info-900)',
        descriptionColor: isDark ? 'var(--unooria-color-info-100)' : 'var(--unooria-color-neutral-800)',
        closeHoverBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      };
  }
}

/**
 * Componente AlertBox - Plataforma Unooria
 *
 * Exibe mensagens informativas, de sucesso, aviso ou erro de forma acessível e responsiva.
 */
export const AlertBox: React.FC<AlertBoxProps> = ({
  variant = 'info',
  title,
  description,
  children,
  icon = true,
  isDismissible = false,
  onClose,
  actionButton,
  theme = 'light',
  className = '',
  style = {},
  'aria-label': ariaLabel,
}) => {
  const [visible, setVisible] = useState(true);
  const [closeBtnHovered, setCloseBtnHovered] = useState(false);

  if (!visible) {
    return null;
  }

  const styles = getVariantStyles(variant, theme);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVisible(false);
    if (onClose) {
      onClose(e);
    }
  };

  // Determina o ícone a exibir
  let renderedIcon: React.ReactNode = null;
  if (icon === true) {
    renderedIcon = getDefaultIcon(variant);
  } else if (icon !== false && icon !== null && icon !== undefined) {
    renderedIcon = icon;
  }

  const hasBody = description || children;

  return (
    <div
      role="alert"
      aria-label={ariaLabel || (typeof title === 'string' ? title : `Alerta ${variant}`)}
      data-theme={theme}
      className={`unooria-alertbox unooria-alertbox--${variant} unooria-alertbox--${theme} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--unooria-spacing-xs, 12px)',
        padding: 'var(--unooria-spacing-s, 16px)',
        borderRadius: '8px',
        border: `1px solid ${styles.border}`,
        backgroundColor: styles.background,
        boxSizing: 'border-box',
        width: '100%',
        fontFamily: 'var(--unooria-font-sans, "Open Sans", sans-serif)',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        ...style,
      }}
    >
      {/* Ícone de Severidade */}
      {renderedIcon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: styles.iconColor,
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          {renderedIcon}
        </div>
      )}

      {/* Conteúdo Principal (Título, Descrição / Children, Ações) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: 'var(--unooria-spacing-xxxs, 4px)',
          minWidth: 0,
        }}
      >
        {title && (
          <div
            style={{
              fontSize: 'var(--unooria-size-body-s, 16px)',
              lineHeight: 'var(--unooria-line-height-body-s, 24px)',
              fontWeight: 'var(--unooria-weight-semibold, 600)',
              color: styles.titleColor,
              wordBreak: 'break-word',
            }}
          >
            {title}
          </div>
        )}

        {hasBody && (
          <div
            style={{
              fontSize: 'var(--unooria-size-body-xs, 14px)',
              lineHeight: 'var(--unooria-line-height-body-xs, 20px)',
              fontWeight: 'var(--unooria-weight-regular, 400)',
              color: styles.descriptionColor,
              wordBreak: 'break-word',
            }}
          >
            {description}
            {children}
          </div>
        )}

        {actionButton && (
          <div
            style={{
              marginTop: 'var(--unooria-spacing-xxs, 8px)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--unooria-spacing-xs, 12px)',
            }}
          >
            {actionButton}
          </div>
        )}
      </div>

      {/* Botão Dispensável / Fechar */}
      {isDismissible && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fechar alerta"
          onMouseEnter={() => setCloseBtnHovered(true)}
          onMouseLeave={() => setCloseBtnHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            border: 'none',
            borderRadius: '4px',
            background: closeBtnHovered ? styles.closeHoverBg : 'transparent',
            color: styles.iconColor,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background-color 0.15s ease, opacity 0.15s ease',
            outline: 'none',
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
