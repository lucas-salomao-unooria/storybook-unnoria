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
  UncDocStage,
  UncDocThemeSwitcher,
  UncDocTokenSwatch,
  UncDocPropsTable,
} from '../../../.storybook/components';
import type { UncDocTheme } from '../../../.storybook/components';
import { Icon } from '../../../src/unoochat';
import {
  uncColorTokens,
  uncSurfaceColors,
  uncAccentColors,
  uncStatusColors,
  uncTextColors,
  uncIconColors,
  uncBorderColors,
  uncAttachmentColors,
} from '../../../src/unoochat/tokens';
import type { UncColorToken } from '../../../src/unoochat/tokens';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DOC_BORDER = '#E4E8E9';
const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_SUCCESS = '#01B574';
const DOC_DANGER = '#E31A1A';

const THEMES: UncDocTheme[] = ['light', 'dark'];
const THEME_LABEL: Record<UncDocTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

/**
 * Total de tokens de cor do módulo, somando todos os grupos.
 */
const TOTAL_TOKENS = Object.values(uncColorTokens).reduce(
  (sum, group) => sum + Object.keys(group).length,
  0
);

/**
 * Tokens cujo literal é o mesmo nos dois temas (invariantes).
 */
const INVARIANT_TOKENS = Object.entries(uncColorTokens).flatMap(([groupKey, group]) =>
  Object.entries(group)
    .filter(([, token]) => token.light.value === token.dark.value)
    .map(([key, token]) => ({ groupKey, key, token }))
);

/**
 * Luminância relativa WCAG de um hexadecimal `#RRGGBB`.
 */
const luminance = (hex: string): number => {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(value.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

/**
 * Razão de contraste WCAG entre duas cores hexadecimais.
 */
const contrastRatio = (a: string, b: string): number => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/**
 * Grade de amostras de cor (metade clara, metade escura) para um grupo de tokens.
 */
const SwatchGroup: React.FC<{ tokens: Record<string, UncColorToken> }> = ({ tokens }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
      gap: 14,
      marginBottom: 32,
    }}
  >
    {Object.entries(tokens).map(([key, token]) => (
      <UncDocTokenSwatch
        key={key}
        name={key}
        cssVar={token.cssVar}
        light={token.light.value}
        dark={token.dark.value}
        unooria={[token.light.unooria, token.dark.unooria]}
      />
    ))}
  </div>
);

/**
 * Escada de superfícies de um tema, ordenada da mais escura para a mais clara.
 * Cada faixa usa a variável real, escopada por `data-unc-theme`.
 */
