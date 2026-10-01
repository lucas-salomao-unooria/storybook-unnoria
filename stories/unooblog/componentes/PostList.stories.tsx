import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { PostList } from '../../../src/unooblog/components/PostList';
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
import { postsDoFeed, propsDoPostCard } from './feed.demo';

const BAR = '#716C98';

const seis = postsDoFeed.slice(0, 6);

/**
 * Cartões de post para a lista. Devolve um array de `PostCard`: a `PostList`
 * embrulha cada filho em um `<li>` (e achata fragmentos, mas não componentes
 * que renderizam vários cartões por dentro).
 */
const cards = ({
  variant = 'cover',
  count = 6,
}: { variant?: 'cover' | 'horizontal' | 'compact'; count?: number } = {}) =>
  seis
    .slice(0, count)
    .map((post) => <PostCard key={post.id} {...propsDoPostCard(post)} variant={variant} href={`#${post.id}`} />);

/**
 * Página de documentação rica do componente PostList.
 */
const PostListDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Feed"
      title="PostList"
      description="Lista de cartões de post, em grade ou em coluna. As colunas vêm da largura do contêiner, nunca da janela: uma no compacto, duas no médio e até três no largo. É uma lista de verdade, com nome para o leitor de tela."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O feed da página inicial, os resultados de busca e as páginas de tópico."
    />
    <UblDocGrid>
      <UblDocCard icon="🧱" title="Grade por contêiner">
        Abaixo de 640px, uma coluna; de 640px a 960px, duas; a partir de 960px, até{' '}
        <code>columns</code> (2 ou 3). A mesma lista numa coluna lateral estreita empilha, mesmo
        numa janela larga.
      </UblDocCard>
      <UblDocCard icon="📃" title="Lista em coluna">
        <code>layout=&quot;list&quot;</code> mantém uma coluna só — o lugar dos cartões{' '}
        <code>horizontal</code> e <code>compact</code>.
      </UblDocCard>
      <UblDocCard icon="♿" title="Lista com nome">
        O <code>&lt;ul&gt;</code> leva <code>aria-label</code> (<code>ariaLabel</code>) e cada
        filho entra em um <code>&lt;li&gt;</code>: o leitor de tela anuncia “lista, 6 itens”.
      </UblDocCard>
      <UblDocCard icon="📏" title="Alturas iguais">
        Cada item estica o cartão: numa linha da grade, os cartões têm a mesma altura e o rodapé
        fica alinhado na base.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="PostList"
      layout="Grade ou coluna · largura do contêiner"
      specs={[
        { label: 'Contêiner', value: 'container-type: inline-size no invólucro; o <ul> consulta a largura dele' },
        { label: 'Compacto (< 640px)', value: 'uma coluna · espaço de 16px' },
        { label: 'Médio (≥ 640px)', value: 'duas colunas · espaço de 24px' },
        { label: 'Largo (≥ 960px)', value: 'três colunas quando columns = 3 (padrão); duas quando columns = 2' },
        { label: 'Lista', value: 'uma coluna · espaço de 12px' },
        { label: 'Semântica', value: '<ul aria-label> com <li> por filho' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Pontos de quebra de contêiner',
          detail:
            'a grade responde à largura do invólucro (@container), não à da janela: o blog aparece em colunas e em quadros de documentação mais estreitos que a tela.',
        },
        {
          subject: 'Invólucro à parte',
          detail:
            'um elemento não consulta o próprio container-type; por isso o <ul> fica dentro de um invólucro que o declara.',
        },
        {
          subject: 'Cada filho em um <li>',
          detail:
            'o consumidor passa cartões soltos e a lista cuida da semântica; ninguém precisa lembrar de embrulhar em <li>.',
        },
        {
          subject: 'Server Component',
          detail: 'só renderiza markup a partir dos filhos; não usa hook nem repassa função.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocStage label="Grade de três colunas" surface="page" align="stretch" direction="column" width={1040}>
      <PostList ariaLabel="Posts recentes">
        {cards()}
      </PostList>
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Invólucro', role: 'Declara o contêiner de largura.', token: 'container-type: inline-size' },
        { name: 'Lista', role: '<ul> com nome acessível.', token: 'aria-label' },
        { name: 'Item', role: '<li> que estica o cartão.', token: '--ubl-spacing-l | --ubl-spacing-xxl' },
        { name: 'Cartão', role: 'Qualquer PostCard.', token: 'PostCard' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Grade de duas e três colunas, lista, e a mesma grade em três larguras de contêiner."
    />
    <UblDocStage label="columns = 2 (contêiner de 1040px)" surface="page" align="stretch" direction="column" width={1040}>
      <PostList ariaLabel="Posts, duas colunas" columns={2}>
        {cards({ count: 4 })}
      </PostList>
    </UblDocStage>
    <UblDocStage label="layout = list, com cartões horizontais" surface="page" align="stretch" direction="column" width={720}>
      <PostList ariaLabel="Posts em lista" layout="list">
        {cards({ variant: 'horizontal', count: 3 })}
      </PostList>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Dar um ariaLabel que diga o que a lista é (“Posts recentes”, “Posts do tópico Acessibilidade”).',
        'Passar PostCard da mesma variante dentro da mesma grade.',
        'Usar layout="list" com horizontal ou compact; grade com cover.',
        'Deixar a grade se adaptar ao contêiner: não force colunas por CSS de página.',
      ]}
      donts={[
        'Embrulhar cada cartão em <li> por conta própria: a lista já faz isso.',
        'Misturar featured com cartões comuns na mesma grade: o destaque vai fora dela.',
        'Usar a lista para navegação (<nav>): é uma lista de conteúdo.',
        'Omitir o ariaLabel: a lista ficaria sem nome.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Os cartões acompanham data-ubl-theme; a lista não pinta nada."
    />
    <UblDocThemeSwitcher surface="page">
      {() => (
        <div style={{ width: 720 }}>
          <PostList ariaLabel="Posts recentes" columns={2}>
            {cards({ count: 4 })}
          </PostList>
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="PostList"
      rows={[
        { name: 'layout', type: "'grid' | 'list'", default: "'grid'", description: 'Grade em colunas ou lista em uma coluna.' },
        { name: 'columns', type: '2 | 3', default: '3', description: 'Máximo de colunas da grade no contêiner largo.' },
        { name: 'ariaLabel', type: 'string', description: 'Nome da lista para o leitor de tela. Obrigatório.' },
        { name: 'children', type: 'React.ReactNode', description: 'Os cartões de post; cada filho entra em um <li>.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLUListElement>', description: 'Demais atributos do <ul>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PostList> = {
  title: 'Unooblog/Componentes/PostList',
  component: PostList,
  parameters: { layout: 'padded' },
  argTypes: {
    layout: { control: 'radio', options: ['grid', 'list'], description: 'Grade ou lista.' },
    columns: { control: 'radio', options: [2, 3], description: 'Máximo de colunas da grade.' },
    ariaLabel: { control: 'text', description: 'Nome da lista para o leitor de tela.' },
    children: { control: false, description: 'Os cartões de post.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    layout: 'grid',
    columns: 3,
    ariaLabel: 'Posts recentes',
  },
};

export default meta;

type Story = StoryObj<typeof PostList>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostListDocumentationPage />,
};

/**
 * Playground da lista, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PostList',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" width={1040}>
      <PostList {...args}>
        {cards({ variant: args.layout === 'list' ? 'horizontal' : 'cover' })}
      </PostList>
    </UblDocStage>
  ),
};

/**
 * O feed da página inicial: grade de três colunas de cartões com capa.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: o feed',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={1040}>
      <PostList ariaLabel="Posts recentes">
        {cards()}
      </PostList>
    </UblDocStage>
  ),
};

/**
 * A mesma grade em três larguras de contêiner: três, duas e uma coluna.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[1040, 720, 400].map((width) => (
        <UblDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" width={width}>
          <PostList ariaLabel={`Posts em ${width}px`}>
            {cards({ count: 3 })}
          </PostList>
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Grade de duas e de três colunas, e lista.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="grid · columns = 3" surface="page" align="stretch" direction="column" width={1040}>
        <PostList ariaLabel="Grade de três colunas" columns={3}>
          {cards({ count: 3 })}
        </PostList>
      </UblDocStage>
      <UblDocStage label="grid · columns = 2" surface="page" align="stretch" direction="column" width={1040}>
        <PostList ariaLabel="Grade de duas colunas" columns={2}>
          {cards({ count: 2 })}
        </PostList>
      </UblDocStage>
      <UblDocStage label="list" surface="page" align="stretch" direction="column" width={720}>
        <PostList ariaLabel="Lista" layout="list">
          {cards({ variant: 'compact', count: 3 })}
        </PostList>
      </UblDocStage>
    </div>
  ),
};

/**
 * Com poucos itens, um item só e sem itens.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UblDocStage label="Um item" surface="page" align="stretch" direction="column" width={1040}>
        <PostList ariaLabel="Um post">
          {cards({ count: 1 })}
        </PostList>
      </UblDocStage>
      <UblDocStage label="Dois itens na grade de três colunas" surface="page" align="stretch" direction="column" width={1040}>
        <PostList ariaLabel="Dois posts">
          {cards({ count: 2 })}
        </PostList>
      </UblDocStage>
    </div>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" width={720}>
          <PostList ariaLabel={`Posts, tema ${theme}`} columns={2}>
            {cards({ count: 2 })}
          </PostList>
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação (estrutura): é uma lista nomeada, com um item por cartão, e a
 * grade tem três, duas e uma coluna conforme a largura do contêiner.
 */
export const Estrutura: Story = {
  name: 'Interação: estrutura e colunas',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div data-teste="largo" style={{ width: 1040 }}>
        <PostList ariaLabel="Largo">
          {cards()}
        </PostList>
      </div>
      <div data-teste="medio" style={{ width: 720 }}>
        <PostList ariaLabel="Médio">
          {cards()}
        </PostList>
      </div>
      <div data-teste="compacto" style={{ width: 400 }}>
        <PostList ariaLabel="Compacto">
          {cards()}
        </PostList>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const colunas = (nome: string) => {
      const lista = canvas.getByRole('list', { name: nome });
      return getComputedStyle(lista).gridTemplateColumns.split(' ').length;
    };

    const lista = canvas.getByRole('list', { name: 'Largo' });
    await expect(within(lista).getAllByRole('listitem')).toHaveLength(6);
    await expect(within(lista).getAllByRole('link')).toHaveLength(6);

    await expect(colunas('Largo')).toBe(3);
    await expect(colunas('Médio')).toBe(2);
    await expect(colunas('Compacto')).toBe(1);
  },
};
