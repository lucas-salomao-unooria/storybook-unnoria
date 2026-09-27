import React, { forwardRef } from 'react';
import { Icon } from '../Icon/Icon';
import { NEWS_MEDIUM_ICONS, NEWS_MEDIUM_LABELS } from '../NewsCard/NewsCard.medium';
import type {
  NewspaperMarkerTone,
  NewspaperPageProps,
  NewspaperSlot,
} from './NewspaperPage.types';
import './NewspaperPage.css';

/** As posições na ordem do contrato: 0 = manchete principal, 1 e 2 = secundárias. */
const POSICOES = [0, 1, 2] as const;

const ROTULOS_VAZIOS_PADRAO: [string, string, string] = [
  'Manchete principal',
  'Notícia secundária A',
  'Notícia secundária B',
];

/**
 * O nome acessível do ícone de cada tom. O ícone não é enfeite: é ele que diz
 * "problema" ou "tudo certo" a quem não distingue o vermelho do verde.
 */
const TOM_DO_MARCADOR: Record<NewspaperMarkerTone, { icone: string; rotulo: string }> = {
  alert: { icone: 'warning', rotulo: 'Atenção' },
  ok: { icone: 'check_circle', rotulo: 'Tudo certo' },
};

/** O texto de um nó, quando ele é texto; `''` quando é elemento. */
const textoDe = (no: React.ReactNode): string =>
  typeof no === 'string' || typeof no === 'number' ? String(no).trim() : '';

/**
 * Componente NewspaperPage — Plataforma Unooria
 *
 * A primeira página do jornal da escola: o cabeçalho (nome do jornal em caixa
 * alta, fio duplo, edição e data) e EXATAMENTE três vagas — a manchete
 * principal e duas secundárias. Design próprio: a seção não tem quadro de
 * jornal no Figma; as medidas vêm do `Card` (fio de 1px, raio de 16px, recuo de
 * 16px), do `Tag` (a faixa do marcador) e do `Button` (a ação de cada vaga,
 * entregue por `renderSlotAction`).
 *
 * **O layout é por CONTÊINER, não por viewport.** A raiz declara
 * `container-type: inline-size`, e cada layout reorganiza as vagas pela
 * largura da própria página. É o que deixa a MESMA página servir no aparelho de
 * 375px, na tela larga do professor e na miniatura do comparativo — que é
 * estreita mesmo numa tela larga. Consequência: a página toma a largura do
 * contêiner e não a do conteúdo (num `flex`, dê largura a ela).
 *
 * **Sem `'use client'`, de propósito.** Não há estado nem API de navegador, e
 * `renderSlotAction` é chamada DURANTE a renderização, não repassada a um
 * filho. Marcada como client, ela deixaria de poder receber essa função de um
 * Server Component — que é justamente quem monta a página a partir da api.
 */
