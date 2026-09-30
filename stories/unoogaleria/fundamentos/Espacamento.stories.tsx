import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import {
  uglAvatarSizes,
  uglBlurBar,
  uglIconSizes,
  uglLayout,
  uglMotion,
  uglRadii,
  uglSpacing,
  uglSpacingOrder,
  uglZIndex,
} from '../../../src/unoogaleria/tokens';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { Icon } from '../../../src/unoogaleria/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocAnatomy,
  UglDocCard,
  UglDocDecisions,
  UglDocGrid,
  UglDocPractices,
  UglDocPropsTable,
  UglDocSpecs,
  UglDocStage,
  UglDocThemeSwitcher,
} from '../../../.storybook/components';
import { uglMediaItems } from '../fixtures';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DOC = {
  text: 'var(--ugl-color-text-primary)',
  muted: 'var(--ugl-color-text-secondary)',
  border: 'var(--ugl-color-border-subtle)',
} as const;

/** Níveis de zoom da grade da biblioteca (os mesmos do `MediaGrid`). */
const ZOOM_LEVELS = [3, 5, 7] as const;
type ZoomLevel = (typeof ZOOM_LEVELS)[number];

/** Variável CSS de cada chave de `uglLayout`. */
const LAYOUT_VARS: Record<keyof typeof uglLayout, { cssVar: string; usage: string }> = {
  gutter: { cssVar: '--ugl-gutter', usage: 'Margem lateral padrão das telas.' },
  gridGap: { cssVar: '--ugl-grid-gap', usage: 'Espaço entre miniaturas da grade.' },
  screenWidth: { cssVar: '--ugl-screen-width', usage: 'Largura da tela do aparelho.' },
  screenHeight: { cssVar: '--ugl-screen-height', usage: 'Altura da tela do aparelho.' },
  statusBarHeight: { cssVar: '--ugl-statusbar-height', usage: 'Barra de status; vira a área segura superior.' },
  homeIndicatorHeight: { cssVar: '--ugl-home-indicator-height', usage: 'Barra de gesto; vira a área segura inferior.' },
  topBarHeight: { cssVar: '--ugl-topbar-height', usage: 'Linha da barra superior compacta.' },
  tabBarHeight: { cssVar: '--ugl-tabbar-height', usage: 'Conteúdo da barra de abas (sem a área segura).' },
  toolbarHeight: { cssVar: '--ugl-toolbar-height', usage: 'Barra de seleção e barras do visualizador.' },
  touchTarget: { cssVar: '--ugl-touch-target', usage: 'Alvo mínimo de toque.' },
};

/** Uso de cada camada de empilhamento. */
const Z_USAGE: Record<keyof typeof uglZIndex, string> = {
  bar: 'Barras translúcidas e cabeçalhos colados sobre a grade.',
  viewer: 'Visualizador e editor em tela cheia.',
  sheet: 'Folhas inferiores e menus — abrem também sobre o visualizador.',
  dialog: 'Diálogos de confirmação.',
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
  <div data-ugl-theme="light" style={{ display: 'grid', gap: 8, marginBottom: 28 }}>
    {uglSpacingOrder.map((key) => (
      <div key={key} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: 16 }}>
        <span style={caption}>
          --ugl-spacing-{key} · {uglSpacing[key]}px
        </span>
        <span
          style={{
            display: 'block',
            width: `var(--ugl-spacing-${key})`,
            height: 16,
            borderRadius: 'var(--ugl-radius-xs)',
            background: 'var(--ugl-color-action-primary)',
          }}
        />
      </div>
    ))}
  </div>
);

/** Amostras dos raios. */
const Radii: React.FC = () => (
  <UglDocStage gap={20} align="flex-start">
    {(Object.entries(uglRadii) as [keyof typeof uglRadii, number][]).map(([key, value]) => (
      <div key={key} style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: `var(--ugl-radius-${key})`,
            background: 'var(--ugl-color-background-tertiary)',
            border: '1px solid var(--ugl-color-border-default)',
          }}
        />
        <div style={{ ...caption, marginTop: 6 }}>
          {key} · {value}px
        </div>
      </div>
    ))}
  </UglDocStage>
);

