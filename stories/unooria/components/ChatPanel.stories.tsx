import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ChatPanel, ChatPanelAction } from '../../../src/unooria/components/ChatPanel';
import { ChatMessage } from '../../../src/unooria/components/ChatMessage';
import { ChatComposer } from '../../../src/unooria/components/ChatComposer';
import { ChatHistory } from '../../../src/unooria/components/ChatHistory';
import { RichContent } from '../../../src/unooria/components/RichContent';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Palco, Praticas, TabelaDeProps } from './agente/docKit';
import { AVISO, FONTES, HISTORICO, PERGUNTA_DO_PROFESSOR, RespostaEmMarkdown } from './agente/fixtures';

const nada = () => {};

const Mensagens: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <>
    <ChatMessage autor="professor" theme={tema}>
      {PERGUNTA_DO_PROFESSOR}
    </ChatMessage>
    <ChatMessage autor="agente" theme={tema} fontes={FONTES} aviso={AVISO}>
      <RichContent theme={tema}>
        <RespostaEmMarkdown />
      </RichContent>
    </ChatMessage>
  </>
);

const Acoes: React.FC<{
  tema?: UnooriaTheme;
  expandido?: boolean;
  historico?: boolean;
  aoExpandir?: () => void;
  aoHistorico?: () => void;
  aoFechar?: () => void;
}> = ({ tema = 'light', expandido = false, historico = false, aoExpandir = nada, aoHistorico = nada, aoFechar = nada }) => (
  <>
    <ChatPanelAction icon="add_comment" label="Nova conversa" theme={tema} onClick={nada} />
    <ChatPanelAction icon="history" label="Histórico de conversas" pressed={historico} theme={tema} onClick={aoHistorico} />
    <ChatPanelAction
      icon={expandido ? 'close_fullscreen' : 'open_in_full'}
      label={expandido ? 'Recolher' : 'Expandir'}
      theme={tema}
      onClick={aoExpandir}
    />
    <ChatPanelAction icon="close" label="Fechar" theme={tema} onClick={aoFechar} />
  </>
);

const PainelDeExemplo: React.FC<{
  tema?: UnooriaTheme;
  size?: 'compacto' | 'expandido';
  comHistorico?: boolean;
}> = ({ tema = 'light', size = 'compacto', comHistorico = false }) => (
  <ChatPanel
    placement="inline"
    size={size}
    theme={tema}
    subtitle="Tire dúvidas sobre o material da rede"
    actions={<Acoes tema={tema} expandido={size === 'expandido'} historico={comHistorico} />}
    sidebar={comHistorico ? <ChatHistory items={HISTORICO} activeId="c1" theme={tema} onSelect={nada} onDelete={nada} /> : undefined}
    footer={<ChatComposer theme={tema} onSend={nada} maxLength={4000} />}
  >
    <Mensagens tema={tema} />
  </ChatPanel>
);

const ChatPanelDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="ChatPanel"
        description="O painel do agente de IA do professor: não modal, ancorado no canto inferior direito, compacto ou expandido, com cabeçalho (mascote, título, ações), corpo rolável pelo ScrollBar que acompanha a resposta chegando, rodapé para o compositor e uma coluna lateral opcional para o histórico."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="Uma conversa ao lado do trabalho." />
      <Grade>
        <Cartao icone="🪟" titulo="Não modal">
          Sem véu, sem prisão de foco, sem travar a rolagem: o professor continua usando a tela. É um{' '}
          <code>role=&quot;complementary&quot;</code> nomeado pelo título, e o Esc fecha quando o foco está dentro.
        </Cartao>
        <Cartao icone="↕️" titulo="Compacto e expandido">
          <code>compacto</code>: até 400 x 640px, acima do botão. <code>expandido</code>: até min(960px, 90vw) x 85vh,
          descendo até a borda. Em tela estreita (&lt; 600px), os dois viram quase tela cheia.
        </Cartao>
        <Cartao icone="📜" titulo="Acompanha o fim">
          Enquanto a resposta chega, o corpo rola junto — se a pessoa está no fim. Se ela subiu para reler, nada rola, e
          aparece “Ir para a mensagem mais recente”. <code>scrollToEndKey</code> força (ao enviar).
        </Cartao>
        <Cartao icone="🗂️" titulo="Histórico ao lado">
          <code>sidebar</code> (o <code>ChatHistory</code>): coluna de 280px no expandido; no compacto, toma o lugar da
          conversa enquanto <code>sidebarOpen</code>.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio: a seção não tem quadro de painel de conversa." />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Superfície <code>neutral-50</code>, fio <code>neutral-150</code>, raio 16px e a sombra{' '}
          <code>elevation-brand-secondary</code> (as do <code>BottomSheet</code>, sem o véu). Cabeçalho com{' '}
          <code>AgentAvatar</code> <code>sm</code>, título 16/24 bold, subtítulo 12/18 e ações de 36px. Corpo com 16px
          de recuo e 16px entre mensagens; no expandido, a coluna de leitura não passa de 760px.
        </Cartao>
        <Cartao icone="🧭" titulo="Posição por variável">
          <code>--unooria-chat-offset</code> (24px), <code>--unooria-chat-launcher-size</code> (64px) e{' '}
          <code>--unooria-chat-z-index</code> (1000) — as mesmas do <code>ChatLauncher</code>. O compacto fica a
          offset + botão + 16px da base; a área segura do aparelho soma.
        </Cartao>
        <Cartao icone="🎞️" titulo="Movimento">
          Entrada de 160ms (sobe 8px) e troca de tamanho de 200ms; com <code>prefers-reduced-motion</code>, nada anima.
        </Cartao>
        <Cartao icone="🙈" titulo="Fechado continua montado">
          <code>open=&#123;false&#125;</code> põe <code>hidden</code>: o rascunho não controlado do compositor e a
          rolagem sobrevivem, e o <code>aria-controls</code> do botão aponta para algo que existe.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Cabeçalho, corpo, rodapé e coluna." />
      <Grade>
        <Cartao icone="1" titulo="Cabeçalho">
          <code>avatar</code> · <code>title</code> (h2, nomeia o painel) · <code>subtitle</code> · <code>actions</code>{' '}
          (<code>ChatPanelAction</code>: <code>add_comment</code>, <code>history</code>, <code>open_in_full</code> /{' '}
          <code>close_fullscreen</code>, <code>close</code>).
        </Cartao>
        <Cartao icone="2" titulo="Corpo">
          <code>ScrollBar</code> vertical, região “Mensagens da conversa”, focável para rolar pelo teclado.
        </Cartao>
        <Cartao icone="3" titulo="Rodapé">O <code>footer</code>: o <code>ChatComposer</code>.</Cartao>
        <Cartao icone="4" titulo="Coluna">O <code>sidebar</code>, num <code>ScrollBar</code> próprio.</Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="Compacto, compacto com histórico e expandido com histórico." />
      <Palco rotulo='placement="inline" para a documentação' direcao="row">
        <PainelDeExemplo />
        <PainelDeExemplo comHistorico />
      </Palco>
      <Palco rotulo="Expandido, com o histórico ao lado">
        <PainelDeExemplo size="expandido" comHistorico />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do painel." />
      <Praticas
        fazer={[
          'Dar ao painel o id que o ChatLauncher põe em aria-controls.',
          'Focar o compositor ao abrir e devolver o foco ao botão ao fechar.',
          'Passar a última mensagem do professor em scrollToEndKey.',
          'Chamar o produto de “agente de IA do professor” no título.',
        ]}
        evitar={[
          'Pôr véu ou prender o foco: o painel é complementar à tela.',
          'Usar overflow próprio no corpo — ele já é o ScrollBar.',
          'Rolar para o fim a cada trecho à força: o stickToBottom respeita quem subiu.',
          'Chamá-lo de “assistente”, “guia” ou “chatbot”.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} direcao="row">
        <PainelDeExemplo tema={tema} />
        <PainelDeExemplo tema={tema} comHistorico />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público do ChatPanel e do ChatPanelAction." />
      <TabelaDeProps
        linhas={[
          { nome: 'open', tipo: 'boolean', padrao: 'true', descricao: 'Aberto. Fechado, fica montado com hidden.' },
          { nome: 'size', tipo: "'compacto' | 'expandido'", padrao: "'compacto'", descricao: 'Tamanho.' },
          { nome: 'placement', tipo: "'bottom-right' | 'bottom-left' | 'inline'", padrao: "'bottom-right'", descricao: 'Onde fica.' },
          { nome: 'onClose', tipo: '() => void', descricao: 'Esc (foco dentro). Ligue também ao botão de fechar.' },
          { nome: 'closeOnEsc', tipo: 'boolean', padrao: 'true', descricao: 'Esc fecha (respeita preventDefault de filho).' },
          { nome: 'title', tipo: 'ReactNode', padrao: "'Agente de IA do professor'", descricao: 'Título (h2), nomeia o painel.' },
          { nome: 'subtitle', tipo: 'ReactNode', descricao: 'Linha sob o título.' },
          { nome: 'avatar', tipo: 'ReactNode', padrao: '<AgentAvatar size="sm" decorative />', descricao: 'Avatar do cabeçalho; null tira.' },
          { nome: 'actions', tipo: 'ReactNode', descricao: 'Ações do cabeçalho (ChatPanelAction).' },
          { nome: 'children', tipo: 'ReactNode', descricao: 'As mensagens.' },
          { nome: 'footer', tipo: 'ReactNode', descricao: 'O compositor.' },
          { nome: 'sidebar', tipo: 'ReactNode', descricao: 'Coluna lateral (ChatHistory).' },
          { nome: 'sidebarOpen', tipo: 'boolean', padrao: 'true (com sidebar)', descricao: 'A coluna à vista.' },
          { nome: 'role', tipo: "'complementary' | 'region'", padrao: "'complementary'", descricao: 'Papel do painel.' },
          { nome: 'bodyLabel', tipo: 'string', padrao: "'Mensagens da conversa'", descricao: 'Nome da área rolável.' },
          { nome: 'stickToBottom', tipo: 'boolean', padrao: 'true', descricao: 'Acompanha o fim sem roubar a rolagem.' },
          { nome: 'scrollToEndKey', tipo: 'string | number', descricao: 'Quando muda, rola ao fim à força.' },
          { nome: 'onAtBottomChange', tipo: '(noFim: boolean) => void', descricao: 'Chegou ao fim / saiu dele.' },
          { nome: 'showScrollToEnd', tipo: 'boolean', padrao: 'true', descricao: 'Botão de ir ao fim.' },
          { nome: 'scrollToEndLabel', tipo: 'string', padrao: "'Ir para a mensagem mais recente'", descricao: 'Rótulo dele.' },
          { nome: 'bodyRef', tipo: 'Ref<HTMLDivElement>', descricao: 'O elemento que rola.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: 'ChatPanelAction · icon', tipo: 'string', descricao: 'Ligadura do Material Symbols.' },
          { nome: 'ChatPanelAction · label', tipo: 'string', descricao: 'Nome acessível e Tooltip.' },
          { nome: 'ChatPanelAction · pressed', tipo: 'boolean', descricao: 'Botão de alternar (aria-pressed).' },
          { nome: 'ChatPanelAction · theme / ...rest', tipo: "'light' | 'dark' / ButtonHTMLAttributes", descricao: 'Tema; onClick etc.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ChatPanel> = {
  title: 'Plataforma Unooria/Componentes/ChatPanel',
  component: ChatPanel,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Aberto.' },
    size: { control: 'radio', options: ['compacto', 'expandido'], description: 'Tamanho.' },
    placement: { control: 'radio', options: ['bottom-right', 'bottom-left', 'inline'], description: 'Onde fica.' },
    onClose: { action: 'onClose', description: 'Fechar (Esc).' },
    closeOnEsc: { control: 'boolean', description: 'Esc fecha.' },
    title: { control: 'text', description: 'Título.' },
    subtitle: { control: 'text', description: 'Subtítulo.' },
    avatar: { control: false, description: 'Avatar do cabeçalho (padrão: o mascote).' },
    actions: { control: false, description: 'Ações do cabeçalho. No playground: as quatro do agente.' },
    footer: { control: false, description: 'Rodapé. No playground: o ChatComposer.' },
    sidebar: { control: false, description: 'Coluna lateral. No playground: o ChatHistory, se sidebarOpen.' },
    sidebarOpen: { control: 'boolean', description: 'Coluna lateral à vista.' },
    role: { control: 'radio', options: ['complementary', 'region'], description: 'Papel.' },
    bodyLabel: { control: 'text', description: 'Nome da área rolável.' },
    stickToBottom: { control: 'boolean', description: 'Acompanha o fim.' },
    scrollToEndKey: { control: 'text', description: 'Mude para forçar a ida ao fim.' },
    onAtBottomChange: { action: 'onAtBottomChange', description: 'Chegou ao fim / saiu.' },
    showScrollToEnd: { control: 'boolean', description: 'Botão de ir ao fim.' },
    scrollToEndLabel: { control: 'text', description: 'Rótulo do botão de ir ao fim.' },
    bodyRef: { control: false, description: 'Ref do corpo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    open: true,
    size: 'compacto',
    placement: 'inline',
    closeOnEsc: true,
    title: 'Agente de IA do professor',
    subtitle: 'Tire dúvidas sobre o material da rede',
    sidebarOpen: false,
    role: 'complementary',
    bodyLabel: 'Mensagens da conversa',
    stickToBottom: true,
    scrollToEndKey: '',
    showScrollToEnd: true,
    scrollToEndLabel: 'Ir para a mensagem mais recente',
    theme: 'light',
    onClose: fn(),
    onAtBottomChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ChatPanel>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatPanelDocumentationPage />,
};

/** Playground com todas as propriedades. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatPanel',
  render: (args) => (
    <ChatPanel
      {...args}
      scrollToEndKey={args.scrollToEndKey || undefined}
      actions={<Acoes tema={args.theme} expandido={args.size === 'expandido'} historico={args.sidebarOpen} />}
      sidebar={<ChatHistory items={HISTORICO} activeId="c1" theme={args.theme} onSelect={nada} onDelete={nada} />}
      footer={<ChatComposer theme={args.theme} onSend={nada} maxLength={4000} />}
    >
      <Mensagens tema={args.theme} />
    </ChatPanel>
  ),
};

/** Compacto, com histórico e expandido, nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <>
      <Palco rotulo="Claro" direcao="row">
        <PainelDeExemplo />
        <PainelDeExemplo comHistorico />
      </Palco>
      <Palco rotulo="Escuro" tema="dark" direcao="row">
        <PainelDeExemplo tema="dark" />
        <PainelDeExemplo tema="dark" comHistorico />
      </Palco>
      <Palco rotulo="Expandido">
        <PainelDeExemplo size="expandido" comHistorico />
      </Palco>
    </>
  ),
};

/** O painel com estado: expandir, histórico e fechar de verdade, e um botão da página ao lado. */
const PainelVivo: React.FC<{ aoFechar: () => void }> = ({ aoFechar }) => {
  const [aberto, setAberto] = useState(true);
  const [tamanho, setTamanho] = useState<'compacto' | 'expandido'>('compacto');
  const [historico, setHistorico] = useState(false);
  const fechar = () => {
    setAberto(false);
    aoFechar();
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button type="button" onClick={() => setAberto(true)}>
        Botão da página
      </button>
      <ChatPanel
        placement="inline"
        open={aberto}
        size={tamanho}
        onClose={fechar}
        sidebarOpen={historico}
        sidebar={<ChatHistory items={HISTORICO} activeId="c1" onSelect={nada} onDelete={nada} />}
        actions={
          <Acoes
            expandido={tamanho === 'expandido'}
            historico={historico}
            aoExpandir={() => setTamanho((t) => (t === 'compacto' ? 'expandido' : 'compacto'))}
            aoHistorico={() => setHistorico((h) => !h)}
            aoFechar={fechar}
          />
        }
        footer={<ChatComposer onSend={nada} />}
      >
        <Mensagens />
      </ChatPanel>
    </div>
  );
};

const aoFechar = fn();

/**
 * As garantias: complementary nomeado e sem aria-modal; expandir alterna o
 * tamanho; histórico toma o lugar da conversa no compacto; Esc com o foco
 * dentro fecha (e o Esc da confirmação do histórico não); a página continua
 * focável.
 */
export const Estados: Story = {
  render: () => <PainelVivo aoFechar={aoFechar} />,
  play: async ({ canvasElement }) => {
    aoFechar.mockClear();
    const tela = within(canvasElement);
    const painel = tela.getByRole('complementary', { name: 'Agente de IA do professor' });
    await expect(painel).not.toHaveAttribute('aria-modal');
    await expect(painel).toHaveAttribute('data-size', 'compacto');

    // Expandir alterna.
    await userEvent.click(within(painel).getByRole('button', { name: 'Expandir' }));
    await expect(painel).toHaveAttribute('data-size', 'expandido');
    await userEvent.click(within(painel).getByRole('button', { name: 'Recolher' }));
    await expect(painel).toHaveAttribute('data-size', 'compacto');

    // Histórico: no compacto, a lista toma o lugar da conversa.
    const botaoHistorico = within(painel).getByRole('button', { name: 'Histórico de conversas' });
    await userEvent.click(botaoHistorico);
    await expect(botaoHistorico).toHaveAttribute('aria-pressed', 'true');
    await expect(within(painel).getByRole('navigation', { name: 'Histórico de conversas' })).toBeVisible();
    await expect(within(painel).getByRole('region', { name: 'Mensagens da conversa', hidden: true })).not.toBeVisible();

    // O Esc da confirmação de excluir é dela: o painel não fecha.
    await userEvent.click(within(painel).getAllByRole('button', { name: /^Excluir a conversa/ })[0]);
    await userEvent.keyboard('{Escape}');
    await expect(aoFechar).not.toHaveBeenCalled();
    await expect(painel).toBeVisible();
    await userEvent.click(botaoHistorico);

    // Não modal: a página continua alcançável pelo foco.
    const daPagina = tela.getByRole('button', { name: 'Botão da página' });
    daPagina.focus();
    await expect(daPagina).toHaveFocus();

    // Esc com o foco dentro fecha.
    await userEvent.click(within(painel).getByRole('textbox'));
    await userEvent.keyboard('{Escape}');
    await expect(aoFechar).toHaveBeenCalledTimes(1);
    await expect(painel).not.toBeVisible();

    // Fechado continua montado (hidden), e reabre.
    await userEvent.click(daPagina);
    await waitFor(() => expect(painel).toBeVisible());
  },
};

/** O painel recebendo uma resposta por trechos: acompanha o fim, ou não. */
const PainelTransmitindo: React.FC = () => {
  const [trechos, setTrechos] = useState<string[]>(['Primeiro trecho da resposta.']);
  const [chave, setChave] = useState(0);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button type="button" onClick={() => setTrechos((t) => [...t, `Trecho ${t.length + 1} da resposta, que chega aos poucos.`])}>
          Chegar trecho
        </button>
        <button type="button" onClick={() => setChave((c) => c + 1)}>
          Enviar pergunta
        </button>
      </div>
      <ChatPanel placement="inline" scrollToEndKey={chave} style={{ height: 360 }}>
        <Mensagens />
        <ChatMessage autor="agente" estado="transmitindo">
          <RichContent>
            {trechos.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </RichContent>
        </ChatMessage>
      </ChatPanel>
    </div>
  );
};

/**
 * Rolagem com âncora no fim: no fim, o corpo acompanha o que chega; quem subiu
 * não é arrastado e ganha o botão de ir ao fim; scrollToEndKey força.
 */
export const RolagemNoFim: Story = {
  name: '📜 Rolagem no fim',
  render: () => <PainelTransmitindo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const corpo = tela.getByRole('region', { name: 'Mensagens da conversa' });
    const chegar = tela.getByRole('button', { name: 'Chegar trecho' });
    const distancia = () => corpo.scrollHeight - corpo.scrollTop - corpo.clientHeight;
    const noFim = () => distancia() <= 32;

    // Abre no fim e acompanha o que chega.
    await waitFor(() => expect(noFim()).toBe(true));
    await userEvent.click(chegar);
    await userEvent.click(chegar);
    await waitFor(() => expect(distancia()).toBeLessThanOrEqual(32));
    await expect(tela.queryByRole('button', { name: 'Ir para a mensagem mais recente' })).not.toBeInTheDocument();

    // Subiu para reler: o que chega não o arrasta, e aparece o botão.
    corpo.scrollTop = 0;
    corpo.dispatchEvent(new Event('scroll'));
    const irAoFim = await tela.findByRole('button', { name: 'Ir para a mensagem mais recente' });
    await userEvent.click(chegar);
    await expect(corpo.scrollTop).toBe(0);

    // O botão leva ao fim.
    await userEvent.click(irAoFim);
    await waitFor(() => expect(noFim()).toBe(true));

    // scrollToEndKey força, mesmo de cima.
    corpo.scrollTop = 0;
    corpo.dispatchEvent(new Event('scroll'));
    await userEvent.click(tela.getByRole('button', { name: 'Enviar pergunta' }));
    await waitFor(() => expect(noFim()).toBe(true));
  },
};
