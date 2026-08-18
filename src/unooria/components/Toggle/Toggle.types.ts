import React from 'react';

/**
 * Tamanhos suportados pelo componente Toggle
 */
export type ToggleSize = 'xs' | 'md' | 'lg';

/**
 * Posição do rótulo textual em relação ao interruptor
 */
export type ToggleLabelPosition = 'left' | 'right';

/**
 * Propriedades do componente Toggle (Switch / Interruptor)
 * Plataforma Unooria - Extraído do Figma (Node 6034:914 / Component Set 6034:960)
 */
export interface ToggleProps {
  /**
   * Estado ligado/desligado (modo controlado)
   */
  checked?: boolean;

  /**
   * Estado inicial ligado/desligado (modo não controlado)
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Callback disparado quando o estado do interruptor muda
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Tamanho do componente:
   * - `xs`: 38x20px (Knob 16px) - Padrão oficial do Figma
   * - `md`: 46x24px (Knob 20px) - Intermediário
   * - `lg`: 54x28px (Knob 24px) - Expandido oficial do Figma
   * @default 'xs'
   */
  size?: ToggleSize;

  /**
   * Rótulo textual do toggle
   */
  label?: React.ReactNode;

  /**
   * Descrição ou texto de suporte exibido abaixo do rótulo
   */
  description?: React.ReactNode;

  /**
   * Posição do rótulo em relação ao interruptor
   * @default 'right'
   */
  labelPosition?: ToggleLabelPosition;

  /**
   * Desabilita a interação com o componente
   * @default false
   */
  disabled?: boolean;

  /**
   * Identificador único do elemento
   */
  id?: string;

  /**
   * Nome do campo para envio em formulários HTML
   */
  name?: string;

  /**
   * Valor associado ao toggle em formulários
   */
  value?: string;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos inline adicionais
   */
  style?: React.CSSProperties;
}
