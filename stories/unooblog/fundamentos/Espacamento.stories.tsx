import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  ublAvatarSizes,
  ublIconSizes,
  ublLayers,
  ublLayout,
  ublRadius,
  ublSpacing,
  ublSpacingOrder,
  ublTransitions,
} from '../../../src/unooblog/tokens';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
import { Icon } from '../../../src/unooblog/components/Icon';
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
} from '../../../.storybook/components';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DOC = {
  text: 'var(--ubl-color-text-primary)',
  muted: 'var(--ubl-color-text-secondary)',
  border: 'var(--ubl-color-border-subtle)',
} as const;

/** Pontos de quebra por contêiner (o CSS de `@container` não aceita variáveis). */
const BREAKPOINTS = { wide: 960, medium: 640 } as const;

/** Variável CSS e uso de cada chave de `ublLayout`. */
const LAYOUT_VARS: Record<keyof typeof ublLayout, { cssVar: string; usage: string }> = {
  pageWidth: { cssVar: '--ubl-page-width', usage: 'Largura do conteúdo da página, dentro do quadro de 1440px.' },
  readingWidth: { cssVar: '--ubl-reading-width', usage: 'Coluna de leitura do post aberto, na ordem de 68 caracteres por linha.' },
  sidebarWidth: { cssVar: '--ubl-sidebar-width', usage: 'Barra lateral do feed, com tópicos, séries e newsletter.' },
  tocWidth: { cssVar: '--ubl-toc-width', usage: 'Sumário lateral do post, que acompanha a rolagem no largo.' },
  siteHeaderHeight: { cssVar: '--ubl-site-header-height', usage: 'Cabeçalho do site: marca, navegação, busca e tema.' },
  progressHeight: { cssVar: '--ubl-progress-height', usage: 'Barra de progresso de leitura, na base do cabeçalho.' },
  touchTarget: { cssVar: '--ubl-touch-target', usage: 'Alvo mínimo de toque.' },
  gutter: { cssVar: '--ubl-gutter', usage: 'Margem lateral padrão no móvel.' },
  gutterWide: { cssVar: '--ubl-gutter-wide', usage: 'Margem lateral na página de área de trabalho.' },
  desktopWidth: { cssVar: '--ubl-desktop-width', usage: 'Largura do quadro de área de trabalho da documentação.' },
  desktopHeight: { cssVar: '--ubl-desktop-height', usage: 'Altura do quadro de área de trabalho da documentação.' },
  desktopChromeHeight: { cssVar: '--ubl-desktop-chrome-height', usage: 'Barra do navegador do quadro de área de trabalho.' },
  screenWidth: { cssVar: '--ubl-screen-width', usage: 'Largura da tela do aparelho.' },
  screenHeight: { cssVar: '--ubl-screen-height', usage: 'Altura da tela do aparelho.' },
  statusbarHeight: { cssVar: '--ubl-statusbar-height', usage: 'Barra de status; vira a área segura superior.' },
  homeIndicatorHeight: { cssVar: '--ubl-home-indicator-height', usage: 'Barra de gesto; vira a área segura inferior.' },
};

/** Uso de cada raio. */
const RADIUS_USAGE: Record<keyof typeof ublRadius, string> = {
  xs: 'Código em linha e marcas pequenas.',
  s: 'Imagens e blocos de aviso dentro de cartão.',
  m: 'Capas, bloco de código e folhas.',
  l: 'Cartões de post, de autor, de série e de newsletter.',
  xl: 'Superfícies grandes, como diálogos.',
  full: 'Cápsula: botões, chips, campos e avatares.',
};

/** Uso de cada camada de empilhamento. */
const Z_USAGE: Record<keyof typeof ublLayers, string> = {
  bar: 'Cabeçalho do site colado sobre o conteúdo.',
  progress: 'Barra de progresso de leitura, na base do cabeçalho.',
  sheet: 'Folhas inferiores, menus e o sumário recolhido do móvel.',
  dialog: 'Diálogos de confirmação e de compartilhamento.',
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
  <div data-ubl-theme="light" style={{ display: 'grid', gap: 8, marginBottom: 28 }}>
    {ublSpacingOrder.map((key) => (
      <div key={key} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: 16 }}>
        <span style={caption}>
          --ubl-spacing-{key} · {ublSpacing[key]}px
        </span>
        <span
          style={{
            display: 'block',
            width: `var(--ubl-spacing-${key})`,
            height: 16,
            borderRadius: 'var(--ubl-radius-xs)',
            background: 'var(--ubl-color-action-primary)',
          }}
        />
      </div>
    ))}
  </div>
);

