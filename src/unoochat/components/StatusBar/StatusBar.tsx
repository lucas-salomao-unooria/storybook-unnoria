import React from 'react';
import { Icon } from '../Icon';
import type { UncStatusBarProps } from './StatusBar.types';
import './StatusBar.css';

const SIGNAL_HEIGHTS = [5, 7, 9, 11];

/**
 * Componente StatusBar — Design System Unoochat
 *
 * Barra de status do Android: relógio, rede, sinal, bateria e indicadores do
 * sistema. Todos os glifos (alerta, silencioso e Android) vêm do registro de
 * ícones; a tipografia é `--unc-font-statusbar-*`.
 */
export const StatusBar = React.forwardRef<HTMLDivElement, UncStatusBarProps>(
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
    const classes = ['unc-statusbar', `unc-statusbar--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    const clampedLevel = Math.min(Math.max(batteryLevel, 0), 1);

    return (
      <div
        ref={ref}
        className={classes}
        style={{ height, ...style }}
        aria-hidden="true"
        {...restProps}
      >
        <div className="unc-statusbar__left">
          <span className="unc-statusbar__clock">{time}</span>
          {showAlert && <Icon name="sbAlert" size={16} tone="statusBar" />}
          {showSilent && <Icon name="sbSilent" size={16} tone="statusBar" />}
          {showAndroid && <Icon name="sbAndroid" size={16} tone="statusBar" />}
        </div>

        <div className="unc-statusbar__right">
          <span className="unc-statusbar__signal">
            {SIGNAL_HEIGHTS.map((barHeight, index) => (
              <span
                key={barHeight}
                className={[
                  'unc-statusbar__signal-bar',
                  index >= signalBars ? 'unc-statusbar__signal-bar--off' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ height: barHeight }}
              />
            ))}
          </span>

          <span className="unc-statusbar__network">{network}</span>

          <span className="unc-statusbar__battery">
            <span
              className="unc-statusbar__battery-fill"
              style={{ height: `${clampedLevel * 100}%` }}
            />
          </span>

          <span className="unc-statusbar__battery-label">{batteryLabel}</span>
        </div>
      </div>
    );
  }
);

StatusBar.displayName = 'StatusBar';
