'use client';

import React, { useState, forwardRef, isValidElement, cloneElement, Children } from 'react';
import { AvatarProps, AvatarGroupProps } from './Avatar.types';
import './Avatar.css';

/**
 * Ícone SVG padrão de usuário (Fallback de alta fidelidade visual).
 */
const DefaultUserSvg: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

/**
 * Ícone SVG de Fechar/Remover (X) para o botão de remoção do Avatar.
 */
const RemoveSvg: React.FC = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

/**
 * Extrai as iniciais de um nome (ex: "Lucas Salomão" -> "LS", "Carlos" -> "CA").
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  return (firstInitial + lastInitial).toUpperCase();
}

/**
 * Componente Avatar - Design System Plataforma Unooria
 * 
 * Exibe a imagem de perfil do usuário, iniciais geradas dinamicamente ou ícones,
 * com suporte a formatos (circle, rounded, square), status de disponibilidade,
 * badge de notificação, botão de remoção e borda com gradiente Unooria no estado selecionado.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      srcSet,
      alt,
      name,
      icon,
      size = 'md',
      variant = 'circle',
      status = 'none',
      state = 'default',
      selected = false,
      badge,
      badgeCount,
      isRemovable = false,
      onRemove,
      theme = 'light',
      disabled = false,
      fallback,
      as: Component = 'div',
      className = '',
      style,
      onClick,
      onKeyDown,
      children,
      ...restProps
    },
    ref
  ) => {
    const [imageHasError, setImageHasError] = useState(false);

    // Reseta o erro caso o src mude dinamicamente (ajuste de estado durante a
    // renderização, padrão recomendado pelo React em vez de um efeito).
    const [lastLoadedSrc, setLastLoadedSrc] = useState(src);
    if (src !== lastLoadedSrc) {
      setLastLoadedSrc(src);
      setImageHasError(false);
    }

    // Resolução dos estados funcionais
    const isSelected = Boolean(selected || state === 'selected' || state === 'selected_remove');
    const showRemove = Boolean(isRemovable || state === 'default_remove' || state === 'selected_remove');
    const showBadge = Boolean(badge !== undefined || badgeCount !== undefined || state === 'notification');
    const isInteractive = Boolean(onClick) && !disabled;

    const avatarClasses = [
      'unooria-avatar',
      `unooria-avatar--size-${size}`,
      `unooria-avatar--variant-${variant}`,
      `unooria-avatar--${theme}`,
      isSelected ? 'unooria-avatar--selected' : '',
      isInteractive ? 'unooria-avatar--interactive' : '',
      disabled ? 'unooria-avatar--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled && onRemove) {
        onRemove(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        if (onClick) {
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    // Renderização do conteúdo interno (imagem, iniciais, ícone ou fallback)
    const renderContent = () => {
      if (src && !imageHasError) {
        return (
          <img
            src={src}
            srcSet={srcSet}
            alt={alt || name || 'Avatar do usuário'}
            onError={() => setImageHasError(true)}
            className="unooria-avatar__img"
          />
        );
      }

      if (name) {
        return <span className="unooria-avatar__initials">{getInitials(name)}</span>;
      }

      if (icon) {
        return <span className="unooria-avatar__icon">{icon}</span>;
      }

      if (children) {
        return <span className="unooria-avatar__initials">{children}</span>;
      }

      if (fallback) {
        return <span className="unooria-avatar__icon">{fallback}</span>;
      }

      return (
        <span className="unooria-avatar__icon">
          <DefaultUserSvg />
        </span>
      );
    };

    // Renderização do badge de notificação
    const renderBadge = () => {
      if (!showBadge) return null;

      if (badgeCount !== undefined) {
        const displayCount = badgeCount > 99 ? '99+' : badgeCount;
        return (
          <span className="unooria-avatar__badge" aria-label={`${badgeCount} notificações`}>
            {displayCount}
          </span>
        );
      }

      if (typeof badge === 'number' || typeof badge === 'string') {
        return <span className="unooria-avatar__badge">{badge}</span>;
      }

      if (isValidElement(badge)) {
        return <span className="unooria-avatar__badge">{badge}</span>;
      }

      // Badge simples em dot
      return <span className="unooria-avatar__badge unooria-avatar__badge--dot" aria-label="Nova notificação" />;
    };

    return (
      <Component
        ref={ref}
        data-theme={theme}
        className={avatarClasses}
        style={style}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled ? true : undefined}
        role={isInteractive ? (restProps.role || 'button') : restProps.role}
        tabIndex={isInteractive ? (restProps.tabIndex ?? 0) : restProps.tabIndex}
        {...restProps}
      >
        {/* Corpo principal do avatar */}
        <div className="unooria-avatar__inner">{renderContent()}</div>

        {/* Indicador de Status (Online, Offline, Busy, Away) */}
        {status !== 'none' && (
          <span
            className={`unooria-avatar__status unooria-avatar__status--${status}`}
            aria-label={`Status: ${status}`}
          />
        )}

        {/* Badge de Notificação */}
        {renderBadge()}

        {/* Botão de Remoção (X) */}
        {showRemove && (
          <button
            type="button"
            className="unooria-avatar__remove-btn"
            onClick={handleRemoveClick}
            aria-label={name ? `Remover avatar de ${name}` : 'Remover avatar'}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <RemoveSvg />
          </button>
        )}
      </Component>
    );
  }
);

