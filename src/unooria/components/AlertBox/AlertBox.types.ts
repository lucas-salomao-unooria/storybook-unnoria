import React from 'react';

/**
 * Variantes de severidade suportadas pelo AlertBox
 */
export type AlertBoxVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Temas visuais suportados pelo AlertBox
 */
export type AlertBoxTheme = 'light' | 'dark';

/**
 * Propriedades do componente AlertBox
 */
export interface AlertBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Tipo / Severidade do alerta.
   * @default 'info'
   */
  variant?: AlertBoxVariant;

  /**
   * Título principal do alerta.
   */
  title?: React.ReactNode;

  /**
   * Descrição detalhada do alerta.
   */
  description?: React.ReactNode;

  /**
   * Conteúdo flexível do alerta (usado se description não for fornecido ou para conteúdo customizado).
   */
  children?: React.ReactNode;

  /**
   * Ícone a ser exibido no alerta.
   * - `true` (padrão): Exibe o ícone padrão correspondente à variante.
   * - `false`: Oculta o ícone.
   * - `React.ReactNode`: Renderiza um ícone customizado fornecido.
   * @default true
   */
  icon?: boolean | React.ReactNode;

  /**
   * Indica se o alerta pode ser dispensado/fechado pelo usuário.
   * @default false
   */
  isDismissible?: boolean;

  /**
   * Callback executado ao clicar no botão de fechar/dispensar.
   */
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Elemento ou botão de ação individual.
   */
  action?: React.ReactNode;

  /**
   * Elementos ou botões de ações complementares.
   */
  actions?: React.ReactNode;

  /**
   * Elemento de ação (mantido para retrocompatibilidade com action).
   */
  actionButton?: React.ReactNode;

  /**
   * Se verdadeiro, exibe borda externa de destaque no alerta.
   * @default true
   */
  bordered?: boolean;

  /**
   * Tema visual do componente ('light' | 'dark').
   * @default 'light'
   */
  theme?: AlertBoxTheme;
}
