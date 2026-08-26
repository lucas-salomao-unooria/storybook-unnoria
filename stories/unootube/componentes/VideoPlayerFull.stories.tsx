import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, VideoPlayerFull } from '../../../src/unootube';
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

const meta: Meta<typeof VideoPlayerFull> = {
  title: 'Unootube/Componentes/VideoPlayerFull',
  component: VideoPlayerFull,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    videoTitle: { control: 'text' },
    metadata: { control: 'text' },
    overlayTitle: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    src: playerPoster,
    alt: '',
    videoTitle: 'Video Title',
    metadata: '576K views · Oct 8, 2021',
  },
};

export default meta;

type Story = StoryObj<typeof VideoPlayerFull>;

/** Barra de ações reproduzindo as cinco instâncias do arquivo. */
const Actions = () => (
  <>
    <Button icon="liked">1.7 K</Button>
    <Button icon="disliked">632</Button>
    <Button icon="share">SHARE</Button>
    <Button icon="save">SAVE</Button>
    <Button icon="more" aria-label="Mais ações" />
  </>
);

const VideoPlayerFullDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Mídia"
      title="VideoPlayerFull"
      description="Reprodução do nó Media/VideoPlayerFull (20:2920), 640×455, o bloco que abre a coluna principal da tela de vídeo. Duas escolhas tipográficas do arquivo destoam do esperado e foram preservadas: o título usa peso regular, enquanto a linha de metadados — de hierarquia inferior — usa Bold."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O reprodutor com metadados e barra de ações."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🧱" title="Reprodutor mais bloco de informação">
        640×360 de vídeo e 95px de informação. O bloco inteiro é fechado por um fio de 1px em{' '}
        <code>--uni-color-border-subtle</code>.
      </UniDocCard>
      <UniDocCard icon="🔄" title="Peso invertido">
        Título em Roboto Regular 18, metadados em Roboto Bold 14. O elemento de maior hierarquia tem
        o peso menor — o arquivo é assim, e a inversão foi preservada.
      </UniDocCard>
      <UniDocCard icon="🎬" title="Título duplicado">
        O mesmo texto aparece sobre o vídeo, no véu superior, e abaixo dele. A prop{' '}
        <code>overlayTitle</code> permite separá-los quando o produto precisar.
      </UniDocCard>
      <UniDocCard icon="🔌" title="Ações por composição">
        A barra de ações entra por <code>actions</code>, composta com <code>Button</code>. O arquivo
        instancia cinco, com 8px de intervalo.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="20:2920"
      frameName="Media/VideoPlayerFull"
      specs={[
        { label: 'Dimensões', value: '640 × 455' },
        { label: 'Reprodutor', value: '640 × 360' },
        { label: 'Bloco de informação', value: '95px · recuo 20/0/8/0' },
        { label: 'Título', value: 'Regular 18 · metadados Bold 14' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Peso invertido em relação à hierarquia',
          detail:
            'o título usa Roboto Regular 18 e a linha de metadados usa Roboto Bold 14, ou seja, o elemento de maior hierarquia tem o peso menor. O arquivo declara assim e o par foi preservado, anotado no CSS do componente.',
        },
        {
          subject: 'Título promovido a h1',
          detail:
            'o arquivo publica uma camada de texto solta. O componente renderiza <h1>, porque na tela de vídeo o título do vídeo é o cabeçalho principal da página.',
        },
        {
          subject: 'Barra de ações por composição',
          detail:
            'o arquivo instancia cinco Action/Button dentro do bloco. O componente expõe a coluna como slot actions, para que o produto escolha quais ações existem e em que ordem.',
        },
        {
          subject: 'Título sobre o vídeo',
          detail:
            'o arquivo repete o mesmo texto no véu superior e abaixo do reprodutor. Quando overlayTitle é omitido, o componente reproduz essa duplicação; informá-lo permite separar os dois.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Reprodutor',
          role: 'VideoPlayer de 640×360, com título no véu superior.',
          token: 'props src e playerProps',
        },
        {
          name: 'Título',
          role: 'Heading/H3 em peso regular, promovido a <h1>.',
          token: '--uni-font-heading-h3-size · --uni-font-weight-regular',
        },
        {
          name: 'Metadados',
          role: 'Label/Large em texto secundário, com recuo vertical de 12px.',
          token: '--uni-font-label-lg-*',
        },
        {
          name: 'Ações',
          role: 'Coluna direita com os botões de ação, 8px de intervalo.',
          token: 'prop actions',
        },
        {
          name: 'Fio de fechamento',
          role: 'Divisor de 1px ao final do bloco de informação.',
          token: '--uni-color-border-subtle',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch">
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Video Title"
          metadata="576K views · Oct 8, 2021"
          actions={<Actions />}
        />
      </div>
    </UniDocStage>
    <UniDocStage label="Sem barra de ações" surface="primary" align="stretch">
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Video Title"
          metadata="576K views · Oct 8, 2021"
        />
      </div>
    </UniDocStage>
    <UniDocStage label="Título longo e sobreposto distinto" surface="primary" align="stretch">
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayerFull
          src={playerPoster}
          overlayTitle="Ep 6"
          videoTitle="Ep 6: Living to Serve | SEARCH ON — como a hierarquia tipográfica do Unootube organiza a tela de vídeo"
          metadata="1M views · 3 years ago"
          actions={<Actions />}
        />
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Componha a barra de ações com Button, mantendo o intervalo de 8px.',
        'Use overlayTitle quando o título completo for longo demais para o véu do vídeo.',
        'Repasse tempo e progresso reais por playerProps.',
        'Deixe o fio de fechamento: é o que separa o bloco da descrição abaixo.',
      ]}
      donts={[
        'Não inverta o peso: título regular e metadados Bold são literais do arquivo.',
        'Não use este bloco fora da coluna principal da tela de vídeo.',
        'Não adicione sombra: o fio de 1px basta como separação.',
        'Não promova a mais de um <h1> por página.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O bloco sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <div style={{ width: 560, maxWidth: '100%' }}>
          <VideoPlayerFull
            src={playerPoster}
            videoTitle="Video Title"
            metadata="576K views · Oct 8, 2021"
            actions={<Actions />}
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="VideoPlayerFull"
      rows={[
        { name: 'src', type: 'string', description: 'Endereço do quadro de vídeo.' },
        { name: 'alt', type: 'string', default: "''", description: 'Texto alternativo do quadro.' },
        {
          name: 'videoTitle',
          type: 'React.ReactNode',
          description: 'Título do vídeo, exibido abaixo do reprodutor em <h1>.',
        },
        {
          name: 'metadata',
          type: 'React.ReactNode',
          description: 'Linha de visualizações e data de publicação.',
        },
        {
          name: 'actions',
          type: 'React.ReactNode',
          description: 'Barra de ações à direita dos metadados. Componha com Button.',
        },
        {
          name: 'playerProps',
          type: "Omit<UniVideoPlayerProps, 'src' | 'alt' | 'videoTitle'>",
          description:
            'Propriedades repassadas ao VideoPlayer interno — tempo, progresso e manipuladores de controle.',
        },
        {
          name: 'overlayTitle',
          type: 'React.ReactNode',
          description:
            'Título exibido sobre o quadro de vídeo. Quando omitido, o videoTitle é reaproveitado, como o arquivo faz.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <section>.',
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
  render: () => <VideoPlayerFullDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoPlayerFull expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoPlayerFull',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 640, maxWidth: '100%', margin: '0 auto' }}>
        <VideoPlayerFull {...args} actions={<Actions />} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual do nó `Media/VideoPlayerFull` (20:2920), 640×455.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Video Title"
          metadata="576K views · Oct 8, 2021"
          actions={<Actions />}
        />
      </div>
    </div>
  ),
};

/**
 * Com e sem barra de ações, e com título sobreposto distinto.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 24,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Com barra de ações"
          metadata="576K views · Oct 8, 2021"
          actions={<Actions />}
        />
      </div>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Sem barra de ações"
          metadata="576K views · Oct 8, 2021"
        />
      </div>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoPlayerFull
          src={playerPoster}
          overlayTitle="Ep 6"
          videoTitle="Título sobreposto distinto do título abaixo do reprodutor"
          metadata="1M views · 3 years ago"
          actions={<Actions />}
        />
      </div>
    </div>
  ),
};
