import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  SnackbarProps,
  SnackbarOptions,
  SnackbarContextType,
  SnackbarPosition,
} from './Snackbar.types';
import { Snackbar } from './Snackbar';
import './Snackbar.css';

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export interface SnackbarProviderProps {
  children: React.ReactNode;
  /**
   * Posição padrão dos toasts na tela
   * @default 'bottom-right'
   */
  position?: SnackbarPosition;
}

interface ToastItem extends SnackbarProps {
  id: string;
}

/**
 * Provedor de contexto global para gerenciar e disparar Snackbars flutuantes na tela.
 */
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const closeSnackbar = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const showSnackbar = useCallback(
    (title: React.ReactNode, description?: React.ReactNode, options: SnackbarOptions = {}) => {
      const id = options.id || `snackbar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const newToast: ToastItem = {
        id,
        title,
        description,
        severity: options.severity || 'success',
        actionLabel: options.actionLabel,
        onAction: options.onAction,
        showClose: options.showClose !== undefined ? options.showClose : true,
        icon: options.icon,
        size: options.size || 'auto',
        duration: options.duration !== undefined ? options.duration : 5000,
        pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
        theme: options.theme || 'light',
        className: options.className,
        style: options.style,
        onClose: () => {
          options.onClose?.();
          closeSnackbar(id);
        },
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    [closeSnackbar]
  );

  const snackbarHelpers = useMemo(
    () => ({
      success: (
        title: React.ReactNode,
        description?: React.ReactNode,
        options?: SnackbarOptions
      ) => showSnackbar(title, description, { ...options, severity: 'success' }),
      warning: (
        title: React.ReactNode,
        description?: React.ReactNode,
        options?: SnackbarOptions
      ) => showSnackbar(title, description, { ...options, severity: 'warning' }),
      error: (
        title: React.ReactNode,
        description?: React.ReactNode,
        options?: SnackbarOptions
      ) => showSnackbar(title, description, { ...options, severity: 'danger' }),
      danger: (
        title: React.ReactNode,
        description?: React.ReactNode,
        options?: SnackbarOptions
      ) => showSnackbar(title, description, { ...options, severity: 'danger' }),
      info: (
        title: React.ReactNode,
        description?: React.ReactNode,
        options?: SnackbarOptions
      ) => showSnackbar(title, description, { ...options, severity: 'info' }),
    }),
    [showSnackbar]
  );

  const contextValue = useMemo<SnackbarContextType>(
    () => ({
      showSnackbar,
      closeSnackbar,
      clearAll,
      snackbar: snackbarHelpers,
    }),
    [showSnackbar, closeSnackbar, clearAll, snackbarHelpers]
  );

  const positionClass = `unooria-snackbar-container--${position}`;

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      {toasts.length > 0 && (
        <div className={`unooria-snackbar-container ${positionClass}`}>
          {toasts.map((toast) => (
            <Snackbar key={toast.id} {...toast} />
          ))}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

/**
 * Hook para acessar métodos de disparo do Snackbar em qualquer lugar da aplicação.
 */
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar deve ser utilizado dentro de um <SnackbarProvider>');
  }
  return context;
};
