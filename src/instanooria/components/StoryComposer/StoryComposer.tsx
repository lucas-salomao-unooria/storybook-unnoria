'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import type { InstaStoryComposerProps } from './StoryComposer.types';
import './StoryComposer.css';

/**
 * Componente StoryComposer — Design System Instanooria
 *
 * O compositor de Story com legenda, como no app real: a prévia no palco, o
 * campo de legenda com contador "{n}/{max}" e a barra inferior com o botão
 * "Seu story" (avatar e rótulo) como ação de envio. Extensão sem quadro no
 * arquivo de origem: o palco, a barra de 94px e a pílula de 43px são as do
 * visualizador de Story (`0:2236`).
 *
 * O campo só é controlado quando o consumidor passa `value` (seção 4.5.1).
 *
 * **Conta CARACTERES, não unidades UTF-16.** O contador, o `minLength` e o
 * `maxLength` medem em code points (`Array.from(texto).length`): um emoji é UM
 * caractere, como a pessoa conta — e como o servidor que recebe a legenda
 * costuma contar. Por isso o campo NÃO usa os atributos nativos `maxlength` e
 * `minlength`, que medem em UTF-16 e fariam o emoji valer dois: o teto é
 * aplicado na digitação, cortando o excesso antes do `onChange`.
 */

/** Quantos caracteres o texto tem, contando cada code point como um. */
const contarCaracteres = (texto: string): number => Array.from(texto).length;

/** O texto cortado em `max` caracteres (code points), sem partir um emoji ao meio. */
const cortarEm = (texto: string, max: number): string =>
  contarCaracteres(texto) > max ? Array.from(texto).slice(0, max).join('') : texto;

export const StoryComposer = React.forwardRef<HTMLFormElement, InstaStoryComposerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      maxLength,
      minLength,
      placeholder = 'Escreva uma legenda…',
      label = 'Legenda do story',
      name,
      submitLabel = 'Seu story',
      onSubmit,
      submitDisabled = false,
      avatarSrc,
      children,
      theme = 'dark',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const fieldId = React.useId();
    const counterId = React.useId();
    const isControlled = value !== undefined;

    /*
     * O estado interno existe só para o contador e o bloqueio por `minLength`.
     * Pode ficar defasado se o texto entrar sem evento — aceitável: o custo é
     * um contador atrasado, não um texto que some (seção 4.5.1).
     */
    const [internalLength, setInternalLength] = React.useState(
      contarCaracteres(defaultValue ?? '')
    );
    const length = isControlled ? contarCaracteres(value as string) : internalLength;
    const tooShort = minLength !== undefined && length < minLength;
    const isSubmitDisabled = submitDisabled || tooShort;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      // O teto em caracteres, no lugar do `maxlength` nativo (que mede UTF-16).
      const cortado = cortarEm(event.target.value, maxLength);
      if (cortado !== event.target.value) {
        event.target.value = cortado;
      }
      if (!isControlled) {
        setInternalLength(contarCaracteres(cortado));
      }
      onChange?.(event);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitDisabled) {
        return;
      }
      const text = isControlled ? (value as string) : (textareaRef.current?.value ?? '');
      onSubmit?.(text);
    };

    return (
      <form
        ref={ref}
        data-insta-theme={theme}
        className={['insta-story-composer', className].filter(Boolean).join(' ')}
        onSubmit={handleSubmit}
        {...restProps}
      >
        {children && <div className="insta-story-composer__stage">{children}</div>}

        <div className="insta-story-composer__field">
          <textarea
            ref={textareaRef}
            id={fieldId}
            className="insta-story-composer__input"
            aria-label={label}
            aria-describedby={counterId}
            placeholder={placeholder}
            name={name}
            rows={3}
            onChange={handleChange}
            {...(isControlled ? { value: value as string } : { defaultValue })}
          />
          <p id={counterId} className="insta-story-composer__counter">
            {length}/{maxLength}
          </p>
        </div>

        <div className="insta-story-composer__bar">
          <button
            type="submit"
            className="insta-story-composer__submit"
            disabled={isSubmitDisabled}
          >
            <Avatar src={avatarSrc} alt="" size="md" theme={theme} />
            <span className="insta-story-composer__submit-label">{submitLabel}</span>
          </button>
        </div>
      </form>
    );
  }
);

StoryComposer.displayName = 'StoryComposer';
