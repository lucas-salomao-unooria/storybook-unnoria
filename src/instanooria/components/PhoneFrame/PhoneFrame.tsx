import React from 'react';
import { BatteryGlyph, MobileSignalGlyph, WifiGlyph } from './DeviceGlyphs';
import type { InstaPhoneFrameProps } from './PhoneFrame.types';
import './PhoneFrame.css';

/**
 * Componente PhoneFrame — Design System Instanooria
 *
 * Quadro de apresentação de 375×812px que replica as barras de sistema do
 * iPhone X presentes em todos os frames do Figma: a status bar de 44px com
 * horário, sinal, Wi-Fi e bateria, e o home indicator de 34px na base.
 * Serve como contêiner canônico para compor e documentar telas completas.
 */
export const PhoneFrame = React.forwardRef<HTMLDivElement, InstaPhoneFrameProps>(
  (
    {
      time = '9:41',
      withStatusBar = true,
      withHomeIndicator = true,
      framed = true,
      statusBarBackground,
      height = 812,
      ariaLabel,
      theme = 'light',
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-phone-frame',
      framed ? 'insta-phone-frame--framed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role={ariaLabel ? 'group' : undefined}
        aria-label={ariaLabel}
        data-insta-theme={theme}
        className={classes}
        style={{ height, ...style }}
        {...restProps}
      >
        {withStatusBar && (
          <div
            className="insta-phone-frame__status-bar"
            style={statusBarBackground ? { backgroundColor: statusBarBackground } : undefined}
          >
            <span className="insta-phone-frame__time">{time}</span>
            <span className="insta-phone-frame__indicators">
              <MobileSignalGlyph />
              <WifiGlyph />
              <BatteryGlyph className="insta-phone-frame__battery" />
            </span>
          </div>
        )}

        <div className="insta-phone-frame__screen">{children}</div>

        {withHomeIndicator && (
          <div className="insta-phone-frame__home-indicator" aria-hidden="true" />
        )}
      </div>
    );
  }
);

PhoneFrame.displayName = 'PhoneFrame';
