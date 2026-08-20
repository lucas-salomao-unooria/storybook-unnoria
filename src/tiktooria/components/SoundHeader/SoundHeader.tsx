import React from 'react';
import { Icon } from '../Icon';
import type { TikSoundHeaderProps } from './SoundHeader.types';
import './SoundHeader.css';

/**
 * Componente SoundHeader — Design System Tik Tooria
 *
 * Cabeçalho de 414×265 da tela "TikTok Album" (node 4:806): barra de navegação,
 * capa de 120px com o glifo de reprodução, título em Semibold 20, autor e
 * contagem em Regular 13, e a faixa de ação.
 *
 * O fio inferior é `--tik-elevation-bar-bottom-outline` (`#E3E3E4`) — este
 * cabeçalho é o único do arquivo que usa esse tom em vez de `#D0D1D3`.
 */
export const SoundHeader = React.forwardRef<HTMLElement, TikSoundHeaderProps>(
  (
    {
      title,
      artist,
      videoCount,
      coverSrc,
      coverAlt = '',
      action,
      onBack,
      onShare,
      onPlay,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <header
      ref={ref}
      className={['tik-soundheader', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="tik-soundheader__bar">
        <button type="button" className="tik-soundheader__icon" onClick={onBack} aria-label="Voltar">
          <Icon name="arrowBack" size={18} tone="primary" />
        </button>
        <button
          type="button"
          className="tik-soundheader__icon"
          onClick={onShare}
          aria-label="Compartilhar som"
        >
          <Icon name="share" size={18.6} tone="primary" />
        </button>
      </div>

      <div className="tik-soundheader__content">
        <button
          type="button"
          className="tik-soundheader__cover"
          onClick={onPlay}
          aria-label="Reproduzir som"
        >
          {coverSrc && <img className="tik-soundheader__coverimage" src={coverSrc} alt={coverAlt} />}
          <span className="tik-soundheader__play">
            <Icon name="play" size={24.4} tone="onImmersive" />
          </span>
        </button>

        <div className="tik-soundheader__meta">
          <h1 className="tik-soundheader__title">{title}</h1>
          {artist && <p className="tik-soundheader__artist">{artist}</p>}
          {videoCount && <p className="tik-soundheader__count">{videoCount}</p>}
          {action && <div className="tik-soundheader__action">{action}</div>}
        </div>
      </div>
    </header>
  )
);

SoundHeader.displayName = 'SoundHeader';
