'use client';

import React, { forwardRef, useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { NEWS_MEDIUM_ICONS, NEWS_MEDIUM_LABELS } from './NewsCard.medium';
import type { NewsCardProps } from './NewsCard.types';
import './NewsCard.css';

/** `ReactNode` que de fato renderiza algo (descarta `null`, `false` e texto vazio). */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

/**
 * Componente NewsCard — Plataforma Unooria
 *
 * O cartão compacto da mesa da redação: faixa do meio, imagem 16:9 (ou o
 * desenho do meio), manchete e resumo. Design próprio — a seção não tem quadro
 * de notícia no Figma; as medidas são as do `Card` (fio de 1px, raio de 12px,
 * recuo de 16px), da `Tag` `md` (a faixa do meio e o selo) e o foco do `Button`.
 *
 * **O cartão inteiro é um `<button>`**, porque a ação é uma só: abrir a matéria
 * original. Um botão "ler mais" dentro de um cartão clicável seria um alvo
 * pequeno dentro de um alvo grande, e para a criança de 9 anos o alvo grande é
 * o que funciona. Por ser botão, o conteúdo só pode ter elementos de frase — por
 * isso tudo aqui dentro é `<span>`, e a manchete não é um `<h3>`.
 *
 * **O nome do botão é a manchete**, e não o conteúdo inteiro: sem
 * `aria-labelledby`, o leitor de tela leria meio, texto alternativo da imagem,
 * manchete, resumo e selo de uma vez só. O meio, o resumo e a imagem vão para a
 * descrição, que é lida depois, numa pausa.
 *
 * **"Na capa" não é `aria-pressed`.** O botão abre a gaveta; quem tira ou põe a
 * notícia na capa é outro controle. Anunciar "pressionado" prometeria uma
 * alternância que o toque não faz. O estado vai no nome: ", na capa".
 *
 * `'use client'` pelo estado da imagem que falhou e pelo `useId`.
 */
export const NewsCard = forwardRef<HTMLButtonElement, NewsCardProps>(
  (
    {
      medium,
      headline,
      summary,
      imageSrc,
      imageAlt,
      onFrontPage = false,
      frontPageLabel = 'Na capa',
      mediumLabel,
      theme = 'light',
      className = '',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const baseId = useId();
    const mancheteId = `${baseId}-manchete`;
    const meioId = `${baseId}-meio`;
    const resumoId = `${baseId}-resumo`;
    const imagemId = `${baseId}-imagem`;

    // Guarda QUAL endereço falhou, e não um booleano: trocar de `imageSrc` já
    // devolve a imagem nova sem efeito nenhum para "zerar" o erro do anterior.
    const [enderecoQueFalhou, setEnderecoQueFalhou] = useState<string | null>(null);

    const rotuloDoMeio = mediumLabel ?? NEWS_MEDIUM_LABELS[medium];
    const temImagem = Boolean(imageSrc) && enderecoQueFalhou !== imageSrc;
    const temResumo = temConteudo(summary);
    const temTextoAlternativo = temImagem && Boolean(imageAlt);

    // Precedência (a mesma do `Modal`, seção 4.3 do AGENTS.md): o que o
    // consumidor passar manda. Com `aria-label` explícito o botão NÃO recebe
    // `aria-labelledby`, que venceria o `aria-label` e o calaria sem aviso.
    const nomePorId = ariaLabelledBy ?? (ariaLabel ? undefined : mancheteId);
    const descricaoPorId =
      ariaDescribedBy ??
      [meioId, temResumo ? resumoId : null, temTextoAlternativo ? imagemId : null]
        .filter(Boolean)
        .join(' ');

    const classes = [
      'unooria-news-card',
      `unooria-news-card--${medium}`,
      onFrontPage ? 'unooria-news-card--front-page' : '',
      theme === 'dark' ? 'unooria-news-card--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        aria-labelledby={nomePorId}
        aria-describedby={descricaoPorId}
        className={classes}
        {...rest}
      >
        <span className="unooria-news-card__band">
          <span className="unooria-news-card__medium">
            {/* Sem `color`: o `Icon` o escreveria inline e venceria a cor da classe. */}
            <Icon name={NEWS_MEDIUM_ICONS[medium]} size="3xs" className="unooria-news-card__medium-icon" />
            <span id={meioId}>{rotuloDoMeio}</span>
          </span>
        </span>

        <span
          className={['unooria-news-card__media', temImagem ? '' : 'unooria-news-card__media--illustration']
            .filter(Boolean)
            .join(' ')}
        >
          {temImagem ? (
            <img
              id={imagemId}
              className="unooria-news-card__image"
              src={imageSrc}
              alt={imageAlt ?? ''}
              loading="lazy"
              decoding="async"
              onError={() => setEnderecoQueFalhou(imageSrc ?? null)}
            />
          ) : (
            <Icon name={NEWS_MEDIUM_ICONS[medium]} size="xl" color="currentColor" />
          )}
          {onFrontPage && (
            // No canto da imagem, e não na faixa: ali ele não quebra linha nem
            // desalinha a grade. O estado já está no nome (", na capa").
            <span className="unooria-news-card__front-page" aria-hidden="true">
              <Icon name="check_circle" size="3xs" fill color="currentColor" />
              {frontPageLabel}
            </span>
          )}
        </span>

        <span id={mancheteId} className="unooria-news-card__headline">
          {headline}
          {onFrontPage && (
            <span className="unooria-news-card__visually-hidden">
              , {frontPageLabel.toLocaleLowerCase('pt-BR')}
            </span>
          )}
        </span>

        {temResumo && (
          <span id={resumoId} className="unooria-news-card__summary">
            {summary}
          </span>
        )}
      </button>
    );
  }
);

NewsCard.displayName = 'NewsCard';

export default NewsCard;
