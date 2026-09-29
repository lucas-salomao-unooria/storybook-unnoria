import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { DmPoll } from '../../../src/unoovista/components/DmPoll';
import { MessageBubble } from '../../../src/unoovista/components/MessageBubble';
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
import { unvPollOptions, unvThreadContact } from '../fixtures';

const PERGUNTA = 'O que mais pesou na sua escolha?';

/** Opções usadas pelas estórias com `play`, lidas da fixture. */
const [OPCAO_FOTO, OPCAO_UTIL, , OPCAO_CONFIANCA] = unvPollOptions as {
  id: string;
  label: string;
}[];

/**
 * A enquete enviada pela outra pessoa, dentro da conversa — como no produto.
 */
const EnqueteNaConversa: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: 345 }}>
    <MessageBubble direction="incoming" position="first" theme={theme}>
      Última pergunta, prometo!
    </MessageBubble>
    <MessageBubble
      direction="incoming"
      position="last"
      bare
      avatarSrc={unvThreadContact.avatarSrc}
      senderLabel="Amara"
      theme={theme}
    >
      <DmPoll question={PERGUNTA} options={unvPollOptions} theme={theme} />
    </MessageBubble>
  </div>
);

/**
 * Enquete controlada pelo produto: o voto volta do "servidor" em `value`.
 */
const EnqueteControlada: React.FC = () => {
  const [valor, setValor] = useState<string | null>(null);

  return (
    <div style={{ width: 300 }}>
      <DmPoll question={PERGUNTA} options={unvPollOptions} value={valor} onVote={setValor} />
    </div>
  );
};

/**
 * Página de documentação rica do componente DmPoll.
 */
const DmPollDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Extensões"
      title="DmPoll"
      description="Enquete dentro da conversa: cartão com a pergunta e as opções em botões de largura total, um toque por voto. Depois do voto, as opções travam e a votada ganha o roxo de ação e um sinal de confirmação — sem contagem, sem porcentagem e sem gabarito: a enquete devolve só o id escolhido."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma pergunta, um voto, nenhum placar."
    />
    <UnvDocGrid>
      <UnvDocCard icon="👆" title="Um toque vota">
        Não há botão “Votar”: a opção tocada é o voto, e a enquete trava em seguida.
      </UnvDocCard>
      <UnvDocCard icon="🙈" title="Sem placar, sem gabarito">
        A enquete não mostra quantos votaram em cada opção e não sabe qual é “certa”: devolve só o{' '}
        <code>id</code>.
      </UnvDocCard>
      <UnvDocCard icon="🎛️" title="Controlada ou não">
        Sem <code>value</code>, guarda o voto sozinha. Com <code>value</code>, o produto manda — e a
        enquete reabre travada depois de recarregar a página.
      </UnvDocCard>
      <UnvDocCard icon="♿" title="Botões com aria-pressed">
        Um <code>role=&quot;group&quot;</code> nomeado pela pergunta; travadas, as opções continuam
        focáveis (<code>aria-disabled</code>) para o leitor de tela achar a escolha. A confirmação
        entra numa região viva.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      title="2. Especificações técnicas"
      description="Cartão, opções, marca de voto e confirmação."
    />
    <UnvDocSpecs
      component="DmPoll"
      layout="Cartão · largura mínima de 220px"
      specs={[
        { label: 'Cartão', value: 'background-primary · contorno border-default · 16px' },
        { label: 'Pergunta', value: 'title-md · Open Sans 600 · 16/24px' },
        { label: 'Opção', value: '44px · 12px de raio · fill-field · title-sm' },
        { label: 'Marca', value: 'anel de 20px em border-control' },
        { label: 'Votada', value: 'action-primary · text-on-action · marca cheia' },
        { label: 'Travada', value: 'text-secondary sobre fill-field' },
        { label: 'Confirmação', value: 'label-md · text-secondary' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Sem barras de votos',
          detail:
            'a enquete não mostra a porcentagem de cada opção depois do voto: quem vota não vê a escolha dos outros. E não sabe se uma opção é “certa” — devolve só o id.',
        },
        {
          subject: 'A opção votada usa o roxo de ação e uma marca',
          detail:
            'text-on-action sobre action-primary mede 4,88:1 no claro e 8,27:1 no escuro. Além da cor, a marca à esquerda vira um disco com sinal de confirmação, para que a escolha não dependa só do matiz.',
        },
        {
          subject: 'Marca de confirmação desenhada em CSS',
          detail:
            'o registro de ícones do módulo não tem o glifo de confirmação; o sinal é feito com bordas, no mesmo espírito do rádio do módulo de mensageria. Pendente: registrar o glifo “check” do quadro de ícones da Unooria e trocar.',
        },
        {
          subject: 'Anel de border-control',
          detail:
            'o anel diz que a linha é tocável e mede 4,30:1 (claro) e 5,39:1 (escuro) sobre fill-field, acima dos 3:1 de gráfico.',
        },
        {
          subject: 'Contraste das opções travadas',
          detail: 'text-secondary sobre fill-field mede 7,05:1 (claro) e 7,54:1 (escuro).',
        },
        {
          subject: 'Cartão em camadas',
          detail:
            'o cartão é background-primary com contorno border-default e raio de 16px; as opções ficam um degrau abaixo, em fill-field, e são cápsulas menores (12px).',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Pergunta, opções e confirmação — enviada pela outra pessoa, com o MessageBubble bare."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Pergunta', role: 'Nome acessível do grupo de opções.', token: 'title-md' },
        { name: 'Opção', role: 'Botão de largura total com aria-pressed.', token: '--unv-color-fill-field' },
        { name: 'Marca', role: 'Anel; votada, vira disco com o sinal de confirmação.', token: '--unv-color-border-control' },
        { name: 'Confirmação', role: 'Região viva com o texto de sentLabel.', token: 'label-md' },
      ]}
    />
    <UnvDocStage label="Na conversa" align="flex-start" surface="secondary">
      <EnqueteNaConversa />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Antes do voto, votada e desabilitada."
    />
    <UnvDocStage label="Estados" align="flex-start" surface="secondary">
      <div style={{ width: 280 }}>
        <DmPoll question={PERGUNTA} options={unvPollOptions} />
      </div>
      <div style={{ width: 280 }}>
        <DmPoll question={PERGUNTA} options={unvPollOptions} value={unvPollOptions[1].id} />
      </div>
      <div style={{ width: 280 }}>
        <DmPoll question={PERGUNTA} options={unvPollOptions} disabled />
      </div>
    </UnvDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da enquete." />
    <UnvDocPractices
      dos={[
        'Guardar o voto no servidor e devolvê-lo em value ao reabrir a conversa.',
        'Enviar a enquete como mensagem da outra pessoa, com MessageBubble bare.',
        'Deixar a correção, se houver, para o servidor.',
      ]}
      donts={[
        'Mostrar acerto ou erro depois do voto.',
        'Exibir contagem ou porcentagem de votos dos colegas.',
        'Permitir trocar o voto depois de enviado.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Cartão, opções, marca e confirmação acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary">
      {(activeTheme) => <EnqueteNaConversa theme={activeTheme} />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente DmPoll."
    />
    <UnvDocPropsTable
      title="DmPoll"
      rows={[
        { name: 'question', type: 'React.ReactNode', description: 'A pergunta; nomeia o grupo. Obrigatório.' },
        { name: 'options', type: 'UnvDmPollOption[]', description: 'As opções ({ id, label }). Obrigatório.' },
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
          default: "'Resposta enviada ✓'",
          description: 'Confirmação exibida depois do voto.',
        },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema visual; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof DmPoll> = {
  title: 'Unoovista/Componentes/DmPoll',
  component: DmPoll,
  parameters: { layout: 'padded' },
  argTypes: {
    question: { control: 'text', description: 'A pergunta.' },
    options: { control: 'object', description: 'As opções.' },
    value: {
      control: 'select',
      options: [undefined, null, ...unvPollOptions.map((opcao) => opcao.id)],
      description: 'Voto (ausente = não controlada).',
    },
    disabled: { control: 'boolean', description: 'Trava sem ter votado.' },
    sentLabel: { control: 'text', description: 'Confirmação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onVote: { action: 'onVote' },
  },
  args: {
    question: PERGUNTA,
    options: unvPollOptions,
    disabled: false,
    sentLabel: 'Resposta enviada ✓',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof DmPoll>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DmPollDocumentationPage />,
};

/**
 * Playground com todas as propriedades da DmPoll expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da DmPoll',
  render: (args) => (
    <div
      data-unv-theme={args.theme}
      style={{ width: 320, padding: 16, backgroundColor: 'var(--unv-color-background-secondary)' }}
    >
      <DmPoll {...args} />
    </div>
  ),
};

/**
 * Enquete em contexto: enviada pela outra pessoa, na conversa.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto',
  render: () => <EnqueteNaConversa />,
};

/**
 * Não controlada: um toque vota, trava e anuncia a confirmação — uma vez só.
 */
export const Estados: Story = {
  args: { onVote: fn() },
  render: (args) => (
    <div style={{ width: 300 }}>
      <DmPoll question={PERGUNTA} options={unvPollOptions} onVote={args.onVote} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const grupo = tela.getByRole('group', { name: PERGUNTA });
    const util = within(grupo).getByRole('button', { name: OPCAO_UTIL.label });

    await expect(util).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(util);
    await expect(util).toHaveAttribute('aria-pressed', 'true');
    await expect(tela.getByRole('status')).toHaveTextContent('Resposta enviada ✓');

    const foto = within(grupo).getByRole('button', { name: OPCAO_FOTO.label });
    await expect(foto).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(foto);
    await expect(foto).toHaveAttribute('aria-pressed', 'false');
    await expect(args.onVote).toHaveBeenCalledTimes(1);
    await expect(args.onVote).toHaveBeenCalledWith(OPCAO_UTIL.id);
  },
};

/**
 * Controlada: com `value={null}`, só trava quando o produto devolve o id.
 */
export const Controlada: Story = {
  render: () => <EnqueteControlada />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await userEvent.click(tela.getByRole('button', { name: OPCAO_CONFIANCA.label }));
    await expect(tela.getByRole('button', { name: OPCAO_CONFIANCA.label })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(tela.getByRole('status')).toHaveTextContent('Resposta enviada ✓');
  },
};
