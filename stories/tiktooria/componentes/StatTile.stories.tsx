import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { StatTile } from '../../../src/tiktooria';
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
import { tikProfileStats } from '../fixtures';

const meta: Meta<typeof StatTile> = {
  title: 'Tik Tooria/Componentes/StatTile',
  component: StatTile,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    value: '38',
    label: 'Followers',
  },
};

export default meta;

type Story = StoryObj<typeof StatTile>;


const StatTileDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Perfil"
      title="StatTile"
      description="Par valor/rótulo das métricas do perfil. O valor usa Bold 17 em --tik-color-text-primary e o rótulo Regular 13 em --tik-color-text-secondary, com 25px entre as linhas de base — o mesmo intervalo do arquivo."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔢" title="Dois degraus">
        Bold 17 no valor e Regular 13 no rótulo. A diferença de peso e de tom é o que cria a hierarquia — não há cor de destaque.
      </TikDocCard>
      <TikDocCard icon="📊" title="Três métricas">
        O arquivo publica seguindo, seguidores e curtidas, nesta ordem, no cabeçalho do perfil.
      </TikDocCard>
      <TikDocCard icon="🎯" title="Alvo de toque">
        Renderiza um contêiner, não um botão: no arquivo as métricas não são interativas. Envolva em um botão se o produto precisar disso.
      </TikDocCard>
      <TikDocCard icon="🧩" title="Subcomponente do perfil">
        Usado pelo <code>ProfileHeader</code>, mas exportado à parte para composições próprias.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:486"
      frameName="Followers — TikTok User"
      specs={[
        { label: 'Valor', value: 'Proxima Nova Bold 17' },
        { label: 'Rótulo', value: 'Proxima Nova Regular 13' },
        { label: 'Distância entre linhas de base', value: '25px' },
        { label: 'Alinhamento', value: 'centralizado' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Espaçamento entre métricas',
          detail:
            'o arquivo posiciona os três blocos em x=114, 206,5 e 298, com intervalos irregulares. O ProfileHeader usa um gap fixo de 61px, o que reproduz a distância média; o StatTile isolado não impõe espaçamento.',
        },
        {
          subject: 'Não interativo',
          detail:
            'as métricas do arquivo não têm estado de toque. O componente não é um botão, para não prometer uma navegação que o design não descreve.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Valor', role: 'Número em Bold 17.', token: '--tik-font-heading-* · --tik-color-text-primary' },
        { name: 'Rótulo', role: 'Nome da métrica em Regular 13.', token: '--tik-font-meta-* · --tik-color-text-secondary' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="As três métricas do arquivo" surface="chrome" gap={61}>
      {tikProfileStats.map((stat) => (
        <StatTile key={String(stat.label)} value={stat.value} label={stat.label} />
      ))}
    </TikDocStage>
    <TikDocStage label="Valores longos e abreviados" surface="chrome" gap={40}>
      <StatTile value="1.2M" label="Followers" />
      <StatTile value="328.7K" label="Likes" />
      <StatTile value="0" label="Following" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha a ordem seguindo → seguidores → curtidas.',
        'Abrevie números grandes (1.2M, 328.7K), como o arquivo faz nos contadores do feed.',
        'Envolva o StatTile em um botão quando a métrica levar a uma lista.',
      ]}
      donts={[
        'Não use cor de destaque no valor: a hierarquia vem do peso.',
        'Não troque a ordem das métricas.',
        'Não use o StatTile fora do contexto de perfil — o feed usa a ActionRail.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher>
      {() => (
        <>
          {tikProfileStats.map((stat) => (
            <StatTile key={String(stat.label)} value={stat.value} label={stat.label} />
          ))}
        </>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="StatTile"
      rows={[
        {
          name: 'value',
          type: "React.ReactNode",
          description:
            'Valor da métrica, em Bold 17.',
        },
        {
          name: 'label',
          type: "React.ReactNode",
          description:
            'Rótulo da métrica, em Regular 13.',
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
  render: () => <StatTileDocumentationPage />,
};

/**
 * Playground com 100% das props do StatTile expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StatTile',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <StatTile {...args} />
    </div>
  ),
};

/**
 * Réplica visual do bloco de métricas do frame “TikTok User”.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 61,
        justifyContent: 'center',
        width: 414,
        padding: '24px 0',
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      {tikProfileStats.map((stat) => (
        <StatTile key={String(stat.label)} value={stat.value} label={stat.label} />
      ))}
    </div>
  ),
};

/**
 * Valores curtos, abreviados e zerados.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 40,
        padding: 32,
        background: 'var(--tik-color-surface-primary)',
      }}
    >
      <StatTile value="14" label="Following" />
      <StatTile value="1.2M" label="Followers" />
      <StatTile value="328.7K" label="Likes" />
      <StatTile value="0" label="Vídeos" />
    </div>
  ),
};
