import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { SpeechBubble } from '../../../src/unooria/components/SpeechBubble';
import { Button } from '../../../src/unooria/components/Button';
import { Icon } from '../../../src/unooria/components/Icon';
import type { UnooriaTheme } from '../../../src/unooria/tokens';
import '../../../src/unooria/tokens/icons.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ---------------------------------------------------------------------------
   O avatar do guia — um rosto de desenho, feito na hora com as cores dos
   tokens do :root. Nenhuma foto de pessoa, nenhum arquivo, nenhuma cor avulsa.
   ------------------------------------------------------------------------- */

const token = (nome: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || 'currentColor';

const desenharBento = (): string => {
  const corpo = [
    `<rect width="80" height="80" fill="${token('--unooria-color-brandnavy-300')}"/>`,
    `<circle cx="40" cy="44" r="24" fill="${token('--unooria-color-brandorange-200')}"/>`,
    `<path d="M16 38 Q40 8 64 38 Z" fill="${token('--unooria-color-brandorange-800')}"/>`,
    `<circle cx="31" cy="44" r="3" fill="${token('--unooria-color-neutral-950')}"/>`,
    `<circle cx="49" cy="44" r="3" fill="${token('--unooria-color-neutral-950')}"/>`,
    `<path d="M31 54 Q40 62 49 54" fill="none" stroke="${token('--unooria-color-neutral-950')}" stroke-width="3" stroke-linecap="round"/>`,
  ].join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">${corpo}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const useBento = () => useMemo(() => desenharBento(), []);

/* ---------------------------------------------------------------------------
   As falas de demonstração: o guia e os leitores reagindo à 1ª edição.
   ------------------------------------------------------------------------- */

const FALA_DO_GUIA = 'Pronto, a edição está no mural! Vamos ver o que os leitores da escola acharam?';
const FALA_DA_FAMILIA =
  'Chegamos com roupa de festa no sábado e o vigia avisou que essa gincana aconteceu em 2018!';
const FALA_DA_SECRETARIA = 'Três famílias ligaram perguntando do sorvete na cantina. Quem confirmou essa notícia?';
const FALA_DO_PROFESSOR = 'A notícia da feira de ciências ajudou: a minha turma já fez a inscrição!';

/** O botão de ouvir a fala, como a missão o usa quando há gravação. */
const Ouvir: React.FC<{ quem: string; tema?: UnooriaTheme }> = ({ quem, tema = 'light' }) => (
  <Button
    variant="ghost"
    size="sm"
    theme={tema}
    aria-label={`Ouvir a fala de ${quem}`}
    leftIcon={<Icon name="volume_up" size="xs" color="currentColor" />}
  >
    Ouvir
  </Button>
);

/* ---------------------------------------------------------------------------
   Peças da página de documentação — só tokens, nenhuma cor avulsa (seção 2).
   ------------------------------------------------------------------------- */

const Cartao: React.FC<{ icone: string; titulo: string; children: React.ReactNode }> = ({
  icone,
  titulo,
  children,
}) => (
  <div
    style={{
      padding: 'var(--unooria-spacing-s)',
      border: '1px solid var(--unooria-color-neutral-150)',
      borderRadius: 12,
      background: 'var(--unooria-color-neutral-50)',
      color: 'var(--unooria-color-neutral-700)',
      fontSize: 14,
      lineHeight: 1.6,
    }}
  >
    <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--unooria-color-neutral-950)' }}>
      {icone} {titulo}
    </p>
    {children}
  </div>
);

const Grade: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 'var(--unooria-spacing-s)',
      marginBottom: 'var(--unooria-spacing-l)',
    }}
  >
    {children}
  </div>
);

/** O palco tem a largura do aparelho da missão (375px), menos as calhas. */
const Palco: React.FC<{ rotulo: string; escuro?: boolean; children: React.ReactNode }> = ({
  rotulo,
  escuro = false,
  children,
}) => (
  <div style={{ marginBottom: 'var(--unooria-spacing-m)' }}>
    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--unooria-color-neutral-700)' }}>{rotulo}</p>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--unooria-spacing-s)',
        boxSizing: 'border-box',
        width: 375,
        maxWidth: '100%',
        padding: 'var(--unooria-spacing-s)',
        borderRadius: 12,
        background: escuro ? 'var(--unooria-color-neutraldark-50)' : 'var(--unooria-color-neutral-50)',
        border: '1px solid var(--unooria-color-neutral-150)',
      }}
    >
      {children}
    </div>
  </div>
);

