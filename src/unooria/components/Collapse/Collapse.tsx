'use client';

import React, { createContext, useContext, useState, useId, forwardRef } from 'react';
import {
  CollapseProps,
  CollapseHeaderProps,
  CollapseTitleProps,
  CollapseSubtitleProps,
  CollapseProgressBarProps,
  CollapsePanelProps,
  CollapseProgressConfig,
  CollapseSize,
  CollapseTheme,
} from './Collapse.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';
import './Collapse.css';

// ============================================================================
// Contexto Interno do Collapse
// ============================================================================
interface CollapseContextValue {
  isOpen: boolean;
  disabled: boolean;
  size: CollapseSize;
  theme: CollapseTheme;
  headerId: string;
  contentId: string;
  onToggle: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  progress?: number | CollapseProgressConfig;
  progressColor?: string;
  showProgressBar?: boolean;
}

const CollapseContext = createContext<CollapseContextValue | undefined>(undefined);

const useCollapseContext = () => {
  const context = useContext(CollapseContext);
  return context;
};

// ============================================================================
// Ícones Padrão (SVG)
// ============================================================================
const DefaultChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ============================================================================
// Subcomponente: CollapseTitle
// ============================================================================
export const CollapseTitle = forwardRef<HTMLElement, CollapseTitleProps>(
  ({ as: Component = 'h4', size, className = '', children, ...rest }, ref) => {
    const context = useCollapseContext();
    const effectiveSize = size || context?.size || 'md';

    return React.createElement(
      Component,
      {
        ref: ref as React.Ref<HTMLElement>,
        className: `unooria-collapse__title unooria-collapse__title--${effectiveSize} ${className}`.trim(),
        ...rest,
      },
      children
    );
  }
);
CollapseTitle.displayName = 'CollapseTitle';

// ============================================================================
// Subcomponente: CollapseSubtitle
// ============================================================================
export const CollapseSubtitle = forwardRef<HTMLParagraphElement, CollapseSubtitleProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <p
        ref={ref}
        className={`unooria-collapse__subtitle ${className}`.trim()}
        {...rest}
      >
        {children}
      </p>
    );
  }
);
CollapseSubtitle.displayName = 'CollapseSubtitle';

