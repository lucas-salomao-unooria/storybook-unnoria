import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ArticleTopBar } from '../../../src/unoojornal/components/ArticleTopBar';
import { IconButton } from '../../../src/unoojornal/components/IconButton';
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
import { ujnPublication } from '../fixtures';

const BAR = '#716C98';

/** Identificação da edição da publicação de demonstração, como a barra a mostra. */
const EDICAO = 'Edição nº 214';

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  color: 'var(--ujn-color-text-secondary)',
};

/**
 * Barra com legenda, na largura pedida (a largura do contêiner decide o arranjo).
 */
const BarraRotulada: React.FC<{
  rotulo: string;
  largura?: number | string;
  theme?: 'light' | 'dark';
  props?: Partial<React.ComponentProps<typeof ArticleTopBar>>;
}> = ({ rotulo, largura = '100%', theme, props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: largura }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <ArticleTopBar
      title={ujnPublication.name}
      edition={EDICAO}
      backHref="#capa"
      theme={theme}
      {...props}
    />
  </div>
);

/**
 * Barra que conta quantas vezes o atalho de volta foi acionado.
 */
const BarraComContador: React.FC<{ comLink?: boolean }> = ({ comLink = false }) => {
  const [voltas, setVoltas] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <ArticleTopBar
        title={ujnPublication.name}
        edition={EDICAO}
        backHref={comLink ? '#capa' : undefined}
        onBack={(evento) => {
          if (comLink) evento.preventDefault();
          setVoltas((atual) => atual + 1);
        }}
      />
      <p style={rotuloEstilo} data-testid="contagem">
        Voltou {voltas} {voltas === 1 ? 'vez' : 'vezes'}
      </p>
    </div>
  );
};

/**
 * Página de documentação rica do componente ArticleTopBar.
 */
const ArticleTopBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Matéria"
      title="ArticleTopBar"
      description="Barra superior da matéria aberta: o caminho de volta para a capa à esquerda, o nome da publicação ao centro e a edição à direita, com a faixa de progresso de leitura embutida no topo."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O que a pessoa precisa saber ao abrir uma matéria: onde está e como voltar."
    />
    <UjnDocGrid>
      <UjnDocCard icon="↩️" title="Voltar para a capa">
        Link quando há <code>backHref</code>, botão quando não há. O nome acessível é sempre o{' '}
        <code>backLabel</code>, mesmo quando o texto some no compacto.
      </UjnDocCard>
      <UjnDocCard icon="🏷️" title="Publicação ao centro">
        O nome do jornal é um <code>Masthead</code> de tamanho <code>md</code>, sem fio, em um{' '}
        <code>&lt;p&gt;</code> — o <code>&lt;h1&gt;</code> da página é o título da matéria.
      </UjnDocCard>
      <UjnDocCard icon="📏" title="Progresso embutido">
        Com <code>progress</code>, a faixa do <code>ReadingProgress</code> aparece colada ao topo da
        barra.
      </UjnDocCard>
      <UjnDocCard icon="📐" title="Resposta por contêiner">
        Largo ≥ 960px, médio ≥ 640px e compacto abaixo; no compacto só sobra o glifo de volta.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura herdada da tela da matéria; cores e fontes são as da Plataforma Unooria."
    />
    <UjnDocSpecs
      component="ArticleTopBar"
      layout="Grade de 3 colunas · voltar | publicação | edição · 74px"
      specs={[
        { label: 'Estrutura herdada', value: 'Tela article-detail 3:363 · quadro de progresso 6:102' },
        { label: 'Altura', value: '--ujn-article-bar-height (74px)' },
        { label: 'Superfície', value: '--ujn-color-surface-bar · fio --ujn-elevation-hairline-bottom' },
        { label: 'Voltar', value: 'Label/Large (16/24, 600) · alvo ≥ --ujn-touch-target (44px)' },
        { label: 'Publicação', value: 'Masthead size="md", rule="none", as="p"' },
        { label: 'Edição', value: 'Label (14/20, 600) em --ujn-color-text-secondary' },
        { label: 'Progresso', value: 'ReadingProgress absoluto no topo · --ujn-z-progress (15)' },
        { label: 'Contêiner', value: 'container-type: inline-size · quebras em 960px e 640px' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Fundo claro em vez do dourado',
          detail:
            'o quadro de origem usa fundo de papel e fio dourado; aqui a barra é --ujn-color-surface-bar (translúcida) com o fio de 1px em border-subtle, nos dois temas.',
        },
        {
          subject: 'Serifa → Open Sans Bold',
          detail:
            'o nome da publicação do quadro é em serifa; aqui vem do Masthead, em Open Sans bold.',
        },
        {
          subject: 'Link ou botão',
          detail:
            'com backHref o atalho é um <a>, que respeita abrir em nova aba; sem ele, é um <button>. O onBack roda nos dois e, no link, pode cancelar a navegação com preventDefault.',
        },
        {
          subject: 'No compacto, só o glifo',
          detail:
            'abaixo de 640px o texto "Voltar para a capa" e a edição saem da vista (ficam acessíveis ao leitor de tela) para o nome da publicação caber. O alvo continua de 44px.',
        },
        {
          subject: 'Publicação em parágrafo',
          detail:
            'o Masthead desta barra usa as="p": a matéria já tem o seu <h1> (o ArticleHeader), e dois <h1> embaralham a hierarquia.',
        },
        {
          subject: 'Área segura do aparelho',
          detail:
            'a barra soma --ujn-safe-area-top ao recuo superior, então dentro do PhoneFrame ela começa abaixo da barra de status. Fora do aparelho o valor é 0.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Três zonas e a faixa de progresso."
    />
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24}>
      <ArticleTopBar title={ujnPublication.name} edition={EDICAO} backHref="#capa" progress={35} />
      <UjnDocAnatomy
        zones={[
          { name: 'Voltar', role: 'Link ou botão com glifo e texto; só o glifo no compacto.', token: 'Label/Large · arrowBack' },
          { name: 'Publicação', role: 'Masthead md, sem fio, centralizado.', token: 'Masthead size="md"' },
          { name: 'Edição e ações', role: 'Identificação da edição e ações extras, à direita.', token: 'Label · --ujn-color-text-secondary' },
          { name: 'Progresso', role: 'Faixa de 4px colada ao topo, quando há progress.', token: '--ujn-progress-height' },
          { name: 'Fio inferior', role: 'Separa a barra do conteúdo.', token: '--ujn-elevation-hairline-bottom' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Três larguras de contêiner e as combinações de voltar e progresso."
    />
    <UjnDocStage label="Tamanhos (largura do contêiner)" surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Largo · 1000px" largura={1000} />
      <BarraRotulada rotulo="Médio · 700px" largura={700} />
      <BarraRotulada rotulo="Compacto · 360px" largura={360} />
    </UjnDocStage>
    <UjnDocStage label="Variantes" surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Link (backHref)" largura={700} />
      <BarraRotulada rotulo="Botão (onBack)" largura={700} props={{ backHref: undefined, onBack: () => undefined }} />
      <BarraRotulada rotulo="Com progresso (60%)" largura={700} props={{ progress: 60 }} />
      <BarraRotulada
        rotulo="Com ação extra"
        largura={700}
        props={{ actions: <IconButton icon="share" label="Compartilhar a matéria" /> }}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como compor a barra." />
    <UjnDocPractices
      dos={[
        'Passar backHref quando a capa tem endereço próprio: abrir em nova aba continua funcionando.',
        'Informar progress com o valor lido da matéria, para a faixa acompanhar a leitura.',
        'Manter o backLabel curto e específico ("Voltar para a capa").',
        'Usar o título da publicação, e deixar o título da matéria para o ArticleHeader.',
      ]}
      donts={[
        'Pôr o título da matéria na barra: o <h1> é do cabeçalho.',
        'Empilhar muitas ações à direita: no compacto elas disputam a largura com a publicação.',
        'Usar a barra sem caminho de volta em telas que abrem a partir da capa.',
        'Esconder o rótulo acessível do atalho: no compacto só o glifo aparece.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, fio, textos e progresso acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="page" padding={24}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <ArticleTopBar
            title={ujnPublication.name}
            edition={EDICAO}
            backHref="#capa"
            progress={50}
            theme={tema}
          />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público da ArticleTopBar. Os demais atributos vão ao <header>."
    />
    <UjnDocPropsTable
      title="ArticleTopBar"
      rows={[
        { name: 'title', type: 'string', description: 'Nome da publicação, ao centro. Obrigatório.' },
        { name: 'backLabel', type: 'string', default: "'Voltar para a capa'", description: 'Texto e nome acessível do atalho de volta.' },
        { name: 'backHref', type: 'string', description: 'Endereço da capa. Com ele o atalho é um <a>; sem, um <button>.' },
        { name: 'onBack', type: '(event: MouseEvent<HTMLElement>) => void', description: 'Chamado ao acionar o atalho. No link, preventDefault cancela a navegação.' },
        { name: 'edition', type: 'string', description: 'Identificação da edição, à direita. Some no compacto.' },
        { name: 'progress', type: 'number', description: 'Progresso de leitura (0–100). Com ele, a faixa de progresso aparece.' },
        { name: 'progressLabel', type: 'string', default: "'Progresso de leitura'", description: 'Nome acessível da faixa de progresso.' },
        { name: 'actions', type: 'ReactNode', description: 'Ações extras à direita, depois da edição.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ArticleTopBar> = {
  title: 'Unoojornal/Componentes/ArticleTopBar',
  component: ArticleTopBar,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Nome da publicação, ao centro.' },
    backLabel: { control: 'text', description: 'Texto e nome acessível do atalho de volta.' },
    backHref: { control: 'text', description: 'Endereço da capa; sem ele o atalho é um botão.' },
    onBack: { action: 'onBack', description: 'Chamado ao acionar o atalho de volta.' },
    edition: { control: 'text', description: 'Identificação da edição, à direita.' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Progresso de leitura (0–100).' },
    progressLabel: { control: 'text', description: 'Nome acessível da faixa de progresso.' },
    actions: { control: false, description: 'Ações extras à direita.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    title: ujnPublication.name,
    backLabel: 'Voltar para a capa',
    backHref: '#capa',
    edition: EDICAO,
    progress: 35,
    progressLabel: 'Progresso de leitura',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ArticleTopBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ArticleTopBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da ArticleTopBar',
  render: (args) => (
    <UjnDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={24}>
      <ArticleTopBar {...args} />
    </UjnDocStage>
  ),
};

/**
 * A barra da tela de matéria (`article-detail`, `3:363`): voltar, publicação,
 * edição e a faixa de progresso, com o componente real.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: barra da matéria',
  render: () => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24}>
      <ArticleTopBar title={ujnPublication.name} edition={EDICAO} backHref="#capa" progress={35} />
    </UjnDocStage>
  ),
};

/**
 * As três larguras de contêiner: largo, médio e compacto.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Largo · 1000px" largura={1000} props={{ progress: 50 }} />
      <BarraRotulada rotulo="Médio · 700px" largura={700} props={{ progress: 50 }} />
      <BarraRotulada rotulo="Compacto · 360px" largura={360} props={{ progress: 50 }} />
    </UjnDocStage>
  ),
};

/**
 * Link e botão; com e sem progresso; com ação extra.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Link (backHref)" largura={800} />
      <BarraRotulada rotulo="Botão (onBack)" largura={800} props={{ backHref: undefined, onBack: () => undefined }} />
      <BarraRotulada rotulo="Com progresso" largura={800} props={{ progress: 60 }} />
      <BarraRotulada
        rotulo="Com ação extra"
        largura={800}
        props={{ actions: <IconButton icon="share" label="Compartilhar a matéria" /> }}
      />
      <BarraRotulada rotulo="Sem edição" largura={800} props={{ edition: undefined }} />
    </UjnDocStage>
  ),
};

/**
 * Os quatro estados de progresso do quadro de leitura (`6:102`).
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="page" align="flex-start" direction="column" padding={24}>
      {[0, 25, 50, 100].map((valor) => (
        <BarraRotulada key={valor} rotulo={`progress=${valor}`} largura={800} props={{ progress: valor }} />
      ))}
    </UjnDocStage>
  ),
};

/**
 * A barra nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UjnDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="page"
          theme={tema}
          align="stretch"
          direction="column"
          padding={24}
        >
          <ArticleTopBar
            title={ujnPublication.name}
            edition={EDICAO}
            backHref="#capa"
            progress={50}
            theme={tema}
          />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * O atalho de volta, como botão, dispara `onBack` ao clique e ao teclado, com o
 * nome acessível "Voltar para a capa".
 */
export const VoltarComoBotao: Story = {
  name: 'Voltar dispara onBack (botão)',
  render: () => <BarraComContador />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const voltar = tela.getByRole('button', { name: 'Voltar para a capa' });

    await userEvent.click(voltar);
    await expect(tela.getByTestId('contagem')).toHaveTextContent('Voltou 1 vez');

    voltar.focus();
    await userEvent.keyboard('{Enter}');
    await expect(tela.getByTestId('contagem')).toHaveTextContent('Voltou 2 vezes');
  },
};

/**
 * Com `backHref`, o atalho é um link (`<a>`); `onBack` roda e pode cancelar a
 * navegação.
 */
export const VoltarComoLink: Story = {
  name: 'Voltar dispara onBack (link)',
  render: () => <BarraComContador comLink />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const voltar = tela.getByRole('link', { name: 'Voltar para a capa' });
    await expect(voltar).toHaveAttribute('href', '#capa');

    await userEvent.click(voltar);
    await expect(tela.getByTestId('contagem')).toHaveTextContent('Voltou 1 vez');
  },
};

/**
 * O `onBack` informado por controle é chamado uma vez por clique.
 */
export const VoltarChamaOnBack: Story = {
  name: 'Voltar chama o onBack dos controles',
  args: { backHref: undefined, onBack: fn() },
  render: (args) => (
    <UjnDocStage surface="page" align="stretch" direction="column" padding={24}>
      <ArticleTopBar {...args} />
    </UjnDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    await userEvent.click(tela.getByRole('button', { name: 'Voltar para a capa' }));
    await expect(args.onBack).toHaveBeenCalledTimes(1);
  },
};
