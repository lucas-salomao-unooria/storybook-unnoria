import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { BlogApp } from '../../../src/unooblog/components/BlogApp';
import type { UblBlogAppProps } from '../../../src/unooblog/components/BlogApp';
import { DesktopFrame } from '../../../src/unooblog/components/DesktopFrame';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
import { ublMatchesQuery } from '../../../src/unooblog/content';
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

type BlogProps = Partial<UblBlogAppProps> & {
  formato?: 'desktop' | 'celular';
  scale?: number;
  width?: number;
  height?: number;
  ariaLabel?: string;
  /** Tema inicial do contêiner; o alternador do cabeçalho o troca a partir daí. */
  tema?: UblTheme;
};

/**
 * O app não troca o tema por conta própria: aqui quem guarda o tema é o quadro,
 * e o alternador do cabeçalho só chama `onToggleTheme`.
 */
const BlogNoQuadro = ({
  formato = 'desktop',
  scale,
  width,
  height,
  ariaLabel = 'Blog no navegador',
  tema = 'light',
  ...props
}: BlogProps) => {
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

  return formato === 'celular' ? (
    <PhoneFrame theme={theme} scale={scale ?? 1} ariaLabel={ariaLabel}>
      {app}
    </PhoneFrame>
  ) : (
    <DesktopFrame
      theme={theme}
      scale={scale ?? 0.7}
      width={width}
      height={height}
      url="cadernoaberto.example"
      ariaLabel={ariaLabel}
    >
      {app}
    </DesktopFrame>
  );
};

/**
 * Página de documentação rica do BlogApp.
 */
const BlogAppDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Aplicativo"
      title="BlogApp"
      description="O blog inteiro, pronto para rodar dentro do DesktopFrame ou do PhoneFrame: início, post com sumário e progresso de leitura, tópicos, séries, autores, busca e posts salvos, com comentários em fio, seguir, newsletter e desfazer. É a composição de todos os componentes do módulo, com o estado guardado por um redutor puro que o produto também pode usar."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Tudo o que um blog de leitura longa faz, ligado de ponta a ponta."
    />
    <UblDocGrid>
      <UblDocCard icon="🏠" title="Início">
        Introdução, post em destaque, feed com filtro por tópico e contagem, séries com o progresso de leitura e a
        newsletter. O destaque abre a página e não se repete no feed.
      </UblDocCard>
      <UblDocCard icon="📖" title="Post">
        Barra de progresso que acompanha a rolagem do texto (o post conta como lido ao passar de 80%), sumário que marca
        o intertítulo em leitura, curtir, salvar, copiar o link, compartilhar, seguir a autoria, navegação entre posts e
        &quot;Continue lendo&quot;.
      </UblDocCard>
      <UblDocCard icon="💬" title="Comentários em fio">
        Curtir, responder (o compositor abre sob o comentário), comentar e excluir os próprios comentários com
        &quot;Desfazer&quot;. Excluir leva as respostas junto.
      </UblDocCard>
      <UblDocCard icon="🔖" title="Salvos e desfazer">
        Salvar e remover mostram um aviso com &quot;Desfazer&quot;, que devolve o estado inteiro. A lista de salvos
        mostra o mais recente primeiro.
      </UblDocCard>
      <UblDocCard icon="🔍" title="Busca">
        Por início de palavra e sem acento, em título, subtítulo, resumo, autoria e tópicos. A contagem fica numa região
        viva e o estado vazio sugere os tópicos.
      </UblDocCard>
      <UblDocCard icon="🗂️" title="Tópicos, séries e autores">
        A lista e a página de cada um: posts do tópico, série na ordem de leitura com o progresso e perfil da autoria
        com seguir.
      </UblDocCard>
      <UblDocCard icon="🧪" title="Para missões e testes">
        <code>onAction</code> recebe cada operação antes de ela acontecer, e <code>onStateChange</code> o estado inteiro
        depois. Fixe <code>now</code> para que o tempo decorrido e o horário dos comentários sejam os mesmos em qualquer
        dia.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Arranjo, estado e decisões de comportamento."
    />
    <UblDocSpecs
      component="BlogApp"
      layout="Aplicativo · ocupa o contêiner posicionado (a tela do DesktopFrame ou do PhoneFrame)"
      specs={[
        {
          label: 'Telas',
          value: 'inicio · topicos · topico · series · serie · autores · autor · busca · salvos · post',
        },
        { label: 'Estado', value: 'ublBlogReducer (blogState.ts)' },
        { label: 'Largo', value: '≥ 960px de contêiner · post com o sumário ao lado do texto (--ubl-toc-width)' },
        { label: 'Médio', value: '≥ 640px · uma coluna; o sumário vira um bloco recolhível no topo do post' },
        {
          label: 'Compacto',
          value: '< 640px · filtros de tópico em faixa horizontal; compartilhar vira folha inferior',
        },
        {
          label: 'Progresso de leitura',
          value: 'até o fim do texto; marca como lido a partir de 80%; avisa a cada 5 pontos',
        },
        { label: 'Camadas', value: '--ubl-z-progress · sheet · dialog · toast' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'O app não troca o tema',
          detail:
            'o alternador do cabeçalho só chama onToggleTheme; quem troca o data-ubl-theme e devolve o novo themeMode é o contêiner (o produto, ou o quadro da estória). themeMode escolhe o glifo e o aria-pressed do botão, e o botão só aparece com themeMode e onToggleTheme. Assim o app não briga com o tema que o produto já controla.',
        },
        {
          subject: 'Estado no app, regras fora dele',
          detail:
            'o app guarda o estado a partir de posts e comments (não controlado); as operações moram em blogState.ts, um redutor puro exportado com os seletores e os validadores, para que um produto monte o próprio blog com as mesmas regras.',
        },
        {
          subject: 'Conteúdo por props, nada embutido',
          detail:
            'posts, authors, topics, series, comments e site são obrigatórios: o módulo não traz texto, nome de blog nem de pessoa. series e comments podem ser listas vazias.',
        },
        {
          subject: 'Desfazer por fotografia do estado',
          detail:
            'antes de salvar, remover um salvo ou excluir um comentário, o app guarda o estado inteiro; "Desfazer" o devolve de uma vez (operação replace, que também passa por onAction). É mais simples e mais correto que operações inversas — e devolve também as respostas de um comentário excluído.',
        },
        {
          subject: 'Pilha de rotas e trilha de navegação',
          detail:
            'abrir um post, um tópico, uma série ou uma autoria empilha; a navegação principal recomeça a pilha. A trilha ("Início › tópico › título") sobe pela pilha quando o destino já está nela — e a rolagem volta de onde estava — e recomeça nele quando não está. Ao abrir uma tela o foco vai para o título (h1), que se anuncia ao leitor de tela; na busca, vai para o campo.',
        },
        {
          subject: 'Destaque fora do feed',
          detail:
            'o post em destaque abre a página inicial e não se repete na grade; escolhido um tópico, o destaque sai e o feed mostra tudo o que há naquele tópico. O texto "12 posts no blog" conta o destaque e a grade juntos.',
        },
        {
          subject: 'Progresso de leitura medido no texto',
          detail:
            'a barra acompanha a rolagem até o FIM DO TEXTO, e não da página inteira: comentários, "Continue lendo" e rodapé não são leitura. setProgress só vai a onAction a cada 5 pontos (e ao chegar em 100), e só para a frente; markRead sai uma vez, ao passar de 80%. Post que cabe inteiro na tela conta como lido.',
        },
        {
          subject: 'Sumário que rola o contêiner do app',
          detail:
            'clicar no sumário (ou na âncora de um intertítulo) rola a tela do app — não a janela — até o intertítulo, move o foco para ele e marca o item. O item em leitura vem da posição dos intertítulos na rolagem, descontando a escala do quadro (o DesktopFrame encolhe por transform).',
        },
        {
          subject: 'Compartilhar sem a API do aparelho',
          detail:
            'o botão abre um diálogo (folha inferior no compacto) com o link e o botão "Copiar link". Não se usa navigator.share: o resultado seria um seletor nativo que o app não controla nem testa. Copiar usa a área de transferência dentro de try/catch e mostra "Link copiado" ou "Não foi possível copiar".',
        },
        {
          subject: 'Camadas na tela, sem portal',
          detail:
            'diálogo, folha e aviso são position: absolute na tela do quadro, e o foco, o Esc e o aria-hidden do fundo vêm do useModalFocus dos componentes.',
        },
        {
          subject: 'Autoria como link, abrir como clique',
          detail:
            'o nome no cartão de autoria é um link (href) para haver um alvo de teclado; o app cancela a navegação do endereço e troca a tela. O botão Seguir nunca abre o perfil.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="As camadas do app, de baixo para cima."
    />
    <UblDocStage label="Início no navegador" surface="subtle" align="flex-start" padding={16}>
      <BlogNoQuadro scale={0.4} ariaLabel="Anatomia do blog" />
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            {
              name: 'Cabeçalho',
              role: 'Marca, navegação principal, busca, alternador de tema e o atalho dos posts salvos (com a contagem). No compacto, a navegação vira o botão de menu.',
              token: 'SiteHeader · IconButton',
            },
            {
              name: 'Introdução e destaque',
              role: 'O título da página, a descrição e o post em destaque sobre o véu.',
              token: 'PostCard featured',
            },
            {
              name: 'Feed',
              role: 'Nuvem de tópicos com a contagem (filtra o feed) e a grade de cartões.',
              token: 'TopicCloud · PostList · PostCard',
            },
            {
              name: 'Séries',
              role: 'Um cartão por série, com a barra de progresso dos posts lidos.',
              token: 'SeriesCard',
            },
            { name: 'Newsletter', role: 'Campo de e-mail com validação e confirmação.', token: 'NewsletterSignup' },
            {
              name: 'Rodapé',
              role: 'Navegação, tópicos e autoria, derivados dos dados.',
              token: 'SiteFooter',
            },
            {
              name: 'Camadas e aviso',
              role: 'Diálogo ou folha de compartilhar e o aviso com "Desfazer".',
              token: 'Modal · BottomSheet · Toast',
            },
          ]}
        />
      </div>
    </UblDocStage>
    <UblDocStage label="Post no navegador" surface="subtle" align="flex-start" padding={16}>
      <BlogNoQuadro scale={0.4} ariaLabel="Anatomia do post" initialRoute={{ type: 'post', id: ublPosts[0].id }} />
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            {
              name: 'Progresso de leitura',
              role: 'Faixa de 3px no topo da tela, até o fim do texto.',
              token: 'ReadingProgress',
            },
            {
              name: 'Trilha e cabeçalho',
              role: 'Início › tópico › título; tópicos, série, título, autoria e capa.',
              token: 'Breadcrumb · PostHeader',
            },
            {
              name: 'Reações e compartilhar',
              role: 'Curtir, ver comentários, salvar; compartilhar e copiar o link.',
              token: 'ReactionBar · ShareBar',
            },
            {
              name: 'Texto e sumário',
              role: 'Coluna de leitura de 680px; ao lado, no largo, o sumário fixo; no compacto, um bloco recolhível.',
              token: 'PostBody · TableOfContents',
            },
            {
              name: 'Autoria e navegação',
              role: 'Cartão da autoria com seguir; post anterior e próximo.',
              token: 'AuthorCard · PostNavigation',
            },
            {
              name: 'Comentários',
              role: 'Compositor, fio com respostas, curtir, responder e excluir os próprios.',
              token: 'CommentThread · CommentComposer',
            },
            {
              name: 'Continue lendo',
              role: 'Três posts, os que dividem mais tópicos primeiro.',
              token: 'RelatedPosts',
            },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três tamanhos de contêiner e as telas iniciais."
    />
    <UblDocStage label="Largo, médio e compacto" surface="subtle" align="flex-start" padding={16} gap={16}>
      <BlogNoQuadro scale={0.35} ariaLabel="Contêiner largo" />
      <BlogNoQuadro scale={0.5} width={800} height={900} ariaLabel="Contêiner médio" />
      <BlogNoQuadro formato="celular" scale={0.45} ariaLabel="Contêiner compacto" />
    </UblDocStage>
    <UblDocStage label="initialRoute" surface="subtle" align="flex-start" padding={16} gap={16}>
      <BlogNoQuadro formato="celular" scale={0.4} ariaLabel="Rota início" />
      <BlogNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'post', id: ublPosts[0].id }}
        ariaLabel="Rota post"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'topico', id: 'acessibilidade' }}
        ariaLabel="Rota tópico"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'serie', id: ublSeries[0].id }}
        ariaLabel="Rota série"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'autor', id: ublAuthors[0].id }}
        ariaLabel="Rota autor"
      />
    </UblDocStage>
    <UblDocStage label="Salvos, busca e blog vazio" surface="subtle" align="flex-start" padding={16} gap={16}>
      <BlogNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'salvos' }}
        defaultState={{ saved: [ublPosts[1].id, ublPosts[0].id], read: [ublPosts[1].id] }}
        ariaLabel="Com posts salvos"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'busca', query: 'foco' }}
        ariaLabel="Resultados da busca"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'busca', query: 'zzxqw' }}
        ariaLabel="Busca sem resultados"
      />
      <BlogNoQuadro formato="celular" scale={0.4} posts={[]} comments={[]} series={[]} ariaLabel="Blog vazio" />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o app pronto." />
    <UblDocPractices
      dos={[
        'Rodar o app dentro de um DesktopFrame, de um PhoneFrame ou de outro contêiner posicionado com altura definida.',
        'Fixar now em demonstrações, missões e testes.',
        'Passar posts, authors, topics, series, comments e site; series e comments podem ser listas vazias.',
        'Guardar o tema no contêiner e entregar ao app só themeMode e onToggleTheme.',
        'Ouvir onAction para registrar o que a pessoa fez e onStateChange para persistir.',
        'Usar blogState.ts quando o produto precisar do próprio blog com os mesmos componentes.',
      ]}
      donts={[
        'Trocar posts depois de montar esperando que o app reinicie: remonte com uma key nova.',
        'Esperar que o alternador de tema troque o tema sozinho: ele só chama onToggleTheme.',
        'Renderizar o app solto na página, sem contêiner posicionado: as camadas se ancoram nele.',
        'Escrever o texto dos posts em HTML solto: os blocos (parágrafo, intertítulo, citação, código, aviso, figura, lista) mantêm o ritmo da leitura e alimentam o sumário.',
        'Esconder "Desfazer": é ele que torna salvar, remover e excluir sem medo.',
        'Tratar copiar o link como garantido: o navegador pode recusar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O app acompanha data-ubl-theme; o código dos posts é invariante nos dois temas."
    />
    <UblDocThemeSwitcher surface="subtle" padding={16}>
      {(activeTheme) => (
        <BlogNoQuadro key={activeTheme} tema={activeTheme} scale={0.55} ariaLabel="Blog no tema escolhido" />
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do BlogApp e do seu modelo de estado."
    />
    <UblDocPropsTable
      title="BlogApp"
      rows={[
        { name: 'posts', type: 'UblPost[]', description: 'Posts do blog. Obrigatório.' },
        { name: 'authors', type: 'UblAuthor[]', description: 'Autoria (resolve authorId). Obrigatório.' },
        { name: 'topics', type: 'UblTopic[]', description: 'Tópicos (resolve topicIds). Obrigatório.' },
        { name: 'series', type: 'UblSeries[]', description: 'Séries. Obrigatório; pode ser vazio.' },
        {
          name: 'comments',
          type: 'UblComment[]',
          description: 'Comentários, planos, com respostas por parentId. Obrigatório; pode ser vazio.',
        },
        {
          name: 'site',
          type: 'UblBlogSite',
          description: '{ name, tagline?, description?, copyright? }. Obrigatório.',
        },
        {
          name: 'now',
          type: 'Date | string',
          description: 'Referência de "Há 2 horas" e do horário dos comentários novos.',
        },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso de leitura das datas.' },
        { name: 'initialRoute', type: 'UblBlogRoute', default: "{ type: 'inicio' }", description: 'Tela ao montar.' },
        {
          name: 'initialTopicId',
          type: 'string',
          default: "'todos'",
          description: 'Tópico do filtro do feed ao montar.',
        },
        {
          name: 'defaultState',
          type: 'Partial<Omit<UblBlogState, "posts" | "comments">>',
          description: 'Curtidas, salvos, seguidos, lidos, progresso e inscrição iniciais. Só valem ao montar.',
        },
        {
          name: 'themeMode',
          type: "'light' | 'dark'",
          description: 'Modo de cor que o contêiner exibe (glifo e aria-pressed do alternador).',
        },
        {
          name: 'onToggleTheme',
          type: '() => void',
          description:
            'Chamado pelo alternador do cabeçalho. O app NÃO troca o tema: o contêiner decide. O botão só aparece com themeMode e onToggleTheme.',
        },
        { name: 'onStateChange', type: '(state: UblBlogState) => void', description: 'Estado inteiro a cada mudança.' },
        {
          name: 'onAction',
          type: '(action: UblBlogAction) => void',
          description: 'Cada operação, antes de ser aplicada.',
        },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema; sem valor, herda o do contêiner.' },
        {
          name: '…HTMLAttributes<HTMLDivElement>',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Repassadas ao nó raiz.',
        },
      ]}
    />
    <UblDocPropsTable
      title="UblBlogRoute"
      rows={[
        {
          name: 'inicio · topicos · series · autores · salvos',
          type: '{ type }',
          description: 'As telas de mesmo nome.',
        },
        { name: 'topico · serie · autor', type: '{ type; id }', description: 'Um tópico, uma série, uma autoria.' },
        { name: 'post', type: '{ type; id }', description: 'Um post aberto.' },
        { name: 'busca', type: '{ type; query? }', description: 'Resultados; sem consulta, as sugestões de tópico.' },
      ]}
    />
    <UblDocPropsTable
      title="UblBlogAction (blogState.ts)"
      rows={[
        { name: 'toggleLike · toggleSave', type: '{ postId }', description: 'Curtir e salvar um post.' },
        {
          name: 'toggleFollow',
          type: '{ authorId }',
          description: 'Seguir a autoria (ela precisa assinar ao menos um post).',
        },
        {
          name: 'addComment · deleteComment',
          type: '{ comment } · { id }',
          description: 'Comentar (ou responder, com parentId) e excluir — em cascata, com as respostas.',
        },
        { name: 'toggleCommentLike', type: '{ id }', description: 'Curtir um comentário.' },
        { name: 'subscribe', type: '{ email }', description: 'Inscrever na newsletter (formato válido).' },
        {
          name: 'setProgress · markRead',
          type: '{ postId; value } · { postId }',
          description: 'Progresso de leitura (0 a 100, só avança) e post lido.',
        },
        { name: 'clearSaved', type: '{}', description: 'Esvazia os salvos.' },
        { name: 'replace', type: '{ state }', description: 'Troca o estado inteiro (é o "Desfazer").' },
      ]}
    />
    <UblDocPropsTable
      title="Seletores e validadores (blogState.ts)"
      rows={[
        {
          name: 'ublSelectLatest',
          type: '(state, { topicId?, query?, authors?, topics? }) => UblPost[]',
          description: 'Do mais recente ao mais antigo; busca por início de palavra, sem acento.',
        },
        {
          name: 'ublSelectFeatured · ublSelectSaved · ublSelectUnread',
          type: '(state) => UblPost[]',
          description: 'Destaques, salvos (o mais recente primeiro) e ainda não lidos.',
        },
        {
          name: 'ublSelectByTopic · ublSelectByAuthor · ublSelectBySeries',
          type: '(state, id) => UblPost[]',
          description: 'Um tópico, uma autoria, uma série (na ordem de leitura).',
        },
        {
          name: 'ublSelectRelated',
          type: '(state, postId, count?) => UblPost[]',
          description: '"Continue lendo": os que dividem mais tópicos primeiro.',
        },
        {
          name: 'ublSelectComments · ublCommentCount',
          type: '(state, postId) => …',
          description: 'Comentários na ordem de exibição, e quantos há.',
        },
        {
          name: 'ublLikeCount · ublCommentLikes · ublFollowerCount',
          type: '(state, …) => number',
          description: 'A base mais um, quando a pessoa que lê curtiu ou segue.',
        },
        {
          name: 'ublTopicCounts',
          type: '(state) => Record<string, number>',
          description: 'Quantos posts há por tópico, e o total em todos.',
        },
        {
          name: 'ublValidateComment · ublValidateEmail',
          type: '(texto) => { ok; error? }',
          description: 'Comentário de 1 a 1000 code points; e-mail em formato válido.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof BlogApp> = {
  title: 'Unooblog/Componentes/BlogApp',
  component: BlogApp,
  parameters: { layout: 'padded' },
  argTypes: {
    posts: { control: 'object', description: 'Posts do blog.' },
    authors: { control: 'object', description: 'Autoria dos posts.' },
    topics: { control: 'object', description: 'Tópicos editoriais.' },
    series: { control: 'object', description: 'Séries de posts.' },
    comments: { control: 'object', description: 'Comentários, planos, com respostas por parentId.' },
    site: { control: 'object', description: 'Dados do blog: { name, tagline?, description?, copyright? }.' },
    now: { control: 'text', description: 'Momento de referência.' },
    timeZone: { control: 'text', description: 'Fuso de leitura das datas.' },
    initialRoute: {
      control: 'object',
      description:
        "Tela inicial: { type: 'inicio' | 'topicos' | 'topico' | 'series' | 'serie' | 'autores' | 'autor' | 'busca' | 'salvos' | 'post' }.",
    },
    initialTopicId: {
      control: 'select',
      options: ['todos', ...ublTopics.map((topic) => topic.id)],
      description: 'Filtro inicial do feed.',
    },
    defaultState: {
      control: 'object',
      description: 'Estado inicial parcial (curtidas, salvos, seguidos, lidos, progresso, inscrição).',
    },
    themeMode: { control: 'radio', options: ['light', 'dark'], description: 'Modo de cor que o contêiner exibe.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onToggleTheme: { action: 'onToggleTheme' },
    onAction: { action: 'onAction' },
    onStateChange: { action: 'onStateChange' },
  },
  args: {
    posts: ublPosts,
    authors: ublAuthors,
    topics: ublTopics,
    series: ublSeries,
    comments: ublComments,
    site: ublSite,
    now: ublDemoNow,
    timeZone: 'America/Sao_Paulo',
    initialRoute: { type: 'inicio' },
    initialTopicId: 'todos',
    defaultState: {},
    themeMode: 'light',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof BlogApp>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BlogAppDocumentationPage />,
};

/**
 * O quadro do playground: guarda o tema e entrega ao app só `themeMode` e `onToggleTheme`.
 */
const PlaygroundBlog = (args: UblBlogAppProps) => {
  const [theme, setTheme] = React.useState<UblTheme>(args.theme ?? 'light');
  return (
    <DesktopFrame theme={theme} scale={0.7} url="cadernoaberto.example" ariaLabel="Blog no navegador">
      <BlogApp
        {...args}
        theme={undefined}
        themeMode={theme}
        onToggleTheme={() => {
          args.onToggleTheme?.();
          setTheme((atual) => (atual === 'light' ? 'dark' : 'light'));
        }}
      />
    </DesktopFrame>
  );
};

/**
 * Playground com todas as propriedades do BlogApp. As props de estado inicial só
 * valem ao montar: troque-as e o app remonta.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do BlogApp',
  render: (args) => (
    <PlaygroundBlog
      key={`${JSON.stringify(args.initialRoute)}-${args.initialTopicId}-${args.theme}-${JSON.stringify(args.defaultState)}`}
      {...args}
    />
  ),
};

/**
 * O blog completo no navegador.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: blog completo no navegador',
  render: () => <BlogNoQuadro scale={0.8} />,
};

/**
 * Os três tamanhos de contêiner: largo, médio e compacto.
 */
export const Tamanhos: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <BlogNoQuadro scale={0.45} ariaLabel="Contêiner largo" initialRoute={{ type: 'post', id: ublPosts[0].id }} />
      <BlogNoQuadro
        scale={0.55}
        width={800}
        height={900}
        ariaLabel="Contêiner médio"
        initialRoute={{ type: 'post', id: ublPosts[0].id }}
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        ariaLabel="Contêiner compacto"
        initialRoute={{ type: 'post', id: ublPosts[0].id }}
      />
    </div>
  ),
};

/**
 * As telas: início, post, tópico, série e autoria.
 */
export const TodasVariantes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <BlogNoQuadro formato="celular" scale={0.55} ariaLabel="Rota início" />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'post', id: ublPosts[0].id }}
        ariaLabel="Rota post"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'topico', id: 'acessibilidade' }}
        ariaLabel="Rota tópico"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'serie', id: ublSeries[0].id }}
        ariaLabel="Rota série"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'autor', id: ublAuthors[0].id }}
        ariaLabel="Rota autor"
      />
    </div>
  ),
};

