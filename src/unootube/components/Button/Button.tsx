'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UniButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System Unitube
 *
 * Reproduz o nó `Action/Button` (`20:2758`), o botão da barra de ações da tela
 * de vídeo: glifo de 24px em um alvo de 36×36, seguido do rótulo em
 * Label/Large. O arquivo o publica sem preenchimento nem contorno — a
 * separação vem apenas do peso tipográfico.
 *
 * Declara `'use client'` porque expõe `aria-pressed` derivado de `pressed` e
 * recebe manipuladores de evento do consumidor.
 */
export const Button = React.forwardRef<HTMLButtonElement, UniButtonProps>(
  ({ icon, pressed = false, className = '', children, ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed || undefined}
      className={['uni-button', pressed ? 'uni-button--pressed' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {icon && (
        <span className="uni-button__icon">
          <Icon name={icon} size="lg" tone="inherit" />
        </span>
      )}
      {children != null && <span className="uni-button__label">{children}</span>}
    </button>
  )
);

Button.displayName = 'Button';
