import React from 'react';
import type { UncButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System Unoochat
 *
 * Botão preenchido ou de contorno para a ação principal de uma tela. Extensão
 * do botão de texto do diálogo (`TextButton`): usa a mesma cor de ação
 * (`--unc-color-accent`) e a forma de cápsula do chip de filtro.
 */
export const Button = React.forwardRef<HTMLButtonElement, UncButtonProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      block = false,
      type = 'button',
      children,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={[
        'unc-button',
        `unc-button--${variant}`,
        `unc-button--${size}`,
        block ? 'unc-button--block' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
