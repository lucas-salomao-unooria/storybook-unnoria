import React from 'react';
import type { UjnFooterColumnProps, UjnFooterProps } from './Footer.types';
import './Footer.css';

/**
 * Coluna do rodapé: cabeçalho em caixa alta na cor de destaque e o conteúdo
 * (links ou linhas de texto) logo abaixo.
 */
const FooterColumn = React.forwardRef<HTMLDivElement, UjnFooterColumnProps>(
  ({ heading, children, className = '', ...restProps }, ref) => (
    <div ref={ref} className={['ujn-footer__column', className].filter(Boolean).join(' ')} {...restProps}>
      <h3 className="ujn-footer__heading">{heading}</h3>
      <div className="ujn-footer__column-body">{children}</div>
    </div>
  )
);

FooterColumn.displayName = 'Footer.Column';

/**
 * Componente Footer — Design System Unoojornal
 *
 * Rodapé do jornal: nome da publicação em `title-lg` na cor de destaque,
 * descrição, colunas de links e, na base, a linha de direitos separada por um
 * fio. É a única superfície escura do jornal claro e **não muda com o tema**:
 * usa só os tokens invariantes `--ujn-color-footer-*`. As colunas se dispõem
 * por contêiner: uma abaixo de 640px, duas a partir de 640px e três a partir
 * de 960px, ao lado do bloco do título. Só recebe props e renderiza markup:
 * é Server Component.
 */
const FooterRoot = React.forwardRef<HTMLElement, UjnFooterProps>(
  ({ title, description, copyright, note, children, theme, className = '', ...restProps }, ref) => {
    const classes = ['ujn-footer', className].filter(Boolean).join(' ');

    return (
      <footer ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        <div className="ujn-footer__inner">
          <div className="ujn-footer__main">
            <div className="ujn-footer__brand">
              <p className="ujn-footer__title">{title}</p>
              {description && <p className="ujn-footer__description">{description}</p>}
            </div>
            {children && <div className="ujn-footer__columns">{children}</div>}
          </div>
          {(copyright || note) && (
            <div className="ujn-footer__legal">
              {copyright && <p className="ujn-footer__copyright">{copyright}</p>}
              {note && <p className="ujn-footer__note">{note}</p>}
            </div>
          )}
        </div>
      </footer>
    );
  }
);

FooterRoot.displayName = 'Footer';

export const Footer = Object.assign(FooterRoot, { Column: FooterColumn });
