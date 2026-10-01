import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PostCard } from '../../../src/unooblog/components/PostCard';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocPractices,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { postEmDestaque, postsDoFeed, propsDoPostCard, serieDoPost } from './feed.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const openSpy = fn();
const saveSpy = fn();
const linkSpy = fn();

const [primeiro, segundo, terceiro, quarto] = postsDoFeed;

/**
 * Quatro cartões, um de cada variante, com salvar controlado, um lido e um salvo.
 */
const FeedDemo: React.FC<{ width?: number }> = ({ width = 560 }) => {
  const [savedIds, setSavedIds] = useState<string[]>([segundo.id]);
  const toggle = (id: string) => (saved: boolean) =>
    setSavedIds((atual) => (saved ? [...atual, id] : atual.filter((item) => item !== id)));
  return (
    <div style={{ display: 'grid', gap: 16, width }}>
      <PostCard
        {...propsDoPostCard(postEmDestaque)}
        variant="featured"
        series={serieDoPost(postEmDestaque)}
        saved={savedIds.includes(postEmDestaque.id)}
        onToggleSave={toggle(postEmDestaque.id)}
        onOpen={() => undefined}
      />
      <PostCard
        {...propsDoPostCard(primeiro)}
        variant="cover"
        saved={savedIds.includes(primeiro.id)}
        onToggleSave={toggle(primeiro.id)}
        onOpen={() => undefined}
      />
      <PostCard
        {...propsDoPostCard(segundo)}
        variant="horizontal"
        saved={savedIds.includes(segundo.id)}
        onToggleSave={toggle(segundo.id)}
        onOpen={() => undefined}
        read
      />
      <PostCard
        {...propsDoPostCard(terceiro)}
        variant="compact"
        saved={savedIds.includes(terceiro.id)}
        onToggleSave={toggle(terceiro.id)}
        onOpen={() => undefined}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente PostCard.
 */
const PostCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Feed"
      title="PostCard"
      description="Cartão de post do feed, em quatro variantes: cover (cartão lavanda com capa 16:9), horizontal (capa 4:3 à esquerda), compact (sem capa, para listas laterais) e featured (capa 21:9 com título e resumo sobre o véu). Hover, foco, lido e salvo — e o cartão inteiro clica sem criar um segundo ponto de foco."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O bloco de construção do feed, das listas de tópico e do “Continue lendo”."
    />
    <UblDocGrid>
      <UblDocCard icon="🗂️" title="Quatro variantes">
        <code>cover</code> é o cartão do feed; <code>horizontal</code> serve a resultados de busca;{' '}
        <code>compact</code> a listas laterais e relacionados; <code>featured</code> ao post em
        destaque da página inicial.
      </UblDocCard>
      <UblDocCard icon="🎯" title="Um único alvo">
        O título é o link (ou o botão) e o cartão inteiro clica por pseudo-elemento. Há um só ponto
        de Tab por post, e o nome acessível é o título.
      </UblDocCard>
      <UblDocCard icon="🔖" title="Salvar sem abrir">
        Com <code>onToggleSave</code>, aparece o marcador. Ele fica acima da área clicável e{' '}
        <strong>nunca</strong> dispara <code>onOpen</code>.
      </UblDocCard>
      <UblDocCard icon="✅" title="Lido por forma">
        <code>read</code> passa o texto ao tom discreto <em>e</em> acrescenta o selo “Lido” com o
        glifo de confirmação: o estado nunca fica só na cor.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="PostCard"
      layout="Cartão · largura do contêiner"
      specs={[
        { label: 'Superfície', value: 'background-card (lavanda) + fio de 1px em border-subtle · raio xl (24px)' },
        { label: 'Capa (cover)', value: '16:9 · raio l (16px) · fundo background-subtle enquanto carrega' },
        { label: 'Capa (horizontal)', value: '4:3 à esquerda a partir de 480px de contêiner; abaixo, empilhada' },
        { label: 'Capa (featured)', value: '21:9 · véu --ubl-gradient-media-bottom · texto em --ubl-color-media-text' },
        { label: 'Título', value: 'heading-4 · 20/30px · 600 (compact: label-lg; featured: heading-3 / heading-2 ≥ 640px)' },
        { label: 'Resumo', value: 'body-md · 14/20px · três linhas (duas no horizontal e no destaque)' },
        { label: 'Hover', value: 'realce --ubl-color-state-hover sobre o fundo (sem sombra) + título sublinhado' },
        { label: 'Foco', value: 'anel de 2px em focus-ring, em volta do cartão inteiro' },
        { label: 'Salvar', value: 'IconButton md (44px) · aria-pressed · glifo bookmark / bookmarkFilled' },
        { label: 'Lido', value: 'texto text-muted + selo “Lido” com glifo check' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Cartão lavanda sobre página branca',
          detail:
            'o blog inverte a composição do jornal: a página é branca e o cartão, lavanda, de cantos macios (cápsula nos controles). A separação vem da camada e de um fio de 1px, nunca de sombra.',
        },
        {
          subject: 'Raios concêntricos',
          detail:
            'cartão em radius-xl (24px), recuo de 8px e capa em radius-l (16px): a curva interna acompanha a externa.',
        },
        {
          subject: 'Um único alvo, o título',
          detail:
            'o ::after absoluto do link do título estende o clique ao cartão. Botão de salvar é irmão do corpo, com z-index acima: botão dentro de link não é HTML válido, e salvar não pode abrir o post.',
        },
        {
          subject: 'Selos sobre a capa em pílula opaca',
          detail:
            'no featured, tópico, série e “Lido” ficam em uma pílula de background-elevated, para o contraste não depender da fotografia; o texto da legenda é branco (media-text) sobre o véu de 60% e o botão de salvar fica numa pílula elevada no canto.',
        },
        {
          subject: 'Featured sem capa vira cover',
          detail:
            'o texto branco do destaque só existe sobre uma imagem; sem coverSrc o cartão cai na variante cover em vez de pintar branco sobre lavanda.',
        },
        {
          subject: 'Tópico em selo, não em chip',
          detail:
            'o tópico é um Badge (não interativo): um TopicChip dentro do cartão criaria um segundo ponto de foco e quebraria o alvo único.',
        },
        {
          subject: 'Contêiner, não janela',
          detail:
            'horizontal e featured são contêineres (container-type: inline-size) e se rearranjam pela largura do próprio cartão — numa coluna lateral estreita ele empilha, mesmo numa janela larga.',
        },
        {
          subject: 'Client Component',
          detail: "repassa onOpen ao link e onToggleSave ao botão; por isso começa com 'use client'.",
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocStage label="Cartão cover com todos os elementos" surface="page" align="stretch" direction="column" width={420}>
      <PostCard
        {...propsDoPostCard(primeiro)}
        series={serieDoPost(primeiro)}
        onOpen={() => undefined}
        onToggleSave={() => undefined}
        read
      />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Capa', role: '16:9, cantos concêntricos, fundo sutil enquanto carrega.', token: '--ubl-radius-l · --ubl-color-background-subtle' },
        { name: 'Selos', role: 'Tópico, série e “Lido”.', token: 'Badge · --ubl-color-text-muted' },
        { name: 'Título (alvo)', role: 'Link ou botão que estende o alvo ao cartão.', token: '--ubl-font-heading-4-*' },
        { name: 'Resumo', role: 'Três linhas.', token: '--ubl-font-body-md-* · --ubl-color-text-secondary' },
        { name: 'PostMeta', role: 'Avatar, autoria, data, tempo e comentários.', token: '--ubl-font-label-* · --ubl-font-caption-*' },
        { name: 'Salvar', role: 'Opcional; IconButton com aria-pressed.', token: '--ubl-touch-target' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As quatro variantes, e os estados padrão, lido, salvo e só informativo — componentes reais."
    />
    <UblDocStage label="Variantes" surface="page" align="stretch" direction="column" width={620}>
      <PostCard {...propsDoPostCard(postEmDestaque)} variant="featured" href="#featured" />
      <PostCard {...propsDoPostCard(primeiro)} variant="cover" href="#cover" />
      <PostCard {...propsDoPostCard(segundo)} variant="horizontal" href="#horizontal" />
      <PostCard {...propsDoPostCard(terceiro)} variant="compact" href="#compact" />
    </UblDocStage>
    <UblDocStage label="Estados" surface="page" align="stretch" direction="column" width={420}>
      <PostCard {...propsDoPostCard(primeiro)} href="#padrao" />
      <PostCard {...propsDoPostCard(segundo)} href="#lido" read />
      <PostCard {...propsDoPostCard(terceiro)} onOpen={() => undefined} onToggleSave={() => undefined} saved />
      <PostCard {...propsDoPostCard(quarto)} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Passar href quando o post tem endereço: o leitor de tela anuncia “link”.',
        'Marcar read com o histórico de leitura: o selo “Lido” acompanha o tom.',
        'Usar featured uma vez por página, para o post em destaque.',
        'Usar compact em colunas estreitas e em “Continue lendo”: ele não carrega capa.',
        'Dar alt à capa quando ela informa; deixar vazio quando só decora.',
      ]}
      donts={[
        'Pôr outro link ou botão dentro do cartão: o clique já pertence ao título.',
        'Indicar lido só com opacidade ou só com cor.',
        'Usar featured com uma fotografia clara sem conferir a legenda: o véu garante 4,5:1 até sobre branco, mas o texto precisa caber no véu.',
        'Usar o salvar para abrir o post: ele só alterna o marcador.',
        'Esconder o selo “Lido” no CSS do produto.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, fio, texto, véu e selos acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="page">
      {() => <FeedDemo width={560} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="PostCard"
      rows={[
        { name: 'variant', type: "'cover' | 'horizontal' | 'compact' | 'featured'", default: "'cover'", description: 'Variante do cartão. featured sem capa cai em cover.' },
        { name: 'title', type: 'string', description: 'Título do post; é o alvo principal. Obrigatório.' },
        { name: 'summary', type: 'string', description: 'Resumo, cortado em três linhas; omitido no compact.' },
        { name: 'coverSrc', type: 'string', description: 'Imagem de capa. Sem ela, o cartão não tem capa.' },
        { name: 'coverAlt', type: 'string', default: "''", description: 'Texto alternativo da capa.' },
        { name: 'topic', type: 'string', description: 'Tópico, em selo.' },
        { name: 'series', type: 'string', description: 'Série do post, em selo com o glifo de séries.' },
        { name: 'author', type: 'string', description: 'Nome de quem assina. Obrigatório.' },
        { name: 'authorAvatarSrc', type: 'string', description: 'Retrato de quem assina.' },
        { name: 'date', type: 'string', description: 'Data já formatada. Obrigatória.' },
        { name: 'dateTime', type: 'string', description: 'Data ISO para o <time datetime>.' },
        { name: 'readingTime', type: 'string', description: 'Tempo de leitura formatado.' },
        { name: 'comments', type: 'number', description: 'Quantidade de comentários.' },
        { name: 'saved', type: 'boolean', default: 'false', description: 'Post salvo (marcador preenchido).' },
        { name: 'onToggleSave', type: '(saved: boolean) => void', description: 'Mostra o botão de salvar e recebe o novo valor.' },
        { name: 'read', type: 'boolean', default: 'false', description: 'Post lido: texto discreto e selo “Lido”.' },
        { name: 'href', type: 'string', description: 'Faz do título um <a>.' },
        { name: 'onOpen', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Abre o post; sem href, faz do título um <button>.' },
        { name: 'headingLevel', type: '2 | 3 | 4', default: '3', description: 'Nível do título.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PostCard> = {
  title: 'Unooblog/Componentes/PostCard',
  component: PostCard,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['cover', 'horizontal', 'compact', 'featured'], description: 'Variante do cartão.' },
    title: { control: 'text', description: 'Título (alvo principal).' },
    summary: { control: 'text', description: 'Resumo, em três linhas.' },
    coverSrc: { control: 'text', description: 'Imagem de capa.' },
    coverAlt: { control: 'text', description: 'Texto alternativo da capa.' },
    topic: { control: 'text', description: 'Tópico, em selo.' },
    series: { control: 'text', description: 'Série, em selo.' },
    author: { control: 'text', description: 'Nome de quem assina.' },
    authorAvatarSrc: { control: 'text', description: 'Retrato de quem assina.' },
    date: { control: 'text', description: 'Data formatada.' },
    dateTime: { control: 'text', description: 'Data ISO (<time datetime>).' },
    readingTime: { control: 'text', description: 'Tempo de leitura.' },
    comments: { control: { type: 'number', min: 0, step: 1 }, description: 'Quantidade de comentários.' },
    saved: { control: 'boolean', description: 'Post salvo.' },
    onToggleSave: { action: 'onToggleSave', description: 'Mostra o botão de salvar.' },
    read: { control: 'boolean', description: 'Post lido.' },
    href: { control: 'text', description: 'Endereço (faz do título um link).' },
    onOpen: { action: 'onOpen', description: 'Abre o post (faz do título um botão sem href).' },
    headingLevel: { control: 'radio', options: [2, 3, 4], description: 'Nível do título.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...propsDoPostCard(primeiro),
    variant: 'cover',
    saved: false,
    read: false,
    headingLevel: 3,
  },
};

export default meta;

type Story = StoryObj<typeof PostCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostCardDocumentationPage />,
};

/**
 * Playground do cartão, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PostCard',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" width={args.variant === 'cover' ? 420 : 620}>
      <PostCard {...args} />
    </UblDocStage>
  ),
};

/**
 * O feed da página inicial: o destaque, um cartão de capa, um horizontal lido e um compacto.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: o feed',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={620}>
      <FeedDemo width={580} />
    </UblDocStage>
  ),
};

/**
 * Do contêiner largo ao estreito: o cartão horizontal empilha e o destaque troca a escala do título.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[720, 480, 320].map((width) => (
        <UblDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" width={width}>
          <PostCard {...propsDoPostCard(segundo)} variant="horizontal" href="#tamanho" onToggleSave={() => undefined} />
          <PostCard {...propsDoPostCard(postEmDestaque)} variant="featured" href="#tamanho" />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * As quatro variantes.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={620}>
      <PostCard {...propsDoPostCard(postEmDestaque)} variant="featured" series={serieDoPost(postEmDestaque)} href="#featured" onToggleSave={() => undefined} />
      <PostCard {...propsDoPostCard(primeiro)} variant="cover" href="#cover" onToggleSave={() => undefined} />
      <PostCard {...propsDoPostCard(segundo)} variant="horizontal" href="#horizontal" onToggleSave={() => undefined} />
      <PostCard {...propsDoPostCard(terceiro)} variant="compact" href="#compact" onToggleSave={() => undefined} />
    </UblDocStage>
  ),
};

/**
 * Padrão, lido, salvo e só informativo. O hover e o foco se veem com o ponteiro e com o Tab.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={420}>
      <PostCard {...propsDoPostCard(primeiro)} href="#padrao" />
      <PostCard {...propsDoPostCard(segundo)} href="#lido" read />
      <PostCard {...propsDoPostCard(terceiro)} onOpen={() => undefined} onToggleSave={() => undefined} saved />
      <PostCard {...propsDoPostCard(quarto)} />
    </UblDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" width={560}>
          <FeedDemo width={520} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: o título abre por clique e por Enter, o salvar não abre, o clique
 * em qualquer ponto do cartão chega ao título e o estado “lido” se diz em palavras.
 */
export const AbrirESalvar: Story = {
  name: 'Interação: abrir e salvar',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={460}>
      <PostCard {...propsDoPostCard(primeiro)} onOpen={openSpy} onToggleSave={saveSpy} />
      <PostCard
        {...propsDoPostCard(segundo)}
        variant="horizontal"
        href="#segundo"
        onOpen={(event) => {
          event.preventDefault();
          linkSpy();
        }}
        read
      />
      <PostCard {...propsDoPostCard(terceiro)} variant="compact" />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    saveSpy.mockClear();
    linkSpy.mockClear();
    const canvas = within(canvasElement);

    // Sem href, o título é um botão: clique e Enter abrem.
    const open = canvas.getByRole('button', { name: primeiro.title });
    await userEvent.click(open);
    await expect(openSpy).toHaveBeenCalledTimes(1);
    open.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);

    // O centro da capa cai no título: o cartão inteiro é o alvo, por pseudo-elemento.
    const cover = canvasElement.querySelector('.ubl-post-card__media') as HTMLElement;
    cover.scrollIntoView({ block: 'center' });
    const box = cover.getBoundingClientRect();
    const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
    await expect(hit).toBe(open);

    // Salvar não abre o post e entrega o novo valor.
    const save = canvas.getByRole('button', { name: new RegExp(`Salvar.*${primeiro.title.slice(0, 12)}`) });
    await expect(save).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(save);
    await expect(saveSpy).toHaveBeenCalledWith(true);
    await expect(openSpy).toHaveBeenCalledTimes(2);

    // Com href, o título é um link; a variante horizontal também renderiza.
    const link = canvas.getByRole('link', { name: segundo.title });
    await expect(link).toHaveAttribute('href', '#segundo');
    await userEvent.click(link);
    await expect(linkSpy).toHaveBeenCalledTimes(1);

    // Lido e sem destino: o selo diz o estado em palavras; o compacto só informa.
    await expect(canvas.getByText('Lido')).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: terceiro.title })).toBeNull();
    await expect(canvasElement.querySelectorAll('article')).toHaveLength(3);
  },
};

/**
 * Interação: as quatro variantes renderizam, o destaque sem capa cai em cover
 * e o selo “Lido” aparece em todas.
 */
export const VariantesRenderizam: Story = {
  name: 'Interação: as quatro variantes',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={620}>
      <PostCard {...propsDoPostCard(postEmDestaque)} variant="featured" href="#a" read />
      <PostCard {...propsDoPostCard(primeiro)} variant="cover" href="#b" read />
      <PostCard {...propsDoPostCard(segundo)} variant="horizontal" href="#c" read />
      <PostCard {...propsDoPostCard(terceiro)} variant="compact" href="#d" read />
      <PostCard {...propsDoPostCard(quarto)} variant="featured" coverSrc={undefined} href="#e" />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const articles = canvasElement.querySelectorAll('article');
    await expect(articles).toHaveLength(5);
    await expect(articles[0]).toHaveClass('ubl-post-card--featured');
    await expect(articles[1]).toHaveClass('ubl-post-card--cover');
    await expect(articles[2]).toHaveClass('ubl-post-card--horizontal');
    await expect(articles[3]).toHaveClass('ubl-post-card--compact');
    // O compacto não tem capa nem resumo.
    await expect(articles[3].querySelector('.ubl-post-card__image')).toBeNull();
    await expect(articles[3].querySelector('.ubl-post-card__summary')).toBeNull();
    // Destaque sem capa vira cover.
    await expect(articles[4]).toHaveClass('ubl-post-card--cover');
    await expect(articles[4]).not.toHaveClass('ubl-post-card--featured');
    // O selo "Lido" existe nas quatro variantes lidas.
    await expect(within(canvasElement).getAllByText('Lido')).toHaveLength(4);
  },
};
