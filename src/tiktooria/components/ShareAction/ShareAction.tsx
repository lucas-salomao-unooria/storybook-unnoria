import React from 'react';
import { Icon } from '../Icon';
import type { TikShareActionProps } from './ShareAction.types';
import './ShareAction.css';

/**
 * Componente ShareAction — Design System Tik Tooria
 *
 * Alvo da folha de compartilhamento (nodes 4:863 a 4:927): disco de 47px sobre
 * rótulo de 11px. As ações do produto usam o disco cinza
 * `--tik-color-surface-action` com um glifo em `--tik-color-icon-primary`; os
 * alvos de terceiros passam o próprio logotipo pelo slot `media`.
 */
export const ShareAction = React.forwardRef<HTMLButtonElement, TikShareActionProps>(
  ({ label, icon, media, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['tik-shareaction', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {media ?? (
        <span className="tik-shareaction__disc">
          {icon && <Icon name={icon} size={21} tone="primary" />}
        </span>
      )}
      <span className="tik-shareaction__label">{label}</span>
    </button>
  )
);

ShareAction.displayName = 'ShareAction';
