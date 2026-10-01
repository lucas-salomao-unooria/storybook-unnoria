'use client';

import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { UjnCorrectionNoteProps } from './CorrectionNote.types';
import './CorrectionNote.css';

/**
 * Componente CorrectionNote — Design System Unoojornal
 *
 * Nota ao fim da matéria: caixa em superfície sutil com filete à esquerda, glifo,
 * título e texto. A variante `contact` (padrão) usa o glifo de carta e o filete
 * na cor de ação; a `correction` usa o de alerta e a cor de atenção. A variante
 * nunca depende só da cor: o glifo e o título mudam junto. É um `<aside>` nomeado
 * pelo próprio título. Com `actionLabel` e `onAction`, mostra um botão
 * secundário.
 *
 * Marcado como Client Component porque liga o título ao `aria-labelledby` com
 * `useId` e repassa `onAction` ao botão.
 */
export const CorrectionNote = React.forwardRef<HTMLElement, UjnCorrectionNoteProps>(
  (
    {
      title = 'Correções e cartas',
      children,
      actionLabel,
      onAction,
      variant = 'contact',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const titleId = React.useId();
    const classes = ['ujn-correction-note', `ujn-correction-note--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <aside
        ref={ref}
        data-ujn-theme={theme}
        className={classes}
        aria-labelledby={titleId}
        {...restProps}
      >
        <span className="ujn-correction-note__icon">
          <Icon name={variant === 'correction' ? 'warning' : 'mail'} size="md" tone="inherit" />
        </span>
        <div className="ujn-correction-note__content">
          <p id={titleId} className="ujn-correction-note__title">
            {title}
          </p>
          <div className="ujn-correction-note__text">{children}</div>
          {actionLabel && onAction && (
            <div className="ujn-correction-note__action">
              <Button variant="secondary" size="md" iconStart="edit" onClick={onAction}>
                {actionLabel}
              </Button>
            </div>
          )}
        </div>
      </aside>
    );
  }
);

CorrectionNote.displayName = 'CorrectionNote';
