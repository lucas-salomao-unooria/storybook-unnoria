import type { UjnArticle, UjnAuthor, UjnLetter, UjnSectionId, UjnTextSize } from '../../edition';
import { ujnCodePoints, ujnMatchesQuery } from '../../edition';

/**
 * Estado do `NewsApp` e as operações que o jornal oferece.
 *
 * É lógica pura, sem React: um redutor e seletores. Fica separado da interface
 * para que um produto que monte o próprio jornal com os componentes do módulo
 * reaproveite exatamente as mesmas regras — o que é salvo e em que ordem, o que
 * conta como lido, como a matéria relacionada é escolhida e o que a carta do
 * leitor precisa ter para ser enviada.
 */

/** Menor número de code points do nome de quem escreve a carta. */
export const UJN_LETTER_NAME_MIN = 2;

/** Menor número de code points do texto da carta. */
export const UJN_LETTER_TEXT_MIN = 20;

/** Maior número de code points do texto da carta. */
export const UJN_LETTER_TEXT_MAX = 600;

/**
 * Estado do jornal.
 */
export interface UjnNewsState {
  /** Todas as matérias da edição */
  articles: UjnArticle[];
  /** Ids das matérias salvas, na ordem em que foram salvas (a mais antiga primeiro) */
  saved: string[];
  /** Ids das matérias já lidas */
  read: string[];
  /** Progresso de leitura de cada matéria, de 0 a 100, por id */
  progress: Record<string, number>;
  /** Tamanho do texto de leitura */
  textSize: UjnTextSize;
  /** Cartas enviadas à redação, a mais recente primeiro */
  letters: UjnLetter[];
}

/**
 * Operações sobre o estado do jornal.
 */
export type UjnNewsAction =
  | { type: 'save'; id: string }
  | { type: 'unsave'; id: string }
  | { type: 'toggleSave'; id: string }
  | { type: 'markRead'; id: string }
  | { type: 'setProgress'; id: string; value: number }
  | { type: 'setTextSize'; size: UjnTextSize }
  | { type: 'sendLetter'; letter: UjnLetter }
  | { type: 'deleteLetter'; id: string }
  | { type: 'clearSaved' }
  | { type: 'replace'; state: UjnNewsState };

/** Filtro de seção: uma seção ou `todas`. */
export type UjnSectionFilter = UjnSectionId | 'todas';

/** Opções de `ujnSelectLatest`. */
export interface UjnSelectLatestOptions {
  /** Restringe a uma seção (`todas` ou ausente: sem restrição) */
  section?: UjnSectionFilter;
  /** Consulta de busca, por início de palavra e sem acento */
  query?: string;
  /** Autoria, para a busca casar também pelo nome de quem assina */
  authors?: UjnAuthor[];
}

/** Resultado de `ujnValidateLetter`. */
export interface UjnLetterValidation {
  /** A carta pode ser enviada */
  ok: boolean;
  /** Mensagem em português do primeiro problema encontrado */
  error?: string;
}

/**
 * Cria o estado inicial: nada salvo, nada lido, texto médio, sem cartas.
 */
export const ujnCreateNewsState = (
  articles: UjnArticle[],
  initial: Partial<Omit<UjnNewsState, 'articles'>> = {}
): UjnNewsState => ({
  articles,
  saved: [],
  read: [],
  progress: {},
  textSize: 'md',
  letters: [],
  ...initial,
});

const hasArticle = (state: UjnNewsState, id: string) => state.articles.some((article) => article.id === id);

const clampProgress = (value: number) => (Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0);

/**
 * Redutor do jornal. Nunca altera o estado recebido, e uma operação que não muda
 * nada (id inexistente, matéria já salva, valor igual) devolve o MESMO objeto,
 * para que quem compara por referência não renderize à toa.
 */
export function ujnNewsReducer(state: UjnNewsState, action: UjnNewsAction): UjnNewsState {
  switch (action.type) {
    case 'save':
      if (!hasArticle(state, action.id) || state.saved.includes(action.id)) return state;
      return { ...state, saved: [...state.saved, action.id] };

    case 'unsave':
      if (!state.saved.includes(action.id)) return state;
      return { ...state, saved: state.saved.filter((id) => id !== action.id) };

    case 'toggleSave':
      return ujnNewsReducer(state, { type: state.saved.includes(action.id) ? 'unsave' : 'save', id: action.id });

    case 'markRead':
      if (!hasArticle(state, action.id) || state.read.includes(action.id)) return state;
      return { ...state, read: [...state.read, action.id] };

    case 'setProgress': {
      if (!hasArticle(state, action.id)) return state;
      const value = clampProgress(action.value);
      if ((state.progress[action.id] ?? 0) === value && action.id in state.progress) return state;
      return { ...state, progress: { ...state.progress, [action.id]: value } };
    }

    case 'setTextSize':
      if (state.textSize === action.size) return state;
      return { ...state, textSize: action.size };

    case 'sendLetter':
      if (state.letters.some((letter) => letter.id === action.letter.id)) return state;
      return { ...state, letters: [action.letter, ...state.letters] };

    case 'deleteLetter':
      if (!state.letters.some((letter) => letter.id === action.id)) return state;
      return { ...state, letters: state.letters.filter((letter) => letter.id !== action.id) };

    case 'clearSaved':
      if (state.saved.length === 0) return state;
      return { ...state, saved: [] };

    case 'replace':
      return action.state;

    default:
      return state;
  }
}

