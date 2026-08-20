import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { VideoCard } from '../../../src/unitube';
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

const meta: Meta<typeof VideoCard> = {
  title: 'Unitube/Componentes/VideoCard',
  component: VideoCard,
  parameters: { layout: 'padded' },
  argTypes: {
    thumbnailSrc: { control: 'text' },
    thumbnailAlt: { control: 'text' },
    duration: { control: 'text' },
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
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
    avatarSrc: videos[0].avatarSrc,
    avatarInitials: 'JG',
    videoTitle: 'Video title goes here',
    channelName: 'Channel Name',
    metadata: '15K Views · 1 week ago',
    href: '',
  },
};

export default meta;

type Story = StoryObj<typeof VideoCard>;

const VideoCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Mídia"
      title="VideoCard"
      description="Reprodução do nó Media/VideoCard (12:593), 276×247, o cartão que preenche a grade da tela inicial em linhas de quatro. Duas medidas do arquivo merecem nota: o título usa Roboto Bold 12 — o degrau Label/Medium —, e o canal e os metadados são empilhados sem nenhum intervalo entre si."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A unidade da grade inicial."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🔲" title="Quatro por linha">
        No arquivo, cinco linhas de quatro cartões de 276px, separadas por 16px. A grade ocupa os
        1151px úteis da área de conteúdo.
      </UniDocCard>
      <UniDocCard icon="👤" title="Avatar de 36px">
        Diâmetro exclusivo deste cartão. A coluna do avatar tem recuo <code>12/12/26/0</code> — a
        folga inferior de 26px alinha o avatar ao topo do bloco de texto.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Título em Label/Medium">
        Roboto Bold 12, o menor título de cartão do arquivo. O compacto usa 14 e o da coluna lateral
        usa 14 regular.
      </UniDocCard>
      <UniDocCard icon="📏" title="Metadados sem intervalo">
        O bloco que empilha canal e visualizações tem <code>gap: 0</code>. As duas linhas de 12/18
        ficam coladas, o que é literal do arquivo.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="12:593"
      frameName="Media/VideoCard"
      specs={[
        { label: 'Dimensões', value: '276 × 247' },
        { label: 'Miniatura', value: '276 × 155' },
        { label: 'Avatar', value: '36px (--uni-avatar-md)' },
        { label: 'Título', value: 'Label/Medium · Bold 12' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Truncamento em duas linhas',
          detail:
            'o arquivo mostra o título “Video title goes here” em uma única linha. O componente permite duas linhas e trunca com reticências, porque títulos reais são mais longos que o texto de demonstração.',
        },
        {
          subject: 'Cartão como âncora',
          detail:
            'o arquivo publica um frame estático. Quando href é informado, o cartão inteiro vira uma âncora com sublinhado do título no hover; sem a prop, permanece um <article>.',
        },
        {
          subject: 'Semântica de artigo',
          detail:
            'o título foi promovido a <h3> e o cartão a <article>, porque o que o design mostra é um item de conteúdo em uma lista — o arquivo não descreve semântica.',
        },
        {
          subject: 'Quadros de vídeo sintéticos',
          detail:
            'as miniaturas do arquivo são logotipos de terceiros e não foram redistribuídas — ver o desvio registrado na estória do ThumbnailImage.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Miniatura',
          role: 'ThumbnailImage com a cápsula de duração.',
          token: 'props thumbnailSrc e duration',
        },
        {
          name: 'Coluna do avatar',
          role: 'Avatar de 36px com recuo 12/12/26/0.',
          token: '--uni-avatar-md',
        },
        {
          name: 'Título',
          role: 'Label/Medium em texto primário, com no máximo duas linhas.',
          token: '--uni-font-label-md-*',
        },
        {
          name: 'Metadados',
          role: 'Canal e visualizações empilhados sem intervalo, em Caption/Default.',
          token: '--uni-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: uma linha de quatro" surface="primary" align="flex-start" gap={16}>
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
    </UniDocStage>
    <UniDocStage label="Título longo, truncado em duas linhas" surface="primary" align="flex-start" gap={16}>
      <VideoCard
        thumbnailSrc={videos[4].thumbnailSrc}
        avatarSrc={videos[4].avatarSrc}
        duration="1:14:07"
        videoTitle="Como a escala tipográfica do Unitube organiza a hierarquia dentro de um cartão de vídeo estreito"
        channelName="Jesica Lambert"
        metadata="329K views · 1 month ago"
      />
      <VideoCard
        thumbnailSrc={videos[5].thumbnailSrc}
        avatarInitials="AW"
        duration="4:12"
        videoTitle="Sem avatar: substituto por iniciais"
        channelName="Anna White"
        metadata="1.2M views · 2 days ago"
      />
      <VideoCard
        thumbnailSrc={videos[6].thumbnailSrc}
        avatarSrc={videos[6].avatarSrc}
        videoTitle="Sem duração e sem metadados"
      />
    </UniDocStage>
    <UniDocStage label="Como âncora, com sublinhado no hover" surface="primary" align="flex-start" gap={16}>
      <VideoCard
        href="#"
        thumbnailSrc={videos[7].thumbnailSrc}
        avatarSrc={videos[7].avatarSrc}
        duration="23:45"
        videoTitle="Passe o cursor sobre o título"
        channelName="Channel Name"
        metadata="15K Views · 1 week ago"
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use este cartão na grade de descoberta, em linhas de quatro com 16px de separação.',
        'Informe href para que o cartão inteiro seja clicável.',
        'Passe thumbnailAlt vazio: o título já descreve o conteúdo ao lado.',
        'Mantenha os metadados em uma linha só de visualizações e data.',
      ]}
      donts={[
        'Não separe canal e metadados com intervalo: o arquivo os empilha colados.',
        'Não aumente o título além do degrau Label/Medium neste cartão.',
        'Não troque o avatar de 36px por outro diâmetro neste contexto.',
        'Não use este cartão na coluna lateral — lá o formato é o VideoCardSidebar.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O cartão sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <VideoCard
          thumbnailSrc={videos[2].thumbnailSrc}
          avatarSrc={videos[2].avatarSrc}
          duration="23:45"
          videoTitle="Video title goes here"
          channelName="Marcus Levin"
          metadata="15K Views · 1 week ago"
        />
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="VideoCard"
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
        { name: 'avatarSrc', type: 'string', description: 'Endereço do retrato do canal.' },
        {
          name: 'avatarInitials',
          type: 'string',
          description: 'Iniciais exibidas quando avatarSrc não é informado.',
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
  render: () => <VideoCardDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoCard',
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
      <VideoCard {...args} href={args.href || undefined} />
    </div>
  ),
};

/**
 * Réplica visual da grade do frame `Home` (3:185), em linhas de quatro.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 276px)',
        gap: 16,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      {videos.map((video) => (
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
  ),
};

/**
 * Com avatar, com iniciais, sem duração e como âncora.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <VideoCard
        thumbnailSrc={videos[0].thumbnailSrc}
        avatarSrc={videos[0].avatarSrc}
        duration="23:45"
        videoTitle="Com avatar"
        channelName="Channel Name"
        metadata="15K Views · 1 week ago"
      />
      <VideoCard
        thumbnailSrc={videos[1].thumbnailSrc}
        avatarInitials="AC"
        duration="23:45"
        videoTitle="Com iniciais"
        channelName="Alan Cooper"
        metadata="15K Views · 1 week ago"
      />
      <VideoCard
        thumbnailSrc={videos[2].thumbnailSrc}
        avatarSrc={videos[2].avatarSrc}
        videoTitle="Sem duração"
        channelName="Marcus Levin"
      />
      <VideoCard
        href="#"
        thumbnailSrc={videos[3].thumbnailSrc}
        avatarSrc={videos[3].avatarSrc}
        duration="23:45"
        videoTitle="Como âncora"
        channelName="Alexis Sears"
        metadata="15K Views · 1 week ago"
      />
    </div>
  ),
};
