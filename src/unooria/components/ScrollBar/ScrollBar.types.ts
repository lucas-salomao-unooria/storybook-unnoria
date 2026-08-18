import React from 'react';

/**
 * Direção de rolagem permitida no container ScrollBar
 */
export type ScrollBarOrientation = 'vertical' | 'horizontal' | 'both';

/**
 * Espessura visual da barra de rolagem (Figma: 'slim' 4px padrão)
 */
export type ScrollBarThickness = 'slim' | 'regular' | 'thick';

/**
 * Tema visual para contraste da barra de rolagem
 */
export type ScrollBarTheme = 'light' | 'dark';

/**
 * Propriedades do componente ScrollBar (Barra de Rolagem)
 * Plataforma Unooria - Extraído do Figma (Node 6104:5351 / Component Set 6104:5258)
 */
export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direção da rolagem: 'vertical' (padrão), 'horizontal' ou 'both' (ambas).
   * @default 'vertical'
   */
  orientation?: ScrollBarOrientation;

  /**
   * Espessura visual do thumb/track:
   * - 'slim': 4px thumb / 2px track (Padrão Oficial do Figma)
   * - 'regular': 6px thumb / 3px track
   * - 'thick': 8px thumb / 4px track
   * @default 'slim'
   */
  thickness?: ScrollBarThickness;

  /**
   * Se verdadeiro, oculta a barra quando ocioso e a exibe suavemente com fade-in durante o hover ou rolagem.
   * @default false
   */
  autoHide?: boolean;

  /**
   * Altura máxima do container rolável (ex: '300px', '100%', 400).
   */
  maxHeight?: string | number;

  /**
   * Largura máxima do container rolável (ex: '600px', '100%', 500).
   */
  maxWidth?: string | number;

  /**
   * Altura fixa do container rolável.
   */
  height?: string | number;

  /**
   * Largura fixa do container rolável.
   */
  width?: string | number;

  /**
   * Tema visual de contraste: 'light' (fundo claro) ou 'dark' (fundo escuro #22272A).
   * @default 'light'
   */
  theme?: ScrollBarTheme;

  /**
   * Callback acionado durante o evento de rolagem.
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;

  /**
   * Conteúdo interno rolável encapsulado pelo container.
   */
  children?: React.ReactNode;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;
}
