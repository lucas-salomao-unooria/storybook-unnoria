import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
import { Avatar, Badge, FloatingButton, Snackbar, TabBar } from '../../../src/unoovista';
import {
  unvColorTokens,
  unvElevation,
  unvGradients,
} from '../../../src/unoovista/tokens';

const BAR = '#716C98';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DOC_BORDER = '#E4E8E9';
const DOC_MUTED = '#475157';

const THEMES: UnvDocTheme[] = ['light', 'dark'];
const THEME_LABEL: Record<UnvDocTheme, string> = { light: 'Tema claro', dark: 'Tema escuro' };

const overlayToken = unvColorTokens.elevationOverlay;
const scrimToken = unvColorTokens.overlayScrim;

/**
 * Camadas de superfície do módulo, da tela ao menu.
 */
const LAYERS: {
  cssVar: string;
  label: string;
  description: string;
  key: 'backgroundSecondary' | 'backgroundPrimary' | 'backgroundTertiary' | 'backgroundElevated';
}[] = [
  {
    cssVar: '--unv-color-background-secondary',
    label: 'secondary · tela',
    description: 'Fundo do documento, atrás dos cartões de publicação.',
    key: 'backgroundSecondary',
  },
  {
    cssVar: '--unv-color-background-primary',
    label: 'primary · cartão',
    description: 'Cartões de publicação, telas de conteúdo e perfil.',
    key: 'backgroundPrimary',
  },
  {
    cssVar: '--unv-color-background-tertiary',
    label: 'tertiary · bloco sutil',
    description: 'Cápsulas, contadores e mídia ainda não carregada.',
    key: 'backgroundTertiary',
  },
  {
    cssVar: '--unv-color-background-elevated',
    label: 'elevated · sobreposição',
    description: 'Menus, folhas inferiores, diálogos, doca e avisos.',
    key: 'backgroundElevated',
  },
];

/**
 * Fios de 1px que separam barras e listas.
 */
const HAIRLINES: { key: keyof typeof unvElevation; cssVar: string; description: string }[] = [
  {
    key: 'hairlineBottom',
    cssVar: '--unv-elevation-hairline-bottom',
    description: 'Fio inferior de 1px em border-subtle: divisor sob uma linha de lista.',
  },
  {
    key: 'hairlineTop',
    cssVar: '--unv-elevation-hairline-top',
    description: 'Fio superior de 1px em border-subtle: divisor sobre um rodapé.',
  },
  {
    key: 'barBottom',
    cssVar: '--unv-elevation-bar-bottom',
    description: 'Fio inferior de 1px em border-bar: base de uma barra superior, quando há fio.',
  },
  {
    key: 'barTop',
    cssVar: '--unv-elevation-bar-top',
    description: 'Fio superior de 1px em border-bar: topo de uma barra inferior, quando há fio.',
  },
  {
    key: 'drawer',
    cssVar: '--unv-elevation-drawer',
    description: 'Fio lateral de 1px em border-subtle: borda de uma gaveta lateral.',
  },
];

const caption: React.CSSProperties = {
  color: 'var(--unv-color-text-secondary)',
  fontFamily: 'var(--unv-font-sans)',
  fontSize: 'var(--unv-font-caption-md-size)',
  lineHeight: 'var(--unv-font-caption-md-line)',
};

/**
 * Empilhamento de camadas em um tema: cada superfície sobre a anterior.
 */
