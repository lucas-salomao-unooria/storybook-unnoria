import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import type { UncDocTheme } from '../../../.storybook/components';
import { uncTypographyScale, uncFontFamilies } from '../../../src/unoochat/tokens';
import type { UncTypographyToken } from '../../../src/unoochat/tokens';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const THEMES: UncDocTheme[] = ['light', 'dark'];
const THEME_LABEL: Record<UncDocTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

/**
 * Estilo inline de um degrau da escala, escrito só com variáveis `--unc-font-*`.
 */
const scaleStyle = (token: UncTypographyToken): React.CSSProperties => ({
  color: 'var(--unc-color-text-primary)',
  fontFamily: token.family === 'sans' ? 'var(--unc-font-sans)' : 'var(--unc-font-statusbar)',
  fontSize: `var(${token.cssVarPrefix}-size)`,
  fontWeight: `var(${token.cssVarPrefix}-weight)` as React.CSSProperties['fontWeight'],
  lineHeight: `var(${token.cssVarPrefix}-line)`,
});

/**
 * Espécime de um estilo tipográfico, renderizado nos dois temas com as variáveis do módulo.
 */
const Specimen: React.FC<{ index: number }> = ({ index }) => {
  const token = uncTypographyScale[index];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(`var(${token.cssVarPrefix}-size)`);
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
        border: '1px solid #E4E8E9',
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
            data-unc-theme={theme}
            style={{ background: 'var(--unc-color-surface-canvas)', padding: '16px 18px' }}
          >
            <span style={scaleStyle(token)}>Amara Lima — 08:34</span>
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
          color: '#475157',
          fontFamily: MONO,
        }}
      >
        <strong style={{ color: '#22272A', fontFamily: 'inherit' }}>{token.name}</strong>
        <span>{token.size}</span>
        <span>w{token.weight}</span>
        <span>linha {token.line}</span>
        <span>{token.family}</span>
        <span style={{ color: '#57547D' }}>{token.cssVarPrefix}-*</span>
        <span>origem {token.unooria}</span>
        <span style={{ color: copied ? '#01B574' : '#475157' }}>
          {copied ? '✓ Copiado!' : 'Clique para copiar'}
        </span>
      </div>
      <div style={{ padding: '0 16px 12px', fontSize: 12.5, color: '#475157' }}>{token.usage}</div>
    </button>
  );
};

/**
 * Simulador que aplica qualquer estilo da escala a um texto arbitrário.
 */
const TypeSimulator: React.FC = () => {
  const [styleIndex, setStyleIndex] = useState(1);
  const [theme, setTheme] = useState<UncDocTheme>('light');
  const [text, setText] = useState('As mensagens e as chamadas são protegidas');
  const token = uncTypographyScale[styleIndex];

  const fieldStyle: React.CSSProperties = {
    padding: '8px 10px',
    borderRadius: 8,
    border: '1px solid #E4E8E9',
    fontSize: 13,
  };
  const labelStyle: React.CSSProperties = { fontSize: 12, color: '#475157', display: 'grid', gap: 4 };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={labelStyle}>
          Estilo
          <select
            value={styleIndex}
            onChange={(event) => setStyleIndex(Number(event.target.value))}
            style={fieldStyle}
          >
            {uncTypographyScale.map((item, index) => (
              <option key={item.name} value={index}>
                {item.name} · {item.size} · w{item.weight}
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Tema
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value as UncDocTheme)}
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

      <UncDocStage surface="canvas" theme={theme} align="flex-start" padding={24}>
        <span style={scaleStyle(token)}>{text}</span>
      </UncDocStage>
    </div>
  );
};

/**
 * Linha de conversa que combina três degraus da escala.
 */