/** Amostras dos raios: o blog é macio, e a cápsula é o formato dos controles. */
const Radii: React.FC = () => (
  <UblDocStage gap={20} align="flex-start">
    {(Object.entries(ublRadius) as [keyof typeof ublRadius, number][]).map(([key, value]) => (
      <div key={key} style={{ textAlign: 'center', width: 112 }}>
        <div
          data-ubl-radius={key}
          style={{
            width: 80,
            height: 80,
            margin: '0 auto',
            borderRadius: `var(--ubl-radius-${key})`,
            background: 'var(--ubl-color-background-card)',
            border: '1px solid var(--ubl-color-border-control)',
          }}
        />
        <div style={{ ...caption, marginTop: 6 }}>
          {key} · {value}px
        </div>
        <div style={{ fontSize: 11, color: DOC.muted, fontFamily: 'var(--ubl-font-sans)', marginTop: 2 }}>
          {RADIUS_USAGE[key]}
        </div>
      </div>
    ))}
  </UblDocStage>
);

/** Tamanhos de ícone e de avatar, lado a lado. */
const Sizes: React.FC = () => (
  <UblDocStage gap={28} align="flex-start">
    {(Object.entries(ublIconSizes) as [keyof typeof ublIconSizes, { px: number; unooria: string }][]).map(
      ([key, size]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <Icon name="schedule" size={key} tone="accent" />
          <div style={{ ...caption, marginTop: 6 }}>
            ícone {key} · {size.px}px
          </div>
        </div>
      )
    )}
    {(Object.entries(ublAvatarSizes) as [keyof typeof ublAvatarSizes, number][]).map(([key, value]) => (
      <div key={key} style={{ textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            width: `var(--ubl-avatar-${key})`,
            height: `var(--ubl-avatar-${key})`,
            borderRadius: 'var(--ubl-radius-full)',
            background: 'var(--ubl-color-background-subtle)',
            border: '1px solid var(--ubl-color-border-default)',
          }}
        />
        <div style={{ ...caption, marginTop: 6 }}>
          avatar {key} · {value}px
        </div>
      </div>
    ))}
  </UblDocStage>
);

/** Largura de uma medida em relação ao conteúdo da página. */
const ofPage = (value: number) => `${(value / ublLayout.pageWidth) * 100}%`;

/**
 * Proporções da página: o quadro de 1440px com o conteúdo de 1120px ao centro,
 * e a coluna de leitura, o sumário e a barra lateral, todos em escala sobre o
 * conteúdo.
 */
const PageProportions: React.FC = () => {
  const row = (label: string, value: number, cssVar: string) => (
    <div style={{ display: 'grid', gap: 4 }}>
      <div
        data-ubl-proportion={cssVar}
        style={{
          width: ofPage(value),
          minHeight: 28,
          boxSizing: 'border-box',
          background: 'var(--ubl-color-background-subtle)',
          border: '1px solid var(--ubl-color-border-control)',
          borderRadius: 'var(--ubl-radius-xs)',
        }}
      />
      <span style={caption}>
        {label} · {cssVar} · {value}px
      </span>
    </div>
  );
  const sideMargin = (ublLayout.desktopWidth - ublLayout.pageWidth) / 2;
  return (
    <UblDocStage surface="card" align="stretch" direction="column" gap={14} padding={24}>
      <div style={{ display: 'grid', gap: 4 }}>
        <div
          style={{
            display: 'flex',
            height: 28,
            background: 'var(--ubl-color-background-page)',
            border: '1px solid var(--ubl-color-border-default)',
            borderRadius: 'var(--ubl-radius-xs)',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: `${(sideMargin / ublLayout.desktopWidth) * 100}%` }} />
          <div
            style={{
              flex: 1,
              background: 'var(--ubl-color-fill-field)',
              borderLeft: '1px solid var(--ubl-color-border-control)',
              borderRight: '1px solid var(--ubl-color-border-control)',
            }}
          />
          <div style={{ width: `${(sideMargin / ublLayout.desktopWidth) * 100}%` }} />
        </div>
        <span style={caption}>
          quadro · --ubl-desktop-width · {ublLayout.desktopWidth}px, com {sideMargin}px livres de cada lado do conteúdo
        </span>
      </div>
      {row('conteúdo da página', ublLayout.pageWidth, '--ubl-page-width')}
      {row('coluna de leitura', ublLayout.readingWidth, '--ubl-reading-width')}
      {row('sumário lateral', ublLayout.tocWidth, '--ubl-toc-width')}
      {row('barra lateral', ublLayout.sidebarWidth, '--ubl-sidebar-width')}
    </UblDocStage>
  );
};