const SurfaceLadder: React.FC<{ theme: UncDocTheme }> = ({ theme }) => {
  const rows = Object.entries(uncSurfaceColors).sort(
    ([, a], [, b]) => luminance(a[theme].value) - luminance(b[theme].value)
  );

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: DOC_MUTED, marginBottom: 8 }}>
        {THEME_LABEL[theme]} · da superfície mais escura à mais clara
      </div>
      <div
        data-unc-theme={theme}
        style={{ border: `1px solid ${DOC_BORDER}`, borderRadius: 12, overflow: 'hidden' }}
      >
        {rows.map(([key, token]) => (
          <div
            key={key}
            style={{
              background: `var(${token.cssVar})`,
              color: 'var(--unc-color-text-primary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 13,
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <strong>{key}</strong>
            <span style={{ fontFamily: MONO, fontSize: 12 }}>
              {token[theme].value} · {token[theme].unooria}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Escada de superfícies nos dois temas, lado a lado.
 */
const SurfaceLadders: React.FC = () => (
  <UncDocGrid min={360}>
    {THEMES.map((theme) => (
      <SurfaceLadder key={theme} theme={theme} />
    ))}
  </UncDocGrid>
);

/**
 * Amostras de texto ou de ícone de um grupo, sobre o canvas de cada tema.
 */
const TokenSpecimens: React.FC<{
  tokens: Record<string, UncColorToken>;
  kind: 'text' | 'icon';
}> = ({ tokens, kind }) => (
  <div
    style={{
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 32,
    }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 1fr) 1fr 1fr',
        fontSize: 12,
        fontWeight: 700,
        color: DOC_TEXT,
        background: '#F5F5F5',
      }}
    >
      <span style={{ padding: '8px 14px' }}>Token</span>
      {THEMES.map((theme) => (
        <span key={theme} style={{ padding: '8px 14px' }}>
          {THEME_LABEL[theme]} sobre canvas
        </span>
      ))}
    </div>
    {Object.entries(tokens).map(([key, token]) => (
      <div
        key={key}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(120px, 1fr) 1fr 1fr',
          borderTop: `1px solid ${DOC_BORDER}`,
          alignItems: 'stretch',
        }}
      >
        <span
          style={{
            padding: '10px 14px',
            fontSize: 12,
            fontFamily: MONO,
            color: DOC_TEXT,
            alignSelf: 'center',
          }}
        >
          {key}
        </span>
        {THEMES.map((theme) => (
          <div
            key={theme}
            data-unc-theme={theme}
            style={{
              background: 'var(--unc-color-surface-canvas)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: token[theme].value,
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {kind === 'icon' ? (
              <>
                <Icon name="search" tone="inherit" size="lg" />
                <Icon name="tickDouble" tone="inherit" size="lg" />
              </>
            ) : (
              <span>Aa · 08:34</span>
            )}
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 400, opacity: 0.85 }}>
              {token[theme].value}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

/**
 * Par de contraste avaliado na tabela WCAG.
 */
interface ContrastPair {
  label: string;
  fg: UncColorToken;
  bg: UncColorToken;
  /** 4,5 para texto normal; 3 para elementos gráficos (WCAG 1.4.11) */
  minimum: 4.5 | 3;
}

const CONTRAST_PAIRS: ContrastPair[] = [
  { label: 'Texto primário sobre canvas', fg: uncTextColors.primary, bg: uncSurfaceColors.canvas, minimum: 4.5 },
  { label: 'Texto primário sobre appbar', fg: uncTextColors.primary, bg: uncSurfaceColors.appbar, minimum: 4.5 },
  { label: 'Texto primário sobre sheet', fg: uncTextColors.primary, bg: uncSurfaceColors.sheet, minimum: 4.5 },
  { label: 'Texto secundário sobre canvas', fg: uncTextColors.secondary, bg: uncSurfaceColors.canvas, minimum: 4.5 },
  { label: 'Texto secundário sobre appbar', fg: uncTextColors.secondary, bg: uncSurfaceColors.appbar, minimum: 4.5 },
  { label: 'Texto secundário sobre sheet', fg: uncTextColors.secondary, bg: uncSurfaceColors.sheet, minimum: 4.5 },
  { label: 'Placeholder sobre sheet', fg: uncTextColors.placeholder, bg: uncSurfaceColors.sheet, minimum: 4.5 },
  { label: 'Texto do aviso sobre o aviso de criptografia', fg: uncTextColors.notice, bg: uncSurfaceColors.notice, minimum: 4.5 },
  { label: 'Acento sobre canvas (aba ativa, controles)', fg: uncAccentColors.accent, bg: uncSurfaceColors.canvas, minimum: 3 },
  { label: 'Texto sobre o acento (selo de não lidas)', fg: uncTextColors.onAccent, bg: uncAccentColors.accent, minimum: 4.5 },
  { label: 'Glifo sobre o acento (FAB)', fg: uncIconColors.onAccent, bg: uncAccentColors.accent, minimum: 3 },
  { label: 'Texto do balão sobre balão enviado', fg: uncTextColors.bubble, bg: uncSurfaceColors.bubbleOut, minimum: 4.5 },
  { label: 'Texto do balão sobre balão recebido', fg: uncTextColors.bubble, bg: uncSurfaceColors.bubbleIn, minimum: 4.5 },
  { label: 'Metadado do balão sobre balão enviado', fg: uncTextColors.bubbleMeta, bg: uncSurfaceColors.bubbleOut, minimum: 4.5 },
  { label: 'Metadado do balão sobre balão recebido', fg: uncTextColors.bubbleMeta, bg: uncSurfaceColors.bubbleIn, minimum: 4.5 },
  { label: 'Contorno de caixa de seleção sobre canvas', fg: uncBorderColors.control, bg: uncSurfaceColors.canvas, minimum: 3 },
];

const ratioCell = (ratio: number, minimum: number): React.ReactNode => {
  const passes = ratio >= minimum;
  return (
    <span style={{ color: passes ? DOC_SUCCESS : DOC_DANGER, fontWeight: 700, fontFamily: MONO }}>
      {ratio.toFixed(2)}:1 {passes ? '✓' : '✗'}
    </span>
  );
};

/**
 * Tabela de contraste WCAG calculada no próprio componente a partir dos literais de `colors.ts`.
 */
const ContrastTable: React.FC = () => (
  <div
    style={{
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 32,
    }}
  >
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: '#F5F5F5', color: DOC_TEXT }}>
          <th style={{ textAlign: 'left', padding: '10px 14px' }}>Par (primeiro plano sobre fundo)</th>
          <th style={{ textAlign: 'left', padding: '10px 14px' }}>Mínimo</th>
          <th style={{ textAlign: 'left', padding: '10px 14px' }}>Tema claro</th>
          <th style={{ textAlign: 'left', padding: '10px 14px' }}>Tema escuro</th>
        </tr>
      </thead>
      <tbody>
        {CONTRAST_PAIRS.map((pair) => (
          <tr key={pair.label} style={{ borderTop: `1px solid ${DOC_BORDER}` }}>
            <td style={{ padding: '10px 14px', color: DOC_TEXT }}>{pair.label}</td>
            <td style={{ padding: '10px 14px', color: DOC_MUTED, fontFamily: MONO }}>
              {pair.minimum === 4.5 ? '4,5:1 texto' : '3:1 gráfico'}
            </td>
            {THEMES.map((theme) => (
              <td key={theme} style={{ padding: '10px 14px' }}>
                {ratioCell(contrastRatio(pair.fg[theme].value, pair.bg[theme].value), pair.minimum)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Comparador interativo de contraste entre um primeiro plano e uma superfície, em um tema.
 */
const ContrastLab: React.FC = () => {
  const foregrounds: [string, UncColorToken][] = [
    ...Object.entries(uncTextColors).map(([key, token]): [string, UncColorToken] => [`texto · ${key}`, token]),
    ...Object.entries(uncAccentColors).map(([key, token]): [string, UncColorToken] => [`acento · ${key}`, token]),
    ...Object.entries(uncIconColors).map(([key, token]): [string, UncColorToken] => [`ícone · ${key}`, token]),
    ...Object.entries(uncBorderColors).map(([key, token]): [string, UncColorToken] => [`borda · ${key}`, token]),
  ];
  const surfaces = Object.entries(uncSurfaceColors);

  const [theme, setTheme] = useState<UncDocTheme>('light');
  const [surfaceKey, setSurfaceKey] = useState('canvas');
  const [fgIndex, setFgIndex] = useState(0);

  const surface = uncSurfaceColors[surfaceKey];
  const [fgLabel, fg] = foregrounds[fgIndex];
  const bgValue = surface[theme].value;
  const fgValue = fg[theme].value;
  const ratio = contrastRatio(bgValue, fgValue);

  const selectStyle: React.CSSProperties = {
    padding: '8px 10px',
    borderRadius: 8,
    border: `1px solid ${DOC_BORDER}`,
    fontSize: 13,
    color: DOC_TEXT,
    background: '#FFFFFF',
  };
  const labelStyle: React.CSSProperties = { fontSize: 12, color: DOC_MUTED, display: 'grid', gap: 4 };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <label style={labelStyle}>
          Tema
          <select
            style={selectStyle}
            value={theme}
            onChange={(event) => setTheme(event.target.value as UncDocTheme)}
          >
            {THEMES.map((option) => (
              <option key={option} value={option}>
                {THEME_LABEL[option]}
              </option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          Superfície
          <select
            style={selectStyle}
            value={surfaceKey}
            onChange={(event) => setSurfaceKey(event.target.value)}
          >
            {surfaces.map(([key, token]) => (
              <option key={key} value={key}>
                {key} · {token[theme].value}
              </option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          Primeiro plano
          <select
            style={selectStyle}
            value={fgIndex}
            onChange={(event) => setFgIndex(Number(event.target.value))}
          >
            {foregrounds.map(([label, token], index) => (
              <option key={label} value={index}>
                {label} · {token[theme].value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          background: bgValue,
          border: `1px solid ${DOC_BORDER}`,
          borderRadius: 12,
          padding: 28,
        }}
      >
        <p
          style={{
            margin: 0,
            color: fgValue,
            fontFamily: 'var(--unc-font-sans)',
            fontSize: 20,
          }}
        >
          Amara Lima — As mensagens e as chamadas são protegidas.
        </p>
        <p
          style={{
            margin: '10px 0 0',
            color: fgValue,
            fontFamily: 'var(--unc-font-sans)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {fgLabel} · contraste {ratio.toFixed(2)}:1{' '}
          {ratio >= 4.5 ? '✓ AA para texto' : ratio >= 3 ? '⚠ só para elementos gráficos (3:1)' : '✗ abaixo de 3:1'}
        </p>
      </div>
    </div>
  );
};

/**
 * Composição mínima de uma conversa, renderizada só com variáveis `--unc-*`.
 */
const ThemeSample: React.FC<{ theme: UncDocTheme }> = ({ theme }) => {
  const bubble: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 12,
    fontSize: 14,
    lineHeight: '20px',
    maxWidth: '78%',
    color: 'var(--unc-color-text-bubble)',
  };
  return (
    <div
      style={{
        width: 300,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--unc-color-border-divider)',
        fontFamily: 'var(--unc-font-sans)',
      }}
    >
      <div
        style={{
          background: 'var(--unc-color-surface-appbar)',
          color: 'var(--unc-color-icon-appbar)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        <span>Unoochat</span>
        <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--unc-color-text-secondary)' }}>
          {THEME_LABEL[theme]}
        </span>
      </div>
      <div
        style={{
          background: 'var(--unc-color-surface-canvas)',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ ...bubble, background: 'var(--unc-color-surface-bubble-in)', alignSelf: 'flex-start' }}>
          Chegou o resultado da enquete?
        </div>
        <div style={{ ...bubble, background: 'var(--unc-color-surface-bubble-out)', alignSelf: 'flex-end' }}>
          Chegou! Confira agora.
          <span
            style={{
              display: 'block',
              textAlign: 'right',
              fontSize: 12,
              color: 'var(--unc-color-text-bubble-meta)',
            }}
          >
            08:34
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'var(--unc-color-accent)',
              color: 'var(--unc-color-icon-on-accent)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="newChat" tone="inherit" size="lg" />
          </span>
          <span style={{ color: 'var(--unc-color-text-secondary)', fontSize: 14 }}>
            Acento, texto e balões acompanham o tema.
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Página de documentação rica dos tokens de cor do Unoochat.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Fundamentos • Cores"
      title="Cores"
      description={`Paleta do Unoochat em dois temas, claro e escuro. Os ${TOTAL_TOKENS} tokens vêm da escala roxa brandpurple da Plataforma Unooria, das neutras claras e escuras e dos degraus de severidade. Cada valor é um literal copiado do token de origem, e o par de temas está registrado token a token: superfícies, acento, severidades e chamada, texto, ícones, bordas e as ações da folha de anexos.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como a paleta se organiza e quando aplicar cada grupo."
    />
    <UncDocGrid>
      <UncDocCard icon="🌗" title="Dois temas medidos">
        Os tokens vivem em <code>:root</code> (tema claro) e são redeclarados sob{' '}
        <code>[data-unc-theme=&quot;dark&quot;]</code>. Escopar uma região com o atributo troca o
        tema só ali, sem depender de tema global.
      </UncDocCard>
      <UncDocCard icon="🧱" title="Escada de superfícies">
        <code>base</code>, <code>canvas</code>, <code>appbar</code>, <code>sheet</code>,{' '}
        <code>elevated</code> e <code>dialog</code> separam as camadas da interface por luminância,
        nos dois temas. Não há sombra para separar barras, cartões ou listas.
      </UncDocCard>
      <UncDocCard icon="🟣" title="Um único acento">
        <code>--unc-color-accent</code> serve à aba ativa, aos FABs, ao selo de não lidas, às ações
        de texto e aos controles selecionados. Só a seta de chamada efetuada tem acento próprio
        (<code>--unc-color-accent-call-out</code>).
      </UncDocCard>
      <UncDocCard icon="📞" title="Invariantes entre temas">
        A tela de chamada, as ações da folha de anexos, o botão de encerrar chamada e a bateria da
        barra de status mantêm o mesmo literal no claro e no escuro. São {INVARIANT_TOKENS.length}{' '}
        tokens, listados na seção 4.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura dos tokens, regra de paridade com a Unooria e decisões registradas."
    />
    <UncDocSpecs
      component="../tokens"
      layout="Tokens · 2 temas"
      specs={[
        { label: 'Arquivos', value: 'colors.css · colors.ts' },
        { label: 'Prefixo de tokens', value: '--unc-color-*' },
        { label: 'Atributo de tema', value: 'data-unc-theme="light | dark"' },
        { label: 'Total de tokens de cor', value: String(TOTAL_TOKENS) },
        { label: 'Invariantes entre temas', value: String(INVARIANT_TOKENS.length) },
        { label: 'Origem dos literais', value: '--unooria-color-*' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Literais copiados da Unooria, paridade verificada no build',
          detail:
            'o módulo não consome var(--unooria-*) em tempo de execução, porque um módulo de marca nunca lê tokens de outro. Cada cor é uma cópia do literal da Plataforma Unooria, com o token de origem anotado no comentário. scripts/verificar-paridade-unoochat.mjs compara cada cópia com a origem e reprova o build (build:package) se um literal divergir.',
        },
        {
          subject: 'Um acento no lugar de vários tons',
          detail:
            'abas, FABs, selos, controles e ações de texto usam --unc-color-accent (brandpurple-600 no claro, brandpurple-400 no escuro). Só a seta de chamada efetuada mantém um acento próprio, no degrau success da Unooria.',
        },
        {
          subject: 'Balão enviado e recebido por luminância',
          detail:
            'no tema claro o enviado é brandpurple-200 e o recebido é branco; no escuro o enviado é brandpurple-700 e o recebido brandpurple-800. O texto do balão passa de 4,5:1 nas quatro combinações (seção 5).',
        },
        {
          subject: 'Cor do texto sobre o acento acompanha o tema',
          detail:
            '--unc-color-text-on-accent e --unc-color-icon-on-accent são brancos no claro e brandpurple-950 no escuro, porque o acento escuro é um degrau claro. Branco sobre brandpurple-400 mediria abaixo de 3:1.',
        },
        {
          subject: 'Sombra só no que flutua',
          detail:
            'as superfícies são planas e se separam por luminância e por fios. A única elevação é --unc-elevation-overlay (menu, diálogo, folha, aviso e FAB), definida por tema.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Superfícies"
      description="Cada amostra mostra o tema claro à esquerda e o escuro à direita. Clique para copiar a variável."
    />
    <SwatchGroup tokens={uncSurfaceColors} />
    <SurfaceLadders />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Grupos de tokens"
      description="Acento, severidades e chamada, texto, ícones, bordas e anexos, com o token de origem da Unooria."
    />
    <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>Acento</h4>
    <SwatchGroup tokens={uncAccentColors} />
    <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>Severidades e chamada</h4>
    <SwatchGroup tokens={uncStatusColors} />
    <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>Texto</h4>
    <SwatchGroup tokens={uncTextColors} />
    <TokenSpecimens tokens={uncTextColors} kind="text" />
    <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>Ícones</h4>
    <SwatchGroup tokens={uncIconColors} />
    <TokenSpecimens tokens={uncIconColors} kind="icon" />
    <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>Bordas, divisores e anéis</h4>
    <SwatchGroup tokens={uncBorderColors} />
    <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>Ações da folha de anexos</h4>
    <SwatchGroup tokens={uncAttachmentColors} />
    <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>
      Tokens invariantes entre temas
    </h4>
    <UncDocGrid min={240}>
      {INVARIANT_TOKENS.map(({ groupKey, key, token }) => (
        <UncDocTokenSwatch
          key={`${groupKey}-${key}`}
          name={key}
          cssVar={token.cssVar}
          light={token.light.value}
          unooria={[token.light.unooria]}
        />
      ))}
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Contraste WCAG"
      description="Razões calculadas no próprio componente a partir dos hexadecimais de colors.ts. Texto exige 4,5:1; elementos gráficos, 3:1."
    />
    <ContrastTable />
    <ContrastLab />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: só o atributo data-unc-theme do contêiner muda."
    />
    <UncDocThemeSwitcher surface="base" padding={32}>
      {(theme) => <ThemeSample theme={theme} />}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <UncDocPractices
      dos={[
        'Consumir sempre var(--unc-color-*); nunca repetir o hexadecimal no componente.',
        'Empilhar superfícies em ordem crescente de luminância para comunicar profundidade.',
        'Usar --unc-color-accent para tudo que é selecionado, ativo ou acionável.',
        'Reservar --unc-color-danger-endcall exclusivamente para encerrar chamadas.',
        'Escopar regiões com data-unc-theme="light" ou "dark" quando o produto convive com outro tema.',
        'Ao mudar um literal, alterar primeiro o token de origem na Unooria e rodar node scripts/verificar-paridade-unoochat.mjs.',
      ]}
      donts={[
        'Usar var(--unooria-*) dentro do Unoochat: o módulo copia literais e a paridade é verificada no build.',
        'Editar um literal do Unoochat sem alterar a origem: o guarda de paridade reprova o build.',
        'Aplicar texto branco sobre o acento no tema escuro; use --unc-color-text-on-accent.',
        'Aplicar sombra para separar superfícies; a única elevação é a de elementos flutuantes.',
        'Reaproveitar as cores da folha de anexos em outros componentes.',
        'Derivar um terceiro tema por cálculo; existem exatamente o claro e o escuro.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Superfícies em conjunto"
      description="Pilha completa renderizada com os tokens reais, nos dois temas."
    />
    {THEMES.map((theme) => (
      <UncDocStage
        key={theme}
        label={THEME_LABEL[theme]}
        theme={theme}
        surface="base"
        direction="column"
        align="stretch"
        padding={0}
        gap={0}
      >
        {(
          [
            ['--unc-color-surface-base', 'base'],
            ['--unc-color-surface-canvas', 'canvas'],
            ['--unc-color-surface-appbar', 'appbar'],
            ['--unc-color-surface-sheet', 'sheet'],
            ['--unc-color-surface-elevated', 'elevated'],
            ['--unc-color-surface-dialog', 'dialog'],
            ['--unc-color-call-surface', 'chamada (invariante)'],
            ['--unc-color-surface-bubble-out', 'balão enviado'],
          ] as const
        ).map(([cssVar, label]) => (
          <div
            key={cssVar}
            style={{
              background: `var(${cssVar})`,
              color: cssVar === '--unc-color-call-surface' ? 'var(--unc-color-text-inverse)' : 'var(--unc-color-text-primary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 13,
              padding: '16px 20px',
            }}
          >
            {label}
          </div>
        ))}
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="9. Referência completa dos tokens"
      description={`Os ${TOTAL_TOKENS} tokens de cor, com o valor em cada tema e o token de origem na Unooria.`}
    />
    {(
      [
        ['Superfícies', uncSurfaceColors],
        ['Acento', uncAccentColors],
        ['Severidades e chamada', uncStatusColors],
        ['Texto', uncTextColors],
        ['Ícones', uncIconColors],
        ['Bordas e anéis', uncBorderColors],
        ['Ações da folha de anexos', uncAttachmentColors],
      ] as const
    ).map(([groupTitle, group]) => (
      <UncDocPropsTable
        key={groupTitle}
        title={groupTitle}
        rows={Object.entries(group).map(([key, token]) => ({
          name: key,
          type: token.cssVar,
          default: `${token.light.value} · ${token.dark.value}`,
          description: `${token.usage}. Origem: ${token.light.unooria}${
            token.dark.unooria !== token.light.unooria ? ` (claro) e ${token.dark.unooria} (escuro)` : ''
          }.`,
        }))}
      />
    ))}
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoochat/Fundamentos/Cores',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos tokens de cor, nos dois temas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CoresDocumentationPage />,
};

/**
 * Escada de superfícies do tema claro e do tema escuro.
 */
export const Superficies: Story = {
  name: '🎨 Superfícies',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Superfícies" />
      <SwatchGroup tokens={uncSurfaceColors} />
      <SurfaceLadders />
    </UnooriaDocShell>
  ),
};

/**
 * Acento, severidades e chamada nos dois temas.
 */
export const AcentoESeveridades: Story = {
  name: '🟣 Acento e severidades',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Acento" />
      <SwatchGroup tokens={uncAccentColors} />
      <UnooriaDocSectionHeader barColor={BAR} title="Severidades e chamada" />
      <SwatchGroup tokens={uncStatusColors} />
    </UnooriaDocShell>
  ),
};

/**
 * Tabela de contraste WCAG e laboratório interativo.
 */
export const Contraste: Story = {
  name: '🕹️ Laboratório de contraste',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader
        barColor={BAR}
        title="Contraste WCAG"
        description="Tabela fixa de pares do produto e comparador interativo, nos dois temas."
      />
      <ContrastTable />
      <ContrastLab />
    </UnooriaDocShell>
  ),
};