Avatar.displayName = 'Avatar';

/**
 * Componente AvatarGroup - Design System Plataforma Unooria
 * 
 * Agrupa múltiplos componentes Avatar com sobreposição harmônica,
 * controle de limite máximo (`max`) e indicador numérico de excedentes (+N).
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max,
      total,
      size = 'md',
      variant = 'circle',
      theme = 'light',
      spacing = 'normal',
      onExtraClick,
      extraAriaLabel,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const validChildren = Children.toArray(children).filter(isValidElement);
    const totalAvatars = total ?? validChildren.length;
    const shouldTruncate = typeof max === 'number' && max > 0 && validChildren.length > max;

    const visibleAvatars = shouldTruncate ? validChildren.slice(0, max) : validChildren;
    const excessCount = shouldTruncate ? totalAvatars - max : 0;

    const spacingClass = typeof spacing === 'string' ? `unooria-avatar-group--spacing-${spacing}` : '';
    const numericSpacingStyle =
      typeof spacing === 'number'
        ? ({ ['--unooria-avatar-group-overlap' as string]: `${spacing <= 0 ? spacing : -spacing}px` } as React.CSSProperties)
        : undefined;

    const groupStyle: React.CSSProperties = {
      ...numericSpacingStyle,
      ...style,
    };

    const groupClasses = [
      'unooria-avatar-group',
      spacingClass,
      `unooria-avatar-group--${theme}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        data-theme={theme}
        className={groupClasses}
        style={groupStyle}
        role="group"
        aria-label="Grupo de avatares"
        {...restProps}
      >
        {visibleAvatars.map((child, index) => {
          // Repassa size, variant e theme como fallback caso não especificados no filho
          const childProps = child.props as Partial<AvatarProps>;
          return cloneElement(child as React.ReactElement<AvatarProps>, {
            key: child.key || `avatar-group-item-${index}`,
            size: childProps.size ?? size,
            variant: childProps.variant ?? variant,
            theme: childProps.theme ?? theme,
          });
        })}

        {/* Indicador de excesso (+N) */}
        {shouldTruncate && excessCount > 0 && (
          <Avatar
            size={size}
            variant={variant}
            theme={theme}
            name={`+${excessCount}`}
            className="unooria-avatar--extra"
            onClick={onExtraClick}
            aria-label={extraAriaLabel || `+${excessCount} outros usuários`}
            tabIndex={onExtraClick ? 0 : undefined}
          />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
