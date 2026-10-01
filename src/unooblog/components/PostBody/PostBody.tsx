import React from 'react';
import type { UblBlock } from '../../content';
import { Blockquote } from '../Blockquote';
import { Callout } from '../Callout';
import { CodeBlock } from '../CodeBlock';
import { Figure } from '../Figure';
import { Icon } from '../Icon';
import type { UblPostBodyProps } from './PostBody.types';
import './PostBody.css';

/**
 * Subtítulo com âncora: o `<h2>`/`<h3>` leva o `id` (alvo do sumário) e o link
 * fica ao lado, fora do título, para não entrar no nome do próprio título.
 */
const BodyHeading: React.FC<{
  level: 2 | 3;
  id: string;
  text: string;
  anchorLabel: string;
}> = ({ level, id, text, anchorLabel }) => {
  const Tag = level === 2 ? 'h2' : 'h3';
  return (
    <div className="ubl-post-body__heading">
      <Tag id={id}>{text}</Tag>
      <a className="ubl-post-body__anchor" href={`#${id}`} aria-label={`${anchorLabel} ${text}`}>
        <Icon name="link" size="sm" tone="inherit" />
      </a>
    </div>
  );
};

/**
 * Renderiza um bloco do domínio no componente do módulo.
 */
const renderBlock = (
  block: UblBlock,
  index: number,
  codeLineNumbers: boolean,
  anchorLabel: string
): React.ReactNode => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="ubl-text--prose">
          {block.text}
        </p>
      );
    case 'heading':
      return (
        <BodyHeading
          key={index}
          level={block.level}
          id={block.id}
          text={block.text}
          anchorLabel={anchorLabel}
        />
      );
    case 'quote':
      return (
        <Blockquote key={index} cite={block.cite}>
          {block.text}
        </Blockquote>
      );
    case 'code':
      return (
        <CodeBlock
          key={index}
          code={block.code}
          language={block.language}
          filename={block.filename}
          highlightLines={block.highlightLines}
          showLineNumbers={codeLineNumbers}
        />
      );
    case 'callout':
      return (
        <Callout key={index} tone={block.tone} title={block.title}>
          {block.text}
        </Callout>
      );
    case 'figure':
      return (
        <Figure
          key={index}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          credit={block.credit}
        />
      );
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ListTag>
      );
    }
    default:
      return null;
  }
};

/**
 * Componente PostBody — Design System Unooblog
 *
 * Coluna de leitura do post, limitada a `--ubl-reading-width` (680px) e
 * centralizada. Recebe `blocks` (o conteúdo do domínio) ou `children` (HTML
 * livre) e os compõe com `Blockquote`, `CodeBlock`, `Callout` e `Figure`.
 * Parágrafos em `prose` (18/28, ou 16/24 e 20/30 por `textSize`), links em
 * `text-accent` sublinhados, subtítulos `<h2>` e `<h3>` com `id` e uma âncora
 * discreta (aparece no foco e no hover), `scroll-margin-top` que compensa o
 * cabeçalho fixo do site e listas com marcador em `text-accent`.
 *
 * Server Component: só recebe props e renderiza.
 */
export const PostBody = React.forwardRef<HTMLDivElement, UblPostBodyProps>(
  (
    {
      blocks,
      children,
      textSize = 'md',
      codeLineNumbers = false,
      anchorLabel = 'Link para a seção',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['ubl-post-body', `ubl-post-body--${textSize}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        {blocks?.map((block, index) => renderBlock(block, index, codeLineNumbers, anchorLabel))}
        {children}
      </div>
    );
  }
);

PostBody.displayName = 'PostBody';
