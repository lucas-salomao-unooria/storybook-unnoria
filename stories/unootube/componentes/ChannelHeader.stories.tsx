import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { ChannelHeader } from '../../../src/unootube';
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
import { avatars, channelCover, channelTabs } from '../fixtures';

const meta: Meta<typeof ChannelHeader> = {
  title: 'Unootube/Componentes/ChannelHeader',
  component: ChannelHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    coverSrc: { control: 'text' },
    coverAlt: { control: 'text' },
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
    channelName: { control: 'text' },
    subscriberCount: { control: 'text' },
    subscribed: { control: 'boolean' },
    tabs: { control: 'object' },
    activeTabId: { control: 'text' },
    showSearch: { control: 'boolean' },
    className: { control: 'text' },
    onSubscribe: { action: 'onSubscribe' },
    onSelectTab: { action: 'onSelectTab' },
    onSearch: { action: 'onSearch' },
  },
  args: {
    coverSrc: channelCover,
    coverAlt: '',
    avatarSrc: avatars.marcusLevin,
    avatarInitials: 'ML',
    channelName: 'Marcus Levin',
    subscriberCount: '1.2M subscribers',
    subscribed: false,
    tabs: channelTabs,
    activeTabId: 'home',
    showSearch: true,
  },
};

export default meta;

type Story = StoryObj<typeof ChannelHeader>;

const ChannelHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Conteúdo"
      title="ChannelHeader"
      description="Reprodução do nó Channel (17:2796), 1200×340, o cabeçalho que abre a tela de canal. A barra de abas não usa a pílula do TopMenuItem: usa apenas o rótulo, e marca a aba ativa com um fio de 1px na base — a única aparição desse padrão de sublinhado em todo o arquivo."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="As três faixas do cabeçalho."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🖼️" title="Capa de 192px">
        Bitmap de largura total. A cor de espera é <code>--uni-color-neutral-50</code>, o único uso
        de um neutro claro como superfície em todo o arquivo.
      </UniDocCard>
      <UniDocCard icon="👤" title="Avatar de 80px">
        O maior diâmetro do arquivo, com folga de 24px até o nome. Ao lado dele, o nome usa Roboto
        Regular 24 — corpo de Heading/H1, mas sem o peso Bold do degrau.
      </UniDocCard>
      <UniDocCard icon="📑" title="Abas com sublinhado">
        Rótulo simples e fio de 1px na base quando ativa, em{' '}
        <code>--uni-color-border-active</code>. É um padrão distinto da pílula da tela inicial.
      </UniDocCard>
      <UniDocCard icon="🔴" title="Único botão sólido">
        O <code>SubscribeButton</code> à direita é a chamada principal da tela, e o único elemento
        preenchido do cabeçalho.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="17:2796"
      frameName="Channel"
      specs={[
        { label: 'Dimensões', value: '1200 × 340' },
        { label: 'Capa', value: '1200 × 192' },
        { label: 'Identidade', value: '100px · recuo 16/65/4/65' },
        { label: 'Barra de abas', value: '48px' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Abas montadas localmente',
          detail:
            'no arquivo as abas são instâncias de Navigation/TopMenuItem com a pílula removida e um retângulo de 1px sob a ativa. Como o resultado visual não tem nada da pílula, as abas foram montadas aqui como botões com sublinhado, e não compostas com TopMenuItem.',
        },
        {
          subject: 'Semântica de abas',
          detail:
            'o arquivo não descreve semântica. A barra recebe role="tablist" e cada aba role="tab" com aria-selected, porque o que o design mostra é a navegação entre seções do canal.',
        },
        {
          subject: 'Nome em peso regular',
          detail:
            'o nome do canal usa Roboto Regular 24 — o corpo do degrau Heading/H1, que a escala declara como Bold. O par literal foi preservado.',
        },
        {
          subject: 'Segundo botão da barra de abas',
          detail:
            'o arquivo desenha um quadro vazio de 48×48 à direita da lupa, sem conteúdo. Como não há glifo nem rótulo, ele não foi reproduzido.',
        },
        {
          subject: 'Capa não redistribuída',
          detail:
            'o bitmap de capa do arquivo não foi exportado. As estórias usam uma capa sintética em SVG, gerada a partir da própria paleta.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Capa',
          role: 'Faixa de 192px com o bitmap de capa, recortado.',
          token: '--uni-channel-cover-height',
        },
        {
          name: 'Avatar',
          role: 'Círculo de 80px com folga de 24px até o nome.',
          token: '--uni-avatar-2xl',
        },
        {
          name: 'Identidade',
          role: 'Nome em Heading/H1 regular e contagem de inscritos em Body/Medium.',
          token: '--uni-font-heading-h1-size · --uni-font-weight-regular',
        },
        {
          name: 'Botão de inscrição',
          role: 'SubscribeButton alinhado à direita, com recuo vertical de 22px.',
          token: '--uni-color-brand-subscribe',
        },
        {
          name: 'Barra de abas',
          role: 'Rótulos com sublinhado de 1px na aba ativa, e lupa à direita.',
          token: '--uni-color-border-active',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch" padding={0}>
      <ChannelHeader
        coverSrc={channelCover}
        avatarSrc={avatars.marcusLevin}
        channelName="Marcus Levin"
        subscriberCount="1.2M subscribers"
        tabs={channelTabs}
        activeTabId="home"
      />
    </UniDocStage>
    <UniDocStage label="Já inscrito, sem busca" surface="primary" align="stretch" padding={0}>
      <ChannelHeader
        coverSrc={channelCover}
        avatarSrc={avatars.annaWhite}
        channelName="Anna White"
        subscriberCount="482K subscribers"
        subscribed
        showSearch={false}
        tabs={channelTabs.slice(0, 4)}
        activeTabId="videos"
      />
    </UniDocStage>
    <UniDocStage label="Sem capa e sem abas" surface="primary" align="stretch" padding={0}>
      <ChannelHeader
        avatarInitials="SD"
        channelName="Skylar Dias"
        subscriberCount="12K subscribers"
        tabs={[]}
        showSearch={false}
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Marque uma única aba como ativa por vez.',
        'Use subscribed para refletir o estado real da inscrição.',
        'Mantenha a calha de 65px para alinhar o cabeçalho aos blocos de playlist abaixo.',
        'Deixe o nome em peso regular: é o que o arquivo publica.',
      ]}
      donts={[
        'Não use a pílula do TopMenuItem nas abas do canal — o padrão aqui é sublinhado.',
        'Não coloque um segundo botão sólido no cabeçalho.',
        'Não altere a altura de 192px da capa.',
        'Não embuta a capa no pacote: ela entra por prop.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O cabeçalho sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={0}>
      {() => (
        <div style={{ width: '100%' }}>
          <ChannelHeader
            coverSrc={channelCover}
            avatarSrc={avatars.marcusLevin}
            channelName="Marcus Levin"
            subscriberCount="1.2M subscribers"
            tabs={channelTabs.slice(0, 4)}
            activeTabId="home"
          />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ChannelHeader"
      rows={[
        { name: 'coverSrc', type: 'string', description: 'Endereço da imagem de capa.' },
        { name: 'coverAlt', type: 'string', default: "''", description: 'Texto alternativo da capa.' },
        { name: 'avatarSrc', type: 'string', description: 'Endereço do retrato do canal.' },
        {
          name: 'avatarInitials',
          type: 'string',
          description: 'Iniciais exibidas quando avatarSrc não é informado.',
        },
        { name: 'channelName', type: 'React.ReactNode', description: 'Nome do canal, em <h1>.' },
        { name: 'subscriberCount', type: 'React.ReactNode', description: 'Contagem de inscritos.' },
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
          name: 'tabs',
          type: 'UniChannelTab[]',
          default: '[]',
          description: 'Abas exibidas na barra do canal. Cada uma tem id estável e label.',
        },
        { name: 'activeTabId', type: 'string', description: 'Identificador da aba ativa.' },
        {
          name: 'onSelectTab',
          type: '(id: string) => void',
          description: 'Chamado ao selecionar uma aba.',
        },
        {
          name: 'showSearch',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o botão de busca à direita da barra de abas.',
        },
        {
          name: 'onSearch',
          type: '() => void',
          description: 'Chamado ao acionar a busca dentro do canal.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <header>.',
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
  render: () => <ChannelHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do ChannelHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChannelHeader',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <ChannelHeader {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Channel` (17:2796), 1200×340.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ width: 1200, maxWidth: '100%', background: 'var(--uni-color-background-primary)' }}
    >
      <ChannelHeader
        coverSrc={channelCover}
        avatarSrc={avatars.marcusLevin}
        channelName="Marcus Levin"
        subscriberCount="1.2M subscribers"
        tabs={channelTabs}
        activeTabId="home"
      />
    </div>
  ),
};

/**
 * Navegação interativa entre as abas do canal.
 */
export const Estados: Story = {
  render: () => {
    const TabsDemo = () => {
      const [activeTabId, setActiveTabId] = useState('home');
      const [subscribed, setSubscribed] = useState(false);

      return (
        <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
          <ChannelHeader
            coverSrc={channelCover}
            avatarSrc={avatars.marcusLevin}
            channelName="Marcus Levin"
            subscriberCount="1.2M subscribers"
            tabs={channelTabs}
            activeTabId={activeTabId}
            onSelectTab={setActiveTabId}
            subscribed={subscribed}
            onSubscribe={() => setSubscribed((current) => !current)}
          />
          <p
            style={{
              color: 'var(--uni-color-text-secondary)',
              fontFamily: 'var(--uni-font-sans)',
              fontSize: 13,
              padding: 24,
            }}
          >
            Aba ativa: <strong style={{ color: 'var(--uni-color-text-primary)' }}>{activeTabId}</strong>{' '}
            · Inscrito:{' '}
            <strong style={{ color: 'var(--uni-color-text-primary)' }}>
              {subscribed ? 'sim' : 'não'}
            </strong>
          </p>
        </div>
      );
    };
    return <TabsDemo />;
  },
};
