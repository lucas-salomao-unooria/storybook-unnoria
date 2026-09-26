'use client';

import React from 'react';
import type { InstaSnackbarProps } from './Snackbar.types';
import './Snackbar.css';

/**
 * Componente Snackbar — Design System Instanooria
 *
 * O aviso passageiro do app real: uma faixa de raio 8px em cores invertidas,
 * sobre a tela e acima da barra de abas, com uma ação opcional em texto. Não
 * empurra o conteúdo e não prende o foco. Extensão sem quadro no arquivo de
 * origem; o raio é o `--insta-radius-m` dos cartões e a calha é a das barras.
 */
export const Snackbar = React.forwardRef<HTMLDivElement, InstaSnackbarProps>(
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
      theme = 'light',
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
      'insta-snackbar',
      `insta-snackbar--${placement}`,
      open ? 'insta-snackbar--open' : '',
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
        data-insta-theme={theme}
        className={classes}
        style={resolvedStyle}
        role="status"
        aria-live="polite"
        {...restProps}
      >
        {open && (
          <div className="insta-snackbar__body">
            <p className="insta-snackbar__message">{message}</p>
            {actionLabel && onAction && (
              <button type="button" className="insta-snackbar__action" onClick={onAction}>
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
