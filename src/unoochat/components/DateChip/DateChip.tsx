import React from 'react';
import type { UncDateChipProps } from './DateChip.types';
import './DateChip.css';

/**
 * Componente DateChip — Design System Unoochat
 *
 * Separador de data do fluxo de mensagens, em `--unc-color-surface-datechip`
 * com raio de 6px e texto de 14px em `--unc-color-text-secondary`.
 */
export const DateChip = React.forwardRef<HTMLDivElement, UncDateChipProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['unc-datechip', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);

DateChip.displayName = 'DateChip';
