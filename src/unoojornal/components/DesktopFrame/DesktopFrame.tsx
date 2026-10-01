import React from 'react';
import { Icon } from '../Icon';
import type { UjnDesktopFrameProps } from './DesktopFrame.types';
import './DesktopFrame.css';

/** Altura da barra do navegador (espelha `--ujn-desktop-chrome-height`). */
const CHROME_HEIGHT = 40;

/**
 * Componente DesktopFrame — Design System Unoojornal
 *
 * Quadro de documentação: janela de navegador de 1440×1024px onde a página do
 * jornal roda. Tem a barra com três pontos de janela, o campo de endereço
 * (`url`) e a tela. Não imita nenhum navegador de mercado: usa as cores
 * invariantes do aparelho (`--ujn-color-device-chrome*`).
 *
 * A tela é o bloco de contenção das sobreposições (`position: relative` com
 * `transform`), como a do `PhoneFrame`: `Modal`, `BottomSheet` e `Toast` se
 * posicionam nela, e não na janela do Storybook. Com `scale`, o quadro encolhe
 * inteiro para caber na página de documentação. Contêiner de documentação, não
 * de produção.
 *
 * Server Component: só recebe props e renderiza.
 */
export const DesktopFrame = React.forwardRef<HTMLDivElement, UjnDesktopFrameProps>(
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
    const classes = ['ujn-desktop-frame', className].filter(Boolean).join(' ');

    const frameStyle = {
      '--ujn-desktop-frame-width': `${width}px`,
      '--ujn-desktop-frame-height': `${height}px`,
      ...(scale === 1 ? style : undefined),
    } as React.CSSProperties;

    const frame = (
      <div
        ref={scale === 1 ? ref : undefined}
        role={ariaLabel ? 'group' : undefined}
        aria-label={ariaLabel}
        data-ujn-theme={theme}
        className={classes}
        style={frameStyle}
        {...(scale === 1 ? restProps : {})}
      >
        <div className="ujn-desktop-frame__chrome">
          <span className="ujn-desktop-frame__dots" aria-hidden="true">
            <span className="ujn-desktop-frame__dot" />
            <span className="ujn-desktop-frame__dot" />
            <span className="ujn-desktop-frame__dot" />
          </span>
          {url && (
            <span className="ujn-desktop-frame__address">
              <Icon name="lock" size="xs" tone="inherit" />
              <span className="ujn-desktop-frame__url">{url}</span>
            </span>
          )}
        </div>

        <div className="ujn-desktop-frame__screen">
          <div className="ujn-desktop-frame__content">{children}</div>
        </div>
      </div>
    );

    if (scale === 1) {
      return frame;
    }

    return (
      <div
        ref={ref}
        className="ujn-desktop-frame-scaler"
        style={{ width: width * scale, height: (height + CHROME_HEIGHT) * scale, ...style }}
        {...restProps}
      >
        <div className="ujn-desktop-frame-scaler__inner" style={{ transform: `scale(${scale})` }}>
          {frame}
        </div>
      </div>
    );
  }
);

DesktopFrame.displayName = 'DesktopFrame';
