import React from 'react';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import type { UnvTopBarActionProps, UnvTopBarProps } from './TopBar.types';
import './TopBar.css';

/**
 * Botão circular de 44px para as ações do slot `trailing` (e do `leading`).
 * Tem preenchimento `fill-field`, glifo de 24px e nome acessível obrigatório.
 */
const TopBarAction = React.forwardRef<HTMLButtonElement, UnvTopBarActionProps>(
  ({ icon, label, hasNotification = false, theme, className = '', type = 'button', ...restProps }, ref) => (
    <button
      ref={ref}
      type={type}
      data-unv-theme={theme}
      aria-label={hasNotification ? `${label}, com novidades` : label}
      className={['unv-top-bar__action', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <Icon name={icon} size="md" tone="inherit" />
      {hasNotification && (
        <Badge variant="notification" dot className="unv-top-bar__action-dot" />
      )}
    </button>
  )
);

TopBarAction.displayName = 'TopBar.Action';

/**
 * Componente TopBar — Design System Unoovista
 *
 * Barra superior sem fio: título grande à esquerda, precedido por um slot
 * inicial (logotipo, voltar), e ações à direita em botões circulares. A barra
 * é da mesma superfície da tela, e a separação vem da rolagem do conteúdo, não
 * de uma linha. `bordered` devolve o fio de 1px quando a tela precisa dele.
 */
const TopBarRoot = React.forwardRef<HTMLElement, UnvTopBarProps>(
  (
    {
      leading,
      title,
      trailing,
      variant = 'feed',
      withStatusBarInset = true,
      bordered = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unv-top-bar',
      `unv-top-bar--${variant}`,
      bordered ? 'unv-top-bar--bordered' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} data-unv-theme={theme} className={classes} {...restProps}>
        {withStatusBarInset && <div className="unv-top-bar__status-inset" aria-hidden="true" />}
        <div className="unv-top-bar__content">
          {leading && <div className="unv-top-bar__slot unv-top-bar__slot--leading">{leading}</div>}
          <div className="unv-top-bar__title">{title}</div>
          {trailing && (
            <div className="unv-top-bar__slot unv-top-bar__slot--trailing">{trailing}</div>
          )}
        </div>
      </header>
    );
  }
);

TopBarRoot.displayName = 'TopBar';

export const TopBar = Object.assign(TopBarRoot, { Action: TopBarAction });
