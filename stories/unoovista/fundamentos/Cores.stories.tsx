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
  UnvDocStage,
  UnvDocThemeSwitcher,
  UnvDocTokenSwatch,
  UnvDocPropsTable,
} from '../../../.storybook/components';
import type { UnvDocTheme } from '../../../.storybook/components';
import { Avatar, Badge, Button, Icon } from '../../../src/unoovista';
import {
  unvColorTokens,
  unvInvariantColors,
  unvColorGroups,
  unvGradients,
} from '../../../src/unoovista/tokens';
import type { UnvColorKey } from '../../../src/unoovista/tokens';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DOC_BORDER = '#E4E8E9';
const DOC_TEXT = '#22272A';
const DOC_MUTED = '#475157';
const DOC_SUCCESS = '#01B574';
const DOC_DANGER = '#E31A1A';
const DOC_SUBTLE = '#F5F5F5';

const THEMES: UnvDocTheme[] = ['light', 'dark'];
const THEME_LABEL: Record<UnvDocTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

type InvariantKey = keyof typeof unvInvariantColors;
type ColorRef = UnvColorKey | InvariantKey;

/**
 * Entrada normalizada de um token, variando com o tema ou invariante.
 */
interface ColorEntry {
  key: string;
  cssVar: string;
  group: string;
  usage: string;
  light: string;
  dark: string;
  lightOrigin: string;
  darkOrigin: string;
  invariant: boolean;
}

const VARIABLE_ENTRIES: ColorEntry[] = Object.entries(unvColorTokens).map(([key, token]) => ({
  key,
  cssVar: token.cssVar,
  group: token.group,
  usage: token.usage,
  light: token.light.value,
  dark: token.dark.value,
  lightOrigin: token.light.unooria,
  darkOrigin: token.dark.unooria,
  invariant: token.light.value === token.dark.value,
}));

const INVARIANT_ENTRIES: ColorEntry[] = Object.entries(unvInvariantColors).map(([key, token]) => ({
  key,
  cssVar: token.cssVar,
  group: token.group,
  usage: token.usage,
  light: token.value,
  dark: token.value,
  lightOrigin: token.unooria,
  darkOrigin: token.unooria,
  invariant: true,
}));

const ALL_ENTRIES: ColorEntry[] = [...VARIABLE_ENTRIES, ...INVARIANT_ENTRIES];
const TOTAL_TOKENS = ALL_ENTRIES.length;
const INVARIANT_COUNT = ALL_ENTRIES.filter((entry) => entry.invariant).length;

const entriesOf = (group: string): ColorEntry[] =>
  ALL_ENTRIES.filter((entry) => entry.group === group);

/**
 * Valor literal de uma cor em um tema, lido de `colors.ts`.
 */
const hexOf = (ref: ColorRef, theme: UnvDocTheme): string => {
  if (ref in unvColorTokens) {
    return unvColorTokens[ref as UnvColorKey][theme].value;
  }
  return unvInvariantColors[ref as InvariantKey].value;
};

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
 * Par de contraste avaliado, com o mínimo exigido pela WCAG.
 */
interface ContrastPair {
  label: string;
  fg: ColorRef;
  bg: ColorRef;
  /** 4,5 para texto normal; 3 para elementos gráficos (WCAG 1.4.11) */
  minimum: 4.5 | 3;
}

