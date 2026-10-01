import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { RelatedPosts } from '../../../src/unooblog/components/RelatedPosts';
import type {
  UblRelatedPost,
  UblRelatedPostsVariant,
} from '../../../src/unooblog/components/RelatedPosts';
import { ublFormatDate, ublReadingLabel } from '../../../src/unooblog/content';
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
import { ublAuthors, ublPosts, ublTopics } from '../fixtures';

const BAR = '#716C98';

const VARIANTS: UblRelatedPostsVariant[] = ['cover', 'compact'];

/**
 * Três posts das fixtures, no formato do bloco "Continue lendo".
 */
const itens = (quantidade = 3): UblRelatedPost[] =>
  ublPosts.slice(1, 1 + quantidade).map((post) => {
    const autor = ublAuthors.find((a) => a.id === post.authorId);
    const topico = ublTopics.find((t) => t.id === post.topicIds[0]);
    return {
      id: post.id,
      title: post.title,
      summary: post.summary,
      coverSrc: post.coverSrc,
      coverAlt: post.coverAlt,
      topic: topico?.label,
      author: autor?.name ?? 'Autoria',
      authorAvatarSrc: autor?.avatarSrc,
      date: ublFormatDate(post.publishedAt),
      dateTime: post.publishedAt,
      readingTime: ublReadingLabel(post.readingMinutes),
    };
  });

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};

/**
 * Página de documentação rica do componente RelatedPosts.
 */
const RelatedPostsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="RelatedPosts"
      description="O bloco “Continue lendo”, no fim do post: um título de seção e uma grade de cartões de posts relacionados, com capa ou em versão compacta."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Para quem terminou de ler e ainda quer ler."
    />
    <UblDocGrid>
      <UblDocCard icon="📚" title="Continuar a leitura">
        Três posts sobre assuntos próximos, escolhidos pelo produto (mesmo tópico, mesma série ou
        mesma autoria).
      </UblDocCard>
      <UblDocCard icon="🖼️" title="Com capa">
        Na variante <code>cover</code>, cada item é um <code>PostCard</code> com capa: três colunas
        no contêiner largo, duas no médio e uma no compacto.
      </UblDocCard>
      <UblDocCard icon="📰" title="Compacta">
        Na variante <code>compact</code>, o cartão é enxuto e a lista é de uma coluna (duas no
        contêiner largo): serve para barras laterais e telas pequenas.
      </UblDocCard>
      <UblDocCard icon="🧭" title="Região e lista">
        O bloco é uma região nomeada pelo título e uma lista de verdade: o leitor de tela anuncia
        quantos posts há.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Composição sobre o PostCard; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="RelatedPosts"
      layout="Título de seção · grade de PostCard por contêiner"
      specs={[
        { label: 'Raiz', value: '<section aria-labelledby> · contêiner de consulta' },
        { label: 'Título', value: '<h2> em heading-3 (24/34) · --ubl-color-text-primary' },
        { label: 'Lista', value: '<ul role="list"> · um <li> por cartão · intervalo --ubl-spacing-xl (20px)' },
        { label: 'cover', value: '1 coluna; 2 a partir de 640px; 3 a partir de 960px (por contêiner)' },
        { label: 'compact', value: '1 coluna; 2 a partir de 960px (por contêiner)' },
        { label: 'Cartão', value: 'PostCard · headingLevel 3 · onOpen recebe o id do item' },
        { label: 'Fronteira', value: 'Client Component (repassa onOpen aos cartões e usa useId)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Substitui o "Leia também" do Unoojornal',
          detail:
            'o Unoojornal mostra três cartões retos sem texto de apoio. O blog usa o PostCard (capa, tópico, autoria, data, tempo de leitura) para que o bloco leia como o feed do blog, não como um módulo à parte.',
        },
        {
          subject: 'Duas variantes, escolhidas pelo produto',
          detail:
            'cover é o padrão para o fim do post, onde há largura; compact serve para colunas laterais e telas pequenas. A variante é do bloco inteiro, e não de cada item: misturar formatos na mesma grade quebraria o alinhamento.',
        },
        {
          subject: 'Grade por contêiner',
          detail:
            'o número de colunas segue a largura do próprio bloco (@container), e não a da janela: o bloco numa coluna estreita ao lado de um sumário continua legível.',
        },
        {
          subject: 'Hierarquia de títulos',
          detail:
            'o título do bloco é um <h2> e o dos cartões, um <h3> (headingLevel 3 do PostCard): a hierarquia continua correta dentro da página do post.',
        },
        {
          subject: 'Itens com campos simples',
          detail:
            'o item recebe textos já formatados (data por extenso, tempo de leitura em texto), e não o tipo de domínio: o componente não depende do modelo de conteúdo e serve a qualquer origem de dados.',
        },
        {
          subject: 'onOpen devolve o id',
          detail:
            'o produto decide o que "abrir" faz. Itens com href navegam pelo link e também chamam onOpen, para o produto registrar a leitura.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Título e cartões numa região nomeada."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <RelatedPosts items={itens()} onOpen={() => undefined} />
      <UblDocAnatomy
        zones={[
          { name: 'Título', role: 'Nomeia a região e abre o bloco; um <h2>.', token: 'heading-3' },
          { name: 'Lista', role: '<ul> de verdade, um <li> por cartão.', token: 'role="list"' },
          { name: 'Cartão', role: 'PostCard com título como <h3>.', token: 'PostCard · headingLevel 3' },
          { name: 'Região', role: '<section> nomeada pelo título.', token: 'aria-labelledby' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As duas variantes em larguras diferentes."
    />
    {VARIANTS.map((variante) => (
      <UblDocStage
        key={variante}
        label={`Variante ${variante}`}
        surface="page"
        align="stretch"
        direction="column"
        padding={24}
      >
        <RelatedPosts variant={variante} items={itens()} onOpen={() => undefined} />
      </UblDocStage>
    ))}
    <UblDocStage label="Poucos itens e título próprio" surface="page" align="stretch" direction="column" padding={24}>
      <RelatedPosts title="Mais desta série" items={itens(2)} onOpen={() => undefined} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o bloco." />
    <UblDocPractices
      dos={[
        'Escolher posts que continuam o assunto: mesma série, mesmo tópico ou mesma autoria.',
        'Mostrar três itens: é o que a grade larga comporta sem sobra.',
        'Usar cover no fim do post e compact em colunas laterais.',
        'Passar href quando o item tem endereço próprio.',
      ]}
      donts={[
        'Repetir o post que a pessoa acabou de ler.',
        'Encher o bloco com mais de seis itens: vira feed.',
        'Misturar variantes na mesma grade.',
        'Usar títulos de bloco que prometem mais do que entregam ("Você vai amar").',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Os cartões, o título e as capas acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => <RelatedPosts theme={tema} items={itens()} onOpen={() => undefined} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do RelatedPosts. Os demais atributos vão ao <section> raiz."
    />
    <UblDocPropsTable
      title="RelatedPosts"
      rows={[
        { name: 'title', type: 'string', default: "'Continue lendo'", description: 'Título do bloco. Vira um <h2> e nomeia a região.' },
        { name: 'items', type: 'UblRelatedPost[]', description: 'Posts relacionados. Cada um vira um PostCard.' },
        { name: 'variant', type: "'cover' | 'compact'", default: "'cover'", description: 'Formato dos cartões e da grade.' },
        { name: 'onOpen', type: '(id: string) => void', description: 'Abrir um post. Recebe o id do item; itens com href também chamam esta função.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UblDocPropsTable
      title="UblRelatedPost (item)"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador estável; é o que onOpen devolve.' },
        { name: 'title', type: 'string', description: 'Título do post.' },
        { name: 'summary', type: 'string', description: 'Resumo de uma ou duas linhas.' },
        { name: 'coverSrc', type: 'string', description: 'Endereço da capa.' },
        { name: 'coverAlt', type: 'string', description: 'Descrição da capa para leitores de tela.' },
        { name: 'topic', type: 'string', description: 'Tópico principal, em texto.' },
        { name: 'author', type: 'string', description: 'Nome de quem escreveu.' },
        { name: 'authorAvatarSrc', type: 'string', description: 'Retrato de quem escreveu.' },
        { name: 'date', type: 'string', description: 'Data de publicação já por extenso.' },
        { name: 'dateTime', type: 'string', description: 'Data em formato ISO, para o <time>.' },
        { name: 'readingTime', type: 'string', description: 'Tempo de leitura já formatado.' },
        { name: 'href', type: 'string', description: 'Endereço do post; com ele, o título é um <a>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof RelatedPosts> = {
  title: 'Unooblog/Componentes/RelatedPosts',
  component: RelatedPosts,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do bloco.' },
    items: { control: 'object', description: 'Posts relacionados (UblRelatedPost[]).' },
    variant: { control: 'radio', options: VARIANTS, description: 'Formato dos cartões e da grade.' },
    onOpen: { action: 'onOpen', description: 'Abrir um post; recebe o id do item.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: 'Continue lendo',
    items: itens(),
    variant: 'cover',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof RelatedPosts>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <RelatedPostsDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do RelatedPosts',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <RelatedPosts {...args} />
    </UblDocStage>
  ),
};

/**
 * O bloco no fim do post, com o título da série.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: fim do post',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <RelatedPosts title="Mais desta série" items={itens(3)} onOpen={() => undefined} />
    </UblDocStage>
  ),
};

/**
 * O bloco em contêineres de largura diferente: 1, 2 e 3 colunas.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      {[360, 700, 1040].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Contêiner de {largura}px</p>
          <RelatedPosts items={itens()} onOpen={() => undefined} />
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
    <UblDocStage surface="page" align="stretch" direction="column" padding={24} gap={32}>
      {VARIANTS.map((variante) => (
        <div key={variante} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>{variante}</p>
          <RelatedPosts variant={variante} items={itens()} onOpen={() => undefined} />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Um item, dois itens, itens com link e item sem capa.
 */
export const Estados: Story = {
  render: () => {
    const [primeiro, segundo] = itens(2);
    return (
      <UblDocStage surface="page" align="stretch" direction="column" padding={24} gap={32}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Um item</p>
          <RelatedPosts items={[primeiro]} onOpen={() => undefined} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Itens com link (href)</p>
          <RelatedPosts
            items={[
              { ...primeiro, href: '#primeiro' },
              { ...segundo, href: '#segundo' },
            ]}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Item sem capa e sem resumo</p>
          <RelatedPosts
            variant="compact"
            items={[{ ...primeiro, coverSrc: undefined, coverAlt: undefined, summary: undefined }]}
            onOpen={() => undefined}
          />
        </div>
      </UblDocStage>
    );
  },
};

/**
 * O bloco nos dois temas.
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
          width={440}
        >
          <RelatedPosts theme={tema} items={itens(2)} onOpen={() => undefined} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * O bloco é uma região nomeada pelo título, com uma lista de três itens; acionar
 * um cartão chama `onOpen` com o id do post.
 */
export const RegiaoEAbrir: Story = {
  name: 'Região, lista e onOpen',
  args: { onOpen: fn() },
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <RelatedPosts {...args} />
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const lista = itens();

    const regiao = tela.getByRole('region', { name: 'Continue lendo' });
    await expect(regiao).toBeInTheDocument();
    await expect(within(regiao).getAllByRole('listitem')).toHaveLength(3);
    await expect(tela.getByRole('heading', { level: 2, name: 'Continue lendo' })).toBeInTheDocument();
    await expect(tela.getAllByRole('heading', { level: 3 })).toHaveLength(3);

    await userEvent.click(tela.getByRole('button', { name: lista[1].title }));
    await expect(args.onOpen).toHaveBeenCalledWith(lista[1].id);
  },
};
