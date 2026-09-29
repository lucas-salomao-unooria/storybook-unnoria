'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Fab } from '../Fab';
import type { UncCallScreenProps } from './CallScreen.types';
import './CallScreen.css';

/**
 * Componente CallScreen — Design System Unoochat
 *
 * Tela de chamada em curso. Reúne o cabeçalho de 133px com o aviso de
 * criptografia, o nome em `--unc-font-display-*` e o estado em
 * `--unc-font-subtitle-*`; o retrato ao centro; o botão de encerramento de
 * 58px; e a barra de 87px com alto-falante, vídeo e microfone
 * (`--unc-color-call-icon` para ativo e `--unc-color-call-icon-muted` para
 * desabilitado).
 */
export const CallScreen = React.forwardRef<HTMLDivElement, UncCallScreenProps>(
  (
    {
      name,
      state = 'Chamando',
      showEncryptionLabel = true,
      encryptionLabel = 'Criptografia de ponta a ponta',
      portraitSrc,
      mode = 'voice',
      speakerOn = false,
      muted = false,
      onToggleSpeaker,
      onToggleVideo,
      onToggleMute,
      onEndCall,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div
      ref={ref}
      role="region"
      aria-label={`Chamada com ${name}`}
      className={['unc-callscreen', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="unc-callscreen__header">
        {showEncryptionLabel && (
          <span className="unc-callscreen__encryption">
            <Icon name="lockAlt" size={14} tone="inherit" />
            {encryptionLabel}
          </span>
        )}
        <p className="unc-callscreen__name">{name}</p>
        <p className="unc-callscreen__state" role="status">
          {state}
        </p>
      </div>

      <div className="unc-callscreen__stage">
        {portraitSrc && (
          <img className="unc-callscreen__portrait" src={portraitSrc} alt={name} />
        )}
        <Fab
          className="unc-callscreen__endcall"
          variant="endCall"
          label={`Encerrar chamada com ${name}`}
          onClick={onEndCall}
        />
      </div>

      <div className="unc-callscreen__controls">
        <button
          type="button"
          className={[
            'unc-callscreen__control',
            speakerOn ? '' : 'unc-callscreen__control--off',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={onToggleSpeaker}
          aria-pressed={speakerOn}
          aria-label="Alto-falante"
        >
          <Icon name="soundUp" size={26} tone="inherit" />
        </button>

        <button
          type="button"
          className={[
            'unc-callscreen__control',
            mode === 'video' ? '' : 'unc-callscreen__control--off',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={onToggleVideo}
          aria-pressed={mode === 'video'}
          aria-label="Vídeo"
        >
          <Icon name="videoCallLarge" size={26} tone="inherit" />
        </button>

        <button
          type="button"
          className={['unc-callscreen__control', muted ? 'unc-callscreen__control--off' : '']
            .filter(Boolean)
            .join(' ')}
          onClick={onToggleMute}
          aria-pressed={muted}
          aria-label="Microfone"
        >
          <Icon name="mic" size={22} tone="inherit" />
        </button>
      </div>
    </div>
  )
);

CallScreen.displayName = 'CallScreen';
