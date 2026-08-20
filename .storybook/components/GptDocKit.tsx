import React, { useState } from 'react';

/**
 * Kit de documentação do Design System ChatGPT.
 *
 * Componentes utilitários compartilhados por todas as estórias da seção
 * ChatGPT, garantindo que as sete seções obrigatórias do Padrão Ouro
 * (visão geral, especificações do Figma, anatomia, matriz de variantes, boas
 * práticas, suporte a temas e referência de props) tenham apresentação
 * consistente. A moldura externa continua sendo o `UnooriaDocShell`.
 */

const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_BORDER = '#E4E8E9';
const DOC_SURFACE = '#FFFFFF';
const DOC_SUBTLE = '#F5F5F5';
const DOC_SUCCESS = '#01B574';
const DOC_DANGER = '#E31A1A';
const DOC_BRAND = '#5856D6';

/** URL do arquivo Figma oficial do Design System ChatGPT. */
export const GPT_FIGMA_FILE_URL =
  'https://www.figma.com/design/FlQnC8T6Sg5HdVodu0f7bL/ChatGPT-UI-Kit--AI-Chat--Community-';

/**
 * Grade responsiva usada nas seções de visão geral e anatomia.
 */
export const GptDocGrid: React.FC<{
  children: React.ReactNode;
  min?: number;
  marginBottom?: number;
}> = ({ children, min = 300, marginBottom = 32 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
      gap: 20,
      marginBottom,
    }}
  >
    {children}
  </div>
);

/**
 * Cartão explicativo com ícone, título e descrição.
 */
export const GptDocCard: React.FC<{
  icon?: string;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div
    style={{
      backgroundColor: DOC_SURFACE,
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      padding: 20,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}
  >
    <h4 style={{ margin: '0 0 8px 0', fontSize: 15, color: DOC_TEXT }}>
      {icon ? `${icon} ` : ''}
      {title}
    </h4>
    <div style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: DOC_MUTED }}>{children}</div>
  </div>
);

/**
 * Bloco de especificações técnicas do Figma (link Dev Mode, node e medidas).
 */
