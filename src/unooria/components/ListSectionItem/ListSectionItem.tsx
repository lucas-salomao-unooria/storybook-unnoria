import React, { forwardRef } from 'react';
import { ListSectionItemProps } from './ListSectionItem.types';
import { Checkbox } from '../Checkbox/Checkbox';
import { Toggle } from '../Toggle/Toggle';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import './ListSectionItem.css';

/**
 * Componente oficial ListSectionItem (Item de Lista de Seção / Linha de Módulo) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6101:5691 / Component Set 1537:4807)
 */
export const ListSectionItem = forwardRef<HTMLDivElement, ListSectionItemProps>(
  (
    {
      title,
      description,
      metadata,
      category,
      visual = 'none',
      icon,
      avatar,
      showCheckbox = false,
      checked = false,
      onCheckChange,
      tag,
      showToggle = false,
      toggleChecked = false,
      onToggleChange,
      actions,
      showMoreAction = false,
      onMoreActionClick,
      showChevron = false,
      onClick,
      selected = false,
      disabled = false,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const isClickable = !!onClick && !disabled;

    const clickableClass = isClickable ? 'unooria-list-section-item--clickable' : '';
    const selectedClass = selected ? 'unooria-list-section-item--selected' : '';
    const disabledClass = disabled ? 'unooria-list-section-item--disabled' : '';
    const themeClass = theme === 'dark' ? 'unooria-list-section-item--theme-dark' : '';

    const containerClassName = [
      'unooria-list-section-item',
      clickableClass,
      selectedClass,
      disabledClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleCheckboxChange = (checkedVal: boolean) => {
      onCheckChange?.(checkedVal);
    };

    const handleToggleChange = (checkedVal: boolean) => {
      onToggleChange?.(checkedVal);
    };

    const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onMoreActionClick?.(e);
    };

    const renderVisual = () => {
      if (visual === 'avatar') {
        if (typeof avatar === 'string') {
          return (
            <div className="unooria-list-section-item__visual-avatar">
              <Avatar src={avatar} size="xs" alt={typeof title === 'string' ? title : 'Avatar'} />
            </div>
          );
        }
        return <div className="unooria-list-section-item__visual-avatar">{avatar}</div>;
      }

      if (visual === 'icon' || icon) {
        return (
          <div className="unooria-list-section-item__visual-icon">
            {typeof icon === 'string' ? (
              <Icon name={icon} size="xs" color="currentColor" />
            ) : (
              icon || <Icon name="menu_book" size="xs" color="currentColor" />
            )}
          </div>
        );
      }

      return null;
    };

    const hasTrailing = tag || showToggle || actions || showMoreAction || showChevron;

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? onClick : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={containerClassName}
        style={style}
        {...rest}
      >
        {/* Lado Esquerdo (Leading Elements + Content Stack) */}
        <div className="unooria-list-section-item__left">
          {showCheckbox && (
            <div
              className="unooria-list-section-item__checkbox"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                disabled={disabled}
                theme={theme}
              />
            </div>
          )}

          {renderVisual()}

          {/* Middle Content Stack */}
          <div className="unooria-list-section-item__content">
            {category && (
              <span className="unooria-list-section-item__category">{category}</span>
            )}

            <h4 className="unooria-list-section-item__title">{title}</h4>

            {description && (
              <p className="unooria-list-section-item__description">{description}</p>
            )}

            {metadata && (
              <p className="unooria-list-section-item__metadata">{metadata}</p>
            )}
          </div>
        </div>

        {/* Lado Direito (Trailing Elements & Ações) */}
        {hasTrailing && (
          <div className="unooria-list-section-item__right">
            {tag && <div onClick={(e) => e.stopPropagation()}>{tag}</div>}

            {showToggle && (
              <div onClick={(e) => e.stopPropagation()}>
                <Toggle
                  size="xs"
                  checked={toggleChecked}
                  onChange={handleToggleChange}
                  disabled={disabled}
                  theme={theme}
                />
              </div>
            )}

            {actions && <div onClick={(e) => e.stopPropagation()}>{actions}</div>}

            {showMoreAction && (
              <button
                type="button"
                aria-label="Mais opções"
                onClick={handleMoreClick}
                className="unooria-list-section-item__more-btn"
              >
                <Icon name="more_vert" size="s" color="currentColor" />
              </button>
            )}

            {showChevron && (
              <span className="unooria-list-section-item__chevron">
                <Icon name="chevron_right" size="s" color="currentColor" />
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

ListSectionItem.displayName = 'ListSectionItem';

export default ListSectionItem;
