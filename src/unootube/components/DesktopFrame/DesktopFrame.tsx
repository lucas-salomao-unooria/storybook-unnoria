import React from 'react';
import type { UniDesktopFrameProps } from './DesktopFrame.types';
import './DesktopFrame.css';

/**
 * Componente DesktopFrame — Design System Unootube
 *
 * Moldura de **documentação**, não de produção: reproduz o quadro de 1440×1024
 * em que o arquivo desenha as três telas, para que as estórias possam mostrar
 * uma composição na medida exata do Figma.
 *
 * Não deve ser usado em aplicação: em produto, o `TopBar`, a `Sidebar` e as
 * colunas se adaptam à janela real. É o mesmo papel que o `PhoneFrame` cumpre
 * nos módulos móveis da plataforma.
 */
export const DesktopFrame = React.forwardRef<HTMLDivElement, UniDesktopFrameProps>(
  ({ label, height = 1024, scale = 1, className = '', children, ...restProps }, ref) => (
    <figure
      className={['uni-desktop-frame', className].filter(Boolean).join(' ')}
      style={{
        width: `calc(var(--uni-desktop-width) * ${scale})`,
        height: `calc(${height}px * ${scale})`,
      }}
    >
      <div
        ref={ref}
        className="uni-desktop-frame__screen"
        style={{ height, transform: `scale(${scale})` }}
        {...restProps}
      >
        {children}
      </div>
      {label != null && <figcaption className="uni-desktop-frame__label">{label}</figcaption>}
    </figure>
  )
);

DesktopFrame.displayName = 'DesktopFrame';
