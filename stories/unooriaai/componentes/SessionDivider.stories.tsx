import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { SessionDivider } from '../../../src/unooriaai/components/SessionDivider';
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
import { uaiSessionLabelLong, uaiSessionLabels, uaiTranscript } from '../fixtures';

const BAR = '#716C98';

const [SESSAO_1, SESSAO_2, SESSAO_3] = uaiSessionLabels;

/**
 * Uma conversa atravessada por três sessões: o separador entre as falas.
 */
const ConversaComSessoes: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 520 }}>
    <SessionDivider label={SESSAO_1} theme={theme} />
    <ChatBubble role="user" theme={theme}>
      {uaiTranscript[0].message}
    </ChatBubble>
    <ChatBubble role="assistant" theme={theme}>
      {uaiTranscript[1].message}
    </ChatBubble>
    <SessionDivider label={SESSAO_2} theme={theme} />
    <ChatBubble role="user" theme={theme}>
      {uaiTranscript[2].message}
    </ChatBubble>
    <ChatBubble role="assistant" theme={theme}>
      {uaiTranscript[3].message}
    </ChatBubble>
    <SessionDivider label={SESSAO_3} theme={theme} />
  </div>
);

/**
 * Página de documentação rica do componente SessionDivider.
 */
const SessionDividerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Extensões"
      title="SessionDivider"
      description="Separador de sessão no fluxo da conversa: dois fios finos com o texto no meio — qual sessão, de quem e quando. Não é fala de ninguém: é a plataforma marcando onde uma sessão termina e a outra começa. O texto quebra linha e continua centrado; os fios encolhem, mas não somem."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Uma conversa contínua, atravessada por sessões."
    />
    <UaiDocGrid>
      <UaiDocCard icon="🧵" title="Várias sessões, uma conversa">
        Quando a mesma conversa é retomada por outra pessoa ou noutro horário, o separador diz de
        onde em diante a fala é da nova sessão.
      </UaiDocCard>
      <UaiDocCard icon="🔊" title="Texto, não decoração">
        O texto fica no fluxo de leitura: o leitor de tela o lê entre as falas. Os fios são
        decorativos.
      </UaiDocCard>
      <UaiDocCard icon="📱" title="Cabe no aparelho">
        Em 375px um texto longo quebra em duas linhas, centrado, e os fios ficam com 16px no mínimo.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações Técnicas"
      description="Fio, texto, fio."
    />
    <UaiDocSpecs
      component="SessionDivider"
      layout="Grade de 3 colunas · largura do contêiner"
      specs={[
        { label: 'Fios', value: '1px · --uai-fill-10 (o traço do Divider) · mín. 16px cada' },
        { label: 'Texto', value: 'caption 12/18px · peso 500 · --uai-text-secondary · centrado' },
        { label: 'Vão', value: '--uai-spacing-4 (8px) entre fio e texto' },
        { label: 'Respiro', value: '--uai-spacing-2 (4px) acima e abaixo' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Extensão do módulo, sem par na estrutura de origem',
          detail:
            'entrou para uma missão do produto em que a mesma conversa é retomada em três sessões, por pessoas diferentes. Antes, o produto compunha Divider + texto à mão.',
        },
        {
          subject: 'Texto no fluxo, e não role="separator"',
          detail:
            'os filhos de um separador são apresentacionais, e há leitores de tela que pulam separadores no modo de leitura. Aqui o texto é conteúdo (quem, qual sessão, quando), então fica como parágrafo; os fios levam aria-hidden.',
        },
        {
          subject: 'Fio do Divider, texto de apoio',
          detail:
            'o fio é o mesmo --uai-fill-10 do Divider; o texto é --uai-text-secondary, que mede 8,13:1 sobre --uai-bg-primary no claro e 12,09:1 no escuro (tabela uaiContrastPairs). Nenhum token novo, nenhum literal novo — a paridade do módulo não muda.',
        },
        {
          subject: 'Server Component',
          detail: 'só recebe props e desenha: sem hook, sem "use client".',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Dois fios decorativos e o texto."
    />
    <UaiDocAnatomy
      zones={[
        { name: 'Fio', role: 'Traço de 1px, decorativo (aria-hidden).', token: '--uai-fill-10' },
        { name: 'Texto', role: 'Qual sessão, de quem, quando; lido no fluxo.', token: '--uai-text-secondary' },
      ]}
    />
    <UaiDocStage label="Separador" surface="primary">
      <div style={{ width: 420 }}>
        <SessionDivider label={SESSAO_2} />
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Estados"
      description="Curto, longo em tela estreita e entre falas."
    />
    <UaiDocStage label="Texto curto e texto longo em 320px" align="flex-start" surface="primary">
      <div style={{ width: 320 }}>
        <SessionDivider label={SESSAO_1} />
      </div>
      <div style={{ width: 320 }}>
        <SessionDivider label={uaiSessionLabelLong} />
      </div>
    </UaiDocStage>
    <UaiDocStage label="Entre falas" surface="primary">
      <ConversaComSessoes />
    </UaiDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas Práticas" description="Regras de uso do separador." />
    <UaiDocPractices
      dos={[
        'Dizer qual sessão, de quem e quando: o separador é a única pista da troca.',
        'Usar o mesmo formato em todos os separadores da conversa.',
        'Pôr o separador no fluxo das falas, na ordem em que aconteceram.',
      ]}
      donts={[
        'Usar o separador como fala do assistente ou como título de seção da página.',
        'Pôr ações (botões, links) dentro do separador.',
        'Esconder o texto do leitor de tela com aria-hidden.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="Fio e texto acompanham o tema."
    />
    <UaiDocThemeSwitcher>{(activeTheme) => <ConversaComSessoes theme={activeTheme} />}</UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente SessionDivider. Estende os atributos de <div>, menos children."
    />
    <UaiDocPropsTable
      title="SessionDivider"
      rows={[
        { name: 'label', type: 'React.ReactNode', description: 'O texto: qual sessão, de quem, quando. Obrigatório.' },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Tema visual; sem valor, herda data-uai-theme do contêiner.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SessionDivider> = {
  title: 'UnooriaAI/Componentes/SessionDivider',
  component: SessionDivider,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'O texto do separador.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    label: SESSAO_2,
    theme: 'light',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof SessionDivider>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SessionDividerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do SessionDivider expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SessionDivider',
  render: (args) => (
    <div data-uai-theme={args.theme} style={{ width: 420, padding: 24, backgroundColor: 'var(--uai-bg-primary)' }}>
      <SessionDivider {...args} />
    </div>
  ),
};

/**
 * A conversa com três sessões, sobre a superfície da conversa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage surface="primary">
      <ConversaComSessoes />
    </UaiDocStage>
  ),
};

/**
 * O texto é lido no fluxo (não é o nome de um separador) e os fios são
 * decorativos; o texto longo quebra linha sem estourar a largura.
 */
export const Estados: Story = {
  render: () => (
    <div data-uai-theme="light" style={{ display: 'grid', gap: 16, width: 320 }}>
      <SessionDivider label={SESSAO_2} />
      <SessionDivider label={uaiSessionLabelLong} data-testid="longo" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // O texto é conteúdo visível e legível, num parágrafo — não um separador mudo.
    const texto = tela.getByText(SESSAO_2);
    await expect(texto).toBeVisible();
    await expect(texto.tagName).toBe('P');
    await expect(tela.queryByRole('separator')).not.toBeInTheDocument();

    // Os dois fios são decorativos.
    const raiz = texto.parentElement as HTMLElement;
    const fios = raiz.querySelectorAll('.uai-session-divider__line');
    await expect(fios).toHaveLength(2);
    for (const fio of Array.from(fios)) {
      await expect(fio).toHaveAttribute('aria-hidden', 'true');
    }

    // Longo: quebra linha dentro dos 320px, e os fios continuam com largura.
    const longo = tela.getByTestId('longo');
    await expect(longo.scrollWidth).toBeLessThanOrEqual(longo.clientWidth);
    for (const fio of Array.from(longo.querySelectorAll('.uai-session-divider__line'))) {
      await expect((fio as HTMLElement).getBoundingClientRect().width).toBeGreaterThanOrEqual(16);
    }
  },
};

/**
 * Modo escuro, herdando o tema do contêiner.
 */
export const ModoEscuro: Story = {
  render: () => (
    <UaiDocStage theme="dark" surface="primary">
      <ConversaComSessoes />
    </UaiDocStage>
  ),
};
