import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  ujnAvatarSizes,
  ujnIconSizes,
  ujnLayers,
  ujnLayout,
  ujnRadius,
  ujnRule,
  ujnSpacing,
  ujnSpacingOrder,
  ujnTransitions,
} from '../../../src/unoojornal/tokens';
import { PhoneFrame } from '../../../src/unoojornal/components/PhoneFrame';
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
} from '../../../.storybook/components';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DOC = {
  text: 'var(--ujn-color-text-primary)',
  muted: 'var(--ujn-color-text-secondary)',
  border: 'var(--ujn-color-border-subtle)',
} as const;

/** Pontos de quebra por contêiner (o CSS de `@container` não aceita variáveis). */
const BREAKPOINTS = { wide: 960, medium: 640 } as const;

/** Variável CSS e uso de cada chave de `ujnLayout`. */
const LAYOUT_VARS: Record<keyof typeof ujnLayout, { cssVar: string; usage: string }> = {
  pageWidth: { cssVar: '--ujn-page-width', usage: 'Largura do conteúdo da página, dentro do quadro de 1440px.' },
  readingWidth: { cssVar: '--ujn-reading-width', usage: 'Coluna de leitura da matéria aberta.' },
  sidebarWidth: { cssVar: '--ujn-sidebar-width', usage: 'Barra lateral da capa, com opinião e agenda.' },
  editionBarHeight: { cssVar: '--ujn-edition-bar-height', usage: 'Faixa de edição no alto do cabeçalho.' },
  navHeight: { cssVar: '--ujn-nav-height', usage: 'Linha da navegação principal.' },
  articleBarHeight: { cssVar: '--ujn-article-bar-height', usage: 'Barra superior do leitor de matéria.' },
  progressHeight: { cssVar: '--ujn-progress-height', usage: 'Barra de progresso de leitura, na base da barra da matéria.' },
  touchTarget: { cssVar: '--ujn-touch-target', usage: 'Alvo mínimo de toque.' },
  gutter: { cssVar: '--ujn-gutter', usage: 'Margem lateral padrão no móvel.' },
  gutterWide: { cssVar: '--ujn-gutter-wide', usage: 'Margem lateral na página de área de trabalho.' },
  desktopWidth: { cssVar: '--ujn-desktop-width', usage: 'Largura do quadro de área de trabalho da documentação.' },
  desktopHeight: { cssVar: '--ujn-desktop-height', usage: 'Altura do quadro de área de trabalho da documentação.' },
  desktopChromeHeight: { cssVar: '--ujn-desktop-chrome-height', usage: 'Barra do navegador do quadro de área de trabalho.' },
  screenWidth: { cssVar: '--ujn-screen-width', usage: 'Largura da tela do aparelho.' },
  screenHeight: { cssVar: '--ujn-screen-height', usage: 'Altura da tela do aparelho.' },
  statusbarHeight: { cssVar: '--ujn-statusbar-height', usage: 'Barra de status; vira a área segura superior.' },
  homeIndicatorHeight: { cssVar: '--ujn-home-indicator-height', usage: 'Barra de gesto; vira a área segura inferior.' },
};

/** Variável CSS de cada fio. */
const RULE_VARS: Record<keyof typeof ujnRule, { cssVar: string; usage: string }> = {
  thin: { cssVar: '--ujn-rule-thin', usage: 'Fio fino: divisores e contornos de 1px.' },
  thick: { cssVar: '--ujn-rule-thick', usage: 'Fio grosso do cabeçalho, na cor da tinta.' },
  doubleHeight: { cssVar: '--ujn-rule-double-height', usage: 'Fio duplo do cabeçalho: 3px, vão de 2px e 1px, em gradiente.' },
};

/** Uso de cada camada de empilhamento. */
const Z_USAGE: Record<keyof typeof ujnLayers, string> = {
  bar: 'Barra da matéria e cabeçalho colados sobre o conteúdo.',
  progress: 'Barra de progresso de leitura, acima da barra da matéria.',
  sheet: 'Folhas inferiores e menus.',
  dialog: 'Diálogos de confirmação e de carta à redação.',
  toast: 'Aviso passageiro, acima de tudo o que é conteúdo.',
  statusbar: 'Barra de status e barra de gesto do aparelho, sempre por cima.',
};

const caption: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  color: DOC.muted,
};

