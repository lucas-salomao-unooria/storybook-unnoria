import React from 'react';
import { Icon } from '../Icon';
import type { UnvStoryBubbleProps, UnvStoryBubbleState } from './StoryBubble.types';
import './StoryBubble.css';

/**
 * Texto acessível de cada estado, somado ao nome no `aria-label` do botão
 * ("marina.luz, ao vivo"). O anel comunica o estado por cor e por espessura;
 * o texto, para quem não as vê.
 */
const STATUS_BY_STATE: Record<UnvStoryBubbleState, string> = {
  unseen: 'história nova',
  seen: 'história vista',
  live: 'ao vivo',
  add: 'adicionar história',
};

/**
 * Componente StoryBubble — Design System Unoovista
 *
 * Célula individual da bandeja de histórias: o avatar em formato "squircle"
 * (cantos de 32%) com anel, o nome abaixo e, conforme o estado, o selo LIVE na
 * base do anel ou o atalho "+" no canto. O formato squircle é, junto do
 * gradiente, o que distingue quem tem história ou transmissão: uma pista que
 * não depende de cor. O estado também é anunciado em texto.
 */
export const StoryBubble = React.forwardRef<HTMLButtonElement, UnvStoryBubbleProps>(
  (
    {
      username,
      avatarSrc,
      initials,
      state = 'unseen',
      avatarSize = 56,
      liveLabel = 'AO VIVO',
      statusLabel,
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['unv-story-bubble', `unv-story-bubble--${state}`, className]
      .filter(Boolean)
      .join(' ');

    const status = statusLabel ?? STATUS_BY_STATE[state];
    const hasMedia = Boolean(avatarSrc) || Boolean(initials);
    const frameStyle = { '--unv-story-bubble-size': `${avatarSize}px` } as React.CSSProperties;

    return (
      <button
        ref={ref}
        type="button"
        data-unv-theme={theme}
        className={classes}
        style={style}
        aria-label={status ? `${username}, ${status}` : undefined}
        {...restProps}
      >
        <span className="unv-story-bubble__frame" style={frameStyle}>
          <span className="unv-story-bubble__ring" aria-hidden="true">
            <span className="unv-story-bubble__gap">
              {avatarSrc ? (
                <img className="unv-story-bubble__media" src={avatarSrc} alt="" />
              ) : (
                <span
                  className={[
                    'unv-story-bubble__media',
                    'unv-story-bubble__media--fallback',
                    hasMedia ? '' : 'unv-story-bubble__media--empty',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {initials}
                </span>
              )}
            </span>
          </span>

          {state === 'live' && (
            <span className="unv-story-bubble__live" aria-hidden="true">
              {liveLabel}
            </span>
          )}
          {state === 'add' && (
            <span className="unv-story-bubble__add" aria-hidden="true">
              <Icon name="plus" size="sm" tone="inherit" />
            </span>
          )}
        </span>

        <span className="unv-story-bubble__label">{username}</span>
      </button>
    );
  }
);

StoryBubble.displayName = 'StoryBubble';
