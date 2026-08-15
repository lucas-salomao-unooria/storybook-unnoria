import React from 'react';
import { CalendarEvent, DateRange } from '../Calendar/Calendar.types';

export type DatePickerSelectionMode = 'single' | 'range';
export type DatePickerSize = 'sm' | 'md' | 'lg';
export type DatePickerTheme = 'light' | 'dark';
export type DatePickerPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto';

/**
 * Estrutura para um atalho rápido de seleção de data.
 */
export interface DatePickerShortcut {
  /** Rótulo exibido no botão do atalho (ex: "Hoje", "Últimos 7 dias") */
  label: string;
  /** Valor retornado ou função geradora para o atalho */
  value:
    | Date
    | DateRange
    | [Date, Date]
    | (() => Date | DateRange | [Date, Date]);
}

/**
 * Propriedades principais do componente DatePicker.
 * Atende às especificações do Figma Nó #18919:25934.
 */
export interface DatePickerProps {
  /** Modo de seleção de datas: 'single' (única) ou 'range' (intervalo) */
  mode?: DatePickerSelectionMode;

  /** Data selecionada no modo 'single' (controlado) */
  value?: Date | null;
  /** Data inicial selecionada no modo 'single' (não-controlado) */
  defaultValue?: Date | null;
  /** Callback acionado ao alterar a data no modo 'single' */
  onChange?: (date: Date | null) => void;

  /** Intervalo de datas selecionado no modo 'range' (controlado) */
  rangeValue?: DateRange | null;
  /** Intervalo inicial de datas no modo 'range' (não-controlado) */
  defaultRangeValue?: DateRange | null;
  /** Callback acionado ao alterar o intervalo de datas no modo 'range' */
  onRangeChange?: (range: DateRange) => void;

  /** Data mínima permitida para seleção */
  minDate?: Date;
  /** Data máxima permitida para seleção */
  maxDate?: Date;
  /** Lista de datas ou função predicado para desabilitar dias específicos */
  disabledDates?: Date[] | ((date: Date) => boolean);

  /** Formato de exibição e máscara da data (padrão 'DD/MM/AAAA') */
  format?: string;
  /** Rótulo do campo de entrada (label superior) */
  label?: string;
  /** Indicador de campo obrigatório (exibe asterisco vermelho) */
  required?: boolean;
  /** Texto de apoio/ajuda exibido abaixo do input */
  helperText?: string;
  /** Mensagem de erro ou booleano indicando estado inválido */
  error?: boolean | string;
  /** Se o componente está desabilitado */
  disabled?: boolean;
  /** Se o campo está em modo somente leitura */
  readOnly?: boolean;
  /** Texto de placeholder (padrão 'dd/mm/aaaa' ou 'dd/mm/aaaa - dd/mm/aaaa') */
  placeholder?: string;

  /** Se deve exibir botões de atalhos rápidos (booleano para padrão ou lista customizada) */
  shortcuts?: boolean | DatePickerShortcut[];
  /** Se deve permitir limpar o valor selecionado através do botão 'x' */
  clearable?: boolean;

  /** Tamanho do componente: 'sm' (32px), 'md' (48px), 'lg' (56px) */
  size?: DatePickerSize;
  /** Tema visual: 'light' (claro) ou 'dark' (escuro) */
  theme?: DatePickerTheme;
  /** Código de localidade para formatações e nomes (padrão 'pt-BR') */
  locale?: string;

  /** Se deve fechar o popover automaticamente após a seleção */
  closeOnSelect?: boolean;
  /** Posicionamento preferencial do popover flutuante */
  popoverPlacement?: DatePickerPlacement;

  /** Estado de abertura do popover (modo controlado) */
  isOpen?: boolean;
  /** Estado inicial de abertura do popover (modo não-controlado) */
  defaultIsOpen?: boolean;
  /** Callback acionado quando o popover é aberto */
  onOpen?: () => void;
  /** Callback acionado quando o popover é fechado */
  onClose?: () => void;

  /** Lista de eventos a serem exibidos nas células do calendário acoplado */
  events?: CalendarEvent[];
  /** Se deve exibir dias de meses adjacentes no calendário */
  showOutsideDays?: boolean;
  /** Primeiro dia da semana: 0 = Domingo, 1 = Segunda-feira */
  firstDayOfWeek?: 0 | 1;

  /** Nome do campo para formulários */
  name?: string;
  /** ID do elemento de entrada */
  id?: string;
  /** Classe CSS customizada */
  className?: string;
  /** Estilos inline customizados */
  style?: React.CSSProperties;
  /** Rótulo de acessibilidade para leitores de tela */
  ariaLabel?: string;
  /** Referência direta para o elemento <input> */
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * Propriedades especializadas para o DateRangePicker.
 */
export interface DateRangePickerProps extends Omit<DatePickerProps, 'mode' | 'value' | 'defaultValue' | 'onChange'> {
  /** Intervalo de datas selecionado (controlado) */
  value?: DateRange | null;
  /** Intervalo inicial de datas (não-controlado) */
  defaultValue?: DateRange | null;
  /** Callback acionado ao alterar o intervalo */
  onChange?: (range: DateRange) => void;
}
