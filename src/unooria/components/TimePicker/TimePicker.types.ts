import React from 'react';

/**
 * Escala de tamanhos oficiais do TimePicker
 */
export type TimePickerSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Formato de horas suportado
 */
export type TimePickerFormat = '24h' | '12h';

/**
 * Propriedades do componente TimePicker
 * Plataforma Unooria - Extraído do Figma (Node 18753:5458 / Component Set 18753:2716)
 */
export interface TimePickerProps {
  /**
   * Valor selecionado no formato "HH:mm" ou "HH:mm:ss"
   */
  value?: string;

  /**
   * Valor inicial padrão (modo não controlado)
   */
  defaultValue?: string;

  /**
   * Callback disparado quando o horário é alterado
   */
  onChange?: (time: string) => void;

  /**
   * Se verdadeiro, exibe a terceira coluna com seleção de segundos (00 a 59)
   * @default false
   */
  showSeconds?: boolean;

  /**
   * Formato de exibição: '24h' (00-23) ou '12h' (01-12 AM/PM)
   * @default '24h'
   */
  format?: TimePickerFormat;

  /**
   * Intervalo de minutos exibidos na coluna (ex: 1, 5, 10, 15)
   * @default 1
   */
  minuteStep?: number;

  /**
   * Intervalo de segundos exibidos na coluna
   * @default 1
   */
  secondStep?: number;

  /**
   * Tamanho do campo:
   * - `xs`: Altura 32px
   * - `sm`: Altura 40px
   * - `md`: Altura 48px (padrão oficial do Figma)
   * - `lg`: Altura 56px
   * @default 'md'
   */
  size?: TimePickerSize;

  /**
   * Rótulo superior do campo (Top Label)
   */
  label?: React.ReactNode;

  /**
   * Se verdadeiro, exibe asterisco vermelho de obrigatoriedade (*)
   * @default false
   */
  required?: boolean;

  /**
   * Texto de orientação ou ajuda exibido abaixo do campo
   */
  helperText?: React.ReactNode;

  /**
   * Ícone ou botão de ajuda exibido ao lado do label
   */
  helperIcon?: boolean | string | React.ReactNode;

  /**
   * Mensagem de erro ou estado booleano
   */
  error?: boolean | string;

  /**
   * Desabilita a interação com o seletor
   * @default false
   */
  disabled?: boolean;

  /**
   * Se verdadeiro, exibe botão para limpar o horário selecionado
   * @default false
   */
  clearable?: boolean;

  /**
   * Se verdadeiro, expande o campo para 100% da largura do container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Texto de placeholder quando nenhum horário estiver selecionado
   */
  placeholder?: string;

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
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;
}
