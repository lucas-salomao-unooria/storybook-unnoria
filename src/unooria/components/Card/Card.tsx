import React, { forwardRef } from 'react';
import {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardMediaProps,
  CardContentProps,
  CardFooterProps,
  CardBadgeGroupProps,
  CardProgressProps,
  CardImageConfig,
  CardProgressConfig,
  CardActionConfig,
} from './Card.types';
import '../../tokens/colors.css';
import '../../tokens/spacing.css';
import '../../tokens/typography.css';
import '../../tokens/elevation.css';
import './Card.css';

// ============================================================================
// Subcomponente: CardTitle
// ============================================================================
export const CardTitle = forwardRef<HTMLElement, CardTitleProps>(
  ({ as: Component = 'h3', size = 'md', truncate = false, className = '', children, ...rest }, ref) => {
    const truncateClass = typeof truncate === 'number'
      ? 'unooria-card__line-clamp'
      : truncate
      ? 'unooria-card__truncate'
      : '';

    const customStyle = typeof truncate === 'number'
      ? ({ WebkitLineClamp: truncate, ...rest.style } as React.CSSProperties)
      : rest.style;

    return React.createElement(
      Component,
      {
        ref: ref as any,
        className: `unooria-card__title unooria-card__title--${size} ${truncateClass} ${className}`.trim(),
        style: customStyle,
        ...rest,
      },
      children
    );
  }
);
CardTitle.displayName = 'CardTitle';

// ============================================================================
// Subcomponente: CardDescription
// ============================================================================
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ icon, truncate = false, className = '', children, ...rest }, ref) => {
    const truncateClass = typeof truncate === 'number'
      ? 'unooria-card__line-clamp'
      : truncate
      ? 'unooria-card__truncate'
      : '';

    const customStyle = typeof truncate === 'number'
      ? ({ WebkitLineClamp: truncate, ...rest.style } as React.CSSProperties)
      : rest.style;

    return (
      <p
        ref={ref}
        className={`unooria-card__description ${truncateClass} ${className}`.trim()}
        style={customStyle}
        {...rest}
      >
        {icon && <span className="unooria-card__description-icon" aria-hidden="true">{icon}</span>}
        <span className="unooria-card__description-text">{children}</span>
      </p>
    );
  }
);
CardDescription.displayName = 'CardDescription';

// ============================================================================
// Subcomponente: CardHeader
// ============================================================================
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ avatar, title, subtitle, action, className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`unooria-card__header ${className}`.trim()} {...rest}>
        {(avatar || title || subtitle) ? (
          <div className="unooria-card__header-main">
            {avatar && <div className="unooria-card__avatar">{avatar}</div>}
            {(title || subtitle) && (
              <div className="unooria-card__header-text">
                {typeof title === 'string' ? <CardTitle size="md">{title}</CardTitle> : title}
                {subtitle && (
                  typeof subtitle === 'string' ? (
                    <p className="unooria-card__subtitle">{subtitle}</p>
                  ) : (
                    subtitle
                  )
                )}
              </div>
            )}
          </div>
        ) : null}

        {children}

        {action && <div className="unooria-card__header-action">{action}</div>}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

// ============================================================================
// Subcomponente: CardMedia
// ============================================================================
export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  (
    {
      src,
      alt = '',
      height = 244,
      aspectRatio,
      fit = 'cover',
      position = 'center',
      overlay,
      badge,
      badgePosition = 'top-left',
      className = '',
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const formattedHeight = typeof height === 'number' ? `${height}px` : height;

    const mediaStyle: React.CSSProperties = {
      height: aspectRatio ? undefined : formattedHeight,
      aspectRatio: aspectRatio || undefined,
      ...style,
    };

    const imgStyle: React.CSSProperties = {
      objectFit: fit,
      objectPosition: position,
    };

    return (
      <div ref={ref} className={`unooria-card__media ${className}`.trim()} style={mediaStyle} {...rest}>
        {badge && (
          <div className={`unooria-card__media-badge-container unooria-card__media-badge--${badgePosition}`}>
            {badge}
          </div>
        )}

        {src && (
          <img
            src={src}
            alt={alt}
            className="unooria-card__media-img"
            style={imgStyle}
            loading="lazy"
          />
        )}

        {overlay && <div className="unooria-card__media-overlay">{overlay}</div>}

        {children}
      </div>
    );
  }
);
CardMedia.displayName = 'CardMedia';

