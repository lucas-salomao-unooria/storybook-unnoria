import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SeriesCard } from '../../../src/unooblog/components/SeriesCard';
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
import { propsDoSeriesCard } from './feed.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const openSpy = fn();

const serieA = propsDoSeriesCard(0);
const serieB = propsDoSeriesCard(1);

/**
 * Página de documentação rica do componente SeriesCard.
 */
const SeriesCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Feed"
      title="SeriesCard"
      description="Cartão de série: capa, título, descrição, “N posts” e, quando há progresso, uma barra com “x de N lidos”. A barra é um progressbar com valores e texto, e o cartão inteiro leva à série por um único alvo de foco."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Posts em sequência: a série “Acessibilidade na prática”, “Do rascunho ao protótipo”."
    />
    <UblDocGrid>
      <UblDocCard icon="📚" title="Posts em sequência">
        Agrupa os posts que se leem em ordem. O cartão diz quantos são e leva à página da série.
      </UblDocCard>
      <UblDocCard icon="📈" title="Progresso de leitura">
        Com <code>progress</code> (posts já lidos), aparece a barra e o texto “2 de 3 lidos”. A
        barra nunca é a única fonte do dado.
      </UblDocCard>
      <UblDocCard icon="🎯" title="Um único alvo">
        O título é o link (ou o botão) e o cartão inteiro clica por pseudo-elemento: um só ponto
        de Tab, com o título como nome acessível.
      </UblDocCard>
      <UblDocCard icon="↔️" title="Capa em cima ou ao lado">
        Num contêiner de 560px ou mais, a capa passa para a esquerda; abaixo, fica em cima.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="SeriesCard"
      layout="Cartão · largura do contêiner"
      specs={[
        { label: 'Superfície', value: 'background-card (lavanda) + fio de 1px · raio xl (24px)' },
        { label: 'Capa', value: '16:9 · raio l (16px) · à esquerda a partir de 560px de contêiner' },
        { label: 'Contagem', value: 'caption-strong · 12/18px · text-accent · glifo series' },
        { label: 'Título', value: 'heading-4 · 20/30px · 600' },
        { label: 'Descrição', value: 'body-md · 14/20px · três linhas' },
        { label: 'Barra', value: 'cápsula de 8px · action-primary sobre background-subtle · role=progressbar' },
        { label: 'Texto do progresso', value: 'caption · “x de N lidos” (também em aria-valuetext)' },
        { label: 'Foco', value: 'anel de 2px em focus-ring, em volta do cartão inteiro' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Progresso em barra e em palavras',
          detail:
            'o progressbar expõe aria-valuenow, aria-valuemax e aria-valuetext (“2 de 3 lidos”), e o mesmo texto aparece abaixo da barra: o dado não depende da forma nem da cor.',
        },
        {
          subject: 'Valor limitado à série',
          detail:
            'progress é arredondado e preso entre 0 e count, de modo que um valor de fora nunca desenha uma barra maior que a trilha.',
        },
        {
          subject: 'Barra em cápsula de 8px',
          detail:
            'mais grossa que o fio de leitura do cabeçalho (3px) porque aqui a barra é conteúdo do cartão; a trilha tem fio de 1px em border-subtle para existir sobre o lavanda.',
        },
        {
          subject: 'Contêiner, não janela',
          detail:
            'o cartão é um contêiner (container-type: inline-size) e troca a capa de lugar pela largura que tem, não pela da janela.',
        },
        {
          subject: 'Client Component',
          detail: "repassa onOpen ao link; por isso começa com 'use client'.",
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocStage label="Série com progresso" surface="page" align="stretch" direction="column" width={420}>
      <SeriesCard {...serieB} progress={2} onOpen={() => undefined} />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Capa', role: '16:9, cantos concêntricos.', token: '--ubl-radius-l · --ubl-color-background-subtle' },
        { name: 'Contagem', role: '“N posts” com o glifo de séries.', token: '--ubl-font-caption-strong-*' },
        { name: 'Título (alvo)', role: 'Link ou botão que estende o alvo ao cartão.', token: '--ubl-font-heading-4-*' },
        { name: 'Descrição', role: 'Três linhas.', token: '--ubl-font-body-md-*' },
        { name: 'Barra de progresso', role: 'progressbar com valor máximo igual à contagem.', token: '--ubl-color-action-primary' },
        { name: 'Texto do progresso', role: '“x de N lidos”.', token: '--ubl-font-caption-*' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Sem progresso, em andamento, concluída, sem capa e capa ao lado — componentes reais."
    />
    <UblDocStage label="Progresso: nenhum, em andamento, concluída" surface="page" align="stretch" direction="column" width={420}>
      <SeriesCard {...serieA} href="#sem" />
      <SeriesCard {...serieA} href="#meio" progress={1} />
      <SeriesCard {...serieB} href="#fim" progress={serieB.count} />
    </UblDocStage>
    <UblDocStage label="Sem capa e com capa ao lado (contêiner de 640px)" surface="page" align="stretch" direction="column" width={640}>
      <SeriesCard {...serieA} coverSrc={undefined} href="#semcapa" progress={0} />
      <SeriesCard {...serieB} href="#lado" progress={1} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Passar progress só para quem está logado e tem histórico: sem ele, a barra não aparece.',
        'Manter a descrição curta: ela é cortada em três linhas.',
        'Passar href quando a série tem página: o leitor de tela anuncia “link”.',
        'Usar o mesmo count da lista de posts da série.',
      ]}
      donts={[
        'Mostrar a barra com progress = 0 para quem nunca abriu a série, se isso desanima: omita a prop.',
        'Pôr outro link ou botão dentro do cartão: o clique já pertence ao título.',
        'Passar progress maior que count: o componente prende o valor, mas o dado está errado.',
        'Indicar a série concluída só pela cor da barra: o texto “N de N lidos” já diz.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, trilha, preenchimento e texto acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="page">
      {() => (
        <div style={{ display: 'grid', gap: 16, width: 420 }}>
          <SeriesCard {...serieA} href="#a" progress={1} />
          <SeriesCard {...serieB} href="#b" progress={serieB.count} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="SeriesCard"
      rows={[
        { name: 'title', type: 'string', description: 'Título da série; é o alvo principal. Obrigatório.' },
        { name: 'description', type: 'string', description: 'Descrição, cortada em três linhas.' },
        { name: 'coverSrc', type: 'string', description: 'Imagem de capa. Sem ela, o cartão não tem capa.' },
        { name: 'coverAlt', type: 'string', default: "''", description: 'Texto alternativo da capa.' },
        { name: 'count', type: 'number', description: 'Quantidade de posts da série. Obrigatória.' },
        { name: 'progress', type: 'number', description: 'Posts já lidos; mostra a barra e “x de N lidos”.' },
        { name: 'href', type: 'string', description: 'Faz do título um <a>.' },
        { name: 'onOpen', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Abre a série; sem href, faz do título um <button>.' },
        { name: 'headingLevel', type: '2 | 3 | 4', default: '3', description: 'Nível do título.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SeriesCard> = {
  title: 'Unooblog/Componentes/SeriesCard',
  component: SeriesCard,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título da série (alvo principal).' },
    description: { control: 'text', description: 'Descrição, em três linhas.' },
    coverSrc: { control: 'text', description: 'Imagem de capa.' },
    coverAlt: { control: 'text', description: 'Texto alternativo da capa.' },
    count: { control: { type: 'number', min: 0, step: 1 }, description: 'Quantidade de posts.' },
    progress: { control: { type: 'number', min: 0, step: 1 }, description: 'Posts já lidos.' },
    href: { control: 'text', description: 'Endereço (faz do título um link).' },
    onOpen: { action: 'onOpen', description: 'Abre a série (faz do título um botão sem href).' },
    headingLevel: { control: 'radio', options: [2, 3, 4], description: 'Nível do título.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...serieB,
    progress: 2,
    headingLevel: 3,
  },
};

export default meta;

type Story = StoryObj<typeof SeriesCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SeriesCardDocumentationPage />,
};

/**
 * Playground do cartão, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SeriesCard',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" width={440}>
      <SeriesCard {...args} />
    </UblDocStage>
  ),
};

/**
 * As séries da publicação lado a lado, com e sem progresso.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: séries',
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="row" gap={16} width={900}>
      <div style={{ width: 420 }}>
        <SeriesCard {...serieA} href="#a" progress={1} />
      </div>
      <div style={{ width: 420 }}>
        <SeriesCard {...serieB} href="#b" />
      </div>
    </UblDocStage>
  ),
};

/**
 * Do contêiner largo ao estreito: a capa troca de lado a partir de 560px.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[680, 440, 300].map((width) => (
        <UblDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" width={width}>
          <SeriesCard {...serieB} href="#tamanho" progress={1} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Com e sem capa, com e sem progresso.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={440}>
      <SeriesCard {...serieA} href="#a" />
      <SeriesCard {...serieA} href="#b" progress={1} />
      <SeriesCard {...serieB} coverSrc={undefined} href="#c" progress={2} />
      <SeriesCard {...serieB} coverSrc={undefined} description={undefined} onOpen={() => undefined} />
    </UblDocStage>
  ),
};

/**
 * Nenhum lido, em andamento e concluída. O foco se vê com o Tab.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={440}>
      <SeriesCard {...serieB} href="#zero" progress={0} />
      <SeriesCard {...serieB} href="#meio" progress={2} />
      <SeriesCard {...serieB} href="#fim" progress={serieB.count} />
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
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" width={440}>
          <SeriesCard {...serieA} href="#a" progress={1} />
          <SeriesCard {...serieB} href="#b" progress={serieB.count} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: a barra de progresso expõe os valores (e os limita à série) e o
 * título abre a série por clique e por Enter.
 */
export const ProgressoEAbertura: Story = {
  name: 'Interação: progresso e abertura',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={440}>
      <SeriesCard {...serieB} progress={2} onOpen={openSpy} />
      <SeriesCard {...serieA} progress={99} href="#a" />
      <SeriesCard {...serieA} href="#b" />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    openSpy.mockClear();
    const canvas = within(canvasElement);

    // A barra tem os valores e o texto em palavras.
    const barras = canvas.getAllByRole('progressbar');
    await expect(barras).toHaveLength(2);
    await expect(barras[0]).toHaveAttribute('aria-valuenow', '2');
    await expect(barras[0]).toHaveAttribute('aria-valuemax', String(serieB.count));
    await expect(barras[0]).toHaveAttribute('aria-valuetext', `2 de ${serieB.count} lidos`);
    await expect(canvas.getByText(`2 de ${serieB.count} lidos`)).toBeInTheDocument();

    // O valor de fora é preso ao total da série.
    await expect(barras[1]).toHaveAttribute('aria-valuenow', String(serieA.count));

    // Sem progress, não há barra (só dois progressbar para três cartões).
    await expect(canvasElement.querySelectorAll('article')).toHaveLength(3);

    // Sem href, o título é um botão: clique e Enter abrem.
    const abrir = canvas.getByRole('button', { name: serieB.title });
    await userEvent.click(abrir);
    await expect(openSpy).toHaveBeenCalledTimes(1);
    abrir.focus();
    await userEvent.keyboard('{Enter}');
    await expect(openSpy).toHaveBeenCalledTimes(2);

    // Com href, é um link (dois cartões da primeira série).
    await expect(canvas.getAllByRole('link', { name: serieA.title })).toHaveLength(2);
  },
};
