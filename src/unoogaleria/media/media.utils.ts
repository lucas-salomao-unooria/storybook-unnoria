import type {
  UglAdjustments,
  UglAspectRatio,
  UglEditState,
  UglFilterId,
  UglGroupBy,
  UglMediaItem,
  UglMediaSection,
  UglMediaSubtype,
} from './media.types';

/**
 * Utilitários do modelo da Unoogaleria: datas, durações, rótulos acessíveis,
 * agrupamento e a tradução da edição não destrutiva para CSS.
 *
 * Toda data é lida num fuso EXPLÍCITO (padrão `America/Sao_Paulo`), e não no da
 * máquina: agrupar por dia no fuso local faria a mesma foto cair em "Hoje" na
 * máquina de quem desenvolve e em "Ontem" no CI, que roda em UTC.
 */

/** Fuso padrão de leitura das datas. */
export const UGL_DEFAULT_TIME_ZONE = 'America/Sao_Paulo';

/** Dias que uma mídia fica em Excluídos recentemente antes de sair de vez. */
export const UGL_TRASH_RETENTION_DAYS = 30;

/** Opções de leitura de data. */
export interface UglDateOptions {
  /** Momento de referência para "Hoje" e "Ontem" (padrão: agora) */
  now?: Date | string;
  /** Fuso de leitura (padrão: `America/Sao_Paulo`) */
  timeZone?: string;
}

const DAY_MS = 86_400_000;

const toDate = (value: Date | string | undefined) =>
  value === undefined ? new Date() : value instanceof Date ? value : new Date(value);

/** Ano, mês e dia de um momento, no fuso pedido. */
const zonedParts = (value: Date | string, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(toDate(value));
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: read('year'), month: read('month'), day: read('day') };
};

const pad = (value: number) => String(value).padStart(2, '0');

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Chave de dia (`2026-09-28`) de um momento, no fuso pedido.
 */
export const uglDayKey = (value: Date | string, timeZone = UGL_DEFAULT_TIME_ZONE) => {
  const { year, month, day } = zonedParts(value, timeZone);
  return `${year}-${pad(month)}-${pad(day)}`;
};

/**
 * Diferença em dias de calendário entre dois momentos (b − a), no fuso pedido.
 */
export const uglCalendarDaysBetween = (
  a: Date | string,
  b: Date | string,
  timeZone = UGL_DEFAULT_TIME_ZONE
) => {
  const pa = zonedParts(a, timeZone);
  const pb = zonedParts(b, timeZone);
  return Math.round(
    (Date.UTC(pb.year, pb.month - 1, pb.day) - Date.UTC(pa.year, pa.month - 1, pa.day)) / DAY_MS
  );
};

/**
 * Rótulo de dia: "Hoje", "Ontem", o dia da semana nesta semana, "seg., 21 de
 * set." neste ano e "21 de set. de 2025" em anos anteriores.
 */
export const uglFormatDayLabel = (iso: string, options: UglDateOptions = {}) => {
  const timeZone = options.timeZone ?? UGL_DEFAULT_TIME_ZONE;
  const now = toDate(options.now);
  const diff = uglCalendarDaysBetween(iso, now, timeZone);

  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Ontem';
  if (diff > 1 && diff < 7) {
    return capitalize(new Intl.DateTimeFormat('pt-BR', { timeZone, weekday: 'long' }).format(new Date(iso)));
  }

  const sameYear = zonedParts(iso, timeZone).year === zonedParts(now, timeZone).year;
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    ...(sameYear ? { weekday: 'short' } : { year: 'numeric' }),
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso));
};

/**
 * Rótulo de mês: "Setembro de 2026".
 */
export const uglFormatMonthLabel = (iso: string, timeZone = UGL_DEFAULT_TIME_ZONE) =>
  capitalize(new Intl.DateTimeFormat('pt-BR', { timeZone, month: 'long', year: 'numeric' }).format(new Date(iso)));

/**
 * Rótulo de ano: "2026".
 */
export const uglFormatYearLabel = (iso: string, timeZone = UGL_DEFAULT_TIME_ZONE) =>
  String(zonedParts(iso, timeZone).year);

/**
 * Data longa: "28 de setembro de 2026".
 */
export const uglFormatLongDate = (iso: string, timeZone = UGL_DEFAULT_TIME_ZONE) =>
  new Intl.DateTimeFormat('pt-BR', { timeZone, day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));

/**
 * Hora: "14:32".
 */
export const uglFormatTime = (iso: string, timeZone = UGL_DEFAULT_TIME_ZONE) =>
  new Intl.DateTimeFormat('pt-BR', { timeZone, hour: '2-digit', minute: '2-digit' }).format(new Date(iso));

