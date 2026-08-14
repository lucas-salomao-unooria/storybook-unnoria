import React, { useState } from 'react';
import { ButtonProps, ButtonSize } from './Button.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';
import './Button.css';

/**
 * Spinner de carregamento em SVG vetorial otimizado e acessível
 */
const LoadingSpinner: React.FC<{ sizePx: number; className?: string }> = ({ sizePx, className = '' }) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`unooria-button__spinner ${className}`.trim()}
    aria-hidden="true"
    role="presentation"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeOpacity="0.25"
    />
    <path
      d="M12 2C6.47715 2 2 6.47715 2 12C2 14.228 2.73031 16.2858 3.96324 17.95"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Dimensão em pixels do ícone/spinner por tamanho de botão
 */
const getIconSize = (size: ButtonSize): number => {
  switch (size) {
    case 'sm':
      return 16;
    case 'lg':
      return 22;
    case 'md':
    default:
      return 18;
  }
};

/**
 * Componente Button do Design System Plataforma Unooria (Padrão Ouro NPM)
 * 
 * Elemento de controle principal para acionar ações do usuário, submeter formulários
 * e guiar a navegação. Suporta 5 variantes visuais, 3 tamanhos, modos Claro e Escuro,
 * renderização polimórfica (ex: como tag `<a>`), ícones direcionais, spinner de
 * carregamento acessível e tratamento completo de estados interativos.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      theme = 'light',
      state = 'default',
      isHovered = false,
      isActive = false,
      isFocused = false,
      isDisabled = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      as,
      children,
      className = '',
      style,
      disabled,
      onClick,
      type = 'button',
      ...restProps
    },
    ref
  ) => {
    // Estados internos para interatividade real no browser
    const [internalHover, setInternalHover] = useState(false);
    const [internalActive, setInternalActive] = useState(false);
    const [internalFocus, setInternalFocus] = useState(false);

    // Resolução de flags de estado combinando props diretas e a prop 'state'
    const disabledResolved = Boolean(
      isDisabled || state === 'disabled' || disabled
    );
    const loadingResolved = Boolean(isLoading || state === 'loading');

    // Estados forçados para testes visuais / Storybook vs dinâmicos
    const hoverResolved =
      !disabledResolved &&
      !loadingResolved &&
      (isHovered || state === 'hover' || internalHover);

    const activeResolved =
      !disabledResolved &&
      !loadingResolved &&
      (isActive || state === 'active' || internalActive);

    const focusResolved =
      !disabledResolved &&
      !loadingResolved &&
      (isFocused || state === 'focus' || internalFocus);

    // Define o elemento polimórfico a ser renderizado
    const Component = as || ('href' in restProps && (restProps as any).href ? 'a' : 'button');
    const isNativeButton = Component === 'button';

    // Construção das classes BEM
    const buttonClasses = [
      'unooria-button',
      `unooria-button--variant-${variant}`,
      `unooria-button--size-${size}`,
      `unooria-button--${theme}`,
      fullWidth ? 'unooria-button--full-width' : '',
      disabledResolved ? 'unooria-button--disabled' : '',
      loadingResolved ? 'unooria-button--loading' : '',
      hoverResolved ? 'unooria-button--state-hover' : '',
      activeResolved ? 'unooria-button--state-active' : '',
      focusResolved ? 'unooria-button--state-focus' : '',
      state !== 'default' ? `unooria-button--state-${state}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Manipulador de clique com proteção contra cliques duplicados ou desabilitados
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabledResolved || loadingResolved) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };

    const iconDimension = getIconSize(size);

    return (
      <Component
        ref={ref as any}
        type={isNativeButton ? type : undefined}
        disabled={isNativeButton ? disabledResolved || loadingResolved : undefined}
        aria-disabled={disabledResolved || loadingResolved}
        aria-busy={loadingResolved}
        role={!isNativeButton ? 'button' : undefined}
        tabIndex={disabledResolved || loadingResolved ? -1 : undefined}
        data-theme={theme}
        data-variant={variant}
        data-size={size}
        data-state={state}
        className={buttonClasses}
        style={style}
        onClick={handleClick}
        onMouseEnter={() => setInternalHover(true)}
        onMouseLeave={() => {
          setInternalHover(false);
          setInternalActive(false);
        }}
        onMouseDown={() => setInternalActive(true)}
        onMouseUp={() => setInternalActive(false)}
        onFocus={() => setInternalFocus(true)}
        onBlur={() => setInternalFocus(false)}
        {...restProps}
      >
        {loadingResolved ? (
          <>
            <LoadingSpinner sizePx={iconDimension} />
            {loadingText ? (
              <span className="unooria-button__content">{loadingText}</span>
            ) : children ? (
              <span className="unooria-button__content" style={{ opacity: 0.85 }}>
                {children}
              </span>
            ) : null}
          </>
        ) : (
          <>
            {leftIcon && (
              <span
                className="unooria-button__icon unooria-button__icon--left"
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )}

            {children && (
              <span className="unooria-button__content">{children}</span>
            )}

            {rightIcon && (
              <span
                className="unooria-button__icon unooria-button__icon--right"
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
