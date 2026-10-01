import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import {
  ublColorGroups,
  ublColorTokens,
  ublContrastPairs,
  ublGradients,
  ublInvariantColors,
  type UblColorKey,
  type UblContrastPair,
  type UblInvariantColorKey,
  type UblTheme,
} from '../../../src/unooblog/tokens';
import { Icon } from '../../../src/unooblog/components/Icon';
import type { UblIconName } from '../../../src/unooblog/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocAnatomy,
  UblDocCard,
  UblDocDecisions,
  UblDocGrid,
  UblDocPractices,
  UblDocPropsTable,
  UblDocSpecs,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocTokenSwatch,
} from '../../../.storybook/components';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const COVER = '/unooblog/capa-01.svg';

/**
 * Cores da própria moldura da documentação, resolvidas no tema claro (a página
 * de documentação é sempre clara; os palcos escolhem o tema).
 */
const DOC = {
  text: 'var(--ubl-color-text-primary)',
  muted: 'var(--ubl-color-text-secondary)',
  border: 'var(--ubl-color-border-subtle)',
  subtle: 'var(--ubl-color-background-subtle)',
  pass: 'var(--ubl-color-status-success)',
  fail: 'var(--ubl-color-text-danger)',
} as const;

type TokenEntry = [UblColorKey, (typeof ublColorTokens)[UblColorKey]];
type InvariantEntry = [UblInvariantColorKey, (typeof ublInvariantColors)[UblInvariantColorKey]];

const tokenEntries = Object.entries(ublColorTokens) as TokenEntry[];
const invariantEntries = Object.entries(ublInvariantColors) as InvariantEntry[];

/** Descrição de cada grupo de tokens, na ordem de `ublColorGroups`. */
const GROUP_NOTES: Record<(typeof ublColorGroups)[number], string> = {
  Superfícies:
    'A escada "página → cartão → sutil": a página (branca no claro), o cartão lavanda do post, do autor e da série, o bloco sutil (capa ainda não carregada, comentário respondido) e a camada elevada de menus, folhas e diálogos — mais a barra translúcida do cabeçalho do site.',
  Texto:
    'Principal, subtítulo, metadado, acento (links e tópicos) e destrutivo, mais os dois rótulos que ficam sobre preenchimento (ação e perigo).',
  Ícones: 'Glifo ativo, glifo de apoio e o glifo de destaque do post salvo e do autor seguido.',
  Bordas:
    'Divisor sutil e contorno de superfície — decorativos — e o contorno de campo e de controle, o único que passa de 3:1.',
  Ações:
    'Preenchimento de ação nos três estados, destrutivo, preenchimento de campo e de chip, realces de hover e de pressionado e o anel de foco.',
  Marca:
    'A curtida e os tons dos avisos do post (informação, dica e atenção), cada um com o fundo translúcido nomeado que o acompanha. Nunca comunicam sozinhos: sempre vêm com título, glifo e texto.',
  Overlays: 'Véu atrás de folhas e diálogos e o aviso passageiro em cores invertidas.',
  Elevação: 'A única sombra do módulo: definida por tema, aplicada só a camadas flutuantes.',
  Código:
    'O bloco de código vive em superfície escura nos dois temas: fundo, texto, apoio, acento, fio e controle. Invariantes.',
  Mídia: 'Véu da base da capa e texto branco sobre a mídia. Invariantes.',
  Aparelho:
    'Corpo, aro, botões laterais e lente do PhoneFrame e o cromo do navegador do mockup de área de trabalho. Invariantes.',
};

/** Rótulo de uma chave de token (ou de um composto `camada@fundo`). */
const pairLabel = (key: string): string =>
  key
    .split('@')
    .map((part) => {
      const token =
        (ublColorTokens as Record<string, { cssVar: string }>)[part] ??
        (ublInvariantColors as Record<string, { cssVar: string }>)[part];
      return token ? token.cssVar : part;
    })
    .join(' sobre ');

/** Menor razão medida por tipo de par e por tema. */
const lowestRatio = (kind: UblContrastPair['kind'], theme: UblTheme): number =>
  Math.min(...ublContrastPairs.filter((pair) => pair.kind === kind).map((pair) => pair[theme]));

/** Razão formatada em pt-BR ("4,88:1"). */
const ratio = (value: number) => `${value.toFixed(2).replace('.', ',')}:1`;

/** Converte "#RRGGBB" em "rgb(r, g, b)", como o navegador resolve a cor. */
const hexToRgb = (hex: string): string => {
  const value = hex.replace('#', '');
  const channel = (start: number) => parseInt(value.slice(start, start + 2), 16);
  return `rgb(${channel(0)}, ${channel(2)}, ${channel(4)})`;
};

const cell: React.CSSProperties = {
  padding: '9px 12px',
  verticalAlign: 'top',
  borderTop: `1px solid ${DOC.border}`,
};

const headCell: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  color: DOC.text,
  backgroundColor: DOC.subtle,
};

/**
 * Tabela completa de contraste de `ublContrastPairs`: o par, o uso e a razão
 * medida nos dois temas. Cada linha declara se passa, em texto — não só pela cor.
 */
