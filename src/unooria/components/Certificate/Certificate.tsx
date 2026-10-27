'use client';

import React, { forwardRef, useId } from 'react';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import type { CertificateProps } from './Certificate.types';
import './Certificate.css';

/** `0` é conteúdo; `null`, `undefined`, `false` e `''` não. */
const temConteudo = (no: React.ReactNode): boolean =>
  no !== undefined && no !== null && no !== false && no !== '';

/**
 * Componente Certificate — Plataforma Unooria
 *
 * O selo de conclusão de uma missão: medalhão com o glifo, título, conteúdo
 * livre, a salvaguarda (um `Badge` de sucesso) e o rodapé. Nasceu da tela de
 * conclusão da exp01em1b, que o compunha à mão com `Card` + `Icon` + `Badge`.
 *
 * Design próprio — a seção não tem quadro de certificado. As medidas vêm do
 * pacote: fio de 1px e raio de 16px do `Card`, recuo de 24px, título no degrau
 * `title-l` e o `Badge` `md` sem alteração.
 *
 * É um `<article>` nomeado pelo título (`aria-labelledby`, e daí o `useId` e o
 * `'use client'`, seção 4.5 do AGENTS.md): um certificado se lê sozinho, fora
 * do resto da página. O rodapé é o `<footer>` dele. O medalhão é decorativo.
 *
 * Não decide nada: se há salvaguarda, e qual, é o produto que diz.
 */
export const Certificate = forwardRef<HTMLElement, CertificateProps>(
  (
    {
      title,
      titleAs: Titulo = 'h3',
      icon = 'workspace_premium',
      safeguard,
      footer,
      children,
      theme = 'light',
      className = '',
      'aria-labelledby': ariaLabelledBy,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const tituloId = `${useId()}-titulo`;

    // Mesma precedência do `Modal` e do `PuzzleBlock` (seção 4.3): o
    // `aria-labelledby` explícito manda, e um `aria-label` explícito não é
    // calado pelo nosso.
    const nomeadoPor = ariaLabelledBy ?? (ariaLabel ? undefined : tituloId);

    const classes = [
      'unooria-certificate',
      theme === 'dark' ? 'unooria-certificate--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <article
        ref={ref}
        className={classes}
        data-theme={theme}
        aria-label={ariaLabel}
        aria-labelledby={nomeadoPor}
        {...rest}
      >
        <span className="unooria-certificate__seal" aria-hidden="true">
          <Icon name={icon} size="m" className="unooria-certificate__seal-icon" />
        </span>

        <Titulo id={tituloId} className="unooria-certificate__title">
          {title}
        </Titulo>

        {temConteudo(children) && <div className="unooria-certificate__body">{children}</div>}

        {temConteudo(safeguard) && (
          <Badge
            variant="success"
            size="md"
            theme={theme}
            icon={<Icon name="verified_user" size="3xs" />}
            className="unooria-certificate__safeguard"
          >
            {safeguard}
          </Badge>
        )}

        {temConteudo(footer) && <footer className="unooria-certificate__footer">{footer}</footer>}
      </article>
    );
  }
);

Certificate.displayName = 'Certificate';

export default Certificate;
