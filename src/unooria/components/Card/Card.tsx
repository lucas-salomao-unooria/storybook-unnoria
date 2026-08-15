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
} from './Card.types';
import './Card.css';

/**
 * Ícone padrão de 3 pontos verticais (more_vert)
 */
const MoreVertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

// ============================================================================
// Subcomponente: CardProgress (Circular 56x56px do Figma)
// ============================================================================
export const CardProgress: React.FC<CardProgressProps> = ({
  value,
  size = 56,
  strokeWidth = 4,
  showLabel = true,
  className = '',
  ...rest
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={`unooria-card__progress-container ${className}`} style={{ width: size, height: size }} {...rest}>
      <svg className="unooria-card__progress-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="unooria-card__progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="unooria-card__progress-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showLabel && <span className="unooria-card__progress-label">{Math.round(clampedValue)}%</span>}
    </div>
  );
};

// ============================================================================
// Subcomponente: CardTitle
// ============================================================================
export const CardTitle = forwardRef<HTMLElement, CardTitleProps>(
  ({ as: Component = 'h3', size = 'md', className = '', children, ...rest }, ref) => {
    return React.createElement(
      Component,
      {
        ref: ref as any,
        className: `unooria-card__title unooria-card__title--${size} ${className}`.trim(),
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
  ({ icon, className = '', children, ...rest }, ref) => {
    return (
      <p ref={ref} className={`unooria-card__description ${className}`.trim()} {...rest}>
        {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
        {children}
      </p>
    );
  }
);
CardDescription.displayName = 'CardDescription';

// ============================================================================
// Subcomponente: CardMedia
// ============================================================================
export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ src, alt = '', height = 244, className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`unooria-card__media ${className}`.trim()} style={{ height }} {...rest}>
        {src && <img src={src} alt={alt} className="unooria-card__media-img" />}
        {children}
      </div>
    );
  }
);
CardMedia.displayName = 'CardMedia';

// ============================================================================
// Subcomponente: CardHeader (Com alinhamento inteligente de Ícone vs Tag)
// ============================================================================
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ icon, tag, tags = [], action, title, subtitle, progress, className = '', children, ...rest }, ref) => {
    const allTags = tag ? [tag, ...tags] : tags;
    const hasIcon = !!icon;
    const hasTags = allTags.length > 0;

    return (
      <div ref={ref} className={`unooria-card__header ${className}`.trim()} {...rest}>
        {/* Linha Superior: Ícone e/ou Tags */}
        {(hasIcon || hasTags || action) && (
          <div
            className="unooria-card__header-row"
            style={{
              justifyContent: hasIcon && !hasTags && !action ? 'flex-start' : !hasIcon && (hasTags || action) ? 'flex-start' : 'space-between',
            }}
          >
            {hasIcon && <div className="unooria-card__header-icon">{icon}</div>}

            {(hasTags || action) && (
              <div className="unooria-card__header-tags-container" style={{ marginLeft: hasIcon ? 'auto' : 0 }}>
                {allTags.map((t, idx) => (
                  <div key={idx} className="unooria-card__tag">
                    {t}
                  </div>
                ))}
                {action && <div className="unooria-card__header-action">{action}</div>}
              </div>
            )}
          </div>
        )}

        {/* Linha de Título + Progresso Circular */}
        {(title || subtitle || progress !== undefined) && (
          <div className="unooria-card__title-row">
            <div className="unooria-card__title-group">
              {title && (typeof title === 'string' ? <CardTitle>{title}</CardTitle> : title)}
              {subtitle && (typeof subtitle === 'string' ? <p className="unooria-card__subtitle">{subtitle}</p> : subtitle)}
            </div>
            {progress !== undefined && <CardProgress value={progress} />}
          </div>
        )}

        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

// ============================================================================
// Subcomponente: CardContent
// ============================================================================
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`unooria-card__content ${className}`.trim()} {...rest}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';

// ============================================================================
// Subcomponente: CardFooter
// ============================================================================
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`unooria-card__actions ${className}`.trim()} {...rest}>
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';

