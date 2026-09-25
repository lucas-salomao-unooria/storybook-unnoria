import React from 'react';
import type { WaButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System WhatsApp Mobile
 *
 * Botão preenchido ou de contorno para a ação principal de uma tela. Extensão:
 * o arquivo de origem só publica o botão de texto do diálogo (`TextButton`);
 * este deriva a cor da mesma ação (`--wa-color-accent-action`) e a forma da
 * cápsula do chip de filtro.
 */
export const Button = React.forwardRef<HTMLButtonElement, WaButtonProps>(
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
        'wa-button',
        `wa-button--${variant}`,
        `wa-button--${size}`,
        block ? 'wa-button--block' : '',
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
