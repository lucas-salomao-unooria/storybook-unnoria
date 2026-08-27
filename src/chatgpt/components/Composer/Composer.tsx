'use client';

import React from 'react';
import type { GptComposerDockProps, GptComposerProps } from './Composer.types';
import { Icon } from '../Icon';
import './Composer.css';

/**
 * Doca do compositor — a faixa de 116px que o arquivo desenha na base da tela,
 * com véu translúcido de 10% e desfoque de fundo de 40px.
 */
const ComposerDock: React.FC<GptComposerDockProps> = ({
  theme,
  children,
  className = '',
  ...restProps
}) => (
  <div
    data-gpt-theme={theme}
    className={['gpt-composer-dock', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {children}
  </div>
);

ComposerDock.displayName = 'Composer.Dock';

interface ComposerComponent
  extends React.ForwardRefExoticComponent<
    GptComposerProps & React.RefAttributes<HTMLFormElement>
  > {
  Dock: typeof ComposerDock;
}

const ComposerRoot = React.forwardRef<HTMLFormElement, GptComposerProps>(
  (
    {
      value,
      onValueChange,
      placeholder = 'Type message',
      onSend,
      onVoice,
      onAttach,
      leadingActions,
      hideLeadingActions = false,
      voiceLabel = 'Entrada de voz',
      attachLabel = 'Anexar imagem',
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

    const classes = ['gpt-composer', block ? 'gpt-composer--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <form
        ref={ref}
        data-gpt-theme={theme}
        className={classes}
        onSubmit={handleSubmit}
        {...restProps}
      >
        {!hideLeadingActions &&
          (leadingActions ?? (
            <>
              <button
                type="button"
                className="gpt-composer__action"
                aria-label={voiceLabel}
                onClick={onVoice}
                disabled={disabled}
              >
                <Icon name="microphone" size={16} />
              </button>
              <button
                type="button"
                className="gpt-composer__action"
                aria-label={attachLabel}
                onClick={onAttach}
                disabled={disabled}
              >
                <Icon name="image" size={16} />
              </button>
            </>
          ))}

        <input
          className="gpt-composer__field"
          type="text"
          value={currentValue}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
        />

        <button
          type="submit"
          className="gpt-composer__action gpt-composer__action--send"
          aria-label={sendLabel}
          disabled={disabled}
        >
          <Icon name="paperPlaneRight" size={16} />
        </button>
      </form>
    );
  }
);

ComposerRoot.displayName = 'Composer';

/**
 * Componente Composer — Design System ChatGPT
 *
 * Compositor translúcido de 760 × 56 com padding 16/20, raio 16 e contorno de
 * 0,5px, medido nas duas versões do quadro `New chat - V1 - A`. A trilha
 * interna tem quatro alvos com 8px de intervalo: voz, anexo, campo e envio.
 *
 * O contorno de 0,5px é literal do arquivo — não é um fio de 1px arredondado.
 */
export const Composer = Object.assign(ComposerRoot, { Dock: ComposerDock }) as ComposerComponent;