// ============================================================================
// Subcomponente: CardContent
// ============================================================================
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ padding = 'md', className = '', style, children, ...rest }, ref) => {
    const isCustomPadding = typeof padding === 'number' || (typeof padding === 'string' && !['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(padding));
    const paddingClass = isCustomPadding ? '' : `unooria-card__content--padding-${padding}`;
    const customStyle: React.CSSProperties = isCustomPadding ? { padding, ...style } : { ...style };

    return (
      <div
        ref={ref}
        className={`unooria-card__content ${paddingClass} ${className}`.trim()}
        style={customStyle}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';
export const CardBody = CardContent;

// ============================================================================
// Subcomponente: CardBadgeGroup
// ============================================================================
export const CardBadgeGroup = forwardRef<HTMLDivElement, CardBadgeGroupProps>(
  ({ gap = 'sm', wrap = true, align = 'start', className = '', style, children, ...rest }, ref) => {
    const isNamedGap = typeof gap === 'string' && ['xs', 'sm', 'md'].includes(gap);
    const gapClass = isNamedGap ? `unooria-card__badge-group--gap-${gap}` : '';
    const customStyle: React.CSSProperties = !isNamedGap && gap !== undefined ? { gap, ...style } : { ...style };

    const classes = [
      'unooria-card__badge-group',
      wrap ? 'unooria-card__badge-group--wrap' : '',
      `unooria-card__badge-group--align-${align}`,
      gapClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} style={customStyle} {...rest}>
        {children}
      </div>
    );
  }
);
CardBadgeGroup.displayName = 'CardBadgeGroup';

// ============================================================================
// Subcomponente: CardProgress
// ============================================================================
export const CardProgress = forwardRef<HTMLDivElement, CardProgressProps>(
  (
    {
      value,
      size = 48,
      strokeWidth = 4,
      trackColor,
      progressColor,
      showLabel = true,
      label,
      labelPosition = 'inside',
      helperText,
      title,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, Math.round(value)));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    const displayLabel = label !== undefined ? label : `${clampedValue}%`;

    return (
      <div
        ref={ref}
        className={`unooria-card__progress-container ${className}`.trim()}
        title={title || `Progresso: ${clampedValue}%`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={style}
        {...rest}
      >
        <div className="unooria-card__progress-circle-wrap" style={{ width: size, height: size }}>
          <svg
            className="unooria-card__progress-svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
          >
            <circle
              className="unooria-card__progress-track"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              style={trackColor ? { stroke: trackColor } : undefined}
            />
            <circle
              className="unooria-card__progress-bar"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              style={progressColor ? { stroke: progressColor } : undefined}
            />
          </svg>

          {showLabel && labelPosition === 'inside' && (
            <span className="unooria-card__progress-inside-text">{displayLabel}</span>
          )}
        </div>

        {(showLabel && (labelPosition === 'right' || labelPosition === 'bottom') || helperText) && (
          <div className="unooria-card__progress-meta">
            {showLabel && labelPosition !== 'inside' && (
              <span className="unooria-card__progress-meta-label">{displayLabel}</span>
            )}
            {helperText && (
              <span className="unooria-card__progress-meta-helper">{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);
CardProgress.displayName = 'CardProgress';

// ============================================================================
// Subcomponente: CardFooter
// ============================================================================
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      align = 'space-between',
      direction = 'row',
      divider = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'unooria-card__footer',
      `unooria-card__footer--align-${align}`,
      `unooria-card__footer--direction-${direction}`,
      divider ? 'unooria-card__footer--divider' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';

// ============================================================================
// Componente Principal: Card
// ============================================================================
interface CardComponent
  extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Media: typeof CardMedia;
  Content: typeof CardContent;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  BadgeGroup: typeof CardBadgeGroup;
  Progress: typeof CardProgress;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      orientation = 'vertical',
      theme = 'light',
      radius = 'lg',
      padding = 'none',
      interactive = false,
      fullWidth = false,
      disabled = false,
      avatar,
      title,
      subtitle,
      headerAction,
      image,
      mediaSrc,
      mediaAlt = '',
      mediaHeight = 244,
      mediaAspectRatio,
      mediaBadge,
      description,
      descriptionIcon,
      badges,
      progress,
      primaryAction,
      secondaryAction,
      footer,
      as: Component = 'div',
      className = '',
      style,
      onClick,
      children,
      ...rest
    },
    ref
  ) => {
    const isInteractive = interactive || variant === 'interactive' || Boolean(onClick);

    const isNamedRadius = typeof radius === 'string' && ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(radius);
    const radiusClass = isNamedRadius ? `unooria-card--radius-${radius}` : '';
    const customRadiusStyle: React.CSSProperties = !isNamedRadius && radius !== undefined ? { borderRadius: radius } : {};

    const isNamedPadding = typeof padding === 'string' && ['none', 'xs', 'sm', 'md', 'lg'].includes(padding);
    const paddingClass = isNamedPadding ? `unooria-card--padding-${padding}` : '';
    const customPaddingStyle: React.CSSProperties = !isNamedPadding && padding !== undefined ? { padding } : {};

    const cardClasses = [
      'unooria-card',
      `unooria-card--variant-${variant}`,
      `unooria-card--orientation-${orientation}`,
      `unooria-card--theme-${theme}`,
      radiusClass,
      paddingClass,
      isInteractive ? 'unooria-card--interactive' : '',
      fullWidth ? 'unooria-card--full-width' : '',
      disabled ? 'unooria-card--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const combinedStyle: React.CSSProperties = {
      ...customRadiusStyle,
      ...customPaddingStyle,
      ...style,
    };

    // Resolução de Mídia (Prop Declarativa)
    const resolvedMediaSrc = mediaSrc || (typeof image === 'string' ? image : image?.src);
    const resolvedMediaAlt = mediaAlt || (typeof image === 'object' ? image.alt : '');
    const resolvedMediaHeight = (typeof image === 'object' && image.height) ? image.height : mediaHeight;
    const resolvedMediaAspect = (typeof image === 'object' && image.aspectRatio) ? image.aspectRatio : mediaAspectRatio;
    const resolvedMediaBadge = mediaBadge || (typeof image === 'object' ? image.badge : undefined);

    // Resolução de Botões Shorthand
    const renderActionBtn = (action: React.ReactNode | CardActionConfig, isPrimary: boolean) => {
      if (!action) return null;
      if (React.isValidElement(action)) return action;

      const config = action as CardActionConfig;
      const btnVariant = config.variant || (isPrimary ? 'primary' : 'secondary');

      return (
        <button
          type="button"
          key={isPrimary ? 'primary-btn' : 'secondary-btn'}
          className={`unooria-card__action-btn unooria-card__action-btn--${btnVariant}`}
          onClick={config.onClick}
          disabled={config.disabled}
        >
          {config.icon}
          {config.label}
        </button>
      );
    };

    // Shorthand de Badges
    const renderBadges = () => {
      if (!badges || !Array.isArray(badges) || badges.length === 0) return null;
      return (
        <CardBadgeGroup>
          {badges.map((badgeItem, index) => {
            if (React.isValidElement(badgeItem)) {
              return React.cloneElement(badgeItem, { key: (badgeItem as any).key || index });
            }
            const item = badgeItem as { label: string; variant?: string; color?: string };
            return (
              <span
                key={index}
                className="unooria-card__action-btn unooria-card__action-btn--secondary"
                style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999 }}
              >
                {item.label}
              </span>
            );
          })}
        </CardBadgeGroup>
      );
    };

    // Shorthand de Progresso
    const renderProgress = () => {
      if (progress === undefined) return null;
      if (typeof progress === 'number') {
        return <CardProgress value={progress} />;
      }
      const pConfig = progress as CardProgressConfig;
      return (
        <CardProgress
          value={pConfig.value}
          label={pConfig.label}
          showLabel={pConfig.showLabel}
          progressColor={pConfig.color}
          size={pConfig.size}
          helperText={pConfig.helperText}
        />
      );
    };

    // Se o desenvolvedor forneceu children diretos, respeitamos a composição customizada
    const hasShorthandContent = Boolean(
      avatar ||
      title ||
      subtitle ||
      headerAction ||
      resolvedMediaSrc ||
      description ||
      badges ||
      progress !== undefined ||
      primaryAction ||
      secondaryAction ||
      footer
    );

    const contentBody = (
      <>
        {(avatar || title || subtitle || headerAction) && (
          <CardHeader
            avatar={avatar}
            title={title}
            subtitle={subtitle}
            action={headerAction}
          />
        )}

        {resolvedMediaSrc && (
          <CardMedia
            src={resolvedMediaSrc}
            alt={resolvedMediaAlt}
            height={resolvedMediaHeight}
            aspectRatio={resolvedMediaAspect}
            badge={resolvedMediaBadge}
          />
        )}

        {(description || badges || progress !== undefined || children) && (
          <CardContent>
            {badges && renderBadges()}
            {description && (
              <CardDescription icon={descriptionIcon}>
                {description}
              </CardDescription>
            )}
            {progress !== undefined && renderProgress()}
            {children}
          </CardContent>
        )}

        {(footer || primaryAction || secondaryAction) && (
          <CardFooter>
            {footer ? (
              footer
            ) : (
              <>
                <div className="unooria-card__actions-group">
                  {renderActionBtn(secondaryAction, false)}
                </div>
                <div className="unooria-card__actions-group">
                  {renderActionBtn(primaryAction, true)}
                </div>
              </>
            )}
          </CardFooter>
        )}
      </>
    );

    return React.createElement(
      Component,
      {
        ref: ref as any,
        className: cardClasses,
        style: combinedStyle,
        onClick: disabled ? undefined : onClick,
        tabIndex: isInteractive && !disabled ? 0 : undefined,
        role: isInteractive ? 'button' : undefined,
        'aria-disabled': disabled ? true : undefined,
        ...rest,
      },
      hasShorthandContent ? (
        orientation === 'horizontal' ? (
          <>
            {resolvedMediaSrc && (
              <CardMedia
                src={resolvedMediaSrc}
                alt={resolvedMediaAlt}
                height="100%"
                aspectRatio={resolvedMediaAspect}
                badge={resolvedMediaBadge}
              />
            )}
            <div className="unooria-card__body-wrapper">
              {(avatar || title || subtitle || headerAction) && (
                <CardHeader
                  avatar={avatar}
                  title={title}
                  subtitle={subtitle}
                  action={headerAction}
                />
              )}
              {(description || badges || progress !== undefined || children) && (
                <CardContent>
                  {badges && renderBadges()}
                  {description && (
                    <CardDescription icon={descriptionIcon}>
                      {description}
                    </CardDescription>
                  )}
                  {progress !== undefined && renderProgress()}
                  {children}
                </CardContent>
              )}
              {(footer || primaryAction || secondaryAction) && (
                <CardFooter>
                  {footer ? (
                    footer
                  ) : (
                    <>
                      <div className="unooria-card__actions-group">
                        {renderActionBtn(secondaryAction, false)}
                      </div>
                      <div className="unooria-card__actions-group">
                        {renderActionBtn(primaryAction, true)}
                      </div>
                    </>
                  )}
                </CardFooter>
              )}
            </div>
          </>
        ) : (
          contentBody
        )
      ) : (
        children
      )
    );
  }
) as CardComponent;

Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.BadgeGroup = CardBadgeGroup;
Card.Progress = CardProgress;
