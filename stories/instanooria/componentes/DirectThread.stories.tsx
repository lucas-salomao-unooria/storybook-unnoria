import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DirectThread } from '../../../src/instanooria/components/DirectThread';
import { MessageBubble } from '../../../src/instanooria/components/MessageBubble';
import { DmPoll } from '../../../src/instanooria/components/DmPoll';
import { Button } from '../../../src/instanooria/components/Button';
import { TextField } from '../../../src/instanooria/components/TextField';
import { PhoneFrame } from '../../../src/instanooria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocDeviations,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaPollOptions, instaThreadContact, instaThreadMessages } from '../fixtures';

type Tema = 'light' | 'dark';

/**
 * As mensagens de demonstração, com o avatar no último recebido do grupo.
 */
const Mensagens: React.FC<{ theme: Tema }> = ({ theme }) => (
  <>
    {instaThreadMessages.map((message) => (
      <MessageBubble
        key={message.id}
        theme={theme}
        direction={message.direction}
        position={message.position}
        avatarSrc={
          message.direction === 'incoming' && message.position === 'last'
            ? instaThreadContact.avatarSrc
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
  <PhoneFrame theme={theme} ariaLabel={`Conversa com ${instaThreadContact.username}`}>
    <DirectThread
      theme={theme}
      withStatusBarInset={false}
      username={instaThreadContact.username}
      avatarSrc={instaThreadContact.avatarSrc}
      subtitle={instaThreadContact.subtitle}
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
        avatarSrc={instaThreadContact.avatarSrc}
        senderLabel="Amara"
      >
        <DmPoll theme={theme} question="O que mais pesou na sua escolha?" options={instaPollOptions} />
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
        username={instaThreadContact.username}
        avatarSrc={instaThreadContact.avatarSrc}
        subtitle={instaThreadContact.subtitle}
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
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="DirectThread"
      description="A conversa de DM aberta, como no app real: barra com voltar, avatar, nome de usuário e subtítulo; a área de mensagens rolável; e um rodapé fixo para um botão de ação ou um compositor desabilitado. Extensão: o arquivo publica só a lista de conversas."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A casca da conversa; as mensagens são MessageBubble e DmPoll."
    />
    <InstaDocGrid>
      <InstaDocCard icon="💬" title="Conversa aberta">
        A tela que a lista de conversas abre. As mensagens entram como <code>children</code>.
      </InstaDocCard>
      <InstaDocCard icon="⬇️" title="Rolagem que acompanha">
        Enquanto a pessoa está no fim, mensagem nova rola para a vista. Se ela subiu para reler, a
        rolagem não a arranca de lá.
      </InstaDocCard>
      <InstaDocCard icon="🧩" title="Rodapé livre">
        <code>footer</code> recebe um botão de ação ou um compositor desabilitado — a conversa da
        missão avança pelas enquetes, não pelo teclado.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Região viva">
        A área de mensagens é um <code>role=&quot;log&quot;</code> focável: mensagem nova é
        anunciada, e a rolagem funciona pelo teclado.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="A barra e o rodapé vêm da lista de conversas."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2482"
      frameName="Instagram Direct Messages → Top Bar (0:2629) · Camera (0:2614)"
      specs={[
        { label: 'Barra', value: '44px + 44px de status bar' },
        { label: 'Superfície da barra', value: 'background-secondary · bar-bottom' },
        { label: 'Nome', value: 'Title/Large · 16/21px' },
        { label: 'Subtítulo', value: 'Caption/Medium · text-secondary' },
        { label: 'Avatar', value: '32px (md)' },
        { label: 'Mensagens', value: 'padding 16 × 15px · rolagem fina' },
        { label: 'Rodapé', value: '50px + 29px de home indicator' },
        { label: 'Separação do rodapé', value: 'hairline-top de 0,33px' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro no arquivo de origem',
          detail:
            'o arquivo publica só a lista de conversas (0:768 / 0:2482). A barra repete a da lista (0:2629) com voltar, avatar e nome alinhados à esquerda, como na conversa do app; o rodapé reproduz a faixa de 79px da barra “Camera” (0:2614).',
        },
        {
          subject: 'Nome à esquerda',
          detail:
            'na lista o título é centralizado (TopBar); na conversa aberta o app o alinha ao avatar. Por isso a barra é própria e não a TopBar.',
        },
        {
          subject: 'Nenhum token nem glifo novo',
          detail: 'o voltar é o back do registro; o avatar é o Avatar do pacote.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Barra, mensagens (com uma DmPoll enviada pela outra pessoa) e rodapé."
    />
    <InstaDocStage label="Conversa com compositor desabilitado" align="flex-start">
      <ConversaNoTelefone />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Rodapé de ação. Toque em “Responder à Amara”: a rolagem acompanha a mensagem nova."
    />
    <InstaDocStage label="Rodapé com botão de ação" align="flex-start">
      <ConversaQueCresce />
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de composição da conversa." />
    <InstaDocPractices
      dos={[
        'Desligar withStatusBarInset dentro do PhoneFrame, que já desenha a status bar.',
        'Agrupar balões seguidos com position (first, middle, last).',
        'Mandar a enquete como MessageBubble bare da outra pessoa.',
        'Usar um compositor desabilitado quando a conversa não aceita texto livre.',
      ]}
      donts={[
        'Pôr a TopBar em cima da conversa: o nome é alinhado ao avatar.',
        'Colocar ações dentro da área de mensagens: elas vão no footer.',
        'Rolar a conversa à força quando a pessoa subiu para reler.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Barra, mensagens e rodapé acompanham o tema." />
    <InstaDocThemeSwitcher>
      {(activeTheme) => <ConversaNoTelefone key={activeTheme} theme={activeTheme} />}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente DirectThread."
    />
    <InstaDocPropsTable
      title="DirectThread"
      rows={[
        { name: 'username', type: 'string', description: 'Nome de usuário da outra pessoa. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'Avatar da outra pessoa.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Linha sob o nome, como “Ativa agora”.' },
        { name: 'onBack', type: '(event: React.MouseEvent) => void', description: 'Voltar. Sem ele, o botão some.' },
        { name: 'backLabel', type: 'string', default: "'Voltar'", description: 'Rótulo acessível do voltar.' },
        { name: 'children', type: 'React.ReactNode', description: 'As mensagens.' },
        { name: 'footer', type: 'React.ReactNode', description: 'Rodapé fixo: ação ou compositor.' },
        { name: 'withStatusBarInset', type: 'boolean', default: 'true', description: 'Reserva os 44px da status bar.' },
        { name: 'withHomeIndicatorInset', type: 'boolean', default: 'true', description: 'Reserva a faixa do home indicator.' },
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof DirectThread> = {
  title: 'Instanooria/Componentes/DirectThread',
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
    username: instaThreadContact.username,
    avatarSrc: instaThreadContact.avatarSrc,
    subtitle: instaThreadContact.subtitle,
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
 * A conversa da missão, com a enquete e o compositor desabilitado.
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
