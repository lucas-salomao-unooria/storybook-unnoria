import React from 'react';
import { Icon } from '../Icon';
import type { WaRadioProps } from './Radio.types';
import './Radio.css';

/**
 * Componente Radio — Design System WhatsApp Mobile
 *
 * Botão de opção do diálogo modal. Ambos os estados usam os vetores exportados
 * do Figma: `radioOn` (Group 238) e `radioOff` (Ellipse 55).
 */
export const Radio = React.forwardRef<HTMLInputElement, WaRadioProps>(
  ({ label, checked, disabled, className = '', ...restProps }, ref) => (
    <label
      className={['wa-radio', disabled ? 'wa-radio--disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={ref}
        type="radio"
        className="wa-radio__input"
        checked={checked}
        disabled={disabled}
        {...restProps}
      />
      <span
        className={`wa-radio__control wa-radio__control--${checked ? 'on' : 'off'}`}
        aria-hidden="true"
      >
        <Icon name={checked ? 'radioOn' : 'radioOff'} size={20} tone="inherit" />
      </span>
      <span className="wa-radio__label">{label}</span>
    </label>
  )
);

Radio.displayName = 'Radio';
