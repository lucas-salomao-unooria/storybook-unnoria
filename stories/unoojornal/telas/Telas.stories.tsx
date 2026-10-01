import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DesktopFrame } from '../../../src/unoojornal/components/DesktopFrame';
import { NewsApp } from '../../../src/unoojornal/components/NewsApp';
import type { UjnNewsAppProps } from '../../../src/unoojornal/components/NewsApp';
import { PhoneFrame } from '../../../src/unoojornal/components/PhoneFrame';
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
} from '../fixtures';

const BAR = '#716C98';

/* ==========================================================================
   O jornal no navegador e no aparelho, com as fixtures de demonstração
   ========================================================================== */

type JornalProps = Partial<UjnNewsAppProps> & {
  /** Onde o jornal roda: o quadro de navegador (padrão) ou o aparelho */
  formato?: 'desktop' | 'celular';
  scale?: number;
  label?: string;
};

const Jornal = ({ formato = 'desktop', scale, label = 'Jornal no navegador', theme, ...props }: JornalProps) => {
  const app = (
    <NewsApp
      articles={ujnArticles}
      authors={ujnAuthors}
      publication={ujnPublication}
      agenda={ujnAgenda}
      gallery={ujnGallery}
      now={ujnDemoNow}
      {...props}
    />
  );

  if (formato === 'celular') {
    return (
      <PhoneFrame theme={theme as UjnTheme | undefined} scale={scale ?? 1} ariaLabel={label}>
        {app}
      </PhoneFrame>
    );
  }

  return (
    <DesktopFrame
      theme={theme as UjnTheme | undefined}
      scale={scale ?? 0.7}
      url="gazetadopatio.example"
      ariaLabel={label}
    >
      {app}
    </DesktopFrame>
  );
};

/* ==========================================================================
   Passos de navegação usados pelos `play`
   ========================================================================== */

type Tela = ReturnType<typeof within>;

const principal = ujnArticles.find((item) => item.featured) ?? ujnArticles[0];
const opiniao = ujnArticles.find((item) => item.opinion) ?? ujnArticles[0];
const esporte = ujnArticles.find((item) => item.section === 'esportes') ?? ujnArticles[0];
const cultura = ujnArticles.filter((item) => item.section === 'cultura');

/** Abre uma matéria pelo botão de leitura da matéria principal. */
const abrirPrincipal = async (tela: Tela) => {
  await userEvent.click(await tela.findByRole('button', { name: `Ler a reportagem: ${principal.title}` }));
  return tela.findByRole('heading', { level: 1, name: principal.title });
};

/** Vai a uma das telas da navegação principal. */
const irPara = async (tela: Tela, nome: 'Início' | 'Últimas' | 'Opinião' | 'Agenda' | 'Galeria') => {
  const navegacao = within(await tela.findByRole('navigation', { name: 'Seções do jornal' }));
  await userEvent.click(navegacao.getByRole('button', { name: nome }));
};

/** Guarda duas matérias da lista pelos marcadores. */
const salvarDuas = async (tela: Tela) => {
  for (const item of [esporte, opiniao]) {
    await userEvent.click(await tela.findByRole('button', { name: `Salvar “${item.title}” para ler depois` }));
  }
};

/* ==========================================================================
   Documentação
   ========================================================================== */

const TelasDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Telas • Telas compostas"
      title="Telas do jornal"
      description="Cada tela desta seção é o NewsApp de verdade, dentro do DesktopFrame ou do PhoneFrame. As que dependem de interação (matéria aberta, filtro, carta, salvos, busca, galeria) chegam ao estado pelo roteiro de interação da estória, clicando como uma pessoa faria — nenhuma é uma réplica desenhada à parte."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="As telas do jornal." />
    <UjnDocGrid>
      <UjnDocCard icon="📰" title="Capa">
        Matéria principal, últimas notícias com filtro por seção, opinião e agenda na barra lateral e a galeria da
        semana.
      </UjnDocCard>
      <UjnDocCard icon="📖" title="Matéria">
        Progresso de leitura, tamanho do texto, salvar, copiar o link, imprimir, a carta à redação e &quot;Leia
        também&quot;.
      </UjnDocCard>
      <UjnDocCard icon="🔖" title="Salvos e busca">
        As matérias guardadas para ler depois, com remover e desfazer; a busca por início de palavra e sem acento.
      </UjnDocCard>
      <UjnDocCard icon="🖼️" title="Galeria e agenda">
        As fotografias da edição, ampliadas em diálogo, e os compromissos da escola agrupados por mês.
      </UjnDocCard>
      <UjnDocCard icon="📱" title="No celular">
        A mesma capa e a mesma matéria no PhoneFrame: uma coluna, navegação que rola na horizontal e a carta numa folha
        inferior.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Como as telas são montadas." />
    <UjnDocSpecs
      component="NewsApp"
      layout="Navegador 1440×1024 · DesktopFrame, ou aparelho 390×844 · PhoneFrame"
      specs={[
        { label: 'Quadro largo', value: 'DesktopFrame com scale 0,7' },
        { label: 'Quadro móvel', value: 'PhoneFrame device="bezel"' },
        { label: 'Aplicativo', value: 'NewsApp com as fixtures' },
        { label: 'Momento de referência', value: ujnDemoNow },
        { label: 'Estados', value: 'alcançados por interação (play)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Telas pelo app, não por réplica',
          detail:
            'nenhuma tela é montada à parte: todas são o NewsApp, e as que dependem de interação chegam lá pelo play da estória. O que se vê é o que o produto recebe, e cada tela também é um teste de navegação.',
        },
        {
          subject: 'Data fixa',
          detail:
            'as telas usam now = sexta-feira, 20/03/2026, 14:40 (São Paulo), para que "Há 2 horas", "Há 1 dia" e os próximos eventos sejam os mesmos em qualquer dia.',
        },
        {
          subject: 'Escala do navegador',
          detail:
            'o DesktopFrame mantém 1440px de largura de contêiner e só encolhe a exibição (scale): o jornal continua em duas colunas, como num navegador de verdade.',
        },
        {
          subject: 'Imagens próprias',
          detail:
            'as fotografias e os retratos são ilustrações SVG na paleta da Unooria; a "Gazeta do Pátio" e o "Colégio Anísio Bastos" são fictícios e vivem só nas fixtures.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="O quadro e o app." />
    <UjnDocStage label="Capa no navegador" surface="subtle" align="flex-start" padding={16}>
      <Jornal scale={0.4} label="Anatomia da tela" />
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            {
              name: 'Quadro',
              role: 'DesktopFrame (navegador) ou PhoneFrame (aparelho); a tela é o bloco de contenção das camadas.',
              token: 'DesktopFrame · PhoneFrame',
            },
            {
              name: 'Cabeçalho',
              role: 'Faixa de edição, título, navegação principal, busca e o atalho das matérias salvas.',
              token: 'EditionBar · Masthead · MainNav · SearchField',
            },
            {
              name: 'Conteúdo',
              role: 'Uma coluna, ou duas com a barra lateral a partir de 960px de contêiner.',
              token: '--ujn-page-width · --ujn-sidebar-width',
            },
            {
              name: 'Rodapé',
              role: 'Superfície invariante com redação, edição e contato.',
              token: '--ujn-color-footer-surface',
            },
            {
              name: 'Camadas',
              role: 'Diálogo da foto e da carta, folha inferior no compacto e o aviso com "Desfazer".',
              token: '--ujn-z-dialog · --ujn-z-toast',
            },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="A capa nos dois quadros e as telas de raiz."
    />
    <UjnDocStage surface="subtle" align="flex-start" padding={16} gap={16}>
      <Jornal scale={0.4} label="Capa no navegador" />
      <Jornal formato="celular" scale={0.45} label="Capa no celular" />
      <Jornal formato="celular" scale={0.45} label="Matéria no celular" initialRoute={{ type: 'materia', id: principal.id }} />
    </UjnDocStage>
    <UjnDocStage surface="subtle" align="flex-start" padding={16} gap={16}>
      <Jornal formato="celular" scale={0.4} label="Salvos" initialRoute={{ type: 'salvos' }} />
      <Jornal formato="celular" scale={0.4} label="Busca" initialRoute={{ type: 'busca' }} />
      <Jornal formato="celular" scale={0.4} label="Galeria" initialRoute={{ type: 'galeria' }} />
      <Jornal formato="celular" scale={0.4} label="Agenda" initialRoute={{ type: 'agenda' }} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Ao compor telas com o jornal." />
    <UjnDocPractices
      dos={[
        'Mostrar o jornal sempre dentro de um quadro (DesktopFrame ou PhoneFrame): as áreas seguras e as camadas dependem dele.',
        'Chegar a um estado pela interação, como nestas estórias, em vez de desenhar a tela à parte.',
        'Fixar now em qualquer tela que mostre datas ou tempo decorrido.',
      ]}
      donts={[
        'Recortar só um pedaço do app fora do quadro: as camadas perdem o bloco de contenção.',
        'Usar fotografias de terceiros nas demonstrações.',
        'Deixar a data de referência correr: "Há 2 horas" mudaria de um teste para o outro.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="As mesmas telas nos dois temas." />
    <UjnDocThemeSwitcher surface="subtle" padding={16}>
      {(activeTheme) => <Jornal theme={activeTheme} scale={0.55} label="Jornal no tema escolhido" />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="As telas e como chegar a cada uma."
    />
    <UjnDocPropsTable
      title="Telas"
      rows={[
        { name: 'Jornal interativo', type: 'NewsApp', description: 'O app inteiro, para usar à vontade, nos dois temas.' },
        { name: 'Capa · filtro ativo', type: 'initialRoute · play', description: "Rota 'capa'; o filtro é uma pílula clicada." },
        { name: 'Matéria · texto grande', type: 'play', description: 'Botão de leitura da matéria principal e "Aumentar o texto".' },
        { name: 'Carta', type: 'play', description: '"Escrever à redação", no fim da matéria.' },
        { name: 'Salvos · vazio', type: "initialRoute: { type: 'salvos' }", description: 'Marcadores da lista e o atalho da barra.' },
        { name: 'Busca · resultados · sem resultados', type: 'play', description: 'Digitação no campo de busca do cabeçalho.' },
        { name: 'Galeria · foto aberta', type: 'play', description: 'Item "Galeria" da navegação e uma foto.' },
        { name: 'Agenda', type: 'play', description: 'Item "Agenda" da navegação.' },
        { name: 'No celular', type: 'PhoneFrame', description: 'A capa e a matéria no aparelho.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof NewsApp> = {
  title: 'Unoojornal/Telas/Telas Compostas',
  component: NewsApp,
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof NewsApp>;

/**
 * Documentação das telas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * O jornal inteiro no navegador, para usar à vontade.
 */
export const JornalInterativo: Story = {
  name: '🕹️ 1. Jornal interativo',
  render: () => <Jornal scale={0.8} />,
};

/**
 * O jornal inteiro no tema escuro.
 */
export const JornalInterativoEscuro: Story = {
  name: '🕹️ 2. Jornal interativo (tema escuro)',
  render: () => <Jornal theme="dark" scale={0.8} label="Jornal no tema escuro" />,
};

/* ------------------------------------------------------------------ Capa */

export const Capa: Story = {
  name: '🎨 Capa',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(await tela.findByRole('heading', { level: 1, name: ujnPublication.name })).toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  },
};

export const CapaFiltroAtivo: Story = {
  name: '🎨 Capa: filtro ativo',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const filtro = within(await tela.findByRole('group', { name: 'Filtrar matérias por seção' }));
    await userEvent.click(filtro.getByRole('button', { name: /^Cultura/ }));
    const lista = within(tela.getByRole('list', { name: 'Últimas notícias' }));
    await waitFor(() => expect(lista.getAllByRole('listitem')).toHaveLength(cultura.length));
  },
};

/* --------------------------------------------------------------- Matéria */

export const Materia: Story = {
  name: '🎨 Matéria',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const titulo = await abrirPrincipal(within(canvasElement));
    await waitFor(() => expect(titulo).toHaveFocus());
  },
};

export const MateriaTextoGrande: Story = {
  name: '🎨 Matéria: texto grande',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await userEvent.click(tela.getByRole('button', { name: 'Aumentar o texto' }));
    await expect(tela.getByRole('button', { name: 'Aumentar o texto' })).toBeDisabled();
    await expect(canvasElement.querySelector('.ujn-article-body--lg')).not.toBeNull();
  },
};

export const Carta: Story = {
  name: '🎨 Carta à redação',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await abrirPrincipal(tela);
    await userEvent.click(tela.getByRole('button', { name: 'Escrever à redação' }));
    await expect(await tela.findByRole('dialog', { name: 'Escrever à redação' })).toBeInTheDocument();
  },
};

/* ---------------------------------------------------------------- Salvos */

export const Salvos: Story = {
  name: '🎨 Salvos',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await salvarDuas(tela);
    await userEvent.click(await tela.findByRole('button', { name: 'Matérias salvas, 2' }));
    const lista = within(await tela.findByRole('list', { name: 'Matérias salvas' }));
    await expect(lista.getAllByRole('listitem')).toHaveLength(2);
  },
};

export const SalvosVazio: Story = {
  name: '🎨 Salvos: vazio',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: 'Matérias salvas' }));
    await expect(await tela.findByRole('heading', { name: 'Nada salvo por aqui' })).toBeInTheDocument();
  },
};