// ============================================================================
// Subcomponente: CollapseProgressBar
// ============================================================================
export const CollapseProgressBar = forwardRef<HTMLDivElement, CollapseProgressBarProps>(
  (
    {
      value,
      color,
      showLabel = true,
      label,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const context = useCollapseContext();
    const effectiveColor = color || context?.progressColor || '#01B574';
    const clampedValue = Math.min(100, Math.max(0, Math.round(value)));
    const displayLabel = label !== undefined ? label : `${clampedValue}%`;

    return (
      <div
        ref={ref}
        className={`unooria-collapse__progress-container ${className}`.trim()}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso"
        style={style}
        {...rest}
      >
        <div className="unooria-collapse__progress-track">
          <div
            className="unooria-collapse__progress-indicator"
            style={{
              width: `${clampedValue}%`,
              backgroundColor: effectiveColor,
            }}
          />
        </div>
        {showLabel && (
          <span className="unooria-collapse__progress-label">
            {displayLabel}
          </span>
        )}
      </div>
    );
  }
);
CollapseProgressBar.displayName = 'CollapseProgressBar';

// ============================================================================
// Subcomponente: CollapseHeader
// ============================================================================
export const CollapseHeader = forwardRef<HTMLDivElement, CollapseHeaderProps>(
  (
    {
      title,
      subtitle,
      description,
      leadingIcon,
      icon,
      expandIcon,
      extra,
      disabled,
      isOpen: propIsOpen,
      onToggle: propOnToggle,
      className = '',
      children,
      onClick,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const context = useCollapseContext();

    const isControlled = propIsOpen !== undefined;
    const effectiveIsOpen = isControlled ? propIsOpen : (context?.isOpen ?? false);
    const effectiveDisabled = disabled !== undefined ? disabled : (context?.disabled ?? false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (effectiveDisabled) return;
      if (propOnToggle) {
        propOnToggle(e);
      } else if (context?.onToggle) {
        context.onToggle(e);
      }
      if (onClick) {
        onClick(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (effectiveDisabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (propOnToggle) {
          propOnToggle(e);
        } else if (context?.onToggle) {
          context.onToggle(e);
        }
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const resolvedSubtitle = subtitle || description;
    const resolvedIcon = icon || expandIcon;

    const renderExpandIcon = () => {
      if (typeof resolvedIcon === 'function') {
        return resolvedIcon({ isOpen: effectiveIsOpen, disabled: effectiveDisabled });
      }
      if (resolvedIcon) {
        return resolvedIcon;
      }
      return (
        <span className="unooria-collapse__expand-icon-wrap unooria-collapse__expand-icon-wrap--chevron">
          <DefaultChevronIcon />
        </span>
      );
    };

    const hasShorthand = Boolean(title || resolvedSubtitle || leadingIcon);

    return (
      <div
        ref={ref}
        id={context?.headerId}
        role="button"
        tabIndex={effectiveDisabled ? -1 : 0}
        aria-expanded={effectiveIsOpen}
        aria-controls={context?.contentId}
        aria-disabled={effectiveDisabled}
        className={`unooria-collapse__header ${className}`.trim()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {hasShorthand ? (
          <div className="unooria-collapse__header-main">
            {leadingIcon && (
              <span className="unooria-collapse__leading-icon" aria-hidden="true">
                {leadingIcon}
              </span>
            )}
            <div className="unooria-collapse__header-text">
              {typeof title === 'string' ? (
                <CollapseTitle>{title}</CollapseTitle>
              ) : (
                title
              )}
              {resolvedSubtitle && (
                typeof resolvedSubtitle === 'string' ? (
                  <CollapseSubtitle>{resolvedSubtitle}</CollapseSubtitle>
                ) : (
                  resolvedSubtitle
                )
              )}
            </div>
          </div>
        ) : (
          children
        )}

        <div className="unooria-collapse__header-actions">
          {extra}
          {renderExpandIcon()}
        </div>
      </div>
    );
  }
);
CollapseHeader.displayName = 'CollapseHeader';

// ============================================================================
// Subcomponente: CollapseBody / CollapsePanel
// ============================================================================
export const CollapsePanel = forwardRef<HTMLDivElement, CollapsePanelProps>(
  (
    {
      isOpen: propIsOpen,
      variant = 'custom',
      padding = 'md',
      id,
      className = '',
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const context = useCollapseContext();
    const effectiveIsOpen = propIsOpen !== undefined ? propIsOpen : (context?.isOpen ?? false);
    const effectiveId = id || context?.contentId;

    const isNamedPadding = typeof padding === 'string' && ['none', 'sm', 'md', 'lg'].includes(padding);
    const paddingClass = isNamedPadding ? `unooria-collapse__body-content--padding-${padding}` : '';
    const customPaddingStyle: React.CSSProperties = !isNamedPadding && padding !== undefined ? { padding } : {};

    const variantClass = variant !== 'custom' ? `unooria-collapse__media-${variant}` : '';

    return (
      <div
        ref={ref}
        id={effectiveId}
        role="region"
        aria-labelledby={context?.headerId}
        aria-hidden={!effectiveIsOpen}
        className={`unooria-collapse__body ${effectiveIsOpen ? 'unooria-collapse__body--open' : ''} ${className}`.trim()}
        style={style}
        {...rest}
      >
        <div className="unooria-collapse__body-inner">
          <div
            className={`unooria-collapse__body-content ${paddingClass} ${variantClass}`.trim()}
            style={customPaddingStyle}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
CollapsePanel.displayName = 'CollapsePanel';
export const CollapseBody = CollapsePanel;

// ============================================================================
// Componente Principal: Collapse
// ============================================================================
export interface CollapseComponent
  extends React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CollapseHeader;
  Title: typeof CollapseTitle;
  Subtitle: typeof CollapseSubtitle;
  ProgressBar: typeof CollapseProgressBar;
  Body: typeof CollapseBody;
  Panel: typeof CollapsePanel;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      title,
      subtitle,
      description,
      leadingIcon,
      isOpen: controlledIsOpen,
      defaultOpen = false,
      onToggle,
      disabled = false,
      showProgressBar = false,
      progress,
      progressColor = '#01B574',
      icon,
      expandIcon,
      headerExtra,
      size = 'md',
      theme = 'light',
      variant = 'default',
      mediaVariant = 'custom',
      id: customId,
      headerId: customHeaderId,
      contentId: customContentId,
      className = '',
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const baseId = customId || `unooria-collapse-${generatedId.replace(/:/g, '')}`;
    const headerId = customHeaderId || `${baseId}-header`;
    const contentId = customContentId || `${baseId}-content`;

    const isControlled = controlledIsOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledIsOpen : uncontrolledOpen;

    const handleToggle = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;
      const nextOpen = !isOpen;
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      if (onToggle) {
        onToggle(nextOpen, event);
      }
    };

    const hasShorthandHeader = Boolean(title || subtitle || description || leadingIcon);
    const hasShorthandProgress = showProgressBar || progress !== undefined;

    // Resolução do valor de progresso se for número ou objeto
    const progressValue = typeof progress === 'number' ? progress : progress?.value;
    const progressLabel = typeof progress === 'object' ? progress.formatLabel?.(progress.value) : undefined;
    const progressShowLabel = typeof progress === 'object' ? (progress.showLabel ?? true) : true;
    const resolvedProgressColor = (typeof progress === 'object' && progress.color) ? progress.color : progressColor;

    const contextValue: CollapseContextValue = {
      isOpen,
      disabled,
      size,
      theme,
      headerId,
      contentId,
      onToggle: handleToggle,
      progress,
      progressColor: resolvedProgressColor,
      showProgressBar: hasShorthandProgress,
    };

    const containerClasses = [
      'unooria-collapse',
      `unooria-collapse--theme-${theme}`,
      `unooria-collapse--variant-${variant}`,
      `unooria-collapse--size-${size}`,
      isOpen ? 'unooria-collapse--open' : '',
      disabled ? 'unooria-collapse--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <CollapseContext.Provider value={contextValue}>
        <div
          ref={ref}
          id={baseId}
          className={containerClasses}
          style={style}
          {...rest}
        >
          {hasShorthandHeader ? (
            <>
              <CollapseHeader
                title={title}
                subtitle={subtitle || description}
                leadingIcon={leadingIcon}
                icon={icon || expandIcon}
                extra={headerExtra}
                disabled={disabled}
                isOpen={isOpen}
                onToggle={handleToggle}
              />

              {hasShorthandProgress && progressValue !== undefined && (
                <CollapseProgressBar
                  value={progressValue}
                  color={resolvedProgressColor}
                  showLabel={progressShowLabel}
                  label={progressLabel}
                />
              )}

              <CollapseBody
                isOpen={isOpen}
                variant={mediaVariant}
              >
                {children}
              </CollapseBody>
            </>
          ) : (
            children
          )}
        </div>
      </CollapseContext.Provider>
    );
  }
) as CollapseComponent;

Collapse.displayName = 'Collapse';
Collapse.Header = CollapseHeader;
Collapse.Title = CollapseTitle;
Collapse.Subtitle = CollapseSubtitle;
Collapse.ProgressBar = CollapseProgressBar;
Collapse.Body = CollapseBody;
Collapse.Panel = CollapsePanel;
