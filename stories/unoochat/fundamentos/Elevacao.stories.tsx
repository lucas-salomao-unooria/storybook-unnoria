import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
import { Fab, Menu, Toast } from '../../../src/unoochat';
import { uncElevation } from '../../../src/unoochat/tokens';
import { uncMenuItems } from '../fixtures';

const BAR = '#716C98';

const OVERLAY_VALUES: Record<UncDocTheme, { value: string; unooria: string }> = {
  light: {
    value: '0px 0px 10px 0px rgba(14, 16, 57, 0.3)',
    unooria: '--unooria-elevation-brand-secondary',
  },
  dark: {
    value: '0px 0px 8px 4px rgba(255, 255, 255, 0.1)',
    unooria: '--unooria-elevation-neutral-2',
  },
};

const LAYERS: {
  cssVar: string;
  label: string;
  description: string;
  light: string;
  dark: string;
}[] = [
  {
    cssVar: '--unc-color-surface-base',
    label: 'base',
    description: 'Fundo do documento, atrás das telas.',
    light: '#EFEEF5',
    dark: '#080922',
  },
  {
    cssVar: '--unc-color-surface-canvas',
    label: 'canvas',
    description: 'Fundo das telas de listagem.',
    light: '#FFFFFF',
    dark: '#0E1039',
  },
  {
    cssVar: '--unc-color-surface-appbar',
    label: 'appbar',
    description: 'Barra superior, sub app bar e faixa de abas.',
    light: '#F7F6FA',
    dark: '#34375C',
  },
  {
    cssVar: '--unc-color-surface-sheet',
    label: 'sheet',
    description: 'Folha de anexos, campo do compositor e chips de filtro.',
    light: '#EFEEF5',
    dark: '#34375C',
  },
  {
    cssVar: '--unc-color-surface-elevated',
    label: 'elevated',
    description: 'Menu suspenso e FAB secundário.',
    light: '#FFFFFF',
    dark: '#57547D',
  },
  {
    cssVar: '--unc-color-surface-dialog',
    label: 'dialog',
    description: 'Caixa de diálogo modal e aviso rápido.',
    light: '#FFFFFF',
    dark: '#34375C',
  },
];

/**
 * Escada de luminância das superfícies em um tema.
 */
const SurfaceLadder: React.FC<{ theme: UncDocTheme }> = ({ theme }) => (
  <UncDocStage
    label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
    theme={theme}
    surface="base"
    direction="column"
    align="stretch"
    gap={0}
    padding={0}
  >
    {LAYERS.map((layer) => (
      <div
        key={layer.cssVar}
        style={{
          background: `var(${layer.cssVar})`,
          padding: '14px 20px',
          fontFamily: 'var(--unc-font-sans)',
          borderBottom: '1px solid var(--unc-color-border-divider)',
        }}
      >
        <div style={{ color: 'var(--unc-color-text-primary)', fontSize: 14, fontWeight: 700 }}>
          {layer.label} · {layer[theme]}
        </div>
        <div style={{ color: 'var(--unc-color-text-secondary)', fontSize: 12, marginTop: 2 }}>
          {layer.description}
        </div>
        <code style={{ color: 'var(--unc-color-accent)', fontSize: 11.5 }}>{layer.cssVar}</code>
      </div>
    ))}
  </UncDocStage>
);

/**
 * Elementos sobrepostos reais — Menu, Fab e Toast — sobre o canvas de um tema.
 */
const OverlayShowcase: React.FC<{ theme: UncDocTheme }> = ({ theme }) => (
  <div
    data-unc-theme={theme}
    style={{
      position: 'relative',
      minHeight: 330,
      padding: 24,
      boxSizing: 'border-box',
      background: 'var(--unc-color-surface-canvas)',
      border: '1px solid #E4E8E9',
      borderRadius: 12,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap',
    }}
  >
    <Menu items={uncMenuItems.slice(0, 4)} label="Menu de exemplo" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <Fab variant="chat" label="Nova conversa" />
      <Fab variant="edit" label="Escrever status" />
    </div>
    <Toast>Conversa fixada no topo da lista.</Toast>
  </div>
);

/**
 * Explorador de elevação: empilha uma camada sobre uma superfície, com ou sem
 * o véu e com ou sem o token de sobreposição.
 */
