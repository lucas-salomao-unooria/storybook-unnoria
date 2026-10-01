'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UjnToastProps } from './Toast.types';
import './Toast.css';

/**
 * Componente Toast — Design System Unoojornal
 *
 * Aviso passageiro em cores invertidas (`--ujn-color-toast-*`): "Matéria salva
 * para ler depois · Desfazer". Flutua dentro do contêiner posicionado mais
 * próximo (a tela do `PhoneFrame` ou do `DesktopFrame`), acima da área segura
 * inferior e de `offset`, na camada `--ujn-z-toast`. Não prende o foco nem
 * empurra o conteúdo, e nunca vai para um portal.
 *
 * A região viva (`role="status"`, `aria-live="polite"`) existe sempre, mesmo
 * fechada, para que o leitor de tela anuncie a mensagem quando ela entra. Fecha
 * sozinho após `duration` — a contagem pausa com o ponteiro sobre o aviso ou o
 * foco dentro dele, e o timer é limpo ao desmontar. Esc fecha. A pessoa sempre
 * tem tempo de alcançar "Desfazer".
 */
export const Toast = React.forwardRef<HTMLDivElement, UjnToastProps>(
  (
    {
      open,
      message,
      icon,
      actionLabel,
      onAction,
      onClose,
      duration = 5000,
      position = 'bottom',
      offset = 0,
      showClose,
      closeLabel = 'Fechar aviso',
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const onCloseRef = React.useRef(onClose);
    const remainingRef = React.useRef(duration);
    const [hovered, setHovered] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const [previousOpen, setPreviousOpen] = React.useState(open);

    /* Ao abrir de novo, o aviso começa sem pausa (o nó anterior já saiu). */
    if (previousOpen !== open) {
      setPreviousOpen(open);
      setHovered(false);
      setFocused(false);
    }

    const paused = hovered || focused;
    const autoClose = duration > 0;
    const hasClose = showClose ?? !autoClose;

    React.useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);

    React.useEffect(() => {
      if (open) remainingRef.current = duration;
    }, [open, duration]);

    React.useEffect(() => {
      if (!open || !autoClose || paused) return undefined;

      const startedAt = Date.now();
      const timer = window.setTimeout(
        () => onCloseRef.current?.(),
        Math.max(remainingRef.current, 0)
      );

      return () => {
        window.clearTimeout(timer);
        remainingRef.current -= Date.now() - startedAt;
      };
    }, [open, autoClose, paused]);

    const handleAction = () => {
      onAction?.();
      onClose?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && onClose) {
        event.stopPropagation();
        onClose();
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setFocused(false);
      }
    };

    const classes = ['ujn-toast', `ujn-toast--${position}`, className].filter(Boolean).join(' ');

    const resolvedStyle = {
      '--ujn-toast-offset': `${offset}px`,
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-ujn-theme={theme}
        className={classes}
        style={resolvedStyle}
        {...restProps}
      >
        {open && (
          <div
            className="ujn-toast__body"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          >
            {icon && <Icon name={icon} size="sm" tone="inherit" className="ujn-toast__icon" />}
            <p className="ujn-toast__message">{message}</p>

            {actionLabel && onAction && (
              <button type="button" className="ujn-toast__action" onClick={handleAction}>
                {actionLabel}
              </button>
            )}

            {hasClose && onClose && (
              <button
                type="button"
                className="ujn-toast__close"
                aria-label={closeLabel}
                title={closeLabel}
                onClick={onClose}
              >
                <Icon name="close" size="sm" tone="inherit" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
