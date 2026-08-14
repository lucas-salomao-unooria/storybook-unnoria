import React from 'react';

export type CalendarMode = 'single' | 'range' | 'multiple';
export type CalendarView = 'month' | 'year' | 'decade' | 'week';
export type CalendarTheme = 'light' | 'dark';
export type CalendarSize = 'sm' | 'md' | 'lg';

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
  /** Cor do evento (hex ou classe CSS) */
  color?: string;
  /** Cor específica para o ponto (dot) sob o dia (padrão #7FA5E2) */
  dotColor?: string;
  /** Categoria opcional para filtro ou estilização */
  category?: string;
  /** Horário opcional (ex: "14:30" ou "Dia todo") */
  time?: string;
}

/**
 * Propriedades injetadas no callback customizado de renderização de dia.
 */
export interface CalendarDayRenderProps {
  /** Objeto Date correspondente ao dia */
  date: Date;
  /** Número do dia no mês (1-31) */
  dayNumber: number;
  /** Se o dia pertence ao mês atualmente visualizado */
  isCurrentMonth: boolean;
  /** Se o dia é hoje */
  isToday: boolean;
  /** Se o dia está selecionado */
  isSelected: boolean;
  /** Se o dia está dentro do intervalo selecionado (modo range) */
  isInRange: boolean;
  /** Se o dia é o início do intervalo selecionado */
  isRangeStart: boolean;
  /** Se o dia é o fim do intervalo selecionado */
  isRangeEnd: boolean;
  /** Se o dia está desabilitado */
  isDisabled: boolean;
  /** Lista de eventos agendados para este dia */
  events: CalendarEvent[];
}

/**
 * Propriedades principais do componente Calendar.
 */
export interface CalendarProps {
  /** Modo de seleção de datas */
  mode?: CalendarMode;
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
