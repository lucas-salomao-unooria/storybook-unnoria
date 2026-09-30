'use client';

import React from 'react';

/**
 * Gestos do visualizador da Unoogaleria, por Pointer Events.
 *
 * Um único dedo decide o gesto depois de 8px de percurso:
 * - na horizontal, em 1×, **desliza** entre as mídias acompanhando o dedo; solto
 *   além de 20% da largura (ou rápido o bastante), passa à vizinha, senão volta
 *   com mola. Nas pontas, o deslize resiste (35% do percurso);
 * - para baixo, em 1×, **arrasta para fechar**, esmaecendo o fundo;
 * - para cima, em 1×, pede o painel de informações;
 * - ampliado, **move** a mídia, limitada às bordas.
 *
 * Toque sem percurso: um toque alterna o cromo (depois de 280ms, para não
 * confundir com o duplo toque); dois toques alternam 1× ↔ 2,5× no ponto tocado.
 * Dois dedos fazem **pinça** de 1× a 4× em torno do ponto médio. Ctrl/⌘ + roda
 * amplia em torno do cursor.
 *
 * As medidas são locais (px do layout, sem a escala do `PhoneFrame`): o
 * deslocamento do ponteiro é dividido pela escala visual da tela.
 */

/** Ampliação da mídia aberta, em px locais a partir do centro. */
export interface UglViewerZoom {
  scale: number;
  x: number;
  y: number;
}

/** Ampliação neutra. */
export const VIEWER_IDENTITY: UglViewerZoom = { scale: 1, x: 0, y: 0 };

/** Ampliação máxima da pinça, da roda e das teclas. */
export const VIEWER_MAX_SCALE = 4;
/** Ampliação do duplo toque. */
export const VIEWER_DOUBLE_TAP_SCALE = 2.5;

const SLOP = 8;
const TAP_DELAY = 280;
const DOUBLE_TAP_DISTANCE = 30;
const SWIPE_RATIO = 0.2;
const SWIPE_VELOCITY = 0.5;
const EDGE_RESISTANCE = 0.35;
const DISMISS_RATIO = 0.25;
const DISMISS_VELOCITY = 0.6;
const INFO_RATIO = 0.12;

type Mode = 'idle' | 'pending' | 'swipe' | 'pan' | 'pinch' | 'dismiss' | 'info';

interface Point {
  x: number;
  y: number;
}

interface Metrics {
  left: number;
  top: number;
  /** Largura e altura locais do palco */
  width: number;
  height: number;
  /** px locais por px de tela */
  k: number;
}

interface Gesture {
  pointers: Map<number, Point>;
  mode: Mode;
  metrics: Metrics | null;
  start: Point;
  last: Point;
  lastTime: number;
  vx: number;
  vy: number;
  startZoom: UglViewerZoom;
  liveZoom: UglViewerZoom;
  pinchDistance: number;
  pinchMid: Point;
  lastTap: { time: number; x: number; y: number } | null;
  tapTimer: ReturnType<typeof setTimeout> | null;
}

/** Opções do hook de gestos. */
export interface UglViewerGestureOptions {
  /** Palco que recebe os ponteiros */
  stageRef: React.RefObject<HTMLDivElement | null>;
  /** Índice aberto */
  index: number;
  /** Total de itens */
  count: number;
  /** Proporção exibida da mídia aberta (largura ÷ altura) */
  ratio: number;
  /** Pedido de ir a outra mídia */
  onNavigate: (index: number) => void;
  /** Toque simples na mídia */
  onTap: () => void;
  /** Arraste para baixo concluído */
  onDismiss: () => void;
  /** Deslize para cima concluído */
  onSwipeUp?: () => void;
}

