import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import {
  Button,
  Comment,
  PrimaryColumn,
  VideoDescription,
  VideoPlayerFull,
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
import { avatars, comments, playerPoster } from '../fixtures';

const meta: Meta<typeof PrimaryColumn> = {
  title: 'Unitube/Componentes/PrimaryColumn',
  component: PrimaryColumn,
  parameters: { layout: 'fullscreen' },
  argTypes: { className: { control: 'text' } },
  args: {},
};

export default meta;

type Story = StoryObj<typeof PrimaryColumn>;

/** Conteúdo completo da coluna, como no arquivo. */
const Content = () => (
  <>
    <VideoPlayerFull
      src={playerPoster}
      videoTitle="Video Title"
      metadata="576K views · Oct 8, 2021"
      actions={
        <>
          <Button icon="liked">1.7 K</Button>
          <Button icon="disliked">632</Button>
          <Button icon="share">SHARE</Button>
          <Button icon="save">SAVE</Button>
          <Button icon="more" aria-label="Mais ações" />
        </>
      }
    />
    <VideoDescription
      avatarSrc={avatars.marcusLevin}
      channelName="Marcus Levin"
      subscriberCount="1.2M subscribers"
      description="Video description text"
    />
    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          avatarSrc={comment.avatarSrc}
          authorName={comment.authorName}
          timestamp={comment.timestamp}
          commentText={comment.commentText}
          likeCount={comment.likeCount}
        />
      ))}
    </div>
  </>
);

const PrimaryColumnDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Layout"
      title="PrimaryColumn"
      description="Reprodução do nó Layout/PrimaryColumn (20:2992), 664×968. É um contêiner de composição puro: define a largura, o recuo de 24px e o fundo principal — todo o conteúdo vem por children. Os 664px não são arbitrários: são os 640px do reprodutor mais os 24px de recuo à esquerda."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A coluna que ancora a largura do reprodutor."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🧮" title="664 = 640 + 24">
        A largura da coluna é derivada da largura do reprodutor. A coluna existe justamente para
        ancorar essa medida.
      </UniDocCard>
      <UniDocCard icon="🧩" title="Contêiner puro">
        Não recebe dados por prop. Empilha <code>VideoPlayerFull</code>,{' '}
        <code>VideoDescription</code> e a lista de <code>Comment</code> que o produto compuser.
      </UniDocCard>
      <UniDocCard icon="🎨" title="Fundo principal">
        <code>--uni-color-background-primary</code>, o mesmo da página. A coluna não se destaca do
        fundo — quem separa os blocos são os fios de 1px dentro dela.
      </UniDocCard>
      <UniDocCard icon="📐" title="Recuo uniforme de 24px">
        Todos os quatro lados. É o recuo mais simples de todo o arquivo, em contraste com a coluna
        secundária, que é assimétrica.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="20:2992"
      frameName="Layout/PrimaryColumn"
      specs={[
        { label: 'Dimensões', value: '664 × 968' },
        { label: 'Recuo', value: '24px em todos os lados' },
        { label: 'Superfície', value: '#181818 (background/primary)' },
        { label: 'Conteúdo', value: 'reprodutor, descrição e comentários' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Altura fluida',
          detail:
            'o arquivo fixa 968px, deliberadamente cortando a lista de comentários. O componente adota altura por conteúdo, para que a coluna acompanhe a quantidade real de comentários.',
        },
        {
          subject: 'Bloco de ordenação de comentários',
          detail:
            'o arquivo desenha um frame “Short-By” com a contagem de comentários e o controle de ordenação. Não é um componente publicado — nas composições ele é montado localmente com Button e os degraus tipográficos da marca.',
        },
        {
          subject: 'Campo de novo comentário',
          detail:
            'o arquivo desenha uma linha de avatar mais texto de espera “Add a public comment...”. Também não é componente publicado, e é montado localmente nas telas compostas.',
        },
        {
          subject: 'Largura fluida em janelas estreitas',
          detail:
            'abaixo de 900px a coluna passa a 100% da largura disponível, para não forçar rolagem horizontal na página.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Coluna',
          role: 'Contêiner de 664px com recuo uniforme de 24px, sobre o fundo principal.',
          token: '--uni-primary-column-width · --uni-spacing-24',
        },
        {
          name: 'Conteúdo',
          role: 'Pilha vertical composta pelo produto.',
          token: 'prop children',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de composição" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch" padding={0}>
      <PrimaryColumn>
        <Content />
      </PrimaryColumn>
    </UniDocStage>
    <UniDocStage label="Apenas o reprodutor" surface="primary" align="stretch" padding={0}>
      <PrimaryColumn>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Video Title"
          metadata="576K views · Oct 8, 2021"
        />
      </PrimaryColumn>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use a coluna para ancorar a largura do reprodutor na tela de vídeo.',
        'Componha o conteúdo por children, na ordem reprodutor, descrição e comentários.',
        'Deixe os fios de 1px dos blocos internos fazerem a separação.',
        'Mantenha o recuo uniforme de 24px.',
      ]}
      donts={[
        'Não passe dados por prop: a coluna é um contêiner de composição.',
        'Não altere o fundo da coluna — ele é o mesmo da página.',
        'Não adicione sombra nem contorno à coluna.',
        'Não use esta coluna fora da tela de vídeo.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A coluna sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={0}>
      {() => (
        <PrimaryColumn>
          <VideoPlayerFull
            src={playerPoster}
            videoTitle="Video Title"
            metadata="576K views · Oct 8, 2021"
          />
        </PrimaryColumn>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="PrimaryColumn"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          description:
            'Conteúdo da coluna. Componha com VideoPlayerFull, VideoDescription e Comment.',
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
  render: () => <PrimaryColumnDocumentationPage />,
};

/**
 * Playground com 100% das props do PrimaryColumn expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PrimaryColumn',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <PrimaryColumn {...args}>
        <Content />
      </PrimaryColumn>
    </div>
  ),
};

/**
 * Réplica visual do nó `Layout/PrimaryColumn` (20:2992), 664×968.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <PrimaryColumn>
        <Content />
      </PrimaryColumn>
    </div>
  ),
};

/**
 * Composições possíveis do conteúdo da coluna.
 */
export const ComposicaoModular: Story = {
  name: 'Composição modular',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ display: 'flex', gap: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <PrimaryColumn>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Apenas o reprodutor"
          metadata="576K views · Oct 8, 2021"
        />
      </PrimaryColumn>
      <PrimaryColumn>
        <VideoDescription
          avatarSrc={avatars.marcusLevin}
          channelName="Apenas a descrição"
          subscriberCount="1.2M subscribers"
          description="Video description text"
        />
        <div style={{ paddingTop: 24 }}>
          <Comment
            avatarSrc={comments[0].avatarSrc}
            authorName={comments[0].authorName}
            timestamp={comments[0].timestamp}
            commentText={comments[0].commentText}
            likeCount={comments[0].likeCount}
          />
        </div>
      </PrimaryColumn>
    </div>
  ),
};
