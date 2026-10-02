import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { StoryPoll } from '../../../src/unoovista/components/StoryPoll';
import { StoryViewer } from '../../../src/unoovista/components/StoryViewer';
import { PhoneFrame } from '../../../src/unoovista/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocCard,
  UnvDocGrid,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocStage,
  UnvDocThemeSwitcher,
  UnvDocPropsTable,
} from '../../../.storybook/components';
import { unvAvatars, unvStoryFrames, unvStoryPollLonga, unvStoryPolls } from '../fixtures';

const [PRIMEIRA] = unvStoryPolls;
const [OPCAO_CURTI, OPCAO_SORTEIO] = PRIMEIRA.options;

const FUNDOS = [unvStoryFrames.aurora, unvStoryFrames.mar, unvStoryFrames.formas];

/**
 * A sequência como no produto: uma figurinha por segmento da história. O
 * avanço só destrava depois do voto, e os votos voltam em `value` — a
 * figurinha reabre travada se a pessoa voltar.
 */
const HistoriaComEnquetes: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [indice, setIndice] = useState(0);
  const [votos, setVotos] = useState<Record<string, string>>({});
  const atual = unvStoryPolls[indice];
  const votou = votos[atual.id] !== undefined;

  return (
    <div data-unv-theme={theme} style={{ width: 345 }}>
      <PhoneFrame height={620} withStatusBar={false} framed={false}>
        <StoryViewer
          theme={theme}
          mediaSrc={FUNDOS[indice % FUNDOS.length]}
          mediaAlt="Ilustração abstrata em roxo, fundo da enquete"
          username="comissao.mostra"
          avatarSrc={unvAvatars.paulaNeves}
          timestamp="agora"
          segments={unvStoryPolls.length}
          currentSegment={indice + 1}
          segmentProgress={votou ? 1 : 0}
          onPrev={() => setIndice((valor) => Math.max(valor - 1, 0))}
          onNext={
            votou ? () => setIndice((valor) => Math.min(valor + 1, unvStoryPolls.length - 1)) : undefined
          }
        >
          <StoryPoll
            key={atual.id}
            question={atual.question}
            options={atual.options}
            value={votos[atual.id] ?? null}
            onVote={(id) => setVotos((anteriores) => ({ ...anteriores, [atual.id]: id }))}
            theme={theme}
          />
        </StoryViewer>
      </PhoneFrame>
    </div>
  );
};

/**
 * Página de documentação rica do componente StoryPoll.
 */
const StoryPollDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="StoryPoll"
      description="Figurinha de enquete colada sobre a mídia de uma história: um cartão flutuante com a pergunta e as opções em cápsulas, um toque por voto. Depois do voto, as opções travam e a votada ganha o roxo de ação e um sinal de confirmação — sem contagem, sem porcentagem e sem gabarito: a figurinha devolve só o id escolhido."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma pergunta por história, um voto, nenhum placar."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🏷️" title="Vai sobre a mídia">
        Entra na camada <code>children</code> do <code>StoryViewer</code> e se centraliza sozinha no
        palco. As zonas de toque em volta continuam avançando e voltando a história.
      </UnvDocCard>
      <UnvDocCard icon="🙈" title="Sem placar, sem gabarito">
        Não mostra quantos votaram em cada opção e não sabe qual é “certa”: devolve só o{' '}
        <code>id</code>. Mesmo contrato da <code>DmPoll</code>.
      </UnvDocCard>
      <UnvDocCard icon="🎛️" title="Controlada ou não">
        Sem <code>value</code>, guarda o voto sozinha. Com <code>value</code>, o produto manda — e a
        figurinha reabre travada depois de recarregar a página.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Botões com aria-pressed">
        Um <code>role=&quot;group&quot;</code> nomeado pela pergunta; travadas, as opções continuam
        focáveis (<code>aria-disabled</code>). A confirmação entra numa região viva.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Figurinha, pergunta, opções, marca de voto e confirmação."
    />
    <UnvDocSpecs
      component="StoryPoll"
      layout="Figurinha · de 220 a 320px · centralizada no palco da história"
      specs={[
        { label: 'Figurinha', value: 'background-elevated · elevation-overlay · 24px de raio' },
        { label: 'Pergunta', value: 'title-lg · Open Sans 600 · 18/28px · centralizada' },
        { label: 'Opção', value: '44px · raio de 22px (cápsula numa linha) · fill-field · title-sm' },
        { label: 'Marca', value: 'anel de 20px em border-control, à direita' },
        { label: 'Votada', value: 'action-primary · text-on-action · marca cheia com check' },
        { label: 'Travada', value: 'text-secondary sobre fill-field' },
        { label: 'Confirmação', value: 'label-md · text-secondary · centralizada' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Por que existe, ao lado da DmPoll',
          detail:
            'a DmPoll é conteúdo de conversa (cartão em background-primary dentro do balão). Sobre a mídia de uma história, a enquete é uma camada flutuante — background-elevated com elevation-overlay, a mesma regra da doca e das folhas. Pedida em 2026-10-02 pela missão “O Júri Estadual de Projetos” do monorepo consumidor, para as perguntas finais em histórias.',
        },
        {
          subject: 'Sem barras de votos',
          detail:
            'enquetes de histórias costumam mostrar a porcentagem de cada opção depois do voto. Aqui não: quem vota não vê a escolha dos outros, e a figurinha não sabe se uma opção é “certa” — devolve só o id.',
        },
        {
          subject: 'Cápsulas com a marca à direita',
          detail:
            'a figurinha é uma pilha de cápsulas; a marca fica no fim da linha para o rótulo começar alinhado. Votada, vira disco com o glifo check do registro — a escolha não depende só da cor. O contorno da cápsula é border-default: no escuro, background-elevated, fill-field e border-subtle têm o mesmo valor, e a cápsula sumiria.',
        },
        {
          subject: 'Contraste',
          detail:
            'text-on-action sobre action-primary mede 4,88:1 (claro) e 8,27:1 (escuro); text-secondary sobre fill-field, 7,05:1 e 7,54:1; o anel de border-control, 4,30:1 e 5,39:1 sobre fill-field.',
        },
        {
          subject: 'Centralização dentro do StoryViewer',
          detail:
            'o seletor .unv-story-viewer__overlay > .unv-story-poll posiciona a figurinha no meio do palco, com spacing-xxl nas laterais; fora do visualizador ela é um bloco comum, até 320px.',
        },
        {
          subject: 'Raio fixo de 22px, não radius-full',
          detail:
            'numa linha, a opção de 44px com raio de 22px é a mesma cápsula. Quando o texto quebra em várias linhas, radius-full vira um semicírculo do tamanho da altura e a curva come o começo e o fim do texto; com o raio fixo, os cantos ficam de 22px e o texto não encosta. Corrigido na 0.2.13.',
        },
        {
          subject: 'Tokens locais',
          detail:
            '--unv-story-poll-mark-size (20px): o diâmetro visual do anel; o alvo de toque é a cápsula de 44px. --unv-story-poll-option-radius (metade do alvo de toque): o raio da opção.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Pergunta, opções e confirmação — sobre a mídia da história."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Figurinha', role: 'Camada flutuante sobre a mídia.', token: '--unv-color-background-elevated' },
        { name: 'Pergunta', role: 'Nome acessível do grupo de opções.', token: 'title-lg' },
        { name: 'Opção', role: 'Cápsula de largura total com aria-pressed.', token: '--unv-color-fill-field' },
        { name: 'Marca', role: 'Anel; votada, vira disco com check.', token: '--unv-color-border-control' },
        { name: 'Confirmação', role: 'Região viva com o texto de sentLabel.', token: 'label-md' },
      ]}
    />
    <UnvDocStage label="Na história" align="flex-start" surface="secondary">
      <HistoriaComEnquetes />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Antes do voto, votada, desabilitada e com duas ou quatro opções."
    />
    <UnvDocStage label="Estados" align="flex-start" surface="secondary">
      <StoryPoll question={PRIMEIRA.question} options={PRIMEIRA.options} />
      <StoryPoll question={PRIMEIRA.question} options={PRIMEIRA.options} value={OPCAO_CURTI.id} />
      <StoryPoll question={PRIMEIRA.question} options={PRIMEIRA.options} disabled />
    </UnvDocStage>
    <UnvDocStage label="Quantidade de opções" align="flex-start" surface="secondary">
      <StoryPoll question={unvStoryPolls[1].question} options={unvStoryPolls[1].options} />
      <StoryPoll question={unvStoryPolls[2].question} options={unvStoryPolls[2].options} />
    </UnvDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da figurinha." />
    <UnvDocPractices
      dos={[
        'Uma figurinha por segmento da história; destravar o avanço só depois do voto, se a pergunta for obrigatória.',
        'Guardar o voto no servidor e devolvê-lo em value ao reabrir.',
        'Deixar a correção, se houver, para o servidor.',
      ]}
      donts={[
        'Mostrar acerto ou erro depois do voto.',
        'Exibir contagem ou porcentagem de votos dos colegas.',
        'Passar de quatro opções: a figurinha cobre a mídia.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Figurinha, opções, marca e confirmação acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary">
      {(activeTheme) => <HistoriaComEnquetes theme={activeTheme} />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente StoryPoll."
    />
    <UnvDocPropsTable
      title="StoryPoll"
      rows={[
        { name: 'question', type: 'React.ReactNode', description: 'A pergunta; nomeia o grupo. Obrigatório.' },
        {
          name: 'options',
          type: 'UnvStoryPollOption[]',
          description: 'As opções ({ id, label }), de 2 a 4. Obrigatório.',
        },
        {
          name: 'value',
          type: 'string | null',
          description: 'Ausente: não controlada. string: voto enviado. null: ainda não votou (controlada).',
        },
        { name: 'onVote', type: '(id: string) => void', description: 'Chamado com o id escolhido.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Trava sem ter votado.' },
        {
          name: 'sentLabel',
          type: 'React.ReactNode',
          default: "'Resposta enviada'",
          description: 'Confirmação exibida depois do voto.',
        },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema visual; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoryPoll> = {
  title: 'Unoovista/Componentes/StoryPoll',
  component: StoryPoll,
  parameters: { layout: 'padded' },
  argTypes: {
    question: { control: 'text', description: 'A pergunta.' },
    options: { control: 'object', description: 'As opções.' },
    value: {
      control: 'select',
      options: [undefined, null, ...PRIMEIRA.options.map((opcao) => opcao.id)],
      description: 'Voto (ausente = não controlada).',
    },
    disabled: { control: 'boolean', description: 'Trava sem ter votado.' },
    sentLabel: { control: 'text', description: 'Confirmação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onVote: { action: 'onVote' },
  },
  args: {
    question: PRIMEIRA.question,
    options: PRIMEIRA.options,
    disabled: false,
    sentLabel: 'Resposta enviada',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof StoryPoll>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StoryPollDocumentationPage />,
};

/**
 * Playground com todas as propriedades da StoryPoll expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da StoryPoll',
  render: (args) => (
    <div
      data-unv-theme={args.theme}
      style={{ width: 340, padding: 16, backgroundColor: 'var(--unv-color-background-secondary)' }}
    >
      <StoryPoll {...args} />
    </div>
  ),
};

/**
 * Em contexto: três figurinhas, uma por segmento, sobre a mídia da história.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto',
  render: () => <HistoriaComEnquetes />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // Antes do voto não há zona de avançar: a pergunta é obrigatória.
    await expect(tela.queryByRole('button', { name: 'Próxima história' })).toBeNull();
    await userEvent.click(tela.getByRole('button', { name: OPCAO_CURTI.label }));
    await expect(tela.getByRole('status')).toHaveTextContent('Resposta enviada');

    await userEvent.click(tela.getByRole('button', { name: 'Próxima história' }));
    await expect(tela.getByRole('group', { name: unvStoryPolls[1].question })).toBeInTheDocument();

    // Voltar reabre a primeira travada, com o voto devolvido em `value`.
    await userEvent.click(tela.getByRole('button', { name: 'História anterior' }));
    await expect(tela.getByRole('button', { name: OPCAO_CURTI.label })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(tela.getByRole('button', { name: OPCAO_SORTEIO.label })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  },
};

/**
 * Não controlada: um toque vota, trava e anuncia a confirmação — uma vez só.
 */
export const Estados: Story = {
  args: { onVote: fn() },
  render: (args) => (
    <StoryPoll question={PRIMEIRA.question} options={PRIMEIRA.options} onVote={args.onVote} />
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const grupo = tela.getByRole('group', { name: PRIMEIRA.question });
    const curti = within(grupo).getByRole('button', { name: OPCAO_CURTI.label });

    await expect(curti).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(curti);
    await expect(curti).toHaveAttribute('aria-pressed', 'true');
    await expect(tela.getByRole('status')).toHaveTextContent('Resposta enviada');

    const sorteio = within(grupo).getByRole('button', { name: OPCAO_SORTEIO.label });
    await expect(sorteio).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(sorteio);
    await expect(sorteio).toHaveAttribute('aria-pressed', 'false');
    await expect(args.onVote).toHaveBeenCalledTimes(1);
    await expect(args.onVote).toHaveBeenCalledWith(OPCAO_CURTI.id);
  },
};

/**
 * Opções longas: o texto quebra em várias linhas e os cantos não o cortam.
 */
export const OpcoesLongas: Story = {
  name: 'Opções longas',
  render: () => (
    <div data-unv-theme="dark" style={{ width: 345, padding: 16, backgroundColor: 'var(--unv-color-background-secondary)' }}>
      <StoryPoll question={unvStoryPollLonga.question} options={unvStoryPollLonga.options} />
    </div>
  ),
};

/**
 * Desabilitada: nenhum toque vota.
 */
export const Desabilitada: Story = {
  args: { onVote: fn() },
  render: (args) => (
    <StoryPoll question={PRIMEIRA.question} options={PRIMEIRA.options} disabled onVote={args.onVote} />
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(tela.getByRole('button', { name: OPCAO_CURTI.label }));
    await expect(args.onVote).not.toHaveBeenCalled();
    await expect(tela.getByRole('status')).toBeEmptyDOMElement();
  },
};
