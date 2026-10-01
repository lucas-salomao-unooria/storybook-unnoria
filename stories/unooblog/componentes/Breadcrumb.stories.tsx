import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Breadcrumb } from '../../../src/unooblog/components/Breadcrumb';
import type { UblBreadcrumbItem } from '../../../src/unooblog/components/Breadcrumb';
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

const BAR = '#716C98';

const TRILHA: UblBreadcrumbItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Acessibilidade', href: '#acessibilidade' },
  { label: 'Teclado primeiro: o que testar antes de entregar uma tela', href: undefined },
];

const TRILHA_LONGA: UblBreadcrumbItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Séries', href: '#series' },
  { label: 'Projetando para o teclado', href: '#serie' },
  { label: 'Parte 2', href: '#parte' },
  { label: 'Foco visível, ordem de tabulação e atalhos que não atrapalham ninguém' },
];

/**
 * Página de documentação rica do componente Breadcrumb.
 */
const BreadcrumbDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Navegação"
      title="Breadcrumb"
      description="Trilha de navegação do post: Início, tópico e a página atual. Os itens anteriores são links; o último é texto, marcado como a página atual."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Dizer onde a pessoa está e deixar subir um nível."
    />
    <UblDocGrid>
      <UblDocCard icon="🍞" title="Onde estou">
        A trilha vai do mais geral ao mais específico. Em um post: Início › Tópico › título do post.
      </UblDocCard>
      <UblDocCard icon="📍" title="Página atual sem link">
        O último item é <code>&lt;span aria-current=&quot;page&quot;&gt;</code>, em texto primário e peso
        maior: nunca é link, e o estado não depende só da cor.
      </UblDocCard>
      <UblDocCard icon="♿" title="Lista dentro de um marco">
        <code>&lt;nav aria-label&gt;</code> com <code>&lt;ol&gt;</code>: o leitor de tela anuncia &quot;lista
        com 3 itens&quot; e a posição de cada um. O separador é decorativo.
      </UblDocCard>
      <UblDocCard icon="📱" title="Quebra de linha">
        Títulos longos quebram em vez de estourar a largura, e a trilha nunca rola na horizontal.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Composição própria do blog; cores, fontes e glifos são os da Plataforma Unooria."
    />
    <UblDocSpecs
      component="Breadcrumb"
      layout="Lista em linha que quebra de linha · item com 44px de altura · separador chevronRight de 16px"
      specs={[
        { label: 'Marco', value: '<nav aria-label="Trilha de navegação"> com <ol>' },
        { label: 'Link', value: 'body-md em --ubl-color-text-secondary · sublinhado no hover' },
        { label: 'Página atual', value: '--ubl-color-text-primary · peso bold · aria-current="page"' },
        { label: 'Separador', value: 'Icon chevronRight xs (16px) · aria-hidden' },
        { label: 'Alvo', value: '--ubl-touch-target (44px) de altura' },
        { label: 'Foco', value: 'Anel de 2px · --ubl-color-focus-ring' },
        { label: 'Fronteira', value: 'Server Component (só recebe props e renderiza)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Último item nunca é link',
          detail:
            'mesmo que o item traga href, o último é sempre um <span aria-current="page">: um link para a própria página só convida a recarregá-la.',
        },
        {
          subject: 'Separador dentro do <li>',
          detail:
            'o chevron decorativo (aria-hidden) vive dentro de cada item, e não como um <li> à parte, para a lista ter exatamente um item por nível e o leitor de tela contar certo.',
        },
        {
          subject: 'Link, botão ou texto',
          detail:
            'item com href é <a>; sem href mas com onClick é <button>; sem nenhum dos dois é só texto. Quem usa um roteador de cliente passa onClick.',
        },
        {
          subject: 'Corpo regular, página atual em bold',
          detail:
            'os links usam body-md (400) e a página atual o mesmo corpo em peso 700, para a diferença ser de forma e não só de cor.',
        },
        {
          subject: 'Alvo de 44px também em texto corrido',
          detail:
            'cada item tem min-height de --ubl-touch-target; a trilha ocupa uma linha de 44px, que é o preço de ser acionável por toque sem erro.',
        },
        {
          subject: 'Quebra, não rolagem',
          detail:
            'o título do post pode ter 80 caracteres. A lista quebra de linha e o último item usa overflow-wrap: anywhere, em vez de uma barra de rolagem horizontal.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Marco, itens e separadores." />
    <UblDocStage surface="page" align="stretch" direction="column" padding={16}>
      <Breadcrumb items={TRILHA} />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Marco <nav>', role: 'Nomeado por ariaLabel ("Trilha de navegação").', token: 'aria-label' },
        { name: 'Item anterior', role: '<a> (com href) ou <button> (com onClick).', token: '--ubl-color-text-secondary' },
        { name: 'Separador', role: 'chevronRight decorativo entre os itens.', token: 'Icon chevronRight' },
        { name: 'Página atual', role: 'Texto sem link, com aria-current="page" e peso bold.', token: '--ubl-color-text-primary' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="O componente real: curta, longa, de um item e em larguras estreitas."
    />
    <UblDocStage label="Três níveis" surface="page" align="stretch" direction="column" padding={16}>
      <Breadcrumb items={TRILHA} />
    </UblDocStage>
    <UblDocStage label="Cinco níveis, com título longo" surface="page" align="stretch" direction="column" padding={16}>
      <Breadcrumb items={TRILHA_LONGA} />
    </UblDocStage>
    <UblDocStage label="Um nível só (a própria página)" surface="page" align="stretch" direction="column" padding={16}>
      <Breadcrumb items={[{ label: 'Início' }]} />
    </UblDocStage>
    <UblDocStage label="Itens que são botões (roteador de cliente)" surface="page" align="stretch" direction="column" padding={16}>
      <Breadcrumb
        items={[
          { label: 'Início', onClick: () => undefined },
          { label: 'Tópicos', onClick: () => undefined },
          { label: 'Programação web' },
        ]}
      />
    </UblDocStage>
    <UblDocStage label="Largura compacta (390px)" surface="page" align="flex-start" padding={16}>
      <div style={{ width: 390, maxWidth: '100%' }}>
        <Breadcrumb items={TRILHA_LONGA} />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Uma trilha que orienta e não distrai." />
    <UblDocPractices
      dos={[
        'Começar sempre pela página inicial e terminar no título da página atual, sem link.',
        'Manter a trilha de acordo com a hierarquia do conteúdo (tópico ou série), não com o histórico de navegação.',
        'Passar href para cada item; use onClick só com roteador de cliente.',
        'Encurtar títulos muito longos no último item só se o título completo estiver no cabeçalho da página.',
      ]}
      donts={[
        'Pôr link no último item: ele é a página atual.',
        'Usar a trilha como histórico (“voltar”): ela mostra a hierarquia, não o caminho percorrido.',
        'Repetir o separador como texto (“>” ou “/”) nos rótulos: ele já é desenhado pelo componente.',
        'Mostrar a trilha numa página de primeiro nível: não há para onde subir.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Links, separadores e página atual acompanham o tema." />
    <UblDocThemeSwitcher surface="page" padding={16}>
      {(tema) => (
        <div style={{ width: '100%' }}>
          <Breadcrumb theme={tema} items={TRILHA} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Breadcrumb. Os demais atributos nativos vão ao <nav>."
    />
    <UblDocPropsTable
      title="Breadcrumb"
      rows={[
        { name: 'items', type: '{ label: string; href?: string; onClick?: () => void }[]', description: 'Itens da trilha, do mais geral ao mais específico. O último é a página atual. Obrigatório.' },
        { name: 'ariaLabel', type: 'string', default: "'Trilha de navegação'", description: 'Nome acessível do marco de navegação.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Breadcrumb> = {
  title: 'Unooblog/Componentes/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Itens da trilha (o último é a página atual).' },
    ariaLabel: { control: 'text', description: 'Nome acessível do marco de navegação.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    items: TRILHA,
    ariaLabel: 'Trilha de navegação',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <BreadcrumbDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Breadcrumb',
  render: (args) => (
    <div data-ubl-theme={args.theme} style={{ background: 'var(--ubl-color-background-page)', padding: 16 }}>
      <Breadcrumb {...args} />
    </div>
  ),
};

/**
 * Composição da trilha no topo de um post.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: trilha do post',
  render: () => (
    <div style={{ background: 'var(--ubl-color-background-page)', padding: 16, maxWidth: 680 }}>
      <Breadcrumb items={TRILHA} />
    </div>
  ),
};

/**
 * A trilha em larguras de contêiner diferentes: a lista quebra de linha.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ubl-color-background-page)', padding: 16 }}>
      {[680, 390, 280].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%' }}>
          <p style={{ margin: '0 0 4px', fontFamily: 'var(--ubl-font-sans)', fontSize: 12, color: 'var(--ubl-color-text-secondary)' }}>
            {largura}px
          </p>
          <Breadcrumb items={TRILHA_LONGA} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Um, três e cinco níveis; links e botões.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--ubl-color-background-page)', padding: 16 }}>
      <Breadcrumb items={[{ label: 'Início' }]} />
      <Breadcrumb items={TRILHA} />
      <Breadcrumb items={TRILHA_LONGA} />
      <Breadcrumb
        items={[
          { label: 'Início', onClick: () => undefined },
          { label: 'Tópicos', onClick: () => undefined },
          { label: 'Programação web' },
        ]}
      />
    </div>
  ),
};

/**
 * Link, botão, texto simples e página atual.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ background: 'var(--ubl-color-background-page)', padding: 16 }}>
      <Breadcrumb
        items={[
          { label: 'Link', href: '#link' },
          { label: 'Botão', onClick: () => undefined },
          { label: 'Texto simples' },
          { label: 'Página atual' },
        ]}
      />
    </div>
  ),
};

/**
 * A trilha nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} data-ubl-theme={tema} style={{ background: 'var(--ubl-color-background-page)', padding: 16 }}>
          <Breadcrumb theme={tema} items={TRILHA} />
        </div>
      ))}
    </div>
  ),
};

const aoAcionar = fn();

/**
 * Estrutura e semântica: lista nomeada, página atual sem link, botão dispara onClick.
 */
export const PaginaAtual: Story = {
  name: 'Página atual e itens acionáveis',
  render: () => (
    <div style={{ background: 'var(--ubl-color-background-page)', padding: 16 }}>
      <Breadcrumb
        items={[
          { label: 'Início', href: '#inicio' },
          { label: 'Tópicos', onClick: aoAcionar },
          { label: 'Programação web', href: '#programacao-web' },
          { label: 'Contêineres e consultas de contêiner', href: '#ignorado' },
        ]}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    aoAcionar.mockClear();
    const tela = within(canvasElement);
    const nav = tela.getByRole('navigation', { name: 'Trilha de navegação' });
    const lista = within(nav).getByRole('list');
    await expect(within(lista).getAllByRole('listitem')).toHaveLength(4);

    // O último item é a página atual: texto, sem link, com aria-current.
    const atual = within(nav).getByText('Contêineres e consultas de contêiner');
    await expect(atual).toHaveAttribute('aria-current', 'page');
    await expect(within(nav).queryByRole('link', { name: 'Contêineres e consultas de contêiner' })).not.toBeInTheDocument();
    await expect(nav.querySelectorAll('[aria-current="page"]')).toHaveLength(1);

    // Os anteriores: link com href e botão com onClick.
    await expect(within(nav).getByRole('link', { name: 'Início' })).toHaveAttribute('href', '#inicio');
    await userEvent.click(within(nav).getByRole('button', { name: 'Tópicos' }));
    await expect(aoAcionar).toHaveBeenCalledTimes(1);

    // Os separadores são decorativos: nenhum é anunciado.
    const separadores = nav.querySelectorAll('.ubl-breadcrumb__separator');
    await expect(separadores).toHaveLength(3);
    separadores.forEach((separador) => expect(separador).toHaveAttribute('aria-hidden', 'true'));
  },
};