/**
 * Com posts salvos e lidos, um post já curtido e seguido, busca sem resultados e o blog vazio.
 */
export const Estados: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'salvos' }}
        defaultState={{ saved: [ublPosts[1].id, ublPosts[0].id], read: [ublPosts[1].id] }}
        ariaLabel="Com posts salvos"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'post', id: ublPosts[0].id }}
        defaultState={{ liked: [ublPosts[0].id], saved: [ublPosts[0].id], following: [ublPosts[0].authorId] }}
        ariaLabel="Post curtido, salvo e com a autoria seguida"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'busca', query: 'zzxqw' }}
        ariaLabel="Busca sem resultados"
      />
      <BlogNoQuadro
        formato="celular"
        scale={0.55}
        defaultState={{ subscribedEmail: 'leitora@exemplo.com' }}
        posts={[]}
        comments={[]}
        series={[]}
        ariaLabel="Blog vazio"
      />
    </div>
  ),
};

/**
 * O mesmo blog nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <BlogNoQuadro formato="celular" scale={0.7} tema="light" ariaLabel="Blog no tema claro" />
      <BlogNoQuadro formato="celular" scale={0.7} tema="dark" ariaLabel="Blog no tema escuro" />
    </div>
  ),
};

/* ==========================================================================
   Fluxos testados
   ========================================================================== */

