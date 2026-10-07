import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ChoicePoll } from '../../../src/unooriaai/components/ChoicePoll';
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
import {
  uaiPollOptions,
  uaiPollOptionsLong,
  uaiPollQuestion,
  uaiPollQuestionLong,
} from '../fixtures';

const BAR = '#716C98';

/** Opções usadas pelas estórias com `play`, lidas da fixture. */
const [OPCAO_FONTE, OPCAO_GRUPO, OPCAO_ESPERAR, OPCAO_IGNORAR] = uaiPollOptions;

const ENVIADA = 'Resposta enviada ✓';

/**
 * Enquete controlada pelo produto: o voto volta do "servidor" em `value`.
 */
const EnqueteControlada: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const [valor, setValor] = useState<string | null>(null);

  return (
    <ChoicePoll
      question={uaiPollQuestion}
      options={uaiPollOptions}
      value={valor}
      onVote={setValor}
      theme={theme}
    />
  );
};

/**
 * Página de documentação rica do componente ChoicePoll.
 */
const ChoicePollDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="UnooriaAI"
      category="Componentes • Extensões"
      title="ChoicePoll"
      description="Enquete de escolha única: cartão com a pergunta e as opções em linhas de largura total, que quebram em duas ou três linhas sem perder o alvo de toque. Um toque, Enter ou Espaço vota. Depois do voto, as opções travam e a escolhida ganha a superfície invertida e o ponto do rádio — sem contagem, sem porcentagem e sem gabarito: a enquete devolve só o id escolhido, e quem corrige é o servidor."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão Geral & Casos de Uso"
      description="Uma pergunta, um voto, nenhum placar."
    />
    <UaiDocGrid>
      <UaiDocCard icon="👆" title="Um toque vota">
        Não há botão “Enviar”: a opção tocada é o voto, e a enquete trava em seguida. O voto não se
        troca.
      </UaiDocCard>
      <UaiDocCard icon="🙈" title="Sem placar, sem gabarito">
        A enquete não mostra quantos escolheram cada opção e não sabe qual é “certa”: devolve só o{' '}
        <code>id</code>. A correção, quando houver, é do servidor.
      </UaiDocCard>
      <UaiDocCard icon="🎛️" title="Controlada ou não">
        Sem <code>value</code>, guarda o voto sozinha. Com <code>value</code>, o produto manda — e a
        enquete reabre travada depois de recarregar a página.
      </UaiDocCard>
      <UaiDocCard icon="♿" title="Grupo de rádios">
        <code>role=&quot;radiogroup&quot;</code> nomeado pela pergunta e opções com{' '}
        <code>role=&quot;radio&quot;</code>. Um só ponto de parada no Tab; as setas, Home e End
        movem o foco; Enter e Espaço votam. A confirmação entra numa região viva.
      </UaiDocCard>
    </UaiDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações Técnicas"
      description="Cartão, opções, anel do rádio e confirmação."
    />
    <UaiDocSpecs
      component="ChoicePoll"
      layout="Cartão · largura do contêiner"
      specs={[
        { label: 'Cartão', value: '--uai-bg-primary · contorno 1px --uai-fill-8 · raio 12px · recuo 16px' },
        { label: 'Pergunta', value: 'label-lg · Open Sans 600 · 16/24px' },
        { label: 'Opção', value: 'mín. 48px · raio 8px · --uai-web-suggestion · body-md 16/24px' },
        { label: 'Hover', value: '--uai-fill-4 com contorno --uai-fill-8' },
        { label: 'Anel', value: '20px · 2px em --uai-border-control' },
        { label: 'Escolhida', value: '--uai-bg-inverse · --uai-text-inverse · ponto de 10px' },
        { label: 'Travada', value: '--uai-text-secondary sobre --uai-web-suggestion' },
        { label: 'Foco', value: 'anel de 2px em --uai-border-brand' },
        { label: 'Confirmação', value: 'label-md · --uai-text-secondary' },
      ]}
    />
    <UaiDocDecisions
      items={[
        {
          subject: 'Extensão do módulo, sem par na estrutura de origem',
          detail:
            'entrou para a evidência pedagógica de uma missão do produto: a tela de resultado faz perguntas de escolha única cuja correção é só do servidor. Mesmo contrato da DmPoll do Unoovista (voto único, value controlado, sem contagem nem gabarito), com nomes e tokens deste módulo.',
        },
        {
          subject: 'Grupo de rádios, e não botões alternáveis',
          detail:
            'é escolha única dentro de um conjunto, então a semântica é radiogroup com aria-checked. As setas só MOVEM o foco: num rádio nativo elas também marcam, mas aqui marcar é votar, e o voto é definitivo — quem vota é o toque, o Enter ou o Espaço.',
        },
        {
          subject: 'Travada continua focável',
          detail:
            'as opções travadas usam aria-disabled, e não disabled: o leitor de tela precisa achar qual foi a escolha. O ponto de parada do Tab fica na opção escolhida.',
        },
        {
          subject: 'Frases inteiras',
          detail:
            'o corpo das opções é body-md (16/24px), e não o 14px do PromptSuggestion: quem lê são estudantes do ensino médio diante de frases de duas a três linhas. A opção tem 48px no mínimo e cresce com o texto; o anel fica alinhado à primeira linha.',
        },
        {
          subject: 'Escolhida em bg-inverse, como a Tag selecionada',
          detail:
            'text-inverse sobre bg-inverse mede 18,23:1 no claro e 18,20:1 no escuro. Além da cor, o anel ganha o ponto central, para que a escolha não dependa só do matiz — e o ponto passa à cor de texto do sistema no modo de alto contraste forçado.',
        },
        {
          subject: 'Contraste medido nos dois temas',
          detail:
            'texto da opção 14,02:1 (claro) e 14,92:1 (escuro); travada 7,56:1 e 10,79:1; anel 4,61:1 e 7,71:1 em repouso, 4,02:1 e 6,67:1 em hover; foco 4,88:1 e 7,70:1 sobre o cartão; confirmação 8,13:1 e 12,09:1.',
        },
        {
          subject: 'Nenhum glifo novo',
          detail:
            'o sinal do voto é o ponto do rádio, desenhado em CSS; o registro de ícones do módulo não ganhou nome.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do Componente"
      description="Pergunta, opções e confirmação."
    />
    <UaiDocAnatomy
      zones={[
        { name: 'Pergunta', role: 'Nome acessível do grupo de rádios.', token: '--uai-font-label-lg-*' },
        { name: 'Opção', role: 'Botão com role="radio" e aria-checked; cresce com o texto.', token: '--uai-web-suggestion' },
        { name: 'Anel', role: 'Pista de que a linha é escolhível; escolhida, ganha o ponto.', token: '--uai-border-control' },
        { name: 'Confirmação', role: 'Região viva com o texto de sentLabel.', token: '--uai-font-label-md-*' },
      ]}
    />
    <UaiDocStage label="Antes do voto" surface="secondary">
      <div style={{ width: 360 }}>
        <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} />
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de Variantes e Estados"
      description="Antes do voto, respondida, desabilitada e com frases longas."
    />
    <UaiDocStage label="Estados" align="flex-start" surface="secondary">
      <div style={{ width: 300 }}>
        <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} value={null} />
      </div>
      <div style={{ width: 300 }}>
        <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} value={OPCAO_FONTE.id} />
      </div>
      <div style={{ width: 300 }}>
        <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} disabled />
      </div>
    </UaiDocStage>
    <UaiDocStage label="Frases de duas a três linhas" surface="secondary">
      <div style={{ width: 360 }}>
        <ChoicePoll
          question={uaiPollQuestionLong}
          options={uaiPollOptionsLong}
          value={uaiPollOptionsLong[0].id}
        />
      </div>
    </UaiDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas Práticas" description="Regras de uso da enquete." />
    <UaiDocPractices
      dos={[
        'Guardar o voto no servidor e devolvê-lo em value ao reabrir a tela.',
        'Passar disabled enquanto o voto está sendo enviado, para impedir um segundo voto.',
        'Deixar a correção, se houver, para o servidor.',
        'Escrever as opções como frases inteiras: a opção quebra linha e cresce.',
      ]}
      donts={[
        'Mostrar acerto ou erro dentro da enquete depois do voto.',
        'Exibir contagem ou porcentagem de votos dos colegas.',
        'Permitir trocar o voto depois de enviado.',
        'Mandar ao navegador qual opção é a certa.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a Temas"
      description="Cartão, opções, anel e confirmação acompanham o tema."
    />
    <UaiDocThemeSwitcher surface="secondary">
      {(activeTheme) => (
        <div style={{ width: 360 }}>
          <ChoicePoll
            question={uaiPollQuestion}
            options={uaiPollOptions}
            value={OPCAO_GRUPO.id}
            theme={activeTheme}
          />
        </div>
      )}
    </UaiDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente ChoicePoll."
    />
    <UaiDocPropsTable
      title="ChoicePoll"
      rows={[
        { name: 'question', type: 'React.ReactNode', description: 'A pergunta; nomeia o grupo de rádios. Obrigatório.' },
        { name: 'options', type: 'UaiChoicePollOption[]', description: 'As opções ({ id, label }). Obrigatório.' },
        {
          name: 'value',
          type: 'string | null',
          description: 'Ausente: não controlada. string: voto enviado (trava). null: ainda não respondeu (controlada).',
        },
        { name: 'onVote', type: '(id: string) => void', description: 'Chamado com o id escolhido, uma vez por voto.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Trava sem ter votado.' },
        {
          name: 'sentLabel',
          type: 'React.ReactNode',
          default: "'Resposta enviada ✓'",
          description: 'Confirmação exibida depois do voto.',
        },
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

const meta: Meta<typeof ChoicePoll> = {
  title: 'UnooriaAI/Componentes/ChoicePoll',
  component: ChoicePoll,
  parameters: { layout: 'padded' },
  argTypes: {
    question: { control: 'text', description: 'A pergunta.' },
    options: { control: 'object', description: 'As opções.' },
    value: {
      control: 'select',
      options: [undefined, null, ...uaiPollOptions.map((opcao) => opcao.id)],
      description: 'Voto (ausente = não controlada; null = ainda não respondeu).',
    },
    disabled: { control: 'boolean', description: 'Trava sem ter votado.' },
    sentLabel: { control: 'text', description: 'Confirmação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    onVote: { action: 'onVote' },
  },
  args: {
    question: uaiPollQuestion,
    options: uaiPollOptions,
    disabled: false,
    sentLabel: ENVIADA,
    theme: 'light',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof ChoicePoll>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChoicePollDocumentationPage />,
};

/**
 * Playground com todas as propriedades da ChoicePoll expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da ChoicePoll',
  render: (args) => (
    <div
      data-uai-theme={args.theme}
      style={{ width: 380, padding: 24, backgroundColor: 'var(--uai-bg-secondary)' }}
    >
      <ChoicePoll {...args} />
    </div>
  ),
};

/**
 * A enquete com frases inteiras, respondida, sobre a superfície da conversa.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UaiDocStage surface="secondary">
      <div style={{ width: 420 }}>
        <ChoicePoll question={uaiPollQuestionLong} options={uaiPollOptionsLong} />
      </div>
    </UaiDocStage>
  ),
};

/**
 * Controlada e ainda não respondida (`value={null}`): o toque chama `onVote`,
 * mas a enquete só trava quando o produto devolve o `id` em `value`.
 */
export const NaoRespondida: Story = {
  name: 'Não respondida',
  args: { onVote: fn() },
  render: (args) => (
    <div style={{ width: 340 }}>
      <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} value={null} onVote={args.onVote} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const grupo = tela.getByRole('radiogroup', { name: uaiPollQuestion });
    const radios = within(grupo).getAllByRole('radio');

    await expect(radios).toHaveLength(uaiPollOptions.length);
    for (const radio of radios) {
      await expect(radio).toHaveAttribute('aria-checked', 'false');
      await expect(radio).not.toHaveAttribute('aria-disabled');
    }
    await expect(tela.getByRole('status')).toBeEmptyDOMElement();

    await userEvent.click(within(grupo).getByRole('radio', { name: OPCAO_ESPERAR.label }));
    await expect(args.onVote).toHaveBeenCalledTimes(1);
    await expect(args.onVote).toHaveBeenCalledWith(OPCAO_ESPERAR.id);
    // O produto ainda não devolveu o id: nada trava sozinho.
    await expect(within(grupo).getByRole('radio', { name: OPCAO_ESPERAR.label })).toHaveAttribute(
      'aria-checked',
      'false'
    );
  },
};

/**
 * Respondida (`value` com o `id` já enviado): reabre travada, com a escolha
 * marcada e a confirmação visível. Um novo toque não vota.
 */
export const Respondida: Story = {
  name: 'Respondida (travada)',
  args: { onVote: fn() },
  render: (args) => (
    <div style={{ width: 340 }}>
      <ChoicePoll
        question={uaiPollQuestion}
        options={uaiPollOptions}
        value={OPCAO_FONTE.id}
        onVote={args.onVote}
      />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const fonte = tela.getByRole('radio', { name: OPCAO_FONTE.label });
    const ignorar = tela.getByRole('radio', { name: OPCAO_IGNORAR.label });

    await expect(fonte).toHaveAttribute('aria-checked', 'true');
    await expect(fonte).toHaveAttribute('tabindex', '0');
    for (const radio of tela.getAllByRole('radio')) {
      await expect(radio).toHaveAttribute('aria-disabled', 'true');
    }
    await expect(tela.getByRole('status')).toHaveTextContent(ENVIADA);

    await userEvent.click(ignorar);
    await expect(ignorar).toHaveAttribute('aria-checked', 'false');
    await expect(args.onVote).not.toHaveBeenCalled();
  },
};

/**
 * Desabilitada sem voto: nada responde ao toque nem ao teclado.
 */
export const Desabilitada: Story = {
  args: { onVote: fn() },
  render: (args) => (
    <div style={{ width: 340 }}>
      <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} disabled onVote={args.onVote} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const grupo = within(tela.getByRole('radiogroup', { name: uaiPollQuestion }));

    for (const radio of grupo.getAllByRole('radio')) {
      await expect(radio).toHaveAttribute('aria-disabled', 'true');
    }
    await userEvent.click(grupo.getByRole('radio', { name: OPCAO_GRUPO.label }));
    await expect(args.onVote).not.toHaveBeenCalled();
    await expect(grupo.getByRole('radio', { name: OPCAO_GRUPO.label })).toHaveAttribute(
      'aria-checked',
      'false'
    );
    await expect(tela.getByRole('status')).toBeEmptyDOMElement();
  },
};

/**
 * Não controlada: um toque vota, trava e anuncia a confirmação — uma vez só.
 */
export const NaoControlada: Story = {
  name: 'Não controlada',
  args: { onVote: fn() },
  render: (args) => (
    <div style={{ width: 340 }}>
      <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} onVote={args.onVote} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const grupo = within(tela.getByRole('radiogroup', { name: uaiPollQuestion }));
    const escolhida = grupo.getByRole('radio', { name: OPCAO_GRUPO.label });

    await userEvent.click(escolhida);
    await expect(escolhida).toHaveAttribute('aria-checked', 'true');
    await expect(tela.getByRole('status')).toHaveTextContent(ENVIADA);

    const outra = grupo.getByRole('radio', { name: OPCAO_FONTE.label });
    await expect(outra).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(outra);
    await expect(outra).toHaveAttribute('aria-checked', 'false');
    await expect(args.onVote).toHaveBeenCalledTimes(1);
    await expect(args.onVote).toHaveBeenCalledWith(OPCAO_GRUPO.id);
  },
};

/**
 * Controlada: com `value={null}`, só trava quando o produto devolve o id.
 */
export const Controlada: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <EnqueteControlada />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await userEvent.click(tela.getByRole('radio', { name: OPCAO_IGNORAR.label }));
    await expect(tela.getByRole('radio', { name: OPCAO_IGNORAR.label })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    await expect(tela.getByRole('radio', { name: OPCAO_FONTE.label })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    await expect(tela.getByRole('status')).toHaveTextContent(ENVIADA);
  },
};

/**
 * Só teclado: o Tab entra no grupo por um único ponto, as setas (com volta),
 * Home e End movem o foco sem votar, e Enter vota. Depois do voto, Espaço não
 * vota de novo.
 */
export const Teclado: Story = {
  name: 'Só teclado',
  args: { onVote: fn() },
  render: (args) => (
    <div style={{ width: 340 }}>
      <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} onVote={args.onVote} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const [fonte, turma, esperar, ignorar] = tela.getAllByRole('radio');

    await expect(fonte).toHaveAttribute('tabindex', '0');
    await expect(turma).toHaveAttribute('tabindex', '-1');

    await userEvent.tab();
    await expect(fonte).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    await expect(turma).toHaveFocus();
    await expect(turma).toHaveAttribute('tabindex', '0');
    await expect(fonte).toHaveAttribute('tabindex', '-1');

    await userEvent.keyboard('{End}');
    await expect(ignorar).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(fonte).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(ignorar).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(fonte).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await expect(esperar).toHaveFocus();

    // Mover o foco não vota.
    await expect(args.onVote).not.toHaveBeenCalled();
    for (const radio of [fonte, turma, esperar, ignorar]) {
      await expect(radio).toHaveAttribute('aria-checked', 'false');
    }

    await userEvent.keyboard('{Enter}');
    await expect(esperar).toHaveAttribute('aria-checked', 'true');
    await expect(args.onVote).toHaveBeenCalledTimes(1);
    await expect(args.onVote).toHaveBeenCalledWith(OPCAO_ESPERAR.id);
    await expect(tela.getByRole('status')).toHaveTextContent(ENVIADA);

    await userEvent.keyboard('{ArrowDown}');
    await expect(ignorar).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(ignorar).toHaveAttribute('aria-checked', 'false');
    await expect(args.onVote).toHaveBeenCalledTimes(1);
  },
};

/**
 * Frases de duas a três linhas numa coluna estreita: a opção cresce, o anel
 * fica na primeira linha e nada vaza.
 */
export const TextosLongos: Story = {
  name: 'Textos longos',
  render: () => (
    <UaiDocStage surface="secondary" align="flex-start">
      <div style={{ width: 320 }}>
        <ChoicePoll question={uaiPollQuestionLong} options={uaiPollOptionsLong} />
      </div>
      <div style={{ width: 320 }}>
        <ChoicePoll
          question={uaiPollQuestionLong}
          options={uaiPollOptionsLong}
          value={uaiPollOptionsLong[1].id}
        />
      </div>
    </UaiDocStage>
  ),
  play: async ({ canvasElement }) => {
    for (const radio of within(canvasElement).getAllByRole('radio')) {
      await expect(radio.scrollWidth).toBeLessThanOrEqual(radio.clientWidth);
    }
  },
};

/**
 * Tema escuro, por `theme` e por herança de `data-uai-theme`.
 */
export const ModoEscuro: Story = {
  name: 'Modo escuro',
  render: () => (
    <UaiDocStage theme="dark" surface="secondary" align="flex-start">
      <div style={{ width: 320 }}>
        <EnqueteControlada />
      </div>
      <div style={{ width: 320 }}>
        <ChoicePoll question={uaiPollQuestion} options={uaiPollOptions} value={OPCAO_GRUPO.id} />
      </div>
      <div style={{ width: 320 }}>
        <ChoicePoll question={uaiPollQuestionLong} options={uaiPollOptionsLong} disabled />
      </div>
    </UaiDocStage>
  ),
};
