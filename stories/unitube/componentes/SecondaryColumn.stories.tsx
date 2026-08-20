import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { SecondaryColumn, TopMenuItem, VideoCardSidebar } from '../../../src/unitube';
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
import { suggestions } from '../fixtures';

const meta: Meta<typeof SecondaryColumn> = {
  title: 'Unitube/Componentes/SecondaryColumn',
  component: SecondaryColumn,
  parameters: { layout: 'fullscreen' },
  argTypes: { className: { control: 'text' } },
  args: {},
};

export default meta;

type Story = StoryObj<typeof SecondaryColumn>;

/** Barra de filtros do topo da coluna, como no arquivo. */
const Header = () => (
  <>
    <TopMenuItem label="Item" active />
    <TopMenuItem label="From Marcus Levin" />
  </>
);

/** Pilha de sugestões da coluna. */
const Suggestions = ({ count = 8 }: { count?: number }) => (
  <>
    {suggestions.slice(0, count).map((suggestion) => (
      <VideoCardSidebar
        key={suggestion.id}
        thumbnailSrc={suggestion.thumbnailSrc}
        duration={suggestion.duration}
        videoTitle={suggestion.videoTitle}
        channelName={suggestion.channelName}
        metadata={suggestion.metadata}
      />
    ))}
  </>
);

const SecondaryColumnDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Layout"
      title="SecondaryColumn"
      description="Reprodução do nó Layout/SecondaryColumn (20:2996), 426×968, a coluna de sugestões da tela de vídeo. O recuo é assimétrico — 24/24/0/0, sem folga inferior: a pilha de sugestões do arquivo tem 1530px de altura contra os 968px visíveis, ou seja, é deliberadamente cortada pela aresta do quadro."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A coluna de sugestões da tela de vídeo."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📐" title="Recuo assimétrico">
        <code>24/24/0/0</code> — sem folga à esquerda nem embaixo. A esquerda encosta na coluna
        principal, e a base é cortada pela aresta da tela.
      </UniDocCard>
      <UniDocCard icon="🎚️" title="Cabeçalho de filtros">
        O arquivo coloca duas pílulas no topo da coluna: uma genérica e outra com o nome do canal.
        Entram pelo slot <code>header</code>.
      </UniDocCard>
      <UniDocCard icon="📜" title="Pilha cortada">
        1530px de sugestões em 968px visíveis. O corte é intencional: a lista continua ao rolar a
        página.
      </UniDocCard>
      <UniDocCard icon="🧩" title="Contêiner de composição">
        Não recebe dados por prop. Empilha os <code>VideoCardSidebar</code> que o produto compuser.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="20:2996"
      frameName="Layout/SecondaryColumn"
      specs={[
        { label: 'Dimensões', value: '426 × 968' },
        { label: 'Recuo', value: '24 / 24 / 0 / 0' },
        { label: 'Conteúdo', value: '402 × 1530' },
        { label: 'Superfície', value: '#181818 (background/primary)' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Altura fluida',
          detail:
            'o arquivo fixa 968px e corta a pilha. O componente adota altura por conteúdo, para que a coluna acompanhe a quantidade real de sugestões.',
        },
        {
          subject: 'Recuo simétrico em janelas estreitas',
          detail:
            'abaixo de 900px o recuo assimétrico passa a 24px uniformes e a coluna ocupa a largura inteira, porque nesse ponto ela deixa de estar ao lado da coluna principal.',
        },
        {
          subject: 'Cabeçalho como slot',
          detail:
            'o arquivo desenha as duas pílulas dentro do frame da coluna. O componente as expõe pelo slot header, para que o produto escolha quais filtros existem.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Coluna',
          role: 'Contêiner de 426px com recuo assimétrico 24/24/0/0.',
          token: '--uni-secondary-column-width',
        },
        {
          name: 'Cabeçalho',
          role: 'Linha de pílulas de filtro, com folga inferior de 12px.',
          token: 'prop header',
        },
        {
          name: 'Pilha',
          role: 'Coluna vertical de sugestões, sem separador entre elas.',
          token: 'prop children',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de composição" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch" padding={0}>
      <SecondaryColumn header={<Header />}>
        <Suggestions />
      </SecondaryColumn>
    </UniDocStage>
    <UniDocStage label="Sem cabeçalho de filtros" surface="primary" align="stretch" padding={0}>
      <SecondaryColumn>
        <Suggestions count={4} />
      </SecondaryColumn>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Componha a pilha com VideoCardSidebar.',
        'Use o slot header para as pílulas de filtro do topo.',
        'Deixe o recuo assimétrico: é o que encosta a coluna na principal.',
        'Empilhe as sugestões sem separador entre elas.',
      ]}
      donts={[
        'Não passe dados por prop: a coluna é um contêiner de composição.',
        'Não adicione folga inferior — o arquivo corta a pilha na aresta.',
        'Não use cartões de outro formato na pilha.',
        'Não adicione sombra nem contorno à coluna.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A coluna sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={0}>
      {() => (
        <SecondaryColumn header={<Header />}>
          <Suggestions count={3} />
        </SecondaryColumn>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="SecondaryColumn"
      rows={[
        {
          name: 'header',
          type: 'React.ReactNode',
          description:
            'Conteúdo exibido acima da pilha — no arquivo, as duas pílulas de filtro do topo.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Conteúdo da coluna. Componha com VideoCardSidebar.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
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
  render: () => <SecondaryColumnDocumentationPage />,
};

/**
 * Playground com 100% das props do SecondaryColumn expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SecondaryColumn',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <SecondaryColumn {...args} header={<Header />}>
        <Suggestions />
      </SecondaryColumn>
    </div>
  ),
};

/**
 * Réplica visual do nó `Layout/SecondaryColumn` (20:2996), 426×968.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <SecondaryColumn header={<Header />}>
        <Suggestions />
      </SecondaryColumn>
    </div>
  ),
};

/**
 * Com e sem cabeçalho de filtros.
 */
export const ComposicaoModular: Story = {
  name: 'Composição modular',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ display: 'flex', gap: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <SecondaryColumn header={<Header />}>
        <Suggestions count={3} />
      </SecondaryColumn>
      <SecondaryColumn>
        <Suggestions count={3} />
      </SecondaryColumn>
    </div>
  ),
};
