import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { TopMenuIcon, TopMenuItem, uniIconNames } from '../../../src/unitube';
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

const meta: Meta<typeof TopMenuIcon> = {
  title: 'Unitube/Componentes/TopMenuIcon',
  component: TopMenuIcon,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'select', options: uniIconNames },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    onClick: { action: 'onClick' },
  },
  args: { icon: 'leftBottom', label: 'Avançar', disabled: false },
};

export default meta;

type Story = StoryObj<typeof TopMenuIcon>;

const TopMenuIconDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Componentes • Navegação"
      title="TopMenuIcon"
      description="Reprodução do nó Navigation/TopMenuIcon (10:665), o alvo que fecha a barra de filtros e permite avançar a lista de categorias. O recuo de 20px em um alvo de 56px deixa o glifo com 16px — é o único ponto do arquivo em que um glifo de 24×24 aparece nesse tamanho fora da barra do comentário."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="O alvo de transbordo da barra de filtros."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="➡️" title="Indica continuação">
        No arquivo a barra tem 28 pílulas em 1200px visíveis. O alvo à direita sinaliza que a lista
        continua além da borda.
      </UniDocCard>
      <UniDocCard icon="📏" title="Recuo de 20px">
        Um degrau da escala que quase não aparece em outro lugar do arquivo. É o que reduz o glifo de
        24 para 16 dentro do alvo de 56.
      </UniDocCard>
      <UniDocCard icon="🎨" title="Superfície de barra">
        O alvo carrega <code>--uni-color-background-secondary</code> como preenchimento próprio, o
        que o mantém opaco sobre a faixa mesmo quando as pílulas rolam sob ele.
      </UniDocCard>
      <UniDocCard icon="🔲" title="Quadrado, sem raio">
        Diferente dos alvos circulares da barra superior, este é retangular e ocupa a altura inteira
        da faixa de filtros.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="10:665"
      frameName="Navigation/TopMenuIcon"
      specs={[
        { label: 'Dimensões', value: '56 × 56' },
        { label: 'Recuo', value: '20px' },
        { label: 'Glifo resultante', value: '16px' },
        { label: 'Superfície', value: '#212121 (background/secondary)' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Estados de interação',
          detail:
            'ausentes no arquivo. O hover troca a superfície para --uni-color-background-surface, e o foco aplica anel de 2px no vermelho semântico, recuado para dentro do alvo quadrado.',
        },
        {
          subject: 'Glifo configurável',
          detail:
            'o arquivo publica o alvo com um único glifo (leftBottom, o chevron de avanço). A prop icon foi acrescentada para que a barra possa também recuar a lista, com o mesmo glifo espelhado por outro nome.',
        },
        {
          subject: 'Rótulo acessível',
          detail:
            'o arquivo não descreve o propósito do alvo. O rótulo padrão “Avançar” foi acrescentado, porque um botão somente ícone sem rótulo é inacessível.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Alvo',
          role: 'Quadrado de 56px com a superfície de barra e recuo de 20px.',
          token: '--uni-topmenu-icon-size · --uni-spacing-20',
        },
        {
          name: 'Glifo',
          role: 'Ícone de 16px em texto primário.',
          token: 'prop icon · size="sm"',
        },
        {
          name: 'Realce',
          role: 'Superfície interativa no hover, sem alteração de raio.',
          token: '--uni-color-background-surface',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo, fechando a barra de filtros" surface="secondary" gap={12}>
      <TopMenuItem label="Item" active />
      <TopMenuItem label="Item" />
      <TopMenuItem label="Item" />
      <TopMenuIcon />
    </UniDocStage>
    <UniDocStage label="Outros glifos" surface="secondary" gap={0}>
      <TopMenuIcon icon="leftBottom" label="Avançar" />
      <TopMenuIcon icon="arrowBottom" label="Expandir" />
      <TopMenuIcon icon="more" label="Mais categorias" />
      <TopMenuIcon icon="search" label="Buscar categoria" />
    </UniDocStage>
    <UniDocStage label="Estados" surface="secondary" gap={0}>
      <TopMenuIcon />
      <TopMenuIcon disabled />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use o alvo apenas ao final da barra de filtros, como o arquivo faz.',
        'Informe label descrevendo a ação: o botão não tem texto visível.',
        'Mantenha a superfície opaca para que as pílulas passem por baixo sem aparecer.',
        'Preserve o recuo de 20px, que é o que define o glifo de 16px.',
      ]}
      donts={[
        'Não arredonde o alvo: ele é quadrado, diferente dos alvos da barra superior.',
        'Não use glifo de 24px aqui — o recuo do arquivo produz 16px.',
        'Não coloque mais de um alvo por barra.',
        'Não remova o rótulo acessível.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O alvo sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'deep']}>
      {() => (
        <>
          <TopMenuIcon />
          <TopMenuIcon icon="arrowBottom" label="Expandir" />
        </>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="TopMenuIcon"
      rows={[
        {
          name: 'icon',
          type: 'UniIconName',
          default: "'leftBottom'",
          description: 'Glifo exibido no centro do alvo, renderizado em 16px.',
        },
        {
          name: 'label',
          type: 'string',
          default: "'Avançar'",
          description: 'Rótulo acessível do botão, aplicado como aria-label.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos são repassados ao <button>, incluindo onClick e disabled.',
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
  render: () => <TopMenuIconDocumentationPage />,
};

/**
 * Playground com 100% das props do TopMenuIcon expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TopMenuIcon',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--uni-color-background-secondary)',
      }}
    >
      <TopMenuIcon {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/TopMenuIcon` (10:665), 56×56.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-secondary)' }}
    >
      <TopMenuIcon />
    </div>
  ),
};

/**
 * O alvo com diferentes glifos.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ display: 'flex', background: 'var(--uni-color-background-secondary)', padding: 32 }}
    >
      <TopMenuIcon icon="leftBottom" label="Avançar" />
      <TopMenuIcon icon="arrowBottom" label="Expandir" />
      <TopMenuIcon icon="more" label="Mais categorias" />
      <TopMenuIcon icon="search" label="Buscar categoria" />
      <TopMenuIcon icon="dropdown" label="Ordenar" />
    </div>
  ),
};