const Praticas: React.FC<{ fazer: string[]; evitar: string[] }> = ({ fazer, evitar }) => (
  <Grade>
    <Cartao icone="✓" titulo="O que fazer">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {fazer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
    <Cartao icone="✕" titulo="O que evitar">
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {evitar.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Cartao>
  </Grade>
);

const TabelaDeProps: React.FC<{
  linhas: { nome: string; tipo: string; padrao?: string; descricao: string }[];
}> = ({ linhas }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
    <thead>
      <tr style={{ color: 'var(--unooria-color-neutral-950)' }}>
        {['Prop', 'Tipo', 'Padrão', 'Descrição'].map((c) => (
          <th key={c} style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-200)' }}>
            {c}
          </th>
        ))}
      </tr>
    </thead>
    <tbody style={{ color: 'var(--unooria-color-neutral-700)' }}>
      {linhas.map((l) => (
        <tr key={l.nome}>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            <code>{l.nome}</code>
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            <code>{l.tipo}</code>
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>
            {l.padrao ? <code>{l.padrao}</code> : '—'}
          </td>
          <td style={{ padding: 8, borderBottom: '1px solid var(--unooria-color-neutral-150)' }}>{l.descricao}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

/** A redação reagindo à 1ª edição: o guia e os três humores de leitor. */
const Redacao: React.FC<{ bento: string; tema?: UnooriaTheme }> = ({ bento, tema = 'light' }) => (
  <>
    <SpeechBubble speaker="Bento" tone="guide" avatarSrc={bento} theme={tema} action={<Ouvir quem="Bento" tema={tema} />}>
      {FALA_DO_GUIA}
    </SpeechBubble>
    <SpeechBubble speaker="Família no portão" mood="upset" avatarInitials="FA" theme={tema}>
      {FALA_DA_FAMILIA}
    </SpeechBubble>
    <SpeechBubble speaker="Secretaria da escola" avatarInitials="SE" theme={tema}>
      {FALA_DA_SECRETARIA}
    </SpeechBubble>
    <SpeechBubble speaker="Professor do 5º ano" mood="happy" avatarInitials="PR" theme={tema}>
      {FALA_DO_PROFESSOR}
    </SpeechBubble>
  </>
);

/**
 * Página de documentação rica do componente SpeechBubble.
 */
const SpeechBubbleDocumentationPage: React.FC = () => {
  const bento = useBento();
  const [tema, setTema] = useState<UnooriaTheme>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Jornal"
        title="SpeechBubble"
        description="O balão de fala da redação: quem fala (o guia da missão ou um leitor da escola), a fala em 16px e, no leitor, o humor — acento de cor com ícone nomeado, nunca só cor. No Jornal da Escola, é como a criança ouve a reação da família no portão, do professor e da secretaria à edição que ela publicou."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Quem fala na redação, e como a edição foi recebida."
      />
      <Grade>
        <Cartao icone="🧭" titulo="O guia">
          <code>tone=&quot;guide&quot;</code>: o Bento, colega editor, conduz a missão. Balão com destaque de
          marca e o anel em gradiente do <code>Avatar</code>.
        </Cartao>
        <Cartao icone="🏫" titulo="Os leitores">
          <code>tone=&quot;reader&quot;</code>: a família no portão, o professor, a secretaria. Balão neutro,
          com o humor em <code>mood</code>.
        </Cartao>
        <Cartao icone="🙂" titulo="Humor que não é só cor">
          <code>upset</code> e <code>happy</code> trocam o fio do balão para aviso ou sucesso E mostram um
          ícone com nome (“Não gostou” / “Gostou”).
        </Cartao>
        <Cartao icone="🔊" titulo="Ouvir a fala">
          O slot <code>action</code> fica à direita do nome — na missão, o botão de ouvir quando há
          gravação.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Design próprio: a seção não tem quadro de balão no Figma."
      />
      <Grade>
        <Cartao icone="📐" titulo="De onde vêm as medidas">
          Avatar <code>sm</code> (40px) do <code>Avatar</code>; balão com o raio de 16px e o fio de 1px do{' '}
          <code>Card</code>; recuo de 12px 16px; nome 14/20 semibold; fala 16/24. A ponta é um quadrado de
          12px girado, com o centro à altura do centro do avatar.
        </Cartao>
        <Cartao icone="🎨" titulo="Cores">
          Leitor: <code>neutral-100</code> com fio <code>neutral-150</code>. Guia: <code>brandnavy-100</code>{' '}
          com fio <code>brandnavy-300</code>. Humor: fio de 2px em <code>warning-600</code> (3,65:1) ou{' '}
          <code>success-700</code> (4,45:1), ícone em <code>warning-700</code> ou <code>success-700</code>.
        </Cartao>
        <Cartao icone="⚠️" titulo="Desvios registrados">
          A fala é 16px LITERAL: o token <code>--unooria-size-body-s</code> cai para 14px abaixo de 768px de
          viewport, e a fala é lida por uma criança de 9 anos no aparelho de 375px. Todos os glifos são do
          quadro de ícones <code>6024:2923</code>: <code>sentiment_dissatisfied</code> e{' '}
          <code>sentiment_satisfied</code> no componente, <code>volume_up</code> no botão de ouvir da estória.
        </Cartao>
        <Cartao icone="🏷️" titulo="Por que figure">
          Fala atribuída é citação com legenda: <code>&lt;figure&gt;</code> com <code>&lt;blockquote&gt;</code>{' '}
          e <code>&lt;figcaption&gt;</code>. A figura se nomeia pela legenda, sem <code>aria-label</code>{' '}
          duplicado e sem <code>useId</code> — segue Server Component.
        </Cartao>
      </Grade>

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Avatar, nome, humor, ação e fala — e o balão por trás."
      />
      <Grade>
        <Cartao icone="1" titulo="Avatar">
          Foto (<code>avatarSrc</code>), iniciais (<code>avatarInitials</code>) ou as iniciais do{' '}
          <code>speaker</code>. Decorativo: fica sob <code>aria-hidden</code>, porque o nome está escrito.
        </Cartao>
        <Cartao icone="2" titulo="Nome e humor">
          O <code>&lt;figcaption&gt;</code> guarda SÓ o nome; o ícone de humor é irmão dele, para a figura se
          chamar “Família no portão”, e não “Família no portão Não gostou”.
        </Cartao>
        <Cartao icone="3" titulo="Fala e ação">
          A fala é um <code>&lt;blockquote&gt;</code>. A ação aparece à direita do nome, mas vem DEPOIS da fala
          no DOM: o leitor de tela ouve a fala e então acha o botão que a repete.
        </Cartao>
      </Grade>
      <Palco rotulo="Guia com ação de ouvir">
        <SpeechBubble speaker="Bento" tone="guide" avatarSrc={bento} action={<Ouvir quem="Bento" />}>
          {FALA_DO_GUIA}
        </SpeechBubble>
      </Palco>

      <UnooriaDocSectionHeader
        title="4. Matriz de Variantes e Estados"
        description="Guia, os três humores do leitor e o lado end."
      />
      <Palco rotulo="A redação reagindo à 1ª edição">
        <Redacao bento={bento} />
      </Palco>
      <Palco rotulo='side="end" — alternando vozes numa conversa'>
        <SpeechBubble speaker="Família no portão" mood="upset" avatarInitials="FA">
          {FALA_DA_FAMILIA}
        </SpeechBubble>
        <SpeechBubble speaker="Bento" tone="guide" avatarSrc={bento} side="end">
          Vamos conferir a data dessa gincana antes da 2ª edição.
        </SpeechBubble>
      </Palco>

      <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do balão." />
      <Praticas
        fazer={[
          'Escrever o nome de quem fala — ele nomeia a figura.',
          'Usar tone="guide" só para quem conduz a missão.',
          'Dar mood só a leitor, e só quando a reação importa para a história.',
          'Pôr no botão de ouvir um nome com quem fala: “Ouvir a fala de Bento”.',
          'Mostrar o texto da fala mesmo quando há gravação.',
        ]}
        evitar={[
          'Humor só pela cor do fio — o ícone com nome é o que conta.',
          'Foto de pessoa real no avatar de personagem.',
          'Balão para aviso do sistema: aviso é FeedbackAlert ou Snackbar.',
          'Tocar a gravação sozinho ao aparecer.',
          'Fala longa demais: acima de três linhas no aparelho, divida em dois balões.',
        ]}
      />

      <UnooriaDocSectionHeader title="6. Suporte a Temas" description="Claro e escuro, em tempo real." />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['light', 'dark'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTema(t)}
            aria-pressed={tema === t}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--unooria-color-neutral-200)',
              background: tema === t ? 'var(--unooria-color-neutral-150)' : 'var(--unooria-color-neutral-50)',
              color: 'var(--unooria-color-neutral-950)',
              cursor: 'pointer',
            }}
          >
            {t === 'light' ? 'Claro' : 'Escuro'}
          </button>
        ))}
      </div>
      <Palco rotulo={`Tema ${tema === 'light' ? 'claro' : 'escuro'}`} escuro={tema === 'dark'}>
        <Redacao bento={bento} tema={tema} />
        <SpeechBubble speaker="Bento" tone="guide" avatarSrc={bento} side="end" theme={tema}>
          Vamos conferir a data dessa gincana antes da 2ª edição.
        </SpeechBubble>
      </Palco>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente SpeechBubble."
      />
      <TabelaDeProps
        linhas={[
          { nome: 'speaker', tipo: 'ReactNode', descricao: 'O nome de quem fala, visível; nomeia a figura. Obrigatório.' },
          { nome: 'children', tipo: 'ReactNode', descricao: 'A fala. Obrigatório.' },
          { nome: 'tone', tipo: "'guide' | 'reader'", padrao: "'reader'", descricao: 'Guia (destaque de marca) ou leitor (neutro).' },
          { nome: 'mood', tipo: "'neutral' | 'upset' | 'happy'", padrao: "'neutral'", descricao: 'Humor do leitor: acento de cor e ícone com nome. Ignorado no guia.' },
          { nome: 'moodLabel', tipo: 'string', descricao: 'Nome acessível do ícone de humor. Sem ele: “Não gostou” / “Gostou”.' },
          { nome: 'avatarSrc', tipo: 'string', descricao: 'Foto de quem fala.' },
          { nome: 'avatarInitials', tipo: 'string', descricao: 'Iniciais sem foto. Sem elas, saem do speaker quando é texto.' },
          { nome: 'side', tipo: "'start' | 'end'", padrao: "'start'", descricao: 'Lado do avatar e da ponta do balão.' },
          { nome: 'action', tipo: 'ReactNode', descricao: 'Slot à direita do nome (o botão de ouvir a fala).' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof SpeechBubble> = {
  title: 'Plataforma Unooria/Componentes/SpeechBubble',
  component: SpeechBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    speaker: { control: 'text', description: 'O nome de quem fala.' },
    children: { control: 'text', description: 'A fala.' },
    tone: { control: 'radio', options: ['guide', 'reader'], description: 'Guia ou leitor.' },
    mood: { control: 'radio', options: ['neutral', 'upset', 'happy'], description: 'Humor do leitor.' },
    moodLabel: { control: 'text', description: 'Nome acessível do ícone de humor.' },
    avatarSrc: { control: 'text', description: 'Foto de quem fala.' },
    avatarInitials: { control: 'text', description: 'Iniciais sem foto.' },
    side: { control: 'radio', options: ['start', 'end'], description: 'Lado do avatar e da ponta.' },
    action: { control: false, description: 'Slot à direita do nome. No playground: o botão Ouvir.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    speaker: 'Família no portão',
    children: FALA_DA_FAMILIA,
    tone: 'reader',
    mood: 'upset',
    moodLabel: '',
    avatarSrc: '',
    avatarInitials: 'FA',
    side: 'start',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SpeechBubble>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SpeechBubbleDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas, na largura do aparelho.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SpeechBubble',
  render: (args) => (
    <div
      style={{
        boxSizing: 'border-box',
        width: 375,
        maxWidth: '100%',
        padding: 16,
        background: args.theme === 'dark' ? 'var(--unooria-color-neutraldark-50)' : 'var(--unooria-color-neutral-50)',
      }}
    >
      <SpeechBubble
        {...args}
        avatarSrc={args.avatarSrc || undefined}
        avatarInitials={args.avatarInitials || undefined}
        moodLabel={args.moodLabel || undefined}
        action={<Ouvir quem={typeof args.speaker === 'string' ? args.speaker : 'quem fala'} tema={args.theme} />}
      />
    </div>
  ),
};

/**
 * O guia: o Bento, colega editor, com o botão de ouvir a fala.
 */
export const Guia: Story = {
  name: '🧭 Guia',
  render: function GuiaRender() {
    const bento = useBento();
    return (
      <div style={{ width: 375, maxWidth: '100%' }}>
        <SpeechBubble speaker="Bento" tone="guide" avatarSrc={bento} action={<Ouvir quem="Bento" />}>
          {FALA_DO_GUIA}
        </SpeechBubble>
      </div>
    );
  },
};

/**
 * Os leitores da escola nos três humores: chateado, neutro e contente.
 */
export const Leitores: Story = {
  name: '🏫 Leitores nos três humores',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 375, maxWidth: '100%' }}>
      <SpeechBubble speaker="Família no portão" mood="upset" avatarInitials="FA">
        {FALA_DA_FAMILIA}
      </SpeechBubble>
      <SpeechBubble speaker="Secretaria da escola" avatarInitials="SE">
        {FALA_DA_SECRETARIA}
      </SpeechBubble>
      <SpeechBubble speaker="Professor do 5º ano" mood="happy" avatarInitials="PR">
        {FALA_DO_PROFESSOR}
      </SpeechBubble>
    </div>
  ),
};

/**
 * `side="end"`: o avatar e a ponta à direita, para alternar vozes.
 */
export const LadoEnd: Story = {
  name: '↔️ Lado end',
  render: function LadoEndRender() {
    const bento = useBento();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 375, maxWidth: '100%' }}>
        <SpeechBubble speaker="Família no portão" mood="upset" avatarInitials="FA">
          {FALA_DA_FAMILIA}
        </SpeechBubble>
        <SpeechBubble speaker="Bento" tone="guide" avatarSrc={bento} side="end">
          Vamos conferir a data dessa gincana antes da 2ª edição.
        </SpeechBubble>
        <SpeechBubble speaker="Professor do 5º ano" mood="happy" avatarInitials="PR" side="end">
          {FALA_DO_PROFESSOR}
        </SpeechBubble>
      </div>
    );
  },
};