const CONTRAST_PAIRS: ContrastPair[] = [
  { label: 'Texto primário sobre a tela', fg: 'textPrimary', bg: 'backgroundPrimary', minimum: 4.5 },
  { label: 'Texto primário sobre o fundo secundário', fg: 'textPrimary', bg: 'backgroundSecondary', minimum: 4.5 },
  { label: 'Texto primário sobre o terciário', fg: 'textPrimary', bg: 'backgroundTertiary', minimum: 4.5 },
  { label: 'Texto primário sobre a superfície elevada', fg: 'textPrimary', bg: 'backgroundElevated', minimum: 4.5 },
  { label: 'Texto secundário sobre a tela', fg: 'textSecondary', bg: 'backgroundPrimary', minimum: 4.5 },
  { label: 'Texto secundário sobre o fundo secundário', fg: 'textSecondary', bg: 'backgroundSecondary', minimum: 4.5 },
  { label: 'Texto secundário sobre o terciário', fg: 'textSecondary', bg: 'backgroundTertiary', minimum: 4.5 },
  { label: 'Texto secundário sobre a superfície elevada', fg: 'textSecondary', bg: 'backgroundElevated', minimum: 4.5 },
  { label: 'Link sobre a tela', fg: 'textLink', bg: 'backgroundPrimary', minimum: 4.5 },
  { label: 'Link sobre o fundo secundário', fg: 'textLink', bg: 'backgroundSecondary', minimum: 4.5 },
  { label: 'Link sobre a superfície elevada', fg: 'textLink', bg: 'backgroundElevated', minimum: 4.5 },
  { label: 'Placeholder sobre o campo', fg: 'textPlaceholder', bg: 'fillField', minimum: 4.5 },
  { label: 'Placeholder sobre a tela', fg: 'textPlaceholder', bg: 'backgroundPrimary', minimum: 4.5 },
  { label: 'Texto sobre a ação (botão primário)', fg: 'textOnAction', bg: 'actionPrimary', minimum: 4.5 },
  { label: 'Texto sobre a ação pressionada', fg: 'textOnAction', bg: 'actionPressed', minimum: 4.5 },
  { label: 'Numeral sobre o selo de notificação', fg: 'textOnNotification', bg: 'brandNotification', minimum: 4.5 },
  { label: 'Ação (texto e glifo) sobre a tela', fg: 'actionPrimary', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Ação sobre a superfície elevada (doca)', fg: 'actionPrimary', bg: 'backgroundElevated', minimum: 3 },
  { label: 'Ícone primário sobre a tela', fg: 'iconPrimary', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Ícone secundário sobre a tela', fg: 'iconSecondary', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Ícone secundário sobre a superfície elevada', fg: 'iconSecondary', bg: 'backgroundElevated', minimum: 3 },
  { label: 'Ícone secundário sobre o fundo secundário', fg: 'iconSecondary', bg: 'backgroundSecondary', minimum: 3 },
  { label: 'Contorno de controle sobre a tela', fg: 'borderControl', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Contorno de controle sobre o campo', fg: 'borderControl', bg: 'fillField', minimum: 3 },
  { label: 'Curtido sobre a tela', fg: 'brandLike', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Curtido sobre a superfície elevada', fg: 'brandLike', bg: 'backgroundElevated', minimum: 3 },
  { label: 'Selo de verificação sobre a tela', fg: 'brandVerified', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Anel de story (início) sobre a tela', fg: 'storyStart', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Anel de story (meio) sobre a tela', fg: 'storyMid', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Anel de story (fim) sobre a tela', fg: 'storyEnd', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Anel ao vivo (início) sobre a tela', fg: 'liveStart', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Anel ao vivo (meio) sobre a tela', fg: 'liveMid', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Anel ao vivo (fim) sobre a tela', fg: 'liveEnd', bg: 'backgroundPrimary', minimum: 3 },
  { label: 'Texto sobre mídia, início da etiqueta LIVE', fg: 'onMedia', bg: 'liveBadgeStart', minimum: 4.5 },
  { label: 'Texto sobre mídia, fim da etiqueta LIVE', fg: 'onMedia', bg: 'liveBadgeEnd', minimum: 4.5 },
];

const measureAll = (): { failures: number; lowest: number } => {
  let failures = 0;
  let lowest = Infinity;
  CONTRAST_PAIRS.forEach((pair) => {
    THEMES.forEach((theme) => {
      const ratio = contrastRatio(hexOf(pair.fg, theme), hexOf(pair.bg, theme));
      if (ratio < pair.minimum) failures += 1;
      lowest = Math.min(lowest, ratio / pair.minimum);
    });
  });
  return { failures, lowest };
};

const MEASURED = measureAll();

/**
 * Grade de amostras de cor (metade clara, metade escura) para uma lista de tokens.
 */
const SwatchGrid: React.FC<{ entries: ColorEntry[] }> = ({ entries }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
      gap: 14,
      marginBottom: 32,
    }}
  >
    {entries.map((entry) => (
      <UnvDocTokenSwatch
        key={entry.key}
        name={entry.key}
        cssVar={entry.cssVar}
        light={entry.light}
        dark={entry.dark}
        unooria={[entry.lightOrigin, entry.darkOrigin]}
      />
    ))}
  </div>
);

const GroupTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 style={{ margin: '0 0 12px', fontSize: 15, color: DOC_TEXT }}>{children}</h4>
);

