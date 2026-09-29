'use client';

import React from 'react';
import { StoryBubble } from '../StoryBubble';
import type { UnvStoriesTrayProps } from './StoriesTray.types';
import './StoriesTray.css';

/**
 * Componente StoriesTray — Design System Unoovista
 *
 * Faixa horizontal de histórias, logo abaixo da barra superior do feed. Rola
 * na horizontal com encaixe (`scroll-snap`), recuo lateral de `--unv-gutter` e
 * sem barra visível. Por padrão é um cartão em camada (superfície primária,
 * cantos arredondados, sem fio); com `bordered={false}` fica plana e
 * transparente — é assim que se fazem os destaques do perfil.
 */
export const StoriesTray = React.forwardRef<HTMLDivElement, UnvStoriesTrayProps>(
  (
    {
      items = [],
      avatarSize = 56,
      bordered = true,
      ariaLabel = 'Histórias',
      onSelect,
      theme,
      children,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unv-stories-tray',
      bordered ? 'unv-stories-tray--card' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        data-unv-theme={theme}
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
