import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ChatInput } from '../../../src/unooriaai/components/ChatInput';
import { ChatBubble, Icon, Tag } from '../../../src/unooriaai/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocGrid,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocAnatomy,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiPromptSuggestions } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente ChatInput.
 */
const ChatInputDocumentationPage = () => {
  const [enviadas, setEnviadas] = React.useState<string[]>([]);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Conversa"
        title="ChatInput"
        description="Compositor de mensagem em cápsula de 600 × 48, com raio 24, contorno de 1px e botão de envio circular de 32px na superfície invertida, com a seta para cima da biblioteca de ícones da Unooria. É o compositor que ancora a base de todas as telas de conversa."
      />

      <UnooriaDocSectionHeader
        title="1. Visão geral e casos de uso"
        description="O único ponto de entrada de mensagem do produto."
        barColor={BAR}
      />
      <UaiDocGrid>
        <UaiDocCard icon="💬" title="Compositor">
          Ancorado na base da área de conversa, com largura máxima igual à da coluna de mensagens.
        </UaiDocCard>
        <UaiDocCard icon="↩️" title="Envio por Enter">
          O componente é um <code>&lt;form&gt;</code>: <code>Enter</code> submete e o botão de envio
          é <code>type=&quot;submit&quot;</code>. Nenhum listener de teclado artificial.
        </UaiDocCard>
        <UaiDocCard icon="🔗" title="Controlado só quando pedido">
          Com <code>value</code> + <code>onValueChange</code> a aplicação controla o texto. Sem{' '}
          <code>value</code>, o texto mora no DOM (com <code>defaultValue</code> como valor inicial)
          e o campo é limpo, no próprio nó, após o envio.
        </UaiDocCard>
        <UaiDocCard icon="🎯" title="Foco visível">
          O contorno da cápsula passa para <code>--uai-border-brand</code> em{' '}
          <code>:focus-within</code>, e o botão de envio ganha anel de 2px na mesma cor.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        title="2. Especificações técnicas"
        description="Medidas e tokens do componente."
        barColor={BAR}
      />
      <UaiDocSpecs
        component="ChatInput"
        layout="Cápsula · 600 × 48"
        specs={[
          { label: 'Dimensões', value: '600 × 48' },
          { label: 'Padding', value: '8/8/8/16' },
          { label: 'Gap', value: '8px · --uai-spacing-4' },
          { label: 'Raio', value: '24px · --uai-radius-3xl' },
          { label: 'Contorno', value: '1px · --uai-border-control' },
          { label: 'Superfície', value: '--uai-bg-primary' },
          { label: 'Botão de envio', value: '32px circular · --uai-bg-inverse' },
          { label: 'Glifo de envio', value: 'arrowUpward · 20px' },
          { label: 'Texto', value: 'Open Sans 400 · 14/20px' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Glifo de envio na biblioteca de ícones',
            detail:
              'o botão renderiza o ícone arrowUpward (Material Symbols Rounded, peso 300) em 20px dentro do círculo de 32px. sendGlyph continua aceitando qualquer nó React.',
          },
          {
            subject: 'Contorno de controle',
            detail:
              'o contorno usa --uai-border-control, que passa de 3:1 sobre a superfície nos dois temas; um contorno translúcido não garantiria o limite do campo.',
          },
          {
            subject: 'Campo só controlado quando pedido',
            detail:
              'sem value, o componente não guarda o texto em estado: repassa defaultValue ao input e, ao enviar, lê e limpa o próprio nó. O preenchimento automático e os gerenciadores de senha escrevem direto no DOM, e um estado interno os apagaria na primeira re-renderização.',
          },
          {
            subject: 'Estados de interação',
            detail:
              'foco em --uai-border-brand e desabilitado a 40% de opacidade no botão de envio. O botão desabilitado é isento de contraste.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do componente"
        description="Cápsula, campo elástico e botão de envio."
        barColor={BAR}
      />
      <UaiDocAnatomy
        zones={[
          {
            name: 'Cápsula',
            role: '<form> com raio 24 e contorno de controle, mantendo os 48px de altura.',
            token: '--uai-radius-3xl · --uai-border-control',
          },
          {
            name: 'Campo',
            role: 'flex: 1 1 auto com min-width: 0, para que textos longos não empurrem o botão para fora da cápsula.',
            token: '--uai-font-body-sm-*',
          },
          {
            name: 'Botão de envio',
            role: 'Círculo de 32px na superfície invertida. O glifo vem de sendGlyph e o nome acessível de sendLabel.',
            token: '--uai-bg-inverse · --uai-text-inverse',
          },
          {
            name: 'block',
            role: 'Ocupa 100% da largura em vez dos 600px — o modo usual em layout responsivo.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="4. Matriz de estados e composição"
        description="Repouso, com texto, desabilitado e em largura total."
        barColor={BAR}
      />
      <UaiDocStage label="Estados" direction="column" align="flex-start">
        <ChatInput readOnly />
        <ChatInput value="Resuma as decisões desta conversa" onValueChange={() => undefined} />
        <ChatInput disabled />
        <div style={{ width: '100%' }}>
          <ChatInput block placeholder="Ocupa a largura toda" />
        </div>
      </UaiDocStage>
      <UaiDocStage
        label="Envio funcional: digite e pressione Enter"
        direction="column"
        align="flex-start"
      >
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
      </UaiDocStage>
      <UaiDocStage label="Composição da tela vazia: sugestões acima do compositor" direction="column">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {uaiPromptSuggestions.slice(0, 4).map((label) => (
            <Tag key={label} glyph={<Icon name="sparkle" size={16} />}>
              {label}
            </Tag>
          ))}
        </div>
        <ChatInput block />
      </UaiDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas práticas"
        description="Regras do compositor."
        barColor={BAR}
      />
      <UaiDocPractices
        dos={[
          'Manter o compositor ancorado na base da área de conversa, alinhado à coluna de mensagens.',
          'Usar onSend em vez de escutar Enter manualmente: o envio já é submissão de formulário.',
          'Passar disabled enquanto a resposta anterior está sendo gerada.',
          'Preencher sendLabel quando a interface estiver em outro idioma.',
        ]}
        donts={[
          'Colocar dois ChatInput na mesma tela.',
          'Usar o ChatInput para busca: para isso existe o SearchInput.',
          'Remover o botão de envio confiando apenas no Enter: em toque não há teclado físico.',
          'Fixar a largura em 600px em layout responsivo; use block.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a temas"
        description="A cápsula segue --uai-bg-primary e o botão de envio troca junto com --uai-bg-inverse."
        barColor={BAR}
      />
      <UaiDocThemeSwitcher direction="column">
        {() => (
          <>
            <ChatInput block readOnly />
            <ChatInput block value="Mensagem em rascunho" onValueChange={() => undefined} />
            <ChatInput block disabled />
          </>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência completa de props da API"
        description="Contrato público do componente ChatInput."
        barColor={BAR}
      />
      <UaiDocPropsTable
        title="ChatInput"
        rows={[
          {
            name: 'value',
            type: 'string',
            description: 'Texto do campo em uso controlado. O campo só é controlado quando esta prop é passada.',
          },
          {
            name: 'defaultValue',
            type: 'string',
            description: 'Texto inicial do campo em modo não controlado.',
          },
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
            default: "'Escreva uma mensagem'",
            description: 'Texto do espaço reservado.',
          },
          {
            name: 'sendGlyph',
            type: 'React.ReactNode',
            default: '<Icon name="arrowUpward" size={20} />',
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
            description: 'Torna o campo somente leitura, útil em vitrines de documentação.',
          },
          {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Ocupa toda a largura disponível em vez dos 600px.',
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
  title: 'UnooriaAI/Componentes/ChatInput',
  component: ChatInput,
  parameters: { layout: 'padded' },
  argTypes: {
    value: {
      control: 'text',
      description: 'Texto controlado. Preencher torna o campo controlado.',
    },
    defaultValue: { control: 'text', description: 'Texto inicial (modo não controlado).' },
    placeholder: { control: 'text', description: 'Texto do espaço reservado.' },
    sendGlyph: {
      control: false,
      description: 'Glifo do botão de envio (nó React). Padrão: ícone arrowUpward.',
    },
    sendLabel: { control: 'text', description: 'Rótulo acessível do botão de envio.' },
    disabled: { control: 'boolean', description: 'Desabilita campo e botão.' },
    readOnly: { control: 'boolean', description: 'Campo somente leitura.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    defaultValue: '',
    placeholder: 'Escreva uma mensagem',
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
 * Documentação rica e completa do componente.
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
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        background: 'var(--uai-bg-secondary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <ChatInput {...args} />
    </div>
  ),
};

/**
 * O compositor em sua medida canônica, 600 × 48.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div
      style={{
        padding: 16,
        border: '1px solid var(--uai-border-default)',
        borderRadius: 8,
        width: 632,
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <ChatInput readOnly />
    </div>
  ),
};

/**
 * Compositor funcional acumulando mensagens em balões de usuário, mais o
 * estado desabilitado enquanto a resposta é gerada. Guarda a regra do campo
 * não controlado: digitar, enviar e ver o campo limpo, sem estado interno.
 */
export const Estados: Story = {
  render: function CompositorFuncional() {
    const [mensagens, setMensagens] = React.useState<string[]>([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 620 }}>
        <div
          data-testid="mensagens"
          style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}
        >
          {mensagens.map((texto, index) => (
            <ChatBubble key={`${texto}-${index}`} role="user">
              {texto}
            </ChatBubble>
          ))}
        </div>
        <ChatInput
          block
          aria-label="Compositor"
          onSend={(texto) => texto && setMensagens((atual) => [...atual, texto])}
        />
        <ChatInput block disabled placeholder="Gerando resposta…" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getAllByPlaceholderText('Escreva uma mensagem')[0] as HTMLInputElement;

    await userEvent.type(campo, 'Olá, Unooria');
    await expect(campo.value).toBe('Olá, Unooria');

    await userEvent.click(canvas.getAllByRole('button', { name: 'Enviar mensagem' })[0]);
    await expect(canvas.getByText('Olá, Unooria')).toBeInTheDocument();
    await expect(campo.value).toBe('');
  },
};
