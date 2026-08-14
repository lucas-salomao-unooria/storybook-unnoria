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
export interface AlertBoxProps {
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
  icon?: React.ReactNode | boolean;

  /**
   * Indica se o alerta pode ser dispensado/fechado pelo usuário.
   * @default false
   */
  isDismissible?: boolean;

  /**
   * Callback executado ao clicar no botão de fechar/dispensar.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Elemento de ação opcional (ex: botão de confirmação, link, etc.).
   */
  actionButton?: React.ReactNode;

  /**
   * Tema visual do componente ('light' | 'dark').
   * Se omitido, pode herdar do contexto ou padrão 'light'.
   * @default 'light'
   */
  theme?: AlertBoxTheme;

  /**
   * Classes CSS adicionais para customização.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;

  /**
   * Rótulo de acessibilidade ARIA.
   */
  'aria-label'?: string;
}