/** Estado de exibição produzido pelos gestos. */
export interface UglViewerGestureState {
  /** Deslocamento horizontal do trilho, em px locais */
  offsetX: number;
  /** Deslocamento vertical do arraste para fechar, em px locais */
  dismissY: number;
  /** Progresso do arraste para fechar, de 0 a 1 */
  dismissProgress: number;
  /** Ampliação da mídia aberta */
  zoom: UglViewerZoom;
  /** Um gesto está em curso (transições desligadas) */
  gesturing: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const readMetrics = (element: HTMLElement): Metrics => {
  const rect = element.getBoundingClientRect();
  const width = element.offsetWidth || rect.width;
  const height = element.offsetHeight || rect.height;
  return { left: rect.left, top: rect.top, width, height, k: rect.width ? width / rect.width : 1 };
};

const toLocal = (metrics: Metrics, clientX: number, clientY: number): Point => ({
  x: (clientX - metrics.left) * metrics.k - metrics.width / 2,
  y: (clientY - metrics.top) * metrics.k - metrics.height / 2,
});

/** Limita o deslocamento para a mídia ampliada não descolar das bordas. */
const clampZoom = (zoom: UglViewerZoom, metrics: Metrics, ratio: number): UglViewerZoom => {
  if (zoom.scale <= 1.001) return VIEWER_IDENTITY;
  const fitWidth = Math.min(metrics.width, metrics.height * ratio);
  const fitHeight = fitWidth / ratio;
  const maxX = Math.max(0, (fitWidth * zoom.scale - metrics.width) / 2);
  const maxY = Math.max(0, (fitHeight * zoom.scale - metrics.height) / 2);
  return { scale: zoom.scale, x: clamp(zoom.x, -maxX, maxX), y: clamp(zoom.y, -maxY, maxY) };
};

/** Amplia mantendo o ponto `p` (local, a partir do centro) sob o dedo. */
const zoomAround = (from: UglViewerZoom, scale: number, p: Point): UglViewerZoom => ({
  scale,
  x: p.x - (p.x - from.x) * (scale / from.scale),
  y: p.y - (p.y - from.y) * (scale / from.scale),
});

const isControl = (target: EventTarget | null) =>
  target instanceof Element && Boolean(target.closest('button, a, input, select, textarea, [role="slider"]'));

/**
 * Hook de gestos do MediaViewer.
 */
export function useViewerGestures({
  stageRef,
  index,
  count,
  ratio,
  onNavigate,
  onTap,
  onDismiss,
  onSwipeUp,
}: UglViewerGestureOptions) {
  const [offsetX, setOffsetX] = React.useState(0);
  const [dismiss, setDismiss] = React.useState({ y: 0, progress: 0 });
  const [gesturing, setGesturing] = React.useState(false);
  /* A ampliação pertence a um índice: trocar de mídia volta a 1× sem efeito. */
  const [zoomState, setZoomState] = React.useState({ key: index, ...VIEWER_IDENTITY });
  const zoom: UglViewerZoom =
    zoomState.key === index ? { scale: zoomState.scale, x: zoomState.x, y: zoomState.y } : VIEWER_IDENTITY;

  const latest = React.useRef({ index, count, ratio, zoom, onNavigate, onTap, onDismiss, onSwipeUp });
  React.useEffect(() => {
    latest.current = { index, count, ratio, zoom, onNavigate, onTap, onDismiss, onSwipeUp };
  });

  const gesture = React.useRef<Gesture>({
    pointers: new Map(),
    mode: 'idle',
    metrics: null,
    start: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    lastTime: 0,
    vx: 0,
    vy: 0,
    startZoom: VIEWER_IDENTITY,
    liveZoom: VIEWER_IDENTITY,
    pinchDistance: 1,
    pinchMid: { x: 0, y: 0 },
    lastTap: null,
    tapTimer: null,
  });

  const applyZoom = React.useCallback((next: UglViewerZoom) => {
    gesture.current.liveZoom = next;
    setZoomState({ key: latest.current.index, ...next });
  }, []);

  const clearTapTimer = () => {
    const g = gesture.current;
    if (g.tapTimer !== null) {
      clearTimeout(g.tapTimer);
      g.tapTimer = null;
    }
  };

  const reset = () => {
    const g = gesture.current;
    g.pointers.clear();
    g.mode = 'idle';
    setOffsetX(0);
    setDismiss({ y: 0, progress: 0 });
    setGesturing(false);
  };

  const beginPinch = () => {
    const g = gesture.current;
    const [a, b] = Array.from(g.pointers.values());
    clearTapTimer();
    g.lastTap = null;
    g.mode = 'pinch';
    g.pinchDistance = Math.max(1, distance(a, b));
    g.pinchMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    g.startZoom = g.liveZoom;
    setOffsetX(0);
    setDismiss({ y: 0, progress: 0 });
    setGesturing(true);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (isControl(event.target)) return;
    const g = gesture.current;
    if (g.pointers.size === 0) g.metrics = readMetrics(event.currentTarget);
    const metrics = g.metrics;
    if (!metrics) return;

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* Ponteiro sintético (testes) não pode ser capturado. */
    }

    const point = toLocal(metrics, event.clientX, event.clientY);
    g.pointers.set(event.pointerId, point);

    if (g.pointers.size === 1) {
      g.mode = 'pending';
      g.start = point;
      g.last = point;
      g.lastTime = event.timeStamp;
      g.vx = 0;
      g.vy = 0;
      g.startZoom = latest.current.zoom;
      g.liveZoom = latest.current.zoom;
    } else if (g.pointers.size === 2) {
      beginPinch();
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g.pointers.has(event.pointerId) || !g.metrics) return;
    const metrics = g.metrics;
    const point = toLocal(metrics, event.clientX, event.clientY);
    g.pointers.set(event.pointerId, point);
    const { index: current, count: total, ratio: currentRatio } = latest.current;

    if (g.mode === 'pinch') {
      if (g.pointers.size < 2) return;
      const [a, b] = Array.from(g.pointers.values());
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const scale = clamp((g.startZoom.scale * distance(a, b)) / g.pinchDistance, 1, VIEWER_MAX_SCALE);
      const around = zoomAround(g.startZoom, scale, g.pinchMid);
      applyZoom(
        clampZoom(
          { scale, x: around.x + mid.x - g.pinchMid.x, y: around.y + mid.y - g.pinchMid.y },
          metrics,
          currentRatio
        )
      );
      return;
    }

    const dt = Math.max(1, event.timeStamp - g.lastTime);
    g.vx = (point.x - g.last.x) / dt;
    g.vy = (point.y - g.last.y) / dt;
    g.last = point;
    g.lastTime = event.timeStamp;

    const dx = point.x - g.start.x;
    const dy = point.y - g.start.y;

    if (g.mode === 'pending') {
      if (Math.hypot(dx, dy) < SLOP) return;
      clearTapTimer();
      g.lastTap = null;
      if (g.startZoom.scale > 1.001) g.mode = 'pan';
      else if (Math.abs(dx) >= Math.abs(dy)) g.mode = 'swipe';
      else g.mode = dy > 0 ? 'dismiss' : 'info';
      setGesturing(true);
    }

    if (g.mode === 'swipe') {
      const atEdge = (dx > 0 && current === 0) || (dx < 0 && current >= total - 1);
      setOffsetX(atEdge ? dx * EDGE_RESISTANCE : dx);
    } else if (g.mode === 'pan') {
      applyZoom(
        clampZoom({ scale: g.startZoom.scale, x: g.startZoom.x + dx, y: g.startZoom.y + dy }, metrics, currentRatio)
      );
    } else if (g.mode === 'dismiss') {
      const y = Math.max(0, dy);
      setDismiss({ y, progress: clamp(y / (metrics.height * 0.5), 0, 1) });
    }
  };

