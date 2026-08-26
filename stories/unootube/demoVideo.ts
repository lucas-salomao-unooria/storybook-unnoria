/**
 * Vídeo de demonstração sintético para as estórias do Unootube.
 *
 * O arquivo de origem não publica vídeo: publica bitmaps. E os bitmaps que ele
 * usa são fotografias e logotipos de terceiros, que não foram redistribuídos —
 * a mesma razão pela qual os pôsteres das estórias são SVG sintético.
 *
 * Para demonstrar reprodução **de verdade** sem embutir mídia binária no
 * repositório, o vídeo é desenhado em um `<canvas>` e gravado pelo navegador
 * com `MediaRecorder`. O resultado é um `blob:` local, gerado uma única vez por
 * sessão e reaproveitado por todas as estórias.
 *
 * Se o navegador não oferecer `MediaRecorder` — ou se a gravação falhar — a
 * função devolve `undefined` e o reprodutor volta ao modo de réplica estática.
 * Nenhuma estória depende do vídeo para renderizar.
 */

/** Orientações geradas, nas duas razões que os reprodutores usam. */
export type UniDemoVideoOrientation = 'landscape' | 'portrait';

const DURATION_MS = 1600;
const FPS = 24;

const cache = new Map<UniDemoVideoOrientation, Promise<string | undefined>>();

/**
 * Desenha um quadro do vídeo sintético.
 *
 * A paleta vem da própria escada do Unootube — nenhum tom de fora da marca — e
 * o movimento existe só para que a reprodução seja visivelmente reprodução, e
 * não um pôster parado.
 */
const drawFrame = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) => {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1B2A44');
  gradient.addColorStop(1, '#0C1422');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.22;
  const angle = progress * Math.PI * 2;

  context.save();
  context.translate(centerX, centerY);
  context.rotate(angle);
  context.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  context.lineWidth = Math.max(2, radius * 0.06);
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 1.5);
  context.stroke();
  context.restore();

  context.fillStyle = '#FC0D1C';
  context.beginPath();
  context.arc(
    centerX + Math.cos(angle) * radius,
    centerY + Math.sin(angle) * radius,
    Math.max(4, radius * 0.12),
    0,
    Math.PI * 2
  );
  context.fill();

  /* Barra de avanço, para que o quadro sozinho já diga em que ponto está. */
  context.fillStyle = 'rgba(255, 255, 255, 0.18)';
  context.fillRect(0, height - 6, width, 6);
  context.fillStyle = '#FC0D1C';
  context.fillRect(0, height - 6, width * progress, 6);
};

/**
 * Grava um vídeo curto em laço e devolve um `blob:` utilizável em `src`.
 */
const record = async (orientation: UniDemoVideoOrientation): Promise<string | undefined> => {
  if (typeof document === 'undefined' || typeof MediaRecorder === 'undefined') {
    return undefined;
  }

  const width = orientation === 'portrait' ? 360 : 640;
  const height = orientation === 'portrait' ? 640 : 360;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return undefined;

  const stream = canvas.captureStream(FPS);

  /* Nem todo Chromium aceita os mesmos contêineres; o primeiro suportado vence. */
  const mimeType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(
    (candidate) => MediaRecorder.isTypeSupported(candidate)
  );
  if (!mimeType) return undefined;

  const chunks: BlobPart[] = [];
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 900_000 });
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  };

  const finished = new Promise<void>((resolve) => {
    recorder.onstop = () => resolve();
  });

  recorder.start();

  const start = performance.now();
  await new Promise<void>((resolve) => {
    const tick = () => {
      const elapsed = performance.now() - start;
      drawFrame(context, width, height, Math.min(1, elapsed / DURATION_MS));
      if (elapsed >= DURATION_MS) {
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });

  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());
  await finished;

  if (chunks.length === 0) return undefined;
  return URL.createObjectURL(new Blob(chunks, { type: mimeType }));
};

/**
 * Devolve o vídeo de demonstração da orientação pedida, gerando-o na primeira
 * chamada e reaproveitando-o depois.
 *
 * Qualquer falha resolve para `undefined`: a estória continua renderizando, só
 * que em modo de réplica estática.
 */
export const getDemoVideo = (
  orientation: UniDemoVideoOrientation
): Promise<string | undefined> => {
  const cached = cache.get(orientation);
  if (cached) return cached;

  const created = record(orientation).catch(() => undefined);
  cache.set(orientation, created);
  return created;
};

/**
 * Resolve a duração de um `blob:` gravado pelo `MediaRecorder`.
 *
 * O contêiner WebM que o gravador produz **não declara duração**: o elemento de
 * vídeo reporta `Infinity` até que a reprodução chegue ao fim. Buscar uma
 * posição absurdamente distante força o navegador a percorrer o arquivo e a
 * publicar a duração real; feito isso, a posição volta ao início.
 *
 * A manobra vive aqui, e não no `useVideoPlayback`, porque é uma correção de
 * um artefato **desta** fixação de demonstração — não um comportamento que o
 * reprodutor deva ter com arquivos bem formados.
 */
export const resolveBlobDuration = (video: HTMLVideoElement | null): void => {
  if (!video) return;

  const fix = () => {
    if (video.duration !== Infinity) return;
    const restore = () => {
      video.currentTime = 0;
      video.removeEventListener('durationchange', restore);
    };
    video.addEventListener('durationchange', restore);
    video.currentTime = 1e101;
  };

  if (video.readyState >= 1) {
    fix();
  } else {
    video.addEventListener('loadedmetadata', fix, { once: true });
  }
};