type Tela = ReturnType<typeof within>;

const principal = ublPosts.find((item) => item.featured) ?? ublPosts[0];
const revisao = ublPosts.find((item) => item.id === 'revisao-de-codigo') ?? ublPosts[1];
const anterior = [...ublPosts]
  .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
  .filter((item) => new Date(item.publishedAt) < new Date(principal.publishedAt))
  .pop() as (typeof ublPosts)[number];
const autoria = ublAuthors.find((item) => item.id === principal.authorId) ?? ublAuthors[0];
const comentarioRaiz = ublComments.find((item) => item.postId === principal.id && !item.parentId) ?? ublComments[0];
const comentarioMeu = ublComments.find((item) => item.postId === principal.id && item.mine) ?? ublComments[0];
const intertitulo = principal.body.find(
  (bloco) => bloco.type === 'heading' && bloco.level === 2 && bloco.text.length > 20
);
const tituloDoIntertitulo = intertitulo && intertitulo.type === 'heading' ? intertitulo.text : '';

const abrirPrincipal = async (tela: Tela) => {
  await userEvent.click(await tela.findByRole('button', { name: principal.title }));
  return tela.findByRole('heading', { level: 1, name: principal.title });
};

const navegacao = (tela: Tela) => within(tela.getByRole('navigation', { name: 'Navegação principal' }));

