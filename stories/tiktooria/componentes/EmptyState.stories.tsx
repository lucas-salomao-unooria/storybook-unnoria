import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, EmptyState } from '../../../src/tiktooria';
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

const meta: Meta<typeof EmptyState> = {
  title: 'Tik Tooria/Componentes/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'select', options: [undefined, 'emptyInbox', 'emptyMessages'] },
    iconSize: { control: { type: 'range', min: 32, max: 120, step: 2 } },
    className: { control: 'text' },
  },
  args: {
    title: 'Notifications aren’t available',
    description: 'Notifications about your account will appear here',
    icon: 'emptyInbox',
    iconSize: 68,
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;


const EmptyStateDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Feedback"
      title="EmptyState"
      description="Estado vazio das telas “All activity” e “Direct Message”. Ilustração em tom de ícone dedicado, título em Semibold 17 e descrição em Regular 14 — os dois tons de ilustração do arquivo (#B0B0B3 nas notificações e #AFB0B3 nas mensagens) são preservados como tokens distintos."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="📭" title="Duas telas, dois glifos">
        “All activity” usa o envelope de 66×68; “Direct Message” usa o avião de papel de 70×61. Cada um tem seu próprio tom de cinza no arquivo.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Título e descrição">
        Semibold 17 em tom primário e Regular 14 em <code>--tik-color-text-muted</code> — este último aparece exclusivamente aqui.
      </TikDocCard>
      <TikDocCard icon="📏" title="Largura de 301px">
        A descrição quebra dentro de 301px, medida do nó de origem.
      </TikDocCard>
      <TikDocCard icon="➕" title="Ação opcional">
        O arquivo não publica botão no estado vazio. O slot <code>action</code> é uma extensão documentada.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:567"
      frameName="Info — TikTok All activity"
      specs={[
        { label: 'Largura máxima', value: '301px' },
        { label: 'Título', value: 'Semibold 17 · #161722' },
        { label: 'Descrição', value: 'Regular 14 · #7C7D83' },
        { label: 'Ilustração', value: '66×68 ou 70×61' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Dois tons de ilustração quase idênticos',
          detail:
            'o arquivo usa #B0B0B3 nas notificações e #AFB0B3 nas mensagens — diferença de um ponto em cada canal. Os dois foram preservados como tokens distintos, e o componente escolhe automaticamente pelo glifo.',
        },
        {
          subject: 'Slot de ação',
          detail:
            'não existe no arquivo. Foi acrescentado porque produtos costumam oferecer um caminho de saída do estado vazio; fica vazio por padrão.',
        },
        {
          subject: 'Espaçamento vertical',
          detail:
            'o arquivo posiciona título e descrição por coordenada (376 e 409). O componente usa margens de 25px e 12px, o que reproduz os intervalos medidos.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Ilustração', role: 'Glifo de ~68px no tom dedicado ao estado.', token: '--tik-color-icon-empty / -empty-alt' },
        { name: 'Título', role: 'Semibold 17 centralizado.', token: '--tik-font-handle-* · --tik-color-text-primary' },
        { name: 'Descrição', role: 'Regular 14 centralizada, quebrando em 301px.', token: '--tik-font-label-* · --tik-color-text-muted' },
        { name: 'Ação', role: 'Slot opcional sob a descrição.', token: 'extensão documentada' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="“All activity” — como no arquivo" surface="chrome" align="stretch" direction="column" width={414} padding={40}>
      <EmptyState
        icon="emptyInbox"
        title="Notifications aren’t available"
        description="Notifications about your account will appear here"
      />
    </TikDocStage>
    <TikDocStage label="“Direct Message” — como no arquivo" surface="chrome" align="stretch" direction="column" width={414} padding={40}>
      <EmptyState
        icon="emptyMessages"
        iconSize={61}
        title="Message your friends"
        description="Share videos or start a conversation"
      />
    </TikDocStage>
    <TikDocStage label="Com ação — extensão documentada" surface="chrome" align="stretch" direction="column" width={414} padding={40}>
      <EmptyState
        icon="emptyMessages"
        iconSize={61}
        title="Message your friends"
        description="Share videos or start a conversation"
        action={
          <Button variant="outline" fixedWidth={false}>
            Find friends
          </Button>
        }
      />
    </TikDocStage>
    <TikDocStage label="Sem ilustração" surface="chrome" align="stretch" direction="column" width={414} padding={40}>
      <EmptyState title="Nada por aqui" description="Volte mais tarde" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use emptyInbox em notificações e emptyMessages em mensagens diretas.',
        'Mantenha o título curto e a descrição em uma ou duas linhas.',
        'Centralize o estado vazio verticalmente na área de conteúdo, como no arquivo.',
      ]}
      donts={[
        'Não troque os tons de ilustração entre os dois glifos.',
        'Não use o estado vazio sobre superfície imersiva.',
        'Não substitua a descrição por um botão: o arquivo sempre explica antes de oferecer ação.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <EmptyState
          icon="emptyInbox"
          title="Notifications aren’t available"
          description="Notifications about your account will appear here"
        />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="EmptyState"
      rows={[
        {
          name: 'title',
          type: "React.ReactNode",
          description:
            'Título, em Semibold 17.',
        },
        {
          name: 'description',
          type: "React.ReactNode",
          description:
            'Descrição, em Regular 14 e tom apagado.',
        },
        {
          name: 'icon',
          type: "TikIconName",
          description:
            'Glifo da ilustração. O arquivo publica emptyInbox e emptyMessages.',
        },
        {
          name: 'iconSize',
          type: "number",
          default: "68",
          description:
            'Altura do glifo em pixels. O arquivo usa 68 em notificações e 61 em mensagens.',
        },
        {
          name: 'action',
          type: "React.ReactNode",
          description:
            'Ação sob a descrição. Extensão documentada; o arquivo não publica nenhuma.',
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
  render: () => <EmptyStateDocumentationPage />,
};

/**
 * Playground com 100% das props do EmptyState expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do EmptyState',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: 414,
        padding: 40,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <EmptyState {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos dois estados vazios do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 414,
          padding: 40,
          background: 'var(--tik-color-surface-primary)',
        }}
      >
        <EmptyState
          icon="emptyInbox"
          title="Notifications aren’t available"
          description="Notifications about your account will appear here"
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 414,
          padding: 40,
          background: 'var(--tik-color-surface-primary)',
        }}
      >
        <EmptyState
          icon="emptyMessages"
          iconSize={61}
          title="Message your friends"
          description="Share videos or start a conversation"
        />
      </div>
    </div>
  ),
};

/**
 * Com ilustração, sem ilustração e com ação.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      <EmptyState icon="emptyInbox" title="Com ilustração" description="Descrição de apoio" />
      <EmptyState title="Sem ilustração" description="Descrição de apoio" />
      <EmptyState
        icon="emptyMessages"
        iconSize={61}
        title="Com ação"
        description="Descrição de apoio"
        action={
          <Button variant="outline" fixedWidth={false}>
            Find friends
          </Button>
        }
      />
    </div>
  ),
};
