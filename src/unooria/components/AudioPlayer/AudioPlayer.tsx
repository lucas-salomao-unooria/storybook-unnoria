'use client';

import React, { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import type { AudioPlayerProps } from './AudioPlayer.types';
import './AudioPlayer.css';

/** "3:45" — minutos sem zero à esquerda, segundos com dois dígitos. */
const relogio = (segundos: number): string => {
  if (!Number.isFinite(segundos) || segundos < 0) return '--:--';
  const inteiro = Math.floor(segundos);
  return `${Math.floor(inteiro / 60)}:${String(inteiro % 60).padStart(2, '0')}`;
};

/** "3 min 45 s" — o mesmo tempo, dito por extenso para o leitor de tela. */
const porExtenso = (segundos: number): string => {
  if (!Number.isFinite(segundos) || segundos < 0) return 'duração desconhecida';
  const inteiro = Math.floor(segundos);
  const minutos = Math.floor(inteiro / 60);
  const resto = inteiro % 60;
  if (minutos === 0) return `${resto} s`;
  return resto === 0 ? `${minutos} min` : `${minutos} min ${resto} s`;
};

/**
 * Componente AudioPlayer — Plataforma Unooria
 *
 * O player de um áudio longo: o botão Ouvir/Pausar do próprio pacote (rótulo
 * visível, não só ícone), a barra de posição que se arrasta e o tempo
 * "decorrido / total". Design próprio — a seção não tem quadro de áudio no
 * Figma; as medidas são as do `Button` e da `ProgressBar` do pacote.
 *
 * O `<audio>` nativo fica SEM `controls`: quem toca, pausa e busca são os
 * controles daqui, e o elemento é só a fonte. Sem `src`, ou com
 * `unavailableReason`, o botão fica desabilitado e o motivo aparece no lugar
 * da barra — o player não some.
 */
export const AudioPlayer = forwardRef<HTMLDivElement, AudioPlayerProps>(
  (
    {
      src,
      title,
      description,
      unavailableReason,
      preload = 'metadata',
      playLabel = 'Ouvir',
      pauseLabel = 'Pausar',
      seekLabel = 'Posição no áudio',
      errorLabel = 'Não foi possível carregar o áudio.',
      retryLabel = 'Tentar de novo',
      onPlay,
      onPause,
      onEnded,
      onError,
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const tituloId = useId();
    const [tocando, setTocando] = useState(false);
    const [posicao, setPosicao] = useState(0);
    const [duracao, setDuracao] = useState(Number.NaN);
    const [falhou, setFalhou] = useState(false);

    const semFonte = src === undefined || src === '';
    const indisponivel = semFonte || (unavailableReason !== undefined && unavailableReason !== null);

    // Trocar de arquivo recomeça do zero: posição, duração e erro são do anterior.
    useEffect(() => {
      setTocando(false);
      setPosicao(0);
      setDuracao(Number.NaN);
      setFalhou(false);
    }, [src]);

    const alternar = useCallback(() => {
      const audio = audioRef.current;
      if (!audio || indisponivel || falhou) return;
      if (audio.paused) {
        // `play()` recusa sem gesto confiável ou sem fonte: o estado volta a "parado".
        audio.play().catch(() => setTocando(false));
      } else {
        audio.pause();
      }
    }, [indisponivel, falhou]);

    const buscar = (evento: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;
      const alvo = Number(evento.target.value);
      if (!audio || !Number.isFinite(alvo)) return;
      audio.currentTime = alvo;
      setPosicao(alvo);
    };

    const tentarDeNovo = () => {
      setFalhou(false);
      audioRef.current?.load();
    };

    const temDuracao = Number.isFinite(duracao) && duracao > 0;
    const progresso = temDuracao ? Math.min(100, (posicao / duracao) * 100) : 0;

    const classes = [
      'unooria-audio-player',
      theme === 'dark' ? 'unooria-audio-player--theme-dark' : '',
      indisponivel ? 'unooria-audio-player--unavailable' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} role="group" aria-labelledby={tituloId} className={classes} {...rest}>
        <div className="unooria-audio-player__header">
          <p id={tituloId} className="unooria-audio-player__title">
            {title}
          </p>
          {description && <p className="unooria-audio-player__description">{description}</p>}
        </div>

        <div className="unooria-audio-player__controls">
          <Button
            variant="primary"
            size="md"
            theme={theme}
            isDisabled={indisponivel || falhou}
            onClick={alternar}
            leftIcon={<Icon name={tocando ? 'pause' : 'play_arrow'} size="xs" color="currentColor" />}
          >
            {tocando ? pauseLabel : playLabel}
          </Button>

          {indisponivel ? (
            <p className="unooria-audio-player__reason">{unavailableReason}</p>
          ) : falhou ? (
            <div className="unooria-audio-player__error" role="alert">
              <p className="unooria-audio-player__error-label">{errorLabel}</p>
              <Button variant="outline" size="sm" theme={theme} onClick={tentarDeNovo}>
                {retryLabel}
              </Button>
            </div>
          ) : (
            <div className="unooria-audio-player__timeline">
              <input
                type="range"
                className="unooria-audio-player__seek"
                aria-label={seekLabel}
                aria-valuetext={`${porExtenso(posicao)} de ${porExtenso(duracao)}`}
                min={0}
                max={temDuracao ? Math.floor(duracao) : 0}
                step={1}
                value={Math.floor(posicao)}
                disabled={!temDuracao}
                onChange={buscar}
                style={{ '--unooria-audio-progress': `${progresso}%` } as React.CSSProperties}
              />
              <span className="unooria-audio-player__time" aria-hidden="true">
                {relogio(posicao)} / {relogio(duracao)}
              </span>
            </div>
          )}
        </div>

        {!semFonte && (
          <audio
            ref={audioRef}
            src={src}
            preload={preload}
            onLoadedMetadata={(e) => setDuracao(e.currentTarget.duration)}
            onDurationChange={(e) => setDuracao(e.currentTarget.duration)}
            onTimeUpdate={(e) => setPosicao(e.currentTarget.currentTime)}
            onPlay={() => {
              setTocando(true);
              onPlay?.();
            }}
            onPause={() => {
              setTocando(false);
              onPause?.();
            }}
            onEnded={() => {
              setTocando(false);
              onEnded?.();
            }}
            onError={() => {
              setTocando(false);
              setFalhou(true);
              onError?.();
            }}
          />
        )}
      </div>
    );
  }
);

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
