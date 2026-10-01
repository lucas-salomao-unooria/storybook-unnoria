import type { UblAuthor, UblComment, UblPost, UblTopic } from '../../content';
import { ublCodePoints, ublMatchesQuery } from '../../content';

/**
 * Estado do `BlogApp` e as operações que o blog oferece.
 *
 * É lógica pura, sem React: um redutor e seletores. Fica separado da interface
 * para que um produto que monte o próprio blog com os componentes do módulo
 * reaproveite exatamente as mesmas regras — o que é curtido e salvo, como a
 * contagem sobe quando a pessoa curte, o que acontece com as respostas quando um
 * comentário é excluído, como o post relacionado é escolhido e o que o
 * comentário e o e-mail da newsletter precisam ter para serem aceitos.
 */

/** Menor número de code points de um comentário (depois de tirar os espaços das pontas). */
export const UBL_COMMENT_MIN = 1;

/** Maior número de code points de um comentário. */
export const UBL_COMMENT_MAX = 1000;

/** Maior comprimento de um endereço de e-mail, em caracteres. */
export const UBL_EMAIL_MAX = 254;

/** Valor de filtro de tópico que não restringe nada. */
export const UBL_ALL_TOPICS = 'todos';

/**
 * Estado do blog.
 */
export interface UblBlogState {
  /** Todos os posts do blog */
  posts: UblPost[];
  /** Todos os comentários, planos, com respostas ligadas por `parentId` */
  comments: UblComment[];
  /** Ids dos posts curtidos pela pessoa que lê, na ordem em que foram curtidos */
  liked: string[];
  /**
   * Ids dos comentários curtidos pela pessoa que lê. É um campo próprio, e não
   * ids de comentário misturados em `liked` com um prefixo, para que cada lista
   * guarde uma só espécie de id.
   */
  likedComments: string[];
  /** Ids dos posts salvos, na ordem em que foram salvos (o mais antigo primeiro) */
  saved: string[];
  /** Ids das autorias seguidas */
  following: string[];
  /** Ids dos posts já lidos */
  read: string[];
  /** Progresso de leitura de cada post, de 0 a 100, por id */
  progress: Record<string, number>;
  /** E-mail inscrito na newsletter, ou `null` se ninguém assinou */
  subscribedEmail: string | null;
}

/**
 * Operações sobre o estado do blog.
 */
export type UblBlogAction =
  | { type: 'toggleLike'; postId: string }
  | { type: 'toggleSave'; postId: string }
  | { type: 'toggleFollow'; authorId: string }
  | { type: 'addComment'; comment: UblComment }
  | { type: 'deleteComment'; id: string }
  | { type: 'toggleCommentLike'; id: string }
  | { type: 'subscribe'; email: string }
  | { type: 'setProgress'; postId: string; value: number }
  | { type: 'markRead'; postId: string }
  | { type: 'clearSaved' }
  | { type: 'replace'; state: UblBlogState };

/** Filtro de tópico: o id de um tópico ou `todos`. */
export type UblTopicFilter = string;

/** Opções de `ublSelectLatest`. */
export interface UblSelectLatestOptions {
  /** Restringe a um tópico (`todos` ou ausente: sem restrição) */
  topicId?: UblTopicFilter;
  /** Consulta de busca, por início de palavra e sem acento */
  query?: string;
  /** Autoria, para a busca casar também pelo nome de quem assina */
  authors?: UblAuthor[];
  /** Tópicos, para a busca casar também pelo rótulo do tópico */
  topics?: UblTopic[];
}

/** Resultado de `ublValidateComment` e `ublValidateEmail`. */
export interface UblValidation {
  /** O valor pode ser aceito */
  ok: boolean;
  /** Mensagem em português do problema encontrado */
  error?: string;
}

/**
 * Cria o estado inicial: nada curtido, salvo, seguido ou lido, e ninguém inscrito.
 * `initial` sobrepõe qualquer um desses campos, útil para estórias que partem de
 * um estado já usado.
 */
