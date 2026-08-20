import React from 'react';
import { Icon } from '../Icon';
import { Fab } from '../Fab';
import type { WaMessageComposerProps } from './MessageComposer.types';
import './MessageComposer.css';

/**
 * Componente MessageComposer — Design System WhatsApp Mobile
 *
 * Barra de composição da conversa. Reproduz o campo em cápsula de 41px com raio
 * de 20px, os três glifos de emoji, anexo e câmera nas cores exatas do arquivo
 * e o FAB de microfone de 43px em `--wa-color-accent-fab-mic`.
 */
export const MessageComposer = React.forwardRef<HTMLDivElement, WaMessageComposerProps>(
  (
    {
      value,
      placeholder = 'Type a message',
      onChange,
      onEmoji,
      onAttach,
      onCamera,
      onAction,
      focused = false,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div
      ref={ref}
      className={['wa-messagecomposer', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="wa-messagecomposer__field">
        <button
          type="button"
          className="wa-messagecomposer__icon-button"
          onClick={onEmoji}
          aria-label="Escolher emoji"
        >
          <Icon name="emoji" size={20} tone="composerEmoji" />
        </button>

        <span className="wa-messagecomposer__input-wrap">
          <input
            className="wa-messagecomposer__input"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange?.(event.target.value)}
            aria-label="Mensagem"
          />
          {focused && !value && <span className="wa-messagecomposer__caret" />}
        </span>

        <span className="wa-messagecomposer__trailing">
          <button
            type="button"
            className="wa-messagecomposer__icon-button"
            onClick={onAttach}
            aria-label="Anexar arquivo"
          >
            <Icon name="attach" size={21} tone="composerAttach" />
          </button>

          <button
            type="button"
            className="wa-messagecomposer__icon-button"
            onClick={onCamera}
            aria-label="Abrir câmera"
          >
            <Icon name="composerCamera" size={19} tone="composerCamera" />
          </button>
        </span>
      </div>

      <Fab variant="mic" label="Gravar mensagem de voz" onClick={onAction} />
    </div>
  )
);

MessageComposer.displayName = 'MessageComposer';
