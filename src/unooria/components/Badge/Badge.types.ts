import React from 'react';

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
 * Temas suportados para alteração de esquema de cores (Light / Dark).
 */
export type BadgeTheme = 'light' | 'dark';

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
   * Suporta 'sm' (pequeno), 'md' (médio) e 'lg' (grande).
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Tema visual do componente ('light' | 'dark').
   * @default 'light'
   */
  theme?: BadgeTheme;

  /**
   * Ícone opcional (ReactNode ou elemento SVG).
   */
  icon?: React.ReactNode;

  /**
   * Posição do ícone em relação ao conteúdo ('left' | 'right').
   * @default 'left'
   */
  iconPosition?: BadgeIconPosition;

  /**
   * Exibe um ponto (dot) de status colorido antecedendo o texto.
   * @default false
   */
  dot?: boolean;

  /**
   * Define o formato em pílula (arredondamento máximo de 9999px).
   * Se `false`, o Badge adquire bordas suavemente arredondadas.
   * @default true
   */
  pill?: boolean;

  /**
   * Indica se o Badge é desabilitado (reduz a opacidade e desativa eventos de clique).
   * @default false
   */
  disabled?: boolean;

  /**
   * Conteúdo interno (texto, contadores, etiquetas).
   */
  children?: React.ReactNode;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline customizados.
   */
  style?: React.CSSProperties;

  /**
   * Evento de clique no Badge (torna o componente interativo com efeito hover/active).
   */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;

  /**
   * Se verdadeiro, renderiza um botão de fechar/remover (X) ao lado do texto.
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback acionado ao clicar no botão de fechamento (X).
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
