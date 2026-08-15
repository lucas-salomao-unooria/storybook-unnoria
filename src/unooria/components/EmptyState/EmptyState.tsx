import React from 'react';
import {
  EmptyStateProps,
  EmptyStateVariant,
  EmptyStateAction,
} from './EmptyState.types';
import { Button } from '../Button';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';
import './EmptyState.css';

/**
 * Ilustração vetorial para a variante 'no-data' (Caixa/Arquivo Vazio)
 */
const NoDataIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-empty-state__svg ${className}`.trim()}
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="32" cy="32" r="28" fill="currentColor" fillOpacity="0.06" />
    <path
      d="M16 26L32 18L48 26L32 34L16 26Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 26V38L32 46V34"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 26V38L32 46"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 21L42 29"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 3"
    />
    <circle cx="48" cy="18" r="2" fill="currentColor" fillOpacity="0.4" />
    <circle cx="16" cy="46" r="1.5" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

/**
 * Ilustração vetorial para a variante 'no-results' (Lupa de Busca / Sem Correspondência)
 */
const NoResultsIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-empty-state__svg ${className}`.trim()}
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="32" cy="32" r="28" fill="currentColor" fillOpacity="0.06" />
    <rect
      x="18"
      y="14"
      width="22"
      height="30"
      rx="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line x1="23" y1="20" x2="33" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="23" y1="25" x2="31" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="23" y1="30" x2="27" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle
      cx="39"
      cy="38"
      r="10"
      fill="var(--unooria-empty-bg-inner, #FFFFFF)"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M46.5 45.5L52 51"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M36 38H42"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Ilustração vetorial para a variante 'error' (Alerta / Falha Crítica)
 */
const ErrorIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-empty-state__svg ${className}`.trim()}
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="32" cy="32" r="28" fill="currentColor" fillOpacity="0.08" />
    <path
      d="M32 14L49 44H15L32 14Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="32"
      y1="24"
      x2="32"
      y2="33"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="32" cy="39" r="1.5" fill="currentColor" />
  </svg>
);

/**
 * Ilustração vetorial para a variante 'permission' (Cadeado / Acesso Restrito)
 */
const PermissionIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-empty-state__svg ${className}`.trim()}
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="32" cy="32" r="28" fill="currentColor" fillOpacity="0.06" />
    <path
      d="M24 28V22C24 17.5817 27.5817 14 32 14C36.4183 14 40 17.5817 40 22V28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect
      x="18"
      y="28"
      width="28"
      height="22"
      rx="4"
      fill="var(--unooria-empty-bg-inner, #FFFFFF)"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle cx="32" cy="37" r="2.5" fill="currentColor" />
    <line x1="32" y1="39.5" x2="32" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Ilustração vetorial para a variante 'success' (Sucesso / Conclusão)
 */
const SuccessIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-empty-state__svg ${className}`.trim()}
    aria-hidden="true"
    role="presentation"
  >
    <circle cx="32" cy="32" r="28" fill="currentColor" fillOpacity="0.08" />
    <circle
      cx="32"
      cy="32"
      r="18"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M24 32.5L29.5 38L40 27"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="18" r="1.5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="48" cy="16" r="2" fill="currentColor" fillOpacity="0.5" />
    <circle cx="49" cy="46" r="1.5" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

/**
 * Retorna a ilustração vetorial SVG nativa com base na variante do EmptyState
 */
function getDefaultIllustration(variant: EmptyStateVariant): React.ReactNode {
  switch (variant) {
    case 'no-results':
      return <NoResultsIllustration />;
    case 'error':
      return <ErrorIllustration />;
    case 'permission':
      return <PermissionIllustration />;
    case 'success':
      return <SuccessIllustration />;
    case 'no-data':
    default:
      return <NoDataIllustration />;
  }
}

/**
 * Renderiza um botão de ação com o padrão Unooria Button ou repassa o nó customizado
 */
function renderAction(
  action: EmptyStateAction | React.ReactNode,
  defaultVariant: 'primary' | 'outline' | 'secondary',
  theme: 'light' | 'dark',
  buttonSize: 'sm' | 'md' | 'lg'
): React.ReactNode {
  if (!action) return null;

  // Se já for um nó React válido que não é um plain object com label
  if (React.isValidElement(action)) {
    return action;
  }

  if (typeof action === 'object' && 'label' in action) {
    const act = action as EmptyStateAction;
    const {
      label,
      onClick,
      icon,
      iconPosition = 'left',
      variant = defaultVariant,
      size = buttonSize,
      disabled = false,
      loading = false,
      loadingText,
      href,
      target,
      as,
      className,
      style,
      ...extraProps
    } = act;

    return (
      <Button
        variant={variant}
        size={size}
        theme={theme}
        isDisabled={disabled}
        isLoading={loading}
        loadingText={loadingText}
        leftIcon={iconPosition === 'left' ? icon : undefined}
        rightIcon={iconPosition === 'right' ? icon : undefined}
        href={href}
        target={target}
        as={as}
        className={className}
        style={style}
        onClick={onClick}
        {...extraProps}
      >
        {label}
      </Button>
    );
  }

  return <>{action}</>;
}

/**
 * Componente EmptyState - Design System Plataforma Unooria (Figma Nó #7965:5382)
 *
 * Exibe telas de transição e estados vazios amigáveis quando não há conteúdo para exibir.
 * Evita telas em branco, contextualiza a situação e sugere ações claras para engajar o usuário.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant = 'no-data',
      title,
      description,
      icon = true,
      illustration,
      size = 'md',
      align = 'center',
      theme = 'light',
      primaryAction,
      secondaryAction,
      bordered = false,
      compact = false,
      fullWidth = true,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    // Resolução da ilustração visual
    let renderedIllustration: React.ReactNode = null;
    if (illustration) {
      renderedIllustration = illustration;
    } else if (icon === true) {
      renderedIllustration = getDefaultIllustration(variant);
    } else if (icon !== false && icon !== null && icon !== undefined) {
      renderedIllustration = icon;
    }

    // Resolução dos botões de ação
    const hasMultipleActions = Boolean(primaryAction && secondaryAction);
    
    // Regra do Figma:
    // Se há 2 botões: Principal é Filled/Primary, Secundário é Subtle/Outline
    // Se há 1 botão: O botão padrão é Subtle/Outline (ou a variante explícita fornecida)
    const primaryDefaultVariant = hasMultipleActions ? 'primary' : 'outline';
    const secondaryDefaultVariant = 'outline';

    const buttonSize = size === 'lg' ? 'md' : 'sm';

    const renderedPrimaryAction = renderAction(
      primaryAction,
      primaryDefaultVariant,
      theme,
      buttonSize
    );

    const renderedSecondaryAction = renderAction(
      secondaryAction,
      secondaryDefaultVariant,
      theme,
      buttonSize
    );

    const hasActions = Boolean(renderedPrimaryAction || renderedSecondaryAction);

    // Classes do componente baseadas na arquitetura BEM
    const emptyStateClasses = [
      'unooria-empty-state',
      `unooria-empty-state--${variant}`,
      `unooria-empty-state--size-${size}`,
      `unooria-empty-state--align-${align}`,
      `unooria-empty-state--${theme}`,
      bordered ? 'unooria-empty-state--bordered' : '',
      compact ? 'unooria-empty-state--compact' : '',
      fullWidth ? 'unooria-empty-state--full-width' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="region"
        aria-label={typeof title === 'string' ? title : 'Estado Vazio'}
        data-theme={theme}
        data-variant={variant}
        data-size={size}
        className={emptyStateClasses}
        style={style}
        {...restProps}
      >
        <div className="unooria-empty-state__container">
          {/* Ilustração / Ícone */}
          {renderedIllustration && (
            <div className="unooria-empty-state__illustration" aria-hidden="true">
              {renderedIllustration}
            </div>
          )}

          {/* Bloco Textual */}
          {(title || description) && (
            <div className="unooria-empty-state__text-group">
              {title && (
                <h3 className="unooria-empty-state__title">
                  {title}
                </h3>
              )}
              {description && (
                <p className="unooria-empty-state__description">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Conteúdo Customizado Injetado via Children */}
          {children && (
            <div className="unooria-empty-state__custom-content">
              {children}
            </div>
          )}

          {/* Bloco de Botões e Ações */}
          {hasActions && (
            <div className="unooria-empty-state__actions">
              {renderedSecondaryAction}
              {renderedPrimaryAction}
            </div>
          )}
        </div>
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
