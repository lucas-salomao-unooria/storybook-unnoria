import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { MessageBubble } from '../../../src/unoovista/components/MessageBubble';
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
import { unvThreadContact, unvThreadMessages } from '../fixtures';

/**
 * Trecho de conversa com os quatro degraus de agrupamento.
 */
const Conversa: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: 345 }}>
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
        meta={message.id === 'm4' ? 'Visto' : undefined}
      >
        {message.text}
      </MessageBubble>
    ))}
  </div>
);

/**
 * Página de documentação rica do componente MessageBubble.
 */
const MessageBubbleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="MessageBubble"
      description="Balão de mensagem da conversa aberta: o enviado à direita na lavanda do módulo, o recebido à esquerda em superfície clara com contorno e a coluna do avatar. O canto do “rabo” encolhe no balão isolado e no último do grupo, e os cantos voltados para o autor encolhem entre balões seguidos."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A unidade da conversa aberta do DirectThread."
    />
    <UnvDocGrid>
      <UnvDocCard icon="↔️" title="Dois sentidos">
        <code>incoming</code> à esquerda, com a coluna do avatar; <code>outgoing</code> à direita.
        O lado já diz quem falou — e <code>senderLabel</code> diz isso ao leitor de tela.
      </UnvDocCard>
      <UnvDocCard icon="🧱" title="Agrupamento">
        <code>position</code> encadeia balões seguidos: <code>first</code>, <code>middle</code> e{' '}
        <code>last</code>; <code>single</code> é a mensagem isolada. Só <code>single</code> e{' '}
        <code>last</code> levam o “rabo”.
      </UnvDocCard>
      <UnvDocCard icon="🕐" title="Carimbo">
        <code>meta</code> fica sob o balão, do lado do autor, em <code>caption-md</code> — a hora ou
        o estado (“Visto”, “10:42”).
      </UnvDocCard>
      <UnvDocCard icon="🗳️" title="Sem balão">
        <code>bare</code> tira o preenchimento e mantém lado, avatar e <code>meta</code>: é como a
        enquete <code>DmPoll</code> aparece enviada pela outra pessoa.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Preenchimentos, raios e tipografia do balão."
    />
    <UnvDocSpecs
      component="MessageBubble"
      layout="Balão · até 78% da conversa"
      specs={[
        { label: 'Enviado', value: 'background-tertiary · contorno border-subtle' },
        { label: 'Recebido', value: 'background-primary · contorno border-default' },
        { label: 'Raio', value: '16px (--unv-radius-l)' },
        { label: 'Rabo', value: '4px (--unv-radius-xs) no canto inferior do autor' },
        { label: 'Grupo', value: '8px (--unv-radius-s) nos cantos voltados ao autor' },
        { label: 'Texto', value: 'body-lg · Open Sans 400 · 16/24px' },
        { label: 'Recuo', value: '10 × 16px' },
        { label: 'Avatar', value: '24px (sm) · coluna reservada' },
        { label: 'Carimbo', value: 'caption-md · text-secondary · 12/18px' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'O balão enviado não usa o roxo de ação',
          detail:
            'action-primary é reservado a controles; um balão cheio se confundiria com um botão. O enviado é background-tertiary com texto primário: 13,1:1 no claro e 10,4:1 no escuro. O recebido, em background-primary, mede 15,1:1 e 16,7:1.',
        },
        {
          subject: 'Rabo e agrupamento',
          detail:
            'o canto inferior do lado do autor encolhe para 4px no balão isolado e no último do grupo (o “rabo”); nos demais, os cantos do lado do autor encolhem para 8px. Assim o fim de cada sequência é visível sem desenhar uma ponta.',
        },
        {
          subject: 'Contorno nos dois balões',
          detail:
            'sobre a tela lavanda, o enviado (1,07:1) e o recebido (1,08:1) quase se confundem com o fundo; os dois levam contorno de 1px em border-control, que mede 4,96:1 (claro) e 8,64:1 (escuro) sobre a tela e passa dos 3:1 exigidos a limites de componente. O enviado se distingue do recebido pelo preenchimento e pelo lado.',
        },
        {
          subject: 'Carimbo de hora',
          detail: 'text-secondary sobre a tela mede 7,56:1 (claro) e 12,99:1 (escuro).',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Coluna do avatar, balão e carimbo."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Só no último recebido do grupo; as outras linhas reservam a coluna.', token: '--unv-avatar-sm' },
        { name: 'Balão', role: 'Texto em body-lg, com quebras de linha preservadas.', token: '--unv-color-background-tertiary | --unv-color-background-primary' },
        { name: 'Rabo', role: 'Canto inferior do lado do autor, no balão isolado e no último.', token: '--unv-radius-xs' },
        { name: 'Carimbo', role: 'Hora ou estado sob o balão.', token: 'caption-md' },
      ]}
    />
    <UnvDocStage label="Conversa com agrupamento, avatar no último recebido e “Visto”" align="flex-start" surface="secondary">
      <Conversa />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Os quatro degraus de agrupamento nos dois sentidos."
    />
    <UnvDocStage label="position" align="flex-start" surface="secondary">
      {(['incoming', 'outgoing'] as const).map((direction) => (
        <div key={direction} style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          {(['single', 'first', 'middle', 'last'] as const).map((position) => (
            <MessageBubble
              key={position}
              direction={direction}
              position={position}
              avatarSrc={
                direction === 'incoming' && (position === 'last' || position === 'single')
                  ? unvThreadContact.avatarSrc
                  : undefined
              }
            >
              {position}
            </MessageBubble>
          ))}
        </div>
      ))}
    </UnvDocStage>
    <UnvDocStage label="Texto longo, quebra de linha preservada e carimbo" align="flex-start" surface="secondary">
      <div style={{ display: 'flex', flexDirection: 'column', width: 345 }}>
        <MessageBubble direction="incoming" avatarSrc={unvThreadContact.avatarSrc}>
          {'Primeira linha da mensagem.\nSegunda linha, depois de uma quebra — o balão quebra no limite de 78% da conversa.'}
        </MessageBubble>
        <MessageBubble direction="outgoing" meta="10:42 · Visto">
          Combinado!
        </MessageBubble>
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição da conversa."
    />
    <UnvDocPractices
      dos={[
        'Passar avatarSrc só no último balão recebido de um grupo.',
        'Encadear first → middle → last em mensagens seguidas do mesmo autor.',
        'Informar senderLabel: o leitor de tela não enxerga o lado do balão.',
        'Usar bare para mensagens que já são um cartão, como a DmPoll.',
      ]}
      donts={[
        'Pintar o balão de action-primary: ele passaria por botão.',
        'Passar avatarSrc em todos os balões do grupo.',
        'Colocar botões dentro do balão: ações vão no rodapé do DirectThread.',
        'Usar o balão de outro módulo de marca dentro do Unoovista.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Os dois preenchimentos e os contornos acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary">
      {(activeTheme) => <Conversa theme={activeTheme} />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente MessageBubble."
    />
    <UnvDocPropsTable
      title="MessageBubble"
      rows={[
        { name: 'direction', type: "'incoming' | 'outgoing'", description: 'Sentido da mensagem. Obrigatório.' },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo do balão. Obrigatório.' },
        {
          name: 'position',
          type: "'single' | 'first' | 'middle' | 'last'",
          default: "'single'",
          description: 'Posição no grupo de mensagens seguidas do mesmo autor.',
        },
        { name: 'avatarSrc', type: 'string', description: 'Avatar ao lado do último balão recebido.' },
        { name: 'meta', type: 'React.ReactNode', description: 'Carimbo ou estado sob o balão.' },
        { name: 'senderLabel', type: 'string', description: 'Autor anunciado só ao leitor de tela.' },
        { name: 'bare', type: 'boolean', default: 'false', description: 'Sem preenchimento: para cartões como a DmPoll.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema visual; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageBubble> = {
  title: 'Unoovista/Componentes/MessageBubble',
  component: MessageBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    direction: { control: 'radio', options: ['incoming', 'outgoing'], description: 'Sentido.' },
    children: { control: 'text', description: 'Texto do balão.' },
    position: {
      control: 'radio',
      options: ['single', 'first', 'middle', 'last'],
      description: 'Posição no grupo.',
    },
    avatarSrc: { control: 'text', description: 'Avatar do recebido.' },
    meta: { control: 'text', description: 'Linha sob o balão.' },
    senderLabel: { control: 'text', description: 'Autor para o leitor de tela.' },
    bare: { control: 'boolean', description: 'Sem preenchimento.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    direction: 'incoming',
    children: 'Vi que você montou as Histórias da semana!',
    position: 'single',
    avatarSrc: unvThreadContact.avatarSrc,
    meta: '',
    senderLabel: 'Amara',
    bare: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof MessageBubble>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MessageBubbleDocumentationPage />,
};

/**
 * Playground com todas as propriedades do MessageBubble expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MessageBubble',
  render: (args) => (
    <div
      data-unv-theme={args.theme}
      style={{
        width: 375,
        padding: 16,
        boxSizing: 'border-box',
        backgroundColor: 'var(--unv-color-background-secondary)',
      }}
    >
      <MessageBubble {...args} meta={args.meta || undefined} />
    </div>
  ),
};

/**
 * Os quatro degraus de agrupamento nos dois sentidos.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['incoming', 'outgoing'] as const).map((direction) => (
        <div key={direction} style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          {(['single', 'first', 'middle', 'last'] as const).map((position) => (
            <MessageBubble key={position} direction={direction} position={position}>
              {`${direction} · ${position}`}
            </MessageBubble>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * O autor é anunciado ao leitor de tela, e o avatar é decorativo.
 */
export const Estados: Story = {
  render: () => <Conversa />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getAllByText('Amara:', { exact: false })).toHaveLength(2);
    await expect(tela.getAllByText('Você:', { exact: false })).toHaveLength(2);
    await expect(tela.getByText('Visto')).toBeInTheDocument();
    await expect(tela.queryByRole('img')).not.toBeInTheDocument();
  },
};
