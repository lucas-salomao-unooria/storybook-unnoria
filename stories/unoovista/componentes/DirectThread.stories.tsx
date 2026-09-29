import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DirectThread } from '../../../src/unoovista/components/DirectThread';
import { MessageBubble } from '../../../src/unoovista/components/MessageBubble';
import { DmPoll } from '../../../src/unoovista/components/DmPoll';
import { Button } from '../../../src/unoovista/components/Button';
import { TextField } from '../../../src/unoovista/components/TextField';
import { PhoneFrame } from '../../../src/unoovista/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocCard,
  UnvDocGrid,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocStage,
  UnvDocThemeSwitcher,
  UnvDocPropsTable,
} from '../../../.storybook/components';
import { unvPollOptions, unvThreadContact, unvThreadMessages } from '../fixtures';

type Tema = 'light' | 'dark';

/**
 * As mensagens de demonstração, com o avatar no último recebido do grupo.
 */
const Mensagens: React.FC<{ theme: Tema }> = ({ theme }) => (
  <>
    {unvThreadMessages.map((message) => (
      <MessageBubble
        key={message.id}
        theme={theme}
        direction={message.direction}
        position={message.position}
        avatarSrc={
          message.direction === 'incoming' && message.position === 'last'
            ? unvThreadContact.avatarSrc
            : undefined
        }
        senderLabel={message.direction === 'incoming' ? 'Amara' : 'Você'}
      >
        {message.text}
      </MessageBubble>
    ))}
  </>
);

/**
 * A conversa completa dentro do PhoneFrame, com enquete e compositor desabilitado.
 */
const ConversaNoTelefone: React.FC<{ theme?: Tema }> = ({ theme = 'light' }) => (
  <PhoneFrame theme={theme} ariaLabel={`Conversa com ${unvThreadContact.username}`}>
    <DirectThread
      theme={theme}
      withStatusBarInset={false}
      username={unvThreadContact.username}
      avatarSrc={unvThreadContact.avatarSrc}
      subtitle={unvThreadContact.subtitle}
      onBack={() => undefined}
      footer={
        <TextField
          theme={theme}
          label="Mensagem"
          hideLabel
          placeholder="A conversa segue pelas enquetes"
          disabled
        />
      }
    >
      <Mensagens theme={theme} />
      <MessageBubble
        theme={theme}
        direction="incoming"
        position="single"
        bare
        avatarSrc={unvThreadContact.avatarSrc}
        senderLabel="Amara"
      >
        <DmPoll theme={theme} question="O que mais pesou na sua escolha?" options={unvPollOptions} />
      </MessageBubble>
    </DirectThread>
  </PhoneFrame>
);

/**
 * Conversa em que o rodapé é uma ação que acrescenta mensagens.
 */
const ConversaQueCresce: React.FC = () => {
  const [extras, setExtras] = useState<string[]>([]);

  return (
    <div style={{ width: 375, height: 460, display: 'flex' }}>
      <DirectThread
        withStatusBarInset={false}
        withHomeIndicatorInset={false}
        username={unvThreadContact.username}
        avatarSrc={unvThreadContact.avatarSrc}
        subtitle={unvThreadContact.subtitle}
        onBack={() => undefined}
        footer={
          <Button block onClick={() => setExtras((lista) => [...lista, `Mensagem ${lista.length + 1}`])}>
            Responder à Amara
          </Button>
        }
      >
        <Mensagens theme="light" />
        {extras.map((texto) => (
          <MessageBubble key={texto} direction="outgoing" senderLabel="Você">
            {texto}
          </MessageBubble>
        ))}
      </DirectThread>
    </div>
  );
};

/**
 * Página de documentação rica do componente DirectThread.
 */
const DirectThreadDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="DirectThread"
      description="A conversa aberta, em camadas: a tela lavanda, o cabeçalho num cartão (voltar, avatar, nome e estado), a área de mensagens rolável e o compositor numa cápsula. Extensão do módulo: as mensagens entram como filhos — MessageBubble e DmPoll."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A casca da conversa; as mensagens são MessageBubble e DmPoll."
    />
    <UnvDocGrid>
      <UnvDocCard icon="💬" title="Conversa aberta">
        A tela que a lista de conversas abre. As mensagens entram como <code>children</code>.
      </UnvDocCard>
      <UnvDocCard icon="⬇️" title="Rolagem que acompanha">
        Enquanto a pessoa está no fim, mensagem nova rola para a vista. Se ela subiu para reler, a
        rolagem não a arranca de lá.
      </UnvDocCard>
      <UnvDocCard icon="🧩" title="Rodapé livre">
        <code>footer</code> recebe um campo, um botão de ação ou um compositor desabilitado, dentro
        de uma cápsula — a conversa pode avançar pelas enquetes, não só pelo teclado.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Região viva">
        A área de mensagens é um <code>role=&quot;log&quot;</code> focável: mensagem nova é
        anunciada, e a rolagem funciona pelo teclado.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Camadas, cartão de cabeçalho e cápsula do compositor."
    />
    <UnvDocSpecs
      component="DirectThread"
      layout="Tela · cabeçalho em cartão · compositor em cápsula"
      specs={[
        { label: 'Tela', value: '--unv-color-background-secondary' },
        { label: 'Cabeçalho', value: 'cartão background-primary · 16px · fio border-subtle' },
        { label: 'Voltar', value: '44px circular · fill-field' },
        { label: 'Nome', value: 'title-md · Open Sans 600 · 16/24px' },
        { label: 'Estado', value: 'caption-md · text-secondary' },
        { label: 'Avatar', value: '32px (md) · círculo, sem anel' },
        { label: 'Mensagens', value: 'calha de 16px · rolagem fina' },
        { label: 'Compositor', value: 'cápsula background-primary · --unv-radius-full' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Camadas em vez de fios',
          detail:
            'a tela é background-secondary e o cabeçalho e o compositor são cartões em background-primary; a separação vem da mudança de superfície e do espaço. O único fio é o de 1px em border-subtle em volta dos cartões, que garante a borda no tema escuro (background-primary sobre background-secondary mede 1,07:1).',
        },
        {
          subject: 'Cabeçalho é cartão, não barra',
          detail:
            'nome à esquerda, alinhado ao avatar, sem barra de largura total nem fio inferior. Por isso não é a TopBar.',
        },
        {
          subject: 'Voltar circular de 44px',
          detail: 'botão em fill-field com o glifo back do registro; alvo de toque de 44px e foco em action-primary (4,88:1 no claro, 7,70:1 no escuro sobre a superfície primária).',
        },
        {
          subject: 'Compositor em cápsula',
          detail:
            'o rodapé é uma cápsula que abriga o que o produto passar — campo, botão ou compositor desabilitado —, afastada das bordas pela calha do módulo.',
        },
        {
          subject: 'Sem sombra',
          detail: 'a conversa fica sob as camadas de sobreposição (menus, folhas, diálogos); os cartões da tela não projetam sombra.',
        },
        {
          subject: 'Texto do nome e do estado',
          detail: 'text-primary sobre background-primary mede 15,1:1 (claro) e 16,7:1 (escuro); text-secondary, 8,13:1 e 12,09:1.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Cabeçalho, mensagens (com uma DmPoll enviada pela outra pessoa) e compositor."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Cabeçalho em cartão', role: 'Voltar, avatar, nome e estado.', token: '--unv-color-background-primary' },
        { name: 'Mensagens', role: 'role="log" rolável; a rolagem acompanha a última mensagem.', token: '--unv-color-background-secondary' },
        { name: 'Compositor', role: 'Cápsula que recebe o footer.', token: '--unv-radius-full' },
      ]}
    />
    <UnvDocStage label="Conversa com compositor desabilitado" align="flex-start" surface="secondary">
      <ConversaNoTelefone />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Rodapé de ação. Toque em “Responder à Amara”: a rolagem acompanha a mensagem nova."
    />
    <UnvDocStage label="Rodapé com botão de ação" align="flex-start" surface="secondary">
      <ConversaQueCresce />
    </UnvDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de composição da conversa." />
    <UnvDocPractices
      dos={[
        'Desligar withStatusBarInset dentro do PhoneFrame, que já desenha a barra de status.',
        'Agrupar balões seguidos com position (first, middle, last).',
        'Mandar a enquete como MessageBubble bare da outra pessoa.',
        'Usar um compositor desabilitado quando a conversa não aceita texto livre.',
      ]}
      donts={[
        'Pôr a TopBar em cima da conversa: o cabeçalho é um cartão.',
        'Colocar ações dentro da área de mensagens: elas vão no footer.',
        'Rolar a conversa à força quando a pessoa subiu para reler.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Tela, cartões e mensagens acompanham o tema." />
    <UnvDocThemeSwitcher surface="secondary">
      {(activeTheme) => <ConversaNoTelefone key={activeTheme} theme={activeTheme} />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente DirectThread."
    />
    <UnvDocPropsTable
      title="DirectThread"
      rows={[
        { name: 'username', type: 'string', description: 'Nome da outra pessoa; título da conversa. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'Avatar da outra pessoa.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Estado sob o nome, como “Ativa agora”.' },
        { name: 'onBack', type: '(event: React.MouseEvent) => void', description: 'Voltar. Sem ele, o botão some.' },
        { name: 'backLabel', type: 'string', default: "'Voltar'", description: 'Rótulo acessível do voltar.' },
        { name: 'children', type: 'React.ReactNode', description: 'As mensagens.' },
        { name: 'footer', type: 'React.ReactNode', description: 'Rodapé fixo, dentro da cápsula: campo ou ação.' },
        { name: 'withStatusBarInset', type: 'boolean', default: 'true', description: 'Reserva a altura da barra de status.' },
        { name: 'withHomeIndicatorInset', type: 'boolean', default: 'true', description: 'Reserva a faixa do indicador de início.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema visual; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof DirectThread> = {
  title: 'Unoovista/Componentes/DirectThread',
  component: DirectThread,
  parameters: { layout: 'padded' },
  argTypes: {
    username: { control: 'text', description: 'Nome de usuário.' },
    avatarSrc: { control: 'text', description: 'Avatar.' },
    subtitle: { control: 'text', description: 'Subtítulo.' },
    backLabel: { control: 'text', description: 'Rótulo do voltar.' },
    withStatusBarInset: { control: 'boolean', description: 'Recuo da status bar.' },
    withHomeIndicatorInset: { control: 'boolean', description: 'Recuo do home indicator.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onBack: { action: 'onBack' },
  },
  args: {
    username: unvThreadContact.username,
    avatarSrc: unvThreadContact.avatarSrc,
    subtitle: unvThreadContact.subtitle,
    backLabel: 'Voltar',
    withStatusBarInset: false,
    withHomeIndicatorInset: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof DirectThread>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DirectThreadDocumentationPage />,
};

/**
 * Playground com todas as propriedades do DirectThread expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do DirectThread',
  render: (args) => (
    <PhoneFrame theme={args.theme} ariaLabel="Conversa">
      <DirectThread
        {...args}
        footer={<Button block theme={args.theme}>Responder</Button>}
      >
        <Mensagens theme={args.theme ?? 'light'} />
      </DirectThread>
    </PhoneFrame>
  ),
};

/**
 * A conversa com a enquete e o compositor desabilitado.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto',
  render: () => <ConversaNoTelefone />,
};

/**
 * A região viva nomeada, o voltar e a rolagem que acompanha a mensagem nova.
 */
export const Estados: Story = {
  render: () => <ConversaQueCresce />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('region', { name: 'Conversa com amara.gremio' })).toBeInTheDocument();
    await expect(tela.getByRole('heading', { name: 'amara.gremio' })).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'Voltar' })).toBeInTheDocument();

    const log = tela.getByRole('log', { name: 'Mensagens' });
    const responder = tela.getByRole('button', { name: 'Responder à Amara' });
    for (let vez = 0; vez < 6; vez += 1) {
      await userEvent.click(responder);
    }

    await expect(within(log).getByText('Mensagem 6')).toBeInTheDocument();
    await waitFor(() =>
      expect(log.scrollTop + log.clientHeight).toBeGreaterThanOrEqual(log.scrollHeight - 2)
    );
  },
};
