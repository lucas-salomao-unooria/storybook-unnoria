import React from 'react';
import { Icon } from '../Icon';
import { Fab } from '../Fab';
import type { WaCallScreenProps } from './CallScreen.types';
import './CallScreen.css';

/**
 * Componente CallScreen — Design System WhatsApp Mobile
 *
 * Tela de chamada em curso. Reproduz o cabeçalho verde de 133px com o aviso de
 * criptografia, o nome em 30px e o estado em 19px; o retrato ao centro; o botão
 * de encerramento de 58px; e a barra de 87px com alto-falante, vídeo e
 * microfone nas cores exatas do arquivo (`--wa-color-call-icon` para ativo e
 * `--wa-color-call-icon-muted` para desabilitado).
 */
export const CallScreen = React.forwardRef<HTMLDivElement, WaCallScreenProps>(
  (
    {
      name,
      state = 'Calling',
      showEncryptionLabel = true,
      encryptionLabel = 'End-to-end encrypted',
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
      className={['wa-callscreen', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="wa-callscreen__header">
        {showEncryptionLabel && (
          <span className="wa-callscreen__encryption">
            <Icon name="lockAlt" size={13} tone="inherit" />
            {encryptionLabel}
          </span>
        )}
        <p className="wa-callscreen__name">{name}</p>
        <p className="wa-callscreen__state" role="status">
          {state}
        </p>
      </div>

      <div className="wa-callscreen__stage">
        {portraitSrc && (
          <img className="wa-callscreen__portrait" src={portraitSrc} alt={name} />
        )}
        <Fab
          className="wa-callscreen__endcall"
          variant="endCall"
          label={`Encerrar chamada com ${name}`}
          onClick={onEndCall}
        />
      </div>

      <div className="wa-callscreen__controls">
        <button
          type="button"
          className={[
            'wa-callscreen__control',
            speakerOn ? '' : 'wa-callscreen__control--off',
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
            'wa-callscreen__control',
            mode === 'video' ? '' : 'wa-callscreen__control--off',
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
          className={['wa-callscreen__control', muted ? 'wa-callscreen__control--off' : '']
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
