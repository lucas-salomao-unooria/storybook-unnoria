import React from 'react';

/**
 * Severidades e variantes visuais oficiais do Figma para a Tag
 */
export type TagVariant =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'brand'
  | 'outline';

/**
 * Escala de tamanho da Tag
 */
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente Tag
 * Plataforma Unooria - Extraído do Figma (Node 6029:1817 / Component Set 6029:1994)
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante cromática / severidade da tag
   * @default 'neutral'
   */
  variant?: TagVariant;

  /**
   * Tamanho da tag:
   * - `sm`: Altura 24px (compacta)
   * - `md`: Altura 28px (padrão oficial do Figma)
   * - `lg`: Altura 32px (expandida)
   * @default 'md'
   */
  size?: TagSize;

  /**
   * Se verdadeiro, aplica formato de pílula arredondada (border-radius: 1000px)
   * @default false
   */
  pill?: boolean;

  /**
   * Ícone exibido à esquerda (nome do ícone Material Symbols ou elemento React)
   */
  leftIcon?: string | React.ReactNode;

  /**
   * Ícone exibido à direita (nome do ícone Material Symbols ou elemento React)
   */
  rightIcon?: string | React.ReactNode;

  /**
   * Se verdadeiro, exibe botão interativo de fechar/remover à direita
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback disparado ao clicar no botão de fechar/remover
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Se a tag está selecionada (útil em grupos de filtros interativos)
   * @default false
   */
  selected?: boolean;

  /**
   * Desabilita interações na tag
   * @default false
   */
  disabled?: boolean;

  /**
   * Torna a tag interativa/clicável com comportamento de botão
   * @default false
   */
  clickable?: boolean;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Conteúdo / rótulo da tag
   */
  children?: React.ReactNode;

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;
}
