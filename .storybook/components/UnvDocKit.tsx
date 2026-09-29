import React, { useState } from 'react';

/**
 * Kit de documentação do Design System Unoovista.
 *
 * Componentes utilitários compartilhados por todas as estórias da seção
 * "Unoovista", garantindo que as sete seções obrigatórias do Padrão Ouro
 * (visão geral, especificações técnicas, anatomia, matriz de variantes, boas
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
const DOC_LINK = '#57547D';
const DOC_ACCENT = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/**
 * Temas do módulo.
 */
export type UnvDocTheme = 'light' | 'dark';

/**
 * Superfícies disponíveis como palco de demonstração.
 */
export type UnvDocSurface = 'primary' | 'secondary' | 'tertiary' | 'elevated';

const SURFACE_TOKENS: Record<UnvDocSurface, { cssVar: string; label: string }> = {
  primary: { cssVar: '--unv-color-background-primary', label: 'Primária' },
  secondary: { cssVar: '--unv-color-background-secondary', label: 'Secundária' },
  tertiary: { cssVar: '--unv-color-background-tertiary', label: 'Terciária' },
  elevated: { cssVar: '--unv-color-background-elevated', label: 'Elevada' },
};

/**
 * Grade responsiva usada nas seções de visão geral e anatomia.
 */
