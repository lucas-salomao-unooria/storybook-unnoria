import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
  UncDocStage,
  UncDocThemeSwitcher,
  type UncDocTheme,
} from '../../../.storybook/components';
import { ChatWallpaper, DateChip, MessageBubble, TypingIndicator } from '../../../src/unoochat';
import type { UncSenderTone } from '../../../src/unoochat';
import { expect, within } from 'storybook/test';
import { uncWallpaperFor } from '../fixtures';

const BAR = '#716C98';

/**
 * Coluna de mensagens usada nas demonstrações.
 */
const Thread: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 340 }}>{children}</div>
);

/**
 * O mesmo conteúdo sobre a superfície base nos dois temas, lado a lado.
 */
const PorTema: React.FC<{ label: string; children: (theme: UncDocTheme) => React.ReactNode }> = ({
  label,
  children,
}) => (
  <UncDocGrid min={400} marginBottom={0}>
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={`${label} · ${theme === 'light' ? 'tema claro' : 'tema escuro'}`}
        theme={theme}
        surface="base"
        padding={24}
        align="flex-start"
      >
        {children(theme)}
      </UncDocStage>
    ))}
  </UncDocGrid>
);

/**
 * Trecho de conversa de grupo sobre a textura do tema: as mensagens de duas
 * pessoas, cada uma com o próprio tom, e a terceira digitando.
 */
