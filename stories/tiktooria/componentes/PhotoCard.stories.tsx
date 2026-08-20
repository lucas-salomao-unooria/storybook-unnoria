import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Button, PhotoCard } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { tikPhotos } from '../fixtures';

const meta: Meta<typeof PhotoCard> = {
  title: 'Tik Tooria/Componentes/PhotoCard',
  component: PhotoCard,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: { type: 'range', min: 80, max: 300, step: 5 } },
    height: { control: { type: 'range', min: 120, max: 500, step: 5 } },
    counter: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    src: tikPhotos[0],
    alt: 'Fotografia do carrossel',
    width: 248,
    height: 440,
    counter: '3/22',
  },
};

export default meta;

type Story = StoryObj<typeof PhotoCard>;


const PhotoCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Upload"
      title="PhotoCard"
      description="Cartão de fotografia do carrossel da tela “TikTok Upload photos”. Raio de 6px e o par de efeitos que o arquivo empilha: a sombra preta a 25% sob o cartão e o realce branco a 10% na aresta superior. É o único componente do módulo com dois efeitos simultâneos."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🖼️" title="Cartão de mídia">
        Único elemento de mídia do arquivo com raio (6px) e sombra. As miniaturas da grade são retas e planas.
      </TikDocCard>
      <TikDocCard icon="☁️" title="Dois efeitos empilhados">
        Sombra preta a 25% embaixo e realce branco a 10% na aresta superior, na ordem do arquivo.
      </TikDocCard>
      <TikDocCard icon="🔢" title="Contador">
        O arquivo exibe “3/22” em Bold 12 com sombra própria, no canto do cartão frontal.
      </TikDocCard>
      <TikDocCard icon="📐" title="Três medidas">
        O cartão frontal mede 248×440; os de trás, 235×396 e 235×394. As três estão disponíveis por prop.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:631"
      frameName="Photo — TikTok Upload photos"
      specs={[
        { label: 'Cartão frontal', value: '248 × 440' },
        { label: 'Cartões de trás', value: '235 × 396 e 235 × 394' },
        { label: 'Raio', value: '6px' },
        { label: 'Contador', value: 'Bold 12' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Contador como slot do cartão',
          detail:
            'no arquivo o contador é um nó irmão dos cartões, posicionado sobre o frontal. Aqui ele é um slot do próprio cartão, o que mantém a relação sem exigir posicionamento absoluto no consumidor.',
        },
        {
          subject: 'Sem rotação dos cartões de trás',
          detail:
            'o arquivo posiciona os três cartões em coordenadas ligeiramente distintas, sem rotação. O componente não introduz rotação nem escala; o empilhamento fica a cargo do consumidor.',
        },
        {
          subject: 'Sombra do contador',
          detail:
            'o contador tem seu próprio DROP_SHADOW de preto a 20% (o mesmo geométrico de “Action Button Shadow”). Foi aplicado como text-shadow literal.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Cartão', role: 'Contêiner com raio de 6px e os dois efeitos empilhados.', token: '--tik-radius-xl · --tik-elevation-photo · --tik-elevation-photo-rim' },
        { name: 'Imagem', role: 'Bitmap recortado com object-fit: cover.' },
        { name: 'Contador', role: 'Bold 12 no canto superior direito, com sombra própria.', token: '--tik-font-counter-*' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — cartão frontal com contador" surface="immersive" gap={32}>
      <PhotoCard src={tikPhotos[0]} alt="" counter="3/22" />
    </TikDocStage>
    <TikDocStage label="As três medidas do arquivo" surface="immersive" gap={24} align="flex-start">
      <PhotoCard src={tikPhotos[1]} alt="" width={235} height={396} />
      <PhotoCard src={tikPhotos[0]} alt="" width={248} height={440} counter="3/22" />
      <PhotoCard src={tikPhotos[2]} alt="" width={235} height={394} />
    </TikDocStage>
    <TikDocStage label="Sem imagem — reserva de mídia" surface="immersive" gap={24}>
      <PhotoCard width={140} height={248} />
      <PhotoCard width={140} height={248} counter="1/22" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use o cartão frontal em 248×440 e os de trás em 235px de largura.',
        'Passe as fotografias por src: são bitmaps informados por prop.',
        'Mantenha os dois efeitos: o realce superior é o que separa o cartão do fundo escuro.',
        'Informe alt quando a fotografia tiver conteúdo descritível.',
      ]}
      donts={[
        'Não use o cartão na grade de mídia: as miniaturas são retas e planas.',
        'Não remova o realce branco da aresta superior.',
        'Não use o cartão sobre cromo claro — os efeitos foram desenhados para fundo escuro.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher initial="immersive">
      {() => (
        <PhotoCard src={tikPhotos[0]} alt="" width={140} height={248} counter="3/22" />
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="PhotoCard"
      rows={[
        {
          name: 'src',
          type: "string",
          description:
            'Endereço da fotografia.',
        },
        {
          name: 'alt',
          type: "string",
          description:
            'Texto alternativo.',
        },
        {
          name: 'width',
          type: "number",
          default: "248",
          description:
            'Largura em pixels. O arquivo publica 248 no cartão frontal e 235 nos de trás.',
        },
        {
          name: 'height',
          type: "number",
          default: "440",
          description:
            'Altura em pixels. O arquivo publica 440 no cartão frontal.',
        },
        {
          name: 'counter',
          type: "React.ReactNode",
          description:
            'Contador exibido sobre o cartão, como “3/22”.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>",
          description:
            'Demais atributos HTML são repassados ao contêiner.',
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
  render: () => <PhotoCardDocumentationPage />,
};

/**
 * Playground com 100% das props do PhotoCard expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhotoCard',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <PhotoCard {...args} />
    </div>
  ),
};

/**
 * Réplica visual do carrossel do frame “TikTok Upload photos”.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        width: 414,
        padding: '32px 0',
        overflow: 'hidden',
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <PhotoCard src={tikPhotos[1]} alt="" width={120} height={202} />
        <PhotoCard src={tikPhotos[0]} alt="" width={140} height={248} counter="3/22" />
        <PhotoCard src={tikPhotos[2]} alt="" width={120} height={201} />
      </div>
      <Button variant="primary">Select photos</Button>
    </div>
  ),
};

/**
 * Com imagem, com contador e vazio.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        padding: 32,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <PhotoCard src={tikPhotos[0]} alt="" width={140} height={248} />
      <PhotoCard src={tikPhotos[1]} alt="" width={140} height={248} counter="3/22" />
      <PhotoCard width={140} height={248} />
    </div>
  ),
};

/**
 * As três medidas publicadas pelo arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--tik-color-surface-immersive)',
      }}
    >
      <PhotoCard src={tikPhotos[1]} alt="" width={235} height={396} />
      <PhotoCard src={tikPhotos[0]} alt="" width={248} height={440} counter="3/22" />
      <PhotoCard src={tikPhotos[2]} alt="" width={235} height={394} />
    </div>
  ),
};
