import React from 'react';
import { Icon } from '../Icon';
import type { WaCheckboxProps } from './Checkbox.types';
import './Checkbox.css';

/**
 * Componente Checkbox — Design System WhatsApp Mobile
 *
 * Caixa de seleção do rodapé do diálogo modal ("Show notifications"). O estado
 * marcado usa o glifo `tick` exportado do Figma.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, WaCheckboxProps>(
  ({ label, checked, disabled, className = '', ...restProps }, ref) => (
    <label
      className={['wa-checkbox', disabled ? 'wa-checkbox--disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={ref}
        type="checkbox"
        className="wa-checkbox__input"
        checked={checked}
        disabled={disabled}
        {...restProps}
      />
      <span className="wa-checkbox__control" aria-hidden="true">
        {checked && <Icon name="tick" size={11} tone="inherit" />}
      </span>
      <span className="wa-checkbox__label">{label}</span>
    </label>
  )
);

Checkbox.displayName = 'Checkbox';
