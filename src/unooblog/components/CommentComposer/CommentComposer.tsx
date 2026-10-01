'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { TextArea } from '../TextArea';
import type { UblCommentComposerProps } from './CommentComposer.types';
import './CommentComposer.css';

/** Conta por code point: um emoji conta um, como a pessoa o vê. */
const countCodePoints = (text: string) => Array.from(text).length;

/**
 * Componente CommentComposer — Design System Unooblog
 *
 * Compositor de comentário: avatar, área de texto com contador em code points
 * (limite de 1000 por padrão), “Comentar” e, se houver `onCancel`, “Cancelar”.
 * O botão fica desabilitado com o texto vazio ou só de espaços. Ctrl/⌘ + Enter
 * envia. Com `replyingTo`, o rótulo vira “Respondendo a <nome>”.
 *
 * Só é controlado quando recebe `value` (AGENTS.md, 4.5.1): sem ele, o texto
 * mora no DOM; ao enviar, o componente lê o texto do nó, troca o campo por um
 * novo, vazio (o texto é do DOM e não há estado que o limpe), e devolve o foco
 * a ele. O estado do botão vem dos eventos de alteração: um preenchimento sem
 * evento pode deixá-lo defasado — o custo é um botão que demora a habilitar,
 * nunca um texto que some.
 *
 * É de cliente: usa estado, ref e tratador de teclado.
 */
export const CommentComposer = React.forwardRef<HTMLFormElement, UblCommentComposerProps>(
  (
    {
      avatarSrc,
      name = 'Você',
      placeholder = 'Escreva um comentário',
      value,
      defaultValue,
      onValueChange,
      onSubmit,
      onCancel,
      maxLength = 1000,
      submitLabel = 'Comentar',
      cancelLabel = 'Cancelar',
      replyingTo,
      hint = 'Ctrl ou ⌘ + Enter para enviar.',
      error,
      rows = 3,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const fieldRef = React.useRef<HTMLTextAreaElement>(null);
    const isControlled = value !== undefined;

    const [hasText, setHasText] = React.useState(() => (defaultValue ?? '').trim().length > 0);
    const [overLimit, setOverLimit] = React.useState(false);
    /* Cada envio sem `value` troca o campo por um novo, vazio: não há estado que comande o texto. */
    const [generation, setGeneration] = React.useState(0);

    React.useEffect(() => {
      if (generation > 0) fieldRef.current?.focus();
    }, [generation]);

    const currentText = isControlled ? (value as string) : undefined;
    const canSubmit = isControlled
      ? currentText!.trim().length > 0 && countCodePoints(currentText!) <= maxLength
      : hasText && !overLimit;

    const submit = () => {
      const node = fieldRef.current;
      const raw = isControlled ? (value as string) : (node?.value ?? '');
      const text = raw.trim();
      if (text.length === 0 || countCodePoints(raw) > maxLength) return;

      onSubmit?.(text);

      if (isControlled) {
        node?.focus();
      } else {
        setGeneration((atual) => atual + 1);
        setHasText(false);
        setOverLimit(false);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      setHasText(text.trim().length > 0);
      setOverLimit(countCodePoints(text) > maxLength);
      onValueChange?.(text);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.nativeEvent.isComposing) {
        event.preventDefault();
        submit();
      }
    };

    const label = replyingTo ? (
      <>
        Respondendo a <strong className="ubl-comment-composer__replying">{replyingTo}</strong>
      </>
    ) : (
      'Seu comentário'
    );

    return (
      <form
        ref={ref}
        data-ubl-theme={theme}
        aria-label={replyingTo ? `Responder a ${replyingTo}` : 'Novo comentário'}
        noValidate
        {...restProps}
        className={['ubl-comment-composer', className].filter(Boolean).join(' ')}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <Avatar src={avatarSrc} name={name} size="md" alt="" className="ubl-comment-composer__avatar" />

        <div className="ubl-comment-composer__main">
          <TextArea
            key={generation}
            ref={fieldRef}
            label={label}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            hint={hint}
            error={error}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...(isControlled ? { value: value as string } : { defaultValue: generation === 0 ? defaultValue : '' })}
          />

          <div className="ubl-comment-composer__actions">
            {onCancel && (
              <Button variant="ghost" size="md" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" variant="primary" size="md" iconEnd="send" disabled={!canSubmit}>
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    );
  }
);

CommentComposer.displayName = 'CommentComposer';
