import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { PostBody } from '../../../src/unooblog/components/PostBody';
import type { UblPostBodyTextSize } from '../../../src/unooblog/components/PostBody';
import { Figure } from '../../../src/unooblog/components/Figure';
import { Callout } from '../../../src/unooblog/components/Callout';
import { ublTableOfContents } from '../../../src/unooblog/content';
import type { UblBlock } from '../../../src/unooblog/content';
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
import { ublImages, ublPosts } from '../fixtures';

const BAR = '#716C98';

const SIZES: UblPostBodyTextSize[] = ['sm', 'md', 'lg'];

const POST = ublPosts[0];

/** Um trecho do post das fixtures, com todos os tipos de bloco. */
const BLOCOS: UblBlock[] = POST.body;

/** Poucos blocos, um de cada tipo, para as matrizes. */
const AMOSTRA: UblBlock[] = [
  { type: 'paragraph', text: 'O foco é a posição do teclado na página. Cada Tab avança para o próximo controle.' },
  { type: 'heading', level: 2, text: 'Por que o foco precisa aparecer', id: 'por-que-o-foco-precisa-aparecer' },
  { type: 'paragraph', text: 'Sem um indicador, a pessoa precisa adivinhar onde está, e adivinhar errado custa caro.' },
  { type: 'heading', level: 3, text: 'Em componentes compostos', id: 'em-componentes-compostos' },
  { type: 'list', items: ['Espessura mínima de dois pixels.', 'Afastamento entre o elemento e o contorno.'] },
  { type: 'list', ordered: true, items: ['Largue o mouse.', 'Navegue só com Tab e Shift+Tab.'] },
  { type: 'callout', tone: 'tip', title: 'Um anel, vários fundos', text: 'Defina a cor do foco por tema e meça os dois.' },
  { type: 'quote', text: 'Acessibilidade se prova na prática, não no relatório.', cite: 'Renata Prado' },
  { type: 'code', language: 'css', filename: 'foco.css', highlightLines: [2], code: ':focus-visible {\n  outline: 3px solid var(--cor-foco);\n}' },
  { type: 'figure', src: ublImages[0].src, alt: ublImages[0].alt, caption: 'O anel de foco tem espessura, afastamento e cor próprios.', credit: 'Ilustração: equipe do Caderno Aberto' },
];

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};

/**
 * Página de documentação rica do componente PostBody.
 */
const PostBodyDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="PostBody"
      description="A coluna de leitura do post: recebe os blocos do conteúdo (ou HTML livre) e os compõe com Blockquote, CodeBlock, Callout e Figure, em prosa de 18/28 numa coluna de 680px."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Onde o texto do post vira página."
    />
    <UblDocGrid>
      <UblDocCard icon="📄" title="Blocos do conteúdo">
        <code>blocks</code> recebe a lista do domínio (parágrafo, subtítulo, citação, código,
        aviso, figura e lista) e cada tipo vira o componente certo.
      </UblDocCard>
      <UblDocCard icon="🧩" title="HTML livre">
        <code>children</code> aceita parágrafos, listas, links e os componentes do módulo, para
        páginas que não vêm do modelo de domínio.
      </UblDocCard>
      <UblDocCard icon="🔗" title="Subtítulos com âncora">
        Cada subtítulo leva um <code>id</code> (alvo do sumário) e um link discreto, visível no
        foco e no hover, para copiar o endereço da seção.
      </UblDocCard>
      <UblDocCard icon="🔠" title="Três tamanhos de texto">
        <code>textSize</code> troca o corpo entre 16/24, 18/28 e 20/30, para quem quer ler maior ou
        menor.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="PostBody"
      layout="Coluna única de 680px (--ubl-reading-width), centralizada · ritmo vertical por tokens"
      specs={[
        { label: 'Coluna', value: 'max-width --ubl-reading-width (680px) · ~68 caracteres por linha' },
        { label: 'Parágrafo', value: 'prose (18/28) · sm: body-lg (16/24) · lg: lead (20/30)' },
        { label: 'Subtítulos', value: '<h2> em heading-3 (24/34) · <h3> em heading-4 (20/30)' },
        { label: 'Ritmo', value: '20px entre blocos · 48px antes de <h2> · 32px antes de <h3>, figura, aviso e código' },
        { label: 'Links', value: '--ubl-color-text-accent · sublinhados · foco com anel de 2px' },
        { label: 'Listas', value: 'recuo 24px · marcador em --ubl-color-text-accent' },
        { label: 'Âncora', value: 'link com glifo link · alvo 44px · opacidade 0 até hover ou foco' },
        { label: 'Rolagem', value: 'scroll-margin-top = --ubl-site-header-height + 16px' },
        { label: 'Compõe', value: 'Blockquote · CodeBlock · Callout · Figure' },
        { label: 'Fronteira', value: 'Server Component (o CodeBlock é Client e se hidrata sozinho)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Aceita blocos e filhos',
          detail:
            'blocks vem do modelo de domínio e garante o mesmo resultado em qualquer página; children serve a conteúdo livre e vem depois dos blocos. As duas entradas podem coexistir.',
        },
        {
          subject: 'Âncora fora do título',
          detail:
            'o link de cada seção é irmão do <h2>/<h3>, e não filho dele: se estivesse dentro, o nome acessível do título seria "Título Link para a seção Título". O id fica no próprio título, que é onde o sumário rola.',
        },
        {
          subject: 'Âncora discreta, mas alcançável',
          detail:
            'o link fica invisível (opacidade 0) até o hover do título ou o foco por teclado, e fica sempre visível, em tom mais fraco, em telas sem ponteiro (hover: none). O alvo tem 44px.',
        },
        {
          subject: 'Rolagem que respeita o cabeçalho fixo',
          detail:
            'scroll-margin-top soma a altura do cabeçalho do site e 16px: ao seguir o sumário, o título da seção não fica escondido atrás da barra.',
        },
        {
          subject: 'Subtítulos menores que no Unoojornal',
          detail:
            'o <h2> do corpo usa heading-3 (24px) e o <h3> usa heading-4 (20px): heading-1 é do título do post e heading-2, do cabeçalho em larguras médias; manter o corpo abaixo preserva a hierarquia visual.',
        },
        {
          subject: 'Sem coluna de consulta',
          detail:
            'a coluna não é contêiner de consulta: a figura wide precisa ler a largura do contêiner de fora para extrapolar a coluna; um contêiner na própria coluna a limitaria aos 680px.',
        },
        {
          subject: 'Avisos, código e figuras na mesma coluna',
          detail:
            'os componentes compostos preenchem a coluna (100% da largura de 680px) e ganham 32px de respiro. O bloco de código rola dentro da própria coluna, sem alargá-la.',
        },
        {
          subject: 'Numeração do código por prop',
          detail:
            'codeLineNumbers liga a numeração em todos os blocos de código do corpo; o domínio não tem esse dado por bloco, e a decisão é de apresentação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Parágrafos, subtítulos com âncora e blocos compostos."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <PostBody blocks={AMOSTRA.slice(0, 7)} />
      <UblDocAnatomy
        zones={[
          { name: 'Parágrafo', role: 'Prosa em 18/28, na cor primária.', token: 'prose' },
          { name: 'Subtítulo', role: '<h2> ou <h3> com id (alvo do sumário).', token: 'heading-3 · heading-4' },
          { name: 'Âncora', role: 'Link da seção, visível no foco e no hover.', token: 'Icon link' },
          { name: 'Lista', role: 'Ordenada ou não, com marcador em acento.', token: 'text-accent' },
          { name: 'Blocos compostos', role: 'Blockquote, CodeBlock, Callout e Figure.', token: 'blocks' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três tamanhos de texto e todos os tipos de bloco."
    />
    {SIZES.map((tamanho) => (
      <UblDocStage
        key={tamanho}
        label={`textSize="${tamanho}"`}
        surface="page"
        align="stretch"
        direction="column"
        padding={24}
      >
        <PostBody textSize={tamanho} blocks={AMOSTRA.slice(0, 6)} />
      </UblDocStage>
    ))}
    <UblDocStage label="Todos os tipos de bloco" surface="page" align="stretch" direction="column" padding={24}>
      <PostBody blocks={AMOSTRA} codeLineNumbers />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o corpo do post." />
    <UblDocPractices
      dos={[
        'Dar um id estável a cada subtítulo e usá-lo no sumário.',
        'Escrever parágrafos curtos: três a cinco linhas.',
        'Usar Callout e Blockquote com parcimônia: um por seção, no máximo.',
        'Deixar o texto na largura da coluna: uma linha de cerca de 68 caracteres é a que se lê melhor.',
      ]}
      donts={[
        'Trocar os subtítulos por texto em negrito: o leitor de tela e o sumário perdem a estrutura.',
        'Pular níveis (um <h3> sem <h2> antes).',
        'Colocar HTML sem sanitizar em children: o componente não limpa o conteúdo.',
        'Prender a coluna a uma altura fixa: ela cresce com o texto.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Texto, links, marcadores e todos os blocos compostos acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => <PostBody theme={tema} blocks={AMOSTRA} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do PostBody. Os demais atributos vão à <div> raiz."
    />
    <UblDocPropsTable
      title="PostBody"
      rows={[
        { name: 'blocks', type: 'UblBlock[]', description: 'Blocos do post, na ordem. Cada tipo vira o componente correspondente.' },
        { name: 'children', type: 'ReactNode', description: 'Conteúdo livre, renderizado depois dos blocos.' },
        { name: 'textSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamanho do texto corrido: 16/24, 18/28 ou 20/30.' },
        { name: 'codeLineNumbers', type: 'boolean', default: 'false', description: 'Mostra a numeração nos blocos de código.' },
        { name: 'anchorLabel', type: 'string', default: "'Link para a seção'", description: 'Prefixo do nome acessível da âncora de cada subtítulo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UblDocPropsTable
      title="UblBlock (tipos de bloco)"
      rows={[
        { name: "{ type: 'paragraph' }", type: '{ text: string }', description: 'Parágrafo de prosa.' },
        { name: "{ type: 'heading' }", type: '{ level: 2 | 3; text: string; id: string }', description: 'Subtítulo com a âncora do sumário.' },
        { name: "{ type: 'quote' }", type: '{ text: string; cite?: string }', description: 'Citação (Blockquote).' },
        { name: "{ type: 'code' }", type: '{ language: string; code: string; filename?: string; highlightLines?: number[] }', description: 'Bloco de código (CodeBlock).' },
        { name: "{ type: 'callout' }", type: "{ tone: 'info' | 'tip' | 'warning'; title?: string; text: string }", description: 'Aviso (Callout).' },
        { name: "{ type: 'figure' }", type: '{ src: string; alt: string; caption: string; credit?: string }', description: 'Figura (Figure).' },
        { name: "{ type: 'list' }", type: '{ ordered?: boolean; items: string[] }', description: 'Lista ordenada ou não.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PostBody> = {
  title: 'Unooblog/Componentes/PostBody',
  component: PostBody,
  parameters: { layout: 'padded' },
  argTypes: {
    blocks: { control: 'object', description: 'Blocos do post (UblBlock[]).' },
    children: { control: 'text', description: 'Conteúdo livre, depois dos blocos.' },
    textSize: { control: 'radio', options: SIZES, description: 'Tamanho do texto corrido.' },
    codeLineNumbers: { control: 'boolean', description: 'Mostra a numeração nos blocos de código.' },
    anchorLabel: { control: 'text', description: 'Prefixo do nome acessível da âncora dos subtítulos.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    blocks: BLOCOS,
    textSize: 'md',
    codeLineNumbers: false,
    anchorLabel: 'Link para a seção',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PostBody>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostBodyDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. Os blocos são o corpo do
 * primeiro post das fixtures.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PostBody',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <PostBody {...args} />
    </UblDocStage>
  ),
};

/**
 * Um post inteiro, a partir dos blocos das fixtures.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: um post inteiro',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <PostBody blocks={BLOCOS} codeLineNumbers />
    </UblDocStage>
  ),
};

/**
 * Os três tamanhos de texto.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24} gap={40}>
      {SIZES.map((tamanho) => (
        <div key={tamanho} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>textSize=&quot;{tamanho}&quot;</p>
          <PostBody textSize={tamanho} blocks={AMOSTRA.slice(0, 6)} />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Todos os tipos de bloco, com numeração de linhas no código.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <PostBody blocks={AMOSTRA} codeLineNumbers />
    </UblDocStage>
  ),
};

/**
 * Conteúdo livre em `children`: HTML e componentes do módulo, com links, código em linha e listas.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <PostBody>
        <p>
          Parágrafo livre com um <a href="#foco">link para o foco</a>, <strong>negrito</strong>,{' '}
          <em>itálico</em> e <code>código em linha</code>.
        </p>
        <h2 id="secao-livre">Subtítulo escrito à mão</h2>
        <p>
          O HTML livre herda o ritmo, os tamanhos e as cores da coluna. Listas, links e os
          componentes do módulo entram do mesmo jeito.
        </p>
        <ul>
          <li>Primeiro item da lista.</li>
          <li>Segundo item, com um <a href="#segundo">link</a>.</li>
        </ul>
        <Callout tone="info">Um aviso entre os parágrafos livres.</Callout>
        <Figure wide src={ublImages[1].src} alt={ublImages[1].alt} caption="Uma figura ampla." />
      </PostBody>
    </UblDocStage>
  ),
};

/**
 * O corpo nos dois temas.
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
          width={520}
        >
          <PostBody theme={tema} blocks={AMOSTRA} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Cada subtítulo tem um `id` igual ao do sumário (`ublTableOfContents`) e uma
 * âncora nomeada pelo texto da seção, fora do título.
 */
export const IdsEAncoras: Story = {
  name: 'Ids dos subtítulos batem com o sumário',
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <PostBody {...args} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const sumario = ublTableOfContents(BLOCOS);

    await expect(sumario.length).toBeGreaterThan(0);

    for (const item of sumario) {
      const titulo = tela.getByRole('heading', { level: item.level, name: item.label });
      await expect(titulo).toHaveAttribute('id', item.id);

      const ancora = tela.getByRole('link', { name: `Link para a seção ${item.label}` });
      await expect(ancora).toHaveAttribute('href', `#${item.id}`);
    }
  },
};

/**
 * Cada tipo de bloco vira o componente do módulo: citação em `figure`, código
 * em região rolável, aviso com `role="note"`, figura com imagem e listas.
 */
export const BlocosViramComponentes: Story = {
  name: 'Blocos viram componentes',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <PostBody blocks={AMOSTRA} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('note')).toHaveTextContent('Dica:');
    await expect(tela.getByRole('region', { name: /^Código do arquivo foco\.css/ })).toBeInTheDocument();
    await expect(tela.getAllByRole('figure')).toHaveLength(2);
    await expect(tela.getByRole('img', { name: ublImages[0].alt })).toBeInTheDocument();
    await expect(tela.getAllByRole('list')).toHaveLength(2);
    await expect(tela.getByText('Acessibilidade se prova na prática, não no relatório.').tagName).toBe('BLOCKQUOTE');
  },
};