/** Tamanhos de ícone e de avatar, lado a lado. */
const Sizes: React.FC = () => (
  <UglDocStage gap={28} align="flex-start">
    {(Object.entries(uglIconSizes) as [keyof typeof uglIconSizes, { value: number; unooria: string }][]).map(
      ([key, size]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <Icon name="photo" size={key} tone="accent" />
          <div style={{ ...caption, marginTop: 6 }}>
            ícone {key} · {size.value}px
          </div>
        </div>
      )
    )}
    {(Object.entries(uglAvatarSizes) as [keyof typeof uglAvatarSizes, number][]).map(([key, value]) => (
      <div key={key} style={{ textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            width: `var(--ugl-avatar-${key})`,
            height: `var(--ugl-avatar-${key})`,
            borderRadius: 'var(--ugl-radius-full)',
            background: 'var(--ugl-color-background-tertiary)',
            border: '1px solid var(--ugl-color-border-default)',
          }}
        />
        <div style={{ ...caption, marginTop: 6 }}>
          avatar {key} · {value}px
        </div>
      </div>
    ))}
  </UglDocStage>
);

/**
 * Grade da biblioteca em 3, 5 ou 7 colunas, com o espaço de 2px entre
 * miniaturas. Os três botões são o mesmo zoom que a pinça e o Ctrl/⌘ + roda
 * fazem no `MediaGrid`.
 */
