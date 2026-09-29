import React from 'react';
import { Icon } from '../Icon';
import type { UncCheckboxProps } from './Checkbox.types';
import './Checkbox.css';

/**
 * Componente Checkbox — Design System Unoochat
 *
 * Caixa de seleção do rodapé do diálogo modal ("Mostrar notificações"). O
 * estado marcado usa o glifo `tick` do registro de ícones.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, UncCheckboxProps>(
  ({ label, checked, disabled, className = '', ...restProps }, ref) => (
    <label
      className={['unc-checkbox', disabled ? 'unc-checkbox--disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={ref}
        type="checkbox"
        className="unc-checkbox__input"
        checked={checked}
        disabled={disabled}
        {...restProps}
      />
      <span className="unc-checkbox__control" aria-hidden="true">
        {checked && <Icon name="tick" size={14} tone="inherit" />}
      </span>
      <span className="unc-checkbox__label">{label}</span>
    </label>
  )
);

Checkbox.displayName = 'Checkbox';
