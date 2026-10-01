import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ArticleBody } from '../../../src/unoojornal/components/ArticleBody';
import type { UjnArticleBodyTextSize } from '../../../src/unoojornal/components/ArticleBody';
import { ArticleHeader } from '../../../src/unoojornal/components/ArticleHeader';
import { CorrectionNote } from '../../../src/unoojornal/components/CorrectionNote';
import { Figure } from '../../../src/unoojornal/components/Figure';
import { PullQuote } from '../../../src/unoojornal/components/PullQuote';
import { ShareBar } from '../../../src/unoojornal/components/ShareBar';
import { ujnFormatDate } from '../../../src/unoojornal/edition';
import type { UjnBlock } from '../../../src/unoojornal/edition';
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
import { ujnArticles, ujnAuthors } from '../fixtures';

const BAR = '#716C98';

/** A matéria principal da edição e a autoria dela. */
const MATERIA = ujnArticles[0];
const AUTORIA = ujnAuthors.find((autor) => autor.id === MATERIA.authorId) ?? ujnAuthors[0];

/**
 * Transforma os blocos de uma matéria nos elementos do corpo: parágrafo, `<h2>`,
 * lista, `PullQuote` e `Figure`. É a função que um produto escreveria.
 */
const renderizarBlocos = (blocos: UjnBlock[]): React.ReactNode[] =>
  blocos.map((bloco, indice) => {
    switch (bloco.type) {
      case 'paragraph':
        return <p key={indice}>{bloco.text}</p>;
      case 'heading':
        return <h2 key={indice}>{bloco.text}</h2>;
      case 'list':
        return (
          <ul key={indice}>
            {bloco.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <PullQuote key={indice} cite={bloco.cite}>
            {bloco.text}
          </PullQuote>
        );
      case 'figure':
        return (
          <Figure
            key={indice}
            src={bloco.src}
            alt={bloco.alt}
            caption={bloco.caption}
            credit={bloco.credit}
          />
        );
      default:
        return null;
    }
  });

/** Poucos blocos, para as matrizes: a matéria até a primeira citação. */
const TRECHO = MATERIA.body.slice(0, 5);

/**
 * Amostra de todos os elementos que o corpo estiliza: parágrafo com link,
 * subtítulos, lista ordenada e não ordenada, ênfase, figura e citação.
 */
const AmostraDeElementos: React.FC<{ textSize?: UjnArticleBodyTextSize; theme?: 'light' | 'dark' }> = ({
  textSize,
  theme,
}) => (
  <ArticleBody textSize={textSize} theme={theme}>
    <p>
      A <strong>18ª Feira de Ciências</strong> abriu as portas às oito horas. O{' '}
      <a href="#programacao">programa completo</a> está na página da edição, e a{' '}
      <em>votação do público</em> fecha no sábado.
    </p>
    <h2>Do problema ao protótipo</h2>
    <p>
      Todo projeto parte de uma pergunta que a própria turma formulou, e não de um roteiro de
      livro.
    </p>
    <h3>O que a banca avalia</h3>
    <ul>
      <li>A pergunta de partida e a hipótese.</li>
      <li>O caderno de campo, com erros e acertos.</li>
      <li>A explicação do caminho até o protótipo.</li>
    </ul>
    <ol>
      <li>Escolher a pergunta.</li>
      <li>Testar a hipótese.</li>
      <li>Registrar o resultado.</li>
    </ol>
    <PullQuote cite="Prof. Ivan Toledo, Orientador do Departamento de Ciências">
      O caminho importa tanto quanto o produto final.
    </PullQuote>
  </ArticleBody>
);

/**
 * Corpo, com legenda, na largura pedida.
 */
const CorpoRotulado: React.FC<{ rotulo: string; textSize: UjnArticleBodyTextSize }> = ({
  rotulo,
  textSize,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 360px', minWidth: 0 }}>
    <p
      style={{
        margin: 0,
        fontFamily: 'var(--ujn-font-sans)',
        fontSize: 'var(--ujn-font-caption-size)',
        lineHeight: 'var(--ujn-font-caption-line)',
        color: 'var(--ujn-color-text-secondary)',
      }}
    >
      {rotulo}
    </p>
    <ArticleBody textSize={textSize}>{renderizarBlocos(TRECHO.slice(0, 3))}</ArticleBody>
  </div>
);

/**
 * A matéria completa: cabeçalho, figura principal, corpo em blocos, nota de
 * correções e barra de ações.
 */
const MateriaCompleta: React.FC<{ theme?: 'light' | 'dark'; textSize?: UjnArticleBodyTextSize }> = ({
  theme,
  textSize,
}) => (
  <article
    data-ujn-theme={theme}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      width: '100%',
      boxSizing: 'border-box',
      padding: 32,
      background: 'var(--ujn-color-background-card)',
    }}
  >
    <ArticleHeader
      kicker={MATERIA.kicker}
      title={MATERIA.title}
      deck={MATERIA.deck}
      author={AUTORIA.name}
      authorRole={AUTORIA.role}
      avatarSrc={AUTORIA.avatarSrc}
      date={ujnFormatDate(MATERIA.publishedAt, { style: 'long' })}
      dateTime={MATERIA.publishedAt}
      readingTime={MATERIA.readingMinutes}
    />
    <ArticleBody textSize={textSize}>
      <Figure
        src={MATERIA.imageSrc}
        alt={MATERIA.imageAlt}
        caption={MATERIA.imageCaption}
        credit="Foto: Acervo do Clube de Fotografia"
      />
      {renderizarBlocos(MATERIA.body)}
      <CorrectionNote>
        Correções e cartas: sala 12, bloco B ou redação@gazetadopatio.com.br
      </CorrectionNote>
      <ShareBar onShare={() => undefined} onCopyLink={() => undefined} defaultSaved={false} onPrint={() => undefined} />
    </ArticleBody>
  </article>
);

