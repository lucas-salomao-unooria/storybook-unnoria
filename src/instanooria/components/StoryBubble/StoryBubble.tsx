import React from 'react';
import { Avatar } from '../Avatar';
import type { InstaAvatarBadge, InstaAvatarRing } from '../Avatar';
import type { InstaStoryBubbleProps, InstaStoryBubbleState } from './StoryBubble.types';
import './StoryBubble.css';

/**
 * Mapeamento entre o estado do story e a configuração do anel do avatar.
 */
const RING_BY_STATE: Record<InstaStoryBubbleState, InstaAvatarRing> = {
  unseen: 'story',
  seen: 'seen',
  live: 'live',
  add: 'seen',
};

/**
 * Mapeamento entre o estado do story e o selo sobreposto ao avatar.
 */
const BADGE_BY_STATE: Record<InstaStoryBubbleState, InstaAvatarBadge> = {
  unseen: 'none',
  seen: 'none',
  live: 'live',
  add: 'add',
};

/**
 * Componente StoryBubble — Design System Instanooria
 *
 * Célula individual da bandeja de stories, composta pelo avatar com anel e pelo
 * nome de usuário. Reproduz a célula de 64×83px do Figma, incluindo a etiqueta
 * LIVE ancorada na base do anel e o atalho "+" de novo destaque.
 */
export const StoryBubble = React.forwardRef<HTMLButtonElement, InstaStoryBubbleProps>(
  (
    {
      username,
      avatarSrc,
      initials,
      state = 'unseen',
      avatarSize = 56,
      liveLabel = 'LIVE',
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['insta-story-bubble', `insta-story-bubble--${state}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        data-insta-theme={theme}
        className={classes}
        {...restProps}
      >
        <Avatar
          src={state === 'add' ? undefined : avatarSrc}
          alt=""
          initials={state === 'add' ? undefined : initials}
          size={avatarSize}
          ring={RING_BY_STATE[state]}
          badge={BADGE_BY_STATE[state]}
          badgeLabel={liveLabel}
          theme={theme}
        />
        <span className="insta-story-bubble__label">{username}</span>
      </button>
    );
  }
);

StoryBubble.displayName = 'StoryBubble';
