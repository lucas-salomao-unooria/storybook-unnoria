import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { FilterChip, uncIconNames, type UncIconName } from '../../../src/unoochat';
import { uncSearchFilters } from '../fixtures';

const BAR = '#716C98';

/**
 * Glifo de cada filtro da busca. GIFs não tem glifo próprio na biblioteca de
 * ícones da Unooria e fica sem ícone.
 */
const FILTER_ICONS: Record<string, UncIconName | undefined> = {
  photos: 'gallery',
  videos: 'videoCall',
  links: 'attach',
  gifs: undefined,
  audio: 'audio',
  documents: 'document',
};

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
      {uncSearchFilters.map((filter) => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          icon={FILTER_ICONS[filter.id]}
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
      badgeBrand="Unoochat"
      category="Componentes • Controles"
      title="FilterChip"
      description="Filtro de tipo de conteúdo da busca em conversas. Cápsula de 28px em --unc-color-surface-sheet, com glifo opcional de 16px e rótulo de 14px em --unc-color-text-primary; quando aplicado, assume --unc-color-accent com o texto em --unc-color-text-on-accent, nos dois temas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🏷️" title="Seis filtros de busca">
        Fotos, Vídeos, Links, GIFs, Áudios e Documentos: os tipos de conteúdo que a busca em
        conversas separa. O conteúdo de demonstração vem de <code>uncSearchFilters</code>.
      </UncDocCard>
      <UncDocCard icon="🔀" title="Seleção múltipla">
        Os filtros são independentes: o consumidor controla o conjunto aplicado, como no exemplo
        interativo abaixo.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Superfície de folha">
        Compartilha <code>--unc-color-surface-sheet</code> com o compositor e a folha de anexos:
        <code> #EFEEF5</code> no claro e <code>#34375C</code> no escuro.
      </UncDocCard>
      <UncDocCard icon="🖼️" title="Glifo opcional">
        A prop <code>icon</code> aceita qualquer glifo do registro <code>uncIcons</code>. Os filtros
        usam <code>gallery</code>, <code>videoCall</code>, <code>attach</code>, <code>audio</code> e{' '}
        <code>document</code>; GIFs fica sem glifo.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="FilterChip"
      layout="Cápsula · 28px"
      specs={[
        { label: 'Altura', value: '28 px' },
        { label: 'Raio', value: 'total (cápsula)' },
        { label: 'Superfície', value: '--unc-color-surface-sheet' },
        { label: 'Rótulo', value: 'Open Sans 400 · 14px' },
        { label: 'Glifo', value: '16 px · herda a cor do rótulo' },
        { label: 'Espaço entre chips', value: '10 px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Glifos dos filtros',
          detail:
            'cada filtro usa um glifo do registro `uncIcons` (Material Symbols Rounded): Fotos = `gallery`, Vídeos = `videoCall`, Links = `attach`, Áudios = `audio` e Documentos = `document`. GIFs não tem equivalente no quadro de ícones da Unooria e fica sem glifo, em vez de receber um desenhado à mão.',
        },
        {
          subject: 'Estado aplicado',
          detail:
            'o chip aplicado inverte para `--unc-color-accent` com `--unc-color-text-on-accent` (branco sobre `#716C98` no claro; `#080922` sobre `#AAA5C2` no escuro). O par mede acima de 4,5:1 nos dois temas e é coerente com o selo de não lidas.',
        },
        {
          subject: 'Glifo herda a cor do rótulo',
          detail:
            'o glifo usa `tone="inherit"`: acompanha o texto primário no chip inativo e o texto sobre acento no chip aplicado, sem token próprio.',
        },
        {
          subject: 'Desabilitado a 50% de opacidade',
          detail:
            'a prop `disabled` desativa o botão nativo e o chip fica a 50% de opacidade, com cursor `not-allowed`, sem cor nova: o estado é apagado sobre a mesma superfície. Componente inativo é isento do contraste mínimo de texto, mas o chip continua legível.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Cápsula', role: 'Superfície de 28px com raio total.', token: '--unc-color-surface-sheet · --unc-radius-full' },
        { name: 'Glifo', role: 'Glifo opcional de 16px antes do rótulo, herdando a cor do texto.', token: 'prop icon · currentColor' },
        { name: 'Rótulo', role: 'Nome do filtro, em Open Sans 14px.', token: '--unc-font-body-sm-* · --unc-color-text-primary' },
        { name: 'Estado aplicado', role: 'Inversão para a cor de acento, com texto de contraste.', token: '--unc-color-accent · --unc-color-text-on-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="appbar"
        padding={24}
        gap={12}
      >
        <FilterChip label="Fotos" />
        <FilterChip label="Fotos" icon="gallery" selected />
        <FilterChip label="Documentos" icon="document" />
        <FilterChip label="Áudios" icon="audio" selected />
        <FilterChip label="Links" icon="attach" disabled />
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Conjunto interativo"
      description="Seleção múltipla com os seis filtros da busca."
    />
    <UncDocStage surface="appbar" padding={24} align="flex-start">
      <FilterRow />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Manter os filtros em uma faixa sobre a superfície de app bar, com 10px entre eles.',
        'Permitir seleção múltipla, já que os tipos de mídia são independentes.',
        'Refletir o estado aplicado em aria-pressed, como o componente já faz.',
        'Deixar os chips quebrarem em duas linhas quando não couberem na largura da tela.',
      ]}
      donts={[
        'Tratar os filtros como seleção exclusiva.',
        'Usar o chip para navegação: ele filtra, não navega.',
        'Aplicar cores de ação da folha de anexos aos chips.',
        'Desenhar glifos à mão para os filtros que não têm equivalente na biblioteca de ícones.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: a superfície de folha, o acento e o texto acompanham."
    />
    <UncDocThemeSwitcher surface="appbar">
      {() => (
        <>
          <FilterChip label="Fotos" icon="gallery" />
          <FilterChip label="Links" icon="attach" selected />
        </>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="FilterChip"
      rows={[
        { name: 'label', type: 'string', description: 'Rótulo do filtro. Obrigatório.' },
        { name: 'icon', type: 'UncIconName', description: 'Glifo do registro uncIcons exibido antes do rótulo.' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'Indica se o filtro está aplicado.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o chip.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de alternância.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof FilterChip> = {
  title: 'Unoochat/Componentes/FilterChip',
  component: FilterChip,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo do filtro.' },
    icon: { control: 'select', options: [undefined, ...uncIconNames], description: 'Glifo antes do rótulo.' },
    selected: { control: 'boolean', description: 'Filtro aplicado.' },
    disabled: { control: 'boolean', description: 'Desabilita o chip.' },
  },
  args: { label: 'Fotos', icon: undefined, selected: false, disabled: false },
};

export default meta;

type Story = StoryObj<typeof FilterChip>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="appbar" padding={32}>
      <FilterChip {...args} />
    </UncDocStage>
  ),
};

/**
 * Faixa de filtros da busca em conversas, com os seis filtros e seus glifos.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: busca em conversas',
  render: () => (
    <UncDocStage surface="appbar" padding={20} align="flex-start">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxWidth: 373 }}>
        {uncSearchFilters.map((filter) => (
          <FilterChip key={filter.id} label={filter.label} icon={FILTER_ICONS[filter.id]} />
        ))}
      </div>
    </UncDocStage>
  ),
};

/**
 * Matriz completa de estados.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="appbar" padding={24} gap={12}>
      <FilterChip label="Inativo" />
      <FilterChip label="Aplicado" selected />
      <FilterChip label="Desabilitado" disabled />
      <FilterChip label="Com glifo" icon="document" />
    </UncDocStage>
  ),
};

/**
 * Conjunto interativo com seleção múltipla.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <UncDocStage surface="appbar" padding={24} align="flex-start">
      <FilterRow />
    </UncDocStage>
  ),
};
