'use client';

import React from 'react';
import { StoryBubble } from '../StoryBubble';
import type { InstaStoriesTrayProps } from './StoriesTray.types';
import './StoriesTray.css';

/**
 * Componente StoriesTray — Design System Instanooria
 *
 * Faixa horizontal rolável exibida logo abaixo da barra superior do Feed.
 * Reproduz o frame "Stories" de 375×98px do Figma, incluindo o divisor hairline
 * na base e a rolagem sem barra visível característica do iOS.
 */
export const StoriesTray = React.forwardRef<HTMLDivElement, InstaStoriesTrayProps>(
  (
    {
      items = [],
      avatarSize = 56,
      bordered = true,
      ariaLabel = 'Stories',
      onSelect,
      theme = 'light',
      children,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-stories-tray',
      bordered ? 'insta-stories-tray--bordered' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        data-insta-theme={theme}
        className={classes}
        {...restProps}
      >
        {children ??
          items.map((item, index) => (
            <StoryBubble
              key={item.id}
              username={item.username}
              avatarSrc={item.avatarSrc}
              initials={item.initials}
              state={item.state}
              avatarSize={avatarSize}
              theme={theme}
              onClick={() => onSelect?.(item, index)}
            />
          ))}
      </div>
    );
  }
);

StoriesTray.displayName = 'StoriesTray';
