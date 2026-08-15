import React from 'react';

export type CalendarMode = 'single' | 'range' | 'multiple';
export type CalendarView =
  | 'month'
  | 'months-picker'
  | 'years-picker'
  | 'week-expanded'
  | 'month-expanded'
  | 'full-month'
  | 'year'
  | 'decade'
  | 'week';

export type CalendarTheme = 'light' | 'dark';
export type CalendarSize = 'sm' | 'md' | 'lg';

/**
 * Categorias oficiais de eventos e feriados conforme o Figma (#18819:2876 / #12694:508).
 * - `nacional`: Feriado nacional (#E31A1A)
 * - `estadual`: Feriado estadual (#008257)
 * - `municipal`: Feriado municipal (#DD5202)
 * - `evento`: Evento, aula, mentoria ou live (#006BFF)
 */
export type CalendarEventType = 'nacional' | 'estadual' | 'municipal' | 'evento' | 'custom';

/**
 * Representação de um intervalo de datas para o modo 'range'.
 */
export interface DateRange {
  startDate?: Date | null;
  endDate?: Date | null;
}

/**
 * Estrutura de evento exibido no calendário.
 */
export interface CalendarEvent {
  /** Identificador único do evento */
  id?: string | number;
  /** Data do evento (objeto Date ou string YYYY-MM-DD) */
  date: Date | string;
  /** Título do evento exibido no tooltip/detalhes */
  title: string;
  /** Descrição opcional */
  description?: string;
  /** Categoria / Tipo de evento conforme Figma */
  eventType?: CalendarEventType;
  /** Cor customizada (se eventType não for suficiente) */
  color?: string;
  /** Cor específica para o ponto (dot) sob o dia */
  dotColor?: string;
  /** Horário de início e fim ou formatado (ex: "09:30 - 11:00" ou "Dia todo") */
  time?: string;
  /** Horário de início estruturado (ex: "09:00") */
  startTime?: string;
  /** Horário de término estruturado (ex: "10:30") */
  endTime?: string;
  /** Categoria adicional de contexto */
  category?: string;
}

/**
 * Propriedades injetadas no callback customizado de renderização de dia.
 */
export interface CalendarDayRenderProps {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
  events: CalendarEvent[];
}

/**
 * Propriedades principais do componente Calendar.
 */
export interface CalendarProps {
  /** Modo de seleção de datas */
  mode?: CalendarMode;
  /** Visualização atual do calendário ('month', 'month-expanded', 'week-expanded', 'months-picker', 'years-picker') */
  view?: CalendarView;
  /** Data selecionada para o modo 'single' */
  value?: Date | null;
  /** Callback acionado ao selecionar uma data (modo 'single') */
  onSelectDate?: (date: Date) => void;

  /** Intervalo de datas selecionado para o modo 'range' */
  rangeValue?: DateRange;
  /** Callback acionado ao selecionar um intervalo de datas (modo 'range') */
  onSelectRange?: (range: DateRange) => void;

  /** Lista de datas selecionadas para o modo 'multiple' */
  multipleValues?: Date[];
  /** Callback acionado ao selecionar múltiplas datas (modo 'multiple') */
  onSelectMultiple?: (dates: Date[]) => void;

  /** Mês atualmente exibido (modo controlado) */
  currentMonth?: Date;
  /** Mês inicial exibido (modo não-controlado) */
  defaultMonth?: Date;
  /** Callback acionado quando o usuário navega entre meses ou anos */
  onMonthChange?: (newMonth: Date) => void;

  /** Data mínima permitida para seleção */
  minDate?: Date;
  /** Data máxima permitida para seleção */
  maxDate?: Date;
  /** Lista de datas ou função predicado para desabilitar dias específicos */
  disabledDates?: Date[] | ((date: Date) => boolean);

  /** Lista de eventos a serem renderizados nas células do calendário */
  events?: CalendarEvent[];
  /** Se deve exibir tooltip com detalhes dos eventos ao passar o mouse */
  showEventTooltip?: boolean;
  /** Callback ao clicar em um evento ou dia com eventos */
  onEventClick?: (event: CalendarEvent, date: Date) => void;

  /** Renderizador customizado para o conteúdo das células de dias */
  renderDay?: (props: CalendarDayRenderProps) => React.ReactNode;

  /** Se deve exibir os dias pertencentes aos meses anterior e próximo */
  showOutsideDays?: boolean;
  /** Primeiro dia da semana: 0 = Domingo, 1 = Segunda-feira (padrão 0) */
  firstDayOfWeek?: 0 | 1;

  /** Tema visual: 'light' ou 'dark' */
  theme?: CalendarTheme;
  /** Tamanho do componente */
  size?: CalendarSize;
  /** Código de localidade para nomes e formatações (padrão 'pt-BR') */
  locale?: string;

  /** Se deve exibir o botão de atalho "Hoje" no cabeçalho ou rodapé */
  showTodayButton?: boolean;
  /** Se deve exibir o cabeçalho de navegação */
  showHeader?: boolean;
  /** Se deve permitir abrir o seletor rápido de mês e ano */
  showQuickNav?: boolean;
  /** Se deve exibir o rodapé com resumo da seleção */
  showFooter?: boolean;

  /** Classe CSS customizada */
  className?: string;
  /** Estilos inline customizados */
  style?: React.CSSProperties;
  /** Rótulo de acessibilidade */
  ariaLabel?: string;
}
