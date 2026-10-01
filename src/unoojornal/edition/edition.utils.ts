import type { UjnArticle, UjnAuthor, UjnBlock } from './edition.types';

/**
 * Utilitários do modelo do Unoojornal: datas, tempo decorrido, tempo de
 * leitura, busca e rótulos acessíveis.
 *
 * Toda data é lida num fuso EXPLÍCITO (padrão `America/Sao_Paulo`), e `ujnTimeAgo`
 * recebe o "agora" por parâmetro: agrupar por dia no fuso da máquina faria a mesma
 * matéria cair em "Há 1 dia" na máquina de quem desenvolve e em "Há 2 dias" no
 * CI, que roda em UTC. Os nomes de mês e de dia da semana são tabelas fixas, e
 * não `Intl`, para que o texto não dependa da versão do ICU de cada ambiente.
 */

/** Fuso padrão de leitura das datas. */
export const UJN_DEFAULT_TIME_ZONE = 'America/Sao_Paulo';

/** Palavras lidas por minuto, na estimativa do tempo de leitura. */
export const UJN_WORDS_PER_MINUTE = 200;

/** Estilo de escrita de uma data. */
export type UjnDateStyle = 'long' | 'short' | 'full';

/** Opções de `ujnFormatDate`. */
export interface UjnFormatDateOptions {
  /** Fuso de leitura (padrão: `America/Sao_Paulo`) */
  timeZone?: string;
  /**
   * `full` → "Sexta-feira, 20 de março de 2026"; `long` → "20 de março de 2026";
   * `short` → "20 mar 2026" (padrão: `long`)
   */
  style?: UjnDateStyle;
}

/** Opções de `ujnDayMonth`. */
export interface UjnDayMonthOptions {
  /** Fuso de leitura (padrão: `America/Sao_Paulo`) */
  timeZone?: string;
}

/** Dia e mês de um compromisso, como aparecem no calendário da agenda. */
export interface UjnDayMonth {
  /** Dia com dois dígitos ("04") */
  day: string;
  /** Mês abreviado em caixa alta ("MAR") */
  month: string;
}

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

const WEEKDAYS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
] as const;

const DAY_MS = 86_400_000;

const toDate = (value: Date | string) => (value instanceof Date ? value : new Date(value));

const pad = (value: number) => String(value).padStart(2, '0');

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Ano, mês (1–12) e dia de um momento, no fuso pedido. */
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

const PLAIN_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Lê `YYYY-MM-DD` direto da string (sem fuso: é um dia de calendário) ou um ISO no fuso pedido. */
const calendarParts = (value: string, timeZone: string) => {
  const plain = PLAIN_DATE.exec(value);
  if (plain) return { year: Number(plain[1]), month: Number(plain[2]), day: Number(plain[3]) };
  return zonedParts(value, timeZone);
};

/** Diferença em dias de calendário (b − a) no fuso pedido. */
const calendarDaysBetween = (a: Date | string, b: Date | string, timeZone: string) => {
  const pa = zonedParts(a, timeZone);
  const pb = zonedParts(b, timeZone);
  return Math.round((Date.UTC(pb.year, pb.month - 1, pb.day) - Date.UTC(pa.year, pa.month - 1, pa.day)) / DAY_MS);
};

/**
 * Escreve uma data no fuso pedido.
 *
 * - `full`: "Sexta-feira, 20 de março de 2026"
 * - `long`: "20 de março de 2026"
 * - `short`: "20 mar 2026"
 *
 * Aceita um ISO com fuso ou um dia de calendário (`2026-03-20`).
 */
