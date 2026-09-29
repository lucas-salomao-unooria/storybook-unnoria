import React from 'react';
import { BatteryGlyph, MobileSignalGlyph, WifiGlyph } from './DeviceGlyphs';
import type { UnvPhoneFrameProps } from './PhoneFrame.types';
import './PhoneFrame.css';

/**
 * Componente PhoneFrame — Design System Unoovista
 *
 * Quadro de apresentação de 375×812px com um cromo de sistema genérico: a
 * barra de status de 44px (horário, sinal, conexão e bateria) e a barra de
 * gesto de 34px na base. Não imita nenhum aparelho. É um contêiner de
 * documentação, não de produção: serve para compor e apresentar telas inteiras.
 */
export const PhoneFrame = React.forwardRef<HTMLDivElement, UnvPhoneFrameProps>(
  (
    {
      time = '9:41',
      withStatusBar = true,
      withHomeIndicator = true,
      framed = true,
      statusBarBackground,
      height = 812,
      ariaLabel,
      theme,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unv-phone-frame',
      framed ? 'unv-phone-frame--framed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={ariaLabel ? 'group' : undefined}
        aria-label={ariaLabel}
        data-unv-theme={theme}
        className={classes}
        style={{ height, ...style }}
        {...restProps}
      >
        {withStatusBar && (
          <div
            className="unv-phone-frame__status-bar"
            style={statusBarBackground ? { backgroundColor: statusBarBackground } : undefined}
          >
            <span className="unv-phone-frame__time">{time}</span>
            <span className="unv-phone-frame__indicators">
              <MobileSignalGlyph />
              <WifiGlyph />
              <BatteryGlyph />
            </span>
          </div>
        )}

        <div className="unv-phone-frame__screen">{children}</div>

        {withHomeIndicator && (
          <div className="unv-phone-frame__gesture-bar" aria-hidden="true" />
        )}
      </div>
    );
  }
);

PhoneFrame.displayName = 'PhoneFrame';
