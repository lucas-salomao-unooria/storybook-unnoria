import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { MessageBubble } from '../../../src/instanooria/components/MessageBubble';
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
import { instaThreadContact, instaThreadMessages } from '../fixtures';

/**
 * Trecho de conversa com os quatro degraus de agrupamento.
 */
const Conversa: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: 345 }}>
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
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="MessageBubble"
      description="Balão de mensagem direta, como no Direct da geração de app que o arquivo desenha: o enviado à direita no preenchimento neutro, o recebido à esquerda com contorno e a coluna do avatar. Os cantos encolhem do lado do autor entre balões seguidos, como no app real. Extensão sem quadro no arquivo de origem — e não é o MessageBubble do WhatsApp Mobile."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A unidade da conversa aberta do DirectThread."
    />
    <InstaDocGrid>
      <InstaDocCard icon="↔️" title="Dois sentidos">
        <code>incoming</code> à esquerda, com a coluna do avatar; <code>outgoing</code> à direita.
        O lado já diz quem falou — e <code>senderLabel</code> diz isso ao leitor de tela.
      </InstaDocCard>
      <InstaDocCard icon="🧱" title="Agrupamento">
        <code>position</code> encolhe os cantos voltados para o autor: <code>first</code>,{' '}
        <code>middle</code> e <code>last</code> encadeiam balões seguidos, <code>single</code> é a
        mensagem isolada.
      </InstaDocCard>
      <InstaDocCard icon="👁️" title="Metadado">
        <code>meta</code> fica sob o balão, do lado do autor — “Visto”, “Enviada agora”.
      </InstaDocCard>
      <InstaDocCard icon="🗳️" title="Sem balão">
        <code>bare</code> tira o preenchimento e mantém lado, avatar e <code>meta</code>: é como a
        enquete <code>DmPoll</code> aparece enviada pela outra pessoa.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Sem quadro no arquivo: cada medida vem de um degrau publicado."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2622"
      frameName="Instagram Direct Messages → Search (o preenchimento do balão enviado)"
      specs={[
        { label: 'Enviado', value: '--insta-color-fill-field' },
        { label: 'Recebido', value: 'background-primary · contorno action-secondary-border' },
        { label: 'Raio', value: '21,5px (--insta-radius-xl) · 4px no grupo' },
        { label: 'Corpo', value: 'Body/Large · 16/22px' },
        { label: 'Recuo', value: '10 × 12px' },
        { label: 'Avatar', value: '23px (sm) · coluna reservada' },
        { label: 'Largura máxima', value: '75% da conversa' },
        { label: 'Meta', value: 'Caption/Medium · text-secondary' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro no arquivo de origem',
          detail:
            'o arquivo publica só a lista de conversas (0:768 / 0:2482), nunca uma conversa aberta. A forma é a do app real; o preenchimento vem do campo de busca dessa mesma lista (0:2622) e o raio de 21,5px, do campo “Send Message” do Story (0:2266).',
        },
        {
          subject: 'O enviado não é azul',
          detail:
            'o app atual pinta o enviado de azul-arroxeado; aqui ele é o cinza do Direct da geração que o arquivo desenha. Branco sobre --insta-color-action-primary mede 3,06:1, abaixo dos 4,5:1 que texto de 16px exige; texto primário sobre os dois preenchimentos passa de 12:1 nos dois temas.',
        },
        {
          subject: 'Corpo em Body/Large',
          detail:
            'o token descreve Label/Medium (13px) como “corpo de legendas e mensagens”, mas na lista ele é a prévia da mensagem. Na conversa aberta o app usa corpo maior; o degrau publicado equivalente é Body/Large (16/22).',
        },
        {
          subject: 'Nenhum token nem glifo novo',
          detail: 'só variáveis --insta-* existentes; o avatar é o Avatar do pacote.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Coluna do avatar, balão e metadado."
    />
    <InstaDocStage label="Conversa com agrupamento, avatar no último recebido e “Visto”" align="flex-start">
      <Conversa />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Os quatro degraus de agrupamento nos dois sentidos."
    />
    <InstaDocStage label="position" align="flex-start">
      {(['incoming', 'outgoing'] as const).map((direction) => (
        <div key={direction} style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          {(['single', 'first', 'middle', 'last'] as const).map((position) => (
            <MessageBubble
              key={position}
              direction={direction}
              position={position}
              avatarSrc={
                direction === 'incoming' && (position === 'last' || position === 'single')
                  ? instaThreadContact.avatarSrc
                  : undefined
              }
            >
              {position}
            </MessageBubble>
          ))}
        </div>
      ))}
    </InstaDocStage>
    <InstaDocStage label="Texto longo, quebra de linha preservada e meta" align="flex-start">
      <div style={{ display: 'flex', flexDirection: 'column', width: 345 }}>
        <MessageBubble direction="incoming" avatarSrc={instaThreadContact.avatarSrc}>
          {'Primeira linha da mensagem.\nSegunda linha, depois de uma quebra — o balão quebra no limite de 75% da conversa.'}
        </MessageBubble>
        <MessageBubble direction="outgoing" meta="Visto">
          Combinado!
        </MessageBubble>
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição da conversa."
    />
    <InstaDocPractices
      dos={[
        'Passar avatarSrc só no último balão recebido de um grupo.',
        'Encadear first → middle → last em mensagens seguidas do mesmo autor.',
        'Informar senderLabel: o leitor de tela não enxerga o lado do balão.',
        'Usar bare para mensagens que já são um cartão, como a DmPoll.',
      ]}
      donts={[
        'Pintar o balão enviado de azul com texto branco — 3,06:1.',
        'Usar o MessageBubble do WhatsApp Mobile dentro do Instanooria.',
        'Passar avatarSrc em todos os balões do grupo.',
        'Colocar botões dentro do balão: ações vão no rodapé do DirectThread.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Os dois preenchimentos e o contorno acompanham o tema."
    />
    <InstaDocThemeSwitcher>{(activeTheme) => <Conversa theme={activeTheme} />}</InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente MessageBubble."
    />
    <InstaDocPropsTable
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
        { name: 'meta', type: 'React.ReactNode', description: 'Linha sob o balão, como “Visto”.' },
        { name: 'senderLabel', type: 'string', description: 'Autor anunciado só ao leitor de tela.' },
        { name: 'bare', type: 'boolean', default: 'false', description: 'Sem preenchimento: para cartões como a DmPoll.' },
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MessageBubble> = {
  title: 'Instanooria/Componentes/MessageBubble',
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
    children: 'Vi que você montou os Stories da semana!',
    position: 'single',
    avatarSrc: instaThreadContact.avatarSrc,
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
      data-insta-theme={args.theme}
      style={{
        width: 375,
        padding: 15,
        boxSizing: 'border-box',
        backgroundColor: 'var(--insta-color-background-primary)',
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