  const handleTap = (point: Point, time: number) => {
    const g = gesture.current;
    const metrics = g.metrics;
    const previous = g.lastTap;
    if (
      previous &&
      time - previous.time < TAP_DELAY &&
      Math.hypot(point.x - previous.x, point.y - previous.y) < DOUBLE_TAP_DISTANCE
    ) {
      clearTapTimer();
      g.lastTap = null;
      if (!metrics) return;
      const { zoom: currentZoom, ratio: currentRatio } = latest.current;
      applyZoom(
        currentZoom.scale > 1.001
          ? VIEWER_IDENTITY
          : clampZoom(zoomAround(VIEWER_IDENTITY, VIEWER_DOUBLE_TAP_SCALE, point), metrics, currentRatio)
      );
      return;
    }
    g.lastTap = { time, x: point.x, y: point.y };
    clearTapTimer();
    g.tapTimer = setTimeout(() => {
      g.tapTimer = null;
      g.lastTap = null;
      latest.current.onTap();
    }, TAP_DELAY);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g.pointers.has(event.pointerId)) return;
    const point = g.metrics ? toLocal(g.metrics, event.clientX, event.clientY) : g.last;
    g.pointers.delete(event.pointerId);

    if (g.mode === 'pinch') {
      if (g.pointers.size === 1) {
        /* Sobrou um dedo: a pinça vira arraste a partir de onde ele está. */
        const [remaining] = Array.from(g.pointers.values());
        g.mode = 'pan';
        g.start = remaining;
        g.last = remaining;
        g.startZoom = g.liveZoom;
      } else if (g.pointers.size === 0) {
        if (g.liveZoom.scale < 1.05) applyZoom(VIEWER_IDENTITY);
        g.mode = 'idle';
        setGesturing(false);
      }
      return;
    }

