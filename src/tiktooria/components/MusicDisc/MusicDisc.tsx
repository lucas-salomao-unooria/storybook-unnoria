import React from 'react';
import { Icon } from '../Icon';
import type { TikMusicDiscProps } from './MusicDisc.types';
import './MusicDisc.css';

/**
 * Componente MusicDisc — Design System Tik Tooria
 *
 * Disco de 49px no canto inferior direito do feed (frame "Disc", node 4:1066).
 * O preenchimento é o gradiente angular de quatro paradas do nó 4:1067,
 * tokenizado como `--tik-gradient-disc`; o miolo é o disco de 12,5px em
 * `--tik-color-accent-disc-note`.
 */
export const MusicDisc = React.forwardRef<HTMLDivElement, TikMusicDiscProps>(
  ({ size = 49, showTones = true, spinning = false, title, className = '', style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['tik-musicdisc', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...restProps}
    >
      {showTones && (
        <span className="tik-musicdisc__tones">
          <Icon name="floatingTones" size={68} tone="onImmersive" />
        </span>
      )}
      <span
        className={['tik-musicdisc__plate', spinning ? 'tik-musicdisc__plate--spinning' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <span className="tik-musicdisc__hub" />
      </span>
    </div>
  )
);

MusicDisc.displayName = 'MusicDisc';
