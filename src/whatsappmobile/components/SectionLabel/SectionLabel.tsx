import React from 'react';
import type { WaSectionLabelProps } from './SectionLabel.types';
import './SectionLabel.css';

/**
 * Componente SectionLabel — Design System WhatsApp Mobile
 *
 * Rótulo que agrupa blocos de conteúdo em listas, em PT Sans Bold 15,54px na
 * cor `--wa-color-text-appbar`, como visto na aba Status.
 */
export const SectionLabel = React.forwardRef<HTMLDivElement, WaSectionLabelProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['wa-sectionlabel', className].filter(Boolean).join(' ')}
      role="heading"
      aria-level={2}
      {...restProps}
    >
      {children}
    </div>
  )
);

SectionLabel.displayName = 'SectionLabel';