const ConversaDeGrupo: React.FC<{ theme: UncDocTheme }> = ({ theme }) => (
  <div data-unc-theme={theme} style={{ width: 411, height: 420 }}>
    <ChatWallpaper src={uncWallpaperFor(theme)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '18px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DateChip>HOJE</DateChip>
        </div>
        <MessageBubble direction="in" sender="Camila Duarte" senderTone={3} time="08:25">
          Recebi essa foto no grupo da família. É verdade?
        </MessageBubble>
        <MessageBubble direction="in" sender="Bruno Reis" senderTone={2} time="08:26">
          Não sei quem mandou primeiro.
        </MessageBubble>
        <MessageBubble direction="out" time="08:27" delivery="read">
          Vamos procurar a origem antes de repassar.
        </MessageBubble>
        <TypingIndicator sender="Elisa Moura" senderTone={5} />
      </div>
    </ChatWallpaper>
  </div>
);

/**
 * Variantes: sozinho, com remetente, com tom e sem cauda.
 */
const Variantes: React.FC = () => (
  <Thread>
    <TypingIndicator />
    <TypingIndicator sender="Bruno Reis" />
    <TypingIndicator sender="Felipe Nunes" senderTone={6} />
    <MessageBubble direction="in" sender="Gabriela Lima" senderTone={7} time="08:30">
      Já volto com o link.
    </MessageBubble>
    <TypingIndicator tail={false} aria-label="Gabriela Lima está digitando" />
  </Thread>
);

/**
 * Página de documentação rica do componente TypingIndicator.
 */
const TypingIndicatorDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Extensões"
      title="TypingIndicator"
      description="O balão de mensagem recebida com três pontos que pulsam: alguém está digitando. Usa as classes e os tokens do MessageBubble recebido (superfície, raio, cauda e remetente) e aceita o mesmo senderTone, para a pessoa aparecer na cor que tem nas mensagens dela. Extensão do módulo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="💬" title="Alguém vai responder">
        Entre uma mensagem e a próxima, o balão de pontos diz que a conversa continua e ocupa o lugar
        que a resposta vai ocupar.
      </UncDocCard>
      <UncDocCard icon="👥" title="Quem está digitando">
        Em grupo, <code>sender</code> põe o nome no topo do balão e <code>senderTone</code> o pinta
        com o mesmo tom dos balões da pessoa.
      </UncDocCard>
      <UncDocCard icon="🔊" title="Região viva">
        <code>role=&quot;status&quot;</code> com <code>aria-label</code> (&quot;digitando&quot;, por
        padrão): o leitor de tela anuncia o nome e a frase; os pontos são <code>aria-hidden</code>.
      </UncDocCard>
      <UncDocCard icon="🐢" title="Movimento reduzido">
        Com <code>prefers-reduced-motion: reduce</code>, os pontos param e a frase do{' '}
        <code>aria-label</code> aparece ao lado deles.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="TypingIndicator"
      layout="Balão recebido · raio 8px · cauda inferior esquerda"
      specs={[
        { label: 'Balão (claro · escuro)', value: '#FFFFFF · #34375C (--unc-color-surface-bubble-in)' },
        { label: 'Pontos', value: '3 × 8px · 4px entre eles · --unc-color-text-bubble-meta' },
        { label: 'Pulsação', value: '1,2s · 150ms de escalonamento por ponto · sobe 3px' },
        { label: 'Altura da fileira', value: 'uma linha do texto do balão (16px × 1,3)' },
        { label: 'Remetente', value: 'Open Sans 700 · 12px · --unc-color-accent ou --unc-color-sender-N' },
        { label: 'Nome acessível', value: "aria-label · padrão 'digitando'" },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Extensão, com o balão do MessageBubble',
          detail:
            'o indicador não desenha balão próprio: aplica `.unc-messagebubble` e `.unc-messagebubble--in` (superfície, raio, cauda e remetente) e só acrescenta os pontos. Uma mudança no balão recebido chega ao indicador sem duplicar CSS. Não importa nada da Plataforma Unooria: o `TypingIndicator` da seção `unooria` serviu só de referência de estrutura.',
        },
        {
          subject: 'Pontos na cor dos metadados',
          detail:
            'os pontos usam `--unc-color-text-bubble-meta` (`neutral-700` no claro, `brandpurple-200` no escuro), que passa de 4,5:1 sobre o balão recebido nos dois temas, acima dos 3:1 de elemento gráfico. O acento ficou com o nome do remetente.',
        },
        {
          subject: 'Mesmo senderTone do MessageBubble',
          detail:
            'o nome usa a classe `.unc-messagebubble__sender--tone-N`, a mesma do balão, então a pessoa digita na cor em que escreve. Sem `senderTone`, o nome fica no acento.',
        },
        {
          subject: 'Frase visível com movimento reduzido',
          detail:
            'parados, três pontos não dizem "digitando". Com `prefers-reduced-motion: reduce` a animação é desligada e a frase do `aria-label` aparece, em itálico, na cor dos metadados — o mesmo comportamento do indicador da Plataforma Unooria.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Balão', role: 'O balão recebido do MessageBubble, com role="status".', token: '--unc-color-surface-bubble-in' },
        { name: 'Remetente', role: 'Nome de quem digita, opcional, no topo.', token: '--unc-color-accent · --unc-color-sender-1…8' },
        { name: 'Pontos', role: 'Três pontos de 8px que pulsam em sequência; aria-hidden.', token: '--unc-color-text-bubble-meta' },
        { name: 'Frase', role: 'O aria-label: só para o leitor de tela, ou visível com movimento reduzido.', token: '--unc-color-text-bubble-meta' },
        { name: 'Cauda', role: 'Triângulo na base esquerda.', token: 'prop tail' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <PorTema label="Sozinho, com remetente, com tom e sem cauda">{() => <Variantes />}</PorTema>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Em contexto"
      description="Numa conversa de grupo, sobre a textura de cada tema: quem digita aparece na cor das próprias mensagens."
    />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
      <ConversaDeGrupo theme="light" />
      <ConversaDeGrupo theme="dark" />
    </div>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Dar à pessoa o mesmo senderTone nos balões e no indicador.',
        'Trocar o indicador pela mensagem quando ela chegar, no mesmo lugar da conversa.',
        'Passar um aria-label com o nome quando não houver sender visível ("Ana está digitando").',
        'Desligar a cauda quando o indicador vier logo abaixo de outra mensagem da mesma pessoa.',
      ]}
      donts={[
        'Deixar o indicador na tela depois que a mensagem chegou.',
        'Mostrar mais de um indicador por pessoa ao mesmo tempo.',
        'Animar os pontos por outro meio que não respeite o movimento reduzido.',
        'Usar o indicador para mensagens enviadas: ele é sempre o balão recebido.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: balão, pontos, cauda e tom do remetente acompanham."
    />
    <UncDocThemeSwitcher surface="base">
      {() => (
        <Thread>
          <MessageBubble direction="in" sender="Davi Lucas" senderTone={4} time="09:05">
            Quem mandou isso?
          </MessageBubble>
          <TypingIndicator sender="Ana Beatriz" senderTone={1} />
        </Thread>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="TypingIndicator"
      rows={[
        { name: 'sender', type: 'React.ReactNode', description: 'Nome de quem está digitando, no topo do balão.' },
        { name: 'senderTone', type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8', description: 'Cor do nome (--unc-color-sender-N). Ausente, o nome fica em --unc-color-accent.' },
        { name: 'tail', type: 'boolean', default: 'true', description: 'Desenha a cauda triangular na base do balão.' },
        { name: 'aria-label', type: 'string', default: "'digitando'", description: 'Nome acessível da região; vira texto visível com movimento reduzido.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: '...rest', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassados ao balão (exceto children).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TypingIndicator> = {
  title: 'Unoochat/Componentes/TypingIndicator',
  component: TypingIndicator,
  parameters: { layout: 'padded' },
  argTypes: {
    sender: { control: 'text', description: 'Nome de quem está digitando.' },
    senderTone: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8],
      description: 'Tom do nome do remetente (1 a 8). Ausente, o acento.',
    },
    tail: { control: 'boolean', description: 'Desenha a cauda triangular.' },
    'aria-label': { control: 'text', description: 'Nome acessível da região.' },
  },
  args: {
    sender: 'Elisa Moura',
    senderTone: 5 as UncSenderTone,
    tail: true,
    'aria-label': 'digitando',
  },
};

export default meta;

type Story = StoryObj<typeof TypingIndicator>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TypingIndicatorDocumentationPage />,
};

/**
 * Playground com 100% das props do TypingIndicator expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TypingIndicator',
  render: (args) => (
    <UncDocStage surface="base" padding={32} align="flex-start">
      <Thread>
        <TypingIndicator {...args} />
      </Thread>
    </UncDocStage>
  ),
};

/**
 * O indicador sozinho, sem remetente, nos dois temas. O `play` confere a região
 * viva, o nome acessível padrão e os pontos fora da árvore de acessibilidade.
 */
export const Sozinho: Story = {
  render: () => <PorTema label="Sem remetente">{() => <TypingIndicator />}</PorTema>,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const regioes = tela.getAllByRole('status', { name: 'digitando' });
    await expect(regioes).toHaveLength(2);
    for (const regiao of regioes) {
      await expect(regiao).toHaveClass('unc-messagebubble', 'unc-messagebubble--in');
      await expect(regiao.querySelector('.unc-typingindicator__dots')).toHaveAttribute('aria-hidden', 'true');
      await expect(regiao.querySelectorAll('.unc-typingindicator__dot')).toHaveLength(3);
      await expect(regiao).toHaveTextContent('digitando');
      await expect(regiao.querySelector('.unc-messagebubble__sender')).toBeNull();
    }
  },
};

/**
 * O indicador numa conversa de grupo, com o tom do remetente igual ao das
 * mensagens dele. O `play` confere o nome, o tom e o `aria-label` próprio.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: numa conversa',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      <ConversaDeGrupo theme="light" />
      <ConversaDeGrupo theme="dark" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const regioes = tela.getAllByRole('status', { name: 'digitando' });
    await expect(regioes).toHaveLength(2);
    for (const regiao of regioes) {
      const nome = within(regiao).getByText('Elisa Moura');
      await expect(nome).toHaveClass('unc-messagebubble__sender', 'unc-messagebubble__sender--tone-5');
    }
  },
};

/**
 * Matriz de variantes nos dois temas.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => <PorTema label="Variantes">{() => <Variantes />}</PorTema>,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(tela.getAllByRole('status', { name: 'Gabriela Lima está digitando' })).toHaveLength(2);
    for (const regiao of tela.getAllByRole('status', { name: 'Gabriela Lima está digitando' })) {
      await expect(regiao.querySelector('.unc-messagebubble__tail')).toBeNull();
    }
  },
};
