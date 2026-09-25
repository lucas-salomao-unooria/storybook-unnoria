import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { DmPoll } from '../../../src/instanooria/components/DmPoll';
import { MessageBubble } from '../../../src/instanooria/components/MessageBubble';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocDeviations,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaPollOptions, instaThreadContact } from '../fixtures';

const PERGUNTA = 'O que mais pesou na sua escolha?';

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
      avatarSrc={instaThreadContact.avatarSrc}
      senderLabel="Amara"
      theme={theme}
    >
      <DmPoll question={PERGUNTA} options={instaPollOptions} theme={theme} />
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
      <DmPoll question={PERGUNTA} options={instaPollOptions} value={valor} onVote={setValor} />
    </div>
  );
};

/**
 * Página de documentação rica do componente DmPoll.
 */
const DmPollDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="DmPoll"
      description="Enquete dentro da DM, como no app real: cartão com a pergunta e as opções em pílulas, um toque por voto. Depois do voto, as opções travam e a confirmação aparece — sem contagem, sem porcentagem e sem gabarito: a enquete devolve só o id escolhido. Extensão sem quadro no arquivo de origem."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma pergunta, um voto, nenhum placar."
    />
    <InstaDocGrid>
      <InstaDocCard icon="👆" title="Um toque vota">
        Como no Direct, não há botão “Votar”: a pílula tocada é o voto, e a enquete trava em
        seguida.
      </InstaDocCard>
      <InstaDocCard icon="🙈" title="Sem placar, sem gabarito">
        A enquete não mostra quantos votaram em cada opção e não sabe qual é “certa” — a mesma
        decisão do <code>Poll</code> do WhatsApp Mobile.
      </InstaDocCard>
      <InstaDocCard icon="🎛️" title="Controlada ou não">
        Sem <code>value</code>, guarda o voto sozinha. Com <code>value</code>, o produto manda — e a
        enquete reabre travada depois de um F5.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Botões com aria-pressed">
        Um <code>role=&quot;group&quot;</code> nomeado pela pergunta; travadas, as opções continuam
        focáveis (<code>aria-disabled</code>) para o leitor de tela achar a escolha. A confirmação
        entra numa região viva.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Sem quadro no arquivo: o cartão e as pílulas são degraus publicados."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2266"
      frameName="Instagram Story → Send Message (o raio do cartão)"
      specs={[
        { label: 'Cartão', value: 'background-primary · contorno action-secondary-border' },
        { label: 'Raio do cartão', value: '21,5px (--insta-radius-xl)' },
        { label: 'Pergunta', value: 'Title/Large · 16/21px' },
        { label: 'Pílula', value: '44px · raio total · Title/Small' },
        { label: 'Votada', value: 'fill-field · contorno de 2px em text-primary' },
        { label: 'Confirmação', value: 'Label/Medium · text-secondary' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro no arquivo de origem',
          detail:
            'o arquivo não publica conversa aberta nem enquete. O cartão usa o contorno do Button secundário, o raio do campo “Send Message” do Story (0:2266) e o alvo de toque de 44px.',
        },
        {
          subject: 'Sem barras de votos',
          detail:
            'o app real mostra a porcentagem de cada opção depois do voto. A extensão não mostra: o caso de uso exige que ninguém veja a escolha dos outros. E não sabe se uma opção é “certa” — devolve só o id.',
        },
        {
          subject: 'A opção votada não é azul',
          detail:
            'branco sobre --insta-color-action-primary mede 3,06:1. A votada se distingue por forma e contraste — preenchimento neutro e contorno de 2px na cor do texto —, não só por matiz.',
        },
        {
          subject: 'Nenhum token nem glifo novo',
          detail: 'o ✓ da confirmação é caractere do rótulo padrão, não um vetor.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Pergunta, pílulas e confirmação — enviada pela outra pessoa, com o MessageBubble bare."
    />
    <InstaDocStage label="Na conversa" align="flex-start">
      <EnqueteNaConversa />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Antes do voto, votada e desabilitada."
    />
    <InstaDocStage label="Estados" align="flex-start">
      <div style={{ width: 280 }}>
        <DmPoll question={PERGUNTA} options={instaPollOptions} />
      </div>
      <div style={{ width: 280 }}>
        <DmPoll question={PERGUNTA} options={instaPollOptions} value="util" />
      </div>
      <div style={{ width: 280 }}>
        <DmPoll question={PERGUNTA} options={instaPollOptions} disabled />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso da enquete." />
    <InstaDocPractices
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
      description="Cartão, pílulas e confirmação acompanham o tema."
    />
    <InstaDocThemeSwitcher>{(activeTheme) => <EnqueteNaConversa theme={activeTheme} />}</InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente DmPoll."
    />
    <InstaDocPropsTable
      title="DmPoll"
      rows={[
        { name: 'question', type: 'React.ReactNode', description: 'A pergunta; nomeia o grupo. Obrigatório.' },
        { name: 'options', type: 'InstaDmPollOption[]', description: 'As opções ({ id, label }). Obrigatório.' },
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
        { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Tema visual.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof DmPoll> = {
  title: 'Instanooria/Componentes/DmPoll',
  component: DmPoll,
  parameters: { layout: 'padded' },
  argTypes: {
    question: { control: 'text', description: 'A pergunta.' },
    options: { control: 'object', description: 'As opções.' },
    value: {
      control: 'select',
      options: [undefined, null, ...instaPollOptions.map((opcao) => opcao.id)],
      description: 'Voto (ausente = não controlada).',
    },
    disabled: { control: 'boolean', description: 'Trava sem ter votado.' },
    sentLabel: { control: 'text', description: 'Confirmação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onVote: { action: 'onVote' },
  },
  args: {
    question: PERGUNTA,
    options: instaPollOptions,
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
      data-insta-theme={args.theme}
      style={{ width: 320, padding: 15, backgroundColor: 'var(--insta-color-background-primary)' }}
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
      <DmPoll question={PERGUNTA} options={instaPollOptions} onVote={args.onVote} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const grupo = tela.getByRole('group', { name: PERGUNTA });
    const util = within(grupo).getByRole('button', { name: 'A informação era útil para a turma' });

    await expect(util).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(util);
    await expect(util).toHaveAttribute('aria-pressed', 'true');
    await expect(tela.getByRole('status')).toHaveTextContent('Resposta enviada ✓');

    const foto = within(grupo).getByRole('button', { name: 'A foto era a mais bonita' });
    await expect(foto).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(foto);
    await expect(foto).toHaveAttribute('aria-pressed', 'false');
    await expect(args.onVote).toHaveBeenCalledTimes(1);
    await expect(args.onVote).toHaveBeenCalledWith('util');
  },
};

/**
 * Controlada: com `value={null}`, só trava quando o produto devolve o id.
 */
export const Controlada: Story = {
  render: () => <EnqueteControlada />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await userEvent.click(tela.getByRole('button', { name: 'Eu confio em quem postou' }));
    await expect(tela.getByRole('button', { name: 'Eu confio em quem postou' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(tela.getByRole('status')).toHaveTextContent('Resposta enviada ✓');
  },
};
