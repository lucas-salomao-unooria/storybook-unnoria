import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { SubscribeButton, VideoDescription } from '../../../src/unootube';
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
import { avatars } from '../fixtures';

const LONG_DESCRIPTION =
  'Video description text — nesta demonstração, o texto é longo o bastante para exceder as duas linhas que o componente mostra por padrão, de modo que o link de expansão tenha função real. O arquivo publica apenas o rótulo “show more”, sem descrever o comportamento de expansão.';

const meta: Meta<typeof VideoDescription> = {
  title: 'Unootube/Componentes/VideoDescription',
  component: VideoDescription,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
    channelName: { control: 'text' },
    subscriberCount: { control: 'text' },
    description: { control: 'text' },
    showMoreLabel: { control: 'text' },
    showLessLabel: { control: 'text' },
    defaultExpanded: { control: 'boolean' },
    subscribed: { control: 'boolean' },
    className: { control: 'text' },
    onSubscribe: { action: 'onSubscribe' },
  },
  args: {
    avatarSrc: avatars.marcusLevin,
    avatarInitials: 'ML',
    channelName: 'Channel Name',
    subscriberCount: '1.2M subscribers',
    description: 'Video description text',
    showMoreLabel: 'show more',
    showLessLabel: 'show less',
    defaultExpanded: false,
    subscribed: false,
  },
};

export default meta;

type Story = StoryObj<typeof VideoDescription>;

const VideoDescriptionDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Conteúdo"
      title="VideoDescription"
      description="Reprodução do nó Content/VideoDescription (20:2989), o bloco que apresenta o canal e a descrição logo abaixo do reprodutor. O recuo de 64px na descrição não é arbitrário: é a soma do avatar de 48px com a folga de 16px da coluna de retrato, de modo que o texto se alinhe ao nome do canal e não à aresta do bloco."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O bloco de identidade do canal na tela de vídeo."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📐" title="Recuo de 64px calculado">
        48px de avatar mais 16px de folga. É o que alinha a descrição ao nome do canal, e não à
        aresta esquerda do bloco.
      </UniDocCard>
      <UniDocCard icon="👤" title="Avatar de 48px">
        Diâmetro exclusivo deste bloco. Menor que os 80px do cabeçalho de canal e maior que os 40px
        do comentário.
      </UniDocCard>
      <UniDocCard icon="📖" title="Descrição colapsada">
        Duas linhas por padrão, com o link “show more” abaixo. O arquivo publica o rótulo, mas não
        descreve o comportamento — a expansão é uma extensão da biblioteca.
      </UniDocCard>
      <UniDocCard icon="🔴" title="Botão de inscrição">
        O mesmo <code>SubscribeButton</code> do cabeçalho de canal, com geometria idêntica. Pode ser
        substituído pelo slot <code>action</code>.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="20:2989"
      frameName="Content/VideoDescription"
      specs={[
        { label: 'Dimensões', value: '640 × 166' },
        { label: 'Avatar', value: '48px (--uni-avatar-xl)' },
        { label: 'Recuo da descrição', value: '64px' },
        { label: 'Link de expansão', value: 'Label/Medium · #AAAAAA' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Expansão funcional',
          detail:
            'o arquivo mostra apenas o rótulo “show more”, estático. O componente implementa a expansão de fato, com aria-expanded e aria-controls ligando o botão ao parágrafo — sem isso o link não teria função.',
        },
        {
          subject: 'Descrição colapsada em duas linhas',
          detail:
            'o arquivo mostra uma linha única de texto de demonstração. O componente limita a duas linhas com reticências no estado colapsado, porque descrições reais são longas.',
        },
        {
          subject: 'Recuo removido em janelas estreitas',
          detail:
            'abaixo de 520px o recuo de 64px é zerado, para que a descrição não perca largura útil. O arquivo publica apenas o quadro de 640px.',
        },
        {
          subject: 'Botão substituível',
          detail:
            'o arquivo instancia o botão de inscrição diretamente. O slot action foi acrescentado para que um produto possa colocar ali outro controle — “Participar”, por exemplo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Coluna do retrato',
          role: 'Avatar de 48px com folga de 16px à direita.',
          token: '--uni-avatar-xl',
        },
        {
          name: 'Identidade',
          role: 'Nome em Body/Medium e inscritos em Caption/Default.',
          token: '--uni-color-text-secondary',
        },
        {
          name: 'Ação',
          role: 'SubscribeButton alinhado à direita, ou o slot action.',
          token: 'prop action',
        },
        {
          name: 'Descrição',
          role: 'Body/Medium recuado em 64px, colapsado em duas linhas.',
          token: '--uni-spacing-64',
        },
        {
          name: 'Link de expansão',
          role: 'Label/Medium em texto secundário, com aria-expanded.',
          token: '--uni-font-label-md-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch">
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.marcusLevin}
          channelName="Channel Name"
          subscriberCount="1.2M subscribers"
          description="Video description text"
        />
      </div>
    </UniDocStage>
    <UniDocStage label="Descrição longa, colapsada e expandida" surface="primary" direction="column" align="stretch" gap={24}>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.annaWhite}
          channelName="Anna White"
          subscriberCount="482K subscribers"
          description={LONG_DESCRIPTION}
        />
      </div>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.annaWhite}
          channelName="Anna White"
          subscriberCount="482K subscribers"
          description={LONG_DESCRIPTION}
          defaultExpanded
        />
      </div>
    </UniDocStage>
    <UniDocStage label="Já inscrito, sem descrição e com ação substituída" surface="primary" direction="column" align="stretch" gap={24}>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.skylarDias}
          channelName="Skylar Dias"
          subscriberCount="12K subscribers"
          description="Video description text"
          subscribed
        />
      </div>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarInitials="JG"
          channelName="James Gouse"
          subscriberCount="3.4M subscribers"
        />
      </div>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.alanCooper}
          channelName="Alan Cooper"
          subscriberCount="920K subscribers"
          description="Video description text"
          action={<SubscribeButton label="Participar" />}
        />
      </div>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Mantenha o recuo de 64px: é o que alinha a descrição ao nome do canal.',
        'Localize showMoreLabel e showLessLabel juntos.',
        'Use o slot action quando o produto precisar de outro controle no lugar da inscrição.',
        'Deixe o componente gerenciar aria-expanded e aria-controls.',
      ]}
      donts={[
        'Não alinhe a descrição à aresta esquerda do bloco.',
        'Não remova o link de expansão quando a descrição for longa.',
        'Não use um avatar de diâmetro diferente de 48px neste bloco.',
        'Não coloque dois botões sólidos na mesma linha de identidade.',
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
          <VideoDescription
            avatarSrc={avatars.marcusLevin}
            channelName="Channel Name"
            subscriberCount="1.2M subscribers"
            description="Video description text"
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="VideoDescription"
      rows={[
        { name: 'avatarSrc', type: 'string', description: 'Endereço do retrato do canal.' },
        {
          name: 'avatarInitials',
          type: 'string',
          description: 'Iniciais exibidas quando avatarSrc não é informado.',
        },
        { name: 'channelName', type: 'React.ReactNode', description: 'Nome do canal.' },
        { name: 'subscriberCount', type: 'React.ReactNode', description: 'Contagem de inscritos.' },
        { name: 'description', type: 'React.ReactNode', description: 'Texto da descrição do vídeo.' },
        {
          name: 'showMoreLabel',
          type: 'React.ReactNode',
          default: "'show more'",
          description: 'Rótulo do link que expande a descrição.',
        },
        {
          name: 'showLessLabel',
          type: 'React.ReactNode',
          default: "'show less'",
          description: 'Rótulo do link quando a descrição está expandida.',
        },
        {
          name: 'defaultExpanded',
          type: 'boolean',
          default: 'false',
          description: 'Estado inicial de expansão da descrição.',
        },
        {
          name: 'subscribed',
          type: 'boolean',
          default: 'false',
          description: 'Marca o canal como já inscrito, repassado ao SubscribeButton.',
        },
        {
          name: 'onSubscribe',
          type: '() => void',
          description: 'Chamado ao acionar o botão de inscrição.',
        },
        {
          name: 'action',
          type: 'React.ReactNode',
          description: 'Substitui o botão de inscrição padrão.',
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
  render: () => <VideoDescriptionDocumentationPage />,
};

/**
 * Playground com 100% das props do VideoDescription expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do VideoDescription',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 640, maxWidth: '100%', margin: '0 auto' }}>
        <VideoDescription {...args} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual do nó `Content/VideoDescription` (20:2989), 640×166.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.marcusLevin}
          channelName="Channel Name"
          subscriberCount="1.2M subscribers"
          description="Video description text"
        />
      </div>
    </div>
  ),
};

/**
 * Descrição colapsada e expandida.
 */
export const Estados: Story = {
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
        <VideoDescription
          avatarSrc={avatars.annaWhite}
          channelName="Colapsada"
          subscriberCount="482K subscribers"
          description={LONG_DESCRIPTION}
        />
      </div>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.annaWhite}
          channelName="Expandida"
          subscriberCount="482K subscribers"
          description={LONG_DESCRIPTION}
          defaultExpanded
        />
      </div>
      <div style={{ width: 640, maxWidth: '100%' }}>
        <VideoDescription
          avatarSrc={avatars.skylarDias}
          channelName="Já inscrito"
          subscriberCount="12K subscribers"
          description="Video description text"
          subscribed
        />
      </div>
    </div>
  ),
};
