import React from 'react';
import type { UncSectionLabelProps } from './SectionLabel.types';
import './SectionLabel.css';

/**
 * Componente SectionLabel — Design System Unoochat
 *
 * Rótulo que agrupa blocos de conteúdo em listas, em `--unc-font-section-*` na
 * cor `--unc-color-text-secondary`, como na aba Status.
 */
export const SectionLabel = React.forwardRef<HTMLDivElement, UncSectionLabelProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['unc-sectionlabel', className].filter(Boolean).join(' ')}
      role="heading"
      aria-level={2}
      {...restProps}
    >
      {children}
    </div>
  )
);

SectionLabel.displayName = 'SectionLabel';
