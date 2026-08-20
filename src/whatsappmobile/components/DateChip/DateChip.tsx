import React from 'react';
import type { WaDateChipProps } from './DateChip.types';
import './DateChip.css';

/**
 * Componente DateChip — Design System WhatsApp Mobile
 *
 * Separador de data do fluxo de mensagens, em `--wa-color-surface-datechip`
 * com raio de 6px e texto de 14px em `--wa-color-text-datechip`.
 */
export const DateChip = React.forwardRef<HTMLDivElement, WaDateChipProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['wa-datechip', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);

DateChip.displayName = 'DateChip';
