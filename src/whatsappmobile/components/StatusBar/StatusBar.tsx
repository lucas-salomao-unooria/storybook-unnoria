import React from 'react';
import { Icon } from '../Icon';
import type { WaStatusBarProps } from './StatusBar.types';
import './StatusBar.css';

const SIGNAL_HEIGHTS = [5, 7, 9, 11];

/**
 * Componente StatusBar — Design System WhatsApp Mobile
 *
 * Barra de status do Android reproduzida a partir dos nós 1:2133 a 1:2164 do
 * frame "Chats Main Page". Todos os glifos (alerta, silencioso e Android) vêm
 * do registro oficial de ícones exportado do Figma.
 */
export const StatusBar = React.forwardRef<HTMLDivElement, WaStatusBarProps>(
  (
    {
      time = '08:34',
      network = '4G',
      signalBars = 3,
      batteryLabel = '7%',
      batteryLevel = 0.54,
      showAlert = true,
      showSilent = true,
      showAndroid = true,
      variant = 'app',
      height = 21,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['wa-statusbar', `wa-statusbar--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const clampedLevel = Math.min(Math.max(batteryLevel, 0), 1);

    return (
      <div
        ref={ref}
        className={classes}
        style={{ height, ...style }}
        role="presentation"
        {...restProps}
      >
        <div className="wa-statusbar__left">
          <span className="wa-statusbar__clock">{time}</span>
          {showAlert && <Icon name="sbAlert" size={13} tone="statusBar" />}
          {showSilent && <Icon name="sbSilent" size={12} tone="statusBar" />}
          {showAndroid && <Icon name="sbAndroid" size={15} tone="statusBar" />}
        </div>

        <div className="wa-statusbar__right">
          <span className="wa-statusbar__signal">
            {SIGNAL_HEIGHTS.map((barHeight, index) => (
              <span
                key={barHeight}
                className={[
                  'wa-statusbar__signal-bar',
                  index >= signalBars ? 'wa-statusbar__signal-bar--off' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ height: barHeight }}
              />
            ))}
          </span>

          <span className="wa-statusbar__network">{network}</span>

          <span className="wa-statusbar__battery">
            <span
              className="wa-statusbar__battery-fill"
              style={{ height: `${clampedLevel * 100}%` }}
            />
          </span>

          <span className="wa-statusbar__battery-label">{batteryLabel}</span>
        </div>
      </div>
    );
  }
);

StatusBar.displayName = 'StatusBar';