/**
 * Página de documentação rica do componente ArticleBody.
 */
const ArticleBodyDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Matéria"
      title="ArticleBody"
      description="Coluna de leitura da matéria: texto corrido em até 740px, com parágrafos, subtítulos, listas, links e as peças de apoio (Figure, PullQuote, CorrectionNote) encaixadas no mesmo ritmo."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Texto longo que se lê bem."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📖" title="Prosa em coluna">
        O corpo limita a linha a <code>--ujn-reading-width</code> e centraliza a coluna: nem tão
        larga que canse, nem tão estreita que quebre o ritmo.
      </UjnDocCard>
      <UjnDocCard icon="🔠" title="Três tamanhos de texto">
        <code>sm</code> 16/24, <code>md</code> 18/28 e <code>lg</code> 20/30. O leitor escolhe; os
        subtítulos e as listas acompanham.
      </UjnDocCard>
      <UjnDocCard icon="🧩" title="HTML simples por dentro">
        O autor escreve <code>&lt;p&gt;</code>, <code>&lt;h2&gt;</code>, <code>&lt;ul&gt;</code> e{' '}
        <code>&lt;a&gt;</code>; o estilo vem do corpo, sem classe em cada elemento.
      </UjnDocCard>
      <UjnDocCard icon="🖼️" title="Peças de apoio">
        <code>Figure</code>, <code>PullQuote</code> e <code>CorrectionNote</code> entram como
        filhos e respiram mais que os parágrafos.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da tela da matéria; cores e fontes são as da Plataforma Unooria."
    />
    <UjnDocSpecs
      component="ArticleBody"
      layout="Coluna única · até 740px · ritmo vertical por tokens"
      specs={[
        { label: 'Estrutura herdada', value: 'Tela article-detail 3:363 · links 5:9' },
        { label: 'Coluna', value: '--ujn-reading-width (740px), centralizada' },
        { label: 'Texto sm', value: 'Body/Medium (16/24, 400)' },
        { label: 'Texto md', value: 'Body/Large (18/28, 400) — padrão' },
        { label: 'Texto lg', value: 'Title/Medium (20/30) no peso regular' },
        { label: 'Subtítulos', value: '<h2> Title Large (24/34, 700) · <h3> Title Medium (20/30, 600)' },
        { label: 'Links', value: '--ujn-color-text-accent, sublinhados' },
        { label: 'Ritmo', value: 'Parágrafos --ujn-spacing-xl · figuras e notas --ujn-spacing-3xl · <h2> --ujn-spacing-4xl' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Serifa de leitura → Open Sans regular',
          detail:
            'o texto corrido do quadro de origem é em serifa; aqui é Open Sans regular (body-lg), a família única do módulo, com altura de linha de 28px.',
        },
        {
          subject: 'Links em roxo sublinhado',
          detail:
            'os links do quadro de links (5:9) são dourados; aqui são --ujn-color-text-accent com sublinhado permanente — o sublinhado, e não só a cor, é o que os distingue do texto.',
        },
        {
          subject: 'Tamanho de texto por duas variáveis locais',
          detail:
            '--ujn-article-body-size, -line e -weight apontam para os tokens do degrau escolhido. O degrau lg usa title-md no peso regular (o title-md é semibold), então o texto não vira negrito.',
        },
        {
          subject: 'Estilo pelos elementos, não por classes',
          detail:
            'parágrafos, subtítulos, listas e links são estilizados como descendentes do corpo. É o que permite renderizar blocos de um CMS com <p>, <h2> e <ul> puros.',
        },
        {
          subject: 'Subtítulos em h2 e h3',
          detail:
            'o <h1> é do ArticleHeader; dentro do corpo, os intertítulos começam no <h2>.',
        },
        {
          subject: 'Server Component',
          detail:
            'o corpo só recebe filhos e renderiza. Quem passa filhos interativos (ShareBar, CorrectionNote) é que os traz como Client Components.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Elementos que o corpo estiliza."
    />
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <AmostraDeElementos />
      <UjnDocAnatomy
        zones={[
          { name: 'Parágrafo', role: 'Texto corrido, com quebra equilibrada no fim.', token: '--ujn-font-body-lg-*' },
          { name: 'Link', role: 'Roxo sublinhado, com foco visível.', token: '--ujn-color-text-accent' },
          { name: 'Subtítulo', role: '<h2> e <h3>, com mais espaço antes que depois.', token: '--ujn-font-title-lg-* · --ujn-font-title-md-*' },
          { name: 'Lista', role: 'Marcadores em acento, recuo de 24px.', token: '--ujn-spacing-xxl' },
          { name: 'Citação', role: 'PullQuote, com filete à esquerda.', token: '--ujn-font-quote-*' },
          { name: 'Figura e nota', role: 'Peças de apoio com respiro maior.', token: '--ujn-spacing-3xl' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três tamanhos de texto, lado a lado."
    />
    <UjnDocStage label="Tamanhos de texto (textSize)" surface="card" align="flex-start" padding={24} gap={32}>
      <CorpoRotulado rotulo="sm · 16/24" textSize="sm" />
      <CorpoRotulado rotulo="md · 18/28" textSize="md" />
      <CorpoRotulado rotulo="lg · 20/30" textSize="lg" />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como escrever dentro do corpo." />
    <UjnDocPractices
      dos={[
        'Escrever os intertítulos em <h2> (e <h3> para o nível abaixo): o <h1> é do cabeçalho.',
        'Marcar links com <a> e texto que diga para onde vão ("programa completo"), não "clique aqui".',
        'Colocar Figure e PullQuote entre parágrafos, nunca no meio de uma frase.',
        'Deixar o leitor escolher o textSize e guardar a escolha no produto.',
      ]}
      donts={[
        'Usar <br> ou parágrafos vazios para criar espaço: o ritmo já vem do corpo.',
        'Pôr estilo próprio (cor, corpo) nos elementos: o texto sai do sistema.',
        'Aninhar um ArticleBody dentro de outro: a coluna se estreitaria duas vezes.',
        'Largar o link só na cor: o sublinhado é parte da distinção.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Texto, links, marcadores e peças de apoio acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="card" padding={32}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <AmostraDeElementos theme={tema} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ArticleBody. Os demais atributos vão à <div> raiz."
    />
    <UjnDocPropsTable
      title="ArticleBody"
      rows={[
        { name: 'children', type: 'ReactNode', description: 'Parágrafos, subtítulos, listas, links, Figure, PullQuote e CorrectionNote.' },
        { name: 'textSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamanho do texto corrido: 16/24, 18/28 ou 20/30.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnArticleBodyTextSize"
      rows={[
        { name: "'sm'", type: 'UjnArticleBodyTextSize', description: 'Body/Medium: 16px / 24px.' },
        { name: "'md'", type: 'UjnArticleBodyTextSize', description: 'Body/Large: 18px / 28px.' },
        { name: "'lg'", type: 'UjnArticleBodyTextSize', description: 'Title/Medium no peso regular: 20px / 30px.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ArticleBody> = {
  title: 'Unoojornal/Componentes/ArticleBody',
  component: ArticleBody,
  parameters: { layout: 'padded' },
  argTypes: {
    textSize: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Tamanho do texto corrido.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: false, description: 'Conteúdo da matéria (a estória usa a amostra de elementos).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    textSize: 'md',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ArticleBody>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ArticleBodyDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas; o conteúdo é a amostra de
 * elementos.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ArticleBody',
  render: (args) => (
    <UjnDocStage surface="card" theme={args.theme} align="stretch" direction="column" padding={32}>
      <AmostraDeElementos textSize={args.textSize} theme={args.theme} />
    </UjnDocStage>
  ),
};

/**
 * A matéria completa da fixture `ujnArticles[0]`: cabeçalho, figura principal,
 * parágrafos, intertítulos, citação, lista, figura, nota de correções e ações
 * (tela `article-detail`, `3:363`).
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: matéria completa',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24}>
      <MateriaCompleta />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('heading', { level: 1, name: MATERIA.title })).toBeInTheDocument();
    await expect(tela.getByRole('heading', { level: 2, name: 'Do problema ao protótipo' })).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll('blockquote')).toHaveLength(1);
    await expect(canvasElement.querySelectorAll('figure')).toHaveLength(3);
    await expect(tela.getByRole('complementary', { name: 'Correções e cartas' })).toBeInTheDocument();
    await expect(tela.getByText(/redação@gazetadopatio.com.br/)).toBeInTheDocument();
  },
};

/**
 * Os três tamanhos de texto.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24} gap={32}>
      <CorpoRotulado rotulo="sm · 16/24" textSize="sm" />
      <CorpoRotulado rotulo="md · 18/28" textSize="md" />
      <CorpoRotulado rotulo="lg · 20/30" textSize="lg" />
    </UjnDocStage>
  ),
};

/**
 * Todos os elementos estilizados, nos três tamanhos.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((tamanho) => (
        <UjnDocStage
          key={tamanho}
          label={`textSize="${tamanho}"`}
          surface="card"
          align="stretch"
          direction="column"
          padding={32}
        >
          <AmostraDeElementos textSize={tamanho} />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Estados do link e dos filhos: o link ganha o realce no foco por teclado.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <ArticleBody>
        <p>
          Passe o mouse ou use o Tab sobre o <a href="#programacao">programa completo</a> para ver
          o realce e o anel de foco.
        </p>
        <p>
          Um parágrafo sem nenhum elemento, logo depois, mostra o ritmo vertical padrão entre
          blocos de texto.
        </p>
      </ArticleBody>
    </UjnDocStage>
  ),
};

/**
 * O corpo nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UjnDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="card"
          theme={tema}
          align="stretch"
          direction="column"
          padding={32}
        >
          <AmostraDeElementos theme={tema} />
        </UjnDocStage>
      ))}
    </div>
  ),
};
