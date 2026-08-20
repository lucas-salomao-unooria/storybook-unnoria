'use client';

import React from 'react';
import type { TikCameraModeStripProps } from './CameraModeStrip.types';
import './CameraModeStrip.css';

/**
 * Componente CameraModeStrip — Design System Tik Tooria
 *
 * Tira de modos de captura na base da câmera (node 4:664). Os rótulos usam Bold
 * 15 em branco; os inativos ficam a 60% de opacidade e o ativo recebe o disco de
 * 5px abaixo — exatamente como no arquivo.
 */
export const CameraModeStrip = React.forwardRef<HTMLDivElement, TikCameraModeStripProps>(
  ({ modes, active, onSelect, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={['tik-cameramodestrip', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {modes.map((mode) => {
        const isActive = mode.id === active;

        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[
              'tik-cameramodestrip__mode',
              isActive ? 'tik-cameramodestrip__mode--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={onSelect ? () => onSelect(mode.id) : undefined}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  )
);

CameraModeStrip.displayName = 'CameraModeStrip';
