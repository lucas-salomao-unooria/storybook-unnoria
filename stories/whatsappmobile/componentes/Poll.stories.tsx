import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
} from '../../../.storybook/components';
import { ChatWallpaper, MessageBubble, Poll } from '../../../src/whatsappmobile';
import type { WaPollOption } from '../../../src/whatsappmobile';
import { waWallpaper } from '../fixtures';

const BAR = '#0CA996';

const OPCOES: WaPollOption[] = [
  { id: 'urgencia', label: 'Urgência (precisava avisar logo)' },
  { id: 'confianca', label: 'Confiança em quem mandou' },
  { id: 'medo', label: 'Medo ou indignação com o acontecimento' },
  { id: 'imagem', label: 'A imagem ou link parecia muito real' },
];

/**
 * A enquete dentro do balão, com o estado guardado fora dela — como no produto.
 */
const EnqueteNoBalao: React.FC<{ direction?: 'in' | 'out' }> = ({ direction = 'out' }) => {
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
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Extensões"
      title="Poll"
      description="Enquete da conversa: pergunta, opções de escolha única com o Radio do diálogo e o botão de votar. Depois do voto, as opções congelam e o botão vira a confirmação — sem contagem: quem vota não vê o que os outros escolheram. Extensão sem frame de origem."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🗳️" title="Uma escolha, um voto">
        Escolha única, confirmada por “Votar”. O botão só acende com uma opção marcada.
      </WaDocCard>
      <WaDocCard icon="🙈" title="Sem gabarito, sem placar">
        A enquete devolve só o <code>id</code> escolhido. Não sabe se uma opção é “certa” e não
        mostra quantos votaram em cada uma.
      </WaDocCard>
      <WaDocCard icon="🎛️" title="Controlada">
        Opção marcada e voto enviado são estado do produto: a enquete pode reabrir depois de um F5
        exatamente como estava.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:3510"
      frameName="Mute notif · Radio do diálogo (a âncora dos controles)"
      specs={[
        { label: 'Controles', value: 'Radio do diálogo · radioOn / radioOff' },
        { label: 'Pergunta', value: 'PT Sans 16px bold · --wa-color-text-bubble' },
        { label: 'Opções', value: 'PT Sans 15px · --wa-color-text-bubble' },
        { label: 'Votar', value: '--wa-color-accent-action sobre divisor de 1px' },
        { label: 'Confirmação', value: 'tick · --wa-color-icon-tick' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Componente sem frame',
          detail:
            'o arquivo não publica enquete. Os controles são o Radio do diálogo; o botão de votar é a ação de texto do diálogo, separada por um divisor.',
        },
        {
          subject: 'Rótulo do Radio reajustado',
          detail:
            'dentro do balão o rótulo passa ao texto do balão e ganha altura de linha 1,3: a cor do diálogo e a altura de linha 1 do rótulo curto não servem a uma opção de duas linhas.',
        },
        {
          subject: 'Sem barras de votos',
          detail:
            'o app real mostra a porcentagem de cada opção. A extensão não mostra: o caso de uso exige que ninguém veja a escolha dos outros.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Pergunta', role: 'Nome acessível do grupo de rádios.', token: '--wa-color-text-bubble' },
        { name: 'Apoio', role: 'Linha opcional abaixo da pergunta.', token: '--wa-color-text-bubble-meta' },
        { name: 'Opções', role: 'Radio de escolha única.', token: 'Radio' },
        { name: 'Votar / confirmação', role: 'Botão até o voto; tique e texto depois.', token: '--wa-color-accent-action · --wa-color-icon-tick' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Em contexto" description="Marque uma opção e vote." />
    <div style={{ width: 411, marginBottom: 32 }}>
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px' }}>
          <EnqueteNoBalao />
        </div>
      </ChatWallpaper>
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Colocar dentro de um MessageBubble.',
        'Guardar value e voted no produto, para sobreviver a um recarregamento.',
        'Deixar o servidor decidir a ordem das opções quando ela não pode ser previsível.',
      ]}
      donts={[
        'Mostrar acerto ou erro depois do voto.',
        'Exibir contagem de votos dos colegas.',
        'Permitir mudar o voto depois de enviado.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Superfícies suportadas" />
    <WaDocGrid>
      <WaDocCard icon="🌓" title="Dentro do balão">
        A enquete herda a superfície do balão — enviado ou recebido.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="Poll"
      rows={[
        { name: 'question', type: 'React.ReactNode', description: 'A pergunta. Obrigatório.' },
        { name: 'hint', type: 'React.ReactNode', description: 'Linha de apoio.' },
        { name: 'options', type: 'WaPollOption[]', description: 'As opções ({ id, label }). Obrigatório.' },
        { name: 'value', type: 'string | null', default: 'null', description: 'Opção marcada.' },
        { name: 'onChange', type: '(id: string) => void', description: 'Ao marcar uma opção.' },
        { name: 'onVote', type: '() => void', description: 'Botão de votar.' },
        { name: 'voted', type: 'boolean', default: 'false', description: 'Voto enviado: congela as opções.' },
        { name: 'voteLabel', type: 'React.ReactNode', default: "'Votar'", description: 'Rótulo do botão.' },
        { name: 'votedLabel', type: 'React.ReactNode', default: "'Voto enviado'", description: 'Confirmação depois do voto.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Congela sem ter votado.' },
        { name: 'name', type: 'string', description: 'Nome do grupo de rádios.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Poll> = {
  title: 'Whatsapp Mobile/Componentes/Poll',
  component: Poll,
  parameters: { layout: 'padded' },
  argTypes: {
    question: { control: 'text', description: 'A pergunta.' },
    hint: { control: 'text', description: 'Linha de apoio.' },
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
      <ChatWallpaper src={waWallpaper}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 12px' }}>
          <MessageBubble direction="out" maxWidth={300}>
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
      <ChatWallpaper src={waWallpaper}>
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