const ElevationLab: React.FC<{
  theme: UncDocTheme;
  base: string;
  overlay: string;
  withScrim: boolean;
  withShadow: boolean;
}> = ({ theme, base, overlay, withScrim, withShadow }) => (
  <div
    data-unc-theme={theme}
    style={{
      position: 'relative',
      width: 411,
      maxWidth: '100%',
      height: 260,
      background: `var(${base})`,
      border: '1px solid #E4E8E9',
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    {withScrim && (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--unc-color-scrim)' }} />
    )}
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        top: 60,
        padding: 20,
        borderRadius: 'var(--unc-radius-s)',
        background: `var(${overlay})`,
        boxShadow: withShadow ? 'var(--unc-elevation-overlay)' : 'none',
        color: 'var(--unc-color-text-primary)',
        fontFamily: 'var(--unc-font-sans)',
        fontSize: 'var(--unc-font-body-lg-size)',
      }}
    >
      Camada sobreposta
      <div
        style={{
          marginTop: 12,
          color: 'var(--unc-color-text-secondary)',
          fontSize: 'var(--unc-font-body-sm-size)',
        }}
      >
        {overlay} sobre {base}
      </div>
    </div>
  </div>
);

/**
 * Página de documentação rica do sistema de elevação.
 */
const ElevacaoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Fundamentos • Elevação"
      title="Elevação"
      description="O Unoochat separa camadas de duas formas: a superfície é plana e se distingue das vizinhas pela escada de luminância de cada tema, e apenas os elementos sobrepostos — menu, diálogo, folha inferior, aviso rápido e botão flutuante — recebem sombra, por um único token, --unc-elevation-overlay, definido por tema. Diálogos e folhas ainda escurecem o conteúdo com o véu --unc-color-scrim."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como o produto separa camadas nos dois temas."
    />
    <UncDocGrid>
      <UncDocCard icon="🪜" title="Superfície plana, separada por luminância">
        Barras, listas e cartões não projetam sombra. Cada camada se distingue pelo degrau de
        superfície em que está — no tema escuro, da base <code>#080922</code> ao menu elevado{' '}
        <code>#57547D</code> — e por divisores de 1px em <code>--unc-color-border-divider</code>.
      </UncDocCard>
      <UncDocCard icon="☁️" title="Uma sombra para tudo que se sobrepõe">
        <code>--unc-elevation-overlay</code> é aplicado em <code>Menu</code>, <code>Dialog</code>,{' '}
        <code>BottomSheet</code>, <code>Toast</code> e <code>Fab</code>. No claro é um halo roxo
        difuso; no escuro, um halo claro de 10%, porque uma sombra escura não se vê sobre roxo
        profundo.
      </UncDocCard>
      <UncDocCard icon="🌑" title="Véu para modais">
        Diálogos e folhas usam <code>--unc-color-scrim</code> (roxo profundo a 60%, o mesmo nos dois
        temas) sobre todo o conteúdo. É a segunda ferramenta de separação, além da sombra.
      </UncDocCard>
      <UncDocCard icon="🎯" title="No claro, a sombra faz o trabalho">
        No tema claro, canvas, menu e diálogo são o mesmo branco. Sem a sombra de sobreposição a
        camada some contra o fundo — é por isso que ela existe.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="O token de sobreposição, o véu e as decisões registradas."
    />
    <UncDocSpecs
      component="../tokens/colors.css"
      layout="Superfície plana · 1 sobreposição por tema"
      specs={[
        { label: 'Token', value: '--unc-elevation-overlay' },
        { label: 'Claro', value: OVERLAY_VALUES.light.value },
        { label: 'Origem (claro)', value: OVERLAY_VALUES.light.unooria },
        { label: 'Escuro', value: OVERLAY_VALUES.dark.value },
        { label: 'Origem (escuro)', value: OVERLAY_VALUES.dark.unooria },
        { label: 'Véu de modal', value: 'rgba(14, 16, 57, 0.60)' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Um único token, valor por tema',
          detail:
            'os componentes citam sempre --unc-elevation-overlay; a definição vive em colors.css, no bloco de cada tema. Um componente novo herda o comportamento sem conhecer o tema.',
        },
        {
          subject: 'Sombra clara no tema escuro',
          detail:
            'a sombra escura da plataforma some sobre superfícies de roxo profundo. O tema escuro adota o halo claro de --unooria-elevation-neutral-2 (0 0 8px 4px, branco a 10%), o mesmo recurso que a Plataforma Unooria usa para elevar sobre fundo escuro.',
        },
        {
          subject: 'Escada não monotônica',
          detail:
            'as superfícies não crescem de forma estritamente linear: no escuro, appbar, sheet e dialog compartilham o mesmo degrau (#34375C) porque cumprem papéis parecidos em telas diferentes; o menu e o FAB secundário são um degrau acima (#57547D). No claro, canvas, menu e diálogo são brancos e o que os separa é a sombra.',
        },
        {
          subject: 'Sem hairlines de contorno',
          detail:
            'os divisores são linhas cheias de 1px em --unc-color-border-divider; o contorno do diálogo usa --unc-color-border-dialog. Não há contornos de 0,33px nem sombras em barras e cartões.',
        },
        {
          subject: 'Véu invariante entre temas',
          detail:
            '--unc-color-scrim é o mesmo nos dois temas (--unooria-color-opacity-brandpurple-600). O véu é roxo profundo e escurece qualquer fundo claro ou escuro na mesma medida.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escada de superfícies"
      description="As seis superfícies do módulo, em cada tema."
    />
    <UncDocGrid min={340} marginBottom={16}>
      <SurfaceLadder theme="light" />
      <SurfaceLadder theme="dark" />
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Elementos sobrepostos"
      description="Menu, Fab e Toast reais, sobre o canvas de cada tema."
    />
    <UncDocGrid min={340} marginBottom={16}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#475157', marginBottom: 8 }}>
          Tema claro · {OVERLAY_VALUES.light.value}
        </div>
        <OverlayShowcase theme="light" />
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#475157', marginBottom: 8 }}>
          Tema escuro · {OVERLAY_VALUES.dark.value}
        </div>
        <OverlayShowcase theme="dark" />
      </div>
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Véu de modal"
      description="Diálogo sobre --unc-color-scrim, nos dois temas."
    />
    <UncDocGrid min={340} marginBottom={16}>
      {(['light', 'dark'] as const).map((theme) => (
        <div
          key={theme}
          data-unc-theme={theme}
          style={{
            position: 'relative',
            height: 200,
            border: '1px solid #E4E8E9',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--unc-color-surface-canvas)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              color: 'var(--unc-color-text-primary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 'var(--unc-font-title-md-size)',
            }}
          >
            Conteúdo da tela · {theme === 'light' ? 'claro' : 'escuro'}
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--unc-color-scrim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'var(--unc-color-surface-dialog)',
                boxShadow: 'var(--unc-elevation-overlay)',
                color: 'var(--unc-color-text-primary)',
                fontFamily: 'var(--unc-font-sans)',
                fontSize: 'var(--unc-font-body-lg-size)',
                borderRadius: 'var(--unc-radius-s)',
                padding: '20px 24px',
              }}
            >
              Diálogo sobre o véu
            </div>
          </div>
        </div>
      ))}
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne o tema e veja a sobreposição e o menu se adaptarem."
    />
    <UncDocThemeSwitcher surface="canvas" padding={24}>
      {() => (
        <>
          <Menu items={uncMenuItems.slice(0, 3)} label="Menu de exemplo" />
          <Fab variant="camera" label="Abrir câmera" />
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 'var(--unc-radius-s)',
              background: 'var(--unc-color-surface-dialog)',
              boxShadow: 'var(--unc-elevation-overlay)',
              color: 'var(--unc-color-text-primary)',
              fontFamily: 'var(--unc-font-sans)',
              fontSize: 'var(--unc-font-body-lg-size)',
            }}
          >
            Camada de diálogo
          </div>
        </>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <UncDocPractices
      dos={[
        'Separar camadas de superfície trocando o degrau da escada, e não com sombra.',
        'Citar sempre var(--unc-elevation-overlay) em elementos sobrepostos — ele muda com o tema.',
        'Cobrir o conteúdo com --unc-color-scrim ao abrir um diálogo modal ou uma folha inferior.',
        'Manter divisores como linhas cheias de 1px em --unc-color-border-divider.',
      ]}
      donts={[
        'Adicionar box-shadow a barras, linhas de lista ou cartões: a superfície é plana.',
        'Escrever uma sombra própria em vez de usar o token de sobreposição.',
        'Copiar a sombra escura do tema claro para o escuro: ela não se vê sobre roxo profundo.',
        'Usar mais de um véu ao mesmo tempo — no máximo um modal por vez.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa dos tokens" />
    <UncDocPropsTable
      title="Tokens de elevação"
      rows={[
        {
          name: 'overlay',
          type: '--unc-elevation-overlay',
          default: uncElevation.overlay,
          description: `Sombra de elementos sobrepostos. Claro: ${OVERLAY_VALUES.light.value} (${OVERLAY_VALUES.light.unooria}). Escuro: ${OVERLAY_VALUES.dark.value} (${OVERLAY_VALUES.dark.unooria}).`,
        },
        {
          name: 'none',
          type: '--unc-elevation-none',
          default: uncElevation.none,
          description: 'Ausência de sombra — o padrão de todas as superfícies planas.',
        },
        {
          name: 'scrim',
          type: '--unc-color-scrim',
          default: 'rgba(14, 16, 57, 0.60)',
          description:
            'Véu aplicado atrás de diálogos e folhas; invariante entre temas (--unooria-color-opacity-brandpurple-600).',
        },
      ]}
    />
    <UncDocPropsTable
      title="Escada de superfícies"
      rows={LAYERS.map((layer) => ({
        name: layer.label,
        type: layer.cssVar,
        default: `${layer.light} · ${layer.dark}`,
        description: `${layer.description} Valores: claro · escuro.`,
      }))}
    />
  </UnooriaDocShell>
);

/**
 * Argumentos do playground de elevação.
 */
interface ElevationArgs {
  theme: UncDocTheme;
  base: string;
  overlay: string;
  withScrim: boolean;
  withShadow: boolean;
}

const meta: Meta<ElevationArgs> = {
  title: 'Unoochat/Fundamentos/Elevação',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<ElevationArgs>;

/**
 * Documentação rica e completa do sistema de elevação do Unoochat.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ElevacaoDocumentationPage />,
};

/**
 * Playground com as variáveis do sistema de elevação expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground de elevação',
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema aplicado ao contêiner (data-unc-theme).',
    },
    base: {
      control: 'select',
      options: LAYERS.map((layer) => layer.cssVar),
      description: 'Superfície de fundo.',
    },
    overlay: {
      control: 'select',
      options: LAYERS.map((layer) => layer.cssVar),
      description: 'Superfície da camada sobreposta.',
    },
    withScrim: { control: 'boolean', description: 'Aplica --unc-color-scrim entre as camadas.' },
    withShadow: {
      control: 'boolean',
      description: 'Aplica --unc-elevation-overlay à camada sobreposta.',
    },
  },
  args: {
    theme: 'light',
    base: '--unc-color-surface-canvas',
    overlay: '--unc-color-surface-dialog',
    withScrim: false,
    withShadow: true,
  },
  render: (args) => (
    <UncDocStage surface="base" padding={24}>
      <ElevationLab
        theme={args.theme}
        base={args.base}
        overlay={args.overlay}
        withScrim={args.withScrim}
        withShadow={args.withShadow}
      />
    </UncDocStage>
  ),
};

/**
 * Escada de superfícies nos dois temas.
 */
export const Superficies: Story = {
  name: '🎨 Escada de superfícies',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Escada de superfícies" />
      <UncDocGrid min={340}>
        <SurfaceLadder theme="light" />
        <SurfaceLadder theme="dark" />
      </UncDocGrid>
    </UnooriaDocShell>
  ),
};

/**
 * Menu, Fab e Toast sobrepostos ao canvas, nos dois temas.
 */
export const Sobreposicoes: Story = {
  name: '🎨 Elementos sobrepostos',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Elementos sobrepostos" />
      <UncDocGrid min={340}>
        <OverlayShowcase theme="light" />
        <OverlayShowcase theme="dark" />
      </UncDocGrid>
    </UnooriaDocShell>
  ),
};
