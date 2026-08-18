import React, { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { SnackbarProps, SnackbarSeverity } from './Snackbar.types';
import { Icon } from '../Icon/Icon';
import './Snackbar.css';

/**
 * Ícones padrão do Google Material Symbols para cada severidade
 */
const DEFAULT_ICONS: Record<SnackbarSeverity, string> = {
  success: 'check_circle',
  warning: 'error',
  danger: 'cancel',
  info: 'info',
};

/**
 * Componente oficial de Notificação Flutuante (Snackbar / Toast) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6029:1314 / Component Set 6029:1429)
 *
 * Fornece feedback rápido e não-bloqueante em resposta a ações do usuário.
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      id,
      severity = 'success',
      title,
      description,
      actionLabel,
      onAction,
      onClose,
      showClose = true,
      icon,
      size = 'auto',
      duration = 5000,
      pauseOnHover = true,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const remainingTimeRef = useRef<number>(duration);
    const startTimeRef = useRef<number>(Date.now());

    const handleClose = useCallback(() => {
      setIsClosing(true);
      setTimeout(() => {
        onClose?.();
      }, 200);
    }, [onClose]);

    // Inicia o timer de auto-dismiss
    const startTimer = useCallback(() => {
      if (duration > 0 && onClose) {
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
          handleClose();
        }, remainingTimeRef.current);
      }
    }, [duration, onClose, handleClose]);

    // Pausa o timer
    const pauseTimer = useCallback(() => {
      if (pauseOnHover && timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
    }, [pauseOnHover]);

    useEffect(() => {
      startTimer();
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [startTimer]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && onClose) {
        e.stopPropagation();
        handleClose();
      }
    };

    const iconName = icon || DEFAULT_ICONS[severity];

    const sizeClass =
      size === 'desktop'
        ? 'unooria-snackbar--size-desktop'
        : size === 'mobile'
        ? 'unooria-snackbar--size-mobile'
        : 'unooria-snackbar--size-auto';

    const severityClass = `unooria-snackbar--severity-${severity}`;
    const themeClass = theme === 'dark' ? 'unooria-snackbar--theme-dark' : '';
    const closingClass = isClosing ? 'unooria-snackbar--closing' : '';

    const combinedClassName = [
      'unooria-snackbar',
      sizeClass,
      severityClass,
      themeClass,
      closingClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Renderização Mobile (Layout empilhado)
    if (size === 'mobile') {
      return (
        <div
          ref={ref}
          id={id}
          role="status"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={pauseTimer}
          onMouseLeave={startTimer}
          className={combinedClassName}
          style={style}
          {...rest}
        >
          {/* Linha Superior: Badge + Textos + Fechar */}
          <div className="unooria-snackbar__top-row">
            <div className="unooria-snackbar__badge">
              <Icon name={iconName} size="s" color="currentColor" />
            </div>

            <div className="unooria-snackbar__text-block" style={{ flex: 1 }}>
              <div className="unooria-snackbar__title">{title}</div>
              {description && <div className="unooria-snackbar__description">{description}</div>}
            </div>

            {showClose && onClose && (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fechar notificação"
                className="unooria-snackbar__close-btn"
              >
                <Icon name="close" size="xs" color="currentColor" />
              </button>
            )}
          </div>

          {/* Linha Inferior: Botão de Ação alinhado à direita */}
          {actionLabel && onAction && (
            <div className="unooria-snackbar__bottom-row">
              <button
                type="button"
                onClick={() => {
                  onAction();
                  handleClose();
                }}
                className="unooria-snackbar__action-btn"
              >
                {actionLabel}
              </button>
            </div>
          )}
        </div>
      );
    }

    // Renderização Desktop / Auto (Linha única)
    return (
      <div
        ref={ref}
        id={id}
        role="status"
        aria-live="polite"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={pauseTimer}
        onMouseLeave={startTimer}
        className={combinedClassName}
        style={style}
        {...rest}
      >
        {/* Bloco de Conteúdo (Badge + Textos) */}
        <div className="unooria-snackbar__content-group">
          <div className="unooria-snackbar__badge">
            <Icon name={iconName} size="s" color="currentColor" />
          </div>

          <div className="unooria-snackbar__text-block">
            <div className="unooria-snackbar__title">{title}</div>
            {description && <div className="unooria-snackbar__description">{description}</div>}
          </div>
        </div>

        {/* Bloco de Ações (Botão de Ação + Botão de Fechar) */}
        {(actionLabel || (showClose && onClose)) && (
          <div className="unooria-snackbar__actions-group">
            {actionLabel && onAction && (
              <button
                type="button"
                onClick={() => {
                  onAction();
                  handleClose();
                }}
                className="unooria-snackbar__action-btn"
              >
                {actionLabel}
              </button>
            )}

            {showClose && onClose && (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fechar notificação"
                className="unooria-snackbar__close-btn"
              >
                <Icon name="close" size="xs" color="currentColor" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';

export default Snackbar;
