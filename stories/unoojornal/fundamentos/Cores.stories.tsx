import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import {
  ujnColorGroups,
  ujnColorTokens,
  ujnContrastPairs,
  ujnGradients,
  ujnInvariantColors,
  type UjnColorKey,
  type UjnContrastPair,
  type UjnInvariantColorKey,
  type UjnTheme,
} from '../../../src/unoojornal/tokens';
import { Icon } from '../../../src/unoojornal/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocAnatomy,
  UjnDocCard,
  UjnDocDecisions,
  UjnDocGrid,
  UjnDocPractices,
  UjnDocPropsTable,
  UjnDocSpecs,
  UjnDocStage,
  UjnDocThemeSwitcher,
  UjnDocTokenSwatch,
} from '../../../.storybook/components';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const PHOTO = '/unoojornal/foto-01.svg';

/**
 * Cores da própria moldura da documentação, resolvidas no tema claro (a página
 * de documentação é sempre clara; os palcos escolhem o tema).
 */
const DOC = {
  text: 'var(--ujn-color-text-primary)',
  muted: 'var(--ujn-color-text-secondary)',
  border: 'var(--ujn-color-border-subtle)',
  subtle: 'var(--ujn-color-background-subtle)',
  pass: 'var(--ujn-color-status-live)',
  fail: 'var(--ujn-color-text-danger)',
} as const;

type TokenEntry = [UjnColorKey, (typeof ujnColorTokens)[UjnColorKey]];
type InvariantEntry = [UjnInvariantColorKey, (typeof ujnInvariantColors)[UjnInvariantColorKey]];

const tokenEntries = Object.entries(ujnColorTokens) as TokenEntry[];
const invariantEntries = Object.entries(ujnInvariantColors) as InvariantEntry[];

/** Descrição de cada grupo de tokens, na ordem de `ujnColorGroups`. */
const GROUP_NOTES: Record<(typeof ujnColorGroups)[number], string> = {
  Superfícies:
    'A escada "papel → cartão → sutil": a página (o papel atrás das colunas), o cartão da matéria e das caixas laterais, o bloco sutil (mídia ainda não carregada, tarja de data) e a camada elevada de menus, folhas e diálogos — mais a barra translúcida do leitor.',
  Texto:
    'Principal, resumo, metadado, acento (kicker e links) e destrutivo, mais os dois rótulos que ficam sobre preenchimento (ação e perigo).',
  Ícones: 'Glifo ativo, glifo de apoio e o glifo de destaque da matéria salva e do item ativo.',
  Bordas:
    'Divisor sutil, contorno de pílula e botão secundário, a tinta do jornal (border-rule: fio grosso e fio duplo do cabeçalho) e o contorno de campo e de controle — o único dos divisores comuns que passa de 3:1.',
  Ações:
    'Preenchimento de ação nos três estados, destrutivo, preenchimento de campo e de pílula, realces de hover e de pressionado e o anel de foco.',
  Marca:
    'Estados editoriais: o marcador "Atualizado agora" e a nota de correção publicada. Nunca comunicam sozinhos — sempre acompanham texto.',
  Overlays: 'Véu atrás de folhas e diálogos e o aviso passageiro em cores invertidas.',
  Elevação: 'A única sombra do módulo: definida por tema, aplicada só a camadas flutuantes.',
  Rodapé:
    'O único bloco escuro do jornal claro: fundo, texto, apoio, acento e fio. Invariante — o rodapé é o mesmo nos dois temas.',
  Mídia: 'Véu da base da fotografia e texto branco sobre a mídia. Invariantes.',
  Aparelho: 'Corpo, aro, botões laterais e lente do PhoneFrame e o cromo do navegador do mockup de área de trabalho. Invariantes.',
};

/** Rótulo de uma chave de token (ou de um composto `camada@fundo`). */
const pairLabel = (key: string): string =>
  key
    .split('@')
    .map((part) => {
      const token =
        (ujnColorTokens as Record<string, { cssVar: string }>)[part] ??
        (ujnInvariantColors as Record<string, { cssVar: string }>)[part];
      return token ? token.cssVar : part;
    })
    .join(' sobre ');