/* ==========================================================================
   Seletores
   ========================================================================== */

const byPublishedDesc = (a: UjnArticle, b: UjnArticle) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

/** Cópia ordenada da mais recente à mais antiga (a ordem de entrada desempata). */
const sortLatest = (articles: UjnArticle[]) => [...articles].sort(byPublishedDesc);

/**
 * Matérias da mais recente à mais antiga, com seção e busca opcionais. A busca é
 * por início de palavra, sem acento, em título, resumo, chapéu e autoria.
 */
export const ujnSelectLatest = (state: UjnNewsState, options: UjnSelectLatestOptions = {}): UjnArticle[] => {
  const { section, query, authors = [] } = options;
  return sortLatest(
    state.articles.filter(
      (article) =>
        (!section || section === 'todas' || article.section === section) &&
        (!query || ujnMatchesQuery(article, authors, query))
    )
  );
};

/**
 * Matéria principal da capa: a marcada como `featured` e, na falta dela, a mais
 * recente que não seja de opinião.
 */
export const ujnSelectFeatured = (state: UjnNewsState): UjnArticle | undefined =>
  sortLatest(state.articles).find((article) => article.featured) ??
  sortLatest(state.articles).find((article) => !article.opinion);

/** Textos de opinião, do mais recente ao mais antigo. */
export const ujnSelectOpinion = (state: UjnNewsState): UjnArticle[] =>
  sortLatest(state.articles.filter((article) => article.opinion || article.section === 'opiniao'));

/** Matérias salvas, a salva mais recente primeiro. */
export const ujnSelectSaved = (state: UjnNewsState): UjnArticle[] =>
  [...state.saved]
    .reverse()
    .map((id) => state.articles.find((article) => article.id === id))
    .filter((article): article is UjnArticle => Boolean(article));

/** Matérias de uma seção, da mais recente à mais antiga. */
export const ujnSelectBySection = (state: UjnNewsState, section: UjnSectionId): UjnArticle[] =>
  ujnSelectLatest(state, { section });

/**
 * Matérias para o "Leia também": as da mesma seção primeiro, depois as mais
 * recentes das outras, sempre da mais nova para a mais antiga e nunca a própria.
 */
export const ujnSelectRelated = (state: UjnNewsState, articleId: string, count = 3): UjnArticle[] => {
  const current = state.articles.find((article) => article.id === articleId);
  if (!current) return [];
  const others = sortLatest(state.articles.filter((article) => article.id !== articleId));
  const sameSection = others.filter((article) => article.section === current.section);
  const rest = others.filter((article) => article.section !== current.section);
  return [...sameSection, ...rest].slice(0, Math.max(0, count));
};

/** Quantas matérias há em cada seção, mais o total em `todas`. */
export const ujnSectionCounts = (state: UjnNewsState): Record<UjnSectionFilter, number> => {
  const counts: Record<UjnSectionFilter, number> = {
    todas: state.articles.length,
    'vida-escolar': 0,
    ciencia: 0,
    cultura: 0,
    esportes: 0,
    opiniao: 0,
  };
  state.articles.forEach((article) => {
    counts[article.section] += 1;
  });
  return counts;
};

/** Matérias ainda não lidas, da mais recente à mais antiga. */
export const ujnSelectUnread = (state: UjnNewsState): UjnArticle[] =>
  sortLatest(state.articles.filter((article) => !state.read.includes(article.id)));

/**
 * Valida uma carta antes do envio: nome com ao menos 2 e texto entre 20 e 600
 * CODE POINTS (um emoji conta como um), sem contar espaços nas pontas.
 */
export const ujnValidateLetter = (text: string, name: string): UjnLetterValidation => {
  const nameLength = ujnCodePoints(name.trim());
  if (nameLength < UJN_LETTER_NAME_MIN) {
    return { ok: false, error: `Informe seu nome, com ao menos ${UJN_LETTER_NAME_MIN} caracteres.` };
  }

  const textLength = ujnCodePoints(text.trim());
  if (textLength < UJN_LETTER_TEXT_MIN) {
    return { ok: false, error: `Escreva ao menos ${UJN_LETTER_TEXT_MIN} caracteres para enviar a carta.` };
  }
  if (textLength > UJN_LETTER_TEXT_MAX) {
    return { ok: false, error: `A carta pode ter no máximo ${UJN_LETTER_TEXT_MAX} caracteres.` };
  }

  return { ok: true };
};
