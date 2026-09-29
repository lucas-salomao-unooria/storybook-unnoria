'use client';

import React from 'react';
import type { UnvSnackbarProps } from './Snackbar.types';
import './Snackbar.css';

/**
 * Componente Snackbar — Design System Unoovista
 *
 * O aviso passageiro: uma cápsula em cores invertidas (fundo em
 * `text-primary`, texto em `background-primary`), com `--unv-elevation-overlay`,
 * flutuando acima da doca de navegação, com uma ação opcional em botão
 * contornado. Não empurra o conteúdo e não prende o foco. Extensão do módulo,
 * sem par na Plataforma Unooria.
 */
export const Snackbar = React.forwardRef<HTMLDivElement, UnvSnackbarProps>(
  (
    {
      open,
      message,
      actionLabel,
      onAction,
      duration,
      onClose,
      placement = 'bottom',
      offset,
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const aoFechar = React.useRef(onClose);
    aoFechar.current = onClose;

    React.useEffect(() => {
      if (!open || duration === undefined) return undefined;
      const relogio = window.setTimeout(() => aoFechar.current?.(), duration);
      return () => window.clearTimeout(relogio);
    }, [open, duration]);

    const classes = [
      'unv-snackbar',
      `unv-snackbar--${placement}`,
      open ? 'unv-snackbar--open' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle: React.CSSProperties = {
      ...(offset !== undefined ? { [placement]: offset } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        data-unv-theme={theme}
        className={classes}
        style={resolvedStyle}
        role="status"
        aria-live="polite"
        {...restProps}
      >
        {open && (
          <div className="unv-snackbar__body">
            <p className="unv-snackbar__message">{message}</p>
            {actionLabel && onAction && (
              <button type="button" className="unv-snackbar__action" onClick={onAction}>
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';
