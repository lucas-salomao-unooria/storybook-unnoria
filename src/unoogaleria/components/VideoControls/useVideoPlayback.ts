'use client';

import React from 'react';

/**
 * Estado observável e comandos de um `<video>` real.
 */
export interface UglVideoPlayback {
  /** `true` enquanto o vídeo avança */
  playing: boolean;
  /** Posição atual, em segundos */
  currentTime: number;
  /** Duração total, em segundos (`0` enquanto os metadados não chegaram) */
  duration: number;
  /** Áudio silenciado */
  muted: boolean;
  /** Fração carregada, de 0 a 1 */
  buffered: number;
  /** A reprodução chegou ao fim */
  ended: boolean;
  /** Inicia a reprodução. Silencioso se o navegador recusar */
  play: () => void;
  /** Pausa a reprodução */
  pause: () => void;
  /** Alterna entre reproduzir e pausar; no fim, recomeça do início */
  togglePlay: () => void;
  /** Posiciona a reprodução no segundo informado (limitado à duração) */
  seek: (seconds: number) => void;
  /** Alterna o mudo */
  toggleMute: () => void;
}

interface Snapshot {
  key: unknown;
  playing: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
  buffered: number;
  ended: boolean;
}

const EMPTY: Omit<Snapshot, 'key'> = {
  playing: false,
  currentTime: 0,
  duration: 0,
  muted: false,
  buffered: 0,
  ended: false,
};

/** Eventos do elemento que mudam alguma parte do estado. */
const EVENTS = [
  'play',
  'pause',
  'playing',
  'timeupdate',
  'durationchange',
  'loadedmetadata',
  'progress',
  'volumechange',
  'ended',
  'seeking',
  'seeked',
  'emptied',
] as const;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Fim do trecho carregado que contém a posição atual (ou o último trecho). */
const readBuffered = (video: HTMLVideoElement, duration: number) => {
  const { buffered, currentTime } = video;
  if (duration <= 0 || buffered.length === 0) return 0;
  for (let index = 0; index < buffered.length; index += 1) {
    if (buffered.start(index) <= currentTime && currentTime <= buffered.end(index)) {
      return clamp01(buffered.end(index) / duration);
    }
  }
  return clamp01(buffered.end(buffered.length - 1) / duration);
};

/**
 * Hook useVideoPlayback — Design System Unoogaleria
 *
 * Liga um `<video>` real a um estado React. O estado é **sempre lido dos
 * eventos do elemento** (`play`, `pause`, `timeupdate`, `durationchange`,
 * `loadedmetadata`, `progress`, `volumechange`, `ended`…), nunca escrito de
 * forma otimista: é o que mantém o botão de tocar dizendo a verdade quando o
 * navegador recusa a reprodução ou quando o vídeo é comandado por fora.
 *
 * `resetKey` troca a assinatura: quando o elemento apontado pelo `videoRef` é
 * outro (o visualizador passou ao próximo vídeo), o hook volta ao estado vazio
 * e reassina os eventos do novo elemento. Sem ele, a assinatura acompanha só o
 * primeiro elemento montado.
 *
 * `play()` devolve uma promessa que rejeita quando a política de reprodução
 * automática recusa; a recusa é engolida, porque o estado continua espelhando o
 * elemento, que segue pausado.
 */
export function useVideoPlayback(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  resetKey?: unknown
): UglVideoPlayback {
  const [snapshot, setSnapshot] = React.useState<Snapshot>({ key: resetKey, ...EMPTY });

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const read = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      setSnapshot({
        key: resetKey,
        playing: !video.paused && !video.ended,
        currentTime: video.currentTime,
        duration,
        muted: video.muted,
        buffered: readBuffered(video, duration),
        ended: video.ended,
      });
    };

    EVENTS.forEach((name) => video.addEventListener(name, read));
    /* Primeira leitura fora do corpo do efeito: o elemento pode já ter metadados. */
    const frame = requestAnimationFrame(read);

    return () => {
      cancelAnimationFrame(frame);
      EVENTS.forEach((name) => video.removeEventListener(name, read));
    };
  }, [videoRef, resetKey]);

  /* Estado de outro elemento (chave antiga) não vaza para o novo. */
  const current = Object.is(snapshot.key, resetKey) ? snapshot : { key: resetKey, ...EMPTY };

  const play = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const result = video.play();
      if (result && typeof result.catch === 'function') result.catch(() => undefined);
    } catch {
      /* Navegadores antigos lançam em vez de rejeitar: o estado segue o elemento. */
    }
  }, [videoRef]);

  const pause = React.useCallback(() => {
    videoRef.current?.pause();
  }, [videoRef]);

  const togglePlay = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      play();
    } else {
      video.pause();
    }
  }, [videoRef, play]);

  const seek = React.useCallback(
    (seconds: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(seconds)) return;
      const limit = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : Infinity;
      try {
        video.currentTime = Math.min(limit, Math.max(0, seconds));
      } catch {
        /* Antes dos metadados alguns navegadores recusam a busca. */
      }
    },
    [videoRef]
  );

  const toggleMute = React.useCallback(() => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  }, [videoRef]);

  return {
    playing: current.playing,
    currentTime: current.currentTime,
    duration: current.duration,
    muted: current.muted,
    buffered: current.buffered,
    ended: current.ended,
    play,
    pause,
    togglePlay,
    seek,
    toggleMute,
  };
}
