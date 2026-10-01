import React from 'react';
import { Avatar } from '../../../src/unooblog/components/Avatar';
import { Logo } from '../../../src/unooblog/components/Logo';
import { TopicChip } from '../../../src/unooblog/components/TopicChip';
import { ublAuthors, ublPosts, ublSite, ublTopics } from '../fixtures';

/**
 * Andaime de documentação das camadas do Unooblog (Modal, BottomSheet e Toast)
 * e dos quadros de aparelho. NÃO integra o pacote.
 *
 * Um diálogo, uma folha ou um aviso só fazem sentido sobre alguma coisa: este
 * arquivo desenha, dentro da tela do `PhoneFrame` ou do `DesktopFrame`, o fundo
 * de uma página de blog — a marca, os tópicos e a lista de posts das fixtures.
 * A camada entra como IRMÃ do fundo, que é o que o `useModalFocus` espera para
 * marcar o fundo com `aria-hidden`.
 */
export const PaginaDeFundo: React.FC<{
  /** Largura da página: a do aparelho móvel ou a do navegador */
  formato?: 'celular' | 'desktop';
  /** Controles sob o cabeçalho (o botão que abre a camada) */
  faixa?: React.ReactNode;
  /** Quantidade de posts na lista */
  posts?: number;
  /** A camada, irmã do fundo */
  children?: React.ReactNode;
}> = ({ formato = 'celular', faixa, posts = 4, children }) => {
  const desktop = formato === 'desktop';

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ubl-spacing-l)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: desktop
            ? 'var(--ubl-spacing-xxl) var(--ubl-gutter-wide)'
            : 'calc(var(--ubl-safe-area-top) + var(--ubl-spacing-l)) var(--ubl-gutter) 0',
          background: 'var(--ubl-color-background-page)',
          color: 'var(--ubl-color-text-primary)',
          fontFamily: 'var(--ubl-font-sans)',
        }}
      >
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ubl-spacing-xs)' }}>
          <Logo height={desktop ? 32 : 24} decorative />
          {desktop && (
            <p
              style={{
                margin: 0,
                color: 'var(--ubl-color-text-secondary)',
                fontSize: 'var(--ubl-font-body-md-size)',
                lineHeight: 'var(--ubl-font-body-md-line)',
              }}
            >
              {ublSite.tagline}
            </p>
          )}
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ubl-spacing-xs)' }}>
          {ublTopics.slice(0, desktop ? 6 : 3).map((topico, indice) => (
            <TopicChip key={topico.id} size="sm" selected={indice === 0}>
              {topico.label}
            </TopicChip>
          ))}
        </div>
        {faixa && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--ubl-spacing-xs)',
            }}
          >
            {faixa}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ubl-spacing-m)', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {ublPosts.slice(0, posts).map((post) => {
            const autor = ublAuthors.find((item) => item.id === post.authorId);
            return (
              <article
                key={post.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ubl-spacing-xs)',
                  padding: 'var(--ubl-spacing-l)',
                  borderRadius: 'var(--ubl-radius-l)',
                  background: 'var(--ubl-color-background-card)',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 'var(--ubl-font-heading-4-size)',
                    fontWeight: 'var(--ubl-font-heading-4-weight)',
                    lineHeight: 'var(--ubl-font-heading-4-line)',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--ubl-color-text-secondary)',
                    fontSize: 'var(--ubl-font-body-md-size)',
                    lineHeight: 'var(--ubl-font-body-md-line)',
                  }}
                >
                  {post.summary}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ubl-spacing-xs)' }}>
                  <Avatar name={autor?.name ?? 'Autoria'} src={autor?.avatarSrc} alt="" size="sm" />
                  <span
                    style={{
                      color: 'var(--ubl-color-text-secondary)',
                      fontSize: 'var(--ubl-font-caption-size)',
                      lineHeight: 'var(--ubl-font-caption-line)',
                    }}
                  >
                    {autor?.name} · {post.readingMinutes} min de leitura
                  </span>
                </div>
              </article>
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
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};
