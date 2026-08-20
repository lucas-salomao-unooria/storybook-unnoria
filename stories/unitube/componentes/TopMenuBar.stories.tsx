import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { TopMenuBar } from '../../../src/unitube';
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
import { categories } from '../fixtures';

const meta: Meta<typeof TopMenuBar> = {
  title: 'Unitube/Componentes/TopMenuBar',
  component: TopMenuBar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    options: { control: 'object' },
    activeId: { control: 'text' },
    showOverflow: { control: 'boolean' },
    label: { control: 'text' },
    className: { control: 'text' },
    onSelect: { action: 'onSelect' },
    onOverflow: { action: 'onOverflow' },
  },
  args: {
    options: categories,
    activeId: 'all',
    showOverflow: true,
    label: 'Categorias',
  },
};

export default meta;

type Story = StoryObj<typeof TopMenuBar>;

const TopMenuBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Navegação"
      title="TopMenuBar"
      description="Reprodução do nó Top-Menu (13:1696) da tela inicial: a faixa horizontal de pílulas de categoria, delimitada por um fio de 1px acima e outro abaixo. No arquivo a lista transborda o quadro — são 28 pílulas em 1200px de largura visível —, e o alvo de ícone à direita indica a continuação."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="A faixa de filtros que abre a tela inicial."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="↔️" title="Transbordo deliberado">
        As 28 pílulas do arquivo somam muito mais que os 1200px visíveis. O transbordo é
        intencional, e o alvo à direita o sinaliza.
      </UniDocCard>
      <UniDocCard icon="✂️" title="Dois fios, um em cada aresta">
        A faixa tem 58px: 56 de conteúdo mais um fio acima e outro abaixo, ambos em{' '}
        <code>--uni-color-border-subtle</code>.
      </UniDocCard>
      <UniDocCard icon="🎚️" title="Rolagem sem barra visível">
        A trilha rola horizontalmente com a barra de rolagem suprimida, para preservar a aparência
        do arquivo — que não desenha barra alguma.
      </UniDocCard>
      <UniDocCard icon="1️⃣" title="Seleção única">
        Uma categoria por vez. O componente é controlado: <code>activeId</code> e{' '}
        <code>onSelect</code> ficam com o produto.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="13:1696"
      frameName="Top-Menu — tela Home"
      specs={[
        { label: 'Dimensões', value: '1200 × 58' },
        { label: 'Faixa de conteúdo', value: '56px' },
        { label: 'Pílulas no arquivo', value: '28' },
        { label: 'Fios', value: '1px acima e abaixo' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Rótulos repetidos no arquivo',
          detail:
            'as 28 pílulas do arquivo repetem o rótulo “Item”. As estórias usam rótulos variados para que a barra fique legível como demonstração; o componente aceita qualquer lista.',
        },
        {
          subject: 'Espaçamentos por coordenada',
          detail:
            'as pílulas do arquivo estão posicionadas por coordenada, com intervalos irregulares. O componente usa um intervalo único de 12px, equivalente à distância média medida.',
        },
        {
          subject: 'Rolagem horizontal',
          detail:
            'o arquivo é estático e apenas corta as pílulas na borda. A trilha rola de fato, com a barra de rolagem suprimida por scrollbar-width: none — sem isso, as categorias além da borda seriam inalcançáveis.',
        },
        {
          subject: 'Semântica de barra de ferramentas',
          detail:
            'o arquivo publica um frame sem semântica. O componente aplica role="toolbar" com aria-label, porque o que o design mostra é um grupo de controles de filtro.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Faixa',
          role: 'Barra de 58px com fio acima e abaixo, sobre a superfície de barra.',
          token: '--uni-topmenu-height · --uni-color-border-subtle',
        },
        {
          name: 'Trilha',
          role: 'Área rolável com as pílulas, recuo 12/24 e intervalo de 12px.',
          token: '--uni-spacing-12 · --uni-spacing-24',
        },
        {
          name: 'Pílulas',
          role: 'Instâncias de TopMenuItem, uma marcada como ativa.',
          token: 'prop activeId',
        },
        {
          name: 'Alvo de transbordo',
          role: 'TopMenuIcon fixo à direita, indicando a continuação da lista.',
          token: 'prop showOverflow',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo" surface="primary" align="stretch" padding={0}>
      <TopMenuBar options={categories} activeId="all" />
    </UniDocStage>
    <UniDocStage label="Sem alvo de transbordo" surface="primary" align="stretch" padding={0}>
      <TopMenuBar options={categories.slice(0, 5)} activeId="music" showOverflow={false} />
    </UniDocStage>
    <UniDocStage label="Nenhuma categoria selecionada" surface="primary" align="stretch" padding={0}>
      <TopMenuBar options={categories.slice(0, 8)} />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Coloque a barra imediatamente abaixo da TopBar, como o arquivo faz.',
        'Mantenha activeId controlado pelo produto: a barra não guarda estado.',
        'Oculte o alvo de transbordo quando a lista couber inteira na largura.',
        'Use identificadores estáveis em options.id, não índices.',
      ]}
      donts={[
        'Não permita seleção múltipla: o arquivo mostra uma pílula ativa por vez.',
        'Não adicione sombra à faixa — os dois fios já a delimitam.',
        'Não exiba barra de rolagem visível na trilha.',
        'Não use rótulos longos que forcem a quebra de linha da pílula.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A faixa sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={0}>
      {() => (
        <div style={{ width: '100%' }}>
          <TopMenuBar options={categories.slice(0, 8)} activeId="all" />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="TopMenuBar"
      rows={[
        {
          name: 'options',
          type: 'UniTopMenuOption[]',
          description: 'Categorias exibidas. Cada uma tem id estável e label.',
        },
        {
          name: 'activeId',
          type: 'string',
          description: 'Identificador da categoria selecionada. O componente não guarda estado.',
        },
        {
          name: 'onSelect',
          type: '(id: string) => void',
          description: 'Chamado ao selecionar uma categoria.',
        },
        {
          name: 'showOverflow',
          type: 'boolean',
          default: 'true',
          description: 'Exibe o alvo de ícone que encerra a barra.',
        },
        {
          name: 'onOverflow',
          type: '() => void',
          description: 'Chamado ao acionar o alvo de avanço.',
        },
        {
          name: 'label',
          type: 'string',
          default: "'Categorias'",
          description: 'Rótulo acessível da barra de ferramentas.',
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
  render: () => <TopMenuBarDocumentationPage />,
};

/**
 * Playground com 100% das props do TopMenuBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopMenuBar',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <TopMenuBar {...args} />
      <div style={{ height: 160 }} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Top-Menu` (13:1696) da tela inicial.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <TopMenuBar
        options={Array.from({ length: 28 }, (_, index) => ({
          id: `item-${index}`,
          label: 'Item',
        }))}
        activeId="item-0"
      />
      <div style={{ height: 160 }} />
    </div>
  ),
};

/**
 * Seleção interativa entre categorias.
 */
export const Estados: Story = {
  render: () => {
    const SelectionDemo = () => {
      const [activeId, setActiveId] = useState('all');
      return (
        <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
          <TopMenuBar options={categories} activeId={activeId} onSelect={setActiveId} />
          <p
            style={{
              color: 'var(--uni-color-text-secondary)',
              fontFamily: 'var(--uni-font-sans)',
              fontSize: 13,
              padding: 24,
            }}
          >
            Categoria ativa:{' '}
            <strong style={{ color: 'var(--uni-color-text-primary)' }}>{activeId}</strong>
          </p>
        </div>
      );
    };
    return <SelectionDemo />;
  },
};
