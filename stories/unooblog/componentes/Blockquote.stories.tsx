import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Blockquote } from '../../../src/unooblog/components/Blockquote';
import type { UblBlockquoteVariant } from '../../../src/unooblog/components/Blockquote';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const VARIANTS: UblBlockquoteVariant[] = ['quote', 'pull'];

const TEXTO =
  'Acessibilidade não é um recurso que se acrescenta no fim; é a diferença entre um produto que funciona para todo mundo e um que só parece funcionar.';
const AUTORIA = 'Renata Prado, pesquisadora em acessibilidade';

const COLUNA: React.CSSProperties = { width: 'min(680px, 100%)', boxSizing: 'border-box' };

/**
 * Página de documentação rica do componente Blockquote.
 */
const BlockquoteDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="Blockquote"
      description="Citação do post em duas formas: dentro do texto, com filete à esquerda, ou em destaque, centralizada e maior. É um <figure> com <blockquote> e legenda de autoria."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando a voz de outra pessoa entra no texto."
    />
    <UblDocGrid>
      <UblDocCard icon="❝" title="Citação no texto (quote)">
        Uma fala ou um trecho que o autor comenta. O filete de 4px na cor de ação separa a voz alheia
        do texto sem tirar a citação da coluna.
      </UblDocCard>
      <UblDocCard icon="📣" title="Citação em destaque (pull)">
        Uma frase que resume o post, repetida em tamanho grande para quem passa o olho. Centralizada,
        com fios finos acima e abaixo.
      </UblDocCard>
      <UblDocCard icon="✍️" title="Autoria na legenda">
        A autoria vai numa <code>&lt;figcaption&gt;</code> depois de um travessão escrito no texto,
        para que o leitor de tela o anuncie.
      </UblDocCard>
      <UblDocCard icon="📐" title="Cai de tamanho">
        A variante pull cai de heading-2 para heading-3 quando o contêiner é estreito.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="Blockquote"
      layout="Coluna · citação e autoria · filete à esquerda (quote) ou centralizada (pull)"
      specs={[
        { label: 'Raiz', value: '<figure> · <blockquote> · <figcaption> com a autoria' },
        { label: 'Filete (quote)', value: '4px (--ubl-spacing-3xs) · --ubl-color-action-primary' },
        { label: 'Texto (quote)', value: 'quote (24/34) itálico · --ubl-color-text-primary' },
        { label: 'Texto (pull)', value: 'heading-2 (34/48) itálico; heading-3 (24/34) abaixo de 640px de contêiner' },
        { label: 'Fios (pull)', value: '1px em --ubl-color-border-subtle, acima e abaixo' },
        { label: 'Glifo (pull)', value: 'quote, 32px, --ubl-color-icon-accent' },
        { label: 'Autoria', value: 'label (14/20) · --ubl-color-text-secondary · "— " escrito no texto' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Substitui o PullQuote do Unoojornal',
          detail:
            'o Unoojornal tem uma citação em destaque só. O blog precisa da citação dentro do texto (a de quem comenta) e da citação em destaque; as duas são o mesmo componente, com variant.',
        },
        {
          subject: 'Pull sem filete, com fios e aspas',
          detail:
            'a citação em destaque se centraliza e troca o filete lateral por dois fios e um glifo de aspas em tom de acento: lê como destaque editorial sem copiar o filete da citação comum.',
        },
        {
          subject: 'Itálico no lugar de serifa',
          detail:
            'a identidade do módulo é Open Sans; a citação se distingue pelo itálico e pelo tamanho, e não por uma segunda família tipográfica.',
        },
        {
          subject: 'Travessão escrito, não desenhado',
          detail:
            'a legenda começa com "— " no próprio texto, e não com um pseudo-elemento, para que o leitor de tela anuncie a quebra entre a fala e a autoria.',
        },
        {
          subject: 'É contêiner de consulta',
          detail:
            'a variante pull decide o tamanho pela largura do próprio bloco, e não pela da janela: numa coluna estreita ao lado de um sumário, ela cai de degrau mesmo com a janela larga.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Filete, texto e autoria."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <Blockquote cite={AUTORIA}>{TEXTO}</Blockquote>
      </div>
      <UblDocAnatomy
        zones={[
          { name: 'Filete', role: 'Faixa de 4px à esquerda que separa a citação do texto.', token: '--ubl-color-action-primary' },
          { name: 'Texto', role: 'A citação em itálico, sem aspas.', token: 'quote (24/34)' },
          { name: 'Autoria', role: 'Quem disse, depois de um travessão.', token: 'label · text-secondary' },
          { name: 'Aspas (pull)', role: 'Glifo decorativo no topo da citação em destaque.', token: 'Icon quote' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As duas variantes, com e sem autoria."
    />
    <UblDocStage label="Variantes com autoria" surface="page" align="stretch" direction="column" padding={24}>
      {VARIANTS.map((variante) => (
        <div key={variante} style={COLUNA}>
          <Blockquote variant={variante} cite={AUTORIA}>
            {TEXTO}
          </Blockquote>
        </div>
      ))}
    </UblDocStage>
    <UblDocStage label="Variantes sem autoria" surface="page" align="stretch" direction="column" padding={24}>
      {VARIANTS.map((variante) => (
        <div key={variante} style={COLUNA}>
          <Blockquote variant={variante}>{TEXTO}</Blockquote>
        </div>
      ))}
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar a citação." />
    <UblDocPractices
      dos={[
        'Citar o trecho exato e dizer quem falou e em que papel.',
        'Usar pull para uma frase do próprio post, repetida em destaque.',
        'Manter a citação curta: uma ou duas frases.',
        'Usar quote quando o texto vai comentar a fala logo em seguida.',
      ]}
      donts={[
        'Pôr aspas no texto: o filete e o itálico já dizem que é citação.',
        'Usar pull mais de uma vez por post.',
        'Usar a citação para avisos: para isso existe o Callout.',
        'Citar sem autoria quando a fonte importa.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Filete, fios e glifo acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => (
        <div style={{ ...COLUNA, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Blockquote theme={tema} cite={AUTORIA}>
            {TEXTO}
          </Blockquote>
          <Blockquote theme={tema} variant="pull" cite={AUTORIA}>
            {TEXTO}
          </Blockquote>
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Blockquote. Os demais atributos vão ao <figure> raiz."
    />
    <UblDocPropsTable
      title="Blockquote"
      rows={[
        { name: 'children', type: 'ReactNode', description: 'Texto da citação, sem aspas.' },
        { name: 'cite', type: 'ReactNode', description: 'Quem disse, com o cargo ou a fonte. Aparece depois de um travessão.' },
        { name: 'variant', type: "'quote' | 'pull'", default: "'quote'", description: 'quote: filete à esquerda; pull: centralizada e maior.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Blockquote> = {
  title: 'Unooblog/Componentes/Blockquote',
  component: Blockquote,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto da citação, sem aspas.' },
    cite: { control: 'text', description: 'Quem disse, com o cargo ou a fonte.' },
    variant: { control: 'radio', options: VARIANTS, description: 'quote: filete à esquerda; pull: centralizada e maior.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    children: TEXTO,
    cite: AUTORIA,
    variant: 'quote',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Blockquote>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BlockquoteDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Blockquote',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <Blockquote {...args} />
      </div>
    </UblDocStage>
  ),
};

/**
 * Citação no texto e citação em destaque, no mesmo post.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: citações no post',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div
        style={{
          ...COLUNA,
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          fontFamily: 'var(--ubl-font-sans)',
          color: 'var(--ubl-color-text-primary)',
        }}
      >
        <p className="ubl-text ubl-text--prose">
          Em entrevista para esta série, a pesquisadora resumiu o argumento deste texto.
        </p>
        <Blockquote cite={AUTORIA}>{TEXTO}</Blockquote>
        <p className="ubl-text ubl-text--prose">
          A frase vale como regra de projeto, e por isso a repetimos em destaque.
        </p>
        <Blockquote variant="pull">Acessibilidade se prova na prática, não no relatório.</Blockquote>
      </div>
    </UblDocStage>
  ),
};

/**
 * A citação em larguras de contêiner diferentes: a pull cai de degrau abaixo de 640px.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      {[320, 480, 720].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%' }}>
          <p style={{ margin: '0 0 8px', fontFamily: 'var(--ubl-font-sans)', fontSize: 12, color: 'var(--ubl-color-text-secondary)' }}>
            Contêiner de {largura}px
          </p>
          <Blockquote variant="pull" cite="Marina Azevedo">
            Boa interface é a que não precisa de manual.
          </Blockquote>
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * As duas variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      {VARIANTS.map((variante) => (
        <div key={variante} style={COLUNA}>
          <Blockquote variant={variante} cite={AUTORIA}>
            {TEXTO}
          </Blockquote>
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Com e sem autoria, e com marcação dentro do texto.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <div style={COLUNA}>
        <Blockquote>Citação sem autoria.</Blockquote>
      </div>
      <div style={COLUNA}>
        <Blockquote cite="Otávio Lins, professor e editor">Citação com autoria.</Blockquote>
      </div>
      <div style={COLUNA}>
        <Blockquote cite="Caio Menezes">
          Citação com <strong>destaque</strong> e um <em>termo em itálico</em> dentro do texto.
        </Blockquote>
      </div>
    </UblDocStage>
  ),
};

/**
 * As duas variantes nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UblDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="page"
          theme={tema}
          align="stretch"
          direction="column"
          padding={24}
          width={420}
        >
          <Blockquote theme={tema} cite="Renata Prado">
            Acessibilidade se prova na prática.
          </Blockquote>
          <Blockquote theme={tema} variant="pull" cite="Renata Prado">
            Acessibilidade se prova na prática.
          </Blockquote>
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * A citação é um `<figure>` com `<blockquote>`, e a autoria começa com o travessão escrito.
 */
export const EstruturaEAutoria: Story = {
  name: 'Estrutura e autoria',
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <Blockquote {...args} />
      </div>
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('figure')).toBeInTheDocument();
    await expect(tela.getByText(args.children as string).tagName).toBe('BLOCKQUOTE');
    await expect(tela.getByText(`— ${args.cite as string}`)).toBeInTheDocument();
  },
};
