'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Icon } from '../Icon';
import type { UnvSearchFieldProps } from './SearchField.types';
import './SearchField.css';

/**
 * Escreve no nó do DOM e avisa o React, para que `onChange` dispare tanto no
 * campo controlado quanto no não controlado.
 */
const writeValue = (node: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(node, value);
  node.dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Componente SearchField — Design System Unoovista
 *
 * Campo de busca em cápsula de 44px com preenchimento `fill-field`, lupa à
 * esquerda e botão de limpar quando há texto. Só é controlado quando o
 * consumidor passa `value` (AGENTS.md, 4.5.1); sem ele, o texto mora no DOM e
 * "limpar" escreve direto no nó. O slot `trailing` fica FORA da cápsula.
 */
export const SearchField = React.forwardRef<HTMLInputElement, UnvSearchFieldProps>(
  (
    {
      placeholder = 'Buscar',
      ariaLabel = 'Buscar',
      trailing,
      clearable = true,
      clearLabel = 'Limpar busca',
      onClear,
      block = true,
      theme,
      className = '',
      onChange,
      ...restProps
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isControlled = restProps.value !== undefined;
    const [uncontrolledHasText, setUncontrolledHasText] = useState(
      Boolean(restProps.defaultValue)
    );
    const hasText = isControlled ? String(restProps.value).length > 0 : uncontrolledHasText;

    const setRefs = useCallback(
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
      onChange?.(event);
    };

    const handleClear = () => {
      if (inputRef.current) {
        writeValue(inputRef.current, '');
        inputRef.current.focus();
      }
      onClear?.();
    };

    const classes = ['unv-search-field', block ? 'unv-search-field--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div data-unv-theme={theme} className={classes}>
        <div className="unv-search-field__box">
          <Icon name="searchSmall" size={20} tone="inherit" className="unv-search-field__icon" />
          <input
            ref={setRefs}
            type="search"
            role="searchbox"
            className="unv-search-field__control"
            placeholder={placeholder}
            aria-label={ariaLabel}
            onChange={handleChange}
            {...restProps}
          />
          {clearable && hasText && !restProps.disabled && (
            <button
              type="button"
              className="unv-search-field__clear"
              aria-label={clearLabel}
              onClick={handleClear}
            >
              <Icon name="close" size={20} tone="inherit" />
            </button>
          )}
        </div>

        {trailing && <div className="unv-search-field__trailing">{trailing}</div>}
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
