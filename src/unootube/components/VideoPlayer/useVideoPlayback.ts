'use client';

import React from 'react';

/**
 * Motor de reprodução compartilhado do Unootube.
 *
 * Os arquivos de design são estáticos: o `VideoPlayer` do arquivo original é um
 * bitmap com controles desenhados, e o reprodutor de Shorts é um quadro com um
 * véu por cima. Nenhum dos dois descreve reprodução, tempo, volume ou tela
 * cheia — este módulo é a camada de comportamento que faltava, e é
 * deliberadamente separada da apresentação para que o `VideoPlayer` de 16:9 e o
 * `ShortsPlayer` de 9:16 compartilhem exatamente a mesma máquina de estados.
 *
 * Nada aqui inventa aparência: quem desenha continua sendo o CSS de cada
 * componente, sobre os tokens `--uni-*`.
 */

/** Estado observável do elemento de vídeo. */
export interface UniVideoState {
  /** `true` enquanto o vídeo avança. */
  playing: boolean;
  /** `true` quando o áudio está silenciado. */
  muted: boolean;
  /** Volume de 0 a 1. */
  volume: number;
  /** Posição atual, em segundos. */
  currentTime: number;
  /** Duração total, em segundos. `0` enquanto os metadados não chegaram. */
  duration: number;
  /** Fim do trecho carregado que contém a posição atual, em segundos. */
  buffered: number;
  /** `true` enquanto o vídeo aguarda dados. */
  waiting: boolean;
  /** `true` depois que a reprodução chegou ao fim. */
  ended: boolean;
  /** `true` quando o contêiner está em tela cheia. */
  fullscreen: boolean;
  /** Fração reproduzida, de 0 a 1. Derivada de `currentTime` e `duration`. */
  progress: number;
  /** Fração carregada, de 0 a 1. Nunca menor que `progress`. */
  bufferedProgress: number;
}

/** Comandos imperativos expostos pelo motor. */
export interface UniVideoControls {
  /** Inicia a reprodução. Silencioso se o navegador recusar (autoplay). */
  play: () => void;
  /** Pausa a reprodução. */
  pause: () => void;
  /** Alterna entre reproduzir e pausar. */
  toggle: () => void;
  /** Posiciona a reprodução no segundo informado. */
  seek: (seconds: number) => void;
  /** Avança (ou recua, com valor negativo) a quantidade de segundos informada. */
  seekBy: (delta: number) => void;
  /** Posiciona a reprodução em uma fração de 0 a 1 da duração. */
  seekToProgress: (fraction: number) => void;
  /** Define o volume de 0 a 1. Ajustar o volume acima de zero tira do mudo. */
  setVolume: (volume: number) => void;
  /** Alterna o mudo. */
  toggleMute: () => void;
  /** Alterna a tela cheia do contêiner informado em `containerRef`. */
  toggleFullscreen: () => void;
}

/** Opções do motor de reprodução. */
export interface UniVideoPlaybackOptions {
  /** Elemento que entra em tela cheia. Quando ausente, usa o próprio vídeo. */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Chamado a cada avanço do tempo, com a posição em segundos. */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /** Chamado quando a reprodução começa. */
  onPlay?: () => void;
  /** Chamado quando a reprodução pausa. */
  onPause?: () => void;
  /** Chamado quando a reprodução chega ao fim. */
  onEnded?: () => void;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Formata uma duração em segundos no relógio que o arquivo desenha.
 *
 * O arquivo escreve `5:07 / 15:28` — minutos sem zero à esquerda e segundos
 * com dois dígitos. A hora só aparece quando existe, para que um vídeo curto
 * não ganhe um `0:` que o arquivo não desenha.
 */
export const formatPlaybackTime = (totalSeconds: number): string => {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return '0:00';
  }

