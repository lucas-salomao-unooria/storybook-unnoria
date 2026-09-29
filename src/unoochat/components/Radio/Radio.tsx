import React from 'react';
import type { UncRadioProps } from './Radio.types';
import './Radio.css';

/**
 * Componente Radio — Design System Unoochat
 *
 * Botão de opção do diálogo modal. O controle é desenhado em CSS — o quadro de
 * ícones da Plataforma Unooria não publica `radio_button_*` — com contorno de
 * 2px em `--unc-color-border-control` e, selecionado, anel e ponto em
 * `--unc-color-accent`.
 */
export const Radio = React.forwardRef<HTMLInputElement, UncRadioProps>(
  ({ label, checked, disabled, className = '', ...restProps }, ref) => (
    <label
      className={['unc-radio', disabled ? 'unc-radio--disabled' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        ref={ref}
        type="radio"
        className="unc-radio__input"
        checked={checked}
        disabled={disabled}
        {...restProps}
      />
      <span
        className={`unc-radio__control unc-radio__control--${checked ? 'on' : 'off'}`}
        aria-hidden="true"
      />
      <span className="unc-radio__label">{label}</span>
    </label>
  )
);

Radio.displayName = 'Radio';
