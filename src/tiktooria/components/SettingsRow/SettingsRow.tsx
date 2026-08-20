import React from 'react';
import { Icon } from '../Icon';
import type { TikSettingsRowProps } from './SettingsRow.types';
import './SettingsRow.css';

/**
 * Componente SettingsRow — Design System Tik Tooria
 *
 * Linha de 414×52 das telas "Privacy and settings" e "Edit profile" (nodes
 * 4:255 e 4:361). Reúne quatro zonas: glifo à esquerda a 16–19px da borda,
 * rótulo em Regular 15, valor opcional alinhado à direita a 36px e divisa de
 * avanço a 19,45px da borda direita.
 *
 * A linha não tem fio próprio nem sombra: a separação vem do `Separator` entre
 * seções, exatamente como no arquivo.
 */
export const SettingsRow = React.forwardRef<HTMLButtonElement, TikSettingsRowProps>(
  (
    {
      label,
      icon,
      value,
      showChevron = true,
      trailingIcon,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      className={[
        'tik-settingsrow',
        icon ? 'tik-settingsrow--with-icon' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {icon && (
        <span className="tik-settingsrow__icon">
          <Icon name={icon} size="sm" tone="default" />
        </span>
      )}

      <span className="tik-settingsrow__label">{label}</span>

      {value !== undefined && <span className="tik-settingsrow__value">{value}</span>}

      {trailingIcon ? (
        <Icon name={trailingIcon} size={13} tone="primary" />
      ) : (
        showChevron && <Icon name="chevron" size={10.5} tone="default" />
      )}
    </button>
  )
);

SettingsRow.displayName = 'SettingsRow';