/**
 * Superfície sobre a qual um token de primeiro plano é exibido: a de uso real.
 */
const SPECIMEN_BACKGROUND: Partial<Record<string, string>> = {
  textOnAction: 'var(--unv-color-action-primary)',
  textOnNotification: 'var(--unv-color-brand-notification)',
  onMedia: 'var(--unv-gradient-livebadge)',
  textPlaceholder: 'var(--unv-color-fill-field)',
};

/**
 * Amostras de texto ou de ícone de um grupo, nos dois temas, sobre a superfície de uso.
 */
const TokenSpecimens: React.FC<{ entries: ColorEntry[]; kind: 'text' | 'icon' }> = ({
  entries,
  kind,
}) => (
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
        gridTemplateColumns: 'minmax(130px, 1fr) 1fr 1fr',
        fontSize: 12,
        fontWeight: 700,
        color: DOC_TEXT,
        background: DOC_SUBTLE,
      }}
    >
      <span style={{ padding: '8px 14px' }}>Token</span>
      {THEMES.map((theme) => (
        <span key={theme} style={{ padding: '8px 14px' }}>
          {THEME_LABEL[theme]}
        </span>
      ))}
    </div>
    {entries.map((entry) => (
      <div
        key={entry.key}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(130px, 1fr) 1fr 1fr',
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
          {entry.key}
        </span>
        {THEMES.map((theme) => (
          <div
            key={theme}
            data-unv-theme={theme}
            style={{
              background: SPECIMEN_BACKGROUND[entry.key] ?? 'var(--unv-color-background-primary)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: `var(${entry.cssVar})`,
              fontFamily: 'var(--unv-font-sans)',
              fontSize: 'var(--unv-font-title-sm-size)',
              fontWeight: 'var(--unv-font-title-sm-weight)' as React.CSSProperties['fontWeight'],
            }}
          >
            {kind === 'icon' ? (
              <>
                <Icon name="search" tone="inherit" size="md" />
                <Icon name="heart" tone="inherit" size="md" />
              </>
            ) : (
              <span>Aa · 08:34</span>
            )}
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 400 }}>
              {entry[theme]}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

/**
 * Anel de story, ao vivo e visto, com o `Avatar` real, sobre a tela de um tema.
 */
const RingStage: React.FC<{ theme: UnvDocTheme }> = ({ theme }) => (
  <UnvDocStage label={THEME_LABEL[theme]} theme={theme} surface="primary" gap={28} padding={24}>
    <div style={{ textAlign: 'center' }}>
      <Avatar initials="AL" size="xl" ring="story" />
      <RingCaption>story · não visto</RingCaption>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar initials="MC" size="xl" ring="live" />
      <RingCaption>ao vivo</RingCaption>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar initials="JP" size="xl" ring="seen" />
      <RingCaption>visto</RingCaption>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar initials="RS" size="xl" />
      <RingCaption>sem anel (círculo)</RingCaption>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Badge variant="live">LIVE</Badge>
      <RingCaption>etiqueta LIVE (invariante)</RingCaption>
    </div>
  </UnvDocStage>
);

const RingCaption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 8,
      color: 'var(--unv-color-text-secondary)',
      fontFamily: 'var(--unv-font-sans)',
      fontSize: 'var(--unv-font-caption-md-size)',
    }}
  >
    {children}
  </div>
);

/**
 * Faixas dos três gradientes, com as paradas literais de cada tema.
 */
const GradientBands: React.FC = () => (
  <UnvDocGrid min={340} marginBottom={16}>
    {THEMES.map((theme) => (
      <div key={theme} data-unv-theme={theme} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: DOC_MUTED, marginBottom: 8 }}>
          {THEME_LABEL[theme]}
        </div>
        {(
          [
            ['--unv-gradient-story', 'story', unvGradients.story[theme]],
            ['--unv-gradient-live', 'ao vivo', unvGradients.live[theme]],
            ['--unv-gradient-livebadge', 'etiqueta LIVE', unvGradients.liveBadge],
          ] as const
        ).map(([cssVar, label, stops]) => (
          <div key={cssVar} style={{ marginBottom: 10 }}>
            <div
              style={{
                height: 40,
                borderRadius: 'var(--unv-radius-m)',
                background: `var(${cssVar})`,
              }}
            />
            <div style={{ fontSize: 11.5, color: DOC_MUTED, fontFamily: MONO, marginTop: 4 }}>
              {label} · {cssVar} · {stops.join(' → ')}
            </div>
          </div>
        ))}
      </div>
    ))}
  </UnvDocGrid>
);