    if (g.pointers.size > 0) return;

    const mode = g.mode;
    g.mode = 'idle';
    setGesturing(false);
    const metrics = g.metrics;
    const dx = point.x - g.start.x;
    const dy = point.y - g.start.y;
    const { index: current, count: total } = latest.current;

    if (mode === 'pending') {
      handleTap(point, event.timeStamp);
    } else if (mode === 'swipe') {
      setOffsetX(0);
      const width = metrics?.width ?? 1;
      const passed = Math.abs(dx) > width * SWIPE_RATIO || Math.abs(g.vx) > SWIPE_VELOCITY;
      const target = current + (dx < 0 ? 1 : -1);
      if (passed && target >= 0 && target < total) latest.current.onNavigate(target);
    } else if (mode === 'dismiss') {
      const height = metrics?.height ?? 1;
      setDismiss({ y: 0, progress: 0 });
      if (dy > height * DISMISS_RATIO || g.vy > DISMISS_VELOCITY) latest.current.onDismiss();
    } else if (mode === 'info') {
      const height = metrics?.height ?? 1;
      if (dy < -height * INFO_RATIO || g.vy < -SWIPE_VELOCITY) latest.current.onSwipeUp?.();
    }
  };

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!gesture.current.pointers.has(event.pointerId)) return;
    clearTapTimer();
    reset();
  };

  /* Ctrl/⌘ + roda: listener nativo, porque o do React é passivo e não impede a rolagem. */
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const handleWheel = (event: WheelEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      event.preventDefault();
      const metrics = readMetrics(stage);
      const point = toLocal(metrics, event.clientX, event.clientY);
      const { zoom: from, ratio: currentRatio } = latest.current;
      const scale = clamp(from.scale * Math.exp(-event.deltaY * 0.01), 1, VIEWER_MAX_SCALE);
      applyZoom(clampZoom(zoomAround(from, scale, point), metrics, currentRatio));
    };
    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [stageRef, applyZoom]);

  /* O temporizador do toque simples não sobrevive à desmontagem. */
  React.useEffect(() => {
    const g = gesture.current;
    return () => {
      if (g.tapTimer !== null) clearTimeout(g.tapTimer);
    };
  }, []);

  /** Amplia (fator > 1) ou reduz em torno do centro — teclas + e −. */
  const zoomBy = React.useCallback(
    (factor: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const { zoom: from, ratio: currentRatio } = latest.current;
      const scale = clamp(from.scale * factor, 1, VIEWER_MAX_SCALE);
      applyZoom(clampZoom(zoomAround(from, scale, { x: 0, y: 0 }), readMetrics(stage), currentRatio));
    },
    [stageRef, applyZoom]
  );

  /** Volta a 1×. */
  const resetZoom = React.useCallback(() => applyZoom(VIEWER_IDENTITY), [applyZoom]);

  const state: UglViewerGestureState = {
    offsetX,
    dismissY: dismiss.y,
    dismissProgress: dismiss.progress,
    zoom,
    gesturing,
  };

  return {
    state,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
    zoomBy,
    resetZoom,
  };
}
