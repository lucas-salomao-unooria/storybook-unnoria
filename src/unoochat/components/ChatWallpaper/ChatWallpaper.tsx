import React from 'react';
import type { UncChatWallpaperProps } from './ChatWallpaper.types';
import './ChatWallpaper.css';

/**
 * Componente ChatWallpaper — Design System Unoochat
 *
 * Superfície de fundo da conversa. A textura é uma imagem recebida via `src`
 * (um ladrilho de 320px, que se repete) — nada é embutido no pacote. Sem
 * textura, o fundo usa `--unc-color-surface-base`.
 */
export const ChatWallpaper = React.forwardRef<HTMLDivElement, UncChatWallpaperProps>(
  ({ src, children, className = '', style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['unc-chatwallpaper', className].filter(Boolean).join(' ')}
      style={{ ...(src ? { backgroundImage: `url(${src})` } : {}), ...style }}
      {...restProps}
    >
      <div className="unc-chatwallpaper__content">{children}</div>
    </div>
  )
);

ChatWallpaper.displayName = 'ChatWallpaper';
