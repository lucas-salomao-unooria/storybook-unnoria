'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  SelectionBoxProps,
  SelectionOptionItem,
  SelectionOptionProps,
  SelectionProps,
  SelectionSize,
  SelectionState,
  SelectionTriggerProps,
  SelectionValue,
} from './Selection.types';
import { Icon } from '../Icon/Icon';
import { Checkbox } from '../Checkbox/Checkbox';
import './Selection.css';

/**
 * Diâmetro da seta por tamanho, lido nó a nó do conjunto `Select`
 * (1124:1007): 20px em LG e MD, 18px em SM e XS.
 */
const chevronSize: Record<SelectionSize, 'xs' | 'xxs'> = {
  lg: 'xs',
  md: 'xs',
  sm: 'xxs',
  xs: 'xxs',
};

/* ==========================================================================
   Selection.Option — conjunto `Select State` (1218:10533)
   ========================================================================== */

/**
 * Linha de opção do painel suspenso.
 *
 * A caixa de seleção é o `Checkbox` oficial do Design System — o arquivo de
 * origem instancia `Checkbox + Radio button` com `Variant=Checkboxes` e
 * `Box Side=No text`. Ela é apresentacional aqui: o alvo de interação é a
 * própria linha, que declara `role="option"`.
 */
export const SelectionOption = forwardRef<HTMLDivElement, SelectionOptionProps>(
  (
    {
      value,
      label,
      showCheckbox = true,
      selected = false,
      active = false,
      disabled = false,
      size = 'md',
      theme = 'light',
      onSelect,
      onClick,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const classNames = [
      'unooria-selection-option',
      `unooria-selection-option--size-${size}`,
      theme === 'dark' ? 'unooria-selection-option--theme-dark' : '',
      selected ? 'unooria-selection-option--selected' : '',
      active ? 'unooria-selection-option--active' : '',
      disabled ? 'unooria-selection-option--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
      onSelect?.(value, event);
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={selected}
        aria-disabled={disabled || undefined}
        className={classNames}
        onClick={handleClick}
        {...rest}
      >
        {showCheckbox && (
          /* `inert`: a caixinha é só desenho. O `<input tabIndex=-1>` do
             Checkbox dentro de `role="option"` era controle aninhado (WCAG
             4.1.2) — o leitor de tela podia parar nele. */
          <span className="unooria-selection-option__mark" aria-hidden="true" inert>
            <Checkbox
              size="md"
              theme={theme}
              checked={selected}
              disabled={disabled}
              tabIndex={-1}
              aria-hidden="true"
              onChange={() => undefined}
            />
          </span>
        )}
        <span className="unooria-selection-option__label">{label ?? children}</span>
      </div>
    );
  }
);

SelectionOption.displayName = 'Selection.Option';

/* ==========================================================================
   Selection.Box — conjunto `Select Box` (17017:43244)
   ========================================================================== */

/**
 * Painel suspenso que agrupa as linhas de opção.
 * Fundo neutral-50, contorno de 1px em neutral-150, recuo e intervalo de 4px.
 */
export const SelectionBox = forwardRef<HTMLDivElement, SelectionBoxProps>(
  (
    {
      size = 'md',
      theme = 'light',
      floating = false,
      maxHeight,
      role = 'listbox',
      className = '',
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const classNames = [
      'unooria-selection-box',
      `unooria-selection-box--size-${size}`,
      theme === 'dark' ? 'unooria-selection-box--theme-dark' : '',
      floating ? 'unooria-selection-box--floating' : '',
      maxHeight !== undefined ? 'unooria-scrollbar' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={role}
        className={classNames}
        style={maxHeight !== undefined ? { maxHeight, ...style } : style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

SelectionBox.displayName = 'Selection.Box';

/* ==========================================================================
   Selection.Trigger — conjunto `Select` (1124:1007)
   ========================================================================== */

/**
 * Gatilho do campo: linha de rótulo com asterisco e glifo de ajuda, caixa de
 * valor com a seta `keyboard_arrow_down` / `keyboard_arrow_up` e mensagem de
 * descrição sob a caixa.
 */
export const SelectionTrigger = forwardRef<HTMLButtonElement, SelectionTriggerProps>(
  (
    {
      label,
      required = false,
      helperIcon,
      valueLabel,
      placeholderShown = false,
      description,
      state = 'default',
      size = 'md',
      theme = 'light',
      open = false,
      className = '',
      style,
      controlClassName = '',
      disabled,
      id,
      role,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const labelId = `${id || `unooria-selection-${generatedId}`}-label`;
    const isDisabled = disabled ?? state === 'disabled';

    /**
     * `aria-required` só é reconhecido pelo papel `combobox`, que o gatilho
     * assume quando composto dentro do `Selection`. No gatilho isolado o papel
     * implícito é `button`, que ignora o atributo — por isso ele é montado
     * condicionalmente, e não escrito direto no elemento.
     */
    const ariaRequired =
      required && role === 'combobox' ? ({ 'aria-required': true } as const) : undefined;

    const classNames = [
      'unooria-selection-trigger',
      `unooria-selection-trigger--size-${size}`,
      `unooria-selection-trigger--state-${state}`,
      theme === 'dark' ? 'unooria-selection-trigger--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderHelperIcon = () => {
      if (!helperIcon) return null;
      if (typeof helperIcon === 'boolean' || typeof helperIcon === 'string') {
        return (
          <span className="unooria-selection-trigger__helper-icon" title="Mais informações">
            <Icon
              name={typeof helperIcon === 'string' ? helperIcon : 'help'}
              size="4xs"
              color="currentColor"
            />
          </span>
        );
      }
      return <span className="unooria-selection-trigger__helper-icon">{helperIcon}</span>;
    };

    return (
      <div className={classNames} style={style}>
        {(label || required || helperIcon) && (
          <div className="unooria-selection-trigger__label-row">
            {label && (
              <span className="unooria-selection-trigger__label" id={labelId}>
                {label}
              </span>
            )}
            {required && (
              <span className="unooria-selection-trigger__required" aria-hidden="true">
                *
              </span>
            )}
            {renderHelperIcon()}
          </div>
        )}

        <button
          ref={ref}
          type="button"
          id={id}
          disabled={isDisabled}
          role={role}
          aria-labelledby={label ? labelId : undefined}
          aria-invalid={state === 'error' || undefined}
          {...ariaRequired}
          className={`unooria-selection-trigger__control ${controlClassName}`.trim()}
          {...rest}
        >
          <span
            className={`unooria-selection-trigger__value ${
              placeholderShown ? 'unooria-selection-trigger__value--placeholder' : ''
            }`.trim()}
          >
            {valueLabel}
          </span>
          <Icon
            className="unooria-selection-trigger__chevron"
            name={open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            size={chevronSize[size]}
            color="currentColor"
          />
        </button>

        {description && (
          <p
            className="unooria-selection-trigger__description"
            role={state === 'error' ? 'alert' : undefined}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

SelectionTrigger.displayName = 'Selection.Trigger';

/* ==========================================================================
   Selection — conjunto `Select Input` (12807:1730)
   ========================================================================== */

/** Normaliza o valor recebido para lista, independentemente do modo. */
const toArray = (value: SelectionValue | undefined): string[] => {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
};

interface SelectionComponent
  extends React.ForwardRefExoticComponent<
    SelectionProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: typeof SelectionTrigger;
  Box: typeof SelectionBox;
  Option: typeof SelectionOption;
}

/**
 * Componente oficial Selection (lista suspensa de seleção) do Unooria Design System.
 * Plataforma Unooria — extraído do Figma (arquivo `Unooria_DS_v0.2`, prancha
 * `Select` 6025:846), compondo os quatro conjuntos publicados:
 * `Select` 1124:1007, `Select State` 1218:10533, `Select Box` 17017:43244 e
 * `Select Input` 12807:1730.
 */
const SelectionRoot = forwardRef<HTMLDivElement, SelectionProps>(
  (
    {
      options = [],
      value,
      defaultValue,
      onChange,
      multiple = false,
      open,
      defaultOpen = false,
      onOpenChange,
      label,
      required = false,
      helperIcon,
      placeholder = 'Selecione uma opção',
      error,
      helperText,
      state,
      disabled = false,
      size = 'md',
      theme = 'light',
      fullWidth = true,
      showOptionCheckbox = true,
      closeOnSelect = true,
      inlineBox = false,
      maxBoxHeight,
      renderValue,
      name,
      className = '',
      style,
      triggerClassName = '',
      boxClassName = '',
      children,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const baseId = `unooria-selection-${generatedId}`;
    const boxId = `${baseId}-box`;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    const isValueControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(() => toArray(defaultValue));
    const selectedValues = isValueControlled ? toArray(value) : internalValue;

    const isOpenControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isOpen = (isOpenControlled ? open : internalOpen) && !disabled;

    const [focused, setFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const hasError = !!error;
    const errorMessage = typeof error === 'string' ? error : undefined;

    /**
     * O estado explícito vence, para permitir matrizes estáticas de
     * documentação. Sem ele, `active` é derivado do foco: é o que o estado
     * `Active` do conjunto `Select` representa.
     */
    const resolvedState: SelectionState =
      state ??
      (disabled ? 'disabled' : hasError ? 'error' : focused ? 'active' : 'default');

    const selectedOptions = useMemo(
      () => options.filter((option) => selectedValues.includes(option.value)),
      [options, selectedValues]
    );

    const enabledIndexes = useMemo(
      () =>
        options.reduce<number[]>((acumulado, option, index) => {
          if (!option.disabled) acumulado.push(index);
          return acumulado;
        }, []),
      [options]
    );

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isOpenControlled) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [isOpenControlled, onOpenChange]
    );

    /** Fecha o painel ao clicar fora do campo. */
    useEffect(() => {
      if (!isOpen) return undefined;

      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) {
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

    /** Ao abrir, o realce parte da primeira opção selecionada. */
    useEffect(() => {
      if (!isOpen) {
        setActiveIndex(-1);
        return;
      }
      const primeiraSelecionada = options.findIndex((option) =>
        selectedValues.includes(option.value)
      );
      setActiveIndex(
        primeiraSelecionada >= 0 ? primeiraSelecionada : (enabledIndexes[0] ?? -1)
      );
      // A dependência é apenas a abertura: reposicionar o realce a cada
      // mudança de seleção anularia a navegação por teclado.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const commitSelection = useCallback(
      (option: SelectionOptionItem) => {
        if (option.disabled) return;

        const jaSelecionado = selectedValues.includes(option.value);
        const proximo = multiple
          ? jaSelecionado
            ? selectedValues.filter((item) => item !== option.value)
            : [...selectedValues, option.value]
          : [option.value];

        if (!isValueControlled) setInternalValue(proximo);
        onChange?.(multiple ? proximo : (proximo[0] ?? ''), option);

        if (!multiple && closeOnSelect) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      },
      [closeOnSelect, isValueControlled, multiple, onChange, selectedValues, setOpen]
    );

    const moveActive = useCallback(
      (direcao: 1 | -1) => {
        if (!enabledIndexes.length) return;
        const posicaoAtual = enabledIndexes.indexOf(activeIndex);
        const proximaPosicao =
          posicaoAtual === -1
            ? direcao === 1
              ? 0
              : enabledIndexes.length - 1
            : (posicaoAtual + direcao + enabledIndexes.length) % enabledIndexes.length;
        setActiveIndex(enabledIndexes[proximaPosicao]);
      },
      [activeIndex, enabledIndexes]
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) setOpen(true);
          else moveActive(1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen) setOpen(true);
          else moveActive(-1);
          break;
        case 'Home':
          if (isOpen) {
            event.preventDefault();
            setActiveIndex(enabledIndexes[0] ?? -1);
          }
          break;
        case 'End':
          if (isOpen) {
            event.preventDefault();
            setActiveIndex(enabledIndexes[enabledIndexes.length - 1] ?? -1);
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!isOpen) {
            setOpen(true);
          } else if (activeIndex >= 0 && options[activeIndex]) {
            commitSelection(options[activeIndex]);
          }
          break;
        case 'Escape':
          if (isOpen) {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
          }
          break;
        case 'Tab':
          if (isOpen) setOpen(false);
          break;
        default:
          break;
      }
    };

    /** Texto exibido na caixa de valor. */
    const displayValue = useMemo(() => {
      if (renderValue) return renderValue(selectedOptions);
      if (!selectedOptions.length) return placeholder;
      return selectedOptions.map((option, indice) => (
        <React.Fragment key={option.value}>
          {indice > 0 && ', '}
          {option.label}
        </React.Fragment>
      ));
    }, [placeholder, renderValue, selectedOptions]);

    const description = errorMessage ?? (!hasError ? helperText : undefined);

    const classNames = [
      'unooria-selection',
      `unooria-selection--size-${size}`,
      theme === 'dark' ? 'unooria-selection--theme-dark' : '',
      fullWidth ? 'unooria-selection--full-width' : '',
      isOpen ? 'unooria-selection--open' : '',
      disabled ? 'unooria-selection--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const assignContainer = (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const activeOptionId = activeIndex >= 0 ? `${baseId}-option-${activeIndex}` : undefined;

    return (
      <div
        ref={assignContainer}
        className={classNames}
        style={style}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <SelectionTrigger
          ref={triggerRef}
          id={baseId}
          label={label}
          required={required}
          helperIcon={helperIcon}
          valueLabel={displayValue}
          placeholderShown={!selectedOptions.length && !renderValue}
          description={description}
          state={resolvedState}
          size={size}
          theme={theme}
          open={isOpen}
          disabled={disabled}
          className={triggerClassName}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? boxId : undefined}
          aria-activedescendant={isOpen ? activeOptionId : undefined}
          onClick={() => setOpen(!isOpen)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {isOpen && (
          <SelectionBox
            id={boxId}
            size={size}
            theme={theme}
            floating={!inlineBox}
            maxHeight={maxBoxHeight}
            className={boxClassName}
            /* A lista leva o nome do campo (WCAG 4.1.2): sem ele o leitor de
               tela anunciava só "lista". */
            aria-labelledby={label ? `${baseId}-label` : undefined}
            aria-multiselectable={multiple || undefined}
          >
            {children ??
              options.map((option, index) => (
                <SelectionOption
                  key={option.value}
                  id={`${baseId}-option-${index}`}
                  value={option.value}
                  label={option.label}
                  size={size}
                  theme={theme}
                  showCheckbox={showOptionCheckbox}
                  selected={selectedValues.includes(option.value)}
                  active={index === activeIndex}
                  disabled={option.disabled}
                  onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                  onSelect={() => commitSelection(option)}
                />
              ))}
          </SelectionBox>
        )}

        {name && (
          <input type="hidden" name={name} value={selectedValues.join(',')} readOnly />
        )}
      </div>
    );
  }
);

SelectionRoot.displayName = 'Selection';

export const Selection = SelectionRoot as SelectionComponent;
Selection.Trigger = SelectionTrigger;
Selection.Box = SelectionBox;
Selection.Option = SelectionOption;

export default Selection;
