import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { VideoCardSmall } from '../../../src/unootube';
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
import { videos } from '../fixtures';

const meta: Meta<typeof VideoCardSmall> = {
  title: 'Unootube/Componentes/VideoCardSmall',
  component: VideoCardSmall,
  parameters: { layout: 'padded' },
  argTypes: {
    thumbnailSrc: { control: 'text' },
    thumbnailAlt: { control: 'text' },
    duration: { control: 'text' },
    videoTitle: { control: 'text' },
    channelName: { control: 'text' },
    metadata: { control: 'text' },
    href: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    thumbnailSrc: videos[0].thumbnailSrc,
    thumbnailAlt: '',
    duration: '23:45',
    videoTitle: 'Video Title',
    channelName: 'Channel Name',
    metadata: '329K views · 1 month ago',
    href: '',
  },
};

export default meta;

type Story = StoryObj<typeof VideoCardSmall>;

const VideoCardSmallDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Mídia"
      title="VideoCardSmall"
      description="Reprodução do nó Media/VideoCardSmall (19:1459), 214×194, o cartão que a playlist do canal repete cinco vezes por linha. Ao contrário do VideoCard, o título usa Roboto Bold 14 e não há avatar: o canal aparece apenas como texto."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O cartão da faixa horizontal de playlist."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🎞️" title="Cinco por linha na playlist">
        A faixa de playlist do arquivo tem 1070px úteis e cabe exatamente cinco cartões de 214px.
      </UniDocCard>
      <UniDocCard icon="🚫" title="Sem avatar">
        É o único cartão do arquivo sem retrato de canal. O nome do canal ocupa a primeira linha dos
        metadados.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Título em Label/Large">
        Roboto Bold 14, um degrau acima do título do VideoCard. O cartão é mais estreito, mas o
        título é maior.
      </UniDocCard>
      <UniDocCard icon="📏" title="Folga de 4px à direita">
        O recuo <code>0/4/0/0</code> é o que separa os cartões dentro da faixa — não há{' '}
        <code>gap</code> no contêiner.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="19:1459"
      frameName="Media/VideoCardSmall"
      specs={[
        { label: 'Dimensões', value: '214 × 194' },
        { label: 'Miniatura', value: '210 × 118' },
        { label: 'Recuo', value: '0 / 4 / 0 / 0' },
        { label: 'Título', value: 'Label/Large · Bold 14' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Truncamento em duas linhas',
          detail:
            'o arquivo mostra o título “Video Title” em uma linha. O componente permite duas e trunca com reticências, porque títulos reais excedem os 186px úteis do cartão.',
        },
        {
          subject: 'Cartão como âncora',
          detail:
            'o arquivo publica um frame estático. Quando href é informado, o cartão vira âncora com sublinhado do título no hover.',
        },
        {
          subject: 'Semântica de artigo',
          detail:
            'título promovido a <h3> e cartão a <article>, porque o design mostra um item de conteúdo em uma lista.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Miniatura',
          role: 'ThumbnailImage de 210px com a cápsula de duração.',
          token: 'props thumbnailSrc e duration',
        },
        {
          name: 'Título',
          role: 'Label/Large com recuo vertical de 8px, no máximo duas linhas.',
          token: '--uni-font-label-lg-*',
        },
        {
          name: 'Metadados',
          role: 'Canal e visualizações empilhados sem intervalo, em Caption/Default.',
          token: '--uni-color-text-secondary',
        },
        {
          name: 'Folga',
          role: 'Recuo de 4px à direita, que separa os cartões da faixa.',
          token: '--uni-spacing-4',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: cinco por linha" surface="primary" align="flex-start" gap={0}>
      {videos.slice(0, 5).map((video) => (
        <div key={video.id} style={{ width: 214 }}>
          <VideoCardSmall
            thumbnailSrc={video.thumbnailSrc}
            duration={video.duration}
            videoTitle="Video Title"
            channelName={video.channelName}
            metadata="329K views · 1 month ago"
          />
        </div>
      ))}
    </UniDocStage>
    <UniDocStage label="Título longo e variações" surface="primary" align="flex-start" gap={0}>
      <div style={{ width: 214 }}>
        <VideoCardSmall
          thumbnailSrc={videos[5].thumbnailSrc}
          duration="1:14:07"
          videoTitle="Título longo que ocupa duas linhas e trunca com reticências ao final"
          channelName="Anna White"
          metadata="1.2M views · 2 days ago"
        />
      </div>
      <div style={{ width: 214 }}>
        <VideoCardSmall
          thumbnailSrc={videos[6].thumbnailSrc}
          videoTitle="Sem duração e sem metadados"
        />
      </div>
      <div style={{ width: 214 }}>
        <VideoCardSmall
          href="#"
          thumbnailSrc={videos[7].thumbnailSrc}
          duration="4:12"
          videoTitle="Como âncora"
          channelName="Channel Name"
          metadata="15K views · 1 week ago"
        />
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use este cartão dentro do Playlist, que já controla a largura e a rolagem da faixa.',
        'Deixe o canal na primeira linha dos metadados: não há avatar neste formato.',
        'Informe href para tornar o cartão inteiro clicável.',
        'Mantenha o título no degrau Label/Large.',
      ]}
      donts={[
        'Não adicione avatar: o arquivo publica este cartão sem retrato.',
        'Não use gap no contêiner — a separação vem da folga de 4px de cada cartão.',
        'Não use este cartão na grade inicial, onde o formato é o VideoCard.',
        'Não reduza o título ao degrau Label/Medium do VideoCard.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O cartão sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <div style={{ width: 214 }}>
          <VideoCardSmall
            thumbnailSrc={videos[1].thumbnailSrc}
            duration="23:45"
            videoTitle="Video Title"
            channelName="Alan Cooper"
            metadata="329K views · 1 month ago"
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="VideoCardSmall"
      rows={[
        { name: 'thumbnailSrc', type: 'string', description: 'Endereço da miniatura.' },
        {
          name: 'thumbnailAlt',
          type: 'string',
          default: "''",
          description: 'Texto alternativo da miniatura.',
        },
        {
          name: 'duration',
          type: 'React.ReactNode',
          description: 'Conteúdo da cápsula sobre a miniatura.',
        },
        { name: 'videoTitle', type: 'React.ReactNode', description: 'Título do vídeo, em <h3>.' },
        { name: 'channelName', type: 'React.ReactNode', description: 'Nome do canal.' },
        {
          name: 'metadata',
          type: 'React.ReactNode',
          description: 'Linha de visualizações e data.',
        },
        {
          name: 'href',
          type: 'string',
          description: 'Quando informado, o cartão inteiro é renderizado como âncora.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
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
  render: () => <VideoCardSmallDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoCardSmall expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoCardSmall',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <div style={{ width: 214 }}>
        <VideoCardSmall {...args} href={args.href || undefined} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual da linha de cartões do nó `Media/Playlist` (19:1562).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ display: 'flex', padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      {videos.slice(0, 5).map((video) => (
        <div key={video.id} style={{ width: 214 }}>
          <VideoCardSmall
            thumbnailSrc={video.thumbnailSrc}
            duration="23:45"
            videoTitle="Video Title"
            channelName="Channel Name"
            metadata="329K views · 1 month ago"
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Com duração, sem metadados e como âncora.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ display: 'flex', padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 214 }}>
        <VideoCardSmall
          thumbnailSrc={videos[0].thumbnailSrc}
          duration="23:45"
          videoTitle="Completo"
          channelName="Channel Name"
          metadata="329K views · 1 month ago"
        />
      </div>
      <div style={{ width: 214 }}>
        <VideoCardSmall thumbnailSrc={videos[1].thumbnailSrc} videoTitle="Sem duração e metadados" />
      </div>
      <div style={{ width: 214 }}>
        <VideoCardSmall
          href="#"
          thumbnailSrc={videos[2].thumbnailSrc}
          duration="4:12"
          videoTitle="Como âncora"
          channelName="Marcus Levin"
          metadata="15K views · 1 week ago"
        />
      </div>
    </div>
  ),
};