/** Dá à área de transferência um destino que o teste lê. */
const espiarAreaDeTransferencia = () => {
  const copiados: string[] = [];
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: async (texto: string) => {
        copiados.push(texto);
      },
    },
  });
  return copiados;
};

const noDesktop = (args: UblBlogAppProps) => (
  <DesktopFrame scale={0.7} ariaLabel="Blog no navegador">
    <BlogApp {...args} />
  </DesktopFrame>
);

const noCelular = (args: UblBlogAppProps) => (
  <PhoneFrame ariaLabel="Blog no aparelho">
    <BlogApp {...args} />
  </PhoneFrame>
);

/**
 * Abrir um post pela página inicial: o foco vai para o título, e a trilha devolve o início.
 */
export const FluxoAbrirPost: Story = {
  name: 'Fluxo: abrir um post e voltar pela trilha',
  render: noDesktop,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(await navegacao(tela).findByRole('button', { name: 'Início' })).toHaveAttribute(
      'aria-current',
      'page'
    );

    const titulo = await abrirPrincipal(tela);
    await waitFor(() => expect(titulo).toHaveFocus());
    await expect(tela.getByRole('progressbar', { name: 'Progresso de leitura' })).toBeInTheDocument();
    await expect(tela.getByText(`Parte ${principal.seriesPart} de 3`)).toBeInTheDocument();

    const trilha = within(tela.getByRole('navigation', { name: 'Trilha de navegação' }));
    await userEvent.click(trilha.getByRole('button', { name: 'Início' }));
    await expect(await tela.findByRole('button', { name: principal.title })).toBeInTheDocument();
    await expect(navegacao(tela).getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
    await expect(tela.queryByRole('progressbar', { name: 'Progresso de leitura' })).not.toBeInTheDocument();
  },
};