const ratioCell = (ratio: number, minimum: number): React.ReactNode => {
  const passes = ratio >= minimum;
  return (
    <span style={{ color: passes ? DOC_SUCCESS : DOC_DANGER, fontWeight: 700, fontFamily: MONO }}>
      {ratio.toFixed(2)}:1 {passes ? '✓' : '✗'}
    </span>
  );
};

/**
 * Tabela de contraste WCAG calculada a partir dos literais de `colors.ts`, que
 * espelham `colors.css`.
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
        <tr style={{ background: DOC_SUBTLE, color: DOC_TEXT }}>
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
                {ratioCell(
                  contrastRatio(hexOf(pair.fg, theme), hexOf(pair.bg, theme)),
                  pair.minimum
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FOREGROUND_REFS: [string, ColorRef][] = [
  ['texto · primário', 'textPrimary'],
  ['texto · secundário', 'textSecondary'],
  ['texto · link', 'textLink'],
  ['texto · placeholder', 'textPlaceholder'],
  ['texto · sobre ação', 'textOnAction'],
  ['ícone · primário', 'iconPrimary'],
  ['ícone · secundário', 'iconSecondary'],
  ['borda · controle', 'borderControl'],
  ['borda · padrão', 'borderDefault'],
  ['ação · primária', 'actionPrimary'],
  ['marca · curtido', 'brandLike'],
  ['marca · verificado', 'brandVerified'],
];

const SURFACE_REFS: [string, ColorRef][] = [
  ['fundo primário', 'backgroundPrimary'],
  ['fundo secundário', 'backgroundSecondary'],
  ['fundo terciário', 'backgroundTertiary'],
  ['superfície elevada', 'backgroundElevated'],
  ['campo', 'fillField'],
  ['ação primária', 'actionPrimary'],
];

/**
 * Comparador interativo de contraste entre um primeiro plano e uma superfície, em um tema.
 */
