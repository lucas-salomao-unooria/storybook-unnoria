import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, Icon, ProfileHeader } from '../../../src/tiktooria';
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
import { tikAvatarJacob, tikProfileStats } from '../fixtures';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Tik Tooria/Componentes/ProfileHeader',
  component: ProfileHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    handle: { control: 'text' },
    avatarSrc: { control: 'text' },
    avatarAlt: { control: 'text' },
    bio: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    handle: '@jacob_w',
    avatarSrc: tikAvatarJacob,
    avatarAlt: 'Retrato de Jacob West',
    bio: 'Tap to add bio',
  },
};

export default meta;

type Story = StoryObj<typeof ProfileHeader>;


const ProfileHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Perfil"
      title="ProfileHeader"
      description="Cabeçalho de 414×318 da tela “TikTok User”: fotografia de 96px, identificador em Semibold 17, as três métricas, a faixa de ações e a biografia. O fio inferior de 0,33px é a sombra --tik-elevation-bar-bottom, não uma borda."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🪪" title="Identidade e números">
        Reúne fotografia, identificador e as três métricas em um bloco centralizado, o que dá ao perfil um centro visual claro.
      </TikDocCard>
      <TikDocCard icon="🎯" title="Faixa de ações">
        No arquivo são dois alvos: o botão outline de 164×44 e o marcador de 44×44. O slot <code>actions</code> aceita qualquer combinação.
      </TikDocCard>
      <TikDocCard icon="📝" title="Biografia como convite">
        Quando não há bio, o arquivo exibe “Tap to add bio” em tom secundário — o mesmo estilo do texto preenchido.
      </TikDocCard>
      <TikDocCard icon="➖" title="Fio inferior">
        Separa o cabeçalho da faixa de abas por sombra de raio 0, sem borda.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:477"
      frameName="User — TikTok User"
      specs={[
        { label: 'Dimensões', value: '414 × 318' },
        { label: 'Fotografia', value: '96px' },
        { label: 'Identificador', value: 'Semibold 17' },
        { label: 'Biografia', value: 'Regular 14 · #86878B' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Espaçamento entre métricas',
          detail:
            'o arquivo posiciona os três blocos em x=114, 206,5 e 298 — intervalos de 92,5 e 91,5px. O componente usa um gap fixo de 61px entre blocos, o que produz a mesma distância entre centros com largura de conteúdo variável.',
        },
        {
          subject: 'Altura por conteúdo',
          detail:
            'o arquivo fixa 318px. O componente calcula a altura pelo conteúdo, o que resulta em 318px com os valores do arquivo e evita corte quando a bio tem duas linhas.',
        },
        {
          subject: 'Marcador como slot',
          detail:
            'no arquivo o marcador é um nó irmão do botão. Aqui os dois vão no slot actions, o que permite ao produto trocar ou remover qualquer um dos dois.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Fotografia', role: 'Avatar de 96px centralizado no topo.', token: '--tik-avatar-xxl' },
        { name: 'Identificador', role: 'Semibold 17 a 11px da fotografia.', token: '--tik-font-handle-*' },
        { name: 'Métricas', role: 'Três StatTile com 61px entre blocos.', token: 'StatTile' },
        { name: 'Ações', role: 'Faixa com botão outline e marcador.', token: 'slot actions' },
        { name: 'Biografia', role: 'Regular 14 centralizada em tom secundário.', token: '--tik-font-label-* · --tik-color-text-secondary' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — “TikTok User”" surface="chrome" align="stretch" direction="column" width={414}>
      <ProfileHeader
        handle="@jacob_w"
        avatarSrc={tikAvatarJacob}
        avatarAlt="Retrato de Jacob West"
        stats={tikProfileStats}
        bio="Tap to add bio"
        actions={
          <>
            <Button variant="outline">Edit profile</Button>
            <Icon name="bookmark" size={22} tone="primary" />
          </>
        }
      />
    </TikDocStage>
    <TikDocStage label="Sem biografia e sem ações" surface="chrome" align="stretch" direction="column" width={414}>
      <ProfileHeader handle="@craig_love" stats={tikProfileStats} />
    </TikDocStage>
    <TikDocStage label="Perfil de terceiro, com ação de seguir" surface="chrome" align="stretch" direction="column" width={414}>
      <ProfileHeader
        handle="@karennne"
        stats={[
          { value: '112', label: 'Following' },
          { value: '1.2M', label: 'Followers' },
          { value: '8.4M', label: 'Likes' },
        ]}
        bio="Dançarina · São Paulo"
        actions={<Button variant="primary" fixedWidth={false}>Follow</Button>}
      />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Passe exatamente três métricas, na ordem seguindo → seguidores → curtidas.',
        'Use “Tap to add bio” quando a biografia estiver vazia, como o arquivo faz.',
        'Combine o botão outline com o marcador no slot actions.',
        'Informe avatarAlt descritivo quando a fotografia identificar a pessoa.',
      ]}
      donts={[
        'Não acrescente uma quarta métrica.',
        'Não use borda no lugar do fio inferior.',
        'Não coloque o cabeçalho sobre superfície imersiva.',
        'Não use mais de um botão primary na faixa de ações.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <div style={{ width: 414 }}>
          <ProfileHeader
            handle="@jacob_w"
            avatarSrc={tikAvatarJacob}
            stats={tikProfileStats}
            bio="Tap to add bio"
            actions={<Button variant="outline">Edit profile</Button>}
          />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="ProfileHeader"
      rows={[
        {
          name: 'handle',
          type: "React.ReactNode",
          description:
            'Identificador do perfil, em Semibold 17.',
        },
        {
          name: 'avatarSrc',
          type: "string",
          description:
            'Endereço da fotografia de perfil, exibida em 96px.',
        },
        {
          name: 'avatarAlt',
          type: "string",
          description:
            'Texto alternativo da fotografia.',
        },
        {
          name: 'stats',
          type: "TikProfileStat[]",
          default: "[]",
          description:
            'As três métricas do arquivo: seguindo, seguidores e curtidas.',
        },
        {
          name: 'bio',
          type: "React.ReactNode",
          description:
            'Biografia ou convite para adicioná-la, em Regular 14.',
        },
        {
          name: 'actions',
          type: "React.ReactNode",
          description:
            'Ações entre as métricas e a biografia.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.HTMLAttributes<HTMLElement>",
          description:
            'Demais atributos HTML são repassados ao <header>.',
        },
      ]}
    />
    <TikDocPropsTable
      title="TikProfileStat"
      rows={[
        {
          name: 'value',
          type: "React.ReactNode",
          description:
            'Valor exibido em Bold 17.',
        },
        {
          name: 'label',
          type: "React.ReactNode",
          description:
            'Rótulo exibido em Regular 13.',
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
  render: () => <ProfileHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do ProfileHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ProfileHeader',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ProfileHeader
        {...args}
        stats={tikProfileStats}
        actions={
          <>
            <Button variant="outline">Edit profile</Button>
            <Icon name="bookmark" size={22} tone="primary" />
          </>
        }
      />
    </div>
  ),
};

/**
 * Réplica visual do cabeçalho do frame “TikTok User” do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ProfileHeader
        handle="@jacob_w"
        avatarSrc={tikAvatarJacob}
        avatarAlt="Retrato de Jacob West"
        stats={tikProfileStats}
        bio="Tap to add bio"
        actions={
          <>
            <Button variant="outline">Edit profile</Button>
            <Icon name="bookmark" size={22} tone="primary" />
          </>
        }
      />
    </div>
  ),
};

/**
 * Perfil próprio, perfil de terceiro e perfil mínimo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 414 }}>
      <ProfileHeader
        handle="@jacob_w"
        avatarSrc={tikAvatarJacob}
        stats={tikProfileStats}
        bio="Tap to add bio"
        actions={
          <>
            <Button variant="outline">Edit profile</Button>
            <Icon name="bookmark" size={22} tone="primary" />
          </>
        }
      />
      <ProfileHeader
        handle="@karennne"
        stats={[
          { value: '112', label: 'Following' },
          { value: '1.2M', label: 'Followers' },
          { value: '8.4M', label: 'Likes' },
        ]}
        bio="Dançarina · São Paulo"
        actions={
          <Button variant="primary" fixedWidth={false}>
            Follow
          </Button>
        }
      />
      <ProfileHeader handle="@craig_love" stats={tikProfileStats} />
    </div>
  ),
};

/**
 * Composição modular: o cabeçalho monta StatTile e Avatar internamente e recebe
 * as ações por slot.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <div style={{ width: 414 }}>
      <ProfileHeader
        handle="@jacob_w"
        avatarSrc={tikAvatarJacob}
        stats={tikProfileStats}
        bio="Editor de vídeo"
        actions={
          <>
            <Button variant="outline" fixedWidth={false}>
              Message
            </Button>
            <Button variant="primary" fixedWidth={false}>
              Follow
            </Button>
          </>
        }
      />
    </div>
  ),
};
