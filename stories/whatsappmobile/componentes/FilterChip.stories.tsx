import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import { FilterChip, waIconNames } from '../../../src/whatsappmobile';
import { waSearchFilters } from '../fixtures';

const BAR = '#0CA996';

/**
 * Conjunto de filtros com seleção múltipla controlada.
 */
const FilterRow: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(['photos']);

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxWidth: 373 }}>
      {waSearchFilters.map((filter) => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          selected={selected.includes(filter.id)}
          onClick={() => toggle(filter.id)}
        />
      ))}
    </div>
  );
};

/**
 * Página de documentação rica do componente FilterChip.
 */
const FilterChipDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Controles"
      title="FilterChip"
      description="Filtro de tipo de mídia da busca em conversas. Reproduz a cápsula de 28px em --wa-color-surface-sheet com rótulo de 15px em --wa-color-text-settings; quando aplicado, assume --wa-color-accent com o numeral escuro do arquivo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🏷️" title="Seis filtros do arquivo">
        Photos, Vidoes, Links, Gifs, Audio e Documents — a grafia &quot;Vidoes&quot; é o texto
        original do arquivo comunitário e foi preservada nas fixtures.
      </WaDocCard>
      <WaDocCard icon="🔀" title="Seleção múltipla">
        Os filtros são independentes: o consumidor controla o conjunto aplicado, como no exemplo
        interativo abaixo.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Superfície de folha">
        Compartilha <code>--wa-color-surface-sheet</code> com o compositor e a folha de anexos,
        marcando controles sobre a barra.
      </WaDocCard>
      <WaDocCard icon="🖼️" title="Glifo opcional">
        O arquivo desenha um ícone antes de cada rótulo. A prop <code>icon</code> aceita qualquer
        glifo do registro oficial.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:1916"
      frameName="Search in chats · chips de filtro"
      specs={[
        { label: 'Altura', value: '28 px' },
        { label: 'Raio', value: 'total (cápsula)' },
        { label: 'Superfície', value: '#2D383E' },
        { label: 'Rótulo', value: 'PT Sans 400 · 15px · #C5CED3' },
        { label: 'Espaço entre chips', value: '10 px' },
        { label: 'Ocorrências', value: '6' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Glifos dos filtros',
          detail:
            'os ícones dentro dos chips foram achatados no export do arquivo, sem vetor recuperável. O componente deixa `icon` opcional e a documentação exibe os chips sem glifo, em vez de desenhar ícones à mão.',
        },
        {
          subject: 'Estado aplicado',
          detail:
            'o arquivo desenha todos os chips no estado inativo. O estado selecionado (--wa-color-accent com texto escuro) é uma extensão da biblioteca, coerente com o selo de não lidas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Superfície de 28px com raio total.', token: '--wa-color-surface-sheet · --wa-radius-full' },
        { name: 'Glifo', role: 'Ícone opcional antes do rótulo.', token: 'prop icon' },
        { name: 'Rótulo', role: 'Nome do filtro.', token: '--wa-font-body-sm-* · --wa-color-text-settings' },
        { name: 'Estado aplicado', role: 'Inversão para verde-água com texto escuro.', token: '--wa-color-accent · --wa-color-text-on-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <WaDocStage surface="appbar" padding={24} gap={12}>
      <FilterChip label="Photos" />
      <FilterChip label="Photos" selected />
      <FilterChip label="Documents" icon="filePdf" />
      <FilterChip label="Audio" icon="micBody" selected />
      <FilterChip label="Links" disabled />
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Conjunto interativo"
      description="Seleção múltipla com os seis filtros do arquivo."
    />
    <WaDocStage surface="appbar" padding={24} align="flex-start">
      <FilterRow />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Manter os filtros em uma faixa sobre a superfície de app bar, com 10px entre eles.',
        'Permitir seleção múltipla, já que os tipos de mídia são independentes.',
        'Refletir o estado aplicado em aria-pressed, como o componente já faz.',
        'Deixar os chips quebrarem em duas linhas quando não couberem em 411px.',
      ]}
      donts={[
        'Tratar os filtros como seleção exclusiva.',
        'Usar o chip para navegação: ele filtra, não navega.',
        'Aplicar cores de ação da folha de anexos aos chips.',
        'Desenhar glifos à mão para os filtros cujo vetor não existe no arquivo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['appbar', 'canvas', 'base']} initial="appbar">
      {() => (
        <>
          <FilterChip label="Photos" />
          <FilterChip label="Links" selected />
        </>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="FilterChip"
      rows={[
        { name: 'label', type: 'string', description: 'Rótulo do filtro. Obrigatório.' },
        { name: 'icon', type: 'WaIconName', description: 'Glifo exibido antes do rótulo.' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'Indica se o filtro está aplicado.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o chip.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de alternância.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof FilterChip> = {
  title: 'Whatsapp Mobile/Componentes/FilterChip',
  component: FilterChip,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo do filtro.' },
    icon: { control: 'select', options: [undefined, ...waIconNames], description: 'Glifo antes do rótulo.' },
    selected: { control: 'boolean', description: 'Filtro aplicado.' },
    disabled: { control: 'boolean', description: 'Desabilita o chip.' },
  },
  args: { label: 'Photos', icon: undefined, selected: false, disabled: false },
};

export default meta;

type Story = StoryObj<typeof FilterChip>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <FilterChipDocumentationPage />,
};

/**
 * Playground com 100% das props do FilterChip expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do FilterChip',
  render: (args) => (
    <WaDocStage surface="appbar" padding={32}>
      <FilterChip {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica da faixa de filtros do frame de busca em conversas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="appbar" padding={20} align="flex-start">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxWidth: 373 }}>
        {waSearchFilters.map((filter) => (
          <FilterChip key={filter.id} label={filter.label} />
        ))}
      </div>
    </WaDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="appbar" padding={24} gap={12}>
      <FilterChip label="Inativo" />
      <FilterChip label="Aplicado" selected />
      <FilterChip label="Desabilitado" disabled />
      <FilterChip label="Com glifo" icon="filePdf" />
    </WaDocStage>
  ),
};

/**
 * Conjunto interativo com seleção múltipla.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <WaDocStage surface="appbar" padding={24} align="flex-start">
      <FilterRow />
    </WaDocStage>
  ),
};