// ============================================================================
// Componente Principal: Card (Design System Unooria)
// ============================================================================
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      theme = 'light',
      interactive = false,
      disabled = false,

      icon,
      tag,
      tags = [],
      optionsAction,
      image,
      imageAlt = '',
      title,
      subtitle,
      progress,
      description,
      metadata = [],
      subtags = [],
      primaryAction,
      secondaryAction,
      actions,

      className = '',
      style,
      children,
      ...restProps
    },
    ref
  ) => {
    const cardClasses = [
      'unooria-card',
      `unooria-card--theme-${theme}`,
      variant !== 'default' ? `unooria-card--${variant}` : '',
      interactive ? 'unooria-card--interactive' : '',
      disabled ? 'unooria-card--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Consolidação de ações (regra de 1 vs 2 botões)
    const effectiveActions = actions || (
      secondaryAction && primaryAction
        ? [{ ...secondaryAction, variant: 'subtle' as const }, { ...primaryAction, variant: 'filled' as const }]
        : primaryAction
        ? [{ ...primaryAction, variant: 'subtle' as const }]
        : secondaryAction
        ? [{ ...secondaryAction, variant: 'subtle' as const }]
        : []
    );

    return (
      <div ref={ref} className={cardClasses} style={style} data-theme={theme} {...restProps}>
        {/* Renderização de atalhos declarativos se fornecidos */}
        {(icon || tag || tags.length > 0 || optionsAction) && (
          <div className="unooria-card__header-row">
            {icon && <div className="unooria-card__header-icon">{icon}</div>}

            {(tag || tags.length > 0 || optionsAction) && (
              <div className="unooria-card__header-tags-container" style={{ marginLeft: icon ? 'auto' : 0 }}>
                {tag && <div className="unooria-card__tag">{tag}</div>}
                {tags.map((t, idx) => (
                  <div key={idx} className="unooria-card__tag">
                    {t}
                  </div>
                ))}
                {optionsAction || (
                  <button type="button" className="unooria-card__options-btn" aria-label="Mais opções">
                    <MoreVertIcon />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Imagem de Capa */}
        {image && <CardMedia src={image} alt={imageAlt} />}

        {/* Bloco de Título e Progresso */}
        {(title || subtitle || progress !== undefined) && (
          <div className="unooria-card__title-row">
            <div className="unooria-card__title-group">
              {title && (typeof title === 'string' ? <CardTitle>{title}</CardTitle> : title)}
              {subtitle && (typeof subtitle === 'string' ? <p className="unooria-card__subtitle">{subtitle}</p> : subtitle)}
            </div>
            {progress !== undefined && <CardProgress value={progress} />}
          </div>
        )}

        {/* Descrição */}
        {description && (
          typeof description === 'string' ? (
            <p className="unooria-card__description">{description}</p>
          ) : (
            description
          )
        )}

        {/* Metadados (Ícone + Texto) */}
        {metadata.length > 0 && (
          <div className="unooria-card__metadata-list">
            {metadata.map((item, idx) => (
              <div key={idx} className="unooria-card__metadata-item">
                {item.icon && <span className="unooria-card__metadata-icon">{item.icon}</span>}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Subtags */}
        {subtags.length > 0 && (
          <div className="unooria-card__subtags-container">
            {subtags.map((st, idx) => (
              <div key={idx} className="unooria-card__tag">
                {st}
              </div>
            ))}
          </div>
        )}

        {/* Botões de Ação Inferiores */}
        {effectiveActions.length > 0 && (
          <div className={`unooria-card__actions ${effectiveActions.length === 1 ? 'unooria-card__actions--single' : ''}`}>
            {effectiveActions.map((act, idx) => (
              <button
                key={idx}
                type="button"
                className={`unooria-card__btn ${act.variant === 'filled' ? 'unooria-card__btn--filled' : 'unooria-card__btn--subtle'}`}
                onClick={act.onClick}
                disabled={act.disabled}
              >
                {act.label}
              </button>
            ))}
          </div>
        )}

        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
