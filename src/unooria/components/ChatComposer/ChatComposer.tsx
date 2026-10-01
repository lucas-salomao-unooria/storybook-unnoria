'use client';

import React, { forwardRef, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { TextArea } from '../TextField/TextArea';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
import type { ChatComposerProps } from './ChatComposer.types';
import './ChatComposer.css';

/** `useLayoutEffect` no navegador (sem piscar a altura), `useEffect` no servidor. */
const useEfeitoDeLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const formatarNumero = (n: number): string => n.toLocaleString('pt-BR');

/**
 * ChatComposer — onde o professor escreve para o agente de IA do professor
 * (Plataforma Unooria).
 *
 * O campo é o `TextArea` do pacote (o mesmo fio, foco e tema), numa linha só que
 * cresce com o texto até `maxRows` e daí rola por dentro. Enter envia;
 * Shift+Enter quebra a linha; durante a composição de um acento (IME), Enter
 * não envia. Com `transmitindo`, o botão Enviar vira "Parar".
 *
 * Modo controlado só com `value` (seção 4.5.1): sem ele, o texto vive no DOM, e
 * o envio lê o nó e o limpa.
 */
export const ChatComposer = forwardRef<HTMLTextAreaElement, ChatComposerProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onSend,
      onStop,
      transmitindo = false,
      disabled = false,
      maxLength,
      maxRows = 6,
      placeholder = 'Pergunte ao agente de IA do professor',
      label = 'Mensagem para o agente de IA do professor',
      sendLabel = 'Enviar',
      stopLabel = 'Parar',
      hint = 'Enter envia. Shift + Enter quebra a linha.',
      theme = 'light',
      className = '',
      style,
      onKeyDown,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const campoRef = useRef<HTMLTextAreaElement | null>(null);
    const dicaId = useId();
    const contadorId = useId();

    /*
     * Em modo não controlado o texto é do DOM; este estado só acompanha o
     * tamanho (para o contador) e se há texto (para ligar o Enviar). Ele é
     * alimentado pelo `onChange` e zerado no envio.
     */
    const [textoNaoControlado, setTextoNaoControlado] = useState<string>(defaultValue ?? '');
    const textoAtual = isControlled ? (value as string) : textoNaoControlado;
    const temTexto = textoAtual.trim().length > 0;
    const tamanho = textoAtual.length;

    const juntarRefs = useCallback(
      (no: HTMLTextAreaElement | null) => {
        campoRef.current = no;
        if (typeof ref === 'function') ref(no);
        else if (ref) ref.current = no;
      },
      [ref]
    );

    /** Altura pelo conteúdo, até `maxRows` linhas; daí em diante, rola. */
    const ajustarAltura = useCallback(() => {
      const campo = campoRef.current;
      if (!campo || typeof window === 'undefined') return;
      const estilo = window.getComputedStyle(campo);
      const linha = parseFloat(estilo.lineHeight) || 24;
      const recuo = parseFloat(estilo.paddingTop) + parseFloat(estilo.paddingBottom);
      const fio = parseFloat(estilo.borderTopWidth) + parseFloat(estilo.borderBottomWidth);
      const maximo = linha * Math.max(1, maxRows) + recuo + fio;

      campo.style.height = 'auto';
      const desejada = campo.scrollHeight + fio;
      campo.style.height = `${Math.min(desejada, maximo)}px`;
      campo.style.overflowY = desejada > maximo ? 'auto' : 'hidden';
    }, [maxRows]);

    useEfeitoDeLayout(() => {
      ajustarAltura();
    }, [ajustarAltura, textoAtual]);

    const aoMudar = (evento: React.ChangeEvent<HTMLTextAreaElement>) => {
      const texto = evento.target.value;
      if (!isControlled) setTextoNaoControlado(texto);
      onValueChange?.(texto);
    };

    const enviar = () => {
      if (disabled || transmitindo) return;
      const campo = campoRef.current;
      const bruto = isControlled ? (value as string) : (campo?.value ?? textoNaoControlado);
      const texto = bruto.trim();
      if (!texto) return;

      onSend(texto);

      if (!isControlled) {
        if (campo) campo.value = '';
        setTextoNaoControlado('');
      }
      // Pede a limpeza também no modo controlado: quem controla aplica o ''.
      onValueChange?.('');
      campo?.focus();
    };

    const aoTeclar = (evento: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(evento);
      if (evento.defaultPrevented) return;
      if (evento.key !== 'Enter' || evento.shiftKey || evento.nativeEvent.isComposing) return;
      // Enter nunca quebra linha aqui: ou envia, ou (transmitindo/vazio) não faz nada.
      evento.preventDefault();
      enviar();
    };

    const limiteAtingido = maxLength !== undefined && tamanho >= maxLength;
    const descritoPor = [ariaDescribedBy, hint ? dicaId : undefined, maxLength !== undefined ? contadorId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

    const classes = [
      'unooria-chat-composer',
      theme === 'dark' ? 'unooria-chat-composer--theme-dark' : '',
      disabled ? 'unooria-chat-composer--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const mostrarParar = transmitindo && Boolean(onStop);
    const rotuloDoBotao = mostrarParar ? stopLabel : sendLabel;

    return (
      <div className={classes} style={style} data-theme={theme}>
        <div className="unooria-chat-composer__row">
          <TextArea
            {...rest}
            ref={juntarRefs}
            className="unooria-chat-composer__field"
            textareaClassName="unooria-chat-composer__input"
            rows={1}
            resize="none"
            showCounter={false}
            maxLength={maxLength}
            placeholder={placeholder}
            aria-label={label}
            aria-describedby={descritoPor}
            disabled={disabled}
            theme={theme}
            onChange={aoMudar}
            onKeyDown={aoTeclar}
            {...(isControlled ? { value: value as string } : { defaultValue })}
          />

          <Tooltip content={rotuloDoBotao} placement="top" theme={theme}>
            {mostrarParar ? (
              <Button
                variant="outline"
                size="md"
                theme={theme}
                aria-label={stopLabel}
                className="unooria-chat-composer__action"
                disabled={disabled}
                onClick={onStop}
                leftIcon={<Icon name="crop_square" fill size="xxs" color="currentColor" />}
              />
            ) : (
              <Button
                variant="primary"
                size="md"
                theme={theme}
                aria-label={sendLabel}
                className="unooria-chat-composer__action"
                disabled={disabled || transmitindo || !temTexto}
                onClick={enviar}
                leftIcon={<Icon name="send" size="xxs" color="currentColor" />}
              />
            )}
          </Tooltip>
        </div>

        {maxLength !== undefined && (
          <p
            className={`unooria-chat-composer__counter${limiteAtingido ? ' unooria-chat-composer__counter--limit' : ''}`}
            aria-hidden="true"
          >
            {formatarNumero(tamanho)}/{formatarNumero(maxLength)}
          </p>
        )}

        {/* Descrições do campo: lidas pelo leitor de tela ao focar, fora da tela. */}
        {hint && (
          <span id={dicaId} className="unooria-chat-composer__sr-only">
            {hint}
          </span>
        )}
        {maxLength !== undefined && (
          <span id={contadorId} className="unooria-chat-composer__sr-only">
            {`Você usou ${tamanho} de ${maxLength} caracteres.`}
          </span>
        )}
      </div>
    );
  }
);

ChatComposer.displayName = 'ChatComposer';

export default ChatComposer;
