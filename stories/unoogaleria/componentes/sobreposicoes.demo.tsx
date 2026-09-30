import React from 'react';
import { uglPhotos } from '../fixtures';

/**
 * Andaime de documentação das sobreposições da Unoogaleria (BottomSheet,
 * ActionMenu, ConfirmDialog, ShareSheet e InfoPanel). NÃO integra o pacote.
 *
 * Uma folha, um menu ou um alerta só fazem sentido sobre alguma coisa: este
 * arquivo desenha, dentro da tela do `PhoneFrame`, um fundo de biblioteca (a
 * grade de fotos das fixtures) ou um fundo imersivo (uma foto sobre a
 * superfície escura do visualizador). A sobreposição entra como IRMÃ do fundo,
 * que é o que o `useModalFocus` espera para marcar o fundo com `aria-hidden`.
 *
 * Não reproduz a `MediaGrid` nem o `MediaViewer` — são só imagens em grade,
 * sem comportamento.
 */
export const TelaDeFundo: React.FC<{
  /** Título grande da tela de fundo */
  titulo?: string;
  /** Controles no canto da barra (o botão que abre a sobreposição) */
  acoes?: React.ReactNode;
  /** Conteúdo sob a barra, antes da grade (botões de demonstração) */
  faixa?: React.ReactNode;
  /** Barra na base da tela (fundo comum), para sobreposições ancoradas embaixo */
  rodape?: React.ReactNode;
  /** Fundo imersivo (uma foto sobre a superfície do visualizador) */
  imersiva?: boolean;
  /** Quantidade de fotos na grade */
  fotos?: number;
  /** A sobreposição, irmã do fundo */
  children?: React.ReactNode;
}> = ({ titulo = 'Biblioteca', acoes, faixa, rodape, imersiva = false, fotos = 18, children }) => {
  const destaque = uglPhotos[3];

  return (
    <>
      {imersiva ? (
        <div
          data-ugl-immersive
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--ugl-color-immersive-surface)',
            color: 'var(--ugl-color-immersive-text)',
            fontFamily: 'var(--ugl-font-sans)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              padding: 'calc(var(--ugl-safe-area-top) + 4px) 8px 4px 16px',
              background: 'var(--ugl-color-immersive-bar)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--ugl-font-title-sm-size)',
                fontWeight: 'var(--ugl-font-title-sm-weight)',
                lineHeight: 'var(--ugl-font-title-sm-line)',
              }}
            >
              {titulo}
            </span>
            <span style={{ display: 'flex', gap: 4 }}>{acoes}</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', minHeight: 0 }}>
            <img
              src={destaque.src}
              alt={destaque.alt}
              style={{ display: 'block', width: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
          {faixa && (
            <div
              style={{
                display: 'flex',
                gap: 8,
                justifyContent: 'center',
                padding: '8px 16px calc(var(--ugl-safe-area-bottom) + 8px)',
                background: 'var(--ugl-color-immersive-bar)',
              }}
            >
              {faixa}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--ugl-color-background-primary)',
            color: 'var(--ugl-color-text-primary)',
            fontFamily: 'var(--ugl-font-sans)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              padding: 'calc(var(--ugl-safe-area-top) + 8px) 8px 8px 16px',
            }}
          >
            <span
              style={{
                fontSize: 'var(--ugl-font-display-size)',
                fontWeight: 'var(--ugl-font-display-weight)',
                lineHeight: 'var(--ugl-font-display-line)',
              }}
            >
              {titulo}
            </span>
            <span style={{ display: 'flex', gap: 4 }}>{acoes}</span>
          </div>
          {faixa && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 16px 12px' }}>{faixa}</div>
          )}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: 'min-content',
              gap: 'var(--ugl-grid-gap)',
            }}
          >
            {uglPhotos.slice(0, fotos).map((item) => (
              <img
                key={item.id}
                src={item.src}
                alt={item.alt}
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  background: 'var(--ugl-color-background-tertiary)',
                }}
              />
            ))}
          </div>
          {rodape && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '4px 8px calc(var(--ugl-safe-area-bottom) + 4px)',
                background: 'var(--ugl-color-surface-bar)',
                boxShadow: 'var(--ugl-elevation-hairline-top)',
              }}
            >
              {rodape}
            </div>
          )}
        </div>
      )}
      {children}
    </>
  );
};

/**
 * Estilo de texto de apoio das estórias (rótulos de matriz e estado atual).
 */
export const notaEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ugl-font-sans)',
  fontSize: 'var(--ugl-font-caption-size)',
  lineHeight: 'var(--ugl-font-caption-line)',
  color: 'var(--ugl-color-text-secondary)',
};
