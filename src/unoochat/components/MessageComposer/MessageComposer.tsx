'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Fab } from '../Fab';
import type { UncMessageComposerProps } from './MessageComposer.types';
import './MessageComposer.css';

/**
 * Componente MessageComposer — Design System Unoochat
 *
 * Barra de composição da conversa: campo em cápsula de 41px com raio de 20px,
 * os glifos de emoji, anexo e câmera, e o FAB de microfone de 43px em
 * `--unc-color-accent`.
 */
export const MessageComposer = React.forwardRef<HTMLDivElement, UncMessageComposerProps>(
  (
    {
      value,
      placeholder = 'Digite uma mensagem',
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
      className={['unc-messagecomposer', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="unc-messagecomposer__field">
        <button
          type="button"
          className="unc-messagecomposer__icon-button"
          onClick={onEmoji}
          aria-label="Escolher emoji"
        >
          <Icon name="emoji" size={20} tone="composerEmoji" />
        </button>

        <span className="unc-messagecomposer__input-wrap">
          <input
            className="unc-messagecomposer__input"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange?.(event.target.value)}
            aria-label="Mensagem"
          />
          {focused && !value && <span className="unc-messagecomposer__caret" />}
        </span>

        <span className="unc-messagecomposer__trailing">
          <button
            type="button"
            className="unc-messagecomposer__icon-button"
            onClick={onAttach}
            aria-label="Anexar arquivo"
          >
            <Icon name="attach" size={21} tone="composerAttach" />
          </button>

          <button
            type="button"
            className="unc-messagecomposer__icon-button"
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
