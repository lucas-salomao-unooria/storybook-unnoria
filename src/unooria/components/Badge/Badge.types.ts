import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Variantes de status/cor do componente Badge conforme o Figma (Component Set #5920:3299).
 * - 'error': Vermelho #E31A1A
 * - 'warning': Laranja #DD5202
 * - 'info': Azul #006BFF
 * - 'success' / 'sucess': Verde #008257
 * - 'disable' / 'disabled': Fundo translúcido rgba(34, 39, 42, 0.3)
 * - 'primary' / 'neutral' / 'default': Aliases de suporte da plataforma
 */
export type BadgeVariant =
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'sucess'
  | 'disable'
  | 'disabled'
  | 'primary'
  | 'neutral'
  | 'default';

/**
 * Modo de exibição do Badge no Figma (Number: On | Off)
 * - 'on': Exibe como cápsula com número/rótulo
 * - 'off': Exibe como dot indicador circular de 8x8px
 */
export type BadgeNumberMode = 'on' | 'off';

/**
 * Tamanhos disponíveis para o Badge.
 * - 'sm': Padrão do Figma (10px Bold / padding 4px 8px)
 * - 'md': Médio (12px / padding 4px 10px)
 * - 'lg': Grande (14px / padding 6px 12px)
 * - 'dot': Dot circular de 8x8px
 */
export type BadgeSize = 'sm' | 'md' | 'lg' | 'dot';

/**
 * Alias retrocompatível para UnooriaTheme.
 */
export type BadgeTheme = UnooriaTheme;

/**
 * Posição do ícone em relação ao texto do Badge.
 */
export type BadgeIconPosition = 'left' | 'right';

/**
 * Propriedades do componente Badge da Plataforma Unooria (Figma Node #17265:3692).
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante visual / status de cor do Badge.
   * Suporta: 'error', 'warning', 'info', 'success', 'disable', 'primary', 'neutral', 'default'.
   * @default 'info'
   */
  variant?: BadgeVariant;

  /**
   * Alias alternativo e amigável para `variant`.
   */
  status?: BadgeVariant;

  /**
   * Modo do Figma (Number=On vs Number=Off).
   * - 'on': Renderiza a cápsula com texto/número.
   * - 'off': Renderiza apenas o dot indicador de 8x8px.
   */
  number?: BadgeNumberMode;

  /**
   * Contagem numérica direta (ex: count=1, count=99).
   */
  count?: number;

  /**
   * Valor máximo para exibição antes de truncar com '+' (ex: overflowCount=99 exibe '99+').
   * @default 99
   */
  overflowCount?: number;

  /**
   * Tamanho do Badge.
   * Suporta 'sm' (10px Bold - Figma), 'md' (12px), 'lg' (14px) e 'dot' (8x8px).
   * @default 'sm'
   */
  size?: BadgeSize;

  /**
   * Tema visual do componente ('light' | 'dark').
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Exibe como ponto indicador (dot) de 8x8px ou adiciona um dot antes do texto.
   * @default false
   */
  dot?: boolean;

  /**
   * Define o formato em pílula (arredondamento máximo de 1000px).
   * @default true
   */
  pill?: boolean;

  /**
   * Indica se o Badge está desabilitado (Figma: Variant=Disable).
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
   * Elemento ou componente HTML customizado para renderização polimórfica (ex: 'span', 'div').
   * @default 'span'
   */
  as?: React.ElementType;

  /**
   * Conteúdo interno do Badge.
   */
  children?: React.ReactNode;

  /**
   * Atributos arbitrários adicionais.
   */
  [key: string]: any;
}
