'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UblSearchFieldProps } from './SearchField.types';
import './SearchField.css';

/**
 * Escreve no nó do DOM e avisa o React, para que o `onChange` dispare tanto no
 * campo controlado quanto no não controlado.
 */
const writeValue = (node: HTMLInputElement, next: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(node, next);
  node.dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Componente SearchField — Design System Unooblog
 *
 * Campo de busca do blog: um `<form role="search">` com lupa (botão de
 * confirmar), texto e botão de limpar quando há texto. Enter confirma
 * (`onSubmit`) e Esc limpa o texto. O campo tem `<label>` ligado por `useId` —
 * oculto à vista, lido pelo leitor de tela.
 *
 * Só é controlado quando o consumidor passa `value` (AGENTS.md, 4.5.1): sem ele,
 * o texto mora no DOM — o que vai ao elemento é `defaultValue` — e "limpar"
 * escreve direto no nó, por uma `ref` interna casada com a que vem de fora.
 *
 * É Client Component: usa estado, `ref` e API de DOM.
 */
export const SearchField = React.forwardRef<HTMLInputElement, UblSearchFieldProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onSubmit,
      placeholder = 'Buscar no blog',
      label = 'Buscar',
      clearable = true,
      clearLabel = 'Limpar busca',
      theme,
      className = '',
      style,
      disabled,
      id,
      onKeyDown,
      ...restProps
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
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
      onValueChange?.(event.target.value);
    };

    const clear = () => {
      const node = inputRef.current;
      if (!node) return;
      writeValue(node, '');
      node.focus();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(inputRef.current?.value ?? '');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === 'Escape' && event.currentTarget.value.length > 0) {
        event.preventDefault();
        event.stopPropagation();
        clear();
      }
    };

    const classes = [
      'ubl-search-field',
      disabled ? 'ubl-search-field--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <form
        role="search"
        data-ubl-theme={theme}
        className={classes}
        style={style}
        onSubmit={handleSubmit}
        noValidate
      >
        <label htmlFor={inputId} className="ubl-search-field__label">
          {label}
        </label>
        <div className="ubl-search-field__box">
          <button
            type="submit"
            className="ubl-search-field__submit"
            aria-label={label}
            title={label}
            disabled={disabled}
          >
            <Icon name="search" size="sm" tone="inherit" />
          </button>
          <input
            ref={setRefs}
            id={inputId}
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            className="ubl-search-field__control"
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...(isControlled ? { value } : { defaultValue })}
            {...restProps}
          />
          {clearable && hasText && !disabled && (
            <button
              type="button"
              className="ubl-search-field__clear"
              aria-label={clearLabel}
              title={clearLabel}
              onClick={clear}
            >
              <span className="ubl-search-field__clear-disc" aria-hidden="true">
                <Icon name="close" size="xs" tone="inherit" />
              </span>
            </button>
          )}
        </div>
      </form>
    );
  }
);

SearchField.displayName = 'SearchField';
