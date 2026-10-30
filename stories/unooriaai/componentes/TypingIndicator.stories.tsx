import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { TypingIndicator } from '../../../src/unooriaai/components/TypingIndicator';
import { ChatBubble } from '../../../src/unooriaai/components/ChatBubble';
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
import { uaiTranscript } from '../fixtures';

const BAR = '#716C98';

/**
 * A pergunta do usuário e a resposta do assistente ainda a caminho.
 */
const ConversaDigitando: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 520 }}>
    <ChatBubble role="user" theme={theme}>
      {uaiTranscript[0].message}
    </ChatBubble>
    <ChatBubble role="assistant" theme={theme}>
      {uaiTranscript[1].message}
    </ChatBubble>
    <ChatBubble role="user" theme={theme}>
      {uaiTranscript[2].message}
    </ChatBubble>
    <TypingIndicator theme={theme} />
  </div>
);

/**
 * Página de documentação rica do componente TypingIndicator.
 */
const TypingIndicatorDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Extensões"
      title="TypingIndicator"
      description="A resposta do assistente que ainda não chegou: o avatar IA e três pontos que pulsam no lugar do texto. Ocupa a linha da fala que vai substituir, então a conversa não pula quando a resposta aparece."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Entre a pergunta e a resposta."
    />
    <UaiDocGrid>
      <UaiDocCard icon="💬" title="A resposta a caminho">
        Enquanto o assistente prepara a fala, o indicador ocupa o lugar dela. Quando a fala chega, o
        produto troca o indicador pelo ChatBubble.
      </UaiDocCard>
      <UaiDocCard icon="🧵" title="Uma fala de cada vez">
        Quando várias falas chegam juntas, o produto pode mostrar o indicador antes de cada uma, para
        a conversa ser lida no ritmo em que é falada.
      </UaiDocCard>
      <UaiDocCard icon="🔊" title="Região viva educada">
        role=&quot;status&quot; com o nome &quot;digitando&quot;: o leitor de tela avisa sem
        interromper. Os pontos são decorativos.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações Técnicas" description="Avatar e três pontos." />
    <UaiDocSpecs
      component="TypingIndicator"
      layout="A linha do ChatBubble do assistente · avatar de 24px + pontos"
      specs={[
        { label: 'Pontos', value: '3 × 6px · --uai-radius-full · --uai-text-secondary' },
        { label: 'Vão entre pontos', value: '--uai-spacing-2 (4px)' },
        { label: 'Pulsação', value: '1,2s · 150ms entre os pontos · sobe 2px' },
        { label: 'Altura', value: '24px — a do avatar, a de uma linha de Body/SM' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Extensão do módulo, sem par na estrutura de origem',
          detail:
            'entrou para uma missão do produto em que o assistente fala em sequência (a leitura dos cadernos e o parecer que se inverte). Sem ele, as falas chegavam todas de uma vez. O Unoochat já tinha o seu TypingIndicator; este é o do UnooriaAI, com a linha do assistente e os tokens --uai-*.',
        },
        {
          subject: 'A linha do assistente, não uma cápsula',
          detail:
            'a fala do assistente no UnooriaAI não tem cápsula: o indicador reusa as classes do ChatBubble role="assistant" (avatar, gap, padding) para ocupar exatamente o lugar da fala.',
        },
        {
          subject: 'Cor do texto de apoio',
          detail:
            'os pontos são --uai-text-secondary, que mede 8,13:1 sobre --uai-bg-primary no claro e 12,09:1 no escuro (tabela uaiContrastPairs), acima dos 3:1 de elemento gráfico. Nenhum token novo.',
        },
        {
          subject: 'Movimento reduzido',
          detail:
            'com prefers-reduced-motion: reduce, os pontos param e a frase do aria-label aparece ao lado deles — pontos parados sozinhos não dizem nada.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e desenha: sem hook, sem "use client". Quanto tempo ele fica na tela é do produto.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do Componente" description="Avatar, pontos e a frase escondida." />
    <UaiDocAnatomy
      zones={[
        { name: 'Avatar', role: 'O do ChatBubble do assistente (IA em --uai-bg-inverse).', token: '--uai-bg-inverse' },
        { name: 'Pontos', role: 'Três pontos que pulsam em sequência (aria-hidden).', token: '--uai-text-secondary' },
        { name: 'Frase', role: 'O aria-label; visível só com movimento reduzido.', token: '--uai-text-secondary' },
      ]}
    />
    <UaiDocStage label="Indicador" surface="primary">
      <TypingIndicator />
    </UaiDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de Variantes e Estados" description="Sozinho, na conversa e com outro nome." />
    <UaiDocStage label="Na conversa" surface="primary">
      <ConversaDigitando />
    </UaiDocStage>
    <UaiDocStage label="Com outro nome acessível" surface="primary">
      <TypingIndicator aria-label="Assistente consultando a base de dados" />
    </UaiDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas Práticas" description="Regras de uso do indicador." />
    <UaiDocPractices
      dos={[
        'Pôr o indicador exatamente onde a próxima fala do assistente vai aparecer.',
        'Trocá-lo pela fala assim que ela chegar.',
        'Dar um nome acessível que diga quem está escrevendo, quando houver mais de um assistente.',
      ]}
      donts={[
        'Deixar o indicador na tela depois que a fala chegou.',
        'Usá-lo como carregamento de página ou de botão.',
        'Mostrar mais de um indicador ao mesmo tempo na mesma conversa.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a Temas" description="Avatar e pontos acompanham o tema." />
    <UaiDocThemeSwitcher>{(activeTheme) => <ConversaDigitando theme={activeTheme} />}</UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente TypingIndicator. Estende os atributos de <div>, menos children."
    />
    <UaiDocPropsTable
      title="TypingIndicator"
      rows={[
        { name: 'avatarInitials', type: 'string', default: "'IA'", description: 'Iniciais do avatar, como no ChatBubble.' },
        { name: 'avatar', type: 'React.ReactNode', description: 'Avatar customizado (substitui as iniciais).' },
        {
          name: 'aria-label',
          type: 'string',
          default: "'digitando'",
          description: 'Nome da região viva; aparece ao lado dos pontos com movimento reduzido.',
        },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema visual; sem valor, herda data-uai-theme do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TypingIndicator> = {
  title: 'UnooriaAI/Componentes/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'padded' },
  argTypes: {
    avatarInitials: { control: 'text', description: 'Iniciais do avatar.' },
    'aria-label': { control: 'text', description: 'Nome acessível da região viva.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    avatarInitials: 'IA',
    'aria-label': 'digitando',
    theme: 'light',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof TypingIndicator>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TypingIndicatorDocumentationPage />,
};

/**
 * Playground com todas as propriedades do TypingIndicator expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TypingIndicator',
  render: (args) => (
    <div data-uai-theme={args.theme} style={{ width: 420, padding: 24, backgroundColor: 'var(--uai-bg-primary)' }}>
      <TypingIndicator {...args} />
    </div>
  ),
};

/**
 * A conversa com a resposta a caminho, sobre a superfície da conversa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage surface="primary">
      <ConversaDigitando />
    </UaiDocStage>
  ),
};

/**
 * É uma região viva com nome, os pontos são decorativos, e a linha tem a
 * altura do avatar — a mesma da fala que vai substituir.
 */
export const Estados: Story = {
  render: () => (
    <div data-uai-theme="light" style={{ display: 'grid', gap: 16, width: 420 }}>
      <TypingIndicator data-testid="padrao" />
      <TypingIndicator aria-label="Assistente consultando a base de dados" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // Região viva educada, com o nome padrão e com o nome dado.
    await expect(tela.getByRole('status', { name: 'digitando' })).toBeInTheDocument();
    await expect(tela.getByRole('status', { name: 'Assistente consultando a base de dados' })).toBeInTheDocument();

    // Três pontos, decorativos.
    const raiz = tela.getByTestId('padrao');
    const pontos = raiz.querySelectorAll('.uai-typing-indicator__dot');
    await expect(pontos).toHaveLength(3);
    await expect(raiz.querySelector('.uai-typing-indicator__dots')).toHaveAttribute('aria-hidden', 'true');

    // A linha do assistente: o avatar com IA, e a altura dele.
    await expect(within(raiz).getByText('IA')).toBeVisible();
    await expect(raiz.querySelector('.uai-typing-indicator__body')!.getBoundingClientRect().height).toBeGreaterThanOrEqual(24);
  },
};

/**
 * Modo escuro, herdando o tema do contêiner.
 */
export const ModoEscuro: Story = {
  render: () => (
    <UaiDocStage theme="dark" surface="primary">
      <ConversaDigitando />
    </UaiDocStage>
  ),
};
