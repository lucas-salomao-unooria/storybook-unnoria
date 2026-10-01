import { ujnReadingLabel, ujnTimeAgo } from '../../../src/unoojornal/edition';
import type { UjnArticle } from '../../../src/unoojornal/edition';
import { ujnArticles, ujnAuthors, ujnDemoNow } from '../fixtures';

/**
 * Andaime de documentação da família "Conteúdo da capa" do Unoojornal. NÃO
 * integra o pacote: só traduz as matérias das fixtures nas props dos
 * componentes reais, para que cada estória não repita o mesmo mapeamento.
 */

/** Autoria de uma matéria (a das fixtures sempre existe). */
export const autoriaDe = (article: UjnArticle) => {
  const author = ujnAuthors.find((candidate) => candidate.id === article.authorId);
  return {
    name: author?.name ?? 'Redação',
    role: author?.role,
    avatarSrc: author?.avatarSrc,
  };
};

/** A matéria principal da capa. */
export const materiaPrincipal = ujnArticles.find((article) => article.featured) ?? ujnArticles[0];

/** A matéria de opinião. */
export const materiaDeOpiniao = ujnArticles.find((article) => article.opinion) ?? ujnArticles[0];

/** Matérias da lista, sem a principal. */
export const materiasDaLista = ujnArticles.filter((article) => !article.featured).slice(0, 5);

/** Props do `FeaturedStory` a partir de uma matéria. */
export const propsDoDestaque = (article: UjnArticle) => {
  const author = autoriaDe(article);
  return {
    kicker: article.kicker,
    title: article.title,
    summary: article.summary,
    imageSrc: article.imageSrc,
    imageAlt: article.imageAlt,
    author: author.name,
    authorRole: author.role,
    readingTime: ujnReadingLabel(article.readingMinutes),
  };
};

/** Props do `ArticleListItem` a partir de uma matéria. */
export const propsDoItem = (article: UjnArticle) => {
  const author = autoriaDe(article);
  return {
    kicker: article.kicker,
    timeAgo: ujnTimeAgo(article.publishedAt, ujnDemoNow),
    title: article.title,
    summary: article.summary,
    author: author.name,
    authorRole: author.role,
    readingTime: ujnReadingLabel(article.readingMinutes),
  };
};

/** Props do `ArticleCard` a partir de uma matéria. */
export const propsDoCartao = (article: UjnArticle) => ({
  imageSrc: article.imageSrc,
  imageAlt: article.imageAlt,
  kicker: article.kicker,
  title: article.title,
  readingTime: ujnTimeAgo(article.publishedAt, ujnDemoNow),
});

/** Item do `RelatedArticles` a partir de uma matéria. */
export const itemRelacionado = (article: UjnArticle) => ({
  id: article.id,
  kicker: article.kicker,
  title: article.title,
  readingTime: ujnReadingLabel(article.readingMinutes),
  imageSrc: article.imageSrc,
  imageAlt: article.imageAlt,
});