  const rounded = Math.floor(totalSeconds);
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const seconds = rounded % 60;
  const paddedSeconds = String(seconds).padStart(2, '0');

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${paddedSeconds}`
    : `${minutes}:${paddedSeconds}`;
};

/**
 * Liga um `<video>` real a um estado React observável.
 *
 * O estado é lido dos **eventos do elemento**, nunca escrito de forma otimista.
 * É o que garante que o botão continue refletindo a verdade quando a reprodução
 * é recusada pela política de autoplay do navegador ou quando o vídeo é
 * controlado por fora (teclado do sistema, Picture-in-Picture, controles
 * nativos).
 */
export const useVideoPlayback = (
  options: UniVideoPlaybackOptions = {}
): {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  state: UniVideoState;
  controls: UniVideoControls;
} => {
  const { containerRef, onTimeUpdate, onPlay, onPause, onEnded } = options;
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [state, setState] = React.useState<UniVideoState>({
    playing: false,
    muted: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    buffered: 0,
    waiting: false,
    ended: false,
    fullscreen: false,
    progress: 0,
    bufferedProgress: 0,
  });

  /*
   * Os manipuladores são guardados em ref para que o efeito de assinatura não
   * precise reassinar todos os eventos do elemento a cada render do consumidor.
   */
  const handlers = React.useRef({ onTimeUpdate, onPlay, onPause, onEnded });

  React.useEffect(() => {
    handlers.current = { onTimeUpdate, onPlay, onPause, onEnded };
  }, [onTimeUpdate, onPlay, onPause, onEnded]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const readBuffered = () => {
      const { buffered, currentTime } = video;
      for (let index = 0; index < buffered.length; index += 1) {
        if (buffered.start(index) <= currentTime && currentTime <= buffered.end(index)) {
          return buffered.end(index);
        }
      }
      return buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;
    };

    const sync = (patch: Partial<UniVideoState> = {}) => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const currentTime = video.currentTime;
      const buffered = readBuffered();
      const progress = duration > 0 ? clamp01(currentTime / duration) : 0;

      setState((previous) => ({
        ...previous,
        playing: !video.paused && !video.ended,
        muted: video.muted,
        volume: video.volume,
        currentTime,
        duration,
        buffered,
        progress,
        bufferedProgress: duration > 0 ? Math.max(progress, clamp01(buffered / duration)) : 0,
        ...patch,
      }));
    };

    const handleTimeUpdate = () => {
      sync();
      handlers.current.onTimeUpdate?.(video.currentTime, video.duration || 0);
    };
    const handlePlay = () => {
      sync({ ended: false, waiting: false });
      handlers.current.onPlay?.();
    };
    const handlePause = () => {
      sync();
      handlers.current.onPause?.();
    };
    const handleEnded = () => {
      sync({ ended: true, playing: false });
      handlers.current.onEnded?.();
    };
    const handleWaiting = () => sync({ waiting: true });
    const handlePlaying = () => sync({ waiting: false });
    const handleMetadata = () => sync();

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', handleMetadata);
    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('durationchange', handleMetadata);
    video.addEventListener('volumechange', handleMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    sync();

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', handleMetadata);
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('durationchange', handleMetadata);
      video.removeEventListener('volumechange', handleMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  /* Tela cheia é estado do documento, não do elemento: assinatura à parte. */
  React.useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const handleFullscreenChange = () => {
      const target = containerRef?.current ?? videoRef.current;
      setState((previous) => ({
        ...previous,
        fullscreen: Boolean(target && document.fullscreenElement === target),
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [containerRef]);

  const play = React.useCallback(() => {
    /*
     * `play()` devolve uma promessa que rejeita quando a política de autoplay
     * recusa. A recusa não é um erro do produto: o estado continua espelhando o
     * elemento, que segue pausado.
     */
    void videoRef.current?.play().catch(() => undefined);
  }, []);

  const pause = React.useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const toggle = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = React.useCallback(() => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  }, []);

  const toggleFullscreen = React.useCallback(() => {
    if (typeof document === 'undefined') return;
    const target = containerRef?.current ?? videoRef.current;
    if (!target) return;

    if (document.fullscreenElement === target) {
      void document.exitFullscreen?.().catch(() => undefined);
    } else {
      void target.requestFullscreen?.().catch(() => undefined);
    }
  }, [containerRef]);

  const seek = React.useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    video.currentTime = duration > 0 ? Math.min(duration, Math.max(0, seconds)) : Math.max(0, seconds);
  }, []);

  const seekBy = React.useCallback(
    (delta: number) => {
      const video = videoRef.current;
      if (!video) return;
      seek(video.currentTime + delta);
    },
    [seek]
  );

  const seekToProgress = React.useCallback(
    (fraction: number) => {
      const video = videoRef.current;
      if (!video) return;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (duration > 0) seek(clamp01(fraction) * duration);
    },
    [seek]
  );

  const setVolume = React.useCallback((volume: number) => {
    const video = videoRef.current;
    if (!video) return;
    const next = clamp01(volume);
    video.volume = next;
    /* Subir o volume acima de zero tira do mudo: é o que o usuário espera. */
    if (next > 0 && video.muted) video.muted = false;
    if (next === 0) video.muted = true;
  }, []);

  const controls = React.useMemo<UniVideoControls>(
    () => ({
      play,
      pause,
      toggle,
      seek,
      seekBy,
      seekToProgress,
      setVolume,
      toggleMute,
      toggleFullscreen,
    }),
    [play, pause, toggle, seek, seekBy, seekToProgress, setVolume, toggleMute, toggleFullscreen]
  );

  return { videoRef, state, controls };
};
