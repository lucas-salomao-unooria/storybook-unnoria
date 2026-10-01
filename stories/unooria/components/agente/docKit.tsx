/**
 * Peças da documentação das estórias do agente de IA do professor.
 *
 * As estórias da Plataforma Unooria montam a página com peças locais (ver
 * `SpeechBubble.stories.tsx`); as oito do agente dividem as mesmas, aqui, para
 * não repetir o mesmo bloco oito vezes. Só tokens — nenhuma cor avulsa.
 */
import React from 'react';
import type { UnooriaTheme } from '../../../../src/unooria/tokens';

export const Cartao: React.FC<{ icone: string; titulo: string; children: React.ReactNode }> = ({
  icone,
  titulo,
  children,
}) => (
  <div
    style={{
      padding: 'var(--unooria-spacing-s)',
      border: '1px solid var(--unooria-color-neutral-150)',
      borderRadius: 12,
      background: 'var(--unooria-color-neutral-50)',
      color: 'var(--unooria-color-neutral-700)',
      fontSize: 14,
      lineHeight: 1.6,
    }}
  >
    <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--unooria-color-neutral-950)' }}>
      {icone} {titulo}
    </p>
    {children}
  </div>
);

export const Grade: React.FC<{ children: React.ReactNode; min?: number }> = ({ children, min = 220 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
      gap: 'var(--unooria-spacing-s)',
      marginBottom: 'var(--unooria-spacing-l)',
    }}
  >
    {children}
  </div>
);

/** Um palco com rótulo, claro ou escuro. */
export const Palco: React.FC<{
  rotulo: string;
  tema?: UnooriaTheme;
  largura?: number | string;
  direcao?: 'row' | 'column';
  children: React.ReactNode;
}> = ({ rotulo, tema = 'light', largura = '100%', direcao = 'column', children }) => (
  <div style={{ marginBottom: 'var(--unooria-spacing-m)' }}>
    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--unooria-color-neutral-700)' }}>{rotulo}</p>
    <div
      data-theme={tema}
      style={{
        display: 'flex',
        flexDirection: direcao,
        flexWrap: direcao === 'row' ? 'wrap' : undefined,
        alignItems: direcao === 'row' ? 'center' : 'stretch',
        gap: 'var(--unooria-spacing-s)',
        boxSizing: 'border-box',
        width: largura,
        maxWidth: '100%',
        padding: 'var(--unooria-spacing-s)',
        borderRadius: 12,
        background: tema === 'dark' ? 'var(--unooria-color-neutraldark-50)' : 'var(--unooria-color-neutral-50)',
        border: `1px solid ${tema === 'dark' ? 'var(--unooria-color-neutraldark-200)' : 'var(--unooria-color-neutral-150)'}`,
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Uma "janela" onde os componentes fixos (`ChatLauncher`, `ChatPanel`) ficam
 * presos: o `transform` faz dela o bloco de contenção do `position: fixed`, e
 * o canto inferior direito passa a ser o dela, não o do Storybook.
 */
export const Janela: React.FC<{ altura?: number; tema?: UnooriaTheme; children: React.ReactNode }> = ({
  altura = 720,
  tema = 'light',
  children,
}) => (
  <div
    data-theme={tema}
    style={{
      position: 'relative',
      transform: 'translateZ(0)',
      height: altura,
      overflow: 'hidden',
      borderRadius: 16,
      border: `1px solid ${tema === 'dark' ? 'var(--unooria-color-neutraldark-200)' : 'var(--unooria-color-neutral-150)'}`,
      background: tema === 'dark' ? 'var(--unooria-color-neutraldark-100)' : 'var(--unooria-color-neutral-100)',
    }}
  >
    {children}
  </div>
);

export const Praticas: React.FC<{ fazer: string[]; evitar: string[] }> = ({ fazer, evitar }) => (
  <Grade>
    <Cartao icone="✓" titulo="O que fazer">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {fazer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
    <Cartao icone="✕" titulo="O que evitar">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {evitar.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
  </Grade>
);

export interface LinhaDeProp {
  nome: string;
  tipo: string;
  padrao?: string;
  descricao: string;
}

export const TabelaDeProps: React.FC<{ linhas: LinhaDeProp[] }> = ({ linhas }) => (
  <div style={{ overflowX: 'auto', marginBottom: 'var(--unooria-spacing-l)' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
      <thead>
        <tr style={{ color: 'var(--unooria-color-neutral-950)' }}>
          {['Prop', 'Tipo', 'Padrão', 'Descrição'].map((c) => (
            <th key={c} style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-200)' }}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody style={{ color: 'var(--unooria-color-neutral-700)' }}>
        {linhas.map((l) => (
          <tr key={l.nome}>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
              <code>{l.nome}</code>
            </td>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
              <code>{l.tipo}</code>
            </td>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
              {l.padrao ? <code>{l.padrao}</code> : '—'}
            </td>
            <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>{l.descricao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** O alternador Claro / Escuro da seção 6. */
export const AlternadorDeTema: React.FC<{ tema: UnooriaTheme; aoMudar: (t: UnooriaTheme) => void }> = ({
  tema,
  aoMudar,
}) => (
  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
    {(['light', 'dark'] as const).map((t) => (
      <button
        key={t}
        type="button"
        onClick={() => aoMudar(t)}
        aria-pressed={tema === t}
        style={{
          padding: '6px 12px',
          borderRadius: 8,
          border: '1px solid var(--unooria-color-neutral-200)',
          background: tema === t ? 'var(--unooria-color-neutral-150)' : 'var(--unooria-color-neutral-50)',
          color: 'var(--unooria-color-neutral-950)',
          cursor: 'pointer',
        }}
      >
        {t === 'light' ? 'Claro' : 'Escuro'}
      </button>
    ))}
  </div>
);
