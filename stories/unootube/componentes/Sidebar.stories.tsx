import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { FooterItem, Sidebar, SidebarMenuItem, SidebarMenuTitle } from '../../../src/unootube';
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

const meta: Meta<typeof Sidebar> = {
  title: 'Unootube/Componentes/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    label: { control: 'text' },
    className: { control: 'text' },
  },
  args: { label: 'Navegação principal' },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

/** Composição completa da barra lateral, com os seis blocos do arquivo. */
const FullSidebar = ({ height = 720 }: { height?: number }) => (
  <Sidebar style={{ height }}>
    <Sidebar.Section>
      <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Menu Item" active href="#" />
      <SidebarMenuItem icon="explore" activeIcon="exploreFill" menuLabel="Explore" href="#" />
      <SidebarMenuItem
        icon="subscriptions"
        activeIcon="subscriptionsFill"
        menuLabel="Subscriptions"
        href="#"
      />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuItem icon="library" activeIcon="libraryFill" menuLabel="Library" href="#" />
      <SidebarMenuItem icon="history" activeIcon="historyFill" menuLabel="History" href="#" />
      <SidebarMenuItem icon="yourVideos" menuLabel="Your Videos" href="#" />
      <SidebarMenuItem
        icon="watchLater"
        activeIcon="watchLaterFill"
        menuLabel="Watch Later"
        href="#"
      />
      <SidebarMenuItem
        icon="likedOutline"
        activeIcon="likedFill"
        menuLabel="Liked Videos"
        href="#"
      />
      <SidebarMenuItem icon="arrowBottom" menuLabel="Show More" asButton />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuTitle title="Section title" />
      <SidebarMenuItem icon="likedOutline" menuLabel="James Gouse" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Alan Cooper" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Marcus Levin" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Alexis Sears" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Jesica Lambert" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Anna White" href="#" />
      <SidebarMenuItem icon="likedOutline" menuLabel="Skylar Dias" href="#" />
      <SidebarMenuItem icon="arrowBottom" menuLabel="Show 13 more" asButton />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuTitle title="More from Unootube" />
      <SidebarMenuItem
        icon="premium"
        activeIcon="premiumFill"
        menuLabel="Unootube Premium"
        href="#"
      />
      <SidebarMenuItem icon="gaming" activeIcon="gamingFill" menuLabel="Gaming" href="#" />
      <SidebarMenuItem icon="live" activeIcon="liveFill" menuLabel="Live" href="#" />
      <SidebarMenuItem icon="sports" activeIcon="sportsFill" menuLabel="Sports" href="#" />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuItem icon="settings" menuLabel="Settings" href="#" />
      <SidebarMenuItem icon="report" activeIcon="reportFill" menuLabel="Report History" href="#" />
      <SidebarMenuItem icon="help" menuLabel="Help" href="#" />
      <SidebarMenuItem icon="feedback" menuLabel="Send Feedback" href="#" />
    </Sidebar.Section>

    <Sidebar.Footer>
      <Sidebar.FooterRow>
        {['About', 'Press', 'Copyright', 'Contact us', 'Creators', 'Advertise', 'Developers'].map(
          (label) => (
            <FooterItem key={label} label={label} href="#" />
          )
        )}
      </Sidebar.FooterRow>
      <Sidebar.FooterRow>
        {['Terms', 'Privacy', 'Policy & Safety', 'How Unootube works', 'Test new features'].map(
          (label) => (
            <FooterItem key={label} label={label} href="#" />
          )
        )}
      </Sidebar.FooterRow>
      <Sidebar.FooterRow>
        <FooterItem label="© 2026 Unooria LLC" href="#" />
      </Sidebar.FooterRow>
    </Sidebar.Footer>
  </Sidebar>
);

const SidebarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="Sidebar"
      description="Reprodução do nó Navigation/Sidebar (8:114): 240px de largura sobre a superfície de barra, dividida em seis blocos separados por fios de 1px. É um contêiner de composição — o arquivo o monta com 25 instâncias de SidebarMenuItem, duas de SidebarMenuTitle e um rodapé de links."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Como a barra se organiza em blocos."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🧱" title="Seis blocos temáticos">
        Navegação principal, biblioteca, inscrições, descoberta, suporte e rodapé. Cada um é um{' '}
        <code>Sidebar.Section</code> com fio divisor ao final.
      </UniDocCard>
      <UniDocCard icon="✂️" title="Fio de 224px, barra de 240px">
        O divisor é deliberadamente mais estreito que a barra: a folga de 16px à direita é literal do
        arquivo. Por isso ele é um pseudoelemento com largura própria, e não um{' '}
        <code>border-bottom</code>.
      </UniDocCard>
      <UniDocCard icon="📜" title="Rola verticalmente">
        A barra do arquivo tem 1395px de altura contra os 968px visíveis da tela — ou seja, ela rola.
        O componente reproduz isso com <code>overflow-y: auto</code>.
      </UniDocCard>
      <UniDocCard icon="🧩" title="Composição, não configuração">
        A barra não recebe uma lista de itens por prop. O conteúdo entra por <code>children</code>,
        para que o produto controle quais blocos existem e em que ordem.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nó de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="8:114"
      frameName="Navigation/Sidebar"
      specs={[
        { label: 'Dimensões', value: '240 × 1395' },
        { label: 'Superfície', value: '#212121 (background/secondary)' },
        { label: 'Blocos', value: '6' },
        { label: 'Fio divisor', value: '224 × 1 · #303030' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Altura fluida',
          detail:
            'o arquivo desenha a barra em 1395px fixos, deliberadamente cortada pela aresta da tela de 1024px. O componente usa altura de 100% com rolagem, para que a barra acompanhe a altura real da janela.',
        },
        {
          subject: 'Divisor como pseudoelemento',
          detail:
            'no arquivo cada divisor é um retângulo de 224×1 posicionado dentro do bloco. Como um border-bottom ocuparia os 240px da barra, o divisor foi reproduzido como ::after com largura própria.',
        },
        {
          subject: 'Blocos por composição',
          detail:
            'o arquivo agrupa as linhas em frames com recuos verticais variados (12px em uns, 0 em outros). O componente padroniza o recuo em 12px por bloco, com intervalo equivalente à média medida.',
        },
        {
          subject: 'Rótulo de região',
          detail:
            'o arquivo publica um frame sem semântica. O componente renderiza <nav aria-label>, porque o que o design mostra é a navegação principal do produto.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Sidebar',
          role: 'Região de navegação de 240px, sobre a superfície de barra, com rolagem vertical.',
          token: '--uni-sidebar-width · --uni-color-background-secondary',
        },
        {
          name: 'Sidebar.Section',
          role: 'Bloco temático com recuo vertical de 12px e fio divisor ao final.',
          token: 'prop divider',
        },
        {
          name: 'Sidebar.Footer',
          role: 'Coluna de grupos de links institucionais, com recuo 16/24.',
          token: '--uni-spacing-24',
        },
        {
          name: 'Sidebar.FooterRow',
          role: 'Linha de links que quebra conforme a largura disponível.',
          token: 'flex-wrap',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e composição" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: os seis blocos" surface="primary" align="stretch" padding={0}>
      <FullSidebar />
    </UniDocStage>
    <UniDocStage label="Barra reduzida, sem rodapé" surface="primary" align="stretch" padding={0}>
      <Sidebar style={{ height: 280 }}>
        <Sidebar.Section>
          <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Home" active href="#" />
          <SidebarMenuItem icon="explore" menuLabel="Explore" href="#" />
        </Sidebar.Section>
        <Sidebar.Section divider={false}>
          <SidebarMenuItem icon="library" menuLabel="Library" href="#" />
          <SidebarMenuItem icon="history" menuLabel="History" href="#" />
        </Sidebar.Section>
      </Sidebar>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Agrupe as linhas em Sidebar.Section para que os divisores apareçam onde o arquivo os coloca.',
        'Use divider={false} no último bloco antes do rodapé, para não duplicar o fio.',
        'Marque um único item como ativo por vez.',
        'Deixe a barra rolar: o arquivo tem mais conteúdo do que cabe na altura da tela.',
      ]}
      donts={[
        'Não use border-bottom no bloco: o divisor tem 224px, não os 240px da barra.',
        'Não altere a largura de 240px, que é a referência horizontal de todas as telas.',
        'Não adicione sombra à barra: a separação é feita por luminância.',
        'Não passe uma lista de itens por prop — o conteúdo entra por composição.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="A barra sobre cada superfície escura oficial."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={0}>
      {() => (
        <Sidebar style={{ height: 240 }}>
          <Sidebar.Section divider={false}>
            <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Home" active href="#" />
            <SidebarMenuItem icon="explore" menuLabel="Explore" href="#" />
            <SidebarMenuItem icon="subscriptions" menuLabel="Subscriptions" href="#" />
          </Sidebar.Section>
        </Sidebar>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="Sidebar"
      rows={[
        {
          name: 'label',
          type: 'string',
          default: "'Navegação principal'",
          description: 'Rótulo acessível da região de navegação, aplicado como aria-label.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description:
            'Blocos da barra. Componha com Sidebar.Section, SidebarMenuItem, SidebarMenuTitle e Sidebar.Footer.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <nav>.',
        },
      ]}
    />
    <UniDocPropsTable
      title="Sidebar.Section"
      rows={[
        {
          name: 'divider',
          type: 'boolean',
          default: 'true',
          description:
            'Desenha o fio divisor de 224px ao final do bloco. Use false no último bloco antes do rodapé.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
        },
      ]}
    />
    <UniDocPropsTable
      title="Sidebar.Footer e Sidebar.FooterRow"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          description:
            'No Footer, os grupos de links; no FooterRow, os FooterItem que compõem uma linha.',
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
  render: () => <SidebarDocumentationPage />,
};

/**
 * Playground com 100% das props do Sidebar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Sidebar',
  render: (args) => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <Sidebar {...args} style={{ height: 600 }}>
        <Sidebar.Section>
          <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Home" active href="#" />
          <SidebarMenuItem icon="explore" menuLabel="Explore" href="#" />
          <SidebarMenuItem icon="subscriptions" menuLabel="Subscriptions" href="#" />
        </Sidebar.Section>
        <Sidebar.Section divider={false}>
          <SidebarMenuTitle title="Section title" />
          <SidebarMenuItem icon="likedOutline" menuLabel="James Gouse" href="#" />
          <SidebarMenuItem icon="likedOutline" menuLabel="Alan Cooper" href="#" />
        </Sidebar.Section>
      </Sidebar>
    </div>
  ),
};

/**
 * Réplica visual do nó `Navigation/Sidebar` (8:114), com os seis blocos.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div data-uni-theme="dark" style={{ background: 'var(--uni-color-background-primary)' }}>
      <FullSidebar height={900} />
    </div>
  ),
};

/**
 * Uso flexível dos subcomponentes de composição.
 */
export const ComposicaoModular: Story = {
  name: 'Composição modular',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ display: 'flex', gap: 24, background: 'var(--uni-color-background-primary)' }}
    >
      <Sidebar style={{ height: 320 }} label="Barra com um bloco">
        <Sidebar.Section divider={false}>
          <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Home" active href="#" />
          <SidebarMenuItem icon="explore" menuLabel="Explore" href="#" />
        </Sidebar.Section>
      </Sidebar>

      <Sidebar style={{ height: 320 }} label="Barra com rótulo de seção">
        <Sidebar.Section divider={false}>
          <SidebarMenuTitle title="More from Unootube" />
          <SidebarMenuItem icon="premium" activeIcon="premiumFill" menuLabel="Premium" href="#" />
          <SidebarMenuItem icon="gaming" activeIcon="gamingFill" menuLabel="Gaming" href="#" />
        </Sidebar.Section>
      </Sidebar>

      <Sidebar style={{ height: 320 }} label="Barra apenas com rodapé">
        <Sidebar.Footer>
          <Sidebar.FooterRow>
            {['About', 'Press', 'Copyright'].map((label) => (
              <FooterItem key={label} label={label} href="#" />
            ))}
          </Sidebar.FooterRow>
          <Sidebar.FooterRow>
            <FooterItem label="© 2026 Unooria LLC" href="#" />
          </Sidebar.FooterRow>
        </Sidebar.Footer>
      </Sidebar>
    </div>
  ),
};
