import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { MediaGrid } from '../../../src/tiktooria';
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
import { tikThumbnails } from '../fixtures';

const meta: Meta<typeof MediaGrid> = {
  title: 'Tik Tooria/Componentes/MediaGrid',
  component: MediaGrid,
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: { type: 'range', min: 2, max: 5, step: 1 } },
    className: { control: 'text' },
  },
  args: {
    columns: 3,
  },
};

export default meta;

type Story = StoryObj<typeof MediaGrid>;


const MediaGridDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Perfil"
      title="MediaGrid"
      description="Grade de miniaturas de 137×182 em três colunas. A separação entre as células é o contorno branco de 0,83px que o arquivo aplica por fora de cada miniatura — não um gap arbitrário, o que preserva o encaixe exato de 414px de largura."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔲" title="Três colunas de 137px">
        137 × 3 = 411, mais duas calhas de 1,66px, fecha os 414px do dispositivo.
      </TikDocCard>
      <TikDocCard icon="📐" title="Proporção 137:182">
        Cada célula usa <code>aspect-ratio</code>, o que mantém a proporção do arquivo em qualquer largura de contêiner.
      </TikDocCard>
      <TikDocCard icon="➖" title="Calha de 0,83px">
        O arquivo aplica um contorno branco de 0,83px por fora de cada miniatura. A grade reproduz isso com um gap de 1,66px sobre fundo branco.
      </TikDocCard>
      <TikDocCard icon="🏷️" title="Sobreposição livre">
        O slot <code>overlay</code> aceita um contador de visualizações ou qualquer marca, com Text Drop aplicado.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:447"
      frameName="Thumbnails — TikTok User"
      specs={[
        { label: 'Célula', value: '137 × 182' },
        { label: 'Colunas', value: '3' },
        { label: 'Calha', value: '0,83px por lado' },
        { label: 'Reserva de mídia', value: '#C4C4C4' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Contorno traduzido em gap',
          detail:
            'o arquivo desenha um stroke branco de 0,83px com alinhamento OUTSIDE em cada miniatura, o que resulta em 1,66px entre células vizinhas. A grade usa esse valor como gap sobre fundo branco, o que produz o mesmo resultado sem sobrepor contornos.',
        },
        {
          subject: 'Largura fluida',
          detail:
            'o arquivo fixa 137px por célula. A grade usa frações iguais, o que dá 137px em um contêiner de 414px e se adapta a outras larguras preservando a proporção.',
        },
        {
          subject: 'Sobreposição',
          detail:
            'o arquivo não desenha contador sobre as miniaturas do perfil. O slot overlay é uma extensão documentada.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Grade', role: 'Colunas iguais com gap de 1,66px sobre fundo branco.', token: '--tik-grid-hairline · --tik-color-border-grid' },
        { name: 'Célula', role: 'Contêiner com proporção 137:182 e reserva de mídia.', token: '--tik-color-surface-media' },
        { name: 'Imagem', role: 'Bitmap recortado com object-fit: cover.' },
        { name: 'Sobreposição', role: 'Marca opcional no canto inferior esquerdo.', token: '--tik-text-drop' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — três colunas" surface="chrome" align="stretch" direction="column" width={414}>
      <MediaGrid
        items={[...tikThumbnails, ...tikThumbnails, ...tikThumbnails].map((src) => ({
          src,
          alt: '',
        }))}
      />
    </TikDocStage>
    <TikDocStage label="Com contador de visualizações" surface="chrome" align="stretch" direction="column" width={414}>
      <MediaGrid
        items={tikThumbnails.map((src, index) => ({
          src,
          alt: '',
          overlay: `${(index + 1) * 12}.4K`,
        }))}
      />
    </TikDocStage>
    <TikDocStage label="Células vazias — reserva de mídia" surface="chrome" align="stretch" direction="column" width={414}>
      <MediaGrid items={Array.from({ length: 6 }, () => ({}))} />
    </TikDocStage>
    <TikDocStage label="Duas e quatro colunas" surface="chrome" align="stretch" direction="column" width={414}>
      <MediaGrid columns={2} items={tikThumbnails.map((src) => ({ src, alt: '' }))} />
      <MediaGrid columns={4} items={tikThumbnails.map((src) => ({ src, alt: '' }))} />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha três colunas no perfil e na tela de álbum, como no arquivo.',
        'Informe alt quando a miniatura tiver conteúdo descritível.',
        'Use overlay para contadores, sempre com Text Drop.',
      ]}
      donts={[
        'Não aumente o gap: 1,66px é a tradução do contorno de 0,83px.',
        'Não altere a proporção 137:182 das células.',
        'Não use fundo diferente de branco na grade: a calha depende dele.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome']} padding={0}>
      {() => (
        <div style={{ width: 414 }}>
          <MediaGrid items={tikThumbnails.map((src) => ({ src, alt: '' }))} />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="MediaGrid"
      rows={[
        {
          name: 'items',
          type: "TikMediaItem[]",
          description:
            'Miniaturas exibidas, em ordem de leitura.',
        },
        {
          name: 'columns',
          type: "number",
          default: "3",
          description:
            'Número de colunas. O arquivo publica três.',
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
    <TikDocPropsTable
      title="TikMediaItem"
      rows={[
        {
          name: 'src',
          type: "string",
          description:
            'Endereço da imagem. Bitmaps são informados por prop.',
        },
        {
          name: 'alt',
          type: "string",
          description:
            'Texto alternativo.',
        },
        {
          name: 'overlay',
          type: "React.ReactNode",
          description:
            'Sobreposição livre, por exemplo um contador de visualizações.',
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
  render: () => <MediaGridDocumentationPage />,
};

/**
 * Playground com 100% das props do MediaGrid expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MediaGrid',
  render: (args) => (
    <div style={{ width: 414 }}>
      <MediaGrid
        {...args}
        items={[...tikThumbnails, ...tikThumbnails, ...tikThumbnails].map((src) => ({
          src,
          alt: '',
        }))}
      />
    </div>
  ),
};

/**
 * Réplica visual da grade do frame “TikTok User”.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414 }}>
      <MediaGrid items={tikThumbnails.map((src) => ({ src, alt: '' }))} />
    </div>
  ),
};

/**
 * Réplica visual da grade de 12 miniaturas do frame “TikTok Album”.
 */
export const ExemploAlbum: Story = {
  name: '🎨 Exemplo Oficial — TikTok Album',
  render: () => (
    <div style={{ width: 414 }}>
      <MediaGrid
        items={[...tikThumbnails, ...tikThumbnails, ...tikThumbnails].map((src) => ({
          src,
          alt: '',
        }))}
      />
    </div>
  ),
};

/**
 * Com imagem, com contador e vazia.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 414 }}>
      <MediaGrid items={tikThumbnails.map((src) => ({ src, alt: '' }))} />
      <MediaGrid
        items={tikThumbnails.map((src, index) => ({
          src,
          alt: '',
          overlay: `${(index + 1) * 12}.4K`,
        }))}
      />
      <MediaGrid items={Array.from({ length: 3 }, () => ({}))} />
    </div>
  ),
};

/**
 * Comparação de contagens de coluna.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 414 }}>
      {[2, 3, 4].map((columns) => (
        <MediaGrid
          key={columns}
          columns={columns}
          items={[...tikThumbnails, ...tikThumbnails].map((src) => ({ src, alt: '' }))}
        />
      ))}
    </div>
  ),
};
