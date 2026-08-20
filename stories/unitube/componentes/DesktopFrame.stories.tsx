import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import {
  DesktopFrame,
  Sidebar,
  SidebarMenuItem,
  TopBar,
  TopMenuBar,
  VideoCard,
} from '../../../src/unitube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { avatars, categories, videos } from '../fixtures';

const meta: Meta<typeof DesktopFrame> = {
  title: 'Unitube/Componentes/DesktopFrame',
  component: DesktopFrame,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    label: { control: 'text' },
    height: { control: { type: 'number', min: 400, max: 2000, step: 50 } },
    scale: { control: { type: 'range', min: 0.3, max: 1, step: 0.05 } },
    className: { control: 'text' },
  },
  args: { label: 'Home — 1440 × 1024', height: 1024, scale: 0.6 },
};

export default meta;

type Story = StoryObj<typeof DesktopFrame>;

/** Miniatura de tela usada nas demonstrações da moldura. */
const MiniScreen = () => (
  <>
    <TopBar avatarSrc={avatars.currentUser} />
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <Sidebar>
        <Sidebar.Section divider={false}>
          <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Home" active href="#" />
          <SidebarMenuItem icon="explore" menuLabel="Explore" href="#" />
          <SidebarMenuItem icon="subscriptions" menuLabel="Subscriptions" href="#" />
        </Sidebar.Section>
      </Sidebar>
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <TopMenuBar options={categories} activeId="all" />
        <div style={{ display: 'flex', gap: 16, padding: 24, flexWrap: 'wrap' }}>
          {videos.slice(0, 4).map((video) => (
            <VideoCard
              key={video.id}
              thumbnailSrc={video.thumbnailSrc}
              avatarSrc={video.avatarSrc}
              duration={video.duration}
              videoTitle={video.videoTitle}
              channelName={video.channelName}
              metadata={video.metadata}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

const DesktopFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Documentação"
      title="DesktopFrame"
      description="Moldura de documentação, não de produção. Reproduz o quadro de 1440×1024 em que o arquivo desenha as três telas — Home (3:185), Channel (15:913) e Video (19:1900) —, para que as estórias possam mostrar uma composição na medida exata do Figma. Cumpre o mesmo papel que o PhoneFrame nos módulos móveis da plataforma."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que uma moldura de documentação existe."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📐" title="Medida exata do arquivo">
        As três telas do arquivo têm 1440×1024. A moldura permite comparar a composição em React com
        o quadro do Figma, pixel a pixel.
      </UniDocCard>
      <UniDocCard icon="🔍" title="Escala para caber na página">
        Um quadro de 1440px não cabe na largura de uma página de documentação. A prop{' '}
        <code>scale</code> reduz a moldura sem alterar as medidas internas.
      </UniDocCard>
      <UniDocCard icon="🚫" title="Não use em produto">
        Em aplicação real, <code>TopBar</code>, <code>Sidebar</code> e as colunas se adaptam à
        janela. A moldura serve apenas à documentação.
      </UniDocCard>
      <UniDocCard icon="🏷️" title="Rótulo opcional">
        Um <code>&lt;figcaption&gt;</code> abaixo da moldura identifica a tela nas estórias de telas
        compostas.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="3:185"
      frameName="Home · Channel · Video — página Screen"
      specs={[
        { label: 'Dimensões', value: '1440 × 1024' },
        { label: 'Telas no arquivo', value: '3' },
        { label: 'Superfície', value: '#181818 (background/primary)' },
        { label: 'Contorno', value: '1px · --uni-color-border-subtle' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Componente sem equivalente no arquivo',
          detail:
            'a moldura não corresponde a nenhum nó publicado: é um andaime de documentação que reproduz as dimensões dos três quadros de tela. Está no repertório da biblioteca — e não restrito a stories/ — para que qualquer consumidor possa reproduzir a comparação com o arquivo.',
        },
        {
          subject: 'Contorno acrescentado',
          detail:
            'os quadros do arquivo não têm contorno. O fio de 1px em --uni-color-border-subtle foi acrescentado para que a aresta da moldura fique visível sobre o fundo claro da página de documentação.',
        },
        {
          subject: 'Escala por transform',
          detail:
            'a redução usa transform: scale com origem no canto superior esquerdo, e o elemento externo reserva o espaço proporcional. Assim as medidas internas permanecem as do arquivo, e apenas a apresentação é reduzida.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Reserva de espaço',
          role: 'Elemento externo com a largura e a altura já multiplicadas pela escala.',
          token: 'prop scale',
        },
        {
          name: 'Tela',
          role: 'Quadro de 1440px com recorte, sobre o fundo principal.',
          token: '--uni-desktop-width',
        },
        {
          name: 'Rótulo',
          role: 'Legenda em Caption/Default abaixo da moldura.',
          token: '--uni-font-caption-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de escalas" barColor="#EE1A26" />
    <UniDocStage label="Escala de 60%" surface="primary" align="stretch" padding={16}>
      <DesktopFrame label="Home — 1440 × 1024" height={600} scale={0.6}>
        <MiniScreen />
      </DesktopFrame>
    </UniDocStage>
    <UniDocStage label="Escala de 40%" surface="primary" align="stretch" padding={16}>
      <DesktopFrame label="Home — 1440 × 1024" height={600} scale={0.4}>
        <MiniScreen />
      </DesktopFrame>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use a moldura apenas em documentação e em comparações com o arquivo.',
        'Ajuste scale para que o quadro caiba na largura disponível da página.',
        'Informe label para identificar qual das três telas está sendo mostrada.',
        'Mantenha a altura de 1024px ao reproduzir uma tela literal do arquivo.',
      ]}
      donts={[
        'Não use a moldura em produto: em aplicação, o layout se adapta à janela.',
        'Não altere a largura de 1440px, que é a medida dos quadros do arquivo.',
        'Não aninhe uma moldura dentro de outra.',
        'Não use scale maior que 1 — a moldura serve para reduzir, não ampliar.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A moldura sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={16}>
      {() => (
        <DesktopFrame label="Home — 1440 × 1024" height={520} scale={0.35}>
          <MiniScreen />
        </DesktopFrame>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="DesktopFrame"
      rows={[
        {
          name: 'label',
          type: 'React.ReactNode',
          description: 'Rótulo exibido abaixo da moldura, em <figcaption>.',
        },
        {
          name: 'height',
          type: 'number',
          default: '1024',
          description: 'Altura da moldura em pixels. O padrão é a altura literal dos quadros.',
        },
        {
          name: 'scale',
          type: 'number',
          default: '1',
          description:
            'Fator de escala aplicado à moldura, para que um quadro de 1440px caiba na largura disponível.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Conteúdo da tela.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos são repassados ao elemento da tela.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DesktopFrameDocumentationPage />,
};

/**
 * Playground com 100% das props do DesktopFrame expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do DesktopFrame',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <DesktopFrame {...args}>
        <MiniScreen />
      </DesktopFrame>
    </div>
  ),
};

/**
 * A moldura na medida literal do arquivo, sem redução.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-primary)', overflow: 'auto' }}
    >
      <DesktopFrame label="Home — 1440 × 1024" height={1024}>
        <MiniScreen />
      </DesktopFrame>
    </div>
  ),
};

/**
 * A mesma tela em quatro escalas.
 */
export const Tamanhos: Story = {
  name: 'Escalas',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding: 24,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      {[0.5, 0.35, 0.25].map((scale) => (
        <DesktopFrame key={scale} label={`Escala ${scale * 100}%`} height={600} scale={scale}>
          <MiniScreen />
        </DesktopFrame>
      ))}
    </div>
  ),
};
