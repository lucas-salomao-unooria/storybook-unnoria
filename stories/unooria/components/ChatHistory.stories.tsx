import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ChatHistory, type ChatHistoryItem } from '../../../src/unooria/components/ChatHistory';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Palco, Praticas, TabelaDeProps } from './agente/docKit';
import { HISTORICO } from './agente/fixtures';

/** O histórico com estado: abrir marca a ativa; excluir tira a linha. */
const HistoricoVivo: React.FC<{
  tema?: UnooriaTheme;
  inicial?: ChatHistoryItem[];
  aoExcluir?: (id: string) => void;
  aoAbrir?: (id: string) => void;
}> = ({ tema = 'light', inicial = HISTORICO, aoExcluir, aoAbrir }) => {
  const [itens, setItens] = useState(inicial);
  const [ativa, setAtiva] = useState(inicial[0]?.id);
  return (
    <ChatHistory
      theme={tema}
      items={itens}
      activeId={ativa}
      onSelect={(id) => {
        setAtiva(id);
        aoAbrir?.(id);
      }}
      onDelete={(id) => {
        setItens((atual) => atual.filter((item) => item.id !== id));
        aoExcluir?.(id);
      }}
    />
  );
};

const Matriz: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, width: '100%' }}>
    <div>
      <HistoricoVivo tema={tema} />
    </div>
    <div>
      <ChatHistory theme={tema} items={[]} />
    </div>
    <div>
      <ChatHistory theme={tema} items={[]} loading />
    </div>
  </div>
);

const ChatHistoryDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="ChatHistory"
        description="As conversas com o agente de IA do professor: o título que o agente gerou, quando a conversa mudou (já formatado pelo produto), a conversa aberta em destaque e o excluir em dois passos, na própria linha, sem diálogo."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="Voltar a uma conversa, ou apagá-la." />
      <Grade>
        <Cartao icone="🗂️" titulo="Abrir">
          A linha inteira é o botão (<code>onSelect</code>); a aberta tem <code>aria-current</code>, fundo lavanda e a
          barra à esquerda.
        </Cartao>
        <Cartao icone="🗑️" titulo="Excluir em dois passos">
          O botão troca a linha por “Excluir esta conversa?” com Cancelar (foco) e Excluir. Esc cancela.{' '}
          <code>onDelete</code> só depois do segundo passo.
        </Cartao>
        <Cartao icone="📅" titulo="Data pronta">
          <code>atualizadaEm</code> é texto: o DS não formata data — o produto formata, no fuso da rede.
        </Cartao>
        <Cartao icone="⏳" titulo="Vazio e carregando">
          O <code>EmptyState</code> do pacote, e três linhas-esqueleto com “Carregando conversas…” para o leitor de tela.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio, na régua do ListSectionItem." />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Linha de 56px, recuo 8px 12px, raio 8px; título 14/20 semibold numa linha com reticências; data 12/18{' '}
          <code>neutral-700</code>. Excluir: o <code>Button</code> <code>ghost</code> <code>sm</code> quadrado de 36px,
          glifo <code>delete</code>, sempre visível (no toque não há hover).
        </Cartao>
        <Cartao icone="🧭" titulo="Foco">
          Cancelar devolve o foco ao botão de excluir da linha. Excluir leva o foco à conversa que ocupou o lugar (ou à
          anterior, ou à lista) quando o produto tirar a linha de <code>items</code>.
        </Cartao>
        <Cartao icone="🚫" titulo="Por que sem Modal">
          Um diálogo modal tiraria o professor do painel para uma pergunta de uma linha; a confirmação na própria
          linha mantém o contexto e é o pedido do produto.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="nav, lista e linha." />
      <Grade>
        <Cartao icone="1" titulo="nav">“Histórico de conversas” (<code>label</code>).</Cartao>
        <Cartao icone="2" titulo="Linha">Botão de abrir (título + data) e botão de excluir.</Cartao>
        <Cartao icone="3" titulo="Confirmação">Grupo com a pergunta, o título e os dois botões.</Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="Lista, vazio e carregando." />
      <Palco rotulo="Experimente excluir uma conversa">
        <Matriz />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso." />
      <Praticas
        fazer={[
          'Tirar a conversa de items no onDelete (o foco segue para a vizinha).',
          'Ordenar da mais recente para a mais antiga.',
          'Formatar atualizadaEm no produto, com o fuso da rede.',
        ]}
        evitar={[
          'Abrir um Modal para confirmar: a confirmação é na linha.',
          'Esconder o botão de excluir até o hover.',
          'Formatar a data no DS ou mandar ISO cru.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema}>
        <Matriz tema={tema} />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público do ChatHistory." />
      <TabelaDeProps
        linhas={[
          { nome: 'items', tipo: 'Array<{ id: string; titulo: string; atualizadaEm: string }>', descricao: 'As conversas. Obrigatório.' },
          { nome: 'activeId', tipo: 'string', descricao: 'A conversa aberta (aria-current).' },
          { nome: 'onSelect', tipo: '(id: string) => void', descricao: 'Abrir uma conversa.' },
          { nome: 'onDelete', tipo: '(id: string) => void', descricao: 'Excluir, depois da confirmação. Sem ele, sem botão.' },
          { nome: 'loading', tipo: 'boolean', padrao: 'false', descricao: 'Esqueletos e aviso de carregamento.' },
          { nome: 'label', tipo: 'string', padrao: "'Histórico de conversas'", descricao: 'Nome da nav.' },
          { nome: 'emptyTitle / emptyDescription', tipo: 'ReactNode', descricao: 'Textos do vazio.' },
          { nome: 'loadingLabel', tipo: 'string', padrao: "'Carregando conversas…'", descricao: 'Aviso para o leitor de tela.' },
          { nome: 'confirmQuestion', tipo: 'string', padrao: "'Excluir esta conversa?'", descricao: 'A pergunta.' },
          { nome: 'confirmLabel / cancelLabel', tipo: 'string', padrao: "'Excluir' / 'Cancelar'", descricao: 'Os dois botões.' },
          { nome: 'deleteLabel', tipo: '(titulo: string) => string', padrao: '“Excluir a conversa …”', descricao: 'Nome do botão de excluir.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ChatHistory> = {
  title: 'Plataforma Unooria/Componentes/ChatHistory',
  component: ChatHistory,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'As conversas.' },
    activeId: { control: 'text', description: 'A conversa aberta.' },
    onSelect: { action: 'onSelect', description: 'Abrir.' },
    onDelete: { action: 'onDelete', description: 'Excluir (depois da confirmação).' },
    loading: { control: 'boolean', description: 'Carregando.' },
    label: { control: 'text', description: 'Nome da nav.' },
    emptyTitle: { control: 'text', description: 'Título do vazio.' },
    emptyDescription: { control: 'text', description: 'Descrição do vazio.' },
    loadingLabel: { control: 'text', description: 'Aviso de carregamento.' },
    confirmQuestion: { control: 'text', description: 'A pergunta da confirmação.' },
    confirmLabel: { control: 'text', description: 'Botão Excluir.' },
    cancelLabel: { control: 'text', description: 'Botão Cancelar.' },
    deleteLabel: { control: false, description: 'Nome do botão de excluir, a partir do título.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    items: HISTORICO,
    activeId: 'c1',
    loading: false,
    label: 'Histórico de conversas',
    emptyTitle: 'Nenhuma conversa ainda',
    emptyDescription: 'As conversas com o agente de IA do professor aparecem aqui.',
    loadingLabel: 'Carregando conversas…',
    confirmQuestion: 'Excluir esta conversa?',
    confirmLabel: 'Excluir',
    cancelLabel: 'Cancelar',
    theme: 'light',
    onSelect: fn(),
    onDelete: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ChatHistory>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatHistoryDocumentationPage />,
};

/** Playground com todas as propriedades. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatHistory',
  render: (args) => (
    <Palco rotulo="ChatHistory" tema={args.theme} largura={320}>
      <ChatHistory {...args} />
    </Palco>
  ),
};

/** Lista, vazio e carregando, nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <>
      <Palco rotulo="Claro">
        <Matriz />
      </Palco>
      <Palco rotulo="Escuro" tema="dark">
        <Matriz tema="dark" />
      </Palco>
    </>
  ),
};

const aoExcluir = fn();
const aoAbrir = fn();

/**
 * As garantias: abrir marca a conversa; excluir exige confirmação; Esc e
 * Cancelar não excluem e devolvem o foco; confirmar exclui e leva o foco à
 * vizinha.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <HistoricoVivo aoExcluir={aoExcluir} aoAbrir={aoAbrir} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoExcluir.mockClear();
    aoAbrir.mockClear();
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Histórico de conversas' });

    // Abrir.
    const segunda = within(nav).getByRole('button', { name: /^Atividade de leitura/ });
    await userEvent.click(segunda);
    await expect(aoAbrir).toHaveBeenCalledWith('c2');
    await expect(segunda).toHaveAttribute('aria-current', 'true');

    // Excluir pede confirmação — e o foco vai para Cancelar.
    const excluirTerceira = within(nav).getByRole('button', {
      name: 'Excluir a conversa “Como avaliar produção de texto no 6º ano”',
    });
    await userEvent.click(excluirTerceira);
    await expect(aoExcluir).not.toHaveBeenCalled();
    const pergunta = within(nav).getByRole('group', { name: /Excluir esta conversa\?/ });
    await expect(within(pergunta).getByRole('button', { name: 'Cancelar' })).toHaveFocus();

    // Esc cancela e devolve o foco ao botão de excluir.
    await userEvent.keyboard('{Escape}');
    await expect(within(nav).queryByRole('group')).not.toBeInTheDocument();
    await expect(aoExcluir).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(
        within(nav).getByRole('button', { name: 'Excluir a conversa “Como avaliar produção de texto no 6º ano”' })
      ).toHaveFocus()
    );

    // Segundo passo: exclui, a linha some e o foco vai para a conversa que ocupou o lugar.
    await userEvent.click(
      within(nav).getByRole('button', { name: 'Excluir a conversa “Como avaliar produção de texto no 6º ano”' })
    );
    await userEvent.click(within(nav).getByRole('button', { name: 'Excluir' }));
    await expect(aoExcluir).toHaveBeenCalledWith('c3');
    await expect(within(nav).queryByText('Como avaliar produção de texto no 6º ano')).not.toBeInTheDocument();
    await waitFor(() =>
      expect(within(nav).getByRole('button', { name: /^Sequência didática sobre o ciclo da água/ })).toHaveFocus()
    );
  },
};
