import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ChatLauncher } from '../../../src/unooria/components/ChatLauncher';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';
import { AlternadorDeTema, Cartao, Grade, Janela, Palco, Praticas, TabelaDeProps } from './agente/docKit';

const Legenda: React.FC<{ children: React.ReactNode; tema?: UnooriaTheme }> = ({ children, tema = 'light' }) => (
  <code
    style={{
      fontSize: 12,
      color: tema === 'dark' ? 'var(--unooria-color-neutraldark-900)' : 'var(--unooria-color-neutral-700)',
    }}
  >
    {children}
  </code>
);

const Matriz: React.FC<{ tema?: UnooriaTheme }> = ({ tema = 'light' }) => (
  <>
    {[
      { rotulo: 'fechado', props: {} },
      { rotulo: 'aberto (expanded)', props: { expanded: true } },
      { rotulo: 'badge={3}', props: { badge: 3 } },
      { rotulo: 'badge={12} (9+)', props: { badge: 12 } },
      { rotulo: 'badge (ponto)', props: { badge: true } },
    ].map(({ rotulo, props }) => (
      <div key={rotulo} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <ChatLauncher placement="inline" theme={tema} {...props} />
        <Legenda tema={tema}>{rotulo}</Legenda>
      </div>
    ))}
  </>
);

const ChatLauncherDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<UnooriaTheme>('light');
  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agente de IA do professor"
        title="ChatLauncher"
        description="O botão flutuante que abre o agente de IA do professor: um círculo de 64px com o mascote, fixo no canto inferior direito, com o estado aberto/fechado em aria-expanded e um selo opcional de respostas novas."
      />

      <UnooriaDocSectionHeader title="1. Visão Geral & Casos de Uso" description="O único ponto de entrada do agente." />
      <Grade>
        <Cartao icone="🔘" titulo="Abrir e fechar">
          Padrão “disclosure”: <code>aria-expanded</code> diz se o painel está aberto e <code>aria-controls</code>{' '}
          aponta o <code>id</code> do <code>ChatPanel</code>.
        </Cartao>
        <Cartao icone="🔴" titulo="Respostas novas">
          <code>badge</code> com número (até 9+) ou ponto, para a resposta que chegou com o painel fechado.
        </Cartao>
        <Cartao icone="📍" titulo="Fixo no canto">
          <code>bottom-right</code> (padrão) ou <code>bottom-left</code>, a 24px da borda somados à área segura do
          aparelho.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="2. Figma & Especificações Técnicas" description="Design próprio: a seção não tem quadro de botão flutuante." />
      <Grade>
        <Cartao icone="📐" titulo="Medidas">
          Círculo de 64px (acima dos 52px do <code>Button</code> <code>lg</code>), anel de 2px{' '}
          <code>brandpurple-300</code> (500 no hover, 600 aberto), fundo <code>neutral-50</code>, sombra{' '}
          <code>elevation-brand-secondary</code>. O mascote ocupa 56px. Selo: o <code>Badge</code>{' '}
          <code>error</code>.
        </Cartao>
        <Cartao icone="🧭" titulo="Posição por variável">
          <code>--unooria-chat-offset</code> (24px), <code>--unooria-chat-launcher-size</code> (64px) e{' '}
          <code>--unooria-chat-z-index</code> (1000, abaixo do véu do <code>Modal</code>). O produto troca num ancestral
          (o <code>body</code>) e o <code>ChatPanel</code> acompanha.
        </Cartao>
        <Cartao icone="🗣️" titulo="Nome estável">
          O nome é sempre “Agente de IA do professor”; o selo entra pela <strong>descrição</strong> (“3 respostas
          novas”). Um nome que muda a cada resposta confunde quem navega por botões.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="3. Anatomia do Componente" description="Botão, mascote, selo e descrição." />
      <Grade>
        <Cartao icone="1" titulo="Botão">
          <code>&lt;button&gt;</code> com <code>aria-label</code>, <code>aria-expanded</code> e <code>aria-controls</code>.
        </Cartao>
        <Cartao icone="2" titulo="Mascote">O <code>AgentAvatar</code>, decorativo.</Cartao>
        <Cartao icone="3" titulo="Selo">
          O <code>Badge</code> no canto, <code>aria-hidden</code>; o texto dele vai à descrição.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader title="4. Matriz de Variantes, Tamanhos e Estados" description="Fechado, aberto e com selo." />
      <Palco rotulo='placement="inline" para a documentação' direcao="row">
        <Matriz />
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do botão." />
      <Praticas
        fazer={[
          'Ligar controls ao id do ChatPanel e expanded ao estado do painel.',
          'Devolver o foco ao botão quando o painel fechar pelo Esc.',
          'Mostrar o selo só para resposta que chegou com o painel fechado.',
        ]}
        evitar={[
          'Mudar o label conforme o estado — o aria-expanded já diz.',
          'Um segundo botão flutuante no mesmo canto.',
          'Esconder o botão atrás de um Modal: o z-index dele é 1000 de propósito.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <AlternadorDeTema tema={tema} aoMudar={setTema} />
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} tema={tema} direcao="row">
        <Matriz tema={tema} />
      </Palco>

      <UnooriaDocSectionHeader title="7. Referência Completa de Props da API" description="Contrato público do ChatLauncher." />
      <TabelaDeProps
        linhas={[
          { nome: 'expanded', tipo: 'boolean', padrao: 'false', descricao: 'O painel está aberto (aria-expanded).' },
          { nome: 'controls', tipo: 'string', descricao: 'O id do painel (aria-controls).' },
          { nome: 'label', tipo: 'string', padrao: "'Agente de IA do professor'", descricao: 'Nome acessível, estável.' },
          { nome: 'badge', tipo: 'number | boolean', descricao: 'Selo: número (9+) ou ponto. 0/false: sem selo.' },
          { nome: 'badgeLabel', tipo: 'string', descricao: 'Texto do selo para quem não o vê. Sem ele: “N respostas novas”.' },
          { nome: 'placement', tipo: "'bottom-right' | 'bottom-left' | 'inline'", padrao: "'bottom-right'", descricao: 'Onde o botão fica.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
          { nome: '...rest', tipo: 'ButtonHTMLAttributes', descricao: 'onClick, id, etc. vão ao <button>.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ChatLauncher> = {
  title: 'Plataforma Unooria/Componentes/ChatLauncher',
  component: ChatLauncher,
  parameters: { layout: 'padded' },
  argTypes: {
    expanded: { control: 'boolean', description: 'O painel está aberto (aria-expanded).' },
    controls: { control: 'text', description: 'O id do painel (aria-controls).' },
    label: { control: 'text', description: 'Nome acessível.' },
    badge: { control: 'number', description: 'Selo com número (0 = sem selo).' },
    badgeLabel: { control: 'text', description: 'Texto do selo para o leitor de tela.' },
    placement: { control: 'radio', options: ['bottom-right', 'bottom-left', 'inline'], description: 'Onde o botão fica.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    expanded: false,
    controls: 'painel-do-agente',
    label: 'Agente de IA do professor',
    badge: 2,
    badgeLabel: '',
    placement: 'bottom-right',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ChatLauncher>;

/** Documentação rica e completa do componente. */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatLauncherDocumentationPage />,
};

/** Playground: o botão preso no canto de uma "janela" de 320px. */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatLauncher',
  render: (args) => (
    <Janela altura={320} tema={args.theme}>
      <ChatLauncher {...args} badgeLabel={args.badgeLabel || undefined} />
    </Janela>
  ),
};

/** Fechado, aberto e com selo, nos dois temas. */
export const TodasVariantes: Story = {
  name: '🎨 Todas as Variantes',
  render: () => (
    <>
      <Palco rotulo="Claro" direcao="row">
        <Matriz />
      </Palco>
      <Palco rotulo="Escuro" tema="dark" direcao="row">
        <Matriz tema="dark" />
      </Palco>
    </>
  ),
};

/** Um painel fictício só para o botão ter o que controlar. */
const Alternavel: React.FC = () => {
  const [aberto, setAberto] = useState(false);
  return (
    <Janela altura={320}>
      <div id="painel-demo" hidden={!aberto} style={{ padding: 16 }}>
        Painel aberto
      </div>
      <ChatLauncher expanded={aberto} controls="painel-demo" badge={aberto ? undefined : 3} onClick={() => setAberto((v) => !v)} />
    </Janela>
  );
};

/**
 * As garantias: nome estável, aria-expanded alterna, aria-controls aponta o
 * painel, o selo vai para a descrição e some quando o painel abre.
 */
export const Estados: Story = {
  render: () => <Alternavel />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const botao = tela.getByRole('button', { name: 'Agente de IA do professor' });

    await expect(botao).toHaveAttribute('aria-expanded', 'false');
    await expect(botao).toHaveAttribute('aria-controls', 'painel-demo');
    await expect(botao).toHaveAccessibleDescription('3 respostas novas');

    await userEvent.click(botao);
    await expect(botao).toHaveAttribute('aria-expanded', 'true');
    // O nome não mudou; o selo saiu com o painel aberto.
    await expect(tela.getByRole('button', { name: 'Agente de IA do professor' })).toBe(botao);
    await expect(botao).not.toHaveAccessibleDescription();
    await expect(tela.getByText('Painel aberto')).toBeVisible();

    await userEvent.click(botao);
    await expect(botao).toHaveAttribute('aria-expanded', 'false');
  },
};
