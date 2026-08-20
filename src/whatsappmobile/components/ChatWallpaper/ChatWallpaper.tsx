import React from 'react';
import type { WaChatWallpaperProps } from './ChatWallpaper.types';
import './ChatWallpaper.css';

/**
 * Componente ChatWallpaper — Design System WhatsApp Mobile
 *
 * Superfície de fundo da conversa. A textura de rabiscos do arquivo é uma
 * imagem rasterizada; por isso é recebida via `src` em vez de reconstruída em
 * vetor. Sem textura, o fundo usa `--wa-color-surface-base`.
 */
export const ChatWallpaper = React.forwardRef<HTMLDivElement, WaChatWallpaperProps>(
  ({ src, children, className = '', style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['wa-chatwallpaper', className].filter(Boolean).join(' ')}
      style={{ ...(src ? { backgroundImage: `url(${src})` } : {}), ...style }}
      {...restProps}
    >
      <div className="wa-chatwallpaper__content">{children}</div>
    </div>
  )
);

ChatWallpaper.displayName = 'ChatWallpaper';
