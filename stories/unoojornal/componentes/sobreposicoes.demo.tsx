import React from 'react';
import { ArticleListItem } from '../../../src/unoojornal/components/ArticleListItem';
import { Masthead } from '../../../src/unoojornal/components/Masthead';
import { ujnArticles, ujnAuthors, ujnPublication } from '../fixtures';

/**
 * Andaime de documentação das camadas do Unoojornal (Modal, BottomSheet e
 * Toast). NÃO integra o pacote.
 *
 * Um diálogo, uma folha ou um aviso só fazem sentido sobre alguma coisa: este
 * arquivo desenha, dentro da tela do `PhoneFrame` ou do `DesktopFrame`, o fundo
 * de uma página de jornal — o título da publicação e a lista de matérias das
 * fixtures, montados com os componentes reais. A camada entra como IRMÃ do
 * fundo, que é o que o `useModalFocus` espera para marcar o fundo com
 * `aria-hidden`.
 */
export const PaginaDeFundo: React.FC<{
  /** Largura da página: a do aparelho móvel ou a do navegador */
  formato?: 'celular' | 'desktop';
  /** Controles sob o título (o botão que abre a camada) */
  faixa?: React.ReactNode;
  /** Quantidade de matérias na lista */
  materias?: number;
  /** A camada, irmã do fundo */
  children?: React.ReactNode;
}> = ({ formato = 'celular', faixa, materias = 4, children }) => {
  const desktop = formato === 'desktop';

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: desktop
            ? 'var(--ujn-spacing-xxl) var(--ujn-gutter-wide)'
            : 'calc(var(--ujn-safe-area-top) + var(--ujn-spacing-l)) var(--ujn-gutter) 0',
          background: 'var(--ujn-color-background-page)',
          color: 'var(--ujn-color-text-primary)',
          fontFamily: 'var(--ujn-font-sans)',
        }}
      >
        <Masthead
          title={ujnPublication.name}
          tagline={desktop ? ujnPublication.tagline : undefined}
          size={desktop ? 'lg' : 'md'}
          rule={desktop ? 'double' : 'thin'}
          as="p"
        />
        {faixa && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--ujn-spacing-xs)',
              padding: 'var(--ujn-spacing-m) 0',
            }}
          >
            {faixa}
          </div>
        )}
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {ujnArticles.slice(0, materias).map((materia) => {
            const autor = ujnAuthors.find((item) => item.id === materia.authorId);
            return (
              <ArticleListItem
                key={materia.id}
                kicker={materia.kicker}
                title={materia.title}
                summary={materia.summary}
                author={autor?.name ?? 'Redação'}
                authorRole={autor?.role}
                readingTime={`${materia.readingMinutes} min de leitura`}
              />
            );
          })}
        </div>
      </div>
      {children}
    </>
  );
};

/**
 * Estilo de texto de apoio das estórias (rótulos de matriz e estado atual).
 */
export const notaEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  color: 'var(--ujn-color-text-secondary)',
};
