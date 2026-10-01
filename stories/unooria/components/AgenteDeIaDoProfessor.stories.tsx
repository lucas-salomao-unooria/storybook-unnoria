import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ChatLauncher } from '../../../src/unooria/components/ChatLauncher';
import { ChatPanel, ChatPanelAction } from '../../../src/unooria/components/ChatPanel';
import { ChatMessage, type ChatMessageStatus } from '../../../src/unooria/components/ChatMessage';
import { ChatComposer } from '../../../src/unooria/components/ChatComposer';
import { ChatHistory, type ChatHistoryItem } from '../../../src/unooria/components/ChatHistory';
import { RichContent } from '../../../src/unooria/components/RichContent';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Janela, Palco, Praticas } from './agente/docKit';
import { AVISO, FONTES, HISTORICO, PERGUNTA_CURTA, PERGUNTA_DO_PROFESSOR, RespostaEmMarkdown, RespostaParcial } from './agente/fixtures';

/* ---------------------------------------------------------------------------
   O chat montado como o hub o montaria — com uma "api" de mentira que
   responde por trechos. Nada aqui é componente de produção: é a composição.
   ------------------------------------------------------------------------- */

interface Mensagem {
  id: string;
  autor: 'professor' | 'agente';
  estado: ChatMessageStatus;
  texto?: string;
  /** Resposta "markdown" completa (a fixture), quando pronta. */
  completa?: boolean;
  trechos?: string[];
  interrompida?: boolean;
}

const TRECHOS = [
  'Claro! Segue um roteiro de 50 minutos',
  ' alinhado à habilidade EF05MA03 da BNCC,',
  ' usando o material da rede.',
];

const CONVERSA_INICIAL: Mensagem[] = [
  { id: 'm1', autor: 'professor', estado: 'pronta', texto: PERGUNTA_DO_PROFESSOR },
  { id: 'm2', autor: 'agente', estado: 'pronta', completa: true },
];

let proximoId = 100;
const novoId = () => `m${proximoId++}`;

