import React, { useState } from 'react';
import { ButtonProps, ButtonVariant, ButtonSize, UnooriaTheme } from './Button.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';

/**
 * Spinner de carregamento em SVG otimizado para o botão
 */
const LoadingSpinner: React.FC<{ sizePx: number; color: string }> = ({ sizePx, color }) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      animation: 'unooria-button-spin 0.8s linear infinite',
      flexShrink: 0,
    }}
    aria-hidden="true"
  >
    <style>
      {`
        @keyframes unooria-button-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
    </style>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="3"
      strokeOpacity="0.25"
    />
    <path
      d="M12 2C6.47715 2 2 6.47715 2 12C2 14.228 2.73031 16.2858 3.96324 17.95"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Componente Button da Plataforma Unooria
 * Trata meticulosamente todos os estados isolados (default, hover, active, focus, disabled, loading)
 * em ambos os temas (light e dark).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      state = 'default',
      isHovered: isHoveredProp,
      isActive: isActiveProp,
      isFocused: isFocusedProp,
      isDisabled: isDisabledProp,
      isLoading: isLoadingProp,
      leftIcon,
      rightIcon,
      fullWidth = false,
      theme = 'light',
      children,
      className = '',
      style = {},
      disabled,
      onClick,
      type = 'button',
      ...restProps
    },
    ref
  ) => {
    // Estados internos para interações reais do navegador
    const [internalHover, setInternalHover] = useState(false);
    const [internalActive, setInternalActive] = useState(false);
    const [internalFocus, setInternalFocus] = useState(false);

    // Resolução de flags de estado combinando props diretas e a prop 'state'
    const disabledResolved = Boolean(
      isDisabledProp || state === 'disabled' || disabled
    );
    const loadingResolved = Boolean(isLoadingProp || state === 'loading');

    // Estados isolados forçados vs dinâmicos
    const hoverResolved =
      !disabledResolved &&
      !loadingResolved &&
      (isHoveredProp || state === 'hover' || internalHover);

    const activeResolved =
      !disabledResolved &&
      !loadingResolved &&
      (isActiveProp || state === 'active' || internalActive);

    const focusResolved =
      !disabledResolved &&
      !loadingResolved &&
      (isFocusedProp || state === 'focus' || internalFocus);

    // Mapeamento de dimensões por tamanho
    const getSizeStyles = (sz: ButtonSize) => {
      switch (sz) {
        case 'sm':
          return {
            height: '36px',
            padding: '0 var(--unooria-spacing-xs)', // 12px
            fontSize: 'var(--unooria-size-body-xs)', // 14px
            lineHeight: 'var(--unooria-line-height-body-xs)', // 20px
            gap: 'var(--unooria-spacing-xxxs)', // 4px
            borderRadius: '8px',
            iconSize: 16,
          };
        case 'lg':
          return {
            height: '52px',
            padding: '0 var(--unooria-spacing-m)', // 24px
            fontSize: 'var(--unooria-size-body-m)', // 18px
            lineHeight: 'var(--unooria-line-height-body-m)', // 28px
            gap: 'var(--unooria-spacing-xs)', // 12px
            borderRadius: '12px',
            iconSize: 22,
          };
        case 'md':
        default:
          return {
            height: '44px',
            padding: '0 var(--unooria-spacing-s)', // 16px
            fontSize: 'var(--unooria-size-body-s)', // 16px
            lineHeight: 'var(--unooria-line-height-body-s)', // 24px
            gap: 'var(--unooria-spacing-xxs)', // 8px
            borderRadius: '10px',
            iconSize: 18,
          };
      }
    };

    const sizeConfig = getSizeStyles(size);

    // Resolução das cores conforme variante, estado e tema (Light / Dark)
    const getVariantColors = (
      v: ButtonVariant,
      th: UnooriaTheme,
      isHover: boolean,
      isActive: boolean,
      isFocus: boolean,
      isDisabled: boolean,
      isLoading: boolean
    ) => {
      const isDark = th === 'dark';

      if (isDisabled) {
        if (v === 'outline' || v === 'ghost') {
          return {
            background: 'transparent',
            color: isDark
              ? 'var(--unooria-color-neutraldark-400)'
              : 'var(--unooria-color-neutral-400)',
            border:
              v === 'outline'
                ? `1.5px solid ${
                    isDark
                      ? 'var(--unooria-color-neutraldark-200)'
                      : 'var(--unooria-color-neutral-200)'
                  }`
                : 'none',
            boxShadow: 'none',
          };
        }
        return {
          background: isDark
            ? 'var(--unooria-color-neutraldark-200)'
            : 'var(--unooria-color-neutral-200)',
          color: isDark
            ? 'var(--unooria-color-neutraldark-500)'
            : 'var(--unooria-color-neutral-400)',
          border: 'none',
          boxShadow: 'none',
        };
      }

      switch (v) {
        case 'secondary': {
          let bg = isDark
            ? 'var(--unooria-color-brandpurple-600)'
            : 'var(--unooria-color-brandpurple-900)';
          let text = '#FFFFFF';

          if (isActive) {
            bg = isDark
              ? 'var(--unooria-color-brandpurple-400)'
              : 'var(--unooria-color-brandpurple-700)';
          } else if (isHover) {
            bg = isDark
              ? 'var(--unooria-color-brandpurple-500)'
              : 'var(--unooria-color-brandpurple-800)';
          }

          return {
            background: bg,
            color: text,
            border: 'none',
            boxShadow: isFocus
              ? 'var(--unooria-elevation-brand-secondary)'
              : 'none',
          };
        }

        case 'outline': {
          let bg = 'transparent';
          let borderCol = isDark
            ? 'var(--unooria-color-brandnavy-400)'
            : 'var(--unooria-color-brandnavy-600)';
          let text = isDark
            ? 'var(--unooria-color-brandnavy-300)'
            : 'var(--unooria-color-brandnavy-800)';

          if (isActive) {
            bg = isDark
              ? 'var(--unooria-color-opacity-brandnavy-300)'
              : 'var(--unooria-color-opacity-brandnavy-200)';
          } else if (isHover) {
            bg = isDark
              ? 'var(--unooria-color-opacity-brandnavy-200)'
              : 'var(--unooria-color-opacity-brandnavy-100)';
          }

          return {
            background: bg,
            color: text,
            border: `1.5px solid ${borderCol}`,
            boxShadow: isFocus
              ? `0 0 0 3px ${
                  isDark
                    ? 'var(--unooria-color-opacity-brandnavy-400)'
                    : 'var(--unooria-color-opacity-brandnavy-300)'
                }`
              : 'none',
          };
        }

        case 'ghost': {
          let bg = 'transparent';
          let text = isDark
            ? 'var(--unooria-color-brandnavy-300)'
            : 'var(--unooria-color-brandnavy-800)';

          if (isActive) {
            bg = isDark
              ? 'var(--unooria-color-opacity-brandnavy-300)'
              : 'var(--unooria-color-opacity-brandnavy-200)';
          } else if (isHover) {
            bg = isDark
              ? 'var(--unooria-color-opacity-brandnavy-200)'
              : 'var(--unooria-color-opacity-brandnavy-100)';
          }

          return {
            background: bg,
            color: text,
            border: 'none',
            boxShadow: isFocus
              ? `0 0 0 3px ${
                  isDark
                    ? 'var(--unooria-color-opacity-brandnavy-400)'
                    : 'var(--unooria-color-opacity-brandnavy-300)'
                }`
              : 'none',
          };
        }

        case 'danger': {
          let bg = isDark
            ? 'var(--unooria-color-danger-500)'
            : 'var(--unooria-color-danger-600)';
          let text = '#FFFFFF';

          if (isActive) {
            bg = isDark
              ? 'var(--unooria-color-danger-300)'
              : 'var(--unooria-color-danger-800)';
          } else if (isHover) {
            bg = isDark
              ? 'var(--unooria-color-danger-400)'
              : 'var(--unooria-color-danger-700)';
          }

          return {
            background: bg,
            color: text,
            border: 'none',
            boxShadow: isFocus
              ? 'var(--unooria-elevation-semantic-danger)'
              : 'none',
          };
        }

        case 'primary':
        default: {
          let bg = 'var(--unooria-color-brandnavy-600)';
          let text = isDark
            ? 'var(--unooria-color-neutraldark-50)'
            : '#FFFFFF';

          if (isActive) {
            bg = isDark
              ? 'var(--unooria-color-brandnavy-400)'
              : 'var(--unooria-color-brandnavy-800)';
          } else if (isHover) {
            bg = isDark
              ? 'var(--unooria-color-brandnavy-500)'
              : 'var(--unooria-color-brandnavy-700)';
          }

          return {
            background: bg,
            color: text,
            border: 'none',
            boxShadow: isFocus
              ? 'var(--unooria-elevation-brand-primary)'
              : 'none',
          };
        }
      }
    };

    const variantStyles = getVariantColors(
      variant,
      theme,
      hoverResolved,
      activeResolved,
      focusResolved,
      disabledResolved,
      loadingResolved
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabledResolved || loadingResolved) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
    };

    return (
      <button
        ref={ref}
        type={type}
        data-theme={theme}
        disabled={disabledResolved}
        aria-busy={loadingResolved}
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
        className={`unooria-button ${className}`.trim()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: fullWidth ? '100%' : 'auto',
          height: sizeConfig.height,
          padding: sizeConfig.padding,
          fontSize: sizeConfig.fontSize,
          lineHeight: sizeConfig.lineHeight,
          fontFamily: 'var(--unooria-font-sans)',
          fontWeight: 'var(--unooria-weight-semibold)',
          borderRadius: sizeConfig.borderRadius,
          gap: sizeConfig.gap,
          backgroundColor: variantStyles.background,
          color: variantStyles.color,
          border: variantStyles.border,
          boxShadow: variantStyles.boxShadow,
          outline: focusResolved ? `2px solid ${variantStyles.color}` : 'none',
          outlineOffset: '2px',
          cursor: disabledResolved
            ? 'not-allowed'
            : loadingResolved
            ? 'wait'
            : 'pointer',
          userSelect: 'none',
          boxSizing: 'border-box',
          transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: disabledResolved ? 0.7 : 1,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          position: 'relative',
          ...style,
        }}
        {...restProps}
      >
        {loadingResolved ? (
          <>
            <LoadingSpinner
              sizePx={sizeConfig.iconSize}
              color={variantStyles.color}
            />
            {children && (
              <span style={{ opacity: 0.85 }}>{children}</span>
            )}
          </>
        ) : (
          <>
            {leftIcon && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: `${sizeConfig.iconSize}px`,
                }}
              >
                {leftIcon}
              </span>
            )}
            {children && <span>{children}</span>}
            {rightIcon && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: `${sizeConfig.iconSize}px`,
                }}
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
