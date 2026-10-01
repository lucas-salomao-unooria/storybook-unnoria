import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { PullQuote } from '../../../src/unoojornal/components/PullQuote';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';
import { ujnArticles } from '../fixtures';

const BAR = '#716C98';

/** A citação da matéria principal da edição, com a fonte. */
const CITACAO = ujnArticles[0].body.find((bloco) => bloco.type === 'quote');
const TEXTO =
  CITACAO && CITACAO.type === 'quote'
    ? CITACAO.text
    : 'O produto final importa, mas o que a gente avalia é o caminho.';
const FONTE =
  CITACAO && CITACAO.type === 'quote'
    ? CITACAO.cite
    : 'Prof. Ivan Toledo, Orientador do Departamento de Ciências';

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  color: 'var(--ujn-color-text-secondary)',
};

/**
 * Citação com legenda, na largura pedida.
 */
const CitacaoRotulada: React.FC<{
  rotulo: string;
  largura?: number | string;
  props?: Partial<React.ComponentProps<typeof PullQuote>>;
}> = ({ rotulo, largura = 480, props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: largura }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <PullQuote cite={FONTE} {...props}>
      {TEXTO}
    </PullQuote>
  </div>
);

/**
 * Página de documentação rica do componente PullQuote.
 */
const PullQuoteDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Matéria"
      title="PullQuote"
      description="Citação em destaque no meio da matéria: a frase que merece pausa, em itálico, com um filete à esquerda e a fonte logo abaixo."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Dar voz a quem foi ouvido."
    />
    <UjnDocGrid>
      <UjnDocCard icon="💬" title="Frase em destaque">
        Pega a fala mais forte de uma fonte e a põe em evidência entre dois parágrafos, quebrando a
        coluna de texto sem sair dela.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="A fonte sempre à vista">
        O <code>cite</code> vira um <code>&lt;figcaption&gt;</code> com travessão, escrito no texto,
        e o leitor de tela o anuncia.
      </UjnDocCard>
      <UjnDocCard icon="🧱" title="Marcação de citação">
        É um <code>&lt;figure&gt;</code> com um <code>&lt;blockquote&gt;</code>: a semântica certa
        para uma fala atribuída.
      </UjnDocCard>
      <UjnDocCard icon="🌗" title="Claro e escuro">
        O filete usa <code>action-primary</code> e o texto, a escala de cinzas, que mudam com o tema.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da tela da matéria; cores e fontes são as da Plataforma Unooria."
    />
    <UjnDocSpecs
      component="PullQuote"
      layout="Figura em coluna · filete à esquerda · citação e fonte"
      specs={[
        { label: 'Estrutura herdada', value: 'Tela article-detail 3:363 (citação em destaque)' },
        { label: 'Citação', value: 'Quote (24/34, 400, itálico)' },
        { label: 'Fonte', value: 'Label (14/20, 600) em --ujn-color-text-secondary' },
        { label: 'Filete', value: '--ujn-rule-thick (3px) em --ujn-color-action-primary' },
        { label: 'Recuo', value: '--ujn-spacing-xxl (24px) após o filete' },
        { label: 'Marcação', value: '<figure> › <blockquote> + <figcaption>' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Serifa itálica → Open Sans itálico',
          detail:
            'a citação do quadro de origem é em serifa itálica; aqui é Open Sans itálico (quote), a família única do módulo.',
        },
        {
          subject: 'Dourado → roxo de ação',
          detail:
            'o filete dourado do quadro é --ujn-color-action-primary, nos dois temas.',
        },
        {
          subject: 'Travessão no texto',
          detail:
            'o "— " antes da fonte é caractere do <figcaption>, e não pseudo-elemento: assim leitores de tela e a cópia do texto o levam junto.',
        },
        {
          subject: 'Fonte fora do itálico',
          detail:
            'a fonte é normal e semibold, para se distinguir da fala. A hierarquia vem da escala (label sobre quote), e não só da cor.',
        },
        {
          subject: 'Plana',
          detail:
            'sem fundo e sem sombra: a citação se destaca pelo filete e pelo corpo maior, como no jornal impresso.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Filete, citação e fonte."
    />
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <PullQuote cite={FONTE}>{TEXTO}</PullQuote>
      <UjnDocAnatomy
        zones={[
          { name: 'Filete', role: 'Barra à esquerda que marca a citação.', token: '--ujn-rule-thick · --ujn-color-action-primary' },
          { name: 'Citação', role: 'O <blockquote>, em itálico.', token: '--ujn-font-quote-*' },
          { name: 'Fonte', role: 'O <figcaption>, com travessão, nome e cargo.', token: '--ujn-font-label-*' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Com e sem fonte, em três larguras."
    />
    <UjnDocStage label="Larguras" surface="card" align="flex-start" padding={24}>
      <CitacaoRotulada rotulo="360px" largura={360} />
      <CitacaoRotulada rotulo="480px" largura={480} />
      <CitacaoRotulada rotulo="740px (coluna de leitura)" largura={740} />
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="card" align="flex-start" padding={24}>
      <CitacaoRotulada rotulo="Com fonte" />
      <CitacaoRotulada rotulo="Sem fonte" props={{ cite: undefined }} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando destacar uma fala." />
    <UjnDocPractices
      dos={[
        'Citar a frase exatamente como foi dita, sem aspas: o filete e o itálico já dizem que é citação.',
        'Dar o nome e o cargo da fonte no cite.',
        'Escolher uma frase que se sustente sozinha, fora do parágrafo.',
        'Usar uma por matéria, no máximo duas em textos longos.',
      ]}
      donts={[
        'Usar a citação para frases do autor: isso é texto corrido.',
        'Encher o cite com datas e locais: o travessão é para quem falou.',
        'Colocá-la no começo da matéria, antes de o leitor saber de quem é a voz.',
        'Repetir a mesma frase que já está no deck ou no título.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Filete, citação e fonte acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="card" padding={32}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <PullQuote cite={FONTE} theme={tema}>
            {TEXTO}
          </PullQuote>
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do PullQuote. Os demais atributos vão ao <figure>."
    />
    <UjnDocPropsTable
      title="PullQuote"
      rows={[
        { name: 'children', type: 'ReactNode', description: 'Texto da citação, sem aspas. Obrigatório.' },
        { name: 'cite', type: 'ReactNode', description: 'Quem disse, com o cargo. Vira o <figcaption>, depois de um travessão.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PullQuote> = {
  title: 'Unoojornal/Componentes/PullQuote',
  component: PullQuote,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto da citação, sem aspas.' },
    cite: { control: 'text', description: 'Quem disse, com o cargo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: TEXTO,
    cite: FONTE,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PullQuote>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PullQuoteDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PullQuote',
  render: (args) => (
    <UjnDocStage surface="card" theme={args.theme} align="stretch" direction="column" padding={32}>
      <PullQuote {...args} />
    </UjnDocStage>
  ),
};

/**
 * A citação da matéria principal, com a fonte (tela `article-detail`, `3:363`).
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: citação da matéria',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <PullQuote cite="Prof. Ivan Toledo, Orientador do Departamento de Ciências">
        {TEXTO}
      </PullQuote>
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(canvasElement.querySelector('figure > blockquote')).not.toBeNull();
    await expect(
      tela.getByText('— Prof. Ivan Toledo, Orientador do Departamento de Ciências')
    ).toBeInTheDocument();
  },
};

/**
 * A citação em três larguras: o corpo é o mesmo, a quebra de linha muda.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <CitacaoRotulada rotulo="360px" largura={360} />
      <CitacaoRotulada rotulo="480px" largura={480} />
      <CitacaoRotulada rotulo="740px" largura={740} />
    </UjnDocStage>
  ),
};

/**
 * O componente tem uma única forma; a variação é a fonte.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <CitacaoRotulada rotulo="Com fonte" />
      <CitacaoRotulada rotulo="Sem fonte" props={{ cite: undefined }} />
      <CitacaoRotulada
        rotulo="Fonte como nó (com link)"
        props={{ cite: <a href="#toledo">Prof. Ivan Toledo</a> }}
      />
    </UjnDocStage>
  ),
};

/**
 * Citação curta e citação longa.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <CitacaoRotulada rotulo="Curta" props={{ children: 'O caminho importa.' }} />
      <CitacaoRotulada rotulo="Longa" largura={560} />
    </UjnDocStage>
  ),
};

/**
 * A citação nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UjnDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="card"
          theme={tema}
          align="stretch"
          direction="column"
          padding={32}
          width={520}
        >
          <PullQuote cite={FONTE} theme={tema}>
            {TEXTO}
          </PullQuote>
        </UjnDocStage>
      ))}
    </div>
  ),
};
