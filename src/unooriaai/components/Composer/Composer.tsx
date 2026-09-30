'use client';

import React from 'react';
import type { UaiComposerDockProps, UaiComposerProps } from './Composer.types';
import { Icon } from '../Icon';
import './Composer.css';

/**
 * Doca do compositor — a faixa de 116px da base da tela, com véu translúcido
 * e desfoque de fundo de 40px.
 */
const ComposerDock: React.FC<UaiComposerDockProps> = ({
  theme,
  children,
  className = '',
  ...restProps
}) => (
  <div
    data-uai-theme={theme}
    className={['uai-composer-dock', className].filter(Boolean).join(' ')}
    {...restProps}
  >
    {children}
  </div>
);

ComposerDock.displayName = 'Composer.Dock';

interface ComposerComponent
  extends React.ForwardRefExoticComponent<
    UaiComposerProps & React.RefAttributes<HTMLFormElement>
  > {
  Dock: typeof ComposerDock;
}

const ComposerRoot = React.forwardRef<HTMLFormElement, UaiComposerProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Escreva uma mensagem',
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
    const fieldRef = React.useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined;

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

    const classes = ['uai-composer', block ? 'uai-composer--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <form
        ref={ref}
        data-uai-theme={theme}
        className={classes}
        onSubmit={handleSubmit}
        {...restProps}
      >
        {!hideLeadingActions &&
          (leadingActions ?? (
            <>
              <button
                type="button"
                className="uai-composer__action"
                aria-label={voiceLabel}
                onClick={onVoice}
                disabled={disabled}
              >
                <Icon name="microphone" size={20} />
              </button>
              <button
                type="button"
                className="uai-composer__action"
                aria-label={attachLabel}
                onClick={onAttach}
                disabled={disabled}
              >
                <Icon name="image" size={20} />
              </button>
            </>
          ))}

        <input
          ref={fieldRef}
          className="uai-composer__field"
          type="text"
          {...(isControlled ? { value: value as string } : { defaultValue })}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
        />

        <button
          type="submit"
          className="uai-composer__action uai-composer__action--send"
          aria-label={sendLabel}
          disabled={disabled}
        >
          <Icon name="paperPlaneRight" size={20} />
        </button>
      </form>
    );
  }
);

ComposerRoot.displayName = 'Composer';

/**
 * Componente Composer — Design System UnooriaAI
 *
 * Compositor translúcido de 760 × 56 com padding 16/20, raio 16 e contorno de
 * 1px em `--uai-web-composer-border`. A trilha interna tem quatro alvos com 8px
 * de intervalo: voz, anexo, campo e envio.
 *
 * O campo só é controlado quando o consumidor passa `value` (+
 * `onValueChange`): sem ele, o texto mora no DOM — o preenchimento automático
 * escreve direto no nó — e `defaultValue` é o valor inicial. Em modo não
 * controlado, enviar limpa o campo escrevendo no próprio nó (seção 4.5.1).
 *
 * Não confundir com o `ChatInput`: aquele é o campo de 600 × 48 da conversa
 * padrão, com um único alvo redondo.
 */
export const Composer = Object.assign(ComposerRoot, { Dock: ComposerDock }) as ComposerComponent;
