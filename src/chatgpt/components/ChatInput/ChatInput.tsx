import React from 'react';
import type { GptChatInputProps } from './ChatInput.types';
import { gptGlyphs } from '../../tokens';
import './ChatInput.css';

/**
 * Componente ChatInput — Design System ChatGPT
 *
 * Réplica do componente `ChatInput` do Figma: cápsula de 600 × 48 com raio 24,
 * padding 8/8/8/16, contorno translúcido de 10% e botão de envio circular de
 * 32px em `bg/inverse`.
 *
 * Funciona controlado (`value` + `onValueChange`) ou não controlado, e envia
 * tanto pelo botão quanto pelo `Enter` do formulário.
 */
export const ChatInput = React.forwardRef<HTMLInputElement, GptChatInputProps>(
  (
    {
      value,
      onValueChange,
      placeholder = 'Type message',
      onSend,
      sendGlyph = gptGlyphs.send,
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
    const [internalValue, setInternalValue] = React.useState('');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(event.target.value);
      onValueChange?.(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (disabled) return;
      onSend?.(currentValue);
      if (!isControlled) setInternalValue('');
    };

    const classes = ['gpt-chat-input', block ? 'gpt-chat-input--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <form
        data-gpt-theme={theme}
        className={classes}
        onSubmit={handleSubmit}
        {...restProps}
      >
        <input
          ref={ref}
          className="gpt-chat-input__field"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
        />
        <button
          type="submit"
          className="gpt-chat-input__send"
          aria-label={sendLabel}
          disabled={disabled}
        >
          <span aria-hidden="true">{sendGlyph}</span>
        </button>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput';
