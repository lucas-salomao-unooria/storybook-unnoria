'use client';

import React from 'react';
import { IconButton } from '../IconButton';
import type { UblShareBarProps } from './ShareBar.types';
import './ShareBar.css';

/**
 * Componente ShareBar — Design System Unooblog
 *
 * Ações de compartilhamento do post, cada uma um `IconButton` com rótulo
 * acessível: compartilhar e copiar o link. Em linha (`horizontal`) ou em coluna
 * fixa ao lado da leitura (`vertical`, `position: sticky` abaixo do cabeçalho
 * do site). O grupo é um `role="group"` nomeado; passe `aria-label` para
 * trocar o nome.
 *
 * Client Component: repassa os manipuladores aos botões.
 */
export const ShareBar = React.forwardRef<HTMLDivElement, UblShareBarProps>(
  (
    { onShare, onCopyLink, orientation = 'horizontal', theme, className = '', ...restProps },
    ref
  ) => {
    if (!onShare && !onCopyLink) {
      return null;
    }

    const classes = ['ubl-share-bar', `ubl-share-bar--${orientation}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        role="group"
        aria-label="Ações de compartilhamento"
        {...restProps}
      >
        {onShare && (
          <IconButton icon="share" label="Compartilhar o post" variant="outline" onClick={onShare} />
        )}
        {onCopyLink && (
          <IconButton icon="link" label="Copiar link do post" variant="outline" onClick={onCopyLink} />
        )}
      </div>
    );
  }
);

ShareBar.displayName = 'ShareBar';
