import React from 'react';
import { Icon } from '../Icon';
import type { TikButtonProps } from './Button.types';
import './Button.css';

/**
 * Componente Button — Design System Tik Tooria
 *
 * As três variantes de botão do arquivo de design. As dimensões fixas de cada
 * variante são as literais do Figma e podem ser liberadas com
 * `fixedWidth={false}`.
 *
 * Os estados de interação (hover, foco, desabilitado) não existem no arquivo:
 * foram acrescentados usando exclusivamente tokens da própria marca, conforme
 * registrado na seção de desvios.
 */
export const Button = React.forwardRef<HTMLButtonElement, TikButtonProps>(
  (
    {
      variant = 'outline',
      icon,
      fixedWidth = true,
      block = false,
      className = '',
      children,
      ...restProps
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      className={[
        'tik-button',
        `tik-button--${variant}`,
        fixedWidth && !block ? 'tik-button--fixed' : '',
        block ? 'tik-button--block' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {icon && <Icon name={icon} size={14} tone="inherit" />}
      <span className="tik-button__label">{children}</span>
    </button>
  )
);

Button.displayName = 'Button';