/**
 * Curtir, salvar e desfazer: onAction recebe as três operações, e desfazer a última não desfaz a primeira.
 */
export const FluxoCurtirSalvarDesfazer: Story = {
  name: 'Fluxo: curtir, salvar e desfazer',
  args: { onAction: fn() },
  render: noDesktop,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const curtir = tela.getByRole('button', { name: `Curtir, ${principal.likes} curtidas` });
    await expect(curtir).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(curtir);
    await expect(args.onAction).toHaveBeenCalledWith({ type: 'toggleLike', postId: principal.id });
    const curtido = await tela.findByRole('button', { name: `Curtir, ${principal.likes + 1} curtidas` });
    await expect(curtido).toHaveAttribute('aria-pressed', 'true');

    const salvar = tela.getByRole('button', { name: 'Salvar para ler depois' });
    await expect(salvar).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(salvar);
    await expect(args.onAction).toHaveBeenCalledWith({ type: 'toggleSave', postId: principal.id });
    await waitFor(() => expect(salvar).toHaveAttribute('aria-pressed', 'true'));
    await expect(await tela.findByText('Post salvo para ler depois')).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'Posts salvos, 1' })).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await expect(args.onAction).toHaveBeenCalledWith(expect.objectContaining({ type: 'replace' }));
    await waitFor(() => expect(salvar).toHaveAttribute('aria-pressed', 'false'));
    await expect(tela.getByRole('button', { name: `Curtir, ${principal.likes + 1} curtidas` })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  },
};

/**
 * Remover dos salvos e desfazer: o post volta à lista.
 */
export const FluxoRemoverSalvo: Story = {
  name: 'Fluxo: remover dos salvos e desfazer',
  args: { initialRoute: { type: 'salvos' }, defaultState: { saved: [principal.id, revisao.id] } },
  render: noCelular,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const lista = () => within(tela.getByRole('list', { name: 'Posts salvos' }));
    await expect(lista().getAllByRole('listitem')).toHaveLength(2);

    await userEvent.click(tela.getByRole('button', { name: `Remover “${principal.title}” dos salvos` }));
    await expect(await tela.findByText('Removido dos salvos')).toBeInTheDocument();
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(1));

    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(2));
  },
};

/**
 * Seguir a autoria no cartão do post: o botão vira "Seguindo" e onAction recebe a operação.
 */
export const FluxoSeguirAutor: Story = {
  name: 'Fluxo: seguir a autoria',
  args: { onAction: fn() },
  render: noDesktop,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const seguir = await tela.findByRole('button', { name: 'Seguir' });
    await expect(seguir).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(seguir);
    await expect(args.onAction).toHaveBeenCalledWith({ type: 'toggleFollow', authorId: autoria.id });
    const seguindo = await tela.findByRole('button', { name: 'Seguindo' });
    await expect(seguindo).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(seguindo);
    await expect(await tela.findByRole('button', { name: 'Seguir' })).toHaveAttribute('aria-pressed', 'false');
  },
};

/**
 * Comentar e responder: o texto entra no fio, e a resposta fica sob o comentário respondido.
 */
export const FluxoComentarEResponder: Story = {
  name: 'Fluxo: comentar e responder',
  args: { onAction: fn() },
  render: noDesktop,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const campo = await tela.findByRole('textbox', { name: /Seu comentário/ });
    await userEvent.type(campo, 'Ótimo texto, vou aplicar no meu time.');
    await userEvent.click(tela.getByRole('button', { name: 'Comentar' }));
    await expect(args.onAction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'addComment',
        comment: expect.objectContaining({
          postId: principal.id,
          authorName: 'Você',
          mine: true,
          text: 'Ótimo texto, vou aplicar no meu time.',
        }),
      })
    );
    await expect(await tela.findByText('Ótimo texto, vou aplicar no meu time.')).toBeInTheDocument();

    await userEvent.click(await tela.findByRole('button', { name: `Responder a ${comentarioRaiz.authorName}` }));
    const formulario = within(await tela.findByRole('form', { name: `Responder a ${comentarioRaiz.authorName}` }));
    const resposta = formulario.getByRole('textbox', { name: /Respondendo a/ });
    await waitFor(() => expect(resposta).toHaveFocus());
    await userEvent.type(resposta, 'Concordo, e vale medir no escuro também.');
    await userEvent.click(formulario.getByRole('button', { name: 'Comentar' }));

    await expect(await tela.findByText('Concordo, e vale medir no escuro também.')).toBeInTheDocument();
    await expect(args.onAction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'addComment',
        comment: expect.objectContaining({
          parentId: comentarioRaiz.id,
          text: 'Concordo, e vale medir no escuro também.',
        }),
      })
    );
    await waitFor(() =>
      expect(tela.queryByRole('form', { name: `Responder a ${comentarioRaiz.authorName}` })).not.toBeInTheDocument()
    );
  },
};

/**
 * Excluir o próprio comentário e desfazer: o comentário só tem o botão de excluir quando é da pessoa que lê.
 */
