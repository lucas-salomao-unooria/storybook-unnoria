import React from 'react';

/**
 * Severidades cromáticas suportadas pelo Snackbar
 */
export type SnackbarSeverity = 'success' | 'warning' | 'danger' | 'info';

/**
 * Formato ou tamanho do Snackbar (Figma: Desktop 408px ou Mobile 293px)
 */
export type SnackbarSize = 'desktop' | 'mobile' | 'auto';

/**
 * Posição de ancoragem do container de toasts na tela
 */
export type SnackbarPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

/**
 * Propriedades individuais do componente Snackbar
 * Plataforma Unooria - Extraído do Figma (Node 6029:1314 / Component Set 6029:1429)
 */
export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Identificador único do item.
   */
  id?: string;

  /**
   * Severidade cromática do feedback.
   * - `success`: Ação bem-sucedida (ícone `check_circle`, verde)
   * - `warning`: Alerta de atenção (ícone `error`, laranja)
   * - `danger`: Erro ou falha (ícone `cancel`, vermelho)
   * - `info`: Informação ou status (ícone `info`, azul)
   * @default 'success'
   */
  severity?: SnackbarSeverity;

  /**
   * Título principal em destaque (Open Sans 14px Bold).
   */
  title: React.ReactNode;

  /**
   * Descrição ou mensagem detalhada (Open Sans 12px Regular).
   */
  description?: React.ReactNode;

  /**
   * Rótulo do botão de ação opcional (ex: "Desfazer", "Ver detalhes").
   */
  actionLabel?: string;

  /**
   * Callback acionado ao clicar no botão de ação.
   */
  onAction?: () => void;

  /**
   * Callback acionado ao fechar ou ao expirar o tempo do Snackbar.
   */
  onClose?: () => void;

  /**
   * Se verdadeiro, exibe o botão de fechar (X).
   * @default true
   */
  showClose?: boolean;

  /**
   * Ícone customizado para substituir o ícone padrão da severidade.
   */
  icon?: string;

  /**
   * Form factor visual:
   * - `desktop`: Largura fixa de 408px com layout horizontal
   * - `mobile`: Largura fixa de 293px com ação empilhada abaixo
   * - `auto`: Responsivo fluido
   * @default 'auto'
   */
  size?: SnackbarSize;

  /**
   * Tempo em milissegundos para auto-dismiss (fechamento automático).
   * Defina `0` para tornar permanente até o clique do usuário.
   * @default 5000
   */
  duration?: number;

  /**
   * Se verdadeiro, pausa o temporizador de auto-dismiss enquanto o usuário passa o cursor sobre o Snackbar.
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Tema visual de contraste: 'light' (fundo branco) ou 'dark' (fundo escuro #22272A).
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;
}

/**
 * Opções para disparo imperativo de notificações via hook `useSnackbar`
 */
export interface SnackbarOptions
  extends Omit<SnackbarProps, 'id' | 'title' | 'description' | 'onClose'> {
  id?: string;
  onClose?: () => void;
}

/**
 * Interface do Contexto Global do Snackbar
 */
export interface SnackbarContextType {
  /**
   * Exibe um Snackbar dinâmico na tela.
   */
  showSnackbar: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: SnackbarOptions
  ) => string;

  /**
   * Fecha um Snackbar específico pelo ID.
   */
  closeSnackbar: (id: string) => void;

  /**
   * Remove todos os Snackbars ativos.
   */
  clearAll: () => void;

  /**
   * Métodos utilitários de conveniência por severidade.
   */
  snackbar: {
    success: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: SnackbarOptions
    ) => string;
    warning: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: SnackbarOptions
    ) => string;
    error: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: SnackbarOptions
    ) => string;
    danger: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: SnackbarOptions
    ) => string;
    info: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: SnackbarOptions
    ) => string;
  };
}
