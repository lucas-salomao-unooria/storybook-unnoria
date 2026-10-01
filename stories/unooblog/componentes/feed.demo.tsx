import { ublFormatDate, ublReadingLabel } from '../../../src/unooblog/content';
import type { UblPost } from '../../../src/unooblog/content';
import { ublAuthors, ublComments, ublPosts, ublSeries, ublTopics } from '../fixtures';

/**
 * Andaime de documentação da família "Feed" do Unooblog. NÃO integra o pacote:
 * só traduz os posts das fixtures nas props dos componentes reais, para que
 * cada estória não repita o mesmo mapeamento.
 */

/** O post em destaque da publicação. */
export const postEmDestaque = ublPosts.find((post) => post.featured) ?? ublPosts[0];

/** Posts sem o destaque, da publicação mais recente à mais antiga. */
export const postsDoFeed = ublPosts.filter((post) => !post.featured);

/** Autoria de um post (a das fixtures sempre existe). */
export const autoriaDoPost = (post: UblPost) =>
  ublAuthors.find((author) => author.id === post.authorId) ?? ublAuthors[0];

/** Nome do primeiro tópico do post. */
export const topicoDoPost = (post: UblPost) =>
  ublTopics.find((topic) => topic.id === post.topicIds[0])?.label;

/** Título da série do post, quando há. */
export const serieDoPost = (post: UblPost) =>
  ublSeries.find((series) => series.id === post.seriesId)?.title;

/** Props do `PostCard` a partir de um post. */
export const propsDoPostCard = (post: UblPost) => {
  const author = autoriaDoPost(post);
  return {
    title: post.title,
    summary: post.summary,
    coverSrc: post.coverSrc,
    coverAlt: post.coverAlt,
    topic: topicoDoPost(post),
    author: author.name,
    authorAvatarSrc: author.avatarSrc,
    date: ublFormatDate(post.publishedAt, { style: 'short' }),
    dateTime: post.publishedAt.slice(0, 10),
    readingTime: ublReadingLabel(post.readingMinutes),
    comments: ublComments.filter((comment) => comment.postId === post.id).length,
  };
};

/** Props do `PostMeta` a partir de um post. */
export const propsDoPostMeta = (post: UblPost) => {
  const { author, authorAvatarSrc, date, dateTime, readingTime, comments } = propsDoPostCard(post);
  return { author, avatarSrc: authorAvatarSrc, date, dateTime, readingTime, comments };
};

/** Props do `AuthorCard` a partir da autoria de um post. */
export const propsDoAuthorCard = (post: UblPost) => {
  const author = autoriaDoPost(post);
  return {
    name: author.name,
    role: author.role,
    bio: author.bio,
    avatarSrc: author.avatarSrc,
    followers: author.followers,
  };
};

/** Props do `SeriesCard` a partir de uma série das fixtures. */
export const propsDoSeriesCard = (index = 0) => {
  const series = ublSeries[index] ?? ublSeries[0];
  return {
    title: series.title,
    description: series.description,
    coverSrc: series.coverSrc,
    count: series.postIds.length,
  };
};

/** Tópicos com a contagem de posts de cada um, para a nuvem. */
export const topicosComContagem = ublTopics.map((topic) => ({
  id: topic.id,
  label: topic.label,
  count: ublPosts.filter((post) => post.topicIds.includes(topic.id)).length,
}));