export const FluxoExcluirComentario: Story = {
  name: 'Fluxo: excluir um comentário e desfazer',
  args: { onAction: fn() },
  render: noDesktop,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    await expect(await tela.findByText(comentarioMeu.text)).toBeInTheDocument();
    const excluir = tela.getByRole('button', { name: 'Excluir meu comentário' });
    await userEvent.click(excluir);
    await expect(args.onAction).toHaveBeenCalledWith({ type: 'deleteComment', id: comentarioMeu.id });
    await waitFor(() => expect(tela.queryByText(comentarioMeu.text)).not.toBeInTheDocument());
    await expect(await tela.findByText('Comentário excluído')).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await expect(await tela.findByText(comentarioMeu.text)).toBeInTheDocument();
  },
};

/**
 * Filtrar o feed por tópico: a lista e a contagem acompanham o chip, e tocar de novo limpa o filtro.
 */
export const FluxoFiltrarTopico: Story = {
  name: 'Fluxo: filtrar por tópico',
  render: noDesktop,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const total = ublPosts.length;
    const doTopico = ublPosts.filter((item) => item.topicIds.includes('acessibilidade')).length;
    const nuvem = within(await tela.findByRole('region', { name: 'Filtrar posts por tópico' }));
    const lista = () => within(tela.getByRole('list', { name: 'Últimos posts' }));

    // Sem filtro, o destaque abre a página e a grade traz os demais.
    await expect(lista().getAllByRole('listitem')).toHaveLength(total - 1);
    await expect(tela.getByText(`${total} posts no blog`)).toBeInTheDocument();

    await userEvent.click(nuvem.getByRole('button', { name: /^Acessibilidade/ }));
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(doTopico));
    await expect(nuvem.getByRole('button', { name: /^Acessibilidade/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(tela.getByText(`${doTopico} posts em Acessibilidade`)).toBeInTheDocument();
    await expect(tela.queryByRole('heading', { level: 2, name: principal.title })).not.toBeInTheDocument();

    await userEvent.click(nuvem.getByRole('button', { name: /^Acessibilidade/ }));
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(total - 1));
    await expect(nuvem.getByRole('button', { name: /^Todos/ })).toHaveAttribute('aria-pressed', 'true');
  },
};

/**
 * Buscar sem acento e por início de palavra: um pedaço do meio não casa.
 */
export const FluxoBusca: Story = {
  name: 'Fluxo: buscar',
  render: noDesktop,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: 'Abrir a busca' }));
    const campo = await tela.findByRole('searchbox');
    await waitFor(() => expect(campo).toHaveFocus());

    // Sem acento: "programacao" acha o tópico "Programação web".
    await userEvent.type(campo, 'programacao');
    const esperados = ublPosts.filter((item) => ublMatchesQuery(item, ublAuthors, ublTopics, 'programacao')).length;
    await expect(esperados).toBeGreaterThan(0);
    await expect(
      await tela.findByText(`${esperados} ${esperados === 1 ? 'resultado' : 'resultados'} para "programacao"`)
    ).toBeInTheDocument();
    await expect(within(tela.getByRole('list', { name: 'Resultados da busca' })).getAllByRole('listitem')).toHaveLength(
      esperados
    );

    // Início de palavra: "cessib" está no meio de "Acessibilidade" e não casa com nada.
    await userEvent.clear(campo);
    await userEvent.type(campo, 'cessib');
    await expect(await tela.findByRole('heading', { name: 'Nada encontrado' })).toBeInTheDocument();
    await expect(tela.getByText('Nenhum resultado para "cessib"')).toBeInTheDocument();

    // Com o começo da palavra, volta a achar.
    await userEvent.clear(campo);
    await userEvent.type(campo, 'acessib');
    await expect(await tela.findByText(/resultados? para "acessib"/)).toBeInTheDocument();
  },
};

/**
 * Assinar a newsletter: e-mail inválido mostra o erro; válido, a confirmação e a operação em onAction.
 */
export const FluxoNewsletter: Story = {
  name: 'Fluxo: assinar a newsletter',
  args: { onAction: fn() },
  render: noDesktop,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const campo = await tela.findByRole('textbox', { name: /E-mail/ });

    await userEvent.type(campo, 'abc');
    await userEvent.click(tela.getByRole('button', { name: 'Assinar' }));
    await expect(await tela.findByText(/Informe um e-mail válido/)).toBeInTheDocument();
    await expect(campo).toHaveAttribute('aria-invalid', 'true');

    await userEvent.clear(campo);
    await userEvent.type(campo, 'leitora@exemplo.com');
    await userEvent.click(tela.getByRole('button', { name: 'Assinar' }));
    await expect(args.onAction).toHaveBeenCalledWith({ type: 'subscribe', email: 'leitora@exemplo.com' });
    await expect(await tela.findByText(/Inscrição confirmada/)).toBeInTheDocument();
  },
};

/**
 * Sumário: clicar leva ao intertítulo dentro da tela do app, move o foco e marca o item.
 */
export const FluxoSumario: Story = {
  name: 'Fluxo: sumário leva ao intertítulo',
  render: noDesktop,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await expect(tituloDoIntertitulo).not.toBe('');

    const sumario = within(await tela.findByRole('navigation', { name: 'Neste post' }));
    const link = sumario.getByRole('link', { name: tituloDoIntertitulo });
    await expect(link).not.toHaveAttribute('aria-current');
    await userEvent.click(link);

    const titulo = await tela.findByRole('heading', { level: 2, name: tituloDoIntertitulo });
    await waitFor(() => expect(titulo).toHaveFocus());
    await waitFor(() => expect(link).toHaveAttribute('aria-current', 'location'), { timeout: 4000 });

    // O intertítulo termina logo abaixo do cabeçalho, dentro da rolagem do app.
    const principalDaTela = tela.getByRole('main');
    await waitFor(
      () => {
        const distancia = titulo.getBoundingClientRect().top - principalDaTela.getBoundingClientRect().top;
        expect(distancia).toBeGreaterThanOrEqual(0);
        expect(distancia).toBeLessThan(120);
      },
      { timeout: 4000 }
    );
    await waitFor(() => expect(principalDaTela.scrollTop).toBeGreaterThan(200), { timeout: 4000 });
  },
};

