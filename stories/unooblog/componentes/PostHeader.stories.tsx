import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { PostHeader } from '../../../src/unooblog/components/PostHeader';
import type { UblPostHeaderAlign } from '../../../src/unooblog/components/PostHeader';
import { ublFormatDate } from '../../../src/unooblog/content';
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
import { ublAuthors, ublPosts, ublSeries, ublTopics } from '../fixtures';

const BAR = '#716C98';

const ALIGNS: UblPostHeaderAlign[] = ['start', 'center'];

const POST = ublPosts[0];
const AUTOR = ublAuthors.find((a) => a.id === POST.authorId) ?? ublAuthors[0];
const SERIE = ublSeries.find((s) => s.id === POST.seriesId);
const TOPICOS = POST.topicIds.map((id) => ublTopics.find((t) => t.id === id)?.label ?? id);

/** Props do cabeçalho do primeiro post das fixtures. */
const DEMO = {
  title: POST.title,
  subtitle: POST.subtitle,
  topics: TOPICOS,
  series: SERIE
    ? { title: SERIE.title, part: POST.seriesPart ?? 1, total: SERIE.postIds.length }
    : undefined,
  author: AUTOR.name,
  authorRole: AUTOR.role,
  avatarSrc: AUTOR.avatarSrc,
  date: ublFormatDate(POST.publishedAt),
  dateTime: POST.publishedAt,
  updated: POST.updatedAt ? ublFormatDate(POST.updatedAt) : undefined,
  readingTime: POST.readingMinutes,
  coverSrc: POST.coverSrc,
  coverAlt: POST.coverAlt,
  coverCaption: 'O anel de foco: espessura, afastamento e cor próprios.',
};

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};

/**
 * Página de documentação rica do componente PostHeader.
 */
const PostHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="PostHeader"
      description="Cabeçalho do post aberto: tópicos, série, título, subtítulo, a linha do autor com data e tempo de leitura, e a capa 16:9. A autoria vem antes do texto, porque o blog é de autoria."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="A primeira tela de um post."
    />
    <UblDocGrid>
      <UblDocCard icon="🏷️" title="Tópicos e série">
        Uma trilha de tópicos acima do título e, em posts de série, a indicação &quot;Parte 2 de 3 ·
        título da série&quot;, que situa a pessoa antes de ela começar.
      </UblDocCard>
      <UblDocCard icon="🔠" title="Título que cai de degrau">
        O <code>&lt;h1&gt;</code> usa heading-1 e cai para heading-2 e heading-3 conforme a largura do
        próprio cabeçalho, e não a da janela.
      </UblDocCard>
      <UblDocCard icon="👤" title="Autoria sempre presente">
        Retrato grande, nome em negrito, cargo, data em <code>&lt;time&gt;</code>, atualização e
        tempo de leitura: tudo o que a pessoa precisa para decidir se lê.
      </UblDocCard>
      <UblDocCard icon="🖼️" title="Capa 16:9">
        Imagem de capa num <code>&lt;figure&gt;</code> de cantos macios, com legenda opcional e
        descrição para leitores de tela.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="PostHeader"
      layout="Coluna de texto de 680px (--ubl-reading-width) · capa na largura do cabeçalho, até 1120px"
      specs={[
        { label: 'Raiz', value: '<header> · contêiner de consulta · largura máxima --ubl-page-width' },
        { label: 'Tópicos', value: '<ul> de Badge tone="accent" · intervalo 8px' },
        { label: 'Série', value: 'glifo series + "Parte N de M · título" · label (14/20)' },
        { label: 'Título', value: '<h1> · heading-1 (48/64); heading-2 (34/48) abaixo de 960px; heading-3 (24/34) abaixo de 640px' },
        { label: 'Subtítulo', value: 'lead (20/30) · --ubl-color-text-secondary' },
        { label: 'Autoria', value: 'Avatar lg (48px) · nome label-lg em negrito · cargo label · meta caption' },
        { label: 'Meta', value: '<time dateTime> · "Atualizado em …" · tempo de leitura · glifos calendar, history e schedule' },
        { label: 'Capa', value: '16:9 · raio --ubl-radius-l (16px); 12px abaixo de 640px · legenda caption' },
        { label: 'Fronteira', value: 'Server Component' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Alinhado à esquerda por padrão',
          detail:
            'o cabeçalho do blog começa na mesma margem do texto, e não centralizado como o do Unoojornal. O alinhamento centralizado continua disponível (align="center"), para páginas de destaque.',
        },
        {
          subject: 'Autoria depois do título, antes do texto',
          detail:
            'a linha do autor traz um retrato de 48px e o cargo: num blog de autoria, quem escreve é parte da decisão de ler. O avatar é decorativo (alt vazio) porque o nome está escrito ao lado.',
        },
        {
          subject: 'Série em linha de texto, tópicos em selos',
          detail:
            'a indicação de série é uma linha própria ("Parte 2 de 3 · título") com o glifo de série, e não um selo: o selo é reservado a tópicos, que são rótulos curtos. Os tópicos usam o Badge de acento, que não é um controle.',
        },
        {
          subject: 'Título por contêiner',
          detail:
            'a raiz é contêiner de consulta e o título cai de heading-1 para heading-2 abaixo de 960px e para heading-3 abaixo de 640px de largura do cabeçalho: dentro da coluna de leitura (680px), ele já abre em heading-2.',
        },
        {
          subject: 'Capa mais larga que a coluna',
          detail:
            'o texto fica na largura de leitura e a capa usa a largura inteira do cabeçalho, até 1120px: a imagem pode respirar sem alongar a linha de texto. Sem coverAlt, a capa é decorativa.',
        },
        {
          subject: 'Atualização como texto',
          detail:
            '"Atualizado em …" é uma linha de texto com o glifo de histórico, e não um segundo <time>: a prop updated recebe a data por extenso e o componente não tem o ISO dela. Quem precisa de máquina-legível usa dateTime, da publicação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Do topo à capa."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <PostHeader {...DEMO} />
      <UblDocAnatomy
        zones={[
          { name: 'Tópicos', role: 'Trilha de selos acima do título.', token: 'topics · Badge' },
          { name: 'Série', role: 'Situa o post na série: parte N de M e título.', token: 'series' },
          { name: 'Título', role: 'O <h1> da página, em heading-1 (cai por contêiner).', token: 'heading-1' },
          { name: 'Subtítulo', role: 'Linha de apoio, em lead.', token: 'lead' },
          { name: 'Autoria', role: 'Retrato, nome, cargo, data, atualização e tempo de leitura.', token: 'Avatar lg · caption' },
          { name: 'Capa', role: 'Imagem 16:9 com legenda opcional.', token: 'coverSrc · coverCaption' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Alinhamentos e composições."
    />
    {ALIGNS.map((alinhamento) => (
      <UblDocStage
        key={alinhamento}
        label={`align="${alinhamento}"`}
        surface="page"
        align="stretch"
        direction="column"
        padding={24}
      >
        <PostHeader {...DEMO} align={alinhamento} coverSrc={undefined} />
      </UblDocStage>
    ))}
    <UblDocStage label="Mínimo: só título e autoria" surface="page" align="stretch" direction="column" padding={24}>
      <PostHeader title="Um título simples" author={AUTOR.name} date="30 de setembro de 2026" />
    </UblDocStage>
    <UblDocStage label="Com série, sem capa" surface="page" align="stretch" direction="column" padding={24}>
      <PostHeader {...DEMO} coverSrc={undefined} topics={undefined} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o cabeçalho." />
    <UblDocPractices
      dos={[
        'Escrever um título que diga o assunto e o ganho de ler, em até duas linhas.',
        'Usar o subtítulo para o que o título não cabe, e não para repeti-lo.',
        'Informar a data de atualização quando o conteúdo mudou depois da publicação.',
        'Descrever a capa em coverAlt quando ela carrega informação.',
      ]}
      donts={[
        'Pôr mais de três tópicos na trilha: ela vira ruído.',
        'Usar o título como slogan: ele é o nome do post nas buscas e nos favoritos.',
        'Esconder a autoria: o blog é de autoria.',
        'Usar duas capas ou uma capa com texto essencial dentro da imagem.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Texto, selos, autoria e a superfície de espera da capa acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => <PostHeader theme={tema} {...DEMO} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do PostHeader. Os demais atributos vão ao <header> raiz."
    />
    <UblDocPropsTable
      title="PostHeader"
      rows={[
        { name: 'title', type: 'string', description: 'Título do post. Vira o <h1> da página.' },
        { name: 'subtitle', type: 'string', description: 'Subtítulo, em lead, abaixo do título.' },
        { name: 'topics', type: 'string[]', description: 'Tópicos do post, na trilha acima do título.' },
        { name: 'series', type: '{ title: string; part: number; total: number }', description: 'Indicação de série: "Parte N de M · título".' },
        { name: 'author', type: 'string', description: 'Nome de quem escreveu.' },
        { name: 'authorRole', type: 'string', description: 'Cargo ou papel de quem escreveu.' },
        { name: 'avatarSrc', type: 'string', description: 'Retrato de quem escreveu. Sem ele, o Avatar mostra as iniciais.' },
        { name: 'date', type: 'string', description: 'Data de publicação já por extenso.' },
        { name: 'dateTime', type: 'string', description: 'Data em formato ISO, para o atributo datetime do <time>.' },
        { name: 'updated', type: 'string', description: 'Data da última atualização, por extenso ("Atualizado em …").' },
        { name: 'readingTime', type: 'number | string', description: 'Número são minutos ("8 min de leitura"); texto vai como veio.' },
        { name: 'coverSrc', type: 'string', description: 'Endereço da capa 16:9.' },
        { name: 'coverAlt', type: 'string', description: 'Descrição da capa. Sem ela, a capa é decorativa.' },
        { name: 'coverCaption', type: 'string', description: 'Legenda visível da capa.' },
        { name: 'align', type: "'start' | 'center'", default: "'start'", description: 'Alinhamento do cabeçalho.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PostHeader> = {
  title: 'Unooblog/Componentes/PostHeader',
  component: PostHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do post (o <h1>).' },
    subtitle: { control: 'text', description: 'Subtítulo, em lead.' },
    topics: { control: 'object', description: 'Tópicos do post (string[]).' },
    series: { control: 'object', description: 'Série: { title, part, total }.' },
    author: { control: 'text', description: 'Nome de quem escreveu.' },
    authorRole: { control: 'text', description: 'Cargo ou papel.' },
    avatarSrc: { control: 'text', description: 'Retrato de quem escreveu.' },
    date: { control: 'text', description: 'Data de publicação por extenso.' },
    dateTime: { control: 'text', description: 'Data em formato ISO.' },
    updated: { control: 'text', description: 'Data de atualização por extenso.' },
    readingTime: { control: 'text', description: 'Tempo de leitura (número = minutos).' },
    coverSrc: { control: 'text', description: 'Endereço da capa.' },
    coverAlt: { control: 'text', description: 'Descrição da capa.' },
    coverCaption: { control: 'text', description: 'Legenda da capa.' },
    align: { control: 'radio', options: ALIGNS, description: 'Alinhamento do cabeçalho.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...DEMO,
    align: 'start',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PostHeader>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostHeaderDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PostHeader',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <PostHeader {...args} />
    </UblDocStage>
  ),
};

/**
 * O cabeçalho do primeiro post das fixtures, completo.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: abertura de um post',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <PostHeader {...DEMO} />
    </UblDocStage>
  ),
};

/**
 * O cabeçalho em contêineres de largura diferente: o título cai de heading-1
 * para heading-2 e heading-3.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24} gap={32}>
      {[360, 640, 1040].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Contêiner de {largura}px</p>
          <PostHeader {...DEMO} />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Os dois alinhamentos.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24} gap={32}>
      {ALIGNS.map((alinhamento) => (
        <div key={alinhamento} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>align=&quot;{alinhamento}&quot;</p>
          <PostHeader {...DEMO} align={alinhamento} coverSrc={undefined} />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Cabeçalho mínimo, sem série, sem atualização, com título longo e sem retrato.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24} gap={32}>
      <PostHeader title="Um título simples" author={AUTOR.name} date="30 de setembro de 2026" />
      <PostHeader
        {...DEMO}
        series={undefined}
        updated={undefined}
        coverSrc={undefined}
        topics={[TOPICOS[0]]}
        avatarSrc={undefined}
      />
      <PostHeader
        title="Um título bem mais comprido do que costuma caber em duas linhas, para ver como o cabeçalho quebra e equilibra o texto sem estourar a coluna de leitura"
        subtitle="E um subtítulo que também se alonga, para conferir o ritmo entre as duas linhas de apoio."
        author="Maria Fernanda de Albuquerque e Souza"
        authorRole="Pesquisadora sênior em acessibilidade e design inclusivo"
        date="30 de setembro de 2026"
        readingTime="12 min de leitura"
      />
    </UblDocStage>
  ),
};

/**
 * O cabeçalho nos dois temas.
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
          width={560}
        >
          <PostHeader theme={tema} {...DEMO} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * O título é o único `<h1>`, a série e a autoria estão no texto, e a data vai
 * num `<time>` com o ISO.
 */
export const EstruturaEMeta: Story = {
  name: 'Título, série, autoria e data',
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <PostHeader {...args} />
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('heading', { level: 1, name: args.title })).toBeInTheDocument();
    await expect(
      tela.getByText(`Parte ${args.series?.part} de ${args.series?.total}`, { exact: false })
    ).toBeInTheDocument();
    await expect(tela.getByText(args.series?.title as string, { exact: false })).toBeInTheDocument();
    await expect(tela.getByText(args.author)).toBeInTheDocument();
    await expect(tela.getByText(args.date as string).tagName).toBe('TIME');
    await expect(tela.getByText(args.date as string)).toHaveAttribute('datetime', args.dateTime as string);
    await expect(tela.getByText(`Atualizado em ${args.updated}`)).toBeInTheDocument();
    await expect(tela.getByText(`${args.readingTime} min de leitura`)).toBeInTheDocument();
    await expect(tela.getByRole('list', { name: 'Tópicos do post' }).children).toHaveLength(
      args.topics?.length ?? 0
    );
  },
};
