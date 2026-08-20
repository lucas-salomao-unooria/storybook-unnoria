import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from '../../../src/chatgpt/components/ChatInput';
import { ChatBubble, Tag } from '../../../src/chatgpt/components';
import { gptGlyphs } from '../../../src/chatgpt/tokens';
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
import { gptFigmaNodes, gptPromptSuggestions } from '../fixtures';

/**
 * Página de documentação rica do componente ChatInput.
 */
const ChatInputDocumentationPage = () => {
  const [enviadas, setEnviadas] = React.useState<string[]>([]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Conversa"
        title="ChatInput"
        description="Réplica do componente ChatInput da página 🟡 Design system: cápsula de 600 × 48 com raio 24, padding 8/8/8/16, contorno translúcido de 10% e botão de envio circular de 32px em bg/inverse com o glifo ↑. É o compositor que ancora a base de todas as telas de conversa."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="O único ponto de entrada de mensagem do produto."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="💬" title="Compositor">
          Ancorado na base da área de conversa, com largura máxima igual à da coluna de mensagens.
        </GptDocCard>
        <GptDocCard icon="↩️" title="Envio por Enter">
          O componente é um <code>&lt;form&gt;</code>: <code>Enter</code> submete e o botão de envio
          é <code>type="submit"</code>. Nenhum listener de teclado artificial.
        </GptDocCard>
        <GptDocCard icon="🔗" title="Controlado ou não">
          Com <code>value</code> + <code>onValueChange</code> a aplicação controla o texto; sem
          eles, o componente mantém estado interno e limpa o campo após o envio.
        </GptDocCard>
        <GptDocCard icon="🎯" title="Foco visível">
          O contorno da cápsula passa para <code>border/brand</code> em{' '}
          <code>:focus-within</code> — extensão registrada, o arquivo não publica esse estado.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas do componente via Plugin API."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptFigmaNodes.chatInput}
        frameName="ChatInput (componente único)"
        specs={[
          { label: 'Dimensões', value: '600 × 48' },
          { label: 'Padding', value: '8/8/8/16' },
          { label: 'Gap', value: '8px · spacing/4' },
          { label: 'Raio', value: '24px · radius/3xl' },
          { label: 'Contorno', value: '1px · preto a 10%' },
          { label: 'Botão de envio', value: '32px circular · bg/inverse · glifo 16' },
        ]}
        deviations={[
          'O frame SendButton abraça a largura do glifo (16px) contra a altura fixa de 32px; o componente renderiza o círculo de 32px, dimensão confirmada pelo raio de 16 e pelo token size/icon-xl.',
          'O arquivo não publica estado de foco nem de desabilitado. O foco troca o contorno para border/brand; o desabilitado aplica 40% de opacidade ao botão de envio. Ambos anotados no CSS.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Cápsula, campo elástico e botão de envio."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="💊" title="Cápsula">
          <code>&lt;form&gt;</code> com raio 24 e contorno translúcido, mantendo os 48px de altura.
        </GptDocCard>
        <GptDocCard icon="🔤" title="Campo">
          <code>flex: 1 1 auto</code> com <code>min-width: 0</code>, para que textos longos não
          empurrem o botão fora da cápsula.
        </GptDocCard>
        <GptDocCard icon="⬆️" title="Botão de envio">
          Círculo de 32px em <code>bg/inverse</code>. O glifo vem de <code>sendGlyph</code> e o nome
          acessível de <code>sendLabel</code>.
        </GptDocCard>
        <GptDocCard icon="↔️" title="block">
          Ocupa 100% da largura em vez dos 600px do arquivo — o modo usual em layout responsivo.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Estados e Composição"
        description="Repouso, com texto, desabilitado e em largura total."
        barColor="#5856D6"
      />
      <GptDocStage label="Estados" direction="column" align="flex-start">
        <ChatInput readOnly />
        <ChatInput value="Resuma as decisões desta thread" onValueChange={() => undefined} />
        <ChatInput disabled />
        <div style={{ width: '100%' }}>
          <ChatInput block placeholder="Ocupa a largura toda" />
        </div>
      </GptDocStage>
      <GptDocStage label="Envio funcional — digite e pressione Enter" direction="column" align="flex-start">
        <ChatInput onSend={(texto) => texto && setEnviadas((atual) => [...atual, texto])} block />
        {enviadas.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            {enviadas.map((texto, index) => (
              <ChatBubble key={`${texto}-${index}`} role="user">
                {texto}
              </ChatBubble>
            ))}
          </div>
        )}
      </GptDocStage>
      <GptDocStage label="Composição da tela vazia — sugestões acima do compositor" direction="column">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {gptPromptSuggestions.slice(0, 4).map((label) => (
            <Tag key={label} glyph={gptGlyphs.sparkle}>
              {label}
            </Tag>
          ))}
        </div>
        <ChatInput block />
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras do compositor."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Manter o compositor ancorado na base da área de conversa, alinhado à coluna de mensagens.',
          'Usar onSend em vez de escutar Enter manualmente — o envio já é submissão de formulário.',
          'Passar disabled enquanto a resposta anterior está sendo gerada.',
          'Preencher sendLabel quando a interface estiver em outro idioma.',
        ]}
        donts={[
          'Colocar dois ChatInput na mesma tela.',
          'Usar o ChatInput para busca — para isso existe o SearchInput.',
          'Remover o botão de envio confiando apenas no Enter: em toque não há teclado físico.',
          'Fixar a largura em 600px em layout responsivo; use block.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="A cápsula segue bg/primary e o botão de envio inverte junto com bg/inverse."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher direction="column">
        {() => (
          <>
            <ChatInput block readOnly />
            <ChatInput block value="Mensagem em rascunho" onValueChange={() => undefined} />
          </>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente ChatInput."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="ChatInput"
        rows={[
          { name: 'value', type: 'string', description: 'Texto do campo em uso controlado.' },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Notifica cada alteração do texto.',
          },
          {
            name: 'onSend',
            type: '(value: string) => void',
            description:
              'Chamado ao acionar o botão de envio ou pressionar Enter, com o texto atual do campo.',
          },
          {
            name: 'placeholder',
            type: 'string',
            default: "'Type message'",
            description: 'Texto do placeholder.',
          },
          {
            name: 'sendGlyph',
            type: 'React.ReactNode',
            default: 'gptGlyphs.send',
            description: 'Glifo do botão de envio.',
          },
          {
            name: 'sendLabel',
            type: 'string',
            default: "'Enviar mensagem'",
            description: 'Rótulo acessível do botão de envio.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Desabilita o campo e o botão de envio.',
          },
          {
            name: 'readOnly',
            type: 'boolean',
            default: 'false',
            description: 'Torna o campo somente leitura — útil em vitrines de documentação.',
          },
          {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Ocupa toda a largura disponível em vez dos 600px do arquivo.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ChatInput> = {
  title: 'ChatGPT/Componentes/ChatInput',
  component: ChatInput,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text', description: 'Texto do placeholder.' },
    sendGlyph: { control: 'text', description: 'Glifo do botão de envio.' },
    sendLabel: { control: 'text', description: 'Rótulo acessível do botão de envio.' },
    disabled: { control: 'boolean', description: 'Desabilita campo e botão.' },
    readOnly: { control: 'boolean', description: 'Campo somente leitura.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    placeholder: 'Type message',
    sendGlyph: gptGlyphs.send,
    sendLabel: 'Enviar mensagem',
    disabled: false,
    readOnly: false,
    block: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ChatInput>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatInputDocumentationPage />,
};

/**
 * Playground com todas as propriedades do ChatInput expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatInput',
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
      <ChatInput {...args} />
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 600 × 48.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 16, border: '1px solid #E4E8E9', borderRadius: 5, width: 632 }}>
      <ChatInput readOnly />
    </div>
  ),
};

/**
 * Compositor funcional acumulando mensagens em bolhas de usuário.
 */
export const Estados: Story = {
  render: function CompositorFuncional() {
    const [mensagens, setMensagens] = React.useState<string[]>([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 620 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          {mensagens.map((texto, index) => (
            <ChatBubble key={`${texto}-${index}`} role="user">
              {texto}
            </ChatBubble>
          ))}
        </div>
        <ChatInput block onSend={(texto) => texto && setMensagens((atual) => [...atual, texto])} />
        <ChatInput block disabled placeholder="Gerando resposta…" />
      </div>
    );
  },
};
