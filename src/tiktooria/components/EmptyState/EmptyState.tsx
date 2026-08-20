import React from 'react';
import { Icon } from '../Icon';
import type { TikEmptyStateProps } from './EmptyState.types';
import './EmptyState.css';

/**
 * Componente EmptyState — Design System Tik Tooria
 *
 * Estado vazio das telas "All activity" e "Direct Message" (frames "Info",
 * nodes 4:567 e 4:532). Ilustração em `--tik-color-icon-empty`, título em
 * Semibold 17 e descrição em Regular 14 — os dois tons de ilustração do arquivo
 * (`#B0B0B3` e `#AFB0B3`) são preservados como tokens distintos.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, TikEmptyStateProps>(
  (
    { title, description, icon, iconSize = 68, action, className = '', ...restProps },
    ref
  ) => (
    <div ref={ref} className={['tik-emptystate', className].filter(Boolean).join(' ')} {...restProps}>
      {icon && (
        <Icon
          name={icon}
          size={iconSize}
          tone={icon === 'emptyMessages' ? 'emptyAlt' : 'empty'}
        />
      )}
      <p className="tik-emptystate__title">{title}</p>
      {description && <p className="tik-emptystate__description">{description}</p>}
      {action && <div className="tik-emptystate__action">{action}</div>}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';