export const GptDocFigmaSpecs: React.FC<{
  nodeId: string;
  frameName: string;
  specs: { label: string; value: string }[];
  deviations?: string[];
  fileUrl?: string;
}> = ({ nodeId, frameName, specs, deviations, fileUrl = GPT_FIGMA_FILE_URL }) => (
  <div
    style={{
      backgroundColor: DOC_SUBTLE,
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      padding: 20,
      marginBottom: 32,
    }}
  >
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
      <a
        href={`${fileUrl}?node-id=${nodeId.replace(':', '-')}&m=dev`}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          backgroundColor: DOC_TEXT,
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: 700,
          padding: '6px 14px',
          borderRadius: 16,
          textDecoration: 'none',
        }}
      >
        Abrir no Figma Dev Mode ↗
      </a>
      <span
        style={{
          display: 'inline-block',
          backgroundColor: DOC_BORDER,
          color: DOC_MUTED,
          fontSize: 12,
          fontWeight: 600,
          padding: '6px 12px',
          borderRadius: 16,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        node-id {nodeId}
      </span>
      <span
        style={{
          display: 'inline-block',
          backgroundColor: DOC_BORDER,
          color: DOC_MUTED,
          fontSize: 12,
          fontWeight: 600,
          padding: '6px 12px',
          borderRadius: 16,
        }}
      >
        {frameName}
      </span>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
      }}
    >
      {specs.map((spec) => (
        <div
          key={spec.label}
          style={{
            backgroundColor: DOC_SURFACE,
            border: `1px solid ${DOC_BORDER}`,
            borderRadius: 8,
            padding: '10px 12px',
          }}
        >
          <div style={{ fontSize: 11, color: DOC_MUTED, marginBottom: 4 }}>{spec.label}</div>
          <div
            style={{
              fontSize: 13,
              color: DOC_TEXT,
              fontWeight: 600,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            {spec.value}
          </div>
        </div>
      ))}
    </div>

    {deviations && deviations.length > 0 && (
      <div
        style={{
          marginTop: 16,
          backgroundColor: DOC_SURFACE,
          border: `1px solid ${DOC_BORDER}`,
          borderRadius: 8,
          padding: '12px 14px',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: DOC_TEXT, marginBottom: 6 }}>
          Desvios registrados em relação ao Figma
        </div>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: 13,
            lineHeight: 1.65,
            color: DOC_MUTED,
          }}
        >
          {deviations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

/**
 * Palco de demonstração com fundo neutro e legenda.
 */
export const GptDocStage: React.FC<{
  label?: string;
  background?: string;
  padding?: number;
  align?: 'center' | 'flex-start';
  direction?: 'row' | 'column';
  children: React.ReactNode;
}> = ({
  label,
  background = DOC_SUBTLE,
  padding = 24,
  align = 'center',
  direction = 'row',
  children,
}) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <div style={{ fontSize: 12, fontWeight: 600, color: DOC_MUTED, marginBottom: 8 }}>{label}</div>
    )}
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        justifyContent: direction === 'row' ? align : 'flex-start',
        alignItems: direction === 'row' ? 'center' : align,
        flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
        gap: 24,
        background,
        border: `1px solid ${DOC_BORDER}`,
        borderRadius: 12,
        padding,
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Cartões comparativos de boas práticas (DO e DON'T).
 */
export const GptDocPractices: React.FC<{
  dos: string[];
  donts: string[];
}> = ({ dos, donts }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 20,
      marginBottom: 32,
    }}
  >
    <div
      style={{
        border: `1px solid ${DOC_SUCCESS}`,
        borderRadius: 12,
        padding: 20,
        backgroundColor: 'rgba(1, 181, 116, 0.06)',
      }}
    >
      <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: DOC_SUCCESS }}>✅ Faça</h4>
      <ul style={{ margin: 0, paddingLeft: 18, color: DOC_MUTED, fontSize: 13.5, lineHeight: 1.7 }}>
        {dos.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>

    <div
      style={{
        border: `1px solid ${DOC_DANGER}`,
        borderRadius: 12,
        padding: 20,
        backgroundColor: 'rgba(227, 26, 26, 0.05)',
      }}
    >
      <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: DOC_DANGER }}>🚫 Não faça</h4>
      <ul style={{ margin: 0, paddingLeft: 18, color: DOC_MUTED, fontSize: 13.5, lineHeight: 1.7 }}>
        {donts.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

/**
 * Alternador interativo de temas Light e Dark em tempo real.
 *
 * O contêiner recebe `data-gpt-theme`, de modo que os componentes internos
 * resolvem as variáveis por herança — exatamente como acontece na aplicação.
 */
export const GptDocThemeSwitcher: React.FC<{
  children: (theme: 'light' | 'dark') => React.ReactNode;
  initial?: 'light' | 'dark';
  padding?: number;
  direction?: 'row' | 'column';
}> = ({ children, initial = 'light', padding = 24, direction = 'row' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initial);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['light', 'dark'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTheme(option)}
            style={{
              padding: '6px 16px',
              borderRadius: 999,
              border: `1px solid ${theme === option ? DOC_BRAND : DOC_BORDER}`,
              backgroundColor: theme === option ? DOC_BRAND : DOC_SURFACE,
              color: theme === option ? '#FFFFFF' : DOC_MUTED,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {option === 'light' ? '☀️ Light' : '🌙 Dark'}
          </button>
        ))}
      </div>

      <div
        data-gpt-theme={theme}
        style={{
          display: 'flex',
          flexDirection: direction,
          justifyContent: direction === 'row' ? 'center' : 'flex-start',
          alignItems: direction === 'row' ? 'center' : 'flex-start',
          gap: 24,
          flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
          padding,
          borderRadius: 12,
          border: `1px solid ${theme === 'dark' ? '#303030' : DOC_BORDER}`,
          backgroundColor: theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
          transition: 'background-color 200ms ease',
        }}
      >
        {children(theme)}
      </div>
    </div>
  );
};

