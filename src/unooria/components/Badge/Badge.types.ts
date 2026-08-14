import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Variantes de status/cor do componente Badge.
 */
export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'info';

/**
 * Tamanhos disponíveis para o Badge.
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Alias retrocompatível para UnooriaTheme.
 */
export type BadgeTheme = UnooriaTheme;

/**
 * Posição do ícone em relação ao texto do Badge.
 */
export type BadgeIconPosition = 'left' | 'right';

/**
 * Propriedades do componente Badge da Plataforma Unooria.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante visual / status de cor do Badge.
   * Suporta: 'default', 'primary', 'success', 'warning', 'error', 'neutral', 'info'.
   * @default 'default'
   */
  variant?: BadgeVariant;

  /**
   * Alias alternativo e amigável para `variant`.
   * Se ambos forem fornecidos, `variant` possui precedência.
   */
  status?: BadgeVariant;

  /**
   * Tamanho do Badge.
   * Suporta 'sm' (pequeno: 20px), 'md' (médio: 24px) e 'lg' (grande: 30px).
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Tema visual do componente ('light' | 'dark').
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Exibe um ponto (dot) de status colorido antecedendo o texto.
   * @default false
   */
  dot?: boolean;

  /**
   * Define o formato em pílula (arredondamento máximo de 9999px).
   * Se `false`, o Badge adquire bordas suavemente arredondadas (4px).
   * @default true
   */
  pill?: boolean;

  /**
   * Indica se o Badge está desabilitado (reduz a opacidade e desativa eventos interativos).
   * @default false
   */
  disabled?: boolean;

  /**
   * Se verdadeiro, renderiza um botão de fechar/remover (X) acessível ao lado do texto.
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback acionado ao clicar no botão de fechamento (X).
   */
  onClose?: (e: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;

  /**
   * Ícone opcional (ReactNode ou elemento SVG).
   */
  icon?: React.ReactNode;

  /**
   * Posição do ícone em relação ao conteúdo ('left' | 'right').
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * Elemento ou componente HTML customizado para renderização polimórfica (ex: 'span', 'a', 'button', Link).
   * @default 'span'
   */
  as?: React.ElementType;

  /**
   * Atributos arbitrários adicionais para renderização polimórfica flexível.
   */
  [key: string]: any;
}
