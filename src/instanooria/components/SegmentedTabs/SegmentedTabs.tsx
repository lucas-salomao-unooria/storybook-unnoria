import React from 'react';
import { Icon } from '../Icon';
import type { InstaSegmentedTabsProps } from './SegmentedTabs.types';
import './SegmentedTabs.css';

/**
 * Componente SegmentedTabs — Design System Instanooria
 *
 * Alternância entre duas ou mais seções de uma mesma tela. Cobre tanto a
 * variante textual "Following / You" da tela de atividade quanto a variante de
 * ícones (grade e marcações) do perfil, ambas com indicador inferior de 1px.
 */
export const SegmentedTabs = React.forwardRef<HTMLDivElement, InstaSegmentedTabsProps>(
  (
    {
      items,
      activeId,
      onChange,
      variant = 'text',
      ariaLabel = 'Seções',
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['insta-segmented-tabs', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        data-insta-theme={theme}
        className={classes}
        {...restProps}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={variant === 'icon' ? item.label : undefined}
              className={[
                'insta-segmented-tabs__item',
                isActive ? 'insta-segmented-tabs__item--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onChange?.(item.id, item, index)}
            >
              {variant === 'icon' && item.icon ? (
                <Icon name={item.icon} size={23} tone="inherit" theme={theme} />
              ) : (
                item.label
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedTabs.displayName = 'SegmentedTabs';
