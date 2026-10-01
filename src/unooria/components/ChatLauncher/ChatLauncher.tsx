'use client';

import React, { forwardRef, useId } from 'react';
import { AgentAvatar, AGENT_NAME } from '../AgentAvatar/AgentAvatar';
import { Badge } from '../Badge/Badge';
import type { ChatLauncherProps } from './ChatLauncher.types';
import './ChatLauncher.css';

/** O texto do selo para quem não o vê. */
const descreverSelo = (badge: number | true): string => {
  if (badge === true) return 'Resposta nova';
  return badge === 1 ? '1 resposta nova' : `${badge} respostas novas`;
};

/**
 * ChatLauncher — o botão que abre o agente de IA do professor (Plataforma Unooria).
 *
 * Um círculo de 64px com o mascote, fixo no canto da janela. É um botão de
 * abrir e fechar (padrão "disclosure"): `aria-expanded` diz o estado e
 * `aria-controls` aponta o painel. O nome é estável — "Agente de IA do
 * professor" —, e o selo entra pela DESCRIÇÃO (`aria-describedby`), para o
 * nome não mudar a cada resposta que chega.
 *
 * Não é um botão flutuante genérico: ele só existe para o agente, e por isso o
 * rosto é o do mascote, e não um glifo.
 */
export const ChatLauncher = forwardRef<HTMLButtonElement, ChatLauncherProps>(
  (
    {
      expanded = false,
      controls,
      label = AGENT_NAME,
      badge,
      badgeLabel,
      placement = 'bottom-right',
      theme = 'light',
      className = '',
      type = 'button',
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const seloId = useId();
    const temSelo = badge === true || (typeof badge === 'number' && badge > 0);
    const descricao = temSelo ? badgeLabel ?? descreverSelo(badge as number | true) : undefined;

    const classes = [
      'unooria-chat-launcher',
      `unooria-chat-launcher--${placement}`,
      theme === 'dark' ? 'unooria-chat-launcher--theme-dark' : '',
      expanded ? 'unooria-chat-launcher--expanded' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const descritoPor = [ariaDescribedBy, temSelo ? seloId : undefined].filter(Boolean).join(' ') || undefined;

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={classes}
        aria-label={label}
        aria-expanded={expanded}
        aria-controls={controls}
        aria-describedby={descritoPor}
        data-theme={theme}
      >
        <AgentAvatar size="md" decorative theme={theme} className="unooria-chat-launcher__avatar" />
        {temSelo && (
          <span className="unooria-chat-launcher__badge" aria-hidden="true">
            {badge === true ? (
              <Badge variant="error" size="dot" theme={theme} />
            ) : (
              <Badge variant="error" size="sm" count={badge as number} overflowCount={9} theme={theme} />
            )}
          </span>
        )}
        {descricao && (
          <span id={seloId} className="unooria-chat-launcher__sr-only">
            {descricao}
          </span>
        )}
      </button>
    );
  }
);

ChatLauncher.displayName = 'ChatLauncher';

export default ChatLauncher;
