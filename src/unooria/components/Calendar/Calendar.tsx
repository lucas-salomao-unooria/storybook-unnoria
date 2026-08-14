import React, { useState, useMemo, useCallback } from 'react';
import {
  CalendarProps,
  CalendarEvent,
  CalendarDayRenderProps,
  DateRange,
} from './Calendar.types';
import './Calendar.css';

// Nomes dos meses em Português Brasileiro (PT-BR)
const MONTH_NAMES_PT = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

// Nomes dos dias da semana (abreviados e completos para a11y)
const WEEKDAYS_SHORT_PT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const WEEKDAYS_FULL_PT = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

/* ==========================================================================
   Funções Utilitárias de Manipulação de Datas
   ========================================================================== */

function startOfDay(d: Date): Date {
  const newDate = new Date(d);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function isSameDay(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

function isBetweenDays(target: Date, start: Date, end: Date): boolean {
  const t = startOfDay(target).getTime();
  const s = startOfDay(start).getTime();
  const e = startOfDay(end).getTime();
  return t >= s && t <= e;
}

function parseEventDate(dateValue: Date | string): Date {
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === 'string') {
    // Trata formato YYYY-MM-DD para evitar shifts de timezone
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      const [y, m, d] = dateValue.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date(dateValue);
  }
  return new Date();
}

/**
 * Componente Calendar - Design System Plataforma Unooria
 *
 * Componente avançado para navegação temporal, seleção de datas únicas,
 * intervalos (range) e múltiplas datas. Inclui suporte nativo a eventos
 * com pontos indicadores e tooltips informativos, navegação rápida por meses/anos,
 * internacionalização PT-BR e suporte completo a temas Claro e Escuro.
 */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = 'single',
      value,
      onSelectDate,
      rangeValue,
      onSelectRange,
      multipleValues = [],
      onSelectMultiple,
      currentMonth: controlledMonth,
      defaultMonth,
      onMonthChange,
      minDate,
      maxDate,
      disabledDates,
      events = [],
      showEventTooltip = true,
      onEventClick,
      renderDay,
      showOutsideDays = true,
      firstDayOfWeek = 0,
      theme = 'light',
      size = 'md',
      locale = 'pt-BR',
      showTodayButton = true,
      showHeader = true,
      showQuickNav = true,
      showFooter = false,
      className = '',
      style,
      ariaLabel = 'Calendário de seleção de datas',
    },
    ref
  ) => {
    // Data de referência de Hoje
    const today = useMemo(() => startOfDay(new Date()), []);

    // Estado do mês exibido (controlado ou não-controlado)
    const [internalMonth, setInternalMonth] = useState<Date>(() => {
      if (defaultMonth) return startOfDay(defaultMonth);
      if (value) return startOfDay(value);
      if (rangeValue?.startDate) return startOfDay(rangeValue.startDate);
      return today;
    });

    const activeMonth = controlledMonth ? startOfDay(controlledMonth) : internalMonth;

    // Estado para modo de navegação rápida ('none' | 'month' | 'year')
    const [quickNavMode, setQuickNavMode] = useState<'none' | 'month' | 'year'>('none');
    const [yearRangeStart, setYearRangeStart] = useState<number>(() => {
      return Math.floor(activeMonth.getFullYear() / 12) * 12;
    });

    // Estado para hover dinâmico em seleção de intervalo (range)
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    // Estado para tooltip de eventos no hover
    const [activeTooltipDate, setActiveTooltipDate] = useState<Date | null>(null);

    // Atualiza o mês exibido
    const changeMonth = useCallback(
      (newMonth: Date) => {
        if (!controlledMonth) {
          setInternalMonth(newMonth);
        }
        onMonthChange?.(newMonth);
      },
      [controlledMonth, onMonthChange]
    );

    // Navegação: Mês Anterior
    const handlePrevMonth = () => {
      if (quickNavMode === 'year') {
        setYearRangeStart((prev) => prev - 12);
        return;
      }
      const newDate = new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1);
      changeMonth(newDate);
    };

    // Navegação: Próximo Mês
    const handleNextMonth = () => {
      if (quickNavMode === 'year') {
        setYearRangeStart((prev) => prev + 12);
        return;
      }
      const newDate = new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1);
      changeMonth(newDate);
    };

    // Atalho: Ir para Hoje
    const handleGoToToday = () => {
      const newDate = new Date(today.getFullYear(), today.getMonth(), 1);
      changeMonth(newDate);
      if (mode === 'single') {
        onSelectDate?.(today);
      }
      setQuickNavMode('none');
    };

    // Verifica se uma data específica está desabilitada
    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (minDate && isBeforeDay(date, minDate)) return true;
        if (maxDate && isAfterDay(date, maxDate)) return true;
        if (typeof disabledDates === 'function') {
          return disabledDates(date);
        }
        if (Array.isArray(disabledDates)) {
          return disabledDates.some((d) => isSameDay(d, date));
        }
        return false;
      },
      [minDate, maxDate, disabledDates]
    );

    // Mapeamento de eventos por data
    const eventsByDate = useMemo(() => {
      const map = new Map<string, CalendarEvent[]>();
      events.forEach((evt) => {
        const d = parseEventDate(evt.date);
        const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        const existing = map.get(key) || [];
        existing.push(evt);
        map.set(key, existing);
      });
      return map;
    }, [events]);

    const getEventsForDate = useCallback(
      (date: Date): CalendarEvent[] => {
        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        return eventsByDate.get(key) || [];
      },
      [eventsByDate]
    );

    // Lógica de seleção ao clicar no dia
    const handleDayClick = (date: Date) => {
      if (isDateDisabled(date)) return;

      if (mode === 'single') {
        onSelectDate?.(date);
      } else if (mode === 'range') {
        const { startDate, endDate } = rangeValue || {};
        if (!startDate || (startDate && endDate)) {
          // Inicia novo intervalo
          onSelectRange?.({ startDate: date, endDate: null });
        } else {
          // Finaliza intervalo
          if (isBeforeDay(date, startDate)) {
            onSelectRange?.({ startDate: date, endDate: startDate });
          } else {
            onSelectRange?.({ startDate, endDate: date });
          }
        }
      } else if (mode === 'multiple') {
        const isSelected = multipleValues.some((d) => isSameDay(d, date));
        const newSelection = isSelected
          ? multipleValues.filter((d) => !isSameDay(d, date))
          : [...multipleValues, date];
        onSelectMultiple?.(newSelection);
      }
    };

    // Construção da Matriz de Dias (6 semanas x 7 dias = 42 células)
    const daysGrid = useMemo(() => {
      const year = activeMonth.getFullYear();
      const month = activeMonth.getMonth();

      // Primeiro dia do mês
      const firstDay = new Date(year, month, 1);
      let startingDayOfWeek = firstDay.getDay() - firstDayOfWeek;
      if (startingDayOfWeek < 0) startingDayOfWeek += 7;

      // Dias no mês anterior
      const prevMonthLastDate = new Date(year, month, 0).getDate();
      // Dias no mês atual
      const currentMonthLastDate = new Date(year, month + 1, 0).getDate();

      const days: Array<{
        date: Date;
        dayNumber: number;
        isCurrentMonth: boolean;
      }> = [];

      // Preenchimento com dias do mês anterior
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const d = new Date(year, month - 1, prevMonthLastDate - i);
        days.push({
          date: d,
          dayNumber: prevMonthLastDate - i,
          isCurrentMonth: false,
        });
      }

      // Dias do mês atual
      for (let i = 1; i <= currentMonthLastDate; i++) {
        const d = new Date(year, month, i);
        days.push({
          date: d,
          dayNumber: i,
          isCurrentMonth: true,
        });
      }

      // Preenchimento com dias do próximo mês para completar 42 células (6 linhas)
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const d = new Date(year, month + 1, i);
        days.push({
          date: d,
          dayNumber: i,
          isCurrentMonth: false,
        });
      }

      return days;
    }, [activeMonth, firstDayOfWeek]);

    // Reordenação do cabeçalho de dias da semana
    const orderedWeekdays = useMemo(() => {
      if (firstDayOfWeek === 1) {
        return [
          { short: WEEKDAYS_SHORT_PT[1], full: WEEKDAYS_FULL_PT[1] },
          { short: WEEKDAYS_SHORT_PT[2], full: WEEKDAYS_FULL_PT[2] },
          { short: WEEKDAYS_SHORT_PT[3], full: WEEKDAYS_FULL_PT[3] },
          { short: WEEKDAYS_SHORT_PT[4], full: WEEKDAYS_FULL_PT[4] },
          { short: WEEKDAYS_SHORT_PT[5], full: WEEKDAYS_FULL_PT[5] },
          { short: WEEKDAYS_SHORT_PT[6], full: WEEKDAYS_FULL_PT[6] },
          { short: WEEKDAYS_SHORT_PT[0], full: WEEKDAYS_FULL_PT[0] },
        ];
      }
      return WEEKDAYS_SHORT_PT.map((short, idx) => ({
        short,
        full: WEEKDAYS_FULL_PT[idx],
      }));
    }, [firstDayOfWeek]);

    // Resumo de seleção para o rodapé
    const selectionSummary = useMemo(() => {
      if (mode === 'single' && value) {
        return `${value.getDate()} de ${MONTH_NAMES_PT[value.getMonth()]} de ${value.getFullYear()}`;
      }
      if (mode === 'range') {
        const start = rangeValue?.startDate;
        const end = rangeValue?.endDate;
        if (start && end) {
          return `${start.getDate()}/${start.getMonth() + 1} até ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
        }
        if (start) {
          return `Início: ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
        }
      }
      if (mode === 'multiple' && multipleValues.length > 0) {
        return `${multipleValues.length} data(s) selecionada(s)`;
      }
      return 'Nenhuma data selecionada';
    }, [mode, value, rangeValue, multipleValues]);

    const calendarClasses = [
      'unooria-calendar',
      `unooria-calendar--size-${size}`,
      `unooria-calendar--${theme}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={calendarClasses}
        data-theme={theme}
        style={style}
        role="region"
        aria-label={ariaLabel}
      >
        {/* ====================================================================
            Cabeçalho com Navegação de Mês/Ano
            ==================================================================== */}
        {showHeader && (
          <div className="unooria-calendar__header">
            <div className="unooria-calendar__title-container">
              {showQuickNav ? (
                <button
                  type="button"
                  className="unooria-calendar__title-btn"
                  onClick={() =>
                    setQuickNavMode((prev) => (prev === 'none' ? 'month' : 'none'))
                  }
                  aria-label={`Mudar visualização: ${MONTH_NAMES_PT[activeMonth.getMonth()]} ${activeMonth.getFullYear()}`}
                >
                  <span>
                    {quickNavMode === 'year'
                      ? `${yearRangeStart} - ${yearRangeStart + 11}`
                      : `${MONTH_NAMES_PT[activeMonth.getMonth()]} ${activeMonth.getFullYear()}`}
                  </span>
                  <svg
                    className={`unooria-calendar__title-arrow ${
                      quickNavMode !== 'none' ? 'unooria-calendar__title-arrow--open' : ''
                    }`}
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>
              ) : (
                <span className="unooria-calendar__title-btn" style={{ cursor: 'default' }}>
                  {MONTH_NAMES_PT[activeMonth.getMonth()]} {activeMonth.getFullYear()}
                </span>
              )}
            </div>

            <div className="unooria-calendar__nav">
              {showTodayButton && (
                <button
                  type="button"
                  className="unooria-calendar__today-btn"
                  onClick={handleGoToToday}
                  title="Ir para o mês e dia atual"
                >
                  Hoje
                </button>
              )}

              {/* Botão Mês Anterior */}
              <button
                type="button"
                className="unooria-calendar__nav-btn"
                onClick={handlePrevMonth}
                aria-label={quickNavMode === 'year' ? 'Anos anteriores' : 'Mês anterior'}
              >
                <svg
                  className="unooria-calendar__nav-icon"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 15l-5-5 5-5" />
                </svg>
              </button>

              {/* Botão Próximo Mês */}
              <button
                type="button"
                className="unooria-calendar__nav-btn"
                onClick={handleNextMonth}
                aria-label={quickNavMode === 'year' ? 'Próximos anos' : 'Próximo mês'}
              >
                <svg
                  className="unooria-calendar__nav-icon"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 5l5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ====================================================================
            Overlay de Seleção Rápida (Mês ou Ano)
            ==================================================================== */}
        {quickNavMode !== 'none' && (
          <div className="unooria-calendar__quick-nav">
            <div className="unooria-calendar__quick-nav-header">
              <span>{quickNavMode === 'month' ? 'Selecionar Mês' : 'Selecionar Ano'}</span>
              <button
                type="button"
                className="unooria-calendar__today-btn"
                onClick={() =>
                  setQuickNavMode((prev) => (prev === 'month' ? 'year' : 'month'))
                }
              >
                {quickNavMode === 'month'
                  ? `${activeMonth.getFullYear()}`
                  : 'Voltar p/ Meses'}
              </button>
            </div>

            <div className="unooria-calendar__quick-grid">
              {quickNavMode === 'month' &&
                MONTH_NAMES_PT.map((monthName, idx) => {
                  const isSelected = activeMonth.getMonth() === idx;
                  return (
                    <button
                      key={monthName}
                      type="button"
                      className={`unooria-calendar__quick-item ${
                        isSelected ? 'unooria-calendar__quick-item--selected' : ''
                      }`}
                      onClick={() => {
                        const newDate = new Date(activeMonth.getFullYear(), idx, 1);
                        changeMonth(newDate);
                        setQuickNavMode('none');
                      }}
                    >
                      {monthName.slice(0, 3)}
                    </button>
                  );
                })}

              {quickNavMode === 'year' &&
                Array.from({ length: 12 }, (_, i) => yearRangeStart + i).map((yr) => {
                  const isSelected = activeMonth.getFullYear() === yr;
                  return (
                    <button
                      key={yr}
                      type="button"
                      className={`unooria-calendar__quick-item ${
                        isSelected ? 'unooria-calendar__quick-item--selected' : ''
                      }`}
                      onClick={() => {
                        const newDate = new Date(yr, activeMonth.getMonth(), 1);
                        changeMonth(newDate);
                        setQuickNavMode('month');
                      }}
                    >
                      {yr}
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* ====================================================================
            Cabeçalho de Dias da Semana (D, S, T, Q, Q, S, S)
            ==================================================================== */}
        <div className="unooria-calendar__weekdays" role="row">
          {orderedWeekdays.map((wd, index) => (
            <div
              key={index}
              className="unooria-calendar__weekday"
              role="columnheader"
              aria-label={wd.full}
            >
              {wd.short}
            </div>
          ))}
        </div>

        {/* ====================================================================
            Grade de Dias (7 colunas x 6 linhas)
            ==================================================================== */}
        <div className="unooria-calendar__grid" role="grid">
          {daysGrid.map(({ date, dayNumber, isCurrentMonth }, index) => {
            const isToday = isSameDay(date, today);
            const disabled = isDateDisabled(date);
            const dayEvents = getEventsForDate(date);

            // Resolução de Seleção
            let isSelected = false;
            let isInRange = false;
            let isRangeStart = false;
            let isRangeEnd = false;

            if (mode === 'single') {
              isSelected = isSameDay(date, value);
            } else if (mode === 'range') {
              const { startDate, endDate } = rangeValue || {};
              isRangeStart = Boolean(startDate && isSameDay(date, startDate));
              isRangeEnd = Boolean(endDate && isSameDay(date, endDate));
              isSelected = isRangeStart || isRangeEnd;

              // Em progresso de seleção (hover)
              const effectiveEnd = endDate || (startDate ? hoverDate : null);
              if (startDate && effectiveEnd) {
                const s = isBeforeDay(startDate, effectiveEnd) ? startDate : effectiveEnd;
                const e = isAfterDay(effectiveEnd, startDate) ? effectiveEnd : startDate;
                isInRange = isBetweenDays(date, s, e);
              }
            } else if (mode === 'multiple') {
              isSelected = multipleValues.some((d) => isSameDay(d, date));
            }

            // Wrapper classes para conectores de intervalo contínuo
            const wrapperClasses = [
              'unooria-calendar__cell-wrapper',
              isInRange ? 'unooria-calendar__cell-wrapper--in-range' : '',
              isRangeStart ? 'unooria-calendar__cell-wrapper--range-start' : '',
              isRangeEnd ? 'unooria-calendar__cell-wrapper--range-end' : '',
              isRangeStart && isRangeEnd
                ? 'unooria-calendar__cell-wrapper--range-single'
                : '',
            ]
              .filter(Boolean)
              .join(' ');

            // Botão classes do dia
            const dayClasses = [
              'unooria-calendar__day',
              !isCurrentMonth ? 'unooria-calendar__day--outside' : '',
              isToday ? 'unooria-calendar__day--today' : '',
              isSelected ? 'unooria-calendar__day--selected' : '',
              isInRange && !isSelected ? 'unooria-calendar__day--in-range' : '',
              disabled ? 'unooria-calendar__day--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ');

            // Se for dia fora do mês e showOutsideDays for false, renderiza vazio
            if (!isCurrentMonth && !showOutsideDays) {
              return <div key={index} className="unooria-calendar__cell-wrapper" />;
            }

            // Formatação acessível de aria-label
            const formattedAriaDate = `${date.getDate()} de ${
              MONTH_NAMES_PT[date.getMonth()]
            } de ${date.getFullYear()}${isToday ? ', Hoje' : ''}${
              isSelected ? ', Selecionado' : ''
            }${dayEvents.length > 0 ? `, ${dayEvents.length} evento(s)` : ''}`;

            const dayRenderProps: CalendarDayRenderProps = {
              date,
              dayNumber,
              isCurrentMonth,
              isToday,
              isSelected,
              isInRange,
              isRangeStart,
              isRangeEnd,
              isDisabled: disabled,
              events: dayEvents,
            };

            return (
              <div
                key={index}
                className={wrapperClasses}
                onMouseEnter={() => {
                  if (mode === 'range' && rangeValue?.startDate && !rangeValue.endDate) {
                    setHoverDate(date);
                  }
                  if (dayEvents.length > 0 && showEventTooltip) {
                    setActiveTooltipDate(date);
                  }
                }}
                onMouseLeave={() => {
                  if (activeTooltipDate && isSameDay(activeTooltipDate, date)) {
                    setActiveTooltipDate(null);
                  }
                }}
              >
                <button
                  type="button"
                  className={dayClasses}
                  onClick={() => handleDayClick(date)}
                  disabled={disabled}
                  aria-label={formattedAriaDate}
                  aria-selected={isSelected}
                  aria-disabled={disabled}
                  aria-current={isToday ? 'date' : undefined}
                  tabIndex={disabled ? -1 : 0}
                >
                  {renderDay ? (
                    renderDay(dayRenderProps)
                  ) : (
                    <>
                      <span className="unooria-calendar__day-number">{dayNumber}</span>

                      {/* Pontos de Eventos (Event Dots) */}
                      {dayEvents.length > 0 && (
                        <span
                          className="unooria-calendar__events-container"
                          aria-hidden="true"
                        >
                          {dayEvents.slice(0, 3).map((evt, evtIdx) => (
                            <span
                              key={evt.id || evtIdx}
                              className="unooria-calendar__event-dot"
                              style={{
                                backgroundColor:
                                  evt.dotColor || evt.color || 'var(--cal-primary)',
                              }}
                            />
                          ))}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* Tooltip de Eventos ao passar o mouse */}
                {showEventTooltip &&
                  activeTooltipDate &&
                  isSameDay(activeTooltipDate, date) &&
                  dayEvents.length > 0 && (
                    <div className="unooria-calendar__tooltip" role="tooltip">
                      <div className="unooria-calendar__tooltip-title">
                        {date.getDate()} de {MONTH_NAMES_PT[date.getMonth()]}
                      </div>
                      {dayEvents.map((evt, eIdx) => (
                        <div
                          key={evt.id || eIdx}
                          className="unooria-calendar__tooltip-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(evt, date);
                          }}
                        >
                          <span
                            className="unooria-calendar__tooltip-dot"
                            style={{
                              backgroundColor:
                                evt.dotColor || evt.color || 'var(--cal-primary)',
                            }}
                          />
                          <span title={evt.title}>{evt.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {/* ====================================================================
            Rodapé Opcional com Resumo da Seleção
            ==================================================================== */}
        {showFooter && (
          <div className="unooria-calendar__footer">
            <span className="unooria-calendar__footer-summary">{selectionSummary}</span>
          </div>
        )}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
