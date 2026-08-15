import React from 'react';

/**
 * Variantes de severidade / tipo do FeedbackAlert
 */
export type FeedbackAlertType = 'error' | 'warning' | 'success' | 'info';

/**
 * Temas suportados pelo FeedbackAlert
 */
export type FeedbackAlertTheme = 'light' | 'dark';

/**
 * Propriedades do componente FeedbackAlert
 * Em total conformidade com as especificações do Figma Nó #24190:87
 */
export interface FeedbackAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título principal de destaque do alerta
   */
  title?: React.ReactNode;

  /**
   * Mensagem descritiva / detalhamento do alerta
   */
  description?: React.ReactNode;

  /**
   * Mensagem complementar / sutil (alias ou texto secundário)
   */
  subtle?: React.ReactNode;

  /**
   * Conteúdo livre ou filhos renderizados no corpo do alerta
   */
  children?: React.ReactNode;

  /**
   * Tipo / variante de severidade do alerta
   * @default 'info'
   */
  type?: FeedbackAlertType;

  /**
   * Alias de severidade para a propriedade `type`
   */
  severity?: FeedbackAlertType;

  /**
   * Tema de exibição do alerta
   * @default 'light'
   */
  theme?: FeedbackAlertTheme;

  /**
   * Se verdadeiro, exibe botão de fechar/dispensar o alerta
   * @default false
   */
  dismissible?: boolean;

  /**
   * Alias para a propriedade `dismissible`
   * @default false
   */
  isDismissible?: boolean;

  /**
   * Callback acionado ao clicar no botão de fechar/dispensar
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Alias para o callback `onDismiss`
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Ícone a ser exibido no alerta.
   * - `true` (padrão): renderiza o ícone temático correspondente à variante do Figma.
   * - `false` ou `null`: oculta o ícone.
   * - `React.ReactNode`: renderiza um ícone customizado.
   * @default true
   */
  icon?: React.ReactNode | boolean;

  /**
   * Botão ou elemento de ação contextual renderizado abaixo da mensagem
   */
  action?: React.ReactNode;

  /**
   * Classe CSS personalizada
   */
  className?: string;

  /**
   * Estilos CSS inline
   */
  style?: React.CSSProperties;
}
