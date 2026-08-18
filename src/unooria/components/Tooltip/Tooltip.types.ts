import React from 'react';

/**
 * Posições oficiais suportadas pelo Tooltip
 */
export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'none';

/**
 * Eventos disparadores do Tooltip
 */
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

/**
 * Propriedades do componente Tooltip (Balão de Dica Contextual)
 * Plataforma Unooria - Extraído do Figma (Node 6034:1092 / Component Set 6034:1213)
 */
export interface TooltipProps {
  /**
   * Conteúdo textual ou elementos ricos exibidos dentro do balão
   */
  content: React.ReactNode;

  /**
   * Elemento gatilho sobre o qual o tooltip se posiciona
   */
  children: React.ReactElement;

  /**
   * Posicionamento do balão em relação ao elemento filho
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Se verdadeiro, exibe a seta direcional conectada ao elemento
   * @default true
   */
  showArrow?: boolean;

  /**
   * Modos de disparo de exibição do tooltip
   * @default ['hover', 'focus']
   */
  trigger?: TooltipTrigger | TooltipTrigger[];

  /**
   * Controle de visibilidade manual (modo controlado)
   */
  open?: boolean;

  /**
   * Visibilidade inicial (modo não controlado)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback disparado quando o estado de visibilidade muda
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Tempo de espera antes de exibir o tooltip (em milissegundos)
   * @default 150
   */
  enterDelay?: number;

  /**
   * Tempo de espera antes de ocultar o tooltip (em milissegundos)
   * @default 100
   */
  leaveDelay?: number;

  /**
   * Desabilita a exibição do tooltip
   * @default false
   */
  disabled?: boolean;

  /**
   * Largura máxima do balão de dica
   * @default 240
   */
  maxWidth?: number | string;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais para o container flutuante
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;
}
