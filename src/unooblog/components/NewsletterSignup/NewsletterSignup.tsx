'use client';

import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { TextField } from '../TextField';
import type { UblNewsletterSignupProps } from './NewsletterSignup.types';
import './NewsletterSignup.css';

/** Validação mínima de formato: algo, arroba, algo, ponto, algo — sem espaços. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Componente NewsletterSignup — Design System Unooblog
 *
 * Cartão de inscrição na newsletter: título, descrição, campo de e-mail e
 * botão. Três estados — `idle`, `success` e `error`. A validação de formato é
 * mínima e acessível: o formulário usa `noValidate`, o erro liga
 * `aria-invalid` ao campo, aparece com glifo e texto e devolve o foco ao
 * campo. Em `success`, o formulário dá lugar à mensagem com `checkCircle`,
 * numa região `aria-live` que já existe vazia antes da troca — é isso que faz
 * o leitor de tela anunciá-la.
 *
 * O campo nunca é controlado (AGENTS.md, 4.5.1): o texto mora no DOM e é lido do
 * nó no envio, de modo que o preenchimento automático e os gerenciadores de
 * senha, que escrevem sem evento do React, não perdem o e-mail numa
 * re-renderização. Marcado como Client Component: usa hooks e repassa funções.
 */
export const NewsletterSignup = React.forwardRef<HTMLElement, UblNewsletterSignupProps>(
  (
    {
      title = 'Receba os próximos posts',
      description,
      emailLabel = 'E-mail',
      buttonLabel = 'Assinar',
      onSubscribe,
      status = 'idle',
      successMessage = 'Inscrição confirmada. Você receberá os próximos posts por e-mail.',
      errorMessage = 'Não foi possível concluir a inscrição. Tente novamente em instantes.',
      invalidMessage = 'Informe um e-mail válido, como nome@exemplo.com.',
      defaultValue,
      headingLevel = 2,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const titleId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [formatError, setFormatError] = React.useState(false);

    const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
    const classes = [
      'ubl-newsletter-signup',
      `ubl-newsletter-signup--${status}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // O texto vem do nó do DOM, não de estado: o campo não é controlado.
      const email = (inputRef.current?.value ?? '').trim();
      if (!EMAIL_PATTERN.test(email)) {
        setFormatError(true);
        inputRef.current?.focus();
        return;
      }
      setFormatError(false);
      onSubscribe?.(email);
    };

    const fieldError = formatError ? invalidMessage : status === 'error' ? errorMessage : undefined;

    return (
      <section
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        aria-labelledby={titleId}
        {...restProps}
      >
        <div className="ubl-newsletter-signup__inner">
          <div className="ubl-newsletter-signup__intro">
            <span className="ubl-newsletter-signup__icon" aria-hidden="true">
              <Icon name="mail" size="md" tone="accent" />
            </span>
            <Heading id={titleId} className="ubl-newsletter-signup__title">
              {title}
            </Heading>
            {description && <p className="ubl-newsletter-signup__description">{description}</p>}
          </div>

          {status !== 'success' && (
            <form className="ubl-newsletter-signup__form" noValidate onSubmit={handleSubmit}>
              <TextField
                ref={inputRef}
                label={emailLabel}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="nome@exemplo.com"
                required
                iconStart="mail"
                error={fieldError}
                defaultValue={defaultValue}
                onChange={() => {
                  if (formatError) setFormatError(false);
                }}
              />
              <Button type="submit" variant="primary" size="md" fullWidth>
                {buttonLabel}
              </Button>
            </form>
          )}

          <div className="ubl-newsletter-signup__live" role="status" aria-live="polite">
            {status === 'success' && (
              <p className="ubl-newsletter-signup__success">
                <Icon name="checkCircle" size="md" tone="inherit" />
                <span>{successMessage}</span>
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
);

NewsletterSignup.displayName = 'NewsletterSignup';