export const ujnFormatDate = (iso: string, options: UjnFormatDateOptions = {}) => {
  const { timeZone = UJN_DEFAULT_TIME_ZONE, style = 'long' } = options;
  const { year, month, day } = calendarParts(iso, timeZone);
  const monthName = MONTHS[month - 1];

  if (style === 'short') return `${day} ${monthName.slice(0, 3)} ${year}`;

  const long = `${day} de ${monthName} de ${year}`;
  if (style === 'long') return long;

  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${capitalize(weekday)}, ${long}`;
};

/**
 * Dia e mês de um compromisso, para o calendário da agenda: `{ day: '24', month: 'MAR' }`.
 * Aceita `YYYY-MM-DD` (lido como dia de calendário) ou um ISO com fuso.
 */
export const ujnDayMonth = (isoDate: string, options: UjnDayMonthOptions = {}): UjnDayMonth => {
  const { timeZone = UJN_DEFAULT_TIME_ZONE } = options;
  const { month, day } = calendarParts(isoDate, timeZone);
  return { day: pad(day), month: MONTHS[month - 1].slice(0, 3).toUpperCase() };
};

/**
 * Tempo decorrido, em português: "Agora", "Há 5 minutos", "Há 2 horas", "Há 1 dia",
 * "Há 3 dias" e, passados sete dias, a data curta ("12 mar 2026").
 *
 * Minutos e horas contam o tempo decorrido; dias contam dias de CALENDÁRIO no
 * fuso pedido. `now` é obrigatório: passe `ujnDemoNow` nas estórias.
 */
export const ujnTimeAgo = (iso: string, now: Date | string, timeZone = UJN_DEFAULT_TIME_ZONE) => {
  const elapsed = toDate(now).getTime() - toDate(iso).getTime();
  const minutes = Math.floor(elapsed / 60_000);

  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `Há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;

  const days = Math.max(1, calendarDaysBetween(iso, now, timeZone));
  if (days <= 7) return `Há ${days} ${days === 1 ? 'dia' : 'dias'}`;

  return ujnFormatDate(iso, { timeZone, style: 'short' });
};

/** Texto corrido de um bloco, para contar palavras. */
const blockText = (block: UjnBlock): string => {
  switch (block.type) {
    case 'paragraph':
    case 'heading':
    case 'quote':
      return block.text;
    case 'list':
      return block.items.join(' ');
    default:
      return '';
  }
};

/**
 * Tempo de leitura estimado, em minutos inteiros: 200 palavras por minuto, no
 * mínimo 1. Conta parágrafos, intertítulos, citações e itens de lista.
 */
export const ujnReadingTime = (blocks: UjnBlock[]) => {
  const words = blocks
    .map(blockText)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / UJN_WORDS_PER_MINUTE));
};

/** Rótulo do tempo de leitura: "7 min de leitura". */
export const ujnReadingLabel = (minutes: number) => `${minutes} min de leitura`;

/** Remove acentos e caixa, para a busca casar "ciencia" com "Ciência". */
export const ujnNormalizeSearch = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

/**
 * Diz se a matéria responde à consulta. Todas as palavras da consulta precisam
 * casar com o INÍCIO de alguma palavra do título, do resumo, do chapéu ou da
 * autoria, sem acento e sem caixa: "ana" acha a Ana, e não "Canastra".
 * Consulta vazia casa com tudo.
 */
export const ujnMatchesQuery = (article: UjnArticle, authors: UjnAuthor[], query: string) => {
  const terms = ujnNormalizeSearch(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const author = authors.find((candidate) => candidate.id === article.authorId);
  const words = ujnNormalizeSearch([article.title, article.summary, article.kicker, author?.name].filter(Boolean).join(' '))
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return terms.every((term) => words.some((word) => word.startsWith(term)));
};

/**
 * Rótulo acessível de uma matéria, para o nome de links e botões:
 * "Ciência e tecnologia. Título. Por Beatriz Salgado, 3º ano B. 7 min de leitura."
 */
export const ujnArticleLabel = (article: UjnArticle, author?: UjnAuthor) => {
  const by = author ? ` Por ${author.name}, ${author.role}.` : '';
  return `${article.kicker}. ${article.title}.${by} ${ujnReadingLabel(article.readingMinutes)}.`;
};

/**
 * Número de code points de um texto. `String.length` conta unidades UTF-16 e
 * contaria um emoji como dois caracteres, o que faria o limite da carta
 * reprovar um texto que a pessoa vê com menos caracteres.
 */
export const ujnCodePoints = (text: string) => Array.from(text).length;
