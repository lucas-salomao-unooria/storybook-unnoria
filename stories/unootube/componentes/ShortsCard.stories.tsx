import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ShortsCard } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocThemeSwitcher,
} from '../../../.storybook/components';
import { shorts } from '../fixtures';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof ShortsCard> = {
  title: 'Unootube/Componentes/ShortsCard',
  component: ShortsCard,
  parameters: { layout: 'padded' },
  argTypes: {
    thumbnailSrc: { control: 'text' },
    thumbnailAlt: { control: 'text' },
    videoTitle: { control: 'text' },
    views: { control: 'text' },
    variant: { control: 'radio', options: ['overlay', 'below', 'views'] },
    href: { control: 'text' },
    showMore: { control: 'boolean' },
    width: { control: 'text' },
    className: { control: 'text' },
    onMore: { action: 'onMore' },
  },
  args: {
    thumbnailSrc: shorts[0].thumbnailSrc,
    thumbnailAlt: '',
    videoTitle: 'Lorem ipsum | Sit amet | consectetur adipiscing elit..',
    views: '24M views',
    variant: 'overlay',
  },
};

export default meta;

type Story = StoryObj<typeof ShortsCard>;

const ShortsCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Shorts"
      title="ShortsCard"
      description="Reprodução das três composições de cartão vertical do arquivo Free YouTube Shorts Mockups (Community): o cartão da prateleira móvel (1:136), o da grade da área de trabalho (1:742) e a célula da grade de canal móvel (16:1017). O que separa as três é onde o texto mora — sobre a miniatura, abaixo dela, ou reduzido às visualizações."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que são três composições e não uma com espaçamentos diferentes."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🃏" title="overlay — prateleira móvel">
        150×266, título e visualizações <strong>sobre</strong> a miniatura, com o véu chapado de 32%
        por baixo e o menu de contexto no canto superior direito.
      </UniDocCard>
      <UniDocCard icon="🖥️" title="below — grade da área de trabalho">
        Miniatura de 9:16 com raio de 8px e o texto <strong>abaixo</strong> dela, em Roboto Regular
        16/22 e 14/22.
      </UniDocCard>
      <UniDocCard icon="🎞️" title="views — célula do canal móvel">
        119×200, miniatura <strong>contida</strong> numa célula opaca — o arquivo deixa faixas
        visíveis em cima e embaixo, o que dá à grade o aspecto de tira de filme.
      </UniDocCard>
      <UniDocCard icon="🔗" title="Link ou artigo">
        Com <code>href</code>, o cartão é um <code>&lt;a&gt;</code>; sem ele, um{' '}
        <code>&lt;article&gt;</code>. O menu de contexto interrompe a propagação, para que abri-lo
        não navegue para o vídeo.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="1:136"
      frameName="Story"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'overlay', value: '150 × 266 · recuo 8px · texto branco' },
        { label: 'below', value: '149,58 × 264,50 · raio 8px · gap 7px' },
        { label: 'views', value: '118,66 × 199,53 · imagem 139,30 de altura' },
        { label: 'Véu', value: 'preto a 32%, chapado' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Véu declarado como gradiente',
          detail:
            'o arquivo declara um GRADIENT_LINEAR de 90° com as duas paradas idênticas — ou seja, uma cor sólida translúcida. Reproduzido como cor, e não como gradiente, porque é isso que o valor significa.',
        },
        {
          subject: 'Hierarquia de texto na variante below',
          detail:
            'no quadro claro o arquivo pinta título e visualizações com a mesma tinta (#161722, node 1:745). O componente usa text-primary no título e text-secondary no metadado, para preservar a hierarquia de leitura exigida pela seção 4.2 — o mesmo desvio já registrado no Instanooria.',
        },
        {
          subject: 'Menu de contexto só na variante overlay',
          detail:
            'é a única em que o arquivo o desenha. Nas outras duas o botão pode ser ligado com showMore, mas vem desligado por padrão.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'o arquivo é estático e não descreve hover nem foco. Foram acrescentados como redução sutil de opacidade da miniatura e anel de foco em token da própria marca.',
        },
        {
          subject: 'Bitmaps não redistribuídos',
          detail:
            'as miniaturas do arquivo são fotografias de banco de imagens. As estórias usam pôsteres verticais sintéticos em SVG; em produto, a imagem entra por thumbnailSrc.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Miniatura',
          role: 'Quadro em 9:16. Recortada em overlay e below; contida em views.',
          token: '--uni-shorts-aspect · --uni-color-shorts-cell',
        },
        {
          name: 'Véu',
          role: 'Preto chapado a 32%, só na variante overlay.',
          token: '--uni-color-shorts-veil',
        },
        {
          name: 'Sobreposição',
          role: 'Título e visualizações ancorados na base, em branco.',
          token: '--uni-font-caption-* · --uni-font-caption-sm-*',
        },
        {
          name: 'Legenda abaixo',
          role: 'Título e visualizações fora da miniatura, na variante below.',
          token: '--uni-font-body-lg-* · --uni-font-body-md-*',
        },
        {
          name: 'Menu de contexto',
          role: 'Alvo de 24px no canto superior direito, sobreposto ao cartão inteiro.',
          token: '--uni-color-shorts-sound-fill',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="As três composições do arquivo" surface="primary" align="flex-start">
      {(['overlay', 'below', 'views'] as const).map((variant, index) => (
        <ShortsCard
          key={variant}
          variant={variant}
          thumbnailSrc={shorts[index].thumbnailSrc}
          videoTitle={shorts[index].videoTitle}
          views={shorts[index].views}
        />
      ))}
    </UniDocStage>
    <UniDocStage label="Sem título e sem menu" surface="primary" align="flex-start">
      <ShortsCard thumbnailSrc={shorts[3].thumbnailSrc} views="1 million views" showMore={false} />
      <ShortsCard
        variant="below"
        thumbnailSrc={shorts[4].thumbnailSrc}
        views="1 million views"
      />
    </UniDocStage>
    <UniDocStage label="Como link, com hover e foco" surface="primary" align="flex-start">
      <ShortsCard
        href="#"
        thumbnailSrc={shorts[5].thumbnailSrc}
        videoTitle="Lorem ipsum dolor sit amet..."
        views="1 million views"
      />
      <ShortsCard
        href="#"
        variant="below"
        thumbnailSrc={shorts[6].thumbnailSrc}
        videoTitle="Lorem ipsum dolor sit amet..."
        views="4 thousand views"
      />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Escolha a variante pelo contexto: overlay em prateleira móvel, below em grade de trabalho, views em grade de canal.',
        'Passe href quando o cartão navegar — a semântica de link é o que dá teclado e menu de contexto do navegador.',
        'Use width quando a grade do produto tiver colunas diferentes das do arquivo.',
        'Mantenha object-fit contain na variante views: as faixas da célula fazem parte do desenho.',
      ]}
      donts={[
        'Não consolide as três variantes: o texto muda de lugar, não só de tamanho.',
        'Não coloque o título na variante views — o arquivo não o desenha ali.',
        'Não substitua o véu chapado por um gradiente: o arquivo declara as duas paradas iguais.',
        'Não embuta bitmaps no pacote; a miniatura entra sempre por prop.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A variante below é a única cujo texto fica fora da mídia — e por isso a única que muda com o tema. Os valores claros foram medidos nos quadros claros do arquivo."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher>
      {() => (
        <>
          <ShortsCard
            variant="below"
            thumbnailSrc={shorts[1].thumbnailSrc}
            videoTitle="Lorem ipsum dolor sit amet..."
            views="1 million views"
          />
          <ShortsCard
            thumbnailSrc={shorts[2].thumbnailSrc}
            videoTitle="Lorem ipsum | Sit amet | consectetur adipiscing elit.."
            views="24M views"
          />
        </>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ShortsCard"
      rows={[
        {
          name: 'thumbnailSrc',
          type: 'string',
          description: 'Endereço da miniatura. Nenhum bitmap integra o pacote.',
        },
        {
          name: 'thumbnailAlt',
          type: 'string',
          default: "''",
          description: 'Texto alternativo da miniatura.',
        },
        {
          name: 'videoTitle',
          type: 'React.ReactNode',
          description: 'Título do Short. Ausente na variante views, que o arquivo não desenha.',
        },
        {
          name: 'views',
          type: 'React.ReactNode',
          description: 'Contagem de visualizações, como o arquivo escreve.',
        },
        {
          name: 'variant',
          type: "'overlay' | 'below' | 'views'",
          default: "'overlay'",
          description: 'Composição do cartão.',
        },
        {
          name: 'href',
          type: 'string',
          description: 'Com href, o cartão é um <a>; sem ele, um <article>.',
        },
        {
          name: 'showMore',
          type: 'boolean',
          default: "variant === 'overlay'",
          description: 'Exibe o menu de contexto no canto superior direito.',
        },
        {
          name: 'onMore',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          description: 'Chamado ao acionar o menu de contexto.',
        },
        {
          name: 'width',
          type: 'number | string',
          description: 'Largura do cartão. Sem ela, o cartão assume a largura literal da variante.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ShortsCardDocumentationPage />,
};

/**
 * Playground com 100% das props do ShortsCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShortsCard',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <ShortsCard {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos nós `1:136`, `1:742` e `16:1017`.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 32,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <ShortsCard
        thumbnailSrc={shorts[8].thumbnailSrc}
        videoTitle="Lorem ipsum | Sit amet | consectetur adipiscing elit.."
        views="24M views"
      />
      <ShortsCard
        variant="below"
        thumbnailSrc={shorts[0].thumbnailSrc}
        videoTitle="Lorem ipsum dolor sit amet..."
        views="4 thousand views"
      />
      <ShortsCard variant="views" thumbnailSrc={shorts[9].thumbnailSrc} views="14M views" />
    </div>
  ),
};

/**
 * Matriz completa das três variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {(['overlay', 'below', 'views'] as const).map((variant) => (
        <div key={variant}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {variant}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {shorts.slice(0, 4).map((short) => (
              <ShortsCard
                key={short.id}
                variant={variant}
                thumbnailSrc={short.thumbnailSrc}
                videoTitle={short.videoTitle}
                views={short.views}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
