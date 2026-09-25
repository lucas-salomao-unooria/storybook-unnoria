import React from 'react';
import type { WaToastProps } from './Toast.types';
import './Toast.css';

/**
 * Componente Toast — Design System WhatsApp Mobile
 *
 * Aviso rápido na base da tela, sem ação. Quem decide quando some é o produto:
 * o componente não guarda tempo, para que o aviso não desapareça antes de uma
 * criança terminar de ler.
 */
export const Toast = React.forwardRef<HTMLDivElement, WaToastProps>(
  ({ open = true, children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={['wa-toast-region', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {open && children ? <div className="wa-toast">{children}</div> : null}
    </div>
  )
);

Toast.displayName = 'Toast';
