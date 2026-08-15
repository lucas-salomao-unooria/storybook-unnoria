import React, { useState, useMemo, useCallback } from 'react';
import {
  CalendarProps,
  CalendarEvent,
  CalendarDayRenderProps,
  CalendarView,
  DateRange,
} from './Calendar.types';
import './Calendar.css';

// Nomes dos meses em PT-BR
const MONTH_NAMES_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const MONTH_NAMES_SHORT_PT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

// Dias da semana (D, S, T, Q, Q, S, S) e Nomes Expandidos (Dom, Seg, Ter, Qua, Qui, Sex, Sáb)
const WEEKDAYS_SHORT_PT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const WEEKDAYS_EXPANDED_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

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

function isBetweenDays(target: Date, start: Date, end: Date): boolean {
  const t = startOfDay(target).getTime();
  const s = startOfDay(start).getTime();
  const e = startOfDay(end).getTime();
  return t >= s && t <= e;
}

function parseEventDate(dateValue: Date | string): Date {
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === 'string') {
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
 * Especificação Fiel ao Figma #12694:2509 & #12694:2547 (Mês Completo)
 */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = 'single',
      view: controlledView,
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
      showHeader = true,
      showQuickNav = true,
      className = '',
      style,
      ariaLabel = 'Calendário interativo',
      ...restProps
    },
    ref
  ) => {
    const today = useMemo(() => startOfDay(new Date()), []);

    // Estado interno de mês navegado
    const [internalMonth, setInternalMonth] = useState<Date>(
      () => defaultMonth || value || (rangeValue?.startDate ? rangeValue.startDate : new Date())
    );

    // Estado interno de visualização
    const [internalView, setInternalView] = useState<CalendarView>('month');

    // Estado interno para seleção de Range temporário
    const [rangeStart, setRangeStart] = useState<Date | null>(rangeValue?.startDate || null);

    const activeMonth = controlledMonth || internalMonth;
    const currentView = controlledView || internalView;

    const isExpanded = currentView === 'week-expanded' || currentView === 'month-expanded' || currentView === 'full-month';

    const navigateMonth = useCallback(
      (offset: number) => {
        const next = new Date(activeMonth.getFullYear(), activeMonth.getMonth() + offset, 1);
        if (!controlledMonth) {
          setInternalMonth(next);
        }
        if (onMonthChange) {
          onMonthChange(next);
        }
      },
      [activeMonth, controlledMonth, onMonthChange]
    );

    const navigateYear = useCallback(
      (offset: number) => {
        const next = new Date(activeMonth.getFullYear() + offset, activeMonth.getMonth(), 1);
        if (!controlledMonth) {
          setInternalMonth(next);
        }
        if (onMonthChange) {
          onMonthChange(next);
        }
      },
      [activeMonth, controlledMonth, onMonthChange]
    );

    const navigateDecade = useCallback(
      (offset: number) => {
        const next = new Date(activeMonth.getFullYear() + offset * 10, activeMonth.getMonth(), 1);
        if (!controlledMonth) {
          setInternalMonth(next);
        }
        if (onMonthChange) {
          onMonthChange(next);
        }
      },
      [activeMonth, controlledMonth, onMonthChange]
    );

    // Grid de dias do mês atual
    const calendarDays = useMemo(() => {
      const year = activeMonth.getFullYear();
      const month = activeMonth.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const daysInMonth = lastDay.getDate();
      const startDayIndex = (firstDay.getDay() - firstDayOfWeek + 7) % 7;

      const totalSlots = Math.ceil((startDayIndex + daysInMonth) / 7) * 7;
      const days: Date[] = [];

      for (let i = 0; i < totalSlots; i++) {
        const dayOffset = i - startDayIndex + 1;
        days.push(new Date(year, month, dayOffset));
      }

      return days;
    }, [activeMonth, firstDayOfWeek]);

    const isDayDisabled = useCallback(
      (date: Date) => {
        if (minDate && startOfDay(date) < startOfDay(minDate)) return true;
        if (maxDate && startOfDay(date) > startOfDay(maxDate)) return true;
        if (typeof disabledDates === 'function') return disabledDates(date);
        if (Array.isArray(disabledDates)) {
          return disabledDates.some((d) => isSameDay(d, date));
        }
        return false;
      },
      [minDate, maxDate, disabledDates]
    );

    const getDayEvents = useCallback(
      (date: Date): CalendarEvent[] => {
        return events.filter((e) => isSameDay(parseEventDate(e.date), date));
      },
      [events]
    );

    const handleDayClick = (date: Date) => {
      if (isDayDisabled(date)) return;

      if (mode === 'single') {
        if (onSelectDate) onSelectDate(date);
      } else if (mode === 'range') {
        if (!rangeStart || (rangeStart && rangeValue?.endDate)) {
          setRangeStart(date);
          if (onSelectRange) onSelectRange({ startDate: date, endDate: null });
        } else {
          if (date < rangeStart) {
            setRangeStart(date);
            if (onSelectRange) onSelectRange({ startDate: date, endDate: rangeStart });
          } else {
            if (onSelectRange) onSelectRange({ startDate: rangeStart, endDate: date });
            setRangeStart(null);
          }
        }
      } else if (mode === 'multiple') {
        if (onSelectMultiple) {
          const exists = multipleValues.some((d) => isSameDay(d, date));
          if (exists) {
            onSelectMultiple(multipleValues.filter((d) => !isSameDay(d, date)));
          } else {
            onSelectMultiple([...multipleValues, date]);
          }
        }
      }
    };

    const decadeStart = Math.floor(activeMonth.getFullYear() / 10) * 10;
    const decadeYears = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);

    const containerClasses = [
      'unooria-calendar',
      `unooria-calendar--${theme}`,
      `unooria-calendar--size-${size}`,
      currentView === 'week-expanded' ? 'unooria-calendar--week-expanded' : '',
      currentView === 'month-expanded' || currentView === 'full-month'
        ? 'unooria-calendar--month-expanded'
        : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className={containerClasses}
        style={style}
        data-theme={theme}
        {...restProps}
      >
        {/* Cabeçalho */}
        {showHeader && (
          <header className="unooria-calendar__header">
            <button
              type="button"
              className="unooria-calendar__nav-btn"
              onClick={() => {
                if (currentView === 'years-picker') navigateDecade(-1);
                else if (currentView === 'months-picker') navigateYear(-1);
                else navigateMonth(-1);
              }}
              aria-label="Anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Botão de Título Interativo para alternar visualizações */}
            <button
              type="button"
              className="unooria-calendar__title-btn"
              onClick={() => {
                if (!showQuickNav) return;
                if (currentView === 'month' || isExpanded) setInternalView('months-picker');
                else if (currentView === 'months-picker') setInternalView('years-picker');
                else setInternalView('month');
              }}
            >
              {currentView === 'years-picker' && `${decadeStart} - ${decadeStart + 9}`}
              {currentView === 'months-picker' && `${activeMonth.getFullYear()}`}
              {(currentView === 'month' || isExpanded) &&
                `${MONTH_NAMES_PT[activeMonth.getMonth()]} ${activeMonth.getFullYear()}`}
            </button>

            <button
              type="button"
              className="unooria-calendar__nav-btn"
              onClick={() => {
                if (currentView === 'years-picker') navigateDecade(1);
                else if (currentView === 'months-picker') navigateYear(1);
                else navigateMonth(1);
              }}
              aria-label="Próximo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </header>
        )}

        {/* 1. Visão de Seletor de 12 Meses (#12694:2634) */}
        {currentView === 'months-picker' && (
          <div className="unooria-calendar__picker-grid">
            {MONTH_NAMES_SHORT_PT.map((mName, idx) => {
              const isSelected = activeMonth.getMonth() === idx;
              return (
                <button
                  key={mName}
                  type="button"
                  className={`unooria-calendar__picker-btn ${isSelected ? 'unooria-calendar__picker-btn--active' : ''}`}
                  onClick={() => {
                    const next = new Date(activeMonth.getFullYear(), idx, 1);
                    if (!controlledMonth) setInternalMonth(next);
                    if (onMonthChange) onMonthChange(next);
                    setInternalView('month');
                  }}
                >
                  {mName}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Visão de Seletor de Década de Anos (#18813:1441) */}
        {currentView === 'years-picker' && (
          <div className="unooria-calendar__picker-grid">
            {decadeYears.map((yr) => {
              const isSelected = activeMonth.getFullYear() === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  className={`unooria-calendar__picker-btn ${isSelected ? 'unooria-calendar__picker-btn--active' : ''}`}
                  onClick={() => {
                    const next = new Date(yr, activeMonth.getMonth(), 1);
                    if (!controlledMonth) setInternalMonth(next);
                    if (onMonthChange) onMonthChange(next);
                    setInternalView('months-picker');
                  }}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Visão Mensal Padrão com Grid Compacto */}
        {currentView === 'month' && (
          <>
            <div className="unooria-calendar__weekdays">
              {WEEKDAYS_SHORT_PT.map((wd, i) => (
                <div key={i} className="unooria-calendar__weekday">
                  {wd}
                </div>
              ))}
            </div>

            <div className="unooria-calendar__days-grid" role="grid">
              {calendarDays.map((date) => {
                const isCurrentMonth = isSameMonth(date, activeMonth);
                const isToday = isSameDay(date, today);
                const isSelected =
                  mode === 'single'
                    ? isSameDay(date, value)
                    : mode === 'multiple'
                    ? multipleValues.some((d) => isSameDay(d, date))
                    : false;

                const isRangeStart = !!rangeValue?.startDate && isSameDay(date, rangeValue.startDate);
                const isRangeEnd = !!rangeValue?.endDate && isSameDay(date, rangeValue.endDate);
                const isInRange =
                  mode === 'range' &&
                  !!rangeValue?.startDate &&
                  !!rangeValue?.endDate &&
                  isBetweenDays(date, rangeValue.startDate, rangeValue.endDate);

                const isDisabled = isDayDisabled(date);
                const dayEvents = getDayEvents(date);

                if (!isCurrentMonth && !showOutsideDays) {
                  return <div key={date.toISOString()} className="unooria-calendar__day-cell--empty" />;
                }

                if (renderDay) {
                  return (
                    <React.Fragment key={date.toISOString()}>
                      {renderDay({
                        date,
                        dayNumber: date.getDate(),
                        isCurrentMonth,
                        isToday,
                        isSelected,
                        isInRange,
                        isRangeStart,
                        isRangeEnd,
                        isDisabled,
                        events: dayEvents,
                      })}
                    </React.Fragment>
                  );
                }

                const cellClasses = [
                  'unooria-calendar__day-cell',
                  !isCurrentMonth ? 'unooria-calendar__day-cell--outside' : '',
                  isToday ? 'unooria-calendar__day-cell--today' : '',
                  isSelected || isRangeStart || isRangeEnd ? 'unooria-calendar__day-cell--selected' : '',
                  isInRange ? 'unooria-calendar__day-cell--in-range' : '',
                  isRangeStart ? 'unooria-calendar__day-cell--range-start' : '',
                  isRangeEnd ? 'unooria-calendar__day-cell--range-end' : '',
                  isDisabled ? 'unooria-calendar__day-cell--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    className={cellClasses}
                    onClick={() => handleDayClick(date)}
                    disabled={isDisabled}
                  >
                    <span>{String(date.getDate()).padStart(2, '0')}</span>

                    {/* Pontinhos de Eventos Coloridos */}
                    {dayEvents.length > 0 && (
                      <div className="unooria-calendar__event-dots">
                        {dayEvents.slice(0, 3).map((ev, i) => (
                          <span
                            key={i}
                            className={`unooria-calendar__event-dot unooria-calendar__event-dot--${ev.eventType || 'evento'}`}
                            style={ev.dotColor ? { backgroundColor: ev.dotColor } : undefined}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* 4. Visão Expandida de Mês Completo (Figma #12694:2547) e Semana */}
        {isExpanded && (
          <>
            <div className="unooria-calendar__weekdays unooria-calendar__weekdays--full">
              {WEEKDAYS_EXPANDED_PT.map((wd, i) => (
                <div key={i} className="unooria-calendar__weekday unooria-calendar__weekday--full">
                  {wd}
                </div>
              ))}
            </div>

            <div className="unooria-calendar__expanded-grid">
              {(currentView === 'week-expanded' ? calendarDays.slice(0, 7) : calendarDays).map((date) => {
                const isCurrentMonth = isSameMonth(date, activeMonth);
                const isSelected = isSameDay(date, value);
                const dayEvents = getDayEvents(date);

                return (
                  <div
                    key={date.toISOString()}
                    className={`unooria-calendar__expanded-day ${!isCurrentMonth ? 'unooria-calendar__expanded-day--outside' : ''} ${isSelected ? 'unooria-calendar__expanded-day--selected' : ''}`}
                    onClick={() => handleDayClick(date)}
                  >
                    <div className="unooria-calendar__expanded-day-header">
                      {isSelected ? (
                        <span className="unooria-calendar__expanded-day-badge">
                          {String(date.getDate()).padStart(2, '0')}
                        </span>
                      ) : (
                        <span>{String(date.getDate()).padStart(2, '0')}</span>
                      )}
                    </div>
                    <div className="unooria-calendar__expanded-events-list">
                      {dayEvents.map((ev, idx) => (
                        <div
                          key={idx}
                          className="unooria-calendar__event-card"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(ev, date);
                          }}
                        >
                          <div className={`unooria-calendar__event-card-bar unooria-calendar__event-card-bar--${ev.eventType || 'evento'}`} />
                          <div className="unooria-calendar__event-card-content">
                            <div className="unooria-calendar__event-card-title">{ev.title}</div>
                            <div className="unooria-calendar__event-card-time">{ev.time || '00:00 - 00:00'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
