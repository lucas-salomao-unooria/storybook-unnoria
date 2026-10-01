import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { BlogApp } from '../../../src/unooblog/components/BlogApp';
import type { UblBlogAppProps } from '../../../src/unooblog/components/BlogApp';
import { DesktopFrame } from '../../../src/unooblog/components/DesktopFrame';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
import type { UblTheme } from '../../../src/unooblog/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocAnatomy,
  UblDocCard,
  UblDocDecisions,
  UblDocGrid,
  UblDocPractices,
  UblDocPropsTable,
  UblDocSpecs,
  UblDocStage,
  UblDocThemeSwitcher,
} from '../../../.storybook/components';
import { ublAuthors, ublComments, ublDemoNow, ublPosts, ublSeries, ublSite, ublTopics } from '../fixtures';

const BAR = '#716C98';

/* ==========================================================================
   O blog no navegador e no aparelho, com as fixtures de demonstração
   ========================================================================== */

type BlogProps = Partial<UblBlogAppProps> & {
  /** Onde o blog roda: o quadro de navegador (padrão) ou o aparelho */
  formato?: 'desktop' | 'celular';
  scale?: number;
  label?: string;
  /** Tema inicial do contêiner. O alternador do cabeçalho o troca a partir daí. */
  tema?: UblTheme;
};

/**
 * O app não troca o tema por conta própria: quem guarda o tema é o contêiner —
 * aqui, o quadro —, e o alternador do cabeçalho só chama `onToggleTheme`.
 */
const Blog = ({ formato = 'desktop', scale, label = 'Blog no navegador', tema = 'light', ...props }: BlogProps) => {
  const [theme, setTheme] = React.useState<UblTheme>(tema);

  const app = (
    <BlogApp
      posts={ublPosts}
      authors={ublAuthors}
      topics={ublTopics}
      series={ublSeries}
      comments={ublComments}
      site={ublSite}
      now={ublDemoNow}
      themeMode={theme}
      onToggleTheme={() => setTheme((atual) => (atual === 'light' ? 'dark' : 'light'))}
      {...props}
    />
  );

  if (formato === 'celular') {
    return (
      <PhoneFrame theme={theme} scale={scale ?? 1} ariaLabel={label}>
        {app}
      </PhoneFrame>
    );
  }

  return (
    <DesktopFrame theme={theme} scale={scale ?? 0.7} url="cadernoaberto.example" ariaLabel={label}>
      {app}
    </DesktopFrame>
  );
};

/* ==========================================================================
   Passos de navegação usados pelos `play`
   ========================================================================== */

type Tela = ReturnType<typeof within>;

const principal = ublPosts.find((item) => item.featured) ?? ublPosts[0];
const comCodigo = principal;
const revisao = ublPosts.find((item) => item.id === 'revisao-de-codigo') ?? ublPosts[1];
const feedback = ublPosts.find((item) => item.id === 'pedir-feedback') ?? ublPosts[2];
const serieAcessibilidade = ublSeries.find((item) => item.id === 'acessibilidade-na-pratica') ?? ublSeries[0];
const marina = ublAuthors[0];
const primeiroComentario = ublComments.find((item) => item.postId === principal.id && !item.parentId) ?? ublComments[0];

/** Abre o post em destaque pelo título do cartão. */
const abrirPrincipal = async (tela: Tela) => {
  await userEvent.click(await tela.findByRole('button', { name: principal.title }));
  return tela.findByRole('heading', { level: 1, name: principal.title });
};

/** Vai a uma tela da navegação principal (no compacto, abre o menu antes). */
const irPara = async (tela: Tela, nome: 'Início' | 'Tópicos' | 'Séries' | 'Autores') => {
  const menu = tela.queryByRole('button', { name: 'Menu' });
  if (menu) await userEvent.click(menu);
  const navegacao = within(await tela.findByRole('navigation', { name: 'Navegação principal' }));
  await userEvent.click(navegacao.getByRole('button', { name: nome }));
};

/** Guarda dois posts do feed pelos marcadores dos cartões. */
const salvarDois = async (tela: Tela) => {
  for (const item of [revisao, feedback]) {
    await userEvent.click(await tela.findByRole('button', { name: `Salvar “${item.title}” para ler depois` }));
  }
};

