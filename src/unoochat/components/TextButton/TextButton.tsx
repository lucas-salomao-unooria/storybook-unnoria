import React from 'react';
import type { UncTextButtonProps } from './TextButton.types';
import './TextButton.css';

/**
 * Componente TextButton — Design System Unoochat
 *
 * Botão sem preenchimento usado nas ações de diálogo. A cor é o acento
 * `--unc-color-accent`.
 */
export const TextButton = React.forwardRef<HTMLButtonElement, UncTextButtonProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['unc-textbutton', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </button>
  )
);

TextButton.displayName = 'TextButton';