/**
 * As garantias verificadas: o nome e a fala expostos, o humor com ícone
 * nomeado, o avatar fora da árvore acessível e o humor ignorado no guia.
 */
export const Estados: Story = {
  render: function EstadosRender() {
    const bento = useBento();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 375, maxWidth: '100%' }}>
        {/* `mood` no guia é ignorado de propósito: o teste confere. */}
        <SpeechBubble speaker="Bento" tone="guide" mood="upset" avatarSrc={bento} action={<Ouvir quem="Bento" />}>
          {FALA_DO_GUIA}
        </SpeechBubble>
        <SpeechBubble speaker="Família no portão" mood="upset" avatarInitials="FA">
          {FALA_DA_FAMILIA}
        </SpeechBubble>
        <SpeechBubble speaker="Professor do 5º ano" mood="happy" avatarInitials="PR" side="end">
          {FALA_DO_PROFESSOR}
        </SpeechBubble>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const [guia, familia, professor] = tela.getAllByRole('figure');

    // O nome é a legenda, filha direta da figura (é dela que o navegador tira
    // o nome da figura), e a fala está no blockquote.
    const legenda = guia.querySelector(':scope > figcaption');
    await expect(legenda).toHaveTextContent(/^Bento$/);
    await expect(guia.querySelector(':scope > blockquote')).toHaveTextContent(FALA_DO_GUIA);
    await expect(familia.querySelector(':scope > figcaption')).toHaveTextContent(/^Família no portão$/);
    await expect(within(familia).getByText(FALA_DA_FAMILIA)).toBeInTheDocument();

    // O humor tem ícone com nome — não é só a cor do fio.
    await expect(within(familia).getByRole('img', { name: 'Não gostou' })).toHaveTextContent('sentiment_dissatisfied');
    await expect(within(professor).getByRole('img', { name: 'Gostou' })).toHaveTextContent('sentiment_satisfied');

    // No guia, o humor é ignorado, e o avatar (foto) fica fora da árvore acessível.
    await expect(within(guia).queryAllByRole('img')).toHaveLength(0);

    // A ação é alcançável e vem depois da fala no DOM.
    const ouvir = within(guia).getByRole('button', { name: 'Ouvir a fala de Bento' });
    const fala = guia.querySelector(':scope > blockquote') as HTMLElement;
    await expect(fala.compareDocumentPosition(ouvir) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  },
};
