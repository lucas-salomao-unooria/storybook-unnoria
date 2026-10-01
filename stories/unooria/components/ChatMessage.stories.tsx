import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ChatMessage, formatChatMessageSource } from '../../../src/unooria/components/ChatMessage';
import { RichContent } from '../../../src/unooria/components/RichContent';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Palco, Praticas, TabelaDeProps } from './agente/docKit';
import { AVISO, FONTES, PERGUNTA_CURTA, PERGUNTA_DO_PROFESSOR, RespostaEmMarkdown, RespostaParcial } from './agente/fixtures';

const Conversa: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
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

const OsEstados: React.FC<{ tema?: UnooriaTheme; aoTentar?: () => void }> = ({ tema = 'light', aoTentar }) => (
  <>
    <ChatMessage autor="professor" estado="enviando" theme={tema}>
      {PERGUNTA_CURTA}
    </ChatMessage>
    <ChatMessage autor="agente" estado="enviando" theme={tema} />
    <ChatMessage autor="agente" estado="transmitindo" theme={tema}>
      <RichContent theme={tema}>
        <RespostaParcial />
      </RichContent>
    </ChatMessage>
    <ChatMessage autor="agente" estado="erro" theme={tema} onRetry={aoTentar ?? (() => {})}>
      <RichContent theme={tema}>
        <RespostaParcial />
      </RichContent>
    </ChatMessage>
    <ChatMessage autor="professor" estado="erro" theme={tema} onRetry={aoTentar ?? (() => {})}>
      {PERGUNTA_CURTA}
    </ChatMessage>
  </>
);

const ChatMessageDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="ChatMessage"
        description="Uma mensagem da conversa com o agente de IA do professor: o balão do professor, ou a resposta do agente com o mascote, as fontes (“Fontes: Título, p. 12–13”), um aviso curto e os estados enviando, transmitindo, pronta e erro."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="Quem fala e em que pé está." />
      <Grade>
        <Cartao icone="🧑‍🏫" titulo="Professor">Balão lavanda à direita, sem avatar — é quem está lendo.</Cartao>
        <Cartao icone="🔥" titulo="Agente">
          O mascote (<code>AgentAvatar</code> <code>xs</code>) e a resposta em largura cheia, sem balão: é texto para
          ler, com títulos, listas e tabelas (<code>RichContent</code>).
        </Cartao>
        <Cartao icone="📚" titulo="Fontes e aviso">
          <code>fontes</code> vira “Fontes: Caderno, p. 12–13; BNCC, p. 294”. <code>aviso</code> é uma faixa curta de
          atenção, com ícone — nunca só cor.
        </Cartao>
        <Cartao icone="📡" titulo="Transmissão">
          A do agente é região viva (<code>aria-live=&quot;polite&quot;</code>) e fica <code>aria-busy</code> enquanto
          chega: o leitor de tela lê a resposta inteira uma vez, sem repetir cada trecho.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio." />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Balão: <code>brandpurple-100</code> (escuro: <code>brandpurple-800</code>), raio 16px com o canto de baixo à
          direita em 4px, recuo 8px 12px, até 85% da largura. Agente: avatar de 32px e 12px até o texto.
        </Cartao>
        <Cartao icone="⚠️" titulo="Aviso, fontes e erro">
          Aviso: <code>warning-50</code>, fio <code>warning-200</code>, texto <code>warning-800</code>, glifo{' '}
          <code>warning</code>. Fontes: 12/18 <code>neutral-700</code>, glifo <code>menu_book</code>. Erro: texto{' '}
          <code>danger-700</code>, glifo <code>error</code> e o <code>Button</code> <code>ghost</code> “Tentar de
          novo” (<code>refresh</code>). Todos os glifos são do quadro <code>6024:2923</code>.
        </Cartao>
        <Cartao icone="🧩" titulo="Por que não o SpeechBubble">
          O <code>SpeechBubble</code> é a fala de personagem da redação (nome visível, humor, 16px fixo, a fala num{' '}
          <code>blockquote</code>): uma resposta com tabela dentro de uma citação seria HTML errado. E o aviso não é o{' '}
          <code>FeedbackAlert</code>: aquele tem 24px de recuo e <code>role=&quot;alert&quot;</code>, que gritaria a
          cada resposta.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Avatar, corpo, aviso, fontes e erro." />
      <Grade>
        <Cartao icone="1" titulo="article">
          Com nome: “Você” ou “Agente de IA do professor” (<code>authorLabel</code> troca).
        </Cartao>
        <Cartao icone="2" titulo="Corpo">O <code>children</code>, do produto. No agente, um <code>RichContent</code>.</Cartao>
        <Cartao icone="3" titulo="Aviso">
          <code>&lt;p role=&quot;note&quot;&gt;</code>.
        </Cartao>
        <Cartao icone="4" titulo="Fontes">
          Cada fonte num <code>&lt;cite&gt;</code>; o texto sai de <code>formatChatMessageSource</code>, exportada.
        </Cartao>
        <Cartao icone="5" titulo="Erro">
          Do professor, <code>role=&quot;alert&quot;</code> (não saiu). Do agente, dentro da região viva.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="A conversa e os quatro estados." />
      <Palco rotulo="Pergunta e resposta pronta, com fontes e aviso" largura={560}>
        <Conversa />
      </Palco>
      <Palco rotulo="enviando · enviando (agente) · transmitindo · erro (agente) · erro (professor)" largura={560}>
        <OsEstados />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da mensagem." />
      <Praticas
        fazer={[
          'Pôr a resposta do agente dentro de um RichContent.',
          'Mudar para estado="pronta" quando o último trecho chegar — é o que solta o aria-busy.',
          'Mandar só as fontes que a resposta de fato usou.',
        ]}
        evitar={[
          'Repetir o nome do agente em cada mensagem: o avatar e o nome acessível já dizem.',
          'Usar aviso para texto longo: é uma linha de atenção.',
          'Formatar a página no produto: a linha de fontes já escreve “p. 12–13”.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} largura={560}>
        <Conversa tema={tema} />
        <OsEstados tema={tema} />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público do ChatMessage." />
      <TabelaDeProps
        linhas={[
          { nome: 'autor', tipo: "'professor' | 'agente'", descricao: 'Quem escreveu. Obrigatório.' },
          { nome: 'children', tipo: 'ReactNode', descricao: 'O conteúdo já renderizado.' },
          { nome: 'estado', tipo: "'enviando' | 'transmitindo' | 'pronta' | 'erro'", padrao: "'pronta'", descricao: 'Em que pé está.' },
          { nome: 'fontes', tipo: 'Array<{ titulo: string; paginaInicio?: number; paginaFim?: number }>', descricao: '“Fontes: Título, p. 12–13; …”.' },
          { nome: 'aviso', tipo: 'ReactNode', descricao: 'Faixa curta de atenção.' },
          { nome: 'erro', tipo: 'ReactNode', descricao: 'Texto do erro. Sem ele, um texto padrão por autor.' },
          { nome: 'onRetry', tipo: '() => void', descricao: 'Com erro, mostra “Tentar de novo”.' },
          { nome: 'retryLabel', tipo: 'string', padrao: "'Tentar de novo'", descricao: 'Rótulo do botão.' },
          { nome: 'authorLabel', tipo: 'string', descricao: 'Nome do article. Sem ele: “Você” / “Agente de IA do professor”.' },
          { nome: 'sourcesLabel', tipo: 'string', padrao: "'Fontes'", descricao: 'Rótulo da linha de fontes.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ChatMessage> = {
  title: 'Plataforma Unooria/Componentes/ChatMessage',
  component: ChatMessage,
  parameters: { layout: 'padded' },
  argTypes: {
    autor: { control: 'radio', options: ['professor', 'agente'], description: 'Quem escreveu.' },
    estado: { control: 'radio', options: ['enviando', 'transmitindo', 'pronta', 'erro'], description: 'Em que pé está.' },
    fontes: { control: 'object', description: 'As fontes da resposta.' },
    aviso: { control: 'text', description: 'Aviso curto.' },
    erro: { control: 'text', description: 'Texto do erro.' },
    onRetry: { action: 'onRetry', description: 'Tentar de novo.' },
    retryLabel: { control: 'text', description: 'Rótulo do botão de tentar de novo.' },
    authorLabel: { control: 'text', description: 'Nome do article.' },
    sourcesLabel: { control: 'text', description: 'Rótulo da linha de fontes.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: false, description: 'O conteúdo. No playground: a resposta (agente) ou a pergunta (professor).' },
  },
  args: {
    autor: 'agente',
    estado: 'pronta',
    fontes: FONTES,
    aviso: AVISO,
    erro: '',
    retryLabel: 'Tentar de novo',
    authorLabel: '',
    sourcesLabel: 'Fontes',
    theme: 'light',
    onRetry: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ChatMessage>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatMessageDocumentationPage />,
};

/** Playground com todas as propriedades. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatMessage',
  render: (args) => (
    <Palco rotulo="ChatMessage" tema={args.theme} largura={560}>
      <ChatMessage {...args} erro={args.erro || undefined} authorLabel={args.authorLabel || undefined}>
        {args.autor === 'agente' ? (
          <RichContent theme={args.theme}>
            {args.estado === 'pronta' ? <RespostaEmMarkdown /> : <RespostaParcial />}
          </RichContent>
        ) : (
          PERGUNTA_DO_PROFESSOR
        )}
      </ChatMessage>
    </Palco>
  ),
};

/** A conversa e os estados, nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Palco rotulo="Claro" largura={520}>
        <Conversa />
        <OsEstados />
      </Palco>
      <Palco rotulo="Escuro" tema="dark" largura={520}>
        <Conversa tema="dark" />
        <OsEstados tema="dark" />
      </Palco>
    </div>
  ),
};

const tentarDeNovo = fn();

/**
 * As garantias: o nome de cada mensagem, a região viva do agente ocupada
 * enquanto transmite e livre quando pronta, as fontes formatadas, o aviso com
 * papel de nota e o "Tentar de novo".
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 520 }}>
      <Conversa />
      <OsEstados aoTentar={tentarDeNovo} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const doProfessor = tela.getAllByRole('article', { name: 'Você' });
    const doAgente = tela.getAllByRole('article', { name: 'Agente de IA do professor' });
    await expect(doProfessor).toHaveLength(3);
    await expect(doAgente).toHaveLength(4);

    const [pronta, enviando, transmitindo, comErro] = doAgente;
    for (const mensagem of doAgente) await expect(mensagem).toHaveAttribute('aria-live', 'polite');
    await expect(pronta).not.toHaveAttribute('aria-busy');
    await expect(enviando).toHaveAttribute('aria-busy', 'true');
    await expect(transmitindo).toHaveAttribute('aria-busy', 'true');
    await expect(comErro).not.toHaveAttribute('aria-busy');
    await expect(doProfessor[0]).not.toHaveAttribute('aria-live');

    // Enviando, sem conteúdo: o indicador de escrita.
    await expect(within(enviando).getByRole('status')).toHaveTextContent('está escrevendo');

    // Fontes formatadas e aviso como nota.
    await expect(pronta).toHaveTextContent(
      'Fontes: Caderno do Professor — Matemática 5º ano, p. 12–13; BNCC — Matemática, Anos Iniciais, p. 294'
    );
    await expect(within(pronta).getByRole('note')).toHaveTextContent(AVISO);
    await expect(formatChatMessageSource({ titulo: 'A', paginaInicio: 4, paginaFim: 4 })).toBe('A, p. 4');
    await expect(formatChatMessageSource({ titulo: 'A' })).toBe('A');

    // Erro do agente com tentar de novo; erro do professor como alerta.
    await expect(comErro).toHaveTextContent('Não foi possível gerar a resposta.');
    await userEvent.click(within(comErro).getByRole('button', { name: 'Tentar de novo' }));
    await expect(tentarDeNovo).toHaveBeenCalledTimes(1);
    await expect(within(doProfessor[2]).getByRole('alert')).toHaveTextContent('Não foi possível enviar a mensagem.');
  },
};
