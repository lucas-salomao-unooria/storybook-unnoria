import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { ProfileTabs } from '../../../src/tiktooria';
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

const meta: Meta<typeof ProfileTabs> = {
  title: 'Tik Tooria/Componentes/ProfileTabs',
  component: ProfileTabs,
  parameters: { layout: 'padded' },
  argTypes: {
    active: { control: 'select', options: ['grid', 'liked'] },
    className: { control: 'text' },
  },
  args: {
    active: 'grid',
  },
};

export default meta;

type Story = StoryObj<typeof ProfileTabs>;


const ProfileTabsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Perfil"
      title="ProfileTabs"
      description="Faixa de 414×40 entre o cabeçalho do perfil e a grade de mídia. A aba ativa recebe o sublinhado de 2px em --tik-color-border-tab-active sobre uma largura de 48px, como no arquivo. A aba de curtidas ocultas é a única do módulo pintada em --tik-color-icon-tab-disabled."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🔲" title="Duas abas">
        Grade de publicações e curtidas ocultas. O arquivo não publica uma terceira.
      </TikDocCard>
      <TikDocCard icon="➖" title="Sublinhado de 48px">
        A marca de seleção não ocupa toda a coluna: são 48px centralizados, medida do nó 4:474.
      </TikDocCard>
      <TikDocCard icon="🚫" title="Aba indisponível">
        As curtidas do perfil de terceiros aparecem com o glifo de coração riscado em <code>#D7D7D9</code>, sem sublinhado.
      </TikDocCard>
      <TikDocCard icon="♿" title="Só glifo">
        As abas não têm rótulo de texto no arquivo, por isso <code>label</code> alimenta o <code>aria-label</code>.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:471"
      frameName="Tabs — TikTok User"
      specs={[
        { label: 'Dimensões', value: '414 × 40' },
        { label: 'Sublinhado', value: '48 × 2 · #161722' },
        { label: 'Glifo ativo', value: '#161722' },
        { label: 'Glifo indisponível', value: '#D7D7D9' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Faixa achatada no arquivo',
          detail:
            'o nó 4:471 é exportado como um único SVG, com o fundo, os dois glifos e o sublinhado fundidos. A reconstrução usa os glifos gridTabs e heartHide, exportados separadamente dos nós 4:475 e 4:473.',
        },
        {
          subject: 'Estados de foco',
          detail:
            'ausentes no arquivo. Anel de 2px em --tik-color-brand-button, recuado para dentro para não vazar da faixa.',
        },
        {
          subject: 'Fio inferior',
          detail:
            'o arquivo aplica um fio de 0,33px sob a faixa. Reproduzido como --tik-elevation-bar-bottom.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        { name: 'Faixa', role: 'Duas colunas iguais de 40px de altura, com fio inferior.', token: '--tik-profiletabs-height · --tik-elevation-bar-bottom' },
        { name: 'Glifo', role: 'Ícone de 16px centralizado na coluna.', token: '--tik-icon-size-sm' },
        { name: 'Sublinhado', role: 'Barra de 48×2 centralizada sob a aba ativa.', token: '--tik-color-border-tab-active' },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Como no arquivo — grade ativa, curtidas indisponíveis" surface="chrome" align="stretch" direction="column" width={414}>
      <ProfileTabs
        active="grid"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
        ]}
      />
    </TikDocStage>
    <TikDocStage label="Curtidas visíveis e ativas" surface="chrome" align="stretch" direction="column" width={414}>
      <ProfileTabs
        active="liked"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'liked', icon: 'heart', label: 'Curtidas' },
        ]}
      />
    </TikDocStage>
    <TikDocStage label="Com marcador como terceira aba" surface="chrome" align="stretch" direction="column" width={414}>
      <ProfileTabs
        active="grid"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'saved', icon: 'bookmark', label: 'Salvos' },
          { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
        ]}
      />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Passe label em toda aba: é o rótulo acessível, já que não há texto visível.',
        'Marque como disabled a aba de curtidas quando o perfil não é o próprio.',
        'Mantenha a faixa entre o cabeçalho do perfil e a grade de mídia.',
      ]}
      donts={[
        'Não estenda o sublinhado a toda a coluna: são 48px no arquivo.',
        'Não acrescente rótulo de texto às abas.',
        'Não use a faixa fora do perfil — o feed usa o FeedHeader.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher surfaces={['chrome', 'sheet']}>
      {() => (
        <div style={{ width: 414 }}>
          <ProfileTabs
            active="grid"
            tabs={[
              { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
              { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
            ]}
          />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="ProfileTabs"
      rows={[
        {
          name: 'tabs',
          type: "TikProfileTab[]",
          description:
            'Abas exibidas. O arquivo publica duas: grade de publicações e curtidas ocultas.',
        },
        {
          name: 'active',
          type: "string",
          description:
            'Identificador da aba ativa.',
        },
        {
          name: 'onSelect',
          type: "(id: string) => void",
          description:
            'Acionado ao selecionar uma aba.',
        },
        {
          name: 'className',
          type: "string",
          description:
            'Classe CSS adicional.',
        },
        {
          name: '...rest',
          type: "Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>",
          description:
            'Demais atributos HTML são repassados ao <nav>.',
        },
      ]}
    />
    <TikDocPropsTable
      title="TikProfileTab"
      rows={[
        {
          name: 'id',
          type: "string",
          description:
            'Identificador da aba.',
        },
        {
          name: 'icon',
          type: "TikIconName",
          description:
            'Glifo da aba.',
        },
        {
          name: 'label',
          type: "string",
          description:
            'Rótulo acessível, já que a aba não tem texto visível.',
        },
        {
          name: 'disabled',
          type: "boolean",
          description:
            'Aba indisponível, pintada em --tik-color-icon-tab-disabled.',
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
  render: () => <ProfileTabsDocumentationPage />,
};

/**
 * Playground com 100% das props do ProfileTabs expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ProfileTabs',
  render: (args) => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ProfileTabs
        {...args}
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
        ]}
      />
    </div>
  ),
};

/**
 * Réplica visual da faixa de abas do frame “TikTok User”.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 414, background: 'var(--tik-color-surface-primary)' }}>
      <ProfileTabs
        active="grid"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
        ]}
      />
    </div>
  ),
};

/**
 * Combinações de abas e disponibilidade.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 414 }}>
      <ProfileTabs
        active="grid"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
        ]}
      />
      <ProfileTabs
        active="liked"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'liked', icon: 'heart', label: 'Curtidas' },
        ]}
      />
      <ProfileTabs
        active="saved"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'saved', icon: 'bookmark', label: 'Salvos' },
          { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
        ]}
      />
    </div>
  ),
};

/**
 * Troca de aba controlada, com o estado mantido pela estória.
 */
export const Estados: Story = {
  render: () => {
    const [active, setActive] = useState('grid');

    return (
      <div style={{ width: 414 }}>
        <ProfileTabs
          active={active}
          onSelect={setActive}
          tabs={[
            { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
            { id: 'saved', icon: 'bookmark', label: 'Salvos' },
            { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
          ]}
        />
        <p
          style={{
            fontFamily: 'var(--tik-font-sans)',
            fontSize: 13,
            color: 'var(--tik-color-text-secondary)',
          }}
        >
          Aba ativa: <strong>{active}</strong>
        </p>
      </div>
    );
  },
};
