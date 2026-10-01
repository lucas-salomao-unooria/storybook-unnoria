import React, { forwardRef } from 'react';
import { ScrollBar } from '../ScrollBar/ScrollBar';
import type { RichContentProps, RichContentTableProps } from './RichContent.types';
import './RichContent.css';

/**
 * RichContent — tipografia de conteúdo rico (Plataforma Unooria).
 *
 * Um invólucro que dá aos elementos já renderizados (títulos, parágrafos,
 * listas, citações, código, tabelas, links, fio) os tamanhos, as alturas de
 * linha e as cores da seção. Não interpreta markdown, não usa
 * `dangerouslySetInnerHTML` e não sabe de onde o conteúdo veio: quem converte é
 * o produto (no hub, o react-markdown), e quem sanitiza também.
 *
 * Server Component.
 */
export const RichContent = forwardRef<HTMLDivElement, RichContentProps>(
  ({ as: Tag = 'div', theme = 'light', className = '', children, ...rest }, ref) => {
    const classes = [
      'unooria-rich-content',
      theme === 'dark' ? 'unooria-rich-content--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Tag {...rest} ref={ref} className={classes}>
        {children}
      </Tag>
    );
  }
);

RichContent.displayName = 'RichContent';

/**
 * RichContentTable — a tabela larga, com rolagem horizontal pelo `ScrollBar`.
 *
 * Sem ela, a tabela fica na largura do texto e as células quebram as palavras;
 * com ela, a tabela mantém as colunas e a faixa rola de lado (inclusive pelo
 * teclado: a faixa é focável). No hub:
 *
 *     <ReactMarkdown components={{ table: RichContentTable }}>…</ReactMarkdown>
 */
export const RichContentTable = forwardRef<HTMLTableElement, RichContentTableProps>(
  ({ node, scrollLabel = 'Tabela', className = '', ...rest }, ref) => {
    // `node` é o nó que o react-markdown repassa: se chegasse ao DOM, o React
    // avisaria de atributo inválido. Só é retirado de `rest`.
    void node;
    return (
      <ScrollBar
        orientation="horizontal"
        className="unooria-rich-content__table-scroll"
        aria-label={scrollLabel}
      >
        <table {...rest} ref={ref} className={['unooria-rich-content__table', className].filter(Boolean).join(' ')} />
      </ScrollBar>
    );
  }
);

RichContentTable.displayName = 'RichContentTable';

export default RichContent;
