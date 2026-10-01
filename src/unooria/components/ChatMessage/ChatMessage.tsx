'use client';

import React, { forwardRef } from 'react';
import { AgentAvatar, AGENT_NAME } from '../AgentAvatar/AgentAvatar';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import type { ChatMessageProps, ChatMessageSource } from './ChatMessage.types';
import './ChatMessage.css';

/** "Título, p. 12–13", "Título, p. 12" ou "Título". O traço é o meia-risca. */
export const formatChatMessageSource = ({ titulo, paginaInicio, paginaFim }: ChatMessageSource): string => {
  const inicio = paginaInicio ?? paginaFim;
  const fim = paginaFim ?? paginaInicio;
  if (inicio === undefined || fim === undefined) return titulo;
  return inicio === fim ? `${titulo}, p. ${inicio}` : `${titulo}, p. ${inicio}–${fim}`;
};

/** `ReactNode` que de fato pinta alguma coisa (`0` pinta; `''`, `false` e `null`, não). */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

/**
 * ChatMessage — uma mensagem da conversa com o agente de IA do professor
 * (Plataforma Unooria).
 *
 * - **Professor**: balão lavanda à direita, sem avatar (é quem está lendo).
 * - **Agente**: o mascote (`AgentAvatar` `xs`) e o conteúdo em largura cheia, sem
 *   balão — a resposta é texto para ler, com títulos, listas e tabelas.
 *
 * Leitor de tela: cada mensagem é um `<article>` com nome ("Você" ou "Agente de
 * IA do professor"). A do agente é região viva educada (`aria-live="polite"`)
 * e fica `aria-busy` enquanto `enviando` ou `transmitindo`: o leitor espera o
 * fim e lê a resposta inteira uma vez, em vez de repetir cada trecho que chega.
 */
export const ChatMessage = forwardRef<HTMLElement, ChatMessageProps>(
  (
    {
      autor,
      children,
      estado = 'pronta',
      fontes,
      aviso,
      erro,
      onRetry,
      retryLabel = 'Tentar de novo',
      authorLabel,
      sourcesLabel = 'Fontes',
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => {
    const doAgente = autor === 'agente';
    const ocupado = estado === 'enviando' || estado === 'transmitindo';
    const comErro = estado === 'erro';
    const temCorpo = temConteudo(children);
    const temFontes = Boolean(fontes && fontes.length > 0);

    const textoDoErro = temConteudo(erro)
      ? erro
      : doAgente
        ? 'Não foi possível gerar a resposta.'
        : 'Não foi possível enviar a mensagem.';

    const classes = [
      'unooria-chat-message',
      `unooria-chat-message--${autor}`,
      `unooria-chat-message--${estado}`,
      theme === 'dark' ? 'unooria-chat-message--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <article
        {...rest}
        ref={ref}
        className={classes}
        aria-label={authorLabel ?? (doAgente ? AGENT_NAME : 'Você')}
        aria-live={doAgente ? 'polite' : undefined}
        aria-busy={doAgente && ocupado ? true : undefined}
        data-estado={estado}
      >
        {doAgente && <AgentAvatar size="xs" decorative theme={theme} className="unooria-chat-message__avatar" />}

        <div className="unooria-chat-message__column">
          {temCorpo && <div className="unooria-chat-message__body">{children}</div>}

          {doAgente && estado === 'enviando' && !temCorpo && (
            <TypingIndicator theme={theme} className="unooria-chat-message__typing" />
          )}

          {!doAgente && estado === 'enviando' && (
            <span className="unooria-chat-message__meta">Enviando…</span>
          )}

          {temConteudo(aviso) && (
            <p className="unooria-chat-message__notice" role="note">
              <Icon name="warning" size="3xs" color="currentColor" className="unooria-chat-message__notice-icon" />
              <span>{aviso}</span>
            </p>
          )}

          {temFontes && (
            <p className="unooria-chat-message__sources">
              <Icon name="menu_book" size="3xs" color="currentColor" className="unooria-chat-message__sources-icon" />
              <span>
                <span className="unooria-chat-message__sources-label">{sourcesLabel}:</span>{' '}
                {fontes!.map((fonte, indice) => (
                  <React.Fragment key={`${fonte.titulo}-${indice}`}>
                    {indice > 0 && '; '}
                    <cite className="unooria-chat-message__source">{formatChatMessageSource(fonte)}</cite>
                  </React.Fragment>
                ))}
              </span>
            </p>
          )}

          {comErro && (
            <div className="unooria-chat-message__error" role={doAgente ? undefined : 'alert'}>
              <p className="unooria-chat-message__error-text">
                <Icon name="error" size="3xs" color="currentColor" className="unooria-chat-message__error-icon" />
                <span>{textoDoErro}</span>
              </p>
              {onRetry && (
                <Button
                  variant="ghost"
                  size="sm"
                  theme={theme}
                  onClick={onRetry}
                  leftIcon={<Icon name="refresh" size="xxs" color="currentColor" />}
                >
                  {retryLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
