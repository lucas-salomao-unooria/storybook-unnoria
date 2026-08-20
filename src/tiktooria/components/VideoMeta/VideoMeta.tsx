import React from 'react';
import { Icon } from '../Icon';
import type { TikVideoMetaProps } from './VideoMeta.types';
import './VideoMeta.css';

/**
 * Componente VideoMeta — Design System Tik Tooria
 *
 * Bloco de autoria, legenda e trilha sonora no canto inferior esquerdo do feed
 * (frames "Info" 4:1063 e "Music" 4:1090).
 *
 * A legenda separa dois pesos no mesmo parágrafo: o texto corrido em Regular a
 * 90% de opacidade e as hashtags em Semibold em branco cheio. O letreiro de
 * música usa `--tik-gradient-marquee` como máscara de texto, reproduzindo o
 * preenchimento em gradiente linear do nó 4:1092.
 */
export const VideoMeta = React.forwardRef<HTMLDivElement, TikVideoMetaProps>(
  ({ handle, caption, tags, music, className = '', ...restProps }, ref) => (
    <div ref={ref} className={['tik-videometa', className].filter(Boolean).join(' ')} {...restProps}>
      <p className="tik-videometa__handle">{handle}</p>

      {(caption || tags) && (
        <p className="tik-videometa__caption">
          {caption}
          {caption && tags ? ' ' : null}
          {tags && <span className="tik-videometa__tags">{tags}</span>}
        </p>
      )}

      {music && (
        <p className="tik-videometa__music">
          <Icon name="musicNote" size="xs" tone="onImmersive" />
          <span className="tik-videometa__marquee">{music}</span>
        </p>
      )}
    </div>
  )
);

VideoMeta.displayName = 'VideoMeta';
