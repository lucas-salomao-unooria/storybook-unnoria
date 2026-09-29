import React from 'react';
import type { UncToastProps } from './Toast.types';
import './Toast.css';

/**
 * Componente Toast — Design System Unoochat
 *
 * Aviso rápido na base da tela, sem ação. Quem decide quando some é o produto:
 * o componente não guarda tempo, para que o aviso não desapareça antes de uma
 * criança terminar de ler.
 */
export const Toast = React.forwardRef<HTMLDivElement, UncToastProps>(
  ({ open = true, children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={['unc-toast-region', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {open && children ? <div className="unc-toast">{children}</div> : null}
    </div>
  )
);

Toast.displayName = 'Toast';
