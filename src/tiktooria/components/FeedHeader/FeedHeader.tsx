'use client';

import React from 'react';
import type { TikFeedHeaderProps, TikFeedTab } from './FeedHeader.types';
import './FeedHeader.css';

/**
 * Componente FeedHeader — Design System Tik Tooria
 *
 * Cabeçalho de 414×44 do feed imersivo (node 4:1116). A aba ativa é Semibold 18
 * com tracking de 0,1px em branco; a inativa é Semibold 16 em branco a 60% de
 * opacidade. O separador é um traço vertical de 11px em branco a 20%.
 *
 * O arquivo publica apenas o par "Following | For You"; ambos os rótulos são
 * configuráveis para localização.
 */
export const FeedHeader = React.forwardRef<HTMLElement, TikFeedHeaderProps>(
  (
    {
      active = 'forYou',
      followingLabel = 'Following',
      forYouLabel = 'For You',
      onSelect,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const renderTab = (tab: TikFeedTab, label: string) => (
      <button
        type="button"
        role="tab"
        aria-selected={active === tab}
        className={[
          'tik-feedheader__tab',
          active === tab ? 'tik-feedheader__tab--active' : 'tik-feedheader__tab--inactive',
        ].join(' ')}
        onClick={onSelect ? () => onSelect(tab) : undefined}
      >
        {label}
      </button>
    );

    return (
      <nav
        ref={ref}
        role="tablist"
        className={['tik-feedheader', className].filter(Boolean).join(' ')}
        {...restProps}
      >
        {renderTab('following', followingLabel)}
        <span className="tik-feedheader__divider" aria-hidden />
        {renderTab('forYou', forYouLabel)}
      </nav>
    );
  }
);

FeedHeader.displayName = 'FeedHeader';
