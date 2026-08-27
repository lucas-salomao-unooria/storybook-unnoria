import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, MobileChannelHeader, MobileHeader } from '../../../src/unootube';
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
  UniDocThemeSwitcher,
} from '../../../.storybook/components';
import { avatars } from '../fixtures';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof MobileChannelHeader> = {
  title: 'Unootube/Componentes/MobileChannelHeader',
  component: MobileChannelHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarSrc: { control: 'text' },
    avatarInitials: { control: 'text' },
    channelName: { control: 'text' },
    subscriberCount: { control: 'text' },
    showSubscribe: { control: 'boolean' },
    subscribed: { control: 'boolean' },
    subscribeLabel: { control: 'text' },
    subscribedLabel: { control: 'text' },
    sectionLabel: { control: 'text' },
    className: { control: 'text' },
    onSubscribe: { action: 'onSubscribe' },
  },
  args: {
    avatarInitials: 'U',
    channelName: 'Username...',
    subscriberCount: '420 thousand subscribers',
    showSubscribe: true,
    subscribed: false,
    subscribeLabel: 'Subscribe',
    subscribedLabel: 'Subscribed',
    sectionLabel: 'Short videos from this channel',
  },
};

export default meta;

type Story = StoryObj<typeof MobileChannelHeader>;

const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: 360, maxWidth: '100%' }}>{children}</div>
);

const MobileChannelHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Conteúdo"
      title="MobileChannelHeader"
      description="Reprodução do bloco de identidade do canal nas telas móveis do arquivo Free YouTube Shorts Mockups (Community) (16:1080): retrato de 77px, nome em Roboto Regular 26, contagem de inscritos em 14 e a chamada de inscrição — que aqui é texto vermelho, e não botão preenchido."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Três alvos de inscrição no mesmo produto, e por que nenhum foi consolidado."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🔴" title="A inscrição aqui é texto">
        O arquivo desenha a chamada como texto em vermelho puro (<code>16:1087</code>), sem
        preenchimento nem contorno. É o terceiro alvo de inscrição do produto — os outros dois são o{' '}
        <code>SubscribeButton</code> sólido em <code>#CC0000</code> e o botão do{' '}
        <code>ShortsPlayer</code> sólido em <code>#FF0000</code>.
      </UniDocCard>
      <UniDocCard icon="👤" title="Retrato de 77px">
        Um sétimo diâmetro, fora da escala nomeada de seis do arquivo original. Informado como valor
        literal (<code>size={77}</code>) para que a escala nomeada continue refletindo só o primeiro
        arquivo.
      </UniDocCard>
      <UniDocCard icon="🔤" title="Nome em 26px">
        Fora da escala tipográfica publicada, que salta de 24 (Heading/H1) para nada. Preservado como
        literal e anotado no CSS do componente.
      </UniDocCard>
      <UniDocCard icon="🧩" title="Não desenha o cromo">
        A barra de voltar e reticências é o <code>MobileHeader</code> com{' '}
        <code>surface=&quot;page&quot;</code>, composto acima — como o arquivo faz.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="16:1080"
      frameName="Frame 37678"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'Retrato', value: '77px · letra em 40px' },
        { label: 'Nome', value: 'Roboto Regular 26' },
        { label: 'Contagem', value: 'Roboto Regular 14 · #8E8E8E' },
        { label: 'Inscrição', value: 'Roboto Regular 16 · #FF0000, em texto' },
        { label: 'Rótulo de seção', value: 'Roboto Regular 16 em texto secundário' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'showSubscribe',
          detail:
            'o arquivo sempre desenha a chamada de inscrição, porque a única tela de canal que ele publica é a de um canal de terceiro. No canal do próprio usuário não existe alvo de inscrição, e a prop suprime a chamada. Vem ligada, para preservar o desenho do arquivo por padrão.',
        },
        {
          subject: 'Corpo de 26px fora da escala',
          detail:
            'a escala publicada pelo arquivo original salta de Heading/H1 (24) para nada. O 26 do nome foi preservado como valor literal e está anotado no CSS do componente.',
        },
        {
          subject: 'Diâmetro de 77px fora da escala nomeada',
          detail:
            'os seis diâmetros nomeados do Avatar continuam sendo os do arquivo original. O 77 entra por size numérico, registrado nos tokens como --uni-avatar-3xl para documentação.',
        },
        {
          subject: 'Estado inscrito',
          detail:
            'o arquivo só desenha o estado não inscrito. Inscrito reaproveita o mesmo alvo em texto secundário, sem introduzir forma nova, e declara aria-pressed.',
        },
        {
          subject: 'Rótulo de seção acoplado',
          detail:
            'no arquivo "Short videos from this channel" é uma camada de texto solta (16:1088), fora do bloco de identidade. Foi exposta como prop opcional do mesmo componente, porque nas três telas ela sempre aparece logo abaixo dele.',
        },
        {
          subject: 'Retrato como bitmap',
          detail:
            'o arquivo desenha uma elipse magenta com a letra "U". As estórias reproduzem isso com o substituto de iniciais do Avatar; em produto, o retrato entra por avatarSrc.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Retrato',
          role: 'Avatar de 77px, a 17px do bloco de nomes.',
          token: '--uni-avatar-3xl',
        },
        {
          name: 'Nome',
          role: 'Roboto Regular 26 em texto primário.',
          token: '26px literal',
        },
        {
          name: 'Contagem',
          role: 'Roboto Regular 14 em texto terciário.',
          token: '--uni-color-text-tertiary',
        },
        {
          name: 'Chamada de inscrição',
          role: 'Texto em vermelho puro, sem preenchimento.',
          token: '--uni-color-brand-shorts',
        },
        {
          name: 'Rótulo de seção',
          role: 'Roboto Regular 16 em texto secundário, abaixo da identidade.',
          token: '--uni-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo, com o cromo composto acima" surface="primary" align="stretch" padding={0}>
      <Phone>
        <MobileHeader surface="page" action={<Icon name="moreVertical" size={20} />} />
        <MobileChannelHeader
          avatarInitials="U"
          channelName="Username..."
          subscriberCount="420 thousand subscribers"
          sectionLabel="Short videos from this channel"
        />
      </Phone>
    </UniDocStage>
    <UniDocStage label="Inscrito e com retrato" surface="primary" align="stretch" padding={0}>
      <Phone>
        <MobileChannelHeader
          avatarSrc={avatars.skylarDias}
          channelName="SADEK Tuts"
          subscriberCount="1,2 million subscribers"
          subscribed
          sectionLabel="Short videos from this channel"
        />
      </Phone>
    </UniDocStage>
    <UniDocStage label="Sem rótulo de seção" surface="primary" align="stretch" padding={0}>
      <Phone>
        <MobileChannelHeader
          avatarInitials="AC"
          channelName="Alan Cooper"
          subscriberCount="25K subscribers"
        />
      </Phone>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Componha MobileHeader acima com surface="page" — o componente não desenha o cromo.',
        'Use este bloco nas telas móveis e o ChannelHeader nas de 1440px.',
        'Informe subscriberCount: sem ele o bloco perde a linha de contexto do canal.',
        'Use sectionLabel para a chamada da grade que vem logo abaixo.',
      ]}
      donts={[
        'Não substitua a chamada por SubscribeButton: o arquivo a desenha em texto, não em botão.',
        'Não adicione capa acima: o arquivo não desenha capa nas telas móveis de canal.',
        'Não trunque o nome com reticências manualmente — o componente já as aplica.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="O bloco inteiro acompanha o tema; só o vermelho da chamada é invariante. Os valores claros foram medidos no quadro Android Shorts Light theme (1:801)."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => (
        <Phone>
          <MobileChannelHeader
            avatarInitials="U"
            channelName="Username..."
            subscriberCount="420 thousand subscribers"
            sectionLabel="Short videos from this channel"
          />
        </Phone>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="MobileChannelHeader"
      rows={[
        {
          name: 'avatarSrc · avatarInitials',
          type: 'string',
          description: 'Retrato do canal, ou as iniciais exibidas quando não há retrato.',
        },
        { name: 'channelName', type: 'React.ReactNode', description: 'Nome do canal.' },
        {
          name: 'subscriberCount',
          type: 'React.ReactNode',
          description: 'Linha de contagem, como o arquivo escreve.',
        },
        {
          name: 'showSubscribe',
          type: 'boolean',
          default: 'true',
          description:
            'Exibe a chamada de inscrição. Desligue no canal do próprio usuário.',
        },
        {
          name: 'subscribed · subscribeLabel · subscribedLabel · onSubscribe',
          type: 'boolean · React.ReactNode · React.ReactNode · () => void',
          default: "false · 'Subscribe' · 'Subscribed' · —",
          description: 'Chamada de inscrição em texto vermelho puro.',
        },
        {
          name: 'sectionLabel',
          type: 'React.ReactNode',
          description:
            'Rótulo de seção abaixo da identidade. Quando omitido, nada é renderizado ali.',
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
  render: () => <MobileChannelHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do MobileChannelHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MobileChannelHeader',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <Phone>
        <MobileChannelHeader {...args} />
      </Phone>
    </div>
  ),
};

/**
 * Réplica visual dos nós `16:1070`, `16:1080` e `16:1088`.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <Phone>
        <MobileHeader surface="page" action={<Icon name="moreVertical" size={20} />} />
        <MobileChannelHeader
          avatarInitials="U"
          channelName="Username..."
          subscriberCount="420 thousand subscribers"
          sectionLabel="Short videos from this channel"
        />
      </Phone>
    </div>
  ),
};

/**
 * Estados de inscrição.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {[false, true].map((subscribed) => (
        <div key={String(subscribed)}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {subscribed ? 'inscrito' : 'não inscrito'}
          </div>
          <Phone>
            <MobileChannelHeader
              avatarInitials="U"
              channelName="Username..."
              subscriberCount="420 thousand subscribers"
              subscribed={subscribed}
            />
          </Phone>
        </div>
      ))}
    </div>
  ),
};

/**
 * O canal do próprio usuário: sem chamada de inscrição.
 */
export const CanalProprio: Story = {
  name: 'Canal do próprio usuário',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <MobileChannelHeader
        showSubscribe={false}
        avatarInitials="LS"
        channelName="Meu canal"
        subscriberCount="128 inscritos"
        sectionLabel="Meus Shorts"
      />
    </div>
  ),
};
