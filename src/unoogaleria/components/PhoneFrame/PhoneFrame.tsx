import React from 'react';
import { Icon } from '../Icon';
import type { UglIconName } from '../Icon';
import type { UglPhoneFrameProps } from './PhoneFrame.types';
import './PhoneFrame.css';

/** Medidas externas do aparelho (tela de 390×844 mais o aro de 12px). */
const DEVICE_WIDTH = 414;
const DEVICE_HEIGHT = 868;
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;

const batteryGlyph = (level: number): UglIconName =>
  level >= 60 ? 'batteryHigh' : level >= 30 ? 'batteryMedium' : 'batteryLow';

/**
 * Componente PhoneFrame — Design System Unoogaleria
 *
 * Aparelho de 390×844px onde a galeria roda. Tem corpo, aro, botões laterais, a
 * ilha da câmera frontal, a barra de status (horário, sinal, conexão e bateria,
 * com os glifos da biblioteca de ícones) e a barra de gesto. Não imita nenhum
 * aparelho de mercado: é um aparelho genérico, nas cores invariantes do módulo.
 *
 * Duas coisas o tornam imersivo, e não só uma moldura:
 *
 * - **Áreas seguras.** A tela redefine `--ugl-safe-area-top` e
 *   `--ugl-safe-area-bottom`; as barras, as folhas e o visualizador as somam ao
 *   próprio recuo, de modo que o conteúdo corre por baixo da barra de status e
 *   da barra de gesto, como num aparelho real.
 * - **Cromo que acompanha a tela.** Quando algo imersivo abre dentro dela (o
 *   visualizador ou o editor declaram `data-ugl-immersive`), a barra de status e
 *   a barra de gesto passam a branco sozinhas — sem prop, sem estado.
 *
 * As sobreposições se posicionam na tela, e não na janela: a tela é o bloco de
 * contenção (`position: relative` com `transform`), então até um `position:
 * fixed` interno fica preso a ela.
 */
export const PhoneFrame = React.forwardRef<HTMLDivElement, UglPhoneFrameProps>(
  (
    {
      device = 'bezel',
      time = '9:41',
      battery = 82,
      statusBar = true,
      homeIndicator = true,
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
    const level = Math.max(0, Math.min(100, Math.round(battery)));
    const isBezel = device === 'bezel';
    const width = isBezel ? DEVICE_WIDTH : SCREEN_WIDTH;
    const height = isBezel ? DEVICE_HEIGHT : SCREEN_HEIGHT;

    const classes = ['ugl-phone-frame', `ugl-phone-frame--${device}`, className]
      .filter(Boolean)
      .join(' ');

    const frame = (
      <div
        ref={scale === 1 ? ref : undefined}
        role={ariaLabel ? 'group' : undefined}
        aria-label={ariaLabel}
        data-ugl-theme={theme}
        className={classes}
        style={scale === 1 ? style : undefined}
        {...(scale === 1 ? restProps : {})}
      >
        {isBezel && (
          <>
            <span className="ugl-phone-frame__button ugl-phone-frame__button--action" aria-hidden="true" />
            <span className="ugl-phone-frame__button ugl-phone-frame__button--volume-up" aria-hidden="true" />
            <span className="ugl-phone-frame__button ugl-phone-frame__button--volume-down" aria-hidden="true" />
            <span className="ugl-phone-frame__button ugl-phone-frame__button--power" aria-hidden="true" />
          </>
        )}

        <div
          className={[
            'ugl-phone-frame__screen',
            statusBar ? 'ugl-phone-frame__screen--status-bar' : '',
            homeIndicator ? 'ugl-phone-frame__screen--home-indicator' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="ugl-phone-frame__content">{children}</div>

          {statusBar && (
            <div className="ugl-phone-frame__status-bar">
              <span className="ugl-phone-frame__time">{time}</span>
              <span className="ugl-phone-frame__island" aria-hidden="true">
                <span className="ugl-phone-frame__lens" />
              </span>
              <span className="ugl-phone-frame__indicators">
                <Icon name="signal" size={18} tone="inherit" title="Sinal móvel" />
                <Icon name="wifi" size={18} tone="inherit" title="Conectado à rede sem fio" />
                <Icon name={batteryGlyph(level)} size={24} tone="inherit" title={`Bateria em ${level}%`} />
              </span>
            </div>
          )}

          {homeIndicator && <div className="ugl-phone-frame__home-indicator" aria-hidden="true" />}
        </div>
      </div>
    );

    if (scale === 1) {
      return frame;
    }

    return (
      <div
        ref={ref}
        className="ugl-phone-frame-scaler"
        style={{ width: width * scale, height: height * scale, ...style }}
        {...restProps}
      >
        <div className="ugl-phone-frame-scaler__inner" style={{ transform: `scale(${scale})` }}>
          {frame}
        </div>
      </div>
    );
  }
);

PhoneFrame.displayName = 'PhoneFrame';
