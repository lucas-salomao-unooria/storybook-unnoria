'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UjnOpinionBoxProps } from './OpinionBox.types';
import './OpinionBox.css';

/**
 * Componente OpinionBox — Design System Unoojornal
 *
 * Caixa lateral "Opinião em destaque": sobrescrito com o glifo de opinião,
 * título, citação em itálico (`quote`), autoria e apoio ("Espaço Aberto").
 * Cartão plano, separado por fio e por camada. O título é o alvo principal
 * (`<a>` com `href`, `<button>` com `onOpen`) e o cartão inteiro clica por
 * pseudo-elemento. Marcado como Client Component porque repassa `onOpen`.
 */
export const OpinionBox = React.forwardRef<HTMLElement, UjnOpinionBoxProps>(
  (
    {
      eyebrow = 'Opinião em destaque',
      title,
      quote,
      author,
      meta,
      href,
      onOpen,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const interactive = Boolean(href || onOpen);
    const classes = ['ujn-opinion-box', interactive ? 'ujn-opinion-box--interactive' : '', className]
      .filter(Boolean)
      .join(' ');

    let heading: React.ReactNode = title;
    if (href) {
      heading = (
        <a className="ujn-opinion-box__link" href={href} onClick={onOpen}>
          {title}
        </a>
      );
    } else if (onOpen) {
      heading = (
        <button type="button" className="ujn-opinion-box__link" onClick={onOpen}>
          {title}
        </button>
      );
    }

    return (
      <article ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <p className="ujn-opinion-box__eyebrow">
          <Icon name="opinion" size="sm" tone="accent" />
          {eyebrow}
        </p>
        <h3 className="ujn-opinion-box__title">{heading}</h3>
        <blockquote className="ujn-opinion-box__quote">
          <p>{`“${quote}”`}</p>
        </blockquote>
        <p className="ujn-opinion-box__author">
          <span className="ujn-opinion-box__author-name">{author}</span>
          {meta && <span className="ujn-opinion-box__meta">{meta}</span>}
        </p>
      </article>
    );
  }
);

OpinionBox.displayName = 'OpinionBox';