/** Barras da escala de espaçamento. */
const SpacingScale: React.FC = () => (
  <div data-ujn-theme="light" style={{ display: 'grid', gap: 8, marginBottom: 28 }}>
    {ujnSpacingOrder.map((key) => (
      <div key={key} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: 16 }}>
        <span style={caption}>
          --ujn-spacing-{key} · {ujnSpacing[key]}px
        </span>
        <span
          style={{
            display: 'block',
            width: `var(--ujn-spacing-${key})`,
            height: 16,
            borderRadius: 'var(--ujn-radius-xs)',
            background: 'var(--ujn-color-action-primary)',
          }}
        />
      </div>
    ))}
  </div>
);

/** Amostras dos raios: o jornal é reto, só a pílula e o avatar arredondam. */
const Radii: React.FC = () => (
  <UjnDocStage gap={20} align="flex-start">
    {(Object.entries(ujnRadius) as [keyof typeof ujnRadius, number][]).map(([key, value]) => (
      <div key={key} style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: `var(--ujn-radius-${key})`,
            background: 'var(--ujn-color-background-subtle)',
            border: '1px solid var(--ujn-color-border-default)',
          }}
        />
        <div style={{ ...caption, marginTop: 6 }}>
          {key} · {value}px
        </div>
      </div>
    ))}
  </UjnDocStage>
);

/** Tamanhos de ícone e de avatar, lado a lado. */
const Sizes: React.FC = () => (
  <UjnDocStage gap={28} align="flex-start">
    {(Object.entries(ujnIconSizes) as [keyof typeof ujnIconSizes, { px: number; unooria: string }][]).map(
      ([key, size]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <Icon name="schedule" size={key} tone="accent" />
          <div style={{ ...caption, marginTop: 6 }}>
            ícone {key} · {size.px}px
          </div>
        </div>
      )
    )}
    {(Object.entries(ujnAvatarSizes) as [keyof typeof ujnAvatarSizes, number][]).map(([key, value]) => (
      <div key={key} style={{ textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            width: `var(--ujn-avatar-${key})`,
            height: `var(--ujn-avatar-${key})`,
            borderRadius: 'var(--ujn-radius-full)',
            background: 'var(--ujn-color-background-subtle)',
            border: '1px solid var(--ujn-color-border-default)',
          }}
        />
        <div style={{ ...caption, marginTop: 6 }}>
          avatar {key} · {value}px
        </div>
      </div>
    ))}
  </UjnDocStage>
);

/** Largura de uma medida em relação ao conteúdo da página. */
const ofPage = (value: number) => `${(value / ujnLayout.pageWidth) * 100}%`;

/**
 * Proporções da página: o quadro de 1440px, o conteúdo de 1280px (margem de 80px
 * de cada lado), a coluna de leitura e a barra lateral, todos em escala.
 */
const PageProportions: React.FC = () => {
  const row = (label: string, value: number, cssVar: string) => (
    <div style={{ display: 'grid', gap: 4 }}>
      <div
        data-ujn-proportion={cssVar}
        style={{
          width: ofPage(value),
          minHeight: 28,
          boxSizing: 'border-box',
          background: 'var(--ujn-color-background-subtle)',
          border: '1px solid var(--ujn-color-border-control)',
          borderRadius: 'var(--ujn-radius-xs)',
        }}
      />
      <span style={caption}>
        {label} · {cssVar} · {value}px
      </span>
    </div>
  );
  return (
    <UjnDocStage surface="card" align="stretch" direction="column" gap={14} padding={24}>
      <div style={{ display: 'grid', gap: 4 }}>
        <div
          style={{
            display: 'flex',
            height: 28,
            background: 'var(--ujn-color-background-page)',
            border: '1px solid var(--ujn-color-border-default)',
            borderRadius: 'var(--ujn-radius-xs)',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: `${(ujnLayout.gutterWide / ujnLayout.desktopWidth) * 100}%` }} />
          <div
            style={{
              flex: 1,
              background: 'var(--ujn-color-fill-field)',
              borderLeft: '1px solid var(--ujn-color-border-control)',
              borderRight: '1px solid var(--ujn-color-border-control)',
            }}
          />
          <div style={{ width: `${(ujnLayout.gutterWide / ujnLayout.desktopWidth) * 100}%` }} />
        </div>
        <span style={caption}>
          quadro · --ujn-desktop-width · {ujnLayout.desktopWidth}px, com --ujn-gutter-wide de {ujnLayout.gutterWide}px de cada lado
        </span>
      </div>
      {row('conteúdo da página', ujnLayout.pageWidth, '--ujn-page-width')}
      {row('coluna de leitura', ujnLayout.readingWidth, '--ujn-reading-width')}
      {row('barra lateral', ujnLayout.sidebarWidth, '--ujn-sidebar-width')}
    </UjnDocStage>
  );
};

