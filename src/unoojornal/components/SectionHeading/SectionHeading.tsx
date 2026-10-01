'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UjnSectionHeadingProps } from './SectionHeading.types';
import './SectionHeading.css';

/**
 * Componente SectionHeading — Design System Unoojornal
 *
 * Cabeçalho de bloco da capa: título em `title-lg` à esquerda e, à direita, um
 * texto de apoio (`meta`) ou uma ação com seta ("Ver todas →"). Um fio fino
 * por baixo é opcional (`rule`). A ação tem alvo de 44px e é `<a>` com `href`
 * ou `<button>` com `onAction`. Marcado como Client Component porque repassa
 * `onAction` ao botão.
 */
export const SectionHeading = React.forwardRef<HTMLDivElement, UjnSectionHeadingProps>(
  (
    {
      title,
      meta,
      actionLabel,
      href,
      onAction,
      as: Heading = 'h2',
      rule = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['ujn-section-heading', rule ? 'ujn-section-heading--rule' : '', className]
      .filter(Boolean)
      .join(' ');

    const actionContent = (
      <>
        {actionLabel}
        <Icon name="arrowForward" size="xs" tone="inherit" />
      </>
    );

    let trailing: React.ReactNode = null;
    if (actionLabel && href) {
      trailing = (
        <a className="ujn-section-heading__action" href={href} onClick={onAction}>
          {actionContent}
        </a>
      );
    } else if (actionLabel && onAction) {
      trailing = (
        <button type="button" className="ujn-section-heading__action" onClick={onAction}>
          {actionContent}
        </button>
      );
    } else if (meta) {
      trailing = <span className="ujn-section-heading__meta">{meta}</span>;
    }

    return (
      <div ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <Heading className="ujn-section-heading__title">{title}</Heading>
        {trailing}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';