export const UnvDocGrid: React.FC<{
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
export const UnvDocCard: React.FC<{
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
 * Bloco de especificações técnicas do componente: pasta de origem no pacote,
 * arranjo e medidas.
 */
export const UnvDocSpecs: React.FC<{
  /** Pasta do componente em `src/unoovista/components/` */
  component: string;
  /** Descrição curta do arranjo (ex.: "Linha · 70px") */
  layout: string;
  specs: { label: string; value: string }[];
}> = ({ component, layout, specs }) => (
  <div
    style={{
      backgroundColor: DOC_SUBTLE,
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
    }}
  >
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
      <span
        style={{
          display: 'inline-block',
          backgroundColor: DOC_TEXT,
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: 700,
          padding: '6px 14px',
          borderRadius: 16,
          fontFamily: MONO,
        }}
      >
        src/unoovista/components/{component}
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
        {layout}
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
        Base: Plataforma Unooria
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
          <div style={{ fontSize: 13, color: DOC_TEXT, fontWeight: 600, fontFamily: MONO }}>
            {spec.value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Registro de decisões de design do componente: escolhas de cor por contraste,
 * medidas próprias do módulo e extensões sem par na Plataforma Unooria.
 * Obrigatório na seção "Especificações Técnicas".
 */
export const UnvDocDecisions: React.FC<{
  items: { subject: string; detail: string }[];
}> = ({ items }) => (
  <div
    style={{
      border: `1px solid ${DOC_ACCENT}`,
      borderRadius: 12,
      padding: 20,
      marginBottom: 32,
      backgroundColor: 'rgba(113, 108, 152, 0.06)',
    }}
  >
    <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: DOC_LINK }}>
      🧭 Decisões de design registradas
    </h4>
    {items.length === 0 ? (
      <p style={{ margin: 0, fontSize: 13.5, color: DOC_MUTED }}>
        Nenhuma decisão além dos tokens da Plataforma Unooria: o componente só compõe os degraus
        de cor, tipografia e ícone do módulo.
      </p>
    ) : (
      <ul style={{ margin: 0, paddingLeft: 18, color: DOC_MUTED, fontSize: 13.5, lineHeight: 1.7 }}>
        {items.map((item) => (
          <li key={item.subject}>
            <strong style={{ color: DOC_TEXT }}>{item.subject}</strong> — {item.detail}
          </li>
        ))}
      </ul>
    )}
  </div>
);

/**
 * Palco de demonstração sobre uma das superfícies do módulo, em um dos temas.
 */
export const UnvDocStage: React.FC<{
  label?: string;
  theme?: UnvDocTheme;
  surface?: UnvDocSurface;
  padding?: number;
  align?: 'center' | 'flex-start' | 'stretch';
  direction?: 'row' | 'column';
  gap?: number;
  width?: number | string;
  children: React.ReactNode;
}> = ({
  label,
  theme = 'light',
  surface = 'primary',
  padding = 24,
  align = 'center',
  direction = 'row',
  gap = 24,
  width,
  children,
}) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <div style={{ fontSize: 12, fontWeight: 600, color: DOC_MUTED, marginBottom: 8 }}>
        {label}
      </div>
    )}
    <div
      data-unv-theme={theme}
      style={{
        display: 'flex',
        flexDirection: direction,
        justifyContent: align === 'stretch' ? 'flex-start' : align,
        alignItems: align === 'stretch' ? 'stretch' : 'center',
        flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
        gap,
        width,
        background: `var(${SURFACE_TOKENS[surface].cssVar})`,
        border: `1px solid ${DOC_BORDER}`,
        borderRadius: 12,
        padding,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Cartões comparativos de boas práticas (DO e DON'T).
 */
export const UnvDocPractices: React.FC<{
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
 * Alternador interativo de tema (claro e escuro), como um produto faz: troca o
 * atributo `data-unv-theme` do contêiner e os tokens acompanham.
 */
export const UnvDocThemeSwitcher: React.FC<{
  children: (theme: UnvDocTheme) => React.ReactNode;
  surface?: UnvDocSurface;
  initial?: UnvDocTheme;
  padding?: number;
}> = ({ children, surface = 'primary', initial = 'light', padding = 24 }) => {
  const [theme, setTheme] = useState<UnvDocTheme>(initial);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {(['light', 'dark'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTheme(option)}
            aria-pressed={theme === option}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: `1px solid ${theme === option ? DOC_TEXT : DOC_BORDER}`,
              backgroundColor: theme === option ? DOC_TEXT : DOC_SURFACE,
              color: theme === option ? '#FFFFFF' : DOC_MUTED,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {option === 'light' ? '☀️ Tema claro' : '🌙 Tema escuro'}
          </button>
        ))}
      </div>

      <div
        data-unv-theme={theme}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
          padding,
          borderRadius: 12,
          border: `1px solid ${DOC_BORDER}`,
          background: `var(${SURFACE_TOKENS[surface].cssVar})`,
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
export interface UnvDocPropRow {
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
export const UnvDocPropsTable: React.FC<{
  title?: string;
  rows: UnvDocPropRow[];
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
                  fontFamily: MONO,
                  verticalAlign: 'top',
                }}
              >
                {row.name}
              </td>
              <td
                style={{
                  padding: '10px 14px',
                  color: DOC_LINK,
                  fontFamily: MONO,
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
                  fontFamily: MONO,
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
 * Amostra de token clicável que copia a variável CSS para a área de transferência.
 * Mostra o valor nos dois temas (metade clara, metade escura) e a origem na
 * Plataforma Unooria.
 */
export const UnvDocTokenSwatch: React.FC<{
  cssVar: string;
  name: string;
  /** Valor no tema claro */
  light: string;
  /** Valor no tema escuro; quando igual ao claro, o token é invariante */
  dark?: string;
  /** Token de origem em `src/unooria/tokens/` (claro, escuro) */
  unooria?: [string, string?];
  preview?: React.ReactNode;
}> = ({ cssVar, name, light, dark, unooria, preview }) => {
  const [copied, setCopied] = useState(false);
  const darkValue = dark ?? light;

  const handleCopy = () => {
    void navigator.clipboard?.writeText(`var(${cssVar})`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

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
      <div
        style={{
          height: 72,
          background: `linear-gradient(90deg, ${light} 50%, ${darkValue} 50%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {preview}
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: DOC_TEXT }}>{name}</div>
        <div
          style={{
            fontSize: 11,
            color: DOC_MUTED,
            fontFamily: MONO,
            marginTop: 2,
            wordBreak: 'break-all',
          }}
        >
          {cssVar}
        </div>
        <div style={{ fontSize: 11, color: DOC_MUTED, fontFamily: MONO, marginTop: 2 }}>
          {light === darkValue ? light : `${light} · ${darkValue}`}
        </div>
        {unooria && (
          <div
            style={{
              fontSize: 11,
              color: DOC_LINK,
              marginTop: 4,
              fontFamily: MONO,
              wordBreak: 'break-all',
            }}
          >
            {unooria[0]}
            {unooria[1] && unooria[1] !== unooria[0] ? ` · ${unooria[1]}` : ''}
          </div>
        )}
        <div style={{ fontSize: 11, color: copied ? DOC_SUCCESS : DOC_MUTED, marginTop: 6 }}>
          {copied ? '✓ Copiado!' : 'Clique para copiar'}
        </div>
      </div>
    </button>
  );
};

/**
 * Lista numerada das zonas de customização de um componente.
 */
export const UnvDocAnatomy: React.FC<{
  zones: { name: string; role: string; token?: string }[];
}> = ({ zones }) => (
  <div style={{ border: `1px solid ${DOC_BORDER}`, borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
    {zones.map((zone, index) => (
      <div
        key={zone.name}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          padding: '12px 16px',
          borderTop: index === 0 ? 'none' : `1px solid ${DOC_BORDER}`,
          backgroundColor: index % 2 === 0 ? DOC_SURFACE : DOC_SUBTLE,
        }}
      >
        <span
          style={{
            flexShrink: 0,
            width: 22,
            height: 22,
            borderRadius: 999,
            backgroundColor: DOC_TEXT,
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {index + 1}
        </span>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: DOC_TEXT }}>{zone.name}</div>
          <div style={{ fontSize: 13, color: DOC_MUTED, lineHeight: 1.6 }}>{zone.role}</div>
          {zone.token && (
            <div style={{ fontSize: 11.5, color: DOC_LINK, fontFamily: MONO, marginTop: 2 }}>
              {zone.token}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);