/**
 * Data e hora: "28 de setembro de 2026, 14:32".
 */
export const uglFormatDateTime = (iso: string, timeZone = UGL_DEFAULT_TIME_ZONE) =>
  `${uglFormatLongDate(iso, timeZone)}, ${uglFormatTime(iso, timeZone)}`;

/**
 * Duração de vídeo: "0:32", "4:05", "1:02:09".
 */
export const uglFormatDuration = (seconds: number) => {
  const total = Math.max(0, Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const rest = total % 60;
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(rest)}` : `${minutes}:${pad(rest)}`;
};

/**
 * Duração falada, para leitores de tela: "32 segundos", "4 minutos e 5 segundos".
 */
export const uglFormatDurationSpoken = (seconds: number) => {
  const total = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  const plural = (value: number, one: string, many: string) => `${value} ${value === 1 ? one : many}`;
  if (minutes === 0) return plural(rest, 'segundo', 'segundos');
  if (rest === 0) return plural(minutes, 'minuto', 'minutos');
  return `${plural(minutes, 'minuto', 'minutos')} e ${plural(rest, 'segundo', 'segundos')}`;
};

/**
 * Tamanho de arquivo: "2,4 MB" (base 1000, como os sistemas móveis exibem).
 */
export const uglFormatBytes = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = Math.max(0, bytes);
  let unit = 0;
  while (value >= 1000 && unit < units.length - 1) {
    value /= 1000;
    unit += 1;
  }
  const digits = unit === 0 || value >= 100 ? 0 : 1;
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: digits }).format(value)} ${units[unit]}`;
};

/**
 * Resolução em megapixels: "12 MP".
 */
export const uglFormatMegapixels = (width: number, height: number) =>
  `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(
    Math.round((width * height) / 100_000) / 10
  )} MP`;

/**
 * Contagem de fotos e vídeos: "128 fotos, 12 vídeos", "1 foto", "Nenhum item".
 */
