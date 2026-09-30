import React from 'react';
import { Icon } from '../Icon';
import type { UglButtonProps } from './Button.types';
import './Button.css';

const ICON_SIZE = { sm: 'xs', md: 'sm', lg: 'md' } as const;

/**
 * Componente Button — Design System Unoogaleria
 *
 * Botão de texto da galeria, com glifo opcional antes ou depois do rótulo. Seis
 * variantes cobrem as superfícies do produto: a ação preenchida, o contorno, o
 * texto de barra, as duas destrutivas e a imersiva, que vive sobre o fundo
 * escuro do visualizador e do editor em qualquer tema.
 *
 * É Server Component: só recebe props e renderiza. `type="button"` é o padrão,
 * para que nenhum botão dentro de formulário envie sem querer.
 */
export const Button = React.forwardRef<HTMLButtonElement, UglButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      iconStart,
      iconEnd,
      theme,
      type = 'button',
      className = '',
      children,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'ugl-button',
      `ugl-button--${variant}`,
      `ugl-button--${size}`,
      fullWidth ? 'ugl-button--full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} data-ugl-theme={theme} className={classes} {...restProps}>
        {iconStart && <Icon name={iconStart} size={ICON_SIZE[size]} tone="inherit" />}
        {children !== undefined && <span className="ugl-button__label">{children}</span>}
        {iconEnd && <Icon name={iconEnd} size={ICON_SIZE[size]} tone="inherit" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
