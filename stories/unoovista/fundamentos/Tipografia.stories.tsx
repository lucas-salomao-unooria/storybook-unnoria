import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import type { UnvDocTheme } from '../../../.storybook/components';
import {
  unvTypography,
  unvTypographyOrder,
  unvFontFamily,
  unvFontWeights,
} from '../../../src/unoovista/tokens';
import type { UnvTypographyStyle, UnvTypographyToken } from '../../../src/unoovista/tokens';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DOC_BORDER = '#E4E8E9';
const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_LINK = '#57547D';
const DOC_SUCCESS = '#01B574';

const THEMES: UnvDocTheme[] = ['light', 'dark'];
const THEME_LABEL: Record<UnvDocTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

/**
 * Prefixo das variáveis CSS de cada estilo (`--unv-font-<estilo>`), derivado da classe utilitária.
 */
const cssPrefix = (style: UnvTypographyStyle): string =>
  `--unv-font-${style.className.replace('unv-text--', '')}`;

const SCALE: { key: UnvTypographyToken; style: UnvTypographyStyle }[] = unvTypographyOrder.map(
  (key) => ({ key, style: unvTypography[key] })
);

const DISTINCT_SIZES = Array.from(new Set(SCALE.map((item) => item.style.fontSize))).sort(
  (a, b) => b - a
);

/**
 * Estilo inline de um degrau da escala, escrito só com variáveis `--unv-font-*`.
 */
const scaleStyle = (style: UnvTypographyStyle): React.CSSProperties => ({
  color: 'var(--unv-color-text-primary)',
  fontFamily: 'var(--unv-font-sans)',
  fontSize: `var(${cssPrefix(style)}-size)`,
  fontWeight: `var(${cssPrefix(style)}-weight)` as React.CSSProperties['fontWeight'],
  lineHeight: `var(${cssPrefix(style)}-line)`,
  letterSpacing: `var(${cssPrefix(style)}-tracking)`,
});

/**
 * Espécime de um estilo tipográfico, renderizado nos dois temas com a classe utilitária do módulo.
 */
