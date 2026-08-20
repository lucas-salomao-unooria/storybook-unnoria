'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
  useSyncExternalStore,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  DatePickerProps,
  DatePickerShortcut,
  DateRangePickerProps,
} from './DatePicker.types';
import { Calendar } from '../Calendar/Calendar';
import { DateRange } from '../Calendar/Calendar.types';
import './DatePicker.css';

/**
 * Encaminha um nó DOM para uma ref externa (callback ou objeto).
 * Declarada fora do componente para deixar explícito que a escrita ocorre
 * na fase de commit do React, e não durante a renderização.
 */
const assignInputRef = (
  target: React.Ref<HTMLInputElement> | undefined,
  node: HTMLInputElement | null
) => {
  if (typeof target === 'function') {
    target(node);
  } else if (target) {
    (target as React.MutableRefObject<HTMLInputElement | null>).current = node;
  }
};

/* ==========================================================================
   Ícones SVG Utilitários Inline
   ========================================================================== */

const CalendarTodayIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClearIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 14,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ==========================================================================
   Funções Utilitárias de Manipulação e Formatação de Datas
   ========================================================================== */

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

function startOfDay(d: Date): Date {
  const newDate = new Date(d);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function isValidDateObject(d?: Date | null): d is Date {
  return !!d && d instanceof Date && !isNaN(d.getTime());
}

/**
 * Formata um objeto Date para 'DD/MM/AAAA'
 */
function formatDateToDisplay(d?: Date | null): string {
  if (!isValidDateObject(d)) return '';
  const day = padZero(d.getDate());
  const month = padZero(d.getMonth() + 1);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Faz parse de uma string 'DD/MM/AAAA' para objeto Date
 */
function parseDisplayToDate(str: string): Date | null {
  const cleanStr = str.trim();
  const parts = cleanStr.split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (month < 1 || month > 12) return null;
  if (year < 1000 || year > 9999) return null;

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return null;

  const parsed = new Date(year, month - 1, day);
  return startOfDay(parsed);
}

/**
 * Aplica máscara progressiva de digitação para data única ('DD/MM/AAAA')
 */
function applySingleMask(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/**
 * Aplica máscara progressiva de digitação para range ('DD/MM/AAAA - DD/MM/AAAA')
 */
function applyRangeMask(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 16);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  if (digits.length <= 10) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)} - ${digits.slice(8)}`;
  }
  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)} - ${digits.slice(8, 10)}/${digits.slice(10)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)} - ${digits.slice(8, 10)}/${digits.slice(10, 12)}/${digits.slice(12)}`;
}

/* ==========================================================================
   Hidratação segura (SSR)
   ========================================================================== */

/** Assinatura vazia: o valor de hidratação nunca muda depois de resolvido. */
const subscribeToNothing = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Retorna `false` durante a renderização no servidor e durante a hidratação,
 * e `true` a partir daí (em renderização puramente client-side já retorna
 * `true` na primeira passada, preservando o comportamento atual no browser).
 *
 * Usado para adiar qualquer leitura de `new Date()`, que é não determinística
 * entre servidor e cliente e provocaria divergência de hidratação.
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribeToNothing, getHydratedSnapshot, getServerSnapshot);
}

/**
 * Gera atalhos pré-definidos padrão para seleção rápida
 */
function getDefaultShortcuts(mode: 'single' | 'range'): DatePickerShortcut[] {
  const today = startOfDay(new Date());

  if (mode === 'single') {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return [
      { label: 'Hoje', value: today },
      { label: 'Ontem', value: yesterday },
      { label: 'Amanhã', value: tomorrow },
      { label: 'Início do mês', value: startOfMonth },
      { label: 'Fim do mês', value: endOfMonth },
    ];
  }

  // Atalhos para Range
  const last7DaysStart = new Date(today);
  last7DaysStart.setDate(today.getDate() - 6);

  const last30DaysStart = new Date(today);
  last30DaysStart.setDate(today.getDate() - 29);

  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  const thisYearStart = new Date(today.getFullYear(), 0, 1);
  const thisYearEnd = new Date(today.getFullYear(), 11, 31);

  return [
    { label: 'Hoje', value: { startDate: today, endDate: today } },
    { label: 'Últimos 7 dias', value: { startDate: last7DaysStart, endDate: today } },
    { label: 'Últimos 30 dias', value: { startDate: last30DaysStart, endDate: today } },
    { label: 'Este mês', value: { startDate: thisMonthStart, endDate: thisMonthEnd } },
    { label: 'Mês passado', value: { startDate: lastMonthStart, endDate: lastMonthEnd } },
    { label: 'Ano atual', value: { startDate: thisYearStart, endDate: thisYearEnd } },
  ];
}

