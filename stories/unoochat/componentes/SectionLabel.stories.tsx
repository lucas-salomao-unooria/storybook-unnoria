import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import { SectionLabel, StatusListItem } from '../../../src/unoochat';
import { uncStatusRecent, uncStatusViewed } from '../fixtures';

const BAR = '#716C98';

/**
 * Os dois agrupamentos da aba Status: atualizações recentes e já visualizadas.
 */
const StatusGroups: React.FC = () => (
  <div style={{ width: 411 }}>
    <SectionLabel>Atualizações recentes</SectionLabel>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {uncStatusRecent.slice(0, 2).map((item) => (
        <StatusListItem
          key={item.id}
          name={item.name}
          timestamp={item.timestamp}
          avatarSrc={item.avatarSrc}
        />
      ))}
    </ul>
    <SectionLabel>Atualizações visualizadas</SectionLabel>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {uncStatusViewed.slice(0, 2).map((item, index, all) => (
        <StatusListItem
          key={item.id}
          state="viewed"
          name={item.name}
          timestamp={item.timestamp}
          avatarSrc={item.avatarSrc}
          divider={index < all.length - 1}
        />
      ))}
    </ul>
  </div>
);

/**
 * Página de documentação rica do componente SectionLabel.
 */
const SectionLabelDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Estrutura"
      title="SectionLabel"
      description="Rótulo que agrupa blocos de conteúdo em listas, como “Atualizações recentes” e “Atualizações visualizadas” na aba Status. Usa Open Sans 600 de 14px em --unc-color-text-secondary, alinhado à calha de 19px. Funciona nos temas claro e escuro."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🏷️" title="Separador semântico">
        Divide uma mesma lista em blocos com significados diferentes, sem introduzir uma superfície
        nova nem um divisor horizontal.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Tom secundário">
        Usa <code>--unc-color-text-secondary</code> (#475157 no claro, #CBD4D6 no escuro), o tom
        reservado a elementos de estrutura, não de conteúdo.
      </UncDocCard>
      <UncDocCard icon="📐" title="Alinhado à calha das listas">
        Compartilha <code>--unc-gutter</code> (19px) com o <code>ListItem</code>, de modo que o
        rótulo se alinhe ao avatar das linhas abaixo.
      </UncDocCard>
      <UncDocCard icon="♿" title="Cabeçalho de nível 2">
        É marcado como <code>role=&quot;heading&quot;</code> com <code>aria-level=2</code>: leitores
        de tela navegam pelos agrupamentos. Cada grupo deve ser uma lista separada.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="SectionLabel"
      layout="Rótulo · largura total"
      specs={[
        { label: 'Tipografia', value: 'Open Sans 600 · 14/20px (--unc-font-section-*)' },
        { label: 'Cor', value: '--unc-color-text-secondary · #475157 · #CBD4D6' },
        { label: 'Calha', value: '19px (--unc-gutter)' },
        { label: 'Espaço acima', value: '16px (--unc-spacing-l)' },
        { label: 'Espaço abaixo', value: '8px (--unc-spacing-xs)' },
        { label: 'Semântica', value: 'heading · nível 2' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Contraste do rótulo',
          detail:
            '--unc-color-text-secondary mede 8,13:1 sobre o canvas no tema claro e 12,09:1 no escuro, acima dos 4,5:1 exigidos para texto normal.',
        },
        {
          subject: 'Degrau tipográfico próprio',
          detail:
            'o rótulo usa Section (14px, peso 600), o degrau de origem --unooria-size-body-xs com peso semibold da Plataforma Unooria, para se distinguir das linhas sem depender de caixa alta.',
        },
        {
          subject: 'Espaçamento vertical do módulo',
          detail:
            '16px acima e 8px abaixo vêm da escala de espaçamento do módulo (spacing-l e spacing-xs): a distância que separa o grupo anterior sem colar o rótulo no próximo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        {
          name: 'Contêiner',
          role: 'Bloco de largura total alinhado à calha das listas.',
          token: '--unc-gutter',
        },
        {
          name: 'Rótulo',
          role: 'Texto do agrupamento em caixa mista.',
          token: '--unc-font-section-* · --unc-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de uso"
      description="Dois agrupamentos da aba Status, cada um numa lista própria."
    />
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <StatusGroups />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Colocar o rótulo imediatamente antes da lista que ele descreve.',
        'Usar uma <ul> distinta por agrupamento.',
        'Manter o texto curto, de duas ou três palavras.',
        'Preservar a cor --unc-color-text-secondary para diferenciar estrutura de conteúdo.',
      ]}
      donts={[
        'Aplicar o rótulo dentro da mesma <ul> das linhas.',
        'Usar caixa alta: o rótulo é escrito em caixa mista.',
        'Trocar por outro nível de cabeçalho sem revisar a hierarquia da página.',
        'Adicionar divisor ou superfície própria ao rótulo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: o rótulo acompanha o tom secundário de cada tema."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {() => (
        <div style={{ width: 411 }}>
          <SectionLabel>Atualizações recentes</SectionLabel>
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
      title="SectionLabel"
      rows={[
        { name: 'children', type: 'React.ReactNode', description: 'Texto do rótulo. Obrigatório.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SectionLabel> = {
  title: 'Unoochat/Componentes/SectionLabel',
  component: SectionLabel,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { control: 'text', description: 'Texto do rótulo.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: { children: 'Atualizações recentes' },
};

export default meta;

type Story = StoryObj<typeof SectionLabel>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SectionLabelDocumentationPage />,
};

/**
 * Playground com 100% das props do SectionLabel expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SectionLabel',
  render: (args) => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <div style={{ width: 411 }}>
        <SectionLabel {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Os dois agrupamentos da aba Status.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <StatusGroups />
    </UncDocStage>
  ),
};