const Specimen: React.FC<{ style: UnvTypographyStyle }> = ({ style }) => {
  const [copied, setCopied] = useState(false);
  const prefix = cssPrefix(style);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(`.${style.className}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: `1px solid ${DOC_BORDER}`,
        borderRadius: 12,
        background: '#FFFFFF',
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {THEMES.map((theme) => (
          <div
            key={theme}
            data-unv-theme={theme}
            style={{ background: 'var(--unv-color-background-primary)', padding: '16px 18px' }}
          >
            <span
              className={`unv-text ${style.className}`}
              style={{
                color: 'var(--unv-color-text-primary)',
                fontFamily: 'var(--unv-font-sans)',
              }}
            >
              Marina Costa — 08:34
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          padding: '10px 16px',
          fontSize: 12,
          color: DOC_MUTED,
          fontFamily: MONO,
        }}
      >
        <strong style={{ color: DOC_TEXT, fontFamily: 'inherit' }}>{style.styleName}</strong>
        <span>{style.fontSize}px</span>
        <span>w{style.fontWeight}</span>
        <span>linha {style.lineHeight}px</span>
        <span>tracking {style.letterSpacing}px</span>
        <span style={{ color: DOC_LINK }}>{prefix}-*</span>
        <span>.{style.className}</span>
        <span>origem {style.unooria}</span>
        <span style={{ color: copied ? DOC_SUCCESS : DOC_MUTED }}>
          {copied ? '✓ Classe copiada!' : 'Clique para copiar a classe'}
        </span>
      </div>
      <div style={{ padding: '0 16px 12px', fontSize: 12.5, color: DOC_MUTED }}>{style.usage}</div>
    </button>
  );
};

/**
 * Simulador que aplica qualquer estilo da escala a um texto arbitrário.
 */
const TypeSimulator: React.FC = () => {
  const [styleKey, setStyleKey] = useState<UnvTypographyToken>('titleLarge');
  const [theme, setTheme] = useState<UnvDocTheme>('light');
  const [text, setText] = useState('Nosso experimento ficou pronto para a feira de ciências');
  const style = unvTypography[styleKey];

  const fieldStyle: React.CSSProperties = {
    padding: '8px 10px',
    borderRadius: 8,
    border: `1px solid ${DOC_BORDER}`,
    fontSize: 13,
  };
  const labelStyle: React.CSSProperties = { fontSize: 12, color: DOC_MUTED, display: 'grid', gap: 4 };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={labelStyle}>
          Estilo
          <select
            value={styleKey}
            onChange={(event) => setStyleKey(event.target.value as UnvTypographyToken)}
            style={fieldStyle}
          >
            {SCALE.map((item) => (
              <option key={item.key} value={item.key}>
                {item.style.styleName} · {item.style.fontSize}px · w{item.style.fontWeight}
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Tema
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value as UnvDocTheme)}
            style={fieldStyle}
          >
            {THEMES.map((option) => (
              <option key={option} value={option}>
                {THEME_LABEL[option]}
              </option>
            ))}
          </select>
        </label>

        <label style={{ ...labelStyle, flex: 1 }}>
          Texto
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{ ...fieldStyle, width: '100%', boxSizing: 'border-box' }}
          />
        </label>
      </div>

      <UnvDocStage surface="primary" theme={theme} align="flex-start" padding={24}>
        <span style={scaleStyle(style)}>{text}</span>
      </UnvDocStage>
    </div>
  );
};

/**
 * Cabeçalho de publicação que combina quatro degraus da escala.
 */
const ContextSample: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gap: 'var(--unv-spacing-3xs)',
      fontFamily: 'var(--unv-font-sans)',
    }}
  >
    <span
      className="unv-text unv-text--label-lg"
      style={{ color: 'var(--unv-color-text-primary)' }}
    >
      marina.costa
    </span>
    <span
      className="unv-text unv-text--overline-sm"
      style={{ color: 'var(--unv-color-text-secondary)' }}
    >
      Feira de ciências · Recife
    </span>
    <span
      className="unv-text unv-text--body-md"
      style={{ color: 'var(--unv-color-text-primary)', maxWidth: 360 }}
    >
      Nosso experimento ficou pronto. Obrigada a toda a turma por testar com a gente!
    </span>
    <span
      className="unv-text unv-text--caption-md"
      style={{ color: 'var(--unv-color-text-secondary)' }}
    >
      Há 30 minutos
    </span>
  </div>
);

/**
 * Página de documentação rica da tipografia do Unoovista.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description={`Escala de ${SCALE.length} estilos em Open Sans, a família da Plataforma Unooria. Os tamanhos são os degraus de ${DISTINCT_SIZES.join(', ')}px da escala da plataforma, com as mesmas alturas de linha, nos pesos 400, 600 e 700 (mais o 500, tokenizado). Cada estilo é entregue como quatro variáveis (--unv-font-*-size, -weight, -line e -tracking) e uma classe utilitária .unv-text--*, e nomeia o token de tamanho de que vem.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma família, poucos tamanhos e o papel de cada degrau."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🔤" title="Open Sans — toda a interface">
        Família única do produto, em <code>--unv-font-sans</code>. O peso <code>400</code> serve a
        legendas, corpo e metadados; <code>600</code>, a títulos, rótulos de botão e de chip;{' '}
        <code>700</code>, ao nome de usuário e ao selo LIVE.
      </UnvDocCard>
      <UnvDocCard icon="📏" title="Sem tracking">
        Nenhum degrau declara <code>letter-spacing</code>. As variáveis <code>-tracking</code>{' '}
        existem, todas em <code>0px</code>, só para que um componente nunca invente um valor
        próprio.
      </UnvDocCard>
      <UnvDocCard icon="📐" title="Escala da Unooria">
        Os degraus são copiados de <code>--unooria-size-title-l</code> a{' '}
        <code>--unooria-size-caption-xxxs</code>, com as alturas de linha correspondentes. A
        paridade de tamanho e de altura é verificada por{' '}
        <code>scripts/verificar-paridade-unoovista.mjs</code>.
      </UnvDocCard>
      <UnvDocCard icon="👁️" title="Nada abaixo de 12px, salvo o selo">
        O menor corpo de leitura é 12px. O único degrau menor é o do selo LIVE (10px, em negrito),
        que é rótulo curto e nunca texto corrido.
      </UnvDocCard>
      <UnvDocCard icon="🌗" title="Independe do tema">
        A escala é a mesma no claro e no escuro. O tema só troca a cor do texto, por{' '}
        <code>--unv-color-text-*</code>.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura dos tokens e decisões registradas."
    />
    <UnvDocSpecs
      component="../tokens"
      layout="Tokens · Open Sans"
      specs={[
        { label: 'Arquivos', value: 'typography.css · typography.ts' },
        { label: 'Família', value: "'Open Sans'" },
        { label: 'Pesos usados', value: '400 · 600 · 700 (+ 500 tokenizado)' },
        { label: 'Estilos na escala', value: String(SCALE.length) },
        { label: 'Menor degrau', value: '10px (selo LIVE)' },
        { label: 'Maior degrau', value: '20px (Heading/H3)' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Sem letter-spacing',
          detail:
            'como na escala da Plataforma Unooria, nenhum degrau declara tracking. As variáveis -tracking valem 0px e existem para que o componente nunca invente um valor.',
        },
        {
          subject: 'Fonte opt-in',
          detail:
            "as folhas de componente só citam var(--unv-font-sans), com pilha de fallback; não declaram @font-face. Quem quiser a Open Sans embutida importa import '@unooria/design-system/fonts/unoovista.css', ou resolve a família por next/font. O Storybook já importa a folha de fontes do módulo.",
        },
        {
          subject: 'Alturas de linha absolutas',
          detail:
            'cada degrau fixa a altura de linha em pixels (30, 28, 24, 20, 18 e 14px), nos degraus da escala da Unooria, em vez de deixá-la automática.',
        },
        {
          subject: 'Degraus repetidos com papéis distintos',
          detail:
            'Title/Medium e Body/Large medem 16px/24px; Title/Small, Body/Medium, Label/Large, Label/Medium e Navigation/Title medem 14px/20px; Caption e Overline medem 12px/18px. Os nomes ficam separados para que um papel possa divergir sem alterar os outros.',
        },
        {
          subject: 'Legibilidade acima do corpo miúdo',
          detail:
            'nenhum texto de leitura fica abaixo de 12px. O selo LIVE é 10px em negrito sobre a etiqueta de contraste medido, e é o único degrau abaixo de 12px.',
        },
        {
          subject: 'Classes utilitárias além das variáveis',
          detail:
            'cada estilo tem uma classe .unv-text--* (mais a base .unv-text) que aplica tamanho, peso, altura e tracking de uma vez. Componentes usam as variáveis; documentação e telas compostas podem usar as classes.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escala completa"
      description={`${SCALE.length} degraus na ordem canônica, renderizados com a classe utilitária nos dois temas. Clique em um espécime para copiar a classe.`}
    />
    {SCALE.map((item) => (
      <Specimen key={item.key} style={item.style} />
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Simulador interativo"
      description="Aplique qualquer estilo da escala a um texto arbitrário sobre a tela, em um dos temas."
    />
    <TypeSimulator />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Hierarquia em contexto"
      description="O cabeçalho de uma publicação combina quatro degraus distintos."
    />
    <UnvDocStage surface="primary" align="flex-start" padding={24}>
      <ContextSample />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A escala é a mesma nos dois temas; muda só a cor do texto sobre a tela."
    />
    <UnvDocThemeSwitcher surface="primary" padding={28}>
      {() => (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 560 }}
        >
          {SCALE.map((item) => (
            <div
              key={item.key}
              style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}
            >
              <span
                style={{
                  flex: '0 0 130px',
                  fontFamily: MONO,
                  fontSize: 11,
                  color: 'var(--unv-color-text-secondary)',
                }}
              >
                {item.style.styleName}
              </span>
              <span style={scaleStyle(item.style)}>Marina Costa — 08:34</span>
            </div>
          ))}
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Aplicar os tokens --unv-font-* (ou as classes .unv-text--*) em vez de literais de tamanho, peso e altura de linha.',
        'Carregar a Open Sans pela folha opt-in fonts/unoovista.css ou por next/font.',
        'Combinar Label/Large (nome) com Overline/Small (local) e Body/Medium (legenda) nas publicações.',
        'Manter a cor do texto em --unv-color-text-*, para o tema acompanhar.',
        'Reservar Navigation/Badge (10px) ao selo LIVE.',
      ]}
      donts={[
        'Aplicar letter-spacing: a escala da Unooria não usa tracking em nenhum degrau.',
        'Declarar @font-face dentro de uma folha de componente ou de token.',
        'Arredondar ou inventar tamanhos fora da escala 10, 12, 14, 16, 18 e 20px.',
        'Usar corpo abaixo de 12px em texto de leitura.',
        'Editar um tamanho no Unoovista sem alterar o token de origem: o guarda de paridade reprova o build.',
        'Trocar a Open Sans por outra família humanista de aparência semelhante.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Referência completa dos tokens"
      description="Cada degrau expõe as variáveis -size, -weight, -line e -tracking, e uma classe utilitária."
    />
    <UnvDocPropsTable
      title="Variáveis CSS da escala tipográfica"
      rows={SCALE.map((item) => ({
        name: item.style.styleName,
        type: `${cssPrefix(item.style)}-size | -weight | -line | -tracking`,
        default: `${item.style.fontSize}px / ${item.style.fontWeight} / ${item.style.lineHeight}px / ${item.style.letterSpacing}px`,
        description: `${item.style.usage} Classe: .${item.style.className}. Origem: ${item.style.unooria}.`,
      }))}
    />
    <UnvDocPropsTable
      title="Família e pesos"
      rows={[
        {
          name: 'sans',
          type: '--unv-font-sans',
          default: "'Open Sans'",
          description: `Família de toda a interface. Pilha completa: ${unvFontFamily}.`,
        },
        ...Object.entries(unvFontWeights).map(([name, weight]) => ({
          name,
          type: `--unv-font-weight-${name}`,
          default: String(weight),
          description: `Peso ${weight} da Open Sans.`,
        })),
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoovista/Fundamentos/Tipografia',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa da tipografia do módulo.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TipografiaDocumentationPage />,
};

/**
 * Escala completa em espécimes clicáveis, nos dois temas.
 */
export const Escala: Story = {
  name: '🎨 Escala completa',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Escala tipográfica" />
      {SCALE.map((item) => (
        <Specimen key={item.key} style={item.style} />
      ))}
    </UnooriaDocShell>
  ),
};

/**
 * Simulador interativo de estilos tipográficos.
 */
export const Simulador: Story = {
  name: '🕹️ Simulador de estilos',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Simulador de estilos" />
      <TypeSimulator />
    </UnooriaDocShell>
  ),
};
