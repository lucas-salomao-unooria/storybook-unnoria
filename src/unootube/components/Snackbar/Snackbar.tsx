'use client';

import React from 'react';
import type { UniSnackbarProps } from './Snackbar.types';
import './Snackbar.css';

/**
 * Componente Snackbar — Design System Unootube
 *
 * EXTENSÃO DECLARADA. Nenhum dos dois arquivos de origem publica aviso
 * flutuante — as seis telas são estáticas e nenhuma confirma uma ação. O
 * componente existe porque produto precisa confirmar "Salvo na playlist" sem
 * interromper, e usar o `Snackbar` da Plataforma Unooria aqui traria Open Sans
 * e a paleta navy para dentro do Roboto.
 *
 * A forma sai de degraus publicados: superfície `background/surface`, a mesma
 * dos chips e da linha ativa; sombra `Elevation/Medium`, que o quadro
 * `Elevation` (`106:3222`) descreve como "flutuante: menus suspensos e
 * popovers"; raio `--uni-radius-sm` (2px) e texto em `Body/Medium`.
 *
 * Acessibilidade: `role="status"` com `aria-live="polite"`, de modo que o
 * leitor de tela anuncie o aviso sem roubar o foco de onde o usuário está.
 * O fechamento automático é pausado enquanto o ponteiro está sobre o aviso ou
 * enquanto a ação tem foco — sem isso, um aviso com ação some antes de ser
 * acionável por teclado.
 */
export const Snackbar = React.forwardRef<HTMLDivElement, UniSnackbarProps>(
  (
    {
      open = true,
      message,
      variant = 'default',
      actionLabel,
      onAction,
      duration = 5000,
      onClose,
      floating = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [paused, setPaused] = React.useState(false);
    const handleClose = React.useRef(onClose);
    handleClose.current = onClose;

    React.useEffect(() => {
      if (!open || duration <= 0 || paused) return undefined;
      const timer = window.setTimeout(() => handleClose.current?.(), duration);
      return () => window.clearTimeout(timer);
    }, [open, duration, paused]);

    if (!open) return null;

    return (
      <div
        ref={ref}
        data-uni-theme={theme}
        role="status"
        aria-live="polite"
        className={[
          'uni-snackbar',
          `uni-snackbar--${variant}`,
          floating ? 'uni-snackbar--floating' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        {...restProps}
      >
        <span className="uni-snackbar__message">{message}</span>
        {actionLabel != null && (
          <button
            type="button"
            className="uni-snackbar__action"
            onClick={() => {
              onAction?.();
              onClose?.();
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';
