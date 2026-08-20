import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SegmentedTabs } from '../../../src/instanooria/components/SegmentedTabs';
import { MediaGrid } from '../../../src/instanooria/components/MediaGrid';
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
 * Segmentos textuais da tela de atividade.
 */
const TEXT_SEGMENTS = [
  { id: 'following', label: 'Seguindo' },
  { id: 'you', label: 'Você' },
];

/**
 * Segmentos de ícone das abas do perfil.
 */
const ICON_SEGMENTS = [
  { id: 'grid', label: 'Publicações em grade', icon: 'grid' as const },
  { id: 'tagged', label: 'Publicações em que você foi marcado', icon: 'tagged' as const },
];

/**
 * Página de documentação rica do componente SegmentedTabs.
 */
const SegmentedTabsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Navegação"
      title="SegmentedTabs"
      description="Alternância entre seções de uma mesma tela. Cobre a variante textual “Seguindo / Você” da tela de atividade e a variante de ícones (grade e marcações) do perfil, ambas com faixa de 44px e indicador inferior de 1px sobre o segmento ativo."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Duas variantes, mesma mecânica de indicador."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🔤" title="Variante text">
        Rótulos textuais em Title/Small. O segmento inativo usa{' '}
        <code>--insta-color-icon-secondary</code>, criando contraste sem mudar o peso da fonte.
      </InstaDocCard>
      <InstaDocCard icon="🔳" title="Variante icon">
        Apenas glifos de 23px. O rótulo textual continua existindo como{' '}
        <code>aria-label</code>, garantindo acessibilidade.
      </InstaDocCard>
      <InstaDocCard icon="➖" title="Indicador de 1px">
        O segmento ativo recebe um traço inferior de 1px na cor do texto primário — não há
        preenchimento nem cor de destaque.
      </InstaDocCard>
      <InstaDocCard icon="📐" title="Segmentos equilibrados">
        Todos os segmentos dividem a largura igualmente com <code>flex: 1</code>, replicando os dois
        blocos de 186px do arquivo.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Medidas lidas dos frames Tabs do perfil e Following/You da atividade."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2680"
      frameName="Instagram Profile → Tabs"
      specs={[
        { label: 'Altura', value: '44px' },
        { label: 'Largura por segmento', value: '186px (de 375px)' },
        { label: 'Indicador ativo', value: '1px' },
        { label: 'Glifo', value: '22.5–24px' },
        { label: 'Tipografia', value: 'Title/Small · 14px' },
        { label: 'Divisor', value: 'hairline inferior' },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia e Matriz de Variantes"
      description="As duas variantes com o primeiro e o segundo segmento ativos."
    />
    <InstaDocStage label="Variante text" align="flex-start" padding={0}>
      <div style={{ width: 375, display: 'grid', gap: 16 }}>
        <SegmentedTabs items={TEXT_SEGMENTS} activeId="following" ariaLabel="Atividade" />
        <SegmentedTabs items={TEXT_SEGMENTS} activeId="you" ariaLabel="Atividade" />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Variante icon" align="flex-start" padding={0}>
      <div style={{ width: 375, display: 'grid', gap: 16 }}>
        <SegmentedTabs
          items={ICON_SEGMENTS}
          activeId="grid"
          variant="icon"
          ariaLabel="Seções do perfil"
        />
        <SegmentedTabs
          items={ICON_SEGMENTS}
          activeId="tagged"
          variant="icon"
          ariaLabel="Seções do perfil"
        />
      </div>
    </InstaDocStage>

    <InstaDocStage label="Com três segmentos" align="flex-start" padding={0}>
      <div style={{ width: 375 }}>
        <SegmentedTabs
          items={[
            { id: 'posts', label: 'Publicações' },
            { id: 'reels', label: 'Vídeos' },
            { id: 'tagged', label: 'Marcações' },
          ]}
          activeId="reels"
        />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Boas Práticas"
      description="Regras de segmentação verificadas contra o arquivo de design."
    />
    <InstaDocPractices
      dos={[
        'Manter entre dois e três segmentos: acima disso, use uma faixa de chips.',
        'Fornecer label textual mesmo na variante icon — ele vira o aria-label.',
        'Colocar a seção padrão no primeiro segmento, à esquerda.',
        'Trocar o conteúdo abaixo imediatamente, sem transição de página.',
      ]}
      donts={[
        'Usar cor de destaque no segmento ativo em vez do traço de 1px.',
        'Misturar rótulos textuais e glifos na mesma faixa.',
        'Aplicar segmentos com larguras diferentes entre si.',
        'Usar SegmentedTabs para navegação entre telas — isso é papel da TabBar.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="5. Suporte a Temas"
      description="O indicador e o texto ativo acompanham --insta-color-text-primary."
    />
    <InstaDocThemeSwitcher padding={0}>
      {(activeTheme) => (
        <div style={{ width: 375, display: 'grid', gap: 16 }}>
          <SegmentedTabs items={TEXT_SEGMENTS} activeId="you" theme={activeTheme} />
          <SegmentedTabs
            items={ICON_SEGMENTS}
            activeId="grid"
            variant="icon"
            theme={activeTheme}
          />
        </div>
      )}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="6. Referência Completa de Props da API"
      description="Contrato público do componente SegmentedTabs."
    />
    <InstaDocPropsTable
      title="SegmentedTabs"
      rows={[
        { name: 'items', type: 'InstaSegmentItem[]', description: 'Segmentos exibidos. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'Identificador do segmento ativo. Obrigatório.' },
        {
          name: 'onChange',
          type: '(id: string, item: InstaSegmentItem, index: number) => void',
          description: 'Callback disparado ao selecionar um segmento.',
        },
        {
          name: 'variant',
          type: "'text' | 'icon'",
          default: "'text'",
          description: 'Conteúdo dos segmentos: rótulo textual ou glifo.',
        },
        {
          name: 'ariaLabel',
          type: 'string',
          default: "'Seções'",
          description: 'Rótulo acessível do grupo de abas.',
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
      title="InstaSegmentItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do segmento.' },
        {
          name: 'label',
          type: 'string',
          description: 'Rótulo textual ou, na variante icon, o rótulo acessível.',
        },
        {
          name: 'icon',
          type: 'InstaIconName',
          description: 'Glifo exibido no lugar do rótulo na variante icon.',
        },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Instanooria/Componentes/SegmentedTabs',
  component: SegmentedTabs,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Segmentos exibidos.' },
    activeId: { control: 'text', description: 'Identificador do segmento ativo.' },
    variant: {
      control: 'radio',
      options: ['text', 'icon'],
      description: 'Conteúdo dos segmentos.',
    },
    ariaLabel: { control: 'text', description: 'Rótulo acessível do grupo.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    items: TEXT_SEGMENTS,
    activeId: 'following',
    variant: 'text',
    ariaLabel: 'Atividade',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedTabs>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SegmentedTabsDocumentationPage />,
};

/**
 * Playground com todas as propriedades do SegmentedTabs expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SegmentedTabs',
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
      <SegmentedTabs {...args} />
    </div>
  ),
};

/**
 * Abas do perfil alternando a grade abaixo, réplica do arquivo oficial do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => {
    const ProfileTabs = () => {
      const [active, setActive] = useState('grid');

      return (
        <div style={{ width: 375, border: '1px solid #E4E8E9', borderRadius: 12, overflow: 'hidden' }}>
          <SegmentedTabs
            items={ICON_SEGMENTS}
            activeId={active}
            variant="icon"
            ariaLabel="Seções do perfil"
            onChange={(id) => setActive(id)}
          />
          {active === 'grid' ? (
            <MediaGrid items={instaGridItems} />
          ) : (
            <div
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                fontSize: 13,
                color: '#8E8E93',
              }}
            >
              Nenhuma publicação com marcação ainda.
            </div>
          )}
        </div>
      );
    };

    return <ProfileTabs />;
  },
};

/**
 * Matriz completa de variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ width: 375, display: 'grid', gap: 20 }}>
      <SegmentedTabs items={TEXT_SEGMENTS} activeId="following" />
      <SegmentedTabs items={TEXT_SEGMENTS} activeId="you" />
      <SegmentedTabs items={ICON_SEGMENTS} activeId="grid" variant="icon" />
      <SegmentedTabs items={ICON_SEGMENTS} activeId="tagged" variant="icon" />
    </div>
  ),
};
