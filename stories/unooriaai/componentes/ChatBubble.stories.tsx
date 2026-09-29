import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChatBubble } from '../../../src/unooriaai/components/ChatBubble';
import { Avatar, ChatInput } from '../../../src/unooriaai/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocAnatomy,
  UaiDocCard,
  UaiDocDecisions,
  UaiDocGrid,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocSpecs,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiAvatars, uaiTranscript } from '../fixtures';

const BAR = '#716C98';

/**
 * Transcrição renderizada com o componente real, alinhando usuário à direita.
 */
const Transcricao: React.FC<{ largura?: number }> = ({ largura = 620 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: largura }}>
    {uaiTranscript.map((item, index) => (
      <div
        key={`${item.role}-${index}`}
        style={{ display: 'flex', justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start' }}
      >
        <ChatBubble role={item.role}>{item.message}</ChatBubble>
      </div>
    ))}
  </div>
);

/**
 * Página de documentação rica do componente ChatBubble.
 */
const ChatBubbleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Conversa"
      title="ChatBubble"
      description="A fala de uma conversa. O papel user renderiza a cápsula translúcida com raio 16 e padding 12/16; o papel assistant renderiza a mensagem sem cápsula, precedida do avatar de 24px em --uai-bg-inverse com as iniciais IA. Os dois papéis compartilham a tipografia Body/SM (Open Sans 14/20) e o gap de 12px."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Dois papéis com tratamentos deliberadamente assimétricos."
    />
    <UaiDocGrid>
      <UaiDocCard icon="🙋" title="Papel user">
        Cápsula translúcida com raio 16, alinhada à direita da coluna de conversa. A superfície
        delimita a fala da pessoa sem introduzir cor de marca.
      </UaiDocCard>
      <UaiDocCard icon="🤖" title="Papel assistant">
        Sem cápsula: a resposta corre sobre <code>--uai-bg-primary</code>, precedida do avatar
        escuro <code>IA</code>. A assimetria é intencional — a resposta é o conteúdo principal da
        tela.
      </UaiDocCard>
      <UaiDocCard icon="📐" title="Largura">
        A bolha abraça o conteúdo (<code>inline-flex</code>). O limite de largura fica com a coluna
        de conversa, não com o componente.
      </UaiDocCard>
      <UaiDocCard icon="🖼️" title="Avatar substituível">
        A prop <code>avatar</code> aceita qualquer nó — um <code>Avatar</code> com foto, o
        logotipo de um assistente personalizado.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas e tokens do componente."
    />
    <UaiDocSpecs
      component="ChatBubble"
      layout="Linha · abraça o conteúdo"
      specs={[
        { label: 'Padding', value: '12/16 · --uai-spacing-5 e -6' },
        { label: 'Gap', value: '12px · --uai-spacing-5' },
        { label: 'Raio (user)', value: '16px · --uai-radius-xl' },
        { label: 'Superfície (user)', value: '--uai-fill-4' },
        { label: 'Superfície (assistant)', value: '--uai-bg-primary' },
        { label: 'Avatar (assistant)', value: '24px · --uai-bg-inverse · "IA" 10px' },
        { label: 'Texto', value: 'Body/SM · Open Sans 14/20' },
        { label: 'Contraste (user)', value: '12,24:1 claro · 12,91:1 escuro' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Sem cápsula no assistente',
          detail:
            'A resposta do assistente é o conteúdo principal e corre sobre a superfície da conversa; o padding 12/16 é mantido nos dois papéis para que o texto dos dois alinhe.',
        },
        {
          subject: 'Avatar em círculo de 24px',
          detail:
            'O componente reutiliza o Avatar size="sm" tone="inverse", que entrega o círculo de 24px com iniciais em Open Sans 10px.',
        },
        {
          subject: 'Cor por contraste, sem cor de marca na cápsula',
          detail:
            'A cápsula do usuário usa a escada translúcida (--uai-fill-4): texto primário sobre ela mede 12,24:1 no claro e 12,91:1 no escuro. A cor de marca fica reservada a controles e a avatares de marca.',
        },
        {
          subject: 'Iniciais padrão "IA"',
          detail: 'O texto padrão do avatar do assistente está em português (IA), não em inglês.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Avatar opcional e a mensagem, em uma linha flexível."
    />
    <UaiDocAnatomy
      zones={[
        {
          name: 'Avatar',
          role: 'Renderizado somente em role="assistant". Alinhado ao topo (align-items: flex-start) para acompanhar mensagens de várias linhas.',
          token: '--uai-bg-inverse',
        },
        {
          name: 'Mensagem',
          role: 'children em Body/SM. Aceita nós ricos — parágrafos, listas, blocos de código.',
          token: '--uai-text-primary',
        },
        {
          name: 'avatarInitials',
          role: 'Texto do avatar padrão do assistente. O padrão é IA.',
        },
        {
          name: 'Superfície',
          role: 'Definida pelo papel: --uai-fill-4 com raio no usuário, --uai-bg-primary sem raio no assistente.',
          token: '--uai-fill-4 · --uai-bg-primary',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Composição"
      description="Os dois papéis, conteúdo rico, avatar personalizado e uma transcrição completa."
    />
    <UaiDocStage label="Papéis user e assistant" direction="column" align="flex-start">
      <ChatBubble role="user">Olá, como você pode me ajudar?</ChatBubble>
      <ChatBubble role="assistant">
        Posso ajudar com muita coisa! Fique à vontade para perguntar o que quiser.
      </ChatBubble>
    </UaiDocStage>
    <UaiDocStage label="Mensagem longa e conteúdo rico" direction="column" align="flex-start">
      <ChatBubble role="assistant">
        <div style={{ display: 'grid', gap: 8 }}>
          <span>Consolidei as decisões desta conversa em três eixos:</span>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 4 }}>
            <li>Cores e tipografia vêm sempre dos tokens da Plataforma Unooria.</li>
            <li>Componentes compõem os degraus existentes, sem inventar estados.</li>
            <li>Toda escolha fora do padrão fica registrada na seção de especificações.</li>
          </ul>
        </div>
      </ChatBubble>
      <ChatBubble role="user">Perfeito. Gere a matriz de variantes a partir disso.</ChatBubble>
    </UaiDocStage>
    <UaiDocStage label="Avatar personalizado" direction="column" align="flex-start">
      <ChatBubble
        role="assistant"
        avatar={<Avatar size="sm" src={uaiAvatars.ana} alt="Avatar do assistente de análise de dados" />}
      >
        Analisei a planilha e destaquei as três séries com maior variação.
      </ChatBubble>
      <ChatBubble role="assistant" avatarInitials="AD">
        Iniciais personalizadas também funcionam.
      </ChatBubble>
    </UaiDocStage>
    <UaiDocStage label="Transcrição completa com o compositor" direction="column">
      <Transcricao largura={600} />
      <ChatInput block />
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas Práticas"
      description="Regras de conversa."
    />
    <UaiDocPractices
      dos={[
        'Alinhar a bolha do usuário à direita e a do assistente à esquerda, preservando a leitura de papéis.',
        'Limitar a largura pela coluna de conversa, deixando a bolha abraçar o conteúdo.',
        'Manter o avatar apenas no assistente.',
        'Passar conteúdo rico como children quando a resposta tiver listas ou código.',
      ]}
      donts={[
        'Dar cápsula ao assistente: a assimetria entre os papéis é intencional.',
        'Colocar avatar na bolha do usuário.',
        'Usar cor de marca na superfície da bolha — a biblioteca usa a escada translúcida.',
        'Empilhar bolhas sem gap: o espaçamento de 12px separa as falas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="A cápsula do usuário segue a escada translúcida (tinta roxa no claro, branco no escuro) e o avatar do assistente inverte junto com --uai-bg-inverse."
    />
    <UaiDocThemeSwitcher direction="column">
      {() => <Transcricao largura={520} />}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente ChatBubble."
    />
    <UaiDocPropsTable
      title="ChatBubble"
      rows={[
        {
          name: 'role',
          type: "'user' | 'assistant'",
          default: "'user'",
          description: 'Papel do autor: cápsula translúcida (user) ou mensagem com avatar (assistant).',
        },
        {
          name: 'avatarInitials',
          type: 'string',
          default: "'IA'",
          description: 'Iniciais do avatar padrão do assistente.',
        },
        {
          name: 'avatar',
          type: 'React.ReactNode',
          description: 'Substitui o avatar padrão do assistente por um nó arbitrário.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description:
            'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da mensagem.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatBubble> = {
  title: 'UnooriaAI/Componentes/ChatBubble',
  component: ChatBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    role: { control: 'radio', options: ['user', 'assistant'], description: 'Papel do autor.' },
    avatarInitials: { control: 'text', description: 'Iniciais do avatar do assistente.' },
    avatar: { control: false, description: 'Nó que substitui o avatar padrão.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Conteúdo da mensagem.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    role: 'user',
    avatarInitials: 'IA',
    theme: 'light',
    children: 'Olá, como você pode me ajudar?',
  },
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatBubbleDocumentationPage />,
};

/**
 * Playground com todas as propriedades do ChatBubble expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatBubble',
  render: (args) => (
    <UaiDocStage theme={args.theme ?? 'light'} padding={48}>
      <ChatBubble {...args} />
    </UaiDocStage>
  ),
};

/**
 * Os dois papéis lado a lado, como aparecem no início de uma conversa.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UaiDocStage direction="column" align="flex-start" width={493}>
      <ChatBubble role="user">Olá, como você pode me ajudar?</ChatBubble>
      <ChatBubble role="assistant">
        Posso ajudar com muita coisa! Fique à vontade para perguntar o que quiser.
      </ChatBubble>
    </UaiDocStage>
  ),
};

/**
 * Transcrição completa com os dois papéis alternados.
 */
export const Transcricao_: Story = {
  render: () => <Transcricao />,
};