/**
 * O cabeçalho do site e a barra de progresso de leitura, com as alturas reais
 * dos tokens, e o alvo mínimo de toque.
 */
const Bars: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <UblDocStage surface="page" theme={theme} align="stretch" direction="column" gap={0} padding={0}>
    <div
      data-ubl-bar="header"
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ubl-spacing-m)',
        padding: '0 var(--ubl-gutter)',
        height: 'var(--ubl-site-header-height)',
        background: 'var(--ubl-color-surface-bar)',
        boxShadow: 'var(--ubl-elevation-hairline-bottom)',
        fontFamily: 'var(--ubl-font-sans)',
        fontSize: 'var(--ubl-font-label-size)',
        fontWeight: 'var(--ubl-font-label-weight)' as React.CSSProperties['fontWeight'],
        color: 'var(--ubl-color-text-primary)',
      }}
    >
      Cabeçalho do site · {ublLayout.siteHeaderHeight}px
      <span
        aria-hidden="true"
        data-ubl-bar-progress=""
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '42%',
          height: 'var(--ubl-progress-height)',
          background: 'var(--ubl-color-action-primary)',
        }}
      />
    </div>
    <div style={{ ...caption, padding: '8px var(--ubl-gutter)' }}>
      progresso de leitura · --ubl-progress-height · {ublLayout.progressHeight}px, na base do cabeçalho
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px var(--ubl-gutter) 16px' }}>
      <span
        data-ubl-touch=""
        style={{
          boxSizing: 'border-box',
          width: 'var(--ubl-touch-target)',
          height: 'var(--ubl-touch-target)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ubl-color-fill-field)',
          border: '1px solid var(--ubl-color-border-control)',
          borderRadius: 'var(--ubl-radius-full)',
        }}
      >
        <Icon name="search" size="md" />
      </span>
      <span style={caption}>alvo de toque · --ubl-touch-target · {ublLayout.touchTarget}px</span>
    </div>
  </UblDocStage>
);

/** As duas margens laterais, como faixas livres de cada lado de uma coluna. */
const Gutters: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <UblDocStage surface="page" theme={theme} align="stretch" direction="column" gap={16} padding={24}>
    {(
      [
        { key: 'gutter', value: ublLayout.gutter, label: 'móvel' },
        { key: 'gutterWide', value: ublLayout.gutterWide, label: 'página de área de trabalho' },
      ] as const
    ).map((item) => (
      <div key={item.key} style={{ display: 'grid', gap: 4 }}>
        <div
          style={{
            display: 'flex',
            height: 28,
            border: '1px solid var(--ubl-color-border-default)',
            borderRadius: 'var(--ubl-radius-xs)',
            overflow: 'hidden',
          }}
        >
          <div
            data-ubl-gutter={item.key}
            style={{
              width: `var(${LAYOUT_VARS[item.key].cssVar})`,
              background: 'var(--ubl-color-background-subtle)',
            }}
          />
          <div style={{ flex: 1, background: 'var(--ubl-color-background-card)' }} />
          <div style={{ width: `var(${LAYOUT_VARS[item.key].cssVar})`, background: 'var(--ubl-color-background-subtle)' }} />
        </div>
        <span style={caption}>
          {LAYOUT_VARS[item.key].cssVar} · {item.value}px de cada lado — {item.label}
        </span>
      </div>
    ))}
  </UblDocStage>
);

/**
 * CSS da demonstração dos pontos de quebra por contêiner. Declarado aqui porque
 * variáveis CSS não entram em `@container`: 960px e 640px são literais, como em
 * `spacing.css`.
 */