/* ==========================================================================
   Componente DatePicker
   ========================================================================== */

/**
 * Componente DatePicker - Design System Plataforma Unooria
 *
 * Seletor de datas e intervalos com máscara dinâmica no input, ícone de calendário,
 * popover flutuante acoplado ao Calendar Unooria, atalhos rápidos e suporte a temas Light e Dark.
 * Fidelidade absoluta ao Figma Nó #18919:25934.
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      mode = 'single',
      value,
      defaultValue,
      onChange,
      rangeValue,
      defaultRangeValue,
      onRangeChange,
      minDate,
      maxDate,
      disabledDates,
      format = 'DD/MM/AAAA',
      label,
      required = false,
      helperText,
      error,
      disabled = false,
      readOnly = false,
      placeholder,
      shortcuts = false,
      clearable = true,
      size = 'md',
      theme = 'light',
      locale = 'pt-BR',
      closeOnSelect = true,
      popoverPlacement = 'bottom-start',
      isOpen: controlledIsOpen,
      defaultIsOpen = false,
      onOpen,
      onClose,
      events,
      showOutsideDays = true,
      firstDayOfWeek = 0,
      name,
      id,
      className = '',
      style,
      ariaLabel,
      inputRef: externalInputRef,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const internalInputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const popoverId = `${useId()}-datepicker-popover`;

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    /**
     * Compatibilidade com SSR: `getDefaultShortcuts()` deriva os atalhos de
     * `new Date()`. Avaliá-lo durante a renderização faz servidor e cliente
     * calcularem datas diferentes (fusos/virada do dia). Os atalhos padrão só
     * são materializados depois da hidratação, de modo que a marcação do
     * servidor e a primeira renderização do cliente sejam idênticas.
     */
    const isHydrated = useIsHydrated();

    // Estado do Popover (aberto/fechado)
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState<boolean>(defaultIsOpen);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;

    const setOpen = useCallback(
      (nextOpen: boolean) => {
        if (disabled || readOnly) return;
        if (controlledIsOpen === undefined) {
          setUncontrolledIsOpen(nextOpen);
        }
        if (nextOpen) {
          onOpen?.();
        } else {
          onClose?.();
        }
      },
      [disabled, readOnly, controlledIsOpen, onOpen, onClose]
    );

    // Estado interno para single
    const [internalDate, setInternalDate] = useState<Date | null>(() => {
      if (value !== undefined) return value;
      if (defaultValue) return defaultValue;
      return null;
    });

    const activeDate = value !== undefined ? value : internalDate;

    // Estado interno para range
    const [internalRange, setInternalRange] = useState<DateRange>(() => {
      if (rangeValue !== undefined) return rangeValue || {};
      if (defaultRangeValue) return defaultRangeValue;
      return {};
    });

    /**
     * `rangeValue || {}` criava um objeto novo a cada renderização, o que
     * invalidava as dependências dos hooks que consomem `activeRange`.
     */
    const activeRange = useMemo<DateRange>(
      () => (rangeValue !== undefined ? rangeValue || {} : internalRange),
      [rangeValue, internalRange]
    );

    // Formata o texto exibido no input conforme a seleção atual
    const getFormattedValue = useCallback(() => {
      if (mode === 'single') {
        return formatDateToDisplay(activeDate);
      }
      const startStr = formatDateToDisplay(activeRange.startDate);
      const endStr = formatDateToDisplay(activeRange.endDate);
      if (startStr && endStr) return `${startStr} - ${endStr}`;
      if (startStr) return `${startStr} - `;
      return '';
    }, [mode, activeDate, activeRange]);

    const formattedValue = getFormattedValue();
    const [inputValue, setInputValue] = useState<string>(formattedValue);

    // Sincroniza o texto do input quando as propriedades controladas mudam.
    // Ajuste de estado durante a renderização (padrão recomendado pelo React)
    // no lugar de um efeito: o texto digitado pelo usuário só é sobrescrito
    // quando o valor formatado da seleção realmente muda.
    const [lastFormattedValue, setLastFormattedValue] = useState<string>(formattedValue);
    if (formattedValue !== lastFormattedValue) {
      setLastFormattedValue(formattedValue);
      setInputValue(formattedValue);
    }

    // Fechar ao clicar fora do componente (clickOutside)
    useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
        const target = e.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          popoverRef.current &&
          !popoverRef.current.contains(target)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);
      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('touchstart', handlePointerDown);
      };
    }, [isOpen, setOpen]);

    // Fechar ao pressionar tecla Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          internalInputRef.current?.focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, setOpen]);

    // Manipula a seleção de data no modo Single
    const handleSelectSingleDate = useCallback(
      (newDate: Date) => {
        const d = startOfDay(newDate);
        if (value === undefined) {
          setInternalDate(d);
        }
        onChange?.(d);
        setInputValue(formatDateToDisplay(d));

        if (closeOnSelect) {
          setOpen(false);
        }
      },
      [value, onChange, closeOnSelect, setOpen]
    );

    // Manipula a seleção de data no modo Range
    const handleSelectRangeDate = useCallback(
      (newRange: DateRange) => {
        if (rangeValue === undefined) {
          setInternalRange(newRange);
        }
        onRangeChange?.(newRange);

        const startStr = formatDateToDisplay(newRange.startDate);
        const endStr = formatDateToDisplay(newRange.endDate);
        if (startStr && endStr) {
          setInputValue(`${startStr} - ${endStr}`);
          if (closeOnSelect) {
            setOpen(false);
          }
        } else if (startStr) {
          setInputValue(`${startStr} - `);
        } else {
          setInputValue('');
        }
      },
      [rangeValue, onRangeChange, closeOnSelect, setOpen]
    );

    // Manipula a alteração manual de texto e máscara
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const maskedValue = mode === 'single' ? applySingleMask(rawValue) : applyRangeMask(rawValue);
      setInputValue(maskedValue);

      if (mode === 'single') {
        if (maskedValue.length === 10) {
          const parsed = parseDisplayToDate(maskedValue);
          if (parsed) {
            if (value === undefined) setInternalDate(parsed);
            onChange?.(parsed);
          }
        } else if (maskedValue.length === 0) {
          if (value === undefined) setInternalDate(null);
          onChange?.(null);
        }
      } else {
        if (maskedValue.length === 23) {
          const [sStr, eStr] = maskedValue.split(' - ');
          const parsedStart = parseDisplayToDate(sStr || '');
          const parsedEnd = parseDisplayToDate(eStr || '');
          if (parsedStart && parsedEnd) {
            const nextRange: DateRange = { startDate: parsedStart, endDate: parsedEnd };
            if (rangeValue === undefined) setInternalRange(nextRange);
            onRangeChange?.(nextRange);
          }
        } else if (maskedValue.length === 0) {
          const emptyRange: DateRange = { startDate: null, endDate: null };
          if (rangeValue === undefined) setInternalRange(emptyRange);
          onRangeChange?.(emptyRange);
        }
      }
    };

    // Ação do botão de limpar
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setInputValue('');
      if (mode === 'single') {
        if (value === undefined) setInternalDate(null);
        onChange?.(null);
      } else {
        const emptyRange: DateRange = { startDate: null, endDate: null };
        if (rangeValue === undefined) setInternalRange(emptyRange);
        onRangeChange?.(emptyRange);
      }
      internalInputRef.current?.focus();
    };

    // Ação do clique em atalho
    const handleShortcutClick = (shortcut: DatePickerShortcut) => {
      const resolved = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value;

      if (mode === 'single') {
        if (resolved instanceof Date) {
          handleSelectSingleDate(resolved);
        }
      } else {
        if (Array.isArray(resolved)) {
          handleSelectRangeDate({ startDate: resolved[0], endDate: resolved[1] });
        } else if (resolved && typeof resolved === 'object' && 'startDate' in resolved) {
          handleSelectRangeDate(resolved as DateRange);
        }
      }
    };

    // Lista final de atalhos calculada
    const shortcutList = useMemo(() => {
      if (!shortcuts) return [];
      if (Array.isArray(shortcuts)) return shortcuts;
      if (!isHydrated) return [];
      return getDefaultShortcuts(mode);
    }, [shortcuts, mode, isHydrated]);

    // Determina placeholder padrão a partir do formato configurado
    const formatHint = format.toLowerCase();
    const defaultPlaceholder = mode === 'single' ? formatHint : `${formatHint} - ${formatHint}`;
    const computedPlaceholder = placeholder || defaultPlaceholder;

    // Determina se há erro e mensagem
    const isError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    // Determina se pode exibir botão de limpar
    const hasValue = mode === 'single' ? Boolean(activeDate) : Boolean(activeRange.startDate || activeRange.endDate);
    const showClearButton = clearable && hasValue && !disabled && !readOnly;

    return (
      <div
        ref={containerRef}
        className={`unooria-datepicker unooria-datepicker--${size} ${
          theme === 'dark' ? 'unooria-datepicker--dark' : ''
        } ${className}`}
        style={style}
        data-theme={theme}
      >
        {/* Label Superior */}
        {label && (
          <div className="unooria-datepicker__label-wrapper">
            <label
              htmlFor={id}
              className="unooria-datepicker__label"
              onClick={() => !disabled && !readOnly && setOpen(true)}
            >
              {label}
            </label>
            {required && <span className="unooria-datepicker__required" aria-hidden="true">*</span>}
          </div>
        )}

        {/* Input Container */}
        <div
          className={`unooria-datepicker__input-container ${
            isOpen ? 'unooria-datepicker__input-container--open' : ''
          } ${isError ? 'unooria-datepicker__input-container--error' : ''} ${
            disabled ? 'unooria-datepicker__input-container--disabled' : ''
          }`}
          onClick={() => !disabled && !readOnly && setOpen(true)}
        >
          <input
            ref={(node) => {
              internalInputRef.current = node;
              assignInputRef(externalInputRef, node);
            }}
            id={id}
            name={name}
            type="text"
            className="unooria-datepicker__input"
            value={inputValue}
            placeholder={computedPlaceholder}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleInputChange}
            role="combobox"
            aria-label={ariaLabel || label || computedPlaceholder}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={isOpen ? popoverId : undefined}
            aria-invalid={isError}
          />

          {/* Botões de Ação (Limpar e Calendário) */}
          <div className="unooria-datepicker__actions">
            {showClearButton && (
              <button
                type="button"
                className="unooria-datepicker__clear-btn"
                onClick={handleClear}
                aria-label="Limpar data"
                title="Limpar data"
                tabIndex={-1}
              >
                <ClearIcon className="unooria-datepicker__clear-icon" size={size === 'sm' ? 14 : 16} />
              </button>
            )}

            <button
              type="button"
              className="unooria-datepicker__calendar-btn"
              disabled={disabled || readOnly}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!isOpen);
              }}
              aria-label="Abrir seletor de calendário"
              title="Abrir calendário"
            >
              <CalendarTodayIcon
                className="unooria-datepicker__calendar-icon"
                size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
              />
            </button>
          </div>
        </div>

        {/* Popover Flutuante com Calendar Unooria */}
        {isOpen && (
          <div
            ref={popoverRef}
            id={popoverId}
            className={`unooria-datepicker__popover unooria-datepicker__popover--${popoverPlacement}`}
            role="dialog"
            aria-modal="false"
            aria-label="Calendário"
          >
            {/* Lista de Atalhos Rápidos */}
            {shortcutList.length > 0 && (
              <div className="unooria-datepicker__shortcuts">
                {shortcutList.map((sc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="unooria-datepicker__shortcut-chip"
                    onClick={() => handleShortcutClick(sc)}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            )}

            {/* Calendário Unooria Acoplado */}
            <Calendar
              mode={mode}
              value={activeDate}
              onSelectDate={handleSelectSingleDate}
              rangeValue={activeRange}
              onSelectRange={handleSelectRangeDate}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              events={events}
              showOutsideDays={showOutsideDays}
              firstDayOfWeek={firstDayOfWeek}
              theme={theme}
              size={size}
              locale={locale}
              showHeader={true}
              showQuickNav={true}
              showTodayButton={true}
            />
          </div>
        )}

        {/* HelperText e Mensagem de Erro */}
        {(errorMessage || helperText) && (
          <div
            className={`unooria-datepicker__helper ${
              isError ? 'unooria-datepicker__helper--error' : ''
            }`}
          >
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

/**
 * Componente especializado DateRangePicker para seleção de intervalos.
 */
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({ value, defaultValue, onChange, ...rest }, ref) => {
    return (
      <DatePicker
        ref={ref}
        {...rest}
        mode="range"
        rangeValue={value}
        defaultRangeValue={defaultValue}
        onRangeChange={onChange}
      />
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';
