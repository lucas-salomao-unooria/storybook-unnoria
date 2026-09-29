'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UnvDirectThreadProps } from './DirectThread.types';
import './DirectThread.css';

/**
 * `useLayoutEffect` no navegador, `useEffect` no servidor — onde nenhum dos
 * dois roda, mas o primeiro emitia aviso no React 18.
 */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

/** Distância do fim, em px, abaixo da qual a rolagem segue a última mensagem. */
const STICK_THRESHOLD = 48;

/**
 * Componente DirectThread — Design System Unoovista
 *
 * A conversa aberta, em camadas: a tela em `--unv-color-background-secondary`,
 * o cabeçalho num cartão em `background-primary` (voltar, avatar, nome e
 * estado), a área de mensagens rolável e o compositor numa cápsula. Extensão do
 * módulo, sem par na Plataforma Unooria.
 *
 * Enquanto a pessoa estiver no fim da conversa, mensagem nova rola para a
 * vista; se ela subiu para reler, a rolagem não a arranca de lá.
 */
export const DirectThread = React.forwardRef<HTMLElement, UnvDirectThreadProps>(
  (
    {
      username,
      avatarSrc,
      subtitle,
      onBack,
      backLabel = 'Voltar',
      children,
      footer,
      withStatusBarInset = true,
      withHomeIndicatorInset = true,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const messagesRef = React.useRef<HTMLDivElement | null>(null);
    const stickToEndRef = React.useRef(true);

    const handleScroll = () => {
      const element = messagesRef.current;
      if (!element) {
        return;
      }
      stickToEndRef.current =
        element.scrollHeight - element.scrollTop - element.clientHeight < STICK_THRESHOLD;
    };

    useIsomorphicLayoutEffect(() => {
      const element = messagesRef.current;
      if (element && stickToEndRef.current) {
        element.scrollTop = element.scrollHeight;
      }
    }, [children]);

    return (
      <section
        ref={ref}
        aria-label={`Conversa com ${username}`}
        data-unv-theme={theme}
        className={['unv-direct-thread', className].filter(Boolean).join(' ')}
        {...restProps}
      >
        <header className="unv-direct-thread__header">
          {withStatusBarInset && (
            <div className="unv-direct-thread__status-inset" aria-hidden="true" />
          )}
          <div className="unv-direct-thread__card">
            {onBack && (
              <button
                type="button"
                className="unv-direct-thread__back"
                onClick={onBack}
                aria-label={backLabel}
              >
                <Icon name="back" size="md" tone="inherit" theme={theme} />
              </button>
            )}
            <Avatar src={avatarSrc} alt="" size="md" theme={theme} />
            <div className="unv-direct-thread__identity">
              <h2 className="unv-direct-thread__username">{username}</h2>
              {subtitle && <p className="unv-direct-thread__subtitle">{subtitle}</p>}
            </div>
          </div>
        </header>

        <div
          ref={messagesRef}
          role="log"
          aria-label="Mensagens"
          tabIndex={0}
          className="unv-direct-thread__messages"
          onScroll={handleScroll}
        >
          {children}
        </div>

        {footer && <div className="unv-direct-thread__footer">{footer}</div>}
        {withHomeIndicatorInset && (
          <div className="unv-direct-thread__home-inset" aria-hidden="true" />
        )}
      </section>
    );
  }
);

DirectThread.displayName = 'DirectThread';
