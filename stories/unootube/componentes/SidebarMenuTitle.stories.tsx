import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { SidebarMenuItem, SidebarMenuTitle } from '../../../src/unootube';
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

const meta: Meta<typeof SidebarMenuTitle> = {
  title: 'Unootube/Componentes/SidebarMenuTitle',
  component: SidebarMenuTitle,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    className: { control: 'text' },
  },
  args: { title: 'Section title' },
};

export default meta;

type Story = StoryObj<typeof SidebarMenuTitle>;

const SidebarMenuTitleDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="SidebarMenuTitle"
      description="Reprodução do nó Navigation/SidebarMenuTitle (9:1933), o rótulo que abre cada bloco temático da barra lateral. O arquivo escreve o texto já em caixa alta; aqui a transformação é feita por CSS, para que o conteúdo entregue ao leitor de tela seja o texto natural e não uma sequência de maiúsculas."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Onde o rótulo aparece e por que ele é um cabeçalho."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🏷️" title="Dois usos no arquivo">
        Abre o bloco de inscrições (“SUBSCRIPTIONS”) e o de descoberta (“MORE FROM YOUTUBE”). Os
        demais blocos da barra lateral não têm rótulo.
      </UniDocCard>
      <UniDocCard icon="📢" title="Caixa alta por CSS">
        <code>text-transform: uppercase</code> em vez de texto já maiúsculo. Um leitor de tela lê
        “Subscriptions”, não “S-U-B-S-C…”.
      </UniDocCard>
      <UniDocCard icon="⚖️" title="Label/Large em texto secundário">
        Roboto Bold 14 sobre <code>--uni-color-text-secondary</code>. O peso é o mesmo do rótulo de
        botão; o que o distingue é a cor mais apagada.
      </UniDocCard>
      <UniDocCard icon="🧱" title="É um heading">
        Renderiza <code>&lt;h2&gt;</code>, porque estrutura a lista de navegação em seções — o que o
        design mostra.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="9:1933"
      frameName="Navigation/SidebarMenuTitle"
      specs={[
        { label: 'Dimensões', value: '224 × 32' },
        { label: 'Recuo', value: '8 / 24' },
        { label: 'Rótulo', value: 'Roboto Bold 14 · #AAAAAA' },
        { label: 'Usos no arquivo', value: '2' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Caixa alta aplicada por CSS',
          detail:
            'o arquivo escreve “SECTION TITLE” já em maiúsculas na camada de texto. O componente recebe o texto natural e aplica text-transform, para que a leitura por voz não soletre a palavra.',
        },
        {
          subject: 'Promovido a heading',
          detail:
            'o arquivo publica uma camada de texto solta. O componente renderiza <h2>, porque o rótulo estrutura a lista de navegação em seções.',
        },
        {
          subject: 'Largura do quadro interno',
          detail:
            'no arquivo o quadro interno abraça o texto (146px para “SUBSCRIPTIONS”), enquanto o componente ocupa a largura da linha da barra lateral. A diferença não é visível, porque o quadro não tem preenchimento.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Linha',
          role: 'Altura de 32px com recuo 8/24, alinhada às linhas de menu.',
          token: '--uni-sidebar-title-height',
        },
        {
          name: 'Rótulo',
          role: 'Label/Large em texto secundário, transformado em caixa alta por CSS.',
          token: '--uni-font-label-lg-* · --uni-color-text-secondary',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo, com as linhas do bloco" surface="secondary" direction="column" align="stretch" gap={0}>
      <SidebarMenuTitle title="Subscriptions" />
      <SidebarMenuItem icon="likedOutline" menuLabel="James Gouse" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Alan Cooper" href="#" />
      <SidebarMenuItem icon="arrowBottom" menuLabel="Show 13 more" asButton />
    </UniDocStage>
    <UniDocStage label="Os dois rótulos publicados pelo arquivo" surface="secondary" direction="column" align="stretch" gap={0}>
      <SidebarMenuTitle title="Subscriptions" />
      <SidebarMenuTitle title="More from Unootube" />
    </UniDocStage>
    <UniDocStage label="Rótulo longo, localizado" surface="secondary" direction="column" align="stretch" gap={0}>
      <SidebarMenuTitle title="Mais do Unootube" />
      <SidebarMenuTitle title="Inscrições" />
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Passe o texto em caixa natural: a transformação é responsabilidade do CSS.',
        'Use um rótulo por bloco temático, como o arquivo faz.',
        'Mantenha o recuo de 24px para alinhar o rótulo aos glifos das linhas abaixo.',
        'Deixe o componente renderizar <h2> — é o que estrutura a navegação.',
      ]}
      donts={[
        'Não escreva o texto já em maiúsculas: prejudica a leitura por voz.',
        'Não use o rótulo em texto primário — a cor apagada é o que o distingue das linhas.',
        'Não rotule todos os blocos: no arquivo, quatro dos seis não têm rótulo.',
        'Não substitua o peso Bold por regular.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O rótulo sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['secondary', 'primary', 'deep']}>
      {() => (
        <div style={{ width: 240 }}>
          <SidebarMenuTitle title="Subscriptions" />
        </div>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="SidebarMenuTitle"
      rows={[
        {
          name: 'title',
          type: 'React.ReactNode',
          description:
            'Texto do rótulo, em caixa natural. A caixa alta é aplicada por CSS para preservar a leitura por voz.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLHeadingElement>',
          description: 'Demais atributos são repassados ao <h2>.',
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
  render: () => <SidebarMenuTitleDocumentationPage />,
};

/**
 * Playground com 100% das props do SidebarMenuTitle expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SidebarMenuTitle',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 40, background: 'var(--uni-color-background-secondary)', width: 280 }}
    >
      <SidebarMenuTitle {...args} />
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/SidebarMenuTitle` (9:1933), 224×32.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-secondary)', width: 280 }}
    >
      <SidebarMenuTitle title="Section title" />
    </div>
  ),
};

/**
 * O rótulo abrindo um bloco completo da barra lateral.
 */
export const ComposicaoModular: Story = {
  name: 'Composição modular',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 24, background: 'var(--uni-color-background-secondary)', width: 280 }}
    >
      <SidebarMenuTitle title="Subscriptions" />
      <SidebarMenuItem icon="likedOutline" menuLabel="James Gouse" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Alan Cooper" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Marcus Levin" href="#" />
      <SidebarMenuItem icon="arrowBottom" menuLabel="Show 13 more" asButton />
      <SidebarMenuTitle title="More from Unootube" />
      <SidebarMenuItem icon="premium" activeIcon="premiumFill" menuLabel="Unootube Premium" href="#" />
      <SidebarMenuItem icon="gaming" activeIcon="gamingFill" menuLabel="Gaming" href="#" />
    </div>
  ),
};