/**
 * As faixas horizontais do cabeçalho e do leitor, com as alturas reais dos
 * tokens: barra de edição, navegação e barra da matéria com a barra de progresso.
 */
const Bars: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const barBase: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: '0 var(--ujn-spacing-l)',
    fontFamily: 'var(--ujn-font-sans)',
    fontSize: 'var(--ujn-font-label-size)',
    fontWeight: 'var(--ujn-font-label-weight)' as React.CSSProperties['fontWeight'],
    color: 'var(--ujn-color-text-primary)',
  };
  return (
    <UjnDocStage surface="page" theme={theme} align="stretch" direction="column" gap={0} padding={0}>
      <div
        data-ujn-bar="edition"
        style={{
          ...barBase,
          height: 'var(--ujn-edition-bar-height)',
          background: 'var(--ujn-color-background-subtle)',
          borderBottom: 'var(--ujn-rule-thick) solid var(--ujn-color-border-rule)',
        }}
      >
        Barra de edição · {ujnLayout.editionBarHeight}px · fio grosso de {ujnRule.thick}px
      </div>
      <div style={{ height: 24 }} />
      <div
        data-ujn-bar="nav"
        style={{
          ...barBase,
          height: 'var(--ujn-nav-height)',
          background: 'var(--ujn-color-background-card)',
          borderBottom: 'var(--ujn-rule-thin) solid var(--ujn-color-border-subtle)',
        }}
      >
        Navegação principal · {ujnLayout.navHeight}px · fio fino de {ujnRule.thin}px
      </div>
      <div style={{ height: 24 }} />
      <div
        data-ujn-bar="article"
        style={{
          ...barBase,
          position: 'relative',
          height: 'var(--ujn-article-bar-height)',
          background: 'var(--ujn-color-surface-bar)',
        }}
      >
        Barra da matéria · {ujnLayout.articleBarHeight}px
        <span
          aria-hidden="true"
          data-ujn-bar-progress=""
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '42%',
            height: 'var(--ujn-progress-height)',
            background: 'var(--ujn-color-action-primary)',
          }}
        />
      </div>
      <div style={{ ...caption, padding: '8px var(--ujn-spacing-l)' }}>
        progresso de leitura · --ujn-progress-height · {ujnLayout.progressHeight}px · alvo de toque mínimo{' '}
        {ujnLayout.touchTarget}px
      </div>
    </UjnDocStage>
  );
};

/** Os três fios da tinta, com as medidas dos tokens. */
const Rules: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <UjnDocStage surface="page" theme={theme} align="stretch" direction="column" gap={20} padding={24}>
    {(
      [
        { key: 'thin', background: 'var(--ujn-color-border-rule)', height: 'var(--ujn-rule-thin)' },
        { key: 'thick', background: 'var(--ujn-color-border-rule)', height: 'var(--ujn-rule-thick)' },
        { key: 'doubleHeight', background: 'var(--ujn-gradient-rule-double)', height: 'var(--ujn-rule-double-height)' },
      ] as const
    ).map((rule) => (
      <div key={rule.key} style={{ display: 'grid', gap: 6 }}>
        <span
          aria-hidden="true"
          data-ujn-rule={rule.key}
          style={{ display: 'block', width: '100%', height: rule.height, background: rule.background }}
        />
        <span style={caption}>
          {RULE_VARS[rule.key].cssVar} · {ujnRule[rule.key]}px — {RULE_VARS[rule.key].usage}
        </span>
      </div>
    ))}
  </UjnDocStage>
);

/**
 * CSS da demonstração dos pontos de quebra por contêiner. Declarado aqui porque
 * variáveis CSS não entram em `@container`: 960px e 640px são literais, como em
 * `spacing.css`.
 */
