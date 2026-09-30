'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';
import type { UglSearchFieldProps } from './SearchField.types';
import './SearchField.css';

/**
 * Escreve no nó do DOM e avisa o React, para que `onChange` dispare tanto no
 * campo controlado quanto no não controlado.
 */
const writeValue = (node: HTMLInputElement, next: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(node, next);
  node.dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Componente SearchField — Design System Unoogaleria
 *
 * Campo de busca da galeria: lupa, texto, botão de limpar quando há texto e,
 * opcionalmente, o botão de texto "Cancelar" fora do campo. O invólucro é um
 * marco `role="search"`; Enter confirma (`onSubmit`) e Esc limpa o texto — ou,
 * com o campo vazio, cancela.
 *
 * Só é controlado quando o consumidor passa `value` (AGENTS.md, 4.5.1): sem ele,
 * o texto mora no DOM e "limpar" escreve direto no nó, por uma `ref` interna
 * casada com a que vem de fora.
 */
export const SearchField = React.forwardRef<HTMLInputElement, UglSearchFieldProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onSubmit,
      onClear,
      placeholder = 'Buscar fotos, lugares, pessoas',
      ariaLabel = 'Buscar na galeria',
      clearable = true,
      clearLabel = 'Limpar busca',
      autoFocus = false,
      onCancel,
      cancelLabel = 'Cancelar',
      theme,
      className = '',
      style,
      disabled,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined;
    const [uncontrolledHasText, setUncontrolledHasText] = React.useState(Boolean(defaultValue));
    const hasText = isControlled ? value.length > 0 : uncontrolledHasText;

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUncontrolledHasText(event.target.value.length > 0);
      onChange?.(event.target.value, event);
    };

    const clear = () => {
      const node = inputRef.current;
      if (!node) return;
      writeValue(node, '');
      node.focus();
      onClear?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
        event.preventDefault();
        onSubmit?.(event.currentTarget.value);
        return;
      }

      if (event.key === 'Escape') {
        if (event.currentTarget.value.length > 0) {
          event.preventDefault();
          event.stopPropagation();
          clear();
        } else if (onCancel) {
          event.preventDefault();
          event.stopPropagation();
          onCancel();
        }
      }
    };

    const classes = [
      'ugl-search-field',
      disabled ? 'ugl-search-field--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div role="search" data-ugl-theme={theme} className={classes} style={style}>
        <div className="ugl-search-field__box">
          <Icon name="search" size="sm" tone="inherit" className="ugl-search-field__icon" />
          <input
            ref={setRefs}
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            className="ugl-search-field__control"
            placeholder={placeholder}
            aria-label={ariaLabel}
            autoFocus={autoFocus}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...(isControlled ? { value } : { defaultValue })}
            {...restProps}
          />
          {clearable && hasText && !disabled && (
            <button
              type="button"
              className="ugl-search-field__clear"
              aria-label={clearLabel}
              title={clearLabel}
              onClick={clear}
            >
              <span className="ugl-search-field__clear-disc" aria-hidden="true">
                <Icon name="close" size="xs" tone="inherit" />
              </span>
            </button>
          )}
        </div>

        {onCancel && (
          <Button
            variant="tertiary"
            size="md"
            className="ugl-search-field__cancel"
            onClick={onCancel}
            disabled={disabled}
          >
            {cancelLabel}
          </Button>
        )}
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
