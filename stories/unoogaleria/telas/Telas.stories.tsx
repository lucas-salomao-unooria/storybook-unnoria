import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GalleryApp } from '../../../src/unoogaleria/components/GalleryApp';
import type { UglGalleryAppProps } from '../../../src/unoogaleria/components/GalleryApp';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import type { UglTheme } from '../../../src/unoogaleria/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocAnatomy,
  UglDocCard,
  UglDocDecisions,
  UglDocGrid,
  UglDocPractices,
  UglDocPropsTable,
  UglDocSpecs,
  UglDocStage,
  UglDocThemeSwitcher,
} from '../../../.storybook/components';
import { uglAlbums, uglAllItems, uglDemoNow, uglMediaItems, uglPeople } from '../fixtures';

const BAR = '#716C98';

/** A galeria no aparelho, com as fixtures de demonstração. */
const Galeria = ({
  theme,
  scale = 1,
  label = 'Galeria de fotos no aparelho',
  ...props
}: Partial<UglGalleryAppProps> & { theme?: UglTheme; scale?: number; label?: string }) => (
  <PhoneFrame theme={theme} scale={scale} ariaLabel={label}>
    <GalleryApp
      defaultItems={uglAllItems}
      defaultAlbums={uglAlbums}
      people={uglPeople}
      now={uglDemoNow}
      {...props}
    />
  </PhoneFrame>
);

/* ==========================================================================
   Passos de navegação usados pelos `play`
   ========================================================================== */

type Tela = ReturnType<typeof within>;

