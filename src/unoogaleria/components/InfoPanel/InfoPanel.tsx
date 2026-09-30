'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UglIconName } from '../Icon';
import { SharePortrait } from '../ShareSheet/SharePortrait';
import {
  uglFormatBytes,
  uglFormatDateTime,
  uglFormatDuration,
  uglFormatDurationSpoken,
  uglFormatMegapixels,
  uglSubtypeLabels,
} from '../../media';
import type { UglInfoPanelProps } from './InfoPanel.types';
import './InfoPanel.css';

interface CaptionFieldProps {
  initial: string;
  placeholder: string;
  onSave: (text: string) => void;
}

/**
 * Campo da legenda. Não controlado (regra 4.5.1): quem guarda o texto é o DOM,
 * a partir de `item.description`. Salva no blur e no Enter, só quando o texto
 * mudou em relação ao último salvo. O painel o recria a cada mídia (`key`).
 */
const CaptionField: React.FC<CaptionFieldProps> = ({ initial, placeholder, onSave }) => {
  const lastSavedRef = React.useRef(initial);

  const save = (node: HTMLTextAreaElement) => {
    const text = node.value.trim();
    if (text === lastSavedRef.current) return;
    lastSavedRef.current = text;
    onSave(text);
  };

  return (
    <textarea
      className="ugl-info-panel__caption"
      defaultValue={initial}
      rows={1}
      placeholder={placeholder}
      aria-label="Legenda"
      enterKeyHint="done"
      onBlur={(event) => save(event.currentTarget)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
          event.preventDefault();
          save(event.currentTarget);
        }
      }}
    />
  );
};

interface InfoRowProps {
  icon: UglIconName;
  term: string;
  children: React.ReactNode;
}

/**
 * Uma linha do `<dl>`: termo (com o glifo decorativo DENTRO do `<dt>`, porque
 * um `<div>` de `<dl>` só aceita `<dt>` e `<dd>`) e valor.
 */
const InfoRow: React.FC<InfoRowProps> = ({ icon, term, children }) => (
  <div className="ugl-info-panel__row">
    <dt className="ugl-info-panel__term">
      <Icon name={icon} size="sm" tone="inherit" className="ugl-info-panel__row-icon" />
      {term}
    </dt>
    <dd className="ugl-info-panel__value">{children}</dd>
  </div>
);

/**
 * Componente InfoPanel — Design System Unoogaleria
 *
 * Informações de uma mídia: legenda editável, data e hora, câmera, resolução,
 * tamanho, nome do arquivo, duração do vídeo, tipo e subtipos, lugar (em
 * cartão, sem mapa), pessoas reconhecidas e álbuns. É conteúdo, não camada: o
 * produto o coloca dentro do `BottomSheet` (variante imersiva sobre o
 * visualizador).
 *
 * Os metadados formam uma lista de definição (`<dl>`); lugar, pessoas e álbuns
 * são seções com título. Toda data sai dos utilitários do módulo, no fuso
 * pedido. Seções sem dado não aparecem.
 */
export const InfoPanel = React.forwardRef<HTMLDivElement, UglInfoPanelProps>(
  (
    {
      item,
      people,
      albums,
      onDescriptionChange,
      onLocation,
      timeZone,
      descriptionPlaceholder = 'Adicionar uma legenda…',
      variant = 'default',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const headingId = React.useId();

    const itemPeople = (item.people ?? [])
      .map((id) => people?.find((person) => person.id === id))
      .filter((person): person is NonNullable<typeof person> => Boolean(person));

    const itemAlbums = (item.albumIds ?? [])
      .map((id) => albums?.find((album) => album.id === id))
      .filter((album): album is NonNullable<typeof album> => Boolean(album));

    const typeLabel = [
      item.type === 'video' ? 'Vídeo' : 'Foto',
      ...(item.subtypes ?? []).map((subtype) => uglSubtypeLabels[subtype]),
    ].join(' · ');

    const classes = ['ugl-info-panel', `ugl-info-panel--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
        {onDescriptionChange ? (
          <CaptionField
            key={item.id}
            initial={item.description ?? ''}
            placeholder={descriptionPlaceholder}
            onSave={onDescriptionChange}
          />
        ) : (
          item.description && <p className="ugl-info-panel__caption-text">{item.description}</p>
        )}

        <dl className="ugl-info-panel__list">
          <InfoRow icon="calendar" term="Data e hora">
            {uglFormatDateTime(item.takenAt, timeZone)}
          </InfoRow>
          <InfoRow icon={item.type === 'video' ? 'video' : 'photo'} term="Tipo">
            {typeLabel}
          </InfoRow>
          {item.type === 'video' && item.duration !== undefined && (
            <InfoRow icon="timer" term="Duração">
              <span aria-hidden="true">{uglFormatDuration(item.duration)}</span>
              <span className="ugl-info-panel__sr">{uglFormatDurationSpoken(item.duration)}</span>
            </InfoRow>
          )}
          {item.camera && (
            <InfoRow icon="camera" term="Câmera">
              {item.camera}
            </InfoRow>
          )}
          <InfoRow icon="aspectRatio" term="Resolução">
            {`${uglFormatMegapixels(item.width, item.height)} · ${item.width.toLocaleString(
              'pt-BR'
            )} × ${item.height.toLocaleString('pt-BR')}`}
          </InfoRow>
          {item.sizeBytes !== undefined && (
            <InfoRow icon="document" term="Tamanho">
              {uglFormatBytes(item.sizeBytes)}
            </InfoRow>
          )}
          {item.fileName && (
            <InfoRow icon="label" term="Nome do arquivo">
              {item.fileName}
            </InfoRow>
          )}
        </dl>

        {item.location && (
          <section className="ugl-info-panel__section" aria-labelledby={`${headingId}-place`}>
            <h3 id={`${headingId}-place`} className="ugl-info-panel__heading">
              Lugar
            </h3>
            {onLocation ? (
              <button
                type="button"
                className="ugl-info-panel__place ugl-info-panel__place--action"
                onClick={() => onLocation(item)}
              >
                <Icon name="location" size="md" tone="inherit" className="ugl-info-panel__place-icon" />
                <span className="ugl-info-panel__place-text">{item.location}</span>
                <Icon name="chevronRight" size="sm" tone="inherit" />
              </button>
            ) : (
              <div className="ugl-info-panel__place">
                <Icon name="location" size="md" tone="inherit" className="ugl-info-panel__place-icon" />
                <span className="ugl-info-panel__place-text">{item.location}</span>
              </div>
            )}
          </section>
        )}

        {itemPeople.length > 0 && (
          <section className="ugl-info-panel__section" aria-labelledby={`${headingId}-people`}>
            <h3 id={`${headingId}-people`} className="ugl-info-panel__heading">
              Pessoas
            </h3>
            <ul className="ugl-info-panel__people">
              {itemPeople.map((person) => (
                <li key={person.id} className="ugl-info-panel__person">
                  <SharePortrait person={person} size="md" />
                  <span className="ugl-info-panel__person-name">{person.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {itemAlbums.length > 0 && (
          <section className="ugl-info-panel__section" aria-labelledby={`${headingId}-albums`}>
            <h3 id={`${headingId}-albums`} className="ugl-info-panel__heading">
              Álbuns
            </h3>
            <ul className="ugl-info-panel__albums">
              {itemAlbums.map((album) => (
                <li key={album.id} className="ugl-info-panel__album">
                  <Icon name="albums" size="sm" tone="inherit" />
                  <span>{album.title}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }
);

InfoPanel.displayName = 'InfoPanel';