/* ----------------------------------------------------------------- Busca */

export const Busca: Story = {
  name: '🎨 Busca',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.type(await tela.findByRole('searchbox'), '{Enter}');
    await expect(await tela.findByRole('heading', { name: 'O que você procura?' })).toBeInTheDocument();
  },
};

export const BuscaResultados: Story = {
  name: '🎨 Busca: resultados',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.type(await tela.findByRole('searchbox'), 'futsal');
    await expect(await tela.findByText(/resultados? para "futsal"/)).toBeInTheDocument();
  },
};

export const BuscaSemResultados: Story = {
  name: '🎨 Busca: sem resultados',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.type(await tela.findByRole('searchbox'), 'zzxqw');
    await expect(await tela.findByRole('heading', { name: 'Nada encontrado' })).toBeInTheDocument();
  },
};

/* ---------------------------------------------------- Galeria e agenda */

export const Galeria: Story = {
  name: '🎨 Galeria',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Galeria');
    await expect(await tela.findByRole('heading', { name: 'Galeria' })).toBeInTheDocument();
  },
};

export const FotoAberta: Story = {
  name: '🎨 Galeria: foto aberta',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Galeria');
    const [primeira] = ujnGallery;
    await userEvent.click(await tela.findByRole('button', { name: primeira.alt }));
    await expect(await tela.findByRole('dialog', { name: primeira.caption })).toBeInTheDocument();
  },
};