const ContextSample: React.FC = () => (
  <>
    <span
      style={{
        color: 'var(--unc-color-text-primary)',
        fontFamily: 'var(--unc-font-sans)',
        fontSize: 'var(--unc-font-title-lg-size)',
        fontWeight: 'var(--unc-font-title-lg-weight)' as React.CSSProperties['fontWeight'],
        lineHeight: 'var(--unc-font-title-lg-line)',
      }}
    >
      Amara Lima
    </span>
    <span
      style={{
        color: 'var(--unc-color-text-secondary)',
        fontFamily: 'var(--unc-font-sans)',
        fontSize: 'var(--unc-font-label-md-size)',
        fontWeight: 'var(--unc-font-label-md-weight)' as React.CSSProperties['fontWeight'],
        lineHeight: 'var(--unc-font-label-md-line)',
      }}
    >
      Há 30 minutos
    </span>
    <span
      style={{
        color: 'var(--unc-color-text-secondary)',
        fontFamily: 'var(--unc-font-sans)',
        fontSize: 'var(--unc-font-caption-bold-size)',
        fontWeight: 'var(--unc-font-caption-bold-weight)' as React.CSSProperties['fontWeight'],
        lineHeight: 'var(--unc-font-caption-bold-line)',
      }}
    >
      15:14
    </span>
  </>
);

/**
 * Página de documentação rica da tipografia do Unoochat.
 */
const TipografiaDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Fundamentos • Tipografia"
      title="Tipografia"
      description={`Escala de ${uncTypographyScale.length} estilos em Open Sans, a família da Plataforma Unooria. Os tamanhos são os degraus 10, 12, 14, 16, 18, 20 e 24px da escala da plataforma, com as mesmas alturas de linha, nos pesos 400, 600 e 700. Cada estilo é entregue como três variáveis (--unc-font-*-size, -weight e -line) e nomeia o token de tamanho de que vem.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma família, sete tamanhos e o papel de cada degrau."
    />
    <UncDocGrid>
      <UncDocCard icon="🔤" title="Open Sans — toda a interface">
        Família única do produto, em <code>--unc-font-sans</code>. O peso <code>400</code> serve a
        nomes, corpo e metadados; <code>600</code>, a títulos de barra, rótulos de seção e horários;{' '}
        <code>700</code>, ao numeral do selo de não lidas.
      </UncDocCard>
      <UncDocCard icon="📱" title="Barra de status">
        Relógio, rede e bateria usam <code>--unc-font-statusbar</code>, que aponta para a mesma Open
        Sans. Os três degraus têm variáveis próprias para que a moldura de sistema possa mudar de
        família sem tocar a interface.
      </UncDocCard>
      <UncDocCard icon="📐" title="Escala da Unooria">
        Os degraus são copiados de <code>--unooria-size-title-xl</code> a{' '}
        <code>--unooria-size-caption-xxxs</code>. A paridade de tamanho e de altura de linha é
        verificada por <code>scripts/verificar-paridade-unoochat.mjs</code>.
      </UncDocCard>
      <UncDocCard icon="🌗" title="Independe do tema">
        A escala é a mesma no claro e no escuro. O tema só troca a cor do texto, por{' '}
        <code>--unc-color-text-*</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura dos tokens e decisões registradas."
    />
    <UncDocSpecs
      component="../tokens"
      layout="Tokens · Open Sans"
      specs={[
        { label: 'Arquivos', value: 'typography.css · typography.ts' },
        { label: 'Família', value: "'Open Sans'" },
        { label: 'Pesos usados', value: '400 · 600 · 700' },
        { label: 'Degraus na escala', value: String(uncTypographyScale.length) },
        { label: 'Menor degrau', value: '10px (Badge)' },
        { label: 'Maior degrau', value: '24px (Display/Call)' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Sem letter-spacing',
          detail:
            'como na escala da Plataforma Unooria, nenhum degrau declara tracking. O módulo não expõe variáveis de espaçamento entre letras e não deve aplicá-las.',
        },
        {
          subject: 'Fonte opt-in',
          detail:
            "as folhas de componente só citam var(--unc-font-sans), com pilha de fallback; não declaram @font-face. Quem quiser a Open Sans embutida importa import '@unooria/design-system/fonts/unoochat.css', ou resolve a família por next/font. O Storybook já importa a folha de fontes do módulo.",
        },
        {
          subject: 'Alturas de linha absolutas',
          detail:
            'cada degrau fixa a altura de linha em pixels (34, 30, 28, 24, 20 e 18px; 14px no selo), nos degraus da escala da Unooria, em vez de deixá-la automática.',
        },
        {
          subject: 'Degraus repetidos com papéis distintos',
          detail:
            'Body/Large, Body/Medium e Placeholder medem 16px/24px, e Label/Small e Caption medem 12px/18px. Os nomes ficam separados para que um papel possa divergir sem alterar os outros.',
        },
        {
          subject: 'Barra de status na mesma família',
          detail:
            '--unc-font-statusbar é um alias de --unc-font-sans: a moldura de sistema usa Open Sans nos pesos 600 e nos tamanhos 14px e 12px da escala.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escala completa"
      description={`${uncTypographyScale.length} degraus em ordem decrescente, renderizados com as variáveis --unc-font-* nos dois temas. Clique em um espécime para copiar a variável de tamanho.`}
    />
    {uncTypographyScale.map((token, index) => (
      <Specimen key={token.name} index={index} />
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Simulador interativo"
      description="Aplique qualquer estilo da escala a um texto arbitrário sobre o canvas, em um dos temas."
    />
    <TypeSimulator />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Hierarquia em contexto"
      description="Uma linha de conversa combina três degraus distintos."
    />
    <UncDocStage surface="canvas" align="flex-start" padding={24} direction="column" gap={6}>
      <ContextSample />
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A escala é a mesma nos dois temas; muda só a cor do texto sobre o canvas."
    />
    <UncDocThemeSwitcher surface="canvas" padding={28}>
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 520 }}>
          {uncTypographyScale
            .filter((token) => token.family === 'sans')
            .map((token) => (
              <div key={token.name} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span
                  style={{
                    flex: '0 0 120px',
                    fontFamily: MONO,
                    fontSize: 11,
                    color: 'var(--unc-color-text-secondary)',
                  }}
                >
                  {token.name}
                </span>
                <span style={scaleStyle(token)}>Amara Lima — 08:34</span>
              </div>
            ))}
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <UncDocPractices
      dos={[
        'Aplicar os tokens --unc-font-* em vez de literais de tamanho, peso e altura de linha.',
        'Carregar a Open Sans pela folha opt-in fonts/unoochat.css ou por next/font.',
        'Reservar --unc-font-statusbar para a moldura de sistema.',
        'Combinar Title/Large com Label/Medium e Caption/Bold nas linhas de lista.',
        'Manter a cor do texto em --unc-color-text-*, para o tema acompanhar.',
      ]}
      donts={[
        'Aplicar letter-spacing: a escala da Unooria não usa tracking em nenhum degrau.',
        'Declarar @font-face dentro de uma folha de componente ou de token.',
        'Arredondar ou inventar tamanhos fora da escala 10, 12, 14, 16, 18, 20 e 24px.',
        'Editar um tamanho no Unoochat sem alterar o token de origem: o guarda de paridade reprova o build.',
        'Trocar a Open Sans por outra família humanista de aparência semelhante.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Referência completa dos tokens"
      description="Cada degrau expõe as variáveis -size, -weight e -line."
    />
    <UncDocPropsTable
      title="Variáveis CSS da escala tipográfica"
      rows={uncTypographyScale.map((token) => ({
        name: token.name,
        type: `${token.cssVarPrefix}-size | -weight | -line`,
        default: `${token.size} / ${token.weight} / ${token.line}`,
        description: `${token.usage}. Origem: ${token.unooria}.`,
      }))}
    />
    <UncDocPropsTable
      title="Famílias tipográficas"
      rows={[
        {
          name: 'sans',
          type: '--unc-font-sans',
          default: "'Open Sans'",
          description: `Família de toda a interface. Pilha completa: ${uncFontFamilies.sans}.`,
        },
        {
          name: 'statusBar',
          type: '--unc-font-statusbar',
          default: 'var(--unc-font-sans)',
          description: 'Relógio, rede e bateria da barra de status. Alias da família da interface.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoochat/Fundamentos/Tipografia',
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
      {uncTypographyScale.map((token, index) => (
        <Specimen key={token.name} index={index} />
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
