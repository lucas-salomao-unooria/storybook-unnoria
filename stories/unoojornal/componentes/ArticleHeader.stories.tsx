import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ArticleHeader } from '../../../src/unoojornal/components/ArticleHeader';
import { ujnFormatDate } from '../../../src/unoojornal/edition';
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

/** Propriedades de uma matéria completa, como a capa as passaria. */
const COMPLETO = {
  kicker: MATERIA.kicker,
  title: MATERIA.title,
  deck: MATERIA.deck,
  author: AUTORIA.name,
  authorRole: AUTORIA.role,
  avatarSrc: AUTORIA.avatarSrc,
  date: ujnFormatDate(MATERIA.publishedAt, { style: 'long' }),
  dateTime: MATERIA.publishedAt,
  readingTime: MATERIA.readingMinutes,
} as const;

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  color: 'var(--ujn-color-text-secondary)',
};

/**
 * Cabeçalho com legenda, na largura pedida (a largura do contêiner decide o
 * degrau do título).
 */
const CabecalhoRotulado: React.FC<{
  rotulo: string;
  largura?: number | string;
  props?: Partial<React.ComponentProps<typeof ArticleHeader>>;
}> = ({ rotulo, largura = '100%', props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: largura }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <ArticleHeader {...COMPLETO} {...props} />
  </div>
);

/**
 * Página de documentação rica do componente ArticleHeader.
 */
const ArticleHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Matéria"
      title="ArticleHeader"
      description="Cabeçalho da matéria aberta: chapéu, título, linha de apoio e a assinatura com retrato, data por extenso e tempo de leitura. Centralizado ou ao início da coluna."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="A porta de entrada da matéria."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📰" title="O título da página">
        O título é o <code>&lt;h1&gt;</code> da página e o cabeçalho inteiro é um{' '}
        <code>&lt;header&gt;</code>. O nome da publicação, na barra, não compete com ele.
      </UjnDocCard>
      <UjnDocCard icon="✍️" title="Assinatura completa">
        <code>Avatar</code>, nome, turma, data por extenso em <code>&lt;time&gt;</code> e tempo de
        leitura — tudo opcional, exceto o nome.
      </UjnDocCard>
      <UjnDocCard icon="↔️" title="Centralizado ou ao início">
        <code>align=&quot;center&quot;</code> para a abertura de capa; <code>&quot;start&quot;</code>{' '}
        para colunas de leitura contínua.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Título que acompanha o contêiner">
        O título cai de <code>headline-xl</code> para <code>headline</code> e <code>title-lg</code>{' '}
        conforme a largura do contêiner, e não a da janela.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da tela da matéria; cores e fontes são as da Plataforma Unooria."
    />
    <UjnDocSpecs
      component="ArticleHeader"
      layout="Coluna · chapéu, título, apoio e assinatura · até 740px"
      specs={[
        { label: 'Estrutura herdada', value: 'Tela article-detail 3:363 · etiquetas 6:59' },
        { label: 'Coluna', value: '--ujn-reading-width (740px), centralizada' },
        { label: 'Chapéu', value: 'Tag variant="accent" size="md"' },
        { label: 'Título', value: 'Headline XL (48/64, 700) → Headline (34/48) → Title Large (24/34)' },
        { label: 'Apoio', value: 'Deck (20/30, 400) em --ujn-color-text-secondary' },
        { label: 'Assinatura', value: 'Avatar md (32px) · Label (14/20) · Caption (12/18)' },
        { label: 'Fio', value: '--ujn-rule-thin em --ujn-color-border-subtle acima da assinatura' },
        { label: 'Quebras', value: 'Contêiner: 960px e 640px' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Serifa → Open Sans bold',
          detail:
            'o título do quadro de origem é em serifa; aqui é Open Sans bold (headline-xl), a única família do módulo.',
        },
        {
          subject: 'Chapéu como Tag de destaque',
          detail:
            'o assunto aparece na Tag accent do módulo, e não em texto solto, para que a mesma etiqueta marque a matéria na capa e na página dela.',
        },
        {
          subject: 'Data já formatada, mais um dateTime',
          detail:
            'date é o texto por extenso ("20 de março de 2026"), montado pelo produto no fuso certo; dateTime é o ISO opcional que vira o atributo do <time>. É uma prop a mais que o contrato do cabeçalho original, para a data ser legível por máquina sem o componente decidir o fuso.',
        },
        {
          subject: 'Tempo de leitura em número ou texto',
          detail:
            'um número são minutos e vira "7 min de leitura"; um texto vai como veio, para o produto escrever em outra língua ou formato.',
        },
        {
          subject: 'Título por degrau do contêiner',
          detail:
            'os três tamanhos do título trocam por @container, e não por @media, porque a página aparece em quadros mais estreitos que a janela (a miniatura do comparativo, o aparelho do mockup).',
        },
        {
          subject: 'Texto de apoio abaixo de 640px',
          detail:
            'no compacto a linha de apoio passa de 20/30 para 18/28 (body-lg), para não ocupar a tela do celular com um parágrafo de deck.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Do chapéu à assinatura."
    />
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <ArticleHeader {...COMPLETO} />
      <UjnDocAnatomy
        zones={[
          { name: 'Chapéu', role: 'O assunto, na Tag de destaque.', token: 'Tag accent' },
          { name: 'Título', role: 'O <h1> da página, em bold.', token: '--ujn-font-headline-xl-*' },
          { name: 'Linha de apoio', role: 'Resume o que a matéria traz.', token: '--ujn-font-deck-*' },
          { name: 'Retrato', role: 'Avatar de quem assina; iniciais sem foto.', token: 'Avatar md' },
          { name: 'Autoria', role: 'Nome e turma, em duas pesagens.', token: '--ujn-font-label-*' },
          { name: 'Data e leitura', role: 'Data em <time> e minutos de leitura, com glifos.', token: '--ujn-font-caption-*' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Alinhamentos, larguras de contêiner e combinações de dados."
    />
    <UjnDocStage label="Alinhamento" surface="card" align="flex-start" direction="column" padding={24}>
      <CabecalhoRotulado rotulo="align=&quot;center&quot;" largura={900} />
      <CabecalhoRotulado rotulo="align=&quot;start&quot;" largura={900} props={{ align: 'start' }} />
    </UjnDocStage>
    <UjnDocStage label="Tamanhos (largura do contêiner)" surface="card" align="flex-start" direction="column" padding={24}>
      <CabecalhoRotulado rotulo="Largo · 1000px" largura={1000} />
      <CabecalhoRotulado rotulo="Médio · 700px" largura={700} />
      <CabecalhoRotulado rotulo="Compacto · 360px" largura={360} />
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="card" align="flex-start" padding={24}>
      <CabecalhoRotulado rotulo="Sem linha de apoio" largura={480} props={{ deck: undefined }} />
      <CabecalhoRotulado rotulo="Sem retrato (iniciais)" largura={480} props={{ avatarSrc: undefined }} />
      <CabecalhoRotulado rotulo="Só a autoria" largura={480} props={{ date: undefined, dateTime: undefined, readingTime: undefined, authorRole: undefined }} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como compor o cabeçalho." />
    <UjnDocPractices
      dos={[
        'Escrever o chapéu como assunto, em poucas palavras ("Ciência e tecnologia").',
        'Passar dateTime junto com date: a data fica legível para leitores de tela e para máquinas.',
        'Usar avatarSrc com retrato quadrado; sem ele, o Avatar mostra as iniciais.',
        'Deixar o título como o único <h1> da página.',
      ]}
      donts={[
        'Usar o cabeçalho para títulos de seção dentro da matéria: isso é <h2> no ArticleBody.',
        'Repetir o título na linha de apoio: o deck acrescenta, não refaz.',
        'Informar a data em formato curto ou ISO no date: ele é para leitura por extenso.',
        'Alinhar ao início e ao centro na mesma página: escolha um e mantenha.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Texto, fio, Tag e Avatar acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="card" padding={32}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <ArticleHeader {...COMPLETO} theme={tema} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ArticleHeader. Os demais atributos vão ao <header>."
    />
    <UjnDocPropsTable
      title="ArticleHeader"
      rows={[
        { name: 'kicker', type: 'string', description: 'Chapéu: o assunto, na Tag de destaque. Obrigatório.' },
        { name: 'title', type: 'string', description: 'Título; vira o <h1>. Obrigatório.' },
        { name: 'deck', type: 'string', description: 'Linha de apoio abaixo do título.' },
        { name: 'author', type: 'string', description: 'Nome de quem assina. Obrigatório.' },
        { name: 'authorRole', type: 'string', description: 'Papel ou turma de quem assina.' },
        { name: 'avatarSrc', type: 'string', description: 'Retrato quadrado; sem ele, iniciais.' },
        { name: 'date', type: 'string', description: 'Data por extenso ("20 de março de 2026").' },
        { name: 'dateTime', type: 'string', description: 'ISO para o atributo datetime do <time>.' },
        { name: 'readingTime', type: 'number | string', description: 'Minutos (número) ou texto pronto.' },
        { name: 'align', type: "'start' | 'center'", default: "'center'", description: 'Alinhamento do cabeçalho.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnArticleHeaderAlign"
      rows={[
        { name: "'center'", type: 'UjnArticleHeaderAlign', description: 'Chapéu, título, apoio e assinatura centralizados.' },
        { name: "'start'", type: 'UjnArticleHeaderAlign', description: 'Tudo alinhado ao início da coluna.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ArticleHeader> = {
  title: 'Unoojornal/Componentes/ArticleHeader',
  component: ArticleHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    kicker: { control: 'text', description: 'Chapéu: o assunto, na Tag de destaque.' },
    title: { control: 'text', description: 'Título; vira o <h1>.' },
    deck: { control: 'text', description: 'Linha de apoio abaixo do título.' },
    author: { control: 'text', description: 'Nome de quem assina.' },
    authorRole: { control: 'text', description: 'Papel ou turma de quem assina.' },
    avatarSrc: { control: 'text', description: 'Retrato quadrado de quem assina.' },
    date: { control: 'text', description: 'Data por extenso.' },
    dateTime: { control: 'text', description: 'Data em ISO, para o atributo datetime.' },
    readingTime: { control: 'text', description: 'Minutos (número) ou texto pronto.' },
    align: { control: 'radio', options: ['center', 'start'], description: 'Alinhamento do cabeçalho.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...COMPLETO,
    align: 'center',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ArticleHeader>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ArticleHeaderDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ArticleHeader',
  render: (args) => (
    <UjnDocStage surface="card" theme={args.theme} align="stretch" direction="column" padding={32}>
      <ArticleHeader {...args} />
    </UjnDocStage>
  ),
};

/**
 * O cabeçalho da matéria principal da edição (tela `article-detail`, `3:363`).
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: cabeçalho da matéria',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <ArticleHeader {...COMPLETO} />
    </UjnDocStage>
  ),
};

/**
 * Os três degraus do título, pela largura do contêiner.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" direction="column" padding={24}>
      <CabecalhoRotulado rotulo="Largo · 1000px (headline-xl)" largura={1000} />
      <CabecalhoRotulado rotulo="Médio · 700px (headline)" largura={700} />
      <CabecalhoRotulado rotulo="Compacto · 360px (title-lg)" largura={360} />
    </UjnDocStage>
  ),
};

/**
 * Centralizado e ao início.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" direction="column" padding={24}>
      <CabecalhoRotulado rotulo="align=center" largura={900} />
      <CabecalhoRotulado rotulo="align=start" largura={900} props={{ align: 'start' }} />
    </UjnDocStage>
  ),
};

/**
 * Combinações de dados: sem apoio, sem retrato, só a autoria, tempo em texto.
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <CabecalhoRotulado rotulo="Sem linha de apoio" largura={480} props={{ deck: undefined }} />
      <CabecalhoRotulado rotulo="Sem retrato (iniciais)" largura={480} props={{ avatarSrc: undefined }} />
      <CabecalhoRotulado
        rotulo="Só a autoria"
        largura={480}
        props={{ date: undefined, dateTime: undefined, readingTime: undefined, authorRole: undefined }}
      />
      <CabecalhoRotulado rotulo="Tempo de leitura em texto" largura={480} props={{ readingTime: 'Leitura de 7 minutos' }} />
    </UjnDocStage>
  ),
};

/**
 * O cabeçalho nos dois temas.
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
          <ArticleHeader {...COMPLETO} theme={tema} />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Semântica: o título é o `<h1>`, a data é um `<time>` com `datetime` e a
 * autoria e o tempo de leitura são texto.
 */
export const Semantica: Story = {
  name: 'Título, data e assinatura',
  render: () => (
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <ArticleHeader {...COMPLETO} />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('heading', { level: 1, name: MATERIA.title })).toBeInTheDocument();
    await expect(tela.getByText(MATERIA.kicker)).toBeInTheDocument();
    await expect(tela.getByText(AUTORIA.name)).toBeInTheDocument();
    await expect(tela.getByText(`${MATERIA.readingMinutes} min de leitura`)).toBeInTheDocument();

    const data = canvasElement.querySelector('time');
    await expect(data).not.toBeNull();
    await expect(data).toHaveAttribute('datetime', MATERIA.publishedAt);
    await expect(data).toHaveTextContent('20 de março de 2026');
  },
};