const BREAKPOINT_CSS = `
.ujn-doc-bp { container-type: inline-size; }
.ujn-doc-bp__grid { display: grid; gap: var(--ujn-spacing-m); grid-template-columns: 1fr; padding: var(--ujn-spacing-l); }
.ujn-doc-bp__block {
  min-height: 64px;
  box-sizing: border-box;
  padding: var(--ujn-spacing-m);
  background: var(--ujn-color-background-card);
  border: 1px solid var(--ujn-color-border-default);
  border-radius: var(--ujn-radius-xs);
  font-family: var(--ujn-font-sans);
  font-size: var(--ujn-font-body-sm-size);
  line-height: var(--ujn-font-body-sm-line);
  color: var(--ujn-color-text-primary);
}
.ujn-doc-bp__level::after { content: 'compacto · uma coluna'; }
@container (min-width: ${BREAKPOINTS.medium}px) {
  .ujn-doc-bp__grid { grid-template-columns: repeat(2, 1fr); }
  .ujn-doc-bp__block--side { grid-column: 1 / -1; }
  .ujn-doc-bp__level::after { content: 'médio · duas colunas'; }
}
@container (min-width: ${BREAKPOINTS.wide}px) {
  .ujn-doc-bp__grid { grid-template-columns: 1fr 1fr var(--ujn-sidebar-width); }
  .ujn-doc-bp__block--side { grid-column: auto; }
  .ujn-doc-bp__level::after { content: 'largo · duas colunas e barra lateral'; }
}
`;

/**
 * A mesma composição em três contêineres de largura diferente. A janela é a
 * mesma nos três: quem decide o arranjo é a largura do contêiner.
 */
