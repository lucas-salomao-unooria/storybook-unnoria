'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { InstaDirectThreadProps } from './DirectThread.types';
import './DirectThread.css';

/**
 * `useLayoutEffect` no navegador, `useEffect` no servidor — onde nenhum dos
 * dois roda, mas o primeiro emitia aviso no React 18.
 */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

/** Distância do fim, em px, abaixo da qual a rolagem segue a última mensagem. */
const STICK_THRESHOLD = 48;

/**
 * Componente DirectThread — Design System Instanooria
 *
 * A conversa de DM aberta, como no app real: barra com voltar, avatar, nome de
 * usuário e subtítulo; a área de mensagens rolável; e um rodapé fixo. Extensão
 * sem quadro no arquivo de origem, que só publica a lista de conversas
 * (`0:768` / `0:2482`) — dela vêm a superfície e a hairline da barra (`0:2629`),
 * o `Title/Large` do nome, o avatar de 32px do post e a faixa de 79px da barra
 * "Camera" (`0:2614`), que o rodapé reproduz.
 *
 * Enquanto a pessoa estiver no fim da conversa, mensagem nova rola para a
 * vista; se ela subiu para reler, a rolagem não a arranca de lá.
 */
export const DirectThread = React.forwardRef<HTMLElement, InstaDirectThreadProps>(
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
      theme = 'light',
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
        data-insta-theme={theme}
        className={['insta-direct-thread', className].filter(Boolean).join(' ')}
        {...restProps}
      >
        <header className="insta-direct-thread__header">
          {withStatusBarInset && (
            <div className="insta-direct-thread__status-inset" aria-hidden="true" />
          )}
          <div className="insta-direct-thread__bar">
            {onBack && (
              <button
                type="button"
                className="insta-direct-thread__back"
                onClick={onBack}
                aria-label={backLabel}
              >
                <Icon name="back" size={18} tone="inherit" theme={theme} />
              </button>
            )}
            <Avatar src={avatarSrc} alt="" size="md" theme={theme} />
            <div className="insta-direct-thread__identity">
              <h2 className="insta-direct-thread__username">{username}</h2>
              {subtitle && <p className="insta-direct-thread__subtitle">{subtitle}</p>}
            </div>
          </div>
        </header>

        <div
          ref={messagesRef}
          role="log"
          aria-label="Mensagens"
          tabIndex={0}
          className="insta-direct-thread__messages"
          onScroll={handleScroll}
        >
          {children}
        </div>

        {footer && <div className="insta-direct-thread__footer">{footer}</div>}
        {withHomeIndicatorInset && (
          <div className="insta-direct-thread__home-inset" aria-hidden="true" />
        )}
      </section>
    );
  }
);

DirectThread.displayName = 'DirectThread';