/* ==========================================================================
   Documentação
   ========================================================================== */

const TelasDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Telas • Telas compostas"
      title="Telas do blog"
      description="Cada tela desta seção é o BlogApp de verdade, dentro do DesktopFrame ou do PhoneFrame. As que dependem de interação (post aberto, filtro por tópico, comentários, salvos, busca, séries, autoria) chegam ao estado pelo roteiro de interação da estória, clicando como uma pessoa faria — nenhuma é uma réplica desenhada à parte."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="As telas do blog." />
    <UblDocGrid>
      <UblDocCard icon="🏠" title="Início">
        Introdução, post em destaque, feed com filtro por tópico e contagem, séries com o progresso de leitura e a
        newsletter.
      </UblDocCard>
      <UblDocCard icon="📖" title="Post">
        Progresso de leitura, sumário que acompanha a rolagem, curtir e salvar, seguir a autoria, navegação entre posts,
        &quot;Continue lendo&quot; e comentários em fio.
      </UblDocCard>
      <UblDocCard icon="💬" title="Comentários">
        Curtir, responder sob o comentário, comentar e excluir os próprios comentários, com &quot;Desfazer&quot;.
      </UblDocCard>
      <UblDocCard icon="🔖" title="Salvos e busca">
        Os posts guardados para ler depois, com remover e desfazer; a busca por início de palavra e sem acento.
      </UblDocCard>
      <UblDocCard icon="🗂️" title="Tópicos, séries e autores">
        A lista de cada um e a página de cada item: posts do tópico, série na ordem de leitura e perfil da autoria.
      </UblDocCard>
      <UblDocCard icon="📱" title="No celular">
        O mesmo início e o mesmo post no PhoneFrame: uma coluna, menu no cabeçalho, filtros que rolam na horizontal e
        sumário recolhível.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Como as telas são montadas."
    />
    <UblDocSpecs
      component="BlogApp"
      layout="Navegador 1440×1024 · DesktopFrame, ou aparelho 390×844 · PhoneFrame"
      specs={[
        { label: 'Quadro largo', value: 'DesktopFrame com scale 0,7' },
        { label: 'Quadro móvel', value: 'PhoneFrame device="bezel"' },
        { label: 'Aplicativo', value: 'BlogApp com as fixtures' },
        { label: 'Momento de referência', value: ublDemoNow },
        { label: 'Estados', value: 'alcançados por interação (play)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Telas pelo app, não por réplica',
          detail:
            'nenhuma tela é montada à parte: todas são o BlogApp, e as que dependem de interação chegam lá pelo play da estória. O que se vê é o que o produto recebe, e cada tela também é um teste de navegação.',
        },
        {
          subject: 'Tema decidido pelo quadro',
          detail:
            'o alternador do cabeçalho só chama onToggleTheme; quem guarda o tema e troca o data-ubl-theme é o quadro, na própria estória. O app recebe só themeMode, para escolher o glifo do botão.',
        },
        {
          subject: 'Data fixa',
          detail:
            'as telas usam now = quarta-feira, 30/09/2026, 10:00 (São Paulo), para que "Há 2 horas", "Há 1 dia" e o horário dos comentários novos sejam os mesmos em qualquer dia.',
        },
        {
          subject: 'Escala do navegador',
          detail:
            'o DesktopFrame mantém 1440px de largura de contêiner e só encolhe a exibição (scale): o blog continua com o sumário ao lado do texto, como num navegador de verdade.',
        },
        {
          subject: 'Imagens próprias',
          detail:
            'as capas e os retratos são ilustrações SVG na paleta da Unooria; o "Caderno Aberto" e as pessoas são fictícios e vivem só nas fixtures.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="O quadro e o app." />
    <UblDocStage label="Início no navegador" surface="subtle" align="flex-start" padding={16}>
      <Blog scale={0.4} label="Anatomia da tela" />
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            {
              name: 'Quadro',
              role: 'DesktopFrame (navegador) ou PhoneFrame (aparelho); a tela é o bloco de contenção das camadas.',
              token: 'DesktopFrame · PhoneFrame',
            },
            {
              name: 'Cabeçalho',
              role: 'Marca, navegação principal, busca, alternador de tema e o atalho dos posts salvos (com a contagem).',
              token: 'SiteHeader · IconButton',
            },
            {
              name: 'Conteúdo',
              role: 'Uma coluna, e no post o sumário ao lado do texto a partir de 960px de contêiner.',
              token: '--ubl-page-width · --ubl-reading-width · --ubl-toc-width',
            },
            {
              name: 'Rodapé',
              role: 'Navegação, tópicos e autoria, derivados dos dados.',
              token: 'SiteFooter',
            },
            {
              name: 'Camadas',
              role: 'Diálogo ou folha de compartilhar e o aviso com "Desfazer".',
              token: '--ubl-z-dialog · --ubl-z-toast',
            },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O início nos dois quadros e as telas de raiz."
    />
    <UblDocStage surface="subtle" align="flex-start" padding={16} gap={16}>
      <Blog scale={0.4} label="Início no navegador" />
      <Blog formato="celular" scale={0.45} label="Início no celular" />
      <Blog formato="celular" scale={0.45} label="Post no celular" initialRoute={{ type: 'post', id: principal.id }} />
    </UblDocStage>
    <UblDocStage surface="subtle" align="flex-start" padding={16} gap={16}>
      <Blog formato="celular" scale={0.4} label="Salvos" initialRoute={{ type: 'salvos' }} />
      <Blog formato="celular" scale={0.4} label="Busca" initialRoute={{ type: 'busca' }} />
      <Blog formato="celular" scale={0.4} label="Séries" initialRoute={{ type: 'series' }} />
      <Blog formato="celular" scale={0.4} label="Autores" initialRoute={{ type: 'autores' }} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Ao compor telas com o blog." />
    <UblDocPractices
      dos={[
        'Mostrar o blog sempre dentro de um quadro (DesktopFrame ou PhoneFrame): as áreas seguras e as camadas dependem dele.',
        'Chegar a um estado pela interação, como nestas estórias, em vez de desenhar a tela à parte.',
        'Fixar now em qualquer tela que mostre datas ou tempo decorrido.',
        'Deixar o quadro guardar o tema e entregar ao app só themeMode e onToggleTheme.',
      ]}
      donts={[
        'Recortar só um pedaço do app fora do quadro: as camadas perdem o bloco de contenção.',
        'Usar fotografias de terceiros nas demonstrações.',
        'Deixar a data de referência correr: "Há 2 horas" mudaria de um teste para o outro.',
        'Esperar que o app troque o tema sozinho.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="As mesmas telas nos dois temas." />
    <UblDocThemeSwitcher surface="subtle" padding={16}>
      {(activeTheme) => <Blog key={activeTheme} tema={activeTheme} scale={0.55} label="Blog no tema escolhido" />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="As telas e como chegar a cada uma."
    />
    <UblDocPropsTable
      title="Telas"
      rows={[
        {
          name: 'Blog interativo',
          type: 'BlogApp',
          description: 'O app inteiro, para usar à vontade, nos dois temas.',
        },
        { name: 'Início · tópico ativo', type: 'play', description: 'Um chip da nuvem de tópicos.' },
        {
          name: 'Post · com código · escuro',
          type: 'play',
          description: 'Título do post em destaque; rolagem até o bloco de código; alternador de tema.',
        },
        { name: 'Comentários', type: 'play', description: '"Responder a …" sob um comentário.' },
        { name: 'Salvos · vazio', type: 'play', description: 'Marcadores dos cartões e o atalho da barra.' },
        {
          name: 'Busca · resultados · sem resultados',
          type: 'play',
          description: 'Botão de busca do cabeçalho e digitação no campo.',
        },
        {
          name: 'Tópicos · séries · série · autor',
          type: 'play',
          description: 'Itens da navegação principal e os cartões de cada lista.',
        },
        { name: 'No celular', type: 'PhoneFrame', description: 'O início e o post no aparelho.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BlogApp> = {
  title: 'Unooblog/Telas/Telas Compostas',
  component: BlogApp,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof BlogApp>;

/**
 * Documentação das telas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * O blog inteiro no navegador, para usar à vontade.
 */
export const BlogInterativo: Story = {
  name: '🕹️ 1. Blog interativo',
  render: () => <Blog scale={0.8} />,
};

/**
 * O blog inteiro no tema escuro; o alternador do cabeçalho volta ao claro.
 */
export const BlogInterativoEscuro: Story = {
  name: '🕹️ 2. Blog interativo (tema escuro)',
  render: () => <Blog tema="dark" scale={0.8} label="Blog no tema escuro" />,
};

/* ----------------------------------------------------------------- Início */

export const Inicio: Story = {
  name: '🎨 Início',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(await tela.findByRole('heading', { level: 1, name: ublSite.tagline })).toBeInTheDocument();
    const navegacao = within(tela.getByRole('navigation', { name: 'Navegação principal' }));
    await expect(navegacao.getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  },
};

export const InicioTopicoAtivo: Story = {
  name: '🎨 Início: tópico ativo',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const nuvem = within(await tela.findByRole('region', { name: 'Filtrar posts por tópico' }));
    await userEvent.click(nuvem.getByRole('button', { name: /^Acessibilidade/ }));
    const esperados = ublPosts.filter((item) => item.topicIds.includes('acessibilidade')).length;
    const lista = within(tela.getByRole('list', { name: 'Últimos posts' }));
    await waitFor(() => expect(lista.getAllByRole('listitem')).toHaveLength(esperados));
  },
};

/* ------------------------------------------------------------------- Post */

export const Post: Story = {
  name: '🎨 Post',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const titulo = await abrirPrincipal(within(canvasElement));
    await waitFor(() => expect(titulo).toHaveFocus());
  },
};

export const PostComCodigo: Story = {
  name: '🎨 Post: bloco de código',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await expect(comCodigo.body.some((bloco) => bloco.type === 'code')).toBe(true);
    const bloco = await waitFor(() => {
      const encontrado = canvasElement.querySelector<HTMLElement>('.ubl-code-block');
      if (!encontrado) throw new Error('bloco de código ainda não montado');
      return encontrado;
    });
    bloco.scrollIntoView({ block: 'center' });
    await expect(within(bloco).getByRole('button', { name: 'Copiar código' })).toBeInTheDocument();
  },
};

export const PostEscuro: Story = {
  name: '🎨 Post: tema escuro',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await userEvent.click(tela.getByRole('button', { name: 'Tema escuro' }));
    await expect(tela.getByRole('button', { name: 'Tema escuro' })).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Comentarios: Story = {
  name: '🎨 Comentários: respondendo',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await userEvent.click(await tela.findByRole('button', { name: `Responder a ${primeiroComentario.authorName}` }));
    await expect(
      await tela.findByRole('form', { name: `Responder a ${primeiroComentario.authorName}` })
    ).toBeInTheDocument();
  },
};

/* ---------------------------------------------------------------- Salvos */

export const Salvos: Story = {
  name: '🎨 Salvos',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await salvarDois(tela);
    await userEvent.click(await tela.findByRole('button', { name: 'Posts salvos, 2' }));
    const lista = within(await tela.findByRole('list', { name: 'Posts salvos' }));
    await expect(lista.getAllByRole('listitem')).toHaveLength(2);
  },
};

export const SalvosVazio: Story = {
  name: '🎨 Salvos: vazio',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: 'Posts salvos' }));
    await expect(await tela.findByRole('heading', { name: 'Nada salvo por aqui' })).toBeInTheDocument();
  },
};

/* ----------------------------------------------------------------- Busca */

export const Busca: Story = {
  name: '🎨 Busca',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: 'Abrir a busca' }));
    await expect(await tela.findByRole('heading', { name: 'O que você procura?' })).toBeInTheDocument();
    await expect(await tela.findByRole('searchbox')).toHaveFocus();
  },
};

