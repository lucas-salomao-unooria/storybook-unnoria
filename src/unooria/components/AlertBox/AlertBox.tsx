import React, { useId, useState } from 'react';
import { AlertBoxProps, AlertBoxVariant, AlertBoxActionConfig } from './AlertBox.types';
import { Button } from '../Button/Button';
import './AlertBox.css';

/**
 * Ícone Info oficial do Figma (36x36)
 */
const InfoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" />
    <line x1="18" y1="16" x2="18" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="18" cy="11.5" r="1.5" fill="currentColor" />
  </svg>
);

/**
 * Ícone Success oficial do Figma (36x36)
 */
const SuccessIcon: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" />
    <path
      d="M12 18.5L16 22.5L24 14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Ícone Danger / Cancel oficial do Figma (36x36)
 */
const DangerIcon: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" />
    <line x1="13.5" y1="13.5" x2="22.5" y2="22.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="22.5" y1="13.5" x2="13.5" y2="22.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * Ícone Warning oficial do Figma (36x36)
 */
const WarningIcon: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" />
    <line x1="18" y1="12" x2="18" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="18" cy="23.5" r="1.5" fill="currentColor" />
  </svg>
);

/**
 * Ícone de Fechar (Close)
 */
const CloseIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
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
 * Retorna o ícone SVG correspondente à severidade
 */
function getIconForVariant(variant: AlertBoxVariant) {
  switch (variant) {
    case 'success':
      return <SuccessIcon />;
    case 'danger':
    case 'error':
      return <DangerIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
    default:
      return <InfoIcon />;
  }
}

/**
 * Componente AlertBox - Design System Unooria
 *
 * Implementação fiel ao Figma (Node 17025:277 / Component Set #1349:4736).
 * Diálogo/Card de alerta de decisão com ícone em badge circular centralizado,
 * textos e botões de ação estruturados para Desktop e Mobile.
 */
export const AlertBox = React.forwardRef<HTMLDivElement, AlertBoxProps>(
  (
    {
      variant = 'info',
      state,
      device = 'desktop',
      title,
      description,
      children,
      icon = true,
      primaryAction,
      secondaryAction,
      actions,
      theme = 'dark',
      isDismissible = false,
      onClose,
      className = '',
      style,
      role = 'alertdialog',
      ...restProps
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const idPrefix = useId();
    const titleId = title ? `unooria-alertbox-title-${idPrefix}` : undefined;
    const descId = description || children ? `unooria-alertbox-desc-${idPrefix}` : undefined;

    if (!isVisible) {
      return null;
    }

    // Normalização da severidade (compatibilidade com state e error -> danger)
    const effectiveVariant: AlertBoxVariant = state || variant;
    const normalizedVariant = effectiveVariant === 'error' ? 'danger' : effectiveVariant;

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsVisible(false);
      if (onClose) {
        onClose(e);
      }
    };

    // Resolução do Ícone
    let renderedIcon: React.ReactNode = null;
    if (icon === true) {
      renderedIcon = getIconForVariant(normalizedVariant);
    } else if (icon !== false && icon !== null && icon !== undefined) {
      renderedIcon = icon;
    }

    // Renderizador de Ação (Primary / Secondary)
    const renderAction = (action: AlertBoxActionConfig | React.ReactNode, isPrimary: boolean) => {
      if (!action) return null;

      // Se for um elemento React direto (ex: <Button />)
      if (React.isValidElement(action)) {
        return action;
      }

      // Se for um objeto de configuração AlertBoxActionConfig
      if (typeof action === 'object' && 'label' in action) {
        const config = action as AlertBoxActionConfig;
        const defaultVariant = isPrimary
          ? normalizedVariant === 'danger'
            ? 'danger'
            : 'primary'
          : 'ghost';

        const buttonSize = device === 'mobile' ? 'md' : 'sm';

        return (
          <Button
            variant={config.variant || defaultVariant}
            size={buttonSize}
            theme={theme}
            disabled={config.disabled}
            isLoading={config.loading}
            onClick={config.onClick}
            fullWidth={device === 'mobile'}
            className={
              isPrimary
                ? 'unooria-alertbox__btn unooria-alertbox__btn--filled'
                : 'unooria-alertbox__btn unooria-alertbox__btn--subtle'
            }
            {...config.buttonProps}
          >
            {config.label}
          </Button>
        );
      }

      return null;
    };

    // Montagem dos Botões de Ação
    let actionElements: React.ReactNode = null;
    if (actions) {
      actionElements = actions;
    } else if (primaryAction || secondaryAction) {
      const primaryBtn = renderAction(primaryAction, true);
      const secondaryBtn = renderAction(secondaryAction, false);

      if (device === 'mobile') {
        // No Mobile: Primário acima, Secundário abaixo
        actionElements = (
          <>
            {primaryBtn}
            {secondaryBtn}
          </>
        );
      } else {
        // No Desktop: Secundário à esquerda, Primário à direita
        actionElements = (
          <>
            {secondaryBtn}
            {primaryBtn}
          </>
        );
      }
    }

    const rootClasses = [
      'unooria-alertbox',
      `unooria-alertbox--${normalizedVariant}`,
      `unooria-alertbox--${device}`,
      `unooria-alertbox--${theme}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={role}
        aria-modal={role === 'alertdialog' ? 'true' : undefined}
        aria-labelledby={titleId}
        aria-describedby={descId}
        data-theme={theme}
        className={rootClasses}
        style={style}
        {...restProps}
      >
        {/* Botão de Fechar no Canto Superior */}
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

        {/* Cabeçalho com Badge Circular de Ícone e Textos */}
        <div className="unooria-alertbox__header">
          {renderedIcon && (
            <div className="unooria-alertbox__icon-wrapper" aria-hidden="true">
              {renderedIcon}
            </div>
          )}

          <div className="unooria-alertbox__content">
            {title && (
              <div id={titleId} className="unooria-alertbox__title">
                {title}
              </div>
            )}

            {(description || children) && (
              <div id={descId} className="unooria-alertbox__description">
                {description}
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Seção de Botões de Ação */}
        {actionElements && (
          <div className="unooria-alertbox__actions">
            {actionElements}
          </div>
        )}
      </div>
    );
  }
);

AlertBox.displayName = 'AlertBox';
