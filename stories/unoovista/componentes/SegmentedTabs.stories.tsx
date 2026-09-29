import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SegmentedTabs } from '../../../src/unoovista/components/SegmentedTabs';
import { MediaGrid } from '../../../src/unoovista/components/MediaGrid';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvGridItems } from '../fixtures';

const BAR = '#716C98';

/**
 * Segmentos textuais da tela de atividade.
 */
const TEXT_SEGMENTS = [
  { id: 'following', label: 'Seguindo' },
  { id: 'you', label: 'Você' },
];

const THREE_SEGMENTS = [
  { id: 'all', label: 'Tudo' },
  { id: 'people', label: 'Pessoas' },
  { id: 'places', label: 'Lugares' },
];

/**
 * Segmentos de ícone das abas do perfil.
 */
const ICON_SEGMENTS = [
  { id: 'grid', label: 'Publicações em grade', icon: 'grid' as const },
  { id: 'tagged', label: 'Publicações em que você foi marcado', icon: 'tagged' as const },
];

/**
 * Abas com estado local.
 */
const StatefulTabs: React.FC<
  Omit<React.ComponentProps<typeof SegmentedTabs>, 'activeId'> & { initial?: string }
> = ({ initial, items, ...rest }) => {
  const [active, setActive] = useState(initial ?? items[0].id);

  return <SegmentedTabs {...rest} items={items} activeId={active} onChange={setActive} />;
};

/**
 * Abas do perfil que alternam a grade de publicações abaixo.
 */
const ProfileTabs: React.FC = () => {
  const [active, setActive] = useState('grid');

  return (
    <div style={{ width: 375 }}>
      <SegmentedTabs
        items={ICON_SEGMENTS}
        activeId={active}
        variant="icon"
        ariaLabel="Seções do perfil"
        onChange={setActive}
      />
      {active === 'grid' ? (
        <div style={{ paddingTop: 'var(--unv-spacing-3xs)' }}>
          <MediaGrid items={unvGridItems} />
        </div>
      ) : (
        <p
          style={{
            margin: 0,
            padding: '48px 24px',
            textAlign: 'center',
            fontFamily: 'var(--unv-font-sans)',
            fontSize: 14,
            color: 'var(--unv-color-text-secondary)',
          }}
        >
          Nenhuma publicação com marcação ainda.
        </p>
      )}
    </div>
  );
};

/**
 * Página de documentação rica do componente SegmentedTabs.
 */
const SegmentedTabsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Navegação"
      title="SegmentedTabs"
      description="Alternância entre seções de uma mesma tela, em rótulos de texto ou só em glifos. Os segmentos têm largura igual e um traço grosso de ação, com pontas arredondadas, desliza de um ao outro sob o segmento ativo."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Duas variantes, a mesma mecânica de indicador."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🔤" title="Variante text">
        Rótulos em <code>title-sm</code>. O segmento inativo usa <code>text-secondary</code> e o
        ativo, <code>text-primary</code>, além do traço.
      </UnvDocCard>
      <UnvDocCard icon="🔳" title="Variante icon">
        Só glifos de 24px; o glifo ativo é preenchido. O <code>label</code> do item vira o nome
        acessível.
      </UnvDocCard>
      <UnvDocCard icon="〰️" title="Traço deslizante">
        O indicador de 3px em <code>action-primary</code> se move por <code>transform</code>; a
        posição vem de duas variáveis CSS e a animação para com movimento reduzido.
      </UnvDocCard>
      <UnvDocCard icon="⌨️" title="Teclado">
        Padrão ARIA de abas: ←, → , Home e End movem a seleção e o foco; só a aba ativa entra na
        sequência de Tab.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="SegmentedTabs"
      layout="Faixa · 44px"
      specs={[
        { label: 'Altura', value: '44px (alvo de toque)' },
        { label: 'Segmentos', value: 'largura igual, 1fr' },
        { label: 'Indicador', value: '3px · raio total · --unv-color-action-primary' },
        { label: 'Fio de base', value: '1px · --unv-color-border-subtle' },
        { label: 'Rótulo', value: 'title-sm · Open Sans 600 · 14/20px' },
        { label: 'Glifo', value: '24px' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Traço grosso, não segmento elevado',
          detail:
            'a alternativa era um segmento branco deslizante sobre uma trilha em cápsula. Medido, --unv-color-background-elevated sobre --unv-color-fill-field dá 1,15:1 no claro e 1,00:1 no escuro (as duas superfícies coincidem em brandpurple-800), abaixo dos 3:1 que a seleção precisa. O traço de --unv-color-action-primary mede 4,88:1 (claro) e 7,70:1 (escuro) sobre a superfície primária, e 4,54:1 e 8,27:1 sobre a secundária.',
        },
        {
          subject: 'Seleção também por texto e glifo',
          detail:
            'além do traço, o rótulo ativo passa a --unv-color-text-primary e o glifo ativo é preenchido; a seleção não depende só da cor.',
        },
        {
          subject: 'Posição por variáveis CSS',
          detail:
            'os segmentos têm largura igual, então o indicador se posiciona por --unv-segmented-count e --unv-segmented-index, sem medir o DOM.',
        },
        {
          subject: 'Faixa transparente, alvo de 44px',
          detail:
            'a faixa assenta na camada em que estiver; a altura é --unv-touch-target. O hover mostra --unv-color-fill-field.',
        },
        {
          subject: 'Tema herdado',
          detail: 'theme deixou de ter padrão "light": sem a prop, herda data-unv-theme do contêiner.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UnvDocAnatomy
      zones={[
        { name: 'Faixa (tablist)', role: 'Contêiner de segmentos iguais, com fio de 1px na base.', token: '--unv-color-border-subtle' },
        { name: 'Segmento (tab)', role: 'Botão de 44px com texto ou glifo.', token: '--unv-color-text-secondary | -primary' },
        { name: 'Indicador', role: 'Traço de 3px que desliza sob o segmento ativo.', token: '--unv-color-action-primary · --unv-transition-base' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Texto e ícone, dois e três segmentos, nos dois temas."
    />
    <UnvDocStage label="Texto · segmento 1" align="stretch" width={375} padding={0}>
      <SegmentedTabs items={TEXT_SEGMENTS} activeId="following" />
    </UnvDocStage>
    <UnvDocStage label="Texto · segmento 2" align="stretch" width={375} padding={0}>
      <SegmentedTabs items={TEXT_SEGMENTS} activeId="you" />
    </UnvDocStage>
    <UnvDocStage label="Três segmentos" align="stretch" width={375} padding={0}>
      <SegmentedTabs items={THREE_SEGMENTS} activeId="people" />
    </UnvDocStage>
    <UnvDocStage label="Ícones" align="stretch" width={375} padding={0}>
      <SegmentedTabs items={ICON_SEGMENTS} activeId="tagged" variant="icon" />
    </UnvDocStage>
    <UnvDocStage label="Tema escuro" theme="dark" align="stretch" width={375} padding={0}>
      <SegmentedTabs items={THREE_SEGMENTS} activeId="places" />
    </UnvDocStage>
    <UnvDocStage label="Demonstração interativa (perfil)" align="stretch" padding={0}>
      <ProfileTabs />
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Usar de dois a quatro segmentos, todos com largura igual.',
        'Dar a cada item de ícone um label descritivo: ele é o nome acessível.',
        'Manter os rótulos curtos, de uma palavra sempre que possível.',
        'Informar activeId de um item existente em items.',
      ]}
      donts={[
        'Misturar texto e glifo na mesma faixa.',
        'Usar a faixa como navegação principal do produto (para isso existe o TabBar).',
        'Indicar o segmento ativo só por cor.',
        'Acrescentar tantos segmentos que o rótulo trunque.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Texto, fio e traço seguem os tokens do tema ativo."
    />
    <UnvDocThemeSwitcher padding={0}>
      {() => (
        <div style={{ width: 375 }}>
          <StatefulTabs items={THREE_SEGMENTS} initial="all" />
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="SegmentedTabs"
      rows={[
        { name: 'items', type: 'UnvSegmentItem[]', description: 'Segmentos exibidos. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'Identificador do segmento ativo. Obrigatório.' },
        { name: 'onChange', type: '(id, item, index) => void', description: 'Chamado ao selecionar, por clique ou teclado.' },
        { name: 'variant', type: "'text' | 'icon'", default: "'text'", description: 'Texto ou glifo.' },
        { name: 'ariaLabel', type: 'string', default: "'Seções'", description: 'Nome acessível do grupo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UnvDocPropsTable
      title="UnvSegmentItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do segmento.' },
        { name: 'label', type: 'string', description: 'Rótulo (texto ou nome acessível).' },
        { name: 'icon', type: 'UnvIconName', description: 'Glifo da variante icon.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Unoovista/Componentes/SegmentedTabs',
  component: SegmentedTabs,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Segmentos exibidos.' },
    activeId: { control: 'text', description: 'Identificador do segmento ativo.' },
    onChange: { action: 'onChange', description: 'Chamado ao selecionar um segmento.' },
    variant: { control: 'radio', options: ['text', 'icon'], description: 'Texto ou glifo.' },
    ariaLabel: { control: 'text', description: 'Nome acessível do grupo.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    items: TEXT_SEGMENTS,
    activeId: 'following',
    variant: 'text',
    ariaLabel: 'Seções',
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedTabs>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SegmentedTabsDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SegmentedTabs',
  render: (args) => (
    <UnvDocStage align="stretch" width={375} padding={0} theme={args.theme}>
      <SegmentedTabs {...args} />
    </UnvDocStage>
  ),
};

/**
 * Abas do perfil que alternam a grade de publicações.
 */
export const ExemploPerfil: Story = {
  name: '🎨 Exemplo das Abas do Perfil',
  render: () => (
    <UnvDocStage align="stretch" padding={0}>
      <ProfileTabs />
    </UnvDocStage>
  ),
};

/**
 * Matriz completa de variantes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UnvDocStage align="stretch" direction="column" gap={20} width={375}>
      <SegmentedTabs items={TEXT_SEGMENTS} activeId="following" />
      <SegmentedTabs items={TEXT_SEGMENTS} activeId="you" />
      <SegmentedTabs items={THREE_SEGMENTS} activeId="places" />
      <SegmentedTabs items={ICON_SEGMENTS} activeId="grid" variant="icon" />
      <SegmentedTabs items={ICON_SEGMENTS} activeId="tagged" variant="icon" />
    </UnvDocStage>
  ),
};

/**
 * Estados: interativo (setas do teclado), sem segmento ativo e no tema escuro.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ width: 375, display: 'grid', gap: 20 }}>
      <UnvDocStage label="Interativo (use as setas)" align="stretch" direction="column" gap={20}>
        <StatefulTabs items={THREE_SEGMENTS} />
        <SegmentedTabs items={THREE_SEGMENTS} activeId="nenhum" />
      </UnvDocStage>
      <UnvDocStage label="Tema escuro" theme="dark" align="stretch" padding={0}>
        <StatefulTabs items={THREE_SEGMENTS} initial="people" />
      </UnvDocStage>
    </div>
  ),
};
