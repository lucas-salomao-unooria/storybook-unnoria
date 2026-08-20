import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { Fab } from '../../../src/whatsappmobile';
import { waElevation } from '../../../src/whatsappmobile/tokens';

const BAR = '#0CA996';

const LAYERS: { cssVar: string; label: string; description: string }[] = [
  {
    cssVar: '--wa-color-surface-base',
    label: '0 · base',
    description: 'Fundo do documento nas telas Settings e Starred messages.',
  },
  {
    cssVar: '--wa-color-surface-canvas',
    label: '1 · canvas',
    description: 'Fundo das telas de listagem.',
  },
  {
    cssVar: '--wa-color-surface-appbar',
    label: '2 · appbar',
    description: 'Barra superior, sub app bar e campo de busca.',
  },
  {
    cssVar: '--wa-color-surface-sheet',
    label: '3 · sheet',
    description: 'Folha de anexos, campo do compositor e chips.',
  },
  {
    cssVar: '--wa-color-surface-elevated',
    label: '4 · elevated',
    description: 'Menu suspenso e FAB secundário.',
  },
  {
    cssVar: '--wa-color-surface-dialog',
    label: '5 · dialog',
    description: 'Caixa de diálogo modal, o nível mais alto.',
  },
];

/**
 * Explorador de elevação: empilha uma superfície sobre outra e alterna a sombra
 * do glifo, mostrando por que o arquivo dispensa `box-shadow`.
 */
const ElevationLab: React.FC<{
  base: string;
  overlay: string;
  withScrim: boolean;
  fabShadow: boolean;
}> = ({ base, overlay, withScrim, fabShadow }) => (
  <div
    data-wa-theme="dark"
    style={{
      position: 'relative',
      width: 411,
      height: 260,
      background: `var(${base})`,
      borderRadius: 12,
      overflow: 'hidden',
    }}
  >
    {withScrim && (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--wa-color-scrim)' }} />
    )}
    <div
      style={{
        position: 'absolute',
        left: 40,
        top: 60,
        width: 331,
        padding: 20,
        borderRadius: 'var(--wa-radius-s)',
        background: `var(${overlay})`,
        color: 'var(--wa-color-text-dialog-title)',
        fontFamily: 'var(--wa-font-sans)',
        fontSize: 17,
      }}
    >
      Camada sobreposta
      <div
        style={{
          marginTop: 14,
          color: 'var(--wa-color-text-meta)',
          fontSize: 13,
        }}
      >
        {base} sob {overlay}
      </div>
    </div>
    <div style={{ position: 'absolute', right: 24, bottom: 20 }}>
      <span style={{ filter: fabShadow ? 'none' : 'drop-shadow(none)' }}>
        <Fab variant="chat" label="Nova conversa" />
      </span>
    </div>
  </div>
);

/**
 * Página de documentação rica do sistema de elevação.
 */
const ElevacaoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Fundamentos • Elevação"
      title="Elevação"
      description="O arquivo de origem é inteiramente plano: nenhuma superfície projeta sombra. A profundidade é comunicada exclusivamente por luminância crescente, em seis níveis de superfície. O único efeito de sombra do arquivo é um drop shadow de 0 4px 2px rgba(0,0,0,0.25) aplicado ao glifo interno dos botões de ação flutuantes — não ao círculo."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Como o produto separa camadas sem sombra."
    />
    <WaDocGrid>
      <WaDocCard icon="🪜" title="Elevação por luminância">
        Cada nível é 3 a 6 pontos de luminância mais claro que o anterior. Um menu sobre a barra
        superior é reconhecido porque é mais claro, não porque projeta sombra.
      </WaDocCard>
      <WaDocCard icon="🌑" title="Véu para modais">
        Diálogos usam <code>--wa-color-scrim</code> (preto a 60%) sobre todo o conteúdo, exceto a
        barra de status. É o único recurso de separação além da luminância.
      </WaDocCard>
      <WaDocCard icon="✨" title="Sombra apenas no glifo do FAB">
        O drop shadow existe unicamente no vetor interno do FAB (envelope, lápis). O círculo do
        botão é plano — replicar sombra no círculo divergiria do arquivo.
      </WaDocCard>
      <WaDocCard icon="🚫" title="Sem hairlines">
        Diferente do Instanooria, este arquivo não usa hairlines de contorno. Divisores são linhas
        cheias de 1px em <code>--wa-color-border-divider</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Figma e especificações técnicas"
      description="Arquivo de origem, nós de referência e desvios registrados."
    />
    <WaDocFigmaSpecs
      nodeId="1:2128"
      frameName="Chats Main Page · Group 224 (FAB)"
      specs={[
        { label: 'Sombras no arquivo', value: '1 (filter0_d_0_31)' },
        { label: 'Deslocamento', value: 'dy 4' },
        { label: 'Desfoque', value: 'stdDeviation 2' },
        { label: 'Cor', value: 'rgba(0,0,0,0.25)' },
        { label: 'Níveis de superfície', value: '6' },
        { label: 'Véu de modal', value: 'rgba(0,0,0,0.6)' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Estilos de efeito',
          detail:
            'o arquivo não publica estilos de efeito reutilizáveis. O token --wa-elevation-fab foi extraído do filtro SVG aplicado localmente ao glifo do FAB.',
        },
        {
          subject: 'Elevação de menus e diálogos',
          detail:
            'nenhuma sombra é desenhada sob o menu suspenso nem sob o diálogo. Introduzir uma seria um desvio; a biblioteca mantém ambos planos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Escada de superfícies"
      description="Os seis níveis empilhados, do mais escuro ao mais claro."
    />
    <WaDocStage surface="base" direction="column" align="stretch" gap={0} padding={0}>
      {LAYERS.map((layer) => (
        <div
          key={layer.cssVar}
          style={{
            background: `var(${layer.cssVar})`,
            padding: '18px 22px',
            fontFamily: 'var(--wa-font-sans)',
          }}
        >
          <div style={{ color: 'var(--wa-color-text-primary)', fontSize: 15, fontWeight: 700 }}>
            {layer.label}
          </div>
          <div style={{ color: 'var(--wa-color-text-meta)', fontSize: 13, marginTop: 2 }}>
            {layer.description}
          </div>
          <code style={{ color: 'var(--wa-color-accent)', fontSize: 11.5 }}>{layer.cssVar}</code>
        </div>
      ))}
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Sombra do glifo do FAB"
      description="Componentes reais renderizados sobre a superfície canvas."
    />
    <WaDocStage surface="canvas" padding={32} gap={32}>
      <Fab variant="chat" label="Nova conversa" />
      <Fab variant="camera" label="Abrir câmera" />
      <Fab variant="call" label="Nova chamada" />
      <Fab variant="mic" label="Gravar áudio" />
      <Fab variant="edit" label="Escrever status" />
      <Fab variant="endCall" label="Encerrar chamada" />
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Véu de modal"
      description="O único recurso de separação além da luminância."
    />
    <WaDocStage surface="canvas" padding={0} align="stretch" direction="column">
      <div style={{ position: 'relative', height: 200 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--wa-color-surface-canvas)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            color: 'var(--wa-color-text-primary)',
            fontFamily: 'var(--wa-font-sans)',
            fontSize: 21,
          }}
        >
          Conteúdo da tela
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--wa-color-scrim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'var(--wa-color-surface-dialog)',
              color: 'var(--wa-color-text-dialog-title)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 17,
              borderRadius: 'var(--wa-radius-s)',
              padding: '20px 24px',
            }}
          >
            Diálogo sobre --wa-color-scrim
          </div>
        </div>
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais para ver a elevação por luminância."
    />
    <ElevationLab
      base="--wa-color-surface-canvas"
      overlay="--wa-color-surface-dialog"
      withScrim
      fabShadow
    />
    <WaDocSurfaceSwitcher>
      {() => (
        <div
          style={{
            padding: '18px 22px',
            borderRadius: 'var(--wa-radius-s)',
            background: 'var(--wa-color-surface-dialog)',
            color: 'var(--wa-color-text-dialog-title)',
            fontFamily: 'var(--wa-font-sans)',
            fontSize: 15,
          }}
        >
          Camada de diálogo sobre a superfície escolhida
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Boas práticas" />
    <WaDocPractices
      dos={[
        'Separar camadas trocando a superfície, subindo um degrau na escada de luminância.',
        'Aplicar --wa-elevation-fab exclusivamente ao glifo interno do botão flutuante.',
        'Cobrir o conteúdo com --wa-color-scrim ao abrir um diálogo modal.',
        'Manter divisores como linhas cheias de 1px em --wa-color-border-divider.',
      ]}
      donts={[
        'Adicionar box-shadow a barras, cartões, menus ou diálogos.',
        'Aplicar a sombra do FAB ao círculo em vez do glifo.',
        'Simular profundidade com bordas translúcidas de outra marca.',
        'Usar mais de um véu simultâneo — o arquivo empilha no máximo um modal.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa dos tokens" />
    <WaDocPropsTable
      title="Tokens de elevação"
      rows={[
        {
          name: 'fab',
          type: '--wa-elevation-fab',
          default: waElevation.fab,
          description:
            'Drop shadow do glifo interno dos botões de ação flutuantes (filter0_d_0_31, node 1:2128).',
        },
        {
          name: 'none',
          type: '--wa-elevation-none',
          default: waElevation.none,
          description: 'Ausência de sombra — o padrão de todas as superfícies do arquivo.',
        },
        {
          name: 'scrim',
          type: '--wa-color-scrim',
          default: 'rgba(0, 0, 0, 0.6)',
          description: 'Véu aplicado atrás de diálogos modais (node 1:3503).',
        },
      ]}
    />
    <WaDocPropsTable
      title="Escada de superfícies"
      rows={LAYERS.map((layer) => ({
        name: layer.label,
        type: layer.cssVar,
        description: layer.description,
      }))}
    />
  </UnooriaDocShell>
);

/**
 * Argumentos do playground de elevação.
 */
interface ElevationArgs {
  base: string;
  overlay: string;
  withScrim: boolean;
  fabShadow: boolean;
}

const meta: Meta<ElevationArgs> = {
  title: 'Whatsapp Mobile/Fundamentos/Elevação',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<ElevationArgs>;

/**
 * Documentação rica e completa do sistema de elevação, baseada nas especificações do Figma.
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
    withScrim: { control: 'boolean', description: 'Aplica --wa-color-scrim entre as camadas.' },
    fabShadow: { control: 'boolean', description: 'Mantém o drop shadow do glifo do FAB.' },
  },
  args: {
    base: '--wa-color-surface-canvas',
    overlay: '--wa-color-surface-dialog',
    withScrim: true,
    fabShadow: true,
  },
  render: (args) => (
    <WaDocStage surface="base" padding={24}>
      <ElevationLab
        base={args.base}
        overlay={args.overlay}
        withScrim={args.withScrim}
        fabShadow={args.fabShadow}
      />
    </WaDocStage>
  ),
};

/**
 * Escada de superfícies empilhadas.
 */
export const Superficies: Story = {
  name: '🎨 Escada de superfícies',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Escada de superfícies" />
      <WaDocStage surface="base" direction="column" align="stretch" gap={0} padding={0}>
        {LAYERS.map((layer) => (
          <div
            key={layer.cssVar}
            style={{
              background: `var(${layer.cssVar})`,
              padding: '18px 22px',
              color: 'var(--wa-color-text-primary)',
              fontFamily: 'var(--wa-font-sans)',
              fontSize: 14,
            }}
          >
            {layer.label} · {layer.cssVar}
          </div>
        ))}
      </WaDocStage>
    </UnooriaDocShell>
  ),
};
