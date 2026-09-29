'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UncAttachmentSheetProps } from './AttachmentSheet.types';
import './AttachmentSheet.css';

/**
 * Componente AttachmentSheet — Design System Unoochat
 *
 * Folha de anexos aberta pelo clipe do compositor. Cada ação tem a própria cor
 * de círculo, invariante entre temas (`--unc-color-attach-document`, `-camera`,
 * `-gallery`, `-audio`, `-location` e `-contact`).
 */
export const AttachmentSheet = React.forwardRef<HTMLDivElement, UncAttachmentSheetProps>(
  ({ actions, onSelect, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label="Anexar"
      className={['unc-attachmentsheet', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {actions.map((action) => (
        <button
          key={action.kind}
          type="button"
          className="unc-attachmentsheet__action"
          onClick={() => onSelect?.(action.kind)}
        >
          <span className={`unc-attachmentsheet__circle unc-attachmentsheet__circle--${action.kind}`}>
            <Icon name={action.icon} size={24} tone="inherit" />
          </span>
          {action.label}
        </button>
      ))}
    </div>
  )
);

AttachmentSheet.displayName = 'AttachmentSheet';