/**
 * No compacto o sumário é um bloco recolhível no topo, e escolher um item também leva ao intertítulo.
 */
export const FluxoSumarioNoCelular: Story = {
  name: 'Fluxo: sumário recolhível no celular',
  render: noCelular,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const sumario = within(await tela.findByRole('navigation', { name: 'Neste post' }));
    await userEvent.click(sumario.getByText('Neste post'));
    const link = await sumario.findByRole('link', { name: tituloDoIntertitulo });
    await expect(link).toBeVisible();
    await userEvent.click(link);

    const titulo = await tela.findByRole('heading', { level: 2, name: tituloDoIntertitulo });
    await waitFor(() => expect(titulo).toHaveFocus());
    await waitFor(() => expect(link).toHaveAttribute('aria-current', 'location'), { timeout: 4000 });
  },
};

/**
 * Ler até o fim do texto: o progresso acompanha a rolagem e o post passa a lido.
 */
export const FluxoLeitura: Story = {
  name: 'Fluxo: ler até o fim',
  args: { onAction: fn() },
  render: noCelular,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const barra = tela.getByRole('progressbar', { name: 'Progresso de leitura' });
    await expect(barra).toHaveAttribute('aria-valuenow', '0');

    const principalDaTela = tela.getByRole('main');
    principalDaTela.scrollTop = principalDaTela.scrollHeight;

    await waitFor(() => expect(Number(barra.getAttribute('aria-valuenow'))).toBeGreaterThanOrEqual(95));
    await waitFor(() => expect(args.onAction).toHaveBeenCalledWith({ type: 'markRead', postId: principal.id }));
    await expect(args.onAction).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'setProgress', postId: principal.id })
    );
  },
};

/**
 * Copiar o link da barra de compartilhar: a área de transferência recebe o endereço e o aviso confirma.
 */
export const FluxoCopiarLink: Story = {
  name: 'Fluxo: copiar o link',
  render: noDesktop,
  play: async ({ canvasElement }) => {
    const copiados = espiarAreaDeTransferencia();
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    await userEvent.click(await tela.findByRole('button', { name: 'Copiar link do post' }));
    await expect(await tela.findByText('Link copiado')).toBeInTheDocument();
    await expect(copiados).toHaveLength(1);
    await expect(copiados[0]).toContain(`#${principal.slug}`);
  },
};

/**
 * Compartilhar abre um diálogo com o link; o Esc o fecha e o foco volta ao botão.
 */
export const FluxoCompartilhar: Story = {
  name: 'Fluxo: compartilhar num diálogo',
  render: noDesktop,
  play: async ({ canvasElement }) => {
    const copiados = espiarAreaDeTransferencia();
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const compartilhar = await tela.findByRole('button', { name: 'Compartilhar o post' });
    await userEvent.click(compartilhar);
    const dialogo = within(await tela.findByRole('dialog', { name: 'Compartilhar o post' }));
    const campoDoLink = dialogo.getByRole('textbox', { name: 'Link do post' }) as HTMLInputElement;
    await expect(campoDoLink).toHaveAttribute('readonly');
    await expect(campoDoLink.value).toContain(`#${principal.slug}`);

    await userEvent.click(dialogo.getByRole('button', { name: 'Copiar link' }));
    await expect(await tela.findByText('Link copiado')).toBeInTheDocument();
    await expect(copiados[0]).toContain(`#${principal.slug}`);

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(compartilhar).toHaveFocus());
  },
};

/**
 * No celular, compartilhar abre uma folha inferior.
 */
export const FluxoCompartilharNoCelular: Story = {
  name: 'Fluxo: compartilhar numa folha inferior (celular)',
  render: noCelular,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await userEvent.click(await tela.findByRole('button', { name: 'Compartilhar o post' }));

    await expect(await tela.findByRole('dialog', { name: 'Compartilhar o post' })).toBeInTheDocument();
    await expect(canvasElement.querySelector('.ubl-bottom-sheet')).not.toBeNull();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
  },
};

/**
 * Post anterior e próximo, na ordem cronológica: abrir o anterior mostra o próximo de volta.
 */
export const FluxoPostAnteriorProximo: Story = {
  name: 'Fluxo: post anterior e próximo',
  render: noDesktop,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const navegacaoEntrePosts = within(await tela.findByRole('navigation', { name: 'Navegação entre posts' }));
    await userEvent.click(navegacaoEntrePosts.getByRole('button', { name: (nome) => nome.includes(anterior.title) }));
    await expect(await tela.findByRole('heading', { level: 1, name: anterior.title })).toBeInTheDocument();

    const depois = within(await tela.findByRole('navigation', { name: 'Navegação entre posts' }));
    await expect(depois.getByRole('button', { name: (nome) => nome.includes(principal.title) })).toBeInTheDocument();
  },
};

/**
 * O alternador de tema só avisa o contêiner: sem quem troque o tema, o botão continua como estava.
 */
export const FluxoTema: Story = {
  name: 'Fluxo: o alternador chama onToggleTheme',
  args: { themeMode: 'light', onToggleTheme: fn() },
  render: noDesktop,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const alternar = await tela.findByRole('button', { name: 'Tema escuro' });
    await expect(alternar).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(alternar);
    await expect(args.onToggleTheme).toHaveBeenCalledTimes(1);
    await expect(alternar).toHaveAttribute('aria-pressed', 'false');
  },
};