const ContrastTable: React.FC = () => (
  <div
    data-ubl-theme="light"
    style={{
      border: `1px solid ${DOC.border}`,
      borderRadius: 12,
      overflow: 'auto',
      marginBottom: 28,
    }}
  >
    <table
      aria-label="Contraste medido dos pares de uso real"
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 12.5,
        fontFamily: 'var(--ubl-font-sans)',
      }}
    >
      <thead>
        <tr>
          <th scope="col" style={headCell}>
            Par (frente sobre fundo)
          </th>
          <th scope="col" style={headCell}>
            Uso
          </th>
          <th scope="col" style={headCell}>
            Mínimo
          </th>
          <th scope="col" style={headCell}>
            Claro
          </th>
          <th scope="col" style={headCell}>
            Escuro
          </th>
          <th scope="col" style={headCell}>
            Resultado
          </th>
        </tr>
      </thead>
      <tbody>
        {ublContrastPairs.map((pair, index) => {
          const lightPasses = pair.light >= pair.minimum;
          const darkPasses = pair.dark >= pair.minimum;
          const passes = lightPasses && darkPasses;
          return (
            <tr key={`${pair.foreground}-${pair.background}-${index}`} data-ubl-contrast-row="">
              <td style={{ ...cell, fontFamily: MONO, fontSize: 11.5, color: DOC.text }}>
                {pairLabel(pair.foreground)} <span style={{ color: DOC.muted }}>sobre</span>{' '}
                {pairLabel(pair.background)}
              </td>
              <td style={{ ...cell, color: DOC.muted }}>{pair.usage}</td>
              <td style={{ ...cell, color: DOC.muted, fontFamily: MONO }}>
                {ratio(pair.minimum)} {pair.kind === 'text' ? '(texto)' : '(gráfico)'}
              </td>
              <td style={{ ...cell, fontFamily: MONO, color: lightPasses ? DOC.pass : DOC.fail }}>
                {ratio(pair.light)}
              </td>
              <td style={{ ...cell, fontFamily: MONO, color: darkPasses ? DOC.pass : DOC.fail }}>
                {ratio(pair.dark)}
              </td>
              <td
                data-ubl-contrast-result={passes ? 'passa' : 'reprova'}
                style={{ ...cell, fontWeight: 600, color: passes ? DOC.pass : DOC.fail }}
              >
                {passes ? 'Passa' : 'Reprova'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

/** Grade responsiva de amostras. */
const SwatchGrid: React.FC<{ children: React.ReactNode; min?: number }> = ({
  children,
  min = 200,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
      gap: 14,
      marginBottom: 14,
    }}
  >
    {children}
  </div>
);

/**
 * Prévia da sombra de sobreposição: um bloco em cada tema, porque o valor do
 * token é uma sombra e não uma cor — a amostra bicolor não o representaria.
 */
const ElevationPreview: React.FC = () => (
  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
    {(['light', 'dark'] as const).map((theme) => (
      <div
        key={theme}
        data-ubl-theme={theme}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ubl-color-background-page)',
        }}
      >
        <span
          style={{
            width: 44,
            height: 28,
            borderRadius: 'var(--ubl-radius-s)',
            background: 'var(--ubl-color-background-elevated)',
            boxShadow: 'var(--ubl-elevation-overlay)',
          }}
        />
      </div>
    ))}
  </div>
);

/** Amostras dos tokens de um grupo que varia com o tema. */
const ThemedGroup: React.FC<{ group: (typeof ublColorGroups)[number] }> = ({ group }) => {
  const entries = tokenEntries.filter(([, token]) => token.group === group);
  if (entries.length === 0) return null;
  return (
    <SwatchGrid>
      {entries.map(([key, token]) => (
        <UblDocTokenSwatch
          key={key}
          name={key}
          cssVar={token.cssVar}
          light={token.light.value}
          dark={token.dark.value}
          unooria={[token.light.unooria, token.dark.unooria]}
          preview={token.group === 'Elevação' ? <ElevationPreview /> : undefined}
        />
      ))}
    </SwatchGrid>
  );
};

/** Amostras dos tokens invariantes de um grupo. */
const InvariantGroup: React.FC<{ group: (typeof ublColorGroups)[number] }> = ({ group }) => {
  const entries = invariantEntries.filter(([, token]) => token.group === group);
  if (entries.length === 0) return null;
  return (
    <SwatchGrid>
      {entries.map(([key, token]) => (
        <UblDocTokenSwatch
          key={key}
          name={key}
          cssVar={token.cssVar}
          light={token.value}
          unooria={[token.unooria]}
        />
      ))}
    </SwatchGrid>
  );
};

/**
 * O véu da base da capa, sobre uma capa de demonstração do blog, com um título
 * por cima. O fundo sutil por trás da imagem mantém a amostra legível mesmo
 * enquanto a capa não carrega.
 */
const GradientSamples: React.FC = () => (
  <div data-ubl-theme="light">
    <SwatchGrid min={260}>
      {(Object.entries(ublGradients) as [keyof typeof ublGradients, (typeof ublGradients)[keyof typeof ublGradients]][]).map(
        ([key, gradient]) => (
          <figure
            key={key}
            style={{
              margin: 0,
              border: `1px solid ${DOC.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: 160,
                background: 'var(--ubl-color-background-subtle)',
              }}
            >
              <img
                src={COVER}
                alt="Capa de demonstração do blog, usada para mostrar o véu"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, background: `var(${gradient.cssVar})` }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 16,
                  right: 16,
                  bottom: 12,
                  color: 'var(--ubl-color-media-text)',
                  fontFamily: 'var(--ubl-font-sans)',
                  fontSize: 'var(--ubl-font-heading-4-size)',
                  lineHeight: 'var(--ubl-font-heading-4-line)',
                  fontWeight: 'var(--ubl-font-heading-4-weight)' as React.CSSProperties['fontWeight'],
                }}
              >
                Como escrevemos o Caderno Aberto
              </span>
            </div>
            <figcaption style={{ padding: '10px 12px', fontFamily: 'var(--ubl-font-sans)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: DOC.text }}>{key}</div>
              <div style={{ fontSize: 11, color: DOC.muted, fontFamily: MONO }}>{gradient.cssVar}</div>
              <div style={{ fontSize: 12, color: DOC.muted, marginTop: 4 }}>{gradient.usage}</div>
            </figcaption>
          </figure>
        )
      )}
    </SwatchGrid>
  </div>
);

/** Todos os grupos, variáveis e invariantes, na ordem de `ublColorGroups`. */
const AllGroups: React.FC = () => (
  <>
    {ublColorGroups.map((group) => (
      <section key={group} aria-label={group} style={{ marginBottom: 24 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: 14, color: DOC.text }}>{group}</h4>
        <p style={{ margin: '0 0 12px 0', fontSize: 13, color: DOC.muted, lineHeight: 1.6 }}>
          {GROUP_NOTES[group]}
        </p>
        <ThemedGroup group={group} />
        <InvariantGroup group={group} />
      </section>
    ))}
  </>
);

const sampleText = (slug: string, color: string): React.CSSProperties => ({
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: `var(--ubl-font-${slug}-size)`,
  lineHeight: `var(--ubl-font-${slug}-line)`,
  fontWeight: `var(--ubl-font-${slug}-weight)` as React.CSSProperties['fontWeight'],
  letterSpacing: `var(--ubl-font-${slug}-tracking)`,
  color,
});

const CALLOUT_SAMPLES: { tone: 'info' | 'success' | 'warning'; icon: UblIconName; title: string; text: string }[] = [
  { tone: 'info', icon: 'info', title: 'Nota', text: 'Os tokens valem para os dois temas.' },
  { tone: 'success', icon: 'tip', title: 'Dica', text: 'Prefira o token semântico ao degrau.' },
  { tone: 'warning', icon: 'warning', title: 'Atenção', text: 'Não derive o tema escuro por cálculo.' },
];

/**
 * Amostra de uso real em um tema: a escada página → cartão (o cartão do post,
 * sobre a página), o chip de tópico, as ações, os três avisos e a curtida. Usa
 * o `Icon` real do módulo e só variáveis `--ubl-*`.
 */
const ThemeSample: React.FC = () => (
  <article
    style={{
      width: 'min(100%, 440px)',
      boxSizing: 'border-box',
      background: 'var(--ubl-color-background-card)',
      border: '1px solid var(--ubl-color-border-subtle)',
      borderRadius: 'var(--ubl-radius-l)',
      padding: 'var(--ubl-spacing-xl)',
      display: 'grid',
      gap: 'var(--ubl-spacing-m)',
    }}
  >
    <span
      style={{
        ...sampleText('label', 'var(--ubl-color-text-accent)'),
        justifySelf: 'start',
        background: 'var(--ubl-color-fill-field)',
        borderRadius: 'var(--ubl-radius-full)',
        padding: '0 var(--ubl-spacing-m)',
        minHeight: 'var(--ubl-touch-target)',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      Design system
    </span>
    <h3 style={sampleText('heading-3', 'var(--ubl-color-text-primary)')}>
      Como organizamos os tokens do Caderno Aberto
    </h3>
    <p style={sampleText('body-lg', 'var(--ubl-color-text-secondary)')}>
      Da paleta aos temas: o caminho que um degrau percorre até virar a cor de um botão.
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ubl-spacing-xs)', flexWrap: 'wrap' }}>
      <Icon name="schedule" size="sm" tone="secondary" />
      <span style={sampleText('caption', 'var(--ubl-color-text-muted)')}>8 min de leitura</span>
      <Icon name="bookmarkFilled" size="sm" tone="accent" />
      <span style={sampleText('caption', 'var(--ubl-color-text-accent)')}>Salvo</span>
      <Icon name="likeFilled" size="sm" tone="inherit" style={{ color: 'var(--ubl-color-brand-like)' }} />
      <span style={sampleText('caption', 'var(--ubl-color-text-secondary)')}>128 curtidas</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ubl-spacing-xs)', flexWrap: 'wrap' }}>
      <span
        style={{
          ...sampleText('label', 'var(--ubl-color-text-on-action)'),
          background: 'var(--ubl-color-action-primary)',
          border: '1px solid var(--ubl-color-action-primary)',
          borderRadius: 'var(--ubl-radius-full)',
          padding: '0 var(--ubl-spacing-l)',
          minHeight: 'var(--ubl-touch-target)',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Ler o post
      </span>
      <span
        style={{
          ...sampleText('label', 'var(--ubl-color-text-primary)'),
          background: 'transparent',
          border: '1px solid var(--ubl-color-border-control)',
          borderRadius: 'var(--ubl-radius-full)',
          padding: '0 var(--ubl-spacing-l)',
          minHeight: 'var(--ubl-touch-target)',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Salvar
      </span>
    </div>
    <div style={{ display: 'grid', gap: 'var(--ubl-spacing-xs)' }}>
      {CALLOUT_SAMPLES.map((callout) => (
        <div
          key={callout.tone}
          role="note"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--ubl-spacing-xs)',
            padding: 'var(--ubl-spacing-s) var(--ubl-spacing-m)',
            background: `var(--ubl-color-fill-${callout.tone})`,
            borderLeft: `3px solid var(--ubl-color-status-${callout.tone})`,
            borderRadius: 'var(--ubl-radius-s)',
          }}
        >
          <Icon
            name={callout.icon}
            size="sm"
            tone="inherit"
            style={{ color: `var(--ubl-color-status-${callout.tone})` }}
          />
          <span style={sampleText('body-md', 'var(--ubl-color-text-primary)')}>
            <strong>{callout.title}.</strong> {callout.text}
          </span>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ubl-spacing-xs)', flexWrap: 'wrap' }}>
      <Icon name="error" size="xs" tone="danger" />
      <span style={sampleText('caption', 'var(--ubl-color-text-danger)')}>Informe um e-mail válido</span>
    </div>
  </article>
);

/** O bloco de código escuro, que é o mesmo nos dois temas. */
const CodeSample: React.FC = () => (
  <div
    data-ubl-code-sample=""
    style={{
      width: 'min(100%, 440px)',
      boxSizing: 'border-box',
      background: 'var(--ubl-color-code-surface)',
      borderRadius: 'var(--ubl-radius-m)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 'var(--ubl-spacing-xs) var(--ubl-spacing-l)',
        borderBottom: '1px solid var(--ubl-color-code-border)',
        ...sampleText('caption', 'var(--ubl-color-code-text-muted)'),
      }}
    >
      <span>tokens.css</span>
      <span style={{ color: 'var(--ubl-color-code-accent)' }}>Copiado</span>
    </div>
    <pre
      style={{
        margin: 0,
        padding: 'var(--ubl-spacing-l)',
        fontFamily: 'var(--ubl-font-mono)',
        fontSize: 'var(--ubl-font-code-size)',
        lineHeight: 'var(--ubl-font-code-line)',
        color: 'var(--ubl-color-code-text)',
        overflow: 'auto',
      }}
    >
      {`.botao {\n  background: var(--ubl-color-action-primary);\n}`}
    </pre>
  </div>
);

/** A faixa de capa com texto sobre o véu, invariante. */
const MediaSample: React.FC = () => (
  <div
    style={{
      position: 'relative',
      width: 'min(100%, 440px)',
      height: 150,
      borderRadius: 'var(--ubl-radius-m)',
      overflow: 'hidden',
      background: 'var(--ubl-color-background-subtle)',
    }}
  >
    <img src={COVER} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--ubl-gradient-media-bottom)' }} />
    <span
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 12,
        ...sampleText('heading-4', 'var(--ubl-color-media-text)'),
      }}
    >
      Texto branco sobre a capa
    </span>
  </div>
);

/**
 * A escada página → cartão → sutil como três camadas aninhadas. Cada camada
 * recebe um `data-ubl-layer` para que o `play` confira a cor resolvida.
 */
const SurfaceLadder: React.FC<{ theme: UblTheme }> = ({ theme }) => (
  <div
    data-ubl-theme={theme}
    data-ubl-layer="page"
    style={{
      background: 'var(--ubl-color-background-page)',
      border: `1px solid ${DOC.border}`,
      borderRadius: 12,
      padding: 20,
      display: 'grid',
      gap: 12,
    }}
  >
    <span style={sampleText('label', 'var(--ubl-color-text-secondary)')}>Página</span>
    <div
      data-ubl-layer="card"
      style={{
        background: 'var(--ubl-color-background-card)',
        border: '1px solid var(--ubl-color-border-subtle)',
        borderRadius: 'var(--ubl-radius-l)',
        padding: 16,
        display: 'grid',
        gap: 12,
      }}
    >
      <span style={sampleText('label', 'var(--ubl-color-text-secondary)')}>Cartão</span>
      <div
        data-ubl-layer="subtle"
        style={{
          background: 'var(--ubl-color-background-subtle)',
          borderRadius: 'var(--ubl-radius-m)',
          padding: 12,
        }}
      >
        <span style={sampleText('label', 'var(--ubl-color-text-primary)')}>Sutil</span>
      </div>
    </div>
  </div>
);

/**
 * Página de documentação rica dos tokens de cor.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Fundamentos • Cores"
      title="Cores"
      description={`Paleta do Unooblog em dois temas, claro e escuro, ambos sobre a escala roxa (brandpurple) da Plataforma Unooria. São ${tokenEntries.length} tokens que variam com o tema e ${invariantEntries.length} invariantes — o bloco de código, a mídia e o aparelho do mockup. Cada valor é um literal copiado de um degrau nomeado da Unooria, com o token de origem registrado, e o contraste de ${ublContrastPairs.length} pares de uso real foi medido nos dois temas.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Os componentes citam nomes semânticos; o tema decide qual degrau da Unooria cada nome resolve."
    />
    <UblDocGrid>
      <UblDocCard icon="🎨" title="Semânticos">
        Superfícies, texto, ícones, bordas, ações e estados (<code>--ubl-color-background-*</code>,{' '}
        <code>--ubl-color-text-*</code>, <code>--ubl-color-action-*</code> e afins). São a única
        camada que um componente cita.
      </UblDocCard>
      <UblDocCard icon="🌗" title="Dois temas">
        Claro: página branca e cartões lavanda, acento em <code>brandpurple-600</code>. Escuro: roxo
        profundo, acento em <code>brandpurple-400</code>. O tema vem do atributo{' '}
        <code>data-ubl-theme</code> (padrão claro).
      </UblDocCard>
      <UblDocCard icon="🧱" title="Página → cartão → sutil">
        A página é a coluna de leitura, branca; o post, o autor e a série são cartões lavanda; a
        capa por carregar e os comentários respondidos são o bloco sutil. A separação vem da camada
        e do fio de 1px, nunca de sombra.
      </UblDocCard>
      <UblDocCard icon="💬" title="Avisos com fundo translúcido">
        Nota, dica e atenção usam <code>--ubl-color-status-*</code> na barra e no glifo e{' '}
        <code>--ubl-color-fill-*</code> (opacidade nomeada da Unooria) no fundo, sempre com título e
        texto — o tom nunca fala só pela cor.
      </UblDocCard>
      <UblDocCard icon="🌑" title="Código sempre escuro">
        O bloco de código é uma superfície escura nos dois temas, com texto, fio e acento medidos
        contra o próprio fundo.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Origem, temas e método de medição."
    />
    <UblDocSpecs
      component="../tokens"
      layout={`Tokens de cor · ${tokenEntries.length} por tema + ${invariantEntries.length} invariantes`}
      specs={[
        { label: 'Origem', value: 'Plataforma Unooria' },
        { label: 'Escala de marca', value: 'brandpurple' },
        { label: 'Página', value: `${ublColorTokens.backgroundPage.light.value} · ${ublColorTokens.backgroundPage.dark.value}` },
        { label: 'Cartão', value: `${ublColorTokens.backgroundCard.light.value} · ${ublColorTokens.backgroundCard.dark.value}` },
        { label: 'Acento claro', value: `${ublColorTokens.actionPrimary.light.value} · 600` },
        { label: 'Acento escuro', value: `${ublColorTokens.actionPrimary.dark.value} · 400` },
        { label: 'Código (invariante)', value: ublInvariantColors.codeSurface.value },
        { label: 'Atributo de tema', value: 'data-ubl-theme' },
        {
          label: 'Menor contraste de texto',
          value: `${ratio(lowestRatio('text', 'light'))} · ${ratio(lowestRatio('text', 'dark'))}`,
        },
        {
          label: 'Menor contraste gráfico',
          value: `${ratio(lowestRatio('graphic', 'light'))} · ${ratio(lowestRatio('graphic', 'dark'))}`,
        },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Página branca e cartões lavanda (inverso do jornal)',
          detail:
            'o jornal é papel lavanda com cartões brancos; o blog faz o contrário. A coluna de leitura é branca (background-page) e os cartões de post, autor, série e newsletter são lavanda (background-card, brandpurple-50). No escuro a escada acompanha: a página é brandpurple-950 e o cartão, brandpurple-900, um degrau mais claro. É uma decisão de composição: texto longo lê melhor sobre fundo limpo, e o cartão se destaca da página sem sombra.',
        },
        {
          subject: 'Código sempre em superfície escura, nos dois temas',
          detail:
            'o bloco de código usa --ubl-color-code-* (brandpurple-950, texto branco, apoio brandpurple-300, acento brandpurple-400) no tema claro e no escuro. Ficar escuro no claro separa o código da prosa à primeira vista e dispensa um segundo conjunto de cores de realce; o texto mede 19,58:1 e o apoio, 12,10:1 contra o próprio fundo.',
        },
        {
          subject: 'Tema escuro medido por degraus nomeados da Unooria, nunca derivado',
          detail:
            'o tema escuro não é o claro invertido, clareado ou com opacidade calculada: cada valor de cada tema é um degrau nomeado da Unooria, citado no comentário de cada linha de colors.css. O módulo copia os literais e nunca lê --unooria-* em tempo de execução; scripts/verificar-paridade-unooblog.mjs reprova o build se um literal se afastar da origem.',
        },
        {
          subject: 'Avisos com fundo translúcido nomeado (opacity-*-100) e tom também em texto',
          detail:
            'o fundo do aviso é a opacidade de 10% da cor de estado, em token nomeado da Unooria (opacity-info-100, opacity-success-100, opacity-warning-100), e não um color-mix. A barra e o glifo usam status-*, que muda por tema para manter 3:1 contra o fundo composto (menor razão: 4,39:1). O texto é sempre text-primary (13,37:1 ou mais) e o tom também vem escrito — "Nota", "Dica", "Atenção" —, então ninguém depende de distinguir cores.',
        },
        {
          subject: 'Contorno de controle em border-control',
          detail:
            'border-subtle e border-default são decorativos (separam itens e delimitam o cartão) e não passam de 3:1. Todo limite de campo, botão secundário, chip e outline usa border-control (4,96:1 no claro e 9,28:1 no escuro sobre a página), a regra 1.4.11 da WCAG.',
        },
        {
          subject: 'Acento do texto um degrau acima do acento gráfico',
          detail:
            'no claro, links e tópicos são brandpurple-700 (7,07:1 sobre a página) enquanto o preenchimento da ação e o glifo de destaque são brandpurple-600 (4,88:1): o 600 serve a gráfico, mas o texto pequeno ganha folga no 700.',
        },
        {
          subject: 'No escuro, sutil, elevada e campo coincidem em brandpurple-800',
          detail:
            'background-subtle, background-elevated e fill-field são o mesmo degrau no tema escuro. A distinção vem do halo de --ubl-elevation-overlay nas camadas flutuantes e da posição do elemento (campo dentro de página, menu sobre véu). Sobre essa camada elevada o acento mede 4,80:1 e a curtida, 4,07:1, ambos acima dos 3:1 de gráfico.',
        },
        {
          subject: 'Pior caso da capa',
          detail: `o título sobre a capa foi medido contra uma capa branca (mediaText sobre mediaScrim@branco, ${ratio(lowestRatio('text', 'dark'))}): o véu brandpurple a 60% garante leitura sobre qualquer imagem.`,
        },
        {
          subject: 'Sombra definida por tema e gradiente repetido por tema',
          detail:
            'no escuro a sombra escura não se vê sobre roxo profundo, então --ubl-elevation-overlay vira o halo claro --unooria-elevation-neutral-2. O véu da mídia usa var() e por isso é declarado em :root e em todo [data-ubl-theme]; só na raiz, congelaria o valor dentro de um contêiner com outro tema (a lição da seção 2.9 do AGENTS.md).',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia"
      description="Onde cada família de tokens aparece numa página do blog, de baixo para cima."
    />
    <UblDocAnatomy
      zones={[
        {
          name: 'Página',
          role: 'Fundo branco da coluna de leitura; o texto corre direto sobre ela.',
          token: '--ubl-color-background-page',
        },
        {
          name: 'Cartões',
          role: 'Post do feed, cartão de autor, de série e de newsletter, sobre a página.',
          token: '--ubl-color-background-card · --ubl-color-border-subtle',
        },
        {
          name: 'Blocos sutis',
          role: 'Capa ainda não carregada, comentário respondido, preenchimento de chip e de campo.',
          token: '--ubl-color-background-subtle · --ubl-color-fill-field',
        },
        {
          name: 'Ações',
          role: 'Botão primário, item ativo do sumário, progresso de leitura e anel de foco.',
          token: '--ubl-color-action-primary · --ubl-color-focus-ring',
        },
        {
          name: 'Avisos do post',
          role: 'Nota, dica e atenção: barra e glifo em status, fundo translúcido em fill.',
          token: '--ubl-color-status-* · --ubl-color-fill-*',
        },
        {
          name: 'Bloco de código',
          role: 'Superfície escura invariante, com barra do arquivo e botão de copiar.',
          token: '--ubl-color-code-*',
        },
        {
          name: 'Camadas flutuantes',
          role: 'Folhas, menus e diálogos sobre o véu; o aviso passageiro em cores invertidas.',
          token: '--ubl-color-background-elevated · --ubl-color-overlay-scrim · --ubl-color-toast-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de tokens"
      description="Todos os tokens por grupo. Nos que variam, a amostra é metade claro, metade escuro; nos invariantes, uma cor só. Clique para copiar a variável."
    />
    <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: DOC.text }}>
      A escada página → cartão → sutil nos dois temas
    </h4>
    <UblDocGrid min={260} marginBottom={24}>
      <SurfaceLadder theme="light" />
      <SurfaceLadder theme="dark" />
    </UblDocGrid>
    <AllGroups />
    <h4 style={{ margin: '8px 0 12px 0', fontSize: 14, color: DOC.text }}>Gradiente composto</h4>
    <GradientSamples />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Contraste medido"
      description={`${ublContrastPairs.length} pares de uso real (razão WCAG 2.x; camadas translúcidas compostas sobre o fundo indicado). Texto exige 4,5:1 e gráfico — glifo, contorno, fio, foco, controle — exige 3:1.`}
    />
    <UblDocGrid min={220}>
      <UblDocCard icon="🔤" title="Texto">
        Menor razão: <strong>{ratio(lowestRatio('text', 'light'))}</strong> no claro (rótulo do botão
        destrutivo) e <strong>{ratio(lowestRatio('text', 'dark'))}</strong> no escuro (título sobre a
        capa).
      </UblDocCard>
      <UblDocCard icon="⭕" title="Gráfico">
        Menor razão: <strong>{ratio(lowestRatio('graphic', 'light'))}</strong> no claro e{' '}
        <strong>{ratio(lowestRatio('graphic', 'dark'))}</strong> no escuro.
      </UblDocCard>
      <UblDocCard icon="🚫" title="Fora da tabela">
        Divisores decorativos (<code>border-subtle</code>, <code>border-default</code>) e a ação
        desabilitada, isenta pela WCAG 1.4.3.
      </UblDocCard>
    </UblDocGrid>
    <ContrastTable />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UblDocPractices
      dos={[
        'Consumir só tokens semânticos --ubl-color-* nos componentes: eles já resolvem os dois temas.',
        'Compor a página como página → cartão → sutil: background-page, background-card e background-subtle, separados por fio de 1px.',
        'Usar --ubl-color-border-control no contorno de campo, chip e botão secundário.',
        'Usar --ubl-color-code-* em tudo o que fica dentro do bloco de código, nos dois temas.',
        'Escrever o tom do aviso (Nota, Dica, Atenção) além de colorir a barra e o glifo.',
        'Trocar o tema pelo atributo data-ubl-theme no contêiner mais externo, deixando os componentes herdarem.',
      ]}
      donts={[
        'Derivar um tema por cálculo (inverter, clarear, color-mix, opacidade calculada).',
        'Usar var(--unooria-*) ou variáveis de outra marca dentro do Unooblog.',
        'Escrever hexadecimal ou rgba() avulso em CSS de componente.',
        'Inverter a escada do blog: cartão branco sobre página lavanda é a composição do jornal.',
        'Usar border-subtle como limite de campo: ele não passa de 3:1.',
        'Dar sombra a cartão, item de lista ou barra: a sombra é só de camada flutuante.',
        'Comunicar estado só pela cor: acompanhe de rótulo, glifo ou forma (curtida, aviso, erro de campo).',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Uma mesma peça resolvendo as variáveis nos dois temas."
    />
    <UblDocThemeSwitcher>{() => <ThemeSample />}</UblDocThemeSwitcher>
    <UblDocStage label="Código e mídia: invariantes no tema claro" surface="page" theme="light" direction="column" align="flex-start">
      <CodeSample />
      <MediaSample />
    </UblDocStage>
    <UblDocStage label="Código e mídia: os mesmos valores no tema escuro" surface="page" theme="dark" direction="column" align="flex-start">
      <CodeSample />
      <MediaSample />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Referência completa da API de cores"
      description="Exportações de src/unooblog/tokens/colors.ts."
    />
    <UblDocPropsTable
      title="Exportações"
      rows={[
        { name: 'ublColorTokens', type: 'Record<UblColorKey, UblColorToken>', description: 'Tokens que variam com o tema, com valor e origem em cada um.' },
        { name: 'ublInvariantColors', type: 'Record<UblInvariantColorKey, UblInvariantColorToken>', description: 'Tokens invariantes: código, mídia e aparelho.' },
        { name: 'ublColorGroups', type: 'readonly string[]', description: 'Ordem dos grupos na documentação.' },
        { name: 'ublColorThemes', type: 'Record<UblTheme, Record<UblColorKey, string>>', description: 'Valores resolvidos de cada tema, por chave.' },
        { name: 'ublColorCssVars', type: 'Record<UblColorKey | UblInvariantColorKey, string>', description: 'Referências var(--ubl-…) prontas para estilo inline.' },
        { name: 'ublGradients', type: 'Record<"mediaBottom", { cssVar; usage }>', description: 'O véu da base da capa.' },
        { name: 'ublContrastPairs', type: 'readonly UblContrastPair[]', description: 'Pares de uso real com a razão medida em cada tema.' },
        { name: 'UblTheme', type: "'light' | 'dark'", description: 'Temas do módulo.' },
      ]}
    />
    <UblDocPropsTable
      title="UblContrastPair"
      rows={[
        { name: 'foreground', type: 'string', description: 'Chave do token de frente.' },
        { name: 'background', type: 'string', description: 'Chave do fundo; "a@b" é a camada a composta sobre b.' },
        { name: 'kind', type: "'text' | 'graphic'", description: "'text' exige 4,5:1; 'graphic', 3:1 (WCAG 1.4.3 e 1.4.11)." },
        { name: 'minimum', type: 'number', description: 'Razão mínima do tipo.' },
        { name: 'light', type: 'number', description: 'Razão medida no tema claro.' },
        { name: 'dark', type: 'number', description: 'Razão medida no tema escuro.' },
        { name: 'usage', type: 'string', description: 'Onde o par aparece no produto.' },
      ]}
    />
    <UblDocPropsTable
      title="UblColorToken e UblInvariantColorToken"
      rows={[
        { name: 'cssVar', type: 'string', description: 'Nome da variável CSS.' },
        { name: 'group', type: 'string', description: 'Grupo de exibição.' },
        { name: 'usage', type: 'string', description: 'Onde o token é aplicado.' },
        { name: 'light / dark', type: 'UblColorValue', description: 'Só em UblColorToken: { value, unooria } de cada tema.' },
        { name: 'value / unooria', type: 'string', description: 'Só em UblInvariantColorToken: literal e token de origem.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unooblog/Fundamentos/Cores',
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos tokens de cor.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CoresDocumentationPage />,
};

/**
 * Todos os tokens, variáveis e invariantes, por grupo.
 */
export const TodasVariantes: Story = {
  name: '🎨 Todos os tokens por grupo',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Todos os tokens por grupo" />
      <AllGroups />
    </UnooriaDocShell>
  ),
};

/**
 * A escada página → cartão → sutil nos dois temas. O `play` confere a cor
 * resolvida de cada camada contra o literal do token: no claro a página é
 * branca e o cartão, lavanda; no escuro o cartão fica um degrau acima da página.
 */
export const EscadaDeSuperficies: Story = {
  name: '🧱 Página, cartão e sutil',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Página → cartão → sutil" />
      <UblDocGrid min={280}>
        <SurfaceLadder theme="light" />
        <SurfaceLadder theme="dark" />
      </UblDocGrid>
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const themes: [UblTheme, string][] = [
      ['light', '[data-ubl-theme="light"]'],
      ['dark', '[data-ubl-theme="dark"]'],
    ];
    for (const [theme, selector] of themes) {
      const ladder = canvasElement.querySelector(selector) as HTMLElement;
      await expect(ladder).not.toBeNull();
      const layer = (name: string) =>
        getComputedStyle(ladder.querySelector(`[data-ubl-layer="${name}"]`) ?? ladder).backgroundColor;
      const page = layer('page');
      await expect(page).toBe(hexToRgb(ublColorTokens.backgroundPage[theme].value));
      await expect(layer('card')).toBe(hexToRgb(ublColorTokens.backgroundCard[theme].value));
      await expect(layer('subtle')).toBe(hexToRgb(ublColorTokens.backgroundSubtle[theme].value));
      // A escada nunca se achata: cartão e página são camadas distintas.
      await expect(layer('card')).not.toBe(page);
    }
  },
};

/**
 * O véu da base da capa, sobre uma capa de demonstração.
 */
export const Gradientes: Story = {
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Gradiente composto" />
      <GradientSamples />
    </UnooriaDocShell>
  ),
};

/**
 * O bloco de código e a faixa de mídia: invariantes entre os temas. O `play`
 * confere que o fundo do código tem a mesma cor resolvida no claro e no escuro.
 */
export const Invariantes: Story = {
  name: '🌑 Código e mídia invariantes',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Invariantes entre temas" />
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          direction="column"
          align="flex-start"
        >
          <CodeSample />
          <MediaSample />
        </UblDocStage>
      ))}
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const samples = Array.from(canvasElement.querySelectorAll('[data-ubl-code-sample]')) as HTMLElement[];
    await expect(samples).toHaveLength(2);
    const [first, second] = samples.map((sample) => getComputedStyle(sample).backgroundColor);
    await expect(first).toBe(hexToRgb(ublInvariantColors.codeSurface.value));
    await expect(second).toBe(first);
  },
};

/**
 * Tabela completa de contraste. O `play` confere que a tabela tem todos os
 * pares, que nenhum reprova e que as menores razões de texto são as medidas.
 */
export const ContrasteMedido: Story = {
  name: '🔍 Contraste medido',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Contraste medido" />
      <ContrastTable />
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole('table', { name: 'Contraste medido dos pares de uso real' });
    const rows = within(table).getAllByRole('row');
    // Uma linha de cabeçalho mais uma por par.
    await expect(rows).toHaveLength(ublContrastPairs.length + 1);
    await expect(canvasElement.querySelectorAll('[data-ubl-contrast-result="reprova"]')).toHaveLength(0);
    // Menor razão de texto: 4,74:1 no claro e 4,86:1 no escuro.
    await expect(lowestRatio('text', 'light')).toBe(4.74);
    await expect(lowestRatio('text', 'dark')).toBe(4.86);
    await expect(within(table).getAllByText('4,74:1').length).toBeGreaterThan(0);
    await expect(within(table).getAllByText('4,86:1').length).toBeGreaterThan(0);
  },
};

/**
 * A mesma peça nos dois temas, lado a lado.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          gap={12}
        >
          <ThemeSample />
        </UblDocStage>
      ))}
    </div>
  ),
};
