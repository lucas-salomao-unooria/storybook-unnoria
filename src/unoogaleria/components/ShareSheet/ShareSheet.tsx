'use client';

import React from 'react';
import { BottomSheet } from '../BottomSheet';
import { Icon } from '../Icon';
import {
  uglEditToFilter,
  uglEditToTransform,
  uglFormatCount,
  uglFormatDuration,
} from '../../media';
import { uglDefaultShareActions } from './ShareSheet.actions';
import { SharePortrait } from './SharePortrait';
import type { UglShareSheetProps } from './ShareSheet.types';
import './ShareSheet.css';

/**
 * Componente ShareSheet — Design System Unoogaleria
 *
 * Folha de compartilhamento, montada sobre o `BottomSheet` do módulo: a tira de
 * prévia das mídias escolhidas com a contagem no cabeçalho ("3 fotos, 1
 * vídeo"), a linha de contatos sugeridos (retrato e nome, "Enviar para Ana") e
 * a lista de ações em cartão, com o glifo à direita.
 *
 * Herda da folha a camada na tela, o foco preso, o Esc e o foco devolvido. A
 * folha não fecha sozinha ao tocar num contato ou numa ação: o produto decide
 * se a ação conclui (Copiar link) ou abre outra camada (Adicionar a um álbum).
 */
export const ShareSheet = React.forwardRef<HTMLDivElement, UglShareSheetProps>(
  (
    {
      open,
      onClose,
      items,
      contacts,
      actions = uglDefaultShareActions,
      onContact,
      onAction,
      title = 'Compartilhar',
      closeLabel,
      height = 'auto',
      variant = 'default',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <BottomSheet
      ref={ref}
      open={open}
      onClose={onClose}
      title={title}
      description={uglFormatCount(items)}
      closeLabel={closeLabel}
      height={height}
      variant={variant}
      theme={theme}
      className={['ugl-share-sheet', `ugl-share-sheet--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {items.length > 0 && (
        <ul className="ugl-share-sheet__preview" aria-label="Itens a compartilhar">
          {items.map((item) => (
            <li key={item.id} className="ugl-share-sheet__thumb">
              <img
                className="ugl-share-sheet__thumb-image"
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={{
                  filter: uglEditToFilter(item.edit),
                  transform: uglEditToTransform(item.edit),
                }}
              />
              {item.type === 'video' && (
                <span className="ugl-share-sheet__thumb-badge">
                  <Icon name="video" size="xs" tone="on-media" title="Vídeo" />
                  {item.duration !== undefined && (
                    <span aria-hidden="true">{uglFormatDuration(item.duration)}</span>
                  )}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {contacts && contacts.length > 0 && (
        <ul className="ugl-share-sheet__contacts" aria-label="Enviar para">
          {contacts.map((person) => (
            <li key={person.id}>
              <button
                type="button"
                className="ugl-share-sheet__contact"
                aria-label={`Enviar para ${person.name}`}
                onClick={() => onContact?.(person)}
              >
                <SharePortrait person={person} size="lg" />
                <span className="ugl-share-sheet__contact-name">{person.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {actions.length > 0 && (
        <ul className="ugl-share-sheet__actions" aria-label="Ações">
          {actions.map((action) => (
            <li key={action.id} className="ugl-share-sheet__action-item">
              <button
                type="button"
                className="ugl-share-sheet__action"
                onClick={() => onAction?.(action.id)}
              >
                <span className="ugl-share-sheet__action-label">{action.label}</span>
                <Icon name={action.icon} size="md" tone="inherit" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </BottomSheet>
  )
);

ShareSheet.displayName = 'ShareSheet';
