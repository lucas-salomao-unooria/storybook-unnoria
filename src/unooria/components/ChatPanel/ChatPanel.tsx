'use client';

import React, { forwardRef, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { AgentAvatar, AGENT_NAME } from '../AgentAvatar/AgentAvatar';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { ScrollBar } from '../ScrollBar/ScrollBar';
import type { ChatPanelProps } from './ChatPanel.types';
import './ChatPanel.css';

/** `useLayoutEffect` no navegador (a rolagem acontece antes de pintar), `useEffect` no servidor. */
const useEfeitoDeLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Até quantos px do fim ainda contam como "no fim" (arredondamento e zoom). */
const LIMIAR_DO_FIM = 32;

const estaNoFim = (corpo: HTMLElement): boolean =>
  corpo.scrollHeight - corpo.scrollTop - corpo.clientHeight <= LIMIAR_DO_FIM;

const querMovimentoReduzido = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Casa uma ref interna com a que vem de fora (função ou objeto). */
const atribuirRef = <T,>(ref: React.Ref<T> | undefined, valor: T | null) => {
  if (typeof ref === 'function') ref(valor);
  else if (ref) (ref as React.MutableRefObject<T | null>).current = valor;
};

/**
 * ChatPanel — o painel do agente de IA do professor (Plataforma Unooria).
 *
 * NÃO é modal: não tem véu, não prende o foco e não trava a rolagem da página —
 * o professor lê a resposta e continua usando a tela ao lado. É uma região
 * (`role="complementary"`, nomeada pelo título) ancorada no canto inferior,
 * que fecha com Esc quando o foco está dentro dela.
 *
 * O corpo é o `ScrollBar` do pacote e acompanha o fim enquanto a resposta chega
 * (`stickToBottom`), sem roubar a rolagem de quem subiu para reler: aí aparece
 * o botão "Ir para a mensagem mais recente". `scrollToEndKey` força a ida ao
 * fim (ao enviar).
 */
export const ChatPanel = forwardRef<HTMLElement, ChatPanelProps>(
  (
    {
      open = true,
      size = 'compacto',
      placement = 'bottom-right',
      onClose,
      closeOnEsc = true,
      title = AGENT_NAME,
      subtitle,
      avatar,
      actions,
      children,
      footer,
      sidebar,
      sidebarOpen,
      role = 'complementary',
      bodyLabel = 'Mensagens da conversa',
      stickToBottom = true,
      scrollToEndKey,
      onAtBottomChange,
      showScrollToEnd = true,
      scrollToEndLabel = 'Ir para a mensagem mais recente',
      bodyRef,
      theme = 'light',
      className = '',
      onKeyDown,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    },
    ref
  ) => {
    const tituloId = useId();
    const corpoRef = useRef<HTMLDivElement | null>(null);
    const conteudoRef = useRef<HTMLDivElement | null>(null);
    const noFimRef = useRef(true);
    const ultimaRolagemRef = useRef(0);
    const [noFim, setNoFim] = useState(true);

    const temSidebar = sidebar !== undefined && sidebar !== null && sidebar !== false;
    const sidebarVisivel = temSidebar && (sidebarOpen ?? true);

    const juntarCorpo = useCallback(
      (no: HTMLDivElement | null) => {
        corpoRef.current = no;
        atribuirRef(bodyRef, no);
      },
      [bodyRef]
    );

    const marcarNoFim = useCallback(
      (valor: boolean) => {
        if (valor === noFimRef.current) return;
        noFimRef.current = valor;
        setNoFim(valor);
        onAtBottomChange?.(valor);
      },
      [onAtBottomChange]
    );

    const rolarAoFim = useCallback(
      (suave = false) => {
        const corpo = corpoRef.current;
        if (!corpo) return;
        const alvo = corpo.scrollHeight;
        if (suave && !querMovimentoReduzido() && typeof corpo.scrollTo === 'function') {
          corpo.scrollTo({ top: alvo, behavior: 'smooth' });
        } else {
          corpo.scrollTop = alvo;
        }
        marcarNoFim(true);
      },
      [marcarNoFim]
    );

    const aoRolar = (evento: React.UIEvent<HTMLDivElement>) => {
      const corpo = evento.currentTarget;
      ultimaRolagemRef.current = corpo.scrollTop;
      marcarNoFim(estaNoFim(corpo));
    };

    // Ao abrir (e ao montar): volta ao fim, ou ao ponto em que a pessoa estava.
    useEfeitoDeLayout(() => {
      if (!open) return;
      const corpo = corpoRef.current;
      if (!corpo) return;
      if (noFimRef.current) corpo.scrollTop = corpo.scrollHeight;
      else corpo.scrollTop = ultimaRolagemRef.current;
    }, [open, sidebarVisivel]);

    // Cada renderização com conteúdo novo (o produto passa os trechos como
    // `children`): se a pessoa estava no fim, continua no fim — antes de pintar.
    // Não depende só do ResizeObserver, que não dispara enquanto a página não
    // tem oportunidade de renderizar (aba em segundo plano, iframe oculto).
    useEfeitoDeLayout(() => {
      if (!stickToBottom || !open) return;
      const corpo = corpoRef.current;
      if (corpo && noFimRef.current) corpo.scrollTop = corpo.scrollHeight;
    });

    // O conteúdo cresceu sem renderização do painel (imagem, fonte, tabela)
    // ou o corpo mudou de tamanho (expandir/recolher): idem.
    useEffect(() => {
      if (!stickToBottom || typeof ResizeObserver === 'undefined') return undefined;
      const corpo = corpoRef.current;
      const conteudo = conteudoRef.current;
      if (!corpo || !conteudo) return undefined;

      const observador = new ResizeObserver(() => {
        if (noFimRef.current) corpo.scrollTop = corpo.scrollHeight;
      });
      observador.observe(conteudo);
      observador.observe(corpo);
      return () => observador.disconnect();
    }, [stickToBottom]);

    // `scrollToEndKey` mudou: vai ao fim, mesmo que a pessoa tenha subido.
    // A chave anterior fica numa ref: o efeito também roda quando
    // `rolarAoFim` muda de identidade, e aí não pode rolar.
    const chaveAnteriorRef = useRef(scrollToEndKey);
    useEfeitoDeLayout(() => {
      if (chaveAnteriorRef.current === scrollToEndKey) return;
      chaveAnteriorRef.current = scrollToEndKey;
      rolarAoFim();
    }, [scrollToEndKey, rolarAoFim]);

    const aoTeclar = (evento: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(evento);
      if (
        !closeOnEsc ||
        !onClose ||
        evento.defaultPrevented ||
        evento.key !== 'Escape' ||
        evento.nativeEvent.isComposing
      ) {
        return;
      }
      evento.preventDefault();
      onClose();
    };

    const classes = [
      'unooria-chat-panel',
      `unooria-chat-panel--${size}`,
      `unooria-chat-panel--${placement}`,
      sidebarVisivel ? 'unooria-chat-panel--with-sidebar' : '',
      theme === 'dark' ? 'unooria-chat-panel--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const nomeadoPor = ariaLabelledBy || (ariaLabel ? undefined : tituloId);
    const avatarDoCabecalho =
      avatar === undefined ? <AgentAvatar size="sm" decorative theme={theme} /> : avatar;

    return (
      <section
        {...rest}
        ref={ref}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={nomeadoPor}
        hidden={!open}
        className={classes}
        data-theme={theme}
        data-size={size}
        onKeyDown={aoTeclar}
      >
        <header className="unooria-chat-panel__header">
          {avatarDoCabecalho && <span className="unooria-chat-panel__avatar">{avatarDoCabecalho}</span>}
          <div className="unooria-chat-panel__heading">
            <h2 id={tituloId} className="unooria-chat-panel__title">
              {title}
            </h2>
            {subtitle && <p className="unooria-chat-panel__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="unooria-chat-panel__actions">{actions}</div>}
        </header>

        <div className="unooria-chat-panel__main">
          {sidebarVisivel && (
            <ScrollBar
              className="unooria-chat-panel__sidebar"
              theme={theme}
              // A coluna só rola; quem é navegável é o que está dentro dela.
              role={undefined}
              aria-label={undefined}
              tabIndex={-1}
            >
              {sidebar}
            </ScrollBar>
          )}

          <div className="unooria-chat-panel__conversation">
            <div className="unooria-chat-panel__viewport">
              <ScrollBar
                ref={juntarCorpo}
                className="unooria-chat-panel__body"
                theme={theme}
                aria-label={bodyLabel}
                onScroll={aoRolar}
              >
                <div ref={conteudoRef} className="unooria-chat-panel__content">
                  {children}
                </div>
              </ScrollBar>

              {showScrollToEnd && !noFim && (
                <div className="unooria-chat-panel__jump">
                  <Button
                    variant="outline"
                    size="sm"
                    theme={theme}
                    onClick={() => rolarAoFim(true)}
                    leftIcon={<Icon name="arrow_downward" size="3xs" color="currentColor" />}
                    className="unooria-chat-panel__jump-button"
                  >
                    {scrollToEndLabel}
                  </Button>
                </div>
              )}
            </div>

            {footer && <div className="unooria-chat-panel__footer">{footer}</div>}
          </div>
        </div>
      </section>
    );
  }
);

ChatPanel.displayName = 'ChatPanel';

export default ChatPanel;
