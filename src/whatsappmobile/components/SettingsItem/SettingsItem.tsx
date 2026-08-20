'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { WaSettingsItemProps } from './SettingsItem.types';
import './SettingsItem.css';

/**
 * Componente SettingsItem — Design System WhatsApp Mobile
 *
 * Linha de configuração com glifo, título e descrição. Todos os glifos vêm do
 * registro oficial exportado do Figma (chave, conversa, campainha, disco de
 * armazenamento, ajuda e contatos).
 */
export const SettingsItem = React.forwardRef<HTMLElement, WaSettingsItemProps>(
  (
    { icon, title, description, iconRotate = 0, onClick, className = '', ...restProps },
    ref
  ) => {
    const isInteractive = Boolean(onClick);
    const Component = (isInteractive ? 'button' : 'li') as React.ElementType;

    return (
      <Component
        ref={ref as never}
        className={[
          'wa-settingsitem',
          isInteractive ? 'wa-settingsitem--interactive' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={onClick}
        type={isInteractive ? 'button' : undefined}
        {...restProps}
      >
        <span className="wa-settingsitem__icon">
          <Icon name={icon} size={20} tone="settings" rotate={iconRotate} />
        </span>

        <span className="wa-settingsitem__content">
          <span className="wa-settingsitem__title">{title}</span>
          {description && <span className="wa-settingsitem__description">{description}</span>}
        </span>
      </Component>
    );
  }
);

SettingsItem.displayName = 'SettingsItem';
