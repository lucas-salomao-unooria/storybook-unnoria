'use client';

import React from 'react';
import type { UaiChatInputProps } from './ChatInput.types';
import { Icon } from '../Icon';
import './ChatInput.css';

/**
 * Componente ChatInput — Design System UnooriaAI
 *
 * Compositor de mensagem em cápsula de 600 × 48 com raio 24, padding
 * 8/8/8/16, contorno de 1px em `--uai-border-control` e botão de envio
 * circular de 32px em `--uai-bg-inverse`.
 *
 * Envia tanto pelo botão quanto pelo `Enter` do formulário. O campo só é
 * controlado quando o consumidor passa `value` (+ `onValueChange`): sem ele, o
 * texto mora no DOM — o preenchimento automático e os gerenciadores de senha
 * escrevem direto no nó — e `defaultValue` é o valor inicial. Em modo não
 * controlado, enviar limpa o campo escrevendo no próprio nó.
 */
export const ChatInput = React.forwardRef<HTMLInputElement, UaiChatInputProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Escreva uma mensagem',
      onSend,
      sendGlyph = <Icon name="arrowUpward" size={20} />,
      sendLabel = 'Enviar mensagem',
      disabled = false,
      readOnly = false,
      block = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const fieldRef = React.useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined;

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        fieldRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (disabled) return;
      const text = isControlled ? (value as string) : (fieldRef.current?.value ?? '');
      onSend?.(text);
      if (!isControlled && fieldRef.current) fieldRef.current.value = '';
    };

    const classes = ['uai-chat-input', block ? 'uai-chat-input--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <form
        data-uai-theme={theme}
        className={classes}
        onSubmit={handleSubmit}
        {...restProps}
      >
        <input
          ref={setRefs}
          className="uai-chat-input__field"
          {...(isControlled ? { value: value as string } : { defaultValue })}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
        />
        <button
          type="submit"
          className="uai-chat-input__send"
          aria-label={sendLabel}
          disabled={disabled}
        >
          <span className="uai-chat-input__send-glyph" aria-hidden="true">
            {sendGlyph}
          </span>
        </button>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput';
