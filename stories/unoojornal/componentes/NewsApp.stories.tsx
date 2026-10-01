import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { DesktopFrame } from '../../../src/unoojornal/components/DesktopFrame';
import { NewsApp } from '../../../src/unoojornal/components/NewsApp';
import type { UjnNewsAppProps } from '../../../src/unoojornal/components/NewsApp';
import { PhoneFrame } from '../../../src/unoojornal/components/PhoneFrame';
import { ujnMatchesQuery } from '../../../src/unoojornal/edition';
import type { UjnTheme } from '../../../src/unoojornal/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocAnatomy,
  UjnDocCard,
  UjnDocDecisions,
  UjnDocGrid,
  UjnDocPractices,
  UjnDocPropsTable,
  UjnDocSpecs,
  UjnDocStage,
  UjnDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  ujnAgenda,
  ujnArticles,
  ujnAuthors,
  ujnDemoNow,
  ujnGallery,
  ujnPublication,
  ujnSections,
} from '../fixtures';

const BAR = '#716C98';

/** O jornal no aparelho ou no navegador, com as fixtures de demonstração. */
const AppNoQuadro = ({
  formato = 'desktop',
  scale,
  width,
  height,
  ariaLabel = 'Jornal no navegador',
  theme,
  ...props
}: Partial<UjnNewsAppProps> & {
  formato?: 'desktop' | 'celular';
  scale?: number;
  width?: number;
  height?: number;
  ariaLabel?: string;
}) => {
  const app = (
    <NewsApp
      articles={ujnArticles}
      authors={ujnAuthors}
      publication={ujnPublication}
      agenda={ujnAgenda}
      gallery={ujnGallery}
      now={ujnDemoNow}
      theme={theme}
      {...props}
    />
  );

  return formato === 'celular' ? (
    <PhoneFrame theme={theme as UjnTheme | undefined} scale={scale ?? 1} ariaLabel={ariaLabel}>
      {app}
    </PhoneFrame>
  ) : (
    <DesktopFrame
      theme={theme as UjnTheme | undefined}
      scale={scale ?? 0.7}
      width={width}
      height={height}
      url="gazetadopatio.example"
      ariaLabel={ariaLabel}
    >
      {app}
    </DesktopFrame>
  );
};

/**
 * Página de documentação rica do NewsApp.
 */
const NewsAppDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Aplicativo"
      title="NewsApp"
      description="O jornal digital inteiro, pronto para rodar dentro do DesktopFrame ou do PhoneFrame: capa, seções, matéria aberta com progresso de leitura, galeria, agenda, busca e matérias salvas, com carta à redação e desfazer. É a composição de todos os componentes do módulo, com o estado guardado por um redutor puro que o produto também pode usar."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Tudo o que um jornal escolar digital faz, ligado de ponta a ponta."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📰" title="Capa e seções">
        Matéria principal, últimas notícias com filtro por seção e contagem, opinião e agenda na barra lateral, galeria
        da semana e rodapé. As seções repetem a lista com o mesmo filtro.
      </UjnDocCard>
      <UjnDocCard icon="📖" title="Matéria aberta">
        Barra de progresso que acompanha a rolagem (a matéria conta como lida ao passar de 80%), tamanho do texto,
        salvar, copiar o link, imprimir, carta à redação e &quot;Leia também&quot;.
      </UjnDocCard>
      <UjnDocCard icon="🔖" title="Salvos e desfazer">
        Salvar e remover mostram um aviso com &quot;Desfazer&quot;, que devolve o estado inteiro. A lista de salvos
        mostra a mais recente primeiro.
      </UjnDocCard>
      <UjnDocCard icon="🔍" title="Busca">
        Por início de palavra e sem acento, em título, resumo, chapéu e autoria. A contagem fica numa região viva e o
        estado vazio sugere as seções.
      </UjnDocCard>
      <UjnDocCard icon="🖼️" title="Galeria e agenda">
        Fotos ampliadas num diálogo com legenda e crédito; compromissos agrupados por mês, cada um com a tarja do dia.
      </UjnDocCard>
      <UjnDocCard icon="🧪" title="Para missões e testes">
        <code>onAction</code> recebe cada operação antes de ela acontecer, e <code>onStateChange</code> o estado
        inteiro depois. Fixe <code>now</code> para que o tempo decorrido e os próximos eventos sejam os mesmos em
        qualquer dia.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Arranjo, estado e decisões de comportamento."
    />
    <UjnDocSpecs
      component="NewsApp"
      layout="Aplicativo · ocupa o contêiner posicionado (a tela do DesktopFrame ou do PhoneFrame)"
      specs={[
        { label: 'Telas', value: 'capa · seção · matéria · galeria · agenda · busca · salvos' },
        { label: 'Estado', value: 'ujnNewsReducer (newsState.ts)' },
        { label: 'Largo', value: '≥ 960px de contêiner · duas colunas e barra lateral de --ujn-sidebar-width' },
        { label: 'Compacto', value: '< 640px de contêiner · uma coluna; a carta vira folha inferior' },
        { label: 'Progresso de leitura', value: 'marca como lida a partir de 80%; avisa a cada 5 pontos' },
        { label: 'Camadas', value: '--ujn-z-sheet · dialog · toast' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Estado no app, regras fora dele',
          detail:
            'o app guarda o estado a partir de articles (não controlado); as operações moram em newsState.ts, um redutor puro exportado com os seletores, para que um produto monte o próprio jornal com as mesmas regras.',
        },
        {
          subject: 'Conteúdo por props, nada embutido',
          detail:
            'articles, authors e publication são obrigatórios: o módulo não traz matéria, nome de escola nem de publicação. Só as cinco seções têm padrão (ujnDefaultSections), porque o filtro precisa de rótulos e os identificadores já são do domínio. agenda e gallery podem faltar: a seção some da capa.',
        },
        {
          subject: 'Desfazer por fotografia do estado',
          detail:
            'antes de salvar ou remover, o app guarda o estado inteiro; "Desfazer" o devolve de uma vez (operação replace, que também passa por onAction). É mais simples e mais correto que operações inversas.',
        },
        {
          subject: 'Pilha de rotas',
          detail:
            'abrir uma matéria empilha, e voltar desempilha; a navegação principal recomeça a pilha. A rolagem de cada tela é lembrada ao voltar, e ao abrir uma matéria o foco vai para o título (h1), que se anuncia ao leitor de tela.',
        },
        {
          subject: 'Carta: folha no compacto, diálogo no largo',
          detail:
            'abaixo de 640px de contêiner a carta abre numa BottomSheet; acima, num Modal. As pílulas de filtro e a navegação rolam na horizontal em vez de abrir folha: o filtro é um toque, e esconder as opções atrás de um botão custaria mais.',
        },
        {
          subject: 'Progresso de leitura que não polui o produto',
          detail:
            'a barra acompanha a rolagem quadro a quadro, mas setProgress só vai a onAction a cada 5 pontos (e ao chegar em 100), e só para a frente. markRead sai uma vez, ao passar de 80%. Matéria que cabe inteira na tela conta como lida.',
        },
        {
          subject: 'Busca na barra, resultados na tela',
          detail:
            'o campo do cabeçalho leva a pessoa à tela de resultados assim que ela digita; o texto fica na rota, então voltar de uma matéria reabre a mesma busca. A contagem ("3 resultados para "futsal"") fica numa região aria-live.',
        },
        {
          subject: 'Copiar e imprimir sem garantia',
          detail:
            'copiar o link usa a área de transferência dentro de try/catch e mostra "Link copiado" ou "Não foi possível copiar"; imprimir chama window.print protegido. Nenhum dos dois quebra se o navegador recusar.',
        },
        {
          subject: 'Camadas na tela, sem portal',
          detail:
            'diálogo, folha e aviso são position: absolute na tela do quadro, e o foco, o Esc e o aria-hidden do fundo vêm do useModalFocus dos componentes.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="As camadas do app, de baixo para cima."
    />
    <UjnDocStage label="Capa no navegador" surface="subtle" align="flex-start" padding={16}>
      <AppNoQuadro scale={0.4} ariaLabel="Anatomia do jornal" />
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            {
              name: 'Cabeçalho',
              role: 'Faixa de edição, título, navegação principal, busca e o atalho das matérias salvas (com a contagem).',
              token: 'EditionBar · Masthead · MainNav · SearchField',
            },
            {
              name: 'Matéria principal',
              role: 'Destaque da capa, com a imagem e o botão de leitura.',
              token: 'FeaturedStory',
            },
            {
              name: 'Últimas notícias',
              role: 'Título com a contagem, pílulas de filtro por seção e a lista.',
              token: 'SectionHeading · FilterBar · ArticleListItem',
            },
            {
              name: 'Barra lateral',
              role: 'Opinião em destaque e próximos compromissos; vai abaixo da lista no compacto.',
              token: 'OpinionBox · AgendaList · --ujn-sidebar-width',
            },
            {
              name: 'Galeria da semana',
              role: 'Quatro fotos e o atalho "Ver todas as fotos".',
              token: 'GalleryGrid · GalleryImage',
            },
            { name: 'Rodapé', role: 'Superfície invariante com redação, edição e contato.', token: 'Footer' },
            {
              name: 'Camadas e aviso',
              role: 'Diálogo da foto e da carta, folha inferior e o aviso com "Desfazer".',
              token: 'Modal · BottomSheet · Toast',
            },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Os três tamanhos de contêiner e as telas iniciais."
    />
    <UjnDocStage label="Largo, médio e compacto" surface="subtle" align="flex-start" padding={16} gap={16}>
      <AppNoQuadro scale={0.35} ariaLabel="Contêiner largo" />
      <AppNoQuadro scale={0.5} width={800} height={900} ariaLabel="Contêiner médio" />
      <AppNoQuadro formato="celular" scale={0.45} ariaLabel="Contêiner compacto" />
    </UjnDocStage>
    <UjnDocStage label="initialRoute" surface="subtle" align="flex-start" padding={16} gap={16}>
      <AppNoQuadro formato="celular" scale={0.4} ariaLabel="Rota capa" />
      <AppNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'materia', id: ujnArticles[0].id }}
        ariaLabel="Rota matéria"
      />
      <AppNoQuadro formato="celular" scale={0.4} initialRoute={{ type: 'galeria' }} ariaLabel="Rota galeria" />
      <AppNoQuadro formato="celular" scale={0.4} initialRoute={{ type: 'agenda' }} ariaLabel="Rota agenda" />
    </UjnDocStage>
    <UjnDocStage label="Salvos, busca e edição vazia" surface="subtle" align="flex-start" padding={16} gap={16}>
      <AppNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'salvos' }}
        defaultState={{ saved: [ujnArticles[1].id, ujnArticles[0].id], read: [ujnArticles[1].id] }}
        ariaLabel="Com matérias salvas"
      />
      <AppNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'busca', query: 'futsal' }}
        ariaLabel="Resultados da busca"
      />
      <AppNoQuadro
        formato="celular"
        scale={0.4}
        initialRoute={{ type: 'busca', query: 'zzxqw' }}
        ariaLabel="Busca sem resultados"
      />
      <AppNoQuadro formato="celular" scale={0.4} articles={[]} agenda={[]} gallery={[]} ariaLabel="Edição vazia" />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar o app pronto." />
    <UjnDocPractices
      dos={[
        'Rodar o app dentro de um DesktopFrame, de um PhoneFrame ou de outro contêiner posicionado com altura definida.',
        'Fixar now em demonstrações, missões e testes.',
        'Passar articles, authors e publication; agenda e gallery quando houver.',
        'Ouvir onAction para registrar o que a pessoa fez e onStateChange para persistir.',
        'Usar newsState.ts quando o produto precisar do próprio jornal com os mesmos componentes.',
      ]}
      donts={[
        'Trocar articles depois de montar esperando que o app reinicie: remonte com uma key nova.',
        'Renderizar o app solto na página, sem contêiner posicionado: as camadas se ancoram nele.',
        'Escrever o texto das matérias em HTML solto: os blocos (parágrafo, intertítulo, citação, figura, lista) é que mantêm o ritmo da leitura.',
        'Esconder "Desfazer": é ele que torna salvar e remover sem medo.',
        'Tratar copiar e imprimir como garantidos: o navegador pode recusar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O app acompanha data-ujn-theme; o rodapé é invariante nos dois temas."
    />
    <UjnDocThemeSwitcher surface="subtle" padding={16}>
      {(activeTheme) => <AppNoQuadro scale={0.55} theme={activeTheme} ariaLabel="Jornal no tema escolhido" />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do NewsApp e do seu modelo de estado."
    />
    <UjnDocPropsTable
      title="NewsApp"
      rows={[
        { name: 'articles', type: 'UjnArticle[]', description: 'Matérias da edição. Obrigatório.' },
        { name: 'authors', type: 'UjnAuthor[]', description: 'Autoria (resolve authorId). Obrigatório.' },
        {
          name: 'publication',
          type: 'UjnNewsPublication',
          description: '{ name, tagline, institution, edition, updatedLabel?, copyright?, note?, description? }. Obrigatório.',
        },
        { name: 'sections', type: 'UjnSection[]', default: 'ujnDefaultSections', description: 'Seções e rótulos das pílulas.' },
        { name: 'agenda', type: 'UjnAgendaEvent[]', default: '[]', description: 'Compromissos; a barra lateral mostra os próximos.' },
        { name: 'gallery', type: 'UjnGalleryPhoto[]', default: '[]', description: 'Fotografias; sem elas a seção da capa some.' },
        { name: 'now', type: 'Date | string', description: 'Referência de "Há 2 horas", da data da edição e dos próximos eventos.' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso de leitura das datas.' },
        { name: 'initialRoute', type: 'UjnNewsRoute', default: "{ type: 'capa' }", description: 'Tela ao montar.' },
        { name: 'initialSection', type: "UjnSectionId | 'todas'", default: "'todas'", description: 'Filtro da lista ao montar.' },
        { name: 'defaultState', type: 'Partial<Omit<UjnNewsState, "articles">>', description: 'Salvos, lidos, progresso, tamanho do texto e cartas iniciais.' },
        { name: 'onStateChange', type: '(state: UjnNewsState) => void', description: 'Estado inteiro a cada mudança.' },
        { name: 'onAction', type: '(action: UjnNewsAction) => void', description: 'Cada operação, antes de ser aplicada.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Tema; sem valor, herda o do contêiner.' },
        { name: '…HTMLAttributes<HTMLDivElement>', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Repassadas ao nó raiz.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnNewsRoute"
      rows={[
        { name: 'capa', type: '{ type }', description: 'A capa.' },
        { name: 'secao', type: "{ type; section: UjnSectionId | 'todas' }", description: 'Lista de uma seção; todas são as últimas.' },
        { name: 'materia', type: '{ type; id }', description: 'Uma matéria aberta.' },
        { name: 'galeria · agenda · salvos', type: '{ type }', description: 'As telas de mesmo nome.' },
        { name: 'busca', type: '{ type; query? }', description: 'Resultados; sem consulta, as sugestões.' },
      ]}
    />
    <UjnDocPropsTable
      title="UjnNewsAction (newsState.ts)"
      rows={[
        { name: 'save · unsave · toggleSave', type: '{ id }', description: 'Salvar, remover e alternar.' },
        { name: 'markRead', type: '{ id }', description: 'Marca como lida.' },
        { name: 'setProgress', type: '{ id; value }', description: 'Progresso de leitura, de 0 a 100.' },
        { name: 'setTextSize', type: "{ size: 'sm' | 'md' | 'lg' }", description: 'Tamanho do texto.' },
        { name: 'sendLetter · deleteLetter', type: '{ letter } · { id }', description: 'Cartas à redação.' },
        { name: 'clearSaved', type: '{}', description: 'Esvazia os salvos.' },
        { name: 'replace', type: '{ state }', description: 'Troca o estado inteiro (é o "Desfazer").' },
      ]}
    />
    <UjnDocPropsTable
      title="Seletores (newsState.ts)"
      rows={[
        { name: 'ujnSelectLatest', type: '(state, { section?, query?, authors? }) => UjnArticle[]', description: 'Da mais recente à mais antiga; busca por início de palavra, sem acento.' },
        { name: 'ujnSelectFeatured · ujnSelectOpinion', type: '(state) => …', description: 'Matéria principal e textos de opinião.' },
        { name: 'ujnSelectSaved · ujnSelectUnread', type: '(state) => UjnArticle[]', description: 'Salvas (a mais recente primeiro) e ainda não lidas.' },
        { name: 'ujnSelectBySection · ujnSelectRelated', type: '(state, …) => UjnArticle[]', description: 'Uma seção; "Leia também" (mesma seção primeiro).' },
        { name: 'ujnSectionCounts', type: '(state) => Record<UjnSectionFilter, number>', description: 'Quantas matérias há por seção.' },
        { name: 'ujnValidateLetter', type: '(text, name) => { ok; error? }', description: 'Nome ≥ 2 e texto de 20 a 600 code points.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof NewsApp> = {
  title: 'Unoojornal/Componentes/NewsApp',
  component: NewsApp,
  parameters: { layout: 'padded' },
  argTypes: {
    articles: { control: 'object', description: 'Matérias da edição.' },
    authors: { control: 'object', description: 'Autoria das matérias.' },
    publication: { control: 'object', description: 'Dados da publicação.' },
    sections: { control: 'object', description: 'Seções e rótulos dos filtros.' },
    agenda: { control: 'object', description: 'Compromissos da agenda.' },
    gallery: { control: 'object', description: 'Fotografias da galeria.' },
    now: { control: 'text', description: 'Momento de referência.' },
    timeZone: { control: 'text', description: 'Fuso de leitura das datas.' },
    initialRoute: { control: 'object', description: "Tela inicial: { type: 'capa' | 'secao' | 'materia' | … }." },
    initialSection: {
      control: 'select',
      options: ['todas', 'vida-escolar', 'ciencia', 'cultura', 'esportes', 'opiniao'],
      description: 'Filtro inicial da lista.',
    },
    defaultState: { control: 'object', description: 'Estado inicial parcial (salvos, lidos, texto, cartas).' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onAction: { action: 'onAction' },
    onStateChange: { action: 'onStateChange' },
  },
  args: {
    articles: ujnArticles,
    authors: ujnAuthors,
    publication: ujnPublication,
    sections: ujnSections,
    agenda: ujnAgenda,
    gallery: ujnGallery,
    now: ujnDemoNow,
    timeZone: 'America/Sao_Paulo',
    initialRoute: { type: 'capa' },
    initialSection: 'todas',
    defaultState: {},
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof NewsApp>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NewsAppDocumentationPage />,
};

/**
 * Playground com todas as propriedades do NewsApp. As props de estado inicial só
 * valem ao montar: troque-as e o app remonta.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do NewsApp',
  render: (args) => (
    <DesktopFrame
      theme={args.theme}
      scale={0.7}
      url="gazetadopatio.example"
      ariaLabel="Jornal no navegador"
    >
      <NewsApp
        key={`${JSON.stringify(args.initialRoute)}-${args.initialSection}-${args.theme}-${JSON.stringify(args.defaultState)}`}
        {...args}
      />
    </DesktopFrame>
  ),
};

/**
 * O jornal completo no navegador.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: jornal completo no navegador',
  render: () => <AppNoQuadro scale={0.8} />,
};

/**
 * Os três tamanhos de contêiner: largo, médio e compacto.
 */
export const Tamanhos: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <AppNoQuadro scale={0.45} ariaLabel="Contêiner largo" />
      <AppNoQuadro scale={0.55} width={800} height={900} ariaLabel="Contêiner médio" />
      <AppNoQuadro formato="celular" scale={0.55} ariaLabel="Contêiner compacto" />
    </div>
  ),
};

/**
 * As telas: capa, matéria, galeria e agenda.
 */
export const TodasVariantes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <AppNoQuadro formato="celular" scale={0.55} ariaLabel="Rota capa" />
      <AppNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'materia', id: ujnArticles[0].id }}
        ariaLabel="Rota matéria"
      />
      <AppNoQuadro formato="celular" scale={0.55} initialRoute={{ type: 'galeria' }} ariaLabel="Rota galeria" />
      <AppNoQuadro formato="celular" scale={0.55} initialRoute={{ type: 'agenda' }} ariaLabel="Rota agenda" />
    </div>
  ),
};

/**
 * Com matérias salvas e lidas, busca sem resultados e a edição vazia.
 */
export const Estados: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <AppNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'salvos' }}
        defaultState={{ saved: [ujnArticles[1].id, ujnArticles[0].id], read: [ujnArticles[1].id] }}
        ariaLabel="Com matérias salvas"
      />
      <AppNoQuadro
        formato="celular"
        scale={0.55}
        initialRoute={{ type: 'busca', query: 'zzxqw' }}
        ariaLabel="Busca sem resultados"
      />
      <AppNoQuadro formato="celular" scale={0.55} articles={[]} agenda={[]} gallery={[]} ariaLabel="Edição vazia" />
    </div>
  ),
};

/**
 * O mesmo jornal nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <AppNoQuadro formato="celular" scale={0.7} theme="light" ariaLabel="Jornal no tema claro" />
      <AppNoQuadro formato="celular" scale={0.7} theme="dark" ariaLabel="Jornal no tema escuro" />
    </div>
  ),
};

/* ==========================================================================
   Fluxos testados
   ========================================================================== */

type Tela = ReturnType<typeof within>;

const principal = ujnArticles.find((item) => item.featured) ?? ujnArticles[0];
const esporte = ujnArticles.find((item) => item.section === 'esportes') ?? ujnArticles[0];

const abrirPrincipal = async (tela: Tela) => {
  await userEvent.click(await tela.findByRole('button', { name: `Ler a reportagem: ${principal.title}` }));
  return tela.findByRole('heading', { level: 1, name: principal.title });
};

const navegacao = (tela: Tela) => within(tela.getByRole('navigation', { name: 'Seções do jornal' }));

/**
 * Abrir uma matéria pela capa: o foco vai para o título, e o voltar devolve a capa.
 */
export const FluxoAbrirMateria: Story = {
  name: 'Fluxo: abrir uma matéria e voltar',
  render: (args) => (
    <DesktopFrame scale={0.7} ariaLabel="Jornal no navegador">
      <NewsApp {...args} />
    </DesktopFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(await navegacao(tela).findByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');

    const titulo = await abrirPrincipal(tela);
    await waitFor(() => expect(titulo).toHaveFocus());
    await expect(tela.getByRole('progressbar', { name: 'Progresso de leitura' })).toBeInTheDocument();
    await expect(tela.queryByRole('navigation', { name: 'Seções do jornal' })).not.toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Voltar para a capa' }));
    await expect(await tela.findByRole('button', { name: `Ler a reportagem: ${principal.title}` })).toBeInTheDocument();
    await expect(navegacao(tela).getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  },
};

/**
 * Salvar a matéria, ver o aviso e desfazer: onAction recebe as duas operações.
 */
export const FluxoSalvarEDesfazer: Story = {
  name: 'Fluxo: salvar e desfazer',
  args: { onAction: fn() },
  render: (args) => (
    <DesktopFrame scale={0.7} ariaLabel="Jornal no navegador">
      <NewsApp {...args} />
    </DesktopFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const salvar = tela.getByRole('button', { name: 'Salvar para ler depois' });
    await expect(salvar).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(salvar);
    await expect(args.onAction).toHaveBeenCalledWith({ type: 'toggleSave', id: principal.id });
    await waitFor(() => expect(salvar).toHaveAttribute('aria-pressed', 'true'));
    await expect(await tela.findByText('Matéria salva para ler depois')).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await expect(args.onAction).toHaveBeenCalledWith(expect.objectContaining({ type: 'replace' }));
    await waitFor(() => expect(salvar).toHaveAttribute('aria-pressed', 'false'));
  },
};

/**
 * Remover das salvas e desfazer: a matéria volta à lista.
 */
export const FluxoRemoverSalvo: Story = {
  name: 'Fluxo: remover das salvas e desfazer',
  args: { initialRoute: { type: 'salvos' }, defaultState: { saved: [principal.id, esporte.id] } },
  render: (args) => (
    <PhoneFrame ariaLabel="Jornal no aparelho">
      <NewsApp {...args} />
    </PhoneFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const lista = () => within(tela.getByRole('list', { name: 'Matérias salvas' }));
    await expect(lista().getAllByRole('listitem')).toHaveLength(2);

    await userEvent.click(tela.getByRole('button', { name: `Remover “${principal.title}” das salvas` }));
    await expect(await tela.findByText('Matéria removida')).toBeInTheDocument();
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(1));

    await userEvent.click(tela.getByRole('button', { name: 'Desfazer' }));
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(2));
  },
};

/**
 * Filtrar a lista por seção: a lista e a contagem acompanham a pílula.
 */
export const FluxoFiltrar: Story = {
  name: 'Fluxo: filtrar por seção',
  render: (args) => (
    <DesktopFrame scale={0.7} ariaLabel="Jornal no navegador">
      <NewsApp {...args} />
    </DesktopFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const total = ujnArticles.length;
    const deEsportes = ujnArticles.filter((item) => item.section === 'esportes').length;
    const filtro = within(await tela.findByRole('group', { name: 'Filtrar matérias por seção' }));
    const lista = () => within(tela.getByRole('list', { name: 'Últimas notícias' }));

    await expect(lista().getAllByRole('listitem')).toHaveLength(total);
    await expect(tela.getByText(`${total} matérias nesta edição`)).toBeInTheDocument();

    await userEvent.click(filtro.getByRole('button', { name: /^Esportes/ }));
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(deEsportes));
    await expect(filtro.getByRole('button', { name: /^Esportes/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(tela.getByText(`${deEsportes} matérias em Esportes`)).toBeInTheDocument();

    await userEvent.click(filtro.getByRole('button', { name: /^Todas/ }));
    await waitFor(() => expect(lista().getAllByRole('listitem')).toHaveLength(total));
  },
};

/**
 * Buscar sem acento, e por início de palavra: um pedaço do meio não casa.
 */
export const FluxoBusca: Story = {
  name: 'Fluxo: buscar',
  render: (args) => (
    <DesktopFrame scale={0.7} ariaLabel="Jornal no navegador">
      <NewsApp {...args} />
    </DesktopFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const campo = await tela.findByRole('searchbox');

    // Sem acento: "ciencia" acha o que é de "Ciência".
    await userEvent.type(campo, 'ciencia');
    const esperados = ujnArticles.filter((item) => ujnMatchesQuery(item, ujnAuthors, 'ciencia')).length;
    await expect(esperados).toBeGreaterThan(0);
    await expect(
      await tela.findByText(`${esperados} ${esperados === 1 ? 'resultado' : 'resultados'} para "ciencia"`)
    ).toBeInTheDocument();
    await expect(within(tela.getByRole('list', { name: 'Resultados da busca' })).getAllByRole('listitem')).toHaveLength(esperados);

    // Início de palavra: "ogia" está no meio de "tecnologia" e não casa com nada.
    await userEvent.clear(campo);
    await userEvent.type(campo, 'ogia');
    await expect(await tela.findByRole('heading', { name: 'Nada encontrado' })).toBeInTheDocument();
    await expect(tela.getByText('Nenhum resultado para "ogia"')).toBeInTheDocument();
  },
};

/**
 * Escrever à redação: validar, corrigir, enviar e ver a confirmação.
 */
export const FluxoCarta: Story = {
  name: 'Fluxo: escrever à redação',
  args: { onAction: fn() },
  render: (args) => (
    <DesktopFrame scale={0.7} ariaLabel="Jornal no navegador">
      <NewsApp {...args} />
    </DesktopFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await userEvent.click(tela.getByRole('button', { name: 'Escrever à redação' }));

    const dialogo = within(await tela.findByRole('dialog', { name: 'Escrever à redação' }));
    const nome = dialogo.getByRole('textbox', { name: /Seu nome/ });
    const texto = dialogo.getByRole('textbox', { name: /Sua carta/ });
    await waitFor(() => expect(nome).toHaveFocus());

    // Vazia: o erro é do nome, e o foco vai para ele.
    await userEvent.click(dialogo.getByRole('button', { name: 'Enviar carta' }));
    await expect(await dialogo.findByText(/Informe seu nome/)).toBeInTheDocument();
    await expect(nome).toHaveAttribute('aria-invalid', 'true');
    await waitFor(() => expect(nome).toHaveFocus());

    // Com o nome e sem texto: o erro passa ao texto.
    await userEvent.type(nome, 'Marina Duarte');
    await userEvent.click(dialogo.getByRole('button', { name: 'Enviar carta' }));
    await expect(await dialogo.findByText(/Escreva ao menos 20 caracteres/)).toBeInTheDocument();
    await expect(texto).toHaveAttribute('aria-invalid', 'true');

    await userEvent.type(texto, 'Gostei muito da reportagem, parabéns a toda a equipe!');
    await userEvent.click(dialogo.getByRole('button', { name: 'Enviar carta' }));

    await waitFor(() => expect(tela.queryByRole('dialog', { name: 'Escrever à redação' })).not.toBeInTheDocument());
    await expect(await tela.findByText('Carta enviada. Obrigado!')).toBeInTheDocument();
    await expect(args.onAction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'sendLetter',
        letter: expect.objectContaining({ name: 'Marina Duarte', articleId: principal.id }),
      })
    );
  },
};

/**
 * No celular a carta abre numa folha inferior, e o Esc a fecha.
 */
export const FluxoCartaNoCelular: Story = {
  name: 'Fluxo: carta numa folha inferior (celular)',
  render: (args) => (
    <PhoneFrame ariaLabel="Jornal no aparelho">
      <NewsApp {...args} />
    </PhoneFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    const abrir = tela.getByRole('button', { name: 'Escrever à redação' });
    await userEvent.click(abrir);

    await expect(await tela.findByRole('dialog', { name: 'Escrever à redação' })).toBeInTheDocument();
    await expect(canvasElement.querySelector('.ujn-bottom-sheet')).not.toBeNull();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(abrir).toHaveFocus());
  },
};