const GridDemo: React.FC<{ initial?: ZoomLevel }> = ({ initial = 3 }) => {
  const [columns, setColumns] = useState<ZoomLevel>(initial);
  const visible = uglMediaItems.slice(0, columns * 4);

  return (
    <div style={{ width: 390, maxWidth: '100%' }}>
      <div role="group" aria-label="Colunas da grade" style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {ZOOM_LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            aria-pressed={columns === level}
            onClick={() => setColumns(level)}
            style={{
              minHeight: 'var(--ugl-touch-target)',
              padding: '0 var(--ugl-spacing-l)',
              borderRadius: 'var(--ugl-radius-full)',
              border: '1px solid var(--ugl-color-border-control)',
              background: columns === level ? 'var(--ugl-color-action-primary)' : 'var(--ugl-color-fill-field)',
              color: columns === level ? 'var(--ugl-color-text-on-action)' : 'var(--ugl-color-text-primary)',
              fontFamily: 'var(--ugl-font-sans)',
              fontSize: 'var(--ugl-font-label-size)',
              fontWeight: 'var(--ugl-font-label-weight)' as React.CSSProperties['fontWeight'],
              cursor: 'pointer',
            }}
          >
            {level} colunas
          </button>
        ))}
      </div>
      <div
        role="list"
        aria-label={`Grade de ${columns} colunas`}
        data-ugl-grid-demo=""
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 'var(--ugl-grid-gap)',
          background: 'var(--ugl-color-background-primary)',
        }}
      >
        {visible.map((item) => (
          <div role="listitem" key={item.id} style={{ aspectRatio: '1 / 1', background: 'var(--ugl-color-background-tertiary)' }}>
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Camadas de empilhamento, desenhadas como cartões sobrepostos. */
const Layers: React.FC = () => {
  const entries = Object.entries(uglZIndex) as [keyof typeof uglZIndex, number][];
  return (
    <UglDocStage surface="secondary" align="flex-start">
      <div style={{ position: 'relative', width: 360, height: 60 + entries.length * 34 }}>
        {entries.map(([key, value], index) => (
          <div
            key={key}
            style={{
              position: 'absolute',
              left: index * 18,
              top: index * 34,
              zIndex: `var(--ugl-z-${key})` as unknown as number,
              width: 250,
              padding: '8px 12px',
              borderRadius: 'var(--ugl-radius-m)',
              background: 'var(--ugl-color-background-elevated)',
              boxShadow: 'var(--ugl-elevation-overlay)',
              fontFamily: 'var(--ugl-font-sans)',
              fontSize: 'var(--ugl-font-caption-size)',
              color: 'var(--ugl-color-text-primary)',
            }}
          >
            <strong>--ugl-z-{key}</strong> · {value}
          </div>
        ))}
      </div>
    </UglDocStage>
  );
};

/**
 * As áreas seguras dentro do aparelho: a caixa lavanda é o recuo que barras e
 * folhas somam; o conteúdo branco é o que sobra entre a barra de status e a de
 * gesto.
 */
const SafeAreas: React.FC<{ statusBar?: boolean; homeIndicator?: boolean; label: string }> = ({
  statusBar = true,
  homeIndicator = true,
  label,
}) => (
  <PhoneFrame scale={0.5} statusBar={statusBar} homeIndicator={homeIndicator} ariaLabel={label}>
    <div
      data-ugl-safe-area-demo=""
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--ugl-safe-area-top)',
        paddingBottom: 'var(--ugl-safe-area-bottom)',
        background: 'var(--ugl-color-background-tertiary)',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 var(--ugl-gutter)',
          borderRadius: 'var(--ugl-radius-l)',
          background: 'var(--ugl-color-background-primary)',
          border: '2px dashed var(--ugl-color-border-control)',
          fontFamily: 'var(--ugl-font-sans)',
          fontSize: 'var(--ugl-font-title-md-size)',
          color: 'var(--ugl-color-text-primary)',
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
      badgeBrand="Unoogaleria"
      category="Fundamentos • Espaçamento & Layout"
      title="Espaçamento & Layout"
      description={`Medidas da galeria sobre a tela de ${uglLayout.screenWidth} × ${uglLayout.screenHeight}px: escala de espaçamento de ${uglSpacingOrder.length} degraus (${uglSpacing['4xs']} a ${uglSpacing['4xl']}px), raios, dimensões das barras, áreas seguras, camadas de empilhamento e a grade da biblioteca de 3, 5 ou 7 colunas com ${uglLayout.gridGap}px entre miniaturas.`}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UglDocGrid>
      <UglDocCard icon="📏" title="Escala fina">
        De 2 a 48px, com os degraus de 6 e 10px preservados: as linhas de altura fixa (52px) e as
        barras (44 e 50px) só fecham a conta com eles.
      </UglDocCard>
      <UglDocCard icon="🧩" title="Grade em mosaico">
        <code>--ugl-grid-gap</code> de 2px faz a biblioteca ler como um mosaico contínuo. O zoom
        troca a quantidade de colunas (3, 5 e 7), nunca o espaço.
      </UglDocCard>
      <UglDocCard icon="📱" title="Áreas seguras">
        <code>--ugl-safe-area-top</code> e <code>--ugl-safe-area-bottom</code> valem 0 fora do
        aparelho; o <code>PhoneFrame</code> os redefine em 47 e 34px, e cada barra soma o valor ao
        próprio recuo.
      </UglDocCard>
      <UglDocCard icon="🗂️" title="Camadas">
        Seis degraus de <code>z-index</code>, todos dentro da tela: nada da galeria sobe para a
        janela, e o cromo do aparelho fica sempre por cima.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="../tokens"
      layout={`Tela · ${uglLayout.screenWidth} × ${uglLayout.screenHeight}px`}
      specs={[
        { label: 'Margem lateral', value: `--ugl-gutter · ${uglLayout.gutter}px` },
        { label: 'Espaço da grade', value: `--ugl-grid-gap · ${uglLayout.gridGap}px` },
        { label: 'Alvo de toque', value: `--ugl-touch-target · ${uglLayout.touchTarget}px` },
        { label: 'Barra de status', value: `${uglLayout.statusBarHeight}px` },
        { label: 'Barra de gesto', value: `${uglLayout.homeIndicatorHeight}px` },
        { label: 'Barra de abas', value: `${uglLayout.tabBarHeight}px + área segura` },
        { label: 'Desfoque das barras', value: `--ugl-blur-bar · ${uglBlurBar}px` },
        { label: 'Colunas da grade', value: ZOOM_LEVELS.join(' · ') },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Medidas próprias do módulo',
          detail:
            'a escala de espaçamento, os raios e as dimensões estruturais não são cópia da Unooria (cuja régua de 4/8px deslocaria as linhas de altura fixa); só os tamanhos de ícone e o desfoque das barras citam origem na plataforma.',
        },
        {
          subject: 'Área segura como variável, não como padding fixo',
          detail:
            'a mesma barra funciona dentro e fora do aparelho: fora, a área segura vale 0 e a barra encosta no topo; dentro, o PhoneFrame a redefine e o conteúdo corre por baixo da barra de status.',
        },
        {
          subject: 'Três níveis de zoom',
          detail:
            'a grade tem 3, 5 ou 7 colunas: 3 mostra a foto, 7 mostra o mês. Números ímpares mantêm uma coluna central, onde o polegar cai na pinça.',
        },
        {
          subject: 'Gap de 2px em todos os níveis',
          detail:
            'o espaço não encolhe com o zoom. Em 7 colunas, 2px ainda separa as miniaturas sem virar moldura; em 3, não parece fresta.',
        },
        {
          subject: 'Camadas dentro da tela',
          detail:
            'as sobreposições são absolutas na tela do aparelho e escolhem um degrau --ugl-z-*; a folha (30) abre sobre o visualizador (20), o aviso (50) sobre o diálogo (40), e a barra de status (60) sobre tudo.',
        },
        {
          subject: 'Raio "full" de 1000px',
          detail:
            'é o valor literal da plataforma para cápsulas; não é arbitrário e não deve virar 50% (que ovalaria uma cápsula larga).',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia da tela"
      description="As faixas de uma tela da biblioteca, de cima para baixo."
    />
    <UglDocAnatomy
      zones={[
        { name: 'Barra de status', role: 'Horário, sinal e bateria; área segura superior.', token: `--ugl-statusbar-height · ${uglLayout.statusBarHeight}px` },
        { name: 'Barra superior', role: 'Título grande ou compacto, com ações à direita.', token: `--ugl-topbar-height · ${uglLayout.topBarHeight}px` },
        { name: 'Grade', role: 'Miniaturas com 2px entre si, rolando por baixo das barras.', token: '--ugl-grid-gap' },
        { name: 'Barra de abas', role: 'Navegação principal translúcida.', token: `--ugl-tabbar-height · ${uglLayout.tabBarHeight}px` },
        { name: 'Barra de gesto', role: 'Área segura inferior.', token: `--ugl-home-indicator-height · ${uglLayout.homeIndicatorHeight}px` },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de medidas" />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Escala de espaçamento</h4>
    <SpacingScale />
    <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC.text }}>Raios</h4>
    <Radii />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Ícones e avatares</h4>
    <Sizes />
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Grade da biblioteca</h4>
    <UglDocStage align="flex-start">
      <GridDemo />
    </UglDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Áreas seguras</h4>
    <UglDocStage surface="secondary" align="flex-start" gap={32}>
      <SafeAreas label="Com as duas barras" />
      <SafeAreas label="Sem barras de sistema" statusBar={false} homeIndicator={false} />
    </UglDocStage>
    <h4 style={{ margin: '16px 0 10px 0', fontSize: 14, color: DOC.text }}>Camadas de empilhamento</h4>
    <Layers />

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Somar --ugl-safe-area-top e --ugl-safe-area-bottom ao recuo de toda barra, folha e visualizador.',
        'Usar --ugl-gutter como margem lateral de títulos, listas e campos.',
        'Garantir alvos de pelo menos --ugl-touch-target (44px) em tudo que se toca.',
        'Escolher uma camada --ugl-z-* para cada sobreposição, em vez de um número solto.',
      ]}
      donts={[
        'Escrever 47px ou 34px no lugar da área segura: fora do aparelho a barra ficaria deslocada.',
        'Mudar o espaço da grade com o zoom.',
        'Posicionar sobreposição com position: fixed na janela ou em portal: ela precisa ficar presa à tela.',
        'Usar z-index acima de --ugl-z-statusbar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="As medidas não mudam com o tema; só as superfícies da grade acompanham."
    />
    <UglDocThemeSwitcher>{() => <GridDemo initial={5} />}</UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa da API de medidas" />
    <UglDocPropsTable
      title="Dimensões estruturais (uglLayout)"
      rows={(Object.keys(uglLayout) as (keyof typeof uglLayout)[]).map((key) => ({
        name: LAYOUT_VARS[key].cssVar,
        type: 'px',
        default: `${uglLayout[key]}px`,
        description: LAYOUT_VARS[key].usage,
      }))}
    />
    <UglDocPropsTable
      title="Áreas seguras"
      rows={[
        { name: '--ugl-safe-area-top', type: 'px', default: '0px', description: `Redefinida em ${uglLayout.statusBarHeight}px pelo PhoneFrame com statusBar.` },
        { name: '--ugl-safe-area-bottom', type: 'px', default: '0px', description: `Redefinida em ${uglLayout.homeIndicatorHeight}px pelo PhoneFrame com homeIndicator.` },
      ]}
    />
    <UglDocPropsTable
      title="Camadas (uglZIndex)"
      rows={(Object.entries(uglZIndex) as [keyof typeof uglZIndex, number][]).map(([key, value]) => ({
        name: `--ugl-z-${key}`,
        type: 'number',
        default: String(value),
        description: Z_USAGE[key],
      }))}
    />
    <UglDocPropsTable
      title="Movimento e desfoque"
      rows={[
        ...(Object.entries(uglMotion) as [keyof typeof uglMotion, string][]).map(([key, value]) => ({
          name: `--ugl-transition-${key}`,
          type: 'transition',
          default: value,
          description: 'Desligada em prefers-reduced-motion por cada componente.',
        })),
        { name: '--ugl-blur-bar', type: 'px', default: `${uglBlurBar}px`, description: 'Desfoque das barras translúcidas (--unooria-blur-400).' },
      ]}
    />
    <UglDocPropsTable
      title="Exportações de tokens/spacing.ts"
      rows={[
        { name: 'uglSpacing / uglSpacingOrder', type: 'Record<UglSpacingToken, number> / UglSpacingToken[]', description: 'Escala de espaçamento e a ordem de exibição.' },
        { name: 'uglRadii', type: '{ xs; s; m; l; xl; full }', description: 'Raios em pixels.' },
        { name: 'uglLayout', type: 'Record<string, number>', description: 'Dimensões estruturais.' },
        { name: 'uglIconSizes', type: 'Record<UglIconSize, { value; unooria }>', description: 'Tamanhos de ícone com a origem na Unooria.' },
        { name: 'uglAvatarSizes', type: '{ sm: 32; md: 48; lg: 64 }', description: 'Diâmetros de avatar.' },
        { name: 'uglBlurBar', type: 'number', description: 'Desfoque das barras.' },
        { name: 'uglMotion', type: '{ fast; base; slow }', description: 'Durações e curvas.' },
        { name: 'uglZIndex', type: 'Record<string, number>', description: 'Camadas de empilhamento.' },
        { name: 'uglElevation', type: '{ hairlineBottom; hairlineTop }', description: 'Fios de 1px (ver Elevação).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoogaleria/Fundamentos/Espaçamento & Layout',
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
 * A grade nos três níveis de zoom. O `play` troca para 7 colunas e confere a
 * quantidade de colunas e o espaço de 2px.
 */
export const Grade: Story = {
  name: 'Grade de 3, 5 e 7 colunas',
  render: () => (
    <UglDocStage align="flex-start">
      <GridDemo />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = () => canvasElement.querySelector<HTMLElement>('[data-ugl-grid-demo]')!;
    await expect(getComputedStyle(grid()).gridTemplateColumns.split(' ')).toHaveLength(3);
    await userEvent.click(canvas.getByRole('button', { name: `${ZOOM_LEVELS[2]} colunas` }));
    await expect(canvas.getByRole('button', { name: `${ZOOM_LEVELS[2]} colunas` })).toHaveAttribute('aria-pressed', 'true');
    await expect(getComputedStyle(grid()).gridTemplateColumns.split(' ')).toHaveLength(ZOOM_LEVELS[2]);
    await expect(getComputedStyle(grid()).columnGap).toBe(`${uglLayout.gridGap}px`);
  },
};

/**
 * As áreas seguras com e sem as barras de sistema. O `play` confere que o
 * recuo vale a altura das barras dentro do aparelho e 0 sem elas.
 */
export const AreasSeguras: Story = {
  name: 'Áreas seguras',
  render: () => (
    <UglDocStage surface="secondary" align="flex-start" gap={32}>
      <SafeAreas label="Com as duas barras" />
      <SafeAreas label="Sem barras de sistema" statusBar={false} homeIndicator={false} />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const [withBars, withoutBars] = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-ugl-safe-area-demo]')
    );
    await expect(getComputedStyle(withBars).paddingTop).toBe(`${uglLayout.statusBarHeight}px`);
    await expect(getComputedStyle(withBars).paddingBottom).toBe(`${uglLayout.homeIndicatorHeight}px`);
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
 * A grade nos dois temas: as medidas são as mesmas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
      <UglDocStage label="Tema claro" theme="light" align="flex-start">
        <GridDemo initial={5} />
      </UglDocStage>
      <UglDocStage label="Tema escuro" theme="dark" align="flex-start">
        <GridDemo initial={5} />
      </UglDocStage>
    </div>
  ),
};