const comeca = (texto: string) => new RegExp(`^${texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
const primeiraFoto = uglMediaItems.find((item) => item.type === 'photo')!;
const primeiroVideo = uglMediaItems.find((item) => item.type === 'video')!;

const abrir = async (tela: Tela, alt: string) => {
  const biblioteca = within(await tela.findByRole('region', { name: 'Biblioteca' }));
  await userEvent.click(biblioteca.getByRole('button', { name: comeca(alt) }));
  return within(await tela.findByRole('dialog', { name: 'Visualizador de fotos' }));
};

const irPara = async (tela: Tela, aba: 'Biblioteca' | 'Para você' | 'Álbuns' | 'Busca') => {
  const navegacao = within(tela.getByRole('navigation', { name: 'Navegação da galeria' }));
  await userEvent.click(navegacao.getByRole('button', { name: aba }));
};

/* ==========================================================================
   Documentação
   ========================================================================== */

const TelasDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Telas • Telas compostas"
      title="Telas da galeria"
      description="Cada tela desta seção é o GalleryApp de verdade, dentro do PhoneFrame. As que dependem de interação (visualizador, editor, seleção, folhas e diálogos) chegam ao estado pelo roteiro de interação da estória, clicando como uma pessoa faria — nenhuma é uma réplica desenhada à parte."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="As telas da galeria." />
    <UglDocGrid>
      <UglDocCard icon="🖼️" title="Biblioteca">
        Todas (por dia), Meses, Anos e o modo de seleção com a barra de ações.
      </UglDocCard>
      <UglDocCard icon="🔍" title="Visualizador">
        Foto e vídeo em tela cheia, informações, compartilhar, editor e confirmação de exclusão.
      </UglDocCard>
      <UglDocCard icon="📚" title="Álbuns">
        Meus álbuns, compartilhados, tipos de mídia, um álbum aberto, Ocultos protegido e Excluídos recentemente.
      </UglDocCard>
      <UglDocCard icon="✨" title="Para você e Busca">
        Memórias, pessoas e favoritos; sugestões de busca e resultados.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Como as telas são montadas." />
    <UglDocSpecs
      component="GalleryApp"
      layout="Aparelho 390×844 · PhoneFrame com o GalleryApp"
      specs={[
        { label: 'Aparelho', value: 'PhoneFrame device="bezel"' },
        { label: 'Aplicativo', value: 'GalleryApp com as fixtures' },
        { label: 'Momento de referência', value: uglDemoNow },
        { label: 'Estados', value: 'alcançados por interação (play)' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Telas pelo app, não por réplica',
          detail:
            'nenhuma tela é montada à parte: todas são o GalleryApp, e as que dependem de interação chegam lá pelo play da estória. O que se vê é o que o produto recebe, e cada tela também é um teste de navegação.',
        },
        {
          subject: 'Data fixa',
          detail:
            'as telas usam now = 30/09/2026 10:00 (São Paulo), para que "Hoje", "Ontem", as memórias e os prazos da lixeira sejam os mesmos em qualquer dia.',
        },
        {
          subject: 'Imagens e vídeos próprios',
          detail:
            'as fotos são ilustrações SVG na paleta da Unooria e os vídeos foram gerados por síntese com a mesma paleta; nenhum arquivo de terceiros.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="O aparelho e o app." />
    <UglDocStage label="Biblioteca" surface="secondary" align="flex-start" padding={16}>
      <Galeria scale={0.6} label="Anatomia da tela" />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            {
              name: 'Aparelho',
              role: 'Corpo, aro, botões, ilha da câmera, barra de status e barra de gesto.',
              token: 'PhoneFrame',
            },
            {
              name: 'Aplicativo',
              role: 'Abas, grade, barras, visualizador, editor, folhas e avisos.',
              token: 'GalleryApp',
            },
            {
              name: 'Áreas seguras',
              role: 'O conteúdo corre por baixo da barra de status e da barra de gesto.',
              token: '--ugl-safe-area-top · --ugl-safe-area-bottom',
            },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As telas de raiz de cada aba."
    />
    <UglDocStage surface="secondary" align="flex-start" padding={16} gap={16}>
      <Galeria scale={0.45} label="Biblioteca" />
      <Galeria scale={0.45} initialView="months" label="Meses" />
      <Galeria scale={0.45} initialTab="foryou" label="Para você" />
      <Galeria scale={0.45} initialTab="albums" label="Álbuns" />
      <Galeria scale={0.45} initialTab="search" label="Busca" />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Ao compor telas com a galeria." />
    <UglDocPractices
      dos={[
        'Mostrar a galeria sempre dentro do PhoneFrame: as áreas seguras e o cromo imersivo dependem dele.',
        'Chegar a um estado pela interação, como nestas estórias, em vez de desenhar a tela à parte.',
        'Fixar now em qualquer tela que mostre datas.',
      ]}
      donts={[
        'Recortar só um pedaço do app fora do aparelho: as barras perdem o recuo da área segura.',
        'Usar fotografias de terceiros nas demonstrações.',
        'Deixar a data de referência correr: "Hoje" mudaria de um dia para o outro.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="As mesmas telas nos dois temas." />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(activeTheme) => <Galeria theme={activeTheme} scale={0.7} label="Galeria no tema escolhido" />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="As telas e como chegar a cada uma."
    />
    <UglDocPropsTable
      title="Telas"
      rows={[
        { name: 'Galeria interativa', type: 'GalleryApp', description: 'O app inteiro, para usar à vontade.' },
        { name: 'Biblioteca · Meses · Anos', type: 'initialView', description: "'all', 'months' e 'years'." },
        { name: 'Seleção', type: 'play', description: 'Selecionar e três toques.' },
        { name: 'Visualizador · Vídeo', type: 'play', description: 'Toque numa foto ou num vídeo.' },
        {
          name: 'Informações · Compartilhar · Editor',
          type: 'play',
          description: 'Botões da barra do visualizador.',
        },
        { name: 'Confirmar exclusão', type: 'play', description: 'Excluir no visualizador.' },
        { name: 'Para você · Álbuns · Busca', type: 'initialTab', description: "'foryou', 'albums' e 'search'." },
        {
          name: 'Álbum aberto · Ocultos · Excluídos recentemente',
          type: 'play',
          description: 'Linhas da aba Álbuns.',
        },
        {
          name: 'Novo álbum · Resultados da busca',
          type: 'play',
          description: 'Botão Novo álbum e digitação na busca.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof GalleryApp> = {
  title: 'Unoogaleria/Telas/Telas Compostas',
  component: GalleryApp,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof GalleryApp>;

/**
 * Documentação das telas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  parameters: { layout: 'padded' },
  render: () => <TelasDocumentationPage />,
};

/**
 * A galeria inteira, para usar à vontade.
 */
export const GaleriaInterativa: Story = {
  name: '🕹️ 1. Galeria interativa',
  render: () => <Galeria />,
};

/**
 * A galeria inteira no tema escuro.
 */
export const GaleriaInterativaEscura: Story = {
  name: '🕹️ 2. Galeria interativa (tema escuro)',
  render: () => <Galeria theme="dark" />,
};

/* ------------------------------------------------------------- Biblioteca */

export const Biblioteca: Story = {
  name: '🎨 Biblioteca',
  render: () => <Galeria />,
};

export const BibliotecaMeses: Story = {
  name: '🎨 Biblioteca: meses',
  render: () => <Galeria initialView="months" />,
};

export const BibliotecaAnos: Story = {
  name: '🎨 Biblioteca: anos',
  render: () => <Galeria initialView="years" />,
};

export const Selecao: Story = {
  name: '🎨 Seleção',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(tela.getByRole('button', { name: 'Selecionar' }));
    const biblioteca = within(tela.getByRole('region', { name: 'Biblioteca' }));
    for (const item of uglMediaItems.slice(0, 3)) {
      await userEvent.click(biblioteca.getByRole('button', { name: comeca(item.alt) }));
    }
    await expect(tela.getByRole('toolbar', { name: 'Ações da seleção' })).toBeInTheDocument();
    await expect(tela.getByRole('heading', { name: '3 itens selecionados' })).toBeInTheDocument();
  },
};

/* ----------------------------------------------------------- Visualizador */

export const Visualizador: Story = {
  name: '🎨 Visualizador: foto',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const visualizador = await abrir(within(canvasElement), primeiraFoto.alt);
    await expect(visualizador.getByRole('button', { name: 'Editar' })).toBeInTheDocument();
  },
};

export const VisualizadorVideo: Story = {
  name: '🎨 Visualizador: vídeo',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const visualizador = await abrir(within(canvasElement), primeiroVideo.alt);
    await expect(visualizador.getAllByRole('button', { name: /Reproduzir/ }).length).toBeGreaterThan(0);
  },
};

export const Informacoes: Story = {
  name: '🎨 Informações',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const visualizador = await abrir(tela, primeiraFoto.alt);
    await userEvent.click(visualizador.getByRole('button', { name: 'Informações' }));
    await expect(await tela.findByRole('dialog', { name: 'Informações' })).toBeInTheDocument();
  },
};

export const Compartilhar: Story = {
  name: '🎨 Compartilhar',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const visualizador = await abrir(tela, primeiraFoto.alt);
    await userEvent.click(visualizador.getByRole('button', { name: 'Compartilhar' }));
    await expect(await tela.findByRole('dialog', { name: 'Compartilhar' })).toBeInTheDocument();
  },
};

export const Editor: Story = {
  name: '🎨 Editor',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const visualizador = await abrir(tela, primeiraFoto.alt);
    await userEvent.click(visualizador.getByRole('button', { name: 'Editar' }));
    await expect(await tela.findByRole('dialog', { name: 'Editar' })).toBeInTheDocument();
  },
};

export const ConfirmarExclusao: Story = {
  name: '🎨 Confirmar exclusão',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const visualizador = await abrir(tela, primeiraFoto.alt);
    await userEvent.click(visualizador.getByRole('button', { name: 'Excluir' }));
    await expect(await tela.findByRole('alertdialog', { name: 'Excluir este item?' })).toBeInTheDocument();
  },
};

/* ---------------------------------------------------- Para você e Álbuns */

export const ParaVoce: Story = {
  name: '🎨 Para você',
  render: () => <Galeria initialTab="foryou" />,
};

export const Albuns: Story = {
  name: '🎨 Álbuns',
  render: () => <Galeria initialTab="albums" />,
};

export const AlbumAberto: Story = {
  name: '🎨 Álbum aberto',
  render: () => <Galeria initialTab="albums" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const [album] = uglAlbums;
    await userEvent.click(await tela.findByRole('button', { name: comeca(album.title) }));
    await expect(await tela.findByRole('region', { name: album.title })).toBeInTheDocument();
  },
};

export const NovoAlbum: Story = {
  name: '🎨 Novo álbum',
  render: () => <Galeria initialTab="albums" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: 'Novo álbum' }));
    await expect(await tela.findByRole('dialog', { name: 'Novo álbum' })).toBeInTheDocument();
  },
};

export const Ocultos: Story = {
  name: '🎨 Ocultos (protegido)',
  render: () => <Galeria initialTab="albums" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: /^Ocultos/ }));
    await expect(await tela.findByRole('heading', { name: 'Ocultos está protegido' })).toBeInTheDocument();
  },
};

export const Lixeira: Story = {
  name: '🎨 Excluídos recentemente',
  render: () => <Galeria initialTab="albums" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.click(await tela.findByRole('button', { name: /^Excluídos recentemente/ }));
    await expect(await tela.findByRole('region', { name: 'Excluídos recentemente' })).toBeInTheDocument();
  },
};

/* ----------------------------------------------------------------- Busca */

export const Busca: Story = {
  name: '🎨 Busca',
  render: () => <Galeria initialTab="search" />,
};

export const BuscaResultados: Story = {
  name: '🎨 Busca: resultados',
  render: () => <Galeria initialTab="search" />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await userEvent.type(tela.getByRole('searchbox'), 'viagem');
    await expect(await tela.findByRole('region', { name: 'Resultados para viagem' })).toBeInTheDocument();
  },
};

/* --------------------------------------------------------------- Temas */

export const LadoALado: Story = {
  name: '🎨 Claro e escuro lado a lado',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Galeria theme="light" scale={0.75} label="Galeria no tema claro" />
      <Galeria theme="dark" scale={0.75} label="Galeria no tema escuro" />
    </div>
  ),
};

/**
 * Navegar pelas quatro abas e voltar à raiz tocando na aba ativa.
 */
export const NavegacaoPelasAbas: Story = {
  name: 'Fluxo: navegar pelas abas',
  render: () => <Galeria />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await irPara(tela, 'Álbuns');
    await expect(await tela.findByRole('heading', { name: 'Álbuns', level: 1 })).toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: /^Viagem à Chapada/ }));
    await expect(await tela.findByRole('region', { name: 'Viagem à Chapada' })).toBeInTheDocument();
    await irPara(tela, 'Álbuns');
    await waitFor(() =>
      expect(tela.queryByRole('region', { name: 'Viagem à Chapada' })).not.toBeInTheDocument()
    );
    await irPara(tela, 'Para você');
    await expect(await tela.findByRole('heading', { name: 'Para você', level: 1 })).toBeInTheDocument();
    await irPara(tela, 'Busca');
    await expect(tela.getByRole('searchbox')).toBeInTheDocument();
  },
};
