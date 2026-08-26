import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { SidebarMenuItem, uniIconNames } from '../../../src/unootube';
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

const meta: Meta<typeof SidebarMenuItem> = {
  title: 'Unootube/Componentes/SidebarMenuItem',
  component: SidebarMenuItem,
  parameters: { layout: 'padded' },
  argTypes: {
    icon: { control: 'select', options: [undefined, ...uniIconNames] },
    activeIcon: { control: 'select', options: [undefined, ...uniIconNames] },
    menuLabel: { control: 'text' },
    active: { control: 'boolean' },
    asButton: { control: 'boolean' },
    href: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    icon: 'home',
    activeIcon: 'homeFill',
    menuLabel: 'Menu Item',
    active: true,
    asButton: false,
    href: '#',
  },
};

export default meta;

type Story = StoryObj<typeof SidebarMenuItem>;

const PAIRS: [string, string, string][] = [
  ['home', 'homeFill', 'Home'],
  ['explore', 'exploreFill', 'Explore'],
  ['subscriptions', 'subscriptionsFill', 'Subscriptions'],
  ['library', 'libraryFill', 'Library'],
  ['history', 'historyFill', 'History'],
  ['watchLater', 'watchLaterFill', 'Watch Later'],
  ['likedOutline', 'likedFill', 'Liked Videos'],
  ['premium', 'premiumFill', 'Unootube Premium'],
  ['gaming', 'gamingFill', 'Gaming'],
  ['live', 'liveFill', 'Live'],
  ['sports', 'sportsFill', 'Sports'],
  ['report', 'reportFill', 'Report History'],
];

const SidebarMenuItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="SidebarMenuItem"
      description="Reprodução do nó Navigation/SidebarMenuItem (8:126), a linha de 224×40 que compõe todos os seis blocos da barra lateral. O estado ativo do arquivo é marcado de duas formas simultâneas: o fundo passa à superfície interativa e o glifo troca para a versão preenchida — não há mudança de cor de texto."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Como o arquivo marca o item ativo."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🎯" title="Ativo por peso e por fundo">
        O arquivo publica treze glifos preenchidos exatamente para este fim. O texto permanece em{' '}
        <code>--uni-color-text-primary</code> nos dois estados: o que muda é o peso do vetor e o
        fundo da linha.
      </UniDocCard>
      <UniDocCard icon="📏" title="Recuo assimétrico">
        <code>8/8/8/24</code> — o recuo esquerdo de 24px é três vezes o direito, o que alinha o
        glifo à calha da barra lateral.
      </UniDocCard>
      <UniDocCard icon="↔️" title="Intervalo de 24px">
        Entre o glifo e o rótulo há 24px, o maior intervalo interno de qualquer componente do
        arquivo. É o que dá à barra lateral seu ritmo característico.
      </UniDocCard>
      <UniDocCard icon="🔗" title="Âncora ou botão">
        Por padrão a linha é um <code>&lt;a&gt;</code>, porque navega. Com <code>asButton</code>{' '}
        vira <code>&lt;button&gt;</code>, para os casos em que dispara uma ação — “Show More”, por
        exemplo.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="8:126"
      frameName="Navigation/SidebarMenuItem"
      specs={[
        { label: 'Dimensões', value: '224 × 40' },
        { label: 'Recuo', value: '8 / 8 / 8 / 24' },
        { label: 'Intervalo glifo–rótulo', value: '24px' },
        { label: 'Rótulo', value: 'Body/Medium · #FFFFFF' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Semântica de navegação',
          detail:
            'o arquivo publica um quadro estático. A linha virou <a> com aria-current="page" quando ativa, ou <button> com asButton — o que o design mostra é uma lista de destinos de navegação.',
        },
        {
          subject: 'Estado de hover',
          detail:
            'ausente no arquivo. Foi acrescentado como --uni-color-state-hover, e é suprimido quando a linha já está ativa para não competir com a superfície interativa.',
        },
        {
          subject: 'Troca de glifo pelo componente',
          detail:
            'no arquivo, ativo e inativo são instâncias diferentes com glifos diferentes. Aqui a troca é feita pela prop activeIcon, para que o consumidor declare o par uma única vez.',
        },
        {
          subject: 'Rótulo truncado',
          detail:
            'o arquivo mostra rótulos curtos que sempre cabem. O componente trunca com reticências, porque nomes de canal e rótulos localizados podem exceder os 224px.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Linha',
          role: 'Alvo de 40px de altura com recuo assimétrico 8/8/8/24.',
          token: '--uni-sidebar-item-height · --uni-spacing-24',
        },
        {
          name: 'Glifo',
          role: 'Quadro de 24px que troca entre contorno e preenchido conforme o estado.',
          token: 'props icon e activeIcon',
        },
        {
          name: 'Rótulo',
          role: 'Body/Medium em texto primário, truncado com reticências.',
          token: '--uni-font-body-md-*',
        },
        {
          name: 'Estado ativo',
          role: 'Superfície interativa como fundo da linha inteira.',
          token: '--uni-color-background-surface',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: ativo e inativo" surface="secondary" direction="column" align="stretch" gap={0}>
      <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Menu Item" active href="#" />
      <SidebarMenuItem icon="explore" menuLabel="Explore" href="#" />
      <SidebarMenuItem icon="subscriptions" menuLabel="Subscriptions" href="#" />
    </UniDocStage>
    <UniDocStage label="Os doze pares de glifo publicados pelo arquivo" surface="secondary" direction="column" align="stretch" gap={0}>
      {PAIRS.map(([outline, filled, label]) => (
        <SidebarMenuItem
          key={outline}
          icon={outline as never}
          activeIcon={filled as never}
          menuLabel={label}
          href="#"
        />
      ))}
    </UniDocStage>
    <UniDocStage label="Sem glifo e como botão de ação" surface="secondary" direction="column" align="stretch" gap={0}>
      <SidebarMenuItem menuLabel="Sem glifo" href="#" />
      <SidebarMenuItem icon="arrowBottom" menuLabel="Show More" asButton />
      <SidebarMenuItem icon="arrowTop" menuLabel="Show Less" asButton />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Informe activeIcon com a versão preenchida do glifo: é como o arquivo marca o item ativo.',
        'Use asButton quando a linha dispara uma ação em vez de navegar.',
        'Deixe o componente aplicar aria-current: ele o faz automaticamente quando active é verdadeiro.',
        'Mantenha o recuo esquerdo de 24px para que os glifos fiquem alinhados entre os blocos.',
      ]}
      donts={[
        'Não marque o item ativo apenas por cor de texto: o arquivo não faz isso.',
        'Não substitua o glifo preenchido por uma versão colorida do de contorno.',
        'Não reduza o intervalo de 24px entre glifo e rótulo.',
        'Não use href em uma linha que apenas expande a lista — use asButton.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A linha sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'deep']}>
      {() => (
        <div style={{ width: 240 }}>
          <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Home" active href="#" />
          <SidebarMenuItem icon="explore" menuLabel="Explore" href="#" />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="SidebarMenuItem"
      rows={[
        {
          name: 'icon',
          type: 'UniIconName',
          description: 'Glifo de contorno exibido à esquerda do rótulo.',
        },
        {
          name: 'activeIcon',
          type: 'UniIconName',
          description:
            'Glifo preenchido usado quando active é verdadeiro. O arquivo publica treze pares para este fim.',
        },
        { name: 'menuLabel', type: 'React.ReactNode', description: 'Rótulo da linha.' },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description:
            'Marca a linha como ativa: aplica a superfície interativa, troca o glifo e define aria-current="page".',
        },
        {
          name: 'asButton',
          type: 'boolean',
          default: 'false',
          description: 'Renderiza a linha como <button> em vez de <a>.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.AnchorHTMLAttributes<HTMLAnchorElement>',
          description: 'Demais atributos são repassados ao elemento raiz, incluindo href e onClick.',
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
  render: () => <SidebarMenuItemDocumentationPage />,
};

/**
 * Playground com 100% das props do SidebarMenuItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SidebarMenuItem',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-secondary)', width: 280 }}
    >
      <SidebarMenuItem {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/SidebarMenuItem` (8:126), 224×40.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-secondary)', width: 280 }}
    >
      <SidebarMenuItem icon="homeFill" menuLabel="Menu Item" href="#" />
    </div>
  ),
};

/**
 * Os doze pares de contorno e preenchimento em uso.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-secondary)', width: 280 }}
    >
      {PAIRS.map(([outline, filled, label], index) => (
        <SidebarMenuItem
          key={outline}
          icon={outline as never}
          activeIcon={filled as never}
          menuLabel={label}
          active={index === 0}
          href="#"
        />
      ))}
    </div>
  ),
};

/**
 * Estados: ativo, inativo e como botão de ação.
 */
export const Estados: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-secondary)', width: 280 }}
    >
      <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Ativo" active href="#" />
      <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Inativo" href="#" />
      <SidebarMenuItem icon="arrowBottom" menuLabel="Botão de ação" asButton />
      <SidebarMenuItem menuLabel="Sem glifo" href="#" />
    </div>
  ),
};