const LayerStack: React.FC<{ theme: UnvDocTheme }> = ({ theme }) => (
  <UnvDocStage
    label={THEME_LABEL[theme]}
    theme={theme}
    surface="secondary"
    direction="column"
    align="stretch"
    gap={0}
    padding={16}
  >
    <div
      style={{
        background: 'var(--unv-color-background-secondary)',
        padding: '0 0 var(--unv-spacing-m)',
        ...caption,
      }}
    >
      {LAYERS[0].label} · {unvColorTokens[LAYERS[0].key][theme].value}
    </div>
    <div
      style={{
        background: 'var(--unv-color-background-primary)',
        borderRadius: 'var(--unv-radius-l)',
        padding: 'var(--unv-spacing-l)',
        display: 'grid',
        gap: 'var(--unv-spacing-m)',
      }}
    >
      <div style={caption}>
        {LAYERS[1].label} · {unvColorTokens[LAYERS[1].key][theme].value}
      </div>
      <div
        style={{
          background: 'var(--unv-color-background-tertiary)',
          borderRadius: 'var(--unv-radius-m)',
          padding: 'var(--unv-spacing-m)',
          ...caption,
        }}
      >
        {LAYERS[2].label} · {unvColorTokens[LAYERS[2].key][theme].value}
      </div>
      <div
        style={{
          background: 'var(--unv-color-background-elevated)',
          borderRadius: 'var(--unv-radius-m)',
          boxShadow: 'var(--unv-elevation-overlay)',
          padding: 'var(--unv-spacing-m)',
          ...caption,
        }}
      >
        {LAYERS[3].label} · {unvColorTokens[LAYERS[3].key][theme].value}
      </div>
    </div>
  </UnvDocStage>
);

/**
 * Elementos sobrepostos reais — doca, botão flutuante e aviso — sobre a tela de um tema.
 */
const OverlayShowcase: React.FC<{ theme: UnvDocTheme }> = ({ theme }) => (
  <div
    data-unv-theme={theme}
    style={{
      position: 'relative',
      height: 320,
      background: 'var(--unv-color-background-secondary)',
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        margin: 'var(--unv-spacing-l)',
        marginTop: 72,
        height: 96,
        borderRadius: 'var(--unv-radius-l)',
        background: 'var(--unv-color-background-primary)',
      }}
    />
    <FloatingButton icon="chevronDown" placement="top">
      Novas publicações
    </FloatingButton>
    <Snackbar open message="Publicação salva." actionLabel="Desfazer" onAction={() => undefined} offset={96} />
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
      <TabBar activeId="feed" withHomeIndicatorInset={false} />
    </div>
  </div>
);

/**
 * Um fio de 1px demonstrado sobre uma linha de lista.
 */
const HairlineSample: React.FC<{ item: (typeof HAIRLINES)[number] }> = ({ item }) => (
  <div>
    <div
      style={{
        height: 44,
        borderRadius: 'var(--unv-radius-s)',
        background: 'var(--unv-color-background-primary)',
        boxShadow: `var(${item.cssVar})`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--unv-spacing-l)',
        color: 'var(--unv-color-text-primary)',
        fontFamily: 'var(--unv-font-sans)',
        fontSize: 'var(--unv-font-body-md-size)',
      }}
    >
      Linha de lista
    </div>
    <div style={{ ...caption, marginTop: 6, fontFamily: MONO }}>{item.cssVar}</div>
  </div>
);

/**
 * Anéis dos gradientes, com o `Avatar` real, sobre a tela de um tema.
 */
const GradientRings: React.FC<{ theme: UnvDocTheme }> = ({ theme }) => (
  <UnvDocStage label={THEME_LABEL[theme]} theme={theme} surface="primary" gap={28} padding={24}>
    <div style={{ textAlign: 'center' }}>
      <Avatar initials="AL" size="xl" ring="story" />
      <div style={{ ...caption, marginTop: 8 }}>--unv-gradient-story</div>
      <div style={{ ...caption, fontFamily: MONO }}>{unvGradients.story[theme].join(' → ')}</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar initials="MC" size="xl" ring="live" />
      <div style={{ ...caption, marginTop: 8 }}>--unv-gradient-live</div>
      <div style={{ ...caption, fontFamily: MONO }}>{unvGradients.live[theme].join(' → ')}</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Badge variant="live">LIVE</Badge>
      <div style={{ ...caption, marginTop: 8 }}>--unv-gradient-livebadge</div>
      <div style={{ ...caption, fontFamily: MONO }}>{unvGradients.liveBadge.join(' → ')}</div>
    </div>
  </UnvDocStage>
);

