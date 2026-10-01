'use client';

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { EmptyState } from '../EmptyState/EmptyState';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
import type { ChatHistoryProps } from './ChatHistory.types';
import './ChatHistory.css';

const rotuloDeExcluirPadrao = (titulo: string) => `Excluir a conversa “${titulo}”`;

/** Para onde o foco vai depois de uma ação na linha. */
type FocoPendente =
  | { tipo: 'excluir'; id: string }
  | { tipo: 'depois-de-excluir'; id: string; indice: number };

/**
 * ChatHistory — as conversas com o agente de IA do professor (Plataforma Unooria).
 *
 * Uma `<nav>` com a lista: cada linha abre a conversa (título que o agente
 * gerou + quando mudou) e tem o botão de excluir. Excluir é em DOIS PASSOS, na
 * própria linha e sem `Modal`: o botão troca a linha por "Excluir esta
 * conversa?" com Cancelar (que recebe o foco) e Excluir. Esc cancela.
 *
 * Foco: ao cancelar, volta ao botão de excluir da linha; ao excluir, vai para a
 * conversa que ocupou o lugar (ou a anterior, ou a lista) — quando o produto
 * tirar a linha de `items`.
 */
export const ChatHistory = forwardRef<HTMLElement, ChatHistoryProps>(
  (
    {
      items,
      activeId,
      onSelect,
      onDelete,
      loading = false,
      label = 'Histórico de conversas',
      emptyTitle = 'Nenhuma conversa ainda',
      emptyDescription = 'As conversas com o agente de IA do professor aparecem aqui.',
      loadingLabel = 'Carregando conversas…',
      confirmQuestion = 'Excluir esta conversa?',
      confirmLabel = 'Excluir',
      cancelLabel = 'Cancelar',
      deleteLabel = rotuloDeExcluirPadrao,
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => {
    const [confirmandoId, setConfirmandoId] = useState<string | null>(null);
    /*
     * Ref, e não estado: o foco é um efeito colateral da ação, não algo a
     * renderizar. O efeito abaixo o lê quando a linha muda (`confirmandoId`) ou
     * quando o produto tira a conversa excluída (`items`).
     */
    const focoPendenteRef = useRef<FocoPendente | null>(null);
    const navRef = useRef<HTMLElement | null>(null);
    const cancelarRef = useRef<HTMLButtonElement | null>(null);

    const juntarRefs = useCallback(
      (no: HTMLElement | null) => {
        navRef.current = no;
        if (typeof ref === 'function') ref(no);
        else if (ref) ref.current = no;
      },
      [ref]
    );

    // A pergunta apareceu: o foco vai para Cancelar (o passo seguro).
    useEffect(() => {
      if (confirmandoId) cancelarRef.current?.focus();
    }, [confirmandoId]);

    // Devolve o foco depois de cancelar ou excluir.
    useEffect(() => {
      const pendente = focoPendenteRef.current;
      const nav = navRef.current;
      if (!pendente || !nav || confirmandoId) return;

      const linha = (id: string) =>
        nav.querySelector<HTMLElement>(`[data-conversa-id="${CSS.escape(id)}"]`);

      if (pendente.tipo === 'excluir') {
        focoPendenteRef.current = null;
        linha(pendente.id)?.querySelector<HTMLElement>('.unooria-chat-history__delete')?.focus();
        return;
      }

      // Depois de excluir: espera o produto tirar a linha de `items`.
      if (items.some((item) => item.id === pendente.id)) return;
      focoPendenteRef.current = null;
      const vizinho = items[pendente.indice] ?? items[pendente.indice - 1];
      const alvo = vizinho
        ? linha(vizinho.id)?.querySelector<HTMLElement>('.unooria-chat-history__select')
        : nav;
      alvo?.focus();
    }, [confirmandoId, items]);

    const cancelar = (id: string) => {
      focoPendenteRef.current = { tipo: 'excluir', id };
      setConfirmandoId(null);
    };

    const confirmar = (id: string, indice: number) => {
      focoPendenteRef.current = { tipo: 'depois-de-excluir', id, indice };
      setConfirmandoId(null);
      onDelete?.(id);
    };

    const classes = [
      'unooria-chat-history',
      theme === 'dark' ? 'unooria-chat-history--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderizarConteudo = () => {
      if (loading) {
        return (
          <div className="unooria-chat-history__loading">
            <span role="status" className="unooria-chat-history__sr-only">
              {loadingLabel}
            </span>
            {[0, 1, 2].map((n) => (
              <div key={n} className="unooria-chat-history__skeleton" aria-hidden="true">
                <span className="unooria-chat-history__skeleton-line" />
                <span className="unooria-chat-history__skeleton-line unooria-chat-history__skeleton-line--short" />
              </div>
            ))}
          </div>
        );
      }

      if (items.length === 0) {
        return (
          <EmptyState
            size="sm"
            compact
            theme={theme}
            icon={<Icon name="history" size="m" color="currentColor" />}
            title={emptyTitle}
            description={emptyDescription}
            className="unooria-chat-history__empty"
          />
        );
      }

      return (
        <ul className="unooria-chat-history__list">
          {items.map((item, indice) => {
            const ativa = item.id === activeId;
            const confirmando = item.id === confirmandoId;
            const classesDaLinha = [
              'unooria-chat-history__item',
              ativa ? 'unooria-chat-history__item--active' : '',
              confirmando ? 'unooria-chat-history__item--confirming' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <li key={item.id} className={classesDaLinha} data-conversa-id={item.id}>
                {confirmando ? (
                  <div
                    className="unooria-chat-history__confirm"
                    role="group"
                    aria-label={`${confirmQuestion} ${item.titulo}`}
                    onKeyDown={(evento) => {
                      if (evento.key === 'Escape' && !evento.nativeEvent.isComposing) {
                        // O Esc é desta pergunta: o painel em volta não fecha.
                        evento.preventDefault();
                        evento.stopPropagation();
                        cancelar(item.id);
                      }
                    }}
                  >
                    <p className="unooria-chat-history__confirm-text">
                      <span className="unooria-chat-history__confirm-question">{confirmQuestion}</span>
                      <span className="unooria-chat-history__confirm-title">{item.titulo}</span>
                    </p>
                    <div className="unooria-chat-history__confirm-actions">
                      <Button
                        ref={cancelarRef}
                        variant="ghost"
                        size="sm"
                        theme={theme}
                        onClick={() => cancelar(item.id)}
                      >
                        {cancelLabel}
                      </Button>
                      <Button variant="danger" size="sm" theme={theme} onClick={() => confirmar(item.id, indice)}>
                        {confirmLabel}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="unooria-chat-history__select"
                      aria-current={ativa ? 'true' : undefined}
                      onClick={() => onSelect?.(item.id)}
                    >
                      <span className="unooria-chat-history__title">{item.titulo}</span>
                      <span className="unooria-chat-history__date">{item.atualizadaEm}</span>
                    </button>
                    {onDelete && (
                      <Tooltip content="Excluir" placement="left" theme={theme}>
                        <Button
                          variant="ghost"
                          size="sm"
                          theme={theme}
                          className="unooria-chat-history__delete"
                          aria-label={deleteLabel(item.titulo)}
                          onClick={() => setConfirmandoId(item.id)}
                          leftIcon={<Icon name="delete" size="3xs" color="currentColor" />}
                        />
                      </Tooltip>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <nav
        {...rest}
        ref={juntarRefs}
        aria-label={label}
        aria-busy={loading ? true : undefined}
        tabIndex={-1}
        className={classes}
        data-theme={theme}
      >
        {renderizarConteudo()}
      </nav>
    );
  }
);

ChatHistory.displayName = 'ChatHistory';

export default ChatHistory;
