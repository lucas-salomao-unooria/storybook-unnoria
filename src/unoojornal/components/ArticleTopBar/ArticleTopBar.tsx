'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Masthead } from '../Masthead';
import { ReadingProgress } from '../ReadingProgress';
import type { UjnArticleTopBarProps } from './ArticleTopBar.types';
import './ArticleTopBar.css';

/**
 * Componente ArticleTopBar — Design System Unoojornal
 *
 * Barra superior da matéria aberta, de `--ujn-article-bar-height` (74px): o
 * atalho "Voltar para a capa" à esquerda, o nome da publicação ao centro (um
 * `Masthead` de tamanho `md`, sem fio) e a identificação da edição à direita.
 * Superfície `--ujn-color-surface-bar` com fio inferior; com `progress`, a faixa
 * do `ReadingProgress` fica embutida no topo.
 *
 * O atalho de volta é um link quando há `backHref` e um botão quando não há. No
 * contêiner compacto o texto do atalho e a edição somem, mas o nome acessível
 * do atalho permanece. Marcado como Client Component porque repassa `onBack`
 * ao elemento.
 */
export const ArticleTopBar = React.forwardRef<HTMLElement, UjnArticleTopBarProps>(
  (
    {
      backLabel = 'Voltar para a capa',
      backHref,
      onBack,
      title,
      edition,
      progress,
      progressLabel,
      actions,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['ujn-article-top-bar', className].filter(Boolean).join(' ');

    const backContent = (
      <>
        <Icon name="arrowBack" size="md" tone="inherit" />
        <span className="ujn-article-top-bar__back-text">{backLabel}</span>
      </>
    );

    const back = backHref ? (
      <a
        className="ujn-article-top-bar__back"
        href={backHref}
        aria-label={backLabel}
        onClick={onBack}
      >
        {backContent}
      </a>
    ) : (
      <button
        type="button"
        className="ujn-article-top-bar__back"
        aria-label={backLabel}
        onClick={onBack}
      >
        {backContent}
      </button>
    );

    return (
      <header ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        {progress !== undefined && (
          <ReadingProgress
            className="ujn-article-top-bar__progress"
            value={progress}
            label={progressLabel}
          />
        )}
        <div className="ujn-article-top-bar__bar">
          <div className="ujn-article-top-bar__side ujn-article-top-bar__side--start">{back}</div>
          <div className="ujn-article-top-bar__title">
            <Masthead title={title} size="md" rule="none" as="p" align="center" />
          </div>
          <div className="ujn-article-top-bar__side ujn-article-top-bar__side--end">
            {edition && <span className="ujn-article-top-bar__edition">{edition}</span>}
            {actions}
          </div>
        </div>
      </header>
    );
  }
);

ArticleTopBar.displayName = 'ArticleTopBar';
