import React from 'react';
import type { WaTextButtonProps } from './TextButton.types';
import './TextButton.css';

/**
 * Componente TextButton — Design System WhatsApp Mobile
 *
 * Botão sem preenchimento usado nas ações de diálogo. A cor é o verde-água de
 * ação `--wa-color-accent-action` (#25AC9D), distinto do verde da barra de abas.
 */
export const TextButton = React.forwardRef<HTMLButtonElement, WaTextButtonProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['wa-textbutton', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </button>
  )
);

TextButton.displayName = 'TextButton';
