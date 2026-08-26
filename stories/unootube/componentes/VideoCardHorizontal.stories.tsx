import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { VideoCardHorizontal } from '../../../src/unootube';
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
import { playerPoster } from '../fixtures';

const meta: Meta<typeof VideoCardHorizontal> = {
  title: 'Unootube/Componentes/VideoCardHorizontal',
  component: VideoCardHorizontal,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    videoTitle: { control: 'text' },
    metadata: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    src: playerPoster,
    alt: '',
    videoTitle: 'Video Title',
    metadata: '576K views · 3 weeks ago',
    description: 'Video description text',
  },
};

export default meta;

type Story = StoryObj<typeof VideoCardHorizontal>;

const VideoCardHorizontalDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Mídia"
      title="VideoCardHorizontal"
      description="Reprodução do nó Media/VideoCardHorizontal (19:1346), 1200×286, o destaque que abre a tela de canal: um reprodutor funcional de 424×238 ao lado de título, metadados e descrição. É o único bloco do arquivo cuja linha de metadados usa Body/Small em peso Bold."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O destaque que abre a tela de canal."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🎬" title="Reprodutor, não miniatura">
        Ao contrário dos outros cartões, este embute um <code>VideoPlayer</code> completo, com
        controles e linha do tempo. O vídeo em destaque do canal começa reproduzível.
      </UniDocCard>
      <UniDocCard icon="📏" title="Calha de 65px">
        O recuo esquerdo usa <code>--uni-content-gutter</code>, a mesma calha da playlist logo
        abaixo. É o que alinha os dois blocos da tela de canal.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Metadados em Bold 13">
        Body/Small com peso Bold — combinação exclusiva deste bloco. O reprodutor completo usa Bold
        14 na mesma posição.
      </UniDocCard>
      <UniDocCard icon="📐" title="Coluna de texto de 400px">
        Fixa no arquivo, com 88px de folga inferior. A descrição fica com espaço reservado mesmo
        quando é curta.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="19:1346"
      frameName="Media/VideoCardHorizontal"
      specs={[
        { label: 'Dimensões', value: '1200 × 286' },
        { label: 'Recuo', value: '24 / 287 / 24 / 65' },
        { label: 'Reprodutor', value: '424 × 238' },
        { label: 'Coluna de texto', value: '400px' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Recuo direito de 287px',
          detail:
            'o arquivo declara 287px de folga à direita, o que é apenas o espaço que sobra na largura fixa de 1200px. O componente usa largura fluida, e a folga passa a ser o resultado natural do layout.',
        },
        {
          subject: 'Empilhamento em janelas estreitas',
          detail:
            'abaixo de 900px o bloco empilha e o reprodutor ocupa a largura inteira, para não ser comprimido abaixo da largura útil dos seus controles. O arquivo não descreve esse comportamento.',
        },
        {
          subject: 'Metadados em Bold 13',
          detail:
            'a escala publica Body/Small como 13 Regular. Este nó combina 13 com Bold, e é o único a fazê-lo além do item de rodapé. O par literal foi preservado.',
        },
        {
          subject: 'Título promovido a h2',
          detail:
            'o arquivo publica uma camada de texto solta. O componente renderiza <h2>, porque o destaque é uma seção da tela de canal.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Reprodutor',
          role: 'VideoPlayer de 424px com folga de 24px à direita.',
          token: 'props src e playerProps',
        },
        {
          name: 'Título',
          role: 'Label/Large em texto primário, com folga inferior de 20px.',
          token: '--uni-font-label-lg-*',
        },
        {
          name: 'Metadados',
          role: 'Body/Small em peso Bold, em texto secundário.',
          token: '--uni-font-body-sm-size · --uni-font-weight-bold',
        },
        {
          name: 'Descrição',
          role: 'Body/Medium em texto primário, com recuo superior de 12px.',
          token: '--uni-font-body-md-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch" padding={0}>
      <VideoCardHorizontal
        poster={playerPoster}
        videoTitle="Video Title"
        metadata="576K views · 3 weeks ago"
        description="Video description text"
      />
    </UniDocStage>
    <UniDocStage label="Sem descrição" surface="primary" align="stretch" padding={0}>
      <VideoCardHorizontal
        poster={playerPoster}
        videoTitle="Video Title"
        metadata="576K views · 3 weeks ago"
      />
    </UniDocStage>
    <UniDocStage label="Descrição longa" surface="primary" align="stretch" padding={0}>
      <VideoCardHorizontal
        poster={playerPoster}
        videoTitle="Ep 6: Living to Serve | SEARCH ON"
        metadata="1M views · 3 years ago"
        description="Uma descrição mais longa, que ocupa várias linhas dentro da coluna de 400px reservada pelo arquivo para o texto do destaque."
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use este bloco uma única vez por tela de canal, como destaque.',
        'Repasse tempo e progresso reais por playerProps.',
        'Mantenha a calha de 65px para alinhar o bloco à playlist abaixo.',
        'Deixe a descrição curta: a coluna tem 400px no arquivo.',
      ]}
      donts={[
        'Não substitua o reprodutor por uma miniatura estática: o arquivo embute o player.',
        'Não repita este bloco na mesma tela.',
        'Não troque o peso Bold dos metadados por regular.',
        'Não use este formato na grade inicial.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O destaque sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']} padding={0}>
      {() => (
        <div style={{ width: '100%' }}>
          <VideoCardHorizontal
            poster={playerPoster}
            videoTitle="Video Title"
            metadata="576K views · 3 weeks ago"
            description="Video description text"
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="VideoCardHorizontal"
      rows={[
        { name: 'src', type: 'string', description: 'Endereço do quadro de vídeo.' },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo do quadro.' },
        { name: 'videoTitle', type: 'React.ReactNode', description: 'Título do vídeo, em <h2>.' },
        {
          name: 'metadata',
          type: 'React.ReactNode',
          description: 'Linha de visualizações e data, em Body/Small Bold.',
        },
        { name: 'description', type: 'React.ReactNode', description: 'Descrição do vídeo.' },
        {
          name: 'playerProps',
          type: "Omit<UniVideoPlayerProps, 'src' | 'alt'>",
          description: 'Propriedades repassadas ao VideoPlayer interno.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <article>.',
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
  render: () => <VideoCardHorizontalDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoCardHorizontal expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoCardHorizontal',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <VideoCardHorizontal {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Media/VideoCardHorizontal` (19:1346), 1200×286.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ width: 1200, maxWidth: '100%', background: 'var(--uni-color-background-primary)' }}
    >
      <VideoCardHorizontal
        poster={playerPoster}
        videoTitle="Video Title"
        metadata="576K views · 3 weeks ago"
        description="Video description text"
      />
    </div>
  ),
};

/**
 * Com e sem descrição.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <VideoCardHorizontal
        poster={playerPoster}
        videoTitle="Com descrição"
        metadata="576K views · 3 weeks ago"
        description="Video description text"
      />
      <VideoCardHorizontal
        poster={playerPoster}
        videoTitle="Sem descrição"
        metadata="576K views · 3 weeks ago"
      />
    </div>
  ),
};
