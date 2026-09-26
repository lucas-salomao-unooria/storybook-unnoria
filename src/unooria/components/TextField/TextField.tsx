'use client';

import React, { forwardRef, useCallback, useId, useRef, useState } from 'react';
import { TextFieldProps } from './TextField.types';
import { Icon } from '../Icon/Icon';
import './TextField.css';

/**
 * Componente oficial TextField (Campo de Entrada de Linha Única) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6107:729 / Component Set 1124:707)
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      required = false,
      helperText,
      helperIcon,
      error,
      success,
      size = 'md',
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      theme = 'light',
      className = '',
      style,
      inputClassName = '',
      disabled,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    const isControlled = value !== undefined;

    /** O rótulo NOMEIA o campo (`htmlFor` + `id`), como no `TextArea`. O `id` do consumidor vence. */
    const idGerado = useId();
    const campoId = rest.id ?? idGerado;

    /**
     * Em modo NÃO controlado quem guarda o texto é o DOM, não este estado.
     *
     * Antes o `<input>` recebia `value` sempre, mesmo sem o consumidor pedir:
     * o campo virava controlado por um estado que só o `onChange` do React
     * alimenta. Quem escreve no DOM sem passar por evento do React — o
     * preenchimento automático do navegador e todo gerenciador de senhas —
     * ficava invisível para esse estado, e a PRIMEIRA re-renderização
     * reconciliava o campo de volta para `''`. Medido em 11/09/2026 na tela
     * `/entrar` do LMS: senha injetada, um clique em "Exibir senha", e o
     * `FormData` do formulário já ia com `senha` vazia. O sintoma que chega
     * ao suporte é "minha senha salva não funciona".
     *
     * Este estado sobrevive só para decidir a visibilidade do botão "limpar".
     * Ele pode ficar defasado quando o preenchimento vem sem evento, e isso é
     * aceitável: o custo é um botão que demora a aparecer, não um texto que
     * some.
     */
    const [valorNaoControlado, setValorNaoControlado] = useState<string>(
      (defaultValue ?? '') as string
    );

    const currentValue = isControlled ? (value as string) : valorNaoControlado;

    /**
     * `ref` interna casada com a que vem de fora: em modo não controlado,
     * limpar o campo é escrever no nó do DOM — não há mais estado que o
     * comande.
     */
    const inputInterno = useRef<HTMLInputElement | null>(null);
    const guardarRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputInterno.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref]
    );

    const hasError = !!error;
    const hasSuccess = !hasError && !!success;
    const errorMessage = typeof error === 'string' ? error : undefined;
    const successMessage = typeof success === 'string' ? success : undefined;

    const sizeClass = `unooria-textfield--size-${size}`;
    const errorClass = hasError ? 'unooria-textfield--error' : '';
    const successClass = hasSuccess ? 'unooria-textfield--success' : '';
    const disabledClass = disabled ? 'unooria-textfield--disabled' : '';
    const themeClass = theme === 'dark' ? 'unooria-textfield--theme-dark' : '';

    const containerClassName = [
      'unooria-textfield',
      sizeClass,
      errorClass,
      successClass,
      disabledClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setValorNaoControlado(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        // O DOM é o dono do texto: limpar o estado não limparia o campo.
        if (inputInterno.current) inputInterno.current.value = '';
        setValorNaoControlado('');
      }
      onClear?.();
    };

    const renderIcon = (iconProp: string | React.ReactNode, isSuffix = false) => {
      const cls = isSuffix ? 'unooria-textfield__suffix-icon' : 'unooria-textfield__prefix-icon';
      if (typeof iconProp === 'string') {
        return (
          <span className={cls}>
            <Icon name={iconProp} size={size === 'lg' ? 's' : 'xs'} color="currentColor" />
          </span>
        );
      }
      return <span className={cls}>{iconProp}</span>;
    };

    return (
      <div className={containerClassName} style={style}>
        {label && (
          <div className="unooria-textfield__label-row">
            <label className="unooria-textfield__label" htmlFor={campoId}>
              <span>{label}</span>
              {required && <span className="unooria-textfield__required">*</span>}
              {helperIcon && (
                <span className="unooria-textfield__helper-icon" title="Mais informações">
                  <Icon
                    name={typeof helperIcon === 'string' ? helperIcon : 'help'}
                    size="xs"
                    color="currentColor"
                  />
                </span>
              )}
            </label>
          </div>
        )}

        <div className="unooria-textfield__input-container">
          {leftIcon && renderIcon(leftIcon, false)}

          <input
            ref={guardarRef}
            id={campoId}
            disabled={disabled}
            /* Controlado só quando o consumidor pede. Sem `value`, o campo é
               do DOM — que é o que faz o preenchimento automático sobreviver. */
            {...(isControlled ? { value: value as string } : { defaultValue })}
            onChange={handleChange}
            className={`unooria-textfield__input ${inputClassName}`}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            {...rest}
          />

          {hasSuccess && !rightIcon && (
            <span className="unooria-textfield__suffix-icon" style={{ color: '#008257' }}>
              <Icon name="check_circle" size="xs" color="currentColor" />
            </span>
          )}

          {clearable && currentValue && !disabled && (
            <button
              type="button"
              aria-label="Limpar campo"
              onClick={handleClear}
              className="unooria-textfield__action-btn"
            >
              <Icon name="close" size="xs" color="currentColor" />
            </button>
          )}

          {rightIcon && renderIcon(rightIcon, true)}
        </div>

        {hasError && errorMessage && (
          <p className="unooria-textfield__error-text" role="alert">
            {errorMessage}
          </p>
        )}

        {hasSuccess && successMessage && (
          <p className="unooria-textfield__success-text">{successMessage}</p>
        )}

        {!hasError && !hasSuccess && helperText && (
          <p className="unooria-textfield__helper-text">{helperText}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
