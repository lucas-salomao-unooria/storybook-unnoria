import React from 'react';
import { Logo } from '../Logo';
import type { UblSiteFooterProps } from './SiteFooter.types';
import './SiteFooter.css';

/**
 * Componente SiteFooter — Design System Unooblog
 *
 * Rodapé do site sobre `--ubl-color-background-card` (a camada lavanda), com um
 * fio superior de 1px. À esquerda a marca, a descrição e um slot (`children`,
 * por exemplo o formulário de newsletter); à direita as colunas de links, cada
 * uma com título `<h2>` e lista; no fim, a linha de direitos. As colunas ficam
 * num único marco `<nav>` — vários marcos num mesmo rodapé só poluiriam a lista
 * de pontos de referência do leitor de tela.
 *
 * Um link com `href` é `<a>`; sem `href`, o item é `<button>` e só dispara
 * `onClick`. Server Component: só recebe props e renderiza (quem passar
 * `onClick` já está num Client Component).
 */
export const SiteFooter = React.forwardRef<HTMLElement, UblSiteFooterProps>(
  (
    {
      siteName,
      description,
      columns,
      copyright,
      children,
      logo,
      navLabel = 'Links do rodapé',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['ubl-site-footer', className].filter(Boolean).join(' ');

    return (
      <footer ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        <div className="ubl-site-footer__inner">
          <div className="ubl-site-footer__top">
            <div className="ubl-site-footer__about">
              <div className="ubl-site-footer__brand">
                {logo ?? <Logo height={28} title={siteName} />}
              </div>
              {description && <p className="ubl-site-footer__description">{description}</p>}
              {children && <div className="ubl-site-footer__slot">{children}</div>}
            </div>

            {columns.length > 0 && (
              <nav className="ubl-site-footer__nav" aria-label={navLabel}>
                {columns.map((column) => (
                  <div key={column.heading} className="ubl-site-footer__column">
                    <h2 className="ubl-site-footer__heading">{column.heading}</h2>
                    <ul className="ubl-site-footer__links">
                      {column.links.map((link) => (
                        <li key={link.label} className="ubl-site-footer__item">
                          {link.href !== undefined ? (
                            <a
                              className="ubl-site-footer__link"
                              href={link.href}
                              onClick={link.onClick}
                            >
                              {link.label}
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="ubl-site-footer__link"
                              onClick={link.onClick}
                            >
                              {link.label}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </div>

          {copyright && (
            <p className="ubl-site-footer__copyright">{copyright}</p>
          )}
        </div>
      </footer>
    );
  }
);

SiteFooter.displayName = 'SiteFooter';
