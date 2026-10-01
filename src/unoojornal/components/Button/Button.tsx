import React from 'react';
import { Icon } from '../Icon';
import type { UjnButtonProps } from './Button.types';
import './Button.css';

const ICON_SIZE = { sm: 'xs', md: 'sm', lg: 'md' } as const;

/**
 * Componente Button — Design System Unoojornal
 *
 * Botão de texto do jornal, com glifo opcional antes ou depois do rótulo. Três
 * variantes cobrem os papéis do quadro de botões: o preenchido de ação, o
 * contorno e o texto sublinhado no hover. Com `href` vira um `<a>` com o mesmo
 * desenho; sem `href`, `type="button"` é o padrão, para que nenhum botão dentro
 * de formulário envie sem querer.
 *
 * Estados: padrão, hover, foco (anel de 2px), ativo e desabilitado.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, UjnButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      iconStart,
      iconEnd,
      theme,
      className = '',
      children,
      ...restProps
    } = props;

    const classes = [
      'ujn-button',
      `ujn-button--${variant}`,
      `ujn-button--${size}`,
      fullWidth ? 'ujn-button--full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {iconStart && <Icon name={iconStart} size={ICON_SIZE[size]} tone="inherit" />}
        {children !== undefined && <span className="ujn-button__label">{children}</span>}
        {iconEnd && <Icon name={iconEnd} size={ICON_SIZE[size]} tone="inherit" />}
      </>
    );

    if (typeof props.href === 'string') {
      const { href, disabled, onClick, ...anchorProps } = restProps as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
        disabled?: boolean;
      };

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          data-ujn-theme={theme}
          className={`${classes}${disabled ? ' ujn-button--disabled' : ''}`}
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          onClick={disabled ? undefined : onClick}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    const { type = 'button', ...buttonProps } = restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        data-ujn-theme={theme}
        className={classes}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