export const uglFormatCount = (items: Pick<UglMediaItem, 'type'>[]) => {
  const photos = items.filter((item) => item.type === 'photo').length;
  const videos = items.length - photos;
  const parts = [
    photos ? `${photos.toLocaleString('pt-BR')} ${photos === 1 ? 'foto' : 'fotos'}` : '',
    videos ? `${videos.toLocaleString('pt-BR')} ${videos === 1 ? 'vídeo' : 'vídeos'}` : '',
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : 'Nenhum item';
};

/**
 * Rótulo de uma seleção: "1 item selecionado", "3 itens selecionados".
 */
export const uglFormatSelection = (count: number) =>
  count === 0
    ? 'Selecionar itens'
    : `${count.toLocaleString('pt-BR')} ${count === 1 ? 'item selecionado' : 'itens selecionados'}`;

/**
 * Dias restantes de uma mídia em Excluídos recentemente (nunca negativo).
 */
export const uglDaysLeft = (
  deletedAt: string,
  options: UglDateOptions & { retentionDays?: number } = {}
) => {
  const retention = options.retentionDays ?? UGL_TRASH_RETENTION_DAYS;
  const elapsed = uglCalendarDaysBetween(deletedAt, toDate(options.now), options.timeZone);
  return Math.max(0, retention - elapsed);
};

/**
 * Rótulos dos subtipos, como aparecem em "Tipos de mídia".
 */
export const uglSubtypeLabels: Record<UglMediaSubtype, string> = {
  selfie: 'Selfie',
  screenshot: 'Captura de tela',
  panorama: 'Panorama',
  live: 'Foto com movimento',
  burst: 'Sequência',
  hdr: 'HDR',
};

/**
 * Nome acessível de uma mídia: "Vídeo, 32 segundos, 28 de setembro de 2026,
 * favorito". O `alt` entra primeiro, porque é o que descreve o conteúdo.
 */
export const uglMediaLabel = (item: UglMediaItem, options: UglDateOptions = {}) => {
  const timeZone = options.timeZone ?? UGL_DEFAULT_TIME_ZONE;
  return [
    item.alt,
    item.type === 'video'
      ? `vídeo${item.duration !== undefined ? ` de ${uglFormatDurationSpoken(item.duration)}` : ''}`
      : '',
    uglFormatLongDate(item.takenAt, timeZone),
    item.favorite ? 'favorito' : '',
  ]
    .filter(Boolean)
    .join(', ');
};

/**
 * Ordena do mais recente ao mais antigo, sem alterar a lista recebida.
 */
export const uglSortByDate = (items: UglMediaItem[]) =>
  [...items].sort((a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime());

const mostFrequent = (values: (string | undefined)[]) => {
  const count = new Map<string, number>();
  for (const value of values) if (value) count.set(value, (count.get(value) ?? 0) + 1);
  let best: string | undefined;
  let bestCount = 0;
  for (const [value, total] of count) {
    if (total > bestCount) {
      best = value;
      bestCount = total;
    }
  }
  return best;
};

/**
 * Agrupa a mídia por dia, mês ou ano, do mais recente ao mais antigo. O
 * subtítulo de cada grupo é o lugar mais frequente entre os itens.
 */
export const uglGroupMedia = (
  items: UglMediaItem[],
  groupBy: UglGroupBy = 'day',
  options: UglDateOptions = {}
): UglMediaSection[] => {
  const timeZone = options.timeZone ?? UGL_DEFAULT_TIME_ZONE;
  const sorted = uglSortByDate(items);

  if (groupBy === 'none') {
    return sorted.length ? [{ id: 'todas', title: 'Todas', items: sorted }] : [];
  }

  const keyOf = (iso: string) => {
    const day = uglDayKey(iso, timeZone);
    return groupBy === 'day' ? day : groupBy === 'month' ? day.slice(0, 7) : day.slice(0, 4);
  };

  const sections = new Map<string, UglMediaItem[]>();
  for (const item of sorted) {
    const key = keyOf(item.takenAt);
    const bucket = sections.get(key);
    if (bucket) bucket.push(item);
    else sections.set(key, [item]);
  }

  return Array.from(sections, ([id, sectionItems]) => {
    const first = sectionItems[0].takenAt;
    const title =
      groupBy === 'day'
        ? uglFormatDayLabel(first, { now: options.now, timeZone })
        : groupBy === 'month'
          ? uglFormatMonthLabel(first, timeZone)
          : uglFormatYearLabel(first, timeZone);
    return { id, title, subtitle: mostFrequent(sectionItems.map((item) => item.location)), items: sectionItems };
  });
};

/* ==========================================================================
   Edição não destrutiva
   ========================================================================== */

/** Ajustes neutros. */
export const uglDefaultAdjustments: UglAdjustments = {
  exposure: 0,
  brightness: 0,
  contrast: 0,
  saturation: 0,
  warmth: 0,
  shadows: 0,
  vignette: 0,
};

/** Edição neutra: a foto como foi capturada. */
export const uglDefaultEdit: UglEditState = {
  rotation: 0,
  flipX: false,
  straighten: 0,
  aspect: 'original',
  adjustments: uglDefaultAdjustments,
  filter: 'original',
  filterIntensity: 100,
};

/** A edição difere da neutra? */
export const uglIsEdited = (edit?: UglEditState) =>
  Boolean(edit) &&
  (edit!.rotation !== 0 ||
    edit!.flipX ||
    edit!.straighten !== 0 ||
    edit!.aspect !== 'original' ||
    edit!.filter !== 'original' ||
    Object.values(edit!.adjustments).some((value) => value !== 0));

/** Uma função de filtro CSS e o valor que ela assume em intensidade total. */
type FilterStep = [name: 'brightness' | 'contrast' | 'saturate' | 'sepia' | 'grayscale' | 'hue-rotate', amount: number];

/**
 * Definição de um filtro predefinido.
 */
export interface UglFilterDefinition {
  id: UglFilterId;
  /** Nome exibido sob a amostra */
  label: string;
  /** Funções de filtro CSS em intensidade total */
  steps: readonly FilterStep[];
}

/**
 * Filtros predefinidos. São funções de filtro CSS, não cores: nenhum token de
 * cor entra aqui.
 */
export const uglFilters: readonly UglFilterDefinition[] = [
  { id: 'original', label: 'Original', steps: [] },
  { id: 'vivido', label: 'Vívido', steps: [['saturate', 1.45], ['contrast', 1.08]] },
  { id: 'quente', label: 'Quente', steps: [['sepia', 0.28], ['saturate', 1.25], ['hue-rotate', -8]] },
  { id: 'frio', label: 'Frio', steps: [['saturate', 0.9], ['hue-rotate', 14], ['brightness', 1.04]] },
  { id: 'dramatico', label: 'Dramático', steps: [['contrast', 1.35], ['saturate', 0.85], ['brightness', 0.92]] },
  { id: 'mono', label: 'Mono', steps: [['grayscale', 1], ['contrast', 1.05]] },
  { id: 'prata', label: 'Prata', steps: [['grayscale', 1], ['contrast', 1.3], ['brightness', 1.08]] },
  { id: 'nostalgia', label: 'Nostalgia', steps: [['sepia', 0.55], ['contrast', 0.92], ['brightness', 1.05], ['saturate', 0.9]] },
];

const IDENTITY: Record<FilterStep[0], number> = {
  brightness: 1,
  contrast: 1,
  saturate: 1,
  sepia: 0,
  grayscale: 0,
  'hue-rotate': 0,
};

const stepToCss = ([name, amount]: FilterStep, intensity: number) => {
  const value = IDENTITY[name] + (amount - IDENTITY[name]) * intensity;
  const rounded = Math.round(value * 1000) / 1000;
  return name === 'hue-rotate' ? `hue-rotate(${rounded}deg)` : `${name}(${rounded})`;
};

/**
 * Filtro CSS de um filtro predefinido numa intensidade (0 a 100).
 */
export const uglFilterToCss = (filter: UglFilterId, intensity = 100) => {
  const definition = uglFilters.find((item) => item.id === filter);
  if (!definition || definition.steps.length === 0) return 'none';
  return definition.steps.map((step) => stepToCss(step, intensity / 100)).join(' ');
};

/**
 * Filtro CSS completo de uma edição: ajustes finos e filtro predefinido. A
 * vinheta não é filtro — é uma camada; ver `uglVignetteOpacity`.
 */
export const uglEditToFilter = (edit?: UglEditState) => {
  if (!edit) return 'none';
  const a = edit.adjustments;
  const steps: string[] = [];
  const add = (name: FilterStep[0], value: number) => {
    if (Math.abs(value - IDENTITY[name]) > 0.0005) steps.push(stepToCss([name, value], 1));
  };

  add('brightness', 1 + (a.exposure / 100) * 0.6);
  add('brightness', 1 + (a.brightness / 100) * 0.35);
  add('contrast', 1 + (a.contrast / 100) * 0.5);
  add('saturate', 1 + a.saturation / 100);
  if (a.warmth > 0) {
    add('sepia', (a.warmth / 100) * 0.35);
    add('hue-rotate', -(a.warmth / 100) * 10);
  } else if (a.warmth < 0) {
    add('hue-rotate', (-a.warmth / 100) * 18);
    add('saturate', 1 + (a.warmth / 100) * 0.1);
  }
  if (a.shadows !== 0) {
    add('brightness', 1 + (a.shadows / 100) * 0.08);
    add('contrast', 1 - (a.shadows / 100) * 0.15);
  }

  const preset = uglFilterToCss(edit.filter, edit.filterIntensity);
  if (preset !== 'none') steps.push(preset);

  return steps.length ? steps.join(' ') : 'none';
};

/**
 * Opacidade da camada de vinheta (0 a 0,7).
 */
export const uglVignetteOpacity = (edit?: UglEditState) =>
  edit ? Math.round((edit.adjustments.vignette / 100) * 0.7 * 100) / 100 : 0;

/**
 * Proporção numérica (largura ÷ altura) de um corte.
 */
export const uglAspectToRatio = (aspect: UglAspectRatio, originalRatio: number) => {
  switch (aspect) {
    case '1:1':
      return 1;
    case '4:5':
      return 4 / 5;
    case '3:2':
      return 3 / 2;
    case '4:3':
      return 4 / 3;
    case '16:9':
      return 16 / 9;
    case '9:16':
      return 9 / 16;
    default:
      return originalRatio;
  }
};

/**
 * Proporção exibida de uma mídia depois da rotação e do corte.
 */
export const uglEditedRatio = (item: Pick<UglMediaItem, 'width' | 'height'>, edit?: UglEditState) => {
  const original = item.width / item.height;
  const turned = edit && edit.rotation % 180 !== 0 ? 1 / original : original;
  return edit ? uglAspectToRatio(edit.aspect, turned) : turned;
};

/**
 * Escala que cobre o quadro depois do endireitamento: girar θ graus um retângulo
 * de proporção r exige ampliá-lo para que nenhum canto vazio apareça.
 */
export const uglStraightenScale = (degrees: number, ratio: number) => {
  const theta = (Math.abs(degrees) * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return Math.max(cos + sin / ratio, ratio * sin + cos);
};

/**
 * Transformação CSS da imagem editada (rotação, espelho e endireitamento).
 *
 * A lista de `transform` se aplica da DIREITA para a esquerda: primeiro o giro
 * de 90°, depois o espelho e por último o endireitamento — os dois últimos no
 * espaço da tela. Na ordem inversa, "Espelhar" numa foto girada 90° aparecia
 * como espelho vertical.
 */
export const uglEditToTransform = (edit: UglEditState | undefined, ratio = 1) => {
  if (!edit) return 'none';
  const parts = [
    edit.straighten
      ? `rotate(${edit.straighten}deg) scale(${Math.round(uglStraightenScale(edit.straighten, ratio) * 1000) / 1000})`
      : '',
    edit.flipX ? 'scaleX(-1)' : '',
    edit.rotation ? `rotate(${-edit.rotation}deg)` : '',
  ].filter(Boolean);
  return parts.length ? parts.join(' ') : 'none';
};
