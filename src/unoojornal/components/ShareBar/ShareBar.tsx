'use client';

import React from 'react';
import { useControllableState } from '../../hooks';
import { IconButton } from '../IconButton';
import type { UjnShareBarProps } from './ShareBar.types';
import './ShareBar.css';

/**
 * Componente ShareBar — Design System Unoojornal
 *
 * Linha de ações da matéria, cada uma um `IconButton` com rótulo acessível:
 * compartilhar, copiar o link, salvar para ler depois e imprimir. Salvar é um
 * botão de alternância (`aria-pressed`, glifo preenchido quando salva) e o
 * rótulo não muda com o estado. O grupo é um `role="group"` nomeado; passe
 * `aria-label` para trocar o nome.
 *
 * Marcado como Client Component porque guarda o estado de "salva" e repassa
 * os manipuladores aos botões.
 */
export const ShareBar = React.forwardRef<HTMLDivElement, UjnShareBarProps>(
  (
    {
      onShare,
      onCopyLink,
      onSave,
      saved,
      defaultSaved,
      onPrint,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [isSaved, setSaved] = useControllableState<boolean>({
      value: saved,
      defaultValue: defaultSaved ?? false,
      onChange: onSave,
    });

    const hasSave = onSave !== undefined || saved !== undefined || defaultSaved !== undefined;

    if (!onShare && !onCopyLink && !onPrint && !hasSave) {
      return null;
    }

    const classes = ['ujn-share-bar', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        data-ujn-theme={theme}
        className={classes}
        role="group"
        aria-label="Ações da matéria"
        {...restProps}
      >
        {onShare && (
          <IconButton
            icon="share"
            label="Compartilhar a matéria"
            variant="outline"
            onClick={onShare}
          />
        )}
        {onCopyLink && (
          <IconButton
            icon="link"
            label="Copiar link da matéria"
            variant="outline"
            onClick={onCopyLink}
          />
        )}
        {hasSave && (
          <IconButton
            icon={isSaved ? 'bookmarkFilled' : 'bookmark'}
            label="Salvar para ler depois"
            variant="outline"
            pressed={isSaved}
            onClick={() => setSaved(!isSaved)}
          />
        )}
        {onPrint && (
          <IconButton icon="print" label="Imprimir a matéria" variant="outline" onClick={onPrint} />
        )}
      </div>
    );
  }
);

ShareBar.displayName = 'ShareBar';
