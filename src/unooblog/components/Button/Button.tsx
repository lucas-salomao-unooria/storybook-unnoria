import React from 'react';
import { Icon } from '../Icon';
import type { UblButtonProps } from './Button.types';
import './Button.css';

const ICON_SIZE = { sm: 'xs', md: 'sm', lg: 'md' } as const;

/**
 * Componente Button — Design System Unooblog
 *
 * Botão em cápsula do blog, com glifo opcional antes ou depois do rótulo. Quatro
 * variantes cobrem os papéis: o preenchido de ação, o contorno, o texto
 * sublinhado no hover e o preenchido destrutivo (excluir comentário, sair).
 * Com `href` vira um `<a>` com o mesmo
 * desenho; sem `href`, `type="button"` é o padrão, para que nenhum botão dentro
 * de formulário envie sem querer.
 *
 * Estados: padrão, hover, foco (anel de 2px), ativo e desabilitado.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, UblButtonProps>(
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
      'ubl-button',
      `ubl-button--${variant}`,
      `ubl-button--${size}`,
      fullWidth ? 'ubl-button--full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {iconStart && <Icon name={iconStart} size={ICON_SIZE[size]} tone="inherit" />}
        {children !== undefined && <span className="ubl-button__label">{children}</span>}
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
          data-ubl-theme={theme}
          className={`${classes}${disabled ? ' ubl-button--disabled' : ''}`}
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
        data-ubl-theme={theme}
        className={classes}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
