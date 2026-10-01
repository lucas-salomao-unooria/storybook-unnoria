import React from 'react';
import { Rule } from '../Rule';
import type { UjnMastheadProps } from './Masthead.types';
import './Masthead.css';

/**
 * Componente Masthead — Design System Unoojornal
 *
 * Cabeçalho da publicação: o nome do jornal em Open Sans bold, o lema abaixo e
 * o fio duplo da tinta fechando o bloco. No tamanho `lg` o título usa a escala
 * de masthead (60/78) a partir de 960px de contêiner; no `md`, a de Title/Large
 * (24/34). Abaixo de 960px o título de capa desce para o degrau de headline
 * (34/48) e, abaixo de 480px, para Title/Large, para que o nome nunca estoure a
 * tela estreita.
 *
 * Só recebe props e renderiza marcação, então roda como Server Component. O
 * título é o `h1` da página; em páginas internas use `as="p"`.
 */
export const Masthead = React.forwardRef<HTMLDivElement, UjnMastheadProps>(
  (
    {
      title,
      tagline,
      align = 'center',
      size = 'lg',
      rule = 'double',
      href,
      as: Heading = 'h1',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'ujn-masthead',
      `ujn-masthead--${size}`,
      `ujn-masthead--${align}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-masthead__inner">
          <Heading className="ujn-masthead__title">
            {href ? (
              <a className="ujn-masthead__link" href={href}>
                {title}
              </a>
            ) : (
              title
            )}
          </Heading>
          {tagline ? <p className="ujn-masthead__tagline">{tagline}</p> : null}
        </div>
        {rule === 'double' && <Rule variant="double" className="ujn-masthead__rule" />}
        {rule === 'thin' && <Rule variant="thin" tone="ink" className="ujn-masthead__rule" />}
      </div>
    );
  }
);

Masthead.displayName = 'Masthead';