/**
 * Explorador de elevação: empilha uma camada sobre uma superfície, com ou sem
 * o véu e com ou sem o token de sobreposição.
 */
interface ElevationArgs {
  theme: UnvDocTheme;
  base: string;
  layer: string;
  radius: string;
  withScrim: boolean;
  withShadow: boolean;
}

const ElevationLab: React.FC<ElevationArgs> = ({
  theme,
  base,
  layer,
  radius,
  withScrim,
  withShadow,
}) => (
  <div
    data-unv-theme={theme}
    style={{
      position: 'relative',
      width: 375,
      maxWidth: '100%',
      height: 260,
      background: `var(${base})`,
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    {withScrim && (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--unv-color-overlay-scrim)' }} />
    )}
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        top: 60,
        padding: 20,
        borderRadius: `var(${radius})`,
        background: `var(${layer})`,
        boxShadow: withShadow ? 'var(--unv-elevation-overlay)' : 'none',
        color: 'var(--unv-color-text-primary)',
        fontFamily: 'var(--unv-font-sans)',
        fontSize: 'var(--unv-font-body-lg-size)',
      }}
    >
      Camada sobreposta
      <div
        style={{
          marginTop: 12,
          color: 'var(--unv-color-text-secondary)',
          fontSize: 'var(--unv-font-body-md-size)',
        }}
      >
        {layer} sobre {base}
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
      badgeBrand="Unoovista"
      category="Fundamentos • Elevação & Gradientes"
      title="Elevação & Gradientes"
      description="O Unoovista é plano por camadas: a profundidade vem da troca de superfície — tela, cartão, bloco sutil, elevada — e do espaço entre elas. A única sombra do módulo é --unv-elevation-overlay, definida por tema e aplicada só ao que flutua: a doca de navegação, menus, diálogos, folhas, avisos, o botão flutuante e a pílula de ações da publicação. Os fios são de 1px, e três gradientes — story, ao vivo e etiqueta LIVE — marcam o que está em destaque."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como o produto separa camadas e destaca o que flutua, nos dois temas."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🪜" title="Camadas em vez de sombras">
        Tela, cartão e bloco sutil se distinguem pelo degrau de superfície, e o espaço faz o resto.
        Cartões e barras <strong>não</strong> projetam sombra: nada de fio de largura total nem de
        contorno de 0,33px.
      </UnvDocCard>
      <UnvDocCard icon="☁️" title="Uma sombra para tudo que flutua">
        <code>--unv-elevation-overlay</code> vale para a doca, menus, diálogos, folhas, avisos, o
        botão flutuante e a pílula de ações do post. No claro é um halo roxo difuso; no escuro é um
        halo claro de 10%, porque uma sombra escura não se vê sobre roxo profundo.
      </UnvDocCard>
      <UnvDocCard icon="🌑" title="Véu para modais">
        Diálogos e folhas modais usam <code>--unv-color-overlay-scrim</code> (roxo profundo a 50%,
        igual nos dois temas) sobre todo o conteúdo — a segunda ferramenta de separação, além da
        sombra.
      </UnvDocCard>
      <UnvDocCard icon="➖" title="Fios de 1px">
        Onde há divisor, ele mede 1px em <code>border-subtle</code> ou <code>border-bar</code>, e é
        entregue por tokens de sombra sem desfoque (<code>--unv-elevation-hairline-*</code>).
      </UnvDocCard>
      <UnvDocCard icon="🎞️" title="Gradientes de destaque">
        <code>--unv-gradient-story</code> e <code>--unv-gradient-live</code> variam com o tema; a
        etiqueta <code>--unv-gradient-livebadge</code> é invariante e leva texto branco sobre as duas
        pontas.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="O token de sobreposição, o véu, os fios e as decisões registradas."
    />
    <UnvDocSpecs
      component="../tokens"
      layout="Plano por camadas · 1 sombra por tema"
      specs={[
        { label: 'Token de sombra', value: '--unv-elevation-overlay' },
        { label: 'Claro', value: overlayToken.light.value },
        { label: 'Origem (claro)', value: overlayToken.light.unooria },
        { label: 'Escuro', value: overlayToken.dark.value },
        { label: 'Origem (escuro)', value: overlayToken.dark.unooria },
        { label: 'Véu de modal', value: scrimToken.light.value },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Um único token, valor por tema',
          detail:
            'os componentes citam sempre --unv-elevation-overlay; a definição vive em colors.css, no bloco de cada tema. Um componente novo herda o comportamento sem conhecer o tema.',
        },
        {
          subject: 'Halo claro no tema escuro',
          detail:
            'a sombra roxa do claro some sobre superfícies de roxo profundo. O tema escuro adota o halo de --unooria-elevation-neutral-2 (0 0 8px 4px, branco a 10%), o mesmo recurso que a Plataforma Unooria usa para elevar sobre fundo escuro. Nenhum dos dois é derivado do outro: cada um é o token nomeado da origem.',
        },
        {
          subject: 'Camadas, não fios de largura total',
          detail:
            'a tela usa background-secondary e os cartões, background-primary; a diferença de luminância separa os dois. A barra superior não tem fio inferior, e a doca é uma cápsula flutuante em vez de uma faixa com fio superior.',
        },
        {
          subject: 'Sombra só onde há sobreposição',
          detail:
            'barras, cartões, listas e pílulas de chip não recebem sombra. A pílula de ações do post é a exceção que confirma a regra: ela é sobreposta à base da mídia, e por isso leva a sombra de sobreposição.',
        },
        {
          subject: 'Fios de 1px em sombra sem desfoque',
          detail:
            'os cinco tokens --unv-elevation-hairline-* e -bar-* são sombras de deslocamento de 1px e desfoque zero, em border-subtle ou border-bar. O módulo não usa o fio de 0,33px.',
        },
        {
          subject: 'Véu invariante entre temas',
          detail:
            '--unv-color-overlay-scrim é o mesmo nos dois temas (--unooria-color-opacity-brandpurple-500): roxo profundo a 50% escurece um fundo claro ou escuro na mesma medida.',
        },
        {
          subject: 'Gradientes por tema e um invariante',
          detail:
            'story e ao vivo têm três paradas nomeadas em cada tema, para manter 3:1 contra a tela; a etiqueta LIVE tem duas paradas fixas (brandpurple-800 e danger-600), ambas com contraste de 4,5:1 para o texto branco.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Camadas de superfície"
      description="Tela, cartão, bloco sutil e superfície elevada, empilhados em cada tema."
    />
    <UnvDocGrid min={340} marginBottom={16}>
      <LayerStack theme="light" />
      <LayerStack theme="dark" />
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Elementos sobrepostos"
      description="Doca, botão flutuante e aviso reais, sobre a tela de cada tema."
    />
    <UnvDocGrid min={340} marginBottom={16}>
      {THEMES.map((theme) => (
        <div key={theme}>
          <div style={{ fontSize: 12, fontWeight: 600, color: DOC_MUTED, marginBottom: 8 }}>
            {THEME_LABEL[theme]} · {unvColorTokens.elevationOverlay[theme].value}
          </div>
          <OverlayShowcase theme={theme} />
        </div>
      ))}
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Fios de 1px"
      description="Os cinco tokens de fio, aplicados a uma linha de lista sobre a tela."
    />
    <UnvDocStage surface="secondary" direction="column" align="stretch" padding={20} gap={16}>
      {HAIRLINES.map((item) => (
        <HairlineSample key={item.key} item={item} />
      ))}
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Gradientes"
      description="Anéis de story e ao vivo, que variam com o tema, e a etiqueta LIVE, invariante."
    />
    <GradientRings theme="light" />
    <GradientRings theme="dark" />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Véu de modal e suporte a temas"
      description="Alterne o tema e veja a sobreposição, o véu e a doca se adaptarem."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={24}>
      {(theme) => (
        <div style={{ width: '100%', maxWidth: 375 }}>
          <div
            style={{
              position: 'relative',
              height: 240,
              borderRadius: 'var(--unv-radius-l)',
              overflow: 'hidden',
              background: 'var(--unv-color-background-primary)',
            }}
          >
            <div
              style={{
                padding: 'var(--unv-spacing-l)',
                color: 'var(--unv-color-text-primary)',
                fontFamily: 'var(--unv-font-sans)',
                fontSize: 'var(--unv-font-title-md-size)',
              }}
            >
              Conteúdo da tela · {theme === 'light' ? 'claro' : 'escuro'}
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--unv-color-overlay-scrim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  background: 'var(--unv-color-background-elevated)',
                  boxShadow: 'var(--unv-elevation-overlay)',
                  color: 'var(--unv-color-text-primary)',
                  fontFamily: 'var(--unv-font-sans)',
                  fontSize: 'var(--unv-font-body-lg-size)',
                  borderRadius: 'var(--unv-radius-l)',
                  padding: '20px 24px',
                }}
              >
                Diálogo sobre o véu
              </div>
            </div>
          </div>
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Separar cartões da tela trocando o degrau de superfície (secondary → primary), e não com sombra.',
        'Citar sempre var(--unv-elevation-overlay) em elementos sobrepostos — ele muda com o tema.',
        'Cobrir o conteúdo com --unv-color-overlay-scrim ao abrir um diálogo modal ou uma folha modal.',
        'Usar os tokens --unv-elevation-hairline-* quando um divisor de 1px for necessário.',
        'Usar os gradientes de anel só em molduras de avatar e bolhas de story, com o recorte de 32%.',
      ]}
      donts={[
        'Adicionar box-shadow a cartões, linhas de lista ou chips: a superfície é plana.',
        'Escrever uma sombra própria em vez de usar o token de sobreposição.',
        'Copiar a sombra escura do tema claro para o escuro: ela não se vê sobre roxo profundo.',
        'Usar fios de 0,33px ou uma faixa com fio de largura total como barra.',
        'Usar mais de um véu ao mesmo tempo — no máximo um modal por vez.',
        'Depender só do gradiente para marcar story ou transmissão: o recorte arredondado é a pista de forma.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="9. Referência completa dos tokens" />
    <UnvDocPropsTable
      title="Sombra de sobreposição e véu"
      rows={[
        {
          name: 'overlay',
          type: overlayToken.cssVar,
          default: `${overlayToken.light.value} · ${overlayToken.dark.value}`,
          description: `${overlayToken.usage}. Origem: ${overlayToken.light.unooria} (claro) e ${overlayToken.dark.unooria} (escuro).`,
        },
        {
          name: 'scrim',
          type: scrimToken.cssVar,
          default: scrimToken.light.value,
          description: `${scrimToken.usage}. Invariante entre temas; origem: ${scrimToken.light.unooria}.`,
        },
      ]}
    />
    <UnvDocPropsTable
      title="Fios de 1px"
      rows={HAIRLINES.map((item) => ({
        name: item.key,
        type: item.cssVar,
        default: unvElevation[item.key],
        description: item.description,
      }))}
    />
    <UnvDocPropsTable
      title="Gradientes"
      rows={[
        {
          name: 'story',
          type: '--unv-gradient-story',
          default: `${unvGradients.story.light.join(' → ')} · ${unvGradients.story.dark.join(' → ')}`,
          description:
            'Anel de story não visto, a 204°, em três paradas por tema (0%, 52% e 100%). Claro · escuro.',
        },
        {
          name: 'live',
          type: '--unv-gradient-live',
          default: `${unvGradients.live.light.join(' → ')} · ${unvGradients.live.dark.join(' → ')}`,
          description:
            'Anel de transmissão ao vivo, a 136°, em três paradas por tema (0%, 52% e 100%). Claro · escuro.',
        },
        {
          name: 'liveBadge',
          type: '--unv-gradient-livebadge',
          default: unvGradients.liveBadge.join(' → '),
          description:
            'Etiqueta LIVE, a 140°, em duas paradas invariantes entre temas, com texto branco (--unv-color-text-on-media).',
        },
      ]}
    />
    <UnvDocPropsTable
      title="Camadas de superfície"
      rows={LAYERS.map((layer) => ({
        name: layer.key,
        type: layer.cssVar,
        default: `${unvColorTokens[layer.key].light.value} · ${unvColorTokens[layer.key].dark.value}`,
        description: `${layer.description} Valores: claro · escuro.`,
      }))}
    />
  </UnooriaDocShell>
);

const SURFACE_OPTIONS = LAYERS.map((layer) => layer.cssVar);
const RADIUS_OPTIONS = [
  '--unv-radius-xs',
  '--unv-radius-s',
  '--unv-radius-m',
  '--unv-radius-l',
  '--unv-radius-xl',
  '--unv-radius-full',
];

const meta: Meta<ElevationArgs> = {
  title: 'Unoovista/Fundamentos/Elevação & Gradientes',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<ElevationArgs>;

/**
 * Documentação rica e completa do sistema de elevação e dos gradientes do Unoovista.
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
      description: 'Tema aplicado ao contêiner (data-unv-theme).',
    },
    base: {
      control: 'select',
      options: SURFACE_OPTIONS,
      description: 'Superfície de fundo.',
    },
    layer: {
      control: 'select',
      options: SURFACE_OPTIONS,
      description: 'Superfície da camada sobreposta.',
    },
    radius: {
      control: 'select',
      options: RADIUS_OPTIONS,
      description: 'Raio de borda da camada sobreposta.',
    },
    withScrim: { control: 'boolean', description: 'Aplica --unv-color-overlay-scrim entre as camadas.' },
    withShadow: {
      control: 'boolean',
      description: 'Aplica --unv-elevation-overlay à camada sobreposta.',
    },
  },
  args: {
    theme: 'light',
    base: '--unv-color-background-secondary',
    layer: '--unv-color-background-elevated',
    radius: '--unv-radius-l',
    withScrim: false,
    withShadow: true,
  },
  render: (args) => (
    <UnvDocStage surface="secondary" padding={24}>
      <ElevationLab {...args} />
    </UnvDocStage>
  ),
};

/**
 * Camadas de superfície nos dois temas.
 */
export const Camadas: Story = {
  name: '🎨 Camadas de superfície',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Camadas de superfície" />
      <UnvDocGrid min={340}>
        <LayerStack theme="light" />
        <LayerStack theme="dark" />
      </UnvDocGrid>
    </UnooriaDocShell>
  ),
};

/**
 * Doca, botão flutuante e aviso sobrepostos à tela, nos dois temas.
 */
export const Sobreposicoes: Story = {
  name: '🎨 Elementos sobrepostos',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Elementos sobrepostos" />
      <UnvDocGrid min={340}>
        <OverlayShowcase theme="light" />
        <OverlayShowcase theme="dark" />
      </UnvDocGrid>
    </UnooriaDocShell>
  ),
};

/**
 * Anéis de story e ao vivo e etiqueta LIVE nos dois temas.
 */
export const Gradientes: Story = {
  name: '🎨 Gradientes',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Gradientes" />
      <GradientRings theme="light" />
      <GradientRings theme="dark" />
    </UnooriaDocShell>
  ),
};