const ContrastLab: React.FC = () => {
  const [theme, setTheme] = useState<UnvDocTheme>('light');
  const [surfaceIndex, setSurfaceIndex] = useState(0);
  const [fgIndex, setFgIndex] = useState(0);

  const [surfaceLabel, surfaceRef] = SURFACE_REFS[surfaceIndex];
  const [fgLabel, fgRef] = FOREGROUND_REFS[fgIndex];
  const bgValue = hexOf(surfaceRef, theme);
  const fgValue = hexOf(fgRef, theme);
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
            onChange={(event) => setTheme(event.target.value as UnvDocTheme)}
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
            value={surfaceIndex}
            onChange={(event) => setSurfaceIndex(Number(event.target.value))}
          >
            {SURFACE_REFS.map(([label, ref], index) => (
              <option key={label} value={index}>
                {label} · {hexOf(ref, theme)}
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
            {FOREGROUND_REFS.map(([label, ref], index) => (
              <option key={label} value={index}>
                {label} · {hexOf(ref, theme)}
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
            fontFamily: 'var(--unv-font-sans)',
            fontSize: 20,
          }}
        >
          Marina Costa — a turma publicou o mural da semana.
        </p>
        <p
          style={{
            margin: '10px 0 0',
            color: fgValue,
            fontFamily: 'var(--unv-font-sans)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {fgLabel} sobre {surfaceLabel} · contraste {ratio.toFixed(2)}:1{' '}
          {ratio >= 4.5
            ? '✓ AA para texto'
            : ratio >= 3
              ? '⚠ só para elementos gráficos (3:1)'
              : '✗ abaixo de 3:1'}
        </p>
      </div>
    </div>
  );
};

/**
 * Empilhamento de camadas em um tema: tela, cartão, superfície elevada e cápsula.
 */
const LayerDemo: React.FC<{ theme: UnvDocTheme }> = ({ theme }) => {
  const label: React.CSSProperties = {
    fontFamily: 'var(--unv-font-sans)',
    fontSize: 'var(--unv-font-caption-md-size)',
    lineHeight: 'var(--unv-font-caption-md-line)',
    color: 'var(--unv-color-text-secondary)',
  };
  return (
    <UnvDocStage
      label={THEME_LABEL[theme]}
      theme={theme}
      surface="secondary"
      align="stretch"
      direction="column"
      padding={20}
    >
      <div style={label}>tela · background-secondary</div>
      <div
        style={{
          background: 'var(--unv-color-background-primary)',
          borderRadius: 'var(--unv-radius-l)',
          padding: 'var(--unv-spacing-l)',
          display: 'grid',
          gap: 'var(--unv-spacing-m)',
        }}
      >
        <div style={label}>cartão · background-primary</div>
        <div
          style={{
            background: 'var(--unv-color-background-tertiary)',
            borderRadius: 'var(--unv-radius-m)',
            padding: 'var(--unv-spacing-m)',
            ...label,
          }}
        >
          bloco sutil · background-tertiary
        </div>
        <div
          style={{
            background: 'var(--unv-color-background-elevated)',
            borderRadius: 'var(--unv-radius-m)',
            boxShadow: 'var(--unv-elevation-overlay)',
            padding: 'var(--unv-spacing-m)',
            ...label,
          }}
        >
          menu, folha, diálogo, doca · background-elevated + sombra de sobreposição
        </div>
      </div>
    </UnvDocStage>
  );
};

/**
 * Composição mínima de uma publicação, com os componentes reais e só variáveis `--unv-*`.
 */
const ThemeSample: React.FC = () => (
  <div
    style={{
      width: 320,
      maxWidth: '100%',
      boxSizing: 'border-box',
      background: 'var(--unv-color-background-primary)',
      borderRadius: 'var(--unv-radius-l)',
      padding: 'var(--unv-spacing-l)',
      fontFamily: 'var(--unv-font-sans)',
      display: 'grid',
      gap: 'var(--unv-spacing-m)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--unv-spacing-m)' }}>
      <Avatar initials="MC" size="md" ring="story" />
      <div>
        <div
          style={{
            color: 'var(--unv-color-text-primary)',
            fontSize: 'var(--unv-font-label-lg-size)',
            fontWeight: 'var(--unv-font-label-lg-weight)' as React.CSSProperties['fontWeight'],
            lineHeight: 'var(--unv-font-label-lg-line)',
          }}
        >
          marina.costa
        </div>
        <div
          style={{
            color: 'var(--unv-color-text-secondary)',
            fontSize: 'var(--unv-font-overline-sm-size)',
            lineHeight: 'var(--unv-font-overline-sm-line)',
          }}
        >
          Feira de ciências · Recife
        </div>
      </div>
    </div>
    <div
      style={{
        height: 110,
        borderRadius: 'var(--unv-radius-m)',
        background: 'var(--unv-color-background-tertiary)',
      }}
    />
    <div
      style={{
        color: 'var(--unv-color-text-primary)',
        fontSize: 'var(--unv-font-body-md-size)',
        lineHeight: 'var(--unv-font-body-md-line)',
      }}
    >
      Nosso experimento ficou pronto.{' '}
      <span style={{ color: 'var(--unv-color-text-link)' }}>#ciencias</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--unv-spacing-xs)' }}>
      <Icon name="heartFilled" tone="like" />
      <Icon name="comment" />
      <Icon name="verified" tone="link" />
      <span style={{ flex: 1 }} />
      <Button size="sm" variant="secondary">
        Salvar
      </Button>
      <Button size="sm">Seguir</Button>
    </div>
  </div>
);

const GROUP_NOTES: Record<string, string> = {
  Superfícies: 'Escada de camadas: tela, cartão, superfície sutil e superfície elevada.',
  Texto: 'Cada par texto/superfície de uso real passa de 4,5:1 nos dois temas (seção 5).',
  Ícones: 'Glifos ativos e de apoio; devem manter 3:1 contra a superfície.',
  Bordas: 'Contorno de controle (3:1) separado do fio decorativo de divisor.',
  Ações: 'Roxo de ação do tema, com estados pressionado e desabilitado nomeados.',
  Overlays: 'Véu de modal e traço translúcido sobre mídia; iguais nos dois temas.',
  Marca: 'Curtido, verificado, notificação e recorte interno dos anéis.',
  Gradientes: 'Paradas dos anéis de story e ao vivo, e da etiqueta LIVE.',
};

const NUMBERED_GROUPS = unvColorGroups.filter(
  (group) => group !== 'Superfícies' && group !== 'Elevação'
);

/**
 * Página de documentação rica dos tokens de cor do Unoovista.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Fundamentos • Cores"
      title="Cores"
      description={`Paleta do Unoovista em dois temas, claro e escuro. Os ${TOTAL_TOKENS} tokens vêm da escala roxa brandpurple da Plataforma Unooria, das neutras claras e escuras e dos degraus de severidade e de azul. O par de temas está registrado token a token: superfícies em camadas, texto, ícones, bordas, ações, overlays, marca e os gradientes dos anéis. Nenhum valor é derivado por cálculo: cada um é um degrau nomeado da Unooria.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como a paleta se organiza e quando aplicar cada grupo."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🌗" title="Dois temas nomeados">
        Os tokens vivem em <code>:root</code> (tema claro) e são redeclarados sob{' '}
        <code>[data-unv-theme=&quot;dark&quot;]</code>. Escopar uma região com o atributo troca o
        tema só ali. O escuro <strong>nunca</strong> é derivado do claro por inversão, clareamento ou
        opacidade: cada valor é um degrau nomeado da Unooria, com o token de origem anotado.
      </UnvDocCard>
      <UnvDocCard icon="🧱" title="Camadas suaves">
        A tela usa <code>background-secondary</code> (lavanda no claro, roxo profundo no escuro), os
        cartões usam <code>background-primary</code> e menus, folhas, diálogos e a doca usam{' '}
        <code>background-elevated</code>. A separação vem da mudança de superfície e do espaço; fio,
        quando existe, é de 1px em <code>border-subtle</code>.
      </UnvDocCard>
      <UnvDocCard icon="🟣" title="Roxo de ação">
        <code>--unv-color-action-primary</code> serve ao botão primário, à aba ativa da doca, ao foco
        e ao controle selecionado. O rótulo sobre ele é <code>text-on-action</code>: branco no claro
        e roxo profundo no escuro, porque o acento escuro é um degrau claro.
      </UnvDocCard>
      <UnvDocCard icon="🔴" title="Estados de marca">
        Curtido, selo de notificação e o fim do anel ao vivo usam o vermelho de severidade da
        Unooria; o selo de verificação usa o azul <code>brandnavy</code>. Os três clareiam no tema
        escuro para manter 3:1 sobre a tela.
      </UnvDocCard>
      <UnvDocCard icon="🎞️" title="Invariantes entre temas">
        Mantêm o mesmo literal nos dois temas o texto sobre mídia (sempre branco), as duas pontas da
        etiqueta LIVE e os dois véus translúcidos: o fundo deles é fotografia, vídeo ou a própria
        etiqueta, e não a superfície da tela. São {INVARIANT_COUNT} tokens.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura dos tokens, regra de paridade com a Unooria e decisões registradas."
    />
    <UnvDocSpecs
      component="../tokens"
      layout="Tokens · 2 temas"
      specs={[
        { label: 'Arquivos', value: 'colors.css · colors.ts' },
        { label: 'Prefixo de tokens', value: '--unv-color-*' },
        { label: 'Atributo de tema', value: 'data-unv-theme="light | dark"' },
        { label: 'Total de tokens de cor', value: String(TOTAL_TOKENS) },
        { label: 'Pares de contraste medidos', value: `${CONTRAST_PAIRS.length} × 2 temas` },
        { label: 'Origem dos literais', value: '--unooria-color-*' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Literais copiados da Unooria, paridade verificada no build',
          detail:
            'o módulo não consome var(--unooria-*) em tempo de execução, porque um módulo de marca nunca lê tokens de outro. Cada cor é uma cópia do literal da Plataforma Unooria, com o token de origem anotado no comentário. scripts/verificar-paridade-unoovista.mjs compara cada cópia com a origem e reprova o build se um literal divergir.',
        },
        {
          subject: 'Camadas em vez de fios',
          detail:
            'a tela (background-secondary) e o cartão (background-primary) se distinguem pela luminância; barras e cartões não usam fio de largura total. O fio que sobra é de 1px em border-subtle ou border-bar.',
        },
        {
          subject: 'Contorno de controle separado do contorno decorativo',
          detail:
            'campos, caixas de seleção e controles usam border-control (neutro 500 no claro, neutro escuro 800 no escuro), que passa de 3:1 contra tela e campo. border-default e border-subtle são lavanda e servem só a cartões e divisores, que não carregam informação sozinhos.',
        },
        {
          subject: 'Cor do texto sobre o acento acompanha o tema',
          detail:
            'text-on-action e text-on-notification são brancos no claro e brandpurple-950 no escuro. Branco sobre brandpurple-400 mediria abaixo de 3:1.',
        },
        {
          subject: 'Anéis em três paradas, uma pista cromática e outra de forma',
          detail:
            'os gradientes de story e ao vivo têm três paradas nomeadas por tema. Quem tem story ou transmissão também muda de forma (recorte arredondado de 32% em vez de círculo), de modo que a distinção não dependa só da cor.',
        },
        {
          subject: 'Sombra só no que flutua',
          detail:
            'a única sombra é --unv-elevation-overlay (doca, menus, diálogos, folhas, avisos, botão flutuante e pílula de ações do post). Ver Elevação & Gradientes.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Superfícies e camadas"
      description="Cada amostra mostra o tema claro à esquerda e o escuro à direita. Clique para copiar a variável."
    />
    <SwatchGrid entries={entriesOf('Superfícies')} />
    <UnvDocGrid min={360}>
      <LayerDemo theme="light" />
      <LayerDemo theme="dark" />
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Grupos de tokens"
      description="Texto, ícones, bordas, ações, overlays, marca e gradientes, com o token de origem da Unooria."
    />
    {NUMBERED_GROUPS.map((group) => (
      <React.Fragment key={group}>
        <GroupTitle>{group}</GroupTitle>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: DOC_MUTED }}>{GROUP_NOTES[group]}</p>
        <SwatchGrid entries={entriesOf(group)} />
        {group === 'Texto' && (
          <TokenSpecimens entries={entriesOf('Texto')} kind="text" />
        )}
        {group === 'Ícones' && (
          <TokenSpecimens entries={entriesOf('Ícones')} kind="icon" />
        )}
        {group === 'Gradientes' && (
          <>
            <GradientBands />
            <RingStage theme="light" />
            <RingStage theme="dark" />
          </>
        )}
      </React.Fragment>
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Contraste WCAG"
      description={`Razões calculadas a partir dos hexadecimais de colors.ts, que espelham colors.css. Texto exige 4,5:1; elementos gráficos, 3:1. Resultado medido: ${MEASURED.failures === 0 ? 'todos os pares passam' : `${MEASURED.failures} par(es) abaixo do mínimo`} nos dois temas.`}
    />
    <ContrastTable />
    <ContrastLab />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: só o atributo data-unv-theme do contêiner muda."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={32}>
      {() => <ThemeSample />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Consumir sempre var(--unv-color-*); nunca repetir o hexadecimal no componente.',
        'Empilhar camadas na ordem tela (secondary), cartão (primary) e superfície elevada.',
        'Usar --unv-color-action-primary para tudo que é selecionado, ativo ou acionável, com --unv-color-text-on-action por cima.',
        'Usar --unv-color-border-control no contorno de campos e seleção, para manter 3:1.',
        'Escopar regiões com data-unv-theme="light" ou "dark" quando o produto convive com os dois temas.',
        'Ao mudar um literal, alterar primeiro o token de origem na Unooria e rodar node scripts/verificar-paridade-unoovista.mjs.',
      ]}
      donts={[
        'Usar var(--unooria-*) dentro do Unoovista: o módulo copia literais e a paridade é verificada no build.',
        'Derivar o tema escuro por cálculo (inverter, clarear, aplicar opacidade ou color-mix).',
        'Aplicar texto branco sobre o acento no tema escuro; use --unv-color-text-on-action.',
        'Usar border-default ou border-subtle como contorno de campo: eles medem abaixo de 3:1.',
        'Aplicar sombra para separar cartões: a separação é por camada, e a única sombra é a de sobreposição.',
        'Depender só da cor para distinguir quem tem story ou está ao vivo: o recorte arredondado é a pista de forma.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Camadas em conjunto"
      description="Pilha completa de superfícies renderizada com os tokens reais, nos dois temas."
    />
    {THEMES.map((theme) => (
      <UnvDocStage
        key={theme}
        label={THEME_LABEL[theme]}
        theme={theme}
        surface="secondary"
        direction="column"
        align="stretch"
        padding={0}
        gap={0}
      >
        {(
          [
            ['--unv-color-background-secondary', 'background-secondary · tela'],
            ['--unv-color-background-primary', 'background-primary · cartão'],
            ['--unv-color-background-tertiary', 'background-tertiary · bloco sutil'],
            ['--unv-color-background-elevated', 'background-elevated · menu, folha e doca'],
            ['--unv-color-fill-field', 'fill-field · campo de busca e de mensagem'],
            ['--unv-color-action-primary', 'action-primary · ação e aba ativa'],
          ] as const
        ).map(([cssVar, label]) => (
          <div
            key={cssVar}
            style={{
              background: `var(${cssVar})`,
              color:
                cssVar === '--unv-color-action-primary'
                  ? 'var(--unv-color-text-on-action)'
                  : 'var(--unv-color-text-primary)',
              fontFamily: 'var(--unv-font-sans)',
              fontSize: 'var(--unv-font-body-md-size)',
              padding: '16px 20px',
            }}
          >
            {label}
          </div>
        ))}
      </UnvDocStage>
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="9. Referência completa dos tokens"
      description={`Os ${TOTAL_TOKENS} tokens de cor, com o valor em cada tema e o token de origem na Unooria. A sombra de sobreposição está em Elevação & Gradientes.`}
    />
    {unvColorGroups
      .filter((group) => group !== 'Elevação')
      .map((group) => (
        <UnvDocPropsTable
          key={group}
          title={group}
          rows={entriesOf(group).map((entry) => ({
            name: entry.key,
            type: entry.cssVar,
            default: entry.invariant ? entry.light : `${entry.light} · ${entry.dark}`,
            description: `${entry.usage}. Origem: ${entry.lightOrigin}${
              entry.darkOrigin !== entry.lightOrigin
                ? ` (claro) e ${entry.darkOrigin} (escuro)`
                : ''
            }.`,
          }))}
        />
      ))}
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoovista/Fundamentos/Cores',
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
 * Superfícies em camadas, nos dois temas.
 */
export const Superficies: Story = {
  name: '🎨 Superfícies e camadas',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Superfícies e camadas" />
      <SwatchGrid entries={entriesOf('Superfícies')} />
      <UnvDocGrid min={360}>
        <LayerDemo theme="light" />
        <LayerDemo theme="dark" />
      </UnvDocGrid>
    </UnooriaDocShell>
  ),
};

/**
 * Gradientes e anéis de story, ao vivo e visto, nos dois temas.
 */
export const Aneis: Story = {
  name: '🎨 Gradientes e anéis',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Gradientes e anéis" />
      <SwatchGrid entries={entriesOf('Gradientes')} />
      <GradientBands />
      <RingStage theme="light" />
      <RingStage theme="dark" />
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
