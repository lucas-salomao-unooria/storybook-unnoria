'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { TikProfileTabsProps } from './ProfileTabs.types';
import './ProfileTabs.css';

/**
 * Componente ProfileTabs — Design System Tik Tooria
 *
 * Faixa de 414×40 entre o cabeçalho do perfil e a grade de mídia (node 4:471).
 * A aba ativa recebe o sublinhado de 2px em `--tik-color-border-tab-active`
 * (node 4:476) sobre uma largura de 48px, como no arquivo.
 */
export const ProfileTabs = React.forwardRef<HTMLElement, TikProfileTabsProps>(
  ({ tabs, active, onSelect, className = '', ...restProps }, ref) => (
    <nav
      ref={ref}
      role="tablist"
      className={['tik-profiletabs', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={tab.label}
            disabled={tab.disabled}
            className={['tik-profiletabs__tab', isActive ? 'tik-profiletabs__tab--active' : '']
              .filter(Boolean)
              .join(' ')}
            onClick={onSelect ? () => onSelect(tab.id) : undefined}
          >
            <Icon name={tab.icon} size="sm" tone={tab.disabled ? 'tabDisabled' : 'inherit'} />
          </button>
        );
      })}
    </nav>
  )
);

ProfileTabs.displayName = 'ProfileTabs';
