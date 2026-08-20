import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Chip } from '../../../src/tiktooria';
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

const meta: Meta<typeof Chip> = {
  title: 'Tik Tooria/Componentes/Chip',
  component: Chip,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: {
      control: 'select',
      options: [undefined, 'bookmarkSmall', 'plus', 'share', 'download'],
    },
    fixedWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    icon: 'bookmarkSmall',
    fixedWidth: false,
    disabled: false,
    children: 'Add to Favorites',
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;


const ChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Ações"
      title="Chip"
      description="Alvo contornado de 152×28 com raio de 2px, publicado em “Add to Favorites” na página de som. Compartilha o contorno e o raio do botão outline, mas usa o degrau tipográfico Semibold 14 e uma altura menor."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔖" title="Ação secundária">
        Menos peso visual que o botão outline: 28px de altura contra 44px. Usado para ações que acompanham conteúdo, não que o confirmam.
      </TikDocCard>
      <TikDocCard icon="📐" title="Mesmo contorno do outline">
        Contorno de 1px em #E3E3E4 e raio de 2px, idênticos ao botão outline — o que muda é a altura e o degrau tipográfico.
      </TikDocCard>
      <TikDocCard icon="🔤" title="Semibold 14">
        Degrau exclusivo do chip. Não há outro uso de Semibold 14 no arquivo.
      </TikDocCard>
      <TikDocCard icon="📏" title="Largura de 152px">
        O arquivo fixa 152px. Como o rótulo varia por locale, o padrão do componente é largura por conteúdo.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:813"
      frameName="Button — TikTok Album"
      specs={[
        { label: 'Dimensões', value: '152 × 28' },
        { label: 'Raio', value: '2px' },
        { label: 'Rótulo', value: 'Semibold 14 · #161722' },
        { label: 'Glifo', value: 'bookmark de 12,9px' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Largura livre por padrão',
          detail:
            'o arquivo fixa 152px. O componente adota largura por conteúdo como padrão e oferece fixedWidth, porque o rótulo “Add to Favorites” muda de comprimento em outras línguas.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'ausentes no arquivo. Realce em --tik-color-surface-sheet, foco com anel de 2px em --tik-color-brand-button e desabilitado a 40% de opacidade.',
        },
        {
          subject: 'Sem estado selecionado',
          detail:
            'o arquivo mostra apenas “Add to Favorites”, nunca “Added”. Nenhum estado de seleção foi inventado.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Contorno', role: 'Borda de 1px com raio de 2px sobre superfície branca.', token: '--tik-color-border-outline · --tik-radius-s' },
        { name: 'Glifo', role: 'Ícone opcional de ~13px antes do rótulo.', token: 'prop icon' },
        { name: 'Rótulo', role: 'Semibold 14 em tom primário.', token: '--tik-font-label-strong-*' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo, com largura fixa de 152px" surface="chrome" gap={20}>
      <Chip icon="bookmarkSmall" fixedWidth>
        Add to Favorites
      </Chip>
    </TikDocStage>
    <TikDocStage label="Largura por conteúdo, com e sem glifo" surface="chrome" gap={20}>
      <Chip icon="bookmarkSmall">Add to Favorites</Chip>
      <Chip>Seguir</Chip>
      <Chip icon="share">Compartilhar</Chip>
      <Chip icon="download">Baixar</Chip>
    </TikDocStage>
    <TikDocStage label="Estados" surface="chrome" gap={20}>
      <Chip icon="bookmarkSmall">Repouso</Chip>
      <Chip icon="bookmarkSmall" disabled>
        Desabilitado
      </Chip>
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Use o chip para ações que acompanham conteúdo, não para confirmações.',
        'Deixe a largura por conteúdo quando o rótulo for localizado.',
        'Combine com um glifo de 13px, como o arquivo faz com o marcador.',
      ]}
      donts={[
        'Não use o chip como botão principal da tela.',
        'Não aumente a altura de 28px: é o que o distingue do botão outline.',
        'Não invente estado selecionado.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <Chip icon="bookmarkSmall">Add to Favorites</Chip>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="Chip"
      rows={[
        {
          name: 'icon',
          type: "TikIconName",
          description:
            'Glifo exibido antes do rótulo.',
        },
        {
          name: 'fixedWidth',
          type: "boolean",
          default: "false",
          description:
            'Aplica a largura de 152px publicada pelo arquivo.',
        },
        {
          name: 'children',
          type: "React.ReactNode",
          description:
            'Rótulo do chip.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "React.ButtonHTMLAttributes<HTMLButtonElement>",
          description:
            'Demais atributos são repassados ao <button>, incluindo onClick e disabled.',
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
  render: () => <ChipDocumentationPage />,
};

/**
 * Playground com 100% das props do Chip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Chip',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <Chip {...args} />
    </div>
  ),
};

/**
 * Réplica visual do chip do frame “TikTok Album”.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ padding: 32, background: 'var(--tik-color-surface-primary)' }}>
      <Chip icon="bookmarkSmall" fixedWidth>
        Add to Favorites
      </Chip>
    </div>
  ),
};

/**
 * Com e sem glifo, com largura fixa e por conteúdo.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', padding: 24 }}>
      <Chip icon="bookmarkSmall" fixedWidth>
        Add to Favorites
      </Chip>
      <Chip icon="bookmarkSmall">Add to Favorites</Chip>
      <Chip>Seguir</Chip>
      <Chip icon="share">Compartilhar</Chip>
    </div>
  ),
};

/**
 * Estados interativos.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, padding: 24 }}>
      <Chip icon="bookmarkSmall">Repouso</Chip>
      <Chip icon="bookmarkSmall" disabled>
        Desabilitado
      </Chip>
    </div>
  ),
};
