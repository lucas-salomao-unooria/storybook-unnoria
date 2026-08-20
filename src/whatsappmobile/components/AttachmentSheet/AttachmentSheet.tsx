import React from 'react';
import { Icon } from '../Icon';
import type { WaAttachmentSheetProps } from './AttachmentSheet.types';
import './AttachmentSheet.css';

/**
 * Componente AttachmentSheet — Design System WhatsApp Mobile
 *
 * Folha de anexos aberta pelo clipe do compositor. Cada ação usa a cor exata
 * medida no frame de origem: documento #5F66CE, câmera #EC407A, galeria
 * #BF57CF, áudio #F78D0D, localização #019D54 e contato #0EAAF4.
 */
export const AttachmentSheet = React.forwardRef<HTMLDivElement, WaAttachmentSheetProps>(
  ({ actions, onSelect, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label="Anexar"
      className={['wa-attachmentsheet', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {actions.map((action) => (
        <button
          key={action.kind}
          type="button"
          className="wa-attachmentsheet__action"
          onClick={() => onSelect?.(action.kind)}
        >
          <span className={`wa-attachmentsheet__circle wa-attachmentsheet__circle--${action.kind}`}>
            <Icon name={action.icon} size={24} tone="inherit" />
          </span>
          {action.label}
        </button>
      ))}
    </div>
  )
);

AttachmentSheet.displayName = 'AttachmentSheet';