export const NewspaperPage = forwardRef<HTMLElement, NewspaperPageProps>(
  (
    {
      nameplate = 'Jornal da Escola',
      edition,
      dateLine,
      slots,
      layout = 'classic',
      emptyLabels = ROTULOS_VAZIOS_PADRAO,
      renderSlotAction,
      readOnly = false,
      size = 'full',
      headingLevel = 2,
      theme = 'light',
      className = '',
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const miniatura = size === 'thumbnail';
    const comAcoes = !readOnly && !miniatura && typeof renderSlotAction === 'function';
    const TituloPrincipal = `h${headingLevel}` as 'h2' | 'h3';
    const TituloSecundario = `h${headingLevel + 1}` as 'h3' | 'h4';

    // O nome da página é o do jornal mais a edição ("Jornal da Escola, 1ª
    // edição"): no comparativo, é o que separa uma miniatura da outra.
    const nomeDaPagina =
      ariaLabel ?? ([textoDe(nameplate), textoDe(edition)].filter(Boolean).join(', ') || 'Primeira página do jornal');

    const vagas = POSICOES.map((indice) => slots[indice] ?? null);

    const classes = [
      'unooria-newspaper-page',
      `unooria-newspaper-page--layout-${layout}`,
      `unooria-newspaper-page--size-${size}`,
      readOnly ? 'unooria-newspaper-page--read-only' : '',
      theme === 'dark' ? 'unooria-newspaper-page--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const desenharVaga = (indice: number, vaga: NewspaperSlot | null) => {
      const principal = indice === 0;
      const posicao = textoDe(emptyLabels[indice]) || ROTULOS_VAZIOS_PADRAO[indice];
      const acao = comAcoes ? renderSlotAction?.(indice, vaga) : null;
      const temAcao = acao !== null && acao !== undefined && acao !== false;
      const Titulo = principal ? TituloPrincipal : TituloSecundario;
      const papel = principal ? 'lead' : 'secondary';

      if (!vaga) {
        return (
          <section
            key={`vaga-${indice}`}
            className={`unooria-newspaper-page__slot unooria-newspaper-page__slot--${papel} unooria-newspaper-page__slot--empty`}
            aria-label={`${posicao}, vaga vazia`}
          >
            <div className="unooria-newspaper-page__empty">
              {!readOnly && <Icon name="add" size={miniatura ? '3xs' : 's'} color="currentColor" />}
              <span className="unooria-newspaper-page__empty-label">{emptyLabels[indice]}</span>
            </div>
            {temAcao && <div className="unooria-newspaper-page__action">{acao}</div>}
          </section>
        );
      }

      const manchete = textoDe(vaga.headline);
      // Imagem sem descrição não é desenhada (ver `NewspaperSlot`).
      const temImagem = Boolean(vaga.imageSrc) && textoDe(vaga.imageAlt) !== '';
      const tom = vaga.marker ? TOM_DO_MARCADOR[vaga.marker.tone] : null;

      return (
        <section
          key={vaga.id}
          className={[
            'unooria-newspaper-page__slot',
            `unooria-newspaper-page__slot--${papel}`,
            temImagem ? 'unooria-newspaper-page__slot--has-image' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label={manchete ? `${posicao}: ${manchete}` : posicao}
        >
          {/* A ordem do DOM é a da leitura: manchete, meio, marcador, resumo,
              imagem, ação. Quem navega por títulos cai na manchete e segue
              ouvindo o marcador logo depois dela. A ordem VISUAL (o meio acima
              da manchete, o marcador no topo do texto, a imagem acima ou ao
              lado) é do CSS, e muda com o layout. */}
          <div className="unooria-newspaper-page__story">
            <div className="unooria-newspaper-page__heading">
              <Titulo className="unooria-newspaper-page__headline">{vaga.headline}</Titulo>
              {vaga.medium && (
                <p className="unooria-newspaper-page__medium">
                  <Icon name={NEWS_MEDIUM_ICONS[vaga.medium]} size="4xs" color="currentColor" />
                  <span>{NEWS_MEDIUM_LABELS[vaga.medium]}</span>
                </p>
              )}
            </div>

            {vaga.marker && tom && (
              <p
                className={`unooria-newspaper-page__marker unooria-newspaper-page__marker--${vaga.marker.tone}`}
              >
                <Icon
                  name={tom.icone}
                  size={miniatura ? '4xs' : 'xs'}
                  color="currentColor"
                  aria-label={tom.rotulo}
                />
                <span className="unooria-newspaper-page__marker-label">{vaga.marker.label}</span>
              </p>
            )}

            {vaga.summary && !miniatura && <p className="unooria-newspaper-page__summary">{vaga.summary}</p>}
          </div>

          {temImagem && (
            <img className="unooria-newspaper-page__image" src={vaga.imageSrc} alt={vaga.imageAlt} loading="lazy" />
          )}

          {temAcao && <div className="unooria-newspaper-page__action">{acao}</div>}
        </section>
      );
    };

    return (
      <article ref={ref} aria-label={nomeDaPagina} className={classes} {...rest}>
        <header className="unooria-newspaper-page__masthead">
          <p className="unooria-newspaper-page__nameplate">{nameplate}</p>
          {(edition || dateLine) && (
            <p className="unooria-newspaper-page__meta">
              {edition && <span className="unooria-newspaper-page__edition">{edition}</span>}
              {dateLine && <span className="unooria-newspaper-page__date">{dateLine}</span>}
            </p>
          )}
        </header>

        <div className="unooria-newspaper-page__slots">
          {desenharVaga(0, vagas[0])}
          <div className="unooria-newspaper-page__secondaries">
            {desenharVaga(1, vagas[1])}
            {desenharVaga(2, vagas[2])}
          </div>
        </div>
      </article>
    );
  }
);

NewspaperPage.displayName = 'NewspaperPage';

export default NewspaperPage;
