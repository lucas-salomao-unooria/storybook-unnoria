import React from 'react';
import { Icon } from '../Icon';
import type { UblDesktopFrameProps } from './DesktopFrame.types';
import './DesktopFrame.css';

/** Altura da barra do navegador (espelha `--ubl-desktop-chrome-height`). */
const CHROME_HEIGHT = 40;

/**
 * Componente DesktopFrame — Design System Unooblog
 *
 * Quadro de documentação: janela de navegador de 1440×1024px onde a página do
 * blog roda. Tem a barra com três pontos de janela, o campo de endereço
 * (`url`) e a tela. Não imita nenhum navegador de mercado: usa as cores
 * invariantes do aparelho (`--ubl-color-device-chrome*`).
 *
 * A tela é o bloco de contenção das sobreposições (`position: relative` com
 * `transform`), como a do `PhoneFrame`: `Modal`, `BottomSheet` e `Toast` se
 * posicionam nela, e não na janela do Storybook. Com `scale`, o quadro encolhe
 * inteiro para caber na página de documentação. Contêiner de documentação, não
 * de produção.
 *
 * Server Component: só recebe props e renderiza.
 */
export const DesktopFrame = React.forwardRef<HTMLDivElement, UblDesktopFrameProps>(
  (
    {
      url,
      width = 1440,
      height = 1024,
      scale = 1,
      ariaLabel,
      theme,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['ubl-desktop-frame', className].filter(Boolean).join(' ');

    const frameStyle = {
      '--ubl-desktop-frame-width': `${width}px`,
      '--ubl-desktop-frame-height': `${height}px`,
      ...(scale === 1 ? style : undefined),
    } as React.CSSProperties;

    const frame = (
      <div
        ref={scale === 1 ? ref : undefined}
        role={ariaLabel ? 'group' : undefined}
        aria-label={ariaLabel}
        data-ubl-theme={theme}
        className={classes}
        style={frameStyle}
        {...(scale === 1 ? restProps : {})}
      >
        <div className="ubl-desktop-frame__chrome">
          <span className="ubl-desktop-frame__dots" aria-hidden="true">
            <span className="ubl-desktop-frame__dot" />
            <span className="ubl-desktop-frame__dot" />
            <span className="ubl-desktop-frame__dot" />
          </span>
          {url && (
            <span className="ubl-desktop-frame__address">
              <Icon name="lock" size="xs" tone="inherit" />
              <span className="ubl-desktop-frame__url">{url}</span>
            </span>
          )}
        </div>

        <div className="ubl-desktop-frame__screen">
          <div className="ubl-desktop-frame__content">{children}</div>
        </div>
      </div>
    );

    if (scale === 1) {
      return frame;
    }

    return (
      <div
        ref={ref}
        className="ubl-desktop-frame-scaler"
        style={{ width: width * scale, height: (height + CHROME_HEIGHT) * scale, ...style }}
        {...restProps}
      >
        <div className="ubl-desktop-frame-scaler__inner" style={{ transform: `scale(${scale})` }}>
          {frame}
        </div>
      </div>
    );
  }
);

DesktopFrame.displayName = 'DesktopFrame';
