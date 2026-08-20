import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, Tooltip } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof Tooltip> = {
  title: 'Tik Tooria/Componentes/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    title: 'Tap to create',
    description: 'a new video',
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;


const TooltipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Perfil"
      title="Tooltip"
      description="Chamada “Tap to create a new video” do perfil. O balão de 130×98,9 com rabicho inferior é o vetor literal do nó 4:453, renderizado como fundo em SVG para que o rabicho acompanhe o contorno sem recorte — a sombra é aplicada ao próprio caminho, via drop-shadow."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="💬" title="Balão com rabicho">
        O rabicho de 12px aponta para o centro inferior. Como é parte do mesmo caminho vetorial, a sombra o acompanha sem costura visível.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Dois degraus com tracking">
        Bold 16 com +0,5px na primeira linha e Regular 15 com +0,5px na segunda. É o único par do arquivo com tracking positivo em ambas as linhas.
      </TikDocCard>
      <TikDocCard icon="☁️" title="Sombra no caminho">
        <code>drop-shadow</code> no SVG, em vez de <code>box-shadow</code> na caixa — o que respeita o contorno do rabicho.
      </TikDocCard>
      <TikDocCard icon="🎨" title="Ilustração por slot">
        O arquivo desenha um grupo de dez nós decorativos. O slot aceita qualquer <code>ReactNode</code>, para que um produto injete a própria arte.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:452"
      frameName="Bubble — TikTok User"
      specs={[
        { label: 'Dimensões', value: '130 × 98,9' },
        { label: 'Rabicho', value: '12px, centro inferior' },
        { label: 'Título', value: 'Bold 16 · +0,5px' },
        { label: 'Sombra', value: '0 4px 10px preto 10%' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Ilustração como slot',
          detail:
            'o grupo “Illustrations” (node 4:454) reúne dez nós decorativos coloridos. Em vez de embutir a arte no pacote, o componente expõe o slot illustration — mesma decisão adotada nos glifos de ilustração da câmera.',
        },
        {
          subject: 'Sombra via drop-shadow',
          detail:
            'o arquivo aplica um DROP_SHADOW ao vetor do balão. Reproduzido com filter: drop-shadow no SVG, e não com box-shadow, que recortaria o rabicho.',
        },
        {
          subject: 'Rótulos em duas linhas separadas',
          detail:
            'o arquivo usa dois nós de texto (“Tap to create” e “a new video”). O componente mantém a separação em title e description, preservando os dois degraus distintos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Balão', role: 'Vetor literal com rabicho inferior, pintado na superfície primária.', token: 'glifo calloutBubble · --tik-elevation-tooltip' },
        { name: 'Ilustração', role: 'Slot opcional no topo do conteúdo.' },
        { name: 'Título', role: 'Bold 16 com tracking de +0,5px.', token: '--tik-font-callout-*' },
        { name: 'Descrição', role: 'Regular 15 com tracking de +0,5px.', token: '--tik-font-body-wide-*' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — “TikTok User”" surface="chrome" gap={40}>
      <Tooltip title="Tap to create" description="a new video" />
    </TikDocStage>
    <TikDocStage label="Só título, e com ilustração" surface="chrome" gap={40}>
      <Tooltip title="Tap to create" />
      <Tooltip
        title="Tap to create"
        description="a new video"
        illustration={<Icon name="effectsIllustration" size={28} />}
      />
    </TikDocStage>
    <TikDocStage label="Sobre a grade de mídia, onde o arquivo o posiciona" surface="chrome" gap={40}>
      <div
        style={{
          position: 'relative',
          width: 274,
          height: 182,
          background: 'var(--tik-color-surface-media)',
        }}
      >
        <div style={{ position: 'absolute', left: 72, top: 42 }}>
          <Tooltip title="Tap to create" description="a new video" />
        </div>
      </div>
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Posicione a chamada sobre o conteúdo que ela explica, com o rabicho apontando para baixo.',
        'Mantenha as duas linhas curtas: o balão tem 130px de largura fixa.',
        'Use o slot illustration para arte própria, em vez de embutir imagens no pacote.',
      ]}
      donts={[
        'Não troque a sombra por box-shadow: o rabicho ficaria sem sombra.',
        'Não alargue o balão — o vetor tem largura fixa.',
        'Não use a chamada sobre superfície imersiva: o balão é branco.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <Tooltip title="Tap to create" description="a new video" />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Tooltip"
      rows={[
        {
          name: 'title',
          type: "React.ReactNode",
          description:
            'Primeira linha, em Bold 16 com tracking de +0,5px.',
        },
        {
          name: 'description',
          type: "React.ReactNode",
          description:
            'Segunda linha, em Regular 15 com tracking de +0,5px.',
        },
        {
          name: 'illustration',
          type: "React.ReactNode",
          description:
            'Ilustração no topo do balão. Slot livre, para que o produto injete a própria arte.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
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
  render: () => <TooltipDocumentationPage />,
};

/**
 * Playground com 100% das props do Tooltip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Tooltip',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <Tooltip {...args} />
    </div>
  ),
};

/**
 * Réplica visual da chamada do frame “TikTok User”, sobre a grade de mídia.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 414,
        height: 240,
        background: 'var(--tik-color-surface-media)',
      }}
    >
      <div style={{ position: 'absolute', left: 142, top: 60 }}>
        <Tooltip title="Tap to create" description="a new video" />
      </div>
    </div>
  ),
};

/**
 * Com uma linha, duas linhas e ilustração.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', padding: 32 }}>
      <Tooltip title="Tap to create" />
      <Tooltip title="Tap to create" description="a new video" />
      <Tooltip
        title="Tap to create"
        description="a new video"
        illustration={<Icon name="effectsIllustration" size={26} />}
      />
    </div>
  ),
};
