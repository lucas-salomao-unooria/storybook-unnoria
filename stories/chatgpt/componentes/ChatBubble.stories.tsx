import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChatBubble } from '../../../src/chatgpt/components/ChatBubble';
import { Avatar, ChatInput } from '../../../src/chatgpt/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptAvatars, gptFigmaNodes, gptTranscript } from '../fixtures';

/**
 * Transcrição renderizada com o componente real, alinhando usuário à direita.
 */
const Transcricao: React.FC<{ largura?: number }> = ({ largura = 620 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: largura }}>
    {gptTranscript.map((item, index) => (
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
      badgeBrand="ChatGPT"
      category="Componentes • Conversa"
      title="ChatBubble"
      description="Réplica do conjunto ChatBubble da página 🟡 Design system: Role=User renderiza a cápsula translúcida de 4% com raio 16 e padding 12/16; Role=Assistant renderiza a mensagem sem cápsula, precedida do avatar de 24px em bg/inverse com as iniciais AI. Os dois papéis compartilham a tipografia Body/SM e o gap de 12px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Dois papéis com tratamentos deliberadamente assimétricos."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🙋" title="Role=User">
        Cápsula translúcida com raio 16, alinhada à direita da coluna de conversa. A superfície
        delimita a fala do usuário sem introduzir cor de marca.
      </GptDocCard>
      <GptDocCard icon="🤖" title="Role=Assistant">
        Sem cápsula: a resposta corre sobre <code>bg/primary</code>, precedida do avatar preto{' '}
        <code>AI</code>. A assimetria é intencional — a resposta é o conteúdo principal da tela.
      </GptDocCard>
      <GptDocCard icon="📐" title="Largura">
        A bolha abraça o conteúdo (<code>inline-flex</code>). O limite de largura fica com a coluna
        de conversa, não com o componente.
      </GptDocCard>
      <GptDocCard icon="🖼️" title="Avatar substituível">
        A prop <code>avatar</code> aceita qualquer nó — um <code>Avatar</code> com foto, um logotipo
        de GPT personalizado.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do conjunto de variantes via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.chatBubble}
      frameName="ChatBubble (Role · 2 variantes)"
      specs={[
        { label: 'Padding', value: '12/16 · spacing/5 e spacing/6' },
        { label: 'Gap', value: '12px · spacing/5' },
        { label: 'Raio (User)', value: '16px · radius/xl' },
        { label: 'Superfície (User)', value: 'preto a 4% · --gpt-fill-4' },
        { label: 'Superfície (Assistant)', value: '#FFFFFF · bg/primary' },
        { label: 'Avatar (Assistant)', value: '24px · bg/inverse · "AI" 10px' },
      ]}
      deviations={[
        'O frame Avatar dentro de Role=Assistant abraça a largura do texto (10px) contra a altura de 24px; o componente reutiliza o Avatar size="sm" tone="inverse", que produz o círculo de 24px com o mesmo raio do arquivo.',
        'A variante Role=Assistant não tem raio no arquivo, e o padding de 12/16 permanece — o que desloca o texto da margem da coluna. O padding foi mantido por fidelidade.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Avatar opcional e a mensagem, em uma linha flexível."
      barColor="#5856D6"
    />
    <GptDocGrid min={260}>
      <GptDocCard icon="🤖" title="Avatar">
        Renderizado somente em <code>role=&quot;assistant&quot;</code>. Alinhado ao topo
        (<code>align-items: flex-start</code>) para acompanhar mensagens de várias linhas.
      </GptDocCard>
      <GptDocCard icon="💬" title="Mensagem">
        <code>children</code> em <code>Body/SM</code>. Aceita nós ricos — parágrafos, listas, blocos
        de código.
      </GptDocCard>
      <GptDocCard icon="🅰️" title="avatarInitials">
        Texto do avatar padrão do assistente. O arquivo usa <code>AI</code>.
      </GptDocCard>
      <GptDocCard icon="🎨" title="Superfície">
        Definida pelo papel: <code>--gpt-fill-4</code> com raio no usuário,{' '}
        <code>bg/primary</code> sem raio no assistente.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="4. Matriz de Papéis e Composição"
      description="As duas variantes publicadas e uma transcrição completa."
      barColor="#5856D6"
    />
    <GptDocStage label="Role=User e Role=Assistant" direction="column" align="flex-start">
      <ChatBubble role="user">Hello, how can you help me?</ChatBubble>
      <ChatBubble role="assistant">
        I can help you with many things! Feel free to ask me anything.
      </ChatBubble>
    </GptDocStage>
    <GptDocStage label="Mensagem longa e conteúdo rico" direction="column" align="flex-start">
      <ChatBubble role="assistant">
        <div style={{ display: 'grid', gap: 8 }}>
          <span>Consolidei as decisões desta thread em três eixos:</span>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 4 }}>
            <li>Tokens vêm sempre das coleções de variáveis do arquivo.</li>
            <li>Componentes replicam as variantes publicadas, sem inventar estados.</li>
            <li>Desvios ficam registrados na seção de especificações técnicas.</li>
          </ul>
        </div>
      </ChatBubble>
      <ChatBubble role="user">Perfeito. Gere a matriz de variantes a partir disso.</ChatBubble>
    </GptDocStage>
    <GptDocStage label="Avatar personalizado" direction="column" align="flex-start">
      <ChatBubble
        role="assistant"
        avatar={<Avatar size="sm" src={gptAvatars.ana} alt="Avatar do GPT de análise de dados" />}
      >
        Analisei a planilha e destaquei as três séries com maior variação.
      </ChatBubble>
      <ChatBubble role="assistant" avatarInitials="DA">
        Iniciais personalizadas também funcionam.
      </ChatBubble>
    </GptDocStage>
    <GptDocStage label="Transcrição completa com o compositor" direction="column">
      <Transcricao largura={600} />
      <ChatInput block />
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de conversa."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Alinhar a bolha do usuário à direita e a do assistente à esquerda, preservando a leitura de papéis.',
        'Limitar a largura pela coluna de conversa, deixando a bolha abraçar o conteúdo.',
        'Manter o avatar apenas no assistente, como faz o arquivo.',
        'Passar conteúdo rico como children quando a resposta tiver listas ou código.',
      ]}
      donts={[
        'Dar cápsula ao assistente: a assimetria entre os papéis é intencional no arquivo.',
        'Colocar avatar na bolha do usuário.',
        'Usar cor de marca na superfície da bolha — a biblioteca usa a escada translúcida neutra.',
        'Empilhar bolhas sem gap: o espaçamento de 12px separa as falas.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="A cápsula do usuário segue a escada translúcida e o avatar do assistente inverte junto com bg/inverse."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher direction="column">
      {() => <Transcricao largura={520} />}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente ChatBubble."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="ChatBubble"
      rows={[
        {
          name: 'role',
          type: "'user' | 'assistant'",
          default: "'user'",
          description: 'Papel do autor, espelhando a propriedade Role do conjunto no Figma.',
        },
        {
          name: 'avatarInitials',
          type: 'string',
          default: "'AI'",
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
  title: 'ChatGPT/Componentes/ChatBubble',
  component: ChatBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    role: { control: 'radio', options: ['user', 'assistant'], description: 'Papel do autor.' },
    avatarInitials: { control: 'text', description: 'Iniciais do avatar do assistente.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: 'text', description: 'Conteúdo da mensagem.' },
  },
  args: {
    role: 'user',
    avatarInitials: 'AI',
    theme: 'light',
    children: 'Hello, how can you help me?',
  },
};

export default meta;

type Story = StoryObj<typeof ChatBubble>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
    <div
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <ChatBubble {...args} />
    </div>
  ),
};

/**
 * Réplica visual do conjunto de variantes publicado no Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
        width: 493,
        padding: 16,
        border: '1px solid #E4E8E9',
        borderRadius: 5,
      }}
    >
      <ChatBubble role="user">Hello, how can you help me?</ChatBubble>
      <ChatBubble role="assistant">
        I can help you with many things! Feel free to ask me anything.
      </ChatBubble>
    </div>
  ),
};

/**
 * Transcrição completa com os dois papéis alternados.
 */
export const Transcricao_: Story = {
  render: () => <Transcricao />,
};