const BREAKPOINT_CSS = `
.ubl-doc-bp { container-type: inline-size; }
.ubl-doc-bp__page {
  box-sizing: border-box;
  display: grid;
  gap: var(--ubl-spacing-l);
  padding: var(--ubl-spacing-l) var(--ubl-gutter);
}
.ubl-doc-bp__post, .ubl-doc-bp__feed {
  display: grid;
  gap: var(--ubl-spacing-m);
  grid-template-columns: minmax(0, 1fr);
}
.ubl-doc-bp__block {
  min-height: 64px;
  box-sizing: border-box;
  padding: var(--ubl-spacing-m);
  background: var(--ubl-color-background-card);
  border: 1px solid var(--ubl-color-border-subtle);
  border-radius: var(--ubl-radius-l);
  font-family: var(--ubl-font-sans);
  font-size: var(--ubl-font-body-md-size);
  line-height: var(--ubl-font-body-md-line);
  color: var(--ubl-color-text-primary);
}
.ubl-doc-bp__toc::after { content: ' · bloco recolhível no topo'; color: var(--ubl-color-text-accent); }
.ubl-doc-bp__level::after { content: 'compacto · uma coluna'; }
@container (min-width: ${BREAKPOINTS.medium}px) {
  .ubl-doc-bp__page { padding-inline: var(--ubl-gutter-wide); }
  .ubl-doc-bp__feed { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ubl-doc-bp__article { max-width: var(--ubl-reading-width); margin-inline: auto; width: 100%; }
  .ubl-doc-bp__level::after { content: 'médio · feed em duas colunas'; }
}
@container (min-width: ${BREAKPOINTS.wide}px) {
  .ubl-doc-bp__post {
    grid-template-columns: var(--ubl-toc-width) minmax(0, var(--ubl-reading-width));
    justify-content: center;
    column-gap: var(--ubl-spacing-3xl);
  }
  .ubl-doc-bp__article { max-width: none; margin-inline: 0; }
  .ubl-doc-bp__feed { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ubl-doc-bp__toc::after { content: ' · lateral, acompanha a rolagem'; }
  .ubl-doc-bp__level::after { content: 'largo · sumário lateral e feed em três colunas'; }
}
`;

/**
 * A mesma composição em três contêineres de largura diferente. A janela é a
 * mesma nos três: quem decide o arranjo é a largura do contêiner.
 */