const ChatDoProfessor: React.FC<{ tema?: UnooriaTheme; passo?: number }> = ({ tema = 'light', passo = 90 }) => {
  const [aberto, setAberto] = useState(false);
  const [tamanho, setTamanho] = useState<'compacto' | 'expandido'>('compacto');
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [conversas, setConversas] = useState<ChatHistoryItem[]>(HISTORICO);
  const [ativa, setAtiva] = useState('c1');
  const [mensagens, setMensagens] = useState<Mensagem[]>(CONVERSA_INICIAL);
  const [naoLidas, setNaoLidas] = useState(0);
  const [ultimaPergunta, setUltimaPergunta] = useState('');
  const [transmitindo, setTransmitindo] = useState(false);
  const temporizador = useRef<ReturnType<typeof setInterval> | null>(null);
  const abertoRef = useRef(aberto);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const campoRef = useRef<HTMLTextAreaElement>(null);
  const perguntas = useRef(0);

  useEffect(() => {
    abertoRef.current = aberto;
  }, [aberto]);
  useEffect(() => () => {
    if (temporizador.current) clearInterval(temporizador.current);
  }, []);

  const atualizar = (id: string, mudar: (m: Mensagem) => Mensagem) =>
    setMensagens((lista) => lista.map((m) => (m.id === id ? mudar(m) : m)));

  /** A "api": espera, transmite por trechos e termina — ou falha, na 2ª pergunta. */
  const responder = (idDoAgente: string, falhar: boolean) => {
    setTransmitindo(true);
    let indice = 0;
    temporizador.current = setInterval(() => {
      if (falhar && indice === 1) {
        clearInterval(temporizador.current!);
        atualizar(idDoAgente, (m) => ({ ...m, estado: 'erro' }));
        setTransmitindo(false);
        return;
      }
      if (indice < TRECHOS.length) {
        const trecho = TRECHOS[indice];
        atualizar(idDoAgente, (m) => ({ ...m, estado: 'transmitindo', trechos: [...(m.trechos ?? []), trecho] }));
        indice += 1;
        return;
      }
      clearInterval(temporizador.current!);
      atualizar(idDoAgente, (m) => ({ ...m, estado: 'pronta', completa: true }));
      setTransmitindo(false);
      if (!abertoRef.current) setNaoLidas((n) => n + 1);
    }, passo);
  };

  const enviar = (texto: string) => {
    perguntas.current += 1;
    const idDoProfessor = novoId();
    const idDoAgente = novoId();
    setMensagens((lista) => [
      ...lista,
      { id: idDoProfessor, autor: 'professor', estado: 'pronta', texto },
      { id: idDoAgente, autor: 'agente', estado: 'enviando' },
    ]);
    setUltimaPergunta(idDoProfessor);
    responder(idDoAgente, perguntas.current === 2);
  };

  const parar = () => {
    if (temporizador.current) clearInterval(temporizador.current);
    setTransmitindo(false);
    setMensagens((lista) =>
      lista.map((m) => (m.estado === 'transmitindo' || m.estado === 'enviando' ? { ...m, estado: 'pronta', interrompida: true } : m))
    );
  };

  const tentarDeNovo = (id: string) => {
    atualizar(id, (m) => ({ ...m, estado: 'enviando', trechos: [] }));
    responder(id, false);
  };

  const abrir = () => {
    setAberto(true);
    setNaoLidas(0);
    // Ao abrir, o foco vai para o compositor (o painel não é modal: não prende nada).
    requestAnimationFrame(() => campoRef.current?.focus());
  };

  const fechar = () => {
    setAberto(false);
    botaoRef.current?.focus();
  };

  const novaConversa = () => {
    const id = `c${Date.now()}`;
    setConversas((lista) => [{ id, titulo: 'Nova conversa', atualizadaEm: 'Agora' }, ...lista]);
    setAtiva(id);
    setMensagens([]);
    setHistoricoAberto(false);
  };

  return (
    <>
      <ChatLauncher
        ref={botaoRef}
        theme={tema}
        expanded={aberto}
        controls="painel-do-agente"
        badge={naoLidas}
        onClick={() => (aberto ? fechar() : abrir())}
      />
      <ChatPanel
        id="painel-do-agente"
        theme={tema}
        open={aberto}
        size={tamanho}
        onClose={fechar}
        subtitle="Tire dúvidas sobre o material da rede"
        scrollToEndKey={ultimaPergunta}
        sidebarOpen={historicoAberto}
        sidebar={
          <ChatHistory
            theme={tema}
            items={conversas}
            activeId={ativa}
            onSelect={(id) => {
              setAtiva(id);
              if (tamanho === 'compacto') setHistoricoAberto(false);
            }}
            onDelete={(id) => setConversas((lista) => lista.filter((c) => c.id !== id))}
          />
        }
        actions={
          <>
            <ChatPanelAction icon="add_comment" label="Nova conversa" theme={tema} onClick={novaConversa} />
            <ChatPanelAction
              icon="history"
              label="Histórico de conversas"
              pressed={historicoAberto}
              theme={tema}
              onClick={() => setHistoricoAberto((v) => !v)}
            />
            <ChatPanelAction
              icon={tamanho === 'expandido' ? 'close_fullscreen' : 'open_in_full'}
              label={tamanho === 'expandido' ? 'Recolher' : 'Expandir'}
              theme={tema}
              onClick={() => setTamanho((t) => (t === 'compacto' ? 'expandido' : 'compacto'))}
            />
            <ChatPanelAction icon="close" label="Fechar" theme={tema} onClick={fechar} />
          </>
        }
        footer={
          <ChatComposer
            ref={campoRef}
            theme={tema}
            maxLength={4000}
            transmitindo={transmitindo}
            onSend={enviar}
            onStop={parar}
          />
        }
      >
        {mensagens.map((m) =>
          m.autor === 'professor' ? (
            <ChatMessage key={m.id} autor="professor" estado={m.estado} theme={tema}>
              {m.texto}
            </ChatMessage>
          ) : (
            <ChatMessage
              key={m.id}
              autor="agente"
              estado={m.estado}
              theme={tema}
              fontes={m.completa ? FONTES : undefined}
              aviso={m.completa ? AVISO : m.interrompida ? 'Resposta interrompida.' : undefined}
              onRetry={m.estado === 'erro' ? () => tentarDeNovo(m.id) : undefined}
            >
              {m.completa ? (
                <RichContent theme={tema}>
                  <RespostaEmMarkdown />
                </RichContent>
              ) : m.trechos && m.trechos.length > 0 ? (
                <RichContent theme={tema}>
                  <p>{m.trechos.join('')}</p>
                </RichContent>
              ) : null}
            </ChatMessage>
          )
        )}
      </ChatPanel>
    </>
  );
};

