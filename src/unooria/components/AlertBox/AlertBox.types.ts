import React from 'react';
import type { ButtonProps, ButtonVariant } from '../Button/Button.types';

/**
 * Variantes semânticas de severidade do AlertBox (Figma: State)
 */
export type AlertBoxVariant = 'info' | 'success' | 'warning' | 'danger' | 'error';

/**
 * Modo de layout / dispositivo (Figma: Device)
 * - 'desktop': Layout de 436px, botões horizontais de 36px
 * - 'mobile': Layout de 355px, botões empilhados verticais de 48px
 * - 'auto': Responsivo automático via media query
 */
export type AlertBoxDevice = 'desktop' | 'mobile' | 'auto';

/**
 * Temas visuais suportados pelo AlertBox
 */
export type AlertBoxTheme = 'light' | 'dark';

/**
 * Configuração de ação para os botões do AlertBox
 */
export interface AlertBoxActionConfig {
  /** Rótulo textual do botão */
  label: React.ReactNode;
  /** Callback acionado ao clicar */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Variante do botão (ex: primary, secondary, outline, ghost, danger) */
  variant?: ButtonVariant;
  /** Desabilita o botão */
  disabled?: boolean;
  /** Exibe spinner de carregamento no botão */
  loading?: boolean;
  /** Propriedades adicionais repassadas ao Button */
  buttonProps?: Partial<ButtonProps>;
}

/**
 * Propriedades do componente AlertBox
 */
export interface AlertBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Severidade semântica do alerta.
   * Define o ícone e a paleta de cores do badge.
   * @default 'info'
   */
  variant?: AlertBoxVariant;

  /**
   * Alias de compatibilidade para `variant` (Figma: State)
   */
  state?: AlertBoxVariant;

  /**
   * Modo de dispositivo / layout visual.
   * - 'desktop': 436px, botões horizontais lado a lado
   * - 'mobile': 355px, botões verticais empilhados
   * - 'auto': Adaptação automática baseada em media query / container
   * @default 'desktop'
   */
  device?: AlertBoxDevice;

  /**
   * Título principal do alerta (centralizado, em negrito).
   * Figma: Title
   */
  title?: React.ReactNode;

  /**
   * Texto descritivo / corpo explicativo da mensagem (centralizado).
   * Figma: Body
   */
  description?: React.ReactNode;

  /**
   * Conteúdo customizado / corpo alternativo do alerta
   */
  children?: React.ReactNode;

  /**
   * Ícone customizado ou controle de exibição do ícone.
   * - `true`: Exibe o ícone SVG oficial do Figma conforme a severidade.
   * - `false`: Oculta o ícone e o badge circular.
   * - `ReactNode`: Renderiza o elemento customizado dentro do badge circular.
   * @default true
   */
  icon?: React.ReactNode | boolean;

  /**
   * Ação primária destacada (Filled button).
   * No desktop fica à direita; no mobile fica no topo.
   */
  primaryAction?: AlertBoxActionConfig | React.ReactNode;

  /**
   * Ação secundária (Subtle / Ghost button).
   * No desktop fica à esquerda (ex: Cancelar); no mobile fica abaixo.
   */
  secondaryAction?: AlertBoxActionConfig | React.ReactNode;

  /**
   * Conteúdo arbitrário para substituir a área de botões padrão
   */
  actions?: React.ReactNode;

  /**
   * Tema visual da caixa de alerta.
   * - 'dark': Superfície #22272A com backdrop blur 45px e textos claros (padrão Figma)
   * - 'light': Superfície clara #FFFFFF com textos escuros e sombra suave
   * @default 'dark'
   */
  theme?: AlertBoxTheme;

  /**
   * Exibe botão de fechar no canto superior direito (opcional para diálogos dispensáveis)
   * @default false
   */
  isDismissible?: boolean;

  /**
   * Callback disparado ao fechar o alerta
   */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Classe CSS adicional
   */
  className?: string;

  /**
   * Estilos CSS inline
   */
  style?: React.CSSProperties;
}