/**
 * Ampliar uma foto da galeria: o Esc fecha e o foco volta para a foto.
 */
export const FluxoGaleria: Story = {
  name: 'Fluxo: ampliar uma foto',
  render: (args) => (
    <DesktopFrame scale={0.7} ariaLabel="Jornal no navegador">
      <NewsApp {...args} />
    </DesktopFrame>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await navegacao(tela).findByRole('button', { name: 'Galeria' }));
    const [primeira] = ujnGallery;

    const foto = await tela.findByRole('button', { name: primeira.alt });
    await userEvent.click(foto);
    const dialogo = within(await tela.findByRole('dialog', { name: primeira.caption }));
    await expect(dialogo.getByText(primeira.credit as string)).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(foto).toHaveFocus());
  },
};

/**
 * Ler até o fim: o progresso acompanha a rolagem e a matéria passa a lida.
 */
export const FluxoLeitura: Story = {
  name: 'Fluxo: ler até o fim',
  args: { onAction: fn() },
  render: (args) => (
    <PhoneFrame ariaLabel="Jornal no aparelho">
      <NewsApp {...args} />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);

    const barra = tela.getByRole('progressbar', { name: 'Progresso de leitura' });
    await expect(barra).toHaveAttribute('aria-valuenow', '0');

    const principalDaTela = tela.getByRole('main');
    principalDaTela.scrollTop = principalDaTela.scrollHeight;

    await waitFor(() => expect(Number(barra.getAttribute('aria-valuenow'))).toBeGreaterThanOrEqual(95));
    await waitFor(() => expect(args.onAction).toHaveBeenCalledWith({ type: 'markRead', id: principal.id }));
    await expect(args.onAction).toHaveBeenCalledWith(expect.objectContaining({ type: 'setProgress', id: principal.id }));
  },
};