const Breakpoints: React.FC = () => (
  <div data-ubl-theme="light" style={{ marginBottom: 28 }}>
    <style>{BREAKPOINT_CSS}</style>
    <div style={{ display: 'grid', gap: 20, overflowX: 'auto' }}>
      {[1000, 700, 400].map((width) => (
        <div key={width}>
          <div style={{ ...caption, marginBottom: 6 }}>
            contêiner de {width}px · <span className="ubl-doc-bp__level" />
          </div>
          <div
            className="ubl-doc-bp"
            data-ubl-bp={width}
            style={{
              width,
              flexShrink: 0,
              background: 'var(--ubl-color-background-page)',
              border: '1px solid var(--ubl-color-border-subtle)',
              borderRadius: 'var(--ubl-radius-m)',
            }}
          >
            <div className="ubl-doc-bp__page">
              <div className="ubl-doc-bp__post" data-ubl-bp-post={width}>
                <div className="ubl-doc-bp__block ubl-doc-bp__toc">Sumário</div>
                <div className="ubl-doc-bp__block ubl-doc-bp__article">Post · coluna de leitura</div>
              </div>
              <div className="ubl-doc-bp__feed" data-ubl-bp-feed={width}>
                <div className="ubl-doc-bp__block">Post 1</div>
                <div className="ubl-doc-bp__block">Post 2</div>
                <div className="ubl-doc-bp__block">Post 3</div>
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
  const entries = Object.entries(ublLayers) as [keyof typeof ublLayers, number][];
  return (
    <UblDocStage surface="subtle" align="flex-start">
      <div style={{ position: 'relative', width: 360, height: 60 + entries.length * 34 }}>
        {entries.map(([key, value], index) => (
          <div
            key={key}
            style={{
              position: 'absolute',
              left: index * 18,
              top: index * 34,
              zIndex: `var(--ubl-z-${key})` as unknown as number,
              width: 250,
              padding: '8px 12px',
              borderRadius: 'var(--ubl-radius-m)',
              background: 'var(--ubl-color-background-elevated)',
              boxShadow: 'var(--ubl-elevation-overlay)',
              fontFamily: 'var(--ubl-font-sans)',
              fontSize: 'var(--ubl-font-caption-size)',
              color: 'var(--ubl-color-text-primary)',
            }}
          >
            <strong>--ubl-z-{key}</strong> · {value}
          </div>
        ))}
      </div>
    </UblDocStage>
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
      data-ubl-safe-area-demo=""
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--ubl-safe-area-top)',
        paddingBottom: 'var(--ubl-safe-area-bottom)',
        background: 'var(--ubl-color-background-subtle)',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 var(--ubl-gutter)',
          background: 'var(--ubl-color-background-card)',
          border: '2px dashed var(--ubl-color-border-control)',
          borderRadius: 'var(--ubl-radius-l)',
          fontFamily: 'var(--ubl-font-sans)',
          fontSize: 'var(--ubl-font-heading-4-size)',
          color: 'var(--ubl-color-text-primary)',
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
      badgeBrand="Unooblog"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description={`Medidas do blog sobre o quadro de ${ublLayout.desktopWidth}px — conteúdo de ${ublLayout.pageWidth}px, coluna de leitura de ${ublLayout.readingWidth}px, sumário lateral de ${ublLayout.tocWidth}px e barra lateral de ${ublLayout.sidebarWidth}px — e sobre a tela móvel de ${ublLayout.screenWidth} × ${ublLayout.screenHeight}px: escala de espaçamento de ${ublSpacingOrder.length} degraus (${ublSpacing['4xs']} a ${ublSpacing['5xl']}px), raios macios, alturas do cabeçalho e da barra de progresso, pontos de quebra por contêiner, áreas seguras e camadas de empilhamento.`}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UblDocGrid>
      <UblDocCard icon="📏" title="Escala fina">
        De 2 a 64px, com os degraus de 6 e 10px preservados para os ajustes finos de chips, selos e
        linhas de metadado.
      </UblDocCard>
      <UblDocCard icon="📖" title="Leitura em coluna">
        Prosa em <code>--ubl-reading-width</code> ({ublLayout.readingWidth}px), com o sumário de{' '}
        <code>--ubl-toc-width</code> ({ublLayout.tocWidth}px) ao lado no largo. O feed usa o conteúdo
        de <code>--ubl-page-width</code> ({ublLayout.pageWidth}px) e a barra lateral de{' '}
        <code>--ubl-sidebar-width</code> ({ublLayout.sidebarWidth}px).
      </UblDocCard>
      <UblDocCard icon="🫧" title="Cantos macios">
        Cartões em <code>l</code> (16px), capas e código em <code>m</code> (12px), imagens em{' '}
        <code>s</code> (8px) e controles em cápsula (<code>full</code>). O blog arredonda onde o
        jornal é reto.
      </UblDocCard>
      <UblDocCard icon="📦" title="Quebra por contêiner">
        Largo a partir de 960px, médio a partir de 640px e compacto abaixo. A medida é a do{' '}
        <strong>contêiner</strong>, não a da janela: o blog também aparece em quadros de documentação
        estreitos.
      </UblDocCard>
      <UblDocCard icon="📱" title="Áreas seguras e camadas">
        <code>--ubl-safe-area-top</code> e <code>-bottom</code> valem 0 fora do aparelho; o{' '}
        <code>PhoneFrame</code> as redefine em {ublLayout.statusbarHeight} e{' '}
        {ublLayout.homeIndicatorHeight}px. Seis degraus de <code>z-index</code>, todos dentro da tela.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="../tokens"
      layout={`Página · ${ublLayout.pageWidth}px · tela · ${ublLayout.screenWidth} × ${ublLayout.screenHeight}px`}
      specs={[
        { label: 'Conteúdo da página', value: `--ubl-page-width · ${ublLayout.pageWidth}px` },
        { label: 'Coluna de leitura', value: `--ubl-reading-width · ${ublLayout.readingWidth}px` },
        { label: 'Sumário lateral', value: `--ubl-toc-width · ${ublLayout.tocWidth}px` },
        { label: 'Barra lateral', value: `--ubl-sidebar-width · ${ublLayout.sidebarWidth}px` },
        { label: 'Cabeçalho do site', value: `${ublLayout.siteHeaderHeight}px` },
        { label: 'Progresso de leitura', value: `${ublLayout.progressHeight}px` },
        { label: 'Alvo de toque', value: `--ubl-touch-target · ${ublLayout.touchTarget}px` },
        { label: 'Pontos de quebra', value: `${BREAKPOINTS.wide}px · ${BREAKPOINTS.medium}px (contêiner)` },
        { label: 'Margem lateral', value: `${ublLayout.gutter}px móvel · ${ublLayout.gutterWide}px página` },
        { label: 'Raios', value: Object.values(ublRadius).slice(0, 5).join(' · ') + ' · cápsula' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Medidas próprias do módulo',
          detail:
            'a escala de espaçamento, os raios e as dimensões estruturais não são cópia da Unooria (cuja régua de 4/8px deslocaria as barras de altura fixa); só os tamanhos de ícone citam origem na plataforma (--unooria-icon-size-*).',
        },
        {
          subject: 'Raios macios: 4, 8, 12, 16, 24 e cápsula',
          detail:
            'o blog é macio. Cartões (post, autor, série, newsletter) usam l (16px), capas e bloco de código usam m (12px), imagens dentro de cartão usam s (8px) e controles — botão, chip, campo, avatar — são cápsula. É a inversão do jornal, em que só a pílula e o avatar arredondam.',
        },
        {
          subject: 'Coluna de leitura de 680px com sumário de 240px',
          detail:
            'a prosa corre numa coluna de --ubl-reading-width (680px), na ordem de 68 caracteres por linha em Open Sans de 18px. No largo, o sumário ocupa --ubl-toc-width (240px) ao lado e acompanha a rolagem; no compacto ele vira um bloco recolhível no topo do post. A página de conteúdo (--ubl-page-width, 1120px) abriga o feed e a barra lateral de 320px.',
        },
        {
          subject: 'Pontos de quebra por contêiner, não por janela',
          detail:
            'o blog aparece em quadros de documentação mais estreitos que a janela, então todo componente de página declara container-type: inline-size e quebra com @container: largo ≥ 960px (sumário lateral, feed em três colunas), médio ≥ 640px (feed em duas), compacto abaixo (uma coluna). Variáveis CSS não entram em @container, por isso 960 e 640 são literais, registrados em spacing.css.',
        },
        {
          subject: 'Área segura como variável, não como padding fixo',
          detail:
            'a mesma barra funciona dentro e fora do aparelho: fora, a área segura vale 0 e a barra encosta no topo; dentro, o PhoneFrame a redefine (47px e 34px) e o conteúdo corre por baixo da barra de status.',
        },
        {
          subject: 'Camadas dentro da tela, com o progresso de leitura',
          detail:
            'as sobreposições são absolutas na tela do aparelho e escolhem um degrau --ubl-z-*: a folha (30) abre sobre o cabeçalho (10) e o progresso (15), o aviso (50) sobre o diálogo (40), e a barra de status (60) sobre tudo. O progresso de leitura (15) é o degrau próprio do blog, entre o cabeçalho e a folha.',
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
      description="As faixas de uma página do blog, de cima para baixo."
    />
    <UblDocAnatomy
      zones={[
        { name: 'Cabeçalho do site', role: 'Marca, navegação, busca e alternador de tema, colado ao rolar.', token: `--ubl-site-header-height · ${ublLayout.siteHeaderHeight}px` },
        { name: 'Progresso de leitura', role: 'Faixa de preenchimento na base do cabeçalho, durante a leitura do post.', token: `--ubl-progress-height · ${ublLayout.progressHeight}px` },
        { name: 'Sumário', role: 'Lateral e fixo no largo; bloco recolhível no topo do post no compacto.', token: `--ubl-toc-width · ${ublLayout.tocWidth}px` },
        { name: 'Coluna de leitura', role: 'Título, subtítulo, autoria, capa e prosa do post.', token: `--ubl-reading-width · ${ublLayout.readingWidth}px` },
        { name: 'Feed e barra lateral', role: 'Cartões de post em grade; barra lateral com tópicos, séries e newsletter.', token: `--ubl-page-width · ${ublLayout.pageWidth}px · --ubl-sidebar-width · ${ublLayout.sidebarWidth}px` },
        { name: 'Rodapé', role: 'Colunas de links e direitos autorais.', token: '--ubl-spacing-* · --ubl-gutter-wide' },
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
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Cabeçalho, progresso e alvo de toque</h4>
    <Bars />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Margens laterais</h4>
    <Gutters />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Pontos de quebra por contêiner</h4>
    <Breakpoints />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Áreas seguras</h4>
    <UblDocStage surface="subtle" align="flex-start" gap={32}>
      <SafeAreas label="Com as duas barras" />
      <SafeAreas label="Sem barras de sistema" statusBar={false} homeIndicator={false} />
    </UblDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Camadas de empilhamento</h4>
    <Layers />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Quebrar o layout com @container (largo ≥ 960px, médio ≥ 640px) e declarar container-type: inline-size nos componentes de página.',
        'Somar --ubl-safe-area-top e --ubl-safe-area-bottom ao recuo de toda barra, folha e leitor.',
        'Usar --ubl-gutter como margem lateral no móvel e --ubl-gutter-wide na página de área de trabalho.',
        'Manter a prosa na coluna de --ubl-reading-width e a barra lateral em --ubl-sidebar-width.',
        'Garantir alvos de pelo menos --ubl-touch-target (44px) em tudo que se toca.',
        'Escolher uma camada --ubl-z-* para cada sobreposição, em vez de um número solto.',
      ]}
      donts={[
        'Usar @media de janela para quebrar o layout de um componente: o blog aparece em contêineres mais estreitos que a janela.',
        'Deixar a prosa correr em coluna mais larga que a de leitura: acima de ~75 caracteres por linha a leitura cansa.',
        'Escrever 47px ou 34px no lugar da área segura: fora do aparelho a barra ficaria deslocada.',
        'Usar raio de cartão menor que l, ou cantos retos: o formato do blog é macio e a cápsula é dos controles.',
        'Posicionar sobreposição com position: fixed na janela ou em portal: ela precisa ficar presa à tela.',
        'Usar z-index acima de --ubl-z-statusbar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As medidas não mudam com o tema; só as superfícies acompanham."
    />
    <UblDocThemeSwitcher>
      {(theme) => (
        <div style={{ display: 'grid', gap: 16, width: '100%' }}>
          <Bars theme={theme} />
          <Gutters theme={theme} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de medidas" />
    <UblDocPropsTable
      title="Dimensões estruturais (ublLayout)"
      rows={(Object.keys(ublLayout) as (keyof typeof ublLayout)[]).map((key) => ({
        name: LAYOUT_VARS[key].cssVar,
        type: 'px',
        default: `${ublLayout[key]}px`,
        description: LAYOUT_VARS[key].usage,
      }))}
    />
    <UblDocPropsTable
      title="Raios (ublRadius)"
      rows={(Object.entries(ublRadius) as [keyof typeof ublRadius, number][]).map(([key, value]) => ({
        name: `--ubl-radius-${key}`,
        type: 'px',
        default: `${value}px`,
        description: RADIUS_USAGE[key],
      }))}
    />
    <UblDocPropsTable
      title="Áreas seguras"
      rows={[
        { name: '--ubl-safe-area-top', type: 'px', default: '0px', description: `Redefinida em ${ublLayout.statusbarHeight}px pelo PhoneFrame com statusBar.` },
        { name: '--ubl-safe-area-bottom', type: 'px', default: '0px', description: `Redefinida em ${ublLayout.homeIndicatorHeight}px pelo PhoneFrame com homeIndicator.` },
      ]}
    />
    <UblDocPropsTable
      title="Camadas (ublLayers)"
      rows={(Object.entries(ublLayers) as [keyof typeof ublLayers, number][]).map(([key, value]) => ({
        name: `--ubl-z-${key}`,
        type: 'number',
        default: String(value),
        description: Z_USAGE[key],
      }))}
    />
    <UblDocPropsTable
      title="Movimento (ublTransitions)"
      rows={(Object.entries(ublTransitions) as [keyof typeof ublTransitions, string][]).map(([key, value]) => ({
        name: `--ubl-transition-${key}`,
        type: 'transition',
        default: value,
        description: 'Duração e curva; cada componente deve desligar o movimento em prefers-reduced-motion.',
      }))}
    />
    <UblDocPropsTable
      title="Tamanhos de ícone e de avatar"
      rows={[
        ...(Object.entries(ublIconSizes) as [keyof typeof ublIconSizes, { px: number; unooria: string }][]).map(([key, size]) => ({
          name: `--ubl-icon-size-${key}`,
          type: 'px',
          default: `${size.px}px`,
          description: `Degrau de ${size.unooria}.`,
        })),
        ...(Object.entries(ublAvatarSizes) as [keyof typeof ublAvatarSizes, number][]).map(([key, value]) => ({
          name: `--ubl-avatar-${key}`,
          type: 'px',
          default: `${value}px`,
          description: 'Diâmetro do avatar de autoria e de comentário.',
        })),
      ]}
    />
    <UblDocPropsTable
      title="Exportações de tokens/spacing.ts"
      rows={[
        { name: 'ublSpacing / ublSpacingOrder', type: 'Record<UblSpacingToken, number> / UblSpacingToken[]', description: 'Escala de espaçamento e a ordem de exibição.' },
        { name: 'ublRadius', type: '{ xs; s; m; l; xl; full }', description: 'Raios em pixels.' },
        { name: 'ublLayout', type: 'Record<string, number>', description: 'Dimensões estruturais da página e dos quadros de documentação.' },
        { name: 'ublIconSizes', type: 'Record<UblIconSize, { px; unooria }>', description: 'Tamanhos de ícone com a origem na Unooria.' },
        { name: 'ublAvatarSizes', type: '{ sm: 24; md: 32; lg: 48; xl: 72 }', description: 'Diâmetros de avatar.' },
        { name: 'ublLayers', type: 'Record<string, number>', description: 'Camadas de empilhamento.' },
        { name: 'ublTransitions', type: '{ fast; base; slow }', description: 'Durações e curvas.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unooblog/Fundamentos/Espaçamento & Layout',
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
 * Escala de espaçamento e raios. O `play` confere que cada raio resolve o valor
 * da tabela.
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
  play: async ({ canvasElement }) => {
    for (const key of ['xs', 's', 'm', 'l', 'xl'] as const) {
      const radius = getComputedStyle(canvasElement.querySelector<HTMLElement>(`[data-ubl-radius="${key}"]`)!);
      await expect(radius.borderTopLeftRadius).toBe(`${ublRadius[key]}px`);
    }
    // A cápsula é o valor literal da plataforma, e não 50%.
    const full = getComputedStyle(canvasElement.querySelector<HTMLElement>('[data-ubl-radius="full"]')!);
    await expect(full.borderTopLeftRadius).toBe(`${ublRadius.full}px`);
  },
};

/**
 * Proporções da página, cabeçalho, progresso, alvo de toque e margens. O `play`
 * confere que cada medida resolve o valor da tabela.
 */
export const MedidasDaPagina: Story = {
  name: 'Medidas da página',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Proporções da página" />
      <PageProportions />
      <UnooriaDocSectionHeader barColor={BAR} title="Cabeçalho, progresso e alvo de toque" />
      <Bars />
      <UnooriaDocSectionHeader barColor={BAR} title="Margens laterais" />
      <Gutters />
    </UnooriaDocShell>
  ),
  play: async ({ canvasElement }) => {
    const styleOf = (selector: string) => getComputedStyle(canvasElement.querySelector<HTMLElement>(selector)!);
    await expect(styleOf('[data-ubl-bar="header"]').height).toBe(`${ublLayout.siteHeaderHeight}px`);
    await expect(styleOf('[data-ubl-bar-progress]').height).toBe(`${ublLayout.progressHeight}px`);
    await expect(styleOf('[data-ubl-touch]').height).toBe(`${ublLayout.touchTarget}px`);
    await expect(styleOf('[data-ubl-touch]').width).toBe(`${ublLayout.touchTarget}px`);
    await expect(styleOf('[data-ubl-gutter="gutter"]').width).toBe(`${ublLayout.gutter}px`);
    await expect(styleOf('[data-ubl-gutter="gutterWide"]').width).toBe(`${ublLayout.gutterWide}px`);
    const reading = canvasElement.querySelector<HTMLElement>('[data-ubl-proportion="--ubl-reading-width"]')!;
    const page = canvasElement.querySelector<HTMLElement>('[data-ubl-proportion="--ubl-page-width"]')!;
    const expected = ublLayout.readingWidth / ublLayout.pageWidth;
    await expect(reading.getBoundingClientRect().width / page.getBoundingClientRect().width).toBeCloseTo(expected, 2);
  },
};

/**
 * A mesma composição em contêineres de 1000, 700 e 400px. O `play` confere as
 * colunas do post (sumário lateral só no largo: 2, 1 e 1) e do feed (3, 2 e 1).
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
    const columns = (attribute: string, width: number) =>
      getComputedStyle(canvasElement.querySelector<HTMLElement>(`[${attribute}="${width}"]`)!)
        .gridTemplateColumns.split(' ').length;
    await expect(columns('data-ubl-bp-feed', 1000)).toBe(3);
    await expect(columns('data-ubl-bp-feed', 700)).toBe(2);
    await expect(columns('data-ubl-bp-feed', 400)).toBe(1);
    await expect(columns('data-ubl-bp-post', 1000)).toBe(2);
    await expect(columns('data-ubl-bp-post', 700)).toBe(1);
    await expect(columns('data-ubl-bp-post', 400)).toBe(1);
    // No largo, o sumário ocupa exatamente --ubl-toc-width.
    const toc = canvasElement.querySelector<HTMLElement>('[data-ubl-bp-post="1000"] .ubl-doc-bp__toc')!;
    await expect(toc.getBoundingClientRect().width).toBe(ublLayout.tocWidth);
  },
};

/**
 * As áreas seguras com e sem as barras de sistema. O `play` confere que o
 * recuo vale a altura das barras dentro do aparelho e 0 sem elas.
 */
export const AreasSeguras: Story = {
  name: 'Áreas seguras',
  render: () => (
    <UblDocStage surface="subtle" align="flex-start" gap={32}>
      <SafeAreas label="Com as duas barras" />
      <SafeAreas label="Sem barras de sistema" statusBar={false} homeIndicator={false} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const [withBars, withoutBars] = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-ubl-safe-area-demo]')
    );
    await expect(getComputedStyle(withBars).paddingTop).toBe(`${ublLayout.statusbarHeight}px`);
    await expect(getComputedStyle(withBars).paddingBottom).toBe(`${ublLayout.homeIndicatorHeight}px`);
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
 * O cabeçalho, o progresso e as margens nos dois temas: as medidas são as mesmas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
      <div>
        <p style={{ ...caption, margin: '0 0 6px 0' }}>Tema claro</p>
        <Bars theme="light" />
      </div>
      <div>
        <p style={{ ...caption, margin: '0 0 6px 0' }}>Tema escuro</p>
        <Bars theme="dark" />
      </div>
    </div>
  ),
};
