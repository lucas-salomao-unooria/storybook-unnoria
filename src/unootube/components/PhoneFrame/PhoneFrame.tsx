import React from 'react';
import type { UniPhoneFrameProps } from './PhoneFrame.types';
import './PhoneFrame.css';

/**
 * Componente PhoneFrame — Design System Unootube
 *
 * Contêiner **de documentação**, não de produção: reproduz o quadro de
 * dispositivo em que o arquivo "Free YouTube Shorts Mockups (Community)"
 * desenha as telas móveis — 390×844 no iPhone e 360×800 no Android — para que
 * as estórias mostrem as composições na medida real.
 *
 * Cumpre no módulo móvel o mesmo papel que o `DesktopFrame` cumpre nas telas de
 * 1440px. Nenhum componente de produção depende dele.
 */
export const PhoneFrame = React.forwardRef<HTMLDivElement, UniPhoneFrameProps>(
  (
    { device = 'iphone', surface = 'primary', scale = 1, children, className = '', style, ...restProps },
    ref
  ) => (
    <div
      ref={ref}
      className={[
        'uni-phone-frame',
        `uni-phone-frame--${device}`,
        `uni-phone-frame--${surface}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        scale === 1
          ? style
          : ({ transform: `scale(${scale})`, transformOrigin: 'top left', ...style } as React.CSSProperties)
      }
      {...restProps}
    >
      {children}
    </div>
  )
);

PhoneFrame.displayName = 'PhoneFrame';