/* ---------------------------------------------------------------------------
   Telas estáticas do fluxo (para ver cada estado sem clicar).
   ------------------------------------------------------------------------- */

const acoesEstaticas = (tema: UnooriaTheme, expandido = false, historico = false) => (
  <>
    <ChatPanelAction icon="add_comment" label="Nova conversa" theme={tema} />
    <ChatPanelAction icon="history" label="Histórico de conversas" pressed={historico} theme={tema} />
    <ChatPanelAction icon={expandido ? 'close_fullscreen' : 'open_in_full'} label={expandido ? 'Recolher' : 'Expandir'} theme={tema} />
    <ChatPanelAction icon="close" label="Fechar" theme={tema} />
  </>
);

const nada = () => {};

const TelaConversa: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <ChatPanel placement="inline" theme={tema} subtitle="Tire dúvidas sobre o material da rede" actions={acoesEstaticas(tema)} footer={<ChatComposer theme={tema} onSend={nada} maxLength={4000} />}>
    <ChatMessage autor="professor" theme={tema}>{PERGUNTA_DO_PROFESSOR}</ChatMessage>
    <ChatMessage autor="agente" theme={tema} fontes={FONTES} aviso={AVISO}>
      <RichContent theme={tema}>
        <RespostaEmMarkdown />
      </RichContent>
    </ChatMessage>
  </ChatPanel>
);

const TelaDigitando: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <ChatPanel placement="inline" theme={tema} subtitle="Tire dúvidas sobre o material da rede" actions={acoesEstaticas(tema)} footer={<ChatComposer theme={tema} onSend={nada} onStop={nada} transmitindo />}>
    <ChatMessage autor="professor" theme={tema}>{PERGUNTA_CURTA}</ChatMessage>
    <ChatMessage autor="agente" estado="enviando" theme={tema} />
  </ChatPanel>
);

const TelaTransmitindoEErro: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <ChatPanel placement="inline" theme={tema} subtitle="Tire dúvidas sobre o material da rede" actions={acoesEstaticas(tema)} footer={<ChatComposer theme={tema} onSend={nada} />}>
    <ChatMessage autor="professor" theme={tema}>{PERGUNTA_CURTA}</ChatMessage>
    <ChatMessage autor="agente" estado="erro" theme={tema} onRetry={nada}>
      <RichContent theme={tema}>
        <RespostaParcial />
      </RichContent>
    </ChatMessage>
    <ChatMessage autor="professor" theme={tema}>Pode tentar de novo?</ChatMessage>
    <ChatMessage autor="agente" estado="transmitindo" theme={tema}>
      <RichContent theme={tema}>
        <RespostaParcial />
      </RichContent>
    </ChatMessage>
  </ChatPanel>
);