/** Menor razão medida por tipo de par e por tema. */
const lowestRatio = (kind: UjnContrastPair['kind'], theme: UjnTheme): number =>
  Math.min(...ujnContrastPairs.filter((pair) => pair.kind === kind).map((pair) => pair[theme]));

/** Razão formatada em pt-BR ("4,88:1"). */
const ratio = (value: number) => `${value.toFixed(2).replace('.', ',')}:1`;

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
 * Tabela completa de contraste de `ujnContrastPairs`: o par, o uso e a razão
 * medida nos dois temas. Cada linha declara se passa, em texto — não só pela cor.
 */
const ContrastTable: React.FC = () => (
  <div
    data-ujn-theme="light"
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
        fontFamily: 'var(--ujn-font-sans)',
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
        {ujnContrastPairs.map((pair, index) => {
          const lightPasses = pair.light >= pair.minimum;
          const darkPasses = pair.dark >= pair.minimum;
          const passes = lightPasses && darkPasses;
          return (
            <tr key={`${pair.foreground}-${pair.background}-${index}`} data-ujn-contrast-row="">
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
                data-ujn-contrast-result={passes ? 'passa' : 'reprova'}
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
        data-ujn-theme={theme}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ujn-color-background-card)',
        }}
      >
        <span
          style={{
            width: 44,
            height: 28,
            borderRadius: 'var(--ujn-radius-s)',
            background: 'var(--ujn-color-background-elevated)',
            boxShadow: 'var(--ujn-elevation-overlay)',
          }}
        />
      </div>
    ))}
  </div>
);

