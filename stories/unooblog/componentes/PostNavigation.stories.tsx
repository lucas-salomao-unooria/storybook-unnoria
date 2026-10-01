import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PostNavigation } from '../../../src/unooblog/components/PostNavigation';
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
import { ublPosts } from '../fixtures';

const BAR = '#716C98';

const ANTERIOR = { title: ublPosts[2].title };
const PROXIMO = { title: ublPosts[1].title };
const TITULO_LONGO = {
  title:
    'Um título muito mais comprido do que cabe em duas linhas, para mostrar que o cartão corta o excesso sem estourar a grade nem esconder o destino',
};

/** Escapa um texto para usá-lo dentro de uma expressão regular. */
const escapar = (texto: string) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const COLUNA: React.CSSProperties = { width: 'min(720px, 100%)', boxSizing: 'border-box' };

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};

/**
 * Navegação com legenda do arranjo.
 */
const NavegacaoRotulada: React.FC<{
  rotulo: string;
  props?: Partial<React.ComponentProps<typeof PostNavigation>>;
}> = ({ rotulo, props }) => (
  <div style={{ ...COLUNA, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <PostNavigation previous={ANTERIOR} next={PROXIMO} {...props} />
  </div>
);

/**
 * Navegação que troca o "post atual" ao acionar um cartão, como num produto.
 */
const NavegacaoViva: React.FC = () => {
  const [indice, setIndice] = useState(1);
  const anterior = ublPosts[indice + 1];
  const proximo = ublPosts[indice - 1];
  return (
    <div style={{ ...COLUNA, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={rotuloEstilo} data-testid="atual">
        Lendo: {ublPosts[indice].title}
      </p>
      <PostNavigation
        previous={anterior ? { title: anterior.title } : undefined}
        next={proximo ? { title: proximo.title } : undefined}
        onNavigate={(direcao) => setIndice((atual) => atual + (direcao === 'next' ? -1 : 1))}
      />
    </div>
  );
};

/**
 * Página de documentação rica do componente PostNavigation.
 */
const PostNavigationDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="PostNavigation"
      description="Dois cartões no fim da leitura, “Post anterior” e “Próximo post”, cada um com o título do destino. Links ou botões; o cartão que não existe some."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Para quem terminou de ler e quer continuar na sequência."
    />
    <UblDocGrid>
      <UblDocCard icon="⬅️" title="Post anterior">
        O texto publicado antes deste. Em uma série, é a parte anterior; fora dela, o post mais
        antigo na ordem do blog.
      </UblDocCard>
      <UblDocCard icon="➡️" title="Próximo post">
        O texto publicado depois. O cartão do próximo post fica sempre à direita, mesmo quando não
        há anterior.
      </UblDocCard>
      <UblDocCard icon="🔗" title="Link ou botão">
        Com <code>href</code>, o cartão é um <code>&lt;a&gt;</code> (abre em nova guia, funciona sem
        JavaScript); sem ele, um <code>&lt;button&gt;</code> que chama <code>onNavigate</code>.
      </UblDocCard>
      <UblDocCard icon="📱" title="Empilha no compacto">
        Em contêineres abaixo de 640px, os cartões ocupam a largura toda, um sob o outro.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="PostNavigation"
      layout="Grade de duas colunas (a partir de 640px de contêiner) · cartões com intervalo de 16px"
      specs={[
        { label: 'Raiz', value: '<nav aria-label="Navegação entre posts">' },
        { label: 'Cartão', value: '--ubl-color-background-card · contorno 1px em --ubl-color-border-subtle · raio --ubl-radius-m (12px) · recuo 16px' },
        { label: 'Hover', value: 'fundo --ubl-color-background-subtle · contorno --ubl-color-border-default' },
        { label: 'Rótulo', value: 'caption-strong (12/18) · --ubl-color-text-accent · setas chevronLeft/chevronRight' },
        { label: 'Título', value: 'label-lg (16/24) · até 2 linhas, o excesso é cortado' },
        { label: 'Alvo', value: '≥ --ubl-touch-target (44px), pelo recuo do cartão' },
        { label: 'Próximo', value: 'alinhado ao fim · grid-column 2 mesmo sem o anterior' },
        { label: 'Fronteira', value: 'Client Component (repassa onNavigate aos cartões)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Cartões lavanda de cantos macios',
          detail:
            'o blog usa cartões lavanda sobre a página branca, com contorno de 1px e raio de 12px; o Unoojornal usa ligações em texto ao fim do texto. O cartão dá alvo de toque grande e deixa o destino legível.',
        },
        {
          subject: 'Nome do cartão é o rótulo e o título',
          detail:
            'o nome acessível de cada cartão é o conteúdo: "Post anterior" seguido do título, o que diz ao leitor de tela o sentido (anterior ou próximo) e o destino. Não há aria-label.',
        },
        {
          subject: 'Cartão ausente some, o outro fica no lugar',
          detail:
            'quando só há um destino, o cartão de "Próximo post" continua na coluna da direita, e o de "Post anterior" na da esquerda: a posição ensina o sentido. Sem nenhum dos dois, a navegação devolve null.',
        },
        {
          subject: 'Link ou botão conforme href',
          detail:
            'com href, o cartão é um link e ainda chama onNavigate (para o produto registrar a navegação); sem href, é um botão. O produto escolhe sem o componente mudar de papel.',
        },
        {
          subject: 'Título cortado em duas linhas',
          detail:
            'títulos muito longos são cortados em duas linhas (line-clamp) para que os dois cartões fiquem do mesmo tamanho; o título completo continua no nome acessível.',
        },
        {
          subject: 'Rótulos configuráveis',
          detail:
            'previousLabel e nextLabel permitem trocar "Post anterior" e "Próximo post", por exemplo por "Parte anterior" e "Próxima parte" numa série.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Dois cartões numa navegação nomeada."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <PostNavigation previous={ANTERIOR} next={PROXIMO} />
      </div>
      <UblDocAnatomy
        zones={[
          { name: 'Cartão', role: 'Superfície lavanda clicável com contorno e raio macio.', token: 'background-card · radius-m' },
          { name: 'Rótulo', role: 'Diz o sentido: anterior ou próximo, com a seta.', token: 'previousLabel · nextLabel' },
          { name: 'Título', role: 'Título do destino, em até duas linhas.', token: 'label-lg' },
          { name: 'Navegação', role: '<nav> nomeado "Navegação entre posts".', token: 'aria-label' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Destinos presentes, links e botões."
    />
    <UblDocStage label="Destinos presentes" surface="page" align="stretch" direction="column" padding={24}>
      <NavegacaoRotulada rotulo="Anterior e próximo" />
      <NavegacaoRotulada rotulo="Só o anterior (primeiro post do mais novo)" props={{ next: undefined }} />
      <NavegacaoRotulada rotulo="Só o próximo (post mais antigo)" props={{ previous: undefined }} />
    </UblDocStage>
    <UblDocStage label="Link, título longo e rótulos de série" surface="page" align="stretch" direction="column" padding={24}>
      <NavegacaoRotulada
        rotulo="Links (href)"
        props={{
          previous: { ...ANTERIOR, href: '#post-anterior' },
          next: { ...PROXIMO, href: '#proximo-post' },
        }}
      />
      <NavegacaoRotulada rotulo="Título longo" props={{ previous: TITULO_LONGO, next: TITULO_LONGO }} />
      <NavegacaoRotulada
        rotulo="Rótulos de série"
        props={{ previousLabel: 'Parte anterior', nextLabel: 'Próxima parte' }}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar a navegação." />
    <UblDocPractices
      dos={[
        'Passar o título completo do destino: ele é o que a pessoa lê para decidir.',
        'Usar href quando o destino tem endereço próprio, para o link funcionar sem script.',
        'Em série, trocar os rótulos por "Parte anterior" e "Próxima parte".',
        'Colocar a navegação depois dos comentários ou antes dos posts relacionados, e não no meio do texto.',
      ]}
      donts={[
        'Passar um destino vazio: omita a prop e o cartão some.',
        'Resumir o título para caber: o componente já corta em duas linhas.',
        'Usar a navegação como lista de posts relacionados: para isso existe o RelatedPosts.',
        'Trocar a ordem dos cartões: anterior sempre à esquerda, próximo à direita.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfícies, contornos e o rótulo em acento acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => (
        <div style={COLUNA}>
          <PostNavigation theme={tema} previous={ANTERIOR} next={PROXIMO} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do PostNavigation. Os demais atributos vão ao <nav> raiz."
    />
    <UblDocPropsTable
      title="PostNavigation"
      rows={[
        { name: 'previous', type: '{ title: string; href?: string }', description: 'Post anterior. Sem ele, o cartão não aparece.' },
        { name: 'next', type: '{ title: string; href?: string }', description: 'Próximo post. Sem ele, o cartão não aparece.' },
        { name: 'onNavigate', type: "(direction: 'previous' | 'next') => void", description: 'Chamado ao acionar um cartão. Cartões com href também chamam esta função.' },
        { name: 'previousLabel', type: 'string', default: "'Post anterior'", description: 'Rótulo pequeno do cartão do anterior.' },
        { name: 'nextLabel', type: 'string', default: "'Próximo post'", description: 'Rótulo pequeno do cartão do próximo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: 'aria-label', type: 'string', default: "'Navegação entre posts'", description: 'Nome da navegação.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PostNavigation> = {
  title: 'Unooblog/Componentes/PostNavigation',
  component: PostNavigation,
  parameters: { layout: 'padded' },
  argTypes: {
    previous: { control: 'object', description: 'Post anterior: { title, href? }.' },
    next: { control: 'object', description: 'Próximo post: { title, href? }.' },
    onNavigate: { action: 'onNavigate', description: 'Chamado ao acionar um cartão, com a direção.' },
    previousLabel: { control: 'text', description: 'Rótulo do cartão do anterior.' },
    nextLabel: { control: 'text', description: 'Rótulo do cartão do próximo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    previous: ANTERIOR,
    next: PROXIMO,
    previousLabel: 'Post anterior',
    nextLabel: 'Próximo post',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PostNavigation>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PostNavigationDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PostNavigation',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <PostNavigation {...args} />
      </div>
    </UblDocStage>
  ),
};

/**
 * A navegação num produto: cada cartão troca o post atual e o próximo estado
 * aparece com os destinos novos.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: navegando entre posts',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <NavegacaoViva />
    </UblDocStage>
  ),
};

/**
 * A navegação em contêineres de largura diferente: duas colunas a partir de 640px, uma abaixo.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      {[300, 480, 720].map((largura) => (
        <div key={largura} style={{ width: largura, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Contêiner de {largura}px</p>
          <PostNavigation previous={ANTERIOR} next={PROXIMO} />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * Anterior e próximo, só um deles, e links.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <NavegacaoRotulada rotulo="Anterior e próximo" />
      <NavegacaoRotulada rotulo="Só o anterior" props={{ next: undefined }} />
      <NavegacaoRotulada rotulo="Só o próximo" props={{ previous: undefined }} />
      <NavegacaoRotulada
        rotulo="Links"
        props={{
          previous: { ...ANTERIOR, href: '#post-anterior' },
          next: { ...PROXIMO, href: '#proximo-post' },
        }}
      />
    </UblDocStage>
  ),
};

/**
 * Título longo (cortado em duas linhas) e rótulos de série.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={24}>
      <NavegacaoRotulada rotulo="Título longo" props={{ previous: TITULO_LONGO, next: TITULO_LONGO }} />
      <NavegacaoRotulada
        rotulo="Rótulos de série"
        props={{ previousLabel: 'Parte anterior', nextLabel: 'Próxima parte' }}
      />
    </UblDocStage>
  ),
};

/**
 * A navegação nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UblDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="page"
          theme={tema}
          align="stretch"
          direction="column"
          padding={24}
          width={380}
        >
          <PostNavigation theme={tema} previous={ANTERIOR} next={PROXIMO} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Acionar um cartão chama `onNavigate` com a direção; o nome de cada cartão é
 * o rótulo seguido do título do destino.
 */
export const CliqueChamaOnNavigate: Story = {
  name: 'Clique chama onNavigate',
  args: { onNavigate: fn() },
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <PostNavigation {...args} />
      </div>
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('navigation', { name: 'Navegação entre posts' })).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: new RegExp(`^Post anterior ${escapar(ANTERIOR.title)}`) }));
    await expect(args.onNavigate).toHaveBeenLastCalledWith('previous');

    await userEvent.click(tela.getByRole('button', { name: new RegExp(`^Próximo post ${escapar(PROXIMO.title)}`) }));
    await expect(args.onNavigate).toHaveBeenLastCalledWith('next');
    await expect(args.onNavigate).toHaveBeenCalledTimes(2);
  },
};

/**
 * Cartões com `href` são links; um cartão ausente não aparece.
 */
export const LinksECartaoAusente: Story = {
  name: 'Links e cartão ausente',
  args: {
    previous: undefined,
    next: { ...PROXIMO, href: '#proximo-post' },
  },
  render: (args) => (
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <div style={COLUNA}>
        <PostNavigation {...args} />
      </div>
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.queryByText('Post anterior')).not.toBeInTheDocument();
    await expect(tela.getByRole('link', { name: new RegExp(`^Próximo post ${escapar(PROXIMO.title)}`) })).toHaveAttribute(
      'href',
      '#proximo-post'
    );
  },
};