/**
 * Descrição de uma propriedade da API pública de um componente.
 */
export interface GptDocPropRow {
  /** Nome da propriedade */
  name: string;
  /** Assinatura de tipo em TypeScript */
  type: string;
  /** Valor padrão da propriedade */
  default?: string;
  /** Descrição funcional */
  description: string;
}

/**
 * Tabela de referência completa das props de um componente.
 */
export const GptDocPropsTable: React.FC<{
  title?: string;
  rows: GptDocPropRow[];
}> = ({ title, rows }) => (
  <div style={{ marginBottom: 28 }}>
    {title && <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC_TEXT }}>{title}</h4>}
    <div style={{ border: `1px solid ${DOC_BORDER}`, borderRadius: 12, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: DOC_SUBTLE }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: DOC_TEXT, width: '18%' }}>
              Prop
            </th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: DOC_TEXT, width: '32%' }}>
              Tipo
            </th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: DOC_TEXT, width: '14%' }}>
              Padrão
            </th>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: DOC_TEXT }}>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} style={{ borderTop: `1px solid ${DOC_BORDER}` }}>
              <td
                style={{
                  padding: '10px 14px',
                  color: DOC_TEXT,
                  fontWeight: 600,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  verticalAlign: 'top',
                }}
              >
                {row.name}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  color: DOC_BRAND,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 12,
                  verticalAlign: 'top',
                  wordBreak: 'break-word',
                }}
              >
                {row.type}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  color: DOC_MUTED,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 12,
                  verticalAlign: 'top',
                }}
              >
                {row.default ?? '—'}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  color: DOC_MUTED,
                  lineHeight: 1.6,
                  verticalAlign: 'top',
                }}
              >
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * Amostra de token clicável que copia a variável CSS para a área de
 * transferência.
 */
export const GptDocTokenSwatch: React.FC<{
  cssVar: string;
  value: string;
  name: string;
  figmaName?: string;
  preview?: React.ReactNode;
  checkerboard?: boolean;
}> = ({ cssVar, value, name, figmaName, preview, checkerboard = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(`var(${cssVar})`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const checkerStyle: React.CSSProperties = checkerboard
    ? {
        backgroundImage:
          'linear-gradient(45deg, #E4E8E9 25%, transparent 25%), linear-gradient(-45deg, #E4E8E9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E4E8E9 75%), linear-gradient(-45deg, transparent 75%, #E4E8E9 75%)',
        backgroundSize: '12px 12px',
        backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0',
      }
    : {};

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copiar var(${cssVar})`}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: `1px solid ${DOC_BORDER}`,
        borderRadius: 12,
        overflow: 'hidden',
        background: DOC_SURFACE,
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <div style={{ height: 72, ...checkerStyle }}>
        <div
          style={{
            height: '100%',
            background: value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {preview}
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: DOC_TEXT }}>{name}</div>
        <div
          style={{
            fontSize: 11,
            color: DOC_MUTED,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            marginTop: 2,
            wordBreak: 'break-all',
          }}
        >
          {cssVar}
        </div>
        <div
          style={{
            fontSize: 11,
            color: DOC_MUTED,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            marginTop: 2,
          }}
        >
          {value}
        </div>
        {figmaName && (
          <div style={{ fontSize: 11, color: DOC_BRAND, marginTop: 4 }}>Figma: {figmaName}</div>
        )}
        <div style={{ fontSize: 11, color: copied ? DOC_SUCCESS : DOC_MUTED, marginTop: 6 }}>
          {copied ? '✓ Copiado!' : 'Clique para copiar'}
        </div>
      </div>
    </button>
  );
};