export const ublCreateBlogState = (
  posts: UblPost[],
  comments: UblComment[],
  initial: Partial<Omit<UblBlogState, 'posts' | 'comments'>> = {}
): UblBlogState => ({
  posts,
  comments,
  liked: [],
  likedComments: [],
  saved: [],
  following: [],
  read: [],
  progress: {},
  subscribedEmail: null,
  ...initial,
});

/* ==========================================================================
   Validação
   ========================================================================== */

/**
 * Valida o texto de um comentário: de 1 a 1000 CODE POINTS (um emoji conta como
 * um), sem contar os espaços das pontas.
 */
export const ublValidateComment = (text: string): UblValidation => {
  const length = ublCodePoints(text.trim());
  if (length < UBL_COMMENT_MIN) return { ok: false, error: 'Escreva um comentário antes de enviar.' };
  if (length > UBL_COMMENT_MAX) {
    return { ok: false, error: `O comentário pode ter no máximo ${UBL_COMMENT_MAX} caracteres.` };
  }
  return { ok: true };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

/**
 * Valida o formato de um e-mail: uma parte local, um arroba e um domínio com
 * ponto e sufixo de ao menos duas letras, sem espaços e com até 254 caracteres.
 * É uma checagem de formato, não de existência da caixa.
 */
export const ublValidateEmail = (email: string): UblValidation => {
  const value = email.trim();
  if (!value) return { ok: false, error: 'Informe seu e-mail.' };
  if (value.length > UBL_EMAIL_MAX || !EMAIL_PATTERN.test(value)) {
    return { ok: false, error: 'Informe um e-mail válido, como nome@exemplo.com.' };
  }
  return { ok: true };
};

/* ==========================================================================
   Redutor
   ========================================================================== */

const hasPost = (state: UblBlogState, id: string) => state.posts.some((post) => post.id === id);

const hasAuthor = (state: UblBlogState, id: string) => state.posts.some((post) => post.authorId === id);

const clampProgress = (value: number) => (Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 0);

/** Liga ou desliga um id numa lista, devolvendo uma lista nova. */
const toggled = (list: string[], id: string) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

/** Ids de um comentário e de todas as respostas dele, em qualquer profundidade. */
const withDescendants = (comments: UblComment[], rootId: string) => {
  const removed = new Set([rootId]);
  let grew = true;
  while (grew) {
    grew = false;
    comments.forEach((comment) => {
      if (comment.parentId && removed.has(comment.parentId) && !removed.has(comment.id)) {
        removed.add(comment.id);
        grew = true;
      }
    });
  }
  return removed;
};

/**
 * Redutor do blog. Nunca altera o estado recebido, e uma operação que não muda
 * nada (id inexistente, comentário inválido, progresso que não avança, e-mail já
 * inscrito) devolve o MESMO objeto, para que quem compara por referência não
 * renderize à toa.
 *
 * - `toggleLike`, `toggleSave`: o post precisa existir.
 * - `toggleFollow`: a autoria precisa assinar ao menos um post (o estado não
 *   guarda a lista de autorias).
 * - `addComment`: o post precisa existir, o id não pode repetir, o texto precisa
 *   passar em `ublValidateComment` e, numa resposta, o comentário respondido
 *   precisa existir no mesmo post. O comentário entra como veio; a profundidade
 *   das respostas é decisão de quem monta a interface.
 * - `deleteComment`: apaga o comentário e, em cascata, todas as respostas dele, e
 *   tira os ids apagados de `likedComments`.
 * - `subscribe`: guarda o e-mail (sem os espaços das pontas) se for válido.
 * - `setProgress`: vai de 0 a 100, é arredondado e SÓ AVANÇA; recuar a rolagem não
 *   apaga o que já foi lido.
 */
export function ublBlogReducer(state: UblBlogState, action: UblBlogAction): UblBlogState {
  switch (action.type) {
    case 'toggleLike':
      if (!hasPost(state, action.postId)) return state;
      return { ...state, liked: toggled(state.liked, action.postId) };

    case 'toggleSave':
      if (!hasPost(state, action.postId)) return state;
      return { ...state, saved: toggled(state.saved, action.postId) };

    case 'toggleFollow':
      if (!hasAuthor(state, action.authorId)) return state;
      return { ...state, following: toggled(state.following, action.authorId) };

    case 'addComment': {
      const { comment } = action;
      if (!hasPost(state, comment.postId)) return state;
      if (state.comments.some((existing) => existing.id === comment.id)) return state;
      if (!ublValidateComment(comment.text).ok) return state;
      if (comment.parentId) {
        const parent = state.comments.find((existing) => existing.id === comment.parentId);
        if (!parent || parent.postId !== comment.postId) return state;
      }
      return { ...state, comments: [...state.comments, comment] };
    }

    case 'deleteComment': {
      if (!state.comments.some((comment) => comment.id === action.id)) return state;
      const removed = withDescendants(state.comments, action.id);
      return {
        ...state,
        comments: state.comments.filter((comment) => !removed.has(comment.id)),
        likedComments: state.likedComments.filter((id) => !removed.has(id)),
      };
    }

    case 'toggleCommentLike':
      if (!state.comments.some((comment) => comment.id === action.id)) return state;
      return { ...state, likedComments: toggled(state.likedComments, action.id) };

    case 'subscribe': {
      if (!ublValidateEmail(action.email).ok) return state;
      const email = action.email.trim();
      if (state.subscribedEmail === email) return state;
      return { ...state, subscribedEmail: email };
    }

    case 'setProgress': {
      if (!hasPost(state, action.postId)) return state;
      const value = clampProgress(action.value);
      const current = state.progress[action.postId];
      if (current !== undefined && value <= current) return state;
      if (current === undefined && value === 0) return state;
      return { ...state, progress: { ...state.progress, [action.postId]: value } };
    }

    case 'markRead':
      if (!hasPost(state, action.postId) || state.read.includes(action.postId)) return state;
      return { ...state, read: [...state.read, action.postId] };

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

const time = (iso: string) => new Date(iso).getTime();

const byPublishedDesc = (a: UblPost, b: UblPost) => time(b.publishedAt) - time(a.publishedAt);

/** Cópia ordenada do mais recente ao mais antigo (a ordem de entrada desempata). */
const sortLatest = (posts: UblPost[]) => [...posts].sort(byPublishedDesc);

/**
 * Posts do mais recente ao mais antigo, com tópico e busca opcionais. A busca é
 * por início de palavra, sem acento, em título, subtítulo, resumo, autoria e
 * tópicos (a autoria e os tópicos só entram na busca se passados em `options`).
 */
export const ublSelectLatest = (state: UblBlogState, options: UblSelectLatestOptions = {}): UblPost[] => {
  const { topicId, query, authors = [], topics = [] } = options;
  const restrict = topicId && topicId !== UBL_ALL_TOPICS;
  return sortLatest(
    state.posts.filter(
      (post) =>
        (!restrict || post.topicIds.includes(topicId)) &&
        (!query || ublMatchesQuery(post, authors, topics, query))
    )
  );
};

/** Posts em destaque (`featured`), do mais recente ao mais antigo. */
export const ublSelectFeatured = (state: UblBlogState): UblPost[] =>
  sortLatest(state.posts.filter((post) => post.featured));

/** Posts salvos, o salvo mais recentemente primeiro. */
export const ublSelectSaved = (state: UblBlogState): UblPost[] =>
  [...state.saved]
    .reverse()
    .map((id) => state.posts.find((post) => post.id === id))
    .filter((post): post is UblPost => Boolean(post));

/** Posts de um tópico, do mais recente ao mais antigo. */
export const ublSelectByTopic = (state: UblBlogState, topicId: string): UblPost[] =>
  ublSelectLatest(state, { topicId });

/** Posts de uma autoria, do mais recente ao mais antigo. */
export const ublSelectByAuthor = (state: UblBlogState, authorId: string): UblPost[] =>
  sortLatest(state.posts.filter((post) => post.authorId === authorId));

/** Posts de uma série, na ordem de leitura (`seriesPart` crescente). */
export const ublSelectBySeries = (state: UblBlogState, seriesId: string): UblPost[] =>
  state.posts
    .filter((post) => post.seriesId === seriesId)
    .sort((a, b) => (a.seriesPart ?? Number.MAX_SAFE_INTEGER) - (b.seriesPart ?? Number.MAX_SAFE_INTEGER));

/**
 * Posts para o "Continue lendo": primeiro os que dividem mais tópicos com o post
 * atual, e depois os mais recentes. Dentro de cada grupo, do mais novo para o mais
 * antigo, e nunca o próprio post.
 */
export const ublSelectRelated = (state: UblBlogState, postId: string, count = 3): UblPost[] => {
  const current = state.posts.find((post) => post.id === postId);
  if (!current) return [];
  const shared = (post: UblPost) => post.topicIds.filter((id) => current.topicIds.includes(id)).length;
  return sortLatest(state.posts.filter((post) => post.id !== postId))
    .map((post, index) => ({ post, index, score: shared(post) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ post }) => post)
    .slice(0, Math.max(0, count));
};

const byCreatedAsc = (a: UblComment, b: UblComment) => time(a.createdAt) - time(b.createdAt);

/**
 * Comentários de um post na ordem de exibição, planos: as raízes mais recentes
 * primeiro e, logo depois de cada uma, as respostas em ordem cronológica (e as
 * respostas das respostas, em qualquer profundidade). Um comentário cujo
 * `parentId` não existe mais é tratado como raiz.
 */
export const ublSelectComments = (state: UblBlogState, postId: string): UblComment[] => {
  const all = state.comments.filter((comment) => comment.postId === postId);
  const ids = new Set(all.map((comment) => comment.id));
  const children = new Map<string, UblComment[]>();
  const roots: UblComment[] = [];

  all.forEach((comment) => {
    if (comment.parentId && ids.has(comment.parentId)) {
      children.set(comment.parentId, [...(children.get(comment.parentId) ?? []), comment]);
    } else {
      roots.push(comment);
    }
  });

  const ordered: UblComment[] = [];
  const visit = (comment: UblComment) => {
    ordered.push(comment);
    [...(children.get(comment.id) ?? [])].sort(byCreatedAsc).forEach(visit);
  };
  [...roots].sort((a, b) => byCreatedAsc(b, a)).forEach(visit);
  return ordered;
};

/** Quantos comentários o post tem, contando as respostas. */
export const ublCommentCount = (state: UblBlogState, postId: string) =>
  state.comments.filter((comment) => comment.postId === postId).length;

/** Curtidas de um post: a base mais um, quando a pessoa que lê curtiu. */
export const ublLikeCount = (state: UblBlogState, post: UblPost) => post.likes + (state.liked.includes(post.id) ? 1 : 0);

/** Curtidas de um comentário: a base mais um, quando a pessoa que lê curtiu. */
export const ublCommentLikes = (state: UblBlogState, comment: UblComment) =>
  comment.likes + (state.likedComments.includes(comment.id) ? 1 : 0);

/** Seguidores de uma autoria: a base mais um, quando a pessoa que lê segue. */
export const ublFollowerCount = (author: UblAuthor, state: UblBlogState) =>
  author.followers + (state.following.includes(author.id) ? 1 : 0);

/** Quantos posts há em cada tópico, mais o total em `todos`. */
export const ublTopicCounts = (state: UblBlogState): Record<string, number> => {
  const counts: Record<string, number> = { [UBL_ALL_TOPICS]: state.posts.length };
  state.posts.forEach((post) => {
    post.topicIds.forEach((id) => {
      counts[id] = (counts[id] ?? 0) + 1;
    });
  });
  return counts;
};

/** Posts ainda não lidos, do mais recente ao mais antigo. */
export const ublSelectUnread = (state: UblBlogState): UblPost[] =>
  sortLatest(state.posts.filter((post) => !state.read.includes(post.id)));
