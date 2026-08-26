import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { VideoCardSidebar } from '../../../src/unitube';
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

const meta: Meta<typeof VideoCardSidebar> = {
  title: 'Unitube/Componentes/VideoCardSidebar',
  component: VideoCardSidebar,
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
    thumbnailSrc: suggestions[0].thumbnailSrc,
    thumbnailAlt: '',
    duration: '23:45',
    videoTitle: 'Ep 6: Living to Serve | SEARCH ON',
    channelName: 'James Gouse',
    metadata: '1M views · 3 years ago',
    href: '',
  },
};

export default meta;

type Story = StoryObj<typeof VideoCardSidebar>;

const VideoCardSidebarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Mídia"
      title="VideoCardSidebar"
      description="Reprodução do nó Media/VideoCardSidebar (25:3450), 402×102, o cartão que a coluna secundária da tela de vídeo repete verticalmente. É o único cartão do arquivo cujo título usa peso regular — Body/Medium 14/20, e não um dos degraus Label."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O cartão de sugestão horizontal."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="↔️" title="Miniatura à esquerda">
        Único formato horizontal entre os cartões de lista: miniatura de 168px à esquerda e bloco de
        texto de 226px à direita.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Título em peso regular">
        Body/Medium 14/20. Os outros três cartões usam Bold — este não. A hierarquia dentro da
        coluna vem do tamanho, não do peso.
      </UniDocCard>
      <UniDocCard icon="📏" title="Alturas de linha declaradas">
        Título em 20px e metadados em 18px, ambos absolutos no arquivo. Nenhum usa altura
        automática, o que mantém o ritmo da pilha constante.
      </UniDocCard>
      <UniDocCard icon="🧱" title="Empilhado sem separador">
        A coluna secundária do arquivo empilha os cartões diretamente, sem fio entre eles. O recuo
        superior de 8px de cada cartão é a única separação.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="25:3450"
      frameName="Media/VideoCardSidebar"
      specs={[
        { label: 'Dimensões', value: '402 × 102' },
        { label: 'Miniatura', value: '168 × 94 · folga 8px' },
        { label: 'Título', value: 'Body/Medium · Regular 14/20' },
        { label: 'Metadados', value: 'Caption/Default · 12/18' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Truncamento em duas linhas',
          detail:
            'o arquivo mostra “Video title” em uma linha, mas as instâncias da tela usam “Ep 6: Living to Serve | SEARCH ON”, que já quebra em duas. O componente permite duas linhas e trunca com reticências.',
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
          role: 'ThumbnailImage de 168px com folga de 8px à direita.',
          token: 'props thumbnailSrc e duration',
        },
        {
          name: 'Título',
          role: 'Body/Medium em peso regular, no máximo duas linhas.',
          token: '--uni-font-body-md-*',
        },
        {
          name: 'Metadados',
          role: 'Canal e visualizações empilhados, com recuo vertical de 2px.',
          token: '--uni-font-caption-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: pilha da coluna secundária" surface="primary" direction="column" align="stretch" gap={0}>
      {suggestions.slice(0, 5).map((suggestion) => (
        <VideoCardSidebar
          key={suggestion.id}
          thumbnailSrc={suggestion.thumbnailSrc}
          duration={suggestion.duration}
          videoTitle={suggestion.videoTitle}
          channelName={suggestion.channelName}
          metadata={suggestion.metadata}
        />
      ))}
    </UniDocStage>
    <UniDocStage label="Variações" surface="primary" direction="column" align="stretch" gap={0}>
      <VideoCardSidebar
        thumbnailSrc={suggestions[5].thumbnailSrc}
        videoTitle="Sem duração e sem metadados"
      />
      <VideoCardSidebar
        href="#"
        thumbnailSrc={suggestions[6].thumbnailSrc}
        duration="1:14:07"
        videoTitle="Como âncora, com título longo que ocupa as duas linhas disponíveis do cartão"
        channelName="Skylar Dias"
        metadata="1M views · 3 years ago"
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use este cartão na coluna secundária da tela de vídeo.',
        'Mantenha o título em peso regular: é o que o distingue dos outros cartões.',
        'Informe href para tornar o cartão inteiro clicável.',
        'Empilhe os cartões sem fio entre eles, como o arquivo faz.',
      ]}
      donts={[
        'Não use peso Bold no título deste formato.',
        'Não adicione avatar: o cartão da coluna lateral não tem retrato.',
        'Não coloque este cartão na grade inicial.',
        'Não separe os cartões com divisores — o recuo superior de 8px basta.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O cartão sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <div style={{ width: 402 }}>
          <VideoCardSidebar
            thumbnailSrc={suggestions[1].thumbnailSrc}
            duration="23:45"
            videoTitle="Ep 6: Living to Serve | SEARCH ON"
            channelName="Alan Cooper"
            metadata="1M views · 3 years ago"
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="VideoCardSidebar"
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
  render: () => <VideoCardSidebarDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoCardSidebar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoCardSidebar',
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
      <div style={{ width: 402 }}>
        <VideoCardSidebar {...args} href={args.href || undefined} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual da coluna secundária do frame `Video` (19:1900).
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ width: 426, padding: 24, background: 'var(--uni-color-background-primary)' }}
    >
      {suggestions.map((suggestion) => (
        <VideoCardSidebar
          key={suggestion.id}
          thumbnailSrc={suggestion.thumbnailSrc}
          duration={suggestion.duration}
          videoTitle={suggestion.videoTitle}
          channelName={suggestion.channelName}
          metadata={suggestion.metadata}
        />
      ))}
    </div>
  ),
};

/**
 * Completo, sem metadados e como âncora.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ width: 426, padding: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <VideoCardSidebar
        thumbnailSrc={suggestions[0].thumbnailSrc}
        duration="23:45"
        videoTitle="Ep 6: Living to Serve | SEARCH ON"
        channelName="James Gouse"
        metadata="1M views · 3 years ago"
      />
      <VideoCardSidebar thumbnailSrc={suggestions[1].thumbnailSrc} videoTitle="Sem metadados" />
      <VideoCardSidebar
        href="#"
        thumbnailSrc={suggestions[2].thumbnailSrc}
        duration="4:12"
        videoTitle="Como âncora"
        channelName="Alexis Sears"
        metadata="1M views · 3 years ago"
      />
    </div>
  ),
};