const TelaExpandida: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <ChatPanel
    placement="inline"
    size="expandido"
    theme={tema}
    subtitle="Tire dúvidas sobre o material da rede"
    actions={acoesEstaticas(tema, true, true)}
    sidebar={<ChatHistory theme={tema} items={HISTORICO} activeId="c1" onSelect={nada} onDelete={nada} />}
    footer={<ChatComposer theme={tema} onSend={nada} maxLength={4000} />}
  >
    <ChatMessage autor="professor" theme={tema}>{PERGUNTA_DO_PROFESSOR}</ChatMessage>
    <ChatMessage autor="agente" theme={tema} fontes={FONTES} aviso={AVISO}>
      <RichContent theme={tema}>
        <RespostaEmMarkdown />
      </RichContent>
    </ChatMessage>
  </ChatPanel>
);

/* ---------------------------------------------------------------------------
   Documentação
   ------------------------------------------------------------------------- */

const CODIGO_DO_HUB = `import {
  ChatLauncher, ChatPanel, ChatPanelAction, ChatMessage,
  ChatComposer, ChatHistory, RichContent, RichContentTable,
} from '@unooria/design-system';
import ReactMarkdown from 'react-markdown';

<ChatLauncher ref={botaoRef} expanded={aberto} controls="agente" badge={naoLidas}
  onClick={() => (aberto ? fechar() : abrir())} />

<ChatPanel id="agente" open={aberto} size={tamanho} onClose={fechar}
  scrollToEndKey={idDaUltimaPergunta}
  sidebarOpen={historicoAberto}
  sidebar={<ChatHistory items={conversas} activeId={ativa}
    onSelect={abrirConversa} onDelete={excluirConversa} />}
  actions={<>
    <ChatPanelAction icon="add_comment" label="Nova conversa" onClick={nova} />
    <ChatPanelAction icon="history" label="Histórico de conversas"
      pressed={historicoAberto} onClick={alternarHistorico} />
    <ChatPanelAction icon={tamanho === 'expandido' ? 'close_fullscreen' : 'open_in_full'}
      label={tamanho === 'expandido' ? 'Recolher' : 'Expandir'} onClick={alternarTamanho} />
    <ChatPanelAction icon="close" label="Fechar" onClick={fechar} />
  </>}
  footer={<ChatComposer ref={campoRef} maxLength={4000}
    transmitindo={transmitindo} onSend={enviar} onStop={parar} />}
>
  {mensagens.map((m) => (
    <ChatMessage key={m.id} autor={m.autor} estado={m.estado}
      fontes={m.fontes} aviso={m.aviso} onRetry={m.erro ? () => repetir(m.id) : undefined}>
      {m.autor === 'agente'
        ? <RichContent><ReactMarkdown components={{ table: RichContentTable }}>{m.texto}</ReactMarkdown></RichContent>
        : m.texto}
    </ChatMessage>
  ))}
</ChatPanel>`;

const AgenteDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="Agente de IA do professor (composição)"
        description="O chat inteiro, montado com as oito peças: o botão flutuante com o mascote, o painel não modal (compacto e expandido), o histórico de conversas, as mensagens com resposta em markdown dentro do RichContent, fontes, aviso, o indicador de escrita, o erro com tentar de novo e o compositor com Parar."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="Só para o professor, ao lado do trabalho." />
      <Grade>
        <Cartao icone="🔥" titulo="AgentAvatar">O mascote, embutido no pacote.</Cartao>
        <Cartao icone="🔘" titulo="ChatLauncher">O botão do canto, com selo de respostas novas.</Cartao>
        <Cartao icone="🪟" titulo="ChatPanel + ChatPanelAction">O painel e as ações do cabeçalho.</Cartao>
        <Cartao icone="💬" titulo="ChatMessage + TypingIndicator">As mensagens e os estados.</Cartao>
        <Cartao icone="📝" titulo="RichContent + RichContentTable">A tipografia da resposta.</Cartao>
        <Cartao icone="⌨️" titulo="ChatComposer">O campo, com Enviar e Parar.</Cartao>
        <Cartao icone="🗂️" titulo="ChatHistory">As conversas, com excluir em dois passos.</Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio, na seção Plataforma Unooria." />
      <Grade>
        <Cartao icone="🎯" titulo="Seção">
          Por decisão do dono do produto, as peças são da seção <code>unooria</code> (tokens{' '}
          <code>--unooria-*</code>, Open Sans, Material Symbols) — não do UnooriaAI nem do ChatGPT, que são clones
          e não se cruzam com a plataforma.
        </Cartao>
        <Cartao icone="🗣️" titulo="Nome">
          “Agente de IA do professor” em todo texto visível e nome acessível — nunca “assistente”, “guia” ou
          “chatbot”.
        </Cartao>
        <Cartao icone="🧱" titulo="O que é do produto">
          Converter markdown (react-markdown) e sanitizá-lo, formatar datas, chamar a api, gerar o título da conversa e
          contar as respostas não lidas. O DS dá forma, comportamento de teclado e acessibilidade.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Como o hub monta o chat." />
      <pre
        style={{
          margin: '0 0 32px',
          padding: 16,
          borderRadius: 12,
          background: 'var(--unooria-color-neutral-100)',
          color: 'var(--unooria-color-neutral-950)',
          fontSize: 12,
          lineHeight: 1.6,
          overflowX: 'auto',
        }}
      >
        <code>{CODIGO_DO_HUB}</code>
      </pre>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="As telas do fluxo." />
      <Palco rotulo="Conversa · digitando · erro e transmitindo" direcao="row">
        <TelaConversa />
        <TelaDigitando />
        <TelaTransmitindoEErro />
      </Palco>
      <Palco rotulo="Expandido, com o histórico">
        <TelaExpandida />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="O fluxo." />
      <Praticas
        fazer={[
          'Abrir pelo botão, focar o compositor e devolver o foco ao botão ao fechar.',
          'Passar a última pergunta em scrollToEndKey.',
          'Ir de enviando → transmitindo → pronta, e pronta só no último trecho.',
          'Contar no selo só as respostas que chegaram com o painel fechado.',
        ]}
        evitar={[
          'Prender o foco no painel ou pôr véu.',
          'Mostrar o indicador de escrita junto do texto que já chega.',
          'Excluir conversa sem a confirmação da linha.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} direcao="row">
        <TelaConversa tema={tema} />
        <TelaTransmitindoEErro tema={tema} />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Cada peça tem a sua tabela." />
      <Grade>
        <Cartao icone="📄" titulo="Onde estão">
          Nas páginas de <code>AgentAvatar</code>, <code>ChatLauncher</code>, <code>ChatPanel</code>,{' '}
          <code>ChatMessage</code>, <code>ChatComposer</code>, <code>TypingIndicator</code>, <code>RichContent</code> e{' '}
          <code>ChatHistory</code>, seção 7.
        </Cartao>
      </Grade>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ChatDoProfessor> = {
  title: 'Plataforma Unooria/Componentes/Agente de IA do professor',
  component: ChatDoProfessor,
  parameters: { layout: 'padded' },
  argTypes: {
    tema: { control: 'radio', options: ['light', 'dark'], description: 'Tema da composição.' },
    passo: { control: { type: 'range', min: 30, max: 600, step: 30 }, description: 'Intervalo entre trechos (ms).' },
  },
  args: { tema: 'light', passo: 90 },
};

export default meta;

type Story = StoryObj<typeof ChatDoProfessor>;

/** Documentação da composição. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AgenteDocumentationPage />,
};

/**
 * O chat inteiro, interativo, numa "janela" de 760px: abra pelo botão, pergunte
 * (a 2ª pergunta falha, para ver o erro), expanda, abra o histórico, feche com Esc.
 */
export const ChatCompleto: Story = {
  name: '🕹️ 1. Chat completo (interativo)',
  render: (args) => (
    <Janela altura={760} tema={args.tema}>
      <ChatDoProfessor {...args} />
    </Janela>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const botao = tela.getByRole('button', { name: 'Agente de IA do professor' });
    // Fechado, o painel está `hidden`: busca pelo id que o `aria-controls` aponta.
    const painel = canvasElement.querySelector<HTMLElement>(`#${botao.getAttribute('aria-controls')}`)!;
    await expect(painel).toHaveAttribute('role', 'complementary');

    // Botão → painel compacto, com o foco no compositor.
    await expect(painel).not.toBeVisible();
    await userEvent.click(botao);
    await expect(botao).toHaveAttribute('aria-expanded', 'true');
    // A entrada anima a partir da opacidade 0: espera ela terminar.
    await waitFor(() => expect(painel).toBeVisible());
    const campo = within(painel).getByRole('textbox', { name: 'Mensagem para o agente de IA do professor' });
    await waitFor(() => expect(campo).toHaveFocus());

    // Pergunta: o professor aparece, o agente "digita", transmite e termina com fontes.
    await userEvent.type(campo, 'Quero outra atividade');
    await userEvent.keyboard('{Enter}');
    await expect(within(painel).getByText('Quero outra atividade')).toBeInTheDocument();
    const respostas = () => within(painel).getAllByRole('article', { name: 'Agente de IA do professor' });
    await waitFor(() => expect(respostas().at(-1)).toHaveAttribute('aria-busy', 'true'));
    await waitFor(() => expect(respostas().at(-1)).not.toHaveAttribute('aria-busy'), { timeout: 3000 });
    await expect(respostas().at(-1)).toHaveTextContent('Fontes:');

    // 2ª pergunta falha; tentar de novo responde.
    await userEvent.type(campo, 'E a avaliação?{Enter}');
    const tentar = await within(painel).findByRole('button', { name: 'Tentar de novo' }, { timeout: 3000 });
    await userEvent.click(tentar);
    await waitFor(() => expect(respostas().at(-1)).toHaveTextContent('Fontes:'), { timeout: 3000 });

    // Expandir alterna.
    await userEvent.click(within(painel).getByRole('button', { name: 'Expandir' }));
    await expect(painel).toHaveAttribute('data-size', 'expandido');
    await userEvent.click(within(painel).getByRole('button', { name: 'Histórico de conversas' }));
    await expect(within(painel).getByRole('navigation', { name: 'Histórico de conversas' })).toBeVisible();
    await userEvent.click(within(painel).getByRole('button', { name: 'Recolher' }));
    await expect(painel).toHaveAttribute('data-size', 'compacto');

    // Esc fecha e devolve o foco ao botão.
    within(painel).getByRole('button', { name: 'Nova conversa' }).focus();
    await userEvent.keyboard('{Escape}');
    await expect(painel).not.toBeVisible();
    await expect(botao).toHaveFocus();
    await expect(botao).toHaveAttribute('aria-expanded', 'false');
  },
};

/** As telas do fluxo, estáticas: conversa, digitando, erro e transmitindo, expandido com histórico. */
export const TelasDoFluxo: Story = {
  name: '🎨 Telas do fluxo',
  render: (args) => (
    <>
      <Palco rotulo="Compacto" tema={args.tema} direcao="row">
        <TelaConversa tema={args.tema} />
        <TelaDigitando tema={args.tema} />
        <TelaTransmitindoEErro tema={args.tema} />
      </Palco>
      <Palco rotulo="Expandido, com o histórico" tema={args.tema}>
        <TelaExpandida tema={args.tema} />
      </Palco>
    </>
  ),
};

/** O botão com selo: uma resposta que chegou com o painel fechado. */
export const RespostaComPainelFechado: Story = {
  name: '🔴 Resposta com o painel fechado',
  render: (args) => (
    <Janela altura={240} tema={args.tema}>
      <ChatLauncher theme={args.tema} badge={1} controls="painel-fechado" />
      <ChatPanel id="painel-fechado" open={false} theme={args.tema}>
        <ChatMessage autor="agente">Resposta pronta.</ChatMessage>
      </ChatPanel>
    </Janela>
  ),
};