export const Agenda: Story = {
  name: '🎨 Agenda',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Agenda');
    await expect(await tela.findByRole('heading', { name: 'Março de 2026' })).toBeInTheDocument();
    await expect(tela.getByRole('heading', { name: 'Abril de 2026' })).toBeInTheDocument();
  },
};

/* ------------------------------------------------------------- No celular */

export const NoCelularCapa: Story = {
  name: '🎨 No celular: capa',
  render: () => <Jornal formato="celular" label="Capa no celular" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(await tela.findByRole('heading', { level: 1, name: ujnPublication.name })).toBeInTheDocument();
  },
};

export const NoCelularMateria: Story = {
  name: '🎨 No celular: matéria',
  render: () => <Jornal formato="celular" label="Matéria no celular" />,
  play: async ({ canvasElement }) => {
    const titulo = await abrirPrincipal(within(canvasElement));
    await waitFor(() => expect(titulo).toHaveFocus());
  },
};

/* --------------------------------------------------------------- Temas */

export const LadoALado: Story = {
  name: '🎨 Claro e escuro lado a lado',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Jornal formato="celular" theme="light" scale={0.75} label="Jornal no tema claro" />
      <Jornal formato="celular" theme="dark" scale={0.75} label="Jornal no tema escuro" />
    </div>
  ),
};

/**
 * Navegar pelas telas da navegação principal e voltar à capa.
 */
export const NavegacaoPelasSecoes: Story = {
  name: 'Fluxo: navegar pelas seções',
  render: () => <Jornal />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const navegacao = () => within(tela.getByRole('navigation', { name: 'Seções do jornal' }));

    await irPara(tela, 'Últimas');
    await expect(await tela.findByRole('heading', { name: 'Últimas notícias', level: 2 })).toBeInTheDocument();
    await expect(navegacao().getByRole('button', { name: 'Últimas' })).toHaveAttribute('aria-current', 'page');

    await irPara(tela, 'Opinião');
    await waitFor(() => expect(navegacao().getByRole('button', { name: 'Opinião' })).toHaveAttribute('aria-current', 'page'));
    await expect(within(tela.getByRole('list', { name: 'Opinião' })).getAllByRole('listitem')).toHaveLength(1);

    await irPara(tela, 'Agenda');
    await expect(await tela.findByRole('heading', { name: 'Agenda da escola', level: 2 })).toBeInTheDocument();

    await irPara(tela, 'Início');
    await expect(await tela.findByRole('button', { name: `Ler a reportagem: ${principal.title}` })).toBeInTheDocument();
    await expect(navegacao().getByRole('button', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  },
};