export const BuscaResultados: Story = {
  name: '🎨 Busca: resultados',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: 'Abrir a busca' }));
    await userEvent.type(await tela.findByRole('searchbox'), 'foco');
    await expect(await tela.findByText(/resultados? para "foco"/)).toBeInTheDocument();
  },
};

export const BuscaSemResultados: Story = {
  name: '🎨 Busca: sem resultados',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: 'Abrir a busca' }));
    await userEvent.type(await tela.findByRole('searchbox'), 'zzxqw');
    await expect(await tela.findByRole('heading', { name: 'Nada encontrado' })).toBeInTheDocument();
  },
};

/* ----------------------------------------- Tópicos, séries e autoria */

export const Topicos: Story = {
  name: '🎨 Tópicos',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Tópicos');
    await expect(await tela.findByRole('heading', { level: 1, name: 'Tópicos' })).toBeInTheDocument();
    await expect(tela.getByRole('region', { name: 'Todos os tópicos' })).toBeInTheDocument();
  },
};

export const Series: Story = {
  name: '🎨 Séries',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Séries');
    await expect(await tela.findByRole('heading', { level: 1, name: 'Séries' })).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: serieAcessibilidade.title })).toBeInTheDocument();
  },
};

export const Serie: Story = {
  name: '🎨 Série: na ordem de leitura',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Séries');
    await userEvent.click(await tela.findByRole('button', { name: serieAcessibilidade.title }));
    await expect(await tela.findByRole('heading', { level: 1, name: serieAcessibilidade.title })).toBeInTheDocument();
    const lista = within(tela.getByRole('list', { name: `Posts da série ${serieAcessibilidade.title}` }));
    await expect(lista.getAllByRole('listitem')).toHaveLength(serieAcessibilidade.postIds.length);
  },
};