const Breakpoints: React.FC = () => (
  <div data-ujn-theme="light" style={{ marginBottom: 28 }}>
    <style>{BREAKPOINT_CSS}</style>
    <div style={{ display: 'grid', gap: 20, overflowX: 'auto' }}>
      {[1000, 700, 400].map((width) => (
        <div key={width}>
          <div style={{ ...caption, marginBottom: 6 }}>contêiner de {width}px</div>
          <div
            className="ujn-doc-bp"
            data-ujn-bp={width}
            style={{
              width,
              flexShrink: 0,
              background: 'var(--ujn-color-background-page)',
              border: '1px solid var(--ujn-color-border-subtle)',
              borderRadius: 'var(--ujn-radius-xs)',
            }}
          >
            <div className="ujn-doc-bp__grid" data-ujn-bp-grid={width}>
              <div className="ujn-doc-bp__block">Matéria de capa</div>
              <div className="ujn-doc-bp__block">Segunda matéria</div>
              <div className="ujn-doc-bp__block ujn-doc-bp__block--side">
                Barra lateral · <span className="ujn-doc-bp__level" style={{ color: 'var(--ujn-color-text-accent)' }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Camadas de empilhamento, desenhadas como cartões sobrepostos. */
const Layers: React.FC = () => {
  const entries = Object.entries(ujnLayers) as [keyof typeof ujnLayers, number][];
  return (
    <UjnDocStage surface="subtle" align="flex-start">
      <div style={{ position: 'relative', width: 360, height: 60 + entries.length * 34 }}>
        {entries.map(([key, value], index) => (
          <div
            key={key}
            style={{
              position: 'absolute',
              left: index * 18,
              top: index * 34,
              zIndex: `var(--ujn-z-${key})` as unknown as number,
              width: 250,
              padding: '8px 12px',
              borderRadius: 'var(--ujn-radius-m)',
              background: 'var(--ujn-color-background-elevated)',
              boxShadow: 'var(--ujn-elevation-overlay)',
              fontFamily: 'var(--ujn-font-sans)',
              fontSize: 'var(--ujn-font-caption-size)',
              color: 'var(--ujn-color-text-primary)',
            }}
          >
            <strong>--ujn-z-{key}</strong> · {value}
          </div>
        ))}
      </div>
    </UjnDocStage>
  );
};

/**
 * As áreas seguras dentro do aparelho: o recuo sutil é o que barras e folhas
 * somam; o cartão é o que sobra entre a barra de status e a de gesto.
 */
const SafeAreas: React.FC<{ statusBar?: boolean; homeIndicator?: boolean; label: string }> = ({
  statusBar = true,
  homeIndicator = true,
  label,
}) => (
  <PhoneFrame scale={0.5} statusBar={statusBar} homeIndicator={homeIndicator} ariaLabel={label}>
    <div
      data-ujn-safe-area-demo=""
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--ujn-safe-area-top)',
        paddingBottom: 'var(--ujn-safe-area-bottom)',
        background: 'var(--ujn-color-background-subtle)',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 var(--ujn-gutter)',
          background: 'var(--ujn-color-background-card)',
          border: '2px dashed var(--ujn-color-border-control)',
          borderRadius: 'var(--ujn-radius-xs)',
          fontFamily: 'var(--ujn-font-sans)',
          fontSize: 'var(--ujn-font-title-md-size)',
          color: 'var(--ujn-color-text-primary)',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  </PhoneFrame>
);

/**
 * Página de documentação rica de espaçamento e layout.
 */
const EspacamentoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description={`Medidas do jornal sobre o quadro de ${ujnLayout.desktopWidth}px — conteúdo de ${ujnLayout.pageWidth}px, coluna de leitura de ${ujnLayout.readingWidth}px e barra lateral de ${ujnLayout.sidebarWidth}px — e sobre a tela móvel de ${ujnLayout.screenWidth} × ${ujnLayout.screenHeight}px: escala de espaçamento de ${ujnSpacingOrder.length} degraus (${ujnSpacing['4xs']} a ${ujnSpacing['5xl']}px), raios retos, os três fios da tinta, alturas das barras, pontos de quebra por contêiner, áreas seguras e camadas de empilhamento.`}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UjnDocGrid>
      <UjnDocCard icon="📏" title="Escala fina">
        De 2 a 64px, com os degraus de 6 e 10px preservados: as alturas das barras (40, 44 e 74px)
        só fecham a conta com eles.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Página em colunas">
        Conteúdo de <code>--ujn-page-width</code> (1280px), prosa em <code>--ujn-reading-width</code>{' '}
        (740px) e barra lateral de <code>--ujn-sidebar-width</code> (384px) com opinião e agenda.
      </UjnDocCard>
      <UjnDocCard icon="🖋️" title="Fios da tinta">
        Três fios — fino (1px), grosso (3px) e duplo (6px, em gradiente) — compõem o cabeçalho e
        separam as faixas. O jornal se organiza por fio, não por sombra.
      </UjnDocCard>
      <UjnDocCard icon="📦" title="Quebra por contêiner">
        Largo a partir de 960px, médio a partir de 640px e compacto abaixo. A medida é a do{' '}
        <strong>contêiner</strong>, não a da janela: a página também aparece em quadros de
        documentação estreitos.
      </UjnDocCard>
      <UjnDocCard icon="📱" title="Áreas seguras e camadas">
        <code>--ujn-safe-area-top</code> e <code>-bottom</code> valem 0 fora do aparelho; o{' '}
        <code>PhoneFrame</code> as redefine em 47 e 34px. Seis degraus de <code>z-index</code>, todos
        dentro da tela.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UjnDocSpecs
      component="../tokens"
      layout={`Página · ${ujnLayout.pageWidth}px · tela · ${ujnLayout.screenWidth} × ${ujnLayout.screenHeight}px`}
      specs={[
        { label: 'Conteúdo da página', value: `--ujn-page-width · ${ujnLayout.pageWidth}px` },
        { label: 'Coluna de leitura', value: `--ujn-reading-width · ${ujnLayout.readingWidth}px` },
        { label: 'Barra lateral', value: `--ujn-sidebar-width · ${ujnLayout.sidebarWidth}px` },
        { label: 'Barra de edição', value: `${ujnLayout.editionBarHeight}px` },
        { label: 'Navegação', value: `${ujnLayout.navHeight}px` },
        { label: 'Barra da matéria', value: `${ujnLayout.articleBarHeight}px + progresso de ${ujnLayout.progressHeight}px` },
        { label: 'Fios', value: `${ujnRule.thin} · ${ujnRule.thick} · ${ujnRule.doubleHeight}px` },
        { label: 'Alvo de toque', value: `--ujn-touch-target · ${ujnLayout.touchTarget}px` },
        { label: 'Pontos de quebra', value: `${BREAKPOINTS.wide}px · ${BREAKPOINTS.medium}px (contêiner)` },
        { label: 'Margem lateral', value: `${ujnLayout.gutter}px móvel · ${ujnLayout.gutterWide}px página` },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Medidas próprias do módulo',
          detail:
            'a escala de espaçamento, os raios e as dimensões estruturais não são cópia da Unooria (cuja régua de 4/8px deslocaria as barras de altura fixa); só os tamanhos de ícone citam origem na plataforma (--unooria-icon-size-*).',
        },
        {
          subject: 'Jornal reto',
          detail:
            'os raios são pequenos — xs 2px e s 4px — e só a pílula de filtro (full) e o avatar arredondam. m (8px) e l (12px) existem na escala para as camadas flutuantes. Cartão de matéria, caixa lateral e imagem são retos: a hierarquia vem do fio e da camada.',
        },
        {
          subject: 'Fios da tinta como medida',
          detail:
            'o fio fino (1px), o grosso (3px) e o duplo (6px: 3px, vão de 2px e 1px) são tokens de medida; a cor é --ujn-color-border-rule e o duplo é o gradiente --ujn-gradient-rule-double. Os fios de 1px de separação entre barras e conteúdo são box-shadow sem desfoque (ver Elevação & Gradientes).',
        },
        {
          subject: 'Pontos de quebra por contêiner, não por janela',
          detail:
            'o jornal aparece em quadros de documentação mais estreitos que a janela, então todo componente de página declara container-type: inline-size e quebra com @container: largo ≥ 960px (duas colunas e barra lateral), médio ≥ 640px, compacto abaixo. Variáveis CSS não entram em @container, por isso 960 e 640 são literais, registrados em spacing.css.',
        },
        {
          subject: 'Área segura como variável, não como padding fixo',
          detail:
            'a mesma barra funciona dentro e fora do aparelho: fora, a área segura vale 0 e a barra encosta no topo; dentro, o PhoneFrame a redefine (47px e 34px) e o conteúdo corre por baixo da barra de status.',
        },
        {
          subject: 'Camadas dentro da tela, com o progresso de leitura',
          detail:
            'as sobreposições são absolutas na tela do aparelho e escolhem um degrau --ujn-z-*: a folha (30) abre sobre a barra (10) e o progresso (15), o aviso (50) sobre o diálogo (40), e a barra de status (60) sobre tudo. O progresso de leitura (15) é o degrau próprio do jornal, entre a barra e a folha.',
        },
        {
          subject: 'Raio "full" de 1000px',
          detail:
            'é o valor literal da plataforma para cápsulas; não é arbitrário e não deve virar 50%, que ovalaria uma pílula larga.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia da página"
      description="As faixas de uma página do jornal, de cima para baixo."
    />
    <UjnDocAnatomy
      zones={[
        { name: 'Barra de edição', role: 'Instituição, edição, data e marcador de atualização.', token: `--ujn-edition-bar-height · ${ujnLayout.editionBarHeight}px` },
        { name: 'Título da publicação', role: 'Nome em Masthead e linha de apoio, com o fio duplo do cabeçalho.', token: `--ujn-rule-double-height · ${ujnRule.doubleHeight}px` },
        { name: 'Navegação', role: 'Seções do jornal, com rolagem horizontal no compacto.', token: `--ujn-nav-height · ${ujnLayout.navHeight}px` },
        { name: 'Conteúdo', role: 'Matéria de capa e lista em colunas; barra lateral com opinião e agenda.', token: `--ujn-page-width · ${ujnLayout.pageWidth}px · --ujn-sidebar-width · ${ujnLayout.sidebarWidth}px` },
        { name: 'Matéria aberta', role: 'Barra da matéria com progresso e coluna de leitura.', token: `--ujn-article-bar-height · ${ujnLayout.articleBarHeight}px · --ujn-reading-width · ${ujnLayout.readingWidth}px` },
        { name: 'Rodapé', role: 'Bloco escuro com colunas de links.', token: '--ujn-spacing-* · --ujn-color-footer-*' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de medidas" />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Escala de espaçamento</h4>
    <SpacingScale />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Raios</h4>
    <Radii />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Ícones e avatares</h4>
    <Sizes />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Proporções da página</h4>
    <PageProportions />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Alturas das barras</h4>
    <Bars />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Fios da tinta</h4>
    <Rules />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Pontos de quebra por contêiner</h4>
    <Breakpoints />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Áreas seguras</h4>
    <UjnDocStage surface="subtle" align="flex-start" gap={32}>
      <SafeAreas label="Com as duas barras" />
      <SafeAreas label="Sem barras de sistema" statusBar={false} homeIndicator={false} />
    </UjnDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Camadas de empilhamento</h4>
    <Layers />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UjnDocPractices
      dos={[
        'Quebrar o layout com @container (largo ≥ 960px, médio ≥ 640px) e declarar container-type: inline-size nos componentes de página.',
        'Somar --ujn-safe-area-top e --ujn-safe-area-bottom ao recuo de toda barra, folha e leitor.',
        'Usar --ujn-gutter como margem lateral no móvel e --ujn-gutter-wide na página de área de trabalho.',
        'Manter a prosa na coluna de --ujn-reading-width e a barra lateral em --ujn-sidebar-width.',
        'Garantir alvos de pelo menos --ujn-touch-target (44px) em tudo que se toca.',
        'Escolher uma camada --ujn-z-* para cada sobreposição, em vez de um número solto.',
      ]}
      donts={[
        'Usar @media de janela para quebrar o layout de um componente: a página aparece em contêineres mais estreitos que a janela.',
        'Arredondar cartão, imagem ou caixa lateral: o jornal é reto; só a pílula e o avatar arredondam.',
        'Escrever 47px ou 34px no lugar da área segura: fora do aparelho a barra ficaria deslocada.',
        'Trocar o fio duplo por duas bordas: o gradiente garante os 3px, o vão de 2px e o 1px.',
        'Posicionar sobreposição com position: fixed na janela ou em portal: ela precisa ficar presa à tela.',
        'Usar z-index acima de --ujn-z-statusbar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As medidas não mudam com o tema; só as superfícies e a tinta acompanham."
    />
    <UjnDocThemeSwitcher>
      {(theme) => (
        <div style={{ display: 'grid', gap: 16, width: '100%' }}>
          <Bars theme={theme} />
          <Rules theme={theme} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de medidas" />
    <UjnDocPropsTable
      title="Dimensões estruturais (ujnLayout)"
      rows={(Object.keys(ujnLayout) as (keyof typeof ujnLayout)[]).map((key) => ({
        name: LAYOUT_VARS[key].cssVar,
        type: 'px',
        default: `${ujnLayout[key]}px`,
        description: LAYOUT_VARS[key].usage,
      }))}
    />
    <UjnDocPropsTable
      title="Fios da tinta (ujnRule)"
      rows={(Object.keys(ujnRule) as (keyof typeof ujnRule)[]).map((key) => ({
        name: RULE_VARS[key].cssVar,
        type: 'px',
        default: `${ujnRule[key]}px`,
        description: RULE_VARS[key].usage,
      }))}
    />
    <UjnDocPropsTable
      title="Áreas seguras"
      rows={[
        { name: '--ujn-safe-area-top', type: 'px', default: '0px', description: `Redefinida em ${ujnLayout.statusbarHeight}px pelo PhoneFrame com statusBar.` },
        { name: '--ujn-safe-area-bottom', type: 'px', default: '0px', description: `Redefinida em ${ujnLayout.homeIndicatorHeight}px pelo PhoneFrame com homeIndicator.` },
      ]}
    />
    <UjnDocPropsTable
      title="Camadas (ujnLayers)"
      rows={(Object.entries(ujnLayers) as [keyof typeof ujnLayers, number][]).map(([key, value]) => ({
        name: `--ujn-z-${key}`,
        type: 'number',
        default: String(value),
        description: Z_USAGE[key],
      }))}
    />
    <UjnDocPropsTable
      title="Movimento (ujnTransitions)"
      rows={(Object.entries(ujnTransitions) as [keyof typeof ujnTransitions, string][]).map(([key, value]) => ({
        name: `--ujn-transition-${key}`,
        type: 'transition',
        default: value,
        description: 'Duração e curva; cada componente deve desligar o movimento em prefers-reduced-motion.',
      }))}
    />
    <UjnDocPropsTable
      title="Tamanhos de ícone e de avatar"
      rows={[
        ...(Object.entries(ujnIconSizes) as [keyof typeof ujnIconSizes, { px: number; unooria: string }][]).map(([key, size]) => ({
          name: `--ujn-icon-size-${key}`,
          type: 'px',
          default: `${size.px}px`,
          description: `Degrau de ${size.unooria}.`,
        })),
        ...(Object.entries(ujnAvatarSizes) as [keyof typeof ujnAvatarSizes, number][]).map(([key, value]) => ({
          name: `--ujn-avatar-${key}`,
          type: 'px',
          default: `${value}px`,
          description: 'Diâmetro do avatar de autoria.',
        })),
      ]}
    />
    <UjnDocPropsTable
      title="Exportações de tokens/spacing.ts"
      rows={[
        { name: 'ujnSpacing / ujnSpacingOrder', type: 'Record<UjnSpacingToken, number> / UjnSpacingToken[]', description: 'Escala de espaçamento e a ordem de exibição.' },
        { name: 'ujnRadius', type: '{ xs; s; m; l; full }', description: 'Raios em pixels.' },
        { name: 'ujnLayout', type: 'Record<string, number>', description: 'Dimensões estruturais da página e dos quadros de documentação.' },
        { name: 'ujnRule', type: '{ thin; thick; doubleHeight }', description: 'Fios da tinta, em pixels.' },
        { name: 'ujnIconSizes', type: 'Record<UjnIconSize, { px; unooria }>', description: 'Tamanhos de ícone com a origem na Unooria.' },
        { name: 'ujnAvatarSizes', type: '{ sm: 24; md: 32; lg: 48 }', description: 'Diâmetros de avatar.' },
        { name: 'ujnLayers', type: 'Record<string, number>', description: 'Camadas de empilhamento.' },
        { name: 'ujnTransitions', type: '{ fast; base; slow }', description: 'Durações e curvas.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoojornal/Fundamentos/Espaçamento & Layout',
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa de espaçamento e layout.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EspacamentoDocumentationPage />,
};

/**
 * Escala de espaçamento e raios.
 */
export const TodasVariantes: Story = {
  name: '🎨 Escala e raios',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Escala de espaçamento" />
      <SpacingScale />
      <UnooriaDocSectionHeader barColor={BAR} title="Raios" />
      <Radii />
    </UnooriaDocShell>
  ),
};

/**
 * Proporções da página, alturas das barras e fios da tinta. O `play` confere que
 * cada medida resolve o valor da tabela.
 */
export const MedidasDaPagina: Story = {
  name: 'Medidas da página',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Proporções da página" />
      <PageProportions />
      <UnooriaDocSectionHeader barColor={BAR} title="Alturas das barras" />
      <Bars />
      <UnooriaDocSectionHeader barColor={BAR} title="Fios da tinta" />
      <Rules />
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const heightOf = (selector: string) =>
      getComputedStyle(canvasElement.querySelector<HTMLElement>(selector)!).height;
    await expect(heightOf('[data-ujn-bar="edition"]')).toBe(`${ujnLayout.editionBarHeight}px`);
    await expect(heightOf('[data-ujn-bar="nav"]')).toBe(`${ujnLayout.navHeight}px`);
    await expect(heightOf('[data-ujn-bar="article"]')).toBe(`${ujnLayout.articleBarHeight}px`);
    await expect(heightOf('[data-ujn-bar-progress]')).toBe(`${ujnLayout.progressHeight}px`);
    await expect(heightOf('[data-ujn-rule="thin"]')).toBe(`${ujnRule.thin}px`);
    await expect(heightOf('[data-ujn-rule="thick"]')).toBe(`${ujnRule.thick}px`);
    await expect(heightOf('[data-ujn-rule="doubleHeight"]')).toBe(`${ujnRule.doubleHeight}px`);
  },
};

/**
 * A mesma composição em contêineres de 1000, 700 e 400px. O `play` confere o
 * número de colunas de cada um: largo (3), médio (2) e compacto (1).
 */
export const PontosDeQuebra: Story = {
  name: 'Pontos de quebra por contêiner',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Pontos de quebra por contêiner" />
      <Breakpoints />
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const columns = (width: number) =>
      getComputedStyle(canvasElement.querySelector<HTMLElement>(`[data-ujn-bp-grid="${width}"]`)!)
        .gridTemplateColumns.split(' ').length;
    await expect(columns(1000)).toBe(3);
    await expect(columns(700)).toBe(2);
    await expect(columns(400)).toBe(1);
  },
};

/**
 * As áreas seguras com e sem as barras de sistema. O `play` confere que o
 * recuo vale a altura das barras dentro do aparelho e 0 sem elas.
 */
export const AreasSeguras: Story = {
  name: 'Áreas seguras',
  render: () => (
    <UjnDocStage surface="subtle" align="flex-start" gap={32}>
      <SafeAreas label="Com as duas barras" />
      <SafeAreas label="Sem barras de sistema" statusBar={false} homeIndicator={false} />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const [withBars, withoutBars] = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-ujn-safe-area-demo]')
    );
    await expect(getComputedStyle(withBars).paddingTop).toBe(`${ujnLayout.statusbarHeight}px`);
    await expect(getComputedStyle(withBars).paddingBottom).toBe(`${ujnLayout.homeIndicatorHeight}px`);
    await expect(getComputedStyle(withoutBars).paddingTop).toBe('0px');
    await expect(getComputedStyle(withoutBars).paddingBottom).toBe('0px');
  },
};

/**
 * Camadas de empilhamento.
 */
export const Camadas: Story = {
  name: 'Camadas de empilhamento',
  render: () => <Layers />,
};

/**
 * As barras e os fios nos dois temas: as medidas são as mesmas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
      <div>
        <p style={{ ...caption, margin: '0 0 6px 0' }}>Tema claro</p>
        <Bars theme="light" />
        <Rules theme="light" />
      </div>
      <div>
        <p style={{ ...caption, margin: '0 0 6px 0' }}>Tema escuro</p>
        <Bars theme="dark" />
        <Rules theme="dark" />
      </div>
    </div>
  ),
};
