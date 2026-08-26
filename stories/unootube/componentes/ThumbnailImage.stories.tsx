import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { ThumbnailImage } from '../../../src/unootube';
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
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { videos } from '../fixtures';

const meta: Meta<typeof ThumbnailImage> = {
  title: 'Unootube/Componentes/ThumbnailImage',
  component: ThumbnailImage,
  parameters: { layout: 'padded' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    duration: { control: 'text' },
    className: { control: 'text' },
  },
  args: { src: videos[0].thumbnailSrc, alt: '', duration: '23:45' },
};

export default meta;

type Story = StoryObj<typeof ThumbnailImage>;

const ThumbnailImageDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Mídia"
      title="ThumbnailImage"
      description="Reprodução do nó Media/ThumbnailImage (11:997), a miniatura reutilizada pelos quatro formatos de cartão do arquivo. A proporção é 276×155, ou 1,781 — muito próxima de 16:9 (1,778), mas não idêntica; a razão literal do arquivo foi preservada."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A peça que os quatro cartões compartilham."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🖼️" title="Quatro larguras, uma peça">
        O arquivo instancia a mesma miniatura em 276px no cartão da grade, 210px no compacto, 168px
        no da coluna lateral e novamente no cabeçalho. A largura acompanha o cartão.
      </UniDocCard>
      <UniDocCard icon="📐" title="Razão 1,781, não 16:9">
        276÷155 dá 1,781 contra 1,778 de 16:9. A diferença é sub-pixel, mas a razão literal foi
        preservada em <code>aspect-ratio</code> em vez de normalizada.
      </UniDocCard>
      <UniDocCard icon="⏱️" title="Cápsula de duração">
        Ancorada a 4px da aresta inferior direita, com recuo <code>3/4</code> — o único uso de 3px em
        todo o arquivo — e preenchimento preto puro.
      </UniDocCard>
      <UniDocCard icon="🚫" title="Sem raio">
        As miniaturas do arquivo são retangulares de cantos retos. O raio médio de 8px existe na
        régua, mas nenhuma miniatura o usa.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="11:997"
      frameName="Media/ThumbnailImage"
      specs={[
        { label: 'Dimensões', value: '276 × 155' },
        { label: 'Cápsula', value: '33 × 18 · recuo 3/4' },
        { label: 'Duração', value: 'Caption/Small · #FFFFFF' },
        { label: 'Preenchimento da cápsula', value: '#000000' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Quadros de vídeo não redistribuídos',
          detail:
            'os bitmaps colados nos frames do arquivo são renderizações tridimensionais de logotipos de terceiros — YouTube, Instagram, TikTok, Netflix, Twitter, Spotify, Discord e Tesla. Não foram exportados nem embutidos no pacote; as estórias usam pôsteres sintéticos em SVG, gerados a partir da própria paleta.',
        },
        {
          subject: 'Largura fluida',
          detail:
            'o arquivo fixa a largura em cada instância. O componente ocupa 100% da largura do contêiner e deriva a altura da razão literal, para que a mesma peça sirva aos quatro cartões sem duplicação.',
        },
        {
          subject: 'Cor de espera',
          detail:
            'o arquivo não descreve o estado antes do carregamento do bitmap. O contêiner usa --uni-color-background-surface, para que a miniatura nunca renderize um vazio transparente.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Contêiner',
          role: 'Retângulo de razão 276/155, sem raio, com a superfície interativa como cor de espera.',
          token: 'aspect-ratio · --uni-color-background-surface',
        },
        {
          name: 'Imagem',
          role: 'Bitmap informado por prop, recortado com object-fit: cover.',
          token: 'prop src',
        },
        {
          name: 'Cápsula de duração',
          role: 'Etiqueta preta a 4px da aresta inferior direita, com recuo 3/4.',
          token: '--uni-color-overlay-duration · --uni-font-caption-sm-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e tamanhos" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: 276px de largura" surface="primary">
      <div style={{ width: 276 }}>
        <ThumbnailImage src={videos[0].thumbnailSrc} duration="23:45" />
      </div>
    </UniDocStage>
    <UniDocStage label="As quatro larguras do arquivo" surface="primary" align="flex-start" gap={16}>
      {[276, 210, 168, 120].map((width) => (
        <div key={width} style={{ width }}>
          <ThumbnailImage src={videos[1].thumbnailSrc} duration="23:45" />
          <div
            style={{
              fontSize: 11,
              color: 'var(--uni-color-text-secondary)',
              marginTop: 6,
              fontFamily: 'var(--uni-font-sans)',
            }}
          >
            {width}px
          </div>
        </div>
      ))}
    </UniDocStage>
    <UniDocStage label="Sem duração e sem imagem" surface="primary" align="flex-start" gap={16}>
      <div style={{ width: 210 }}>
        <ThumbnailImage src={videos[2].thumbnailSrc} />
      </div>
      <div style={{ width: 210 }}>
        <ThumbnailImage duration="12:03" />
      </div>
      <div style={{ width: 210 }}>
        <ThumbnailImage />
      </div>
    </UniDocStage>
    <UniDocStage label="Durações de comprimento variável" surface="primary" align="flex-start" gap={16}>
      {['0:42', '23:45', '1:14:07', 'LIVE'].map((duration) => (
        <div key={duration} style={{ width: 168 }}>
          <ThumbnailImage src={videos[4].thumbnailSrc} duration={duration} />
        </div>
      ))}
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Deixe a miniatura ocupar a largura do cartão: a altura vem da razão literal.',
        'Informe alt vazio quando o título do vídeo já aparecer como texto ao lado.',
        'Use a cápsula para duração ou para um marcador curto como “LIVE”.',
        'Mantenha os cantos retos: nenhuma miniatura do arquivo tem raio.',
      ]}
      donts={[
        'Não embuta quadros de vídeo no pacote — eles entram sempre por prop.',
        'Não normalize a razão para 16:9: a do arquivo é 276/155.',
        'Não coloque texto longo na cápsula, que tem 33px no arquivo.',
        'Não aplique raio à miniatura.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A miniatura sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'secondary', 'deep']}>
      {() => (
        <div style={{ width: 276 }}>
          <ThumbnailImage src={videos[3].thumbnailSrc} duration="23:45" />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="ThumbnailImage"
      rows={[
        {
          name: 'src',
          type: 'string',
          description:
            'Endereço da imagem. Os quadros de vídeo do arquivo não integram o pacote: entram sempre por prop.',
        },
        {
          name: 'alt',
          type: 'string',
          default: "''",
          description:
            'Texto alternativo. Use vazio quando o título do vídeo aparecer como texto adjacente.',
        },
        {
          name: 'duration',
          type: 'React.ReactNode',
          description: 'Conteúdo da cápsula. Quando omitido, a cápsula não é renderizada.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
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
  render: () => <ThumbnailImageDocumentationPage />,
};

/**
 * Playground com 100% das props do ThumbnailImage expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ThumbnailImage',
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
      <div style={{ width: 276 }}>
        <ThumbnailImage {...args} />
      </div>
    </div>
  ),
};

/**
 * Réplica visual do nó `Media/ThumbnailImage` (11:997), 276×155.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <div style={{ width: 276 }}>
        <ThumbnailImage src={videos[0].thumbnailSrc} duration="23:45" />
      </div>
    </div>
  ),
};

/**
 * As quatro larguras em que o arquivo instancia a miniatura.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {[276, 210, 168, 120].map((width, index) => (
        <div key={width} style={{ width }}>
          <ThumbnailImage src={videos[index].thumbnailSrc} duration="23:45" />
          <div style={{ fontSize: 11, color: 'var(--uni-color-text-secondary)', marginTop: 6 }}>
            {width}px
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Com duração, sem duração e sem imagem.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 16,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      {[
        { src: videos[0].thumbnailSrc, duration: '23:45' },
        { src: videos[1].thumbnailSrc, duration: undefined },
        { src: undefined, duration: '12:03' },
        { src: undefined, duration: undefined },
      ].map((props, index) => (
        <div key={index} style={{ width: 210 }}>
          <ThumbnailImage {...props} />
        </div>
      ))}
    </div>
  ),
};
