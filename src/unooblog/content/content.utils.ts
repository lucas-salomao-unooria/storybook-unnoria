import type { UblAuthor, UblBlock, UblPost, UblTopic } from './content.types';

/**
 * Utilitários do modelo do Unooblog: datas, tempo decorrido, tempo de leitura,
 * busca, âncoras e sumário.
 *
 * Toda data é lida num fuso EXPLÍCITO (padrão `America/Sao_Paulo`), e `ublTimeAgo`
 * recebe o "agora" por parâmetro: agrupar por dia no fuso da máquina faria o
 * mesmo post cair em "Há 1 dia" na máquina de quem desenvolve e em "Há 2 dias"
 * no CI, que roda em UTC. Os nomes de mês e de dia da semana são tabelas fixas, e
 * não `Intl`, para que o texto não dependa da versão do ICU de cada ambiente.
 */

/** Fuso padrão de leitura das datas. */
export const UBL_DEFAULT_TIME_ZONE = 'America/Sao_Paulo';

/** Palavras lidas por minuto, na estimativa do tempo de leitura. */
export const UBL_WORDS_PER_MINUTE = 200;

/** Estilo de escrita de uma data. */
export type UblDateStyle = 'long' | 'short' | 'full';

/** Opções de `ublFormatDate`. */
export interface UblFormatDateOptions {
  /** Fuso de leitura (padrão: `America/Sao_Paulo`) */
  timeZone?: string;
  /**
   * `full` → "Terça-feira, 29 de setembro de 2026"; `long` → "29 de setembro de 2026";
   * `short` → "29 set 2026" (padrão: `long`)
   */
  style?: UblDateStyle;
}

/** Item do sumário de um post. */
export interface UblTocItem {
  /** Âncora do intertítulo (`UblHeadingBlock.id`) */
  id: string;
  /** Texto do intertítulo */
  label: string;
  /** Nível do intertítulo */
  level: 2 | 3;
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
 * - `full`: "Terça-feira, 29 de setembro de 2026"
 * - `long`: "29 de setembro de 2026"
 * - `short`: "29 set 2026"
 *
 * Aceita um ISO com fuso ou um dia de calendário (`2026-09-29`).
 */
export const ublFormatDate = (iso: string, options: UblFormatDateOptions = {}) => {
  const { timeZone = UBL_DEFAULT_TIME_ZONE, style = 'long' } = options;
  const { year, month, day } = calendarParts(iso, timeZone);
  const monthName = MONTHS[month - 1];

  if (style === 'short') return `${day} ${monthName.slice(0, 3)} ${year}`;

  const long = `${day} de ${monthName} de ${year}`;
  if (style === 'long') return long;

  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${capitalize(weekday)}, ${long}`;
};

/**
 * Tempo decorrido, em português: "Agora", "Há 5 minutos", "Há 2 horas", "Há 1 dia",
 * "Há 3 dias" e, passados sete dias, a data curta ("12 set 2026").
 *
 * Minutos e horas contam o tempo decorrido; dias contam dias de CALENDÁRIO no
 * fuso pedido. `now` é obrigatório: passe `ublDemoNow` nas estórias.
 */
export const ublTimeAgo = (iso: string, now: Date | string, timeZone = UBL_DEFAULT_TIME_ZONE) => {
  const elapsed = toDate(now).getTime() - toDate(iso).getTime();
  const minutes = Math.floor(elapsed / 60_000);

  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `Há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;

  const days = Math.max(1, calendarDaysBetween(iso, now, timeZone));
  if (days <= 7) return `Há ${days} ${days === 1 ? 'dia' : 'dias'}`;

  return ublFormatDate(iso, { timeZone, style: 'short' });
};

/** Texto corrido de um bloco, para contar palavras. Código e legenda não contam. */
const blockText = (block: UblBlock): string => {
  switch (block.type) {
    case 'paragraph':
    case 'heading':
    case 'quote':
      return block.text;
    case 'callout':
      return block.text;
    case 'list':
      return block.items.join(' ');
    default:
      return '';
  }
};

/**
 * Tempo de leitura estimado, em minutos inteiros: 200 palavras por minuto, no
 * mínimo 1. Conta parágrafos, intertítulos, citações, itens de lista e o texto
 * dos avisos; NÃO conta código nem legenda de figura.
 */
export const ublReadingTime = (blocks: UblBlock[]) => {
  const words = blocks
    .map(blockText)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / UBL_WORDS_PER_MINUTE));
};

/** Rótulo do tempo de leitura: "7 min de leitura". */
export const ublReadingLabel = (minutes: number) => `${minutes} min de leitura`;

/** Remove acentos e caixa, para a busca casar "acessibilidade" com "Acessibilidade". */
export const ublNormalizeSearch = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

/**
 * Diz se o post responde à consulta. Todas as palavras da consulta precisam
 * casar com o INÍCIO de alguma palavra do título, do subtítulo, do resumo, da
 * autoria ou dos tópicos, sem acento e sem caixa: "ana" acha a Ana, e não
 * "Canastra". Consulta vazia casa com tudo.
 */
export const ublMatchesQuery = (post: UblPost, authors: UblAuthor[], topics: UblTopic[], query: string) => {
  const terms = ublNormalizeSearch(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const author = authors.find((candidate) => candidate.id === post.authorId);
  const topicLabels = post.topicIds.map((id) => topics.find((topic) => topic.id === id)?.label);
  const words = ublNormalizeSearch(
    [post.title, post.subtitle, post.summary, author?.name, ...topicLabels].filter(Boolean).join(' ')
  )
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return terms.every((term) => words.some((word) => word.startsWith(term)));
};

/**
 * Âncora estável de um intertítulo: sem acento, em minúsculas, com hífens no
 * lugar de tudo que não for letra ou número. "O contorno que sobrevive!" vira
 * `o-contorno-que-sobrevive`.
 */
export const ublHeadingId = (text: string) => {
  const slug = ublNormalizeSearch(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'secao';
};

/** Sumário do post: um item por intertítulo, na ordem do texto. */
export const ublTableOfContents = (blocks: UblBlock[]): UblTocItem[] =>
  blocks.flatMap((block) =>
    block.type === 'heading' ? [{ id: block.id, label: block.text, level: block.level }] : []
  );

/**
 * Número de code points de um texto. `String.length` conta unidades UTF-16 e
 * contaria um emoji como dois caracteres, o que faria o limite do comentário
 * reprovar um texto que a pessoa vê com menos caracteres.
 */
export const ublCodePoints = (text: string) => Array.from(text).length;