export const Autor: Story = {
  name: '🎨 Autor',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Autores');
    const lista = within(await tela.findByRole('list', { name: 'Autores' }));
    await userEvent.click(lista.getByRole('link', { name: marina.name }));
    await expect(await tela.findByRole('heading', { level: 2, name: `Posts de ${marina.name}` })).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------- No celular */

export const NoCelularInicio: Story = {
  name: '🎨 No celular: início',
  render: () => <Blog formato="celular" label="Início no celular" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(await tela.findByRole('heading', { level: 1, name: ublSite.tagline })).toBeInTheDocument();
  },
};

export const NoCelularPost: Story = {
  name: '🎨 No celular: post',
  render: () => <Blog formato="celular" label="Post no celular" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const titulo = await abrirPrincipal(tela);
    await waitFor(() => expect(titulo).toHaveFocus());
    await expect(await tela.findByRole('navigation', { name: 'Neste post' })).toBeInTheDocument();
  },
};

/* --------------------------------------------------------------- Temas */

export const LadoALado: Story = {
  name: '🎨 Claro e escuro lado a lado',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Blog
        formato="celular"
        tema="light"
        scale={0.75}
        label="Blog no tema claro"
        initialRoute={{ type: 'post', id: principal.id }}
      />
      <Blog
        formato="celular"
        tema="dark"
        scale={0.75}
        label="Blog no tema escuro"
        initialRoute={{ type: 'post', id: principal.id }}
      />
    </div>
  ),
};

/**
 * Navegar pelas telas da navegação principal e voltar ao início.
 */
export const NavegacaoPelasTelas: Story = {
  name: 'Fluxo: navegar pelas telas',
  render: () => <Blog />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const navegacao = () => within(tela.getByRole('navigation', { name: 'Navegação principal' }));

    await irPara(tela, 'Tópicos');
    await expect(await tela.findByRole('heading', { level: 1, name: 'Tópicos' })).toBeInTheDocument();
    await expect(navegacao().getByRole('button', { name: 'Tópicos' })).toHaveAttribute('aria-current', 'page');

    await irPara(tela, 'Séries');
    await expect(await tela.findByRole('heading', { level: 1, name: 'Séries' })).toBeInTheDocument();

    await irPara(tela, 'Autores');
    await expect(await tela.findByRole('heading', { level: 1, name: 'Autores' })).toBeInTheDocument();

    await irPara(tela, 'Início');
    await expect(await tela.findByRole('heading', { level: 1, name: ublSite.tagline })).toBeInTheDocument();
    await expect(navegacao().getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  },
};
