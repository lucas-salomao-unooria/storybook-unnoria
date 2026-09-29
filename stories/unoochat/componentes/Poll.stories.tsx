import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { ChatWallpaper, MessageBubble, Poll } from '../../../src/unoochat';
import type { UncPollOption } from '../../../src/unoochat';
import { uncWallpaper, uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

const OPCOES: UncPollOption[] = [
  { id: 'urgencia', label: 'Urgência (precisava avisar logo)' },
  { id: 'confianca', label: 'Confiança em quem mandou' },
  { id: 'medo', label: 'Medo ou indignação com o acontecimento' },
  { id: 'imagem', label: 'A imagem ou o link parecia muito real' },
];

/**
 * A enquete dentro do balão, com o estado guardado fora dela, como no produto.
 * O padrão é o balão recebido: é onde o botão "Votar" tem contraste de texto
 * (ver as decisões de design).
 */
const EnqueteNoBalao: React.FC<{ direction?: 'in' | 'out' }> = ({ direction = 'in' }) => {
  const [valor, setValor] = useState<string | null>(null);
  const [votou, setVotou] = useState(false);

  return (
    <MessageBubble direction={direction} time="09:05" maxWidth={300}>
      <Poll
        question="O que mais te fez escolher essas mensagens?"
        hint="Selecione uma opção"
        options={OPCOES}
        value={valor}
        onChange={setValor}
        voted={votou}
        onVote={() => setVotou(true)}
        votedLabel="Resposta enviada"
      />
    </MessageBubble>
  );
};

/**
 * Página de documentação rica do componente Poll.
 */
const PollDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="Poll"
      description="Enquete da conversa: pergunta, opções de escolha única com o Radio do diálogo e o botão de votar. Depois do voto, as opções congelam e o botão vira a confirmação, sem contagem: quem vota não vê o que os outros escolheram. Extensão do módulo, sem par na Plataforma Unooria."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🗳️" title="Uma escolha, um voto">
        Escolha única, confirmada por “Votar”. O botão só fica acionável com uma opção marcada.
      </UncDocCard>
      <UncDocCard icon="🙈" title="Sem gabarito, sem placar">
        A enquete devolve só o <code>id</code> escolhido. Não sabe se uma opção é “certa” e não
        mostra quantos votaram em cada uma.
      </UncDocCard>
      <UncDocCard icon="🎛️" title="Controlada">
        Opção marcada e voto enviado são estado do produto: a enquete pode reabrir depois de
        recarregar a página exatamente como estava.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Poll"
      layout="Bloco no balão · mínimo de 220px"
      specs={[
        { label: 'Controles', value: 'Radio do diálogo · 20px · desenhado em CSS' },
        { label: 'Pergunta', value: 'Open Sans 700 · 16px · --unc-color-text-bubble' },
        { label: 'Opções', value: 'Open Sans 400 · 14px · --unc-color-text-bubble' },
        { label: 'Apoio', value: 'Open Sans 400 · 12px · --unc-color-text-bubble-meta' },
        { label: 'Votar', value: '44px · --unc-color-accent sobre divisor de 1px' },
        { label: 'Confirmação', value: 'tick · --unc-color-icon-tick' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não publica enquete. Os controles são o Radio do diálogo do módulo; o botão de votar é a ação de texto do diálogo, separada das opções por um divisor de 1px.',
        },
        {
          subject: 'Rótulo do Radio reajustado no balão',
          detail:
            'dentro do balão o rótulo passa ao texto do balão (--unc-color-text-bubble) e ganha altura de linha 1,3: a cor do diálogo e a altura de linha 1 do rótulo curto não servem a uma opção de duas linhas.',
        },
        {
          subject: 'Botão “Votar” acompanha o balão',
          detail:
            'no balão recebido o botão usa --unc-color-accent, que mede 4,88:1 (claro) e 4,80:1 (escuro). No balão enviado o acento mediria 3,65:1 e 2,99:1, abaixo dos 4,5:1 de texto; ali o rótulo passa a --unc-color-text-bubble.',
        },
        {
          subject: 'Sem barras de votos',
          detail:
            'não há contagem nem porcentagem por opção: o caso de uso exige que ninguém veja a escolha dos outros.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        {
          name: 'Pergunta',
          role: 'Nome acessível do grupo de rádios.',
          token: '--unc-color-text-bubble',
        },
        {
          name: 'Apoio',
          role: 'Linha opcional abaixo da pergunta.',
          token: '--unc-color-text-bubble-meta',
        },
        { name: 'Opções', role: 'Radio de escolha única.', token: 'Radio' },
        {
          name: 'Votar / confirmação',
          role: 'Botão até o voto; tique e texto depois.',
          token: '--unc-color-accent · --unc-color-icon-tick',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de estados e uso em contexto"
      description="Marque uma opção e vote: o botão acende, o voto congela as opções e a confirmação toma o lugar do botão."
    />
    <div style={{ width: 411, marginBottom: 32 }}>
      <ChatWallpaper src={uncWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px' }}>
          <EnqueteNoBalao />
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Colocar a enquete dentro de um MessageBubble recebido, onde o botão tem contraste de texto.',
        'Guardar value e voted no produto, para sobreviver a um recarregamento.',
        'Deixar o servidor decidir a ordem das opções quando ela não pode ser previsível.',
      ]}
      donts={[
        'Mostrar acerto ou erro depois do voto.',
        'Exibir contagem de votos dos colegas.',
        'Permitir mudar o voto depois de enviado.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A enquete herda a superfície do balão: claro e escuro trocam texto, controle e acento juntos."
    />
    <UncDocThemeSwitcher surface="base">
      {(theme) => (
        <div style={{ width: 411 }}>
          <ChatWallpaper src={uncWallpaperFor(theme)}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px' }}>
              <EnqueteNoBalao />
            </div>
          </ChatWallpaper>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="Poll"
      rows={[
        { name: 'question', type: 'React.ReactNode', description: 'A pergunta. Obrigatório.' },
        { name: 'hint', type: 'React.ReactNode', description: 'Linha de apoio abaixo da pergunta.' },
        {
          name: 'options',
          type: 'UncPollOption[]',
          description: 'As opções ({ id, label }), na ordem em que aparecem. Obrigatório.',
        },
        { name: 'value', type: 'string | null', default: 'null', description: 'Opção marcada.' },
        { name: 'onChange', type: '(id: string) => void', description: 'Chamado ao marcar uma opção.' },
        { name: 'onVote', type: '() => void', description: 'Chamado pelo botão de votar.' },
        {
          name: 'voted',
          type: 'boolean',
          default: 'false',
          description: 'Voto enviado: congela as opções e troca o botão pela confirmação.',
        },
        {
          name: 'voteLabel',
          type: 'React.ReactNode',
          default: "'Votar'",
          description: 'Rótulo do botão.',
        },
        {
          name: 'votedLabel',
          type: 'React.ReactNode',
          default: "'Voto enviado'",
          description: 'Confirmação exibida depois do voto.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Congela as opções e o botão sem ter votado.',
        },
        {
          name: 'name',
          type: 'string',
          description: 'Nome do grupo de rádios; ausente, um identificador único é gerado.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Poll> = {
  title: 'Unoochat/Componentes/Poll',
  component: Poll,
  parameters: { layout: 'padded' },
  argTypes: {
    question: { control: 'text', description: 'A pergunta.' },
    hint: { control: 'text', description: 'Linha de apoio.' },
    options: { control: 'object', description: 'As opções ({ id, label }).' },
    name: { control: 'text', description: 'Nome do grupo de rádios.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
    value: { control: 'select', options: [null, ...OPCOES.map((opcao) => opcao.id)], description: 'Opção marcada.' },
    voted: { control: 'boolean', description: 'Voto enviado.' },
    disabled: { control: 'boolean', description: 'Congela sem ter votado.' },
    voteLabel: { control: 'text', description: 'Rótulo do botão.' },
    votedLabel: { control: 'text', description: 'Confirmação.' },
    onChange: { action: 'onChange' },
    onVote: { action: 'onVote' },
  },
  args: {
    question: 'O que mais te fez escolher essas mensagens?',
    hint: 'Selecione uma opção',
    options: OPCOES,
    value: null,
    voted: false,
    disabled: false,
    voteLabel: 'Votar',
    votedLabel: 'Resposta enviada',
  },
};

export default meta;

type Story = StoryObj<typeof Poll>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PollDocumentationPage />,
};

/**
 * Playground com 100% das props do Poll expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Poll',
  render: (args) => (
    <div style={{ width: 411 }}>
      <ChatWallpaper src={uncWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px' }}>
          <MessageBubble direction="in" maxWidth={300}>
            <Poll {...args} />
          </MessageBubble>
        </div>
      </ChatWallpaper>
    </div>
  ),
};

/**
 * "Votar" só acende com uma opção marcada, e o voto congela a enquete.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 411 }}>
      <ChatWallpaper src={uncWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px' }}>
          <EnqueteNoBalao />
        </div>
      </ChatWallpaper>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const votar = tela.getByRole('button', { name: 'Votar' });

    await expect(votar).toBeDisabled();
    await userEvent.click(tela.getByRole('radio', { name: 'Confiança em quem mandou' }));
    await expect(votar).toBeEnabled();
    await userEvent.click(votar);
    await expect(tela.getByText('Resposta enviada')).toBeInTheDocument();
    await expect(tela.getByRole('radio', { name: 'Urgência (precisava avisar logo)' })).toBeDisabled();
  },
};