/** Amostras dos tokens de um grupo que varia com o tema. */
const ThemedGroup: React.FC<{ group: (typeof ujnColorGroups)[number] }> = ({ group }) => {
  const entries = tokenEntries.filter(([, token]) => token.group === group);
  if (entries.length === 0) return null;
  return (
    <SwatchGrid>
      {entries.map(([key, token]) => (
        <UjnDocTokenSwatch
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
const InvariantGroup: React.FC<{ group: (typeof ujnColorGroups)[number] }> = ({ group }) => {
  const entries = invariantEntries.filter(([, token]) => token.group === group);
  if (entries.length === 0) return null;
  return (
    <SwatchGrid>
      {entries.map(([key, token]) => (
        <UjnDocTokenSwatch
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
 * Os dois gradientes compostos: o véu da base da fotografia, sobre uma foto de
 * demonstração, e o fio duplo da tinta, sobre a página.
 */
const GradientSamples: React.FC = () => (
  <div data-ujn-theme="light">
    <SwatchGrid min={260}>
      {(Object.entries(ujnGradients) as [keyof typeof ujnGradients, (typeof ujnGradients)[keyof typeof ujnGradients]][]).map(
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
            {key === 'mediaBottom' ? (
              <div style={{ position: 'relative', height: 140 }}>
                <img
                  src={PHOTO}
                  alt="Fotografia de demonstração do jornal, usada para mostrar o véu"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', inset: 0, background: `var(${gradient.cssVar})` }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    right: 12,
                    bottom: 10,
                    color: 'var(--ujn-color-media-text)',
                    fontFamily: 'var(--ujn-font-sans)',
                    fontSize: 'var(--ujn-font-body-sm-size)',
                    lineHeight: 'var(--ujn-font-body-sm-line)',
                  }}
                >
                  Legenda sobre a fotografia
                </span>
              </div>
            ) : (
              <div
                style={{
                  height: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 'var(--ujn-spacing-m)',
                  padding: '0 var(--ujn-spacing-xxl)',
                  background: 'var(--ujn-color-background-page)',
                }}
              >
                <span
                  style={{
                    color: 'var(--ujn-color-text-primary)',
                    fontFamily: 'var(--ujn-font-sans)',
                    fontSize: 'var(--ujn-font-title-lg-size)',
                    lineHeight: 'var(--ujn-font-title-lg-line)',
                    fontWeight: 'var(--ujn-font-title-lg-weight)' as React.CSSProperties['fontWeight'],
                  }}
                >
                  Título da publicação
                </span>
                <span
                  data-ujn-rule-double=""
                  aria-hidden="true"
                  style={{
                    display: 'block',
                    height: 'var(--ujn-rule-double-height)',
                    background: `var(${gradient.cssVar})`,
                  }}
                />
              </div>
            )}
            <figcaption style={{ padding: '10px 12px', fontFamily: 'var(--ujn-font-sans)' }}>
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

/** Todos os grupos, variáveis e invariantes, na ordem de `ujnColorGroups`. */
const AllGroups: React.FC = () => (
  <>
    {ujnColorGroups.map((group) => (
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
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: `var(--ujn-font-${slug}-size)`,
  lineHeight: `var(--ujn-font-${slug}-line)`,
  fontWeight: `var(--ujn-font-${slug}-weight)` as React.CSSProperties['fontWeight'],
  letterSpacing: `var(--ujn-font-${slug}-tracking)`,
  color,
});

/**
 * Amostra de uso real em um tema: a escada papel → cartão → sutil, a tinta do
 * jornal, a pílula selecionada, a ação primária e os estados editoriais. Usa o
 * `Icon` real do módulo e só variáveis `--ujn-*`.
 */
const ThemeSample: React.FC = () => (
  <article
    style={{
      width: 'min(100%, 420px)',
      boxSizing: 'border-box',
      background: 'var(--ujn-color-background-card)',
      border: '1px solid var(--ujn-color-border-subtle)',
      borderTop: 'var(--ujn-rule-thick) solid var(--ujn-color-border-rule)',
      borderRadius: 'var(--ujn-radius-xs)',
      padding: 'var(--ujn-spacing-xl)',
      display: 'grid',
      gap: 'var(--ujn-spacing-m)',
    }}
  >
    <p
      style={{
        ...sampleText('kicker', 'var(--ujn-color-text-accent)'),
        textTransform: 'uppercase',
      }}
    >
      Escola
    </p>
    <h3 style={sampleText('title-lg', 'var(--ujn-color-text-primary)')}>
      Feira de ciências reúne mil alunos no pátio central
    </h3>
    <p style={sampleText('body-md', 'var(--ujn-color-text-secondary)')}>
      Os projetos ocuparam o pátio durante toda a manhã e a comunidade foi convidada a votar.
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ujn-spacing-xs)', flexWrap: 'wrap' }}>
      <span
        style={{
          ...sampleText('label', 'var(--ujn-color-text-on-action)'),
          background: 'var(--ujn-color-action-primary)',
          border: '1px solid var(--ujn-color-action-primary)',
          borderRadius: 'var(--ujn-radius-full)',
          padding: '0 var(--ujn-spacing-l)',
          minHeight: 'var(--ujn-touch-target)',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Ler a reportagem
      </span>
      <span
        style={{
          ...sampleText('label', 'var(--ujn-color-text-primary)'),
          background: 'var(--ujn-color-fill-field)',
          border: '1px solid var(--ujn-color-border-default)',
          borderRadius: 'var(--ujn-radius-full)',
          padding: '0 var(--ujn-spacing-l)',
          minHeight: 'var(--ujn-touch-target)',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Esportes
      </span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ujn-spacing-xs)', flexWrap: 'wrap' }}>
      <Icon name="bookmarkFilled" size="sm" tone="accent" />
      <span style={sampleText('body-sm', 'var(--ujn-color-text-accent)')}>Matéria salva</span>
      <Icon name="schedule" size="sm" tone="secondary" />
      <span style={sampleText('caption', 'var(--ujn-color-text-muted)')}>6 min de leitura</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ujn-spacing-xs)', flexWrap: 'wrap' }}>
      <span
        aria-hidden="true"
        style={{
          width: 10,
          height: 10,
          borderRadius: 'var(--ujn-radius-full)',
          background: 'var(--ujn-color-status-live)',
        }}
      />
      <span style={sampleText('caption', 'var(--ujn-color-text-secondary)')}>Atualizado agora</span>
      <Icon name="warning" size="xs" tone="inherit" style={{ color: 'var(--ujn-color-status-warning)' }} />
      <span style={sampleText('caption', 'var(--ujn-color-text-danger)')}>Erro no campo</span>
    </div>
  </article>
);

/** O rodapé escuro invariante, com os cinco tokens do grupo. */
const FooterSample: React.FC = () => (
  <div
    style={{
      width: 'min(100%, 420px)',
      boxSizing: 'border-box',
      display: 'grid',
      gap: 'var(--ujn-spacing-s)',
    }}
  >
    <p style={sampleText('title-md', 'var(--ujn-color-footer-text)')}>Jornal Escolar</p>
    <p style={sampleText('body-sm', 'var(--ujn-color-footer-text-secondary)')}>
      Jornal escolar produzido por estudantes do 7º ao 9º ano.
    </p>
    <p style={{ ...sampleText('kicker', 'var(--ujn-color-footer-accent)'), textTransform: 'uppercase' }}>
      Seções
    </p>
    <p
      style={{
        ...sampleText('caption', 'var(--ujn-color-footer-text-secondary)'),
        borderTop: '1px solid var(--ujn-color-footer-border)',
        paddingTop: 'var(--ujn-spacing-s)',
      }}
    >
      Texto fictício de demonstração.
    </p>
  </div>
);

/**
 * Página de documentação rica dos tokens de cor.
 */
const CoresDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Fundamentos • Cores"
      title="Cores"
      description={`Paleta do Unoojornal em dois temas, claro e escuro, ambos sobre a escala roxa (brandpurple) da Plataforma Unooria. São ${tokenEntries.length} tokens que variam com o tema e ${invariantEntries.length} invariantes — o rodapé escuro, a mídia e o aparelho do mockup. Cada valor é um literal copiado de um degrau nomeado da Unooria, com o token de origem registrado, e o contraste de ${ujnContrastPairs.length} pares de uso real foi medido nos dois temas.`}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Os componentes citam nomes semânticos; o tema decide qual degrau da Unooria cada nome resolve."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🎨" title="Semânticos">
        Superfícies, texto, ícones, bordas, ações e estados (<code>--ujn-color-background-*</code>,{' '}
        <code>--ujn-color-text-*</code>, <code>--ujn-color-action-*</code> e afins). São a única
        camada que um componente cita.
      </UjnDocCard>
      <UjnDocCard icon="🌗" title="Dois temas">
        Claro: papel lavanda e cartões brancos, acento em <code>brandpurple-600</code>. Escuro: roxo
        profundo, acento em <code>brandpurple-400</code>. O tema vem do atributo{' '}
        <code>data-ujn-theme</code> (padrão claro).
      </UjnDocCard>
      <UjnDocCard icon="🗞️" title="Papel → cartão → sutil">
        A página é o papel; a matéria e as caixas laterais são cartões; a mídia por carregar e as
        tarjas são o bloco sutil. A separação vem da camada e do fio, nunca de sombra.
      </UjnDocCard>
      <UjnDocCard icon="🖋️" title="Tinta do jornal">
        <code>--ujn-color-border-rule</code> pinta o fio grosso e o fio duplo do cabeçalho: o
        extremo escuro da escala roxa no claro, o extremo claro no escuro.
      </UjnDocCard>
      <UjnDocCard icon="🌑" title="Rodapé escuro invariante">
        O rodapé é o único bloco escuro do jornal claro e fica igual nos dois temas, com texto e
        acento medidos contra o próprio fundo.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Origem, temas e método de medição."
    />
    <UjnDocSpecs
      component="../tokens"
      layout={`Tokens de cor · ${tokenEntries.length} por tema + ${invariantEntries.length} invariantes`}
      specs={[
        { label: 'Origem', value: 'Plataforma Unooria' },
        { label: 'Escala de marca', value: 'brandpurple' },
        { label: 'Acento claro', value: `${ujnColorTokens.actionPrimary.light.value} · 600` },
        { label: 'Acento escuro', value: `${ujnColorTokens.actionPrimary.dark.value} · 400` },
        { label: 'Tinta do jornal', value: `${ujnColorTokens.borderRule.light.value} · ${ujnColorTokens.borderRule.dark.value}` },
        { label: 'Rodapé (invariante)', value: ujnInvariantColors.footerSurface.value },
        { label: 'Atributo de tema', value: 'data-ujn-theme' },
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
    <UjnDocDecisions
      items={[
        {
          subject: 'Dourado do Figma → brandpurple como acento editorial',
          detail:
            'o arquivo de referência do jornal usa o dourado como cor de destaque. Aqui não há dourado: o acento editorial é a escala brandpurple da Plataforma Unooria — 600 no claro (preenchimento e glifo, 4,88:1 sobre o cartão) e 400 no escuro. A estrutura editorial se preserva; a identidade é a da Unooria.',
        },
        {
          subject: 'Rodapé escuro invariante (o único bloco escuro do jornal claro)',
          detail:
            'o rodapé usa --ujn-color-footer-* nos dois temas (brandpurple-900, texto branco, apoio brandpurple-300, acento brandpurple-400). No tema escuro ele continua um degrau acima da página (950), de modo que não some. Os três pares do rodapé medem de 7,70:1 a 18,23:1.',
        },
        {
          subject: 'Tema escuro medido por degraus nomeados da Unooria, nunca derivado',
          detail:
            'o tema escuro não é o claro invertido, clareado ou com opacidade calculada: cada valor de cada tema é um degrau nomeado da Unooria, citado no comentário de cada linha de colors.css. O módulo copia os literais e nunca lê --unooria-* em tempo de execução; scripts/verificar-paridade-unoojornal.mjs reprova o build se um literal se afastar da origem.',
        },
        {
          subject: 'Tinta do jornal (border-rule) é brandpurple-900 no claro e brandpurple-200 no escuro',
          detail:
            'o fio grosso e o fio duplo do cabeçalho são gráfico, não decoração: medem 16,94:1 (claro) e 14,62:1 (escuro) sobre a página. Por isso a tinta é um token próprio, e não border-default, que é decorativo.',
        },
        {
          subject: 'Acento do texto um degrau acima do acento gráfico',
          detail:
            'no claro, o kicker e os links são brandpurple-700 (7,07:1 sobre o cartão) enquanto o preenchimento da ação e o glifo de destaque são brandpurple-600 (4,88:1): o 600 serve a gráfico, mas o texto pequeno ganha folga no 700.',
        },
        {
          subject: 'Pior caso da fotografia',
          detail: `a legenda sobre a fotografia foi medida contra uma foto branca (mediaText sobre mediaScrim@branco, ${ratio(lowestRatio('text', 'dark'))}): o véu brandpurple a 60% garante leitura sobre qualquer imagem.`,
        },
        {
          subject: 'Divisor abaixo de 3:1, de propósito',
          detail:
            'border-subtle e border-default são decorativos (separam itens da lista e delimitam o cartão) e não delimitam controle. Todo limite de campo ou de controle usa border-control, que passa de 3:1 nos dois temas.',
        },
        {
          subject: 'Gradientes repetidos por tema',
          detail:
            'o véu da mídia e o fio duplo usam var() e por isso são declarados em :root e em todo [data-ujn-theme]; só na raiz, congelariam o valor dentro de um contêiner com outro tema (a lição da seção 2.9 do AGENTS.md).',
        },
        {
          subject: 'Sombra definida por tema',
          detail:
            'no escuro a sombra escura não se vê sobre roxo profundo, então --ujn-elevation-overlay vira o halo claro --unooria-elevation-neutral-2.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia"
      description="Onde cada família de tokens aparece numa página do jornal, de baixo para cima."
    />
    <UjnDocAnatomy
      zones={[
        {
          name: 'Página (o papel)',
          role: 'Fundo atrás das colunas; o texto corre sobre os cartões.',
          token: '--ujn-color-background-page',
        },
        {
          name: 'Cartões',
          role: 'Matéria de capa, itens da lista, caixa de opinião e agenda.',
          token: '--ujn-color-background-card · --ujn-color-border-subtle',
        },
        {
          name: 'Blocos sutis',
          role: 'Mídia ainda não carregada, tarja de data e preenchimento de pílula e campo.',
          token: '--ujn-color-background-subtle · --ujn-color-fill-field',
        },
        {
          name: 'Tinta do jornal',
          role: 'Fio duplo sob o título da publicação e fio grosso sob a barra de edição.',
          token: '--ujn-color-border-rule',
        },
        {
          name: 'Ações',
          role: 'Botão primário, pílula selecionada, progresso de leitura e anel de foco.',
          token: '--ujn-color-action-primary · --ujn-color-focus-ring',
        },
        {
          name: 'Camadas flutuantes',
          role: 'Folhas, menus e diálogos sobre o véu; o aviso passageiro em cores invertidas.',
          token: '--ujn-color-background-elevated · --ujn-color-overlay-scrim · --ujn-color-toast-*',
        },
        {
          name: 'Rodapé',
          role: 'Bloco escuro invariante com colunas de links e direitos autorais.',
          token: '--ujn-color-footer-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de tokens"
      description="Todos os tokens por grupo. Nos que variam, a amostra é metade claro, metade escuro; nos invariantes, uma cor só. Clique para copiar a variável."
    />
    <AllGroups />
    <h4 style={{ margin: '8px 0 12px 0', fontSize: 14, color: DOC.text }}>Gradientes compostos</h4>
    <GradientSamples />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Contraste medido"
      description={`${ujnContrastPairs.length} pares de uso real (razão WCAG 2.x; camadas translúcidas compostas sobre o fundo indicado). Texto exige 4,5:1 e gráfico — glifo, contorno, fio, foco, controle — exige 3:1.`}
    />
    <UjnDocGrid min={220}>
      <UjnDocCard icon="🔤" title="Texto">
        Menor razão: <strong>{ratio(lowestRatio('text', 'light'))}</strong> no claro (rótulo do botão
        destrutivo) e <strong>{ratio(lowestRatio('text', 'dark'))}</strong> no escuro (legenda sobre a
        fotografia).
      </UjnDocCard>
      <UjnDocCard icon="⭕" title="Gráfico">
        Menor razão: <strong>{ratio(lowestRatio('graphic', 'light'))}</strong> no claro e{' '}
        <strong>{ratio(lowestRatio('graphic', 'dark'))}</strong> no escuro.
      </UjnDocCard>
      <UjnDocCard icon="🚫" title="Fora da tabela">
        Divisores decorativos (<code>border-subtle</code>, <code>border-default</code>) e a ação
        desabilitada, isenta pela WCAG 1.4.3.
      </UjnDocCard>
    </UjnDocGrid>
    <ContrastTable />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Consumir só tokens semânticos --ujn-color-* nos componentes: eles já resolvem os dois temas.',
        'Compor a página como papel → cartão → sutil: background-page, background-card e background-subtle, separados por fio de 1px.',
        'Usar --ujn-color-border-rule para o fio grosso e o fio duplo do cabeçalho, e --ujn-color-border-control no contorno de campo e de controle.',
        'Usar --ujn-color-footer-* em tudo o que fica dentro do rodapé, nos dois temas.',
        'Usar --ujn-color-media-text e o véu --ujn-gradient-media-bottom para texto sobre fotografia.',
        'Trocar o tema pelo atributo data-ujn-theme no contêiner mais externo, deixando os componentes herdarem.',
      ]}
      donts={[
        'Derivar um tema por cálculo (inverter, clarear, color-mix, opacidade calculada).',
        'Usar var(--unooria-*) ou variáveis de outra marca dentro do Unoojornal.',
        'Escrever hexadecimal ou rgba() avulso em CSS de componente.',
        'Reintroduzir o dourado do arquivo de referência ou qualquer acento fora da escala brandpurple.',
        'Usar border-subtle como limite de campo: ele não passa de 3:1.',
        'Dar sombra a cartão, item de lista ou barra: a sombra é só de camada flutuante.',
        'Comunicar estado só pela cor: acompanhe de rótulo, glifo ou forma ("Atualizado agora", "Correção").',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Uma mesma peça resolvendo as variáveis nos dois temas."
    />
    <UjnDocThemeSwitcher>{() => <ThemeSample />}</UjnDocThemeSwitcher>
    <UjnDocStage label="Rodapé escuro (invariante)" surface="footer" theme="light">
      <FooterSample />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="8. Referência completa da API de cores"
      description="Exportações de src/unoojornal/tokens/colors.ts."
    />
    <UjnDocPropsTable
      title="Exportações"
      rows={[
        { name: 'ujnColorTokens', type: 'Record<UjnColorKey, UjnColorToken>', description: 'Tokens que variam com o tema, com valor e origem em cada um.' },
        { name: 'ujnInvariantColors', type: 'Record<UjnInvariantColorKey, UjnInvariantColorToken>', description: 'Tokens invariantes: rodapé, mídia e aparelho.' },
        { name: 'ujnColorGroups', type: 'readonly string[]', description: 'Ordem dos grupos na documentação.' },
        { name: 'ujnColorThemes', type: 'Record<UjnTheme, Record<UjnColorKey, string>>', description: 'Valores resolvidos de cada tema, por chave.' },
        { name: 'ujnColorCssVars', type: 'Record<UjnColorKey | UjnInvariantColorKey, string>', description: 'Referências var(--ujn-…) prontas para estilo inline.' },
        { name: 'ujnGradients', type: 'Record<"mediaBottom" | "ruleDouble", { cssVar; usage }>', description: 'O véu da base da fotografia e o fio duplo da tinta.' },
        { name: 'ujnContrastPairs', type: 'readonly UjnContrastPair[]', description: 'Pares de uso real com a razão medida em cada tema.' },
        { name: 'UjnTheme', type: "'light' | 'dark'", description: 'Temas do módulo.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnContrastPair"
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
    <UjnDocPropsTable
      title="UjnColorToken e UjnInvariantColorToken"
      rows={[
        { name: 'cssVar', type: 'string', description: 'Nome da variável CSS.' },
        { name: 'group', type: 'string', description: 'Grupo de exibição.' },
        { name: 'usage', type: 'string', description: 'Onde o token é aplicado.' },
        { name: 'light / dark', type: 'UjnColorValue', description: 'Só em UjnColorToken: { value, unooria } de cada tema.' },
        { name: 'value / unooria', type: 'string', description: 'Só em UjnInvariantColorToken: literal e token de origem.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoojornal/Fundamentos/Cores',
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
 * O véu da base da fotografia e o fio duplo da tinta.
 */
export const Gradientes: Story = {
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Gradientes compostos" />
      <GradientSamples />
    </UnooriaDocShell>
  ),
};

/**
 * Tabela completa de contraste. O `play` confere que a tabela tem todos os
 * pares e que nenhum reprova.
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
    await expect(rows).toHaveLength(ujnContrastPairs.length + 1);
    await expect(canvasElement.querySelectorAll('[data-ujn-contrast-result="reprova"]')).toHaveLength(0);
  },
};

/**
 * A mesma peça nos dois temas, lado a lado, mais o rodapé invariante.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UjnDocStage
          key={theme}
          label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
          theme={theme}
          gap={12}
        >
          <ThemeSample />
        </UjnDocStage>
      ))}
    </div>
  ),
};
