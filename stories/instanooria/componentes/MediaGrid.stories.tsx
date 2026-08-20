import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MediaGrid } from '../../../src/instanooria/components/MediaGrid';
import { SegmentedTabs } from '../../../src/instanooria/components/SegmentedTabs';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaGridItems } from '../fixtures';

/**
 * Página de documentação rica do componente MediaGrid.
 */
const MediaGridDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Conteúdo"
      title="MediaGrid"
      description="Grade de publicações do perfil e da tela Buscar. Reproduz a estrutura de três colunas com calha de 1px do Figma e o indicador de vídeo sobreposto ao canto superior direito dos blocos correspondentes."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Uma grade, dois contextos, três tipos de mídia."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔲" title="Blocos quadrados">
        Cada bloco mantém proporção 1:1 com <code>object-fit: cover</code>, garantindo alinhamento
        perfeito independentemente da imagem de origem.
      </InstaDocCard>
      <InstaDocCard icon="📏" title="Calha de 1px">
        A separação é mínima e proposital: a grade lê como um mosaico contínuo, não como uma lista de
        cartões.
      </InstaDocCard>
      <InstaDocCard icon="🎬" title="Indicador de vídeo">
        O tipo <code>video</code> sobrepõe um glifo branco com sombra sutil, legível sobre qualquer
        imagem. O arquivo de design não define indicador de carrossel na grade.
      </InstaDocCard>
      <InstaDocCard icon="♿" title="Lista semântica">
        A grade declara <code>role=&quot;list&quot;</code> e cada bloco{' '}
        <code>role=&quot;listitem&quot;</code>, com o <code>alt</code> descrevendo a mídia.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas do frame Posts do perfil."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2663"
      frameName="Instagram Profile → Posts"
      specs={[
        { label: 'Colunas', value: '3' },
        { label: 'Bloco', value: '124 × 124px' },
        { label: 'Calha', value: '1px' },
        { label: 'Largura total', value: '375px' },
        { label: 'Indicador de vídeo', value: '20 × 14px' },
        { label: 'Posição do indicador', value: 'topo-direita · 8px' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Grade CSS com blocos quadrados e indicador sobreposto."
    />
    <InstaDocStage label="Grade de três colunas (375px)" align="flex-start" padding={0}>
      <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
        <MediaGrid items={instaGridItems} />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes"
      description="Contagem de colunas, calha e tipos de mídia."
    />
    <InstaDocStage label="Colunas" align="flex-start" padding={0}>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {[2, 3, 4].map((columns) => (
          <div key={columns} style={{ width: 240 }}>
            <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>
              columns={columns}
            </div>
            <MediaGrid items={instaGridItems.slice(0, columns * 2)} columns={columns} />
          </div>
        ))}
      </div>
    </InstaDocStage>

    <InstaDocStage label="Calha" align="flex-start" padding={0}>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {[0, 1, 4].map((gap) => (
          <div key={gap} style={{ width: 240 }}>
            <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>gap={gap}px</div>
            <MediaGrid items={instaGridItems.slice(0, 6)} gap={gap} />
          </div>
        ))}
      </div>
    </InstaDocStage>

    <InstaDocStage label="Tipos de mídia" align="flex-start" padding={0}>
      <div style={{ width: 375 }}>
        <MediaGrid
          items={[
            { ...instaGridItems[0], type: 'image' },
            { ...instaGridItems[1], type: 'image' },
            { ...instaGridItems[4], type: 'video' },
          ]}
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de grade verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter três colunas no perfil, replicando o arquivo original.',
        'Descrever cada mídia em alt — é a única informação textual do bloco.',
        'Marcar o tipo video para que a pessoa saiba o que esperar ao tocar.',
        'Usar gap=1 para preservar a leitura de mosaico contínuo.',
      ]}
      donts={[
        'Aplicar raio de borda aos blocos: a grade do arquivo é retangular.',
        'Misturar proporções diferentes na mesma grade.',
        'Usar gaps largos, que transformam a grade em uma lista de cartões.',
        'Sobrepor mais de um indicador ao mesmo bloco.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="O fundo da grade acompanha a superfície primary; os indicadores são sempre brancos."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375 }}>
          <MediaGrid items={instaGridItems.slice(0, 6)} theme={activeTheme} />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente MediaGrid."
    />
    <InstaDocPropsTable
      title="MediaGrid"
      rows={[
        { name: 'items', type: 'InstaMediaItem[]', description: 'Blocos exibidos. Obrigatório.' },
        {
          name: 'columns',
          type: 'number',
          default: '3',
          description: 'Quantidade de colunas da grade.',
        },
        {
          name: 'gap',
          type: 'number',
          default: '1',
          description: 'Espaço entre os blocos em pixels.',
        },
        {
          name: 'onSelect',
          type: '(item: InstaMediaItem, index: number) => void',
          description: 'Callback disparado ao selecionar um bloco.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Publicações'",
          description: 'Rótulo acessível da grade.',
        },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Tema usado para resolver as variáveis de cor.',
        },
      ]}
    />
    <InstaDocPropsTable
      title="InstaMediaItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do bloco.' },
        { name: 'src', type: 'string', description: 'URL da imagem de capa.' },
        { name: 'alt', type: 'string', description: 'Texto alternativo da imagem.' },
        {
          name: 'type',
          type: "'image' | 'video'",
          default: "'image'",
          description: 'Tipo de mídia. O valor "video" exibe o indicador sobreposto.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof MediaGrid> = {
  title: 'Instanooria/Componentes/MediaGrid',
  component: MediaGrid,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Blocos exibidos na grade.' },
    columns: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: 'Quantidade de colunas.',
    },
    gap: {
      control: { type: 'range', min: 0, max: 12, step: 1 },
      description: 'Espaço entre os blocos em pixels.',
    },
    ariaLabel: { control: 'text', description: 'Rótulo acessível da grade.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    items: instaGridItems,
    columns: 3,
    gap: 1,
    ariaLabel: 'Publicações',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof MediaGrid>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MediaGridDocumentationPage />,
};

/**
 * Playground com todas as propriedades da MediaGrid expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da MediaGrid',
  render: (args) => (
    <div
      data-insta-theme={args.theme}
      style={{
        width: 375,
        borderRadius: 12,
        border: '1px solid #E4E8E9',
        overflow: 'hidden',
        backgroundColor: args.theme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <MediaGrid {...args} />
    </div>
  ),
};

/**
 * Réplica da grade do perfil do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <SegmentedTabs
        items={[
          { id: 'grid', label: 'Publicações em grade', icon: 'grid' },
          { id: 'tagged', label: 'Marcações', icon: 'tagged' },
        ]}
        activeId="grid"
        variant="icon"
        ariaLabel="Seções do perfil"
      />
      <MediaGrid items={instaGridItems} />
    </div>
  ),
};

/**
 * Matriz de contagem de colunas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {[2, 3, 4].map((columns) => (
        <div key={columns} style={{ width: 260 }}>
          <div style={{ fontSize: 12, color: '#475157', marginBottom: 8 }}>columns={columns}</div>
          <MediaGrid items={instaGridItems.slice(0, columns * 2)} columns={columns} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Indicadores de tipo de mídia.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
      <MediaGrid
        items={[
          { ...instaGridItems[0], type: 'image' },
          { ...instaGridItems[1], type: 'image' },
          { ...instaGridItems[4], type: 'video' },
        ]}
      />
    </div>
  ),
};
