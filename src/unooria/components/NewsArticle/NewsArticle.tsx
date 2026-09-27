'use client';

import React, { forwardRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { NEWS_MEDIUM_ICONS, NEWS_MEDIUM_LABELS } from '../NewsCard/NewsCard.medium';
import type { NewsArticleMedium } from '../NewsCard/NewsCard.medium';
import type { NewsArticleProps } from './NewsArticle.types';
import './NewsArticle.css';

/** Os meios em que o quadro da imagem existe mesmo sem imagem (o desenho ocupa o lugar). */
const PEDEM_IMAGEM: ReadonlySet<NewsArticleMedium> = new Set<NewsArticleMedium>(['tv', 'portal']);

/** `ReactNode` que de fato renderiza algo (descarta `null`, `false` e texto vazio). */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

/**
 * Componente NewsArticle — Plataforma Unooria
 *
 * A matéria no formato do meio de origem, para a gaveta que o `NewsCard` abre.
 * Design próprio — a seção não tem quadro de notícia no Figma. Cada meio tem
 * uma apresentação reconhecível feita SÓ com tokens e a fonte da seção: não há
 * token de fonte serifada, então o jornal se reconhece pelo recorte, pela caixa
 * alta do cabeçalho com fio duplo e pelas colunas — não por uma serifa
 * inventada.
 *
 * - `newspaper`: recorte de jornal, com os cantos cortados a tesoura.
 * - `radio`: boletim transcrito, com o selo "No ar" e a fala em citação.
 * - `tv`: quadro 16:9 com a legenda numa tarja sobre a imagem, e a transcrição.
 * - `blog`: post, com espaçamento de leitura.
 * - `portal`: barra do veículo, manchete, imagem e corpo.
 * - `bulletin`: aviso do mural, com alfinete.
 *
 * O rádio não toca nada: a atividade não pode depender de som (sala barulhenta,
 * fone que falta, criança surda). O boletim chega transcrito.
 *
 * `'use client'` pelo estado da imagem que falhou ao carregar.
 */
export const NewsArticle = forwardRef<HTMLElement, NewsArticleProps>(
  (
    {
      medium,
      headline,
      children,
      masthead,
      imageSrc,
      imageAlt,
      caption,
      speaker,
      headingLevel = 3,
      onAirLabel = 'No ar',
      transcriptLabel = 'Transcrição',
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => {
    // Guarda QUAL endereço falhou: trocar de `imageSrc` já devolve a imagem nova.
    const [enderecoQueFalhou, setEnderecoQueFalhou] = useState<string | null>(null);

    const temImagem = Boolean(imageSrc) && enderecoQueFalhou !== imageSrc;
    const temVeiculo = temConteudo(masthead);
    const temLegenda = temConteudo(caption);
    const temQuadro = temImagem || PEDEM_IMAGEM.has(medium);

    const Titulo = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
    const iconeDoMeio = NEWS_MEDIUM_ICONS[medium];

    const classes = [
      'unooria-news-article',
      `unooria-news-article--${medium}`,
      theme === 'dark' ? 'unooria-news-article--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const titulo = <Titulo className="unooria-news-article__headline">{headline}</Titulo>;

    const corpo = <div className="unooria-news-article__body">{children}</div>;

    const quadro = temQuadro ? (
      <figure className="unooria-news-article__frame">
        {temImagem ? (
          <span className="unooria-news-article__media">
            <img
              className="unooria-news-article__image"
              src={imageSrc}
              alt={imageAlt ?? ''}
              loading="lazy"
              decoding="async"
              onError={() => setEnderecoQueFalhou(imageSrc ?? null)}
            />
          </span>
        ) : (
          <span className="unooria-news-article__media unooria-news-article__media--illustration">
            <Icon name={iconeDoMeio} size="xl" color="currentColor" />
          </span>
        )}
        {temLegenda && <figcaption className="unooria-news-article__caption">{caption}</figcaption>}
      </figure>
    ) : null;

    /** O nome do veículo numa linha, com o ícone do meio (tv e blog). */
    const veiculoComIcone = temVeiculo ? (
      <p className="unooria-news-article__masthead">
        <Icon name={iconeDoMeio} size="xxs" color="currentColor" />
        <span>{masthead}</span>
      </p>
    ) : null;

    let conteudo: React.ReactNode;
    switch (medium) {
      case 'newspaper':
        conteudo = (
          <>
            {temVeiculo ? (
              <p className="unooria-news-article__masthead">{masthead}</p>
            ) : (
              // Sem o nome do jornal, fica o fio duplo: o recorte continua recorte.
              <span className="unooria-news-article__masthead unooria-news-article__masthead--empty" aria-hidden="true" />
            )}
            {titulo}
            {quadro}
            {corpo}
          </>
        );
        break;

      case 'radio':
        conteudo = (
          <>
            <div className="unooria-news-article__on-air-bar">
              <span className="unooria-news-article__on-air">
                <Icon name={iconeDoMeio} size="3xs" color="currentColor" />
                {onAirLabel}
              </span>
              {temVeiculo && <p className="unooria-news-article__masthead">{masthead}</p>}
            </div>
            {titulo}
            {quadro}
            <figure className="unooria-news-article__speech">
              {temConteudo(speaker) && (
                <figcaption className="unooria-news-article__speaker">{speaker}</figcaption>
              )}
              <blockquote className="unooria-news-article__quote">{children}</blockquote>
            </figure>
          </>
        );
        break;

      case 'tv':
        conteudo = (
          <>
            {veiculoComIcone}
            {quadro}
            {titulo}
            <div className="unooria-news-article__transcript">
              <p className="unooria-news-article__label">{transcriptLabel}</p>
              {corpo}
            </div>
          </>
        );
        break;

      case 'portal':
        conteudo = (
          <>
            <div className="unooria-news-article__bar">
              <Icon name={iconeDoMeio} size="xs" color="currentColor" />
              {temVeiculo && <p className="unooria-news-article__masthead">{masthead}</p>}
            </div>
            {titulo}
            {quadro}
            {corpo}
          </>
        );
        break;

      case 'bulletin':
        conteudo = (
          <>
            {temVeiculo && <p className="unooria-news-article__masthead">{masthead}</p>}
            {titulo}
            {quadro}
            {corpo}
          </>
        );
        break;

      case 'blog':
      default:
        conteudo = (
          <>
            {veiculoComIcone}
            {titulo}
            {quadro}
            {corpo}
          </>
        );
        break;
    }

    return (
      <article
        ref={ref}
        aria-label={`Matéria original — ${NEWS_MEDIUM_LABELS[medium]}`}
        className={classes}
        {...rest}
      >
        {medium === 'bulletin' && (
          // Sem `color`: o `Icon` o escreveria inline e venceria a cor da classe.
          <Icon name={iconeDoMeio} size="l" fill className="unooria-news-article__pin" />
        )}
        <div className="unooria-news-article__sheet">{conteudo}</div>
      </article>
    );
  }
);

NewsArticle.displayName = 'NewsArticle';

export default NewsArticle;
